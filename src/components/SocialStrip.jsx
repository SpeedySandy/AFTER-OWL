import social from '../data/social.json';
import manifest from '../data/image-manifest.json';
import { driveThumb, INSTAGRAM_URL } from '../config.js';
import { useI18n } from '../i18n/index.jsx';

const BASE = import.meta.env.BASE_URL;
const local = new Set(manifest.files);
const src = id => (id.startsWith('http') ? id : local.has(id) ? `${BASE}img/${id}.webp` : driveThumb(id));

/**
 * Photos of the gear actually being used. Curated by hand in src/data/social.json
 * rather than pulled from an Instagram embed — no third-party script, no tracker,
 * and the strip keeps working when Instagram changes its embed rules again.
 */
export default function SocialStrip() {
  const { t } = useI18n();
  const posts = (social.posts || []).filter(p => p?.img);
  if (!posts.length) return null;

  return (
    <section className="ugc" aria-labelledby="ugc-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t('ugc.eyebrow')}</p>
          <h2 id="ugc-title">{t('ugc.title')}</h2>
          <p className="section-sub">{t('ugc.text')}</p>
        </div>
        <ul className="ugc-grid">
          {posts.map(post => (
            <li key={post.img}>
              <a href={post.url || INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <img src={src(post.img)} alt={post.alt || ''} loading="lazy" />
                {post.caption && <span className="ugc-caption">{post.caption}</span>}
              </a>
            </li>
          ))}
        </ul>
        <p className="ugc-cta">
          <a className="btn btn-ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{t('ugc.cta')} ↗</a>
        </p>
      </div>
    </section>
  );
}
