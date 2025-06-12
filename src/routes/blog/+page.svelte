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

<main class="mx-auto max-w-6xl px-4 py-12">
	<h1 class="mb-8 text-4xl font-bold">Blog</h1>

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
		<p class="py-12 text-center text-lg">No blog posts found.</p>
	{:else}
		<div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each blogs as blog (blog.id)}
				<a
					href={`/blog/${blog.slug}`}
					class="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
				>
					{#if blog.imageUrl}
						<div class="relative aspect-video w-full">
							<img
								src={blog.imageUrl}
								alt={blog.title}
								class="h-full w-full object-cover"
								width="400"
								height="225"
								loading="lazy"
							/>
						</div>
					{/if}

					<div class="flex flex-grow flex-col p-6">
						<h2 class="hover:text-primary mb-2 text-xl font-bold transition-colors">
							{blog.title}
						</h2>

						<p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
							{new Date(blog.publishedAt || '').toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>

						<p class="mb-6 flex-grow text-gray-600 dark:text-gray-300">
							{blog.excerpt || blog.description}
						</p>

						<div class="mt-auto flex flex-wrap gap-2">
							{#each blog.tags as tag}
								<Pil>{tag.name}</Pil>
							{/each}
						</div>
					</div>
				</a>
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
