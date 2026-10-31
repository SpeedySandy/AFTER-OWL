import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import Icon from './Icon.jsx';

const KEY = 'ao_welcome_v1';

/**
 * First-visit note: no cookie wall (the site sets no cookies of its own, so there
 * is nothing to consent to), just an honest heads-up plus "still under construction".
 */
export default function WelcomeNote({ onLegal }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = Boolean(localStorage.getItem(KEY)); } catch {}
    if (!seen) {
      const id = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(id);
    }
  }, []);

  if (!open) return null;

  const close = () => {
    try { localStorage.setItem(KEY, new Date().toISOString().slice(0, 10)); } catch {}
    setOpen(false);
  };

  return (
    <div className="welcome" role="dialog" aria-labelledby="welcome-title" aria-describedby="welcome-text">
      <div className="welcome-badge"><Icon name="owl-essentials" /> {t('welcome.badge')}</div>
      <p id="welcome-title" className="welcome-title">{t('welcome.title')}</p>
      <div id="welcome-text" className="welcome-text">
        <p>{t('welcome.build')}</p>
        <p>
          <strong>{t('welcome.cookieLead')}</strong> {t('welcome.cookie')}{' '}
          <a
            href={`${import.meta.env.BASE_URL}legal/cookies`}
            onClick={e => { if (onLegal) { e.preventDefault(); close(); onLegal('cookies'); } }}
          >
            {t('welcome.more')}
          </a>
        </p>
      </div>
      <button className="btn btn-primary welcome-btn" onClick={close}>{t('welcome.ok')}</button>
    </div>
  );
}
