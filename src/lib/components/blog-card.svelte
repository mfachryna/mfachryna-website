<script lang="ts">
	import AnimateOnScroll from './animate-on-scroll.svelte';
	import CardCover from './card-cover.svelte';

	/**
	 * Blog card, two variants.
	 *
	 *   hero    — wide editorial slot: image beside text, used for the first
	 *             (or featured) post on page 1 only.
	 *   compact — standard grid tile.
	 *
	 * Deliberately does NOT use `.card-modern`: that class bakes in
	 * `padding: clamp(1.5rem, 3vw, 2.5rem)`, which fights an edge-to-edge
	 * image and was doubling up with the old inner `p-6`. It also avoids
	 * `contain: paint` and `h-full` on the content column — together those
	 * were clipping the title off the bottom of every card.
	 */
	export let blog: any;
	export let variant: 'hero' | 'compact' = 'compact';
	export let index = 0;

	$: isHero = variant === 'hero';
	$: cover = blog.imageUrl || (blog.images && blog.images[0]) || null;
	$: summary = blog.excerpt || blog.description || '';

	const formatDate = (date: string | Date | null) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<AnimateOnScroll
	animation={isHero ? 'morph' : 'stagger'}
	delay={isHero ? 0 : index * 90}
	threshold={0.1}
	rootMargin="0px 0px -10% 0px"
>
	<a
		href={`/blog/${blog.slug}`}
		class="group border-border/60 bg-card-foreground backdrop-blur-[5px] hover:border-primary/70 relative flex h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1
		{isHero ? 'flex-col md:grid md:grid-cols-2 md:items-stretch' : 'flex-col'}"
	>
	<CardCover
		src={cover}
		alt={blog.title}
		title={blog.title}
		hero={isHero}
		eager={isHero}
	/>

	<!-- body -->
	<div class="flex flex-1 flex-col gap-3 {isHero ? 'p-7 md:justify-center md:p-9' : 'p-6'}">
		<div class="text-muted-foreground flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
			{#if isHero}
				<span class="text-primary font-semibold tracking-widest uppercase">Featured</span>
				<span class="opacity-40">&middot;</span>
			{/if}
			{#if blog.publishedAt}
				<time datetime={new Date(blog.publishedAt).toISOString()} class="tracking-wider uppercase">
					{formatDate(blog.publishedAt)}
				</time>
			{/if}
			{#if blog.readingTime}
				<span class="opacity-40">&middot;</span>
				<span>{blog.readingTime} min read</span>
			{/if}
		</div>

		<h2
			class="group-hover:text-primary font-bold tracking-tight text-balance transition-colors duration-300
			{isHero ? 'text-2xl md:text-3xl lg:text-4xl' : 'line-clamp-2 text-lg'}"
		>
			{blog.title}
		</h2>

		{#if summary}
			<p
				class="text-muted-foreground leading-relaxed
				{isHero ? 'line-clamp-3 text-base md:text-lg' : 'line-clamp-2 text-sm'}"
			>
				{summary}
			</p>
		{/if}

		{#if blog.tags?.length}
			<div class="mt-auto flex flex-wrap items-center gap-2 pt-2">
				{#each blog.tags.slice(0, isHero ? 4 : 3) as tag (typeof tag === 'string' ? tag : tag.id)}
					<span
						class="border-border/70 text-muted-foreground group-hover:border-primary/40 rounded-full border px-2.5 py-0.5 text-xs transition-colors"
					>
						{typeof tag === 'string' ? tag : tag.name}
					</span>
				{/each}
				{#if blog.tags.length > (isHero ? 4 : 3)}
					<span class="text-muted-foreground/70 text-xs"
						>+{blog.tags.length - (isHero ? 4 : 3)}</span
					>
				{/if}
			</div>
		{/if}
	</div>
</a>
</AnimateOnScroll>
