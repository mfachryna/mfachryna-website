import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function GET({ url }) {
	try {
		const featured = url.searchParams.get('featured') === 'true';
		const page = Number(url.searchParams.get('page') || '1');
		const limit = Number(url.searchParams.get('limit') || '6');
		const skip = (page - 1) * limit;

		const where = featured ? { featured: true } : {};

		const projects = await prisma.project.findMany({
			where,
			skip,
			take: limit,
			include: {
				tags: true
			},
			orderBy: [{ featured: 'desc' }, { order: 'asc' }]
		});

		const projectsWithImages = projects.map((project) => ({
			...project,
			images: project.images ?? [],
			thumbnailUrl: project.thumbnailUrl ?? null
		}));

		const totalItems = await prisma.project.count({
			where
		});

		return json({
			projects: projectsWithImages,
			pagination: {
				page,
				limit,
				totalItems,
				totalPages: Math.ceil(totalItems / limit)
			},
			success: true
		});
	} catch (error) {
		console.error('Error fetching projects:', error);
		return json(
			{
				error: 'Failed to fetch projects',
				success: false,
				projects: []
			},
			{ status: 500 }
		);
	}
}
