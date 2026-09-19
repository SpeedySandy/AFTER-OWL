// Pop-up dates from src/data/events.json, split into upcoming and past.
// Editing the JSON is the whole workflow — no CMS, no build step.

import data from '../data/events.json';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export function splitEvents(now = startOfToday()) {
  const parsed = (data.events || [])
    .filter(e => e?.date && e?.title)
    .map(e => ({ ...e, when: new Date(`${e.date}T00:00:00`) }))
    .filter(e => !Number.isNaN(e.when.getTime()));

  return {
    upcoming: parsed.filter(e => e.when >= now).sort((a, b) => a.when - b.when),
    past: parsed.filter(e => e.when < now).sort((a, b) => b.when - a.when).slice(0, 4),
  };
}

export function formatEventDate(date, lang) {
  return date.toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' });
}
