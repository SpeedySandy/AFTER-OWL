import { useEffect, useMemo, useState } from 'react';
import { useProducts } from './hooks/useProducts.js';
import { sortCategories } from './lib/products.js';
import { norm } from './lib/sheet.js';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrustBar from './components/TrustBar.jsx';
import CategoryTiles from './components/CategoryTiles.jsx';
import ShopToolbar from './components/ShopToolbar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductModal from './components/ProductModal.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';

// ?p=<product-key> opens a product directly (shareable links)
function useSelectedProduct(products) {
  const [key, setKey] = useState(() => new URLSearchParams(window.location.search).get('p'));

  useEffect(() => {
    const onPop = () => setKey(new URLSearchParams(window.location.search).get('p'));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const select = next => {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set('p', next);
    else url.searchParams.delete('p');
    if (next && !key) window.history.pushState({}, '', url);
    else window.history.replaceState({}, '', url);
    setKey(next);
  };

  const product = key ? products.find(p => p.key === key) : null;
  return [product, select];
}

export default function App() {
  const { products, source, updatedAt, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, select] = useSelectedProduct(products);

  const categories = useMemo(() => {
    const counts = new Map();
    products.forEach(p => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return [
      { name: 'All', count: products.length },
      ...sortCategories(counts.keys()).map(name => ({ name, count: counts.get(name) })),
    ];
  }, [products]);

  const filtered = useMemo(() => {
    const q = norm(search);
    return products.filter(p =>
      (category === 'All' || p.category === category) &&
      (!q || q.split(' ').every(word => p.searchText.includes(word)))
    );
  }, [products, category, search]);

  useEffect(() => {
    if (category !== 'All' && !categories.some(c => c.name === category)) setCategory('All');
  }, [categories, category]);

  const goToShop = cat => {
    setCategory(cat || 'All');
    setSearch('');
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero productCount={products.length} />
        <TrustBar />
        <CategoryTiles products={products} onSelect={goToShop} />

        <section id="shop" className="shop" aria-labelledby="shop-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">The collection</p>
              <h2 id="shop-title">Gear for the night owl in you</h2>
              <p className="section-sub">
                Handmade pieces, festival essentials and secret-stash classics, all picked and tested by the OG AFTER OWL.
              </p>
            </div>

            <ShopToolbar
              search={search}
              onSearch={setSearch}
              categories={categories}
              category={category}
              onCategory={setCategory}
              resultCount={filtered.length}
            />

            <ProductGrid
              products={filtered}
              onSelect={p => select(p.key)}
              onReset={() => { setSearch(''); setCategory('All'); }}
            />
          </div>
        </section>

        <About />
      </main>

      <Footer source={source} updatedAt={updatedAt} error={error} />

      {selected && <ProductModal key={selected.key} product={selected} onClose={() => select(null)} />}
    </>
  );
}
