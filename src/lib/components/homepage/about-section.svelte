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
			description:
				'Software Engineer and ODP IT Trainee at Bank Syariah Indonesia, with strong experience building backend systems in Go, Laravel, PostgreSQL, and distributed architectures.',
			skills: ['Go', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL', 'API Design', 'Microservices', 'Docker', 'Technical Documentation']
		}
	};

	// NOTE: `fa-solid` in Iconify is Font Awesome 5. FA6-only names
	// (arrow-trend-up, screwdriver-wrench) resolve to nothing and render blank.
	// Verify a name at https://api.iconify.design/fa-solid/<name>.svg before using it.
	const traits = [
		{ label: 'Problem Solver', icon: 'bullseye' },
		{ label: 'Growth-Oriented', icon: 'chart-line' },
		{ label: 'Strategic Thinker', icon: 'lightbulb' },
		{ label: 'Technology Agnostic', icon: 'tools' }
	];

	export const aboutCards = [
		{
			title: 'The Architect',
			icon: 'drafting-compass',
			description:
				'I design the data models and APIs the rest of the system leans on. On the loyalty platform that meant a schema that stayed correct across point-of-sale and order management — the kind of foundation you only notice when it is missing.'
		},
		{
			title: 'The Pragmatist',
			icon: 'sliders-h',
			description:
				'Technology is a toolbox, not a religion. Laravel and MySQL for most of what I build, Go and PostgreSQL where the problem calls for it. The right choice is the one your team can still maintain a year after I hand it over.'
		},
		{
			title: 'The Business Partner',
			icon: 'handshake',
			description:
				'I work to deadlines that belong to somebody else. Five maintenance projects and one build running in parallel, 84% of features delivered on time or early, and a handover at the end that leaves your team able to run it without me.'
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
									class="text-muted-foreground group-hover:text-foreground text-sm leading-relaxed transition-colors duration-300 md:text-base"
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

		<div class="mt-20">
			<AnimateOnScroll animation="fade" delay={600}>
				<div class="mx-auto max-w-3xl">
					<p class="text-muted-foreground mb-8 text-base leading-relaxed lg:text-lg">
						I believe in building software that not only works but makes a difference. Every line of
						code is written with purpose, every system designed with the future in mind, and every
						solution crafted to drive real business value.
					</p>
					<div class="flex flex-wrap justify-center gap-4">
						<!--
							The labels are the original ones. Only the glyphs changed: full-colour
							emoji (red target, orange rocket, yellow bulb) sat on top of the muted
							oklch palette and read as pasted on. These are monochrome Iconify icons
							inheriting currentColor, the same set the cards above already use, so
							they take the theme instead of fighting it.
						-->
						{#each traits as trait (trait.label)}
							<div class="badge-modern inline-flex items-center gap-2 text-sm md:text-base lg:text-lg">
								<Icon icon="fa-solid:{trait.icon}" class="text-primary shrink-0 text-[0.85em]" />
								<span>{trait.label}</span>
							</div>
						{/each}
					</div>
				</div>
			</AnimateOnScroll>
		</div>
	</div>
</section>
