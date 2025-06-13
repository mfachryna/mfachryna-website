<script>
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Moon, Sun } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
	import socialMediaData from '$lib/data/social-media.json';

	let navLinksWithLogos = [];

	const navLinks = socialMediaData.socialLinks;

	async function loadLogos() {
		navLinksWithLogos = await Promise.all(
			navLinks.map(async (link) => {
				try {
					const module = await import(`$lib/assets/icons/contacts/${link.logo}.svelte`);
					return { ...link, component: module.default };
				} catch (error) {
					console.warn(`Could not load logo for ${link.name}:`, error);
					return { ...link, component: null };
				}
			})
		);
	}

	onMount(loadLogos);
</script>

<section
	class="y-1 fixed z-50 hidden h-full flex-col items-center justify-between px-6 text-center md:flex"
	style="transition: all 0.5s ease-in-out;"
>
	<div class="bg-accent mb-3 h-2/5 w-1 rounded-full"></div>

	{#each navLinksWithLogos as link}
		{#if link.component}
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="text-accent group my-3 h-7 w-7 transition-all duration-300 hover:scale-110 {link.color}"
				aria-label="{link.name} - {link.description}"
				title="{link.name} - {link.description}"
			>
				<svelte:component
					this={link.component}
					class="my-3 h-7 w-7 transition-transform group-hover:scale-105"
				/>
			</a>
		{/if}
	{/each}

	<Button
		onclick={toggleMode}
		size="icon"
		class="bg-accent hover:bg-accent/50 my-3 h-8 w-8 rounded-full"
		variant="outline"
	>
		<Sun
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>

	<div class="bg-accent mt-3 h-2/5 w-1 rounded-full"></div>
</section>
