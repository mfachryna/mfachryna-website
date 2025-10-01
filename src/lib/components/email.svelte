<script>
	export let email = 'fachry.arifna@gmail.com';
</script>

<section
	class="fixed right-6 top-0 z-[9999] hidden h-screen flex-col items-center justify-center gap-9 py-8 text-center md:flex"
	style="transition: all 0.5s ease-in-out;"
>

	<div class="w-px h-24 bg-gradient-to-b from-transparent via-primary to-accent"></div>
	<div class="group">
		<a
			href="mailto:{email}"
			class="block py-2 px-1 text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-105"
			style="writing-mode: vertical-rl; text-decoration: none;"
			aria-label="Send email to {email}"
			title="Send email to {email}"
		>
			<span class="text-sm font-normal tracking-wide transition-colors duration-300">
				{email}
			</span>
		</a>
	</div>

	<div class="w-px h-24 bg-gradient-to-b from-accent via-primary to-transparent"></div>
</section>
