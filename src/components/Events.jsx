import about from '../data/about.json';
import manifest from '../data/image-manifest.json';
import { driveThumb, INSTAGRAM_URL } from '../config.js';
import { splitEvents, formatEventDate } from '../lib/events.js';
import { useI18n } from '../i18n/index.jsx';

const BASE = import.meta.env.BASE_URL;
const local = new Set(manifest.files);
const img = id => (local.has(id) ? `${BASE}img/${id}.webp` : driveThumb(id));

/** Where to actually meet the owl. Edit src/data/events.json to change this. */
export default function Events() {
  const { t, lang } = useI18n();
  const { upcoming, past } = splitEvents();

  return (
    <section id="events" className="events" aria-labelledby="events-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t('events.eyebrow')}</p>
          <h2 id="events-title">{t('events.title')}</h2>
          <p className="section-sub">{t('events.text')}</p>
        </div>

        <div className="events-grid">
          <div className="events-list">
            {upcoming.length ? (
              <ol>
                {upcoming.map(e => (
                  <li key={`${e.date}-${e.title}`} className="event">
                    <time className="event-date" dateTime={e.date}>
                      <span className="event-day">{e.when.toLocaleDateString(lang, { day: '2-digit' })}</span>
                      <span className="event-month">{e.when.toLocaleDateString(lang, { month: 'short' })}</span>
                    </time>
                    <div className="event-body">
                      <h3 className="event-title">{e.title}</h3>
                      <p className="event-place">{e.place}</p>
                    </div>
                    {e.url && (
                      <a className="event-link" href={e.url} target="_blank" rel="noreferrer">
                        {t('events.directions')} ↗
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="events-none">
                {t('events.none')}{' '}
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@after.owl.shop ↗</a>
              </p>
            )}

            {past.length > 0 && (
              <div className="events-past">
                <p className="events-past-title">{t('events.past')}</p>
                <ul>
                  {past.map(e => (
                    <li key={`${e.date}-${e.title}`}>
                      <span>{formatEventDate(e.when, lang)}</span> {e.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="popup-grid">
            {about.popup.map((id, i) => (
              <img key={id} src={img(id)} alt={t('about.popupAlt', { n: i + 1 })} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
