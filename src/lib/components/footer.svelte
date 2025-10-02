<script lang="ts">
	import Icon from '@iconify/svelte';
	import { env } from '$env/dynamic/public';
	import socialMediaData from '$lib/data/social-media.json';
	import Layer3 from '$lib/background/layer3.svelte';
	import Wave from './wave.svelte';
	import AnimateOnScroll from './animate-on-scroll.svelte';

	const currentYear = new Date().getFullYear();
	const nameLink = env.PUBLIC_NAME_LINK || '';
	const secretLink = env.PUBLIC_SECRET_LINK || '';

	const techStack = [
		{ name: 'SvelteKit', icon: 'simple-icons:svelte', color: 'text-orange-500' },
		{ name: 'TypeScript', icon: 'simple-icons:typescript', color: 'text-blue-500' },
		{ name: 'Tailwind', icon: 'simple-icons:tailwindcss', color: 'text-cyan-500' },
		{ name: 'Vercel', icon: 'simple-icons:vercel', color: 'text-foreground' }
	];

	const socialLinks = socialMediaData.socialLinks;

	let clickCount = 0;
	let showSecretMessage = false;
	let secretMessage = '';

	const prankMessages = [
		{ threshold: 10, message: "You're really clicking that heart... 🤔" },
		{ threshold: 25, message: "Okay, you're definitely obsessed now! 😅" },
		{ threshold: 40, message: 'This is getting out of hand! 🤯' },
		{ threshold: 55, message: 'Almost at the secret... 😈' },
		{ threshold: 60, message: '🎉 SECRET UNLOCKED! 🎉' }
	];

	function getTextSize(clickCount: number): string {
		const level = Math.floor(clickCount / 10);
		const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
		return sizes[Math.min(level, sizes.length - 1)];
	}

	function handleLoveClick() {
		clickCount++;

		const currentPrank = prankMessages.find((p) => p.threshold === clickCount);

		if (currentPrank) {
			secretMessage = currentPrank.message;
			showSecretMessage = true;
			setTimeout(() => (showSecretMessage = false), 3000);
		}

		if (clickCount === 60) {
			setTimeout(() => {
				window.open(secretLink, '_blank', 'noopener,noreferrer');
				clickCount = 0;
			}, 2000);
			return;
		}
	}

	function openSocialLink(url: string) {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<footer class="relative overflow-hidden border-border bg-transparent">
	{#if showSecretMessage}
		<div class="absolute top-8 left-1/2 z-20 -translate-x-1/2 transform animate-bounce">
			<div class="glass-effect px-6 py-3 text-sm font-medium rounded-2xl shadow-glow">
				{secretMessage}
			</div>
		</div>
	{/if}

	<div class="relative z-10 container-modern section-padding">
		<div class="space-y-6 text-center">
			<AnimateOnScroll
				animation="slide"
				delay={100}
				threshold={0.1}
				className="w-full"
				rootMargin="0px 0px 0px 0px"
			>
				<div
					class="bg-background mx-auto flex w-fit items-center justify-center gap-4 rounded-full px-4 py-2 shadow-md"
				>
					<span class="text-muted-foreground mr-3 text-sm font-medium">Built with:</span>
					{#each techStack as tech}
						<div class="group">
							<div
								class=" flex items-center justify-center rounded-full p-2.5 transition-all duration-300 hover:scale-110"
								title={tech.name}
							>
								<Icon
									icon={tech.icon}
									class="h-5 w-5 transition-all duration-300 group-hover:scale-110 {tech.color}"
								/>
							</div>
						</div>
					{/each}
				</div>
			</AnimateOnScroll>
			<AnimateOnScroll
				animation="slide"
				delay={100}
				threshold={0.1}
				className="w-full"
				rootMargin="0px 0px 0px 0px"
			>
				<div class="flex items-center justify-center gap-6">
					<div class="to-accent/30 h-px w-16 bg-gradient-to-r from-transparent"></div>
					<div class="flex items-center gap-3">
						{#each socialLinks as social}
							<button
								class="group bg-accent/10 hover:bg-accent/20 rounded-full p-2 transition-all duration-300 hover:scale-110 {social.color}"
								onclick={() => openSocialLink(social.href)}
								aria-label={social.name}
								title={social.name}
							>
								<Icon
									icon={social.icon}
									class="text-muted-foreground h-4 w-4 transition-colors group-hover:text-current"
								/>
							</button>
						{/each}
					</div>
					<div class="to-accent/30 h-px w-16 bg-gradient-to-l from-transparent"></div>
				</div>
			</AnimateOnScroll>
			<div class="flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
				<AnimateOnScroll
					animation="slide"
					delay={100}
					threshold={0.1}
					className="w-full"
					rootMargin="0px 0px 0px 0px"
				>
					<div class="flex flex-wrap items-center justify-center gap-1.5 text-sm">
						<span class="text-muted-foreground">Made with</span>
						<button
							class="group relative inline-flex items-center gap-1 rounded-md transition-all duration-300"
							class:scale-105={clickCount >= 20}
							onclick={handleLoveClick}
							aria-label="Made with love"
							title="❤️ Made with love! ({clickCount > 0
								? clickCount + ' clicks'
								: 'Click me!'}) {clickCount >= 50 ? '🎯 Almost at secret!' : ''}"
						>
							{#if clickCount > 0}
								<div
									class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs font-medium text-white"
									class:bg-red-500={clickCount < 25}
									class:bg-purple-500={clickCount >= 25 && clickCount < 50}
									class:bg-gradient-to-r={clickCount >= 50}
									class:from-purple-500={clickCount >= 50}
									class:to-pink-500={clickCount >= 50}
									class:animate-pulse={clickCount >= 25}
								>
									{clickCount}
								</div>{/if}<Icon
								icon="ph:heart-fill"
								class="h-3.5 w-3.5 text-red-500 transition-all group-hover:scale-110 {clickCount > 0
									? 'animate-pulse'
									: ''} {clickCount >= 25 ? 'text-purple-500' : ''} {clickCount >= 50
									? 'text-pink-500'
									: ''}"
							/><span
								class="text-muted-foreground group-hover:text-foreground font-medium transition-colors {getTextSize(
									clickCount
								)}"
								class:text-purple-500={clickCount >= 25}
								class:font-bold={clickCount >= 10}>love</span
							>{#if clickCount >= 10 && clickCount < 60}
								<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 transform">
									<div class="bg-accent/30 h-0.5 w-8 overflow-hidden rounded-full">
										<div
											class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
											style="width: {(clickCount / 60) * 100}%"
										></div>
									</div>
								</div>
							{/if}</button
						><span class="text-muted-foreground"
							>by <span class="text-foreground">
								<a href={nameLink}> mfachryna </a> © {currentYear}
							</span></span
						>
					</div>
				</AnimateOnScroll>
			</div>
			<AnimateOnScroll
				animation="slide"
				delay={100}
				threshold={0.1}
				className="w-full"
				rootMargin="0px 0px 0px 0px"
			>
				<div class="pt-2">
					<button
						class="group text-muted-foreground hover:text-background inline-flex items-center gap-1.5 text-xs transition-all duration-300 hover:-translate-y-0.5"
						onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						aria-label="Back to top"
					>
						<Icon
							icon="ph:arrow-up"
							class="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
						/>
						<span>Back to top</span>
					</button>
				</div>
			</AnimateOnScroll>
		</div>
	</div>
</footer>
