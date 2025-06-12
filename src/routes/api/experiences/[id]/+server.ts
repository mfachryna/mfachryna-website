import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;
    const experience = await prisma.experience.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        tags: true
      }
    });

    if (!experience) {
      return json({ error: 'Experience not found' }, { status: 404 });
    }

    return json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
};