<script lang="ts">
	import Icon from '@iconify/svelte';
	import Pil from './pil.svelte';
	import type { Project } from '$lib/types/project';

	export let project: Project;
	export let index: number = 0;
</script>

<div class="project-card relative flex h-auto flex-col items-center gap-6 md:h-fit md:flex-row">
	<div
		class="relative z-0 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl rounded-l-xl bg-white md:w-[55%]"
	>
		{#if project.thumbnailUrl}
			<img
				src={project.thumbnailUrl}
				alt={project.title + ' thumbnail'}
				loading="lazy"
				class="h-full w-full object-cover"
			/>
		{:else if project.imageUrl}
			<img
				src={project.imageUrl}
				alt={project.title + ' image'}
				loading="lazy"
				class="h-full w-full object-cover"
			/>
		{/if}

		{#if project.images && project.images.length > 0}
			<div class="mt-2 flex gap-2">
				{#each project.images as img}
					<img
						src={img}
						alt={project.title + ' screenshot'}
						class="h-12 w-12 rounded object-cover"
					/>
				{/each}
			</div>
		{/if}
	</div>

	<div class="z-10 flex w-full flex-col md:w-3/5">
		<div class="w-fit">
			<h3 class="text-background text-lg font-semibold sm:text-xl md:text-2xl">
				{project.title}
			</h3>
			<p class="text-background/70 mb-2 text-sm sm:text-base">{project.subtitle}</p>
		</div>

		<div
			class="bg-foreground text-background border-background mb-3 rounded-r-xl border border-l-0 p-4 pl-0 text-sm sm:text-base"
		>
			{project.description}
		</div>

		<div class="mb-3 flex flex-wrap gap-2">
			{#each project.tags as tag}
				<Pil border="border-background/50" text="text-background/50">{tag}</Pil>
			{/each}
		</div>

		<div class="flex items-center gap-3">
			{#if project.githubUrl}
				<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<Icon
						icon="mdi:github"
						width="28"
						height="28"
						class="bg-foreground text-background rounded-full"
					/>
				</a>
			{/if}
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="External link"
				>
					<Icon
						icon="heroicons-solid:external-link"
						width="26"
						height="26"
						class="bg-foreground text-background rounded-full"
					/>
				</a>
			{/if}
		</div>
	</div>
</div>
