<script lang="ts">

	import { onMount } from 'svelte';
	import AnimatedProfile from '$lib/assets/icons/profile.svelte';
	import { browser } from '$app/environment';
	import { tick } from 'svelte';

	const texts = [
		'A SOFTWARE ENGINEER',
		'A NOOB GAMER',
		'A GREAT WHITE SHARK',
		'A HOPELESS ROMANTIC MAN',
		'A LAG EXCUSE STRATEGIST',
		'A CURIOUS MONKEY',
		'A PROFESSIONAL SLEEPER',
		'A DARK MODE EVANGELIST',
		'A ROCK-SKIPPING SPEEDSTER',
		'A TRAIL-SEEKING ADVENTURER',
		'A MASTER OF CTRL+Z',
		'A SNOOZE BUTTON SCHOLAR'
	];
	const title = 'Muhammad Fachry Noorchoolish Arif - Software Engineer';
	const description = 'Experienced Software Engineer and ODP IT Trainee at Bank Syariah Indonesia';

	let currentText = '';
	let sentenceIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let cursorVisible = true;
	let isComponentMounted = false;
	let animationsStarted = false;

	function typeWriter() {
		if (!isComponentMounted || !animationsStarted) return;

		const sentence = texts[sentenceIndex];
		if (!isDeleting) {
			if (charIndex < sentence.length) {
				currentText += sentence[charIndex++];
				setTimeout(typeWriter, 60);
			} else {
				setTimeout(() => {
					isDeleting = true;
					typeWriter();
				}, 1500);
			}
		} else {
			if (charIndex > 0) {
				currentText = sentence.substring(0, --charIndex);
				setTimeout(typeWriter, 50);
			} else {
				isDeleting = false;
				sentenceIndex = (sentenceIndex + 1) % texts.length;
				setTimeout(typeWriter, 60);
			}
		}
	}

	function blinkCursor() {
		if (!isComponentMounted || !animationsStarted) return;
		cursorVisible = !cursorVisible;
		setTimeout(blinkCursor, 500);
	}

	function startAnimationsWhenIdle() {
		if (typeof window.requestIdleCallback === 'function') {
			window.requestIdleCallback(() => {
				animationsStarted = true;
				typeWriter();
				blinkCursor();
			});
		} else {
			setTimeout(() => {
				animationsStarted = true;
				typeWriter();
				blinkCursor();
			}, 100);
		}
	}



	function smoothScrollTo(targetId: string) {
		if (!browser) return;

		if (targetId.startsWith('#')) {
			const el = document.getElementById(targetId.slice(1));
			if (el) {
				const navbarHeight = 80;
				const rect = el.getBoundingClientRect();
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				const targetY = rect.top + scrollTop - navbarHeight;
				window.scrollTo({
					top: targetY,
					behavior: 'smooth'
				});
				return;
			}
		}
		const target = document.querySelector(targetId);
		if (target) {
			const navbarHeight = 80;
			const rect = (target as HTMLElement).getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const targetY = rect.top + scrollTop - navbarHeight;
			window.scrollTo({
				top: targetY,
				behavior: 'smooth'
			});
		}
	}

	onMount(() => {
		isComponentMounted = true;

		tick().then(() => {
			startAnimationsWhenIdle();
		});

		return () => {
			isComponentMounted = false;
			// window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<section
	class="relative flex min-h-screen w-full flex-col overflow-hidden"
	id="index"
	aria-label="Introduction"
>
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="from-primary/20 to-accent/20 floating absolute top-1/4 left-1/4 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br blur-md sm:h-64 sm:w-64 md:h-96 md:w-96 md:blur-3xl"
		></div>
		<div
			class="from-accent/15 to-primary/15 floating absolute right-1/4 bottom-1/4 h-32 w-32 rounded-full bg-gradient-to-br blur-md sm:h-56 sm:w-56 md:h-80 md:w-80 md:blur-3xl"
			style="animation-delay: -3s;"
		></div>
	</div>

	<div
		class="container-modern section-padding relative z-10 flex flex-1 flex-col items-center justify-center"
	>
		<div class="group relative mb-12">
			<div
				class="from-primary to-accent absolute inset-0 animate-pulse rounded-full bg-gradient-to-r opacity-75 blur-lg transition-opacity duration-500 group-hover:opacity-100"
			></div>
			<div class="relative">
				<AnimatedProfile
					src="/images/avatar/avatar.webp"
					alt="Muhammad Fachry Noorchoolish Arif profile picture"
					size="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 hover-lift"
				/>

				<div
					class="from-accent to-primary floating absolute -top-4 -right-4 h-8 w-8 rounded-full bg-gradient-to-r opacity-80"
					style="animation-delay: -1s;"
				></div>
				<div
					class="from-primary to-accent floating absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-gradient-to-r opacity-60"
					style="animation-delay: -2s;"
				></div>
			</div>
		</div>

		<div class="mx-auto w-full max-w-4xl space-y-8 text-center">
			<div class="mb-3">
				<div class="inline-block">
					<span
						class="text-muted-foreground text-sm font-medium uppercase sm:text-base md:text-base lg:text-lg"
						>Welcome to my world</span
					>
				</div>
				<h1
					class=", text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl"
				>
					<span class="">Hi, I'm Fachry</span>
				</h1>
			</div>
			<div class="flex items-center justify-center">
				<div class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
					<span class="gradient-text relative">
						{currentText}
						<span
							class="from-primary to-accent ml-1 inline-block h-5 w-0.5 bg-gradient-to-b transition-opacity duration-300 sm:h-7 md:h-9 lg:h-10"
							class:opacity-100={cursorVisible}
							class:opacity-0={!cursorVisible}
							aria-hidden="true"
						></span>
					</span>
				</div>
			</div>

			<div class="flex justify-center">
				<div
					class="from-primary via-accent to-primary h-1 w-24 rounded-full bg-gradient-to-r"
				></div>
			</div>

			<div class="mx-auto max-w-3xl space-y-6">
				<p class="text-foreground text-lg font-semibold sm:text-xl md:text-2xl">
					Software Engineer at Bank Syariah Indonesia
				</p>
				<p class="text-muted-foreground text-sm leading-relaxed sm:text-base md:text-lg">
					Passionate about crafting elegant solutions and building scalable systems. From backend
					APIs to system designs, I transform ideas into impactful digital products that make a
					difference in people's lives.
				</p>
			</div>

			<div class="flex flex-row items-center justify-center gap-4 pt-8">
				<button class="btn-modern group" onclick={() => smoothScrollTo('#work')}>
					<span class="flex items-center text-xs sm:text-sm md:text-base">
						<span>View My Work</span>
						<svg
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							></path>
						</svg>
					</span>
				</button>
				<button
					class="border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/50 rounded-lg border-2 px-8 py-3 text-xs font-medium transition-all duration-300 hover:scale-105 sm:text-sm md:text-base"
					onclick={() => smoothScrollTo('#contacts')}
				>
					Get In Touch
				</button>
			</div>
		</div>
	</div>
</section>
