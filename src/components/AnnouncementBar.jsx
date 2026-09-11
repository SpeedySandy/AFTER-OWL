import { useEffect, useState } from 'react';
import { BRAND } from '../config.js';

const MESSAGES = [
  '🦉 Handmade in Barcelona — every piece one of a kind',
  '🎪 Festival-tested. Owl-approved.',
  `🛍️ Also on Etsy — ${BRAND.etsy.replace('https://www.etsy.com/shop/', '')}`,
  '🤫 Psst… check out the Secret Stash collection',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('ao_announce_dismissed') === '1');

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => setIndex(i => (i + 1) % MESSAGES.length), 4200);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  function dismiss() {
    sessionStorage.setItem('ao_announce_dismissed', '1');
    setDismissed(true);
  }

  return (
    <div className="announce-bar" role="status">
      <div className="announce-track" key={index}>
        {MESSAGES[index]}
      </div>
      <button className="announce-close" onClick={dismiss} aria-label="Dismiss announcement">✕</button>
    </div>
  );
}
