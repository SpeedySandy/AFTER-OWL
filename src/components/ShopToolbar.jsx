export default function ShopToolbar({ search, onSearch, categories, category, onCategory, resultCount }) {
  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <label className="search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            type="search"
            placeholder="Search the collection…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            aria-label="Search products"
          />
        </label>
        <p className="result-count" aria-live="polite">{resultCount} {resultCount === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="chips" role="tablist" aria-label="Categories">
        {categories.map(c => (
          <button
            key={c.name}
            role="tab"
            aria-selected={category === c.name}
            className={`chip ${category === c.name ? 'is-active' : ''}`}
            onClick={() => onCategory(c.name)}
          >
            {c.name}<span className="chip-count">{c.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
