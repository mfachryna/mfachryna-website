<script lang="ts">
	import { currentLocale, setLocale, AVAILABLE_LOCALES, type Locale } from '$lib/i18n/store';
	import { Globe, ChevronDown, Check } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { variant = 'default' }: { variant?: 'default' | 'mobile' | 'compact' } = $props();

	let isOpen = $state(false);
	let containerRef: HTMLElement | null = $state(null);

	let activeLocale = $derived(
		AVAILABLE_LOCALES.find((l) => l.code === $currentLocale) ?? AVAILABLE_LOCALES[0]
	);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectLocale(code: Locale) {
		setLocale(code);
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (isOpen && containerRef && !containerRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);
			return () => {
				document.removeEventListener('click', handleClickOutside);
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

{#if variant === 'mobile'}
	<div class="rounded-xl border border-border/40 bg-secondary/30 p-3.5">
		<div class="mb-2.5 flex items-center space-x-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
			<Globe class="h-3.5 w-3.5 text-primary" />
			<span>Language / Bahasa</span>
		</div>
		<div class="grid grid-cols-2 gap-2">
			{#each AVAILABLE_LOCALES as loc}
				<button
					type="button"
					onclick={() => setLocale(loc.code)}
					class="flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all {loc.code === $currentLocale
						? 'border-primary/50 bg-primary/15 text-primary font-semibold shadow-xs'
						: 'border-border/30 bg-background/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}"
				>
					<span class="flex items-center space-x-2">
						<span class="text-sm">{loc.flag}</span>
						<span>{loc.native}</span>
					</span>
					{#if loc.code === $currentLocale}
						<Check class="h-3.5 w-3.5 text-primary" />
					{/if}
				</button>
			{/each}
		</div>
	</div>
{:else}
	<div class="relative inline-block text-left" bind:this={containerRef}>
		<button
			type="button"
			onclick={toggleDropdown}
			class="group flex items-center space-x-2 rounded-full border border-border/40 bg-secondary/30 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-secondary/60 hover:scale-105 active:scale-95"
			aria-expanded={isOpen}
			aria-haspopup="true"
			aria-label="Change Language: currently {activeLocale.name}"
		>
			<span class="text-sm">{activeLocale.flag}</span>
			<span class="font-bold tracking-wide text-foreground">{activeLocale.label}</span>
			<ChevronDown
				class="h-3 w-3 text-muted-foreground transition-transform duration-300 group-hover:text-foreground {isOpen
					? 'rotate-180'
					: ''}"
			/>
		</button>

		{#if isOpen}
			<div
				class="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-2xl border border-border/60 bg-card/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
				role="menu"
				aria-orientation="vertical"
			>
				<div class="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
					Select Language
				</div>
				<div class="h-px bg-border/40 my-1"></div>
				{#each AVAILABLE_LOCALES as loc}
					<button
						type="button"
						onclick={() => selectLocale(loc.code)}
						class="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-colors {loc.code === $currentLocale
							? 'bg-primary/15 text-primary font-semibold'
							: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'}"
						role="menuitem"
					>
						<span class="flex items-center space-x-2.5">
							<span class="text-base">{loc.flag}</span>
							<span class="flex flex-col text-left">
								<span class="text-foreground">{loc.native}</span>
								<span class="text-[10px] text-muted-foreground">{loc.name}</span>
							</span>
						</span>
						{#if loc.code === $currentLocale}
							<Check class="h-4 w-4 text-primary" />
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
