<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate-on-scroll';

	let {
		threshold = 0.1,
		rootMargin = '0px 0px -10% 0px',
		animationClass = 'animate-in',
		once = true,
		delay = 0,
		animation = 'slide',
		className = '',
		style = '',
		children 
	}: {
		threshold?: number;
		rootMargin?: string;
		animationClass?: string;
		once?: boolean;
		delay?: number;
		animation?: 'slide' | 'bounce' | 'fade' | 'slide-left' | 'slide-right'| 'slide-up' | 'slide-down' | 'zoom-in' | 'zoom-out' | 'stagger' | 'morph';
		className?: string;
		style?: string,
		children?: any;
	} = $props();

	let baseClass = $derived(
		{
			stagger: 'stagger-on-scroll',
			morph: 'morph-on-scroll',
			slide: 'animate-on-scroll',
			bounce: 'bounce-on-scroll',
			fade: 'fade-on-scroll',
			'slide-left': 'slide-left-on-scroll',
			'slide-right': 'slide-right-on-scroll',
            'slide-up': 'slide-up-on-scroll',
            'slide-down': 'slide-down-on-scroll',
            'zoom-in': 'zoom-in-on-scroll',
            'zoom-out': 'zoom-out-on-scroll'
		}[animation] || 'animate-on-scroll'
	);
</script>

<div
	class="{baseClass} {className}"
	style="{style} "
	use:animateOnScroll={{ threshold, rootMargin, animationClass, once, delay }}
>
	{@render children()}
</div>
