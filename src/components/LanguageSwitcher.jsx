import { useEffect, useRef, useState } from 'react';
import { useI18n, LANGS, LOCALES } from '../i18n/index.jsx';

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = e => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`lang ${compact ? 'lang-compact' : ''}`} ref={ref}>
      <button
        className="lang-btn"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('nav.language')}
      >
        <span aria-hidden="true">{LOCALES[lang].meta.flag}</span>
        <span className="lang-code">{lang.toUpperCase()}</span>
        <svg viewBox="0 0 24 24" className="lang-caret" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {open && (
        <ul className="lang-menu" role="listbox" aria-label={t('nav.language')}>
          {LANGS.map(code => (
            <li key={code}>
              <button
                role="option"
                aria-selected={code === lang}
                className={code === lang ? 'is-active' : ''}
                onClick={() => { setLang(code); setOpen(false); }}
              >
                <span aria-hidden="true">{LOCALES[code].meta.flag}</span>
                {LOCALES[code].meta.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
