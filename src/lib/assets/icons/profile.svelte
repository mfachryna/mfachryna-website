<script lang="ts">
	export let src = '/images/avatar/avatar.webp';
	export let size = '';
	export let alt = 'Profile picture';
</script>

<div class="blob-container {size}">
	<div class="blob">
		<img {alt} {src} />
	</div>
</div>

<style>
	.blob-container {
		position: relative;
		filter: url(#goo);
	}

	.blob {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		animation: morph 8s infinite ease-in-out;
		will-change: border-radius;
	}

	.blob img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	@keyframes morph {
		0% {
			border-radius: 42% 58% 33% 67% / 48% 42% 58% 52%;
		}
		25% {
			border-radius: 55% 45% 60% 40% / 40% 60% 40% 60%;
		}
		50% {
			border-radius: 48% 52% 33% 67% / 60% 30% 70% 40%;
		}
		75% {
			border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
		}
		100% {
			border-radius: 42% 58% 33% 67% / 48% 42% 58% 52%;
		}
	}
</style>
