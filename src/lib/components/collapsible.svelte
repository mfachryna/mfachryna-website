<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import Pil from './pil.svelte';

	export let item: {
		id: number;
		title: string;
		role: string;
		company: string;
		location: string;
		dateRange: string;
		description: string;
		content: string;
		tags: string[];
		highlights?: string[];
	} = {
		id: 0,
		title: '',
		role: '',
		company: '',
		location: '',
		dateRange: '',
		description: '',
		content: '',
		highlights: [],
		tags: []
	};

	export let index: number = 0;
	export let activeIndex: number = 0;
	export let onToggle: (index: number) => void;

	$: isOpen = index === activeIndex;

	$: displayTags = item.tags.slice(0, 2);
	$: hasMoreTags = item.tags.length > 2;
</script>

<div class="border-border mb-3 cursor-pointer overflow-hidden rounded-xl border">
	<button
		type="button"
		class="bg-background w-full cursor-pointer px-3 py-2 text-left focus:outline-none sm:px-4 sm:py-3"
		onclick={() => onToggle(index)}
		aria-expanded={isOpen}
	>
		<div class="block sm:hidden">
			<div class="mb-2">
				<h2 class="text-foreground text-sm leading-tight font-semibold">
					{item.title}
				</h2>
				<span
					class="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs font-medium"
				>
					{item.role}
				</span>
			</div>
			<div class="mb-2">
				<p class="text-muted-foreground text-xs leading-tight">
					{item.company}
				</p>
				<p class="text-muted-foreground/90 text-xs">{item.location}</p>
				<span class="text-muted-foreground/80 text-xs">{item.dateRange}</span>
			</div>
			{#if !isOpen && item.tags.length > 0}
				<div class="flex flex-wrap gap-1" transition:fly={{ y: -10, duration: 200 }}>
					{#each displayTags as tag}
						<Pil small border="border-foreground/30" text="text-foreground/60">{tag}</Pil>
					{/each}
					{#if hasMoreTags}
						<Pil small border="border-foreground/30" text="text-foreground/60">
							+{item.tags.length - 2}
						</Pil>
					{/if}
				</div>
			{/if}
		</div>

		<div class="hidden sm:block md:hidden">
			<div class="flex items-start justify-between">
				<div class="flex-grow pr-3">
					<div class="mb-1">
						<h2 class="text-foreground text-base leading-tight font-semibold">
							{item.title}
						</h2>
						<span
							class="bg-foreground/10 text-muted-foreground/90 mt-1 inline-block rounded-full px-2 py-0.5 text-xs"
						>
							{item.role}
						</span>
					</div>
					<p class="text-muted-foreground text-sm leading-tight">
						{item.company}
						<span class="text-muted-foreground/90 block text-xs">{item.location}</span>
					</p>
				</div>
				<div class="flex flex-col items-end">
					<span class="text-muted-foreground/80 mb-2 text-sm">{item.dateRange}</span>
					{#if !isOpen && item.tags.length > 0}
						<div
							class="flex flex-wrap justify-end gap-1"
							transition:fly={{ y: -20, duration: 200 }}
						>
							{#each displayTags as tag}
								<Pil small border="border-foreground/30" text="text-foreground/60">{tag}</Pil>
							{/each}
							{#if hasMoreTags}
								<Pil small border="border-foreground/30" text="text-foreground/60">
									+{item.tags.length - 2}
								</Pil>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>

		<div class="hidden md:block">
			<div class="flex items-center justify-between">
				<div class="flex-grow">
					<div class="flex items-center gap-2">
						<h2 class="text-foreground text-lg font-semibold lg:text-xl">
							{item.title}
						</h2>
						<span
							class="bg-foreground/10 text-muted-foreground/90 rounded-full px-2 py-0.5 text-sm"
						>
							{item.role}
						</span>
					</div>
					<p class="text-muted-foreground text-sm">
						{item.company}
						<span class="text-muted-foreground/90 text-sm">| {item.location}</span>
					</p>
				</div>
				<div class="ml-4 flex flex-col items-end">
					<span class="text-muted-foreground/80 mb-1 text-sm">{item.dateRange}</span>
					{#if !isOpen && item.tags.length > 0}
						<div
							class="flex flex-wrap justify-end gap-1"
							transition:fly={{ y: -20, duration: 200 }}
						>
							{#each displayTags as tag}
								<Pil small border="border-foreground/30" text="text-foreground/60">{tag}</Pil>
							{/each}
							{#if hasMoreTags}
								<Pil small border="border-foreground/30" text="text-foreground/60">
									+{item.tags.length - 2}
								</Pil>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</button>

	{#if isOpen}
		<div transition:slide={{ duration: 300 }} class="text-foreground px-3 pb-3 sm:px-4 sm:pb-4">
			<p class="mt-1 text-sm leading-relaxed sm:text-base">{item.description}</p>

			{#if item.highlights && item.highlights.length > 0}
				<ul class="mt-3 ml-4 list-disc space-y-1 text-sm sm:ml-5 sm:text-base">
					{#each item.highlights as highlight}
						<li class="leading-relaxed">{highlight}</li>
					{/each}
				</ul>
			{/if}

			<div
				class="mt-3 flex flex-wrap gap-1.5 sm:gap-2"
				in:fly={{ y: 20, duration: 400, delay: 200 }}
			>
				{#each item.tags as tag, i (tag)}
					<div in:fly={{ y: 10, x: 10, duration: 300, delay: 150 + i * 50 }}>
						<Pil border="border-foreground/50" text="text-foreground/50">{tag}</Pil>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
