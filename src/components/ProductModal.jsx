import { useEffect, useRef, useState } from 'react';
import ProductVisual from './ProductVisual.jsx';
import { availability, formatPrice, etsySearchUrl } from '../lib/products.js';
import { INSTAGRAM_DM_URL, WHATSAPP_NUMBER, whatsappUrl } from '../config.js';
import { useIsSaved } from '../hooks/useSaved.js';

export default function ProductModal({ product, products = [], onSelect, onClose }) {
  const {
    key, name, category, price, priceMax, stock, images, gradient, handmade,
    description, materials, size, weight, variants, variantLabel, onEtsy,
  } = product;

  const related = (() => {
    const others = products.filter(p => p.key !== key);
    const sameCategory = others.filter(p => p.category === category);
    const inStockFirst = [...sameCategory].sort((a, b) => (a.stock === 0 ? 1 : 0) - (b.stock === 0 ? 1 : 0));
    const picks = inStockFirst.slice(0, 4);
    if (picks.length < 4) {
      for (const p of others) {
        if (picks.length >= 4) break;
        if (!picks.includes(p)) picks.push(p);
      }
    }
    return picks;
  })();

  const [variant, setVariant] = useState(() =>
    variants.length ? variants.find(v => v.stock !== 0) || variants[0] : null
  );
  const [saved, toggleSaved] = useIsSaved(key);
  const gallery = [...new Set([variant?.image, ...images].filter(Boolean))];
  const [active, setActive] = useState(gallery[0] || null);
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  const pickVariant = v => {
    setVariant(v);
    if (v.image) setActive(v.image);
  };

  const shownPrice = variant ? formatPrice(variant.price) : formatPrice(price, priceMax);
  const shownStock = variant ? variant.stock : stock;
  const status = availability(shownStock);
  const buyOnEtsy = variant ? variant.etsy || onEtsy : onEtsy;
  const soldOut = shownStock === 0;
  const interest = `Hey AFTER OWL 🦉 I'm interested in: ${name}${variant ? ` (${variant.name})` : ''}`;
  const dmText = encodeURIComponent(interest);
  const askUrl = WHATSAPP_NUMBER ? whatsappUrl(interest) : `${INSTAGRAM_DM_URL}?text=${dmText}`;
  const askLabel = WHATSAPP_NUMBER ? 'WhatsApp' : 'Instagram';

  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        <div className="modal-media">
          <div className="modal-main">
            <ProductVisual key={active || 'none'} src={active} alt={name} gradient={variant?.gradient || gradient} eager />
          </div>
          {gallery.length > 1 && (
            <div className="thumbs">
              {gallery.map(src => (
                <button key={src} className={`thumb ${src === active ? 'is-active' : ''}`} onClick={() => setActive(src)} aria-label="Show photo">
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-body">
          <p className="modal-eyebrow">
            {category}
            {handmade && !/handmade/i.test(category) && <span className="badge badge-handmade">Handmade</span>}
          </p>
          <div className="modal-title-row">
            <h2 id="modal-title" className="modal-title">{name}</h2>
            <button
              className={`save-btn ${saved ? 'is-saved' : ''}`}
              onClick={toggleSaved}
              aria-pressed={saved}
              aria-label={saved ? `Remove ${name} from saved` : `Save ${name} for later`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-10-9.2C.6 8 2 4.5 5.4 4c2-.3 3.8.6 5 2.2A5.6 5.6 0 0 1 15.6 4c3.4.5 4.8 4 3.4 7.3-2.5 4.6-10 9.2-10 9.2Z" /></svg>
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          <div className="modal-price">
            <span className="price price-lg">{shownPrice}</span>
            <span className={`stock stock-${status.tone}`}>{status.label}</span>
          </div>

          {variants.length > 0 && (
            <div className="variants">
              <p className="variants-label">{variantLabel || 'Option'}: <strong>{variant?.name}</strong></p>
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
                    {v.stock === 0 && <span className="variant-note">sold out</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="modal-actions">
            {buyOnEtsy && !soldOut ? (
              <>
                <a className="btn btn-primary" href={etsySearchUrl(name)} target="_blank" rel="noreferrer">Buy on Etsy ↗</a>
                <a className="btn btn-ghost" href={askUrl} target="_blank" rel="noreferrer">Ask on {askLabel}</a>
              </>
            ) : (
              <a className="btn btn-primary" href={askUrl} target="_blank" rel="noreferrer">
                {soldOut ? `Ask about a restock on ${askLabel}` : `Order via ${askLabel}`}
              </a>
            )}
          </div>
          {!buyOnEtsy && !soldOut && (
            <p className="modal-hint">Not on Etsy yet. Message us or grab it at one of our pop-ups.</p>
          )}

          {description && <div className="modal-desc">{description}</div>}

          {(materials || size || weight) && (
            <dl className="specs">
              {materials && <><dt>Materials</dt><dd>{materials}</dd></>}
              {size && <><dt>Size</dt><dd>{size}</dd></>}
              {weight && <><dt>Weight</dt><dd>{weight}</dd></>}
            </dl>
          )}

          {related.length > 0 && (
            <div className="related">
              <h3 className="related-title">You might also like</h3>
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
      </div>
    </div>
  );
}
