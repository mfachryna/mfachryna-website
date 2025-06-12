import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const page = Number(url.searchParams.get('page') || '1');
	const limit = Number(url.searchParams.get('limit') || '10');
	const skip = (page - 1) * limit;

	try {
		const [experiences, count] = await Promise.all([
			prisma.experience.findMany({
				include: { tags: true },
				orderBy: { startDate: 'desc' },
				skip,
				take: limit
			}),
			prisma.experience.count()
		]);

		return json({
			data: experiences,
			pagination: {
				page,
				limit,
				totalItems: count,
				totalPages: Math.ceil(count / limit)
			}
		});
	} catch (error) {
		console.error('Error fetching experiences:', error);
		return json({ error: 'Failed to fetch experiences' }, { status: 500 });
	}
};
