<script lang="ts">
	import Icon from '@iconify/svelte';
	import Pil from './pil.svelte';
	import type { Project } from '$lib/types/project';
	import AnimateOnScroll from './animate-on-scroll.svelte';

	export let project: Project;
	export let index: number = 0;
</script>

<AnimateOnScroll
	animation="morph"
	delay={index * 150}
	threshold={0.1}
	rootMargin="0px 0px -10% 0px"
	style="--stagger-delay: {0.8 + index * 0.2}s"
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
				<h3 class="group-hover:text-primary mb-2 text-lg md:text-xl font-bold transition-colors duration-300">
					{project.title}
				</h3>
				<p class="text-muted-foreground leading-relaxed text-sm md:text-base">
					{project.description}
				</p>
			</div>

			{#if project.tags && project.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each project.tags.slice(0, 4) as tag}
						<Pil small={true} border="border-foreground/10" text="text-foreground/80" background="bg-foreground/5">
							{typeof tag === 'string' ? tag : tag.name}
						</Pil>
					{/each}
					{#if project.tags.length > 4}
						<Pil small={true} border="border-foreground/10" text="text-foreground/80" background="bg-foreground/5">
							+{project.tags.length - 4}
						</Pil>
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
							<span class=" text-xs md:text-sm">Live Demo</span>
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
