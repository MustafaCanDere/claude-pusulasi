/* AI Pusulası — uygulama */
(() => {
"use strict";

const REPO = "https://github.com/MustafaCanDere/claude-pusulasi";
const SITE = "https://mustafacandere.github.io/claude-pusulasi/";

/* ---------- Ortam ---------- */
const params = new URLSearchParams(location.search);
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const EXT = !!(window.chrome && chrome.runtime && chrome.runtime.id && chrome.tabs);

let lang = params.get("lang") || store.get("pusula-lang", null) || ((navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en");
if (!window.PUSULA_DATA[lang]) lang = "tr";
let D = window.PUSULA_DATA[lang];
let current = params.get("ai") || store.get("pusula-ai", "claude");
if (!D.ais[current]) current = "claude";
let lastCat = null, lastText = "";
let sample = null;

/* ---------- Yardımcılar ---------- */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const norm = s => s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");
const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const hl = p => esc(p).replace(/\[([^\]]+)\]/g, "<mark>[$1]</mark>");
const catById = id => D.cats.find(c => c.id === id);
const entryOf = (ai, cat) => D.map[ai] && D.map[ai][cat];
const tagHtml = t => t ? `<em class="tag tag-${t}">${esc(D.ui.tags[t])}</em>` : "";
const list = arr => arr.map(([n, d, t]) => `<div class="item"><b>${esc(n)} ${tagHtml(t)}</b><span>${esc(d)}</span></div>`).join("");

async function copy(text){
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch {}
    ta.remove(); return ok;
  }
}
function flash(btn, msg, ms = 1800){
  if (!btn) return; const old = btn.innerHTML; btn.textContent = msg; btn.disabled = true;
  setTimeout(() => { btn.innerHTML = old; btn.disabled = false; }, ms);
}

function promptFor(cat, e){
  let p = e.codeFix ? D.codeFix : e.codeWhat ? D.codePrompt(e.codeWhat) : cat.prompt;
  if (e.add) p += "\n" + e.add;
  return p;
}
function exampleFor(cat, e){
  if (e.codeFix || e.codeWhat) return null; // kod ajanı prompt'larının örneği konuya göre değişir
  let x = cat.example; if (e.add) x += "\n" + e.add.replace(/\[[^\]]+\]/g, m => m.slice(1, -1));
  return x;
}

function score(text){
  const t = norm(text);
  return D.cats.map(c => ({ c, s: c.keys.reduce((a, k) => a + (t.includes(norm(k)) ? (k.length > 4 ? 2 : 1) : 0), 0) + (t.includes(norm(c.label)) ? 2 : 0) }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s);
}

function shareUrl(){
  const base = EXT ? SITE : location.href.split("?")[0].split("#")[0];
  const u = new URLSearchParams({ ai: current, lang });
  if (lastCat) u.set("konu", lastCat);
  return base + "?" + u.toString();
}
function syncUrl(){
  if (EXT) return;
  try { history.replaceState(null, "", shareUrl()); } catch {}
}

/* ---------- Sabit metinler ---------- */
function renderStatic(){
  document.documentElement.lang = lang;
  $("#title").textContent = D.ui.title;
  $("#lede").textContent = D.ui.lede;
  $("#intro").innerHTML = D.ui.intro.map(([t, d]) => `<li><b>${esc(t)}</b>${esc(d)}</li>`).join("");
  $("#ais-label").textContent = D.ui.aiQuestion;
  $("#q").setAttribute("aria-label", D.ui.inputLabel);
  $("#go").textContent = D.ui.go;
  $("#check-title").textContent = D.ui.checkTitle;
  $("#check-lede").textContent = D.ui.checkLede;
  $("#check-in").placeholder = D.ui.checkPlaceholder;
  $("#check-btn").textContent = D.ui.checkBtn;
  $("#saved-title").textContent = D.ui.savedTitle;
  $("#footer").textContent = D.ui.footer;
  $("#lang").setAttribute("aria-label", D.ui.lang);
  $$("#lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  setPlaceholder();
}
function setPlaceholder(){ $("#q").placeholder = D.ais[current].kind === "code" ? D.ui.placeholderCode : D.ui.placeholderChat; }

function renderAis(){
  $("#ais").innerHTML = Object.entries(D.ais).map(([id, a]) =>
    `<button class="ai" data-ai="${id}" aria-pressed="${id === current}">${esc(a.name)}<small>${esc(a.sub)}</small></button>`).join("");
  $$(".ai").forEach(b => b.onclick = () => setAi(b.dataset.ai));
}
function renderChips(){
  $("#chips").innerHTML = D.cats.map(c => {
    const off = !entryOf(current, c.id);
    return `<button class="chip${off ? " off" : ""}" data-id="${c.id}" aria-pressed="${lastCat === c.id}"${off ? ` title="${esc(D.ui.offTitle(D.ais[current].name))}"` : ""}>${esc(c.label)}</button>`;
  }).join("");
  $$(".chip").forEach(ch => ch.onclick = () => render(ch.dataset.id, [], ""));
}
function renderTips(){
  const a = D.ais[current];
  $("#tips").innerHTML = `<h2>${esc(D.ui.tipsTitle(a.name))}</h2><ul>${a.tips.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul>`;
}

function setAi(id){
  if (!D.ais[id]) return;
  current = id; store.set("pusula-ai", id);
  renderAis(); renderChips(); renderTips(); setPlaceholder();
  if (lastCat) render(lastCat, [], lastText); else syncUrl();
}
function setLang(l){
  if (!window.PUSULA_DATA[l] || l === lang) return;
  lang = l; D = window.PUSULA_DATA[l]; store.set("pusula-lang", l);
  renderStatic(); renderAis(); renderChips(); renderTips(); renderSaved();
  $("#check-out").innerHTML = "";
  if (lastCat) render(lastCat, [], lastText); else { $("#out").innerHTML = ""; syncUrl(); }
}

/* ---------- Karşılaştırma ---------- */
function compareHtml(catId){
  const best = D.best[catId] || [];
  const rows = Object.entries(D.ais).map(([id, a]) => {
    const e = entryOf(id, catId);
    const st = !e ? "no" : best.includes(id) ? "best" : "ok";
    const label = { best: D.ui.stBest, ok: D.ui.stOk, no: D.ui.stNo }[st];
    const feat = e ? esc(e.use[0][0]) + " " + tagHtml(e.use[0][2]) : "—";
    const btn = e && id !== current ? `<button class="link" data-switch="${id}">${esc(D.ui.pick)}</button>` : "";
    return `<tr class="st-${st}${id === current ? " me" : ""}"><td><b>${esc(a.name)}</b></td><td><span class="st">${esc(label)}</span></td><td>${feat}</td><td>${btn}</td></tr>`;
  }).join("");
  return `<details class="compare"><summary>${esc(D.ui.compareTitle)}</summary>
    <div class="table-wrap"><table><thead><tr><th>${esc(D.ui.compareAi)}</th><th>${esc(D.ui.compareState)}</th><th>${esc(D.ui.compareFeature)}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></details>`;
}

/* ---------- Topluluk ---------- */
function communityHtml(catId){
  const items = (window.PUSULA_COMMUNITY || []).filter(x => x.cat === catId && (x.lang || "tr") === lang && (!x.ai || x.ai === current));
  const suggest = `${REPO}/issues/new?template=prompt-onerisi.yml&labels=prompt&title=${encodeURIComponent("[" + catById(catId).label + "] ")}`;
  const body = items.length
    ? items.map((x, i) => `<div class="item"><b>${esc(x.title)}</b><span>${esc(x.author ? "@" + x.author : "")}</span><pre class="prompt small">${hl(x.prompt)}</pre><div class="row"><button class="ghost" data-ccopy="${i}">${esc(D.ui.copy)}</button></div></div>`).join("")
    : `<p class="note" style="margin-top:0">${esc(D.ui.communityEmpty)}</p>`;
  return { html: `<div class="items">${body}</div><div class="row"><a class="ghost" href="${suggest}" target="_blank" rel="noopener">${esc(D.ui.suggest)}</a></div>`, items };
}

/* ---------- Sonuç ---------- */
function render(catId, othersIds, userText){
  lastCat = catId; lastText = userText || "";
  const cat = catById(catId), a = D.ais[current], e = entryOf(current, catId);
  renderChips(); syncUrl();
  if (!e){
    const alt = Object.keys(D.ais).filter(id => id !== current && entryOf(id, catId)).sort((x, y) => ((D.best[catId] || []).includes(y)) - ((D.best[catId] || []).includes(x))).slice(0, 3);
    $("#out").innerHTML = `<div class="empty">${D.ui.notFit(esc(a.name), esc(cat.label))}<div class="row">${alt.map(id => `<button class="ghost" data-switch="${id}">${esc(D.ais[id].name)}</button>`).join("")}</div></div>`;
    $$("[data-switch]").forEach(b => b.onclick = () => setAi(b.dataset.switch));
    return;
  }
  const p = promptFor(cat, e), ex = exampleFor(cat, e);
  const comm = communityHtml(catId);
  let n = 1; const steps = [];
  const step = (num, title, body) => `<div class="step"><div class="num">${num}</div><div><h3>${esc(title)}</h3>${body}</div></div>`;

  steps.push(step(n++, D.ui.stepOpen, `<ol class="how">${a.start.map(x => `<li>${esc(x)}</li>`).join("")}</ol>`));
  steps.push(step(n++, D.ui.stepUse, `<div class="items">${list(e.use)}</div><p class="note">${esc(D.ui.tagLegend)}</p>`));
  if (e.connect && e.connect.length) steps.push(step(n++, D.ui.stepConnect, `<div class="items">${list(e.connect)}</div>`));
  steps.push(step(n++, D.ui.stepPrompt, `
    <pre class="prompt" id="prompt">${hl(p)}</pre>
    <p class="note">${esc(D.ui.fillNote)}</p>
    <div class="row">
      <button class="primary" id="copy">${esc(D.ui.copy)}</button>
      ${EXT ? `<button class="primary alt" id="insert">${esc(D.ui.insert)}</button>` : ""}
      ${ex ? `<button class="ghost" id="ex-btn" aria-expanded="false">${esc(D.ui.example)}</button>` : ""}
      ${sample ? `<button class="ghost" id="fill">${esc(D.ui.fill)}</button>` : ""}
      <button class="ghost" id="save">${esc(D.ui.save)}</button>
      <button class="ghost" id="share">${esc(D.ui.share)}</button>
    </div>
    ${ex ? `<div id="ex" hidden><p class="note"><b>${esc(D.ui.exampleTitle)}</b></p><pre class="prompt">${esc(ex)}</pre><div class="row"><button class="ghost" id="ex-copy">${esc(D.ui.copy)}</button></div></div>` : ""}
    <div class="ai-out" id="aiout"></div>`));
  steps.push(step(n++, D.ui.stepFollow, `<p class="note" style="margin-top:0">${esc(D.ui.followNote)}</p>
    <div class="follow">${cat.follow.map(f => `<button data-copy="${esc(f)}">${hl(f)}</button>`).join("")}</div>`));
  steps.push(step("!", D.ui.stepWarn, `<div class="warn">${esc(cat.avoid)}</div>`));
  steps.push(step("★", D.ui.community, comm.html));

  const others = (othersIds || []).filter(id => entryOf(current, id));
  $("#out").innerHTML = `<section class="result" aria-live="polite">
    <h2>${esc(cat.label)} · ${esc(a.name)}</h2><p class="why">${esc(e.why)}</p>
    ${compareHtml(catId)}
    ${steps.join("")}
    ${others.length ? `<p class="others">${esc(D.ui.others)}${others.map(id => `<button data-id="${id}">${esc(catById(id).label)}</button>`).join("")}</p>` : ""}
  </section>`;

  // Olaylar
  $("#copy").onclick = async () => flash($("#copy"), (await copy(p)) ? D.ui.copied : D.ui.selectCopy);
  const ins = $("#insert"); if (ins) ins.onclick = () => insertToChat(currentPromptText(p), ins);
  const exb = $("#ex-btn");
  if (exb) exb.onclick = () => { const box = $("#ex"); box.hidden = !box.hidden; exb.setAttribute("aria-expanded", !box.hidden); exb.textContent = box.hidden ? D.ui.example : D.ui.hideExample; };
  const exc = $("#ex-copy"); if (exc) exc.onclick = async () => flash(exc, (await copy(ex)) ? D.ui.copied : D.ui.selectCopy);
  const f = $("#fill"); if (f) f.onclick = () => fill(p, cat, userText);
  $("#save").onclick = () => { saveItem(currentPromptText(p), catId); flash($("#save"), D.ui.saved); };
  $("#share").onclick = async () => flash($("#share"), (await copy(shareUrl())) ? D.ui.linkCopied : shareUrl(), 2400);
  $$("[data-copy]").forEach(b => b.onclick = async () => flash(b, (await copy(b.dataset.copy)) ? D.ui.copied : b.dataset.copy, 1400));
  $$("[data-ccopy]").forEach(b => b.onclick = async () => flash(b, (await copy(comm.items[+b.dataset.ccopy].prompt)) ? D.ui.copied : D.ui.selectCopy));
  $$("[data-switch]").forEach(b => b.onclick = () => setAi(b.dataset.switch));
  $$(".others button").forEach(b => b.onclick = () => render(b.dataset.id, [], ""));
}

// "Benim için doldur" sonucu varsa onu, yoksa şablonu kullan
function currentPromptText(tpl){
  const filled = $("#filled");
  return filled ? filled.textContent : tpl;
}

/* ---------- Benim için doldur (yalnızca claude.ai içinde) ---------- */
async function fill(template, cat, userText){
  const box = $("#aiout"), btn = $("#fill");
  btn.disabled = true; box.innerHTML = `<p class="note">${esc(D.ui.preparing)}</p>`;
  try {
    const res = await sample(D.ui.fillInstr(D.ais[current].name, userText || cat.label, template), {
      modelTier: "quick", onText: ({ text }) => { box.innerHTML = `<pre class="prompt">${esc(text)}</pre>`; }
    });
    const final = res.text.trim();
    box.innerHTML = `<pre class="prompt" id="filled">${esc(final)}</pre><div class="row"><button class="ghost" id="copy2">${esc(D.ui.copyThis)}</button></div>`;
    $("#copy2").onclick = async () => flash($("#copy2"), (await copy(final)) ? D.ui.copied : D.ui.selectCopy);
  } catch (err) {
    const m = err && err.code === "not_granted" ? D.ui.fillDenied : err && err.code === "rate_limited" ? D.ui.fillRate : D.ui.fillFail;
    box.innerHTML = `<p class="note">${esc(m)}</p>`;
  } finally { btn.disabled = false; }
}

/* ---------- Chrome eklentisi: sohbete yapıştır ---------- */
async function activeTab(){
  try { const [t] = await chrome.tabs.query({ active: true, currentWindow: true }); return t; } catch { return null; }
}
async function insertToChat(text, btn){
  const t = await activeTab();
  if (!t) return flash(btn, D.ui.insertFail, 2600);
  const send = () => chrome.tabs.sendMessage(t.id, { type: "pusula-insert", text });
  let res = null;
  try { res = await send(); }
  catch {
    // Eklenti kurulmadan önce açılmış sekmelerde içerik betiği yoktur: bir kez enjekte edip tekrar dene
    try { await chrome.scripting.executeScript({ target: { tabId: t.id }, files: ["content.js"] }); res = await send(); } catch {}
  }
  flash(btn, res && res.ok ? D.ui.inserted : D.ui.insertFail, 2600);
}
async function detectAiFromTab(){
  const t = await activeTab(); if (!t || !t.url) return;
  let host = ""; try { host = new URL(t.url).hostname; } catch { return; }
  const hit = Object.entries(D.ais).find(([, a]) => (a.hosts || []).some(h => host === h || host.endsWith("." + h)));
  if (hit && !params.get("ai")) setAi(hit[0]);
}

/* ---------- Kaydettiklerim ---------- */
function getSaved(){ const v = store.get("pusula-saved", []); return Array.isArray(v) ? v : []; }
function saveItem(text, catId){
  const items = getSaved().filter(x => x.text !== text);
  items.unshift({ id: Date.now(), ai: current, cat: catId, text, at: new Date().toISOString() });
  store.set("pusula-saved", items.slice(0, 50)); renderSaved();
}
function renderSaved(){
  const items = getSaved();
  $("#saved-list").innerHTML = items.length ? items.map(x => {
    const c = catById(x.cat), a = D.ais[x.ai];
    return `<div class="item"><b>${esc(c ? c.label : x.cat)} · ${esc(a ? a.name : x.ai)}</b><pre class="prompt small">${esc(x.text)}</pre>
      <div class="row"><button class="ghost" data-scopy="${x.id}">${esc(D.ui.copy)}</button>${EXT ? `<button class="ghost" data-sins="${x.id}">${esc(D.ui.insert)}</button>` : ""}<button class="ghost danger" data-sdel="${x.id}">${esc(D.ui.remove)}</button></div></div>`;
  }).join("") : `<p class="note" style="margin-top:0">${esc(D.ui.savedEmpty)}</p>`;
  const find = id => getSaved().find(x => String(x.id) === String(id));
  $$("[data-scopy]").forEach(b => b.onclick = async () => { const x = find(b.dataset.scopy); if (x) flash(b, (await copy(x.text)) ? D.ui.copied : D.ui.selectCopy); });
  $$("[data-sins]").forEach(b => b.onclick = () => { const x = find(b.dataset.sins); if (x) insertToChat(x.text, b); });
  $$("[data-sdel]").forEach(b => b.onclick = () => { store.set("pusula-saved", getSaved().filter(x => String(x.id) !== b.dataset.sdel)); renderSaved(); });
}

/* ---------- Prompt kontrolü ---------- */
function checkPrompt(){
  const text = $("#check-in").value.trim(), out = $("#check-out");
  if (!text) { out.innerHTML = `<p class="note">${esc(D.ui.checkEmpty)}</p>`; return; }
  const fails = D.checks.filter(c => !c.re.test(text));
  const total = D.checks.length, ok = total - fails.length;
  const pct = Math.round(ok / total * 100);
  out.innerHTML = `<div class="meter" role="img" aria-label="${esc(D.ui.checkScore(ok, total))}"><span style="width:${pct}%"></span></div>
    <p><b>${esc(D.ui.checkScore(ok, total))}</b></p>
    ${fails.length ? `<ul class="how">${fails.map(f => `<li>${esc(f.msg)}</li>`).join("")}</ul>` : `<p>${esc(D.ui.checkGood)}</p>`}`;
}

/* ---------- Arama ---------- */
function search(){
  const text = $("#q").value.trim();
  if (!text) { $("#out").innerHTML = `<p class="empty">${esc(D.ui.empty)}</p>`; return; }
  const r = score(text);
  if (!r.length) { $("#out").innerHTML = `<p class="empty">${esc(D.ui.unknown)}</p>`; return; }
  const ok = r.filter(x => entryOf(current, x.c.id));
  const best = (ok[0] || r[0]).c;
  render(best.id, r.filter(x => x.c.id !== best.id).slice(0, 3).map(x => x.c.id), text);
}

/* ---------- Başlat ---------- */
renderStatic(); renderAis(); renderChips(); renderTips(); renderSaved();
$("#go").onclick = search;
$("#q").addEventListener("keydown", e => { if (e.key === "Enter") search(); });
$("#check-btn").onclick = checkPrompt;
$$("#lang button").forEach(b => b.onclick = () => setLang(b.dataset.lang));
const startCat = params.get("konu") || params.get("topic");
if (startCat && catById(startCat)) render(startCat, [], "");
if (EXT) {
  document.body.classList.add("ext");
  detectAiFromTab();
  // Kullanıcı sekme değiştirince seçili yapay zekâyı güncelle
  try { chrome.tabs.onActivated.addListener(() => detectAiFromTab()); } catch {}
  try { chrome.tabs.onUpdated.addListener((_id, info, tab) => { if (info.url && tab.active) detectAiFromTab(); }); } catch {}
}

(async () => {
  try { if (window.claude && claude.use) { sample = await claude.use("sample"); if (sample && lastCat) render(lastCat, [], lastText); } } catch { sample = null; }
})();
})();
