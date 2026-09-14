<script lang="ts">
	import { currentLocale, setLocale, toggleLocale } from '$lib/i18n/store';
	import { Globe } from '@lucide/svelte';

	let { variant = 'default' }: { variant?: 'default' | 'mobile' | 'compact' } = $props();
</script>

{#if variant === 'mobile'}
	<div class="flex items-center justify-between rounded-xl bg-secondary/30 p-3 border border-border/40">
		<div class="flex items-center space-x-2.5 text-sm font-medium text-foreground">
			<Globe class="h-4 w-4 text-primary" />
			<span>Language / Bahasa</span>
		</div>
		<div class="flex items-center space-x-1 rounded-lg bg-background/60 p-1 border border-border/30">
			<button
				type="button"
				onclick={() => setLocale('en')}
				class="rounded-md px-2.5 py-1 text-xs font-semibold transition-all {$currentLocale === 'en'
					? 'bg-primary text-primary-foreground shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
				aria-label="Switch to English"
			>
				EN
			</button>
			<button
				type="button"
				onclick={() => setLocale('id')}
				class="rounded-md px-2.5 py-1 text-xs font-semibold transition-all {$currentLocale === 'id'
					? 'bg-primary text-primary-foreground shadow-xs'
					: 'text-muted-foreground hover:text-foreground'}"
				aria-label="Ganti ke Bahasa Indonesia"
			>
				ID
			</button>
		</div>
	</div>
{:else}
	<button
		type="button"
		onclick={toggleLocale}
		class="group flex items-center space-x-1.5 rounded-full border border-border/40 bg-secondary/30 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-secondary/60 hover:scale-105 active:scale-95"
		aria-label="Toggle language: {$currentLocale === 'en' ? 'Switch to Indonesian' : 'Switch to English'}"
		title="Toggle language: {$currentLocale.toUpperCase()}"
	>
		<Globe class="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:rotate-45" />
		<span class="tracking-wide">
			<span class={$currentLocale === 'en' ? 'text-primary font-bold' : 'text-muted-foreground'}>EN</span>
			<span class="text-muted-foreground/40 mx-0.5">/</span>
			<span class={$currentLocale === 'id' ? 'text-primary font-bold' : 'text-muted-foreground'}>ID</span>
		</span>
	</button>
{/if}
