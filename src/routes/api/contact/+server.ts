import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';

/** Max accepted length per field. Previously unbounded. */
const FIELD_LIMITS: Record<string, number> = {
	needs: 100,
	name: 100,
	email: 254,
	projectType: 100,
	budget: 100,
	additional: 5000
};

/** Escape untrusted text before it goes into the notification email body. */
function escapeHtml(value: unknown): string {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/** Strip CR/LF so a value can never inject an extra mail header. */
function headerSafe(value: unknown): string {
	return String(value ?? '')
		.replace(/[\r\n]+/g, ' ')
		.trim();
}

const rateLimits = new Map<string, number[]>();

const RATE_LIMIT = {
	windowMs: 3600000,
	max: 5
};

function checkRateLimit(clientIp: string) {
	const now = Date.now();

	const timestamps = rateLimits.get(clientIp) || [];

	const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT.windowMs);

	const oldestTimestamp = recentTimestamps.length > 0 ? Math.min(...recentTimestamps) : now;
	const resetTime = oldestTimestamp + RATE_LIMIT.windowMs;
	const resetInMs = Math.max(0, resetTime - now);

	const isLimited = recentTimestamps.length >= RATE_LIMIT.max;

	if (!isLimited) {
		rateLimits.set(clientIp, [...recentTimestamps, now]);
	}

	if (Math.random() < 0.05) {
		cleanupRateLimits();
	}

	return {
		success: !isLimited,
		remaining: isLimited ? 0 : RATE_LIMIT.max - recentTimestamps.length - 1,
		limit: RATE_LIMIT.max,
		reset: resetInMs
	};
}

function cleanupRateLimits() {
	const now = Date.now();
	for (const [ip, timestamps] of rateLimits.entries()) {
		const recentTimestamps = timestamps.filter(
			(timestamp) => now - timestamp < RATE_LIMIT.windowMs
		);

		if (recentTimestamps.length === 0) {
			rateLimits.delete(ip);
		} else {
			rateLimits.set(ip, recentTimestamps);
		}
	}
}

const transporter = nodemailer.createTransport({
	host: env.EMAIL_HOST || 'smtp.gmail.com',
	port: Number(env.EMAIL_PORT) || 465,
	secure: env.EMAIL_SECURE !== 'false',
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASS
	}
});

const NOTIFICATION_EMAIL = env.NOTIFICATION_EMAIL || env.EMAIL_USER;

/**
 * The envelope sender must be an address we are authorised to send as,
 * otherwise SPF/DKIM fails and the notification lands in spam. The
 * submitter's address goes in Reply-To instead.
 */
