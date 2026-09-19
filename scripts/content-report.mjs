#!/usr/bin/env node
// AFTER OWL — content gap report
//
// Says exactly which products are missing a photo, a description, materials,
// size or weight, and writes a paste-ready template so the gaps can be filled in
// catalog.json without hunting for keys.
//
// Run:  npm run report
//
// Why a report and not generated text: materials, dimensions and weights are
// facts a buyer decides on. Inventing them would put wrong numbers in front of
// customers and into the Product structured data Google reads. The shop owner
// has the object in their hands; this just tells them which ones to measure.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProducts } from '../src/lib/products.js';
import { CATEGORY_INTROS } from '../src/data/content.js';
import { GUIDES, guideItems } from '../src/data/guides.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = async f => JSON.parse(await fs.readFile(path.join(root, f), 'utf8'));

const [rows, catalog, manifest] = await Promise.all([
  read('src/data/sheet-snapshot.json'),
  read('src/data/catalog.json'),
  read('src/data/image-manifest.json'),
]);

const products = buildProducts(rows, catalog, manifest, '/');
const catalogKeys = new Set(catalog.map(e => e.key));

const gap = {
  photo: products.filter(p => !p.images.length),
  description: products.filter(p => !p.description || p.description.trim().length < 40),
  materials: products.filter(p => !p.materials),
  size: products.filter(p => !p.size),
  weight: products.filter(p => !p.weight),
  uncurated: products.filter(p => !catalogKeys.has(p.key)),
};

const pct = n => `${Math.round((n / products.length) * 100)}%`;
const line = (label, list) =>
  `${label.padEnd(24)} ${String(list.length).padStart(3)} of ${products.length}  (${pct(list.length)})`;

const out = [];
const say = s => { out.push(s); console.log(s); };

say(`AFTER OWL — content report · ${new Date().toISOString().slice(0, 10)}`);
say('='.repeat(64));
say('');
say(`Products live:           ${products.length}`);
say(`In stock:                ${products.filter(p => p.stock !== 0).length}`);
say('');
say('MISSING');
say(line('no photo', gap.photo));
say(line('thin/no description', gap.description));
say(line('no materials', gap.materials));
say(line('no size', gap.size));
say(line('no weight', gap.weight));
say(line('no catalog entry', gap.uncurated));
say('');

// Priority: in-stock things people can actually buy come first.
const priority = products
  .filter(p => p.stock !== 0)
  .map(p => ({
    p,
    missing: [
      !p.images.length && 'photo',
      (!p.description || p.description.trim().length < 40) && 'description',
      !p.materials && 'materials',
      !p.size && 'size',
      !p.weight && 'weight',
    ].filter(Boolean),
  }))
  .filter(x => x.missing.length)
  .sort((a, b) => b.missing.length - a.missing.length || (b.p.price || 0) - (a.p.price || 0));

say(`WORTH FIXING FIRST — in stock, most gaps first (${priority.length} products)`);
say('-'.repeat(64));
priority.slice(0, 30).forEach(({ p, missing }) => {
  say(`  ${p.key.padEnd(34)} €${String(p.price ?? '?').padStart(4)}  ${missing.join(', ')}`);
});
if (priority.length > 30) say(`  … and ${priority.length - 30} more (see content-report.txt)`);
say('');

// Coverage of the editorial copy
const categories = [...new Set(products.map(p => p.category))];
const missingIntro = categories.filter(c => !CATEGORY_INTROS[c]);
say('EDITORIAL COVERAGE');
say(line('categories w/o intro', missingIntro));
if (missingIntro.length) say(`  → add to src/data/content.js: ${missingIntro.join(', ')}`);
GUIDES.forEach(g => {
  const items = guideItems(g, products);
  const dead = g.sections.flatMap(s => s.keys).filter(k => !products.some(p => p.key === k));
  say(`  guide "${g.key}": ${items.length} live${dead.length ? `, ${dead.length} dead key(s): ${dead.join(', ')}` : ''}`);
});
say('');

// Paste-ready template for catalog.json
const template = priority.slice(0, 40).map(({ p, missing }) => {
  const entry = { key: p.key, name: p.name, category: p.category };
  if (missing.includes('materials')) entry.materials = '';
  if (missing.includes('size')) entry.size = '';
  if (missing.includes('weight')) entry.weight = '';
  if (missing.includes('description')) entry.description = '';
  return entry;
});

await fs.writeFile(path.join(root, 'content-report.txt'), out.join('\n') + '\n' +
  priority.map(({ p, missing }) => `  ${p.key.padEnd(34)} €${String(p.price ?? '?').padStart(4)}  ${missing.join(', ')}`).join('\n') + '\n');
await fs.writeFile(path.join(root, 'content-gaps.json'), JSON.stringify(template, null, 2) + '\n');

say('WRITTEN');
say('  content-report.txt   full list, readable');
say('  content-gaps.json    paste-ready stubs — fill the empty strings, then merge');
say('                       the fields into the matching entries in src/data/catalog.json');
