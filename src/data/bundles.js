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
    price: 42,
    title: {
      en: 'Festival Weekend Kit',
      es: 'Kit Fin de Semana de Festival',
      de: 'Festival-Wochenend-Kit',
    },
    blurb: {
      en: 'Hands free from Friday to Monday: the leash clips the candy purse to your belt loop, cash goes in the wristband, water hangs off the lanyard, the hat handles the sun, and the Trip Stopper is there for the moment at 4am when you need a reset.',
      es: 'Manos libres de viernes a lunes: la correa engancha el monedero a la trabilla, el dinero va en la muñequera, el agua cuelga del cordón, el sombrero se ocupa del sol y el Trip Stopper está ahí para ese momento de las 4 de la mañana en que necesitas un respiro.',
      de: 'Hände frei von Freitag bis Montag: Die Leine hängt die Candy Purse an die Gürtelschlaufe, Bargeld kommt ins Armband, das Wasser ans Band, der Hut übernimmt die Sonne, und der Trip Stopper ist da, wenn du um 4 Uhr morgens kurz runterkommen musst.',
    },
    keys: ['fire-leash', 'candy-purse', 'pocket-wristband', 'water-bottle-lanyard', 'after-owl-sun-hat', 'trip-stopper', 'stickers'],
  },
  {
    key: 'road-trip-kit',
    icon: '🚐',
    guide: 'van-life',
    price: 34,
    title: {
      en: 'Road Trip Kit',
      es: 'Kit Road Trip',
      de: 'Roadtrip-Kit',
    },
    blurb: {
      en: 'For the drive, the border and the night after: a neck pillow with a hidden pocket for passports, a box for swapping SIM cards, a tap-on lamp for the dark bag, a moon for the van ceiling and socks that say what everyone is thinking.',
      es: 'Para el viaje, la frontera y la noche siguiente: un cojín de viaje con bolsillo oculto para el pasaporte, una cajita para cambiar de SIM, una lámpara táctil para la mochila a oscuras, una luna para el techo de la furgo y unos calcetines que dicen lo que todos piensan.',
      de: 'Für die Fahrt, die Grenze und die Nacht danach: ein Nackenkissen mit verstecktem Fach für den Pass, eine Box zum SIM-Wechseln, eine Tipp-Lampe für die dunkle Tasche, ein Mond an die Van-Decke und Socken, die sagen, was alle denken.',
    },
    keys: ['stash-neck-pillow', 'sim-box', 'touch-bag-light', 'moon-projector', 'socks-dont-follow'],
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
      en: 'A lighter, a car key, a light bulb, a marker and a sunscreen tube. Five things nobody looks at twice, and every one of them opens up.',
      es: 'Un mechero, una llave de coche, una bombilla, un rotulador y un bote de crema solar. Cinco cosas que nadie mira dos veces, y todas se abren.',
      de: 'Ein Feuerzeug, ein Autoschlüssel, eine Glühbirne, ein Marker und eine Sonnencreme-Tube. Fünf Dinge, die keiner zweimal ansieht, und jedes davon lässt sich öffnen.',
    },
    keys: ['stash-lighter', 'stash-car-key', 'secret-light-bulb', 'stash-marker', 'secret-sunscreen'],
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
