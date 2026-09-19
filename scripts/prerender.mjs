#!/usr/bin/env node
// AFTER OWL — static product pages
//
// The shop is a React app, so without this every product URL served the same
// empty index.html. Google can run JavaScript eventually, but the link
// unfurlers that actually matter here — WhatsApp, Instagram, Facebook, Signal,
// Slack — never do: they read the raw HTML and give up. A product link shared in
// a chat showed the generic shop preview instead of the piece.
//
// So after the Vite build, every product gets its own real file at
// dist/p/<key>/index.html: same app bundle, but with that product's title,
// description, canonical, Open Graph image and Product JSON-LD already in the
// markup. GitHub Pages serves it directly, no 404 bounce, no JS required for the
// preview. The app then hydrates and takes over as usual.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProducts } from '../src/lib/products.js';
import { clamp } from '../src/lib/text.js';
import { GUIDES, guideItems } from '../src/data/guides.js';
import { pick } from '../src/data/content.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const SITE = 'https://afterowl.shop';
const LANGS = ['en', 'es', 'de'];

const readJSON = async f => JSON.parse(await fs.readFile(f, 'utf8'));
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const [shell, rows, catalog, manifest] = await Promise.all([
  fs.readFile(path.join(dist, 'index.html'), 'utf8'),
  readJSON(path.join(root, 'src/data/sheet-snapshot.json')),
  readJSON(path.join(root, 'src/data/catalog.json')),
  readJSON(path.join(root, 'src/data/image-manifest.json')),
]);

const products = buildProducts(rows, catalog, manifest, '/');

const absolute = url => (!url ? `${SITE}/og-image.jpg` : url.startsWith('http') ? url : `${SITE}${url.startsWith('/') ? '' : '/'}${url}`);

function offerFor(p) {
  const availability = p.stock === 0
    ? 'https://schema.org/OutOfStock'
    : p.stock == null ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock';
  const base = {
    url: `${SITE}/p/${p.key}`,
    priceCurrency: 'EUR',
    availability,
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: 'AFTER OWL' },
  };
  if (p.price == null) return { '@type': 'Offer', ...base };
  if (p.priceMax != null && p.priceMax !== p.price) {
    return { '@type': 'AggregateOffer', lowPrice: p.price, highPrice: p.priceMax, offerCount: p.variants.length || 1, ...base };
  }
  return { '@type': 'Offer', price: p.price, ...base };
}

function headFor(p) {
  const title = `${p.name} · AFTER OWL`;
  const description = clamp(p.description, 155)
    || `${p.name} — ${p.category} from AFTER OWL, Barcelona. Tested in the wild, trusted in the night.`;
  const image = absolute(p.image);
  const url = `${SITE}/p/${p.key}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    category: p.category,
    description: clamp(p.description, 400) || description,
    image: p.images?.length ? p.images.map(absolute) : [absolute()],
    brand: { '@type': 'Brand', name: 'AFTER OWL' },
    ...(p.materials ? { material: p.materials } : {}),
    ...(p.weight ? { weight: p.weight } : {}),
    offers: offerFor(p),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shop', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: p.category, item: `${SITE}/#shop` },
      { '@type': 'ListItem', position: 3, name: p.name, item: url },
    ],
  };

  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${url}${l === 'en' ? '' : `?lang=${l}`}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta property="og:type" content="product" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="product:price:amount" content="${p.price ?? ''}" />`,
    `<meta property="product:price:currency" content="EUR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
    `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`,
  ].join('\n    ');
}

/**
 * A crawler-visible summary of the product inside #root. React replaces it on
 * mount, so a visitor never sees it — but a bot that doesn't run JS does.
 */
function bodyFor(p) {
  const price = p.price == null ? '' : `<p>€${p.price}${p.priceMax != null && p.priceMax !== p.price ? ` – €${p.priceMax}` : ''}</p>`;
  return [
    '<article>',
    `<h1>${esc(p.name)}</h1>`,
    `<p>${esc(p.category)}</p>`,
    price,
    p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" width="600" height="600" />` : '',
    p.description ? `<p>${esc(p.description.replace(/\s+/g, ' ').trim())}</p>` : '',
    '<p><a href="/">AFTER OWL — the full collection</a></p>',
    '</article>',
  ].filter(Boolean).join('');
}

// Strip the tags the shell already carries so a product page has exactly one of each
const STRIP = /\s*(<title>[\s\S]*?<\/title>|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>|<meta property="og:(?:type|url|title|description|image)"[^>]*>|<meta name="twitter:(?:card|title|description|image)"[^>]*>)/g;

let written = 0;
for (const p of products) {
  const html = shell
    .replace(STRIP, '')
    .replace('</head>', `  ${headFor(p)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${bodyFor(p)}</div>`);

  const dir = path.join(dist, 'p', p.key);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), html);
  written += 1;
}

// ── Guides ──────────────────────────────────────────────────────────────────
// Same treatment: a guide is a page worth sharing, and an unfurler needs to see
// its title and a photo without running the app.
let guidesWritten = 0;
for (const guide of GUIDES) {
  const items = guideItems(guide, products);
  if (!items.length) continue;

  const title = `${pick(guide.title, 'en')} · AFTER OWL`;
  const description = clamp(pick(guide.intro, 'en'), 155);
  const url = `${SITE}/guide/${guide.key}`;
  const image = absolute(items.find(p => p.image)?.image);

  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${url}${l === 'en' ? '' : `?lang=${l}`}" />`),
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: pick(guide.title, 'en'),
      description: pick(guide.intro, 'en'),
      itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/p/${p.key}`, name: p.name })),
    })}</script>`,
  ].join('\n    ');

  const body = [
    '<article>',
    `<h1>${esc(pick(guide.title, 'en'))}</h1>`,
    `<p>${esc(pick(guide.intro, 'en'))}</p>`,
    ...guide.sections.map(section => {
      const list = section.keys.map(k => products.find(p => p.key === k)).filter(Boolean);
      if (!list.length) return '';
      return [
        `<h2>${esc(pick(section.title, 'en'))}</h2>`,
        `<p>${esc(pick(section.note, 'en'))}</p>`,
        '<ul>',
        ...list.map(p => `<li><a href="/p/${p.key}">${esc(p.name)}</a>${p.price != null ? ` — €${p.price}` : ''}</li>`),
        '</ul>',
      ].join('');
    }),
    '<p><a href="/">AFTER OWL — the full collection</a></p>',
    '</article>',
  ].filter(Boolean).join('');

  const html = shell
    .replace(STRIP, '')
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const dir = path.join(dist, 'guide', guide.key);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), html);
  guidesWritten += 1;
}

console.log(`prerender: ${written} product pages and ${guidesWritten} guides written to dist/`);
