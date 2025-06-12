import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const page = Number(url.searchParams.get('page') || '1');
		const limit = Number(url.searchParams.get('limit') || '9');
		const skip = (page - 1) * limit;

		const blogs = await prisma.blog.findMany({
			where: {
				published: true
			},
			skip,
			take: limit,
			include: {
				tags: true
			},
			orderBy: {
				publishedAt: 'desc'
			}
		});

		const totalItems = await prisma.blog.count({
			where: {
				published: true
			}
		});
		const blogsWithImages = blogs.map((blog) => ({
			...blog,
			images: blog.images ?? [],
			imageUrl: blog.imageUrl ?? null
		}));

		return json({
			success: true,
			blogs: blogsWithImages,
			pagination: {
				page,
				limit,
				totalItems,
				totalPages: Math.ceil(totalItems / limit)
			}
		});
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
