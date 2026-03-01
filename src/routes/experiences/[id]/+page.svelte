<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Pil from '$lib/components/pil.svelte';
	import type { PageData } from './$types';
	import SEO from '$lib/components/seo.svelte';

	export let data: PageData;

	const experience = data.experience;
	let content = '';

	onMount(async () => {
		if (experience.content) {
			const parsedContent = marked.parse(experience.content);
			content = parsedContent instanceof Promise ? await parsedContent : parsedContent;
		}
	});

	const formatDate = (date: string | Date | null) => {
		if (!date) return 'Present';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long'
		});
	};

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: 'Muhammad Fachry Noorchoolish Arif',
			jobTitle: experience.title,
			worksFor: {
				'@type': 'Organization',
				name: experience.company
			}
		}
	};
</script>

<SEO
	title={experience.title + ' at ' + experience.company + " | Muhammad Fachry's Experience"}
	description={experience.description || `Read about my experience as ${experience.title} at ${experience.company}`}
	type="profile"
	{structuredData}
>
	<article class="mx-auto max-w-4xl px-4 pt-32 pb-12">
		<div class="mb-4">
			<a href="/#experiences" class="text-primary flex items-center gap-1 hover:underline">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back to experiences
			</a>
		</div>

		<header class="mb-12">
			<div class="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
				<div class="flex items-center gap-1 font-medium">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					{formatDate(experience.startDate)} - {formatDate(experience.endDate)}
				</div>
				<div class="flex items-center gap-1 font-medium">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
					{experience.location}
				</div>
			</div>

			<h1 class="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">{experience.title}</h1>
			<h2 class="mb-6 text-xl text-gray-700 dark:text-gray-300">
				<span class="font-semibold text-primary">{experience.company}</span>
				{#if experience.role && experience.role !== experience.title}
					<span class="text-gray-500 text-base ml-2 font-normal">({experience.role})</span>
				{/if}
			</h2>

			<div class="mb-8 flex flex-wrap gap-2">
				{#each experience.tags as tag}
					<Pil>{tag.name}</Pil>
				{/each}
			</div>

			{#if experience.description}
				<p class="mb-8 text-xl text-gray-700 italic dark:text-gray-300">{experience.description}</p>
			{/if}
		</header>

		{#if experience.highlights && experience.highlights.length > 0}
			<section class="mb-12">
				<h3 class="mb-4 text-2xl font-bold">Key Achievements</h3>
				<ul class="space-y-4">
					{#each experience.highlights as highlight}
						<li class="flex items-start gap-3">
							<svg
								class="mt-1 h-5 w-5 flex-shrink-0 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{highlight}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if content}
			<section class="prose prose-lg dark:prose-invert max-w-none pt-8 border-t border-gray-200 dark:border-gray-800">
				<h3 class="mb-6 text-2xl font-bold">Experience Details</h3>
				{@html content}
			</section>
		{/if}
	</article>
</SEO>

<style>
	/* Markdown styling */
	:global(.prose h1) {
		font-size: 2rem;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
	}

	:global(.prose h2) {
		font-size: 1.5rem;
		margin-top: 1.3rem;
		margin-bottom: 0.8rem;
		border-bottom: 1px solid #e5e7eb;
		padding-bottom: 0.3rem;
	}

	:global(.prose h3) {
		font-size: 1.25rem;
		margin-top: 1.2rem;
		margin-bottom: 0.6rem;
	}

	:global(.prose pre) {
		background-color: #1e1e1e;
		color: #f8f8f2;
		padding: 1rem;
		border-radius: 0.375rem;
		overflow-x: auto;
	}

	:global(.prose code) {
		color: #e83e8c;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	}

	:global(.prose pre code) {
		color: inherit;
	}

	:global(.prose a) {
		color: #3b82f6;
		text-decoration: underline;
	}

	:global(.dark .prose a) {
		color: #60a5fa;
	}
</style>
