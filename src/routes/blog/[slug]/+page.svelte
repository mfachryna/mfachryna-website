<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import SEO from '$lib/components/seo.svelte';
	import { t, currentLocale } from '$lib/i18n/store';
	import { localizeDate } from '$lib/i18n/content';

	export let data: PageData;

	$: blog = data.blog;
	$: toc = data.toc ?? [];

	/* Tiptap HTML from the CMS, rendered server-side — not markdown.
	   Heading ids are injected in +page.server.ts so the rail can link to them. */
	$: content = blog.content ?? '';

	$: structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: blog.title,
		description: blog.description,
		image: blog.imageUrl,
		datePublished: blog.publishedAt,
		dateModified: blog.updatedAt ?? blog.publishedAt,
		mainEntityOfPage: $page.url.href,
		author: { '@type': 'Person', name: 'Muhammad Fachry Noorchoolish Arif' },
		publisher: { '@type': 'Person', name: 'Muhammad Fachry Noorchoolish Arif' }
	};
</script>

<SEO
	title={blog.title + " | Muhammad Fachry's Blog"}
	description={blog.description}
	image={blog.imageUrl || undefined}
	url={$page.url.href}
	type="article"
	{structuredData}
>
	<div class="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 sm:px-8">
		<a
			href="/blog"
			class="text-muted-foreground hover:text-primary group mb-10 inline-flex items-center gap-2 text-sm transition-colors"
		>
			<svg
				class="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			{$t('blog.backToAll')}
		</a>

		<div class="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
			<!-- ===== meta rail ===== -->
			<aside class="mb-10 lg:mb-0">
				<div class="lg:sticky lg:top-28">
					<!-- on mobile this collapses to a horizontal strip -->
					<dl
						class="border-border/60 flex flex-wrap gap-x-6 gap-y-3 border-b pb-5 text-sm lg:block lg:space-y-4 lg:border-b-0 lg:pb-0"
					>
						{#if blog.publishedAt}
							<div>
								<dt class="text-muted-foreground/70 text-xs tracking-widest uppercase">
									{$t('blog.published')}
								</dt>
								<dd class="mt-1">
									<time datetime={new Date(blog.publishedAt).toISOString()}>
										{localizeDate(blog.publishedAt, $currentLocale)}
									</time>
								</dd>
							</div>
						{/if}

						{#if blog.readingTime}
							<div>
								<dt class="text-muted-foreground/70 text-xs tracking-widest uppercase">
									{$t('blog.reading')}
								</dt>
								<dd class="mt-1">{blog.readingTime} {$t('blog.minRead')}</dd>
							</div>
						{/if}

						{#if blog.tags?.length}
							<div class="w-full lg:w-auto">
								<dt class="text-muted-foreground/70 text-xs tracking-widest uppercase">
									{$t('blog.topics')}
								</dt>
								<dd class="mt-2 flex flex-wrap gap-1.5">
									{#each blog.tags as tag (tag.id)}
										<span
											class="border-border/70 text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs"
										>
											{tag.name}
										</span>
									{/each}
								</dd>
							</div>
						{/if}
					</dl>

					{#if toc.length > 1}
						<nav class="border-border/60 mt-6 hidden border-t pt-6 lg:block" aria-label="On this page">
							<p class="text-muted-foreground/70 mb-3 text-xs tracking-widest uppercase">
								{$t('blog.onThisPage')}
							</p>
							<ul class="space-y-2 text-sm">
								{#each toc as item (item.id)}
									<li class={item.level === 3 ? 'pl-3' : ''}>
										<a
											href={`#${item.id}`}
											class="text-muted-foreground hover:text-primary block leading-snug transition-colors"
										>
											{item.text}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					{/if}
				</div>
			</aside>

			<!-- ===== article ===== -->
			<article class="min-w-0">
				<header>
					<h1
						class="text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
					>
						{blog.title}
					</h1>

					{#if blog.description}
						<p class="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl">
							{blog.description}
						</p>
					{/if}

					{#if blog.imageUrl}
						<figure class="border-border/60 mt-9 overflow-hidden rounded-xl border">
							<img
								src={blog.imageUrl}
								alt={blog.title}
								width="1200"
								height="675"
								fetchpriority="high"
								class="aspect-[16/9] w-full object-cover"
							/>
						</figure>
					{/if}
				</header>

				<div class="border-border/60 mt-10 border-t pt-10">
					{#if content}
						<div class="prose prose-lg prose-content dark:prose-invert max-w-none">
							{@html content}
						</div>
					{:else}
						<p class="text-muted-foreground italic">{$t('blog.noContent')}</p>
					{/if}
				</div>
			</article>
		</div>
	</div>
</SEO>
