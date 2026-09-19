// Email signups (newsletter + back-in-stock alerts) posted straight to Formspree.
// No backend, no third-party script on the page, no tracking: one fetch, on submit,
// only when the visitor typed an address and pressed the button.

import { formspreeUrl } from '../config.js';

export const emailEnabled = () => Boolean(formspreeUrl());

/**
 * @param {string} email
 * @param {object} extra  { list: 'newsletter' | 'restock', product?: string, lang?: string }
 */
export async function subscribe(email, extra = {}) {
  const url = formspreeUrl();
  if (!url) throw new Error('Email capture is not configured');

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, ...extra }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.errors?.[0]?.message || `Signup failed (${res.status})`);
  }
  return true;
}
