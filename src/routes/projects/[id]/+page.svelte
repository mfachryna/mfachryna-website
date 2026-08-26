<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import SEO from '$lib/components/seo.svelte';

	export let data: PageData;

	$: project = data.project;

	/* Tiptap HTML from the CMS, rendered server-side — not markdown. */
	$: content = project.content ?? '';
	$: gallery = (project.images ?? []).filter(Boolean);

	const formatDate = (date: string | Date | null) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
	};

	$: structuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: project.title,
		description: project.description,
		image: project.imageUrl,
		url: $page.url.href,
		applicationCategory: 'WebApplication',
		author: { '@type': 'Person', name: 'Muhammad Fachry Noorchoolish Arif' }
	};
</script>

<SEO
	title={project.title + " | Muhammad Fachry's Projects"}
	description={project.description}
	image={project.imageUrl || undefined}
	url={$page.url.href}
	type="website"
	{structuredData}
>
	<div class="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 sm:px-8">
		<a
			href="/projects"
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
			Back to all projects
		</a>

		<div class="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
			<!-- ===== spec rail ===== -->
			<aside class="mb-10 lg:mb-0">
				<div class="lg:sticky lg:top-28">
					<dl
						class="border-border/60 flex flex-wrap gap-x-6 gap-y-4 border-b pb-5 text-sm lg:block lg:space-y-5 lg:border-b-0 lg:pb-0"
					>
						{#if project.tags?.length}
							<div class="w-full lg:w-auto">
								<dt class="text-muted-foreground/70 text-xs tracking-widest uppercase">Stack</dt>
								<dd class="mt-2 flex flex-wrap gap-1.5">
									{#each project.tags as tag (tag.id)}
										<span
											class="border-border/70 text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs"
										>
											{tag.name}
										</span>
									{/each}
								</dd>
							</div>
						{/if}

						{#if project.createdAt}
							<div>
								<dt class="text-muted-foreground/70 text-xs tracking-widest uppercase">Added</dt>
								<dd class="mt-1">{formatDate(project.createdAt)}</dd>
							</div>
						{/if}

						{#if project.featured}
							<div>
								<dt class="text-muted-foreground/70 text-xs tracking-widest uppercase">Status</dt>
								<dd class="text-primary mt-1 font-medium">Featured</dd>
							</div>
						{/if}
					</dl>

					{#if project.liveUrl || project.githubUrl}
						<div class="border-border/60 mt-6 flex flex-col gap-2.5 lg:border-t lg:pt-6">
							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="btn-modern flex items-center justify-center gap-2 text-sm"
								>
									<span>Live Demo</span>
									<svg
										class="h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							{/if}
							{#if project.githubUrl}
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="bg-secondary/80 hover:bg-secondary border-border/50 flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors"
								>
									<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path
											d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
										/>
									</svg>
									<span>Source</span>
								</a>
							{/if}
						</div>
					{/if}
				</div>
			</aside>

			<!-- ===== article ===== -->
			<article class="min-w-0">
				<header>
					<h1
						class="text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
					>
						{project.title}
					</h1>

					{#if project.subtitle}
						<p class="text-muted-foreground/80 mt-3 text-lg sm:text-xl">{project.subtitle}</p>
					{/if}

					{#if project.description}
						<p class="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl">
							{project.description}
						</p>
					{/if}

					{#if project.imageUrl}
						<figure class="border-border/60 mt-9 overflow-hidden rounded-xl border">
							<img
								src={project.imageUrl}
								alt={project.title}
								width="1200"
								height="675"
								fetchpriority="high"
								class="aspect-[16/9] w-full object-cover"
							/>
						</figure>
					{/if}
				</header>

				{#if content}
					<div class="border-border/60 mt-10 border-t pt-10">
						<div class="prose prose-lg prose-content dark:prose-invert max-w-none">
							{@html content}
						</div>
					</div>
				{/if}

				{#if gallery.length}
					<section class="border-border/60 mt-10 border-t pt-10">
						<h2 class="text-2xl font-bold tracking-tight">Gallery</h2>
						<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
							{#each gallery as image, i (image)}
								<a
									href={image}
									target="_blank"
									rel="noopener noreferrer"
									class="border-border/60 hover:border-primary/60 group block overflow-hidden rounded-xl border transition-colors"
								>
									<img
										src={image}
										alt="{project.title} screenshot {i + 1}"
										width="800"
										height="450"
										loading="lazy"
										decoding="async"
										class="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
									/>
								</a>
							{/each}
						</div>
					</section>
				{/if}
			</article>
		</div>
	</div>
</SEO>
