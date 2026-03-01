import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
  try {
    const page = Number(url.searchParams.get('page') || '1');
    const limit = 6; // 6 projects per page
    const skip = (page - 1) * limit;

    const projects = await prisma.project.findMany({
      include: {
        tags: true,
      },
      skip,
      take: limit,
      orderBy: {
        order: 'asc',
      },
    });

    const totalProjects = await prisma.project.count();

    return { 
      projects,
      pagination: {
        page,
        limit,
        totalItems: totalProjects,
        totalPages: Math.ceil(totalProjects / limit),
      }
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return { 
      projects: [],
      pagination: {
        page: 1,
        limit: 6,
        totalItems: 0,
        totalPages: 0,
      },
      error: 'Failed to load projects' 
    };
  }
};