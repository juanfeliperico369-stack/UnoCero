// ===== Ficha final de la obra: el documento de la idea también se descarga después del estreno =====
const producirQ = producir;
producir = function () {
  const snap = W ? JSON.stringify(W) : null,
    r = producirQ.apply(this, arguments);
  if (r && typeof r == "object" && snap && !S.bot) r.wd = snap;
  return r;
};
// Rearma el borrador de una obra (con la copia guardada o, en obras viejas, desde sus propios datos)
function wDeP(P) {
  if (P.wd) {
    try {
      return JSON.parse(P.wd);
    } catch (e) {}
  }
  const X = Object.assign({}, P, { m: P.m, nm: P.n, crew: Object.assign({}, P.crew || {}), cast: (P.cast || []).map((c) => Object.assign({}, c)) });
  const W0 = W;
  W = X;
  try {
    X.g = (P.gn || []).map((g) => sp(MD[P.m][5]).indexOf(g)).filter((i) => i >= 0);
    ["ty", "sb", "tm", "pa", "pm", "ar"].forEach((k) => {
      const L = DL(k) || [];
      X[k] = (P[k] || []).map((x) => (typeof x == "number" ? x : L.indexOf(x))).filter((i) => i >= 0);
    });
  } finally {
    W = W0;
  }
  return X;
}
function docDeP(P) {
  const W0 = W;
  W = wDeP(P);
  try {
    if (typeof wDef == "function") wDef(W);
    return docDatos();
  } finally {
    W = W0;
  }
}
ACT["pdoc"] = (v) => {
  const P = pj(v);
  if (!P) return;
  try {
    DOCX = docDeP(P);
  } catch (e) {
    console.error("doc obra", e);
    return toast(T40("No se pudo armar el documento de esta obra", "The document for this work couldn't be built"));
  }
  const d = DOCX,
    fmt = (k) => `<div class="bts">${bt("wdocb", k + "|html", ic("exportar") + " " + T40("Página o PDF (.html)", "Page or PDF (.html)"), k == "h" ? "a" : "")}${bt("wdocb", k + "|doc", ic("exportar") + " Word (.doc)")}${bt("wdocb", k + "|md", ic("exportar") + " Markdown (.md)")}${bt("wdocb", k + "|pdf", ic("libro") + " " + T40("Imprimir", "Print"))}</div>`;
  op(
    `<div class="c"><div class="k"><h2 style="margin:0">${ic("libro")} ${T40("Documento de la idea", "Idea document")}</h2>${btx()}</div><div class="c sub"><b>${docEsc(d.t)}</b><div class="m">${docEsc(d.md)} · ${docEsc(d.fr)}</div>${d.log ? `<p class="m" style="font-style:italic">${docEsc(d.log)}</p>` : ""}</div><div class="c sub"><b>${T40("Solo la historia", "Story only")}</b><div class="m">${T40("La idea y la trama: de qué trata, cómo avanza, personajes y mundo. Sin dinero ni nombres del equipo.", "The idea and plot: what it's about, how it unfolds, characters and world. No money or crew names.")}</div>${fmt("h")}</div><div class="c sub"><b>${T40("Completo", "Complete")}</b><div class="m">${T40("Además de la historia: ficha técnica, contenido, producción, costos, reparto, equipo y predicción.", "Besides the story: technical sheet, content, production, costs, cast, crew and forecast.")}</div>${fmt("c")}</div>${P.wd ? "" : `<div class="m">${T40("Obra anterior a esta versión: el documento se rearma con los datos que guardó la obra.", "Work from before this version: the document is rebuilt from the data the work kept.")}</div>`}</div>`,
  );
};
V37.ficha.push((P) => (P && P.id != null && P.n ? `<div class="bts" style="margin-top:8px">${bt("pdoc", P.id, ic("libro") + " " + T40("Documento de la idea", "Idea document"))}</div>` : ""));
