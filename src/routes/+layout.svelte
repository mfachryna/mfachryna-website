<script>
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
	import Navbar from '../lib/components/navbar.svelte';
	import ScrollIndicator from '$lib/components/scroll-indicator.svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	let { children, data } = $props();
	import { Toaster } from 'svelte-french-toast';
	import { onMount, onDestroy } from 'svelte';
	import SocialMedia from '$lib/components/social-media.svelte';
	import Email from '$lib/components/email.svelte';
	import Accent from '$lib/components/accent.svelte';
	import { Moon, Sun } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';

	const siteName = 'Muhammad Fachry Noorchoolish Arif - Software Engineer';
	const siteDescription =
		'Personal portfolio of Muhammad Fachry Noorchoolish Arif, a Software Engineer specializing in web development.';
	const siteUrl = 'https://mfachryna.vercel.com';

	let mounted = false;
	let showScrollTop = writable(false);
	let isSidebarOpen = $state(false);

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
		if (browser) {
			document.body.classList.toggle('overflow-hidden', isSidebarOpen);
		}
	}

	// function closeSidebar() {
	// 	if (isSidebarOpen) {
	// 		isSidebarOpen = false;
	// 		if (browser) {
	// 			document.body.classList.remove('overflow-hidden');
	// 		}
	// 	}
	// }

	function scrollToTop() {
		if (browser) {
			requestAnimationFrame(() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setTimeout(() => {
					if (window.scrollY > 0) window.scrollTo(0, 0);
				}, 600);
			});
		}
	}

	function handleScroll() {
		if (browser) {
			$showScrollTop = window.scrollY > 32;
		}
	}

	onMount(() => {
		mounted = true;
		if (browser) {
			window.addEventListener('scroll', handleScroll);
			$showScrollTop = window.scrollY > 32;
		}
		const mainElement = document.querySelector('main');
		if (mainElement) {
			mainElement.style.opacity = '0';
			mainElement.style.transform = 'translateY(20px)';
			requestAnimationFrame(() => {
				mainElement.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
				mainElement.style.opacity = '1';
				mainElement.style.transform = 'translateY(0)';
			});
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<ModeWatcher></ModeWatcher>

<svelte:head>
	<title>{siteName}</title>
	<meta name="description" content={siteDescription} />

	<meta property="og:title" content={siteName} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:image" content={`${siteUrl}/images/avatar/avatar.webp`} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteName} />
	<meta name="twitter:description" content={siteDescription} />
	<meta name="twitter:image" content={`${siteUrl}/images/avatar/avatar.webp`} />

	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

	<link rel="preload" href="/images/avatar/avatar.webp" as="image" />

	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>

	<style>
		:root {
			--font-inter: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
		}

		html {
			font-family: var(--font-inter);
		}

		/* Smooth page transitions */
		body {
			transition:
				opacity 0.3s ease-out,
				transform 0.3s ease-out;
		}

		/* Modern focus states */
		:focus-visible {
			outline: 2px solid var(--ring);
			outline-offset: 2px;
			border-radius: var(--radius-sm);
		}
	</style>
</svelte:head>

<SocialMedia />
<Email />
<Navbar {isSidebarOpen} {toggleSidebar} {data} />
<Accent />

{#if $showScrollTop && !isSidebarOpen}
	<div class="fixed right-4 bottom-4 z-[999999] transition-all duration-300">
		<button
			onclick={scrollToTop}
			class=" bg-card-foreground hover:text-primary cursor-pointer rounded-full p-2.5 backdrop-blur-md transition-opacity duration-300"
			aria-label="Scroll to top"
			title="Scroll to top"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
			</svg>
		</button>
	</div>
{/if}
{#if !isSidebarOpen}
<div class="fixed bottom-4 left-4 z-[120] block transition-all duration-300 md:hidden">
	<button
		onclick={toggleMode}
		class="bg-accent/30 hover:text-primary/30 backdrop-blur-md cursor-pointer rounded-full p-2.5 transition-opacity duration-300"
		aria-label="Toggle theme"
		title="Toggle theme"
	>
		<Sun
			class="text-background hover:text-foreground h-5 w-5 transition-colors duration-300 dark:hidden"
		/>
		<Moon
			class="text-background hover:text-foreground hidden h-5 w-5 transition-colors duration-300 dark:block"
		/>
	</button>
</div>
{/if}
<main class="relative bg-transparent">
	<ScrollIndicator />
	<Toaster position="bottom-center" />

	{@render children?.()}
	<Footer />
</main>
