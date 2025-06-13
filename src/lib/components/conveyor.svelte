<script lang="ts">
	import { onMount, tick } from 'svelte';
	import ConveyorSkeleton from './skeletons/conveyor-skeleton.svelte';

	let logos: (string | null)[] = [];
	let conveyorElement: HTMLDivElement;
	let singleSetWidth = 0;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const res = await fetch('/api/tech-tags');

			if (!res.ok) {
				throw new Error('Failed to fetch tech tags');
			}

			const tags = await res.json();

			logos = tags
				.filter((tag: { iconUrl?: string }) => !!tag.iconUrl)
				.map((tag: { iconUrl: string }) => tag.iconUrl.replace(/^\/static/, ''));

			await tick();
			singleSetWidth = conveyorElement?.scrollWidth / 2 || 0;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load tech logos';
			console.error('Conveyor error:', err);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<ConveyorSkeleton />
{:else if error}
	<section class="bg-background">
		<div class="relative overflow-hidden px-0 py-4 text-center">
			<p class="text-foreground/50 text-sm">Failed to load tech logos</p>
		</div>
	</section>
{:else if logos.length > 0}
	<section class="bg-background">
		<div class="relative overflow-hidden px-0 py-4">
			<div class="animate-scroll flex whitespace-nowrap" bind:this={conveyorElement}>
				{#each logos as logo, i}
					{#if logo}
						<img
							src={logo}
							alt="tech logo"
							class="mx-5 h-10 w-10 cursor-pointer object-contain opacity-50 grayscale filter transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:mx-10"
							on:error={() => (logos[i] = null)}
						/>
					{/if}
				{/each}

				{#each logos as logo, i}
					{#if logo}
						<img
							src={logo}
							alt="tech logo"
							class="mx-5 h-10 w-10 cursor-pointer object-contain opacity-50 grayscale filter transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:mx-10"
							on:error={() => (logos[i] = null)}
						/>
					{/if}
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.animate-scroll {
		animation: scroll 30s linear infinite;
	}

	.animate-scroll:hover {
		animation-play-state: paused;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
