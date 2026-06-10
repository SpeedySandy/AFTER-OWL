import { useState, useEffect } from 'react';
import { FALLBACK_PRODUCTS } from '../data/products.js';
import { parseSheetCSV } from '../utils/parseSheet.js';
import { SHEET_ID } from '../config.js';

export function useProducts() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading]   = useState(!!SHEET_ID);
  const [source,  setSource]    = useState('local');
  const [error,   setError]     = useState(null);

  useEffect(() => {
    if (!SHEET_ID) return;

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(csv => {
        const parsed = parseSheetCSV(csv);
        if (parsed.length > 0) {
          // Normalise name for fuzzy matching when SKU is absent
          const norm = s => s?.toLowerCase().replace(/[—–-]/g, ' ').replace(/\s+/g, ' ').trim() || '';
          const enriched = parsed.map(p => {
            const fallback = FALLBACK_PRODUCTS.find(f => f.sku && f.sku === p.sku)
                          || FALLBACK_PRODUCTS.find(f => norm(f.name) === norm(p.name));
            return {
              ...p,
              gradient: fallback?.gradient || null,
              handmade: fallback?.handmade || false,
              // Sheet image wins only if it's a real image URL; otherwise use Drive thumbnail
              image:    p.image || fallback?.image || null,
              gallery:  fallback?.gallery || null,
            };
          });
          // Keep local-only products (e.g. HALO Mirror) that aren't in the sheet yet
          const sheetSkus = new Set(enriched.map(p => p.sku).filter(Boolean));
          const localOnly = FALLBACK_PRODUCTS.filter(f => !sheetSkus.has(f.sku))
            .map(f => ({ ...f, id: `local-${f.id}` }));
          setProducts([...enriched, ...localOnly]);
          setSource('sheets');
        }
        setError(null);
      })
      .catch(err => {
        // Sheet not public — silently fall back to local data
        setError(err.message);
        setSource('local');
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, source, error };
}
