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
// Más eventos que suponen algo concreto: un estreno en salas, un préstamo, obras de cierto medio, rodajes en marcha
const evMed = (m, st) => S.pj.some((p) => p.m == m && (st == null ? p.st >= 3 : p.st == st));
const evRod = () => S.pj.some((p) => p.st == 0 && conRodaje(p.m));
const evInf = () => Object.values(S.inf || {}).some((x) => x > 0);
Object.assign(EVREQ, {
  "Huelga de guionistas": () => S.pj.some((p) => p.st <= 1) || evRel() >= 2,
  "Rumor falso sobre tu estudio": () => evPop() >= 10,
  "Un rival propone una coproducción": () => evRel() >= 1 || evPop() >= 10,
  "Incentivos para rodar en otro país": () => evRel() >= 1 && S.pj.some((p) => conRodaje(p.m)),
  "Un país propone coproducir": () => evRel() >= 2 && evPop() >= 10,
  "El sindicato pide seguro para el equipo": () => evRod() || evRel() >= 3,
  "Inundación en los estudios": () => evInf() || evRel() >= 3,
  "Inundación en el depósito": () => evRel() >= 2,
  "Pierdes la guerra de formatos": () => evRel() >= 2,
  "Concurso de guiones": () => evPop() >= 10,
  "Festival de cortometrajes": () => evMed(0),
  "Una academia ofrece becas": () => evPop() >= 15,
  "Fallo antimonopolio": () => evPop() >= 50 || (S.cine && S.cine.length > 0),
  "Fiebre de las secuelas": () => evRel() >= 2,
  "La inflación dispara los costos": () => S.pj.some((p) => p.st <= 2) || evRel() >= 1,
});
const EVREQ37 = {
  n_cines: () => evMed(0, 3),
  n_banco: () => (S.lo || []).length > 0,
  h_residuales: () => evRel() >= 3 && S.pj.some((p) => p.st >= 3 && [0, 1].includes(p.m)),
  h_ia: () => S.pj.some((p) => (p.ai || 0) > 0),
  t_hackeo: () => evRel() >= 3 || evPop() >= 20,
  w_colonias: () => evRel() >= 3,
  w_neuro: () => evRel() >= 1,
  v_caridad: () => evPop() >= 15,
  v_vecinos: () => evInf() || evRod(),
  x_revolucion: () => S.pj.some((p) => p.m == 3),
  x_colera: () => S.pj.some((p) => p.st == 3 && [3, 5].includes(p.m)),
  x_tren: () => S.pj.some((p) => p.m == 3 && p.st >= 3),
  x_fonografo: () => S.pj.some((p) => [3, 4].includes(p.m) && p.st >= 3),
  x_duelo: () => S.pj.some((p) => p.m == 3 && p.st >= 3 && (p.gn || []).some((g) => /Comedia|Sátira|Parodia/.test(g))),
  m_videoclub: () => S.pj.filter((p) => p.m == 0 && p.st == 4).length >= 2,
  m_auditor: () => S.t > 104 && evRel() >= 2,
  w_gripe: () => S.pj.some((p) => p.st == 3 && [0, 3].includes(p.m)),
  w_radio: () => S.pj.some((p) => p.st >= 3 && [0, 3, 4].includes(p.m)),
  w_sonoro: () => evMed(0) || S.pj.some((p) => p.m == 0 && p.st <= 2),
  w_codigo_fin: () => evMed(0),
  w_video_casero: () => S.pj.filter((p) => p.m == 0 && p.st >= 3).length >= 2,
  w_internet: () => evRel() >= 1,
  w_crisis2008: () => S.pj.some((p) => p.st <= 2) || (S.lo || []).length > 0,
  w_pandemia: () => evRod(),
  w_espacio: () => evPop() >= 40 && S.pj.some((p) => conRodaje(p.m)),
  w_holograma: () => evPop() >= 30,
  w_clima: () => evRod(),
  p_novela: () => evRel() >= 1,
  p_clasico: () => evRel() >= 1,
  p_regreso: () => evPop() >= 20,
  p_extranjero: () => evPop() >= 15 && evRel() >= 2,
  p_musical: () => evRel() >= 1,
};
EVT.forEach((e) => {
  const req = (e.v37 && EVREQ37[e.v37]) || (!e.v37 && typeof e.n == "string" && EVREQ[e.n]);
  if (!req || e.req5) return;
  e.req5 = 1;
  const c0 = e.c;
  e.c = function () {
    if (!S || !req()) return null;
    return c0 ? c0.apply(this, arguments) : 1;
  };
});
// Ninguna decisión de un evento puede llevarse más de una quinta parte de la caja disponible
let EVACT = 0;
const evEligeR = evElige;
evElige = function () {
  EVACT = 1;
  try {
    return evEligeR.apply(this, arguments);
  } finally {
    EVACT = 0;
  }
};
const gastaR = gasta;
gasta = function (cat, n) {
  if (EVACT && n > 0) n = Math.min(n, Math.max(0, S.cash) * 0.2);
  return gastaR(cat, n);
};
