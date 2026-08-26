<script lang="ts">
	/**
	 * Loading placeholder for the blog grid.
	 *
	 * Mirrors blog-card.svelte exactly — same grid gaps, same rounded-2xl
	 * border, same 16/9 cover, same 6-unit padding and same stack of
	 * meta / title / excerpt / tags. If BlogCard's shape changes, this
	 * must change with it, otherwise the layout jumps when data lands.
	 *
	 * Uses theme tokens rather than fixed greys so it is correct in both
	 * light and dark mode (the previous generic fallback hardcoded
	 * `bg-gray-200/50`, which glowed in dark mode).
	 */
	export let rows = 3;
	export let hero = false;
</script>

<div class="animate-pulse">
	{#if hero}
		<div
			class="border-border/60 bg-card-foreground mb-10 flex flex-col overflow-hidden rounded-2xl border md:grid md:grid-cols-2"
		>
			<div class="bg-muted/40 aspect-[16/10] w-full md:h-full md:min-h-[19rem]"></div>
			<div class="flex flex-col justify-center gap-4 p-7 md:p-9">
				<div class="bg-muted/40 h-3 w-32 rounded"></div>
				<div class="space-y-2">
					<div class="bg-muted/50 h-8 w-11/12 rounded"></div>
					<div class="bg-muted/50 h-8 w-3/5 rounded"></div>
				</div>
				<div class="space-y-2">
					<div class="bg-muted/30 h-4 w-full rounded"></div>
					<div class="bg-muted/30 h-4 w-10/12 rounded"></div>
				</div>
				<div class="flex gap-2 pt-1">
					<div class="bg-muted/40 h-5 w-16 rounded-full"></div>
					<div class="bg-muted/40 h-5 w-20 rounded-full"></div>
					<div class="bg-muted/40 h-5 w-14 rounded-full"></div>
				</div>
			</div>
		</div>
	{/if}

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each Array(rows) as _, i (i)}
			<div
				class="border-border/60 bg-card-foreground flex flex-col overflow-hidden rounded-2xl border"
			>
				<div class="bg-muted/40 aspect-[16/9] w-full"></div>
				<div class="flex flex-1 flex-col gap-3 p-6">
					<div class="bg-muted/40 h-3 w-24 rounded"></div>
					<div class="space-y-2">
						<div class="bg-muted/50 h-5 w-full rounded"></div>
						<div class="bg-muted/50 h-5 w-2/3 rounded"></div>
					</div>
					<div class="space-y-2">
						<div class="bg-muted/30 h-3.5 w-full rounded"></div>
						<div class="bg-muted/30 h-3.5 w-4/5 rounded"></div>
					</div>
					<div class="mt-auto flex gap-2 pt-2">
						<div class="bg-muted/40 h-5 w-14 rounded-full"></div>
						<div class="bg-muted/40 h-5 w-16 rounded-full"></div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
