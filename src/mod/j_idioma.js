// ===== Francés y portugués: traducción de la interfaz sobre el texto en español =====
const XDIC = () => (CFG.idi == "fr" && typeof DIC_FR != "undefined" ? DIC_FR : CFG.idi == "pt" && typeof DIC_PT != "undefined" ? DIC_PT : null);
const X2C = new Map();
const XNUM = { años: 1, año: 1, semanas: 1, semana: 1, meses: 1, mes: 1, obras: 1, integrantes: 1, días: 1, opciones: 1, talentos: 1 };
function trX(t) {
  const D = XDIC();
  if (!D || !t || !/[A-Za-zÁÉÍÓÚÑáéíóúñü]/.test(t)) return t;
  const c = X2C.get(t);
  if (c != null) return c;
  const a = t.match(/^\s*/)[0],
    z = t.match(/\s*$/)[0],
    k = t.trim();
  let r = D[k];
  if (r == null) {
    const m = k.match(/^(.*?)([:.…!?]+|\s?\(\d+\)|\s\d+\/\d+)$/);
    if (m && D[m[1]] != null) r = D[m[1]] + m[2];
  }
  if (r == null && /( · |: | \/ |, | — )/.test(k)) {
    const P = k.split(/( · |: | \/ | — )/);
    let n = 0;
    const q = P.map((x, i) => {
      if (i % 2) return x;
      const y = x.trim(),
        v = D[y] != null ? D[y] : null;
      if (v != null) {
        n++;
        return x.replace(y, v);
      }
      return x.replace(/^(\d[\d.,]*) (\S+)$/, (mm, nn, w) => (XNUM[w] && D[w] ? (n++, nn + " " + D[w]) : mm));
    });
    if (n) r = q.join("");
  }
  if (r == null) {
    const m = k.match(/^(\d[\d.,]*) (\S+)$/);
    if (m && D[m[2]] != null) r = m[1] + " " + D[m[2]];
  }
  if (r == null) {
    const m = k.match(/^([+\-−]?\d[\d.,]*\s?%?) (.+)$/);
    if (m && D[m[2]] != null) r = m[1] + " " + D[m[2]];
  }
  r = r == null ? t : a + r + z;
  if (X2C.size > 30000) X2C.clear();
  X2C.set(t, r);
  return r;
}
function trXNodo(n) {
  if (!XDIC()) return;
  if (n.nodeType == 3) {
    const v = trX(n.nodeValue);
    if (v != n.nodeValue) n.nodeValue = v;
    return;
  }
  if (n.nodeType != 1 || n.tagName == "SCRIPT" || n.tagName == "STYLE" || n.tagName == "TEXTAREA") return;
  const at = (x) =>
    ["placeholder", "aria-label", "title"].forEach((a) => {
      const v = x.getAttribute && x.getAttribute(a);
      if (v) {
        const w = trX(v);
        if (w != v) x.setAttribute(a, w);
      }
    });
  at(n);
  const it = document.createTreeWalker(n, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let x = it.nextNode();
  while (x) {
    if (x.nodeType == 3) {
      const v = trX(x.nodeValue);
      if (v != x.nodeValue) x.nodeValue = v;
    } else at(x);
    x = it.nextNode();
  }
}
const XOBS =
  typeof MutationObserver != "undefined"
    ? new MutationObserver((L) => {
        if (!XDIC()) return;
        L.forEach((m) => {
          if (m.type == "characterData") trXNodo(m.target);
          else m.addedNodes.forEach(trXNodo);
        });
      })
    : null;
function idiomaX() {
  if (!XOBS || !document.body) return;
  XOBS.disconnect();
  X2C.clear();
  if (XDIC()) {
    document.documentElement.lang = CFG.idi;
    XOBS.observe(document.body, { childList: true, subtree: true, characterData: true });
    trXNodo(document.body);
  }
}
if (typeof CanvasRenderingContext2D != "undefined") {
  const f1 = CanvasRenderingContext2D.prototype.fillText,
    m1 = CanvasRenderingContext2D.prototype.measureText;
  CanvasRenderingContext2D.prototype.fillText = function (t, x, y, w) {
    const s = XDIC() ? trX(String(t)) : t;
    return w == null ? f1.call(this, s, x, y) : f1.call(this, s, x, y, w);
  };
  CanvasRenderingContext2D.prototype.measureText = function (t) {
    return m1.call(this, XDIC() ? trX(String(t)) : t);
  };
}
ACT["cfgi"] = (v) => {
  CFG.idi = ["en", "fr", "pt"].includes(v) ? v : "es";
  IDI = CFG.idi == "en" ? "en" : "es";
  cfgSv();
  TRCX.clear();
  idiomaIni();
  idiomaX();
  if (S) {
    pg();
    ajM();
  } else mn();
};
// Botones FR y PT en la portada
function heroIdiX() {
  const h = document.querySelector(".hero-idi");
  if (!h || h.querySelector('[data-v="fr"]')) return;
  h.querySelectorAll(".ch.idi").forEach((b) => b.classList.toggle("on", b.dataset.v == (CFG.idi || "es")));
  [
    ["fr", "FR", "Français"],
    ["pt", "PT", "Português"],
  ].forEach(([v, l, n]) => {
    const b = document.createElement("button");
    b.className = "ch idi" + (CFG.idi == v ? " on" : "");
    b.dataset.a = "cfgi";
    b.dataset.v = v;
    b.dataset.l = l;
    b.setAttribute("aria-label", n);
    h.appendChild(b);
  });
}
if (typeof MutationObserver != "undefined")
  new MutationObserver(() => {
    if (!S) heroIdiX();
  }).observe(document.getElementById("app"), { childList: true });
setTimeout(() => {
  heroIdiX();
  idiomaX();
}, 0);
