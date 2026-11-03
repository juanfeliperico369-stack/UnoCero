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
function zipW9(txt, ms) {
  ZW9.ms = ms || 0;
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
function bq9(s, q) {
  if (!q) return true;
  const C = (bq9.c = bq9.c || new Map()),
    n = (x) => {
      x = String(x == null ? "" : x);
      let r = C.get(x);
      if (r == null) {
        if (C.size > 60000) C.clear();
        r = x
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "");
        C.set(x, r);
      }
      return r;
    };
  return n(s).includes(n(q).trim());
}
function svLibreH9(C0) {
  const libre = Math.max(0, (C0.cap | 0) - C0.vis.length);
  if (libre > 0)
    return `<div class="m" style="color:var(--a)">${fmt9(L4("Te quedan # lugares libres: la bóveda solo hace falta cuando el catálogo se llena.", "You have # free slots: you only need a vault once the catalog is full.", "Il te reste # places libres : le coffre ne sert que lorsque le catalogue est plein.", "Restam # lugares livres: o cofre só é necessário quando o catálogo enche."), libre)}</div>`;
  if (C0.fuera.length) return `<div class="m">${fmt9(L4("Catálogo lleno: # títulos esperan en bodega.", "Catalog full: # titles are waiting in storage.", "Catalogue plein : # titres attendent en réserve.", "Catálogo cheio: # títulos esperam no depósito."), C0.fuera.length)}</div>`;
  return "";
}
(() => {
  const f = ACT["svbov"];
  if (!f) return;
  let ok = 0;
  ACT["svbov"] = function (v, el) {
    const C0 = S && S.sv && S.sv.on ? svVisibles() : null,
      libre = C0 ? Math.max(0, (C0.cap | 0) - C0.vis.length) : 0;
    if (libre >= 40 && Date.now() - ok > 6000) {
      ok = Date.now();
      return toast(fmt9(L4("Aún tienes # lugares libres. Toca otra vez para comprarla igual.", "You still have # free slots. Tap again to buy it anyway.", "Il te reste # places libres. Touche encore pour l'acheter quand même.", "Você ainda tem # lugares livres. Toque de novo para comprar mesmo assim."), libre));
    }
    ok = 0;
    return f.apply(this, arguments);
  };
})();
var ASP9 = null,
  ASL9 = 0;
