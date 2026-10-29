import { useI18n } from '../i18n/index.jsx';
import { splitEvents, formatEventDate } from '../lib/events.js';

const BASE = import.meta.env.BASE_URL;

export default function Hero({ productCount }) {
  const { t, lang } = useI18n();
  const next = splitEvents().upcoming[0];
  const hour = new Date().getHours();
  const mood = hour >= 22 || hour < 5 ? 'night' : hour < 9 ? 'sunrise' : null;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <picture className="hero-photo">
        <source media="(max-width: 760px)" srcSet={`${BASE}brand/hero-mobile-720.webp 720w, ${BASE}brand/hero-mobile-1080.webp 1080w`} sizes="100vw" />
        <img
          src={`${BASE}brand/hero-desktop-1440.webp`}
          srcSet={`${BASE}brand/hero-desktop-1440.webp 1440w, ${BASE}brand/hero-desktop-2560.webp 2560w`}
          sizes="100vw"
          alt={t('hero.photoAlt')}
          fetchPriority="high"
        />
      </picture>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          {mood && <p className="hero-mood">{t(`hero.mood.${mood}`)}</p>}
          <h1 id="hero-title">
            {t('hero.titleA')}<br />
            <span className="grad-text">{t('hero.titleB')}</span>
          </h1>
          <p className="hero-sub">{t('hero.sub')}</p>

          <div className="hero-actions">
            <a href="#shop" className="btn btn-primary">{t('hero.shopCta')}</a>
            <a href="#news" className="btn btn-ring">{t('hero.crewCta')}</a>
          </div>

          <ul className="hero-facts">
            <li><strong>{productCount}</strong> {t('hero.factPieces')}</li>
            <li><strong>100%</strong> {t('hero.factTested')}</li>
          </ul>

          {next && (
            <a className="hero-event" href="#events">
              <span className="hero-event-tag">{t('hero.nextPopup')}</span>
              <span className="hero-event-body">
                <strong>{next.title}</strong>
                <span>{formatEventDate(next.when, lang)} · {next.place}</span>
              </span>
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
