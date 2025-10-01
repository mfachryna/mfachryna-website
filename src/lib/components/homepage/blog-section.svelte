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

<section class="section-padding relative" id="blogs" aria-labelledby="blogs-title">
	<div class="container-modern relative z-10">
		<div class="mb-16 space-y-4 text-center">
			<div class="inline-block">
				<span class="text-muted-foreground mb-2 block text-sm font-medium tracking-widest uppercase"
					>Latest Insights</span
				>
				<h2 class="text-responsive-xl gradient-text font-bold">Blog Posts</h2>
			</div>
			<div
				class="from-primary via-accent to-primary mx-auto h-1 w-24 rounded-full bg-gradient-to-r"
			></div>
			<p class="text-muted-foreground mx-auto max-w-2xl">
				Exploring ideas, sharing knowledge, and documenting my journey in software development
			</p>
		</div>

		{#if isLoading && blogs.length === 0}
			<div class="flex justify-center py-16">
				<div class="loading-pulse">
					<div
						class="border-primary/20 border-t-primary h-12 w-12 animate-spin rounded-full border-4"
					></div>
				</div>
			</div>
		{:else if error}
			<div class="py-16 text-center">
				<div class="card-modern mx-auto max-w-md text-center">
					<p class="text-destructive mb-4">{error}</p>
					<button class="btn-modern" on:click={retryFetch}> Try Again </button>
				</div>
			</div>
		{:else if blogs.length === 0}
			<div class="py-16 text-center">
				<div class="card-modern mx-auto max-w-md text-center">
					<p class="text-muted-foreground">No blog posts found.</p>
				</div>
			</div>
		{:else}
			<div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each blogs.slice(0, visibleBlogs) as blog, i (blog.id)}
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

							<div class="space-y-4 p-6">
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

								<p class="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
									{blog.excerpt || blog.description}
								</p>

								<div class="flex flex-wrap gap-2">
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
									class="text-primary flex translate-y-2 transform items-center text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
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

			{#if isLoading && blogs.length > 0}
				<div class="flex justify-center py-8">
					<div class="loading-pulse">
						<div
							class="border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border-3"
						></div>
					</div>
				</div>
			{/if}

			{#if showLoadMore && !isLoading}
				<div class="mt-12 text-center">
					<button class="btn-modern group" on:click={loadMoreBlogs}>
						<span class="flex items-center space-x-2">
							<span>
								{#if visibleBlogs < blogs.length}
									Show More Posts ({blogs.length - visibleBlogs} remaining)
								{:else}
									Load More Posts
								{/if}
							</span>
							<svg
								class="h-4 w-4 transition-transform group-hover:translate-y-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</span>
					</button>
				</div>
			{/if}

			{#if blogs.length > 0}
				<div class="mt-8 text-center">
					<span class="text-muted-foreground text-sm">
						Showing {Math.min(visibleBlogs, blogs.length)} of {totalItems} articles
					</span>
				</div>
			{/if}
		{/if}
	</div>
</section>

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

	.loading-pulse {
		position: relative;
	}

	.loading-pulse::after {
		content: '';
		position: absolute;
		inset: -10px;
		background: conic-gradient(from 0deg, transparent, var(--primary), transparent);
		border-radius: 50%;
		opacity: 0.3;
		animation: rotate 2s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
