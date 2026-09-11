import { useState } from 'react';
import { BRAND } from '../config.js';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="newsletter-thanks">
        🦉 Hoot hoot! You're on the list — see you in the next drop.
      </p>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button type="submit" className="btn btn-primary">Join the Flock</button>
    </form>
  );
}

export default function ConnectSection() {
  return (
    <section className="connect-section">
      <div className="container connect-grid">
        <div className="connect-panel connect-social">
          <p className="section-eyebrow">Find Us In The Wild</p>
          <h2>Stalk us online</h2>
          <p className="connect-text">
            New drops, behind-the-scenes resin pours, and festival sightings — it all lands on
            Instagram first. The full catalog (and a few Etsy-only exclusives) lives on Etsy.
          </p>
          <div className="connect-buttons">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="btn btn-outline">
              📷 Follow on Instagram
            </a>
            <a href={BRAND.etsy} target="_blank" rel="noreferrer" className="btn btn-primary">
              🛍️ Shop on Etsy
            </a>
          </div>
        </div>

        <div className="connect-panel connect-newsletter">
          <p className="section-eyebrow">Stay in the Loop</p>
          <h2>Join the Flock</h2>
          <p className="connect-text">
            First look at new handmade pieces, restocks, and where to find us next. No spam,
            just owls.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
