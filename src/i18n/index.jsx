import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import es from './es.js';
import de from './de.js';

// ─── Languages ──────────────────────────────────────────────────────────────
// Adding a fourth language = drop a file next to this one and add it here.
// Missing keys fall back to English, so a half-finished translation is safe.
export const LOCALES = { en, es, de };
export const LANGS = Object.keys(LOCALES);
export const DEFAULT_LANG = 'en';

const STORAGE_KEY = 'ao_lang';

/** ?lang=de → localStorage → browser language → English. */
function detectLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && LANGS.includes(fromUrl)) return fromUrl;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGS.includes(stored)) return stored;
    for (const nav of navigator.languages || [navigator.language]) {
      const short = String(nav || '').slice(0, 2).toLowerCase();
      if (LANGS.includes(short)) return short;
    }
  } catch {}
  return DEFAULT_LANG;
}

function lookup(dict, path) {
  return path.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), dict);
}

/** Replaces {name} placeholders. Numbers are left alone so "0" still renders. */
function fill(template, vars) {
  if (typeof template !== 'string' || !vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = useCallback(next => {
    if (!LANGS.includes(next)) return;
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    setLangState(next);
    // keep ?lang= in the URL so a shared link carries the language
    const url = new URL(window.location.href);
    if (next === DEFAULT_LANG) url.searchParams.delete('lang');
    else url.searchParams.set('lang', next);
    window.history.replaceState({}, '', url);
  }, []);

  useEffect(() => {
    document.documentElement.lang = LOCALES[lang]?.meta?.htmlLang || lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = LOCALES[lang] || LOCALES[DEFAULT_LANG];

    /** t('hero.title') · t('card.onlyLeft', { count: 2 }) · returns the key if missing. */
    const t = (path, vars) => {
      const hit = lookup(dict, path);
      const value = hit === undefined ? lookup(LOCALES[DEFAULT_LANG], path) : hit;
      if (value === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${path}`);
        return path;
      }
      return typeof value === 'string' ? fill(value, vars) : value;
    };

    /** Arrays and objects straight out of the dictionary (FAQ items, pillars, …). */
    const tl = path => {
      const hit = lookup(dict, path);
      return hit === undefined ? lookup(LOCALES[DEFAULT_LANG], path) ?? [] : hit;
    };

    return { lang, setLang, t, tl, meta: dict.meta };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

/** Shorthand for components that only need the translate function. */
export function useT() {
  return useI18n().t;
}
