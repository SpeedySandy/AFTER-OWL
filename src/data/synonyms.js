// ─── Search synonyms ────────────────────────────────────────────────────────
//
// The shop is browsed in three languages but the product names are English, so
// "espejo" and "Spiegel" used to return nothing. Each rule below says: if a
// product's text contains any `when` word, add the `add` words to what it
// matches on. The extra words are invisible — they only widen the search.
//
// Keep `when` words lowercase and accent-free: they are compared against the
// same normalised text the search box produces (see norm() in src/lib/sheet.js).

export const SYNONYMS = [
  // ── Objects, EN → ES / DE ────────────────────────────────────────────────
  { when: ['mirror'], add: ['espejo', 'spiegel', 'espejito'] },
  { when: ['bag', 'tote', 'pouch'], add: ['bolsa', 'bolso', 'tasche', 'beutel', 'riñonera', 'rinonera', 'neceser'] },
  { when: ['hip bag'], add: ['riñonera', 'rinonera', 'bauchtasche', 'gurteltasche'] },
  { when: ['cap', 'hat'], add: ['gorra', 'sombrero', 'muetze', 'mutze', 'kappe', 'hut'] },
  { when: ['socks'], add: ['calcetines', 'socken'] },
  { when: ['t-shirt', 'tee', 'shirt'], add: ['camiseta', 'shirt', 'tshirt'] },
  { when: ['spoon', 'shovel', 'scoop'], add: ['cuchara', 'cucharilla', 'loffel', 'loeffel', 'pala'] },
  { when: ['tube'], add: ['tubo', 'rohrchen', 'roehrchen', 'canuto'] },
  { when: ['grinder'], add: ['molinillo', 'muhle', 'muehle', 'triturador'] },
  { when: ['light', 'led', 'torch', 'lamp'], add: ['luz', 'linterna', 'licht', 'lampe', 'taschenlampe', 'foco'] },
  { when: ['headlamp'], add: ['frontal', 'stirnlampe'] },
  { when: ['scale'], add: ['bascula', 'waage', 'peso'] },
  { when: ['necklace', 'pendant'], add: ['collar', 'colgante', 'kette', 'halskette', 'anhanger'] },
  { when: ['wristband'], add: ['muñequera', 'munequera', 'armband'] },
  { when: ['keyring', 'key ring'], add: ['llavero', 'schlusselanhanger', 'schluesselanhaenger'] },
  { when: ['lighter'], add: ['mechero', 'encendedor', 'feuerzeug'] },
  { when: ['scrunchie'], add: ['coletero', 'haargummi', 'goma de pelo'] },
  { when: ['hair brush', 'hairbrush'], add: ['cepillo', 'haarburste', 'haarbuerste'] },
  { when: ['lipstick'], add: ['pintalabios', 'labial', 'lippenstift'] },
  { when: ['sunscreen'], add: ['protector solar', 'crema solar', 'sonnencreme'] },
  { when: ['belt'], add: ['cinturon', 'guertel', 'gurtel'] },
  { when: ['underpants'], add: ['calzoncillos', 'ropa interior', 'unterhose'] },
  { when: ['fan'], add: ['abanico', 'facher', 'faecher', 'ventilador'] },
  { when: ['bottle'], add: ['botella', 'flasche', 'cantimplora'] },
  { when: ['plate', 'tray'], add: ['bandeja', 'plato', 'tablett', 'teller'] },
  { when: ['box', 'jar'], add: ['caja', 'cajita', 'bote', 'dose', 'schachtel'] },
  { when: ['dispenser'], add: ['dosificador', 'spender'] },
  { when: ['sticker'], add: ['pegatina', 'aufkleber'] },
  { when: ['patch'], add: ['parche', 'aufnaher', 'aufnaeher'] },
  { when: ['pin'], add: ['chapa', 'anstecker', 'button'] },
  { when: ['card'], add: ['tarjeta', 'karte'] },
  { when: ['ashtray', 'asher'], add: ['cenicero', 'aschenbecher'] },
  { when: ['pillow'], add: ['almohada', 'cojin', 'kissen'] },
  { when: ['lanyard', 'leash', 'strap'], add: ['cordon', 'correa', 'band', 'schlaufe'] },
  { when: ['marker'], add: ['rotulador', 'marcador', 'stift', 'marker'] },
  { when: ['sun hat'], add: ['gorro', 'pamela', 'sonnenhut'] },

  // ── Intent words, any language ───────────────────────────────────────────
  { when: ['secret', 'stash', 'hidden'], add: ['escondite', 'oculto', 'secreto', 'versteck', 'geheim', 'discreet', 'discreto', 'diskret'] },
  { when: ['handmade', 'resin'], add: ['hecho a mano', 'artesanal', 'resina', 'handgemacht', 'harz', 'unique', 'unico', 'unikat'] },
  { when: ['set', 'kit'], add: ['pack', 'conjunto', 'regalo', 'geschenk', 'gift', 'bundle'] },
  { when: ['festival', 'rave'], add: ['fiesta', 'party', 'club', 'clubbing', 'techno', 'open air'] },
  { when: ['travel'], add: ['viaje', 'reise', 'van', 'camping', 'roadtrip'] },
  { when: ['foldable'], add: ['plegable', 'klappbar', 'faltbar'] },
];

/**
 * Extra words a product should also match on.
 *
 * `label` is the product's NAME, CATEGORY and TAGS only — deliberately not its
 * description. Substring-matching a whole description turns "lightweight" into a
 * torch and "delighted" into a lamp; the curated fields say what the thing
 * actually is. Matching is on whole words (plural tolerated) for the same reason.
 */
export function synonymsFor(label) {
  const padded = ` ${label} `;
  const hasWord = word => padded.includes(` ${word} `) || padded.includes(` ${word}s `);
  const extra = new Set();
  for (const rule of SYNONYMS) {
    if (rule.when.some(hasWord)) rule.add.forEach(w => extra.add(w));
  }
  return [...extra];
}
