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
	let visibleProjects = 3;

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
			visibleProjects += 3;
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

				visibleProjects += 3;
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

				visibleProjects = Math.min(3, projects.length);
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
	class="section-padding relative overflow-hidden"
	id="work"
	aria-labelledby="works-title"
	bind:this={sectionRef}
>
	<div class="container-modern relative z-10">
		<div class="mb-20 space-y-4 text-center">
			<div class="inline-block">
				<span class="text-muted-foreground mb-2 block text-sm font-medium tracking-widest uppercase"
					>Portfolio</span
				>
				<h2 class="text-responsive-xl gradient-text font-bold">Featured Projects</h2>
			</div>
			<div
				class="from-primary via-accent to-primary mx-auto h-1 w-24 rounded-full bg-gradient-to-r"
			></div>
			<p class="text-muted-foreground mx-auto max-w-2xl">
				A showcase of my latest work, from innovative web applications to scalable system
				architectures
			</p>
		</div>

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
					<button class="btn-modern" on:click={retryFetch}> Try Again </button>
				</div>
			</div>
		{:else if projects.length === 0}
			<div class="py-16 text-center">
				<p class="text-muted-foreground">No projects found.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				{#each projects.slice(0, visibleProjects) as project, i (project.id)}
					<AnimateOnScroll
						animation="morph"
						delay={i * 150}
						threshold={0.1}
						rootMargin="0px 0px -10% 0px"
						style="--stagger-delay: {0.8 + i * 0.2}s"
					>
						<article class="group card-modern hover-lift h-full overflow-hidden">
							<div class="relative mb-6 overflow-hidden rounded-xl">
								{#if project.imageUrl || project.thumbnailUrl}
									<img
										src={project.thumbnailUrl || project.imageUrl}
										alt="{project.title} preview"
										class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-56"
										loading="lazy"
									/>
								{:else}
									<div
										class="from-secondary to-muted flex h-48 w-full items-center justify-center bg-gradient-to-br md:h-56"
									>
										<svg
											class="text-muted-foreground h-16 w-16"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
											></path>
										</svg>
									</div>
								{/if}

								{#if project.featured}
									<div class="absolute top-4 left-4">
										<span
											class="bg-accent/90 border-border/50 text-accent-foreground flex h-8 w-8 items-center justify-center rounded-full border text-sm backdrop-blur-sm"
										>
											⭐
										</span>
									</div>
								{/if}
							</div>

							<div class="space-y-4">
								<div>
									<h3
										class="group-hover:text-primary mb-2 text-xl font-bold transition-colors duration-300"
									>
										{project.title}
									</h3>
									<p class="text-muted-foreground leading-relaxed">
										{project.description}
									</p>
								</div>

								{#if project.tags && project.tags.length > 0}
									<div class="flex flex-wrap gap-2">
										{#each project.tags.slice(0, 4) as tag}
											<span
												class="bg-secondary/50 text-secondary-foreground hover:bg-primary/10 rounded-full px-3 py-1 text-xs font-medium transition-colors"
											>
												{typeof tag === 'string' ? tag : tag.name}
											</span>
										{/each}
										{#if project.tags.length > 4}
											<span
												class="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium"
											>
												+{project.tags.length - 4}
											</span>
										{/if}
									</div>
								{/if}

								<div class="border-border/50 flex items-center gap-3 border-t pt-4">
									{#if project.liveUrl}
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="btn-modern flex-1 text-center text-sm"
										>
											<span class="flex items-center justify-center space-x-2">
												<span>Live Demo</span>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
													></path>
												</svg>
											</span>
										</a>
									{/if}
									{#if project.githubUrl}
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="bg-secondary/80 hover:bg-secondary border-border/50 rounded-lg border p-3 transition-colors"
											aria-label="View source code"
										>
											<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
												/>
											</svg>
										</a>
									{/if}
								</div>
							</div>
						</article>
					</AnimateOnScroll>
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
					<button class="btn-modern group" on:click={() => loadMoreProjects()}>
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
