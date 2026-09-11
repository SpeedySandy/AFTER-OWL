import { useState } from 'react';
import { ETSY_SHOP_URL, WHATSAPP_NUMBER, whatsappUrl, INSTAGRAM_DM_URL } from '../config.js';

const FAQS = [
  {
    q: 'Do you ship outside Barcelona?',
    a: 'Yes. Everything listed on Etsy ships worldwide from Barcelona, tracked, in 1–3 business days. If you\'re local, pickup at a pop-up or a meet-up can usually be arranged instead of shipping — just ask.',
  },
  {
    q: 'Can I pick up in Barcelona instead of paying for shipping?',
    a: 'Absolutely. Message us on WhatsApp or Instagram with the piece you want and we\'ll figure out a time and spot, often at whatever pop-up or party we\'re at that week.',
  },
  {
    q: 'How long does a custom or handmade piece take?',
    a: 'Handmade Limited Edition pieces (resin trays, art plates and one-of-a-kind builds) are usually ready in 1–3 weeks depending on the queue. We\'ll give you a real estimate as soon as you reach out.',
  },
  {
    q: 'What if a product I want shows "Sold out" or "Ask for availability"?',
    a: 'Stock updates live from our inventory, so "Sold out" is accurate. "Ask for availability" usually means it\'s a small-batch or made-to-order piece — message us and we\'ll confirm.',
  },
  {
    q: 'Can I return or exchange something?',
    a: 'If a piece arrives damaged or isn\'t what was described, message us within 7 days and we\'ll sort it out — replacement, exchange or refund. Handmade one-of-a-kind pieces are sold as shown, so check photos closely before ordering.',
  },
  {
    q: 'Do you sell at markets or festivals, or just online?',
    a: 'Both. Beyond the Etsy shop, we set up pop-ups at parties, retreats and festival camps around Barcelona — check Instagram for the next date, or ask us directly.',
  },
];

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
  const [openIndex, setOpenIndex] = useState(0);
  const askUrl = WHATSAPP_NUMBER ? whatsappUrl('Hey AFTER OWL 🦉 quick question:') : INSTAGRAM_DM_URL;

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Good to know</p>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p className="section-sub">
            Still stuck? <a href={askUrl} target="_blank" rel="noreferrer">
              {WHATSAPP_NUMBER ? 'Ask us on WhatsApp' : 'DM us on Instagram'}
            </a> or browse the full shop on{' '}
            <a href={ETSY_SHOP_URL} target="_blank" rel="noreferrer">Etsy</a>.
          </p>
        </header>

        <div className="faq-list">
          {FAQS.map((item, i) => (
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
