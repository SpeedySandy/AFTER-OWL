import { useI18n } from '../i18n/index.jsx';
import { splitEvents, formatEventDate } from '../lib/events.js';

const BASE = import.meta.env.BASE_URL;

export default function Hero({ productCount }) {
  const { t, lang } = useI18n();
  const next = splitEvents().upcoming[0];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 id="hero-title">
            {t('hero.titleA')}<br />
            <span className="grad-text">{t('hero.titleB')}</span>
          </h1>
          <p className="hero-sub">{t('hero.sub')}</p>

          <div className="hero-actions">
            <a href="#shop" className="btn btn-primary">{t('hero.shopCta')}</a>
            <a href="#about" className="btn btn-ghost">{t('hero.storyCta')}</a>
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

        <div className="hero-art">
          <img
            src={`${BASE}logo.webp`}
            alt="AFTER OWL logo: a neon owl flying through a crescent moon"
            width="500"
            height="500"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
