// Legal pages: /legal/<key>, in the three site languages.
//
// Everything here describes what this site actually does — no analytics, no
// cookies of its own, no checkout — so the texts stay true as long as that
// stays true. If a tracker, a payment step or a login is ever added, these
// pages have to change with it.
//
// The operator's identity lives in src/config.js. While LEGAL_OPERATOR is
// empty the footer links stay hidden, the same way the Formspree forms and the
// reviews section hide themselves until they have real content.

import { LEGAL_OPERATOR, LEGAL_ADDRESS, LEGAL_EMAIL, LEGAL_TAX_ID, WHATSAPP_NUMBER, INSTAGRAM_HANDLE, ETSY_SHOP_URL } from '../config.js';

export const LEGAL_UPDATED = '2026-09-20';

const operator = () => LEGAL_OPERATOR || '—';
const contactLine = {
  en: () => [LEGAL_EMAIL && 'Email: ' + LEGAL_EMAIL, 'WhatsApp: +' + WHATSAPP_NUMBER, 'Instagram: @' + INSTAGRAM_HANDLE].filter(Boolean).join(' · '),
  es: () => [LEGAL_EMAIL && 'Correo: ' + LEGAL_EMAIL, 'WhatsApp: +' + WHATSAPP_NUMBER, 'Instagram: @' + INSTAGRAM_HANDLE].filter(Boolean).join(' · '),
  de: () => [LEGAL_EMAIL && 'E-Mail: ' + LEGAL_EMAIL, 'WhatsApp: +' + WHATSAPP_NUMBER, 'Instagram: @' + INSTAGRAM_HANDLE].filter(Boolean).join(' · '),
};

