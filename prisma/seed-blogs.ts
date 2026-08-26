/**
 * Additive blog seed for LOCAL development.
 *
 * Unlike prisma/seed.ts, this script performs NO deletes. It upserts on
 * `slug`, so running it repeatedly is safe and it will never touch your
 * existing projects, experiences, tags or contacts.
 *
 *   DATABASE_URL="postgresql://<user>@localhost:5432/portof?schema=public" \
 *     bun run prisma/seed-blogs.ts
 *
 * `content` is authored as Tiptap-style HTML because that is what the CMS
 * editor produces and what the frontend renders with {@html}. It is
 * deliberately NOT markdown.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Seed = {
	title: string;
	slug: string;
	description: string;
	excerpt: string;
	content: string;
	imageUrl: string | null;
	publishedAt: Date;
	featured: boolean;
	readingTime: number;
	published: boolean;
	tags: string[];
};

const posts: Seed[] = [
	{
		title: 'Why your SvelteKit article body is missing from the HTML',
		slug: 'sveltekit-ssr-article-body',
		description:
			'A CMS-authored post rendered in onMount is invisible to crawlers and shifts the layout on hydration. Here is the fix and why it matters.',
		excerpt:
			'If your article renders after hydration, it does not exist as far as a crawler is concerned.',
		imageUrl: '/images/blogs/sveltekit.svg',
		publishedAt: new Date('2026-02-14'),
		featured: true,
		readingTime: 7,
		published: true,
		tags: ['SvelteKit', 'TypeScript', 'Frontend'],
		content: `
<p>There is a failure mode that looks fine in the browser and is completely broken everywhere else: parsing your article body inside <code>onMount</code>. The page renders, the text appears, and you move on — but the server sent an empty container.</p>
<h2>What actually goes wrong</h2>
<p>Three separate problems stack up, and only one of them is visible to you locally.</p>
<ul>
<li><strong>Crawlers see nothing.</strong> The body is absent from the server response entirely.</li>
<li><strong>Layout shifts.</strong> The container has no height until hydration finishes.</li>
<li><strong>It delays the largest paint.</strong> Your main content waits on a JS bundle.</li>
</ul>
<h3>The shape of the bug</h3>
<p>It usually looks harmless, something like this:</p>
<pre><code>onMount(async () =&gt; {
  content = await parse(data.post.body);
});</code></pre>
<blockquote><p>If a value can be computed on the server, computing it on the client is a choice — and usually the wrong one.</p></blockquote>
<h2>The fix</h2>
<p>Render it directly. If the stored value is already HTML, it does not need a parser at all:</p>
<pre><code>&lt;div class="prose"&gt;{@html data.post.body}&lt;/div&gt;</code></pre>
<h3>Verifying it properly</h3>
<p>Do not trust the browser here — it hydrates and hides the problem. Use <code>curl</code>, which runs no JavaScript:</p>
<pre><code>curl -s http://localhost:5173/blog/my-post | grep "some text from the body"</code></pre>
<p>If that returns nothing, the body is still client-only no matter how correct the page looks on screen.</p>
`.trim()
	},
	{
		title: 'Caching a database-backed site without going stale',
		slug: 'caching-without-going-stale',
		description:
			'stale-while-revalidate lets you cache aggressively at the CDN while your own edits still show up immediately.',
		excerpt: 'Cache for everyone else. Revalidate for yourself.',
		imageUrl: '/images/blogs/caching.svg',
		publishedAt: new Date('2026-01-28'),
		featured: false,
		readingTime: 6,
		published: true,
		tags: ['PostgreSQL', 'Backend', 'API Development'],
		content: `
<p>A portfolio or docs site usually serves identical bytes to every visitor, yet many of them query the database on every single request. The fix is one header.</p>
<h2>The header</h2>
<pre><code>public, max-age=0, s-maxage=300, stale-while-revalidate=3600</code></pre>
<p>Each directive does something specific:</p>
<table>
<thead><tr><th>Directive</th><th>Applies to</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>max-age=0</code></td><td>Browser</td><td>Always revalidate, so your own edits appear at once</td></tr>
<tr><td><code>s-maxage=300</code></td><td>CDN</td><td>Serve from cache for five minutes</td></tr>
<tr><td><code>stale-while-revalidate</code></td><td>CDN</td><td>Serve stale while refreshing in the background</td></tr>
</tbody>
</table>
<h2>Why the last one matters most</h2>
<p>Without it, the request that arrives the moment the window lapses pays the full database cost. With it, <em>nobody</em> waits — the stale copy goes out immediately and the refresh happens behind the scenes.</p>
<blockquote><p>The worst latency in a cached system is the request that arrives right after expiry.</p></blockquote>
<h3>What not to cache</h3>
<p>Anything user-specific. Check for cookies, sessions or auth before adding these headers — if the response varies per visitor, a shared cache will hand one person another person's page.</p>
`.trim()
	},
	{
		title: 'Selecting less: the query that fetches whole articles to draw a card',
		slug: 'selecting-less-prisma-omit',
		description:
			'List views routinely pull entire article bodies they never render. Prisma omit fixes it without an error-prone allowlist.',
		excerpt: 'Nine cards should not cost nine full articles.',
		imageUrl: '/images/blogs/postgres.svg',
		publishedAt: new Date('2026-01-09'),
		featured: false,
		readingTime: 5,
		published: true,
		tags: ['Prisma', 'PostgreSQL', 'Backend'],
		content: `
<p>Card grids need a title, a date, an image and maybe an excerpt. What they usually <em>fetch</em> is every column on the row, including the full article body.</p>
<h2>Two ways to trim a query</h2>
<p>You can list what you want, or list what you don't:</p>
<ul>
<li><code>select</code> — an allowlist. Precise, but miss a field and the UI breaks.</li>
<li><code>omit</code> — a denylist. Drops the heavy column, keeps everything else.</li>
</ul>
<h3>Prefer omit for this</h3>
<pre><code>const posts = await prisma.post.findMany({
  omit: { body: true },
  include: { tags: true }
});</code></pre>
<p>The risk profile is much better: adding a field to the card later cannot silently return <code>undefined</code>.</p>
<h2>Check before you trim</h2>
<p>Confirm nothing in the list actually renders the column. One grep is enough:</p>
<pre><code>grep -rn "\\.body" src/</code></pre>
<blockquote><p>An optimisation you have not verified is just a bug with better intentions.</p></blockquote>
`.trim()
	},
	{
		title: 'Fail closed: guarding API routes by default',
		slug: 'fail-closed-api-routes',
		description:
			'Per-route auth checks protect the routes you remember. A prefix guard protects the ones you forget.',
		excerpt: 'The endpoint you forget to protect is the one that gets used.',
		imageUrl: '/images/blogs/go.svg',
		publishedAt: new Date('2025-12-11'),
		featured: false,
		readingTime: 8,
		published: true,
		tags: ['Backend', 'API Development', 'Testing'],
		content: `
<p>Route-group layouts are a tidy way to gate pages. The trap is that API routes often sit <em>outside</em> that group, inheriting nothing.</p>
<h2>How the gap opens</h2>
<p>You protect your app routes with a layout guard. Months later you add an upload endpoint under a different path. It has no guard, and nothing tells you.</p>
<blockquote><p>Security that depends on remembering is not security. It is a habit with good luck attached.</p></blockquote>
<h2>Invert the default</h2>
<p>Guard the whole prefix and maintain an explicit allowlist of public paths:</p>
<pre><code>const PUBLIC_API_ROUTES: string[] = [];

function isProtected(pathname: string) {
  if (!pathname.startsWith('/api')) return false;
  return !PUBLIC_API_ROUTES.some((r) =&gt; pathname === r);
}</code></pre>
<p>New endpoints are now private until someone deliberately opts them out.</p>
<h3>Then prove it</h3>
<p>Assertions are not verification. Actually send the request:</p>
<pre><code>curl -s -o /dev/null -w "%{http_code}" -X DELETE localhost:3000/api/upload
# 401</code></pre>
<h3>Depth still helps</h3>
<p>Keep a check inside destructive handlers too. A guard is one refactor away from being weakened, and <strong>delete endpoints deserve two locks</strong>.</p>
`.trim()
	},
	{
		title: 'Types that lie',
		slug: 'types-that-lie',
		description:
			'A declaration file claiming a field that never arrives at runtime is worse than no types at all.',
		excerpt: 'A wrong type is more dangerous than a missing one.',
		imageUrl: '/images/blogs/types.svg',
		publishedAt: new Date('2025-11-20'),
		featured: false,
		readingTime: 4,
		published: true,
		tags: ['TypeScript', 'Testing'],
		content: `
<p>A missing type makes you check. A <em>wrong</em> type makes you confident. The second one ships bugs.</p>
<h2>A concrete case</h2>
<p>An app declares its session shape once, early on:</p>
<pre><code>interface Locals {
  user: { id: string; username: string } | null;
}</code></pre>
<p>Later the auth library changes and now supplies <code>{ id, email, name }</code>. The declaration is never updated. Now <code>locals.user.username</code> type-checks perfectly and is <code>undefined</code> every single time.</p>
<blockquote><p>The compiler is only as honest as the declarations you hand it.</p></blockquote>
<h2>Derive, don't restate</h2>
<p>Wherever you can, take the type from the thing that produces the value:</p>
<pre><code>user: import('lucia').User | null;</code></pre>
<p>Restating a shape by hand creates a copy that can drift. Deriving it cannot.</p>
`.trim()
	},
	{
		title: 'A draft that is still a draft',
		slug: 'a-draft-that-is-still-a-draft',
		description:
			'This post is unpublished on purpose — it should never appear in any public list or detail page.',
		excerpt: 'If you can read this on the public site, the published filter is missing somewhere.',
		imageUrl: '/images/blogs/testing.svg',
		publishedAt: new Date('2026-03-01'),
		featured: false,
		readingTime: 2,
		published: false,
		tags: ['Testing'],
		content: `
<p>This row exists so the <code>published</code> filter has something to actually exclude.</p>
<h2>What to expect</h2>
<ul>
<li>It must <strong>not</strong> appear at <code>/blog</code>.</li>
<li>Requesting its slug directly must return <strong>404</strong>, not 500.</li>
<li>It should stay visible and editable inside the CMS.</li>
</ul>
<p>If you can see this on the public site, a <code>where</code> clause is missing.</p>
`.trim()
	}
];

async function main() {
	const url = process.env.DATABASE_URL ?? '';
	const target = url.replace(/\/\/[^@]*@/, '//<redacted>@');
	console.log(`Seeding blogs into: ${target || '(DATABASE_URL not set)'}`);

	if (!/localhost|127\.0\.0\.1/.test(url)) {
		throw new Error(
			'Refusing to run: DATABASE_URL does not point at localhost. This script is for local development only.'
		);
	}

	for (const post of posts) {
		const { tags, ...fields } = post;

		const tagConnect = tags.map((name) => ({
			where: { name },
			create: { name, isTech: true }
		}));

		const blog = await prisma.blog.upsert({
			where: { slug: post.slug },
			update: { ...fields, tags: { set: [], connectOrCreate: tagConnect } },
			create: { ...fields, tags: { connectOrCreate: tagConnect } },
			include: { tags: true }
		});

		console.log(
			`  ${blog.published ? 'published' : 'draft    '}  ${blog.slug}  [${blog.tags
				.map((t) => t.name)
				.join(', ')}]`
		);
	}

	const [total, published, featured] = await Promise.all([
		prisma.blog.count(),
		prisma.blog.count({ where: { published: true } }),
		prisma.blog.count({ where: { published: true, featured: true } })
	]);

	console.log(`\nDone. ${total} blogs total, ${published} published, ${featured} featured.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
