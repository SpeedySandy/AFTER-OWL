// ─── Google Sheets Configuration ────────────────────────────────────────────
// Paste the ID of any Google Sheet with your product data here.
// The sheet must be shared: File → Share → "Anyone with the link can view"
// Sheet URL format: docs.google.com/spreadsheets/d/{SHEET_ID}/edit
//
// Expected columns (header row required):
//   Title | Description | Section/Category | Price | Quantity | SKU | Photo 1
//
// Currently pointing at: Product_bulk_upload_april_2026
export const SHEET_ID = '1uBNXaz-w0leW5AR-P70lN6XxZbUbcOClt6xkZ7UfWwo';

// ─── Google Drive Image Folder ───────────────────────────────────────────────
// All images in your "Product Images" Drive folder (ID: 1ye96SkK1aUvY_tp4uzCwBEbwZrCVM11G)
// To display these, share the folder: right-click → Share → "Anyone with the link can view"
// Then add the Drive thumbnail URL to your Google Sheet's Photo column:
//   https://drive.google.com/thumbnail?id={FILE_ID}&sz=w800
//
// Unmatched product images — assign each to a product in the sheet:
export const DRIVE_IMAGES = [
  // Full-resolution photos (_1_105_c.jpeg) — use these for products
  '1ECK8aYzfLpz32Bau1u_foXMWt5Dgw45N',
  '1uKXNhn5iGzVNXymm9fAKRVW9hJuhIl9T',
  '1IAKDGTRbH5j8P7ZTBSGe3NQ96bwaBZM0',
  '1wOdIBvkw4fJKR9oqM64WSUhlmcLiQIOv',
  '11xulNyT4opSJiY92h8g8cj8u-KVkqnDs',
  '1iV1F-gBHJvEJeQxKff8wV8KUtZf8hTbg',
  '1RQZKBCJYw5LbQYzXLm8qIvQ12nQo-j-w',
  '1ZKC7NFRURQwRWrHclKBgeWskE2DkYd0f',
  '1Qfh-aROolmbTC-JHrkqLdyGEpFd4nTf_',
  '1lb12FnZUiofSduC-esIOqLwwdfUa3CqC',
  '13lc5iznwUfTPBojAMIbNIGxO7RaUx6DS',
  '1Wdc65WJCPYzwDjiQSb8uuKaqghdiI3rA',
  '1h2TrIE2gKwkgCqvQfy1NbforMYmm0Mgj',
  '1KqUc8F-JGp8Zd48hfKBybo5n7snHmmNp',
  '1IMkFUaRYXZdUcopnPPtSoRG2eXY-UF14',
  '1f0a9AYSSfmKDwtMylS_b-a_JEl7Zqhd6',
  '1_E5fXBQdRUoqz0XhTeM8gyMDpI7hy08w',
  '1Jl0LCi5Il92ElJGQUMNuRzwjeSE5w2ax',
  '1KXOJnUQkigq7sREBWbop23CS7yefTN3f',
  '1t9b3tlzh-lTyKNXwXQoEq6XMZhRYQjXn',
  '12b6b532wiZqUr2JdQEsKRWdhxcTtvMaI',
  '1UEaoefv71f2kpQABbSJQy-U6urBhfTUn',
  '1F4TmKThRvO8yAxn2zrC944IaUgp7zlEz',
  '1vhX0KvUEM7J9VRoIYRw3SZr-OTYJUFVI',
  '1kjANU22KJg_hRM1N_J2oiqg7e2dXig17',
  '18rGAO3tQ7zNu3M7gDej-TpbdgA8fos81',
  '1xmGI0duWJ5pG7I1OFMT6d8jrf1hw6gRz',
  '13DxwT9GX-yLTXBeVm0lAl28zoqo8F_V_',
  '1DyrdKFlDBJuTUoB-fUmfsBw-4tqoFt1m',
  '1GjIETaZqMK8IchCevOQJDgmt4LR5VVZG',
  '1bU-vSCA0rIybd_bwaVcQWOtHjcRgKyLK',
  '1TnL9UYYD2mOZUGoCHNrlE-Mg8GLtnhfA',
  '1pQuNLqKAT_oM3VNUDiJLVUIda_yazUVA',
  '1afHgm8oOwThR1lVgk060DsgrkTscrScl',
];

export function driveThumb(id, size = 'w800') {
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
}
