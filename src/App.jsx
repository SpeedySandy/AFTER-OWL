import { useEffect, useMemo, useState } from 'react';
import { useProducts } from './hooks/useProducts.js';
import { sortCategories, sortProducts } from './lib/products.js';
import { norm } from './lib/sheet.js';
import { useSavedList } from './hooks/useSaved.js';
import { useBag, useRecent } from './hooks/useStore.js';
import { bagCount } from './lib/bag.js';
import { pushRecent } from './lib/recent.js';
import { navigate, onRouteChange, parseLocation } from './lib/router.js';
import { applySeo } from './lib/seo.js';
import { useI18n } from './i18n/index.jsx';

import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrustBar from './components/TrustBar.jsx';
import CollectionTiles from './components/CollectionTiles.jsx';
import ShopToolbar from './components/ShopToolbar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductModal from './components/ProductModal.jsx';
import RecentlyViewed from './components/RecentlyViewed.jsx';
import CategoryIntro from './components/CategoryIntro.jsx';
import Guides from './components/Guides.jsx';
import GuideView from './components/GuideView.jsx';
import GiftFinder from './components/GiftFinder.jsx';
import Reviews from './components/Reviews.jsx';
import SocialStrip from './components/SocialStrip.jsx';
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import Newsletter from './components/Newsletter.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BagDrawer from './components/BagDrawer.jsx';

import { COLLECTIONS, findCollection, collectionProducts } from './data/collections.js';
import { findGuide } from './data/guides.js';

/** Products and guides both come from the URL, so every piece and every list is
 *  linkable and crawlable: /p/<key> and /guide/<key>. */
function useRoute(products) {
  const [route, setRoute] = useState(parseLocation);
  useEffect(() => onRouteChange(setRoute), []);

  const product = route.name === 'product' ? products.find(p => p.key === route.key) || null : null;
  const guide = route.name === 'guide' ? findGuide(route.key) : null;

  const select = next => navigate(next ? { name: 'product', key: next.key } : { name: 'home' });
  const openGuide = key => {
    navigate(key ? { name: 'guide', key } : { name: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { product, guide, select, openGuide };
}

export default function App() {
  const { t, lang, meta } = useI18n();
  const { products: rawProducts, source, updatedAt, error } = useProducts();

  const products = useMemo(() => {
    const limited = findCollection('limited-editions');
    if (!limited) return rawProducts;
    const keys = new Set(collectionProducts(rawProducts, limited).map(p => p.key));
    return rawProducts.map(p => (keys.has(p.key) ? { ...p, limited: true } : p));
  }, [rawProducts]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [collectionKey, setCollectionKey] = useState(null);
  const [sort, setSort] = useState('featured');
  const [savedOnly, setSavedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  const saved = useSavedList();
  const bagItems = useBag();
  const recentKeys = useRecent();
  const { product: selected, guide, select, openGuide } = useRoute(products);

  // Remember what was looked at, and keep the head in sync with the route.
  useEffect(() => {
    if (selected) pushRecent(selected.key);
  }, [selected?.key]);

  useEffect(() => {
    applySeo({ product: selected, guide, lang, dictMeta: meta, products });
  }, [selected, guide, lang, meta, products]);

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
      (!savedOnly || saved.includes(p.key)) &&
      (!inStockOnly || p.stock !== 0) &&
      (!q || q.split(' ').every(word => p.searchText.includes(word)))
    );
    return sortProducts(list, sort);
  }, [products, category, collectionKey, search, sort, savedOnly, inStockOnly, saved]);

  useEffect(() => {
    if (category !== 'All' && !categories.some(c => c.name === category)) setCategory('All');
  }, [categories, category]);

  const isFiltered = Boolean(search || collectionKey || savedOnly || inStockOnly || category !== 'All');
  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setCollectionKey(null);
    setSavedOnly(false);
    setInStockOnly(false);
  };

  const pickCategory = cat => { setCategory(cat); setCollectionKey(null); };
  const pickCollection = key => { setCollectionKey(key); setCategory('All'); };

  const goToCollection = key => {
    pickCollection(key);
    setSearch('');
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <a className="skip-link" href="#shop">{t('hero.shopCta')}</a>
      <AnnouncementBar />
      <Header
        bagCount={bagCount(bagItems)}
        onOpenBag={() => setBagOpen(true)}
        onHome={() => select(null)}
      />

      <main>
        {guide ? (
          <GuideView
            guide={guide}
            products={products}
            bagItems={bagItems}
            onSelect={select}
            onBack={() => openGuide(null)}
          />
        ) : (
        <>
        <Hero productCount={products.length} />
        <TrustBar />
        <CollectionTiles collections={collections} onSelect={goToCollection} />

        <section id="shop" className="shop" aria-labelledby="shop-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{t('shop.eyebrow')}</p>
              <h2 id="shop-title">{t('shop.title')}</h2>
              <p className="section-sub">{t('shop.sub')}</p>
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
              savedOnly={savedOnly}
              onToggleSavedOnly={() => setSavedOnly(v => !v)}
              savedCount={saved.length}
              inStockOnly={inStockOnly}
              onToggleInStock={() => setInStockOnly(v => !v)}
              resultCount={filtered.length}
              filtered={isFiltered}
              onClear={clearFilters}
            />

            <CategoryIntro
              category={category === 'All' ? null : category}
              collectionKey={collectionKey}
            />

            <ProductGrid
              products={filtered}
              bagItems={bagItems}
              onSelect={select}
              onReset={clearFilters}
            />
          </div>
        </section>

        <Guides products={products} onOpen={openGuide} />
        <GiftFinder products={products} bagItems={bagItems} onSelect={select} />
        <RecentlyViewed keys={recentKeys} products={products} onSelect={select} />
        <Reviews />
        <SocialStrip />
        <About collections={collections} onCollection={goToCollection} />
        <Events />
        <Newsletter />
        <FAQ />
        <Contact />
        </>
        )}
      </main>

      <Footer source={source} updatedAt={updatedAt} error={error} />

      <BagDrawer
        open={bagOpen}
        items={bagItems}
        products={products}
        onClose={() => setBagOpen(false)}
        onSelect={p => { setBagOpen(false); select(p); }}
      />

      {selected && (
        <ProductModal
          key={selected.key}
          product={selected}
          products={products}
          bagItems={bagItems}
          onSelect={select}
          onOpenBag={() => setBagOpen(true)}
          onClose={() => select(null)}
        />
      )}
    </>
  );
}
