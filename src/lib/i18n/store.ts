import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { translations, AVAILABLE_LOCALES, type Locale } from './translations';

function isValidLocale(loc: string): loc is Locale {
	return AVAILABLE_LOCALES.some((l) => l.code === loc);
}

function getInitialLocale(): Locale {
	if (browser) {
		const stored = localStorage.getItem('locale');
		if (stored && isValidLocale(stored)) return stored;

		const navLang = navigator.language.toLowerCase();
		if (navLang.startsWith('id')) return 'id';
		if (navLang.startsWith('ja')) return 'ja';
		if (navLang.startsWith('ar')) return 'ar';
	}
	return 'en';
}

export const currentLocale = writable<Locale>('en');

if (browser) {
	const initial = getInitialLocale();
	currentLocale.set(initial);
	document.documentElement.lang = initial;
	document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr';

	currentLocale.subscribe((loc) => {
		localStorage.setItem('locale', loc);
		document.cookie = `locale=${loc};path=/;max-age=31536000`;
		document.documentElement.lang = loc;
		document.documentElement.dir = loc === 'ar' ? 'rtl' : 'ltr';
	});
}

export const t = derived(currentLocale, ($locale) => {
	return (path: string, fallback?: string): any => {
		const keys = path.split('.');
		const dict = translations[$locale] as any;
		let current: any = dict;
		for (const key of keys) {
			if (current && typeof current === 'object' && key in current) {
				current = current[key];
			} else {
				// Graceful fallback to English
				const fallbackDict = translations['en'] as any;
				let fbVal: any = fallbackDict;
				for (const fbKey of keys) {
					if (fbVal && typeof fbVal === 'object' && fbKey in fbVal) {
						fbVal = fbVal[fbKey];
					} else {
						return fallback || path;
					}
				}
				return fbVal ?? fallback ?? path;
			}
		}
		return current;
	};
});

export function setLocale(locale: Locale) {
	currentLocale.set(locale);
}

export function cycleNextLocale() {
	currentLocale.update((current) => {
		const currentIndex = AVAILABLE_LOCALES.findIndex((l) => l.code === current);
		const nextIndex = (currentIndex + 1) % AVAILABLE_LOCALES.length;
		return AVAILABLE_LOCALES[nextIndex].code;
	});
}

export { AVAILABLE_LOCALES, type Locale };
