import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { CACHE_HEADERS } from '$lib/server/cache';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
		const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') || '9')));
		const skip = (page - 1) * limit;

		// findMany + count were previously awaited one after the other, doubling
		// latency. `content` is omitted because no card renders it.
		const [blogs, totalItems] = await Promise.all([
			prisma.blog.findMany({
				where: { published: true },
				omit: { content: true },
				skip,
				take: limit,
				include: { tags: true },
				orderBy: { publishedAt: 'desc' }
			}),
			prisma.blog.count({ where: { published: true } })
		]);

		const blogsWithImages = blogs.map((blog) => ({
			...blog,
			images: blog.images ?? [],
			imageUrl: blog.imageUrl ?? null
		}));

		return json(
			{
				success: true,
				blogs: blogsWithImages,
				pagination: {
					page,
					limit,
					totalItems,
					totalPages: Math.ceil(totalItems / limit)
				}
			},
			{ headers: CACHE_HEADERS }
		);
	} catch (error) {
		console.error('Error fetching blogs:', error);
		return json(
			{
				success: false,
				error: 'Failed to fetch blogs',
				blogs: []
			},
			{ status: 500 }
		);
	}
};
