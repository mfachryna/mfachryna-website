<script lang="ts">
	import { onMount } from 'svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import Wave from '../wave.svelte';
	import Layer2 from '$lib/background/layer2.svelte';
	import ProjectCard from '../project-card.svelte';
	import type { ProjectWithTags } from '$lib/types/project';
	import Layer1 from '$lib/background/layer1.svelte';
	import Button from '../ui/button/button.svelte';
	import AnimateOnScroll from '$lib/components/animate-on-scroll.svelte';

	export let data: {
		projects: ProjectWithTags[];
		pagination?: {
			page: number;
			limit: number;
			totalItems: number;
			totalPages: number;
		};
	} = {
		projects: []
	};

	let projects = data.projects;
	let isLoading = false;
	let error: string | null = null;
	let visibleProjects = 4;

	let currentPage = data.pagination?.page || 1;
	let limit = data.pagination?.limit || 6;
	let totalItems = data.pagination?.totalItems || 0;
	let totalPages = data.pagination?.totalPages || 0;

	let sectionRef: HTMLElement;

	$: showLoadMore = visibleProjects < projects.length || currentPage < totalPages;

	$: projectSchema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: projects.map((project, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'SoftwareApplication',
				name: project.title,
				description: project.description,
				url: project.liveUrl || project.githubUrl,
				applicationCategory: 'WebApplication',
				operatingSystem: 'Any'
			}
		}))
	};

	function loadMoreProjects() {
		if (visibleProjects < projects.length) {
			visibleProjects += 4;
		} else if (currentPage < totalPages) {
			fetchMoreProjects(currentPage + 1);
		}
	}

	async function fetchMoreProjects(page: number) {
		try {
			isLoading = true;

			const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);

			if (!response.ok) {
				throw new Error('Failed to fetch more projects');
			}

			const result = await response.json();

			if (result.success) {
				projects = [...projects, ...result.projects];
				currentPage = result.pagination.page;
				totalItems = result.pagination.totalItems;
				totalPages = result.pagination.totalPages;

				visibleProjects += 4;
			} else {
				error = result.error || 'Failed to fetch more projects';
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			console.error('Error fetching more projects:', err);
		} finally {
			isLoading = false;
		}
	}

	async function fetchProjects(page: number = 1) {
		try {
			isLoading = true;

			const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);

			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}

			const result = await response.json();

			if (result.success) {
				projects = result.projects;
				currentPage = result.pagination.page;
				totalItems = result.pagination.totalItems;
				totalPages = result.pagination.totalPages;

				visibleProjects = Math.min(4, projects.length);
			} else {
				error = result.error || 'Failed to fetch projects';
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			console.error('Error fetching projects:', err);
		} finally {
			isLoading = false;
		}
	}

	function retryFetch() {
		error = null;
		fetchProjects(1);
	}

	onMount(() => {
		if (projects.length === 0) {
			fetchProjects();
		} else {
			visibleProjects = Math.min(4, projects.length);
		}
	});
</script>

<svelte:head>
	<script type="application/ld+json">
    {JSON.stringify(projectSchema)}
	</script>
</svelte:head>

<section
	class="section-padding relative overflow-hidden"
	id="work"
	aria-labelledby="works-title"
	bind:this={sectionRef}
>
	<div class="container-modern relative z-10">
		<PageTitle title="Featured Projects" brief={'A Portfolio'} description="A showcase of my latest work, from innovative web applications to scalable system architectures" />

		{#if isLoading && projects.length === 0}
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
					<button class="btn-modern" onclick={retryFetch}> Try Again </button>
				</div>
			</div>
		{:else if projects.length === 0}
			<div class="py-16 text-center">
				<p class="text-muted-foreground">No projects found.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				{#each projects.slice(0, visibleProjects) as project, i (project.id)}
					<ProjectCard {project} index={i} />
				{/each}
			</div>

			{#if isLoading && projects.length > 0}
				<div class="mt-12 text-center">
					<div class="loading-pulse text-muted-foreground inline-flex items-center space-x-2">
						<div
							class="border-primary/20 border-t-primary h-4 w-4 animate-spin rounded-full border-2"
						></div>
						<span>Loading more projects...</span>
					</div>
				</div>
			{/if}

			{#if showLoadMore && !isLoading}
				<div class="mt-16 text-center">
					<button class="btn-modern group" onclick={() => loadMoreProjects()}>
						<span class="flex items-center space-x-2">
							<span>
								{#if visibleProjects < projects.length}
									Show More Projects ({projects.length - visibleProjects} remaining)
								{:else}
									Load More Projects
								{/if}
							</span>
							<svg
								class="h-4 w-4 transition-transform group-hover:translate-y-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								></path>
							</svg>
						</span>
					</button>
				</div>
			{/if}

			{#if projects.length > 0}
				<div class="mt-8 text-center">
					<p class="text-muted-foreground text-sm">
						Showing {Math.min(visibleProjects, projects.length)} of {totalItems} projects
					</p>
				</div>
			{/if}
		{/if}
	</div>
</section>
