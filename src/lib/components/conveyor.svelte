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
	<section class="relative bg-gradient-to-r">
		<div class="relative overflow-hidden px-0 py-8 text-center">
			<div class="card-modern mx-auto max-w-md">
				<p class="text-muted-foreground text-sm">Failed to load tech logos</p>
				<div class="bg-destructive/30 mx-auto mt-2 h-1 w-16 rounded-full"></div>
			</div>
		</div>
	</section>
{:else if logos.length > 0}
	<section class="relative bg-gradient-to-r">
		<div class="relative overflow-hidden px-0 py-12">
			<div class="relative">

				<div class="tech-conveyor flex whitespace-nowrap" bind:this={conveyorElement}>
					{#each logos as logo, i}
						{#if logo}
							<div class="tech-logo-container group p-2 mx-3 md:mx-4">
								<div class="relative">
									<div
										class="from-primary/20 to-accent/20 absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"
									></div>

									<div
										class=" backdrop-blur-md bg-foreground/10 border-border/50 group-hover:border-accent/30 group-hover:bg-primary/10 relative rounded-lg border p-3 transition-all duration-500 group-hover:scale-110"
									>
										<img
											src={logo}
											alt="tech logo"
											class="h-8 w-8 object-contain opacity-60 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
											onerror={() => (logos[i] = null)}
										/>
									</div>
								</div>
							</div>
						{/if}
					{/each}

					{#each logos as logo, i}
						{#if logo}
							<div class="tech-logo-container group p-2 mx-3 md:mx-4">
								<div class="relative">
									<div
										class="from-primary/20 to-accent/20 inset-0 rounded-lg bg-gradient-to-r opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"
									></div>

									<div
										class=" backdrop-blur-md bg-foreground/10 border-border/50 group-hover:border-accent/30 group-hover:bg-primary/10 relative rounded-lg border p-3 transition-all duration-500 group-hover:scale-110"
									>
										<img
											src={logo}
											alt="tech logo"
											class="h-8 w-8 object-contain opacity-60 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
											onerror={() => (logos[i] = null)}
										/>
									</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}

<style>
	.tech-conveyor {
		animation: smooth-scroll 40s linear infinite;
		will-change: transform;
	}

	.tech-conveyor:hover {
		animation-play-state: paused;
	}

	@keyframes smooth-scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.tech-logo-container {
		flex-shrink: 0;
		cursor: pointer;
	}

	/* Performance optimizations */
	.tech-logo-container {
		contain: layout style paint;
	}

	/* Smooth hover transitions */
	.tech-logo-container:hover {
		z-index: 10;
	}

	/* Enhanced animation for logos entering viewport */
	@media (prefers-reduced-motion: no-preference) {
		.tech-logo-container {
			animation: fadeInScale 0.6s ease-out forwards;
			opacity: 0;
		}

		.tech-logo-container:nth-child(odd) {
			animation-delay: 0.1s;
		}

		.tech-logo-container:nth-child(even) {
			animation-delay: 0.2s;
		}
	}

	@keyframes fadeInScale {
		from {
			opacity: 0;
			transform: scale(0.8) translateY(10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
