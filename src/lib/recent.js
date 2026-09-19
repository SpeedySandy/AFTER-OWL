// Recently viewed products, newest first, capped. Helps a visitor find their way
// back to the piece they almost bought — the single most common reason people
// leave a shop and come back.

import { createStore } from './store.js';

const MAX = 8;
const store = createStore('ao_recent', []);

export const getRecent = store.get;
export const subscribeRecent = store.subscribe;
export const clearRecent = () => store.set([]);

export function pushRecent(key) {
  return store.update(keys => [key, ...keys.filter(k => k !== key)].slice(0, MAX));
}
