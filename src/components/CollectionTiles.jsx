import { useI18n } from '../i18n/index.jsx';
import Icon from './Icon.jsx';

const BASE = import.meta.env.BASE_URL;
// Art-directed tiles from the Web Kit; collections without one fall back to a product photo.
const TILE_ART = new Set(['rave-ready', 'outdoor-mode', 'unique-gadgets', 'hide-and-stash', 'limited-editions', 'sets-and-gifts']);

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
            if (cover && !TILE_ART.has(c.key)) used.add(cover.image);
            const title = t(`collections.${c.key}.title`);
            return (
              <button key={c.key} className="tile" onClick={() => onSelect(c.key)}>
                {TILE_ART.has(c.key) ? (
                  <img
                    src={`${BASE}brand/tile-${c.key}-480.webp`}
                    srcSet={`${BASE}brand/tile-${c.key}-480.webp 480w, ${BASE}brand/tile-${c.key}-800.webp 800w`}
                    sizes="(max-width: 720px) 50vw, 33vw"
                    alt=""
                    loading="lazy"
                  />
                ) : cover && <img src={cover.image} alt="" loading="lazy" />}
                <span className="tile-shade" aria-hidden="true" />
                <span className="tile-label">
                  <span className="tile-icon" aria-hidden="true"><Icon name={c.key} /></span>
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
