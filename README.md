# AFTER OWL · website

**Live:** https://speedysandy.github.io/AFTER-OWL/

Showroom and brand site for AFTER OWL, a curated Barcelona shop for ravers, adventurers and night owls.
*Gear up. Owl style.*

## How the content works

| What | Where you change it | When it shows up on the site |
| --- | --- | --- |
| Prices, stock, new or removed products | Google Sheet **Inventory List_Google Sheets File** (AFTER OWL Drive folder) | Next page load (open pages re-check every 5 min) |
| Product photos for new products | Drive → AFTER OWL → **Product Images** → a sub-folder named exactly like the product | Nightly photo sync, or right away via *Actions → Sync & deploy → Run workflow* |
| Nice names, descriptions, photo order, variant grouping | `src/data/catalog.json` | After the next deploy |
| About page text | `src/components/About.jsx` | After the next deploy |

### Sheet rules
- Only these columns are used: **Product Group, Product Name, Notes / Description, Selling Price, Stock Qty, Etsy Shop Online**. Buying prices, margins and supplier links are never shown.
- **Stock Qty = 0** → shown as *Sold out* (moved to the end of its category).
- **Empty Stock Qty** → *Ask for availability*.
- **Price and stock both empty** → hidden. A note saying **own use** → hidden.
- Optional: add a column called **Website** and write `FALSE` to hide a row.
- Rows called `Something - colour` are grouped into one product with colour options automatically.
- **Etsy Shop Online = TRUE** → the product gets a *Buy on Etsy* button. Otherwise, visitors get *Order via Instagram DM*.
- Keep the tab names `Inventory List 2025 - Gadget Sh` and `Inventory List 2025 - Art Work` (or update `src/config.js`).
- The sheet must stay shared as *Anyone with the link can view*.

## Development

```bash
npm install
npm run sync    # pull sheet snapshot + download/optimise photos from Drive
npm run dev     # local dev server
npm run build   # production build → dist/
```

Every push to `main` (and a nightly schedule) runs **Sync & deploy**, which refreshes photos, builds and publishes to GitHub Pages.
