<script lang="ts">
	export let brief: any;
	export let title: any;
	export let description: string = '';
</script>

<div class="mb-20 space-y-4 text-center">
	<div class="inline-block">
		<span class="text-muted-foreground mb-2 block text-sm font-medium tracking-widest uppercase"
			>{brief}</span
		>
		<h2 class="text-responsive-xl gradient-text font-bold">{title}</h2>
	</div>
	<div
		class="from-primary via-accent to-primary mx-auto h-1 w-24 rounded-full bg-gradient-to-r"
	></div>
	{#if description !== ''}
		<p class="text-muted-foreground mx-auto max-w-2xl">
			{description}
		</p>
	{/if}
</div>
