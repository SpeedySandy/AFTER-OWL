import about from '../data/about.json';
import manifest from '../data/image-manifest.json';
import { driveThumb, ETSY_SHOP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config.js';

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
    text: 'Cheeky designs, fair prices and a community that shows up at pop-ups, parties and festival camps. Gear up, owl style.',
  },
];

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-intro">
          <div className="about-copy">
            <p className="eyebrow">About AFTER OWL</p>
            <h2 id="about-title">Born after dark.<br /><span className="grad-text">Built for the morning after.</span></h2>
            <p>
              AFTER OWL was born out of broken festival gear and the wrong tools on the wrong hikes.
              Instead of accepting it, Sandro, the OG AFTER OWL, started hunting down (and making)
              gear that actually survives the night and still works at sunrise.
            </p>
            <p>
              The name says it all. The <strong>night owl</strong> thrives on underground dancefloors
              and late-night festival fields. The <strong>after</strong> is everything that follows:
              the afterhours, the sunrise hike, the next adventure. Owls stand for wisdom and sharp
              senses, which is exactly how we pick our gear.
            </p>
            <p>
              Today AFTER OWL is a curated, Barcelona-based shop for festival nomads, urban explorers,
              tech seekers and anyone who dances at night and hikes at dawn. Some pieces are handpicked,
              some are handmade, and all of them are tested.
            </p>
          </div>
          <figure className="about-hero">
            <img src={img(about.hero)} alt="The AFTER OWL disco owl glowing green in front of a laser-lit DJ booth" loading="lazy" />
            <figcaption>The OG AFTER OWL, on duty.</figcaption>
          </figure>
        </div>

        <blockquote className="mission">
          <p>“To empower adventurous souls and night owls with reliable, exciting gear for every journey, from underground raves to mountaintop sunrises.”</p>
          <cite>Our mission</cite>
        </blockquote>

        <div className="pillars">
          {PILLARS.map(p => (
            <article key={p.title} className="pillar">
              <span className="pillar-icon" aria-hidden="true">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className="popup">
          <div className="popup-head">
            <p className="eyebrow">Catch us IRL</p>
            <h3>The AFTER OWL pop-up</h3>
            <p>We set up shop at parties, retreats and festival camps, including EMBRACE Collective gatherings. Come say hi, try the gear and take your favourite piece home.</p>
          </div>
          <div className="popup-grid">
            {about.popup.map((id, i) => (
              <img key={id} src={img(id)} alt={`AFTER OWL pop-up store table, photo ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>

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
          <div className="find-card">
            <span className="find-label">Home base</span>
            <span className="find-title">Barcelona, Spain</span>
            <span className="find-text">Where the owl sleeps (sometimes).</span>
          </div>
        </div>
      </div>
    </section>
  );
}
