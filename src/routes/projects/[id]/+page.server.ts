import { error, isHttpError } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { CACHE_CONTROL } from '$lib/server/cache';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const projectId = Number(params.id);

	if (!Number.isInteger(projectId) || projectId < 1) {
		throw error(404, 'Project not found');
	}

	try {
		const project = await prisma.project.findUnique({
			where: { id: projectId },
			include: { tags: true }
		});

		if (!project) {
			throw error(404, 'Project not found');
		}

		setHeaders({ 'cache-control': CACHE_CONTROL });

		return { project };
	} catch (err) {
		if (isHttpError(err)) throw err;

		console.error('Error loading project:', err);
		throw error(500, 'Error loading project');
	}
};
