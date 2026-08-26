/**
 * Additive project-content seed for LOCAL development.
 *
 * Only writes the `content` column, and only for the ids listed below. It
 * touches nothing else — no deletes, no tag changes, no title/description
 * edits. By default it SKIPS any project that already has content, so it
 * cannot clobber real writing; pass --force to overwrite.
 *
 *   DATABASE_URL="postgresql://<user>@localhost:5432/portof?schema=public" \
 *     bun run prisma/seed-project-content.ts [--force]
 *
 * Bodies are Tiptap-style HTML, matching what the CMS editor produces.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const force = process.argv.includes('--force');

const bodies: Record<number, string> = {
	// Personal Portfolio — SvelteKit, TypeScript, TailwindCSS, Prisma
	1: `
<p>This site is the thing you are reading right now. It runs as two separate SvelteKit applications against one PostgreSQL database: a public site optimised for reading, and a private CMS for authoring.</p>
<h2>Why two apps instead of one</h2>
<p>Keeping the CMS separate means the public site ships no editor code, no authentication logic and no admin routes. The read path stays small, and a mistake in the admin surface cannot widen the attack surface of the public one.</p>
<h3>The shared database</h3>
<p>Both applications talk to the same Postgres instance through Prisma. The schema is the contract between them:</p>
<ul>
<li><strong>Public app</strong> — read-only queries, aggressively cached at the CDN.</li>
<li><strong>CMS</strong> — session-authenticated writes, no caching at all.</li>
</ul>
<h2>Rendering CMS content</h2>
<p>Posts are authored in a rich-text editor and stored as HTML. The important detail is that the body is rendered <em>on the server</em>, not parsed after hydration:</p>
<pre><code>&lt;div class="prose prose-content"&gt;{@html post.content}&lt;/div&gt;</code></pre>
<blockquote><p>If a crawler cannot see your article without running JavaScript, the article may as well not exist.</p></blockquote>
<h3>Caching strategy</h3>
<p>Every public response carries <code>stale-while-revalidate</code>, so the database is consulted rarely and no visitor ever waits on a cold query.</p>
<h2>What I would change</h2>
<p>The two apps duplicate their Prisma schema file, which has to be kept in sync by hand. A shared package would remove that footgun.</p>
`,
	// Omnichannel Loyalty Platform — Laravel, PHP, MySQL, API Development
	2: `
<p>A customer rewards platform serving both retail point-of-sale terminals and a mobile app, built with Laravel against MySQL as part of a wider omni-channel system.</p>
<h2>The core problem: one balance, many channels</h2>
<p>A member can earn points at a till and redeem them in the app seconds later. Any drift between channels is money — either given away or wrongly withheld.</p>
<h3>Ledger, not counter</h3>
<p>Balances are never stored as a mutable number. Every movement is an append-only ledger row, and the balance is derived:</p>
<pre><code>SELECT SUM(delta) FROM point_movements WHERE member_id = ?</code></pre>
<ul>
<li>Every change is <strong>auditable</strong> — you can always answer "why is it this number".</li>
<li>Corrections are compensating entries, never destructive edits.</li>
<li>Disputes are resolved from data rather than from memory.</li>
</ul>
<h2>Concurrency</h2>
<p>Two terminals redeeming at once was the failure mode that mattered. Redemptions run inside a transaction with a row lock on the member, so the second request waits rather than reading a stale balance.</p>
<blockquote><p>Every double-spend bug I have seen came from reading a balance and writing it back as if nothing happened in between.</p></blockquote>
<h3>Documentation as a deliverable</h3>
<p>Several teams consumed these APIs, so the endpoint documentation was treated as part of the work rather than an afterthought — including the error cases, which are the ones integrators actually hit.</p>
`,
	// Warehouse Management System — Laravel, PHP, MySQL
	3: `
<p>Inventory tracking for a multi-store retail operation. I maintained the existing application while adding stock-movement features across store locations.</p>
<h2>Stock movement between stores</h2>
<p>Moving stock is two writes that must agree: a decrement at the origin and an increment at the destination. Half of that operation succeeding is worse than none of it.</p>
<h3>Transactions with explicit states</h3>
<p>A transfer is modelled as a record with a lifecycle rather than as an instant event:</p>
<ul>
<li><code>requested</code> — raised at the destination store</li>
<li><code>dispatched</code> — stock deducted from origin</li>
<li><code>received</code> — stock added at destination</li>
</ul>
<p>Stock in transit belongs to neither store, which makes the in-between state explicit instead of invisible.</p>
<blockquote><p>Inventory bugs are rarely arithmetic. They are almost always a missing state.</p></blockquote>
<h2>Working in an inherited codebase</h2>
<p>Most of this work was additive change inside code I did not write. The rule I followed was to match the surrounding conventions even where I would have chosen differently — a consistent codebase is easier to reason about than a locally optimal one.</p>
`,
	// Upskilling Go Project — Go, PostgreSQL, AWS, CI/CD, Docker, Testing
	4: `
<p>A set of backend services — banking, shopping and social features — built with <code>go-chi</code> and PostgreSQL, used as a vehicle for load testing and deployment practice.</p>
<h2>Why banking first</h2>
<p>Money transfer is the smallest problem that forces you to get concurrency right. Two simultaneous transfers between the same accounts will expose a naive implementation immediately.</p>
<pre><code>tx, err := db.BeginTx(ctx, &amp;sql.TxOptions{
    Isolation: sql.LevelReadCommitted,
})
if err != nil {
    return err
}
defer tx.Rollback()</code></pre>
<h3>Deadlocks are an ordering problem</h3>
<p>Two transfers in opposite directions deadlocked reliably. The fix was not clever — always lock accounts in a consistent order, lowest id first, so no cycle can form.</p>
<h2>Load testing</h2>
<p>Testing under concurrency changed what I believed about the system:</p>
<ul>
<li>The bottleneck was <strong>connection pool exhaustion</strong>, not query time.</li>
<li>p99 latency degraded long before average latency moved at all.</li>
<li>Adding indexes helped far less than reducing round trips per request.</li>
</ul>
<blockquote><p>Average latency tells you how the system feels when nothing is wrong. p99 tells you how it feels when it matters.</p></blockquote>
<h3>Containers and CI</h3>
<p>Each service ships as a multi-stage Docker build, with tests running against a real Postgres container in CI rather than a mock — the failures worth catching are the ones only a real database produces.</p>
`,
	// KPI App for Teachers — Laravel, MySQL, Livewire, VPS
	5: `
<p>A performance-management application for tracking teacher KPIs, built with Laravel and Livewire and deployed to a self-managed VPS.</p>
<h2>Livewire over a SPA</h2>
<p>This application is form-heavy and mostly server-state. A separate frontend would have meant duplicating validation rules on both sides. Livewire keeps one source of truth in PHP while still feeling responsive.</p>
<h3>Where it earns its place</h3>
<ul>
<li>Validation lives once, on the server.</li>
<li>No API layer to maintain for what is essentially CRUD.</li>
<li>Complex nested forms stay manageable.</li>
</ul>
<h2>Scoring periods</h2>
<p>KPI targets change between terms, and historical scores must not shift when a target is revised. Each evaluation therefore stores the target it was scored against, rather than referencing the current one.</p>
<blockquote><p>Any record that will be read a year from now should carry the context it was created in.</p></blockquote>
<h3>Running it on a VPS</h3>
<p>Deploying to a plain server meant owning the parts a platform normally hides — the web server, TLS renewal, the queue worker under a process supervisor, and scheduled backups. Worth doing once to understand what is actually being abstracted away.</p>
`,
	// Notion-GCalendar Sync — Go, API Development
	6: `
<p>A Go service that keeps a Notion database and Google Calendar in agreement, in both directions.</p>
<h2>Two-way sync is a conflict problem</h2>
<p>One-way mirroring is straightforward. The moment both sides can write, you have to answer what happens when both change the same item between runs.</p>
<h3>The rules I settled on</h3>
<ul>
<li>Each side keeps a <strong>last-synced fingerprint</strong>, so genuine edits are distinguishable from echoes of our own writes.</li>
<li>If exactly one side changed, propagate it.</li>
<li>If both changed, most recent edit wins and the other version is logged rather than silently discarded.</li>
</ul>
<blockquote><p>Without the fingerprint, your own write looks like a remote change and the two services sync each other forever.</p></blockquote>
<h2>Rate limits</h2>
<p>Both APIs throttle, and neither is generous. Requests run through a limiter with exponential backoff, and the sync is incremental — only items whose timestamps moved since the last successful run are considered.</p>
<h3>Idempotency</h3>
<p>The service can crash mid-run and be restarted safely: every operation is keyed on a stable external id, so replaying it produces the same result rather than a duplicate event.</p>
`
};

async function main() {
	const url = process.env.DATABASE_URL ?? '';
	console.log(`Seeding project content into: ${url.replace(/\/\/[^@]*@/, '//<redacted>@')}`);

	if (!/localhost|127\.0\.0\.1/.test(url)) {
		throw new Error('Refusing to run: DATABASE_URL must point at localhost.');
	}

	let written = 0;
	let skipped = 0;

	for (const [idRaw, html] of Object.entries(bodies)) {
		const id = Number(idRaw);
		const existing = await prisma.project.findUnique({
			where: { id },
			select: { id: true, title: true, content: true }
		});

		if (!existing) {
			console.log(`  -  id ${id} not found, skipping`);
			continue;
		}

		if (existing.content && existing.content.trim() && !force) {
			console.log(`  =  ${existing.title} — already has content, skipped (use --force)`);
			skipped++;
			continue;
		}

		await prisma.project.update({ where: { id }, data: { content: html.trim() } });
		console.log(`  +  ${existing.title}`);
		written++;
	}

	const withContent = await prisma.project.count({ where: { NOT: { content: null } } });
	const total = await prisma.project.count();
	console.log(`\nDone. ${written} written, ${skipped} skipped. ${withContent}/${total} projects now have content.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
