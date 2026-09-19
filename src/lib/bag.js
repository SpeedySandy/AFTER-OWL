// The "owl bag" — an enquiry basket, not a checkout.
//
// There is no payment system on this site and there isn't going to be one:
// orders happen in a WhatsApp conversation. What was missing was a way to ask
// about more than one piece at a time, so every product used to be a dead end.
// The bag collects pieces (with variant and quantity) and turns them into a
// single, ready-written message.

import { createStore } from './store.js';

const store = createStore('ao_bag', []);

const sameLine = (a, b) => a.key === b.key && (a.variant || null) === (b.variant || null);

export const getBag = store.get;
export const subscribeBag = store.subscribe;

export function addToBag(key, variant = null, qty = 1) {
  return store.update(items => {
    const line = { key, variant: variant || null, qty };
    const found = items.find(i => sameLine(i, line));
    if (found) return items.map(i => (sameLine(i, line) ? { ...i, qty: i.qty + qty } : i));
    return [...items, line];
  });
}

export function setQty(key, variant, qty) {
  return store.update(items =>
    items
      .map(i => (sameLine(i, { key, variant }) ? { ...i, qty: Math.max(0, qty) } : i))
      .filter(i => i.qty > 0)
  );
}

export function removeFromBag(key, variant = null) {
  return store.update(items => items.filter(i => !sameLine(i, { key, variant })));
}

export function clearBag() {
  return store.set([]);
}

export function bagCount(items = store.get()) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function inBag(key, items = store.get()) {
  return items.some(i => i.key === key);
}

/** Join bag lines to live products; drops anything that left the sheet. */
export function bagLines(items, products) {
  const byKey = new Map(products.map(p => [p.key, p]));
  return items
    .map(item => {
      const product = byKey.get(item.key);
      if (!product) return null;
      const variant = item.variant ? product.variants.find(v => v.name === item.variant) : null;
      const price = variant ? variant.price : product.price;
      return { ...item, product, variant, price, lineTotal: price != null ? price * item.qty : null };
    })
    .filter(Boolean);
}

export function bagTotal(lines) {
  const known = lines.filter(l => l.lineTotal != null);
  return {
    total: known.reduce((sum, l) => sum + l.lineTotal, 0),
    complete: known.length === lines.length,
  };
}

/** The message that lands in WhatsApp (or an Instagram DM). */
export function bagMessage(lines, { intro, outro, total, complete }) {
  const body = lines.map(line => {
    const name = line.variant ? `${line.product.name} (${line.variant.name})` : line.product.name;
    const price = line.price != null ? ` — ${line.price.toFixed(2).replace(/\.00$/, '')} €` : '';
    return `• ${line.qty}× ${name}${price}`;
  });
  const sum = complete && total > 0 ? [``, `${total.toFixed(2).replace(/\.00$/, '')} €`] : [];
  return [intro, '', ...body, ...sum, '', outro].join('\n');
}
