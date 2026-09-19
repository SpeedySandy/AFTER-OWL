import ProductVisual from './ProductVisual.jsx';
import { availability, formatPrice, isLowStock } from '../lib/products.js';
import { useIsSaved } from '../hooks/useSaved.js';
import { addToBag, inBag } from '../lib/bag.js';
import { productPath } from '../lib/router.js';
import { useI18n } from '../i18n/index.jsx';

/**
 * The card used to be one big <button> with a <span role="button"> inside it —
 * invalid nesting that screen readers and keyboards both trip over. It is now an
 * <article> with a real link (the whole card is clickable via ::after) and the
 * save / add-to-bag controls as genuine sibling buttons above it.
 */
export default function ProductCard({ product, onClick, bagItems = [] }) {
  const { t } = useI18n();
  const {
    key, name, category, price, priceMax, stock, image, gradient,
    handmade, limited, isNew, variants, variantLabel, images,
  } = product;

  const status = availability(stock);
  const [saved, toggleSaved] = useIsSaved(key);
  const added = inBag(key, bagItems);
  const hasVariants = variants.length > 1;

  return (
    <article className={`card ${stock === 0 ? 'is-soldout' : ''}`}>
      <div className="card-media">
        <ProductVisual src={image} alt={name} gradient={gradient} />

        <div className="card-badges">
          {isNew && <span className="badge badge-new">✦ {t('card.new')}</span>}
          {limited ? (
            <span className="badge badge-limited">💎 {t('card.limited')}</span>
          ) : (
            handmade && <span className="badge badge-handmade">{t('card.handmade')}</span>
          )}
          {stock === 0 && <span className="badge badge-out">{t('card.soldOut')}</span>}
          {isLowStock(stock) && (
            <span className="badge badge-low">{t(stock === 1 ? 'card.lastOne' : 'card.onlyLeft', { count: stock })}</span>
          )}
        </div>

        <div className="card-tools">
          <button
            type="button"
            className={`card-tool card-save ${saved ? 'is-saved' : ''}`}
            aria-label={saved ? t('card.unsave', { name }) : t('card.save', { name })}
            aria-pressed={saved}
            onClick={toggleSaved}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-10-9.2C.6 8 2 4.5 5.4 4c2-.3 3.8.6 5 2.2A5.6 5.6 0 0 1 15.6 4c3.4.5 4.8 4 3.4 7.3-2.5 4.6-10 9.2-10 9.2Z" /></svg>
          </button>

          {stock !== 0 && (
            <button
              type="button"
              className={`card-tool card-add ${added ? 'is-added' : ''}`}
              aria-label={t('card.add', { name })}
              onClick={() => (hasVariants ? onClick() : addToBag(key))}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {added
                  ? <path d="m5 13 4 4 10-10" />
                  : <><path d="M12 6v12" /><path d="M6 12h12" /></>}
              </svg>
            </button>
          )}
        </div>

        {images?.length > 1 && <span className="card-photos" aria-hidden="true">{images.length} {t('card.photos')}</span>}
      </div>

      <div className="card-body">
        <p className="card-category">
          {category}
          {hasVariants && <> · {variants.length} {t(variants.length === 1 ? 'card.option' : 'card.options').toLowerCase()}</>}
        </p>
        <h3 className="card-name">
          <a
            href={productPath(key)}
            className="card-link"
            onClick={e => { if (!e.metaKey && !e.ctrlKey && e.button === 0) { e.preventDefault(); onClick(); } }}
          >
            {name}
          </a>
        </h3>
        <div className="card-foot">
          <span className="price">{formatPrice(price, priceMax)}</span>
          {stock !== 0 && <span className={`stock stock-${status.tone}`}>{t(status.key, { count: status.count })}</span>}
        </div>
      </div>
    </article>
  );
}
