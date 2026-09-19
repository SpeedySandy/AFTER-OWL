import { useSignup } from '../hooks/useSignup.js';
import { emailEnabled } from '../lib/subscribe.js';
import { useT } from '../i18n/index.jsx';

/**
 * One form for both the newsletter and the back-in-stock alerts.
 * Renders nothing at all when FORMSPREE_FORM_ID is unset, so the site never
 * ships a signup box that quietly drops addresses.
 */
export default function SignupForm({ list, product, cta, className = '', done, compact = false }) {
  const t = useT();
  const { email, setEmail, state, submit } = useSignup({ list, product });

  if (!emailEnabled()) return null;

  if (state === 'done') {
    return <p className={`signup-done ${className}`}>{done || t('news.done')}</p>;
  }

  return (
    <form className={`signup ${compact ? 'signup-compact' : ''} ${className}`} onSubmit={submit}>
      <label className="signup-field">
        <span className="sr-only">{t('news.placeholder')}</span>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t('news.placeholder')}
          autoComplete="email"
          inputMode="email"
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
        {cta || t('news.cta')}
      </button>
      {state === 'error' && <p className="signup-error">{t('news.error')}</p>}
    </form>
  );
}
