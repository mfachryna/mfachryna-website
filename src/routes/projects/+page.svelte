<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import type { ProjectWithTags } from '$lib/types/project';
	import SEO from '$lib/components/seo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/i18n/store';

	export let data;
	let projects: ProjectWithTags[] = data.projects;
	let pagination = data.pagination;
	let error = data.error;

	let currentPage = pagination.page;
	let totalPages = pagination.totalPages;

	/** See blog/+page.svelte — hero slot only makes sense on page 1. */
	$: showHero = currentPage === 1 && projects.length > 0;
	$: heroProject = showHero ? (projects.find((p) => p.featured) ?? projects[0]) : null;
	$: gridProjects = showHero ? projects.filter((p) => p.id !== heroProject?.id) : projects;

	async function loadPage(page: number) {
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		window.history.pushState({}, '', url);

		try {
			const res = await fetch(`/api/projects?page=${page}&limit=${pagination.limit}`);
			const result = await res.json();

			if (result.success) {
				projects = result.projects;
				pagination = result.pagination;
				currentPage = page;
				window.scrollTo(0, 0);
			} else {
				error = result.error;
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load projects';
		}
	}
</script>

<SEO
	title="Projects | Muhammad Fachry Noorchoolish Arif"
	description="Explore the web development projects and software engineering work of Muhammad Fachry Noorchoolish Arif."
/>

<main class="mx-auto max-w-6xl px-6 pt-32 pb-24 sm:px-8">
	<header class="border-border/60 mb-12 border-b pb-10">
		<span class="text-muted-foreground mb-3 block text-xs font-medium tracking-[0.2em] uppercase">
			{$t('common.portfolio')}
		</span>
		<h1 class="gradient-text text-4xl font-bold tracking-tight sm:text-5xl">
			{$t('work.title')}
		</h1>
		<p class="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
			{$t('work.subtitle')}
		</p>
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

	{#if projects.length === 0 && !error}
		<div class="border-border/60 rounded-2xl border border-dashed py-20 text-center">
			<p class="text-muted-foreground text-lg">{$t('work.noProjects')}</p>
		</div>
	{:else}
		{#if heroProject}
			<div class="mb-10">
				<ProjectCard project={heroProject} variant="hero" index={0} />
			</div>
		{/if}

		{#if gridProjects.length}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each gridProjects as project, i (project.id)}
					<ProjectCard {project} variant="compact" index={i} />
				{/each}
			</div>
		{/if}
	{/if}

	{#if totalPages > 1}
		<nav class="mt-16 flex justify-center" aria-label="Pagination">
			<div class="flex items-center gap-2">
				<Button
					variant="outline"
					disabled={currentPage === 1}
					onclick={() => loadPage(currentPage - 1)}
				>
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
