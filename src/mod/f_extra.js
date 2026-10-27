// ===== Cronología del estudio y estado anual =====
function cronoH() {
  const L = S.pj.filter((P) => P.st >= 3 && P.y),
    H = [];
  MD.forEach((m, k) => {
    const p = L.filter((P) => P.m == k).sort((a, b) => a.y - b.y)[0];
    if (p) H.push([p.y, L37(`Primera obra de ${m[0].toLowerCase()}: «${p.n}»`, `First ${m[0].toLowerCase()} work: «${p.n}»`)]);
  });
  const best = L.slice().sort((a, b) => (b.c || 0) - (a.c || 0))[0],
    rich = L.slice().sort((a, b) => (b.gross || 0) - (a.gross || 0))[0];
  if (best) H.push([best.y, L37(`Tu obra mejor criticada: «${best.n}» (${Math.round(best.c)})`, `Your best-reviewed work: «${best.n}» (${Math.round(best.c)})`)]);
  if (rich && rich.gross) H.push([rich.y, L37(`Tu mayor taquilla: «${rich.n}» (${fm(rich.gross)})`, `Your biggest hit: «${rich.n}» (${fm(rich.gross)})`)]);
  const dec = {};
  L.forEach((P) => {
    const d = Math.floor(P.y / 10) * 10;
    if (!dec[d] || (P.gross || 0) > (dec[d].gross || 0)) dec[d] = P;
  });
  Object.keys(dec).forEach((d) => H.push([+d + 9.5, L37(`La obra de la década de ${d}: «${dec[d].n}»`, `Work of the ${d}s: «${dec[d].n}»`)]));
  H.push([S.y0, L37(`Se funda ${S.sn}`, `${S.sn} is founded`)]);
  H.sort((a, b) => a[0] - b[0]);
  return `<div class="c"><h3 style="margin:0 0 8px">${ic("calendario")} ${T40("Cronología del estudio", "Studio timeline")}</h3><div class="crono">${H.map((h) => `<div><b>${Math.floor(h[0])}</b><span>${esc(h[1])}</span></div>`).join("")}</div></div>`;
}
const vSalonX = vSalon37;
vSalon37 = function (s) {
  const h = vSalonX.apply(this, arguments);
  return (SUB[5] | 0) == 6 ? h + cronoH() : h;
};
const vFinX = vFin;
vFin = function () {
  const h = vFinX.apply(this, arguments),
    L = S.pj.filter((P) => P.st >= 3),
    cat = Math.round(sum(L, (P) => (P.gross || 0) * 0.04 * Math.pow(0.97, Math.max(0, yr() - (P.y || yr()))))),
    deu = Math.round((typeof banDeuda == "function" ? banDeuda() : 0) + (typeof cpTot == "function" ? cpTot() : 0)),
    act = Math.max(0, S.cash) + cat,
    pas = deu + Math.max(0, -S.cash);
  return (
    h +
    `<div class="c"><h3 style="margin:0 0 6px">${T40("Estado anual", "Annual balance sheet")}</h3>${filaV(T40("Caja", "Cash"), fm(S.cash))}${filaV(T40("Valor estimado del catálogo", "Estimated catalog value"), fm(cat))}${filaV(T40("Deudas", "Debts"), fm(deu))}<div class="fila"><span><b>${T40("Patrimonio", "Net worth")}</b></span><b style="color:${act - pas >= 0 ? "var(--a)" : "var(--r)"}">${fm(act - pas)}</b></div><div class="m">${T40("El catálogo vale por lo que aún puede rentar en ventanas, licencias y reestrenos; pierde valor con los años.", "The catalog is worth what it can still earn in windows, licenses and re-releases; it loses value over the years.")}</div></div>`
  );
};
// Logros del año en el balance anual
V37.comp.push((x) => {
  if (!x.lgrY) {
    x.lgrY = {};
    (x.lgr || []).forEach((i) => (x.lgrY[i] = 0));
  }
});
on("mes", () => {
  if (!S || S.pre) return;
  S.lgrY = S.lgrY || {};
  (S.lgr || []).forEach((i) => S.lgrY[i] == null && (S.lgrY[i] = yr()));
});
const ybxL = ybx;
ybx = function () {
  const y = S.ys ? S.ys.y : null,
    r = ybxL.apply(this, arguments),
    h = document.querySelector("#md .hoja");
  if (y != null && h && S.lgrY) {
    const L = Object.keys(S.lgrY)
      .filter((i) => S.lgrY[i] == y && LOGR[i])
      .map((i) => LOGR[i]);
    h.insertAdjacentHTML(
      "beforeend",
      `<div class="c"><h3 style="margin:0 0 6px">${ic("trofeo")} ${T40("Logros del año", "Achievements of the year")}</h3>${L.length ? L.map((l) => `<div class="fila"><span><b>${esc(l[0])}</b><span class="m"> · ${esc(l[1])}</span></span></div>`).join("") : `<div class="m">${T40("Este año no desbloqueaste logros nuevos.", "You didn't unlock new achievements this year.")}</div>`}</div>`,
    );
  }
  return r;
};
