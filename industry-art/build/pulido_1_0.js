var PAG9 = {},
  SVQ9 = "",
  SVQ9T = "";
const PAG9N = { svv: 40, svb: 20, svr: 20, tvl: 30 },
  PAG9P = 50;
const fmt9 = (s, ...a) => {
  let i = 0;
  return String(s).replace(/#/g, () => (a[i] != null ? a[i++] : ""));
};
function pagH9(k, L, f) {
  const n = PAG9[k] || PAG9N[k] || 30;
  if (L.length <= n) return L.map(f).join("");
  const m = Math.min(PAG9P, L.length - n);
  return (
    L.slice(0, n).map(f).join("") +
    `<div class="k pag9" style="margin-top:8px;gap:8px"><span class="m">${fmt9(L4("Mostrando # de #", "Showing # of #", "# sur # affichés", "Mostrando # de #"), n, L.length)}</span>${bt("pag9", k, fmt9(L4("Ver # más", "Show # more", "Voir # de plus", "Ver mais #"), m))}</div>`
  );
}
ACT["pag9"] = (v) => {
  PAG9[v] = (PAG9[v] || PAG9N[v] || 30) + PAG9P;
  return pg();
};
const svNorm9 = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
const svBusca9 = (t) => !SVQ9 || svNorm9(t.n).includes(SVQ9);
function svBuscaH9(n) {
  if (n < 25 && !SVQ9) return "";
  const ph = L4("Buscar un título del catálogo", "Search a catalog title", "Chercher un titre du catalogue", "Buscar um título do catálogo");
  return `<div class="k" style="gap:6px;margin:6px 0;flex-wrap:nowrap"><input type="text" inputmode="search" enterkeyhint="search" id="svq9" value="${esc(SVQ9T)}" placeholder="${esc(ph)}" aria-label="${esc(ph)}" maxlength="60" style="flex:1" onchange="act('svq9',this.value)">${SVQ9 ? bt("svq9", "", ic("cerrar")) : ""}</div>`;
}
ACT["svq9"] = (v) => {
  SVQ9T = String(v == null ? "" : v).slice(0, 60);
  SVQ9 = svNorm9(SVQ9T);
  delete PAG9.svv;
  delete PAG9.svb;
  return pg();
};
["svfm", "svt", "tab", "sub"].forEach((k) => {
  const f = ACT[k];
  if (!f) return;
  ACT[k] = function (v, el) {
    if (k == "svfm") {
      delete PAG9.svv;
      delete PAG9.svb;
    } else PAG9 = {};
    return f.apply(this, arguments);
  };
});
var ZW9 = { w: null, n: 0, p: new Map(), malo: 0 };
function zipW9(txt) {
  if (ZW9.malo || typeof Worker != "function" || typeof CompressionStream != "function" || typeof Blob != "function" || txt.length < 200000) return Promise.resolve(null);
  try {
    if (!ZW9.w) {
      const src =
        cyrb53.toString() +
        '\nonmessage = async (e) => {\n  const { id, txt } = e.data;\n  try {\n    const c = cyrb53(txt),\n      st = new Blob([new TextEncoder().encode(txt)]).stream().pipeThrough(new CompressionStream("gzip")),\n      d = new Uint8Array(await new Response(st).arrayBuffer());\n    postMessage({ id, c, d }, [d.buffer]);\n  } catch (err) {\n    postMessage({ id, err: String(err) });\n  }\n};\n';
      const u = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
      ZW9.w = new Worker(u);
      ZW9.w.onmessage = (e) => {
        const r = ZW9.p.get(e.data.id);
        if (!r) return;
        ZW9.p.delete(e.data.id);
        clearTimeout(r.t);
        r.res(e.data.err || !e.data.d ? null : { z: { k: "gz", d: e.data.d }, c: e.data.c });
      };
      ZW9.w.onerror = (ev) => {
        if (ev && ev.preventDefault) ev.preventDefault();
        ZW9.malo = 1;
        ZW9.p.forEach((r) => (clearTimeout(r.t), r.res(null)));
        ZW9.p.clear();
        try {
          ZW9.w.terminate();
        } catch (e) {}
        ZW9.w = null;
      };
    }
    const id = ++ZW9.n;
    return new Promise((res) => {
      const t = setTimeout(() => {
        ZW9.p.delete(id);
        res(null);
      }, 30000);
      ZW9.p.set(id, { res, t });
      ZW9.w.postMessage({ id, txt });
    });
  } catch (e) {
    ZW9.malo = 1;
    return Promise.resolve(null);
  }
}
var GEN9 = 0,
  EDD9 = null;
function edifD9() {
  const k = GEN9 + "|" + S.t + "|" + S.pj.length + "|" + S.cls + "|" + (S.obras || []).length + "|" + (S.pq || []).length;
  if (EDD9 && EDD9.s === S && EDD9.k === k) return EDD9.r;
  EDD9 = { s: S, k, r: edifDatos() };
  return EDD9.r;
}
const pg9 = pg;
pg = function () {
  GEN9++;
  FRXON9++;
  try {
    return pg9.apply(this, arguments);
  } finally {
    if (!--FRXON9) FRX9 = null;
  }
};
const wz9 = wz;
wz = function () {
  GEN9++;
  FRXON9++;
  try {
    return wz9.apply(this, arguments);
  } finally {
    if (!--FRXON9) FRX9 = null;
  }
};
