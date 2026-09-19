// ─── Editorial copy ─────────────────────────────────────────────────────────
//
// Marketing words live here, separate from src/i18n/*.js (which holds interface
// chrome: buttons, labels, errors). Edit this file to change what the shop says
// about itself; edit the i18n files to change what the buttons say.
//
// Every entry carries en / es / de. A missing language falls back to English.
//
// House rule: nothing in here states a measurement, a material or a weight for a
// specific product. Those are facts a buyer acts on, and they belong in
// catalog.json where they can be checked against the actual object.

/** Shown above the grid when a category is selected. Keyed by the category name
 *  exactly as src/lib/products.js produces it. */
export const CATEGORY_INTROS = {
  'Handmade Limited Edition': {
    en: 'Cast, poured and sanded by hand in Barcelona, in runs of a few at a time. Most of these exist exactly once — when one sells, that piece is gone rather than reordered.',
    es: 'Moldeadas, vertidas y lijadas a mano en Barcelona, en series de unas pocas unidades. Casi todas existen una sola vez: cuando se vende, esa pieza no se repone.',
    de: 'Von Hand gegossen, geformt und geschliffen in Barcelona, in Serien von wenigen Stück. Die meisten gibt es genau einmal — ist eine verkauft, wird sie nicht nachbestellt.',
  },
  Sets: {
    en: 'Pieces that already go together, boxed as one. Cheaper than buying the parts separately and the usual answer to "what do I get someone who has nothing yet".',
    es: 'Piezas que ya combinan entre sí, en un solo pack. Sale más barato que comprarlas por separado y suele ser la respuesta a «¿qué le regalo a alguien que no tiene nada?».',
    de: 'Teile, die ohnehin zusammengehören, in einer Box. Günstiger als einzeln gekauft und die übliche Antwort auf „Was schenke ich jemandem, der noch nichts hat?".',
  },
  Tubes: {
    en: 'Small metal and glass tubes, some telescopic, some printed with our own artwork and collab designs. Pocket-sized, sturdy, and the thing people come back to buy a second of.',
    es: 'Tubos pequeños de metal y cristal, algunos telescópicos, otros con ilustraciones propias y diseños de colaboraciones. De bolsillo, resistentes y de los que la gente vuelve a comprar un segundo.',
    de: 'Kleine Röhrchen aus Metall und Glas, teils teleskopisch, teils mit eigenen Motiven und Collab-Designs bedruckt. Hosentaschenformat, robust — und das Teil, von dem Leute ein zweites holen.',
  },
  Cards: {
    en: 'Printed cards in the size of the one in your wallet, in artwork from our own designs and collabs. Flat, unremarkable in a pocket, and collectable enough that people frame them.',
    es: 'Tarjetas impresas del tamaño de las de la cartera, con diseños propios y de colaboraciones. Planas, discretas en el bolsillo y lo bastante coleccionables como para acabar enmarcadas.',
    de: 'Bedruckte Karten im Format der Karte in deinem Portemonnaie, mit eigenen Motiven und Collab-Designs. Flach, in der Tasche unauffällig und sammelwürdig genug, dass Leute sie rahmen.',
  },
  Dispenser: {
    en: 'Tiny sealed jars and pocket dispensers built to stay shut in a bag. Screw tops, secure lids, nothing that pops open in a jacket pocket.',
    es: 'Botecitos herméticos y dispensadores de bolsillo pensados para no abrirse dentro de la mochila. Tapa de rosca, cierre seguro, nada que se abra solo en el bolsillo.',
    de: 'Winzige dichte Döschen und Taschenspender, die im Rucksack zubleiben. Schraubverschluss, sicherer Deckel, nichts, was in der Jackentasche aufgeht.',
  },
  Spoons: {
    en: 'Miniature metal scoops, from lab-plain to gold-plated silly. Cheap, near-indestructible, and the easiest thing in the shop to lose — which is why most people buy two.',
    es: 'Cucharillas de metal en miniatura, de las más sobrias de laboratorio a las doradas y con guasa. Baratas, casi indestructibles y lo más fácil de perder de la tienda: por eso casi todo el mundo compra dos.',
    de: 'Miniatur-Löffelchen aus Metall, von laborschlicht bis vergoldet-albern. Günstig, fast unkaputtbar und das, was man am leichtesten verliert — deshalb kaufen die meisten zwei.',
  },
  Tools: {
    en: 'Grinders, glass plates, a pocket scale and the odd hand-cranked contraption. The heavier, more serious end of the shop — things meant to live on a table rather than in a pocket.',
    es: 'Molinillos, planchas de cristal, una báscula de bolsillo y algún artilugio de manivela. La parte más seria y con más peso de la tienda: cosas para tener en la mesa, no en el bolsillo.',
    de: 'Grinder, Glasplatten, eine Taschenwaage und das eine oder andere Kurbelgerät. Das schwerere, ernsthaftere Ende des Shops — Dinge für den Tisch, nicht für die Hosentasche.',
  },
  Mirror: {
    en: 'Folding pocket mirrors and one heavy handmade slab, in our own artwork and collab prints. They live in a bag and get used far more often than anyone plans.',
    es: 'Espejos de bolsillo plegables y una pieza pesada hecha a mano, con diseños propios y de colaboraciones. Viven en el bolso y se usan mucho más de lo que uno tenía previsto.',
    de: 'Klappbare Taschenspiegel und ein schweres handgemachtes Stück, mit eigenen Motiven und Collab-Prints. Sie wohnen in der Tasche und werden öfter benutzt, als irgendwer plant.',
  },
  'Secret Stash': {
    en: 'Everyday objects with a compartment inside — a lighter, a hairbrush, a scrunchie, a car key. They work as the thing they look like first, which is the whole point.',
    es: 'Objetos cotidianos con un compartimento dentro: un mechero, un cepillo, un coletero, una llave de coche. Primero funcionan como lo que parecen, que es justo la gracia.',
    de: 'Alltagsgegenstände mit einem Fach darin — ein Feuerzeug, eine Haarbürste, ein Haargummi, ein Autoschlüssel. Sie funktionieren zuerst als das, wonach sie aussehen, und genau darum geht es.',
  },
  'Festival & Clubbing Gear': {
    en: 'The things that stop a long weekend going wrong: leashes so nothing walks off, a fan for when the room hits forty degrees, a way to carry water without holding it.',
    es: 'Lo que evita que un finde largo se tuerza: cordones para que no se pierda nada, un abanico para cuando la sala llega a cuarenta grados y una forma de llevar el agua sin llevarla en la mano.',
    de: 'Das, was ein langes Wochenende rettet: Leashes, damit nichts abhandenkommt, ein Fächer für vierzig Grad im Raum, und eine Art, Wasser zu tragen, ohne es zu tragen.',
  },
  Bags: {
    en: 'Hip bags, totes, pouches and one thermo bag, most of them printed with jokes we would repeat in public. Small runs — when a print sells out it usually does not come back.',
    es: 'Riñoneras, tote bags, neceseres y una bolsa térmica, casi todas con bromas que repetiríamos en voz alta. Series cortas: cuando un estampado se agota, no suele volver.',
    de: 'Hüfttaschen, Totes, Pouches und eine Thermotasche, die meisten bedruckt mit Witzen, die wir auch laut sagen würden. Kleine Auflagen — ist ein Print weg, kommt er meist nicht wieder.',
  },
  Accessories: {
    en: 'The small stuff that attaches to other stuff: wristbands with a pocket, card sleeves, rope loops. Cheap, useful, and the usual thing people add at the end of an order.',
    es: 'Las cosas pequeñas que se enganchan a otras cosas: muñequeras con bolsillo, fundas de tarjeta, lazos de cuerda. Baratas, útiles y lo que la gente suele añadir al final del pedido.',
    de: 'Der Kleinkram, der an anderem Kram hängt: Armbänder mit Fach, Kartenhüllen, Seilschlaufen. Günstig, nützlich und das, was Leute am Ende einer Bestellung dazulegen.',
  },
  Clothing: {
    en: 'A short rack: a tee, a few pairs of socks with opinions. Printed in small numbers, sized normally, and worn far outside the context they were designed for.',
    es: 'Un perchero corto: una camiseta y unos cuantos calcetines con opinión. Estampados en pocas unidades, tallas normales y usados muy fuera del contexto para el que se diseñaron.',
    de: 'Eine kurze Stange: ein Shirt, ein paar Socken mit Meinung. In kleinen Stückzahlen bedruckt, normal geschnitten und weit außerhalb des Kontexts getragen, für den sie gedacht waren.',
  },
  'Caps & Hats': {
    en: 'Embroidered caps, collab pieces and a sun hat that folds into a bag. Sun cover for the festival field, the van and the walk back at eight in the morning.',
    es: 'Gorras bordadas, piezas de colaboración y un sombrero que se pliega y cabe en el bolso. Protección solar para el festival, la furgo y la vuelta a casa a las ocho de la mañana.',
    de: 'Bestickte Caps, Collab-Teile und ein Sonnenhut, der in die Tasche faltet. Sonnenschutz fürs Festivalgelände, den Van und den Heimweg um acht Uhr morgens.',
  },
  Lights: {
    en: 'Torches, clip spots, a bag light and one owl-shaped headlamp. Battery-run, small enough to forget you packed, and the difference between finding your tent and not.',
    es: 'Linternas, focos de pinza, una luz para el bolso y un frontal con forma de búho. Con pilas, tan pequeños que se te olvida que los llevas, y la diferencia entre encontrar tu tienda o no.',
    de: 'Taschenlampen, Clip-Spots, ein Taschenlicht und eine eulenförmige Stirnlampe. Batteriebetrieben, klein genug zum Vergessen — und der Unterschied, ob du dein Zelt findest.',
  },
  Other: {
    en: 'The drawer everything else lives in: pins, patches, stickers, a keyring, a travel box for SIM cards. Under a fiver each, mostly, and they make good padding in a parcel.',
    es: 'El cajón donde va todo lo demás: chapas, parches, pegatinas, un llavero y una cajita de viaje para tarjetas SIM. Casi todo por menos de cinco euros y rellena bien un paquete.',
    de: 'Die Schublade für alles andere: Pins, Patches, Sticker, ein Schlüsselanhänger, eine Reisebox für SIM-Karten. Meist unter fünf Euro und gutes Füllmaterial im Paket.',
  },
};

