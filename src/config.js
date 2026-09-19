// ─── AFTER OWL site configuration ───────────────────────────────────────────
//
// INVENTORY  →  Google Sheet "Inventory List_Google Sheets File" (AFTER OWL Drive folder)
// The site reads the sheet live in the visitor's browser, so every change in the
// sheet (price, stock, new rows, deleted rows) shows up on the next page load.
// The sheet must stay shared as "Anyone with the link can view".
//
// Only these columns are ever read: Product Group, Product Name, Notes / Description,
// Selling Price, Stock Qty, Etsy Shop Online. Buying prices, margins and supplier
// links are ignored and never shipped to the website.

export const SHEET_ID = '1VYoB5rz-ICyDNLB8YIqZOPkhZPpUqHq0H9ffJxU_INc';

// Tab names inside the sheet (must match exactly).
// The former "Inventory List_Homemade Art" tab was merged into this one —
// its rows (Golden Pyramide, Hidden Smiley, Spinning Lines, FC Ballern
// München Plate, ...) now live here with their own Product Group cell.
export const SHEET_TABS = [
  { name: 'Inventory List_Products', defaultGroup: 'Handmade' },
];

// Google Drive folder with product photos (shared publicly).
// Sub-folders named like a product (e.g. "Secret Stash Belt") are picked up by
// the nightly photo sync for products that don't have curated photos yet.
export const DRIVE_IMAGES_FOLDER = '1ye96SkK1aUvY_tp4uzCwBEbwZrCVM11G';

export const ETSY_SHOP_URL = 'https://www.etsy.com/shop/AfterOwlShop';
export const INSTAGRAM_HANDLE = 'after.owl.shop';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_HANDLE}`;

// WhatsApp number for the contact form & "Ask on WhatsApp" buttons.
// International format, digits only (e.g. Spain +34 612 345 678 → '34612345678').
// Leave empty to hide all WhatsApp buttons.
export const WHATSAPP_NUMBER = '34625667136';
export const whatsappUrl = text =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// How often an open page re-checks the sheet (ms)
export const REFRESH_INTERVAL = 5 * 60 * 1000;

export function sheetCsvUrl(tabName) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
}

export function driveThumb(id, size = 'w1000') {
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
}

// ─── Email capture ──────────────────────────────────────────────────────────
// The site has no backend, so both forms post to Formspree (free tier: 50
// submissions a month, no card needed). Set it up once:
//
//   1. formspree.io → sign up with the AFTER OWL address
//   2. New Form → name it "AFTER OWL crew" → copy the form ID (looks like "xayzqwer")
//   3. Paste it below, commit, push. Done.
//
// Leave it empty and every signup form simply doesn't render — nothing breaks,
// nothing half-working ships. One form handles both the newsletter and the
// back-in-stock alerts; the payload carries a `list` field telling them apart.
export const FORMSPREE_FORM_ID = '';
export const formspreeUrl = () =>
  FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : null;

// ─── Merchandising ──────────────────────────────────────────────────────────
// At or below this many in stock, the product shows "Only N left".
// Real scarcity only: this reads the live sheet, it never invents a number.
export const LOW_STOCK_THRESHOLD = 3;

// Product keys to flag as "New in" on the cards and in the "Newest first" sort.
// Keys are the ones in src/data/catalog.json (auto rows use "auto-<slugified-name>").
// Clear this list when a drop stops being new — nothing expires on its own.
export const NEW_PRODUCT_KEYS = [];
