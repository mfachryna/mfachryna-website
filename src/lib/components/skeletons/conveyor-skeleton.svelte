<script lang="ts">
	const skeletonLogos = Array(8).fill(null);
</script>

<section
	class="from-background via-background-secondary to-background relative bg-gradient-to-r py-12"
>
	<div class="relative overflow-hidden">
		<div class="mb-8 text-center">
			<div class="skeleton-shimmer mx-auto mb-2 h-5 w-48 rounded"></div>
			<div class="skeleton-shimmer mx-auto h-0.5 w-16 rounded-full"></div>
		</div>

		<div class="relative">
			<div
				class="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent"
			></div>
			<div
				class="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l to-transparent"
			></div>

			<div class="flex justify-center whitespace-nowrap">
				{#each skeletonLogos as _, i}
					<div class="tech-logo-skeleton mx-6 md:mx-8" style="animation-delay: {i * 0.1}s">
						<div
							class="bg-card/50 border-border/50 relative rounded-lg border p-3 backdrop-blur-sm"
						>
							<div class="skeleton-shimmer h-8 w-8 rounded">
								<div class="flex h-full w-full items-center justify-center">
									<svg
										class="text-muted-foreground/20 h-4 w-4"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skeleton-shimmer {
		background: linear-gradient(
			90deg,
			var(--muted) 25%,
			var(--muted-foreground) / 10 50%,
			var(--muted) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 2s infinite;
	}

	.tech-logo-skeleton {
		opacity: 0;
		transform: scale(0.8) translateY(10px);
		animation: fadeInScale 0.6s ease-out forwards;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	@keyframes fadeInScale {
		from {
			opacity: 0;
			transform: scale(0.8) translateY(10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
