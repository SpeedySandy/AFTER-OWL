# AFTER OWL — showroom

The AFTER OWL shop front: [afterowl.shop](https://afterowl.shop). A static React
site on GitHub Pages that reads live stock from the inventory Google Sheet, with
no backend, no database and no accounts.

```bash
npm install
npm run dev        # local dev server
npm run build      # production build + static product pages
npm run sync       # pull inventory + Drive photos, refresh the sitemap
npm run sitemap    # sitemap only, from the committed snapshot (no network)
npm run report     # what's missing: photos, descriptions, materials, sizes, weights
```

## How the data flows

| Source | What it drives |
| --- | --- |
| Inventory Google Sheet (live, in the browser) | price, stock, availability, what exists at all |
| `src/data/catalog.json` | display names, descriptions, variants, curated photos |
| `src/data/sheet-snapshot.json` | instant first paint + fallback if the sheet can't load |
| Drive "Product Images" folder | photos for products without curated ones |

`npm run sync` runs nightly in GitHub Actions and before every deploy: it
refreshes the snapshot, downloads and re-encodes photos to WebP, and regenerates
`public/sitemap.xml`. Stock and prices don't need a deploy — the browser reads
the sheet directly.

## Editing things without touching code

| File | What it controls |
| --- | --- |
| `src/data/events.json` | pop-ups and markets, on the site and in the hero banner. Past dates move themselves. |
| `src/data/social.json` | the "Out in the wild" Instagram strip. Empty = section hidden. |
| `src/data/reviews.json` | buyer reviews. **Copy real Etsy reviews verbatim** — empty = section hidden. |
| `src/config.js` → `NEW_PRODUCT_KEYS` | which products show a "New in" badge. Nothing expires on its own. |
| `src/config.js` → `LOW_STOCK_THRESHOLD` | when "Only N left" appears. Reads real stock; never invents a number. |
| `src/config.js` → `FORMSPREE_FORM_ID` | turns on the newsletter and back-in-stock forms. Empty = both hidden. |
| `src/i18n/en.js` / `es.js` / `de.js` | interface words — buttons, labels, errors. Missing keys fall back to English. |
| `src/data/content.js` | editorial copy: the intro under each category and collection, and the care notes. EN/ES/DE in one place. |
| `src/data/guides.js` | the guide pages. A guide is a title, an intro and sections of product keys — anything that leaves the sheet vanishes from the guide on its own. |
| `src/data/synonyms.js` | multilingual search terms, so "espejo" and "Spiegel" find the mirrors. |

### Turning on email capture

The signup forms post to [Formspree](https://formspree.io) (free tier, no card).
Create a form, copy its ID into `FORMSPREE_FORM_ID` in `src/config.js`, push.
Until then, nothing renders — no form on the site quietly drops addresses. One
form handles both lists; the payload's `list` field says which (`newsletter` or
`restock`) and, for restock, which product.

## Filling the gaps

`npm run report` prints every product missing a photo, description, materials,
size or weight, in-stock ones first, and writes `content-gaps.json` — stubs you
fill in and merge into `catalog.json`.

Nothing generates those values automatically, on purpose. Dimensions and
materials are facts a buyer decides on, and they go into the Product structured
data search engines read; a plausible guess there is a wrong number in front of a
customer. Marketing copy is generated; measurements are measured.

## Ordering

There is no checkout and there isn't meant to be one. The **owl bag** collects
pieces with variants and quantities, and turns them into a single ready-written
WhatsApp message. Everything stays in the visitor's browser until they press
send. Products also link to Etsy where a listing exists.

## URLs and SEO

Every product has a real URL: `/p/<product-key>`.

- `scripts/prerender.mjs` runs after the Vite build and writes a static
  `dist/p/<key>/index.html` for each product, with its own title, description,
  Open Graph image and Product JSON-LD. That's what WhatsApp, Instagram and
  Facebook read when a link is shared — they never run JavaScript.
- `public/404.html` bounces any other deep link back into the app, so client
  routing still works on GitHub Pages.
- Old `?p=<key>` links are upgraded to the new path automatically.

## Languages

English, Spanish and German, switchable in the header and the footer. The choice
is remembered per device and carried in `?lang=`. Product names and descriptions
come from the sheet and the catalog, so those stay in whatever language they were
written in.

## Deploying

Push to `main`. The "Sync & deploy" workflow syncs data, builds, prerenders and
publishes `dist` to the `gh-pages` branch. Pushing needs a GitHub token or the
repo added to the session's sources — the session proxy blocks credentials
otherwise.
