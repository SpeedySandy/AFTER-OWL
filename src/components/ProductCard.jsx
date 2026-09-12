import ProductVisual from './ProductVisual.jsx';
import { availability, formatPrice } from '../lib/products.js';
import { useIsSaved } from '../hooks/useSaved.js';

export default function ProductCard({ product, onClick }) {
  const { key, name, category, price, priceMax, stock, image, gradient, handmade, variants, variantLabel, images } = product;
  const status = availability(stock);
  const [saved, toggleSaved] = useIsSaved(key);

  return (
    <button className={`card ${stock === 0 ? 'is-soldout' : ''}`} onClick={onClick} aria-label={`${name}, ${formatPrice(price, priceMax)}, ${status.label}`}>
      <div className="card-media">
        <ProductVisual src={image} alt={name} gradient={gradient} />
        <div className="card-badges">
          {handmade && <span className="badge badge-handmade">Handmade</span>}
          {stock === 0 && <span className="badge badge-out">Sold out</span>}
        </div>
        <span
          className={`card-save ${saved ? 'is-saved' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={saved ? `Remove ${name} from saved` : `Save ${name} for later`}
          aria-pressed={saved}
          onClick={e => { e.stopPropagation(); toggleSaved(); }}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggleSaved(); } }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-10-9.2C.6 8 2 4.5 5.4 4c2-.3 3.8.6 5 2.2A5.6 5.6 0 0 1 15.6 4c3.4.5 4.8 4 3.4 7.3-2.5 4.6-10 9.2-10 9.2Z" /></svg>
        </span>
        {images?.length > 1 && <span className="card-photos" aria-hidden="true">{images.length} photos</span>}
      </div>
      <div className="card-body">
        <p className="card-category">
          {category}
          {variants.length > 1 && <> · {variants.length} {(variantLabel || 'option').toLowerCase()}s</>}
        </p>
        <h3 className="card-name">{name}</h3>
        <div className="card-foot">
          <span className="price">{formatPrice(price, priceMax)}</span>
          {stock !== 0 && <span className={`stock stock-${status.tone}`}>{status.label}</span>}
        </div>
      </div>
    </button>
  );
}
