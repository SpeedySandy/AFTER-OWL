const LOGO_URL = 'https://drive.google.com/thumbnail?id=17FFya-sKK81YcaRqLw2_1WMwoV8S3gpx&sz=w200';

export default function Header({ search, onSearch, source }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="header-brand">
          <img
            src={LOGO_URL}
            alt="AFTER OWL"
            className="header-logo"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div className="header-logo-fallback" style={{ display: 'none' }}>🦉</div>
          <div>
            <div className="header-name">AFTER OWL</div>
            <div className="header-tagline">Gear Up. Owl Style.</div>
          </div>
        </a>

        <div className="header-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <div className="header-source">
          <div className={`source-dot ${source === 'local' ? 'local' : ''}`} />
          {source === 'sheets' ? 'Live from Google Sheets' : 'Local data'}
        </div>
      </div>
    </header>
  );
}
