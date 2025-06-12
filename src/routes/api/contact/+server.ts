import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';

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
	host: process.env.EMAIL_HOST || 'smtp.gmail.com',
	port: Number(process.env.EMAIL_PORT) || 465,
	secure: process.env.EMAIL_SECURE === 'true' || true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	},
	debug: true
});

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;

console.log('Email configuration:', {
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: process.env.EMAIL_SECURE,
	user: process.env.EMAIL_USER ? '***exists***' : 'undefined',
	pass: process.env.EMAIL_PASS ? '***exists***' : 'undefined',
	notification: NOTIFICATION_EMAIL
});

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

		if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			return json(
				{
					success: false,
					message: 'Invalid email format'
				},
				{ status: 400 }
			);
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
					email: formData.email,
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
				from: `"${formData.name}" <${formData.email}>`,
				replyTo: formData.email,
				to: NOTIFICATION_EMAIL,
				subject: `${formData.needs} Project Inquiry: ${formData.projectType} (Budget: ${formData.budget})`,
				text: `
New contact form submission:

FROM: ${formData.name} <${formData.email}>
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
        <div class="sender-name">${formData.name}</div>
        <div class="sender-email">${formData.email}</div>
      </div>
      
      <div class="contact-detail">
        <span class="label">Project Needs:</span>
        <span class="value highlight">${formData.needs}</span>
      </div>
      
      <div class="contact-detail">
        <span class="label">Project Type:</span>
        <span class="value highlight">${formData.projectType}</span>
      </div>
      
      <div class="contact-detail">
        <span class="label">Budget:</span>
        <span class="value highlight">${formData.budget}</span>
      </div>
      
      <div class="contact-detail">
        <span class="label">Additional Info:</span>
        <div class="additional-info">${formData.additional ? formData.additional.replace(/\n/g, '<br>') : 'None provided'}</div>
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
