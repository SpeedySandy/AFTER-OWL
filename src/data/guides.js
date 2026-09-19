// ─── Guides ─────────────────────────────────────────────────────────────────
//
// Assembled pages that group real catalog pieces around a situation rather than
// a category. Each entry lists product keys; anything that leaves the sheet
// simply disappears from the guide, so nothing here can point at a dead product.
//
// Editing: add a guide, give it three or four sections of four-ish keys, and it
// appears on the site, in the sitemap and as its own prerendered page. Keys are
// the ones in catalog.json (auto rows use "auto-<slugified-name>").

export const GUIDES = [
  {
    key: 'festival-weekend',
    icon: '🎪',
    title: {
      en: 'The five-day festival kit',
      es: 'El kit para cinco días de festival',
      de: 'Das Fünf-Tage-Festival-Kit',
    },
    intro: {
      en: 'Built from the things that actually got used across a season of them, and the things whose absence caused a problem. Roughly in the order you notice you need them.',
      es: 'Montado con lo que de verdad se usó a lo largo de una temporada, y con lo que dio problemas justo por no llevarlo. Más o menos en el orden en que te das cuenta de que te hace falta.',
      de: 'Zusammengestellt aus dem, was eine Saison lang wirklich benutzt wurde — und dem, dessen Fehlen Ärger gemacht hat. Ungefähr in der Reihenfolge, in der es dir auffällt.',
    },
    sections: [
      {
        title: { en: 'So nothing walks off', es: 'Para que no se pierda nada', de: 'Damit nichts abhandenkommt' },
        note: {
          en: 'Everything small leaves a pocket eventually. Tethering it to a belt loop is the cheapest insurance in the shop.',
          es: 'Todo lo pequeño acaba saliéndose del bolsillo. Atarlo a la trabilla del pantalón es el seguro más barato de la tienda.',
          de: 'Alles Kleine verlässt irgendwann die Tasche. Es an der Gürtelschlaufe zu befestigen ist die günstigste Versicherung im Shop.',
        },
        keys: ['fire-leash', 'pocket-wristband', 'hanging-loop-rope', 'gangsta-id-sleeve'],
      },
      {
        title: { en: 'Heat and water', es: 'Calor y agua', de: 'Hitze und Wasser' },
        note: {
          en: 'A tent at two in the afternoon and a packed room at two in the morning are the same problem. Carrying water without a free hand solves half of it.',
          es: 'Una tienda a las dos de la tarde y una sala llena a las dos de la madrugada son el mismo problema. Llevar agua sin ocupar una mano resuelve la mitad.',
          de: 'Ein Zelt um zwei Uhr nachmittags und ein voller Raum um zwei Uhr nachts sind dasselbe Problem. Wasser ohne freie Hand zu tragen löst die Hälfte davon.',
        },
        keys: ['fan-mushrooms', 'fan-electric-waves', 'bottle-holder', 'water-bottle-lanyard'],
      },
      {
        title: { en: 'Finding your tent', es: 'Encontrar tu tienda', de: 'Dein Zelt wiederfinden' },
        note: {
          en: 'Phone batteries are gone by midnight on day two. Something with its own battery is not optional.',
          es: 'La batería del móvil se agota a medianoche del segundo día. Algo con pila propia no es opcional.',
          de: 'Der Handyakku ist am zweiten Tag um Mitternacht leer. Etwas mit eigener Batterie ist nicht optional.',
        },
        keys: ['owl-headlamp', 'led-torch', 'led-spot-light', 'touch-bag-light'],
      },
      {
        title: { en: 'Carrying it', es: 'Llevarlo encima', de: 'Alles tragen' },
        note: {
          en: 'Hands-free or it ends up on the floor. A hip bag you can dance in beats a backpack you keep taking off.',
          es: 'Manos libres o acaba en el suelo. Una riñonera con la que puedas bailar gana a una mochila que te quitas cada rato.',
          de: 'Freihändig, sonst landet es auf dem Boden. Eine Hüfttasche, in der man tanzen kann, schlägt einen Rucksack, den man ständig absetzt.',
        },
        keys: ['laser-hip-bag', 'oh-shit-kit', 'ladies-emergency-bag', 'after-owl-sun-hat'],
      },
    ],
  },
  {
    key: 'van-life',
    icon: '🚐',
    title: {
      en: 'What lives in the van',
      es: 'Lo que vive en la furgoneta',
      de: 'Was im Van wohnt',
    },
    intro: {
      en: 'Tested on the road between Catalonia, the Alps and the north, in a T6 that spends more nights off-grid than on. Small things that earn their drawer space.',
      es: 'Probado en carretera entre Cataluña, los Alpes y el norte, en una T6 que pasa más noches sin enchufe que con él. Cosas pequeñas que se ganan su sitio en el cajón.',
      de: 'Getestet unterwegs zwischen Katalonien, den Alpen und dem Norden, in einem T6, der mehr Nächte autark verbringt als am Strom. Kleine Dinge, die ihren Platz in der Schublade verdienen.',
    },
    sections: [
      {
        title: { en: 'Light without a socket', es: 'Luz sin enchufe', de: 'Licht ohne Steckdose' },
        note: {
          en: 'Anything that runs off the van battery is a decision. Anything that runs off its own is not.',
          es: 'Todo lo que tira de la batería de la furgo es una decisión. Lo que lleva la suya, no.',
          de: 'Alles, was an der Van-Batterie hängt, ist eine Entscheidung. Alles mit eigener nicht.',
        },
        keys: ['moon-projector', 'touch-bag-light', 'round-led-light', 'owl-headlamp'],
      },
      {
        title: { en: 'Sun and water', es: 'Sol y agua', de: 'Sonne und Wasser' },
        note: {
          en: 'Shade you can fold flat and water you can sling over a shoulder — both matter more on a hike from a parking spot than they sound.',
          es: 'Sombra que se pliega del todo y agua que puedes colgarte del hombro: en una ruta desde el aparcamiento importan más de lo que parece.',
          de: 'Schatten, der flach faltet, und Wasser, das über der Schulter hängt — auf einer Wanderung vom Parkplatz aus zählt beides mehr, als es klingt.',
        },
        keys: ['after-owl-sun-hat', 'bottle-holder', 'water-bottle-lanyard'],
      },
      {
        title: { en: 'Keeping order in two square metres', es: 'Orden en dos metros cuadrados', de: 'Ordnung auf zwei Quadratmetern' },
        note: {
          en: 'Everything loose becomes noise on a dirt track. Small boxes and a loop to hang things from fix most of it.',
          es: 'Todo lo suelto se convierte en ruido por una pista de tierra. Cajitas y un lazo del que colgar cosas arreglan casi todo.',
          de: 'Alles Lose wird auf einem Feldweg zu Geklapper. Kleine Boxen und eine Schlaufe zum Aufhängen lösen das meiste.',
        },
        keys: ['sim-box', 'hanging-loop-rope', 'silver-square-box', 'stash-neck-pillow'],
      },
    ],
  },
  {
    key: 'gifts',
    icon: '🎁',
    title: {
      en: 'Presents, sorted by what you want to spend',
      es: 'Regalos, ordenados por lo que quieres gastarte',
      de: 'Geschenke, sortiert nach Budget',
    },
    intro: {
      en: 'The honest version of a gift guide: everything here is in the shop right now, grouped by price rather than by how much we would like you to spend.',
      es: 'La versión honesta de una guía de regalos: todo lo de aquí está ahora mismo en la tienda, agrupado por precio y no por lo que nos gustaría que gastaras.',
      de: 'Die ehrliche Version eines Geschenkeguides: alles hier ist gerade im Shop, sortiert nach Preis statt danach, was wir gern hätten.',
    },
    sections: [
      {
        title: { en: 'Under €5 — stocking filler', es: 'Menos de 5 € — para rellenar', de: 'Unter 5 € — kleine Beigabe' },
        note: {
          en: 'The things people end up using most, oddly enough.',
          es: 'Curiosamente, lo que más se acaba usando.',
          de: 'Merkwürdigerweise das, was am meisten benutzt wird.',
        },
        keys: ['stickers', 'after-owl-mirror', 'stash-scrunchie', 'mini-lab-spoon', 'ok-hole-shovel'],
      },
      {
        title: { en: '€5–10 — a real present', es: '5–10 € — un regalo de verdad', de: '5–10 € — ein echtes Geschenk' },
        note: {
          en: 'Enough to feel chosen rather than grabbed.',
          es: 'Lo justo para que parezca elegido y no cogido al vuelo.',
          de: 'Genug, damit es ausgesucht wirkt und nicht schnell gegriffen.',
        },
        keys: ['monkey-spoon', 'g1-dispenser', 'stash-lighter', 'socks-aliens', 'secret-banana'],
      },
      {
        title: { en: '€10–20 — the safe bet', es: '10–20 € — la apuesta segura', de: '10–20 € — die sichere Wahl' },
        note: {
          en: 'Where most of the shop lives, and where the printed pieces are.',
          es: 'Donde está la mayor parte de la tienda y donde están las piezas estampadas.',
          de: 'Wo der größte Teil des Shops liegt — und wo die bedruckten Stücke sind.',
        },
        keys: ['candy-purse', 'fire-leash', 'stash-belt', '4in1-mirror', 'fcb-card'],
      },
      {
        title: { en: 'Already boxed', es: 'Ya en pack', de: 'Schon als Set' },
        note: {
          en: 'If you want to hand over one thing rather than four.',
          es: 'Si prefieres dar una sola cosa en vez de cuatro.',
          de: 'Wenn du eine Sache überreichen willst statt vier.',
        },
        keys: ['silver-square-box', 'glass-tubes-set'],
      },
    ],
  },
  {
    key: 'stash-starter',
    icon: '🧭',
    title: {
      en: 'Hidden in plain sight',
      es: 'Escondido a la vista',
      de: 'Versteckt vor aller Augen',
    },
    intro: {
      en: 'Ordinary objects with a compartment inside. The trick is that they are genuinely the thing they look like — the lighter lights, the brush brushes — so nothing about them reads as unusual.',
      es: 'Objetos corrientes con un compartimento dentro. El truco es que son de verdad lo que parecen —el mechero enciende, el cepillo peina—, así que nada en ellos llama la atención.',
      de: 'Gewöhnliche Gegenstände mit einem Fach darin. Der Trick ist, dass sie wirklich das sind, wonach sie aussehen — das Feuerzeug brennt, die Bürste bürstet — also wirkt nichts daran ungewöhnlich.',
    },
    sections: [
      {
        title: { en: 'Pocket and handbag', es: 'Bolsillo y bolso', de: 'Tasche und Handtasche' },
        note: {
          en: 'The everyday ones. A lighter and a hairbrush raise no questions anywhere.',
          es: 'Los de diario. Un mechero y un cepillo no levantan preguntas en ningún sitio.',
          de: 'Die Alltäglichen. Ein Feuerzeug und eine Haarbürste werfen nirgends Fragen auf.',
        },
        keys: ['stash-lighter', 'stash-hairbrush', 'stash-car-key', 'stash-marker'],
      },
      {
        title: { en: 'Worn', es: 'Puesto', de: 'Am Körper' },
        note: {
          en: 'Clothing and jewellery with somewhere to put something small.',
          es: 'Ropa y joyería con un sitio donde meter algo pequeño.',
          de: 'Kleidung und Schmuck mit einem Platz für etwas Kleines.',
        },
        keys: ['stash-belt', 'cross-necklace', 'stash-scrunchie', 'stash-underpants'],
      },
      {
        title: { en: 'Packed for travel', es: 'En la maleta', de: 'Fürs Reisen gepackt' },
        note: {
          en: 'Things that belong in a wash bag anyway, so they never look like a deliberate choice.',
          es: 'Cosas que ya irían en el neceser, así que nunca parecen una elección deliberada.',
          de: 'Dinge, die ohnehin in den Kulturbeutel gehören — sie wirken nie wie eine bewusste Entscheidung.',
        },
        keys: ['secret-sunscreen', 'secret-light-bulb', 'stash-neck-pillow', 'secret-banana'],
      },
    ],
  },
];

export const findGuide = key => GUIDES.find(g => g.key === key) || null;

/** Resolve a guide's product keys against the live list, dropping anything gone. */
export function guideSections(guide, products) {
  const byKey = new Map(products.map(p => [p.key, p]));
  return guide.sections
    .map(s => ({ ...s, items: s.keys.map(k => byKey.get(k)).filter(Boolean) }))
    .filter(s => s.items.length);
}

export function guideItems(guide, products) {
  return guideSections(guide, products).flatMap(s => s.items);
}
