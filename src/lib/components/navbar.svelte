<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button/index.js';

	let isScrolled = false;
	export let pathName = $page.url.pathname;

	pathName = $page.url.pathname;
	$: pathName = $page.url.pathname;

	const navLinks = [
		{ name: 'About', href: '#about' },
		{ name: 'Experiences', href: '#experiences' },
		{ name: 'Works', href: '#work' },
		{ name: 'Blogs', href: '#blogs' },
		{ name: 'Contacts', href: '#contacts' }
	];

	const socialMedia = [
		{ name: 'Github', href: 'https://github.com/mfachryna', logo: 'github' },
		{ name: 'LinkedIn', href: 'https://www.linkedin.com/in/mfachryna', logo: 'linkedin' },
		{ name: 'Instagram', href: 'https://instagram.com/mfachryna', logo: 'instagram' },
		{ name: 'Steam', href: 'https://steamcommunity.com/id/Croazt18/', logo: 'steam' }
	];

	function handleScroll() {
		if (browser) {
			isScrolled = window.scrollY > 16;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
			const body = document.body;
			body.classList.remove('overflow-hidden');
		}
	});
	let isSidebarOpen = false;

	const toggleSidebar = () => {
		isSidebarOpen = !isSidebarOpen;
		if (browser) {
			const body = document.body;
			if (isSidebarOpen) {
				body.classList.add('overflow-hidden');
			} else {
				body.classList.remove('overflow-hidden');
			}
		}
	};

	const handleNavClick = () => {
		isSidebarOpen = false;
		if (browser) {
			const body = document.body;
			body.classList.remove('overflow-hidden');
		}
	};

	let socialMediaWithLogo: Array<{ name: string; href: string; logo: string; component: any }> = [];

	async function loadLogos() {
		socialMediaWithLogo = await Promise.all(
			socialMedia.map(async (link) => {
				const module = await import(`$lib/assets/icons/contacts/${link.logo}.svelte`);
				return { ...link, component: module.default };
			})
		);
	}

	onMount(loadLogos);
	export let data;

	function smoothScrollTo(targetId: string) {
		if (!browser) return;

		if (targetId.startsWith('#')) {
			const el = document.getElementById(targetId.slice(1));
			if (el) {
				const navbarHeight = 80;
				const rect = el.getBoundingClientRect();
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				const targetY = rect.top + scrollTop - navbarHeight;
				window.scrollTo({
					top: targetY,
					behavior: 'smooth'
				});
				return;
			}
		}
		const target = document.querySelector(targetId);
		if (target) {
			const navbarHeight = 80;
			const rect = (target as HTMLElement).getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const targetY = rect.top + scrollTop - navbarHeight;
			window.scrollTo({
				top: targetY,
				behavior: 'smooth'
			});
		}
	}

	function handleNavigation(event: Event, href: string) {
		event.preventDefault();

		if (isSidebarOpen) {
			handleNavClick();
		}

		if (href === '/' || href === '#hero') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});

			if (browser) {
				history.pushState(null, '', '/');
			}
			return;
		}

		smoothScrollTo(href);

		if (browser) {
			history.pushState(null, '', href);
		}
	}
</script>

<header
	class="fixed z-100 flex w-full items-center justify-center transition-all duration-500 ease-out"
	class:mt-4={isScrolled}
