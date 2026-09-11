import { useEffect, useState } from 'react';
import { ETSY_SHOP_URL, INSTAGRAM_URL } from '../config.js';

const BASE = import.meta.env.BASE_URL;

export default function Header() {
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
        <a href={BASE} className="brand" aria-label="AFTER OWL home">
          <img src={`${BASE}logo-mark.webp`} alt="" className="brand-mark" width="44" height="44" />
          <span className="brand-text">
            <span className="brand-name">AFTER OWL</span>
            <span className="brand-tag">Gear up. Owl style.</span>
          </span>
        </a>

        <nav className="nav" aria-label="Main">
          <a href="#shop" className="nav-hide-xs">Shop</a>
          <a href="#about">About</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="nav-hide-sm">Instagram</a>
          <a href={ETSY_SHOP_URL} target="_blank" rel="noreferrer" className="nav-cta">
            Etsy shop <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
