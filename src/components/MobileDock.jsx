import { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER, INSTAGRAM_DM_URL, whatsappUrl } from '../config.js';
import { useI18n } from '../i18n/index.jsx';

/** Thumb-reach bar for phones: search, gift finder, bag and chat, one tap each. */
export default function MobileDock({ bagCount = 0, onOpenBag }) {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goSearch = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.querySelector('.search input')?.focus({ preventScroll: true }), 450);
  };
  const goGifts = () => document.getElementById('gift-finder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const chatUrl = WHATSAPP_NUMBER ? whatsappUrl('Hey AFTER OWL 🦉') : INSTAGRAM_DM_URL;

  return (
    <nav className={`mobile-dock ${show ? 'is-visible' : ''}`} aria-label={t('dock.label')}>
      <button onClick={goSearch}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <span>{t('dock.search')}</span>
      </button>
      <button onClick={goGifts}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11h16v9H4z" /><path d="M2 7h20v4H2zM12 7v13" /><path d="M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0" /></svg>
        <span>{t('dock.gifts')}</span>
      </button>
      <button onClick={onOpenBag} className="dock-bag">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
        <span>{t('dock.bag')}</span>
        {bagCount > 0 && <b className="dock-count">{bagCount}</b>}
      </button>
      <a href={chatUrl} target="_blank" rel="noreferrer" className="dock-chat">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.4-4A8 8 0 1 1 8 18.6z" /></svg>
        <span>{t('dock.chat')}</span>
      </a>
    </nav>
  );
}
