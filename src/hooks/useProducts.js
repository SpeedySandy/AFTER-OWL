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
          // Merge sheet data with fallback gradients for products that match by SKU
          const enriched = parsed.map(p => {
            const fallback = FALLBACK_PRODUCTS.find(f => f.sku === p.sku);
            return { ...p, gradient: fallback?.gradient || null, handmade: fallback?.handmade || false };
          });
          setProducts(enriched);
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
