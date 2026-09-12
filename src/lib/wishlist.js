// Lightweight "save for later" list, kept in the browser only (localStorage).
// No account system on this site, so this is per-device — good enough for
// "come back and buy this later" without adding a backend.

const KEY = 'ao_saved';
const listeners = new Set();

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(keys) {
  try { localStorage.setItem(KEY, JSON.stringify(keys)); } catch {}
  listeners.forEach(fn => fn(keys));
}

export function getSaved() {
  return read();
}

export function isSaved(key) {
  return read().includes(key);
}

export function toggleSaved(key) {
  const current = read();
  const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key];
  write(next);
  return next.includes(key);
}

export function subscribeSaved(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
