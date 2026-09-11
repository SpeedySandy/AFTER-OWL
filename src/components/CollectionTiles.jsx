export default function CollectionTiles({ collections, onSelect }) {
  if (!collections.length) return null;
  const used = new Set();

  return (
    <section className="tiles-section" aria-labelledby="tiles-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">What you’ll find</p>
          <h2 id="tiles-title">Shop by vibe</h2>
        </div>
        <div className="tiles">
          {collections.map(c => {
            // pick a cover photo that no earlier tile uses yet
            const cover = c.items.find(p => p.image && p.stock !== 0 && !used.has(p.image))
              || c.items.find(p => p.image && !used.has(p.image))
              || c.items.find(p => p.image);
            if (cover) used.add(cover.image);
            return (
              <button key={c.key} className="tile" onClick={() => onSelect(c.key)}>
                {cover && <img src={cover.image} alt="" loading="lazy" />}
                <span className="tile-shade" aria-hidden="true" />
                <span className="tile-label">
                  <span className="tile-icon" aria-hidden="true">{c.icon}</span>
                  <span className="tile-name">{c.title}</span>
                  <span className="tile-count">{c.items.length} {c.items.length === 1 ? 'piece' : 'pieces'}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
