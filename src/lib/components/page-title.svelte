<script lang="ts">
	import AnimateOnScroll from './animate-on-scroll.svelte';

	export let brief: any;
	export let title: any;
	export let description: string = '';
</script>

<AnimateOnScroll animation="slide" delay={100} threshold={0.1}>
	<div class="mb-20 space-y-4 text-center">
		<div class="inline-block">
			<span class="text-xs md:text-sm  lg:text-base text-muted-foreground mb-2 block font-medium tracking-widest uppercase"
				>{brief}</span
			>
			<h2 class=" lg:text-7xl md:text-5xl text-4xl gradient-text font-bold">{title}</h2>
		</div>
		<div
			class="from-primary via-accent to-primary mx-auto h-1 w-24 rounded-full bg-gradient-to-r"
		></div>
		{#if description !== ''}
			<p class="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base  lg:text-lg">
				{description}
			</p>
		{/if}
	</div>
</AnimateOnScroll>
