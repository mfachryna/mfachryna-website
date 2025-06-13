<script lang="ts">
	import Wave from '$lib/components/wave.svelte';
	import Layer2 from '$lib/background/layer2.svelte';
	import Layer1 from '$lib/background/layer1.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import ProjectCardSkeleton from './project-card-skeleton.svelte';

	export let skeletonRows = 3;
</script>

<section
	class="work-section relative w-full overflow-hidden bg-none"
	id="work"
	aria-labelledby="works-title"
>
	<Wave position="pointer-events-none absolute top-0 left-0 w-full">
		<Layer2 fill="fill-background" />
	</Wave>

	<div
		class="bg-foreground mx-auto w-full px-6 py-10 sm:px-10 sm:py-20 md:px-16 md:py-40 lg:px-28"
		id="works"
	>
		<div class="mb-8">
			<PageTitle
				title="works"
				textColor="text-background/30"
				line="bg-background/30"
				id="works-title"
			/>
		</div>

		<div class="flex flex-col gap-6">
			{#each Array(skeletonRows) as _, i}
				<div style="animation-delay: {i * 0.2}s" class="animate-pulse">
					<ProjectCardSkeleton />
				</div>
			{/each}
		</div>

		<div class="relative z-20 mt-10 text-center">
			<div
				class="bg-background/20 border-background/30 mx-auto h-12 w-48 animate-pulse rounded border"
			></div>
		</div>

		<div class="text-background/30 mt-4 text-center text-sm">
			<div class="bg-background/15 mx-auto h-4 w-32 animate-pulse rounded"></div>
		</div>
	</div>

	<Wave position="pointer-events-none absolute bottom-0 left-0 w-full z-10">
		<Layer1 fill="fill-background" />
	</Wave>
</section>

<style>
	:global(.project-card-skeleton) {
		opacity: 0;
		transform: translateY(20px);
		animation: slideUpSkeleton 0.5s forwards;
	}

	@keyframes slideUpSkeleton {
		to {
			opacity: 0.7;
			transform: translateY(0);
		}
	}
</style>