const MAIL_FROM = env.EMAIL_FROM || env.EMAIL_USER;

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const clientIp = getClientAddress();

	const { success, remaining, reset, limit } = checkRateLimit(clientIp);

	if (!success) {
		return json(
			{
				success: false,
				message: 'Too many contact requests. Please try again later.',
				limit,
				remaining,
				reset
			},
			{
				status: 429,
				headers: {
					'Retry-After': Math.ceil(reset / 1000).toString()
				}
			}
		);
	}

	try {
		const formData = await request.json();

		const requiredFields = ['needs', 'name', 'email', 'projectType', 'budget'];
		for (const field of requiredFields) {
			if (!formData[field]) {
				return json(
					{
						success: false,
						message: `${field} is required`
					},
					{ status: 400 }
				);
			}
		}

		// Every field must be a string within its limit. Without this, a client
		// could post an object, or megabytes of text, straight into the database.
		for (const [field, max] of Object.entries(FIELD_LIMITS)) {
			const value = formData[field];
			if (value === undefined || value === null) continue;
			if (typeof value !== 'string') {
				return json(
					{ success: false, message: `${field} must be text` },
					{ status: 400 }
				);
			}
			if (value.length > max) {
				return json(
					{ success: false, message: `${field} must be ${max} characters or fewer` },
					{ status: 400 }
				);
			}
		}

		const email = String(formData.email).trim().toLowerCase();

		if (!/^\S+@\S+\.\S+$/.test(email)) {
			return json(
				{
					success: false,
					message: 'Invalid email format'
				},
				{ status: 400 }
			);
		}

		// Second limiter, backed by the database. The in-memory map above is
		// per-instance and resets on every cold start, so on serverless it does
		// not actually bound anything. This one survives across instances.
		try {
			const recentFromEmail = await prisma.contact.count({
				where: {
					email,
					createdAt: { gte: new Date(Date.now() - RATE_LIMIT.windowMs) }
				}
			});

			if (recentFromEmail >= RATE_LIMIT.max) {
				return json(
					{
						success: false,
						message: 'Too many contact requests. Please try again later.'
					},
					{ status: 429 }
				);
			}
		} catch (err) {
			console.error('Rate-limit lookup failed:', err);
		}

		if (!prisma || !prisma.contact) {
			console.error('Prisma client or Contact model is undefined');
			return json(
				{
					success: false,
					message: 'Database connection error'
				},
				{ status: 500 }
			);
		}

		let contact;
		try {
			contact = await prisma.contact.create({
				data: {
					needs: formData.needs,
					name: formData.name,
					email,
					projectType: formData.projectType,
					budget: formData.budget,
					additional: formData.additional || ''
				}
			});
		} catch (dbError) {
			console.error('Database error:', dbError);
			return json(
				{
					success: false,
					message: 'Database error creating contact entry'
				},
				{ status: 500 }
			);
		}

		try {
			await transporter.sendMail({
				from: MAIL_FROM,
				replyTo: `"${headerSafe(formData.name).replace(/"/g, '')}" <${email}>`,
				to: NOTIFICATION_EMAIL,
				subject: headerSafe(
					`${formData.needs} Project Inquiry: ${formData.projectType} (Budget: ${formData.budget})`
				),
				text: `
New contact form submission:

FROM: ${formData.name} <${email}>
PROJECT NEEDS: ${formData.needs}
PROJECT TYPE: ${formData.projectType}
BUDGET: ${formData.budget}
        
ADDITIONAL INFORMATION:
${formData.additional || 'None provided'}
        
This submission was saved in the database with ID: ${contact.id}
    `,
				html: `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .email-container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .email-header {
      background-color: #4a5568;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .email-body {
      padding: 20px;
      background-color: #fff;
    }
    .email-footer {
      background-color: #f9f9f9;
      padding: 15px 20px;
      font-size: 0.85em;
      color: #666;
      border-top: 1px solid #e0e0e0;
    }
    .contact-detail {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    .contact-detail:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      display: inline-block;
      width: 120px;
      color: #4a5568;
    }
    .value {
      display: inline-block;
    }
    .highlight {
      font-weight: 600;
      color: #2d3748;
    }
    .additional-info {
      background-color: #f7fafc;
      padding: 15px;
      border-radius: 6px;
      margin-top: 15px;
      white-space: pre-line;
    }
    .db-id {
      font-size: 0.85em;
      color: #718096;
      font-style: italic;
    }
    .sender-info {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #ebf8ff;
      border-radius: 6px;
      border-left: 4px solid #4299e1;
    }
    .sender-name {
      font-weight: bold;
      font-size: 1.1em;
      color: #2b6cb0;
    }
    .sender-email {
      color: #4a5568;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h2>New Contact Form Submission</h2>
    </div>
    
    <div class="email-body">
      <div class="sender-info">
        <div class="sender-name">${escapeHtml(formData.name)}</div>
        <div class="sender-email">${escapeHtml(email)}</div>
      </div>
      
      <div class="contact-detail">
        <span class="label">Project Needs:</span>
        <span class="value highlight">${escapeHtml(formData.needs)}</span>
      </div>
      
      <div class="contact-detail">
        <span class="label">Project Type:</span>
        <span class="value highlight">${escapeHtml(formData.projectType)}</span>
      </div>
      
      <div class="contact-detail">
        <span class="label">Budget:</span>
        <span class="value highlight">${escapeHtml(formData.budget)}</span>
      </div>
      
      <div class="contact-detail">
        <span class="label">Additional Info:</span>
        <div class="additional-info">${formData.additional ? escapeHtml(formData.additional).replace(/\n/g, '<br>') : 'None provided'}</div>
      </div>
    </div>
    
    <div class="email-footer">
      <p class="db-id">Submission ID: ${contact.id}</p>
      <p>This message was sent from your portfolio website contact form.</p>
    </div>
  </div>
</body>
</html>
    `
			});

			console.log('Notification email sent successfully');
		} catch (emailError) {
			console.error('Failed to send notification email:', emailError);
		}

		return json({
			success: true,
			message: 'Contact form submitted successfully',
			contactId: contact.id
		});
	} catch (error) {
		console.error('Error processing contact form:', error);
		return json(
			{
				success: false,
				message: 'Server error processing your request'
			},
			{ status: 500 }
		);
	}
};
