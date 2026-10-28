// ===== Lanzamiento en dos pasos: primero la campaña (la obra puede quedar en reposo) y después la fecha y el plan de salida =====
const planB = ACT["plan"];
ACT["plan"] = (v) => {
  const P = pj(v);
  if (!P) return;
  PL = { id: +v, mk: P.mkOk && P.mk ? P.mk.slice() : mkBasico(P.m), rf: 0, roy: 45, k: 2, paso: P.mkOk ? "fe" : "mk" };
  return pl();
};
ACT["plp"] = (v) => {
  PL.paso = v == "fe" ? "fe" : "mk";
  const P = pj(PL.id);
  if (P && P.mkOk) PL.paso = "fe";
  return pl();
};
// Calendario de hasta dos años: cada semana con su temporada, sus fiestas y la competencia que se conoce
function lzCal(P) {
  const meses = {},
    hoy = S.t;
  for (let k = 1; k <= 104; k++) {
    const t = hoy + k,
      d = semIni(t) + diaEst(P.m, S.y0 + Math.floor(t / 52)),
      a = dnA(d),
      key = a.y + "-" + a.m;
    (meses[key] = meses[key] || { y: a.y, m: a.m, L: [] }).L.push({ k, t, d, a });
  }
  const celda = (x) => {
    const tw = tempW(x.t, P.m),
      c = compSem(x.t, P.m),
      F = typeof festEn == "function" ? festEn(x.t) : [],
      fe = festG(x.t, P.gn, P.m),
      cls = ["lzc", PL.k == x.k ? "on" : "", tw >= 1.1 ? "alta" : tw <= 0.92 ? "baja" : "", c.lvl == 2 ? "dura" : c.lvl == 1 ? "media" : ""].join(" ");
    return `<button class="${cls}" data-a="plk" data-v="${x.k}" title="${esc(F.join(" · "))}"><b>${x.a.d}</b><small>×${dec1(tw, 2)}</small>${fe ? `<i>${esc(fe)}</i>` : F.length ? `<i class="m">${esc(F[0])}</i>` : ""}</button>`;
  };
  return `<div class="lz-cal"><div class="k"><b>${T40("Calendario de estreno", "Release calendar")}</b>${chx("plk", 0, T40("Retener: decidir después", "Hold: decide later"), PL.k == 0)}</div><div class="m">${T40("Hasta dos años. Verde: buena temporada; rojo: mucha competencia; en dorado, la fiesta que le sienta a tu obra.", "Up to two years. Green: good season; red: heavy competition; in gold, the festivity that suits your work.")}</div>${Object.values(meses)
    .map((M) => `<div class="lz-mes"><div class="m"><b>${esc(cap1(MESL[M.m - 1]))} ${M.y}</b></div><div class="lz-sem">${M.L.map(celda).join("")}</div></div>`)
    .join("")}</div>`;
}
ACT["plk"] = (v) => {
  PL.k = +v;
  const s = $("#p-k");
  if (s) s.value = String(PL.k);
  document.querySelectorAll("#md .lzc").forEach((b) => b.classList.toggle("on", +b.dataset.v == PL.k));
  document.querySelectorAll('#md .lz-cal [data-a="plk"][data-v="0"]').forEach((b) => b.classList.toggle("on", PL.k == 0));
  return pu();
};
const plLZ = pl;
pl = function () {
  const r = plLZ.apply(this, arguments),
    P = pj(PL.id),
    w = document.querySelector("#md .plw");
  if (!P || !w) return r;
  const paso = P.mkOk ? "fe" : PL.paso || "mk";
  w.dataset.paso = paso;
  const cab = w.querySelector(".k");
  if (cab && !w.querySelector(".pl-pasos"))
    cab.insertAdjacentHTML(
      "afterend",
      `<div class="chips pl-pasos">${P.mkOk ? `<span class="ch on">${ic("ok")} ${T40("1 · Campaña hecha", "1 · Campaign done")}</span>` : chx("plp", "mk", "1 · " + T40("Marketing", "Marketing"), paso == "mk")}${chx("plp", "fe", "2 · " + T40("Fecha y plan de salida", "Date and release path"), paso == "fe")}</div>${
        P.mkOk
          ? `<div class="m">${L37(`La campaña de «${esc(P.n)}» ya está pagada (${fm(P.mkc0 || 0)}). Expectativa actual: ${Math.round(P.mkE || 0)}. Si esperas más de 12 semanas desde la campaña, se enfría poco a poco.`, `The campaign for "${esc(P.n)}" is already paid (${fm(P.mkc0 || 0)}). Current hype: ${Math.round(P.mkE || 0)}. If you wait more than 12 weeks after the campaign, it slowly cools down.`)}</div>`
          : paso == "mk"
            ? `<div class="m">${T40("Primero la campaña. Puedes lanzarla ya y dejar la obra en reposo hasta elegir la fecha, o seguir directo a la fecha y el plan de salida.", "First the campaign. You can launch it now and leave the work on hold until you pick the date, or go straight to the date and release path.")}</div>`
            : ""
      }`,
    );
  const f = w.querySelector(".pl-fecha");
  if (f && !w.querySelector(".lz-cal")) f.insertAdjacentHTML("beforeend", lzCal(P));
  return r;
};
// En el paso de marketing, el botón de estrenar se cambia por «campaña y reposo» o «siguiente»
const puLZ = pu;
pu = function () {
  const r = puLZ.apply(this, arguments),
    P = pj(PL.id),
    w = document.querySelector("#md .plw"),
    b = document.querySelector('#md #p-s [data-a="rl"]');
  if (!P || !w || !b) return r;
  if (w.dataset.paso == "mk" && !P.mkOk) {
    const c = mkTot(PL.mk, P) + (PL.pro || []).reduce((a, i) => a + prmC(i, P), 0);
    b.insertAdjacentHTML("beforebegin", `${bt("mkr", "", ic("marketing") + " " + T40("Lanzar la campaña y dejarla en reposo", "Launch the campaign and put it on hold") + " · " + fm(c))}`);
    b.outerHTML = bt("plp", "fe", T40("Siguiente: fecha y plan de salida", "Next: date and release path") + " →", "a");
  } else if (P.mkOk) b.textContent = T40("Confirmar fecha y plan", "Confirm date and path");
  return r;
};
ACT["mkr"] = () => {
  const P = pj(PL.id);
  if (!P || P.st != 1 || P.mkOk) return;
  const pro = (PL.pro || []).slice(),
    c = mkTot(PL.mk, P) + pro.reduce((a, i) => a + prmC(i, P), 0);
  if (c > S.cash) return toast(T40("Fondos insuficientes", "Insufficient funds"));
  gasta("marketing", c);
  P.mk = PL.mk.slice();
  P.mkh = P.mk.reduce((x, i) => x + MK[i][2], 0);
  P.proK = pro;
  pro.forEach((i) => (P.fxh = (P.fxh || 0) + PRM[i][3]));
  P.mkc0 = Math.round(c);
  P.mkOk = 1;
  P.mk0 = S.t;
  P.mkE = expect(P, P.mk) + pro.reduce((a, i) => a + PRM[i][3], 0);
  nws(L37(`La campaña de «${P.n}» está en marcha: la obra queda en reposo hasta que elijas su fecha.`, `The campaign for "${P.n}" is under way: the work stays on hold until you pick its date.`));
  cx();
  sonar("ok");
  return pg();
};
// La expectativa de una campaña se enfría si el estreno tarda demasiado
on("semana", () => {
  if (!S || S.pre) return;
  S.pj.forEach((P) => {
    if (P.mk0 == null || S.t - P.mk0 <= 12) return;
    if (P.st == 1 && P.mkOk && P.mkE != null) P.mkE = Math.max(expect(P, []), P.mkE - 0.3);
    else if (P.st == 2 && P.E != null) P.E = Math.max(expect(P, []), P.E - 0.3);
  });
});
V37.ficha.push((P) =>
  P && P.st == 1 && P.mkOk
    ? `<div class="c sub"><b>${T40("Campaña en marcha · en reposo", "Campaign running · on hold")}</b><div class="m">${L37(`Expectativa ${Math.round(P.mkE || 0)}. Falta elegir la fecha y el plan de salida.`, `Hype ${Math.round(P.mkE || 0)}. You still need to pick the date and release path.`)}</div>${bt("plan", P.id, ic("calendario") + " " + T40("Elegir fecha", "Pick date"), "a")}</div>`
    : "",
);
E40L([
  ["Calendario de estreno", "Release calendar"],
  ["Campaña en marcha · en reposo", "Campaign running · on hold"],
  ["Fecha y plan de salida", "Date and release path"],
]);
