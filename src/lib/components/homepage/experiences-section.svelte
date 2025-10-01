<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
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
		<div class="mb-20 space-y-4 text-center">
			<div class="inline-block">
				<span class="text-muted-foreground mb-2 block text-sm font-medium tracking-widest uppercase"
					>My Journey</span
				>
				<h2 class="text-responsive-xl gradient-text font-bold">Professional Experience</h2>
			</div>
			<div
				class="from-primary via-accent to-primary mx-auto h-1 w-24 rounded-full bg-gradient-to-r"
			></div>
			<p class="text-muted-foreground mx-auto max-w-2xl">
				A timeline of my professional growth and the exciting projects I've contributed to
			</p>
		</div>

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
					<button class="btn-modern" on:click={() => fetchMoreExperiences(1)}> Try Again </button>
				</div>
			</div>
		{:else if experiences.length === 0}
			<div class="py-16 text-center">
				<p class="text-muted-foreground">No experiences found.</p>
			</div>
		{:else}
			<div class="relative">
				<div
					class="from-primary via-accent to-primary absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b md:left-1/2 md:-translate-x-1/2 md:transform"
				></div>

				<div class="space-y-8">
					{#each experiences.slice(0, visibleExperiences) as item, i (item.id)}
						<AnimateOnScroll
							animation="stagger"
							delay={i * 100}
							threshold={0.1}
							rootMargin="0px 0px -10% 0px"
							style="--stagger-delay: {0.6 + i * 0.1}s"
						>
							<div class="relative flex items-center md:justify-center">
								<div class="absolute left-8 z-20 md:left-1/2 md:-translate-x-1/2 md:transform">
									<div class="relative">
										<div
											class="from-primary/30 to-accent/30 absolute inset-0 -m-1 h-6 w-6 animate-ping rounded-full bg-gradient-to-br"
										></div>

										<div
											class="from-primary via-primary/80 to-accent border-background shadow-glow relative h-4 w-4 rounded-full border-3 bg-gradient-to-br transition-transform duration-300 group-hover:scale-125"
										>
											<div
												class="absolute inset-1 rounded-full bg-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
											></div>

											<div
												class="from-primary to-accent absolute inset-0 animate-pulse rounded-full bg-gradient-to-br opacity-60"
											></div>
										</div>
									</div>
								</div>

								<div
									class="ml-20 w-full md:ml-0 md:w-6/12 lg:w-5/12 xl:w-6/12 {i % 2 === 0
										? 'md:mr-auto md:pr-4 lg:pr-6 xl:pr-8'
										: 'md:ml-auto md:pl-4 lg:pl-6 xl:pl-8'}"
								>
									<div
										class="group experience-card cursor-pointer"
										on:click={() => toggle(i)}
										on:keydown={(e) => e.key === 'Enter' && toggle(i)}
										role="button"
										tabindex="0"
									>
										<div class="relative">
											<div class="relative mb-4 flex items-start justify-between">
												<div class="flex-1 space-y-2">
													<div class="flex flex-wrap items-center gap-2">
														<div
															class="from-primary/10 to-accent/10 border-primary/20 flex items-center gap-2 rounded-full border bg-gradient-to-r px-3 py-1.5 backdrop-blur-sm"
														>
															<svg
																class="text-primary h-3 w-3"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="2"
																	d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
																/>
															</svg>
															<span class="text-primary text-xs font-medium">
																{formatDate(item.startDate)} - {item.endDate
																	? formatDate(item.endDate)
																	: 'Present'}
															</span>
														</div>
														{#if item.location}
															<div
																class="bg-foreground/1 border-foreground/10 flex items-center gap-1 rounded-full border px-2 py-1"
															>
																<svg
																	class="text-accent h-3 w-3"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		stroke-width="2"
																		d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
																	/>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		stroke-width="2"
																		d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
																	/>
																</svg>
																<span class="text-foreground/30 text-xs">{item.location}</span>
															</div>
														{/if}
													</div>

													<div class="space-y-0.5">
														<h3
															class="text-foreground group-hover:from-primary group-hover:to-accent text-lg font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent"
														>
															{item.title}
														</h3>
														{#if item.role && item.role !== item.title}
															<p class="text-xs font-medium text-neutral-400">{item.role}</p>
														{/if}
													</div>

													<div class="flex items-center gap-2">
														<div
															class="from-primary to-accent h-4 w-0.5 rounded-full bg-gradient-to-b"
														></div>
														<p
															class="from-accent to-primary bg-gradient-to-r bg-clip-text text-base font-semibold text-transparent"
														>
															{item.company}
														</p>
													</div>
												</div>

												<div class="ml-6 flex-shrink-0">
													<div class="group/button relative">
														<div
															class="from-primary to-accent absolute inset-0 rounded-full bg-gradient-to-r opacity-0 blur transition-opacity duration-300 group-hover:opacity-50"
														></div>
														<div
															class="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover/button:scale-110 group-hover/button:border-white/30 group-hover/button:bg-white/20"
														>
															<svg
																class="h-4 w-4 text-white transition-all duration-300 {activeIndex ===
																i
																	? 'rotate-180'
																	: ''}"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="2"
																	d="M19 9l-7 7-7-7"
																></path>
															</svg>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div class="relative mb-3">
											<p
												class="text-foreground/60 line-clamp-3 text-xs leading-relaxed transition-colors duration-300"
											>
												{item.description}
											</p>
										</div>

										{#if item.tags && item.tags.length > 0}
											{#if activeIndex !== i}
											<div class="mb-2 flex flex-wrap gap-1 ">
												{#each item.tags.slice(0, 5) as tag}
													<span
														class="bg-foreground/5 text-foreground/80 border-foreground/10 hover:bg-foreground/10 hover:text-foreground rounded border px-2 py-0.5 text-xs font-medium transition-all duration-200"
													>
														{tag.name}
													</span>
												{/each}
												{#if item.tags.length > 5}
													<span
														class="bg-foreground/3 text-foreground/60 border-foreground/5 rounded border px-2 py-0.5 text-xs font-medium"
													>
														+{item.tags.length - 5}
													</span>
												{/if}
											</div>
											{/if}
										{/if}
										{#if activeIndex === i}
											<div
												class="border-border collapsible-item mt-4 border-t pt-4"
												in:slide={{ duration: 350 }}
												out:slide={{ duration: 250 }}
											>
												<div in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
													{#if item.content}
														<div class="prose prose-sm max-w-none">
															<div class="text-foreground leading-relaxed">
																{@html item.content}
															</div>
														</div>
													{/if}

													{#if item.highlights && item.highlights.length > 0}
														<div>
															<h4
																class="text-foreground top-0 -mt-2 mb-3 flex items-center py-2 font-semibold"
															>
																<span
																	class="from-primary to-accent mr-2 h-2 w-2 rounded-full bg-gradient-to-r"
																></span>
																Key Achievements
																{#if item.highlights.length > 5}
																	<span
																		class="bg-primary/10 text-primary ml-2 rounded-full px-2 py-0.5 text-xs"
																	>
																		{item.highlights.length} items
																	</span>
																{/if}
															</h4>
															<div class="grid gap-3">
																{#each item.highlights as highlight, idx}
																	<div class="group flex items-start">
																		<div
																			class="bg-accent/10 mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
																		>
																			<span class="text-accent text-xs font-medium">{idx + 1}</span>
																		</div>
																		<div class="flex-1">
																			<p
																				class="text-muted-foreground group-hover:text-foreground text-sm leading-relaxed transition-colors duration-200"
																			>
																				{highlight}
																			</p>
																		</div>
																	</div>
																{/each}
															</div>
														</div>
													{/if}

													{#if item.tags && item.tags.length > 4}
														<div>
															<h4
																class="text-foreground sticky top-0 mt-2 mb-3 flex items-center py-2 font-semibold"
															>
																<span
																	class="from-primary to-accent mr-2 h-2 w-2 rounded-full bg-gradient-to-r"
																></span>
																Technologies & Skills
																<span
																	class="bg-foreground/5 text-secondary-foreground ml-2 rounded-full px-2 py-0.5 text-xs"
																>
																	{item.tags.length}
																</span>
															</h4>
															<div class="grid grid-cols-2 gap-2 md:grid-cols-3">
																{#each item.tags as tag}
																	<span
																		class="bg-foreground/5 text-secondary-foreground hover:bg-primary/10 hover:text-primary rounded-lg px-3 py-1.5 text-center text-xs font-medium transition-all duration-200"
																	>
																		{tag.name}
																	</span>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											</div>
										{/if}
									</div>
								</div>
							</div>
						</AnimateOnScroll>
					{/each}
				</div>
			</div>
		{/if}

		<div id="load-more-trigger" class="h-1 w-full" aria-hidden="true"></div>

		{#if !isLoading && visibleExperiences < totalExperiences}
			<div class="mt-16 text-center">
				<button class="btn-modern" on:click={loadMoreExperiences}>
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

<style>
	:global(.collapsible-item) {
		will-change: height;
		transition: height 0.3s ease-in-out;
	}

	/* Compact Experience Cards */
	.experience-card {
		position: relative;
		padding: 1.25rem;
		border-radius: 1rem;
		background: var(--card-foreground);
		border: 1px solid rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	.experience-card::before {
		content: '';
		position: absolute;
		inset: 0;
		padding: 1px;
		border-radius: inherit;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.experience-card:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow:
			0 12px 24px rgba(0, 0, 0, 0.25),
			0 4px 8px rgba(var(--primary-rgb), 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
	}

	.experience-card:hover::before {
		opacity: 1;
	}

	@keyframes slideUpTag {
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	/* Text truncation utility */
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Enhanced Background Animations */
	@keyframes floating {
		0%,
		100% {
			transform: translateY(0) rotate(0deg) scale(1);
		}
		33% {
			transform: translateY(-20px) rotate(1deg) scale(1.02);
		}
		66% {
			transform: translateY(10px) rotate(-0.5deg) scale(0.98);
		}
	}

	@keyframes floating-delayed {
		0%,
		100% {
			transform: translateY(0) rotate(0deg) scale(1);
		}
		25% {
			transform: translateY(15px) rotate(-1deg) scale(1.01);
		}
		75% {
			transform: translateY(-10px) rotate(0.5deg) scale(0.99);
		}
	}

	@keyframes floating-slow {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-15px) rotate(2deg);
		}
	}

	@keyframes floating-reverse {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(25px) rotate(-1deg);
		}
	}

	@keyframes floating-gentle {
		0%,
		100% {
			transform: translateX(0) scale(1);
		}
		50% {
			transform: translateX(10px) scale(1.05);
		}
	}

	@keyframes floating-gentle-delayed {
		0%,
		100% {
			transform: translateX(0) scale(1);
		}
		50% {
			transform: translateX(-15px) scale(0.95);
		}
	}

	/* Background pattern */
	.bg-grid-pattern {
		background-image:
			linear-gradient(rgba(var(--primary-rgb), 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(var(--primary-rgb), 0.05) 1px, transparent 1px);
		background-size: 100px 100px;
	}

	/* Custom animation classes */
	:global(.floating) {
		animation: floating 8s ease-in-out infinite;
	}

	:global(.floating-delayed) {
		animation: floating-delayed 10s ease-in-out infinite;
	}

	:global(.floating-slow) {
		animation: floating-slow 12s ease-in-out infinite;
	}

	:global(.floating-reverse) {
		animation: floating-reverse 9s ease-in-out infinite;
	}

	:global(.floating-gentle) {
		animation: floating-gentle 6s ease-in-out infinite;
	}

	:global(.floating-gentle-delayed) {
		animation: floating-gentle-delayed 7s ease-in-out infinite;
	}

	/* Pulse variations */
	:global(.animate-pulse-slow) {
		animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	:global(.animate-pulse-slower) {
		animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	:global(.animate-pulse-slowest) {
		animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

</style>
