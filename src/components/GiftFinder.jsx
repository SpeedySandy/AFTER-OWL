import { useMemo, useState } from 'react';
import { collectionProducts, findCollection } from '../data/collections.js';
import { addToBag, inBag } from '../lib/bag.js';
import { formatPrice } from '../lib/products.js';
import { useI18n } from '../i18n/index.jsx';
import ProductVisual from './ProductVisual.jsx';

// Answer index → what it means. Kept here rather than in the locale files so a
// translation can never change the behaviour, only the words.
const VIBE_COLLECTIONS = ['rave-ready', 'outdoor-mode', 'limited-editions', 'unique-gadgets', 'hide-and-stash'];
const BUDGETS = [[0, 5], [5, 15], [15, 30], [0, Infinity]];
// "someone who has everything" leans handmade; everyone else leans best-sellers.
const WHO_BOOST = [null, null, null, 'limited-editions'];

/**
 * Three questions, then a shortlist drawn from the live catalog. Everything it
 * suggests is in stock at the moment it answers — it filters real products
 * rather than reading from a hand-written list that goes stale.
 */
export default function GiftFinder({ products, bagItems, onSelect }) {
  const { t, tl } = useI18n();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([null, null, null]);

  const questions = [
    { key: 'q1', options: tl('gift.q1opts') },
    { key: 'q2', options: tl('gift.q2opts') },
    { key: 'q3', options: tl('gift.q3opts') },
  ];

  const results = useMemo(() => {
    if (answers.some(a => a === null)) return null;
    const [who, vibe, budget] = answers;
    const [min, max] = BUDGETS[budget];

    const vibeKeys = new Set(
      collectionProducts(products, findCollection(VIBE_COLLECTIONS[vibe]) || {}).map(p => p.key)
    );
    const boost = WHO_BOOST[who];
    const boostKeys = new Set(
      boost ? collectionProducts(products, findCollection(boost) || {}).map(p => p.key) : []
    );

    return products
      .filter(p => p.stock !== 0 && p.price != null && p.price >= min && p.price <= max)
      .map(p => ({
        p,
        score:
          (vibeKeys.has(p.key) ? 4 : 0) +
          (boostKeys.has(p.key) ? 2 : 0) +
          (p.images.length ? 1 : 0) +
          Math.min(p.sold, 3),
      }))
      .sort((a, b) => b.score - a.score || a.p.order - b.p.order)
      .slice(0, 6)
      .map(x => x.p);
  }, [answers, products]);

  const answer = i => {
    setAnswers(prev => prev.map((v, idx) => (idx === step ? i : v)));
    setStep(s => s + 1);
  };

  const reset = () => { setAnswers([null, null, null]); setStep(0); };

  return (
    <section id="gift-finder" className="gift" aria-labelledby="gift-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t('gift.eyebrow')}</p>
          <h2 id="gift-title">{t('gift.title')}</h2>
          <p className="section-sub">{t('gift.sub')}</p>
        </div>

        <div className="gift-box">
          {!results ? (
            <>
              <div className="gift-progress">
                <p className="gift-step">{t('gift.step', { n: step + 1 })}</p>
                <span className="gift-bar" aria-hidden="true">
                  <i style={{ width: `${(step / 3) * 100}%` }} />
                </span>
              </div>

              <h3 className="gift-q">{t(`gift.${questions[step].key}`)}</h3>
              <ul className="gift-opts">
                {questions[step].options.map((label, i) => (
                  <li key={label}>
                    <button onClick={() => answer(i)}>{label}</button>
                  </li>
                ))}
              </ul>

              {step > 0 && (
                <button className="gift-back" onClick={() => setStep(s => s - 1)}>← {t('gift.back')}</button>
              )}
            </>
          ) : (
            <>
              <div className="gift-results-head">
                <h3 className="gift-q">{results.length ? t('gift.results') : t('gift.none')}</h3>
                <button className="gift-again" onClick={reset}>{t('gift.again')}</button>
              </div>

              {results.length > 0 && (
                <ul className="gift-results">
                  {results.map(p => (
                    <li key={p.key}>
                      <button className="gift-result" onClick={() => onSelect(p)}>
                        <span className="gift-result-visual">
                          <ProductVisual src={p.image} alt="" gradient={p.gradient} />
                        </span>
                        <span className="gift-result-name">{p.name}</span>
                        <span className="gift-result-price">{formatPrice(p.price, p.priceMax)}</span>
                      </button>
                      <button
                        className="gift-add"
                        onClick={() => addToBag(p.key)}
                        aria-label={t('card.add', { name: p.name })}
                      >
                        {inBag(p.key, bagItems) ? '✓' : '+'}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
