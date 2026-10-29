import { useI18n } from '../i18n/index.jsx';
import Icon from './Icon.jsx';

const ICONS = ['handmade', 'festival-tested', 'limited-editions', 'tested-by-the-og'];

export default function TrustBar() {
  const { tl } = useI18n();
  const items = tl('trust');

  return (
    <div className="trust">
      <ul className="container trust-inner">
        {items.map((label, i) => (
          <li key={label} className="trust-item">
            <span className="trust-icon" aria-hidden="true"><Icon name={ICONS[i] || 'first-light'} /></span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
