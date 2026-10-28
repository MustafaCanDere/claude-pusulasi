// AI Pusulası — prompt'u sayfadaki sohbet kutusuna yazar. Asla kendisi göndermez.
(() => {
  if (window.__pusulaContent) return;
  window.__pusulaContent = true;

  // Siteye özel seçiciler (önce bunlar denenir), sonra genel arama
  const SELECTORS = [
    "div.ProseMirror[contenteditable='true']",       // Claude, ChatGPT
    "#prompt-textarea",                               // ChatGPT
    "rich-textarea .ql-editor[contenteditable='true']", // Gemini
    ".ql-editor[contenteditable='true']",
    "textarea[aria-label]",                           // Grok ve diğerleri
    "textarea",
    "[contenteditable='true'][role='textbox']",
    "[contenteditable='true']"
  ];

  const visible = el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 40 && r.height > 10 && s.visibility !== "hidden" && s.display !== "none";
  };

  function findBox() {
    const active = document.activeElement;
    if (active && (active.tagName === "TEXTAREA" || active.isContentEditable) && visible(active)) return active;
    for (const sel of SELECTORS) {
      const els = Array.from(document.querySelectorAll(sel)).filter(visible);
      if (els.length) return els[els.length - 1]; // sohbet kutusu genelde sayfanın en altında
    }
    return null;
  }

  function setTextarea(el, text) {
    const proto = Object.getPrototypeOf(el);
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    const value = el.value ? el.value + "\n" + text : text;
    if (setter) setter.call(el, value); else el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function setEditable(el, text) {
    el.focus();
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false); // imleci sona taşı
    sel.removeAllRanges();
    sel.addRange(range);
    // Editörlerin (ProseMirror, Quill) kendi geçmişiyle uyumlu yol
    let ok = false;
    try { ok = document.execCommand("insertText", false, text); } catch {}
    if (!ok) {
      const dt = new DataTransfer();
      dt.setData("text/plain", text);
      el.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
    }
    el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
  }

  function insert(text) {
    const box = findBox();
    if (!box) return false;
    box.scrollIntoView({ block: "center" });
    if (box.tagName === "TEXTAREA" || box.tagName === "INPUT") { box.focus(); setTextarea(box, text); }
    else setEditable(box, text);
    return true;
  }

  chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
    if (msg && msg.type === "pusula-insert" && typeof msg.text === "string") {
      reply({ ok: insert(msg.text) });
    }
  });

  // Test için dışarıya aç (sayfa kodu bu fonksiyona erişemez, yalnızca eklenti dünyasında durur)
  window.__pusulaInsert = insert;
})();
