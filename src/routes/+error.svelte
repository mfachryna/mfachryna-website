<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import SEO from '$lib/components/seo.svelte';
	import AnimateOnScroll from '$lib/components/animate-on-scroll.svelte';

	export let data;

	$: status = $page.status;
	$: message = $page.error?.message;

	function goHome() {
		window.location.href = '/';
	}

	function goBack() {
		history.back();
	}
</script>

<SEO
	title="Page Not Found | Muhammad Fachry Noorchoolish Arif"
	description="The page you're looking for doesn't exist."
/>

<section
	class="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
>
	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-10 md:px-16 lg:px-28">
		<AnimateOnScroll animation="bounce" delay={0} threshold={0.1}>
			<div class="mb-8">
				<h1 class="text-foreground mb-4 text-8xl font-bold md:text-9xl">
					{status || 404}
				</h1>
				<div class="bg-foreground mx-auto h-1 w-24 rounded-full"></div>
			</div>
		</AnimateOnScroll>

		<AnimateOnScroll animation="slide" delay={200} threshold={0.1}>
			<div class="mb-8">
				<h2 class="text-foreground mb-4 text-2xl font-semibold md:text-3xl">
					{#if status === 404}
						Page Not Found
					{:else if status === 500}
						Server Error
					{:else}
						Something Went Wrong
					{/if}
				</h2>
				<p class="text-foreground/70 mx-auto max-w-md text-lg">
					{#if message}
						{message}
					{:else if status === 404}
						The page you're looking for doesn't exist or has been moved.
					{:else}
						An error occurred while processing your request.
					{/if}
				</p>
			</div>
		</AnimateOnScroll>

		<AnimateOnScroll animation="zoom-in" delay={400} threshold={0.1}>
			<p class="text-foreground/50 text-sm">Lost? Here are some helpful links:</p>
			<div class="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-center">
				<Button variant="default" onclick={goHome}>Go Home</Button>
				<Button variant="outline" onclick={goBack}>Go Back</Button>
			</div>
		</AnimateOnScroll>
	</div>
</section>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
