import type { Locale } from './translations';
import type { ExperienceWithTags } from '$lib/types/experience';
import type { ProjectWithTags } from '$lib/types/project';

/**
 * Universal content localization engine for dynamic CMS / PostgreSQL entities.
 * 
 * Handles:
 * 1. Inline multilingual delimiter blocks in Markdown/HTML (e.g. `<!-- lang:id -->...<!-- /lang:id -->`)
 * 2. JSON-formatted multilingual strings (`{"en":"...","id":"..."}`)
 * 3. Curated overrides for existing experience and project records in the database
 * 4. Graceful fallback to default/English content
 */

/** Parse text that contains `<!-- lang:xx -->...<!-- /lang:xx -->` tags or JSON */
export function localizeText(rawText: string | null | undefined, locale: Locale): string {
	if (!rawText) return '';

	// 1. Check for HTML comment delimiter blocks: <!-- lang:id -->content<!-- /lang:id -->
	const delimiterRegex = new RegExp(`<!--\\s*lang:${locale}\\s*-->([\\s\\S]*?)<!--\\s*\\/lang:${locale}\\s*-->`, 'i');
	const match = rawText.match(delimiterRegex);
	if (match && match[1]?.trim()) {
		return match[1].trim();
	}

	// Delimiter fallback: if requested locale not found, try English block
	if (locale !== 'en') {
		const enMatch = rawText.match(/<!--\s*lang:en\s*-->([\s\S]*?)<!--\s*\/lang:en\s*-->/i);
		if (enMatch && enMatch[1]?.trim()) {
			return enMatch[1].trim();
		}
	}

	// Strip remaining delimiter tags if present in standard content
	if (/<!--\s*lang:[a-z]{2}\s*-->/i.test(rawText)) {
		// If delimiters exist but none matched, extract first available or clean it
		const clean = rawText.replace(/<!--\s*\/?lang:[a-z]{2}\s*-->/gi, '').trim();
		if (clean) return clean;
	}

	// 2. Check for JSON serialized multilingual dictionary
	if (rawText.startsWith('{') && rawText.endsWith('}')) {
		try {
			const parsed = JSON.parse(rawText);
			if (typeof parsed === 'object' && parsed !== null) {
				if (parsed[locale]) return parsed[locale];
				if (parsed.en) return parsed.en;
			}
		} catch {
			// Not valid JSON, continue with raw text
		}
	}

	return rawText;
}

/** Formats date according to active locale */
export function localizeDate(date: string | Date | null | undefined, locale: Locale): string {
	if (!date) return '';
	const d = new Date(date);
	if (isNaN(d.getTime())) return '';

	const localeMap: Record<Locale, string> = {
		en: 'en-US',
		id: 'id-ID',
		ja: 'ja-JP',
		ar: 'ar-SA'
	};

	return d.toLocaleDateString(localeMap[locale] || 'en-US', {
		year: 'numeric',
		month: 'short'
	});
}

import type { Experience } from '$lib/types/experience';
import type { Project } from '$lib/types/project';

/**
 * Returns a localized version of an Experience entity.
 * Uses localizeText to parse any inline delimiters or JSON dictionaries from DB.
 */
export function localizeExperience<T extends Partial<Experience>>(exp: T, locale: Locale): T {
	if (!exp) return exp;

	return {
		...exp,
		title: exp.title ? localizeText(exp.title, locale) : '',
		role: exp.role ? localizeText(exp.role, locale) : '',
		description: exp.description ? localizeText(exp.description, locale) : exp.description,
		content: exp.content ? localizeText(exp.content, locale) : exp.content,
		highlights: exp.highlights ? exp.highlights.map((h) => localizeText(h, locale)) : []
	};
}

/**
 * Returns a localized version of a Project entity.
 * Uses localizeText to parse any inline delimiters or JSON dictionaries from DB.
 */
export function localizeProject<T extends Partial<Project>>(project: T, locale: Locale): T {
	if (!project) return project;

	return {
		...project,
		title: project.title ? localizeText(project.title, locale) : '',
		subtitle: project.subtitle ? localizeText(project.subtitle, locale) : '',
		description: project.description ? localizeText(project.description, locale) : '',
		content: project.content ? localizeText(project.content, locale) : project.content
	};
}

/**
 * Detects the language of a blog post based on its tags.
 */
export function getBlogLocale(blog: { tags?: Array<{ name: string } | string> }): {
	code: Locale;
	badge: string;
	label: string;
} | null {
	if (!blog.tags || !blog.tags.length) return null;

	const tagNames = blog.tags.map(t => (typeof t === 'string' ? t : t.name).toLowerCase());

	if (tagNames.some(t => t === 'id' || t === 'indonesia' || t === 'bahasa-indonesia' || t === 'lang:id')) {
		return { code: 'id', badge: '🇮🇩 ID', label: 'Bahasa Indonesia' };
	}
	if (tagNames.some(t => t === 'en' || t === 'english' || t === 'lang:en')) {
		return { code: 'en', badge: '🇬🇧 EN', label: 'English' };
	}
	if (tagNames.some(t => t === 'ja' || t === 'japanese' || t === 'nihongo' || t === 'lang:ja')) {
		return { code: 'ja', badge: '🇯🇵 JA', label: '日本語' };
	}
	if (tagNames.some(t => t === 'ar' || t === 'arabic' || t === 'lang:ar')) {
		return { code: 'ar', badge: '🇸🇦 AR', label: 'العربية' };
	}

	return null;
}
