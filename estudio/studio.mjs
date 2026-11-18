import { chatPrompt, draft, example, formats, parsePlan, toText } from "./plans.mjs";

const get = id => document.getElementById(id);
const form = get("compose");
const brief = get("brief");
const storageKey = "julli-estudio-roteiros-v1";
let current;

function format() {
  return new FormData(form).get("format");
}

function requireIdea() {
  brief.setCustomValidity(brief.value.trim() ? "" : "Escreva sua ideia para continuar.");
  return form.reportValidity() ? brief.value.trim() : "";
}

function node(tag, text, cssClass) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (cssClass) el.className = cssClass;
  return el;
}

function render(plan, idea, source) {
  current = { plan, idea, source };
  const carousel = plan.format === "carrossel";
  const duration = plan.script.reduce((sum, row) => sum + row.duration, 0);
  const summary = carousel ? `${plan.script.length} slides` : `${Math.round(duration)} s aproximados`;
  get("result-title").textContent = plan.title;
  get("result-meta").textContent = `${formats[plan.format]} · ${summary} · ${source === "chat" ? "Plano importado" : "Rascunho guiado"}`;
  get("script-label").textContent = carousel ? "Roteiro slide a slide" : "Roteiro e cortes";
  get("takes-label").textContent = carousel ? "Imagens para separar" : "Takes pra gravar";
  get("caption").textContent = plan.caption;

  get("timeline").replaceChildren(...plan.script.map(row => {
    const segment = node("span");
    segment.style.flexGrow = carousel ? 1 : Math.max(row.duration, 1);
    segment.style.flexBasis = "0";
    return segment;
  }));

  get("script").replaceChildren(...plan.script.map(row => {
    const item = node("li");
    const detail = node("div");
    detail.append(node("strong", row.title), node("p", row.text), node("p", row.cue, "cue"));
    item.append(node("span", row.mark, "mark"), detail);
    return item;
  }));
  get("takes").replaceChildren(...plan.takes.map(take => node("li", take)));
  get("editing").replaceChildren(...plan.editing.flatMap(row => [node("dt", row.label), node("dd", row.value)]));
  get("empty").hidden = true;
  get("result").hidden = false;
}

function readSaved() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(item => {
      try {
        return Boolean(item?.id && typeof item.idea === "string" && parsePlan(JSON.stringify(item.plan)));
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }
}

function updateSaved(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function showSaved() {
  const items = readSaved();
  const list = get("saved");
  list.replaceChildren();
  if (!items.length) {
    list.append(node("li", "Nenhum roteiro salvo neste navegador.", "card"));
    return;
  }
  for (const item of items) {
    const row = node("li", undefined, "card");
    const label = node("div");
    const actions = node("div", undefined, "actions");
    const open = node("button", "Abrir", "quiet");
    const remove = node("button", "Remover", "quiet");
    label.append(node("strong", item.plan.title), node("small", formats[item.plan.format]));
    open.addEventListener("click", () => {
      brief.value = item.idea;
      brief.setCustomValidity("");
      form.elements.format.value = item.plan.format;
      render(item.plan, item.idea, item.source);
      get("status").textContent = "";
      location.hash = "#novo";
    });
    remove.setAttribute("aria-label", `Remover ${item.plan.title} dos salvos`);
    remove.addEventListener("click", () => {
      if (!window.confirm(`Remover “${item.plan.title}” dos roteiros salvos?`)) return;
      try {
        updateSaved(readSaved().filter(saved => saved.id !== item.id));
        showSaved();
      } catch {
        window.alert("Não foi possível atualizar os roteiros salvos neste navegador.");
      }
    });
    actions.append(open, remove);
    row.append(label, actions);
    list.append(row);
  }
}

function route() {
  const saved = location.hash === "#salvos";
  get("novo").hidden = saved;
  get("salvos").hidden = !saved;
  for (const link of document.querySelectorAll('nav a[href^="#"]')) {
    const selected = link.hash === (saved ? "#salvos" : "#novo");
    if (selected) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  if (saved) showSaved();
}

async function copy(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Use the browser selection fallback when permission is unavailable.
    }
  }
  const active = document.activeElement;
  const field = node("textarea");
  field.value = text;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  try {
    field.select();
    field.setSelectionRange(0, field.value.length);
    if (!document.execCommand("copy")) throw new Error();
  } finally {
    field.remove();
    active?.focus();
  }
}

brief.addEventListener("input", () => brief.setCustomValidity(""));
form.addEventListener("submit", event => {
  event.preventDefault();
  const idea = requireIdea();
  if (!idea) return;
  render(draft(idea, format()), idea, "local");
  get("status").textContent = "Rascunho gerado.";
});

get("example").addEventListener("click", () => {
  brief.value = example;
  brief.setCustomValidity("");
  form.elements.format.value = "reels";
  render(draft(example, "reels"), example, "local");
  get("status").textContent = "Exemplo carregado.";
});

get("copy").addEventListener("click", async () => {
  if (!current) return;
  try {
    await copy(toText(current.plan));
    get("status").textContent = "Plano copiado.";
  } catch {
    get("status").textContent = "O navegador não permitiu copiar. Você pode selecionar o texto do plano.";
  }
});

get("save").addEventListener("click", () => {
  if (!current) return;
  try {
    const saved = readSaved();
    const duplicate = saved.find(item => item.idea === current.idea && JSON.stringify(item.plan) === JSON.stringify(current.plan));
    if (duplicate) {
      get("status").textContent = "Esse plano já está nos seus roteiros salvos.";
      return;
    }
    updateSaved([{ ...current, id: crypto.randomUUID() }, ...saved]);
    get("status").textContent = "Plano salvo neste navegador.";
  } catch {
    get("status").textContent = "Não foi possível salvar neste navegador.";
  }
});

get("open-chat").addEventListener("click", async () => {
  const idea = requireIdea();
  if (!idea) return;
  const prompt = chatPrompt(idea, format());
  const fallback = get("chat-prompt");
  fallback.hidden = true;
  const tab = window.open("about:blank", "_blank");
  if (tab) tab.opener = null;
  try {
    await copy(prompt);
    if (tab) tab.location.replace("https://chatgpt.com/");
    get("chat-status").textContent = "Pedido copiado. Cole no ChatGPT e volte com a resposta.";
    if (!tab) {
      const link = node("a", " Abrir ChatGPT ↗");
      link.href = "https://chatgpt.com/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      get("chat-status").append(link);
    }
  } catch {
    tab?.close();
    const target = get("chat-status");
    target.textContent = "Selecione e copie o pedido abaixo.";
    fallback.value = prompt;
    fallback.hidden = false;
    fallback.focus();
    fallback.select();
  }
});

get("import").addEventListener("click", () => {
  try {
    const plan = parsePlan(get("reply").value);
    form.elements.format.value = plan.format;
    render(plan, brief.value.trim(), "chat");
    get("reply").value = "";
    get("chat-status").textContent = "";
    get("status").textContent = "Plano importado.";
    get("result").scrollIntoView({ block: "start" });
  } catch {
    get("chat-status").textContent = "Cole o JSON completo da resposta, incluindo roteiro, takes, legenda e edição.";
  }
});

window.addEventListener("hashchange", route);
route();
