import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
  try {
    const page = Number(url.searchParams.get('page') || '1');
    const limit = 9;
    const skip = (page - 1) * limit;

    const blogs = await prisma.blog.findMany({
      where: {
        published: true
      },
      skip,
      take: limit,
      include: {
        tags: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    const totalBlogs = await prisma.blog.count({
      where: { published: true }
    });

    return {
      blogs,
      pagination: {
        page,
        limit,
        totalItems: totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
      }
    };
  } catch (error) {
    console.error('Error loading blogs:', error);
    return {
      blogs: [],
      pagination: {
        page: 1,
        limit: 9,
        totalItems: 0,
        totalPages: 0,
      },
      error: 'Failed to load blogs'
    };
  }
};