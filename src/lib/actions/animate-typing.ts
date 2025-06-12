export function animateTyping(node: HTMLElement, texts: string[]) {
	let textsToType = texts;

	let textsIndex = 0;
	let charIndex = 0;
	let currentText = '';

	const updateInnerHTML = (isTyping?: boolean) => {
		node.innerHTML = '&#8203;' + currentText + (isTyping ? '|' : '');
	};

	const blinkingCursor = () => {
		if (currentText.endsWith('|')) {
			currentText = currentText.slice(0, -1);
		} else {
			currentText += '|';
		}
		updateInnerHTML();
	};

	const waitingEffect = (delay: number) => {
		const interval = setInterval(blinkingCursor, 500);

		setTimeout(() => {
			clearInterval(interval);
			if (currentText.endsWith('|')) {
				currentText = currentText.slice(0, -1);
			}
			updateInnerHTML();
		}, delay);
	};

	const typeEffect = () => {
		const currentString = textsToType[textsIndex];
		const delay = currentString[charIndex] === ' ' ? 75 : 100;

		if (charIndex < currentString.length) {
			currentText += currentString[charIndex++];
			setTimeout(typeEffect, delay);
		} else {
			waitingEffect(3000);
			setTimeout(deleteEffect, 3000);
		}

		updateInnerHTML(true);
	};

	const deleteEffect = () => {
		if (charIndex > 0) {
			currentText = currentText.slice(0, --charIndex);
			setTimeout(deleteEffect, 50);
		} else {
			textsIndex = (textsIndex + 1) % textsToType.length;
			currentText = '';
			waitingEffect(3000);
			setTimeout(typeEffect, 3000);
		}

		updateInnerHTML();
	};

	setTimeout(typeEffect, 500);

	return {
		onDestroy() {},
		update(newTexts: string[]) {
			textsToType = newTexts;
		}
	};
}
