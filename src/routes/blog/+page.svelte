<script lang="ts">
	import type { PageData } from './$types';
	import Pil from '$lib/components/pil.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import SEO from '$lib/components/seo.svelte';

	export let data: PageData;

	let blogs = data.blogs;
	let pagination = data.pagination;
	let error = data.error;

	let currentPage = pagination.page;
	let totalPages = pagination.totalPages;

	const structuredData = {
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
				url: `https://yoursite.com/blog/${blog.slug}`
			}))
		}
	};

	async function loadPage(page: number) {
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		window.history.pushState({}, '', url);

		try {
			const res = await fetch(`/api/blogs?page=${page}&limit=${pagination.limit}`);
			const data = await res.json();

			if (data.success) {
				blogs = data.blogs;
				pagination = data.pagination;
				currentPage = page;
				window.scrollTo(0, 0);
			} else {
				error = data.error;
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

<main class="mx-auto max-w-6xl px-4 pt-32 pb-12">
	<div class="mb-12 space-y-4">
		<div class="inline-block">
			<span class="text-muted-foreground mb-2 block text-sm font-medium tracking-widest uppercase"
				>Latest Insights</span
			>
			<h1 class="text-4xl font-bold gradient-text">Blog Posts</h1>
		</div>
		<p class="text-muted-foreground max-w-2xl mt-4">
			Exploring ideas, sharing knowledge, and documenting my journey in software development.
		</p>
	</div>

	{#if error}
		<div class="mb-8 rounded-lg bg-red-100 p-4">
			<p class="text-red-800">{error}</p>
			<button
				class="mt-2 rounded bg-red-800 px-4 py-2 text-white hover:bg-red-700"
				onclick={() => loadPage(1)}
			>
				Try Again
			</button>
		</div>
	{/if}

	{#if blogs.length === 0 && !error}
		<p class="py-12 text-center text-lg text-muted-foreground">No blog posts found.</p>
	{:else}
		<div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each blogs as blog, i (blog.id)}
				<article class="blog-card group" style="animation-delay: {i * 100}ms;">
					<a
						href={`/blog/${blog.slug}`}
						class="card-modern hover-lift block h-full overflow-hidden"
						aria-labelledby={`blog-title-${i}`}
					>
						{#if blog.imageUrl || (blog.images && blog.images.length > 0)}
							<div class="relative aspect-video overflow-hidden">
								<img
									src={blog.imageUrl || (blog.images && blog.images[0])}
									alt={blog.title}
									class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
									loading="lazy"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								></div>
							</div>
						{/if}

						<div class="space-y-4 p-6 flex flex-col h-full">
							<time class="text-muted-foreground text-xs tracking-wider uppercase">
								{new Date(blog.publishedAt || '').toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>

							<h3
								id={`blog-title-${i}`}
								class="text-foreground group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors duration-300"
							>
								{blog.title}
							</h3>

							<p class="text-muted-foreground line-clamp-3 text-sm leading-relaxed flex-grow">
								{blog.excerpt || blog.description}
							</p>

							<div class="flex flex-wrap gap-2 mt-auto">
								{#if blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0}
									{#each blog.tags.slice(0, 3) as tag}
										<span class="badge-modern text-xs">
											{typeof tag === 'string' ? tag : tag.name}
										</span>
									{/each}
									{#if blog.tags.length > 3}
										<span class="text-muted-foreground text-xs">+{blog.tags.length - 3}</span>
									{/if}
								{:else}
									<span class="badge-modern text-xs">Uncategorized</span>
								{/if}
							</div>

							<div
								class="text-primary mt-4 flex translate-y-2 transform items-center text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<span class="mr-2">Read more</span>
								<svg
									class="h-4 w-4 transition-transform group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									></path>
								</svg>
							</div>
						</div>
					</a>
				</article>
			{/each}
		</div>

		{#if totalPages > 1}
			<div class="mt-12 flex justify-center">
				<div class="flex items-center gap-2">
					<Button
						variant="outline"
						disabled={currentPage === 1}
						onclick={() => loadPage(currentPage - 1)}
					>
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
			</div>
		{/if}
	{/if}
</main>

<style>
	.blog-card {
		opacity: 0;
		animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(40px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.blog-card {
		will-change: transform, opacity;
		contain: layout style paint;
	}
</style>
