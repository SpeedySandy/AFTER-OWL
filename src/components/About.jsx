import about from '../data/about.json';
import manifest from '../data/image-manifest.json';
import { driveThumb } from '../config.js';

const BASE = import.meta.env.BASE_URL;
const local = new Set(manifest.files);
const img = id => (local.has(id) ? `${BASE}img/${id}.webp` : driveThumb(id));

const COLLECTIONS = [
  {
    icon: '🦉',
    title: 'OWL ESSENTIALS',
    text: 'Our best-sellers — the must-have pieces that define the AFTER OWL lifestyle.',
  },
  {
    icon: '🔥',
    title: 'RAVE READY',
    text: 'Everything you need for the ultimate night out — compact, smart, and stylish.',
    tags: ['Sniff Tools', 'Stylish Accessories', 'Dancefloor Gear', 'Festival Kits', 'Secret Wearables'],
  },
  {
    icon: '🌄',
    title: 'OUTDOOR MODE',
    text: 'Your van-life & adventure essentials for day trips and road missions.',
    tags: ['Camping Gear', 'Travel Gadgets', 'Outdoor Tools', 'LED Lights', 'Hammocks'],
  },
  {
    icon: '💡',
    title: 'UNIQUE GADGETS',
    text: 'Smart, playful, or practical gadgets & tools that fit your vibe.',
    tags: ['Party Fun', 'Games', 'Multi-tools', 'Sound & Lights', 'Electronics'],
  },
  {
    icon: '🧭',
    title: 'HIDE & STASH',
    text: 'The discreet collection — secret storage, stash tools, and diversion items.',
    tags: ['Hidden Containers', 'Stash Flasks', 'Magnetic Hideouts', 'Necklace Pouches'],
  },
  {
    icon: '💎',
    title: 'LIMITED EDITIONS',
    text: 'Handmade & collab drops — rare, numbered, or artist-made pieces.',
    tags: ['AFTER OWL Merch', 'Custom Prints', 'Unique Deco Items', 'Custom Works'],
  },
  {
    icon: '🎁',
    title: 'SETS & GIFTS',
    text: 'Curated packs made for gifting or gearing up fast.',
    tags: ['Festival Starter Set', 'Outdoor Adventure Kit', 'Party Princess Bundle', 'Mystery Box'],
  },
];

export default function About() {
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

        <div className="about-intro">
          <div className="about-copy">
            <h3 className="about-h3">🌌 Our Story</h3>
            <p>
              AFTER OWL is more than a shop — it’s a lifestyle for the 24/7 explorer. Born from the fusion
              of rave culture, outdoor adventure, and smart innovation, we curate high-quality, affordable
              gear for those who dance all night and chase horizons by dawn.
            </p>
            <p>
              Every piece in our collection is tested in the wild and trusted in the night, ensuring it’s
              functional, durable, and full of personality. Our mission is simple: to empower adventurous
              souls and night owls with reliable, exciting gear for every journey — from underground raves
              to mountaintop sunrises.
            </p>
          </div>
          <figure className="about-hero">
            <img src={img(about.hero)} alt="The AFTER OWL disco owl glowing green in front of a laser-lit DJ booth" loading="lazy" />
          </figure>
        </div>

        <div className="find">
          <h3 className="about-h3">⚡ What You’ll Find</h3>
          <div className="collections">
            {COLLECTIONS.map(c => (
              <article key={c.title} className="collection">
                <span className="collection-icon" aria-hidden="true">{c.icon}</span>
                <h4 className="collection-title">{c.title}</h4>
                <p className="collection-text">{c.text}</p>
                {c.tags && (
                  <ul className="collection-tags">
                    {c.tags.map(t => <li key={t}>{t}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="promise">
          <h3 className="about-h3">✨ Our Promise</h3>
          <p>
            Every item is field-tested before it makes the cut — no hype, just honest gear that works.
          </p>
          <p>
            Built for nightlife dreamers, sunrise seekers, and curious explorers, AFTER OWL stands for
            wisdom, authenticity, and movement — a symbol of freedom that never sleeps.
          </p>
          <p className="promise-sign grad-text">Gear Up. Owl Style.</p>
        </div>

        <div className="about-gallery" aria-label="AFTER OWL pop-up impressions">
          {about.popup.map((id, i) => (
            <img key={id} src={img(id)} alt={`AFTER OWL pop-up store, photo ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