/** Longer intro for the seven curated collections, on top of the short line in
 *  src/data/collections.js. */
export const COLLECTION_INTROS = {
  'owl-essentials': {
    en: 'Worked out from what actually sells, not from what we feel like pushing — these are the pieces that move fastest and still have stock.',
    es: 'Calculado a partir de lo que realmente se vende, no de lo que nos apetece empujar: son las piezas que más salen y que todavía tienen stock.',
    de: 'Errechnet aus dem, was sich wirklich verkauft, nicht aus dem, was wir gern pushen würden — die Stücke, die am schnellsten rausgehen und noch auf Lager sind.',
  },
  'rave-ready': {
    en: 'What ends up in the bag on a Friday: small, sealed, hard to lose and easy to find again in the dark.',
    es: 'Lo que acaba en la bolsa un viernes: pequeño, cerrado, difícil de perder y fácil de encontrar otra vez a oscuras.',
    de: 'Was freitags in der Tasche landet: klein, dicht, schwer zu verlieren und im Dunkeln leicht wiederzufinden.',
  },
  'outdoor-mode': {
    en: 'Gear that has been in the van. Water carrying, light, shade and a few things that clip onto something else.',
    es: 'Material que ha estado en la furgoneta. Llevar agua, luz, sombra y unas cuantas cosas que se enganchan a otras.',
    de: 'Ausrüstung, die im Van war. Wasser tragen, Licht, Schatten und ein paar Dinge, die sich an anderes klipsen lassen.',
  },
  'unique-gadgets': {
    en: 'The ones that make people pick them up and ask what they are. Some genuinely useful, some just good company.',
    es: 'Los que hacen que la gente los coja y pregunte qué son. Algunos realmente útiles, otros simplemente buena compañía.',
    de: 'Die, bei denen Leute zugreifen und fragen, was das ist. Manche wirklich nützlich, manche einfach gute Gesellschaft.',
  },
  'hide-and-stash': {
    en: 'Objects that keep something small out of sight. They pass as ordinary because they are ordinary — the compartment is the only unusual part.',
    es: 'Objetos que mantienen algo pequeño fuera de la vista. Pasan por normales porque son normales: el compartimento es lo único raro.',
    de: 'Gegenstände, die etwas Kleines aus dem Blick halten. Sie gehen als gewöhnlich durch, weil sie gewöhnlich sind — das Fach ist der einzige ungewöhnliche Teil.',
  },
  'limited-editions': {
    en: 'Handmade pieces and collab drops. No restocks, no second runs; the photo you are looking at is the object you would receive.',
    es: 'Piezas hechas a mano y drops de colaboración. Sin reposiciones ni segundas series: la foto que ves es el objeto que recibirías.',
    de: 'Handgemachte Stücke und Collab-Drops. Keine Nachbestellung, keine zweite Serie; das Foto ist das Objekt, das du bekommst.',
  },
  'sets-and-gifts': {
    en: 'Already-assembled combinations, and the things we reach for when someone asks for a present under twenty euros.',
    es: 'Combinaciones ya montadas y lo que cogemos cuando alguien pide un regalo por menos de veinte euros.',
    de: 'Fertige Kombinationen und das, wozu wir greifen, wenn jemand ein Geschenk unter zwanzig Euro sucht.',
  },
};

