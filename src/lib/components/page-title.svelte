<script lang="ts">
	export let title: any;
	export let line = '';
	export let textColor = '';
	export let id = '';
</script>

<div class="mb-10 text-center">
	<h2 {id} class={`text-2xl font-bold tracking-wider uppercase md:text-3xl ${textColor}`}>
		{title}!
	</h2>
	<div class="mx-auto h-1 w-32 rounded-full bg-gradient-to-r sm:w-40 md:w-48 {line}"></div>
</div>
