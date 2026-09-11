const ITEMS = [
  { icon: '🎨', label: 'Handmade in Barcelona' },
  { icon: '🎪', label: 'Festival-Tested Gear' },
  { icon: '✦',  label: 'Small-Batch & Limited' },
  { icon: '🤫', label: 'Secret Stash Approved' },
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner container">
        {ITEMS.map(item => (
          <div key={item.label} className="trust-item">
            <span className="trust-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
