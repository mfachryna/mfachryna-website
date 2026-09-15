<script lang="ts">
	import BlogCard from '$lib/components/blog-card.svelte';
	import BlogSkeleton from '$lib/components/skeletons/blog-skeleton.svelte';
	import PageTitle from '../page-title.svelte';
	import Pil from '../pil.svelte';
	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';
	import type { BlogWithTags } from '$lib/types/blog';
	import { t } from '$lib/i18n/store';

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
					>{$t('blog.badge')}</span
				>
				<h2 class="text-responsive-xl gradient-text font-bold">{$t('blog.title')}</h2>
			</div>
			<div
				class="from-primary via-accent to-primary mx-auto h-1 w-24 rounded-full bg-gradient-to-r"
			></div>
			<p class="text-muted-foreground mx-auto max-w-2xl">
				{$t('blog.subtitle')}
			</p>
		</div>

		{#if isLoading && blogs.length === 0}
			<!-- Matches the real card grid so nothing shifts when data lands. -->
			<BlogSkeleton rows={3} />
		{:else if error}
			<div class="py-16 text-center">
				<div class="card-modern mx-auto max-w-md text-center">
					<p class="text-destructive mb-4">{error}</p>
					<button class="btn-modern" onclick={retryFetch}> {$t('common.tryAgain')} </button>
				</div>
			</div>
		{:else if blogs.length === 0}
			<div class="py-16 text-center">
				<div class="card-modern mx-auto max-w-md text-center">
					<p class="text-muted-foreground">{$t('blog.noBlogs')}</p>
				</div>
			</div>
		{:else}
			<div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{#each blogs.slice(0, visibleBlogs) as blog, i (blog.id)}
					<BlogCard {blog} variant="compact" index={i} />
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
					<button class="btn-modern group" onclick={loadMoreBlogs}>
						<span class="flex items-center space-x-2">
							<span>
								{#if visibleBlogs < blogs.length}
									{$t('blog.showMore')} ({blogs.length - visibleBlogs})
								{:else}
									{$t('blog.showMore')}
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

			<div class="mt-8 text-center">
				<a href="/blog" class="btn-modern-outline inline-flex items-center space-x-2">
					<span>{$t('blog.viewAll')}</span>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
					</svg>
				</a>
			</div>

			{#if blogs.length > 0}
				<div class="mt-8 text-center">
					<span class="text-muted-foreground text-sm">
						{$t('common.showing')} {Math.min(visibleBlogs, blogs.length)} {$t('common.of')} {totalItems} {$t('common.articles')}
					</span>
				</div>
			{/if}
		{/if}
	</div>
</section>
