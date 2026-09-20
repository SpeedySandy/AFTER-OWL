import { LEGAL_UPDATED } from '../data/legal.js';
import { pick } from '../data/content.js';
import { useI18n } from '../i18n/index.jsx';

/** One legal document, as its own page at /legal/<key>. Plain text, no cleverness. */
export default function LegalView({ doc, onBack }) {
  const { t, lang } = useI18n();
  const date = new Date(LEGAL_UPDATED).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="legal-view">
      <div className="container">
        <button className="guide-back" onClick={onBack}>← {t('legal.back')}</button>

        <header className="legal-head">
          <p className="eyebrow">{t('legal.eyebrow')}</p>
          <h1>{pick(doc.title, lang)}</h1>
          <p className="legal-lead">{pick(doc.intro, lang)}</p>
          <p className="legal-updated">{t('legal.updated', { date })}</p>
        </header>

        {doc.sections.map((section, i) => (
          <section className="legal-section" key={i}>
            <h2>{pick(section.h, lang)}</h2>
            {(pick(section.body, lang)() || []).map((line, j) => <p key={j}>{line}</p>)}
          </section>
        ))}
      </div>
    </article>
  );
}
