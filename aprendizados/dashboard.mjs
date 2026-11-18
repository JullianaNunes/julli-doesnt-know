import { activity, dateKey, defaultThemes, grouped, monday, normalized, progress, readState, shiftDay, weekLabel } from "./model.mjs";

const get = id => document.getElementById(id);
const key = "julli-banco-aprendizados-v1";
const editor = get("editor");
const recordForm = get("record-form");
const reviewForm = get("review-form");
const fields = ["theme", "source", "idea", "application"];
let state = { records: [], reviews: {} };
let editId;
let week = monday(dateKey());
let loadedReview;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function message(id, text) {
  get(id).textContent = text;
}

function load() {
  try {
    state = readState(localStorage, key);
    return true;
  } catch {
    message("status", "Não foi possível ler os registros deste navegador.");
    return false;
  }
}

function change(update, statusId, success = "") {
  try {
    const current = readState(localStorage, key);
    update(current);
    localStorage.setItem(key, JSON.stringify(current));
    state = current;
    message(statusId, success);
    return true;
  } catch {
    message(statusId, "Não foi possível salvar. Verifique se o navegador permite armazenamento local.");
    return false;
  }
}

function safeSource(source) {
  try {
    const url = new URL(source);
    if (["https:", "http:"].includes(url.protocol)) {
      const link = element("a", url.hostname, "record-source");
      link.href = url.href;
      link.title = source;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return link;
    }
  } catch {
    // A source can also be a book, class, or other free-text reference.
  }
  return element("span", source, "record-source");
}

function recordRow(record, showTheme = false) {
  const row = element("li", undefined, "record");
  const checked = element("input");
  checked.type = "checkbox";
  checked.checked = Boolean(record.appliedOn);
  checked.setAttribute("aria-label", `Já apliquei: ${record.idea}`);
  checked.dataset.recordId = record.id;
  const text = element("div", undefined, "record-text");
  text.append(safeSource(record.source));
  if (showTheme) text.append(element("span", ` · ${record.theme}`, "record-source"));
  text.append(element("strong", record.idea), element("span", `→ ${record.application}`, "record-application"));
  const edit = element("button", "Editar", "text-button");
  edit.type = "button";
  edit.dataset.editId = record.id;
  edit.setAttribute("aria-label", `Editar: ${record.idea}`);
  row.append(checked, text, edit);
  return row;
}

function listRecords(list, records, empty, showTheme = false) {
  list.replaceChildren(...records.map(record => recordRow(record, showTheme)));
  if (!records.length) list.append(element("li", empty, "muted"));
}

function themeCard(group, index, expanded) {
  const { count, applied, rate } = progress(group.records);
  const card = element("section", undefined, "card theme");
  card.dataset.accent = index % 6;
  const heading = element("h2", group.name);
  heading.append(element("span", count, "count"));
  const stats = element("div", undefined, "theme-progress");
  const bar = element("progress");
  bar.max = 100;
  bar.value = rate;
  bar.setAttribute("aria-label", `Progresso em ${group.name}`);
  stats.append(bar, element("span", `${applied} de ${count} aplicados`));
  const list = element("ul", undefined, "records");
  listRecords(list, group.records.slice(0, 2), "Nenhum registro neste tema.");
  card.append(heading, stats, list);
  if (count > 2) {
    const extra = element("details");
    extra.dataset.theme = group.name;
    extra.open = expanded.has(group.name);
    const more = element("ul", undefined, "records");
    listRecords(more, group.records.slice(2));
    extra.append(element("summary", `Mais ${count - 2} ${count === 3 ? "registro" : "registros"}`), more);
    card.append(extra);
  }
  return card;
}

function renderThemes() {
  const container = get("themes");
  const expanded = new Set([...container.querySelectorAll("details[open]")].map(details => details.dataset.theme));
  const groups = grouped(state.records, "theme", defaultThemes);
  container.replaceChildren(...groups.map((group, index) => themeCard(group, index, expanded)));
  get("empty-message").hidden = Boolean(state.records.length);
  get("theme-options").replaceChildren(...groups.map(({ name }) => {
    const option = element("option");
    option.value = name;
    return option;
  }));
}

function renderSources() {
  const search = normalized(get("source-search").value);
  const groups = grouped(state.records, "source")
    .filter(({ name }) => normalized(name).includes(search))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  get("sources").replaceChildren(...groups.map(({ name, records }) => {
    const section = element("section", undefined, "card");
    const heading = element("h3");
    heading.append(safeSource(name), element("span", records.length, "count"));
    const list = element("ul", undefined, "records");
    listRecords(list, records, "", true);
    section.append(heading, list);
    return section;
  }));
  if (!groups.length) {
    get("sources").append(element("p", search ? "Nenhuma fonte encontrada." : "As fontes dos seus registros aparecem aqui.", "muted"));
  }
}

