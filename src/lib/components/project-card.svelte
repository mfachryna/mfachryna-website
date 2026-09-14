<script lang="ts">
	import type { Project } from '$lib/types/project';
	import AnimateOnScroll from './animate-on-scroll.svelte';
	import CardCover from './card-cover.svelte';
	import { t, currentLocale } from '$lib/i18n/store';
	import { localizeProject } from '$lib/i18n/content';

	/**
	 * Project card, two variants.
	 *
	 *   hero    — wide editorial slot: image beside text, first/featured
	 *             project on page 1 only.
	 *   compact — standard grid tile.
	 *
	 * The whole card is a single link. The previous version nested "Live" and
	 * "Repo" anchors inside the card, which split one tile into three competing
	 * click targets (and nested <a> elements are invalid HTML). Those links now
	 * live in the detail page's meta rail, where they read as information
	 * rather than clutter.
	 */
	export let project: Project;
	export let index: number = 0;
	export let variant: 'hero' | 'compact' = 'compact';

	$: isHero = variant === 'hero';
	$: cover = project.thumbnailUrl || project.imageUrl || null;
	$: localized = localizeProject(project, $currentLocale);
</script>

<AnimateOnScroll
	animation="morph"
	delay={index * 120}
	threshold={0.1}
	rootMargin="0px 0px -10% 0px"
	style="--stagger-delay: {0.6 + index * 0.15}s"
>
	<a
		href={`/projects/${project.id}`}
		class="group border-border/60 bg-card-foreground backdrop-blur-[5px] hover:border-primary/70 relative flex overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1
		{isHero ? 'flex-col md:grid md:grid-cols-2 md:items-stretch' : 'h-full flex-col'}"
	>
		<div class="relative {isHero ? 'md:h-full' : ''}">
			<CardCover
				src={cover}
				alt="{localized.title} preview"
				title={localized.title}
				hero={isHero}
				eager={isHero}
			/>

			{#if project.featured && !isHero}
				<span
					class="bg-background/80 border-border/60 text-foreground absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium tracking-wide backdrop-blur-sm"
				>
					{$t('work.featured')}
				</span>
			{/if}
		</div>

		<!-- body -->
		<div class="flex flex-1 flex-col gap-3 {isHero ? 'p-7 md:justify-center md:p-9' : 'p-6'}">
			{#if isHero}
				<span class="text-primary text-xs font-semibold tracking-widest uppercase">
					{$t('work.featured')}
				</span>
			{/if}

			<div class="space-y-1.5">
				<h2
					class="group-hover:text-primary font-bold tracking-tight text-balance transition-colors duration-300
					{isHero ? 'text-2xl md:text-3xl lg:text-4xl' : 'line-clamp-2 text-lg'}"
				>
					{localized.title}
				</h2>
				{#if localized.subtitle}
					<p
						class="text-muted-foreground/80 {isHero
							? 'text-base md:text-lg'
							: 'line-clamp-1 text-sm'}"
					>
						{localized.subtitle}
					</p>
				{/if}
			</div>

			{#if localized.description}
				<p
					class="text-muted-foreground leading-relaxed
					{isHero ? 'line-clamp-3 text-base md:text-lg' : 'line-clamp-2 text-sm'}"
				>
					{localized.description}
				</p>
			{/if}

			{#if project.tags && project.tags.length > 0}
				<div class="mt-auto flex flex-wrap items-center gap-2 pt-2">
					{#each project.tags.slice(0, isHero ? 5 : 3) as tag (typeof tag === 'string' ? tag : tag.id)}
						<span
							class="border-border/70 text-muted-foreground group-hover:border-primary/40 rounded-full border px-2.5 py-0.5 text-xs transition-colors"
						>
							{typeof tag === 'string' ? tag : tag.name}
						</span>
					{/each}
					{#if project.tags.length > (isHero ? 5 : 3)}
						<span class="text-muted-foreground/70 text-xs">
							+{project.tags.length - (isHero ? 5 : 3)}
						</span>
					{/if}
				</div>
			{/if}
		</div>
	</a>
</AnimateOnScroll>
