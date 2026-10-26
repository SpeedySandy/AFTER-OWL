import { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { useT } from '../i18n/index.jsx';
import { INSTAGRAM_DM_URL, WHATSAPP_NUMBER, whatsappUrl } from '../config.js';

const PAGE = 24;

export default function ProductGrid({ products, onSelect, onReset, bagItems, search = '', suggestions = [] }) {
  const t = useT();
  const [shown, setShown] = useState(PAGE);

  // A new filter or search starts from the top of the list again.
  useEffect(() => setShown(PAGE), [products]);

  if (!products.length) {
    const q = search.trim();
    const channel = WHATSAPP_NUMBER ? 'WhatsApp' : 'Instagram';
    const text = t('empty.askText', { q });
    const askUrl = WHATSAPP_NUMBER ? whatsappUrl(text) : `${INSTAGRAM_DM_URL}?text=${encodeURIComponent(text)}`;
    return (
      <div className="empty">
        <p className="empty-title">{t('empty.title')}</p>
        <p>{q ? t('empty.textSearch', { q }) : t('empty.text')}</p>
        <div className="empty-actions">
          {q && <a className="btn btn-primary" href={askUrl} target="_blank" rel="noreferrer">{t('empty.ask', { channel })}</a>}
          <button className="btn btn-ghost" onClick={onReset}>{t('empty.cta')}</button>
        </div>
        {suggestions.length > 0 && (
          <div className="empty-picks">
            <p className="empty-picks-title">{t('empty.picks')}</p>
            <div className="grid grid-compact">
              {suggestions.map(p => (
                <ProductCard key={p.key} product={p} bagItems={bagItems} onClick={() => onSelect(p)} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const visible = products.slice(0, shown);
  const rest = products.length - visible.length;

  return (
    <>
      <div className="grid">
        {visible.map(p => (
          <ProductCard key={p.key} product={p} bagItems={bagItems} onClick={() => onSelect(p)} />
        ))}
      </div>
      {rest > 0 && (
        <div className="grid-more">
          <p className="grid-more-count">{t('grid.showing', { shown: visible.length, total: products.length })}</p>
          <button className="btn btn-ghost" onClick={() => setShown(n => n + PAGE)}>
            {t('grid.more', { count: Math.min(PAGE, rest) })}
          </button>
        </div>
      )}
    </>
  );
}
