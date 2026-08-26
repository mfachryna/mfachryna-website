/**
 * Builds a table of contents from CMS-authored (Tiptap) HTML and injects
 * matching `id` attributes so the anchors actually resolve.
 *
 * This runs on the server so the ids are present in the SSR payload — a
 * client-side pass would break deep links and leave the rail empty for
 * crawlers.
 *
 * Caveat worth knowing: this is a regex over HTML, not a parser. It is
 * scoped narrowly to opening <h2>/<h3> tags, which is a shape the Tiptap
 * editor produces reliably. It deliberately does nothing clever — if a
 * heading is malformed it is skipped rather than mangling the document.
 * `prose.css` sets `scroll-margin-top` so anchored headings land clear of
 * the fixed navbar.
 */

export type TocEntry = {
	id: string;
	text: string;
	level: 2 | 3;
};

export type TocResult = {
	/** The original HTML with `id` attributes added to h2/h3. */
	html: string;
	/** Flat list of headings in document order. */
	toc: TocEntry[];
};

function slugify(input: string): string {
	return input
		.toLowerCase()
		.replace(/&[a-z]+;/g, ' ') // strip entities before they become junk
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 60);
}

export function buildToc(html: string | null | undefined): TocResult {
	if (!html) return { html: '', toc: [] };

	const toc: TocEntry[] = [];
	const used = new Set<string>();

	const out = html.replace(
		/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
		(match, levelRaw: string, attrs: string, inner: string) => {
			const text = inner
				.replace(/<[^>]+>/g, '')
				.replace(/\s+/g, ' ')
				.trim();

			if (!text) return match;

			// Respect an id the author already set.
			const existing = /\sid\s*=\s*["']([^"']+)["']/i.exec(attrs);
			let id = existing ? existing[1] : slugify(text);
			if (!id) return match;

			// De-duplicate repeated headings ("Overview" twice, etc).
			let candidate = id;
			let n = 2;
			while (used.has(candidate)) candidate = `${id}-${n++}`;
			id = candidate;
			used.add(id);

			toc.push({ id, text, level: Number(levelRaw) === 3 ? 3 : 2 });

			const nextAttrs = existing ? attrs : `${attrs} id="${id}"`;
			return `<h${levelRaw}${nextAttrs}>${inner}</h${levelRaw}>`;
		}
	);

	return { html: out, toc };
}
