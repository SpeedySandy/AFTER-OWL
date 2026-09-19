import about from '../data/about.json';
import manifest from '../data/image-manifest.json';
import { COLLECTIONS } from '../data/collections.js';
import { driveThumb, ETSY_SHOP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_NUMBER, whatsappUrl } from '../config.js';
import { useI18n } from '../i18n/index.jsx';

const BASE = import.meta.env.BASE_URL;
const local = new Set(manifest.files);
const img = id => (local.has(id) ? `${BASE}img/${id}.webp` : driveThumb(id));

const PILLAR_ICONS = ['🦉', '✦', '🪩'];

export default function About({ collections = [], onCollection }) {
  const { t, tl } = useI18n();
  const counts = Object.fromEntries(collections.map(c => [c.key, c.items.length]));
  const pillars = tl('about.pillars');

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <header className="about-head">
          <p className="eyebrow">{t('about.eyebrow')}</p>
          <h2 id="about-title">
            {t('about.titleA')}<br />
            <span className="grad-text">{t('about.titleB')}</span>
          </h2>
          <p className="about-lead">{t('about.lead')}</p>
        </header>

        {/* 1 · Mission */}
        <blockquote className="mission">
          <p>{t('about.mission')}</p>
          <cite>{t('about.missionLabel')}</cite>
        </blockquote>

        {/* 2 · What you'll find */}
        <div className="find">
          <h3 className="about-h3">{t('about.findTitle')}</h3>
          <div className="collections">
            {COLLECTIONS.map(c => (
              <article key={c.key} className="collection">
                <span className="collection-icon" aria-hidden="true">{c.icon}</span>
                <h4 className="collection-title">{t(`collections.${c.key}.title`)}</h4>
                <p className="collection-text">{t(`collections.${c.key}.text`)}</p>
                {c.tags && (
                  <ul className="collection-tags">
                    {c.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                )}
                {counts[c.key] > 0 && (
                  <button className="collection-link" onClick={() => onCollection?.(c.key)}>
                    {t('about.shopPieces', {
                      count: counts[c.key],
                      noun: t(counts[c.key] === 1 ? 'tiles.piece' : 'tiles.pieces'),
                    })} →
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* 3 · Our promise */}
        <div className="promise">
          <h3 className="about-h3">{t('about.promiseTitle')}</h3>
          <p>{t('about.promise1')}</p>
          <p>{t('about.promise2')}</p>
        </div>
        <div className="pillars">
          {pillars.map((p, i) => (
            <article key={p.title} className="pillar">
              <span className="pillar-icon" aria-hidden="true">{PILLAR_ICONS[i] || '✦'}</span>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        {/* 4 · Our story */}
        <div className="about-intro">
          <div className="about-copy">
            <h3 className="about-h3">{t('about.storyTitle')}</h3>
            <p>{t('about.story1')}</p>
            <p>{t('about.story2')}</p>
            <p>{t('about.story3')}</p>
          </div>
          <figure className="about-hero">
            <img src={img(about.hero)} alt={t('about.heroAlt')} loading="lazy" />
          </figure>
        </div>

        {/* 5 · Where to buy */}
        <div className="where">
          <h3 className="about-h3">{t('about.whereTitle')}</h3>
          <div className="find-us">
            <a className="find-card" href={ETSY_SHOP_URL} target="_blank" rel="noreferrer">
              <span className="find-label">{t('about.etsyLabel')}</span>
              <span className="find-title">{t('about.etsyTitle')} ↗</span>
              <span className="find-text">{t('about.etsyText')}</span>
            </a>
            <a className="find-card" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <span className="find-label">{t('about.igLabel')}</span>
              <span className="find-title">Instagram · @{INSTAGRAM_HANDLE} ↗</span>
              <span className="find-text">{t('about.igText')}</span>
            </a>
            {WHATSAPP_NUMBER ? (
              <a className="find-card" href={whatsappUrl('Hey AFTER OWL 🦉')} target="_blank" rel="noreferrer">
                <span className="find-label">{t('about.waLabel')}</span>
                <span className="find-title">{t('about.waTitle')} ↗</span>
                <span className="find-text">{t('about.waText')}</span>
              </a>
            ) : (
              <div className="find-card">
                <span className="find-label">{t('about.homeLabel')}</span>
                <span className="find-title">{t('about.homeTitle')}</span>
                <span className="find-text">{t('about.homeText')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
