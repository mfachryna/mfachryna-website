import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { CACHE_CONTROL } from '$lib/server/cache';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	try {
		const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
		const limit = 9;
		const skip = (page - 1) * limit;

		// `content` holds the full article HTML and is never rendered in the
		// card list — omitting it keeps this query from pulling entire posts.
		const [blogs, totalBlogs] = await Promise.all([
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

		setHeaders({ 'cache-control': CACHE_CONTROL });

		return {
			blogs,
			pagination: {
				page,
				limit,
				totalItems: totalBlogs,
				totalPages: Math.ceil(totalBlogs / limit)
			}
		};
	} catch (error) {
		console.error('Error loading blogs:', error);
		return {
			blogs: [],
			pagination: {
				page: 1,
				limit: 9,
				totalItems: 0,
				totalPages: 0
			},
			error: 'Failed to load blogs'
		};
	}
};
