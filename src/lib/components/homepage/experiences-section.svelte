<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import type { ExperienceWithTags } from '$lib/types/experience';
	import ExperienceCard from '../experience-card.svelte';
	import PageTitle from '../page-title.svelte';
	export let data: {
		experiences: ExperienceWithTags[];
		pagination: {
			page: number;
			limit: number;
			totalItems: number;
			totalPages: number;
		};
		error?: string;
	};

	const experienceSchema: {
		'@context': string;
		'@type': string;
		name: string;
		jobTitle: string;
		worksFor: {
			'@type': string;
			name: string;
		};
		workExperience: Array<{
			'@type': string;
			roleName: string;
			startDate: string;
			endDate: string | null;
			memberOf: {
				'@type': string;
				name: string;
			};
			description: string;
		}>;
	} = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Muhammad Fachry Noorchoolish Arif',
		jobTitle: 'Software Engineer',
		worksFor: {
			'@type': 'Organization',
			name: 'Bank Syariah Indonesia'
		},
		workExperience: []
	};

	let experiences: ExperienceWithTags[] = data.experiences;
	let isLoading = false;
	let error: string | null = data.error || null;

	let activeIndex = 0;
	let visibleExperiences = 3;
	let totalExperiences = data.pagination.totalItems;
	let currentPage = data.pagination.page;
	let limit = data.pagination.limit;

	function toggle(index: number) {
		activeIndex = index === activeIndex ? -1 : index;
	}

	function loadMoreExperiences() {
		if (visibleExperiences < experiences.length) {
			visibleExperiences = Math.min(visibleExperiences + 3, experiences.length);
		} else if (visibleExperiences < totalExperiences) {
			fetchMoreExperiences(currentPage + 1);
		}
	}

	async function fetchMoreExperiences(page: number) {
		try {
			isLoading = true;
			const response = await fetch(`/api/experiences?page=${page}&limit=${limit}`);

			if (!response.ok) {
				throw new Error('Failed to fetch more experiences');
			}

			const result = await response.json();

			experiences = [...experiences, ...result.data];

			currentPage = result.pagination.page;

			updateSchemaData();
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
			console.error('Error fetching more experiences:', err);
		} finally {
			isLoading = false;
		}
	}

	function updateSchemaData() {
		experienceSchema.workExperience = experiences.map((exp) => ({
			'@type': 'OrganizationRole',
			roleName: exp.title,
			startDate: formatDate(exp.startDate),
			endDate: exp.endDate ? formatDate(exp.endDate) : null,
			memberOf: {
				'@type': 'Organization',
				name: exp.company
			},
			description: exp.description
		}));
	}

	function formatDate(date: string | Date): string {
		const d = new Date(date);
		const month = d.toLocaleDateString('en-US', { month: 'short' });
		const year = d.getFullYear().toString();
		return `${month} ${year}`;
	}

	onMount(() => {
		updateSchemaData();

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && visibleExperiences < totalExperiences && !isLoading) {
				loadMoreExperiences();
			}
		});

		const loadMoreTrigger = document.getElementById('load-more-trigger');
		if (loadMoreTrigger) observer.observe(loadMoreTrigger);

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<script type="application/ld+json">
        {JSON.stringify(experienceSchema)}
	</script>
</svelte:head>

<section class="section-padding relative" id="experiences" aria-labelledby="experiences-title">
	<div class="container-modern relative z-10">
		<PageTitle title="Professional Experience" brief={'My Journey'} description="A timeline of my professional growth and the exciting projects I've contributed to" />

		{#if isLoading && experiences.length === 0}
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
					<button class="btn-modern" onclick={() => fetchMoreExperiences(1)}> Try Again </button>
				</div>
			</div>
		{:else if experiences.length === 0}
			<div class="py-16 text-center">
				<p class="text-muted-foreground">No experiences found.</p>
			</div>
		{:else}
			<div class="relative">
				<div
					class="from-primary via-accent to-primary absolute hidden md:block top-0 bottom-0 left-8 w-px bg-gradient-to-b md:left-1/2 md:-translate-x-1/2 md:transform"
				></div>

				<div class="space-y-8">
					{#each experiences.slice(0, visibleExperiences) as item, i (item.id)}
						<ExperienceCard {item} {i} {activeIndex} {toggle} {formatDate} />
					{/each}
				</div>
			</div>
		{/if}

		<div id="load-more-trigger" class="h-1 w-full" aria-hidden="true"></div>

		{#if !isLoading && visibleExperiences < totalExperiences}
			<div class="mt-16 text-center">
				<button class="btn-modern" onclick={loadMoreExperiences}>
					<span class="flex items-center space-x-2">
						<span>Load More Experiences</span>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

		{#if isLoading && experiences.length > 0}
			<div class="mt-8 text-center">
				<div class="loading-pulse text-muted-foreground inline-flex items-center space-x-2">
					<div
						class="border-primary/20 border-t-primary h-4 w-4 animate-spin rounded-full border-2"
					></div>
					<span>Loading more experiences...</span>
				</div>
			</div>
		{/if}
	</div>
</section>
