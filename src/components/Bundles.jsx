import { useState } from 'react';
import { availableBundles, bundleForGuide } from '../data/bundles.js';
import { pick } from '../data/content.js';
import { addToBag } from '../lib/bag.js';
import { formatPrice } from '../lib/products.js';
import { useI18n } from '../i18n/index.jsx';
import ProductVisual from './ProductVisual.jsx';
import Icon from './Icon.jsx';

/** One kit: what's inside, what it would cost one by one, one button. */
export function BundleCard({ bundle, onSelect, onOpenGuide }) {
  const { t, lang } = useI18n();
  const [added, setAdded] = useState(false);

  const add = () => {
    addToBag(bundle.bagKey);
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <article className="bundle-card">
      <header className="bundle-head">
        <span className="bundle-icon" aria-hidden="true"><Icon emoji={bundle.icon} size="lg" /></span>
        <div>
          <h3 className="bundle-title">{pick(bundle.title, lang)}</h3>
          <p className="bundle-count">{t('bundles.pieces', { count: bundle.items.length })}</p>
        </div>
      </header>

      <p className="bundle-blurb">{pick(bundle.blurb, lang)}</p>

      <ul className="bundle-items">
        {bundle.items.map(p => (
          <li key={p.key}>
            <button className="bundle-item" onClick={() => onSelect?.(p)} aria-label={p.name}>
              <span className="bundle-item-visual">
                <ProductVisual src={p.image} alt="" gradient={p.gradient} />
              </span>
              <span className="bundle-item-name">{p.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <footer className="bundle-foot">
        <div className="bundle-price">
          <strong>{formatPrice(bundle.price)}</strong>
          <s aria-label={t('bundles.was', { price: formatPrice(bundle.value) })}>{formatPrice(bundle.value)}</s>
          <span className="bundle-save">{t('bundles.save', { amount: formatPrice(bundle.save) })}</span>
        </div>
        <button className="btn btn-primary" onClick={add}>
          {added ? t('bundles.added') : t('bundles.add')}
        </button>
        {onOpenGuide && (
          <button className="bundle-guide" onClick={() => onOpenGuide(bundle.guide)}>
            {t('bundles.guide')} →
          </button>
        )}
      </footer>
    </article>
  );
}

/** The kits section on the home page. Hidden when no kit is fully in stock. */
export default function Bundles({ products, onSelect, onOpenGuide }) {
  const { t } = useI18n();
  const bundles = availableBundles(products);
  if (!bundles.length) return null;

  return (
    <section id="kits" className="bundles" aria-labelledby="bundles-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t('bundles.eyebrow')}</p>
          <h2 id="bundles-title">{t('bundles.title')}</h2>
          <p className="section-sub">{t('bundles.sub')}</p>
        </div>
        <div className="bundle-grid">
          {bundles.map(b => (
            <BundleCard key={b.key} bundle={b} onSelect={onSelect} onOpenGuide={onOpenGuide} />
          ))}
        </div>
        <p className="bundle-note">{t('bundles.note')}</p>
      </div>
    </section>
  );
}

/** The matching kit at the top of a guide page, if it is in stock. */
export function GuideBundle({ guideKey, products, onSelect }) {
  const bundle = bundleForGuide(guideKey, products);
  if (!bundle) return null;
  return (
    <div className="guide-bundle">
      <BundleCard bundle={bundle} onSelect={onSelect} />
    </div>
  );
}
