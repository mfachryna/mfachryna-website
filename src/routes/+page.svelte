<script lang="ts">
	import '../app.css';
	import { onMount, tick } from 'svelte';
	import SocialMedia from '$lib/components/social-media.svelte';
	import Email from '$lib/components/email.svelte';
	import IntroductionSection from '$lib/components/homepage/introduction-section.svelte';
	let AboutSection: any;
	let ExperiencesSection: any;
	let Conveyor: any;
	let WorkSection: any;
	let BlogSection: any;
	let ContactsSection: any;

	let componentsLoaded = false;

	onMount(async () => {
		[AboutSection, ExperiencesSection, Conveyor, WorkSection, BlogSection, ContactsSection] =
			await Promise.all([
				import('$lib/components/homepage/about-section.svelte').then((module) => module.default),
				import('$lib/components/homepage/experiences-section.svelte').then(
					(module) => module.default
				),
				import('$lib/components/conveyor.svelte').then((module) => module.default),
				import('$lib/components/homepage/work-section.svelte').then((module) => module.default),
				import('$lib/components/homepage/blog-section.svelte').then((module) => module.default),
				import('$lib/components/homepage/contacts-section.svelte').then((module) => module.default)
			]);

		componentsLoaded = true;

		await tick();
	});

	export let data;
</script>

<div class="relative z-0">
	<SocialMedia />
	<Email />
	<IntroductionSection />

	{#if componentsLoaded}
		<svelte:component this={AboutSection} />
		<svelte:component this={Conveyor} />
		<svelte:component
			this={ExperiencesSection}
			data={{
				experiences: data.experiences,
				pagination: data.experiencePagination,
				error: data.error
			}}
		/>
		<svelte:component
			this={WorkSection}
			data={{
				projects: data.projects,
				pagination: data.projectPagination
			}}
		/>
        {#if data.showBlogs}
            <svelte:component this={BlogSection} data={data.blogs} />
        {/if}
		<svelte:component this={ContactsSection} />
	{/if}
</div>
