<script lang="ts">
  import ProjectCard from '$lib/components/project-card.svelte';
  import type { ProjectWithTags } from '$lib/types/project';
  import SEO from '$lib/components/seo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

  export let data;
  let projects: ProjectWithTags[] = data.projects;
	let pagination = data.pagination;
	let error = data.error;

	let currentPage = pagination.page;
	let totalPages = pagination.totalPages;

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

<main class="mx-auto max-w-6xl px-4 py-12">
	<div class="mb-12 space-y-4">
		<div class="inline-block">
			<span class="text-muted-foreground mb-2 block text-sm font-medium tracking-widest uppercase"
				>Portfolio</span
			>
			<h1 class="text-4xl font-bold gradient-text">Projects</h1>
		</div>
		<p class="text-muted-foreground max-w-2xl">
			A showcase of my software engineering work and web development projects.
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

	{#if projects.length === 0 && !error}
		<p class="py-12 text-center text-lg text-muted-foreground">No projects found.</p>
	{:else}
		<div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
			{#each projects as project, i (project.id)}
				<ProjectCard {project} index={i} />
			{/each}
		</div>

		{#if totalPages > 1}
			<div class="mt-16 flex justify-center">
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