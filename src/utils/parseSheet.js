function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseSheetCSV(csvText) {
  const lines = csvText.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVRow(lines[0]).map(h => h.toLowerCase());

  const idx = (name) => {
    const i = headers.findIndex(h => h.includes(name.toLowerCase()));
    return i >= 0 ? i : null;
  };

  const iTitle       = idx('title') ?? 0;
  const iDesc        = idx('description') ?? 1;
  const iSection     = idx('section') ?? idx('category') ?? 11;
  const iPrice       = idx('price') ?? 12;
  const iQty         = idx('quantity') ?? 13;
  const iSku         = idx('sku') ?? 14;
  const iTags        = idx('tags') ?? 8;
  const iMaterials   = idx('materials') ?? 9;
  const iPhoto1      = headers.findIndex(h => h === 'photo 1');
  const iWeight      = idx('weight') ?? null;

  const products = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRow(lines[i]);
    const name = row[iTitle]?.trim();
    if (!name) continue;

    const priceRaw = row[iPrice]?.replace(/[^0-9.]/g, '');
    const qtyRaw   = row[iQty]?.replace(/[^0-9]/g, '');

    products.push({
      id: i,
      name,
      sku:         row[iSku]?.trim()    || '',
      category:    row[iSection]?.trim() || 'Other',
      price:       parseFloat(priceRaw) || 0,
      stock:       parseInt(qtyRaw)     || 0,
      description: row[iDesc]?.trim()   || '',
      tags:        (row[iTags] || '').split(',').map(t => t.trim()).filter(Boolean),
      materials:   row[iMaterials]?.trim() || '',
      weight:      iWeight != null ? row[iWeight]?.trim() : '',
      image:       iPhoto1 >= 0 ? (row[iPhoto1]?.trim() || null) : null,
    });
  }

  return products;
}
