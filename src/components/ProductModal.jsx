import { useEffect, useMemo, useRef, useState } from 'react';
import ProductVisual from './ProductVisual.jsx';
import SignupForm from './SignupForm.jsx';
import { availability, formatPrice, etsySearchUrl } from '../lib/products.js';
import { INSTAGRAM_DM_URL, WHATSAPP_NUMBER, whatsappUrl } from '../config.js';
import { useIsSaved } from '../hooks/useSaved.js';
import { addToBag, inBag } from '../lib/bag.js';
import { productUrl } from '../lib/router.js';
import { emailEnabled } from '../lib/subscribe.js';
import { lockScroll } from '../lib/scrollLock.js';
import { useI18n } from '../i18n/index.jsx';
import { careNote } from '../data/content.js';

export default function ProductModal({ product, products = [], bagItems = [], onSelect, onClose, onOpenBag }) {
  const { t, lang } = useI18n();
  const {
    key, name, category, price, priceMax, stock, images, gradient, handmade, limited, isNew,
    description, materials, size, weight, variants, variantLabel, onEtsy,
  } = product;

  const related = useMemo(() => {
    const others = products.filter(p => p.key !== key);
    const sameCategory = others.filter(p => p.category === category);
    const inStockFirst = [...sameCategory].sort((a, b) => (a.stock === 0 ? 1 : 0) - (b.stock === 0 ? 1 : 0));
    const picks = inStockFirst.slice(0, 4);
    for (const p of others) {
      if (picks.length >= 4) break;
      if (!picks.includes(p)) picks.push(p);
    }
    return picks;
  }, [products, key, category]);

  const [variant, setVariant] = useState(() =>
    variants.length ? variants.find(v => v.stock !== 0) || variants[0] : null
  );
  const [saved, toggleSaved] = useIsSaved(key);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  const gallery = useMemo(
    () => [...new Set([variant?.image, ...images].filter(Boolean))],
    [variant, images]
  );
  const [active, setActive] = useState(gallery[0] || null);
  const closeRef = useRef(null);
  const touch = useRef(null);

  const step = dir => {
    if (gallery.length < 2) return;
    const i = gallery.indexOf(active);
    setActive(gallery[(i + dir + gallery.length) % gallery.length]);
  };

  useEffect(() => {
    const onKey = e => {
      // the bag drawer sits on top: let it answer Escape first
      if (document.querySelector('.drawer')) return;
      if (e.key === 'Escape') return zoomed ? setZoomed(false) : onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const unlock = lockScroll();
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [onClose, zoomed, active, gallery]);

  const pickVariant = v => {
    setVariant(v);
    if (v.image) setActive(v.image);
  };

  const shownPrice = variant ? formatPrice(variant.price) : formatPrice(price, priceMax);
  const shownStock = variant ? variant.stock : stock;
  const status = availability(shownStock);
  const buyOnEtsy = variant ? variant.etsy || onEtsy : onEtsy;
  const soldOut = shownStock === 0;
  const added = inBag(key, bagItems);

  const channel = WHATSAPP_NUMBER ? 'WhatsApp' : 'Instagram';
  const interest = `Hey AFTER OWL 🦉 I'm interested in: ${name}${variant ? ` (${variant.name})` : ''}`;
  const askUrl = WHATSAPP_NUMBER
    ? whatsappUrl(interest)
    : `${INSTAGRAM_DM_URL}?text=${encodeURIComponent(interest)}`;

  const share = async () => {
    const url = productUrl(key);
    try {
      if (navigator.share) await navigator.share({ title: name, url });
      else await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const add = () => {
    addToBag(key, variant?.name || null);
    onOpenBag?.();
  };

  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label={t('product.close')}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        <div className="modal-media">
          <div
            className={`modal-main ${zoomed ? 'is-zoomed' : ''}`}
            onClick={() => active && setZoomed(z => !z)}
            onTouchStart={e => { touch.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              if (touch.current == null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
            role={active ? 'button' : undefined}
            tabIndex={active ? 0 : undefined}
            aria-label={active ? t('product.zoom') : undefined}
            onKeyDown={e => { if (active && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setZoomed(z => !z); } }}
          >
            <ProductVisual key={active || 'none'} src={active} alt={product.alt || name} gradient={variant?.gradient || gradient} eager />
            {gallery.length > 1 && (
              <>
                <button className="gal-nav gal-prev" onClick={e => { e.stopPropagation(); step(-1); }} aria-label={t('product.prevPhoto')}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
                </button>
                <button className="gal-nav gal-next" onClick={e => { e.stopPropagation(); step(1); }} aria-label={t('product.nextPhoto')}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
                </button>
                <span className="gal-dots" aria-hidden="true">
                  {gallery.map(src => <i key={src} className={src === active ? 'is-active' : ''} />)}
                </span>
              </>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="thumbs">
              {gallery.map(src => (
                <button key={src} className={`thumb ${src === active ? 'is-active' : ''}`} onClick={() => setActive(src)} aria-label={t('product.showPhoto')}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-body">
          <p className="modal-eyebrow">
            {category}
            {isNew && <span className="badge badge-new">✦ {t('card.new')}</span>}
            {limited ? (
              <span className="badge badge-limited">💎 {t('card.limited')}</span>
            ) : (
              handmade && !/handmade/i.test(category) && <span className="badge badge-handmade">{t('card.handmade')}</span>
            )}
          </p>
          {limited && <p className="modal-limited-note">{t('product.limitedNote')}</p>}

          <div className="modal-title-row">
            <h2 id="modal-title" className="modal-title">{name}</h2>
            <div className="modal-title-tools">
              <button className="icon-btn" onClick={share} aria-label={t('product.share')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v13" /><path d="m7 8 5-5 5 5" /><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" /></svg>
              </button>
              <button
                className={`save-btn ${saved ? 'is-saved' : ''}`}
                onClick={toggleSaved}
                aria-pressed={saved}
                aria-label={saved ? t('card.unsave', { name }) : t('card.save', { name })}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-10-9.2C.6 8 2 4.5 5.4 4c2-.3 3.8.6 5 2.2A5.6 5.6 0 0 1 15.6 4c3.4.5 4.8 4 3.4 7.3-2.5 4.6-10 9.2-10 9.2Z" /></svg>
                {saved ? t('product.saved') : t('product.save')}
              </button>
            </div>
          </div>
          {copied && <p className="modal-copied" role="status">{t('product.shareDone')}</p>}

          <div className="modal-price">
            <span className="price price-lg">{shownPrice}</span>
            <span className={`stock stock-${status.tone}`}>{t(status.key, { count: status.count })}</span>
          </div>

          {variants.length > 0 && (
            <div className="variants">
              <p className="variants-label">{variantLabel || t('card.option')}: <strong>{variant?.name}</strong></p>
              <div className="variants-list">
                {variants.map(v => (
                  <button
                    key={v.name}
                    className={`variant ${v === variant ? 'is-active' : ''} ${v.stock === 0 ? 'is-soldout' : ''}`}
                    onClick={() => pickVariant(v)}
                    aria-pressed={v === variant}
                  >
                    {v.gradient && <span className="swatch" style={{ background: v.gradient }} />}
                    {v.name}
                    {v.stock === 0 && <span className="variant-note">{t('card.soldOut').toLowerCase()}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="modal-actions">
            {!soldOut && (
              <button className={`btn btn-primary ${added ? 'is-added' : ''}`} onClick={add}>
                {added ? t('product.inBag') : t('product.addToBag')}
              </button>
            )}
            {buyOnEtsy && !soldOut ? (
              <a className="btn btn-ghost" href={etsySearchUrl(name)} target="_blank" rel="noreferrer">{t('product.buyEtsy')} ↗</a>
            ) : (
              <a className="btn btn-ghost" href={askUrl} target="_blank" rel="noreferrer">
                {soldOut ? t('product.askRestock', { channel }) : t('product.orderVia', { channel })}
              </a>
            )}
          </div>
          {!buyOnEtsy && !soldOut && <p className="modal-hint">{t('product.notOnEtsy')}</p>}

          {soldOut && emailEnabled() && (
            <div className="notify">
              <p className="notify-title">{t('product.notifyTitle')}</p>
              <p className="notify-text">{t('product.notifyText', { name })}</p>
              <SignupForm
                list="restock"
                product={name}
                cta={t('product.notifyCta')}
                done={t('product.notifyDone')}
                compact
              />
            </div>
          )}

          {description && <div className="modal-desc">{description}</div>}

          {(materials || size || weight) && (
            <dl className="specs">
              {materials && <><dt>{t('product.materials')}</dt><dd>{materials}</dd></>}
              {size && <><dt>{t('product.size')}</dt><dd>{size}</dd></>}
              {weight && <><dt>{t('product.weight')}</dt><dd>{weight}</dd></>}
            </dl>
          )}

          {careNote(category, lang) && (
            <div className="care">
              <p className="care-title">{t('care.title')}</p>
              <p className="care-text">{careNote(category, lang)}</p>
            </div>
          )}

          <ul className="reassure">
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
              {t('product.shipping')}
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v5h-5" /></svg>
              {t('product.returns')}
            </li>
          </ul>

          {related.length > 0 && (
            <div className="related">
              <h3 className="related-title">{t('product.related')}</h3>
              <div className="related-list">
                {related.map(p => (
                  <button key={p.key} className="related-item" onClick={() => onSelect?.(p)}>
                    <span className="related-visual">
                      <ProductVisual src={p.image} alt="" gradient={p.gradient} />
                    </span>
                    <span className="related-name">{p.name}</span>
                    <span className="related-price">{formatPrice(p.price, p.priceMax)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile: the price and the buy action stay reachable however far you scroll */}
        <div className="modal-sticky">
          <div className="modal-sticky-price">
            <strong>{shownPrice}</strong>
            <span className={`stock stock-${status.tone}`}>{t(status.key, { count: status.count })}</span>
          </div>
          {soldOut ? (
            <a className="btn btn-ghost" href={askUrl} target="_blank" rel="noreferrer">{t('product.askRestock', { channel })}</a>
          ) : (
            <button className="btn btn-primary" onClick={add}>
              {added ? t('product.inBag') : t('product.addToBag')}
            </button>
          )}
        </div>

        {zoomed && active && (
          <div className="lightbox" onClick={() => setZoomed(false)} role="dialog" aria-label={name}>
            <img src={active} alt={name} />
          </div>
        )}
      </div>
    </div>
  );
}
