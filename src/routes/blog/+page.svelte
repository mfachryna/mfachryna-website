<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import SEO from '$lib/components/seo.svelte';
	import BlogCard from '$lib/components/blog-card.svelte';
	import { t } from '$lib/i18n/store';
	import { getBlogLocale } from '$lib/i18n/content';

	export let data: PageData;

	let blogs = data.blogs;
	let pagination = data.pagination;
	let error = data.error;

	let currentPage = pagination.page;
	let totalPages = pagination.totalPages;

	let selectedLanguage: string = 'all';

	$: availableLanguages = [
		{ code: 'all', label: $t('blog.filterAll'), flag: '🌐' },
		{ code: 'en', label: 'English', flag: '🇬🇧' },
		{ code: 'id', label: 'Indonesia', flag: '🇮🇩' }
	];

	$: filteredBlogs = selectedLanguage === 'all'
		? blogs
		: blogs.filter((b) => {
				const loc = getBlogLocale(b);
				return loc?.code === selectedLanguage;
		  });

	/**
	 * Editorial layout: the first post on page 1 takes a wide hero slot, the
	 * rest fall into a compact grid. A "featured" slot only makes sense on the
	 * first page — on page 2+ everything renders as a uniform grid.
	 */
	$: showHero = currentPage === 1 && filteredBlogs.length > 0;
	$: heroPost = showHero ? (filteredBlogs.find((b) => b.featured) ?? filteredBlogs[0]) : null;
	$: gridPosts = showHero ? filteredBlogs.filter((b) => b.id !== heroPost?.id) : filteredBlogs;

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
	<header class="border-border/60 mb-10 border-b pb-8">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div>
				<span class="text-muted-foreground mb-3 block text-xs font-medium tracking-[0.2em] uppercase">
					{$t('blog.latestInsights')}
				</span>
				<h1 class="gradient-text text-4xl font-bold tracking-tight sm:text-5xl">
					{$t('blog.blogPosts')}
				</h1>
				<p class="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
					{$t('blog.blogDesc')}
				</p>
			</div>

			<!-- Language Filter Pills -->
			<div class="flex flex-wrap items-center gap-2">
				{#each availableLanguages as lang}
					<button
						type="button"
						class="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 {selectedLanguage === lang.code
							? 'bg-primary text-primary-foreground shadow-sm'
							: 'bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground border border-border/60'}"
						onclick={() => (selectedLanguage = lang.code)}
					>
						<span>{lang.flag}</span>
						<span>{lang.label}</span>
					</button>
				{/each}
			</div>
		</div>
	</header>

	{#if error}
		<div class="border-destructive/40 bg-destructive/10 mb-10 rounded-xl border p-5">
			<p class="text-destructive font-medium">{error}</p>
			<button
				class="border-destructive/40 hover:bg-destructive/20 mt-3 rounded-lg border px-4 py-2 text-sm transition-colors"
				onclick={() => loadPage(currentPage)}
			>
				{$t('common.tryAgain')}
			</button>
		</div>
	{/if}

	{#if filteredBlogs.length === 0 && !error}
		<div class="border-border/60 rounded-2xl border border-dashed py-20 text-center">
			<p class="text-muted-foreground text-lg">{$t('blog.noBlogs')}</p>
			<p class="text-muted-foreground/70 mt-1 text-sm">{$t('blog.checkBackSoon')}</p>
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
					{$t('common.previous')}
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
					{$t('common.next')}
				</Button>
			</div>
		</nav>
	{/if}
</main>
