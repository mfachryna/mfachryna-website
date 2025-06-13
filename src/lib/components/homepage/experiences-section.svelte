<script lang="ts">
	import { onMount } from 'svelte';
	import PageTitle from '../page-title.svelte';
	import Collapsible from '../collapsible.svelte';
	import type { ExperienceWithTags } from '$lib/types/experience';
	import AnimateOnScroll from '../animate-on-scroll.svelte';
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

	let activeIndex = -1;
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
			description: exp.content
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

<section
	class="experiences-section bg-background relative w-full py-20"
	id="experiences"
	aria-labelledby="experiences-title"
>
	<div class="mx-auto h-fit w-full px-6 sm:px-10 md:px-16 lg:px-28">
		<PageTitle
			title="experiences"
			textColor="text-foreground"
			line="bg-foreground"
			id="experiences-title"
		/>

		{#if isLoading && experiences.length === 0}
			<div class="flex justify-center py-10">
				<div
					class="border-foreground h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"
				></div>
			</div>
		{:else if error}
			<div class="mt-8 text-center text-red-500">
				<p>{error}</p>
				<button
					class="bg-foreground text-background mt-4 rounded px-4 py-2"
					on:click={() => fetchMoreExperiences(1)}
				>
					Retry
				</button>
			</div>
		{:else if experiences.length === 0}
			<p class="mt-8 text-center">No experiences found.</p>
		{:else}
			{#each experiences.slice(0, visibleExperiences) as item, i (item.id)}
				<AnimateOnScroll
					animation="bounce"
					delay={200}
					threshold={0.1}
					rootMargin="0px 0px -10% 0px"
				>
					<Collapsible
						item={{
							id: item.id,
							title: item.title,
							role: item.role,
							company: item.company,
							location: item.location,
							dateRange: `${formatDate(item.startDate)} - ${item.endDate ? formatDate(item.endDate) : 'Present'}`,
							content: item.content,
							highlights: item.highlights,
							tags: item.tags.map((tag) => tag.name)
						}}
						index={i}
						{activeIndex}
						onToggle={toggle}
					/>
				</AnimateOnScroll>
			{/each}
		{/if}

		<div id="load-more-trigger" class="h-1 w-full" aria-hidden="true"></div>

		{#if !isLoading && visibleExperiences < totalExperiences}
			<button
				class="border-foreground text-foreground hover:bg-foreground hover:text-background mx-auto mt-4 block rounded-md border px-4 py-2 font-medium transition-colors"
				on:click={loadMoreExperiences}
			>
				Load More Experiences
			</button>
		{/if}
	</div>
</section>

<style>
	/* Optimize animation performance with will-change */
	:global(.collapsible-item) {
		will-change: height;
		transition: height 0.3s ease-in-out;
	}
</style>