function renderReview() {
  const { added, applied } = activity(state.records, week);
  message("period", weekLabel(week));
  message("weekly-new-count", added.length);
  message("weekly-applied-count", applied.length);
  get("next-week").disabled = week >= monday(dateKey());
  listRecords(get("weekly-new"), added, "Nenhum registro nesta semana.", true);
  listRecords(get("weekly-applied"), applied, "Nenhuma aplicação nesta semana.", true);

  const select = get("next-idea");
  const review = state.reviews[week];
  const keepDraft = loadedReview === week;
  const selected = keepDraft ? select.value : review?.nextId || "";
  const candidates = state.records.filter(record => !record.appliedOn || record.id === selected);
  select.replaceChildren(new Option("Nenhum selecionado", ""), ...candidates.map(record => {
    const idea = record.idea.length > 100 ? record.idea.slice(0, 99) + "…" : record.idea;
    return new Option(`${record.theme} · ${idea}`, record.id);
  }));
  select.value = candidates.some(record => record.id === selected) ? selected : "";
  if (!keepDraft) {
    get("review-notes").value = review?.notes || "";
    message("review-status", "");
  }
  loadedReview = week;
}

function currentView() {
  const hash = location.hash;
  if (hash === "#fontes") return "sources";
  if (hash === "#revisao") return "review";
  return "themes";
}

function render() {
  const { count, applied, rate } = progress(state.records);
  message("count", count);
  message("theme-count", grouped(state.records, "theme").length);
  message("applied-count", applied);
  message("rate", `${rate}%`);
  const thisWeek = activity(state.records, monday(dateKey()));
  message("week-summary", `${thisWeek.added.length} ${thisWeek.added.length === 1 ? "novo" : "novos"} · ${thisWeek.applied.length} ${thisWeek.applied.length === 1 ? "aplicado" : "aplicados"}`);
  renderThemes();
  if (currentView() === "sources") renderSources();
  if (currentView() === "review") renderReview();
}

function route() {
  const active = currentView();
  const views = { themes: "#temas", sources: "#fontes", review: "#revisao" };
  for (const view of Object.keys(views)) get(`${view}-view`).hidden = view !== active;
  for (const link of document.querySelectorAll("nav a")) {
    if (link.hash === views[active]) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  render();
}

function openEditor(record) {
  recordForm.reset();
  editId = record?.id;
  message("editor-title", record ? "Editar aprendizado" : "Novo aprendizado");
  message("editor-status", "");
  for (const field of fields) {
    get(field).setCustomValidity("");
    if (record) get(field).value = record[field];
  }
  editor.showModal();
}

get("add").addEventListener("click", () => openEditor());
get("close-editor").addEventListener("click", () => editor.close());
get("source-search").addEventListener("input", renderSources);
recordForm.addEventListener("input", event => event.target.setCustomValidity?.(""));
recordForm.addEventListener("submit", event => {
  event.preventDefault();
  const draft = Object.fromEntries(fields.map(field => [field, get(field).value.trim()]));
  for (const field of fields) {
    get(field).setCustomValidity(draft[field] ? "" : "Preencha este campo.");
  }
  if (!recordForm.reportValidity()) return;

  if (!change(current => {
    const themes = grouped(current.records, "theme", defaultThemes);
    draft.theme = themes.find(({ name }) => normalized(name) === normalized(draft.theme))?.name || draft.theme;
    if (editId) {
      const existing = current.records.find(record => record.id === editId);
      if (!existing) throw new Error("Learning record disappeared");
      Object.assign(existing, draft);
    } else {
      current.records.unshift({ ...draft, id: crypto.randomUUID(), createdOn: dateKey(), appliedOn: null });
    }
  }, "editor-status")) return;

  editor.close();
  render();
  message("status", editId ? "Registro atualizado." : "Aprendizado registrado.");
  if (editId) {
    document.querySelector(`[data-edit-id="${CSS.escape(editId)}"]`)?.focus();
  } else {
    get("add").focus();
  }
});

document.querySelector("main").addEventListener("click", event => {
  const id = event.target.closest("[data-edit-id]")?.dataset.editId;
  const record = state.records.find(item => item.id === id);
  if (record) openEditor(record);
});

document.querySelector("main").addEventListener("change", event => {
  const input = event.target;
  const id = input.dataset.recordId;
  if (!id) return;
  const applied = input.checked;
  const view = input.closest("section[id$='-view']");
  const list = input.closest("ul");
  const listId = list?.id;
  if (!change(current => {
    const record = current.records.find(item => item.id === id);
    if (!record) throw new Error("Learning record disappeared");
    record.appliedOn = applied ? (record.appliedOn || dateKey()) : null;
  }, "status", applied ? "Aprendizado marcado como aplicado." : "Aprendizado voltou a ficar pendente.")) {
    input.checked = !applied;
    return;
  }
  render();
  const selector = `[data-record-id="${CSS.escape(id)}"]`;
  (get(listId)?.querySelector(selector) || view.querySelector(selector) || get("add")).focus();
});

get("previous-week").addEventListener("click", () => {
  week = shiftDay(week, -7);
  renderReview();
});
get("next-week").addEventListener("click", () => {
  if (week < monday(dateKey())) week = shiftDay(week, 7);
  renderReview();
});
reviewForm.addEventListener("submit", event => {
  event.preventDefault();
  change(current => {
    current.reviews[week] = {
      nextId: get("next-idea").value,
      notes: get("review-notes").value.trim(),
    };
  }, "review-status", "Revisão salva.");
});

window.addEventListener("hashchange", route);
window.addEventListener("storage", event => {
  if (event.key === key || event.key === null) {
    if (load()) render();
  }
});
load();
route();
