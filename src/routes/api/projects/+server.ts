import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function GET({ url }) {
	try {
		const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
		const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') || '6')));
		const skip = (page - 1) * limit;

		const [projectsRaw, totalProjects] = await Promise.all([
			prisma.project.findMany({
				skip,
				take: limit,
				include: { tags: true },
				orderBy: { order: 'asc' }
			}),
			prisma.project.count()
		]);

		const projects = projectsRaw.map((project) => ({
			...project,
			images: project.images ?? [],
			thumbnailUrl: project.thumbnailUrl ?? null
		}));

		return json({
			success: true,
			projects,
			pagination: {
				page,
				limit,
				totalItems: totalProjects,
				totalPages: Math.ceil(totalProjects / limit)
			}
		});
	} catch (error) {
		console.error('Error loading projects:', error);
		return json(
			{
				success: false,
				projects: [],
				pagination: { page: 1, limit: 6, totalItems: 0, totalPages: 0 },
				error: 'Failed to load projects'
			},
			{ status: 500 }
		);
	}
}
