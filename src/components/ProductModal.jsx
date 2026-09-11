import { useEffect, useRef, useState } from 'react';
import ProductVisual from './ProductVisual.jsx';
import { availability, formatPrice, etsySearchUrl } from '../lib/products.js';
import { INSTAGRAM_DM_URL } from '../config.js';

export default function ProductModal({ product, onClose }) {
  const {
    name, category, price, priceMax, stock, images, gradient, handmade,
    description, materials, size, weight, variants, variantLabel, onEtsy,
  } = product;

  const [variant, setVariant] = useState(() =>
    variants.length ? variants.find(v => v.stock !== 0) || variants[0] : null
  );
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
  const dmText = encodeURIComponent(`Hey AFTER OWL 🦉 I'm interested in: ${name}${variant ? ` (${variant.name})` : ''}`);

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
          <h2 id="modal-title" className="modal-title">{name}</h2>

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
                <a className="btn btn-ghost" href={`${INSTAGRAM_DM_URL}?text=${dmText}`} target="_blank" rel="noreferrer">Ask on Instagram</a>
              </>
            ) : (
              <a className="btn btn-primary" href={`${INSTAGRAM_DM_URL}?text=${dmText}`} target="_blank" rel="noreferrer">
                {soldOut ? 'DM us about a restock' : 'Order via Instagram DM'}
              </a>
            )}
          </div>
          {!buyOnEtsy && !soldOut && (
            <p className="modal-hint">Not on Etsy yet. Send us a DM or grab it at one of our pop-ups.</p>
          )}

          {description && <div className="modal-desc">{description}</div>}

          {(materials || size || weight) && (
            <dl className="specs">
              {materials && <><dt>Materials</dt><dd>{materials}</dd></>}
              {size && <><dt>Size</dt><dd>{size}</dd></>}
              {weight && <><dt>Weight</dt><dd>{weight}</dd></>}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
