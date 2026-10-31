import { useEffect, useMemo, useRef, useState } from 'react';
import ProductVisual from './ProductVisual.jsx';
import { formatPrice } from '../lib/products.js';
import { bagLines, bagMessage, bagTotal, clearBag, removeFromBag, setQty, addToBag, bagShareUrl } from '../lib/bag.js';
import { INSTAGRAM_DM_URL, WHATSAPP_NUMBER, whatsappUrl } from '../config.js';
import { useI18n } from '../i18n/index.jsx';
import { lockScroll } from '../lib/scrollLock.js';
import Icon from './Icon.jsx';
import { pick } from '../data/content.js';

/**
 * The bag turns "I like these five things" into one message the owl can answer.
 * It is deliberately not a checkout: no payment, no account, no data leaves the
 * device until the visitor presses send.
 */
export default function BagDrawer({ open, items, products, onClose, onSelect }) {
  const { t, lang } = useI18n();
  const panelRef = useRef(null);
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const lines = useMemo(() => bagLines(items, products), [items, products]);
  const { total, complete } = useMemo(() => bagTotal(lines), [lines]);

  // "Goes well with": in-stock pieces from the same categories, not already in the bag
  const suggestions = useMemo(() => {
    if (!lines.length) return [];
    const inBag = new Set(lines.map(l => l.key));
    const cats = new Set(lines.map(l => l.product.category));
    return products
      .filter(p => !inBag.has(p.key) && p.stock !== 0 && cats.has(p.category))
      .slice(0, 3);
  }, [lines, products]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const unlock = lockScroll();
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [open, onClose]);

  if (!open) return null;

  const channel = WHATSAPP_NUMBER ? 'WhatsApp' : 'Instagram';
  const message = bagMessage(lines, {
    intro: t('bag.intro'),
    outro: note.trim() ? `${note.trim()}\n\n${t('bag.outro')}` : t('bag.outro'),
    total,
    complete,
  });
  const sendUrl = WHATSAPP_NUMBER
    ? whatsappUrl(message)
    : `${INSTAGRAM_DM_URL}?text=${encodeURIComponent(message)}`;

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard blocked: the send button still works */ }
  };

  const shareBag = async () => {
    const url = bagShareUrl(items);
    try {
      if (navigator.share) await navigator.share({ title: t('bag.title'), text: t('bag.shareText'), url });
      else {
        await navigator.clipboard.writeText(url);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2200);
      }
    } catch { /* share sheet closed */ }
  };

  return (
    <div className="drawer-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="drawer-head">
          <h2 id="bag-title">{t('bag.title')}</h2>
          <button className="drawer-close" onClick={onClose} aria-label={t('product.close')}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        {!lines.length ? (
          <div className="drawer-empty">
            <p className="drawer-empty-title">{t('bag.empty')}</p>
            <p>{t('bag.emptyText')}</p>
            <button className="btn btn-ghost" onClick={onClose}>{t('bag.emptyCta')}</button>
          </div>
        ) : (
          <>
            <ul className="drawer-list">
              {lines.map(line => (
                <li key={`${line.key}-${line.variant?.name || ''}`} className="drawer-line">
                  {line.bundle ? (
                    <span className="drawer-thumb drawer-thumb-kit" aria-hidden="true">
                      <ProductVisual src={line.product.image} alt="" gradient={line.product.gradient} />
                      <span className="drawer-kit-badge">{line.bundle.icon}</span>
                    </span>
                  ) : (
                  <button
                    className="drawer-thumb"
                    onClick={() => onSelect(line.product)}
                    aria-label={line.product.name}
                  >
                    <ProductVisual src={line.variant?.image || line.product.image} alt="" gradient={line.product.gradient} />
                  </button>
                  )}
                  <div className="drawer-line-body">
                    <p className="drawer-line-name">{line.bundle ? pick(line.bundle.title, lang) : line.product.name}</p>
                    {line.variant && <p className="drawer-line-variant">{line.variant.name}</p>}
                    {line.bundle && (
                      <p className="drawer-line-variant">{line.bundle.items.map(p => p.name).join(' · ')}</p>
                    )}
                    <p className="drawer-line-price">{formatPrice(line.price)}</p>
                  </div>
                  <div className="drawer-line-side">
                    <div className="qty">
                      <button onClick={() => setQty(line.key, line.variant?.name || null, line.qty - 1)} aria-label={t('bag.less')}>−</button>
                      <span aria-live="polite">{line.qty}</span>
                      <button onClick={() => setQty(line.key, line.variant?.name || null, line.qty + 1)} aria-label={t('bag.more')}>+</button>
                    </div>
                    <button
                      className="drawer-remove"
                      onClick={() => removeFromBag(line.key, line.variant?.name || null)}
                      aria-label={t('bag.remove', { name: line.bundle ? pick(line.bundle.title, lang) : line.product.name })}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {suggestions.length > 0 && (
              <div className="drawer-cross">
                <p className="drawer-cross-title">{t('bag.crossSell')}</p>
                <ul>
                  {suggestions.map(p => (
                    <li key={p.key}>
                      <button onClick={() => onSelect(p)}>
                        <span className="drawer-cross-visual">
                          <ProductVisual src={p.image} alt="" gradient={p.gradient} />
                        </span>
                        <span className="drawer-cross-name">{p.name}</span>
                        <span className="drawer-cross-price">{formatPrice(p.price, p.priceMax)}</span>
                      </button>
                      <button
                        className="drawer-cross-add"
                        onClick={() => addToBag(p.key)}
                        aria-label={t('card.add', { name: p.name })}
                      >+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <footer className="drawer-foot">
              <div className="drawer-total">
                <span>{t('bag.total')}</span>
                <strong>{complete ? formatPrice(total) : '—'}</strong>
              </div>
              <p className="drawer-note">{t('bag.totalNote')}</p>
              <label className="drawer-notefield">
                <span>{t('bag.noteLabel')}</span>
                <textarea
                  rows={2}
                  maxLength={300}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder={t('bag.notePlaceholder')}
                />
              </label>
              <a className="btn btn-primary drawer-send" href={sendUrl} target="_blank" rel="noreferrer">
                {t('bag.send', { channel })}
              </a>
              <button className="btn btn-ghost drawer-copy" onClick={copyMessage}>
                {copied ? t('bag.copied') : t('bag.copy')}
              </button>
              <p className="drawer-note">{t('bag.note', { channel })}</p>
              <button className="drawer-share" onClick={shareBag}>
                <Icon name="crew" /> {linkCopied ? t('bag.shareDone') : t('bag.share')}
              </button>
              <button className="drawer-clear" onClick={clearBag}>{t('bag.clear')}</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
