import about from '../data/about.json';
import manifest from '../data/image-manifest.json';
import { COLLECTIONS } from '../data/collections.js';
import { driveThumb, ETSY_SHOP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_NUMBER, whatsappUrl } from '../config.js';

const BASE = import.meta.env.BASE_URL;
const local = new Set(manifest.files);
const img = id => (local.has(id) ? `${BASE}img/${id}.webp` : driveThumb(id));

const PILLARS = [
  {
    icon: '🦉',
    title: 'Tested in the wild',
    text: 'Nothing lands in the shop until the OG AFTER OWL has taken it through Berlin techno weekends, Amsterdam house nights and five-day festival missions.',
  },
  {
    icon: '✦',
    title: 'Handmade in Barcelona',
    text: 'Resin trays, trinket boxes and art plates are made by hand in tiny runs. Most are one of a kind, and once they’re gone, they’re gone.',
  },
  {
    icon: '🪩',
    title: 'Made for the crew',
    text: 'Cheeky designs, fair prices and a community that shows up at pop-ups, parties and festival camps.',
  },
];

export default function About({ collections = [], onCollection }) {
  const counts = Object.fromEntries(collections.map(c => [c.key, c.items.length]));

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <header className="about-head">
          <p className="eyebrow">About</p>
          <h2 id="about-title">
            AFTER OWL ONLINE SHOP<br />
            <span className="grad-text">GEAR UP. OWL STYLE.</span>
          </h2>
          <p className="about-lead">From underground raves to mountaintop sunrises — Gear Up, Owl Style.</p>
        </header>

        {/* 1 · Mission */}
        <blockquote className="mission">
          <p>“To empower adventurous souls and night owls with reliable, exciting gear for every journey — from underground raves to mountaintop sunrises.”</p>
          <cite>🎯 Our Mission</cite>
        </blockquote>

        {/* 2 · What you'll find */}
        <div className="find">
          <h3 className="about-h3">⚡ What You’ll Find</h3>
          <div className="collections">
            {COLLECTIONS.map(c => (
              <article key={c.key} className="collection">
                <span className="collection-icon" aria-hidden="true">{c.icon}</span>
                <h4 className="collection-title">{c.title}</h4>
                <p className="collection-text">{c.text}</p>
                {c.tags && (
                  <ul className="collection-tags">
                    {c.tags.map(t => <li key={t}>{t}</li>)}
                  </ul>
                )}
                {counts[c.key] > 0 && (
                  <button className="collection-link" onClick={() => onCollection?.(c.key)}>
                    Shop {counts[c.key]} {counts[c.key] === 1 ? 'piece' : 'pieces'} →
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* 3 · Our promise */}
        <div className="promise">
          <h3 className="about-h3">✨ Our Promise</h3>
          <p>
            Every item is field-tested before it makes the cut — no hype, just honest gear that works.
          </p>
          <p>
            Built for nightlife dreamers, sunrise seekers, and curious explorers, AFTER OWL stands for
            wisdom, authenticity, and movement — a symbol of freedom that never sleeps.
          </p>
        </div>
        <div className="pillars">
          {PILLARS.map(p => (
            <article key={p.title} className="pillar">
              <span className="pillar-icon" aria-hidden="true">{p.icon}</span>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        {/* 4 · Our story */}
        <div className="about-intro">
          <div className="about-copy">
            <h3 className="about-h3">🌌 Our Story</h3>
            <p>
              AFTER OWL is more than a shop — it’s a lifestyle for the 24/7 explorer. Born from the fusion
              of rave culture, outdoor adventure, and smart innovation, we curate high-quality, affordable
              gear for those who dance all night and chase horizons by dawn.
            </p>
            <p>
              It all started with festival gear that gave up on day two and the wrong tools on the wrong
              hikes. So Sandro, the OG AFTER OWL, started hunting down (and making) gear that actually
              survives the night and still works at sunrise.
            </p>
            <p>
              The name says it all. The <strong>night owl</strong> thrives on underground dancefloors and
              late-night festival fields. The <strong>after</strong> is everything that follows: the
              afterhours, the sunrise hike, the next adventure. That’s why every piece in our collection is
              tested in the wild and trusted in the night: functional, durable, and full of personality.
            </p>
          </div>
          <figure className="about-hero">
            <img src={img(about.hero)} alt="The AFTER OWL disco owl glowing green in front of a laser-lit DJ booth" loading="lazy" />
          </figure>
        </div>

        {/* 5 · Catch us */}
        <div className="popup">
          <div className="popup-head">
            <p className="eyebrow">Catch us IRL</p>
            <h3 className="about-h3">🎪 The AFTER OWL pop-up</h3>
            <p>We set up shop at parties, retreats and festival camps, including EMBRACE Collective gatherings. Come say hi, try the gear and take your favourite piece home.</p>
          </div>
          <div className="popup-grid">
            {about.popup.map((id, i) => (
              <img key={id} src={img(id)} alt={`AFTER OWL pop-up store, photo ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>

        {/* 6 · Where to buy */}
        <div className="where">
          <h3 className="about-h3">🛍️ Where to Buy</h3>
          <div className="find-us">
            <a className="find-card" href={ETSY_SHOP_URL} target="_blank" rel="noreferrer">
              <span className="find-label">Shop online</span>
              <span className="find-title">Etsy · AfterOwlShop ↗</span>
              <span className="find-text">Secure checkout, shipped straight from Barcelona.</span>
            </a>
            <a className="find-card" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <span className="find-label">Say hi</span>
              <span className="find-title">Instagram · @{INSTAGRAM_HANDLE} ↗</span>
              <span className="find-text">New drops, pop-up dates and DMs for anything not listed on Etsy.</span>
            </a>
            {WHATSAPP_NUMBER ? (
              <a className="find-card" href={whatsappUrl('Hey AFTER OWL 🦉')} target="_blank" rel="noreferrer">
                <span className="find-label">Order direct</span>
                <span className="find-title">WhatsApp ↗</span>
                <span className="find-text">Reserve a piece, ask about stock or pick up in Barcelona.</span>
              </a>
            ) : (
              <div className="find-card">
                <span className="find-label">Home base</span>
                <span className="find-title">Barcelona, Spain</span>
                <span className="find-text">Where the owl sleeps (sometimes).</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
