import { useState } from 'react';
import { WHATSAPP_NUMBER, whatsappUrl, INSTAGRAM_DM_URL } from '../config.js';
import { useI18n } from '../i18n/index.jsx';

export default function Contact() {
  const { t, tl } = useI18n();
  const topics = tl('contact.topics');
  const [form, setForm] = useState({ name: '', topic: topics[0], product: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    const text = [
      'Hey AFTER OWL 🦉',
      '',
      `Name: ${form.name.trim()}`,
      `Topic: ${form.topic}`,
      form.product.trim() ? `Product: ${form.product.trim()}` : null,
      '',
      form.message.trim(),
    ].filter(line => line !== null).join('\n');
    window.open(whatsappUrl(text), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2 id="contact-title">{t('contact.title')}</h2>
          <p>{t('contact.text')}</p>
          <p className="contact-alt">
            {t('contact.altA')}{' '}
            <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer">{t('contact.altB')} ↗</a>
          </p>
        </div>

        {WHATSAPP_NUMBER ? (
          <form className="contact-form" onSubmit={submit}>
            <label>
              <span>{t('contact.name')}</span>
              <input required value={form.name} onChange={set('name')} placeholder={t('contact.namePlaceholder')} autoComplete="name" />
            </label>
            <label>
              <span>{t('contact.topic')}</span>
              <select value={form.topic} onChange={set('topic')}>
                {topics.map(topic => <option key={topic}>{topic}</option>)}
              </select>
            </label>
            <label>
              <span>{t('contact.product')}</span>
              <input value={form.product} onChange={set('product')} placeholder={t('contact.productPlaceholder')} />
            </label>
            <label>
              <span>{t('contact.message')}</span>
              <textarea required rows={5} value={form.message} onChange={set('message')} placeholder={t('contact.messagePlaceholder')} />
            </label>
            <button type="submit" className="btn btn-primary btn-whatsapp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" fill="currentColor" /></svg>
              {t('contact.send')}
            </button>
            {sent && <p className="contact-note">{t('contact.sent')}</p>}
          </form>
        ) : (
          <div className="contact-form contact-fallback">
            <p>{t('contact.fallback')}</p>
            <a className="btn btn-primary" href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer">{t('contact.fallbackCta')}</a>
          </div>
        )}
      </div>
    </section>
  );
}
