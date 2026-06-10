import { useState, useMemo } from 'react';
import { useProducts } from './hooks/useProducts.js';
import { CATEGORIES } from './data/products.js';
import Header from './components/Header.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductModal from './components/ProductModal.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const { products, loading, source } = useProducts();

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  // Derive categories dynamically from live data too
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
    return cats;
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter(p => {
      const inCategory = category === 'All' || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q)) ||
        p.sku?.toLowerCase().includes(q)
      );
    });
  }, [products, category, search]);

  return (
    <>
      <Header search={search} onSearch={setSearch} source={source} />

      <main>
        <section className="hero">
          <p className="hero-eyebrow">Barcelona · Tested in the Wild</p>
          <h1>
            Curated gear for the<br />
            <span>night owl in you</span>
          </h1>
          <p className="hero-sub">
            From underground raves to mountaintop sunrises — handpicked, tested, and packed with love.
          </p>
        </section>

        <CategoryFilter categories={categories} selected={category} onChange={setCategory} />

        <ProductGrid products={filtered} loading={loading} onSelect={setSelected} />
      </main>

      <Footer source={source} productCount={products.length} />

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
