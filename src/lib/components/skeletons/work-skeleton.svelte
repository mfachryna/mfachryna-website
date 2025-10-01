<script lang="ts">
	import Wave from '$lib/components/wave.svelte';
	import Layer2 from '$lib/background/layer2.svelte';
	import Layer1 from '$lib/background/layer1.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import ProjectCardSkeleton from './project-card-skeleton.svelte';

	export let skeletonRows = 3;
</script>

<section class="bg-background section-padding relative" id="work" aria-labelledby="works-title">
	<div class="container-modern relative z-10">
		<div class="mb-16 space-y-4 text-center">
			<div class="inline-block">
				<div class="skeleton-shimmer mx-auto mb-2 h-6 w-32 rounded"></div>
				<div class="skeleton-shimmer mx-auto h-12 w-48 rounded-lg"></div>
			</div>
			<div class="skeleton-shimmer mx-auto h-1 w-24 rounded-full"></div>
			<div class="skeleton-shimmer mx-auto h-4 w-80 rounded"></div>
		</div>

		<div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
			{#each Array(skeletonRows) as _, i}
				<div style="animation-delay: {i * 0.15}s" class="work-skeleton-item">
					<ProjectCardSkeleton />
				</div>
			{/each}
		</div>

		<div class="mt-12 space-y-4 text-center">
			<div class="skeleton-shimmer mx-auto h-12 w-48 rounded-lg"></div>
			<div class="skeleton-shimmer mx-auto h-4 w-32 rounded"></div>
		</div>
	</div>

	<Wave position="pointer-events-none absolute bottom-0 left-0 w-full z-10">
		<Layer1 fill="fill-background" />
	</Wave>
</section>

<style>
	.skeleton-shimmer {
		background: linear-gradient(
			90deg,
			var(--muted) 25%,
			var(--muted-foreground) / 10 50%,
			var(--muted) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 2s infinite;
	}

	.work-skeleton-item {
		opacity: 0;
		transform: translateY(30px) scale(0.95);
		animation: slideUpFade 0.6s ease-out forwards;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	@keyframes slideUpFade {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Performance optimizations */
	.work-skeleton-item {
		will-change: transform, opacity;
		contain: layout style paint;
	}
</style>
