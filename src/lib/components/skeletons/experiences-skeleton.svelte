<script lang="ts">
	import PageTitle from '$lib/components/page-title.svelte';

	export let skeletonRows = 3;

	const expandedStates = Array(skeletonRows)
		.fill(false)
		.map((_, i) => i === 1);
</script>

<section class="experiences-section bg-background relative w-full py-20" id="experiences">
	<div class="mx-auto h-fit w-full px-6 sm:px-10 md:px-16 lg:px-28">
		<PageTitle
			title="experiences"
			textColor="text-foreground/30"
			line="bg-foreground/30"
			id="experiences-title"
		/>

		<div class="mt-8">
			{#each Array(skeletonRows) as _, i}
				{@const isExpanded = expandedStates[i]}
				<div
					class="border-accent-foreground skeleton-card mb-3 cursor-pointer overflow-hidden rounded-xl border"
					style="animation-delay: {i * 0.15}s"
				>
					<div class="bg-background w-full cursor-pointer px-3 py-2 text-left sm:px-4 sm:py-3">
						<div class="hidden md:block">
							<div class="flex items-center justify-between">
								<div class="flex-grow">
									<div class="flex items-center gap-2">
										<div class="bg-foreground/20 h-6 w-3/5 animate-pulse rounded lg:h-7"></div>

										<div class="bg-accent-foreground/10 animate-pulse rounded-full px-2 py-0.5">
											<div class="bg-accent-foreground/20 h-4 w-20 rounded"></div>
										</div>
									</div>

									<div class="mt-1 flex items-center gap-2">
										<div class="bg-accent-foreground/15 h-4 w-32 animate-pulse rounded"></div>
										<div class="bg-accent-foreground/10 h-3 w-1 animate-pulse rounded"></div>
										<div class="bg-accent-foreground/10 h-4 w-24 animate-pulse rounded"></div>
									</div>
								</div>
								<div class="ml-4 flex flex-col items-end">
									<div class="bg-accent-foreground/12 mb-1 h-4 w-28 animate-pulse rounded"></div>
									{#if !isExpanded}
										<div class="flex flex-wrap justify-end gap-1">
											<div
												class="bg-foreground/20 border-foreground/30 h-5 w-12 animate-pulse rounded-full border"
											></div>
											<div
												class="bg-foreground/20 border-foreground/30 h-5 w-16 animate-pulse rounded-full border"
												style="animation-delay: 0.1s"
											></div>
											<div
												class="bg-foreground/20 border-foreground/30 h-5 w-8 animate-pulse rounded-full border"
												style="animation-delay: 0.2s"
											></div>
										</div>
									{/if}
								</div>
							</div>
						</div>

						<div class="block sm:hidden">
							<div class="mb-2">
								<div class="bg-foreground/20 mb-1 h-4 w-3/4 animate-pulse rounded"></div>
								<div class="bg-accent-foreground/10 mt-1 inline-block rounded-full px-2 py-0.5">
									<div class="bg-accent-foreground/20 h-3 w-12 animate-pulse rounded"></div>
								</div>
							</div>
							<div class="mb-2">
								<div class="bg-accent-foreground/15 mb-1 h-3 w-1/2 animate-pulse rounded"></div>
								<div class="bg-accent-foreground/10 mb-1 h-3 w-1/3 animate-pulse rounded"></div>
								<div class="bg-accent-foreground/12 h-3 w-1/4 animate-pulse rounded"></div>
							</div>
							{#if !isExpanded}
								<div class="flex flex-wrap gap-1">
									<div
										class="bg-foreground/20 border-foreground/30 h-5 w-12 animate-pulse rounded-full border"
									></div>
									<div
										class="bg-foreground/20 border-foreground/30 h-5 w-16 animate-pulse rounded-full border"
									></div>
								</div>
							{/if}
						</div>

						<div class="hidden sm:block md:hidden">
							<div class="flex items-start justify-between">
								<div class="flex-grow pr-3">
									<div class="mb-1">
										<div class="bg-foreground/20 mb-1 h-5 w-3/4 animate-pulse rounded"></div>
										<div class="bg-accent-foreground/10 mt-1 inline-block rounded-full px-2 py-0.5">
											<div class="bg-accent-foreground/20 h-3 w-16 animate-pulse rounded"></div>
										</div>
									</div>
									<div class="bg-accent-foreground/15 mb-1 h-4 w-1/2 animate-pulse rounded"></div>
									<div class="bg-accent-foreground/10 h-3 w-1/3 animate-pulse rounded"></div>
								</div>
								<div class="flex flex-col items-end">
									<div class="bg-accent-foreground/12 mb-2 h-4 w-24 animate-pulse rounded"></div>
									{#if !isExpanded}
										<div class="flex flex-wrap justify-end gap-1">
											<div
												class="bg-foreground/20 border-foreground/30 h-5 w-12 animate-pulse rounded-full border"
											></div>
											<div
												class="bg-foreground/20 border-foreground/30 h-5 w-16 animate-pulse rounded-full border"
											></div>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>

					{#if isExpanded}
						<div class="text-foreground px-3 pb-3 sm:px-4 sm:pb-4">
							<div class="mt-1 space-y-2">
								<div class="bg-foreground/15 h-4 w-full animate-pulse rounded"></div>
								<div class="bg-foreground/15 h-4 w-5/6 animate-pulse rounded"></div>
								<div class="bg-foreground/15 h-4 w-4/6 animate-pulse rounded"></div>
							</div>

							<div class="mt-3 ml-4 space-y-1 sm:ml-5">
								<div class="flex items-center gap-2">
									<div class="bg-foreground/20 h-2 w-2 animate-pulse rounded-full"></div>
									<div class="bg-foreground/15 h-3 w-3/4 animate-pulse rounded"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="bg-foreground/20 h-2 w-2 animate-pulse rounded-full"></div>
									<div class="bg-foreground/15 h-3 w-2/3 animate-pulse rounded"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="bg-foreground/20 h-2 w-2 animate-pulse rounded-full"></div>
									<div class="bg-foreground/15 h-3 w-4/5 animate-pulse rounded"></div>
								</div>
							</div>

							<div class="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
								<div
									class="bg-foreground/20 border-foreground/50 h-6 w-16 animate-pulse rounded-full border"
								></div>
								<div
									class="bg-foreground/20 border-foreground/50 h-6 w-20 animate-pulse rounded-full border"
									style="animation-delay: 0.1s"
								></div>
								<div
									class="bg-foreground/20 border-foreground/50 h-6 w-14 animate-pulse rounded-full border"
									style="animation-delay: 0.2s"
								></div>
								<div
									class="bg-foreground/20 border-foreground/50 h-6 w-18 animate-pulse rounded-full border"
									style="animation-delay: 0.3s"
								></div>
								<div
									class="bg-foreground/20 border-foreground/50 h-6 w-12 animate-pulse rounded-full border"
									style="animation-delay: 0.4s"
								></div>
								<div
									class="bg-foreground/20 border-foreground/50 h-6 w-22 animate-pulse rounded-full border"
									style="animation-delay: 0.5s"
								></div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skeleton-card {
		opacity: 0;
		transform: translateY(10px);
		animation: slideUpCollapsible 0.5s ease-out forwards;
	}

	@keyframes slideUpCollapsible {
		to {
			opacity: 0.8;
			transform: translateY(0);
		}
	}
</style>
