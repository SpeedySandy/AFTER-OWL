import { categoryIntro, collectionIntro } from '../data/content.js';
import { useI18n } from '../i18n/index.jsx';

/**
 * A paragraph above the grid when a category or collection is selected.
 * Filtering used to drop you straight into a wall of products with no words at
 * all — the one place on the page that said nothing about what you were looking
 * at, and the one place search engines had nothing to read.
 */
export default function CategoryIntro({ category, collectionKey }) {
  const { t, lang } = useI18n();

  const heading = collectionKey ? t(`collections.${collectionKey}.title`) : category;
  const short = collectionKey ? t(`collections.${collectionKey}.text`) : null;
  const long = collectionKey ? collectionIntro(collectionKey, lang) : categoryIntro(category, lang);

  if (!long && !short) return null;

  return (
    <div className="cat-intro">
      <h3 className="cat-intro-title">{heading}</h3>
      {short && <p className="cat-intro-lead">{short}</p>}
      {long && <p className="cat-intro-text">{long}</p>}
    </div>
  );
}
