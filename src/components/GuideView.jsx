import { useState } from 'react';
import { guideSections } from '../data/guides.js';
import { pick } from '../data/content.js';
import { addToBag } from '../lib/bag.js';
import { formatPrice } from '../lib/products.js';
import { useI18n } from '../i18n/index.jsx';
import ProductCard from './ProductCard.jsx';

/** One guide, as its own page at /guide/<key>. */
export default function GuideView({ guide, products, bagItems, onSelect, onBack }) {
  const { t, lang } = useI18n();
  const [added, setAdded] = useState(false);

  const sections = guideSections(guide, products);
  const inStock = sections.flatMap(s => s.items).filter(p => p.stock !== 0);
  const total = inStock.reduce((sum, p) => sum + (p.price || 0), 0);

  const addAll = () => {
    inStock.forEach(p => addToBag(p.key));
    setAdded(true);
  };

  return (
    <article className="guide-view">
      <div className="container">
        <button className="guide-back" onClick={onBack}>← {t('guides.back')}</button>

        <header className="guide-head">
          <p className="eyebrow"><span aria-hidden="true">{guide.icon}</span> {t('guides.eyebrow')}</p>
          <h1>{pick(guide.title, lang)}</h1>
          <p className="guide-lead">{pick(guide.intro, lang)}</p>

          {inStock.length > 0 && (
            <div className="guide-actions">
              <button className="btn btn-primary" onClick={addAll} disabled={added}>
                {added ? t('guides.added') : t('guides.addAll')}
              </button>
              <span className="guide-total">{inStock.length} · {formatPrice(total)}</span>
            </div>
          )}
        </header>

        {sections.length === 0 && <p className="guide-empty">{t('guides.empty')}</p>}

        {sections.map((section, i) => (
          <section key={i} className="guide-section">
            <h2 className="guide-section-title">{pick(section.title, lang)}</h2>
            <p className="guide-section-note">{pick(section.note, lang)}</p>
            <div className="grid">
              {section.items.map(p => (
                <ProductCard key={p.key} product={p} bagItems={bagItems} onClick={() => onSelect(p)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
