import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { BLOGS } from '$env/static/private';


export const load: PageServerLoad = async ({ url }) => {
	try {
		const expPage = Math.max(1, Number(url.searchParams.get('expPage') || '1'));
		const expLimit = Math.min(50, Math.max(1, Number(url.searchParams.get('expLimit') || '10')));
		const expSkip = (expPage - 1) * expLimit;

		const experiences = await prisma.experience.findMany({
			skip: expSkip,
			take: expLimit,
			include: {
				tags: true
			},
			orderBy: {
				startDate: 'desc'
			}
		});

		const totalExperiences = await prisma.experience.count();

		const projPage = Number(url.searchParams.get('projPage') || '1');
		const projLimit = 6;
		const projSkip = (projPage - 1) * projLimit;

		const projectsRaw = await prisma.project.findMany({
			skip: projSkip,
			take: projLimit,
			include: {
				tags: true
			},
			orderBy: {
				order: 'asc'
			}
		});

		const projects = projectsRaw.map((project) => ({
			...project,
			images: project.images ?? [],
			thumbnailUrl: project.thumbnailUrl ?? null
		}));

		const totalProjects = await prisma.project.count();

		const blogsRaw = await prisma.blog.findMany({
			where: {
				published: true
			},
			take: 9,
			include: {
				tags: true
			},
			orderBy: {
				publishedAt: 'desc'
			}
		});

		const blogs = blogsRaw.map((blog) => ({
			...blog,
			images: blog.images ?? [],
			imageUrl: blog.imageUrl ?? null
		}));

		const totalBlogs = await prisma.blog.count({
			where: {
				published: true
			}
		});

		return {
			experiences,
			experiencePagination: {
				page: expPage,
				limit: expLimit,
				totalItems: totalExperiences,
				totalPages: Math.ceil(totalExperiences / expLimit)
			},
			projects,
			projectPagination: {
				page: projPage,
				limit: projLimit,
				totalItems: totalProjects,
				totalPages: Math.ceil(totalProjects / projLimit)
			},
			blogs: {
				blogs,
				pagination: {
					page: 1,
					limit: 9,
					totalItems: totalBlogs,
					totalPages: Math.ceil(totalBlogs / 9)
				}
			},
			showBlogs: BLOGS === 'true'
		};
	} catch (error) {
		console.error('Error loading page data:', error);
		return {
			experiences: [],
			experiencePagination: {
				page: 1,
				limit: 10,
				totalItems: 0,
				totalPages: 0
			},
			projects: [],
			projectPagination: {
				page: 1,
				limit: 6,
				totalItems: 0,
				totalPages: 0
			},
			blogs: {
				blogs: [],
				pagination: {
					page: 1,
					limit: 9,
					totalItems: 0,
					totalPages: 0
				}
			},
			error: 'Failed to load page data'
		};
	}
};
