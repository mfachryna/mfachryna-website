import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toggleMode } from "mode-watcher";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Toggles dark/light theme with a circular ripple expansion expanding outwards
 * from the trigger button's click coordinate using the View Transitions API.
 */
export function toggleThemeWithRipple(event: MouseEvent) {
	const isAppearanceTransition =
		typeof document !== "undefined" &&
		"startViewTransition" in document &&
		!window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (!isAppearanceTransition) {
		toggleMode();
		return;
	}

	const target = (event.currentTarget || event.target) as HTMLElement | null;
	const rect = target?.getBoundingClientRect();
	const x = event.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
	const y = event.clientY || (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

	const endRadius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y)
	);

	const transition = (document as any).startViewTransition(async () => {
		toggleMode();
	});

	transition.ready.then(() => {
		const clipPath = [
			`circle(0px at ${x}px ${y}px)`,
			`circle(${endRadius}px at ${x}px ${y}px)`
		];
		document.documentElement.animate(
			{
				clipPath
			},
			{
				duration: 520,
				easing: "cubic-bezier(0.16, 1, 0.3, 1)",
				pseudoElement: "::view-transition-new(root)"
			}
		);
	});
}

