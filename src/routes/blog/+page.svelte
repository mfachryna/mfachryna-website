<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import SEO from '$lib/components/seo.svelte';
	import BlogCard from '$lib/components/blog-card.svelte';

	export let data: PageData;

	let blogs = data.blogs;
	let pagination = data.pagination;
	let error = data.error;

	let currentPage = pagination.page;
	let totalPages = pagination.totalPages;

	/**
	 * Editorial layout: the first post on page 1 takes a wide hero slot, the
	 * rest fall into a compact grid. A "featured" slot only makes sense on the
	 * first page — on page 2+ everything renders as a uniform grid.
	 */
	$: showHero = currentPage === 1 && blogs.length > 0;
	$: heroPost = showHero ? (blogs.find((b) => b.featured) ?? blogs[0]) : null;
	$: gridPosts = showHero ? blogs.filter((b) => b.id !== heroPost?.id) : blogs;

	$: structuredData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		headline: 'Blog Posts by Muhammad Fachry',
		description:
			'Articles on web development, programming, and technology by Muhammad Fachry Noorchoolish Arif.',
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: blogs.map((blog, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				url: `https://mfachryna.my.id/blog/${blog.slug}`
			}))
		}
	};

	async function loadPage(page: number) {
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		window.history.pushState({}, '', url);

		try {
			const res = await fetch(`/api/blogs?page=${page}&limit=${pagination.limit}`);
			const payload = await res.json();

			if (payload.success) {
				blogs = payload.blogs;
				pagination = payload.pagination;
				currentPage = page;
				window.scrollTo(0, 0);
			} else {
				error = payload.error;
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load blogs';
		}
	}
</script>

<SEO
	title="Blog | Muhammad Fachry Noorchoolish Arif"
	description="Explore articles on web development, programming, and technology written by Muhammad Fachry."
	keywords="blog, web development, programming, tech articles, software engineering"
	{structuredData}
/>

<main class="mx-auto max-w-6xl px-6 pt-32 pb-24 sm:px-8">
	<!-- masthead -->
	<header class="border-border/60 mb-12 border-b pb-10">
		<span class="text-muted-foreground mb-3 block text-xs font-medium tracking-[0.2em] uppercase">
			Latest Insights
		</span>
		<h1 class="gradient-text text-4xl font-bold tracking-tight sm:text-5xl">Blog Posts</h1>
		<p class="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
			Exploring ideas, sharing knowledge, and documenting my journey in software development.
		</p>
	</header>

	{#if error}
		<div class="border-destructive/40 bg-destructive/10 mb-10 rounded-xl border p-5">
			<p class="text-destructive font-medium">{error}</p>
			<button
				class="border-destructive/40 hover:bg-destructive/20 mt-3 rounded-lg border px-4 py-2 text-sm transition-colors"
				onclick={() => loadPage(currentPage)}
			>
				Try again
			</button>
		</div>
	{/if}

	{#if blogs.length === 0 && !error}
		<div class="border-border/60 rounded-2xl border border-dashed py-20 text-center">
			<p class="text-muted-foreground text-lg">No blog posts yet.</p>
			<p class="text-muted-foreground/70 mt-1 text-sm">Check back soon.</p>
		</div>
	{:else}
		{#if heroPost}
			<div class="mb-10">
				<BlogCard blog={heroPost} variant="hero" />
			</div>
		{/if}

		{#if gridPosts.length}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each gridPosts as blog, i (blog.id)}
					<BlogCard {blog} variant="compact" index={i} />
				{/each}
			</div>
		{/if}
	{/if}

	{#if totalPages > 1}
		<nav class="mt-16 flex justify-center" aria-label="Pagination">
			<div class="flex items-center gap-2">
				<Button variant="outline" disabled={currentPage === 1} onclick={() => loadPage(currentPage - 1)}>
					Previous
				</Button>
				{#each Array(totalPages) as _, i}
					<Button
						variant={currentPage === i + 1 ? 'default' : 'outline'}
						onclick={() => loadPage(i + 1)}
					>
						{i + 1}
					</Button>
				{/each}
				<Button
					variant="outline"
					disabled={currentPage === totalPages}
					onclick={() => loadPage(currentPage + 1)}
				>
					Next
				</Button>
			</div>
		</nav>
	{/if}
</main>
