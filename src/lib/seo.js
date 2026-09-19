// Head management for a single-page shop: title, description, canonical,
// Open Graph, hreflang and JSON-LD. Search engines and link previews read this,
// so it has to change when the visitor opens a product or switches language.

import { LANGS, DEFAULT_LANG } from '../i18n/index.jsx';
import { clamp } from './text.js';
import { pick } from '../data/content.js';
import { guideItems } from '../data/guides.js';

export const SITE_URL = 'https://afterowl.shop';

function tag(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function meta(name, content, attr = 'name') {
  const el = tag(`meta[${attr}="${name}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(attr, name);
    return m;
  });
  el.setAttribute('content', content);
}

function link(rel, href, extra = {}) {
  const parts = Object.entries(extra).map(([k, v]) => `[${k}="${v}"]`).join('');
  const el = tag(`link[rel="${rel}"]${parts}`, () => {
    const l = document.createElement('link');
    l.setAttribute('rel', rel);
    Object.entries(extra).forEach(([k, v]) => l.setAttribute(k, v));
    return l;
  });
  el.setAttribute('href', href);
}

/** One canonical URL per page, plus an hreflang line per language. */
function setUrls(path, lang) {
  const clean = `${SITE_URL}${path}`;
  const withLang = l => (l === DEFAULT_LANG ? clean : `${clean}?lang=${l}`);
  link('canonical', withLang(lang));
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  [...LANGS, 'x-default'].forEach(l => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', l === 'x-default' ? 'x-default' : l);
    el.setAttribute('href', withLang(l === 'x-default' ? DEFAULT_LANG : l));
    document.head.appendChild(el);
  });
  meta('og:url', withLang(lang), 'property');
}

function setJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }
  const el = existing || Object.assign(document.createElement('script'), { id, type: 'application/ld+json' });
  el.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(el);
}

const absolute = url => (!url ? `${SITE_URL}/og-image.jpg` : url.startsWith('http') ? url : `${SITE_URL}${url.replace(/^\//, '/')}`);

/** Product → schema.org Product with a real Offer, so Google can show price and stock. */
export function productSchema(product, lang) {
  const availability = product.stock === 0
    ? 'https://schema.org/OutOfStock'
    : product.stock == null
      ? 'https://schema.org/PreOrder'
      : 'https://schema.org/InStock';

  const offer = {
    '@type': 'Offer',
    url: `${SITE_URL}/p/${product.key}${lang === DEFAULT_LANG ? '' : `?lang=${lang}`}`,
    priceCurrency: 'EUR',
    availability,
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: 'AFTER OWL' },
  };
  if (product.price != null) {
    if (product.priceMax != null && product.priceMax !== product.price) {
      Object.assign(offer, { '@type': 'AggregateOffer', lowPrice: product.price, highPrice: product.priceMax, offerCount: product.variants.length || 1 });
    } else {
      offer.price = product.price;
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    category: product.category,
    description: clamp(product.description, 400) || undefined,
    image: product.images?.length ? product.images.map(absolute) : [absolute()],
    brand: { '@type': 'Brand', name: 'AFTER OWL' },
    material: product.materials || undefined,
    weight: product.weight || undefined,
    offers: offer,
  };
}

function breadcrumbs(product) {
  if (!product) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shop', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: product.category, item: `${SITE_URL}/#shop` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/p/${product.key}` },
    ],
  };
}

/**
 * @param {object}  opts
 * @param {object?} opts.product  open product, if any
 * @param {object?} opts.guide    open guide, if any
 * @param {string}  opts.lang
 * @param {object}  opts.dictMeta locale meta block (title / description / productTitle)
 * @param {object[]} opts.products full list, for the homepage ItemList
 */
export function applySeo({ product, guide, lang, dictMeta, products = [] }) {
  const guideTitle = guide ? pick(guide.title, lang) : null;

  const title = product
    ? (dictMeta.productTitle || '{name} · AFTER OWL').replace('{name}', product.name)
    : guide
      ? `${guideTitle} · AFTER OWL`
      : dictMeta.title;

  const description = product
    ? (clamp(product.description, 155) || dictMeta.description)
    : guide
      ? clamp(pick(guide.intro, lang), 155)
      : dictMeta.description;

  document.title = title;
  meta('description', description);
  meta('og:title', title, 'property');
  meta('og:description', description, 'property');
  meta('og:type', product ? 'product' : 'website', 'property');
  meta('og:locale', `${lang}_${lang.toUpperCase()}`, 'property');
  meta('og:image', absolute(product?.image), 'property');
  meta('twitter:title', title);
  meta('twitter:description', description);
  meta('twitter:image', absolute(product?.image));

  setUrls(product ? `/p/${product.key}` : guide ? `/guide/${guide.key}` : '/', lang);

  setJsonLd('ld-product', product ? productSchema(product, lang) : null);
  setJsonLd('ld-breadcrumb', breadcrumbs(product));
  // A guide is an ItemList of real products; so is the homepage.
  setJsonLd(
    'ld-itemlist',
    product || !products.length
      ? null
      : guide
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: guideTitle,
          description: pick(guide.intro, lang),
          itemListElement: guideItems(guide, products).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/p/${p.key}`,
            name: p.name,
          })),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'AFTER OWL collection',
          numberOfItems: products.length,
          itemListElement: products.slice(0, 60).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/p/${p.key}`,
            name: p.name,
          })),
        }
  );
}
