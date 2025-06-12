<script>
	export let email = 'fachry.arifna@gmail.com';
</script>

<section
	class="hidden fixed end-0 md:flex h-full w-fit flex-col items-center justify-between px-6 text-center z-50"
	style="transition: all 0.5s ease-in-out;"
>
	<div class="bg-accent mb-3 h-1/3 w-1 rounded-full"></div>
	<div class="text-accent w-fit">
		<a
			href="mailto:{email}"
			class="select-none"
			style="white-space: nowrap; writing-mode: vertical-rl;"
		>
			{email}
		</a>
	</div>
	<div class="bg-accent mt-3 h-1/3 w-1 rounded-full"></div>
</section>
