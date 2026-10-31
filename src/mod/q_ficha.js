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
    const d = docDatos();
    d.P = docObra(P);
    return d;
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
    `<div class="c"><div class="k"><h2 style="margin:0">${ic("libro")} ${tx4("Documento de la obra", "Work document", "Document de l'œuvre", "Documento da obra")}</h2>${btx()}</div><div class="c sub"><b>${docEsc(d.t)}</b><div class="m">${docEsc(d.md)} · ${docEsc(d.fr)}</div>${d.log ? `<p class="m" style="font-style:italic">${docEsc(d.log)}</p>` : ""}</div><div class="c sub"><b>${T40("Solo la historia", "Story only")}</b><div class="m">${T40("La idea y la trama: de qué trata, cómo avanza, personajes y mundo. Sin dinero ni nombres del equipo.", "The idea and plot: what it's about, how it unfolds, characters and world. No money or crew names.")}</div>${fmt("h")}</div><div class="c sub"><b>${T40("Completo", "Complete")}</b><div class="m">${T40("Además de la historia: ficha técnica, contenido, producción, costos, reparto, equipo y predicción.", "Besides the story: technical sheet, content, production, costs, cast, crew and forecast.")}</div>${fmt("c")}</div>${P.wd || P.rvo != null ? "" : `<div class="m">${T40("Obra anterior a esta versión: el documento se rearma con los datos que guardó la obra.", "Work from before this version: the document is rebuilt from the data the work kept.")}</div>`}</div>`,
  );
};
V37.ficha.push((P) =>
  P && P.id != null && P.n
    ? `<div class="c doc-c" translate="no"><div><h3>${ic("libro")} ${esc(tx4("Documento de la obra", "Work document", "Document de l'œuvre", "Documento da obra"))}</h3><div class="m">${esc(
        P.st >= 3
          ? tx4("Trae todo: la historia, los personajes, el equipo, el presupuesto, los resultados y su lugar en la franquicia.", "It has everything: story, characters, crew, budget, results and its place in the franchise.", "Il contient tout : l'histoire, les personnages, l'équipe, le budget, les résultats et sa place dans la franchise.", "Traz tudo: a história, os personagens, a equipe, o orçamento, os resultados e seu lugar na franquia.")
          : tx4("Trae lo que hay hasta ahora: la historia, el guion, el equipo y el presupuesto. Al estrenarse suma los resultados.", "It has what exists so far: story, script, crew and budget. After release it adds the results.", "Il contient ce qui existe : l'histoire, le scénario, l'équipe et le budget. À la sortie, il ajoute les résultats.", "Traz o que há até agora: a história, o roteiro, a equipe e o orçamento. Após a estreia, soma os resultados."),
      )}</div></div>${bt("pdoc", P.id, ic("exportar") + " " + esc(tx4("Descargar", "Download", "Télécharger", "Baixar")), "a")}</div>`
    : "",
);
