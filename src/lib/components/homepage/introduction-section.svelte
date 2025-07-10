<script lang="ts">
	import Layer1 from '$lib/background/layer1.svelte';
	import { onMount } from 'svelte';
	import { popUpText } from '$lib/actions/pop-up-text';
	import AnimatedProfile from '$lib/assets/icons/profile.svelte';
	import Wave from '../wave.svelte';
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
	let dimOpacity = 0;
	let parallaxOffset = 0;
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

	function handleScroll() {
		if (!isComponentMounted) return;
		parallaxOffset = window.scrollY * 0.5;
		dimOpacity = Math.min(window.scrollY / 500, 0.6);
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

	onMount(() => {
		isComponentMounted = true;

		tick().then(() => {
			handleScroll();
			window.addEventListener('scroll', handleScroll, { passive: true });

			startAnimationsWhenIdle();
		});

		return () => {
			isComponentMounted = false;
			window.removeEventListener('scroll', handleScroll);
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
	class="relative flex h-lvh w-full flex-col overflow-hidden bg-transparent"
	id="index"
	aria-label="Introduction"
>
	<div
		class="relative flex h-full w-full flex-col items-center justify-center bg-transparent px-6 sm:px-10 md:px-16 lg:px-28"
		style="--dim-opacity: {dimOpacity}; transform: translateY({parallaxOffset}px);"
	>
		<div
			class="pointer-events-none absolute inset-0 bg-black transition-opacity duration-200"
			style="opacity: var(--dim-opacity); will-change: opacity;"
			aria-hidden="true"
		></div>

		<AnimatedProfile
			src="/images/avatar/avatar.webp"
			alt="Muhammad Fachry Noorchoolish Arif profile picture"
			size="w-40 h-40 sm:w-44 sm:h-44 md:w-50 md:h-50 mb-5"
		/>

		<div use:popUpText class="bg-background w-full">
			<div class="nunito w-full text-center select-none">
				<h1
					class="font-foreground pop-up-text mb-1 text-xl font-bold sm:mb-3 sm:text-2xl md:text-3xl lg:text-4xl"
				>
					HI, I'M FACHRY!
				</h1>
				<div
					class="text-primary inline-block text-2xl leading-none font-black sm:text-3xl md:text-4xl lg:text-5xl"
				>
					<p class="pop-up-text flex items-center justify-center">
						{currentText}<span
							class="inline-block font-thin transition-opacity duration-300"
							class:opacity-100={cursorVisible}
							class:opacity-0={!cursorVisible}
							aria-hidden="true">|</span
						>
					</p>
				</div>

				<div class="my-2" aria-hidden="true"></div>
				<div
					class="pop-up-text bg-foreground mx-auto h-1 w-1/2 rounded-full sm:w-2/3 md:w-96"
					aria-hidden="true"
				></div>
				<div class="my-2" aria-hidden="true"></div>

				<p class="pop-up-text text-base font-medium sm:text-xl md:text-2xl lg:text-3xl">
					Software Engineer at Bank Syariah Indonesia
				</p>
				<p class="pop-up-text mx-auto w-[90%] text-sm font-thin sm:w-4/5 sm:text-base md:w-3/4">
					Passionate about crafting elegant solutions and building scalable systems. From backend
					APIs to system designs, I transform ideas into impactful digital products that make a
					difference in people's lives.
				</p>
			</div>
		</div>
	</div>

	<Wave position="absolute bottom-0">
		<Layer1 fill="fill-foreground" />
	</Wave>
</section>
