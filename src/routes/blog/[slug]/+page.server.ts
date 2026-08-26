import { error, isHttpError } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { CACHE_CONTROL } from '$lib/server/cache';
import { buildToc } from '$lib/server/toc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const { slug } = params;

	try {
		const blog = await prisma.blog.findUnique({
			where: { slug, published: true },
			include: { tags: true }
		});

		if (!blog) {
			throw error(404, 'Blog post not found');
		}

		setHeaders({ 'cache-control': CACHE_CONTROL });

		// Inject heading ids server-side and hand the rail its outline.
		const { html, toc } = buildToc(blog.content);

		return { blog: { ...blog, content: html }, toc };
	} catch (err) {
		// A thrown 404 must not be swallowed and reported as a 500 — that told
		// crawlers the server was broken instead of that the page is gone.
		if (isHttpError(err)) throw err;

		console.error('Error loading blog post:', err);
		throw error(500, 'Error loading blog post');
	}
};
