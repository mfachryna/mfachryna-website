<script lang="ts">
	import Pil from '$lib/components/pil.svelte';
	import type { PageData } from './$types';
	import SEO from '$lib/components/seo.svelte';
	import { t, currentLocale } from '$lib/i18n/store';
	import { localizeExperience, localizeDate } from '$lib/i18n/content';

	export let data: PageData;

	$: exp = localizeExperience(data.experience, $currentLocale);

	/* Tiptap HTML from the CMS, rendered server-side. */
	$: content = exp.content ?? '';

	$: structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: 'Muhammad Fachry Noorchoolish Arif',
			jobTitle: exp.title,
			worksFor: {
				'@type': 'Organization',
				name: exp.company
			}
		}
	};
</script>

<SEO
	title={exp.title + ' at ' + exp.company + " | Muhammad Fachry's Experience"}
	description={exp.description || `Read about my experience as ${exp.title} at ${exp.company}`}
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
				{$t('nav.experiences')}
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
					{localizeDate(exp.startDate, $currentLocale)} - {exp.endDate
						? localizeDate(exp.endDate, $currentLocale)
						: $t('experience.present')}
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
					{exp.location}
				</div>
			</div>

			<h1 class="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">{exp.title}</h1>
			<h2 class="mb-6 text-xl text-gray-700 dark:text-gray-300">
				<span class="font-semibold text-primary">{exp.company}</span>
				{#if exp.role && exp.role !== exp.title}
					<span class="text-gray-500 text-base ml-2 font-normal">({exp.role})</span>
				{/if}
			</h2>

			{#if exp.tags?.length}
				<div class="mb-8 flex flex-wrap gap-2">
					{#each exp.tags as tag}
						<Pil>{typeof tag === 'string' ? tag : tag.name}</Pil>
					{/each}
				</div>
			{/if}

			{#if exp.description}
				<p class="mb-8 text-xl text-gray-700 italic dark:text-gray-300">{exp.description}</p>
			{/if}
		</header>

		{#if exp.highlights && exp.highlights.length > 0}
			<section class="mb-12">
				<h3 class="mb-4 text-2xl font-bold">{$t('experience.achievements')}</h3>
				<ul class="space-y-4">
					{#each exp.highlights as highlight}
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
			<section class="border-border/60 mt-12 border-t pt-12">
				<h2 class="mb-6 text-2xl font-bold tracking-tight">{$t('experience.title')}</h2>
				<div class="prose prose-lg prose-content dark:prose-invert max-w-none">
					{@html content}
				</div>
			</section>
		{/if}
	</article>
</SEO>
