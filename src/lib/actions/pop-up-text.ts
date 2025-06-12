export function popUpText(node: HTMLElement, options = { threshold: 0.5 }) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const elements = node.querySelectorAll('.pop-up-text');
				elements.forEach((el, index) => {
					setTimeout(() => el.classList.add('visible'), index * 50);
				});
			}
		});
	}, options);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}
