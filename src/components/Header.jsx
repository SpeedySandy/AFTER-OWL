import { useState } from 'react';
import { BRAND } from '../config.js';

const LOGO_URL = 'https://drive.google.com/thumbnail?id=17FFya-sKK81YcaRqLw2_1WMwoV8S3gpx&sz=w200';

const NAV_LINKS = [
  { label: 'Shop', href: '#shop' },
  { label: 'Handmade', href: '#shop', category: 'Handmade Limited Edition' },
  { label: 'Secret Stash', href: '#shop', category: 'Secret Stash' },
  { label: 'Our Story', href: '#story' },
];

function SocialIcons({ className = '' }) {
  return (
    <div className={`header-socials ${className}`}>
      <a href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="header-social-btn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a href={BRAND.etsy} target="_blank" rel="noreferrer" aria-label="Etsy Shop" className="header-social-btn header-social-etsy">
        Etsy
      </a>
    </div>
  );
}

export default function Header({ search, onSearch, source, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  function handleNav(link) {
    setMenuOpen(false);
    if (link.category) onNavigate?.(link.category);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="header-burger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        <a href="#top" className="header-brand">
          <img
            src={LOGO_URL}
            alt={BRAND.name}
            className="header-logo"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div className="header-logo-fallback" style={{ display: 'none' }}>🦉</div>
          <div>
            <div className="header-name">{BRAND.name}</div>
            <div className="header-tagline">{BRAND.tagline}</div>
          </div>
        </a>

        <nav className="header-nav">
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} className="header-nav-link" onClick={() => handleNav(link)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="header-search-toggle"
            onClick={() => setSearchOpen(o => !o)}
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            🔍
          </button>
          <SocialIcons className="header-socials--desktop" />
        </div>

        <div className={`header-search ${searchOpen ? 'is-open' : ''}`}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>

      <div className={`header-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <nav className="header-mobile-nav">
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} className="header-mobile-link" onClick={() => handleNav(link)}>
              {link.label}
            </a>
          ))}
        </nav>
        <SocialIcons className="header-socials--mobile" />
        <div className="header-source header-source--mobile">
          <div className={`source-dot ${source === 'local' ? 'local' : ''}`} />
          {source === 'sheets' ? 'Live from Google Sheets' : 'Local data'}
        </div>
      </div>
    </header>
  );
}
