import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { CACHE_CONTROL } from '$lib/server/cache';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	try {
		const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
		const limit = 6; // 6 projects per page
		const skip = (page - 1) * limit;

		// See the note in blog/+page.server.ts — `content` is not used by the cards.
		const [projects, totalProjects] = await Promise.all([
			prisma.project.findMany({
				omit: { content: true },
				include: { tags: true },
				skip,
				take: limit,
				orderBy: { order: 'asc' }
			}),
			prisma.project.count()
		]);

		setHeaders({ 'cache-control': CACHE_CONTROL });

		return {
			projects,
			pagination: {
				page,
				limit,
				totalItems: totalProjects,
				totalPages: Math.ceil(totalProjects / limit)
			}
		};
	} catch (error) {
		console.error('Error loading projects:', error);
		return {
			projects: [],
			pagination: {
				page: 1,
				limit: 6,
				totalItems: 0,
				totalPages: 0
			},
			error: 'Failed to load projects'
		};
	}
};
