import reviewData from '../data/reviews.json';
import { ETSY_SHOP_URL } from '../config.js';
import { useI18n } from '../i18n/index.jsx';

const stars = n => '★★★★★'.slice(0, Math.max(0, Math.min(5, Math.round(n))));

/**
 * Real Etsy reviews, copied verbatim into src/data/reviews.json.
 * Ships empty on purpose: an invented testimonial is a lie to a customer, and
 * a fake rating in structured data is something Google penalises shops for.
 */
export default function Reviews() {
  const { t } = useI18n();
  const reviews = (reviewData.reviews || []).filter(r => r?.text && r?.author);
  if (!reviews.length) return null;

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t('reviews.eyebrow')}</p>
          <h2 id="reviews-title">{t('reviews.title')}</h2>
        </div>
        <ul className="reviews-list">
          {reviews.map(r => (
            <li key={`${r.author}-${r.text.slice(0, 20)}`} className="review">
              {r.rating && <p className="review-stars" aria-label={`${r.rating}/5`}>{stars(r.rating)}</p>}
              <blockquote>{r.text}</blockquote>
              <p className="review-author">
                {r.author}
                {r.product && <span className="review-product"> · {r.product}</span>}
                <span className="review-source"> · {t('reviews.source')}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="reviews-cta">
          <a href={`${ETSY_SHOP_URL}#reviews`} target="_blank" rel="noreferrer">{t('reviews.cta')} ↗</a>
        </p>
      </div>
    </section>
  );
}
