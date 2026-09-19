import { ETSY_SHOP_URL, INSTAGRAM_URL } from '../config.js';
import { useI18n } from '../i18n/index.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const BASE = import.meta.env.BASE_URL;

export default function Footer({ source, updatedAt, error }) {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();
  const time = updatedAt?.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={`${BASE}logo-mark.webp`} alt="" width="56" height="56" />
          <div>
            <p className="footer-name">AFTER OWL</p>
            <p className="footer-tag">{t('footer.tag')}</p>
          </div>
        </div>
        <nav className="footer-links" aria-label={t('footer.nav')}>
          <a href="#shop">{t('nav.shop')}</a>
          <a href="#about">{t('nav.about')}</a>
          <a href="#events">{t('events.eyebrow')}</a>
          <a href="#faq">{t('nav.faq')}</a>
          <a href="#contact">{t('nav.contact')}</a>
          <a href={ETSY_SHOP_URL} target="_blank" rel="noreferrer">Etsy</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>{t('footer.rights', { year })}</p>
        <div className="footer-meta">
          <LanguageSwitcher compact />
          <p className="live-status">
            <span className={`live-dot ${source === 'live' ? 'is-live' : ''}`} aria-hidden="true" />
            {source === 'live'
              ? t('footer.live', { time })
              : error ? t('footer.saved') : t('footer.loading')}
          </p>
        </div>
      </div>
    </footer>
  );
}
