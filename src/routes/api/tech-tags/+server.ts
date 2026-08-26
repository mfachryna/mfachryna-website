import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { CACHE_HEADERS_LONG } from '$lib/server/cache';

export async function GET() {
    const tags = await prisma.tag.findMany({
        where: { isTech: true, iconUrl: { not: null } },
        select: { name: true, iconUrl: true }
    });
    return json(tags, { headers: CACHE_HEADERS_LONG });
}