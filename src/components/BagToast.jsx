import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';

/** Small confirmation when something lands in the bag, plus a back-to-top button. */
export default function BagToast({ products, onOpenBag, bagOpen }) {
  const { t } = useI18n();
  const [name, setName] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const onAdded = e => {
      const product = products.find(p => p.key === e.detail?.key);
      if (!product) return;
      setName(product.name);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setName(null), 3200);
    };
    window.addEventListener('ao:bag-added', onAdded);
    return () => {
      window.removeEventListener('ao:bag-added', onAdded);
      clearTimeout(timer.current);
    };
  }, [products]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 1400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {name && !bagOpen && (
        <div className="bag-toast" role="status">
          <span>{t('bag.added', { name })}</span>
          <button onClick={() => { setName(null); onOpenBag(); }}>{t('bag.view')}</button>
        </div>
      )}
      {showTop && (
        <button
          className="to-top"
          aria-label={t('nav.top')}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6" /></svg>
        </button>
      )}
    </>
  );
}
