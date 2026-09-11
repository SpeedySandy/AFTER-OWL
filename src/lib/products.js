// Combines live inventory rows (from the Google Sheet) with the curated catalog
// (names, descriptions, photos, variant grouping) into the products shown on the site.
//
// Rules
// • The sheet decides WHAT is shown: price, stock, availability. Delete a row → gone.
// • src/data/catalog.json adds the nice stuff: display name, story, photos, variants.
// • A sheet row with no catalog entry still shows up automatically (name + notes),
//   and rows named "Something - colour" are grouped into one product with variants.
// • Rows are hidden when: marked "own use", a "Website" column says FALSE,
//   or both price and stock are empty.

import { norm } from './sheet.js';
import { driveThumb, ETSY_SHOP_URL } from '../config.js';

export const CATEGORY_ORDER = [
  'Handmade Limited Edition',
  'Sets',
  'Tubes',
  'Cards',
  'Dispenser',
  'Spoons',
  'Tools',
  'Mirror',
  'Secret Stash',
  'Festival & Clubbing Gear',
  'Bags',
  'Accessories',
  'Clothing',
  'Caps & Hats',
  'Lights',
  'Other',
];

const GROUP_TO_CATEGORY = {
  'handmade': 'Handmade Limited Edition',
  'art work': 'Handmade Limited Edition',
  'artwork': 'Handmade Limited Edition',
  'tubes': 'Tubes',
  'cards': 'Cards',
  'spoons': 'Spoons',
  'dispenser': 'Dispenser',
  'dispensers': 'Dispenser',
  'sets': 'Sets',
  'tools': 'Tools',
  'mirror': 'Mirror',
  'mirrors': 'Mirror',
  'accessories': 'Accessories',
  'bags': 'Bags',
  'clothing': 'Clothing',
  'caps': 'Caps & Hats',
  'secret stash': 'Secret Stash',
  'lights': 'Lights',
  'other': 'Other',
};

export function categoryForGroup(group) {
  const g = norm(group);
  if (GROUP_TO_CATEGORY[g]) return GROUP_TO_CATEGORY[g];
  if (!g) return 'Other';
  return group.trim().replace(/\b\w/g, c => c.toUpperCase());
}

export function sortCategories(cats) {
  const rank = c => {
    const i = CATEGORY_ORDER.indexOf(c);
    return i === -1 ? CATEGORY_ORDER.length : i;
  };
  return [...cats].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}

export function etsySearchUrl(name) {
  return `${ETSY_SHOP_URL}?search_query=${encodeURIComponent(name)}`;
}

function makeImageUrl(manifest, base) {
  const local = new Set(manifest?.files || []);
  return id => (local.has(id) ? `${base}img/${id}.webp` : driveThumb(id));
}

function slug(s) {
  return norm(s).replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'item';
}

/**
 * @param {object[]} rows      parsed sheet rows (see parseInventoryTab)
 * @param {object[]} catalog   src/data/catalog.json
 * @param {object}   manifest  src/data/image-manifest.json
 * @param {string}   base      import.meta.env.BASE_URL
 */
export function buildProducts(rows, catalog, manifest, base = '/') {
  const imageUrl = makeImageUrl(manifest, base);

  const rowIndex = new Map();
  for (const entry of catalog) {
    for (const def of entry.rows) rowIndex.set(norm(def.match), { entry, def });
  }

  const products = new Map();
  let order = 0;

  for (const row of rows) {
    if (row.hidden) continue;
    if (row.price == null && row.stock == null) continue;

    let key, entry = null, def = null, variantName = null;
    const hit = rowIndex.get(norm(row.name));

    if (hit) {
      ({ entry, def } = hit);
      key = entry.key;
      variantName = def.variant || null;
    } else {
      // "Weekend Dispenser - Silver" → product "Weekend Dispenser", variant "Silver"
      const m = row.name.match(/^(.+?)\s+[-–—]\s+(.+)$/);
      const baseName = m ? m[1].trim() : row.name.trim();
      variantName = m ? m[2].trim().replace(/^\p{Ll}/u, c => c.toUpperCase()) : null;
      key = `auto-${slug(baseName)}`;
      if (!products.has(key)) {
        const autoPhotos = manifest?.auto?.[key] || [];
        products.set(key, {
          key,
          order: order++,
          name: baseName,
          category: categoryForGroup(row.group),
          handmade: /handmade|art ?work/i.test(row.group),
          description: row.notes && norm(row.notes) !== norm(row.name) ? row.notes : '',
          images: autoPhotos.map(imageUrl),
          tags: [],
          variantLabel: variantName ? 'Option' : null,
          rows: [],
        });
      }
    }

    if (!products.has(key)) {
      products.set(key, {
        key,
        order: order++,
        name: entry.name,
        category: entry.category || categoryForGroup(row.group),
        handmade: !!entry.handmade,
        description: entry.description || row.notes || '',
        materials: entry.materials || '',
        size: entry.size || '',
        weight: entry.weight || '',
        tags: entry.tags || [],
        gradient: entry.gradient || null,
        images: (entry.images?.length ? entry.images : manifest?.auto?.[key] || []).map(imageUrl),
        variantLabel: entry.variantLabel || null,
        rows: [],
      });
    }

    const product = products.get(key);
    product.rows.push({
      name: variantName || row.name,
      price: row.price,
      stock: row.stock,
      sold: row.sold || 0,
      etsy: row.etsy,
      image: def?.image ? imageUrl(def.image) : null,
      gradient: def?.gradient || null,
    });
  }

  const list = [...products.values()].map(p => {
    const { rows: variants, ...rest } = p;
    const prices = variants.map(v => v.price).filter(v => v != null);
    const stocks = variants.map(v => v.stock).filter(v => v != null);
    const hasVariants = variants.length > 1 || (variants.length === 1 && p.variantLabel && variants[0].name !== p.name);

    const product = {
      ...rest,
      id: p.key,
      price: prices.length ? Math.min(...prices) : null,
      priceMax: prices.length ? Math.max(...prices) : null,
      stock: stocks.length ? stocks.reduce((a, b) => a + b, 0) : null,
      sold: variants.reduce((a, v) => a + (v.sold || 0), 0),
      onEtsy: variants.some(v => v.etsy),
      etsyUrl: etsySearchUrl(p.name),
      variants: hasVariants ? variants : [],
    };
    if (!product.images.length) {
      product.images = variants.map(v => v.image).filter(Boolean);
    }
    product.image = product.images[0] || null;
    product.searchText = norm([product.name, product.category, product.description, ...(product.tags || []), ...variants.map(v => v.name)].join(' '));
    return product;
  });

  const rank = c => {
    const i = CATEGORY_ORDER.indexOf(c);
    return i === -1 ? CATEGORY_ORDER.length : i;
  };
  const soldOut = p => (p.stock === 0 ? 1 : 0);

  return list.sort((a, b) =>
    rank(a.category) - rank(b.category) ||
    a.category.localeCompare(b.category) ||
    soldOut(a) - soldOut(b) ||
    a.order - b.order
  );
}

export function availability(stock) {
  if (stock == null) return { label: 'Ask for availability', tone: 'ask' };
  if (stock === 0) return { label: 'Sold out', tone: 'out' };
  if (stock <= 2) return { label: `Only ${stock} left`, tone: 'low' };
  return { label: 'In stock', tone: 'in' };
}

export function formatPrice(price, priceMax) {
  if (price == null) return 'Price on request';
  const f = n => `€${Number.isInteger(n) ? n : n.toFixed(2)}`;
  return priceMax != null && priceMax !== price ? `${f(price)} – ${f(priceMax)}` : f(price);
}
