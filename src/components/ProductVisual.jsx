import { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

/** Product photo with a branded placeholder when there's no (working) photo. */
export default function ProductVisual({ src, alt, gradient, className = '', eager = false }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        className={`visual ${className}`}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={`visual visual-empty ${className}`} role="img" aria-label={`${alt}: photo coming soon`}>
      <img src={`${BASE}logo-mark.webp`} alt="" className="visual-mark" />
      <span className="visual-note">Photo coming soon</span>
    </div>
  );
}
