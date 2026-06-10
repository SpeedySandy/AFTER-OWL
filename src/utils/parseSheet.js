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

  const iTitle       = idx('title') ?? idx('product name') ?? idx('name') ?? 0;
  const iDesc        = idx('description') ?? idx('notes') ?? 1;
  const iSection     = idx('section') ?? idx('category') ?? idx('product group') ?? idx('group') ?? 11;
  const iPrice       = idx('selling price') ?? idx('price') ?? 12;
  const iQty         = idx('stock qty') ?? idx('stock') ?? idx('quantity') ?? 13;
  const iSku         = idx('sku') ?? 14;
  const iTags        = idx('tags') ?? null;
  const iMaterials   = idx('materials') ?? null;
  const iPhoto1      = idx('photo 1') ?? idx('photo1') ?? idx('image 1') ?? idx('image') ?? idx('photo');
  const iWeight      = idx('weight') ?? null;

  // Only treat a URL as a usable image if it points to an actual image file or Google Drive
  const isImageUrl = url => url && (
    url.includes('drive.google.com') ||
    url.includes('googleusercontent.com') ||
    /\.(jpg|jpeg|png|webp|gif|avif|svg)(\?|$)/i.test(url)
  );

  const products = [];
  let currentCategory = 'Other';

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRow(lines[i]);
    const name = row[iTitle]?.trim();
    const groupCell = iSection != null ? row[iSection]?.trim() : '';

    // Section header rows (e.g. "Handmade", "Tubes") have a group but no product name
    if (!name) {
      if (groupCell) currentCategory = groupCell;
      continue;
    }

    const priceRaw = row[iPrice]?.replace(/[^0-9.]/g, '');
    const qtyRaw   = row[iQty]?.replace(/[^0-9]/g, '');
    const photoRaw = iPhoto1 != null ? row[iPhoto1]?.trim() : null;

    products.push({
      id: i,
      name,
      sku:         row[iSku]?.trim()    || '',
      category:    groupCell || currentCategory,
      price:       parseFloat(priceRaw) || 0,
      stock:       parseInt(qtyRaw)     || 0,
      description: row[iDesc]?.trim()   || '',
      tags:        iTags != null ? (row[iTags] || '').split(',').map(t => t.trim()).filter(Boolean) : [],
      materials:   iMaterials != null ? (row[iMaterials]?.trim() || '') : '',
      weight:      iWeight != null ? row[iWeight]?.trim() : '',
      image:       isImageUrl(photoRaw) ? photoRaw : null,
    });
  }

  return products;
}
