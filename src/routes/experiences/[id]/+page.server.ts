import { error, isHttpError } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { CACHE_CONTROL } from '$lib/server/cache';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const experienceId = Number(params.id);

	if (!Number.isInteger(experienceId) || experienceId < 1) {
		throw error(404, 'Experience not found');
	}

	try {
		const experience = await prisma.experience.findFirst({
			where: { id: experienceId, isHidden: false },
			include: { tags: true }
		});

		if (!experience) {
			throw error(404, 'Experience not found');
		}

		setHeaders({ 'cache-control': CACHE_CONTROL });

		return { experience };
	} catch (err) {
		if (isHttpError(err)) throw err;

		console.error('Error loading experience:', err);
		throw error(500, 'Error loading experience');
	}
};
