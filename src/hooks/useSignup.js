import { useState } from 'react';
import { subscribe } from '../lib/subscribe.js';

/** Shared submit state for the newsletter and notify-me forms. */
export function useSignup(extra = {}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done | error

  const submit = async e => {
    e.preventDefault();
    if (!email.trim() || state === 'sending') return;
    setState('sending');
    try {
      await subscribe(email.trim(), extra);
      setState('done');
      setEmail('');
    } catch {
      setState('error');
    }
  };

  return { email, setEmail, state, submit };
}
