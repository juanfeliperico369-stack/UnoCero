// ===== Biblioteca de clásicos: todas las obras de dominio público con su historia, personajes y adaptaciones =====
function biblioH(i) {
  const x = PD[i];
  if (!x) return "";
  const d = PDX[x[0]] || [],
    lib = pdLibre(x),
    ad = S.pj.filter((P) => P.mt && String(P.mt.i || P.mt) == "p" + i).length + (S.rw40 || []).filter((r) => r && (r.n == x[0] || r.mt == x[0])).length;
  return `<div class="c"><div class="k"><h2 style="margin:0">${ic("libro")} ${esc(x[0])}</h2>${btx()}</div><div class="m">${esc(x[3])} · ${esc(x[1])} · ${yrs0(x[2])}</div>${filaV(T40("Géneros", "Genres"), esc(sp(x[4]).join(", ")))}${filaV(T40("Fama", "Fame"), x[6] + "/100")}${filaV(T40("Derechos", "Rights"), lib ? T40("dominio público · gratis", "public domain · free") : L37(`libre en ${x[5]}`, `free in ${x[5]}`))}${filaV(T40("Adaptaciones conocidas", "Known adaptations"), ad)}${d[2] ? `<h3>${T40("De qué trata", "What it's about")}</h3><p>${esc(d[2])}</p>` : ""}${d[1] ? `<h3>${T40("Personajes", "Characters")}</h3><div class="chips">${String(d[1]).split(",").map((c) => `<span class="ch">${esc(c.split(":")[0].trim())}</span>`).join("")}</div>` : ""}${d[0] ? `<h3>${T40("Temas", "Themes")}</h3><div class="m">${esc(String(d[0]).split("|").join(" · "))}</div>` : ""}<div class="bts" style="margin-top:12px">${lib && yr() >= x[2] ? bt("mta", "p|" + i, ic("idea") + " " + T40("Adaptar", "Adapt"), "a") : ""}${bt("bib", "", ic("buscar") + " " + T40("Otra obra", "Another work"))}</div></div>`;
}
ACT["bib"] = () => {
  const y = yr();
  fxPick({
    t: T40("Biblioteca de clásicos", "Classics library"),
    d: T40("Mitos, leyendas, novelas, obras de teatro y poemas. Busca por título, autor o género.", "Myths, legends, novels, plays and poems. Search by title, author or genre."),
    items: PD.map((x, i) => [x, i])
      .filter(([x]) => y >= x[2])
      .map(([x, i]) => ({ v: i, l: x[0], s: x[1] + " · " + yrs0(x[2]) + " · " + sp(x[4]).slice(0, 2).join(", ") + (pdLibre(x) ? "" : " · " + L37(`libre en ${x[5]}`, `free in ${x[5]}`)), g: x[3] })),
    ok: (s) => op(biblioH(+s[0])),
  });
};
const mtMX = mtM;
mtM = function () {
  mtMX.apply(this, arguments);
  const h = document.querySelector("#md .hoja .k");
  if (h && !h.querySelector('[data-a="bib"]')) h.insertAdjacentHTML("afterend", `<div class="c">${bt("bib", "", ic("libro") + " " + T40("Biblioteca de clásicos", "Classics library"), "a")}<div class="m">${T40("Explora cada obra libre con su historia, sus personajes y cuántas veces se adaptó.", "Browse every free work with its story, characters and how often it was adapted.")}</div></div>`);
};
