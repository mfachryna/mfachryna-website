import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

const siteUrl = 'https://mfachryna.my.id';

export const GET: RequestHandler = async () => {
	const blogs = await prisma.blog.findMany({
		where: {
			published: true
		},
		select: {
			slug: true,
			publishedAt: true,
			updatedAt: true
		}
	});

	const pages = ['/', '/projects', '/blog'];

	const sitemap = `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${pages
				.map((page) => {
					return `
						<url>
							<loc>${siteUrl}${page}</loc>
							<changefreq>daily</changefreq>
							<priority>0.7</priority>
						</url>
					`;
				})
				.join('')}
			${blogs
				.map((blog) => {
					return `
						<url>
							<loc>${siteUrl}/blog/${blog.slug}</loc>
							<changefreq>weekly</changefreq>
							<lastmod>${(blog.updatedAt || blog.publishedAt)?.toISOString()}</lastmod>
							<priority>0.6</priority>
						</url>
					`;
				})
				.join('')}
		</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
