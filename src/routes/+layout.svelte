<script>
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
	import Navbar from '../lib/components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children, data } = $props();
	import { Toaster } from 'svelte-french-toast';

	const siteName = 'Muhammad Fachry Noorchoolish Arif - Software Engineer';
	const siteDescription =
		'Personal portfolio of Muhammad Fachry Noorchoolish Arif, a Software Engineer specializing in web development.';
	const siteUrl = 'https://mfachryna.vercel.com';
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

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<link rel="preload" href="/images/avatar/avatar.webp" as="image" />

	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />

	<style>
		:root {
			--font-nunito: 'Nunito', sans-serif;
			--font-nunito-sans: 'Nunito Sans', sans-serif;
		}
		html {
			font-family: var(--font-nunito);
			color: white;
			background-color: var(--color-base-100);
		}
	</style>
</svelte:head>

<Navbar {data}></Navbar>
<Toaster position="bottom-center" />
{@render children?.()}
<Footer />
