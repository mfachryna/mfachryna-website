import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { translations, type Locale } from './translations';

function getInitialLocale(): Locale {
	if (browser) {
		const stored = localStorage.getItem('locale') as Locale;
		if (stored === 'en' || stored === 'id') return stored;
		if (navigator.language.startsWith('id')) return 'id';
	}
	return 'en';
}

export const currentLocale = writable<Locale>('en');

if (browser) {
	const initial = getInitialLocale();
	currentLocale.set(initial);
	document.documentElement.lang = initial;

	currentLocale.subscribe((loc) => {
		localStorage.setItem('locale', loc);
		document.cookie = `locale=${loc};path=/;max-age=31536000`;
		document.documentElement.lang = loc;
	});
}

export const t = derived(currentLocale, ($locale) => {
	return (path: string, fallback?: string): any => {
		const keys = path.split('.');
		let current: any = translations[$locale];
		for (const key of keys) {
			if (current && typeof current === 'object' && key in current) {
				current = current[key];
			} else {
				// Fallback to English if key missing
				let fallbackVal: any = translations['en'];
				for (const fbKey of keys) {
					if (fallbackVal && typeof fallbackVal === 'object' && fbKey in fallbackVal) {
						fallbackVal = fallbackVal[fbKey];
					} else {
						return fallback || path;
					}
				}
				return fallbackVal ?? fallback ?? path;
			}
		}
		return current;
	};
});

export function setLocale(locale: Locale) {
	currentLocale.set(locale);
}

export function toggleLocale() {
	currentLocale.update((l) => (l === 'en' ? 'id' : 'en'));
}

export type { Locale };
