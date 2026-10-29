// ===== Calendario del documento: fechas que faltaban y su efecto real sobre los estrenos =====
// [nombre, [mes, día, días], regiones, géneros o «@medio» (4 música, 3 teatro, 5 libros), multiplicador, desde]
[
  ["Semana de la Moda de Milán", [2, 20, 8], RG.eu, "@4+3", 4, 1958],
  ["Día de la Mujer", [3, 8, 3], RG.mundo, "Crimen,Comedia", 1, 1975],
  ["Día de la Tierra", [4, 22, 3], RG.mundo, "", 1, 1970],
  ["Día del Libro", [4, 23, 14], RG.mundo, "@5,Monstruos,Biográfico,Histórico,Superhéroes,Fantasía,Misterio,Drama,Ciencia ficción", 5, 1996],
  ["Fiestas folclóricas", [8, 1, 28], RG.mundo, "Fantasía,Folklórico", 3, 1600],
  ["Burning Man", [8, 26, 9], RG.norte, "", 3, 1986],
  ["Día Internacional de la Paz", [9, 21, 3], RG.mundo, "", 1, 1982],
  ["Semana de la Moda de París", [9, 26, 9], RG.eu, "@4+3", 4, 1973],
  ["Comic Con", [10, 10, 25], RG.norte, "@5,Superhéroes,Ciencia ficción,Fantasía,Monstruos,Terror", 5, 1970],
  ["Semana de la Moda de Nueva York", [11, 12, 9], RG.na, "@4+3", 4, 1943],
].forEach((f) => !FESTV.some((x) => x[0] == f[0]) && FESTV.push(f));
FESTV.forEach((f) => {
  if (f[0] == "Pascua" && !/Religioso/.test(f[3])) f[3] = f[3] + ",Religioso";
  if (f[0] == "Halloween" && !/Monstruos/.test(f[3])) f[3] = f[3] + ",Monstruos,@5";
});
E40L([
  ["Semana de la Moda de Milán", "Milan Fashion Week"],
  ["Día de la Mujer", "Women's Day"],
  ["Día de la Tierra", "Earth Day"],
  ["Día del Libro", "World Book Day"],
  ["Fiestas folclóricas", "Folk festivals"],
  ["Burning Man", "Burning Man"],
  ["Día Internacional de la Paz", "International Day of Peace"],
  ["Semana de la Moda de París", "Paris Fashion Week"],
  ["Comic Con", "Comic Con"],
  ["Semana de la Moda de Nueva York", "New York Fashion Week"],
]);
// Todas las fiestas que caen en una semana del juego
function festEn(t) {
  const n0 = semIni(t),
    n1 = semFin(t),
    y = dnA(n0 + 3).y;
  return uniq(
    festC(y)
      .concat(festC(y - 1))
      .filter((f) => f[1] >= n0 && f[0] <= n1)
      .map((f) => f[2]),
  );
}
// La fiesta que le corresponde a la obra multiplica sus ventas al estrenar en esas fechas
V37.ventas.push((P) => {
  if (!S || P.rt == null || Math.abs(P.rt - S.t) > 1) return 1;
  const n = festG(P.rt, P.gn, P.m);
  if (!n) return P.m == 4 && festEn(P.rt).includes("Burning Man") ? 1.15 : 1;
  const f = FESTV.find((x) => x[0] == n || n.indexOf(x[0]) == 0);
  const k = f ? f[4] : 2;
  return Math.min(1.3, 1 + (k - 1) * 0.025) * (P.m == 4 && festEn(P.rt).includes("Burning Man") ? 1.15 : 1);
});
// Las semanas de la moda guardan un secreto: quien estrena en ellas deja una pista para otra industria
const MODAF = ["Semana de la Moda de Milán", "Semana de la Moda de París", "Semana de la Moda de Nueva York"];
V37.estreno.push((P) => {
  if (!S || S.bot) return;
  const f = festEn(S.t).find((x) => MODAF.includes(x));
  if (!f) return;
  P.moda = f;
  S.moda = (S.moda || 0) + 1;
  if (S.moda > 1) return;
  const c = f.replace("Semana de la Moda de ", "");
  nws(
    L37(
      `Entre bastidores de la Semana de la Moda de ${c}, una diseñadora desconocida anota en su cuaderno los vestuarios de «${P.n}». Antes de irse, dice: «algún día la moda tendrá su propia industria». Hilo y aguja para otra historia.`,
      `Backstage at ${trTxt(f)}, an unknown designer sketches the costumes of "${P.n}" in her notebook. Before leaving, she says: "one day fashion will have its own industry." Thread and needle for another story.`,
    ),
  );
});
LOGR.push(["Hilo y aguja", "Estrena una obra durante una Semana de la Moda", () => S.pj.some((p) => p.moda), "Un secreto del calendario"]);
E40L([
  ["Hilo y aguja", "Thread and needle"],
  ["Estrena una obra durante una Semana de la Moda", "Release a work during a Fashion Week"],
  ["Un secreto del calendario", "A secret in the calendar"],
]);
