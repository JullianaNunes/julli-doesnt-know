export const defaultThemes = [
  "Neurociência", "Filosofia", "IA e tecnologia", "História", "Comunicação", "Escrita",
];

const brazilDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit",
});

export function dateKey(date = new Date()) {
  const parts = Object.fromEntries(brazilDate.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function calendarDate(key) {
  return new Date(`${key}T12:00:00Z`);
}

export function shiftDay(key, days) {
  const date = calendarDate(key);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function monday(key) {
  return shiftDay(key, -((calendarDate(key).getUTCDay() + 6) % 7));
}

export function weekLabel(start) {
  const end = shiftDay(start, 6);
  const dateOptions = { timeZone: "UTC", day: "numeric", month: "long" };
  const full = new Intl.DateTimeFormat("pt-BR", { ...dateOptions, year: "numeric" });
  const first = start.slice(0, 7) === end.slice(0, 7)
    ? Number(start.slice(8))
    : new Intl.DateTimeFormat("pt-BR", start.slice(0, 4) === end.slice(0, 4)
      ? dateOptions : { ...dateOptions, year: "numeric" }).format(calendarDate(start));
  return `${first} a ${full.format(calendarDate(end))}`;
}

export function activity(records, start) {
  const next = shiftDay(start, 7);
  const inWeek = key => Boolean(key && key >= start && key < next);
  return {
    added: records.filter(record => inWeek(record.createdOn)),
    applied: records.filter(record => inWeek(record.appliedOn)),
  };
}

export function normalized(text) {
  return text.trim().normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("pt-BR");
}

export function grouped(records, field, names = []) {
  const byName = new Map(names.map(name => [normalized(name), { name, records: [] }]));
  for (const record of records) {
    const name = record[field];
    const key = field === "source" && /^https?:\/\//i.test(name) ? name : normalized(name);
    if (!byName.has(key)) byName.set(key, { name, records: [] });
    byName.get(key).records.push(record);
  }
  return [...byName.values()];
}

export function progress(records) {
  const count = records.length;
  const applied = records.filter(record => record.appliedOn).length;
  return { count, applied, rate: count ? Math.round(100 * applied / count) : 0 };
}

export function readState(storage, key) {
  const raw = storage.getItem(key);
  if (raw === null) return { records: [], reviews: {} };
  const state = JSON.parse(raw);
  if (!state || !Array.isArray(state.records) || !state.reviews
      || Array.isArray(state.reviews) || typeof state.reviews !== "object") {
    throw new Error("Invalid learning dashboard data");
  }
  const hasText = value => typeof value === "string" && value.trim();
  const isDateKey = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
  const recordFields = ["id", "theme", "source", "idea", "application"];
  if (!state.records.every(record => record && recordFields.every(field => hasText(record[field]))
       && isDateKey(record.createdOn) && (record.appliedOn === null || isDateKey(record.appliedOn)))) {
    throw new Error("Invalid learning records");
  }
  return state;
}
