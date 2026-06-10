import { SHEET_ID } from '../config.js';

export default function Footer({ source, productCount, error }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-logo-name">AFTER OWL</div>
      <div className="footer-tagline">Gear Up. Owl Style.</div>
      <nav className="footer-links">
        <a className="footer-link" href="https://www.etsy.com/shop/afterowl" target="_blank" rel="noreferrer">Etsy Shop</a>
        <a className="footer-link" href="https://www.instagram.com/afterowlshop" target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <p className="footer-copy">© {year} AFTER OWL · Barcelona · {productCount} products in showroom</p>
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
    </footer>
  );
}
