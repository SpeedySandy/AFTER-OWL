import { useI18n } from '../i18n/index.jsx';

export default function CollectionTiles({ collections, onSelect }) {
  const { t } = useI18n();
  if (!collections.length) return null;
  const used = new Set();

  return (
    <section className="tiles-section" aria-labelledby="tiles-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t('tiles.eyebrow')}</p>
          <h2 id="tiles-title">{t('tiles.title')}</h2>
        </div>
        <div className="tiles">
          {collections.map(c => {
            // pick a cover photo that no earlier tile uses yet
            const cover = c.items.find(p => p.image && p.stock !== 0 && !used.has(p.image))
              || c.items.find(p => p.image && !used.has(p.image))
              || c.items.find(p => p.image);
            if (cover) used.add(cover.image);
            const title = t(`collections.${c.key}.title`);
            return (
              <button key={c.key} className="tile" onClick={() => onSelect(c.key)}>
                {cover && <img src={cover.image} alt="" loading="lazy" />}
                <span className="tile-shade" aria-hidden="true" />
                <span className="tile-label">
                  <span className="tile-icon" aria-hidden="true">{c.icon}</span>
                  <span className="tile-name">{title}</span>
                  <span className="tile-count">
                    {c.items.length} {t(c.items.length === 1 ? 'tiles.piece' : 'tiles.pieces')}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