const autoSv9 = autoSv;
autoSv = function () {
  if (!S || S.taller || CFG.auto == "no") return;
  if (document.hidden || typeof requestAnimationFrame != "function") return autoSv9.apply(this, arguments);
  S.las = S.t;
  if (ASP9) return ASP9;
  const S0 = S;
  ASP9 = new Promise((res) =>
    requestAnimationFrame(() =>
      setTimeout(() => {
        ASP9 = null;
        if (S !== S0) return res(0);
        Promise.resolve(autoSv9())
          .then((b) => {
            guardadoLento9();
            res(b);
          })
          .catch(() => res(0));
      }, 0),
    ),
  );
  return ASP9;
};
const lento9 = () => (ZW9.ms | 0) > 400;
function guardadoLento9() {
  if (ASL9 || CFG.auto != "mes" || !lento9()) return;
  ASL9 = 1;
  toast(L4("Guardar ya tarda: en Ajustes puedes elegir «Cada 3 meses».", "Saving is getting slow: in Settings you can pick «Every 3 months».", "La sauvegarde ralentit : dans Réglages, choisis « Tous les 3 mois ».", "Salvar já demora: em Ajustes você pode escolher «A cada 3 meses»."));
}
const ERRK9 = "ia16.errores";
window.__ctx9 = () => ({ v: VERN, idi: CFG.idi || "es", y: S ? yr() : null, w: S ? wk() : null, p: S ? tab + "/" + (SUB[tab] | 0) : "menú" });
const errLee9 = () => {
  try {
    const L = JSON.parse(LS.g(ERRK9) || "[]");
    return Array.isArray(L) ? L : [];
  } catch (e) {
    return [];
  }
};
function errGuarda9(t, m, s) {
  if (typeof window.__err9 == "function") window.__err9(t, m, s);
}
function errInforme9() {
  const L = errLee9(),
    f = (n) => {
      try {
        return new Date(n).toISOString().replace("T", " ").slice(0, 19);
      } catch (e) {
        return String(n);
      }
    };
  return (
    `INDUSTRY ART ${VERN} · informe de errores\n${navigator.userAgent}\nPantalla ${screen.width}x${screen.height} · ${window.AndroidBridge ? "app Android" : location.protocol.replace(":", "")}\n\n` +
    (L.length
      ? L.map((e, i) => `#${i + 1} · ${f(e.f)}${e.n > 1 ? " · ×" + e.n : ""} · ${e.t} · v${e.v || "?"} · ${e.idi || ""} · ${e.y != null ? e.y + " sem " + e.w : "sin partida"} · ${e.p || ""}\n${e.m}${e.s ? "\n" + e.s : ""}`).join("\n\n")
      : "Sin errores registrados.")
  );
}
function errH9() {
  const L = errLee9(),
    ul = L[L.length - 1];
  return `<div class="c aj-err9"><h3 style="margin:0 0 6px">${ic("escudo")} ${L4("Informe de errores", "Error report", "Rapport d'erreurs", "Relatório de erros")}</h3><div class="m">${
    L.length
      ? (L.length == 1
          ? fmt9(L4("1 error anotado, en #.", "1 error logged, in #.", "1 erreur notée, en #.", "1 erro anotado, em #."), ul.y != null ? ul.y : "—")
          : fmt9(L4("# errores anotados; el último, en #.", "# errors logged; the last one in #.", "# erreurs notées ; la dernière en #.", "# erros anotados; o último em #."), L.length, ul.y != null ? ul.y : "—")) +
        " " +
        L4("Si algo falla, copia el informe y envíalo al creador: solo se guarda en tu dispositivo.", "If something breaks, copy the report and send it to the creator: it's only stored on your device.", "Si quelque chose plante, copie le rapport et envoie-le au créateur : il reste uniquement sur ton appareil.", "Se algo falhar, copie o relatório e envie ao criador: ele fica só no seu dispositivo.")
      : L4("Sin errores anotados. Si algo falla, aquí queda el detalle (solo en tu dispositivo) para que puedas enviarlo.", "No errors logged. If something breaks, the details stay here (only on your device) so you can send them.", "Aucune erreur notée. Si quelque chose plante, le détail reste ici (uniquement sur ton appareil) pour que tu puisses l'envoyer.", "Nenhum erro anotado. Se algo falhar, o detalhe fica aqui (só no seu dispositivo) para você poder enviar.")
  }</div>${L.length ? `<div class="bts" style="margin-top:8px">${bt("err9c", "", ic("exportar") + " " + L4("Copiar informe", "Copy report", "Copier le rapport", "Copiar relatório"), "a")}${bt("err9b", "", L4("Borrar", "Clear", "Effacer", "Apagar"), "r")}</div><div id="err9t"></div>` : ""}</div>`;
}
ACT["err9c"] = () => {
  const txt = errInforme9(),
    hecho = () => toast(L4("Informe copiado", "Report copied", "Rapport copié", "Relatório copiado")),
    manual = () => {
      const d = $("#err9t");
      if (d) {
        d.innerHTML = `<textarea readonly rows="8" style="width:100%;margin-top:8px;font:12px monospace">${esc(txt)}</textarea>`;
        const a = d.querySelector("textarea");
        a.focus();
        a.select();
        try {
          if (document.execCommand("copy")) return hecho();
        } catch (e) {}
      }
      if (!guardarNativo("industry-art-errores.txt", txt, "text/plain")) toast(L4("Selecciona el texto y cópialo", "Select the text and copy it", "Sélectionne le texte et copie-le", "Selecione o texto e copie"));
    };
  try {
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) return navigator.clipboard.writeText(txt).then(hecho, manual);
  } catch (e) {}
  manual();
};
ACT["err9b"] = () => {
  LS.d(ERRK9);
  const h = document.querySelector("#md .hoja .aj-err9");
  if (h) h.outerHTML = errH9();
  toast(L4("Informe borrado", "Report cleared", "Rapport effacé", "Relatório apagado"));
};
const ajM9 = ajM;
ajM = function () {
  const r = ajM9.apply(this, arguments),
    h = document.querySelector("#md .hoja");
  if (h) {
    const a = h.querySelector('[data-a="cfga"]');
    if (a && a.parentNode && !h.querySelector(".aj-lento9") && (lento9() || CFG.auto == "trim"))
      a.parentNode.insertAdjacentHTML(
        "afterend",
        `<div class="m aj-lento9">${fmt9(L4("Tu partida ya es grande: cada guardado tarda unos # ms en este dispositivo. «Cada 3 meses» frena menos el juego.", "Your game is big now: each save takes about # ms on this device. «Every 3 months» slows the game down less.", "Ta partie est grande : chaque sauvegarde prend environ # ms sur cet appareil. « Tous les 3 mois » ralentit moins le jeu.", "Sua partida já é grande: cada salvamento leva uns # ms neste dispositivo. «A cada 3 meses» trava menos o jogo."), Math.round(ZW9.ms || 0) || "—")}</div>`,
      );
    if (!h.querySelector(".aj-err9")) h.insertAdjacentHTML("beforeend", errH9());
  }
  return r;
};
(() => {
  const H = location.hostname || "";
  if (!/^https?:$/.test(location.protocol) || window.AndroidBridge || window.Capacitor || /androidplatform\.net$/.test(H)) return;
  try {
    const l = document.createElement("link");
    l.rel = "manifest";
    l.href = "manifest.webmanifest";
    document.head.appendChild(l);
  } catch (e) {}
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  } catch (e) {}
  if ("serviceWorker" in navigator)
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
})();
