import { useEffect, useState } from 'react';
import { getBag, subscribeBag } from '../lib/bag.js';
import { getRecent, subscribeRecent } from '../lib/recent.js';

export function useBag() {
  const [items, setItems] = useState(getBag);
  useEffect(() => subscribeBag(setItems), []);
  return items;
}

export function useRecent() {
  const [keys, setKeys] = useState(getRecent);
  useEffect(() => subscribeRecent(setKeys), []);
  return keys;
}
