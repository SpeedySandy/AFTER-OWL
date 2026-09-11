// "What you'll find" collections — used for the Shop by vibe tiles, the About page
// and the shop filter. A product belongs to a collection when its category is listed
// in `categories`, its key is listed in `keys`, or it matches `rule`.

export const COLLECTIONS = [
  {
    key: 'owl-essentials',
    icon: '🦉',
    title: 'OWL ESSENTIALS',
    text: 'Our best-sellers — the must-have pieces that define the AFTER OWL lifestyle.',
    // live from the sheet: everything that has sold at least once and is still in stock
    rule: p => p.sold > 0 && p.stock !== 0,
    sort: (a, b) => b.sold - a.sold,
  },
  {
    key: 'rave-ready',
    icon: '🔥',
    title: 'RAVE READY',
    text: 'Everything you need for the ultimate night out — compact, smart, and stylish.',
    tags: ['Sniff Tools', 'Stylish Accessories', 'Dancefloor Gear', 'Festival Kits', 'Secret Wearables'],
    categories: ['Festival & Clubbing Gear', 'Tubes', 'Cards', 'Spoons', 'Dispenser', 'Mirror', 'Tools', 'Accessories', 'Caps & Hats', 'Clothing'],
  },
  {
    key: 'outdoor-mode',
    icon: '🌄',
    title: 'OUTDOOR MODE',
    text: 'Your van-life & adventure essentials for day trips and road missions.',
    tags: ['Camping Gear', 'Travel Gadgets', 'Outdoor Tools', 'LED Lights', 'Hammocks'],
    categories: ['Lights'],
    keys: ['bottle-holder', 'water-bottle-lanyard', 'after-owl-sun-hat', 'hanging-loop-rope', 'sim-box', 'ladies-emergency-bag', 'stash-neck-pillow', 'fire-leash'],
  },
  {
    key: 'unique-gadgets',
    icon: '💡',
    title: 'UNIQUE GADGETS',
    text: 'Smart, playful, or practical gadgets & tools that fit your vibe.',
    tags: ['Party Fun', 'Games', 'Multi-tools', 'Sound & Lights', 'Electronics'],
    categories: ['Other', 'Lights'],
    keys: ['car-key-scale', 'fire-leash', 'fan-mushrooms', 'fan-electric-waves', 'fan-shining-silver', 'spinning-lines', 'hand-crank-machine', 'moon-projector'],
  },
  {
    key: 'hide-and-stash',
    icon: '🧭',
    title: 'HIDE & STASH',
    text: 'The discreet collection — secret storage, stash tools, and diversion items.',
    tags: ['Hidden Containers', 'Stash Flasks', 'Magnetic Hideouts', 'Necklace Pouches'],
    categories: ['Secret Stash'],
    keys: ['silver-square-box', 'mesh-candy-bag', 'candy-purse', 'weekend-dispenser'],
  },
  {
    key: 'limited-editions',
    icon: '💎',
    title: 'LIMITED EDITIONS',
    text: 'Handmade & collab drops — rare, numbered, or artist-made pieces.',
    tags: ['AFTER OWL Merch', 'Custom Prints', 'Unique Deco Items', 'Custom Works'],
    categories: ['Handmade Limited Edition'],
    keys: ['silver-pillow-mirror', 'embrace-tube', 'embrace-cap', 'after-owl-tube', 'speedy-sandy-tube', 'fcb-card', 'powder-rangers-card', 'candy-purse', 'after-owl-mirror', 'after-owl-sun-hat', 'keta-horse-plate', 'keta-horse-mirror', 'line-king-plate', 'keta-pan-plate'],
  },
  {
    key: 'sets-and-gifts',
    icon: '🎁',
    title: 'SETS & GIFTS',
    text: 'Curated packs made for gifting or gearing up fast.',
    tags: ['Festival Starter Set', 'Outdoor Adventure Kit', 'Party Princess Bundle', 'Mystery Box'],
    categories: ['Sets'],
    keys: ['glass-tubes-set', 'silver-square-box', 'fcb-card', 'powder-rangers-card'],
  },
];

export function inCollection(product, collection) {
  if (!collection) return true;
  if (collection.rule) return collection.rule(product);
  return (collection.categories || []).includes(product.category) || (collection.keys || []).includes(product.key);
}

export function collectionProducts(products, collection) {
  const list = products.filter(p => inCollection(p, collection));
  return collection.sort ? [...list].sort(collection.sort) : list;
}

export const findCollection = key => COLLECTIONS.find(c => c.key === key) || null;
