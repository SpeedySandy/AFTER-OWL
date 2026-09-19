// Small shared string helpers.
/** Trim to a length without cutting a word in half — link previews show this. */
export function clamp(text, max) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 30)).trimEnd() + '…';
}
