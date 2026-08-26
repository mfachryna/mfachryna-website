<script lang="ts">
	/**
	 * Cover image for blog and project cards, with a type-only fallback.
	 *
	 * Handles BOTH failure modes:
	 *   - no `src` at all (nothing uploaded yet)
	 *   - a `src` that 404s or fails to decode (deleted from Cloudinary,
	 *     typo'd URL, offline host)
	 *
	 * The second case needs a runtime `onerror`, not just a null check — a
	 * broken <img> otherwise renders as the browser's torn-page icon, which
	 * looks like a bug rather than a missing asset.
	 */
	export let src: string | null | undefined = null;
	export let alt = '';
	/** Used to derive the placeholder initials. */
	export let title = '';
	export let hero = false;
	export let eager = false;

	let failed = false;

	// Reset the failure flag if the card is reused for a different item.
	$: if (src) failed = false;

	$: showImage = Boolean(src) && !failed;
	$: initials = (title ?? '').trim().slice(0, 2).toUpperCase() || '—';
</script>

{#if showImage}
	<div class="relative overflow-hidden {hero ? 'md:h-full' : ''}">
		<img
			{src}
			{alt}
			width="1200"
			height="675"
			loading={eager ? 'eager' : 'lazy'}
			decoding="async"
			onerror={() => (failed = true)}
			class="w-full object-cover transition-transform duration-700 group-hover:scale-105
			{hero ? 'aspect-[16/10] md:h-full md:min-h-[19rem]' : 'aspect-[16/9]'}"
		/>
		<div
			class="from-background/70 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
	</div>
{:else}
	<div
		class="border-border/60 relative flex items-end overflow-hidden {hero
			? 'aspect-[16/10] md:aspect-auto md:h-full md:min-h-[19rem] md:border-r md:border-b-0'
			: 'aspect-[16/9] border-b'}"
		aria-hidden="true"
	>
		<div class="from-primary/20 absolute inset-0 bg-gradient-to-br to-transparent"></div>
		<span
			class="text-foreground/25 relative p-6 font-mono text-4xl leading-none font-bold tracking-tight md:text-5xl"
		>
			{initials}
		</span>
	</div>
{/if}
