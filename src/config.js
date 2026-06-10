// ─── Google Sheets Configuration ────────────────────────────────────────────
// Paste the ID of any Google Sheet with your product data here.
// The sheet must be shared: File → Share → "Anyone with the link can view"
// Sheet URL format: docs.google.com/spreadsheets/d/{SHEET_ID}/edit
//
// Expected columns (header row required):
//   Title | Description | Section/Category | Price | Quantity | SKU | Photo 1
//
// Currently pointing at: Product_bulk_upload_april_2026
export const SHEET_ID = '1VYoB5rz-ICyDNLB8YIqZOPkhZPpUqHq0H9ffJxU_INc';

// ─── Google Drive Image Folder ───────────────────────────────────────────────
// Folder: AFTER OWL → Product Images (ID: 1ye96SkK1aUvY_tp4uzCwBEbwZrCVM11G)
// Shared publicly — images load via the Drive thumbnail endpoint.
//
// All 34 photos were visually identified and matched on 2026-06-10:
//
// ── MATCHED → wired into products (src/data/products.js) ──
//   13DxwT9GX-yLTXBeVm0lAl28zoqo8F_V_  Blue Aluminium Tube (plain, trumpet end)
//   1GjIETaZqMK8IchCevOQJDgmt4LR5VVZG  Silver Aluminium Tube (plain, flared)
//   1TnL9UYYD2mOZUGoCHNrlE-Mg8GLtnhfA  EMBRACE Tube black (primary)
//   1pQuNLqKAT_oM3VNUDiJLVUIda_yazUVA  EMBRACE Tube black (alt angle)
//   1afHgm8oOwThR1lVgk060DsgrkTscrScl  EMBRACE Tube black (alt lighting)
//   1bU-vSCA0rIybd_bwaVcQWOtHjcRgKyLK  EMBRACE Tube silver
//   1DyrdKFlDBJuTUoB-fUmfsBw-4tqoFt1m  EMBRACE Tube blue
//   1xmGI0duWJ5pG7I1OFMT6d8jrf1hw6gRz  EMBRACE Tube green
//
// ── HALO MIRROR series (added as new product HAN-HALO-MIRROR) ──
//   1Jl0LCi5Il92ElJGQUMNuRzwjeSE5w2ax  Complete piece w/ stand + lamp (hero shot)
//   1lb12FnZUiofSduC-esIOqLwwdfUa3CqC  Top-down finished mirror
//   1ZKC7NFRURQwRWrHclKBgeWskE2DkYd0f  Hand holding mirror
//   1KqUc8F-JGp8Zd48hfKBybo5n7snHmmNp  Clip lamp lit, warm glow
//   13lc5iznwUfTPBojAMIbNIGxO7RaUx6DS  Macro of resin rim detail
//   1IAKDGTRbH5j8P7ZTBSGe3NQ96bwaBZM0  Mirror + silver figure stand
//   (build-process shots, not used in app:)
//   1ECK8aYzfLpz32Bau1u_foXMWt5Dgw45N  1uKXNhn5iGzVNXymm9fAKRVW9hJuhIl9T
//   1wOdIBvkw4fJKR9oqM64WSUhlmcLiQIOv  11xulNyT4opSJiY92h8g8cj8u-KVkqnDs
//   1iV1F-gBHJvEJeQxKff8wV8KUtZf8hTbg  1RQZKBCJYw5LbQYzXLm8qIvQ12nQo-j-w
//   1Qfh-aROolmbTC-JHrkqLdyGEpFd4nTf_  1lb12... 1Wdc65WJCPYzwDjiQSb8uuKaqghdiI3rA
//   1h2TrIE2gKwkgCqvQfy1NbforMYmm0Mgj  1IMkFUaRYXZdUcopnPPtSoRG2eXY-UF14
//   1f0a9AYSSfmKDwtMylS_b-a_JEl7Zqhd6  1_E5fXBQdRUoqz0XhTeM8gyMDpI7hy08w
//
// ── UNMATCHED — products not yet in the inventory sheet ──
//   1F4TmKThRvO8yAxn2zrC944IaUgp7zlEz  Burgundy cap "I PEE IN POOLS"
//   1UEaoefv71f2kpQABbSJQy-U6urBhfTUn  Black tote "THIS BAG CONTAINS A BOMB..."
//   18rGAO3tQ7zNu3M7gDej-TpbdgA8fos81  Stash flip car-key fob
//   1vhX0KvUEM7J9VRoIYRw3SZr-OTYJUFVI  Silver mini spoon keychain w/ crown
//   1kjANU22KJg_hRM1N_J2oiqg7e2dXig17  5x stainless mini scoop spoons
//   12b6b532wiZqUr2JdQEsKRWdhxcTtvMaI  EMBRACE COLLECTIVE / FC Ballern jersey
//   1KXOJnUQkigq7sREBWbop23CS7yefTN3f  Custom blue/chrome side table (top view)
//   1t9b3tlzh-lTyKNXwXQoEq6XMZhRYQjXn  Custom blue/chrome side table (side view)

export function driveThumb(id, size = 'w800') {
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
}
