<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Moon, Sun } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
	import socialMediaData from '$lib/data/social-media.json';

	type NavLink = {
		name: string;
		description: string;
		href: string;
		logo: string;
		color?: string;
		component?: typeof import('svelte').SvelteComponent | null;
	};

	let navLinksWithLogos: NavLink[] = [];

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
	class="fixed left-6 top-0 z-[9999] hidden h-screen flex-col items-center justify-center gap-9 py-8 text-center md:flex"
	style="transition: all 0.5s ease-in-out;"
>

	<div class="w-px h-24 bg-gradient-to-b from-transparent via-primary to-accent"></div>
	{#each navLinksWithLogos as link}
		{#if link.component}
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="text-accent group h-7 w-7 transition-all duration-300 hover:scale-110 {link.color}"
				aria-label="{link.name} - {link.description}"
				title="{link.name} - {link.description}"
			>
				<svelte:component
					this={link.component}
					class="w-2 h-2 group-hover:text-primary transition-colors duration-300"
				/>
			</a>
		{/if}
	{/each}

	<button
		on:click={toggleMode}
		class="bg-accent hover:text-primary transition-opacity duration-300 p-1.5 rounded-full"
		aria-label="Toggle theme"
		title="Toggle theme"
	>
		<Sun
			class="w-5 h-5 text-background hover:text-foreground transition-colors duration-300 dark:hidden"
		/>
		<Moon
			class="w-5 h-5 text-background hover:text-foreground transition-colors duration-300 hidden dark:block"
		/>
	</button>
	<div class="w-px h-24 bg-gradient-to-b from-accent via-primary to-transparent"></div>
</section>
