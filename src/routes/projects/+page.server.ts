import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return { 
      projects 
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return { 
      projects: [],
      error: 'Failed to load projects' 
    };
  }
};