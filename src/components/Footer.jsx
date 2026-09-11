import { ETSY_SHOP_URL, INSTAGRAM_URL } from '../config.js';

const BASE = import.meta.env.BASE_URL;

export default function Footer({ source, updatedAt, error }) {
  const year = new Date().getFullYear();
  const time = updatedAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={`${BASE}logo-mark.webp`} alt="" width="56" height="56" />
          <div>
            <p className="footer-name">AFTER OWL</p>
            <p className="footer-tag">Tested in the wild, trusted in the night.</p>
          </div>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a href={ETSY_SHOP_URL} target="_blank" rel="noreferrer">Etsy</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© {year} AFTER OWL · Barcelona</p>
        <p className="live-status">
          <span className={`live-dot ${source === 'live' ? 'is-live' : ''}`} aria-hidden="true" />
          {source === 'live'
            ? `Live stock · updated ${time}`
            : error ? 'Showing last saved stock' : 'Loading live stock…'}
        </p>
      </div>
    </footer>
  );
}