>
	<nav
		class="flex w-full items-center justify-between transition-all duration-500 ease-out {isScrolled
			? 'glass-effect hover-lift shadow-soft mx-4 max-w-4xl rounded-2xl px-6 py-3'
			: 'container-modern px-6 py-6'}"
		class:backdrop-blur-xl={isScrolled}
		style="
			{isScrolled ? 'background: var(--card-foreground);' : ''}
			transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		"
	>
		<a
			href="/"
			class="group flex items-center space-x-2 text-xl font-bold transition-all duration-300 hover:scale-105"
			on:click={(e) => handleNavigation(e, '/')}
		>
			<div class="flex items-center space-x-2">
				{#if isScrolled}
					<div
						class="from-primary to-accent text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold"
					>
						F
					</div>
				{:else}
					<span class="gradient-text hidden transition-all duration-300 sm:block"> Fachry </span>
				{/if}
			</div>
		</a>

		<div class="hidden items-center space-x-1 md:flex" class:justify-center={isScrolled}>
			{#each navLinks as link}
				<a
					href={link.href}
					class="hover:bg-secondary/50 relative rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:scale-105 {pathName.startsWith(
						link.href
					)
						? 'text-primary bg-primary/10'
						: 'text-muted-foreground hover:text-foreground'}"
					on:click={(e) => handleNavigation(e, link.href)}
				>
					<span class="relative">
						{link.name}
						{#if pathName.startsWith(link.href)}
							<div
								class="from-primary to-accent absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r"
							></div>
						{/if}
					</span>
				</a>
			{/each}
		</div>

		<div class="md:hidden">
			<button
				class="hover:bg-secondary/50 rounded-lg p-2 transition-all duration-300 hover:scale-105"
				on:click={toggleSidebar}
				aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
			>
				<div class="flex h-6 w-6 flex-col items-center justify-center">
					<span
						class="block h-0.5 w-5 bg-current transition-all duration-300 {isSidebarOpen
							? 'translate-y-0.5 rotate-45'
							: ''}"
					></span>
					<span
						class="mt-1 block h-0.5 w-5 bg-current transition-all duration-300 {isSidebarOpen
							? 'opacity-0'
							: ''}"
					></span>
					<span
						class="mt-1 block h-0.5 w-5 bg-current transition-all duration-300 {isSidebarOpen
							? '-translate-y-1.5 -rotate-45'
							: ''}"
					></span>
				</div>
			</button>
		</div>

		<div class="hidden md:flex">
			{#if data?.resumeUrl}
				<a
					href={data.resumeUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-modern group relative overflow-hidden"
				>
					<span class="relative z-10 flex items-center space-x-2">
						<span>Resume</span>
						<svg
							class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							></path>
						</svg>
					</span>
				</a>
			{:else}
				<button class="btn-modern cursor-not-allowed opacity-50" disabled> Resume </button>
			{/if}
		</div>
	</nav>
</header>

<div
	class="fixed inset-0 z-40 transition-opacity duration-300 md:hidden {isSidebarOpen
		? 'pointer-events-auto opacity-100'
		: 'pointer-events-none opacity-0'}"
>
	<div
		class="glass-effect absolute top-0 right-0 h-full w-80 max-w-full transform transition-transform duration-500 ease-out {isSidebarOpen
			? 'translate-x-0'
			: 'translate-x-full'}"
		style="background: oklch(from var(--card) l c h / 0.95);"
	>
		<div class="flex justify-end p-6">
			<button
				class="hover:bg-secondary/50 rounded-full p-2 transition-colors"
				on:click={handleNavClick}
				aria-label="Close sidebar"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>
		</div>

		<div class="mt-8 flex flex-col space-y-3 px-6">
			{#each navLinks as link}
				<a
					href={link.href}
					class="group hover:bg-secondary/50 relative flex items-center rounded-xl px-4 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 {pathName.startsWith(
						link.href
					)
						? 'text-primary bg-primary/10'
						: 'text-muted-foreground hover:text-foreground'}"
					on:click={(e) => handleNavigation(e, link.href)}
				>
					<span class="relative">
						{link.name}
						{#if pathName.startsWith(link.href)}
							<div
								class="from-primary to-accent absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r"
							></div>
						{/if}
					</span>
					<svg
						class="text-muted-foreground group-hover:text-foreground ml-auto h-4 w-4 transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
						></path>
					</svg>
				</a>
			{/each}

			<div class="border-border/50 mt-6 border-t pt-6">
				{#if data?.resumeUrl}
					<a
						href={data.resumeUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-modern block w-full text-center"
						on:click={handleNavClick}
					>
						<span class="flex items-center justify-center space-x-2">
							<span>Resume</span>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								></path>
							</svg>
						</span>
					</a>
				{:else}
					<button class="btn-modern w-full cursor-not-allowed opacity-50" disabled> Resume </button>
				{/if}
			</div>
		</div>

		<div class="absolute right-6 bottom-8 left-6">
			<div class="border-border/50 flex justify-center space-x-6 border-t pt-6">
				{#each socialMediaWithLogo as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-secondary/50 hover:bg-secondary hover-lift rounded-full p-3 transition-all duration-300 hover:scale-110"
					>
						<svelte:component
							this={link.component}
							class="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors"
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
