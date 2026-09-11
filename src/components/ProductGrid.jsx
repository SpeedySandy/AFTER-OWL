import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, onSelect, onReset }) {
  if (!products.length) {
    return (
      <div className="empty">
        <p className="empty-title">Nothing here… yet 🦉</p>
        <p>Try another search or category.</p>
        <button className="btn btn-ghost" onClick={onReset}>Show everything</button>
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard key={p.key} product={p} onClick={() => onSelect(p)} />
      ))}
    </div>
  );
}
