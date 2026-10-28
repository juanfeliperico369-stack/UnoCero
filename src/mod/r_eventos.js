// ===== Eventos verosímiles: las invitaciones y los honores llegan cuando el estudio tiene con qué =====
const evRel = () => S.pj.filter((p) => p.st >= 3 && !p.rr).length;
const evAnios = () => yr() - (S.y0 || yr());
const evPop = () => S.pop || 0;
// Eventos del avatar: [prestigio mínimo, obras estrenadas, premios ganados, año desde]
const AVREQ = {
  0: [35, 3, 0, 1895],
  1: [25, 2, 0, 1930],
  2: [0, 1, 0, 0],
  4: [45, 8, 0, 0],
  5: [40, 4, 0, 0],
  6: [50, 8, 1, 0],
  7: [30, 3, 0, 0],
  8: [40, 3, 0, 1850],
  12: [45, 5, 1, 0],
  13: [50, 8, 0, 0],
  14: [25, 2, 0, 1935],
  16: [20, 2, 0, 0],
  17: [30, 3, 0, 1950],
};
function avOk(i) {
  const r = AVREQ[i];
  if (!r) return true;
  return evPop() >= r[0] && evRel() >= r[1] && (S.win | 0) >= r[2] && yr() >= r[3];
}
// Eventos generales que suponen fama, trayectoria o un catálogo
const EVREQ = {
  "Una escuela pide que des clases": () => evPop() >= 35 && evRel() >= 3,
  "Una estrella quiere trabajar contigo": () => evPop() >= 30 && evRel() >= 2,
  "Un gigante quiere comprar parte de tu estudio": () => evRel() >= 3,
  "Una marca quiere patrocinarte": () => evPop() >= 15 && evRel() >= 2,
  "Una plataforma quiere una serie exclusiva": () => evPop() >= 25 && evRel() >= 3,
  "Un músico famoso quiere hacer tu canción": () => evPop() >= 40 || S.pj.some((p) => p.m == 4 && p.st >= 3 && (p.a || 0) >= 70),
  "Una estrella extranjera quiere probar suerte": () => evPop() >= 30 && evRel() >= 3,
  "Un documental sobre la industria": () => evPop() >= 30 && evRel() >= 5,
  "Tu estudio en televisión": () => evPop() >= 35 && evRel() >= 4,
  "Un discurso en la gala": () => evPop() >= 40 && (S.win | 0) >= 1,
  "La historia de tu estudio": () => evAnios() >= 15 && evRel() >= 10,
  "Restaurar tus clásicos": () => S.pj.some((p) => p.st == 4 && (p.c || 0) >= 70 && yr() - (p.y || yr()) >= 20),
  "Un festival con tu nombre": () => evPop() >= 70 && evRel() >= 15,
  "Aniversario del estudio": () => evAnios() >= 10,
  "Función en palacio": () => evPop() >= 40 && evRel() >= 3,
  "Un retrato para los diarios": () => evPop() >= 25 && evRel() >= 2,
  "Un salón literario": () => evPop() >= 20 && evRel() >= 2,
  "Un mecenas": () => evRel() >= 1,
  "Un pasante genial": () => evRel() >= 1,
  "Premio a la trayectoria": () => evPop() >= 55 && evAnios() >= 20,
};
EVT.forEach((e) => {
  const req = typeof e.n == "string" && EVREQ[e.n];
  if (!req || e.req5) return;
  e.req5 = 1;
  const c0 = e.c;
  e.c = function () {
    if (!S || !req()) return null;
    return c0 ? c0.apply(this, arguments) : 1;
  };
});
