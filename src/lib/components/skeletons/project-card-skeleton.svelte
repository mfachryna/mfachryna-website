<div class="project-card-skeleton card-modern group">
	<div class="relative flex h-full flex-col overflow-hidden">
		<div class="relative aspect-video w-full overflow-hidden">
			<div
				class="skeleton-shimmer from-muted via-muted-foreground/10 to-muted absolute inset-0 rounded-lg bg-gradient-to-r"
			>
				<div class="flex h-full w-full items-center justify-center">
					<svg class="text-muted-foreground/30 h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l2.5-3.15L15 17H9z"
						/>
					</svg>
				</div>
			</div>

			<div class="absolute top-4 left-4">
				<div class="skeleton-shimmer flex h-8 w-8 items-center justify-center rounded-full">
					<span class="text-muted-foreground/30 text-xs">⭐</span>
				</div>
			</div>

			<div class="shimmer-overlay absolute inset-0"></div>
		</div>

		<div class="flex flex-1 flex-col space-y-4 p-6">
			<div class="space-y-2">
				<div class="skeleton-shimmer h-6 w-3/4 rounded-lg"></div>
				<div class="skeleton-shimmer h-4 w-1/2 rounded-lg"></div>
			</div>

			<div class="space-y-2">
				<div class="skeleton-shimmer h-4 w-full rounded-lg"></div>
				<div class="skeleton-shimmer h-4 w-5/6 rounded-lg"></div>
				<div class="skeleton-shimmer h-4 w-4/6 rounded-lg"></div>
			</div>

			<div class="flex flex-wrap gap-2 pt-2">
				<div class="skeleton-shimmer h-6 w-16 rounded-full"></div>
				<div class="skeleton-shimmer h-6 w-20 rounded-full"></div>
				<div class="skeleton-shimmer h-6 w-18 rounded-full"></div>
			</div>

			<div class="border-border/50 mt-auto flex items-center gap-3 border-t pt-4">
				<div class="skeleton-shimmer flex h-10 flex-1 items-center justify-center rounded-lg">
					<svg
						class="text-muted-foreground/30 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						></path>
					</svg>
				</div>
				<div class="skeleton-shimmer flex h-10 w-12 items-center justify-center rounded-lg">
					<svg class="text-muted-foreground/30 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>

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

		.shimmer-overlay {
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(255, 255, 255, 0.1) 50%,
				transparent 100%
			);
			background-size: 200% 100%;
			animation: shimmer 2s infinite;
		}

		@keyframes shimmer {
			0% {
				background-position: -200% 0;
			}
			100% {
				background-position: 200% 0;
			}
		}

		.project-card-skeleton {
			opacity: 0;
			animation: fadeIn 0.6s ease-out forwards;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
				transform: translateY(20px) scale(0.95);
			}
			to {
				opacity: 1;
				transform: translateY(0) scale(1);
			}
		}
	</style>
</div>
