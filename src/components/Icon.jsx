// AFTER OWL line icons (Web Kit v1.1). They replace the emoji the site used
// to lean on. Data files still carry their old emoji, so this maps them.
const BASE = import.meta.env.BASE_URL;

const FROM_EMOJI = {
  '🦉': 'owl-essentials', '🔥': 'rave-ready', '🌄': 'outdoor-mode', '💡': 'unique-gadgets',
  '🧭': 'hide-and-stash', '💎': 'limited-editions', '🎁': 'sets-and-gifts', '🎨': 'handmade',
  '🎪': 'festival-tested', '🚐': 'outdoor-mode', '✦': 'first-light', '🪩': 'crew', '🤫': 'hide-and-stash',
};

export const ICONS = new Set([
  'crew', 'festival-tested', 'first-light', 'handmade', 'hide-and-stash', 'limited-editions',
  'outdoor-mode', 'owl-essentials', 'rave-ready', 'sets-and-gifts', 'tested-by-the-og', 'unique-gadgets',
]);

export default function Icon({ name, emoji, size, className = '' }) {
  const n = ICONS.has(name) ? name : FROM_EMOJI[emoji] || FROM_EMOJI[name];
  if (!n) return null;
  return (
    <img
      src={`${BASE}icons/${n}.svg`}
      className={`ao-icon ${size === 'lg' ? 'ao-icon-lg' : ''} ${className}`}
      width={size === 'lg' ? 40 : 24}
      height={size === 'lg' ? 40 : 24}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  );
}
