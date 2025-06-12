import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug,
        published: true
      },
      include: {
        tags: true
      }
    });
    
    if (!blog) {
      throw error(404, 'Blog post not found');
    }
    
    return {
      blog
    };
  } catch (err) {
    console.error('Error loading blog post:', err);
    throw error(500, 'Error loading blog post');
  }
};