/** Documents are plain data: { h, body } sections, body lines are strings. */
export const LEGAL_DOCS = [
  {
    key: 'notice',
    title: { en: 'Legal notice', es: 'Aviso legal', de: 'Impressum' },
    intro: {
      en: 'Who runs this site, and how to reach a human.',
      es: 'Quién gestiona esta web y cómo contactar con una persona.',
      de: 'Wer diese Seite betreibt und wie man einen Menschen erreicht.',
    },
    sections: [
      {
        h: { en: 'Who we are', es: 'Quiénes somos', de: 'Wer wir sind' },
        body: {
          en: () => [
            'AFTER OWL is a small, privately run project based in Barcelona, Spain. It is operated by ' + operator() + '.',
            LEGAL_ADDRESS ? 'Address: ' + LEGAL_ADDRESS : 'Postal address on request.',
            LEGAL_TAX_ID ? 'Tax ID: ' + LEGAL_TAX_ID : 'AFTER OWL is not a registered company. Sales are occasional and on a small scale.',
            contactLine.en(),
          ],
          es: () => [
            'AFTER OWL es un proyecto pequeño y de carácter privado con base en Barcelona, España. Está gestionado por ' + operator() + '.',
            LEGAL_ADDRESS ? 'Dirección: ' + LEGAL_ADDRESS : 'Dirección postal disponible a petición.',
            LEGAL_TAX_ID ? 'NIF: ' + LEGAL_TAX_ID : 'AFTER OWL no es una empresa registrada. Las ventas son ocasionales y a pequeña escala.',
            contactLine.es(),
          ],
          de: () => [
            'AFTER OWL ist ein kleines, privat betriebenes Projekt mit Sitz in Barcelona, Spanien. Betrieben von ' + operator() + '.',
            LEGAL_ADDRESS ? 'Anschrift: ' + LEGAL_ADDRESS : 'Postanschrift auf Anfrage.',
            LEGAL_TAX_ID ? 'Steuernummer: ' + LEGAL_TAX_ID : 'AFTER OWL ist kein eingetragenes Unternehmen. Verkäufe finden gelegentlich und in kleinem Umfang statt.',
            contactLine.de(),
          ],
        },
      },
      {
        h: { en: 'What this site is', es: 'Qué es esta web', de: 'Was diese Seite ist' },
        body: {
          en: () => [
            'This is a shop window, not a shop counter. Nothing is sold, charged or paid for on this site. The bag collects what you like and turns it into one message on WhatsApp; the sale itself happens in that conversation, or through the Etsy shop at ' + ETSY_SHOP_URL + '.',
            'Stock and prices are read live from our own inventory, so they are as accurate as we can make them. Mistakes still happen — if a price or an availability is wrong, we will say so before anything is agreed.',
          ],
          es: () => [
            'Esto es un escaparate, no un mostrador. En esta web no se vende, ni se cobra, ni se paga nada. La bolsa reúne lo que te gusta y lo convierte en un solo mensaje de WhatsApp; la venta ocurre en esa conversación o a través de la tienda de Etsy: ' + ETSY_SHOP_URL + '.',
            'El stock y los precios se leen en directo de nuestro inventario, así que son todo lo exactos que podemos. Aun así hay errores — si un precio o una disponibilidad es incorrecta, lo diremos antes de cerrar nada.',
          ],
          de: () => [
            'Das hier ist ein Schaufenster, keine Ladentheke. Auf dieser Seite wird nichts verkauft, abgerechnet oder bezahlt. Die Tasche sammelt, was dir gefällt, und macht daraus eine einzige WhatsApp-Nachricht; der Verkauf passiert in diesem Gespräch oder über den Etsy-Shop: ' + ETSY_SHOP_URL + '.',
            'Bestand und Preise werden live aus unserem Inventar gelesen und sind so genau, wie wir sie halten können. Fehler passieren trotzdem — wenn ein Preis oder eine Verfügbarkeit falsch ist, sagen wir es, bevor etwas vereinbart wird.',
          ],
        },
      },
      {
        h: { en: 'Content and images', es: 'Contenidos e imágenes', de: 'Inhalte und Bilder' },
        body: {
          en: () => [
            'Texts, photographs and the AFTER OWL name and logo belong to us. Use them somewhere else and we would rather you asked first — we usually say yes.',
            'Brand names that appear on products are the property of their owners and are used only to describe what a piece is.',
          ],
          es: () => [
            'Los textos, las fotografías y el nombre y logotipo de AFTER OWL nos pertenecen. Si quieres usarlos en otro sitio, pregúntanos antes — solemos decir que sí.',
            'Las marcas que aparecen en los productos pertenecen a sus titulares y se usan solo para describir qué es cada pieza.',
          ],
          de: () => [
            'Texte, Fotos sowie Name und Logo von AFTER OWL gehören uns. Wer sie anderswo verwenden möchte, fragt am besten vorher — meistens sagen wir ja.',
            'Markennamen auf Produkten gehören ihren Inhabern und werden nur zur Beschreibung verwendet.',
          ],
        },
      },
      {
        h: { en: 'Links out', es: 'Enlaces externos', de: 'Externe Links' },
        body: {
          en: () => ['We link to Etsy, Instagram and WhatsApp. What happens on those platforms is governed by their terms and their privacy policies, not ours.'],
          es: () => ['Enlazamos a Etsy, Instagram y WhatsApp. Lo que ocurre en esas plataformas se rige por sus condiciones y sus políticas de privacidad, no por las nuestras.'],
          de: () => ['Wir verlinken zu Etsy, Instagram und WhatsApp. Was dort passiert, richtet sich nach deren Bedingungen und Datenschutzerklärungen, nicht nach unseren.'],
        },
      },
    ],
  },
  {
    key: 'privacy',
    title: { en: 'Privacy', es: 'Privacidad', de: 'Datenschutz' },
    intro: {
      en: 'What this site knows about you, which is close to nothing.',
      es: 'Qué sabe esta web sobre ti, que es casi nada.',
      de: 'Was diese Seite über dich weiß, nämlich fast nichts.',
    },
    sections: [
      {
        h: { en: 'The short version', es: 'La versión corta', de: 'Die kurze Fassung' },
        body: {
          en: () => [
            'There is no analytics on this site, no advertising trackers, no social pixels, no accounts and no cookies set by us. We do not build a profile of you and we have nothing to sell to anyone about you.',
            'You can browse the entire shop without giving us a single piece of personal data. We only learn who you are when you choose to write to us.',
          ],
          es: () => [
            'Esta web no tiene analítica, ni rastreadores publicitarios, ni píxeles de redes sociales, ni cuentas, ni cookies propias. No creamos ningún perfil tuyo y no tenemos nada que vender sobre ti.',
            'Puedes ver toda la tienda sin darnos un solo dato personal. Solo sabemos quién eres cuando decides escribirnos.',
          ],
          de: () => [
            'Diese Seite hat keine Analyse-Tools, keine Werbetracker, keine Social-Pixel, keine Konten und setzt keine eigenen Cookies. Wir erstellen kein Profil von dir und haben nichts über dich zu verkaufen.',
            'Du kannst den ganzen Shop ansehen, ohne uns ein einziges personenbezogenes Datum zu geben. Wer du bist, erfahren wir erst, wenn du uns schreibst.',
          ],
        },
      },
      {
        h: { en: 'What happens anyway', es: 'Lo que ocurre de todos modos', de: 'Was trotzdem passiert' },
        body: {
          en: () => [
            'The site is hosted on GitHub Pages behind Cloudflare. Like any web server, they log requests — including your IP address — to serve pages and stop abuse. We do not see those logs.',
            'The product list is fetched from a Google Sheets endpoint each time the page loads, so Google sees that request. Nothing else goes to Google: the typefaces are served from this domain rather than from Google Fonts, deliberately.',
            'Photos are served from this domain. The exception is the occasional image that has not been copied across yet and falls back to Google Drive.',
            'That is the complete list of third parties involved in simply looking at this site.',
          ],
          es: () => [
            'La web está alojada en GitHub Pages detrás de Cloudflare. Como cualquier servidor, registran las peticiones — incluida tu dirección IP — para servir páginas y frenar abusos. Nosotros no vemos esos registros.',
            'La lista de productos se descarga de un endpoint de Google Sheets cada vez que se carga la página, así que Google ve esa petición. Nada más va a Google: las tipografías se sirven desde este dominio y no desde Google Fonts, a propósito.',
            'Las fotos se sirven desde este dominio. La excepción es alguna imagen que todavía no se ha copiado y que recurre a Google Drive.',
            'Esa es la lista completa de terceros implicados en el simple hecho de mirar esta web.',
          ],
          de: () => [
            'Die Seite liegt auf GitHub Pages hinter Cloudflare. Wie jeder Webserver protokollieren sie Anfragen — auch deine IP-Adresse —, um Seiten auszuliefern und Missbrauch zu verhindern. Wir sehen diese Protokolle nicht.',
            'Die Produktliste wird bei jedem Seitenaufruf von einem Google-Sheets-Endpunkt geladen, Google sieht diese Anfrage. Sonst geht nichts an Google: Die Schriften werden bewusst von dieser Domain ausgeliefert und nicht von Google Fonts.',
            'Fotos kommen von dieser Domain. Die Ausnahme sind einzelne Bilder, die noch nicht kopiert wurden und auf Google Drive zurückfallen.',
            'Das ist die vollständige Liste der Dritten, die am bloßen Betrachten dieser Seite beteiligt sind.',
          ],
        },
      },
      {
        h: { en: 'When you write to us', es: 'Cuando nos escribes', de: 'Wenn du uns schreibst' },
        body: {
          en: () => [
            'The bag and the contact form do not send anything anywhere. They open WhatsApp with a message already written; nothing leaves your browser until you press send yourself.',
            'Once you do, you are in a conversation with us on WhatsApp, Instagram or Etsy, and those platforms handle that data under their own policies. From that conversation we keep what an order needs: your name, your contact handle, and a delivery address if something has to be shipped. We use it to get your order to you and to answer you afterwards, and we keep it only as long as that takes plus whatever a dispute might need.',
            'We never sell it, never share it for advertising, and never add you to a mailing list because you asked a question.',
          ],
          es: () => [
            'La bolsa y el formulario de contacto no envían nada a ningún sitio. Abren WhatsApp con el mensaje ya escrito; nada sale de tu navegador hasta que pulsas enviar tú.',
            'A partir de ahí estás en una conversación con nosotros en WhatsApp, Instagram o Etsy, y esas plataformas tratan esos datos según sus propias políticas. De esa conversación guardamos lo que un pedido necesita: tu nombre, tu contacto y una dirección de envío si hay que mandar algo. Lo usamos para hacerte llegar el pedido y para responderte después, y lo conservamos solo el tiempo necesario más lo que pudiera requerir una reclamación.',
            'Nunca lo vendemos, nunca lo compartimos con fines publicitarios y nunca te apuntamos a una lista de correo por haber preguntado algo.',
          ],
          de: () => [
            'Die Tasche und das Kontaktformular senden nichts irgendwohin. Sie öffnen WhatsApp mit einer fertig geschriebenen Nachricht; nichts verlässt deinen Browser, bis du selbst auf Senden drückst.',
            'Danach bist du mit uns im Gespräch auf WhatsApp, Instagram oder Etsy, und diese Plattformen verarbeiten die Daten nach ihren eigenen Richtlinien. Aus dem Gespräch behalten wir, was eine Bestellung braucht: deinen Namen, deinen Kontakt und eine Lieferadresse, falls etwas verschickt wird. Wir nutzen das, um die Bestellung zuzustellen und dir danach zu antworten, und bewahren es nur so lange auf, wie das dauert, zuzüglich dessen, was ein Streitfall erfordern könnte.',
            'Wir verkaufen es nie, geben es nie für Werbung weiter und setzen dich nie auf einen Verteiler, weil du eine Frage gestellt hast.',
          ],
        },
      },
      {
        h: { en: 'Your rights', es: 'Tus derechos', de: 'Deine Rechte' },
        body: {
          en: () => [
            'Under the GDPR you can ask what we hold about you, have it corrected, have it deleted, object to us using it, or ask for a copy. Write to us on any of the channels above and we will do it — there is no form to fill in and no fee.',
            'If you think we have handled your data badly, you can complain to the Spanish data protection authority, the Agencia Española de Protección de Datos (www.aepd.es).',
          ],
          es: () => [
            'Según el RGPD puedes pedirnos qué datos tuyos tenemos, corregirlos, borrarlos, oponerte a su uso o pedir una copia. Escríbenos por cualquiera de los canales de arriba y lo haremos — sin formularios y sin coste.',
            'Si crees que hemos tratado mal tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).',
          ],
          de: () => [
            'Nach der DSGVO kannst du erfragen, welche Daten wir über dich haben, sie berichtigen oder löschen lassen, der Nutzung widersprechen oder eine Kopie verlangen. Schreib uns über einen der oben genannten Kanäle, und wir erledigen es — ohne Formular und ohne Gebühr.',
            'Wenn du meinst, wir seien schlecht mit deinen Daten umgegangen, kannst du dich bei der spanischen Datenschutzbehörde beschweren, der Agencia Española de Protección de Datos (www.aepd.es).',
          ],
        },
      },
      {
        h: { en: 'Not for minors', es: 'No para menores', de: 'Nicht für Minderjährige' },
        body: {
          en: () => ['The shop is meant for adults. We do not knowingly collect anything from anyone under 18.'],
          es: () => ['La tienda está pensada para personas adultas. No recogemos conscientemente datos de menores de 18 años.'],
          de: () => ['Der Shop richtet sich an Erwachsene. Wir erheben wissentlich keine Daten von Personen unter 18 Jahren.'],
        },
      },
    ],
  },
  {
    key: 'cookies',
    title: { en: 'Cookies', es: 'Cookies', de: 'Cookies' },
    intro: {
      en: 'We do not set any. Here is what is stored in your browser instead.',
      es: 'No usamos ninguna. Esto es lo que se guarda en tu navegador.',
      de: 'Wir setzen keine. Das hier wird stattdessen im Browser gespeichert.',
    },
    sections: [
      {
        h: { en: 'No cookies, no banner', es: 'Sin cookies, sin banner', de: 'Keine Cookies, kein Banner' },
        body: {
          en: () => [
            'This site sets no cookies at all, which is why you were never asked to accept any. There is nothing to consent to and nothing to reject.',
            'What the site does use is your browser own storage, and only for things you asked it to remember.',
          ],
          es: () => [
            'Esta web no usa ninguna cookie, por eso nunca te hemos pedido que aceptes nada. No hay nada que consentir ni que rechazar.',
            'Lo que sí usa es el almacenamiento propio de tu navegador, y solo para cosas que tú le has pedido que recuerde.',
          ],
          de: () => [
            'Diese Seite setzt überhaupt keine Cookies, deshalb wurdest du nie um Zustimmung gebeten. Es gibt nichts zuzustimmen und nichts abzulehnen.',
            'Was die Seite nutzt, ist der Speicher deines Browsers, und zwar nur für Dinge, die du dir merken lassen wolltest.',
          ],
        },
      },
      {
        h: { en: 'What is stored locally', es: 'Qué se guarda en local', de: 'Was lokal gespeichert wird' },
        body: {
          en: () => [
            'Your bag, so it survives a reload. Your saved pieces. The last few products you looked at. Your language choice. And a note that you closed the announcement bar, which lasts until you close the tab.',
            'All of it stays in your browser. None of it is sent to us or to anyone else, and none of it identifies you. Clearing your browser data for this site removes the lot.',
          ],
          es: () => [
            'Tu bolsa, para que sobreviva a una recarga. Las piezas que has guardado. Los últimos productos que has visto. Tu idioma. Y una nota de que cerraste la barra de aviso, que dura hasta que cierras la pestaña.',
            'Todo se queda en tu navegador. Nada se nos envía a nosotros ni a nadie, y nada de eso te identifica. Si borras los datos del navegador para este sitio, desaparece todo.',
          ],
          de: () => [
            'Deine Tasche, damit sie einen Reload übersteht. Gemerkte Stücke. Die zuletzt angesehenen Produkte. Deine Sprachwahl. Und der Hinweis, dass du die Ankündigungsleiste geschlossen hast — der gilt, bis du den Tab schließt.',
            'Alles bleibt in deinem Browser. Nichts davon geht an uns oder an andere, und nichts davon identifiziert dich. Wenn du die Browserdaten für diese Seite löschst, ist alles weg.',
          ],
        },
      },
      {
        h: { en: 'When you click away', es: 'Cuando sales de aquí', de: 'Wenn du weiterklickst' },
        body: {
          en: () => ['Etsy, Instagram and WhatsApp set their own cookies once you are on their side. That is theirs to explain, and we have no control over it.'],
          es: () => ['Etsy, Instagram y WhatsApp usan sus propias cookies una vez estás en su terreno. Eso lo explican ellos y nosotros no tenemos ningún control.'],
          de: () => ['Etsy, Instagram und WhatsApp setzen ihre eigenen Cookies, sobald du dort bist. Das erklären sie selbst, wir haben darauf keinen Einfluss.'],
        },
      },
    ],
  },
  {
    key: 'terms',
    title: { en: 'Terms, shipping and returns', es: 'Condiciones, envíos y devoluciones', de: 'Bedingungen, Versand und Rückgabe' },
    intro: {
      en: 'How ordering works when there is no checkout button.',
      es: 'Cómo se pide cuando no hay botón de pago.',
      de: 'Wie eine Bestellung läuft, wenn es keinen Kaufen-Button gibt.',
    },
    sections: [
      {
        h: { en: 'How an order happens', es: 'Cómo se hace un pedido', de: 'Wie eine Bestellung zustande kommt' },
        body: {
          en: () => [
            'Nothing on this site is a binding offer. The bag writes a WhatsApp message for you; a sale exists only once we have confirmed the piece, the total and the delivery in that conversation, or once you have bought through Etsy.',
            'Prices are in euros and include what you see. Shipping is agreed in the chat and depends on where it is going.',
          ],
          es: () => [
            'Nada en esta web es una oferta vinculante. La bolsa te escribe un mensaje de WhatsApp; la venta existe solo cuando hemos confirmado la pieza, el total y el envío en esa conversación, o cuando compras por Etsy.',
            'Los precios están en euros. El envío se acuerda en el chat y depende del destino.',
          ],
          de: () => [
            'Nichts auf dieser Seite ist ein verbindliches Angebot. Die Tasche schreibt dir eine WhatsApp-Nachricht; ein Kauf besteht erst, wenn wir Stück, Summe und Lieferung in diesem Gespräch bestätigt haben — oder wenn du über Etsy kaufst.',
            'Preise sind in Euro. Der Versand wird im Chat vereinbart und hängt vom Ziel ab.',
          ],
        },
      },
      {
        h: { en: 'Shipping', es: 'Envíos', de: 'Versand' },
        body: {
          en: () => [
            'Everything ships from Barcelona. Etsy orders go out tracked, usually within 1 to 3 business days. If you are local, pickup at a pop-up or a meet-up can be arranged instead — just ask.',
            'Handmade pieces are made in a queue. We give you a real estimate before you commit, usually 1 to 3 weeks.',
          ],
          es: () => [
            'Todo sale desde Barcelona. Los pedidos de Etsy se envían con seguimiento, normalmente en 1 a 3 días laborables. Si estás por aquí, se puede recoger en un pop-up o quedando — solo tienes que pedirlo.',
            'Las piezas hechas a mano se hacen por cola. Te damos una estimación real antes de que te comprometas, normalmente de 1 a 3 semanas.',
          ],
          de: () => [
            'Alles wird aus Barcelona versendet. Etsy-Bestellungen gehen mit Sendungsverfolgung raus, meist innerhalb von 1 bis 3 Werktagen. Wer vor Ort ist, kann stattdessen bei einem Pop-up oder Treffen abholen — einfach fragen.',
            'Handgemachte Stücke entstehen der Reihe nach. Wir nennen dir vorher eine realistische Schätzung, meist 1 bis 3 Wochen.',
          ],
        },
      },
      {
        h: { en: 'Returns', es: 'Devoluciones', de: 'Rückgabe' },
        body: {
          en: () => [
            'If a piece arrives damaged or is not what was described, message us within 7 days and we will sort it out: replacement, exchange or refund, whichever you prefer.',
            'One-of-a-kind handmade pieces are sold as shown in their photographs, so look closely before ordering — no two resin pours are identical, and that is the point.',
            'Orders placed through Etsy also follow Etsy own buyer protection and returns policy. Where consumer law gives you rights on a purchase, you have them regardless of anything written on this page.',
          ],
          es: () => [
            'Si una pieza llega dañada o no es lo descrito, escríbenos en un plazo de 7 días y lo resolvemos: reemplazo, cambio o reembolso, lo que prefieras.',
            'Las piezas únicas hechas a mano se venden tal y como se ven en sus fotos, así que míralas bien antes de pedir — no hay dos coladas de resina iguales, y de eso se trata.',
            'Los pedidos hechos por Etsy siguen además la protección al comprador y la política de devoluciones de Etsy. Cuando la normativa de consumo te otorgue derechos sobre una compra, los tienes con independencia de lo que diga esta página.',
          ],
          de: () => [
            'Kommt ein Stück beschädigt an oder entspricht es nicht der Beschreibung, schreib uns innerhalb von 7 Tagen, und wir regeln es: Ersatz, Umtausch oder Erstattung, ganz wie du möchtest.',
            'Einzelstücke werden so verkauft, wie sie auf den Fotos zu sehen sind — schau sie dir vorher genau an. Kein Harzguss gleicht dem anderen, und genau das ist der Punkt.',
            'Für Bestellungen über Etsy gelten zusätzlich Etsys Käuferschutz und Rückgaberegeln. Wo dir das Verbraucherrecht Rechte an einem Kauf gibt, hast du sie unabhängig von allem, was auf dieser Seite steht.',
          ],
        },
      },
      {
        h: { en: 'Small print that matters', es: 'Letra pequeña que importa', de: 'Kleingedrucktes, das zählt' },
        body: {
          en: () => [
            'AFTER OWL is a private, small-scale project, not a registered company. We say so plainly rather than dressing it up.',
            'The pieces are meant for adults and for sensible use. What you do with them afterwards is yours.',
            'Spanish law applies, and Barcelona is where any argument would end up.',
          ],
          es: () => [
            'AFTER OWL es un proyecto privado y de pequeña escala, no una empresa registrada. Lo decimos claro en vez de disfrazarlo.',
            'Las piezas están pensadas para personas adultas y para un uso sensato. Lo que hagas con ellas después es cosa tuya.',
            'Se aplica la legislación española, y Barcelona sería el lugar de cualquier disputa.',
          ],
          de: () => [
            'AFTER OWL ist ein privates Projekt in kleinem Rahmen, kein eingetragenes Unternehmen. Das sagen wir offen, statt es zu verkleiden.',
            'Die Stücke sind für Erwachsene und für vernünftigen Gebrauch gedacht. Was du danach damit machst, ist deine Sache.',
            'Es gilt spanisches Recht, und Barcelona wäre der Ort jeder Auseinandersetzung.',
          ],
        },
      },
    ],
  },
];

export function findLegal(key) {
  return LEGAL_DOCS.find(d => d.key === key) || null;
}

export function legalEnabled() {
  return Boolean(LEGAL_OPERATOR);
}
