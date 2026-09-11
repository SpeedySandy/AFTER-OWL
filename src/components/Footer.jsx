import { SHEET_ID, BRAND } from '../config.js';

const SHOP_LINKS = ['Handmade Limited Edition', 'Secret Stash', 'Tubes', 'Bags', 'Festival & Clubbing Gear'];

export default function Footer({ source, productCount, error, onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand-col">
          <div className="footer-logo-name">{BRAND.name}</div>
          <div className="footer-tagline">{BRAND.tagline}</div>
          <p className="footer-location">📍 {BRAND.location}</p>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Shop</h4>
          {SHOP_LINKS.map(cat => (
            <a key={cat} href="#shop" className="footer-link" onClick={() => onNavigate?.(cat)}>
              {cat}
            </a>
          ))}
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Connect</h4>
          <a className="footer-link" href={BRAND.etsy} target="_blank" rel="noreferrer">Etsy Shop</a>
          <a className="footer-link" href={BRAND.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a className="footer-link" href="#story">Our Story</a>
        </div>
      </div>

      <div className="footer-bottom container">
        <p className="footer-copy">© {year} {BRAND.name} · {BRAND.location} · {productCount} products in showroom</p>
        {source === 'local' && SHEET_ID && (
          <p className="footer-sheet-info">
            {error
              ? `Sheet unavailable (${error}) — showing local data. `
              : 'To enable live inventory: '}
            <a href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}`} target="_blank" rel="noreferrer">
              {error ? 'Check sheet sharing settings' : 'Share your Google Sheet'}
            </a>{' '}
            {!error && 'with "Anyone with the link can view"'}
          </p>
        )}
      </div>
    </footer>
  );
}
