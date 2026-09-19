import { SORT_OPTIONS } from '../lib/products.js';
import { useI18n } from '../i18n/index.jsx';

export default function ShopToolbar({
  search, onSearch, categories, category, onCategory,
  collections, collectionKey, onCollection, sort, onSort,
  savedOnly, onToggleSavedOnly, savedCount = 0,
  inStockOnly, onToggleInStock, resultCount, onClear, filtered,
}) {
  const { t } = useI18n();

  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <label className="search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            type="search"
            placeholder={t('toolbar.search')}
            value={search}
            onChange={e => onSearch(e.target.value)}
            aria-label={t('toolbar.searchLabel')}
          />
        </label>

        <label className="sort">
          <span className="sort-label">{t('toolbar.sort')}</span>
          <select value={sort} onChange={e => onSort(e.target.value)} aria-label={t('toolbar.sortLabel')}>
            {SORT_OPTIONS.map(key => <option key={key} value={key}>{t(`sort.${key}`)}</option>)}
          </select>
        </label>

        <button
          className={`chip chip-toggle ${inStockOnly ? 'is-active' : ''}`}
          aria-pressed={inStockOnly}
          onClick={onToggleInStock}
        >
          <span className="dot-in" aria-hidden="true" />
          {t('toolbar.inStock')}
        </button>

        {savedCount > 0 && (
          <button
            className={`chip chip-saved ${savedOnly ? 'is-active' : ''}`}
            aria-pressed={savedOnly}
            onClick={onToggleSavedOnly}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-10-9.2C.6 8 2 4.5 5.4 4c2-.3 3.8.6 5 2.2A5.6 5.6 0 0 1 15.6 4c3.4.5 4.8 4 3.4 7.3-2.5 4.6-10 9.2-10 9.2Z" /></svg>
            {t('toolbar.saved')} <span className="chip-count">{savedCount}</span>
          </button>
        )}

        <p className="result-count" aria-live="polite">
          {resultCount} {t(resultCount === 1 ? 'toolbar.item' : 'toolbar.items')}
        </p>

        {filtered && (
          <button className="toolbar-clear" onClick={onClear}>{t('toolbar.clear')}</button>
        )}
      </div>

      <div className="chips" aria-label={t('toolbar.filterLabel')}>
        <button
          className={`chip ${!collectionKey && category === 'All' ? 'is-active' : ''}`}
          aria-pressed={!collectionKey && category === 'All'}
          onClick={() => onCategory('All')}
        >
          {t('toolbar.all')}<span className="chip-count">{categories[0]?.count}</span>
        </button>

        {collections.map(c => (
          <button
            key={c.key}
            className={`chip chip-collection ${collectionKey === c.key ? 'is-active' : ''}`}
            aria-pressed={collectionKey === c.key}
            onClick={() => (collectionKey === c.key ? onCategory('All') : onCollection(c.key))}
          >
            <span aria-hidden="true">{c.icon}</span> {t(`collections.${c.key}.title`)}
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