/** Care guidance, by material family. Generic and true of the material — never a
 *  claim about a specific product's construction. */
export const CARE_NOTES = {
  resin: {
    en: 'Cast resin: wipe with a damp cloth, no solvents or scouring pads. Keep it out of long direct sun, which yellows resin over time, and off hot surfaces.',
    es: 'Resina: límpiala con un paño húmedo, sin disolventes ni estropajos. Evita el sol directo prolongado, que con el tiempo amarillea la resina, y las superficies calientes.',
    de: 'Gießharz: mit einem feuchten Tuch abwischen, keine Lösungsmittel oder Scheuerschwämme. Länger direkte Sonne meiden — Harz vergilbt mit der Zeit — und heiße Flächen auch.',
  },
  glass: {
    en: 'Glass: hand wash in warm water and dry it rather than leaving it to drip. Not dishwasher safe, and printed designs fade if you scrub them.',
    es: 'Cristal: lávalo a mano con agua templada y sécalo en vez de dejarlo escurrir. No apto para lavavajillas; los estampados se borran si los frotas.',
    de: 'Glas: von Hand in warmem Wasser waschen und abtrocknen statt tropfen lassen. Nicht spülmaschinenfest, und bedruckte Motive verblassen beim Schrubben.',
  },
  metal: {
    en: 'Metal: rinse, then dry it fully — the small parts are where moisture sits and marks. A soft cloth is enough; skip abrasive cleaners on plated finishes.',
    es: 'Metal: enjuaga y seca del todo; la humedad se queda en las piezas pequeñas y deja marcas. Basta un paño suave; nada de limpiadores abrasivos en los acabados chapados.',
    de: 'Metall: abspülen und vollständig trocknen — in den kleinen Teilen setzt sich Feuchtigkeit fest und hinterlässt Flecken. Ein weiches Tuch reicht; keine Scheuermittel auf beschichteten Oberflächen.',
  },
  fabric: {
    en: 'Fabric: cold wash, inside out, and hang it to dry. Printed designs do not survive a tumble dryer or an iron pressed straight onto them.',
    es: 'Tejido: lavado en frío, del revés, y a secar tendido. Los estampados no sobreviven a la secadora ni a la plancha encima.',
    de: 'Stoff: kalt waschen, auf links, und hängend trocknen. Aufdrucke überleben weder Trockner noch ein direkt aufgesetztes Bügeleisen.',
  },
  electronics: {
    en: 'Battery-powered: take the batteries out if it is going in a drawer for months, and keep it dry. None of these are waterproof unless the listing says so.',
    es: 'Con pilas: sácalas si va a pasar meses en un cajón y mantenlo seco. Ninguno es impermeable salvo que la ficha lo diga.',
    de: 'Batteriebetrieben: Batterien raus, wenn es monatelang in der Schublade liegt, und trocken halten. Keines davon ist wasserdicht, sofern nicht anders angegeben.',
  },
};

/** Which care note a category gets. Categories left out simply show none. */
export const CATEGORY_CARE = {
  'Handmade Limited Edition': 'resin',
  Mirror: 'glass',
  Tools: 'glass',
  Cards: 'metal',
  Tubes: 'metal',
  Spoons: 'metal',
  Dispenser: 'metal',
  Bags: 'fabric',
  Clothing: 'fabric',
  'Caps & Hats': 'fabric',
  Lights: 'electronics',
};

export const pick = (entry, lang) => (entry ? entry[lang] || entry.en : null);
export const categoryIntro = (category, lang) => pick(CATEGORY_INTROS[category], lang);
export const collectionIntro = (key, lang) => pick(COLLECTION_INTROS[key], lang);
export const careNote = (category, lang) => pick(CARE_NOTES[CATEGORY_CARE[category]], lang);
