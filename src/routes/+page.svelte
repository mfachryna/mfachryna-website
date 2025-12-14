<script lang="ts">
	import '../app.css';
	import IntroductionSection from '$lib/components/homepage/introduction-section.svelte';
	import AboutSection from '$lib/components/homepage/about-section.svelte';
	import Conveyor from '$lib/components/conveyor.svelte';
	import LazySection from '$lib/components/lazy-section.svelte';
	import ContactsSection from '$lib/components/homepage/contacts-section.svelte';
	import SEO from '$lib/components/seo.svelte';

	export let data;

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Muhammad Fachry Noorchoolish Arif",
		"url": "https://mfachryna.my.id"
	};
</script>

<SEO 
	title="Home | Muhammad Fachry Noorchoolish Arif"
	description="Personal portfolio of Muhammad Fachry Noorchoolish Arif, a Software Engineer specializing in web development."
	{structuredData}
/>

<div class="relative">
	<IntroductionSection />

	<div class="relative space-y-0">
		<AboutSection />

		<div class="section-padding">
			<Conveyor />
		</div>

		<LazySection
			apiEndpoint="/api/experiences"
			componentName="experiences"
			sectionId="experiences"
			skeletonRows={3}
		/>

		<LazySection
			apiEndpoint="/api/projects"
			componentName="work"
			sectionId="work"
			skeletonRows={2}
		/>

		{#if data?.showBlogs}
			<LazySection
				apiEndpoint="/api/blogs"
				componentName="blogs"
				sectionId="blogs"
				skeletonRows={3}
			/>
		{/if}

		<ContactsSection />
	</div>
</div>
