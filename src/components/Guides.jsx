import { GUIDES, guideItems } from '../data/guides.js';
import { pick } from '../data/content.js';
import { useI18n } from '../i18n/index.jsx';
import ProductVisual from './ProductVisual.jsx';

/** The four guide cards. Each cover photo comes from a real piece in that guide. */
export default function Guides({ products, onOpen }) {
  const { t, lang } = useI18n();
  const used = new Set();

  const cards = GUIDES.map(guide => {
    const items = guideItems(guide, products);
    const cover =
      items.find(p => p.image && p.stock !== 0 && !used.has(p.image)) ||
      items.find(p => p.image && !used.has(p.image)) ||
      items.find(p => p.image);
    if (cover) used.add(cover.image);
    return { guide, items, cover };
  }).filter(c => c.items.length);

  if (!cards.length) return null;

  return (
    <section id="guides" className="guides" aria-labelledby="guides-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t('guides.eyebrow')}</p>
          <h2 id="guides-title">{t('guides.title')}</h2>
          <p className="section-sub">{t('guides.sub')}</p>
        </div>

        <ul className="guide-cards">
          {cards.map(({ guide, items, cover }) => (
            <li key={guide.key}>
              <button className="guide-card" onClick={() => onOpen(guide.key)}>
                <span className="guide-card-media">
                  {cover && <ProductVisual src={cover.image} alt="" gradient={cover.gradient} />}
                  <span className="guide-card-shade" aria-hidden="true" />
                  <span className="guide-card-icon" aria-hidden="true">{guide.icon}</span>
                </span>
                <span className="guide-card-body">
                  <span className="guide-card-title">{pick(guide.title, lang)}</span>
                  <span className="guide-card-intro">{pick(guide.intro, lang)}</span>
                  <span className="guide-card-meta">{t('guides.items', { count: items.length })} →</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
