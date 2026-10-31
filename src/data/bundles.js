// ─── Bundles ────────────────────────────────────────────────────────────────
//
// Fixed kits at one price, built from the guides. A bundle lives in the bag as
// a single line (key "bundle:<key>") and lands in the WhatsApp message with its
// pieces listed underneath, so the order is clear in the chat.
//
// Rules, enforced in resolveBundles():
// • A bundle shows only while EVERY piece is in stock. Sell the last one of
//   anything and the kit disappears by itself until it is restocked.
// • It also hides if its price is not below the pieces bought one by one, so a
//   price change in the sheet can never turn a kit into a worse deal.
// • Pieces with colours (wristband, lanyard…) are sorted out in the chat.
//
// Editing: change `price` to reprice, swap `keys` (catalog.json keys) to change
// what is inside. Nothing else needs touching.

export const BUNDLE_PREFIX = 'bundle:';

export const BUNDLES = [
  {
    key: 'festival-weekend-kit',
    icon: '🎪',
    guide: 'festival-weekend',
    price: 39,
    title: {
      en: 'Festival Weekend Kit',
      es: 'Kit Fin de Semana de Festival',
      de: 'Festival-Wochenend-Kit',
    },
    blurb: {
      en: 'Leash, wristband pocket, bottle lanyard, sun hat and candy purse — the stuff that keeps you hands-free from Friday to Monday.',
      es: 'Correa, muñequera con bolsillo, cordón para la botella, sombrero y monedero — para ir con las manos libres de viernes a lunes.',
      de: 'Leine, Taschen-Armband, Flaschenband, Sonnenhut und Candy Purse — damit du von Freitag bis Montag die Hände frei hast.',
    },
    keys: ['fire-leash', 'pocket-wristband', 'water-bottle-lanyard', 'after-owl-sun-hat', 'candy-purse', 'stickers'],
  },
  {
    key: 'van-night-kit',
    icon: '🚐',
    guide: 'van-life',
    price: 34,
    title: {
      en: 'Van Night Kit',
      es: 'Kit Noche en la Furgo',
      de: 'Van-Nacht-Kit',
    },
    blurb: {
      en: 'A tap-on lamp and a moon on the ceiling for nights off-grid, a neck pillow for the drive, warm socks and a box so the SIM cards stop disappearing.',
      es: 'Una lámpara táctil y una luna en el techo para las noches sin enchufe, un cojín para el viaje, calcetines y una cajita para que las SIM dejen de desaparecer.',
      de: 'Eine Tipp-Lampe und ein Mond an der Decke für Nächte ohne Strom, ein Nackenkissen für die Fahrt, Socken und eine Box, damit die SIM-Karten nicht mehr verschwinden.',
    },
    keys: ['touch-bag-light', 'moon-projector', 'stash-neck-pillow', 'socks-mushrooms', 'sim-box'],
  },
  {
    key: 'hidden-in-plain-sight-kit',
    icon: '🤫',
    guide: 'stash-starter',
    price: 32,
    title: {
      en: 'Hidden in Plain Sight Kit',
      es: 'Kit A la Vista de Todos',
      de: 'Versteckt-vor-aller-Augen-Kit',
    },
    blurb: {
      en: 'A car key, a light bulb, a marker and a sunscreen tube that all open up, plus a pocket jar. Five everyday things that are not what they look like.',
      es: 'Una llave de coche, una bombilla, un rotulador y un bote de crema que se abren, más un bote de bolsillo. Cinco cosas cotidianas que no son lo que parecen.',
      de: 'Ein Autoschlüssel, eine Glühbirne, ein Marker und eine Sonnencreme-Tube, die sich alle öffnen lassen, dazu ein Taschen-Döschen. Fünf Alltagsdinge, die nicht sind, wonach sie aussehen.',
    },
    keys: ['stash-car-key', 'secret-light-bulb', 'stash-marker', 'secret-sunscreen', 'g1-dispenser'],
  },
];

const isBundleKey = key => typeof key === 'string' && key.startsWith(BUNDLE_PREFIX);
export { isBundleKey };

/** Bundles joined to live products, with what they are worth and whether they can be sold. */
export function resolveBundles(products) {
  const byKey = new Map(products.map(p => [p.key, p]));
  return BUNDLES.map(b => {
    const items = b.keys.map(k => byKey.get(k)).filter(Boolean);
    const value = items.reduce((sum, p) => sum + (p.price || 0), 0);
    const complete = items.length === b.keys.length;
    const inStock = complete && items.every(p => p.stock !== 0);
    const available = inStock && value > b.price;
    const image = (items.find(p => p.image) || {}).image || null;
    return { ...b, bagKey: `${BUNDLE_PREFIX}${b.key}`, items, value, save: value - b.price, available, image };
  });
}

export function availableBundles(products) {
  return resolveBundles(products).filter(b => b.available);
}

export function bundleForGuide(guideKey, products) {
  return availableBundles(products).find(b => b.guide === guideKey) || null;
}

export function bundleByBagKey(bagKey, products) {
  return availableBundles(products).find(b => b.bagKey === bagKey) || null;
}
