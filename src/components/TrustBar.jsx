const ITEMS = [
  { icon: '🎨', label: 'Handmade in Barcelona' },
  { icon: '🎪', label: 'Festival-tested gear' },
  { icon: '✦', label: 'Small batches & limited drops' },
  { icon: '🦉', label: 'Tested by the OG AFTER OWL' },
];

export default function TrustBar() {
  return (
    <div className="trust">
      <ul className="container trust-inner">
        {ITEMS.map(item => (
          <li key={item.label} className="trust-item">
            <span className="trust-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
