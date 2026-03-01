import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const experienceId = Number(params.id);
  
  if (isNaN(experienceId)) {
    throw error(404, 'Experience not found');
  }
  
  try {
    const experience = await prisma.experience.findUnique({
      where: {
        id: experienceId,
        isHidden: false
      },
      include: {
        tags: true
      }
    });
    
    if (!experience) {
      throw error(404, 'Experience not found');
    }
    
    return {
      experience
    };
  } catch (err) {
    console.error('Error loading experience:', err);
    throw error(500, 'Error loading experience');
  }
};
