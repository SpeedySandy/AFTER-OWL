// Parsing of the AFTER OWL inventory sheet.
// Shared by the browser (live data) and scripts/sync.mjs (snapshot at build time).

/** RFC-4180 CSV parser (handles quotes, escaped quotes and newlines inside cells). */
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else inQuotes = false;
      } else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

/** Normalise names for matching: case, accents, punctuation and spacing don't matter. */
export function norm(s) {
  return String(s ?? '')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\s\-–—_"'’`´.,:;!?()\/&|+]+/g, ' ')
    .trim();
}

const num = v => {
  const s = String(v ?? '').replace(',', '.').replace(/[^0-9.]/g, '');
  if (!s) return null;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
};

const int = v => {
  const s = String(v ?? '').trim();
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null;   // "#REF!", "" etc → unknown
  return Math.max(0, Math.round(parseFloat(s)));
};

/**
 * Turn one sheet tab (CSV text) into public inventory rows.
 * Group-header rows ("Tubes", "Cards", …) have a group but no product name.
 */
export function parseInventoryTab(csvText, defaultGroup = '') {
  const table = parseCSV(csvText).filter(r => r.some(c => c.trim()));
  if (table.length < 2) return [];

  const headers = table[0].map(h => h.trim().toLowerCase());
  const col = (...needles) => {
    for (const n of needles) {
      const i = headers.findIndex(h => h.includes(n));
      if (i >= 0) return i;
    }
    return -1;
  };

  const iName   = col('product name', 'title', 'name');
  const iGroup  = col('product group', 'group', 'category', 'section');
  const iNotes  = col('notes', 'description');
  const iPrice  = col('selling price', 'price');
  const iStock  = col('stock qty', 'stock', 'quantity');
  const iBought = col('bought qty');
  const iSold   = col('sold qty');
  const iEtsy   = col('etsy');
  const iWeb    = col('website', 'show online');   // optional column: FALSE / hide
  if (iName < 0) return [];

  const out = [];
  let group = defaultGroup;

  for (const r of table.slice(1)) {
    const name = (r[iName] || '').trim();
    const groupCell = iGroup >= 0 ? (r[iGroup] || '').trim() : '';
    if (!name) {
      if (groupCell) group = groupCell;
      continue;
    }

    const rest = r.map(c => String(c).toLowerCase());
    const hiddenByNote = rest.some(c => c.trim() === 'own use');
    const webCell = iWeb >= 0 ? (r[iWeb] || '').trim().toLowerCase() : '';
    const hidden = hiddenByNote || ['false', 'no', 'hide', 'hidden', '0'].includes(webCell);

    let stock = iStock >= 0 ? int(r[iStock]) : null;
    if (stock === null && iBought >= 0 && String(r[iStock] ?? '').includes('#')) {
      stock = int(r[iBought]);  // broken formula (#REF!) → fall back to bought qty
    }

    out.push({
      name,
      group: groupCell || group,
      notes: iNotes >= 0 ? (r[iNotes] || '').trim() : '',
      price: iPrice >= 0 ? num(r[iPrice]) : null,
      stock,
      sold: iSold >= 0 ? int(r[iSold]) || 0 : 0,
      etsy: iEtsy >= 0 && /^(true|yes|1)$/i.test((r[iEtsy] || '').trim()),
      hidden,
    });
  }
  return out;
}
