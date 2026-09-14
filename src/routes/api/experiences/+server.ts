import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { CACHE_HEADERS } from '$lib/server/cache';

export async function GET({ url }) {
    try {
        const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
        const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') || '10')));
        const skip = (page - 1) * limit;

        const [experiences, totalExperiences] = await Promise.all([
            prisma.experience.findMany({
                where: { isHidden: false },
                skip,
                take: limit,
                include: { tags: true },
                orderBy: [
                    { endDate: { sort: 'desc', nulls: 'first' } },
                    { startDate: 'desc' }
                ]
            }),
            prisma.experience.count({
                where: { isHidden: false }
            })
        ]);

        // NOTE: `content` is deliberately NOT omitted here — experience-card.svelte
        // renders it inline in the list view.
        return json(
            {
                experiences,
                pagination: {
                    page,
                    limit,
                    totalItems: totalExperiences,
                    totalPages: Math.ceil(totalExperiences / limit)
                }
            },
            { headers: CACHE_HEADERS }
        );
    } catch (error) {
        console.error('Error loading experiences:', error);
        return json(
            { 
                experiences: [], 
                pagination: { page: 1, limit: 10, totalItems: 0, totalPages: 0 },
                error: 'Failed to load experiences' 
            },
            { status: 500 }
        );
    }
}