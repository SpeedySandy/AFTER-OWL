export default function StoryBanner() {
  return (
    <section className="story-banner" id="story">
      <div className="container story-inner">
        <div className="story-panel" aria-hidden="true">
          <div className="story-panel-glow" />
          <span className="story-panel-emoji">🦉</span>
        </div>
        <div className="story-content">
          <p className="section-eyebrow">From The Nest</p>
          <h2>Built for the wild nights and the mornings after</h2>
          <p className="story-text">
            AFTER OWL started in Barcelona out of a simple idea: festival and travel gear should be
            as fun, honest, and well-made as the nights it's built for. Every handmade piece is
            hand-poured, hand-airbrushed, or hand-assembled in small batches — no two are exactly alike.
          </p>
          <p className="story-text">
            The rest of the lineup gets road-tested at raves, pop-ups, and gatherings — including our
            own EMBRACE collective events — before it earns a spot in the shop. If it survives a
            festival weekend, it's good enough for yours.
          </p>
          <div className="story-badges">
            <span className="story-badge">🎨 Hand-poured resin art</span>
            <span className="story-badge">🎪 Road-tested at festivals</span>
            <span className="story-badge">🦉 EMBRACE collective</span>
          </div>
        </div>
      </div>
    </section>
  );
}
