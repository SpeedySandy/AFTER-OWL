import { useState } from 'react';
import { WHATSAPP_NUMBER, whatsappUrl, INSTAGRAM_DM_URL } from '../config.js';

const TOPICS = ['Order or reservation', 'Question about a product', 'Pop-up, events & collabs', 'Custom or handmade piece', 'Something else'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', topic: TOPICS[0], product: '', message: '' });
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
          <p className="eyebrow">Contact us</p>
          <h2 id="contact-title">Talk to the owl</h2>
          <p>
            Questions about a piece, want to reserve something, planning a pop-up or dreaming up a custom
            work? Send us a message. The form opens WhatsApp with everything filled in, you just hit send.
          </p>
          <p className="contact-alt">
            Prefer Instagram? <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer">DM us @after.owl.shop ↗</a>
          </p>
        </div>

        {WHATSAPP_NUMBER ? (
          <form className="contact-form" onSubmit={submit}>
            <label>
              <span>Your name</span>
              <input required value={form.name} onChange={set('name')} placeholder="Night Owl" autoComplete="name" />
            </label>
            <label>
              <span>What’s it about?</span>
              <select value={form.topic} onChange={set('topic')}>
                {TOPICS.map(t => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label>
              <span>Product (optional)</span>
              <input value={form.product} onChange={set('product')} placeholder="e.g. Secret Stash Belt" />
            </label>
            <label>
              <span>Message</span>
              <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Tell us what you need…" />
            </label>
            <button type="submit" className="btn btn-primary btn-whatsapp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" fill="currentColor" /></svg>
              Send via WhatsApp
            </button>
            {sent && <p className="contact-note">WhatsApp should have opened in a new tab. If not, check your pop-up blocker 🦉</p>}
          </form>
        ) : (
          <div className="contact-form contact-fallback">
            <p>Message us on Instagram, we usually reply the same day.</p>
            <a className="btn btn-primary" href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer">DM on Instagram</a>
          </div>
        )}
      </div>
    </section>
  );
}
