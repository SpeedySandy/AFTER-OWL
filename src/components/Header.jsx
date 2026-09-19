import { useEffect, useState } from 'react';
import { ETSY_SHOP_URL, INSTAGRAM_URL } from '../config.js';
import { useT } from '../i18n/index.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const BASE = import.meta.env.BASE_URL;

export default function Header({ bagCount = 0, onOpenBag, onHome }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a
          href={BASE}
          className="brand"
          aria-label={t('nav.home')}
          onClick={e => { if (onHome && !e.metaKey && !e.ctrlKey) { e.preventDefault(); onHome(); } }}
        >
          <img src={`${BASE}logo-mark.webp`} alt="" className="brand-mark" width="44" height="44" />
          <span className="brand-text">
            <span className="brand-name">AFTER OWL</span>
            <span className="brand-tag">{t('nav.tagline')}</span>
          </span>
        </a>

        <nav className="nav" aria-label={t('nav.main')}>
          <a href="#shop" className="nav-hide-xs">{t('nav.shop')}</a>
          <a href="#about" className="nav-hide-sm">{t('nav.about')}</a>
          <a href="#contact" className="nav-hide-md">{t('nav.contact')}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="nav-hide-md">{t('nav.instagram')}</a>

          <LanguageSwitcher />

          <button className="bag-btn" onClick={onOpenBag} aria-label={t('bag.open')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {bagCount > 0 && <span className="bag-count">{bagCount}</span>}
          </button>

          <a href={ETSY_SHOP_URL} target="_blank" rel="noreferrer" className="nav-cta nav-hide-xs">
            {t('nav.etsy')} <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
