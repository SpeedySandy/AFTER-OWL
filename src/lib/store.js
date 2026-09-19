// A tiny localStorage-backed reactive store. Used by the bag and the
// recently-viewed list. Everything stays on the visitor's own device: this site
// has no backend and no accounts, and private browsing must not break it — so
// every read and write is wrapped and falls back to memory.

export function createStore(key, fallback) {
  const listeners = new Set();
  let memory = null;

  function read() {
    if (memory !== null) return memory;
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : fallback;
      memory = parsed ?? fallback;
    } catch {
      memory = fallback;
    }
    return memory;
  }

  function write(next) {
    memory = next;
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
    listeners.forEach(fn => fn(next));
    return next;
  }

  return {
    get: read,
    set: write,
    update: fn => write(fn(read())),
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
