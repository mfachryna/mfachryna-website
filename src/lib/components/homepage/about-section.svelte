<script>
	import PageTitle from '../page-title.svelte';
	import Conveyor from '../conveyor.svelte';
	import Wave from '../wave.svelte';
	import Layer2 from '$lib/background/layer2.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: 'Muhammad Fachry Noorchoolish Arif',
			jobTitle: 'Software Engineer',
			description: 'Problem solver, versatile expert, and growth-oriented software engineer',
			skills: ['Problem Solving', 'Software Development', 'Web3', 'Strategic Thinking']
		}
	};

	export const aboutCards = [
		{
			title: 'Problem Solver',
			icon: 'puzzle-piece',
			description:
				'I thrive on tackling complex challenges, whether in software engineering, system design, or process optimization. My approach is analytical, data-driven, and creative, ensuring robust solutions for every problem.'
		},
		{
			title: 'Versatile Technologist',
			icon: 'laptop-code',
			description:
				'With experience across web, mobile, and backend development, I adapt quickly to new technologies and frameworks. My portfolio spans fintech, banking, and startup environments, reflecting my ability to deliver in diverse settings.'
		},

		{
			title: 'Impact-Driven',
			icon: 'rocket',
			description:
				'I aim to create meaningful impact through technology, from improving user experiences to building scalable systems that support business objectives. My work is driven by a passion for innovation and excellence.'
		}
	];

	let isIntersecting = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isIntersecting = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		const section = document.getElementById('about');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify(structuredData)}
	</script>
</svelte:head>

<section class="bg-foreground relative w-full py-7" id="about" aria-labelledby="about-title">
	<div class="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-28">
		<PageTitle title="About Me" textColor="text-background" line="bg-background" id="about-title" />

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each aboutCards as card, i (card.title)}
				<article
					class="card bg-accent border-accent text-foreground transform rounded-xl border-2 shadow-md transition-transform duration-400 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
					aria-labelledby={`card-title-${i}`}
				>
					<header class="flex flex-col items-center px-6 pt-8 pb-4 text-center">
						<div
							class="card-icon bg-foreground/20 mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full text-[1.8rem] transition-transform duration-300 ease-in-out"
							aria-hidden="true"
						>
							{#if isIntersecting}
								<Icon icon="fa-solid:{card.icon}" />
							{/if}
						</div>
						<h3
							id={`card-title-${i}`}
							class="mb-4 text-[1.5rem] font-semibold transition-colors duration-300"
						>
							{card.title}
						</h3>
					</header>
					<div class="grow px-8 pb-8 text-center">
						<p class="text-sm leading-7 sm:text-base md:text-lg lg:text-xl">{card.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.card:hover .card-icon {
		background-color: var(--muted-foreground);
		transform: scale(1.1);
	}

	.card {
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.card:nth-child(1) {
		animation-delay: 0.1s;
	}
	.card:nth-child(2) {
		animation-delay: 0.3s;
	}
	.card:nth-child(3) {
		animation-delay: 0.5s;
	}
</style>
