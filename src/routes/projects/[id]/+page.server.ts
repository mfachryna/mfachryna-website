import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const projectId = Number(params.id);
  
  if (isNaN(projectId)) {
    throw error(404, 'Project not found');
  }
  
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        tags: true
      }
    });
    
    if (!project) {
      throw error(404, 'Project not found');
    }
    
    return {
      project
    };
  } catch (err) {
    console.error('Error loading project:', err);
    throw error(500, 'Error loading project');
  }
};
