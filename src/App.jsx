import { useEffect, useMemo, useState } from 'react';
import { useProducts } from './hooks/useProducts.js';
import { sortCategories, sortProducts } from './lib/products.js';
import { norm } from './lib/sheet.js';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrustBar from './components/TrustBar.jsx';
import CollectionTiles from './components/CollectionTiles.jsx';
import { COLLECTIONS, findCollection, collectionProducts } from './data/collections.js';
import ShopToolbar from './components/ShopToolbar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductModal from './components/ProductModal.jsx';
import About from './components/About.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
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
  const [collectionKey, setCollectionKey] = useState(null);
  const [sort, setSort] = useState('featured');
  const [selected, select] = useSelectedProduct(products);

  const categories = useMemo(() => {
    const counts = new Map();
    products.forEach(p => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return [
      { name: 'All', count: products.length },
      ...sortCategories(counts.keys()).map(name => ({ name, count: counts.get(name) })),
    ];
  }, [products]);

  const collections = useMemo(
    () => COLLECTIONS.map(c => ({ ...c, items: collectionProducts(products, c) })).filter(c => c.items.length),
    [products]
  );

  const filtered = useMemo(() => {
    const q = norm(search);
    const collection = findCollection(collectionKey);
    const base = collection ? collectionProducts(products, collection) : products;
    const list = base.filter(p =>
      (category === 'All' || p.category === category) &&
      (!q || q.split(' ').every(word => p.searchText.includes(word)))
    );
    return sortProducts(list, sort);
  }, [products, category, collectionKey, search, sort]);

  useEffect(() => {
    if (category !== 'All' && !categories.some(c => c.name === category)) setCategory('All');
  }, [categories, category]);

  const pickCategory = cat => { setCategory(cat); setCollectionKey(null); };
  const pickCollection = key => { setCollectionKey(key); setCategory('All'); };

  const goToCollection = key => {
    pickCollection(key);
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
        <CollectionTiles collections={collections} onSelect={goToCollection} />

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
              onCategory={pickCategory}
              collections={collections}
              collectionKey={collectionKey}
              onCollection={pickCollection}
              sort={sort}
              onSort={setSort}
              resultCount={filtered.length}
            />

            <ProductGrid
              products={filtered}
              onSelect={p => select(p.key)}
              onReset={() => { setSearch(''); pickCategory('All'); }}
            />
          </div>
        </section>

        <About collections={collections} onCollection={goToCollection} />
        <FAQ />
        <Contact />
      </main>

      <Footer source={source} updatedAt={updatedAt} error={error} />

      {selected && <ProductModal key={selected.key} product={selected} onClose={() => select(null)} />}
    </>
  );
}
