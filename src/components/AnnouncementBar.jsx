import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';

const KEY = 'ao_announce_dismissed';

export default function AnnouncementBar() {
  const { t, tl } = useI18n();
  const messages = tl('announce');
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
  });

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => setIndex(i => (i + 1) % messages.length), 4500);
    return () => clearInterval(id);
  }, [dismissed, messages.length]);

  if (dismissed) return null;

  const dismiss = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    setDismissed(true);
  };

  return (
    <div className="announce" role="status">
      <p className="announce-text" key={`${index}-${messages[0]}`}>{messages[index % messages.length]}</p>
      <button className="announce-close" onClick={dismiss} aria-label={t('announceDismiss')}>✕</button>
    </div>
  );
}
