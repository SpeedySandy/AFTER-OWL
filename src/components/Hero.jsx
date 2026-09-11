const BASE = import.meta.env.BASE_URL;

export default function Hero({ productCount }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Barcelona · Since 2025</p>
          <h1 id="hero-title">
            Tested in the wild.<br />
            <span className="grad-text">Trusted in the night.</span>
          </h1>
          <p className="hero-sub">
            Curated and handmade gear for ravers, adventurers and night owls, from underground
            dancefloors to mountaintop sunrises.
          </p>
          <div className="hero-actions">
            <a href="#shop" className="btn btn-primary">Shop the collection</a>
            <a href="#about" className="btn btn-ghost">Our story</a>
          </div>
          <ul className="hero-facts">
            <li><strong>{productCount}</strong> pieces in the showroom</li>
            <li><strong>100%</strong> tested by the OG AFTER OWL</li>
          </ul>
        </div>
        <div className="hero-art">
          <img src={`${BASE}logo.webp`} alt="AFTER OWL logo: a neon owl flying through a crescent moon" width="500" height="500" />
        </div>
      </div>
    </section>
  );
}
