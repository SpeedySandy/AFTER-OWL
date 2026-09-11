import { useCallback, useEffect, useRef, useState } from 'react';
import catalog from '../data/catalog.json';
import snapshot from '../data/sheet-snapshot.json';
import manifest from '../data/image-manifest.json';
import { SHEET_TABS, REFRESH_INTERVAL, sheetCsvUrl } from '../config.js';
import { parseInventoryTab } from '../lib/sheet.js';
import { buildProducts } from '../lib/products.js';

const BASE = import.meta.env.BASE_URL;
const build = rows => buildProducts(rows, catalog, manifest, BASE);

async function fetchLiveRows() {
  const tabs = await Promise.all(
    SHEET_TABS.map(async tab => {
      const res = await fetch(sheetCsvUrl(tab.name), { cache: 'no-store' });
      if (!res.ok) throw new Error(`Sheet HTTP ${res.status}`);
      return parseInventoryTab(await res.text(), tab.defaultGroup);
    })
  );
  const rows = tabs.flat();
  if (rows.length < 10) throw new Error('Sheet looks empty');
  return rows;
}

/**
 * Products come from the bundled snapshot instantly, then get replaced by the
 * live Google Sheet data. Open pages re-check the sheet every few minutes.
 */
export function useProducts() {
  const [products, setProducts] = useState(() => build(snapshot));
  const [status, setStatus] = useState({ source: 'snapshot', updatedAt: null, error: null });
  const lastFetch = useRef(0);

  const refresh = useCallback(async () => {
    lastFetch.current = Date.now();
    try {
      const rows = await fetchLiveRows();
      setProducts(build(rows));
      setStatus({ source: 'live', updatedAt: new Date(), error: null });
    } catch (err) {
      setStatus(s => ({ ...s, error: err.message }));
    }
  }, []);

  useEffect(() => {
    refresh();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') refresh();
    }, REFRESH_INTERVAL);
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetch.current > 60_000) refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

  return { products, ...status };
}
