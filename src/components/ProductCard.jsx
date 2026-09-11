import ProductVisual from './ProductVisual.jsx';
import { availability, formatPrice } from '../lib/products.js';

export default function ProductCard({ product, onClick }) {
  const { name, category, price, priceMax, stock, image, gradient, handmade, variants, variantLabel, images } = product;
  const status = availability(stock);

  return (
    <button className={`card ${stock === 0 ? 'is-soldout' : ''}`} onClick={onClick} aria-label={`${name}, ${formatPrice(price, priceMax)}, ${status.label}`}>
      <div className="card-media">
        <ProductVisual src={image} alt={name} gradient={gradient} />
        <div className="card-badges">
          {handmade && <span className="badge badge-handmade">Handmade</span>}
          {stock === 0 && <span className="badge badge-out">Sold out</span>}
        </div>
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
