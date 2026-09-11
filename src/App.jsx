import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { useProducts } from './hooks/useProducts.js';
import { sortCategories } from './data/products.js';
import { BRAND } from './config.js';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import TrustBar from './components/TrustBar.jsx';
import CategoryTiles from './components/CategoryTiles.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductModal from './components/ProductModal.jsx';
import StoryBanner from './components/StoryBanner.jsx';
import ConnectSection from './components/ConnectSection.jsx';
import Footer from './components/Footer.jsx';

const Admin = lazy(() => import('./components/Admin.jsx'));

function useAdminRoute() {
  const [open, setOpen] = useState(() => window.location.hash === '#admin');
  useEffect(() => {
    const handle = () => setOpen(window.location.hash === '#admin');
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);
  function close() { window.location.hash = ''; setOpen(false); }
  return [open, close];
}

export default function App() {
  const { products, loading, source, error } = useProducts();
  const [adminOpen, closeAdmin] = useAdminRoute();

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  // Derive categories from live data, in the fixed display order
  const categories = useMemo(() => {
    const cats = sortCategories(new Set(products.map(p => p.category).filter(Boolean)));
    return ['All', ...cats];
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

  function goToShop(cat) {
    if (cat) setCategory(cat);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div id="top">
      <AnnouncementBar />
      <Header search={search} onSearch={setSearch} source={source} onNavigate={goToShop} />

      <main>
        <section className="hero">
          <p className="hero-eyebrow">{BRAND.location} · Tested in the Wild</p>
          <h1>
            Gear up. Get lost.<br />
            <span>Come back with a story.</span>
          </h1>
          <p className="hero-sub">
            Handmade art, festival essentials, and a Secret Stash collection your bag won't
            snitch on — hand-poured, hand-picked, and packed with love in {BRAND.location}.
          </p>
          <div className="hero-cta-row">
            <button className="btn btn-primary" onClick={() => goToShop()}>Shop the Collection</button>
            <a className="btn btn-outline" href={BRAND.etsy} target="_blank" rel="noreferrer">
              Visit our Etsy
            </a>
          </div>
        </section>

        <TrustBar />

        <CategoryTiles onSelect={goToShop} />

        <section id="shop" className="shop-section">
          <div className="section-heading container">
            <p className="section-eyebrow">The Full Lineup</p>
            <h2>Shop All Gear</h2>
          </div>
          <CategoryFilter categories={categories} selected={category} onChange={setCategory} />
          <ProductGrid products={filtered} loading={loading} onSelect={setSelected} />
        </section>

        <StoryBanner />

        <ConnectSection />
      </main>

      <Footer source={source} productCount={products.length} error={error} onNavigate={goToShop} />

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}

      {adminOpen && (
        <Suspense fallback={null}>
          <Admin onClose={closeAdmin} />
        </Suspense>
      )}
    </div>
  );
}
