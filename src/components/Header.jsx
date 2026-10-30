import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';
import { lockScroll } from '../lib/scrollLock.js';
import { INSTAGRAM_URL, INSTAGRAM_DM_URL, WHATSAPP_NUMBER, whatsappUrl } from '../config.js';
import { useT } from '../i18n/index.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const BASE = import.meta.env.BASE_URL;

export default function Header({
  bagCount = 0, onOpenBag, onHome,
  categories = [], collections = [], onShop,
}) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(null);       // 'shop' | 'about' | null (desktop)
  const [drawer, setDrawer] = useState(false);  // phone menu
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  // Close menus on Escape, outside click, and when the page scrolls a lot
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') { setMenu(null); setDrawer(false); } };
    const onDown = e => { if (navRef.current && !navRef.current.contains(e.target)) setMenu(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, []);
  useEffect(() => (drawer ? lockScroll() : undefined), [drawer]);

  const openHover = key => { clearTimeout(closeTimer.current); setMenu(key); };
  const closeHover = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMenu(null), 180); };
  const go = action => { setMenu(null); setDrawer(false); onShop?.(action); };
  const jump = hash => {
    setMenu(null); setDrawer(false);
    onHome?.();
    setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  const shopPanel = (
    <div className="mega-grid">
      <div className="mega-col">
        <p className="mega-title">{t('nav.collections')}</p>
        <ul>
          {collections.map(c => (
            <li key={c.key}>
              <button onClick={() => go({ collection: c.key })}>
                <Icon name={c.key} />
                <span>{t(`collections.${c.key}.title`)}</span>
                <span className="mega-count">{c.items.length}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mega-col">
        <p className="mega-title">{t('nav.categories')}</p>
        <ul className="mega-cats">
          <li><button onClick={() => go({ category: 'All' })}><span>{t('nav.allProducts')}</span><span className="mega-count">{categories[0]?.count}</span></button></li>
          {categories.slice(1).map(c => (
            <li key={c.name}><button onClick={() => go({ category: c.name })}><span>{c.name}</span><span className="mega-count">{c.count}</span></button></li>
          ))}
        </ul>
      </div>
      <div className="mega-col">
        <p className="mega-title">{t('nav.quick')}</p>
        <ul>
          <li><button onClick={() => go({ inStock: true })}><span className="dot-in" aria-hidden="true" /> <span>{t('nav.inStock')}</span></button></li>
          <li><button onClick={() => go({ collection: 'limited-editions' })}><Icon name="limited-editions" /> <span>{t('nav.limited')}</span></button></li>
          <li><button onClick={() => jump('gift-finder')}><Icon name="sets-and-gifts" /> <span>{t('nav.gifts')}</span></button></li>
          <li><button onClick={() => jump('guides')}><Icon name="festival-tested" /> <span>{t('nav.guides')}</span></button></li>
        </ul>
      </div>
    </div>
  );

  const aboutPanel = (
    <ul className="mega-list">
      <li><button onClick={() => jump('about')}><Icon name="tested-by-the-og" /> <span>{t('nav.story')}</span></button></li>
      <li><button onClick={() => jump('events')}><Icon name="crew" /> <span>{t('nav.irl')}</span></button></li>
      <li><button onClick={() => jump('faq')}><Icon name="first-light" /> <span>{t('nav.faq')}</span></button></li>
      <li><button onClick={() => jump('contact')}><Icon name="owl-essentials" /> <span>{t('nav.contact')}</span></button></li>
      <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span>Instagram ↗</span></a></li>
    </ul>
  );

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

        <nav className="nav" aria-label={t('nav.main')} ref={navRef}>
          <div className="nav-menu nav-hide-xs" onMouseEnter={() => openHover('shop')} onMouseLeave={closeHover}>
            <button className={`nav-trigger ${menu === 'shop' ? 'is-open' : ''}`} aria-expanded={menu === 'shop'} onClick={() => setMenu(m => (m === 'shop' ? null : 'shop'))}>
              {t('nav.shop')} <span className="caret" aria-hidden="true">▾</span>
            </button>
            {menu === 'shop' && <div className="mega mega-shop" role="menu">{shopPanel}</div>}
          </div>
          <div className="nav-menu nav-hide-sm" onMouseEnter={() => openHover('about')} onMouseLeave={closeHover}>
            <button className={`nav-trigger ${menu === 'about' ? 'is-open' : ''}`} aria-expanded={menu === 'about'} onClick={() => setMenu(m => (m === 'about' ? null : 'about'))}>
              {t('nav.about')} <span className="caret" aria-hidden="true">▾</span>
            </button>
            {menu === 'about' && <div className="mega mega-about" role="menu">{aboutPanel}</div>}
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="nav-hide-md">{t('nav.instagram')}</a>

          <LanguageSwitcher />

          <button className="bag-btn" onClick={onOpenBag} aria-label={t('bag.open')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {bagCount > 0 && <span className="bag-count">{bagCount}</span>}
          </button>

          <a href={WHATSAPP_NUMBER ? whatsappUrl('Hey AFTER OWL 🦉') : INSTAGRAM_DM_URL} target="_blank" rel="noreferrer" className="nav-cta nav-hide-xs">
            {t('nav.order')} <span aria-hidden="true">↗</span>
          </a>

          <button className="menu-btn" onClick={() => setDrawer(true)} aria-label={t('nav.menu')} aria-expanded={drawer}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </nav>
      </div>

      {drawer && createPortal(
        <div className="menu-backdrop" onMouseDown={e => e.target === e.currentTarget && setDrawer(false)}>
          <aside className="menu-drawer" role="dialog" aria-modal="true" aria-label={t('nav.menu')}>
            <div className="menu-drawer-head">
              <span className="brand-name">AFTER OWL</span>
              <button className="drawer-close" onClick={() => setDrawer(false)} aria-label={t('product.close')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <p className="mega-title">{t('nav.shop')}</p>
            {shopPanel}
            <p className="mega-title">{t('nav.about')}</p>
            {aboutPanel}
          </aside>
        </div>,
        document.body
      )}
    </header>
  );
}
