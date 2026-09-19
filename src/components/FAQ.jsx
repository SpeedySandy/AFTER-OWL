import { useEffect, useState } from 'react';
import { ETSY_SHOP_URL, WHATSAPP_NUMBER, whatsappUrl, INSTAGRAM_DM_URL } from '../config.js';
import { useI18n } from '../i18n/index.jsx';

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="faq-a">{a}</p>}
    </div>
  );
}

export default function FAQ() {
  const { t, tl, lang } = useI18n();
  const items = tl('faq.items');
  const [openIndex, setOpenIndex] = useState(0);
  const askUrl = WHATSAPP_NUMBER ? whatsappUrl('Hey AFTER OWL 🦉') : INSTAGRAM_DM_URL;

  // FAQPage structured data — this is what wins the expandable answers in Google.
  useEffect(() => {
    const el = document.getElementById('ld-faq') || Object.assign(document.createElement('script'), { id: 'ld-faq', type: 'application/ld+json' });
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    if (!el.parentNode) document.head.appendChild(el);
  }, [items, lang]);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{t('faq.eyebrow')}</p>
          <h2 id="faq-title">{t('faq.title')}</h2>
          <p className="section-sub">
            {t('faq.subA')}{' '}
            <a href={askUrl} target="_blank" rel="noreferrer">
              {WHATSAPP_NUMBER ? t('faq.subAsk') : t('faq.subAskIg')}
            </a>{' '}
            {t('faq.subB')}{' '}
            <a href={ETSY_SHOP_URL} target="_blank" rel="noreferrer">Etsy</a>.
          </p>
        </header>

        <div className="faq-list">
          {items.map((item, i) => (
            <FAQItem
              key={item.q}
              {...item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
