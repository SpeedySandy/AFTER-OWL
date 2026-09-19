import ProductVisual from './ProductVisual.jsx';
import { formatPrice } from '../lib/products.js';
import { clearRecent } from '../lib/recent.js';
import { useI18n } from '../i18n/index.jsx';

/** The piece someone almost bought is the one they come back for. */
export default function RecentlyViewed({ keys, products, onSelect }) {
  const { t } = useI18n();
  const byKey = new Map(products.map(p => [p.key, p]));
  const items = keys.map(k => byKey.get(k)).filter(Boolean);
  if (items.length < 2) return null;

  return (
    <section className="recent" aria-labelledby="recent-title">
      <div className="container">
        <div className="recent-head">
          <h2 id="recent-title" className="recent-title">{t('recent.title')}</h2>
          <button className="recent-clear" onClick={clearRecent}>{t('recent.clear')}</button>
        </div>
        <ul className="recent-list">
          {items.map(p => (
            <li key={p.key}>
              <button onClick={() => onSelect(p)}>
                <span className="recent-visual">
                  <ProductVisual src={p.image} alt="" gradient={p.gradient} />
                </span>
                <span className="recent-name">{p.name}</span>
                <span className="recent-price">{formatPrice(p.price, p.priceMax)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
