export function parallax(node: HTMLElement, speed: number = 0.3) {
	let frameId: number;

	function update() {
		const rect = node.getBoundingClientRect();
		const offset = rect.top; 
		node.style.transform = `translateY(${offset * speed}px)`;
		frameId = requestAnimationFrame(update);
	}

	frameId = requestAnimationFrame(update);

	return {
		destroy() {
			cancelAnimationFrame(frameId);
		}
	};
}
