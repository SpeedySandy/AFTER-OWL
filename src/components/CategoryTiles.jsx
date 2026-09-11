const TILES = [
  { name: 'Handmade Limited Edition', icon: '🎨', gradient: 'linear-gradient(145deg, #1a0f00 0%, #6B4E08 45%, #E8C84A 100%)' },
  { name: 'Secret Stash',             icon: '🤫', gradient: 'linear-gradient(145deg, #060606 0%, #1A1A1A 50%, #3a2a10 100%)' },
  { name: 'Tubes',                    icon: '🎷', gradient: 'linear-gradient(145deg, #141414 0%, #5A6270 40%, #D0D8E0 100%)' },
  { name: 'Festival & Clubbing Gear', icon: '🎪', gradient: 'linear-gradient(145deg, #1A0528 0%, #6A1A8A 50%, #C060E0 100%)' },
  { name: 'Bags',                     icon: '👜', gradient: 'linear-gradient(145deg, #1a0a00 0%, #5A3000 40%, #C88040 100%)' },
  { name: 'Mirror',                   icon: '🪞', gradient: 'linear-gradient(145deg, #020817 0%, #2B5FC4 55%, #6BA3E8 100%)' },
  { name: 'Lights',                   icon: '✨', gradient: 'linear-gradient(145deg, #1a1a00 0%, #8B8000 45%, #F5E050 100%)' },
  { name: 'Caps & Hats',              icon: '🧢', gradient: 'linear-gradient(145deg, #0a0500 0%, #D97706 40%, #FCD34D 100%)' },
];

export default function CategoryTiles({ onSelect }) {
  return (
    <section className="category-tiles" aria-label="Shop by category">
      <div className="container">
        <div className="section-heading">
          <p className="section-eyebrow">Find Your Gear</p>
          <h2>Shop by Vibe</h2>
        </div>
        <div className="tiles-grid">
          {TILES.map(tile => (
            <button
              key={tile.name}
              className="tile"
              onClick={() => onSelect(tile.name)}
              style={{ '--tile-gradient': tile.gradient }}
            >
              <span className="tile-icon">{tile.icon}</span>
              <span className="tile-name">{tile.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
