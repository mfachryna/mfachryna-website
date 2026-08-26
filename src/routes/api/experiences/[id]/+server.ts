import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { CACHE_HEADERS } from '$lib/server/cache';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	// Guard the cast: a non-numeric id previously reached Prisma as NaN.
	const id = Number(params.id);
	if (!Number.isInteger(id) || id < 1) {
		return json({ error: 'Experience not found' }, { status: 404 });
	}

	try {
		const experience = await prisma.experience.findFirst({
			where: {
				id,
				// The list endpoint and the page loader both hide these; this
				// endpoint did not, so hidden rows were readable by walking ids.
				isHidden: false
			},
			include: { tags: true }
		});

		if (!experience) {
			return json({ error: 'Experience not found' }, { status: 404 });
		}

		return json(experience, { headers: CACHE_HEADERS });
	} catch (error) {
		console.error('Error fetching experience:', error);
		return json({ error: 'Failed to fetch experience' }, { status: 500 });
	}
};
