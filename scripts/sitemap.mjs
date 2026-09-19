#!/usr/bin/env node
// Writes public/sitemap.xml from the current product list.
//
// Every product has a real URL now (/p/<key>), so every product belongs in the
// sitemap with its language alternates. Called at the end of `npm run sync`,
// which runs nightly — so a piece added to the sheet is submitted to search
// engines within a day instead of never.
//
// Standalone use (no network, reads the committed snapshot):  node scripts/sitemap.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProducts } from '../src/lib/products.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = 'https://afterowl.shop';
const LANGS = ['en', 'es', 'de'];

function urlEntry(loc, { priority, changefreq, lastmod }) {
  const alternates = LANGS.map(
    l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${loc}${l === 'en' ? '' : `?lang=${l}`}"/>`
  );
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...alternates,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

export async function writeSitemap(products) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const inStock = products.filter(p => p.stock !== 0);
  const soldOut = products.filter(p => p.stock === 0);

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlEntry(`${SITE}/`, { priority: '1.0', changefreq: 'weekly', lastmod }),
    ...inStock.map(p => urlEntry(`${SITE}/p/${p.key}`, { priority: '0.8', changefreq: 'weekly', lastmod })),
    ...soldOut.map(p => urlEntry(`${SITE}/p/${p.key}`, { priority: '0.4', changefreq: 'monthly', lastmod })),
    '</urlset>',
    '',
  ].join('\n');

  await fs.writeFile(path.join(root, 'public/sitemap.xml'), xml);
  console.log(`sitemap: ${products.length + 1} urls`);
  return xml;
}

// Run directly → build the list from the committed snapshot.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const read = async f => JSON.parse(await fs.readFile(path.join(root, f), 'utf8'));
  const [rows, catalog, manifest] = await Promise.all([
    read('src/data/sheet-snapshot.json'),
    read('src/data/catalog.json'),
    read('src/data/image-manifest.json'),
  ]);
  await writeSitemap(buildProducts(rows, catalog, manifest, '/'));
}
