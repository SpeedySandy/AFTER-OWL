// Tiny history router. The shop is one page, but every product gets a real,
// crawlable URL — /p/<product-key> — instead of the old ?p=<key> query string.
//
// GitHub Pages has no server-side rewrite, so public/404.html bounces deep links
// back to index.html with the path encoded as "?/p/whatever". restoreDeepLink()
// below turns that back into a clean URL before React ever renders.

const BASE = import.meta.env.BASE_URL || '/';

export const PRODUCT_PREFIX = 'p';
export const GUIDE_PREFIX = 'guide';

export function productPath(key) {
  return `${BASE}${PRODUCT_PREFIX}/${key}`;
}

export function guidePath(key) {
  return `${BASE}${GUIDE_PREFIX}/${key}`;
}

export function productUrl(key, origin = window.location.origin) {
  return `${origin}${productPath(key)}`;
}

/** Current route: { name: 'home' } or { name: 'product', key }. */
export function parseLocation(loc = window.location) {
  const legacy = new URLSearchParams(loc.search).get('p');
  if (legacy) return { name: 'product', key: legacy, legacy: true };

  let path = loc.pathname;
  if (BASE !== '/' && path.startsWith(BASE)) path = path.slice(BASE.length - 1);
  const product = path.match(new RegExp(`^/${PRODUCT_PREFIX}/([^/?#]+)/?$`));
  if (product) return { name: 'product', key: decodeURIComponent(product[1]) };

  const guide = path.match(new RegExp(`^/${GUIDE_PREFIX}/([^/?#]+)/?$`));
  if (guide) return { name: 'guide', key: decodeURIComponent(guide[1]) };

  return { name: 'home' };
}

/** Keeps ?lang= (and nothing else) when moving between routes. */
function withLang(path) {
  const lang = new URLSearchParams(window.location.search).get('lang');
  return lang ? `${path}?lang=${encodeURIComponent(lang)}` : path;
}

export function navigate(route, { replace = false } = {}) {
  const path =
    route?.name === 'product' ? productPath(route.key)
    : route?.name === 'guide' ? guidePath(route.key)
    : BASE;
  const url = withLang(path);
  if (url === window.location.pathname + window.location.search) return;
  window.history[replace ? 'replaceState' : 'pushState']({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function onRouteChange(fn) {
  const handler = () => fn(parseLocation());
  window.addEventListener('popstate', handler);
  return () => window.removeEventListener('popstate', handler);
}

/**
 * Undo the 404.html redirect ("/?/p/fire-leash" → "/p/fire-leash") and upgrade
 * legacy "?p=key" links. Call once, before rendering.
 */
export function restoreDeepLink() {
  const { search } = window.location;
  if (search.startsWith('?/')) {
    const [path, query = ''] = search.slice(2).split('&?');
    const clean = `${BASE}${path.replace(/~and~/g, '&')}`.replace(/\/{2,}/g, '/');
    window.history.replaceState({}, '', clean + (query ? `?${query.replace(/~and~/g, '&')}` : '') + window.location.hash);
    return;
  }
  const route = parseLocation();
  if (route.legacy) {
    const url = new URL(window.location.href);
    url.searchParams.delete('p');
    window.history.replaceState({}, '', productPath(route.key) + url.search + url.hash);
  }
}
