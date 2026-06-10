import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, loading, onSelect }) {
  if (loading) {
    return (
      <div className="product-grid">
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Loading products…</p>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="product-grid">
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your search or filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id ?? product.sku ?? product.name}
          product={product}
          onClick={() => onSelect(product)}
        />
      ))}
    </div>
  );
}
