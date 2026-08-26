import type { ActionReturn } from 'svelte/action';

interface AnimateOnScrollOptions {
	threshold?: number;
	rootMargin?: string;
	animationClass?: string;
	once?: boolean;
	/** Stagger offset in ms. Applied as CSS animation-delay, not a JS timer. */
	delay?: number;
}

interface AnimateOnScrollAttributes {
	'on:animated'?: (e: CustomEvent<{ element: HTMLElement }>) => void;
}

const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

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

	let observer: IntersectionObserver | undefined;

	function reveal() {
		element.classList.add(options.animationClass);
		element.dispatchEvent(new CustomEvent('animated', { detail: { element } }));
	}

	function applyDelay() {
		// The stagger is handed to CSS as `animation-delay` rather than run
		// through setTimeout. The browser schedules it off the main thread, so a
		// busy thread can no longer make a row of cards arrive out of step.
		element.style.setProperty('--anim-delay', `${options.delay ?? 0}ms`);
	}

	function setupObserver() {
		observer?.disconnect();

		// Anyone who has asked for reduced motion gets the content immediately,
		// with no transform and no delay. See the media query in animation.css.
		if (prefersReducedMotion()) {
			element.style.setProperty('--anim-delay', '0ms');
			reveal();
			return;
		}

		applyDelay();

		// No IntersectionObserver (very old browser, some embedded webviews) would
		// otherwise leave every animated element stuck at opacity:0 forever.
		if (typeof IntersectionObserver === 'undefined') {
			reveal();
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						// Unobserve *before* revealing. Previously this happened inside a
						// setTimeout, so the observer could fire repeatedly during the
						// delay window and queue duplicate reveals and 'animated' events.
						if (options.once) observer?.unobserve(entry.target);
						reveal();
					} else if (!options.once) {
						element.classList.remove(options.animationClass);
					}
				}
			},
			{
				// NOTE: deliberately no `intersectionRatio >= threshold` re-check here.
				// For an element taller than roughly 1/threshold viewports the ratio can
				// never reach the threshold, so that check left long sections invisible
				// permanently. `isIntersecting` already honours the threshold below.
				threshold: options.threshold,
				rootMargin: options.rootMargin
			}
		);

		observer.observe(element);
	}

	setupObserver();

	return {
		update(newOptions: AnimateOnScrollOptions) {
			const nextDelay = newOptions.delay ?? options.delay;
			const needsReobserve =
				newOptions.threshold !== undefined &&
				newOptions.threshold !== options.threshold;

			options = { ...options, ...newOptions, delay: nextDelay };

			// A changed delay alone is just a CSS variable update — re-observing
			// would restart the animation for no reason.
			if (needsReobserve) setupObserver();
			else applyDelay();
		},
		destroy() {
			observer?.disconnect();
			observer = undefined;
		}
	};
}
