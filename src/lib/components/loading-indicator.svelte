<script lang="ts">
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let progress = 0;
	let interval: ReturnType<typeof setInterval>;
	let isVisible = false;

	$: if ($navigating) {
		isVisible = true;
		progress = 10;
		clearInterval(interval);
		interval = setInterval(() => {
			if (progress < 90) {
				progress += Math.random() * 10;
			}
		}, 300);
	} else {
		progress = 100;
		clearInterval(interval);
		setTimeout(() => {
			isVisible = false;
			progress = 0;
		}, 400); // Wait for the transition to finish
	}

	onMount(() => {
		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if isVisible}
	<div
		class="fixed top-0 left-0 z-[1000] h-1 w-full overflow-hidden"
		transition:fade={{ duration: 300 }}
	>
		<div
			class="from-primary via-accent to-primary h-full rounded-r-full bg-gradient-to-r transition-all duration-300 ease-out"
			style="width: {progress}%"
		></div>
		<div
			class="absolute top-0 right-0 h-full w-[400px] animate-pulse bg-gradient-to-l from-white/40 to-transparent"
			style="transform: translateX({140 - progress}%);"
		></div>
	</div>
{/if}
