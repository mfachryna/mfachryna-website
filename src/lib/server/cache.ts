/**
 * Shared cache policy for the public site.
 *
 * All content here is CMS-driven and identical for every visitor — there is
 * no auth and no per-user data on the frontend — so it is safe to cache at
 * the CDN. Previously nothing but sitemap.xml sent cache headers, so every
 * request hit Postgres.
 *
 *   max-age=0                → browsers revalidate, so an edit is visible
 *                              immediately on the next navigation
 *   s-maxage=300             → the CDN serves from cache for 5 minutes
 *   stale-while-revalidate   → after that, stale is served (for up to an
 *                              hour) while a fresh copy is fetched in the
 *                              background, so no visitor waits on the DB
 */
export const CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600';

/** Longer window for data that changes very rarely (e.g. the tech tag list). */
export const CACHE_CONTROL_LONG = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';

/** Ready-made headers object for `json(body, { headers: CACHE_HEADERS })`. */
export const CACHE_HEADERS = { 'cache-control': CACHE_CONTROL };
export const CACHE_HEADERS_LONG = { 'cache-control': CACHE_CONTROL_LONG };
