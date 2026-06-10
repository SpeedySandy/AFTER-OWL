function StockBadge({ stock }) {
  if (stock === 0) return <span className="stock-badge out-stock">Sold Out</span>;
  if (stock <= 2)  return <span className="stock-badge low-stock">Only {stock} left</span>;
  return <span className="stock-badge in-stock">In Stock</span>;
}

export default function ProductCard({ product, onClick }) {
  const { name, category, price, stock, image, gradient, handmade } = product;

  return (
    <article className="product-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="card-image">
        {image ? (
          <img src={image} alt={name} loading="lazy"
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}
        <div
          className="card-gradient"
          style={{ background: gradient || '#1C1308', display: image ? 'none' : 'block' }}
        />
        {handmade && <span className="card-handmade-badge">Handmade</span>}
      </div>
      <div className="card-body">
        <div className="card-category">{category}</div>
        <h3 className="card-name">{name}</h3>
        <div className="card-footer">
          <span className="card-price">{price ? `€${price}` : 'On request'}</span>
          <StockBadge stock={stock} />
        </div>
      </div>
    </article>
  );
}
