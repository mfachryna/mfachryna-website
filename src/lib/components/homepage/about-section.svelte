<script>
	import Icon from '@iconify/svelte';
	import AnimateOnScroll from '$lib/components/animate-on-scroll.svelte';
	import PageTitle from '../page-title.svelte';

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
			title: 'The Architect',
			icon: 'drafting-compass',
			description:
				"I design the blueprint for your software's success. My focus is on creating clean, scalable, and maintainable systems that stand the test of time and traffic. I build the strong foundation you need for future growth."
		},
		{
			title: 'The Pragmatist',
			icon: 'sliders-h',
			description:
				'Technology is a toolbox, and I bring the whole set. I choose the right language, framework, and architecture for your specific challenge, ensuring practical, efficient solutions without being dogmatic about a single technology.'
		},
		{
			title: 'The Business Partner',
			icon: 'handshake',
			description:
				'I sit at the intersection of code and commerce. I listen to your business needs and translate them into technical solutions that drive growth, improve efficiency, and deliver a measurable return on investment. Your goals become my technical roadmap.'
		}
	];
</script>

<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify(structuredData)}
	</script>
</svelte:head>

<section class="section-padding relative" id="about" aria-labelledby="about-title">
	<div class="container-modern relative z-10">
		<PageTitle title="About Me" brief={'Get to know me'} />

		<div class="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
			{#each aboutCards as card, i (card.title)}
				<AnimateOnScroll
					animation="bounce"
					delay={i * 150}
					threshold={0.1}
					className="w-fit radius-xl mx-auto backdrop-blur-sm"
				>
					<article
						class="group card-modern hover-lift bg-background/60 relative h-full overflow-hidden !p-0 backdrop-blur-md"
						aria-labelledby={`card-title-${i}`}
						style="--stagger-delay: {0.6 + i * 0.1}s"
					>
						<div
							class="from-primary/5 to-accent/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						></div>

						<div class="relative z-10 flex h-full flex-col p-8">
							<div class="mb-6 flex justify-center">
								<div class="relative">
									<div
										class="from-primary to-accent absolute inset-0 rounded-full bg-gradient-to-br opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-40"
									></div>

									<div
										class="from-primary to-accent text-primary-foreground relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
									>
										<Icon icon="fa-solid:{card.icon}" />
									</div>

									<div
										class="bg-accent/60 floating absolute -top-2 -right-2 h-4 w-4 rounded-full opacity-60"
										style="animation-delay: -{i}s;"
									></div>
									<div
										class="bg-primary/60 floating absolute -bottom-1 -left-1 h-3 w-3 rounded-full opacity-80"
										style="animation-delay: -{i * 0.5}s;"
									></div>
								</div>
							</div>

							<h3
								id={`card-title-${i}`}
								class="group-hover:text-primary mb-4 text-center text-base font-bold transition-colors duration-300 md:text-lg lg:text-xl"
							>
								{card.title}
							</h3>

							<div class="flex flex-1 items-center">
								<p
									class="text-muted-foreground group-hover:text-foreground text-center text-sm leading-relaxed transition-colors duration-300 md:text-base"
								>
									{card.description}
								</p>
							</div>

							<div
								class="from-primary to-accent absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 translate-y-4 transform rounded-full bg-gradient-to-r opacity-0 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-100"
							></div>
						</div>
					</article>
				</AnimateOnScroll>
			{/each}
		</div>

		<div class="mt-20 text-center">
			<AnimateOnScroll animation="fade" delay={600}>
				<div class="mx-auto max-w-3xl">
					<p class="text-muted-foreground mb-8 text-base leading-relaxed lg:text-lg">
						I believe in building software that not only works but makes a difference. Every line of
						code is written with purpose, every system designed with the future in mind, and every
						solution crafted to drive real business value.
					</p>
					<div class="flex flex-wrap justify-center gap-4">
						<div class="badge-modern text-sm md:text-base lg:text-lg">🎯 Problem Solver</div>
						<div class="badge-modern text-sm md:text-base lg:text-lg">🚀 Growth-Oriented</div>
						<div class="badge-modern text-sm md:text-base lg:text-lg">💡 Strategic Thinker</div>
						<div class="badge-modern text-sm md:text-base lg:text-lg">🔧 Technology Agnostic</div>
					</div>
				</div>
			</AnimateOnScroll>
		</div>
	</div>
</section>
