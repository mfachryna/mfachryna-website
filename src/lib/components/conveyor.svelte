<script lang="ts">
	import { onMount, tick } from 'svelte';

	let logos: (string | null)[] = [];
	let conveyorElement: HTMLDivElement;
	let singleSetWidth = 0;

	onMount(async () => {
		const res = await fetch('/api/tech-tags');
		const tags = await res.json();

		logos = tags
			.filter((tag: { iconUrl?: string }) => !!tag.iconUrl)
			.map((tag: { iconUrl: string }) => tag.iconUrl.replace(/^\/static/, ''));

		await tick();
		singleSetWidth = conveyorElement.scrollWidth / 2;
	});
</script>

<section class="bg-background">
	<div class="relative overflow-hidden px-0 py-4">
		<div
			class="animate-scroll flex whitespace-nowrap"
			bind:this={conveyorElement}
			style="--single-set-width: {singleSetWidth}px; --animation-duration: {Math.max(singleSetWidth / 20, 15)}s;"
		>
			{#each [...logos, ...logos] as logo, i (logo + '-' + i)}
				{#if logo}
					<img
						src={logo}
						alt="tech logo"
						class="mx-5 w-10 h-10 object-contain cursor-pointer opacity-50 grayscale filter hover:grayscale-0 md:mx-10"
						on:error={() => (logos[i % logos.length] = null)}
					/>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	:global(.animate-scroll) {
		animation: scroll var(--animation-duration) linear infinite;
	}
	:global(.animate-scroll:has(img:hover)) {
		animation-play-state: paused;
	}
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-1 * var(--single-set-width)));
		}
	}
</style>
