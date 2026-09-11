import { useMemo } from 'react';

// Featured categories, in display order. Each tile uses the first photo found in that category.
const TILES = [
  { name: 'Handmade Limited Edition', label: 'Handmade', icon: '🎨' },
  { name: 'Secret Stash', icon: '🤫' },
  { name: 'Festival & Clubbing Gear', label: 'Festival Gear', icon: '🪩' },
  { name: 'Bags', icon: '👜' },
  { name: 'Tubes', icon: '✨' },
  { name: 'Dispenser', label: 'Dispensers', icon: '🧪' },
  { name: 'Clothing', icon: '🧦' },
  { name: 'Caps & Hats', icon: '🧢' },
];

export default function CategoryTiles({ products, onSelect }) {
  const tiles = useMemo(() => TILES.map(t => {
    const inCat = products.filter(p => p.category === t.name);
    const withPhoto = inCat.find(p => p.image && p.stock !== 0) || inCat.find(p => p.image);
    return { ...t, count: inCat.length, image: withPhoto?.image };
  }).filter(t => t.count > 0), [products]);

  if (!tiles.length) return null;

  return (
    <section className="tiles-section" aria-labelledby="tiles-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Find your gear</p>
          <h2 id="tiles-title">Shop by vibe</h2>
        </div>
        <div className="tiles">
          {tiles.map(t => (
            <button key={t.name} className="tile" onClick={() => onSelect(t.name)}>
              {t.image && <img src={t.image} alt="" loading="lazy" />}
              <span className="tile-shade" aria-hidden="true" />
              <span className="tile-label">
                <span className="tile-icon" aria-hidden="true">{t.icon}</span>
                <span className="tile-name">{t.label || t.name}</span>
                <span className="tile-count">{t.count} {t.count === 1 ? 'piece' : 'pieces'}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
