<script>
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
	import Navbar from '../lib/components/navbar.svelte';
	import ScrollIndicator from '$lib/components/scroll-indicator.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children, data } = $props();
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import SocialMedia from '$lib/components/social-media.svelte';
	import Email from '$lib/components/email.svelte';
	import Accent from '$lib/components/accent.svelte';

	const siteName = 'Muhammad Fachry Noorchoolish Arif - Software Engineer';
	const siteDescription =
		'Personal portfolio of Muhammad Fachry Noorchoolish Arif, a Software Engineer specializing in web development.';
	const siteUrl = 'https://mfachryna.vercel.com';

	let mounted = false;

	onMount(() => {
		mounted = true;
		// Add smooth entrance animation to main content only (not body)
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
<Navbar {data}></Navbar>
<Accent />
<main class="relative bg-transparent">
	<ScrollIndicator />
	<Toaster position="bottom-center" />

	{@render children?.()}
	<Footer />
</main>
