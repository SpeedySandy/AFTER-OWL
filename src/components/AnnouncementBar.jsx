import { useEffect, useState } from 'react';

const MESSAGES = [
  '🦉 Handmade in Barcelona. Most pieces are one of a kind',
  '🎪 Festival-tested. Owl-approved.',
  '🛍️ Shop online on Etsy: AfterOwlShop',
  '🤫 Psst… have you seen the Secret Stash collection?',
];

const KEY = 'ao_announce_dismissed';

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
  });

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => setIndex(i => (i + 1) % MESSAGES.length), 4500);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  const dismiss = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    setDismissed(true);
  };

  return (
    <div className="announce" role="status">
      <p className="announce-text" key={index}>{MESSAGES[index]}</p>
      <button className="announce-close" onClick={dismiss} aria-label="Dismiss announcement">✕</button>
    </div>
  );
}
