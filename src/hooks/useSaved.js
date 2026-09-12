import { useEffect, useState } from 'react';
import { getSaved, subscribeSaved, toggleSaved } from '../lib/wishlist.js';

/** Reactive view of the saved-products list (localStorage-backed). */
export function useSavedList() {
  const [saved, setSaved] = useState(getSaved);
  useEffect(() => subscribeSaved(setSaved), []);
  return saved;
}

/** Whether one product is saved, plus a toggle function. */
export function useIsSaved(key) {
  const saved = useSavedList();
  return [saved.includes(key), () => toggleSaved(key)];
}
