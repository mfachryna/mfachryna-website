<script lang="ts">
	import { currentLocale, setLocale, AVAILABLE_LOCALES, type Locale, t } from '$lib/i18n/store';
	import { Globe, ChevronDown, Check, Languages } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { variant = 'default' }: { variant?: 'default' | 'mobile' | 'rail' | 'compact' } = $props();

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

{#if variant === 'rail'}
	<div class="relative flex items-center justify-center" bind:this={containerRef}>
		<button
			type="button"
			onclick={toggleDropdown}
			class="relative bg-accent hover:text-primary transition-all duration-300 p-1.5 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 group"
			aria-expanded={isOpen}
			aria-haspopup="true"
			aria-label="Change language: currently {activeLocale.name}"
			title="Language: {activeLocale.native} ({activeLocale.name})"
		>
			<Languages
				class="w-5 h-5 text-background group-hover:text-foreground transition-colors duration-300"
			/>
			<!-- Micro badge with active locale code -->
			<span
				class="absolute -bottom-1 -right-1 text-[8px] font-black uppercase px-1 py-0 rounded-full bg-primary text-primary-foreground shadow-xs ring-1 ring-background leading-tight"
			>
				{activeLocale.code}
			</span>
		</button>

		{#if isOpen}
			<div
				class="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 z-[99999] w-44 origin-left rounded-2xl border border-border/80 dark:border-white/10 bg-background/95 dark:bg-card/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150"
				role="menu"
				aria-orientation="vertical"
				dir="ltr"
			>
				<!-- Subtle arrow indicator -->
				<div
					class="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-b border-l border-border/80 dark:border-white/10 bg-background/95 dark:bg-card/95"
				></div>

				<div class="px-2.5 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center justify-between">
					<span>Language</span>
					<span class="text-[10px] font-mono opacity-60">{$currentLocale.toUpperCase()}</span>
				</div>

				<div class="h-px bg-border/40 my-1"></div>

				<div class="space-y-0.5">
					{#each AVAILABLE_LOCALES as loc}
						<button
							type="button"
							onclick={() => selectLocale(loc.code)}
							class="cursor-pointer flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all duration-150 {loc.code === $currentLocale
								? 'bg-accent/15 text-accent font-semibold border border-accent/30'
								: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground border border-transparent'}"
							role="menuitem"
						>
							<span class="flex items-center gap-2">
								<span class="text-sm leading-none">{loc.flag}</span>
								<span class="text-foreground font-medium">{loc.native}</span>
							</span>
							{#if loc.code === $currentLocale}
								<Check class="h-3.5 w-3.5 text-accent stroke-[2.5]" />
							{:else}
								<span class="text-[10px] text-muted-foreground/60 font-mono uppercase">{loc.label}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{:else if variant === 'mobile'}
	<div class="rounded-xl border border-border/40 bg-secondary/30 p-3">
		<div class="mb-2 flex items-center justify-between text-xs font-semibold tracking-wider text-muted-foreground uppercase">
			<div class="flex items-center gap-1.5">
				<Globe class="h-3.5 w-3.5 text-primary" />
				<span>Language</span>
			</div>
			<span class="font-mono text-[10px] opacity-70">{$currentLocale.toUpperCase()}</span>
		</div>
		<div class="grid grid-cols-2 gap-1.5" dir="ltr">
			{#each AVAILABLE_LOCALES as loc}
				<button
					type="button"
					onclick={() => setLocale(loc.code)}
					class="flex items-center justify-between rounded-xl border px-2.5 py-2 text-xs font-medium transition-all duration-150 {loc.code === $currentLocale
						? 'border-primary/50 bg-primary/15 text-primary font-semibold shadow-xs'
						: 'border-border/30 bg-background/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}"
				>
					<span class="flex items-center gap-2">
						<span class="text-sm leading-none">{loc.flag}</span>
						<span class="truncate">{loc.native}</span>
					</span>
					{#if loc.code === $currentLocale}
						<Check class="h-3.5 w-3.5 text-primary stroke-[2.5] shrink-0" />
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
			class="group flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-secondary/60 hover:scale-105 active:scale-95"
			aria-expanded={isOpen}
			aria-haspopup="true"
			aria-label="Change Language: currently {activeLocale.name}"
		>
			<span class="text-sm leading-none">{activeLocale.flag}</span>
			<span class="font-bold tracking-wide text-foreground">{activeLocale.label}</span>
			<ChevronDown
				class="h-3 w-3 text-muted-foreground transition-transform duration-300 group-hover:text-foreground {isOpen
					? 'rotate-180'
					: ''}"
			/>
		</button>

		{#if isOpen}
			<div
				class="absolute right-0 z-50 mt-2 w-44 origin-top-right rounded-2xl border border-border/70 dark:border-white/10 bg-background/95 dark:bg-card/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150"
				role="menu"
				aria-orientation="vertical"
				dir="ltr"
			>
				<div class="px-2.5 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center justify-between">
					<span>Language</span>
					<span class="text-[10px] font-mono opacity-60">{$currentLocale.toUpperCase()}</span>
				</div>
				<div class="h-px bg-border/40 my-1"></div>
				<div class="space-y-0.5">
					{#each AVAILABLE_LOCALES as loc}
						<button
							type="button"
							onclick={() => selectLocale(loc.code)}
							class="cursor-pointer flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all duration-150 {loc.code === $currentLocale
								? 'bg-primary/15 text-primary font-semibold border border-primary/30'
								: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground border border-transparent'}"
							role="menuitem"
						>
							<span class="flex items-center gap-2">
								<span class="text-sm leading-none">{loc.flag}</span>
								<span class="text-foreground font-medium">{loc.native}</span>
							</span>
							{#if loc.code === $currentLocale}
								<Check class="h-3.5 w-3.5 text-primary stroke-[2.5]" />
							{:else}
								<span class="text-[10px] text-muted-foreground/60 font-mono uppercase">{loc.label}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}
