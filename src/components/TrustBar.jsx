import { useI18n } from '../i18n/index.jsx';

const ICONS = ['🎨', '🎪', '✦', '🦉'];

export default function TrustBar() {
  const { tl } = useI18n();
  const items = tl('trust');

  return (
    <div className="trust">
      <ul className="container trust-inner">
        {items.map((label, i) => (
          <li key={label} className="trust-item">
            <span className="trust-icon" aria-hidden="true">{ICONS[i] || '✦'}</span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
