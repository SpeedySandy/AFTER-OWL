import ProductCard from './ProductCard.jsx';
import { useT } from '../i18n/index.jsx';

export default function ProductGrid({ products, onSelect, onReset, bagItems }) {
  const t = useT();

  if (!products.length) {
    return (
      <div className="empty">
        <p className="empty-title">{t('empty.title')}</p>
        <p>{t('empty.text')}</p>
        <button className="btn btn-ghost" onClick={onReset}>{t('empty.cta')}</button>
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard key={p.key} product={p} bagItems={bagItems} onClick={() => onSelect(p)} />
      ))}
    </div>
  );
}
