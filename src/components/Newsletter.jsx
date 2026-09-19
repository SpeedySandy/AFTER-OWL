import SignupForm from './SignupForm.jsx';
import { emailEnabled } from '../lib/subscribe.js';
import { useI18n } from '../i18n/index.jsx';

export default function Newsletter() {
  const { t } = useI18n();
  if (!emailEnabled()) return null;

  return (
    <section className="news" aria-labelledby="news-title">
      <div className="container news-inner">
        <div className="news-copy">
          <p className="eyebrow">{t('news.eyebrow')}</p>
          <h2 id="news-title">{t('news.title')}</h2>
          <p>{t('news.text')}</p>
        </div>
        <div className="news-form">
          <SignupForm list="newsletter" />
          <p className="news-consent">{t('news.consent')}</p>
        </div>
      </div>
    </section>
  );
}
