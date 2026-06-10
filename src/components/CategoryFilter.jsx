export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="filter-bar container">
      <span className="filter-label">Filter</span>
      {categories.map(cat => (
        <button
          key={cat}
          className={`filter-btn ${selected === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
