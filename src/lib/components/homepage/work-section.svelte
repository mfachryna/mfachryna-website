<script lang="ts">
	import { onMount } from 'svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import Wave from '../wave.svelte';
	import Layer2 from '$lib/background/layer2.svelte';
	import ProjectCard from '../project-card.svelte';
	import type { ProjectWithTags } from '$lib/types/project';
	import Layer1 from '$lib/background/layer1.svelte';
	import Button from '../ui/button/button.svelte';

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
	let visibleProjects = 3;

	let currentPage = data.pagination?.page || 1;
	let limit = data.pagination?.limit || 6;
	let totalItems = data.pagination?.totalItems || 0;
	let totalPages = data.pagination?.totalPages || 0;

	console.log('Initial projects count:', projects.length);
	console.log('Initial visibleProjects:', visibleProjects);

	$: showLoadMore = visibleProjects < projects.length || currentPage < totalPages;
	$: console.log(
		'showLoadMore:',
		showLoadMore,
		'visibleProjects:',
		visibleProjects,
		'projects.length:',
		projects.length
	);

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
		console.log('loadMoreProjects called');
		console.log('Before: visibleProjects =', visibleProjects, 'projects.length =', projects.length);

		if (visibleProjects < projects.length) {
			visibleProjects += 3;
			console.log('Increased visibleProjects to:', visibleProjects);
		} else if (currentPage < totalPages) {
			console.log('Fetching more projects from page:', currentPage + 1);
			fetchMoreProjects(currentPage + 1);
		}

		visibleProjects = visibleProjects;
		console.log('After: visibleProjects =', visibleProjects);
	}

	async function fetchMoreProjects(page: number) {
		try {
			isLoading = true;
			console.log('Fetching more projects, page:', page);

			const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);

			if (!response.ok) {
				throw new Error('Failed to fetch more projects');
			}

			const result = await response.json();

			if (result.success) {
				console.log('Received new projects:', result.projects.length);

				projects = [...projects, ...result.projects];
				currentPage = result.pagination.page;
				totalItems = result.pagination.totalItems;
				totalPages = result.pagination.totalPages;

				visibleProjects += 3;
				console.log('Updated visible projects to:', visibleProjects);
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
			console.log('Fetching initial projects');

			const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);

			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}

			const result = await response.json();

			if (result.success) {
				console.log('Received initial projects:', result.projects.length);
				projects = result.projects;
				currentPage = result.pagination.page;
				totalItems = result.pagination.totalItems;
				totalPages = result.pagination.totalPages;

				visibleProjects = Math.min(3, projects.length);
				console.log('Set initial visible projects to:', visibleProjects);
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
			console.log('Using server-rendered projects:', projects.length);

			visibleProjects = Math.min(3, projects.length);
		}
	});
</script>

<svelte:head>
	<script type="application/ld+json">
    {JSON.stringify(projectSchema)}
	</script>
</svelte:head>

<section
	class="work-section relative w-full overflow-hidden bg-none"
	id="work"
	aria-labelledby="works-title"
>
	<Wave position="pointer-events-none absolute top-0 left-0 w-full">
		<Layer2 fill="fill-background" />
	</Wave>

	<div
		class="bg-foreground mx-auto w-full px-6 py-10 sm:px-10 sm:py-20 md:px-16 md:py-40 lg:px-28"
		id="works"
	>
		<PageTitle title="works" textColor="text-background" line="bg-background" id="works-title" />

		{#if isLoading && projects.length === 0}
			<div class="flex justify-center py-10">
				<div
					class="border-background h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"
				></div>
			</div>
		{:else if error}
			<div class="mt-8 text-center">
				<p class="mb-4 text-red-300">{error}</p>
				<button
					class="bg-background text-foreground hover:bg-background/90 rounded px-4 py-2 transition-colors"
					on:click={retryFetch}
				>
					Try Again
				</button>
			</div>
		{:else if projects.length === 0}
			<p class="text-background mt-8 text-center">No projects found.</p>
		{:else}
			<div class="flex flex-col gap-6">
				{#each projects.slice(0, visibleProjects) as project, i (project.id)}
					<ProjectCard
						project={{
							...project,
							tags: project.tags.map((tag) => (typeof tag === 'string' ? tag : tag.name))
						}}
						index={i}
					/>
				{/each}
			</div>

			{#if isLoading && projects.length > 0}
				<div class="flex justify-center py-6">
					<div
						class="border-background h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"
					></div>
				</div>
			{/if}

			{#if showLoadMore && !isLoading}
				<div class="relative z-20 mt-10 text-center">
					<Button class="z-20" variant="outline_background" onclick={() => loadMoreProjects()}>
						{#if visibleProjects < projects.length}
							Show More Projects ({projects.length - visibleProjects} more)
						{:else}
							Load More Projects
						{/if}
					</Button>
				</div>
			{/if}

			{#if projects.length > 0}
				<div class="text-background/60 mt-4 text-center text-sm">
					Showing {Math.min(visibleProjects, projects.length)} of {totalItems} projects
				</div>
			{/if}
		{/if}
	</div>

	<Wave position="pointer-events-none absolute bottom-0 left-0 w-full z-10">
		<Layer1 fill="fill-background" />
	</Wave>
</section>

<style>
	/* Add entrance animations for project cards */
	:global(.project-card) {
		opacity: 0;
		transform: translateY(20px);
		animation: slideUp 0.5s forwards;
	}

	:global(.project-card:nth-child(1)) {
		animation-delay: 0.1s;
	}
	:global(.project-card:nth-child(2)) {
		animation-delay: 0.3s;
	}
	:global(.project-card:nth-child(3)) {
		animation-delay: 0.5s;
	}
	:global(.project-card:nth-child(n + 4)) {
		animation-delay: 0.7s;
	}

	@keyframes slideUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
