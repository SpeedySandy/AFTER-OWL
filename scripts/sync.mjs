#!/usr/bin/env node
// AFTER OWL — data & photo sync
//
// 1. Reads the inventory Google Sheet and stores a public snapshot
//    (src/data/sheet-snapshot.json) used as fallback if the live sheet can't load.
// 2. Downloads every product photo referenced in src/data/catalog.json from Google
//    Drive, optimises it to WebP and stores it in public/img/<driveFileId>.webp.
// 3. Products without curated photos get photos from a Drive sub-folder with a
//    matching name inside the "Product Images" folder.
//
// Run locally with `npm run sync`. GitHub Actions runs it nightly and before every deploy.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { SHEET_TABS, DRIVE_IMAGES_FOLDER, sheetCsvUrl, driveThumb } from '../src/config.js';
import { parseInventoryTab, norm } from '../src/lib/sheet.js';
import { buildProducts } from '../src/lib/products.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dataDir = path.join(root, 'src/data');
const imgDir = path.join(root, 'public/img');
const readJSON = async f => JSON.parse(await fs.readFile(f, 'utf8'));
const writeJSON = (f, v) => fs.writeFile(f, JSON.stringify(v, null, 1) + '\n');

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

// ── 1. Sheet snapshot ───────────────────────────────────────────────────────
async function syncSheet() {
  const rows = [];
  for (const tab of SHEET_TABS) {
    const csv = await fetchText(sheetCsvUrl(tab.name));
    const parsed = parseInventoryTab(csv, tab.defaultGroup);
    console.log(`sheet: ${tab.name} → ${parsed.length} rows`);
    rows.push(...parsed);
  }
  if (rows.length < 10) throw new Error('Sheet returned suspiciously few rows — check tab names / sharing.');
  await writeJSON(path.join(dataDir, 'sheet-snapshot.json'), rows);
  return rows;
}

// ── 2. Drive folder listing (public folder, no API key needed) ──────────────
async function listDriveFolder(id) {
  const html = await fetchText(`https://drive.google.com/embeddedfolderview?id=${id}`);
  const out = [];
  const re = /<div class="flip-entry" id="entry-([^"]+)"[\s\S]*?<a href="([^"]+)"[\s\S]*?<div class="flip-entry-title">([^<]*)<\/div>/g;
  let m;
  while ((m = re.exec(html))) {
    const title = m[3].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    out.push({ id: m[1], title, folder: m[2].includes('/folders/') });
  }
  return out;
}

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

async function autoPhotos(products) {
  const auto = {};
  const missing = products.filter(p => !p.images.length);
  if (!missing.length) return auto;

  let folders;
  try {
    folders = (await listDriveFolder(DRIVE_IMAGES_FOLDER)).filter(e => e.folder);
  } catch (e) {
    console.warn('drive: could not list photo folder —', e.message);
    return auto;
  }

  for (const p of missing) {
    // folder name must match the product name (case, accents and punctuation don't matter)
    const folder = folders.find(f => norm(f.title) === norm(p.name));
    if (!folder) continue;
    const files = (await listDriveFolder(folder.id)).filter(f => !f.folder && IMAGE_EXT.test(f.title));
    if (files.length) {
      auto[p.key] = files.slice(0, 6).map(f => f.id);
      console.log(`drive: "${p.name}" ← folder "${folder.title}" (${auto[p.key].length} photos)`);
    }
  }
  return auto;
}

// ── 3. Photo download & optimisation ────────────────────────────────────────
async function downloadImage(id) {
  const file = path.join(imgDir, `${id}.webp`);
  try {
    await fs.access(file);
    return true; // already there
  } catch {}
  // The thumbnail endpoint occasionally 404s for otherwise-valid files (rate limits,
  // freshly uploaded files, etc). Fall back to the direct download endpoint.
  const sources = [
    { url: driveThumb(id, 'w1400'), requireImageType: true },
    { url: `https://drive.google.com/uc?export=download&id=${id}`, requireImageType: false },
  ];
  let lastErr;
  for (const { url, requireImageType } of sources) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      const type = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(`${res.status} ${type}`);
      if (requireImageType && !type.startsWith('image/')) throw new Error(`${res.status} ${type}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .rotate()
        .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(file);
      return true;
    } catch (e) {
      lastErr = e;
    }
  }
  console.warn(`photo ${id}: ${lastErr.message}`);
  return false;
}

async function pool(items, size, fn) {
  const results = [];
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }));
  return results;
}

// ── main ────────────────────────────────────────────────────────────────────
const catalog = await readJSON(path.join(dataDir, 'catalog.json'));
let rows;
try {
  rows = await syncSheet();
} catch (e) {
  console.warn('sheet: live fetch failed, using existing snapshot —', e.message);
  rows = await readJSON(path.join(dataDir, 'sheet-snapshot.json'));
}

const products = buildProducts(rows, catalog, { files: [], auto: {} });
const auto = await autoPhotos(products);

const wanted = new Set();
for (const entry of catalog) {
  (entry.images || []).forEach(id => wanted.add(id));
  entry.rows.forEach(r => r.image && wanted.add(r.image));
}
Object.values(auto).flat().forEach(id => wanted.add(id));
const about = await readJSON(path.join(dataDir, 'about.json'));
[about.hero, ...about.owlGallery, ...about.popup].forEach(id => wanted.add(id));

await fs.mkdir(imgDir, { recursive: true });
const ids = [...wanted];
const ok = await pool(ids, 8, downloadImage);
const files = ids.filter((_, i) => ok[i]).sort();
for (const k of Object.keys(auto)) {
  auto[k] = auto[k].filter(id => files.includes(id));
  if (!auto[k].length) delete auto[k];
}

// remove photos that are no longer referenced
for (const f of await fs.readdir(imgDir)) {
  if (f.endsWith('.webp') && !wanted.has(f.replace(/\.webp$/, ''))) {
    await fs.unlink(path.join(imgDir, f));
    console.log(`photo removed: ${f}`);
  }
}

await writeJSON(path.join(dataDir, 'image-manifest.json'), { files, auto });

const shown = buildProducts(rows, catalog, { files, auto });
const noPhoto = shown.filter(p => !p.images.length).map(p => p.name);
console.log(`\n${shown.length} products · ${files.length} photos · ${noPhoto.length} products without photo`);
if (noPhoto.length) console.log('without photo:', noPhoto.join(', '));
