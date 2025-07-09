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

		const target = document.querySelector(targetId);
		if (target) {
			const navbarHeight = 80;
			const targetPosition = target.offsetTop - navbarHeight;

			window.scrollTo({
				top: targetPosition,
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
	class="fixed z-30 flex w-full items-center justify-center"
	class:mt-2={isScrolled}
	style="transition: all 0.5s ease-in-out;"
>
	<div
		class="border-border flex grow justify-between transition-all duration-300 {isScrolled
			? 'bg-accent/20 px-3 py-1 md:px-4 md:py-2'
			: 'px-6 py-4 sm:px-10 md:px-16 lg:px-28'}"
		class:backdrop-blur-md={isScrolled}
		class:border={isScrolled}
		class:rounded-lg={isScrolled}
		class:grow-0={isScrolled}
	>
		<a href="/" class="my-auto mr-4 font-bold" on:click={(e) => handleNavigation(e, '/')}>
			{isScrolled ? 'Home/' : 'FACHRY'}
		</a>

		<div class="my-auto hidden md:flex" class:justify-center={isScrolled}>
			{#each navLinks as link}
				<a
					href={link.href}
					class="hover:text-primary mr-4 transition-colors duration-200"
					class:font-bold={pathName.startsWith(link.href)}
					class:text-destructive={pathName.startsWith(link.href)}
					on:click={(e) => handleNavigation(e, link.href)}
				>
					{link.name}
				</a>
			{/each}
		</div>
		<div class="md:hidden">
			<button class="text-2xl" on:click={toggleSidebar}>
				{#if isSidebarOpen}
					&times;
				{:else}
					&#9776;
				{/if}
			</button>
		</div>

		<div class="hidden align-middle md:flex">
			{#if data?.resumeUrl}
				<Button>
					<a href={data.resumeUrl} target="_blank" rel="noopener noreferrer"> Resume </a>
				</Button>
			{:else}
				<Button disabled>Resume</Button>
			{/if}
		</div>
	</div>
</header>

<div
	class={`bg-accent/90 fixed top-0 right-0 z-20 h-full w-full transform pt-10 transition-transform duration-300 ease-in-out md:hidden ${
		isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
	}`}
>
	<div class="relative flex h-full flex-col items-center">
		<div class="flex h-full flex-col items-center justify-center pb-40">
			{#each navLinks as link}
				<a
					href={link.href}
					class={`hover:text-primary mb-4 text-lg transition-colors duration-200 ${
						pathName.startsWith(link.href) ? 'text-destructive font-bold' : ''
					}`}
					on:click={(e) => handleNavigation(e, link.href)}
				>
					{link.name}
				</a>
			{/each}

			{#if data?.resumeUrl}
				<Button class="mb-4">
					<a
						href={data.resumeUrl}
						target="_blank"
						rel="noopener noreferrer"
						on:click={handleNavClick}
					>
						Resume
					</a>
				</Button>
			{:else}
				<Button class="mb-4" disabled>Resume</Button>
			{/if}
		</div>
		<div class="absolute bottom-5 mt-auto flex flex-row items-center gap-5">
			{#each socialMediaWithLogo as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-foreground/40 z-50 h-7 w-7"
				>
					<svelte:component this={link.component} class="h-7 w-7" />
				</a>
			{/each}
		</div>
	</div>
</div>
