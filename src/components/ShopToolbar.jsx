import { SORT_OPTIONS } from '../lib/products.js';

export default function ShopToolbar({
  search, onSearch, categories, category, onCategory,
  collections, collectionKey, onCollection, sort, onSort, resultCount,
}) {
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
        <label className="sort">
          <span className="sort-label">Sort</span>
          <select value={sort} onChange={e => onSort(e.target.value)} aria-label="Sort products">
            {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </label>
        <p className="result-count" aria-live="polite">{resultCount} {resultCount === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="chips" aria-label="Filter products">
        <button
          className={`chip ${!collectionKey && category === 'All' ? 'is-active' : ''}`}
          aria-pressed={!collectionKey && category === 'All'}
          onClick={() => onCategory('All')}
        >
          All<span className="chip-count">{categories[0]?.count}</span>
        </button>
        {collections.map(c => (
          <button
            key={c.key}
            className={`chip chip-collection ${collectionKey === c.key ? 'is-active' : ''}`}
            aria-pressed={collectionKey === c.key}
            onClick={() => (collectionKey === c.key ? onCategory('All') : onCollection(c.key))}
          >
            <span aria-hidden="true">{c.icon}</span> {c.title}
          </button>
        ))}
        <span className="chip-sep" aria-hidden="true" />
        {categories.slice(1).map(c => (
          <button
            key={c.name}
            aria-pressed={category === c.name}
            className={`chip ${category === c.name ? 'is-active' : ''}`}
            onClick={() => onCategory(category === c.name ? 'All' : c.name)}
          >
            {c.name}<span className="chip-count">{c.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
