<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Pil from './pil.svelte';

	export let item;
	export let i;
	export let activeIndex;
	export let toggle;
	export let formatDate;
</script>

<div class="relative flex items-center md:justify-center">
	<div class="absolute left-6 z-20 hidden md:left-1/2 md:block md:-translate-x-1/2 md:transform">
		<div class="relative">
			<div
				class="from-primary/30 to-accent/30 absolute inset-0 -m-1 h-6 w-6 animate-ping rounded-full bg-gradient-to-br"
			></div>

			<div
				class="from-primary via-primary/80 to-accent border-background shadow-glow relative h-4 w-4 rounded-full border-3 bg-gradient-to-br transition-transform duration-300 group-hover:scale-125"
			>
				<div
					class="bg-foreground/30 absolute inset-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>

				<div
					class="from-primary to-accent absolute inset-0 animate-pulse rounded-full bg-gradient-to-br opacity-60"
				></div>
			</div>
		</div>
	</div>
	<div
		class="ml-0 w-full md:ml-0 md:w-6/12 lg:w-5/12 xl:w-6/12 {i % 2 === 0
			? 'md:mr-auto md:pr-4 lg:pr-6 xl:pr-8'
			: 'md:ml-auto md:pl-4 lg:pl-6 xl:pl-8'}"
	>
		<div
			class="group experience-card cursor-pointer"
			onclick={() => toggle(i)}
			onkeydown={(e) => e.key === 'Enter' && toggle(i)}
			role="button"
			tabindex="0"
		>
			<div class="relative">
				<div class="relative mb-2 flex items-start justify-between">
					<div class="flex-1 space-y-2">
						<div class="flex flex-wrap items-center gap-2">
							<div
								class="from-primary/10 to-accent/10 border-primary/20 flex items-center gap-2 rounded-full border bg-gradient-to-r px-3 py-1.5 backdrop-blur-sm"
							>
								<svg
									class="text-primary h-3 w-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<span class="text-primary text-xs font-medium">
									{formatDate(item.startDate)} - {item.endDate
										? formatDate(item.endDate)
										: 'Present'}
								</span>
							</div>
							{#if item.location}
								<div
									class="bg-foreground/1 border-foreground/10 flex items-center gap-1 rounded-full border px-2 py-1"
								>
									<svg
										class="text-accent h-3 w-3"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<span class="text-foreground/30 text-xs">{item.location}</span>
								</div>
							{/if}
						</div>
						<div class="space-y-0.5">
							<h3
								class="text-foreground group-hover:from-primary group-hover:to-accent text-lg font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent md:text-xl lg:text-2xl"
							>
								{item.title}
							</h3>
							{#if item.role && item.role !== item.title}
								<p class="text-xs font-medium text-neutral-400 lg:text-sm">{item.role}</p>
							{/if}
						</div>
						<p
							class="from-accent to-primary bg-gradient-to-r bg-clip-text text-sm font-semibold text-transparent md:text-base lg:text-lg"
						>
							{item.company}
						</p>
					</div>
					<div class="ml-6 flex-shrink-0">
						<div class="group/button relative">
							<div
								class="from-primary to-accent absolute inset-0 rounded-full bg-gradient-to-r opacity-0 blur transition-opacity duration-300 group-hover:opacity-50"
							></div>
							<div
								class="border-foreground/20 bg-foreground/10 group-hover/button:border-foreground/30 group-hover/button:bg-foreground/20 relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 group-hover/button:scale-110"
							>
								<svg
									class="text-foreground h-4 w-4 transition-all duration-300 {activeIndex === i
										? 'rotate-180'
										: ''}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="relative mb-3">
				<p
					class="text-foreground/60 line-clamp-3 text-xs leading-relaxed transition-colors duration-300 md:text-sm"
				>
					{item.description}
				</p>
			</div>
			{#if item.tags && item.tags.length > 0}
				{#if activeIndex !== i}
					<div class="mb-2 flex flex-wrap gap-1">
						{#each item.tags.slice(0, 5) as tag}
							<Pil
								small={true}
								border="border-foreground/10"
								text="text-foreground/80"
								background="bg-foreground/5"
							>
								{typeof tag === 'string' ? tag : tag.name}
							</Pil>
						{/each}
						{#if item.tags.length > 5}
							<Pil
								small={true}
								border="border-foreground/10"
								text="text-foreground/80"
								background="bg-foreground/5"
							>
								+{item.tags.length - 5}
							</Pil>
						{/if}
					</div>
				{/if}
			{/if}
			{#if activeIndex === i}
				<div
					class="border-border collapsible-item mt-4 border-t pt-4"
					in:slide={{ duration: 350 }}
					out:slide={{ duration: 250 }}
				>
					<div in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
						{#if item.content}
							<div class="prose prose-sm max-w-none">
								<div class="text-foreground leading-relaxed">
									{@html item.content}
								</div>
							</div>
						{/if}
						{#if item.highlights && item.highlights.length > 0}
							<div>
								<h4
									class="text-foreground top-0 -mt-2 mb-3 flex items-center py-2 text-sm font-semibold md:text-base"
								>
									<span class="from-primary to-accent mr-2 h-2 w-2 rounded-full bg-gradient-to-r"
									></span>
									Key Achievements
									{#if item.highlights.length > 5}
										<span class="bg-primary/10 text-primary ml-2 rounded-full px-2 py-0.5 text-xs">
											{item.highlights.length} items
										</span>
									{/if}
								</h4>
								<div class="grid gap-3">
									{#each item.highlights as highlight, idx}
										<div class="group flex items-start">
											<div
												class="bg-accent/10 mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
											>
												<span class="text-accent text-xs font-medium md:text-sm">{idx + 1}</span>
											</div>
											<div class="flex-1">
												<p
													class="text-muted-foreground group-hover:text-foreground text-xs leading-relaxed transition-colors duration-200 md:text-sm"
												>
													{highlight}
												</p>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
						{#if item.tags && item.tags.length > 4}
							<div>
								<h4
									class="text-foreground sticky top-0 mt-2 mb-3 flex items-center py-2 text-sm font-semibold md:text-base"
								>
									<span class="from-primary to-accent mr-2 h-2 w-2 rounded-full bg-gradient-to-r"
									></span>
									Technologies & Skills
									<span
										class="bg-foreground/5 text-secondary-foreground ml-2 rounded-full px-2 py-0.5 text-xs"
									>
										{item.tags.length}
									</span>
								</h4>
								<div class="flex flex-wrap gap-2">
									{#each item.tags as tag}
										<Pil
											border="border-foreground/10"
											text="text-foreground/80"
											background="bg-foreground/5 whitespace-nowrap text-secondary-foreground hover:bg-primary/10 hover:text-primary rounded-lg px-3 py-1.5  w-fit !text-center text-xs font-medium transition-all duration-200"
										>
											{typeof tag === 'string' ? tag : tag.name}
										</Pil>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.collapsible-item) {
		will-change: height;
		transition: height 0.3s ease-in-out;
	}

	.experience-card {
		position: relative;
		padding: 1.25rem;
		border-radius: 1rem;
		background: var(--card-foreground);
		border: 1px solid rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(5px);

		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	.experience-card::before {
		content: '';
		position: absolute;
		inset: 0;
		padding: 1px;
		border-radius: inherit;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.experience-card:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow:
			0 12px 24px rgba(0, 0, 0, 0.25),
			0 4px 8px rgba(var(--primary-rgb), 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
	}

	.experience-card:hover::before {
		opacity: 1;
	}

	@keyframes slideUpTag {
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@keyframes floating {
		0%,
		100% {
			transform: translateY(0) rotate(0deg) scale(1);
		}
		33% {
			transform: translateY(-20px) rotate(1deg) scale(1.02);
		}
		66% {
			transform: translateY(10px) rotate(-0.5deg) scale(0.98);
		}
	}

	@keyframes floating-delayed {
		0%,
		100% {
			transform: translateY(0) rotate(0deg) scale(1);
		}
		25% {
			transform: translateY(15px) rotate(-1deg) scale(1.01);
		}
		75% {
			transform: translateY(-10px) rotate(0.5deg) scale(0.99);
		}
	}

	@keyframes floating-slow {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-15px) rotate(2deg);
		}
	}

	@keyframes floating-reverse {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(25px) rotate(-1deg);
		}
	}

	@keyframes floating-gentle {
		0%,
		100% {
			transform: translateX(0) scale(1);
		}
		50% {
			transform: translateX(10px) scale(1.05);
		}
	}

	@keyframes floating-gentle-delayed {
		0%,
		100% {
			transform: translateX(0) scale(1);
		}
		50% {
			transform: translateX(-15px) scale(0.95);
		}
	}

	:global(.floating) {
		animation: floating 8s ease-in-out infinite;
	}

	:global(.floating-delayed) {
		animation: floating-delayed 10s ease-in-out infinite;
	}

	:global(.floating-slow) {
		animation: floating-slow 12s ease-in-out infinite;
	}

	:global(.floating-reverse) {
		animation: floating-reverse 9s ease-in-out infinite;
	}

	:global(.floating-gentle) {
		animation: floating-gentle 6s ease-in-out infinite;
	}

	:global(.floating-gentle-delayed) {
		animation: floating-gentle-delayed 7s ease-in-out infinite;
	}

	:global(.animate-pulse-slow) {
		animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	:global(.animate-pulse-slower) {
		animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	:global(.animate-pulse-slowest) {
		animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
