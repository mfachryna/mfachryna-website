<script lang="ts">
	const {
		title = '',
		description = '',
		type = 'website',
		image = '',
		url = '',
		keywords = '',
		structuredData = null,
		children
	} = $props<{
		title?: string | undefined;
		description?: string;
		type?: string;
		image?: string;
		url?: string;
		keywords?: string;
		structuredData?: object | null;
		children?: any;
	}>();

	const siteTitle = 'Muhammad Fachry Noorchoolish Arif - Software Engineer';
	const siteDescription =
		'Personal portfolio of Muhammad Fachry Noorchoolish Arif, a Software Engineer specializing in web development.';
	const defaultImage = '/images/avatar/avatar.webp';
	const siteUrl = 'https://yoursite.com';
</script>

<svelte:head>
	<title>{title || siteTitle}</title>
	<meta name="description" content={description || siteDescription} />
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	<meta property="og:title" content={title || siteTitle} />
	<meta property="og:description" content={description || siteDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url || siteUrl} />
	<meta
		property="og:image"
		content={(image || defaultImage).startsWith('http')
			? image || defaultImage
			: `${siteUrl}${image || defaultImage}`}
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title || siteTitle} />
	<meta name="twitter:description" content={description || siteDescription} />
	<meta
		name="twitter:image"
		content={(image || defaultImage).startsWith('http')
			? image || defaultImage
			: `${siteUrl}${image || defaultImage}`}
	/>

	{#if structuredData}
		<script type="application/ld+json">
      {JSON.stringify(structuredData)}
		</script>
	{/if}
</svelte:head>

{@render children?.()}
