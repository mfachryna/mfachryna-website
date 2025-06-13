<script lang="ts">
	import PageTitle from '../page-title.svelte';
	import Pil from '../pil.svelte';
	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';
	import type { BlogWithTags } from '$lib/types/blog';

	export let data: {
		blogs: BlogWithTags[];
		pagination?: {
			page: number;
			limit: number;
			totalItems: number;
			totalPages: number;
		};
	} = {
		blogs: []
	};

	let blogs = data.blogs;
	let isLoading = false;
	let error: string | null = null;
	let visibleBlogs = 3;

	let currentPage = data.pagination?.page || 1;
	let limit = data.pagination?.limit || 9;
	let totalItems = data.pagination?.totalItems || 0;
	let totalPages = data.pagination?.totalPages || 0;

	$: showLoadMore = visibleBlogs < blogs.length || currentPage < totalPages;
	$: blogSchema = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		headline: "Fachry's Blog",
		author: {
			'@type': 'Person',
			name: 'Muhammad Fachry Noorchoolish Arif'
		},
		blogPost: blogs.map((blog) => ({
			'@type': 'BlogPosting',
			headline: blog.title,
			description: blog.description,
			datePublished: blog.publishedAt,
			url: `/blog/${blog.slug}`
		}))
	};

	function loadMoreBlogs() {
		if (visibleBlogs < blogs.length) {
			visibleBlogs += 3;
		} else if (currentPage < totalPages) {
			fetchMoreBlogs(currentPage + 1);
		}

		visibleBlogs = visibleBlogs;
	}

	async function fetchMoreBlogs(page: number) {
		try {
			isLoading = true;

			const response = await fetch(`/api/blogs?page=${page}&limit=${limit}`);

			if (!response.ok) {
				throw new Error('Failed to fetch more blogs');
			}

			const result = await response.json();

			if (result.success) {
				blogs = [...blogs, ...result.blogs];
				currentPage = result.pagination.page;
				totalItems = result.pagination.totalItems;
				totalPages = result.pagination.totalPages;

				visibleBlogs += 3;
			} else {
				error = result.error || 'Failed to fetch more blogs';
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			console.error('Error fetching more blogs:', err);
		} finally {
			isLoading = false;
		}
	}

	async function fetchBlogs(page: number = 1) {
		try {
			isLoading = true;

			const response = await fetch(`/api/blogs?page=${page}&limit=${limit}`);

			if (!response.ok) {
				throw new Error('Failed to fetch blogs');
			}

			const result = await response.json();

			if (result.success) {
				blogs = result.blogs;
				currentPage = result.pagination.page;
				totalItems = result.pagination.totalItems;
				totalPages = result.pagination.totalPages;

				visibleBlogs = Math.min(3, blogs.length);
			} else {
				error = result.error || 'Failed to fetch blogs';
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			console.error('Error fetching blogs:', err);
		} finally {
			isLoading = false;
		}
	}

	function retryFetch() {
		error = null;
		fetchBlogs(1);
	}

	onMount(() => {
		if (blogs.length === 0) {
			fetchBlogs();
		} else {
			visibleBlogs = Math.min(3, blogs.length);
		}
	});
</script>

<svelte:head>
	<script type="application/ld+json">
        {JSON.stringify(blogSchema)}
	</script>
</svelte:head>

<section
	class="blog-section bg-background relative h-auto w-full"
	id="blogs"
	aria-labelledby="blogs-title"
>
	<div class="mx-auto w-full px-6 py-16 sm:px-10 md:px-16 lg:px-28">
		<PageTitle title="blogs" textColor="text-foreground" line="bg-foreground" id="blogs-title" />

		{#if isLoading && blogs.length === 0}
			<div class="flex justify-center py-10">
				<div
					class="border-foreground h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"
				></div>
			</div>
		{:else if error}
			<div class="mt-8 text-center">
				<p class="mb-4 text-red-500">{error}</p>
				<button
					class="bg-foreground text-background hover:bg-foreground/90 rounded px-4 py-2 transition-colors"
					on:click={retryFetch}
				>
					Try Again
				</button>
			</div>
		{:else if blogs.length === 0}
			<p class="text-foreground mt-8 text-center">No blog posts found.</p>
		{:else}
			<div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each blogs.slice(0, visibleBlogs) as blog, i (blog.id)}
					<a
						href={`/blog/${blog.slug}`}
						class="border-primary/50 bg-foreground blog-card cursor-pointer rounded-xl border p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
						style="animation-delay: {i * 100}ms;"
					>
						{#if blog.imageUrl}
							<img
								src={blog.imageUrl}
								alt={blog.title}
								class="mb-4 h-40 w-full rounded object-cover"
								loading="lazy"
							/>
						{:else if blog.images && blog.images.length > 0}
							<img
								src={blog.images[0]}
								alt={blog.title}
								class="mb-4 h-40 w-full rounded object-cover"
								loading="lazy"
							/>
						{/if}

						<h3 class="text-background text-center text-lg font-semibold sm:text-xl">
							{blog.title}
						</h3>
						<p class="text-background/80 mb-2 text-center text-xs sm:text-sm">
							{new Date(blog.publishedAt || '').toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</p>
						<p class="text-background mb-4 line-clamp-3 text-sm">
							{blog.excerpt || blog.description}
						</p>

						<div class="mb-4 flex flex-wrap gap-2">
							{#if blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0}
								{#each blog.tags as tag}
									<Pil border="border-background/50" text="text-background/50">
										{typeof tag === 'string' ? tag : tag.name}
									</Pil>
								{/each}
							{:else}
								<Pil border="border-background/50" text="text-background/50">Uncategorized</Pil>
							{/if}
						</div>
					</a>
				{/each}
			</div>

			{#if isLoading && blogs.length > 0}
				<div class="flex justify-center py-6">
					<div
						class="border-foreground h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"
					></div>
				</div>
			{/if}

			{#if showLoadMore && !isLoading}
				<div class="relative z-20 mt-10 text-center">
					<Button class="z-20" variant="outline_background" onclick={() => loadMoreBlogs()}>
						{#if visibleBlogs < blogs.length}
							Show More Posts ({blogs.length - visibleBlogs} more)
						{:else}
							Load More Posts
						{/if}
					</Button>
				</div>
			{/if}

			{#if blogs.length > 0}
				<div class="text-foreground/60 mt-4 text-center text-sm">
					Showing {Math.min(visibleBlogs, blogs.length)} of {totalItems} blog posts
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	/* Add entrance animations for blog cards */
	.blog-card {
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Optimize performance */
	.blog-card {
		will-change: transform;
		contain: content;
	}
</style>
