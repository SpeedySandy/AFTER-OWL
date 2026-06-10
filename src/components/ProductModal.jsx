import { useEffect, useState } from 'react';

function StockBadge({ stock }) {
  if (stock === 0) return <span className="stock-badge out-stock">Sold Out</span>;
  if (stock <= 2)  return <span className="stock-badge low-stock">Only {stock} left</span>;
  return <span className="stock-badge in-stock">In Stock · {stock} available</span>;
}

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const { name, category, price, stock, image, gradient, handmade,
          description, tags, materials, size, weight, sku, gallery } = product;

  const [activeImage, setActiveImage] = useState(image);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={name}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-inner">
          {/* ── Image column ── */}
          <div className="modal-image-col">
            {activeImage ? (
              <img src={activeImage} alt={name} key={activeImage}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <div
              className="card-gradient"
              style={{ background: gradient || '#1C1308', display: activeImage ? 'none' : 'block', height: '100%' }}
            />
            {gallery?.length > 1 && (
              <div className="modal-gallery">
                {gallery.map(src => (
                  <button
                    key={src}
                    className={`modal-gallery-thumb ${src === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(src)}
                    aria-label="View photo"
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Content column ── */}
          <div className="modal-content">
            <div className="modal-eyebrow">
              <span className="modal-category">{category}</span>
              {handmade && <span className="modal-handmade">✦ Handmade</span>}
            </div>

            <h2 className="modal-title">{name}</h2>

            <div className="modal-price-row">
              <span className="modal-price">{price ? `€${price}` : 'On request'}</span>
              <StockBadge stock={stock} />
            </div>

            <hr className="modal-divider" />

            {description && (
              <p className="modal-description">{description}</p>
            )}

            {(materials || size || weight) && (
              <>
                <hr className="modal-divider" />
                <div className="modal-details">
                  {materials && (
                    <div className="modal-detail">
                      <span className="modal-detail-label">Materials</span>
                      <span className="modal-detail-value">{materials}</span>
                    </div>
                  )}
                  {size && (
                    <div className="modal-detail">
                      <span className="modal-detail-label">Size</span>
                      <span className="modal-detail-value">{size}</span>
                    </div>
                  )}
                  {weight && (
                    <div className="modal-detail">
                      <span className="modal-detail-label">Weight</span>
                      <span className="modal-detail-value">{weight}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {tags?.length > 0 && (
              <>
                <hr className="modal-divider" />
                <div className="modal-tags">
                  {tags.map(t => <span key={t} className="modal-tag">#{t}</span>)}
                </div>
              </>
            )}

            {sku && <div className="modal-sku">SKU: {sku}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
