<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Pil from '$lib/components/pil.svelte';
	import type { PageData } from './$types';
	import SEO from '$lib/components/seo.svelte';

	export let data: PageData;

	const project = data.project;
	let content = '';

	onMount(async () => {
		if (project.content) {
			const parsedContent = marked.parse(project.content);
			content = parsedContent instanceof Promise ? await parsedContent : parsedContent;
		}
	});

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: project.title,
		description: project.description,
		image: project.imageUrl,
		applicationCategory: 'WebApplication',
		author: {
			'@type': 'Person',
			name: 'Muhammad Fachry Noorchoolish Arif'
		}
	};
</script>

<SEO
	title={project.title + " | Muhammad Fachry's Projects"}
	description={project.description}
	image={project.imageUrl || undefined}
	type="website"
	{structuredData}
>
	<article class="mx-auto max-w-4xl px-4 pt-32 pb-12">
		<div class="mb-4">
			<a href="/projects" class="text-primary flex items-center gap-1 hover:underline">
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
				Back to all projects
			</a>
		</div>

		<header class="mb-12">
			<h1 class="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">{project.title}</h1>
			{#if project.subtitle}
				<h2 class="mb-6 text-xl text-gray-600 dark:text-gray-400">{project.subtitle}</h2>
			{/if}

			<div class="mb-6 flex flex-wrap gap-2">
				{#each project.tags as tag}
					<Pil>{tag.name}</Pil>
				{/each}
			</div>

			<div class="mb-6 flex flex-wrap gap-4">
				{#if project.liveUrl}
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-modern flex items-center gap-2 text-sm"
					>
						<span>Live Demo</span>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							></path>
						</svg>
					</a>
				{/if}
				{#if project.githubUrl}
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-secondary/80 hover:bg-secondary border-border/50 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						<span>GitHub Repository</span>
					</a>
				{/if}
			</div>

			{#if project.imageUrl}
				<div class="mb-8 overflow-hidden rounded-lg">
					<img
						src={project.imageUrl}
						alt={project.title}
						class="h-auto w-full object-cover"
						width="800"
						height="450"
					/>
				</div>
			{/if}

			<p class="mb-8 text-xl text-gray-700 italic dark:text-gray-300">{project.description}</p>
		</header>

		{#if content}
			<div class="prose prose-lg dark:prose-invert max-w-none">
				{@html content}
			</div>
		{/if}
		
		{#if project.images && project.images.length > 0}
			<div class="mt-12">
				<h3 class="mb-6 text-2xl font-bold">Gallery</h3>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{#each project.images as image}
						<div class="overflow-hidden rounded-lg">
							<img src={image} alt="{project.title} screenshot" class="h-48 w-full object-cover" />
						</div>
					{/each}
				</div>
			</div>
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
