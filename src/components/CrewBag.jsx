import { useEffect, useMemo, useState } from 'react';
import { bagFromParam, bagLines, mergeIntoBag } from '../lib/bag.js';
import { useI18n } from '../i18n/index.jsx';
import Icon from './Icon.jsx';

/** Opened a friend's bag link? Offer to drop their picks into your own bag. */
export default function CrewBag({ products, onOpenBag }) {
  const { t } = useI18n();
  const [shared, setShared] = useState(() => {
    // Read the raw value: URLSearchParams would decode the escaped separators too early.
    try { return bagFromParam((window.location.search.match(/[?&]bag=([^&#]*)/) || [])[1]); }
    catch { return []; }
  });

  // Clean the address bar so a reload doesn't ask again.
  useEffect(() => {
    if (!shared.length) return;
    const params = new URLSearchParams(window.location.search);
    params.delete('bag');
    const qs = params.toString();
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const lines = useMemo(() => bagLines(shared, products), [shared, products]);
  if (!lines.length) return null;
  const count = lines.reduce((n, l) => n + l.qty, 0);

  const accept = () => {
    mergeIntoBag(lines.map(({ key, variant, qty }) => ({ key, variant: variant?.name || null, qty })));
    setShared([]);
    onOpenBag();
  };

  return (
    <div className="crew-bag" role="dialog" aria-labelledby="crew-bag-title">
      <p id="crew-bag-title" className="crew-bag-title"><Icon name="crew" /> {t('crew.title', { count })}</p>
      <ul className="crew-bag-list">
        {lines.slice(0, 4).map(l => (
          <li key={`${l.key}-${l.variant?.name || ''}`}>{l.qty}× {l.product.name}{l.variant ? ` (${l.variant.name})` : ''}</li>
        ))}
        {lines.length > 4 && <li>…</li>}
      </ul>
      <div className="crew-bag-actions">
        <button className="btn btn-primary" onClick={accept}>{t('crew.add')}</button>
        <button className="btn btn-ghost" onClick={() => setShared([])}>{t('crew.dismiss')}</button>
      </div>
    </div>
  );
}
