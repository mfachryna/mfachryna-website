<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Pil from '$lib/components/pil.svelte';
	import type { PageData } from './$types';
	import SEO from '$lib/components/seo.svelte';

	export let data: PageData;

	const blog = data.blog;
	let content = '';
	let url = '';

	onMount(() => {
		url = window.location.href;
	});

	onMount(async () => {
		const parsedContent = marked.parse(blog.content);

		content = parsedContent instanceof Promise ? await parsedContent : parsedContent;
	});

	const formatDate = (date: string | Date | null) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: blog.title,
		description: blog.description,
		image: blog.imageUrl,
		datePublished: blog.publishedAt,
		author: {
			'@type': 'Person',
			name: 'Muhammad Fachry Noorchoolish Arif'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Muhammad Fachry Noorchoolish Arif',
			logo: {
				'@type': 'ImageObject',
				url: 'https://yoursite.com/images/logo.png'
			}
		}
	};
</script>

<SEO
	title={blog.title + " | Muhammad Fachry's Blog"}
	description={blog.description}
	image={blog.imageUrl || undefined}
	type="article"
	{structuredData}
>
	<article class="mx-auto max-w-4xl px-4 py-12">
		<div class="mb-4">
			<a href="/blog" class="text-primary flex items-center gap-1 hover:underline">
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
				Back to all posts
			</a>
		</div>

		<header class="mb-12">
			<h1 class="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{blog.title}</h1>

			<div class="mb-6">
				<p class="text-gray-600 dark:text-gray-400">
					Published on {formatDate(blog.publishedAt)}
				</p>
			</div>

			<div class="mb-6 flex flex-wrap gap-2">
				{#each blog.tags as tag}
					<Pil>{tag.name}</Pil>
				{/each}
			</div>

			{#if blog.imageUrl}
				<div class="mb-8 overflow-hidden rounded-lg">
					<img
						src={blog.imageUrl}
						alt={blog.title}
						class="h-auto w-full object-cover"
						width="800"
						height="450"
					/>
				</div>
			{/if}

			<p class="mb-8 text-xl text-gray-700 italic dark:text-gray-300">{blog.description}</p>
		</header>

		<div class="prose prose-lg dark:prose-invert max-w-none">
			{@html content}
		</div>
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
