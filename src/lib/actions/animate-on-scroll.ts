import type { ActionReturn } from 'svelte/action';

interface AnimateOnScrollOptions {
	threshold?: number;
	rootMargin?: string;
	animationClass?: string;
	once?: boolean;
	delay?: number;
}

interface AnimateOnScrollAttributes {
	'on:animated'?: (e: CustomEvent<{ element: HTMLElement }>) => void;
}

export function animateOnScroll(
	element: HTMLElement,
	initialOptions: AnimateOnScrollOptions = {}
): ActionReturn<AnimateOnScrollOptions, AnimateOnScrollAttributes> {
	let options = {
		threshold: 0.1,
		rootMargin: '0px 0px -10% 0px',
		animationClass: 'animate-in',
		once: true,
		delay: 0,
		...initialOptions
	};

	let observer: IntersectionObserver;

	function setupObserver() {
		if (observer) {
			observer.disconnect();
		}

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio >= options.threshold) {
						setTimeout(() => {
							entry.target.classList.add(options.animationClass);

							element.dispatchEvent(
								new CustomEvent('animated', {
									detail: { element: entry.target }
								})
							);

							if (options.once) {
								observer.unobserve(entry.target);
							}
						}, options.delay);
					} else if (!options.once && !entry.isIntersecting) {
						entry.target.classList.remove(options.animationClass);
					}
				});
			},
			{
				threshold: options.threshold,
				rootMargin: options.rootMargin
			}
		);

		observer.observe(element);
	}

	setupObserver();

	return {
		update(newOptions: AnimateOnScrollOptions) {
			options = { ...options, ...newOptions };

			setupObserver();
		},
		destroy() {
			if (observer) {
				observer.disconnect();
			}
		}
	};
}
