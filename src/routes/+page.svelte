<script lang="ts">
	import '../app.css';
	import SocialMedia from '$lib/components/social-media.svelte';
	import Email from '$lib/components/email.svelte';
	import IntroductionSection from '$lib/components/homepage/introduction-section.svelte';
	import AboutSection from '$lib/components/homepage/about-section.svelte';
	import Conveyor from '$lib/components/conveyor.svelte';
	import LazySection from '$lib/components/lazy-section.svelte';
	import ContactsSection from '$lib/components/homepage/contacts-section.svelte';

	export let data;
</script>

<div class="relative z-0">
	<SocialMedia />
	<Email />
	<IntroductionSection />
	<AboutSection />
	<Conveyor />

	<LazySection
		apiEndpoint="/api/experiences"
		componentName="experiences"
		sectionId="experiences"
		skeletonRows={3}
	/>

	<LazySection apiEndpoint="/api/projects" componentName="work" sectionId="work" skeletonRows={2} />

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
