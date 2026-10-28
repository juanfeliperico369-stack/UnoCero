// ===== Plan de salida cruzado: el orden de las ventanas lo decides tú, en todos los medios (también en música) =====
// Ventanas: [nombre es, nombre en, categoría de ingresos, fracción del bruto según el año]
const VX = {
  cin: ["Cines", "Theaters", "taquilla", () => 0.3],
  sal: ["Temporada en sala", "Theater run", "taquilla", () => 0.25],
  fis: ["Edición física", "Physical edition", "licencias", (y) => (y < 1976 ? 0.12 : Math.max(0.08, fVid(y)))],
  tv: ["Televisión", "TV", "tv", (y) => fTv(y)],
  str: ["Streaming", "Streaming", "streaming", (y) => fStr(y)],
  gir: ["Gira", "Tour", "eventos", () => 0.15],
  rad: ["Radio y rocolas", "Radio and jukeboxes", "licencias", (y) => (y < 1920 ? 0 : y < 2010 ? 0.12 : 0.04)],
  col: ["Edición de coleccionista", "Collector's edition", "merch", (y) => (y < 1970 ? 0 : 0.08)],
  sus: ["Catálogo por suscripción", "Subscription catalog", "streaming", (y) => (y < 2017 ? 0 : 0.5)],
  aud: ["Audiolibro y digital", "Audiobook and digital", "licencias", (y) => (y < 1955 ? 0 : y < 2007 ? 0.05 : 0.1)],
  bol: ["Edición de bolsillo", "Paperback", "licencias", (y) => (y < 1935 ? 0.1 : 0.25)],
};
// Planes: [es, en, desde, tipo de estreno (0 principal, 1 físico, 2 digital, null = el que elijas), crítica, público, ventas ×, ventanas al estrenar, ventanas al salir de cartelera, ¿reemplaza las ventanas de siempre?, nota es, nota en]
// ventana: [clave, semanas de espera, semanas que dura, × de su fracción]
const PLX = [
  [
    ["Clásico: cines → físico → TV y streaming", "Classic: theaters → physical → TV and streaming", 1895, null, 0, 0, 1, [], [], 0, "El orden de siempre.", "The usual order."],
    ["Streaming primero → cines → físico", "Streaming first → theaters → physical", 2007, 2, 0, 1, 1, [], [["cin", 6, 8, 0.8], ["fis", 14, 26, 1]], 0, "Se estrena en plataformas y llega a salas como evento.", "Premieres on platforms and reaches theaters as an event."],
    ["Físico primero → cines de culto → TV", "Physical first → cult screenings → TV", 1976, 1, 0, 0, 1, [], [["cin", 8, 8, 0.5], ["tv", 20, 26, 1]], 0, "Directo a video; si funciona, las salas la recuperan.", "Straight to video; if it works, theaters bring it back."],
    ["Día y fecha: cines y streaming a la vez", "Day-and-date: theaters and streaming together", 2007, 0, 0, 1, 0.8, [["str", 0, 52, 1.6]], [], 0, "Llega a todos de golpe: menos taquilla, más reproducciones.", "Reaches everyone at once: less box office, more streams."],
    ["Festival → salas limitadas → ampliación → plataformas", "Festival → limited run → wide → platforms", 1946, 0, 2, 0, 0.9, [], [], 0, "La crítica la descubre primero.", "Critics discover it first."],
  ],
  [
    ["TV → streaming", "TV → streaming", 1940, null, 0, 0, 1, [], [], 0, "El orden de siempre.", "The usual order."],
    ["Streaming primero → TV abierta", "Streaming first → free TV", 2007, 2, 0, 1, 1, [], [["tv", 8, 26, 1.2]], 0, "La plataforma la estrena y la TV la amplía.", "The platform premieres it and TV widens it."],
    ["Todo de golpe para maratonear", "All at once for binge-watching", 2013, 2, 0, 2, 1.05, [], [], 0, "Toda la temporada el mismo día.", "The whole season on the same day."],
    ["Semanal en cable → plataforma", "Weekly on cable → platform", 1975, 0, 1, 0, 0.9, [], [["str", 4, 52, 1.3], ["tv", 4, 26, 0.6]], 0, "Un capítulo por semana: conversación y prestigio.", "One episode a week: conversation and prestige."],
  ],
  [
    ["Tienda física → digital", "Physical store → digital", 1971, null, 0, 0, 1, [], [], 0, "El orden de siempre.", "The usual order."],
    ["Acceso anticipado → versión final", "Early access → full release", 2013, null, -1, 2, 1.05, [], [], 0, "Los fans lo juegan antes y ayudan a pulirlo.", "Fans play it early and help polish it."],
    ["Digital primero → edición física de coleccionista", "Digital first → physical collector's edition", 2008, 2, 0, 0, 1, [], [["col", 6, 12, 1], ["fis", 12, 26, 1]], 0, "Primero en tiendas digitales; luego la caja para coleccionistas.", "Digital stores first; then the collector's box."],
    ["Catálogo por suscripción desde el primer día", "Subscription catalog on day one", 2017, 2, 0, 2, 0.7, [["sus", 0, 52, 1]], [], 0, "La plataforma paga por tenerlo; vendes menos copias.", "The platform pays to have it; you sell fewer copies."],
  ],
  [
    ["Temporada en sala → gira", "Theater run → tour", 1600, null, 0, 0, 1, [], [["gir", 2, 12, 1]], 0, "Primero la sala; después la compañía sale de gira.", "First the venue; then the company tours."],
    ["Gira primero → temporada en la capital", "Tour first → run in the capital", 1600, null, 0, 1, 0.9, [], [["sal", 2, 12, 1]], 0, "Se prueba en provincias y llega rodada a la capital.", "It's tested on tour and arrives polished in the capital."],
    ["Festival → temporada", "Festival → run", 1947, null, 2, 0, 0.95, [], [["gir", 4, 8, 0.6]], 0, "Se estrena en un festival de teatro.", "Premieres at a theater festival."],
    ["Función grabada el mismo día", "Recorded performance the same day", 1950, null, 0, 1, 0.9, [["str", 0, 26, 0.8], ["tv", 0, 26, 0.8]], [], 0, "Se transmite mientras está en cartel.", "It's broadcast while still running."],
  ],
  [
    ["Sencillo adelanto → álbum → gira", "Lead single → album → tour", 1950, null, 0, 1, 1, [["rad", 0, 12, 1]], [["gir", 2, 12, 1]], 0, "El sencillo calienta la radio; el disco y la gira rematan.", "The single warms up the radio; the album and tour seal it."],
    ["Álbum sorpresa: todo el mismo día", "Surprise album: everything on one day", 2013, 2, 0, 2, 1.1, [], [["gir", 4, 12, 0.8]], 0, "Sin anuncio previo: el golpe de efecto lo es todo.", "No announcement: the shock is everything."],
    ["Radio y disco físico primero → streaming", "Radio and physical first → streaming", 1920, 1, 0, 0, 1, [["rad", 0, 16, 1.2]], [["str", 4, 52, 1]], 0, "El camino clásico de la radio a la tienda.", "The classic road from radio to the store."],
    ["Gira primero → álbum en vivo", "Tour first → live album", 1950, null, 1, 1, 0.85, [["gir", 0, 12, 1.4]], [["fis", 4, 26, 0.6]], 0, "Las canciones se prueban en el escenario.", "The songs are tested on stage."],
    ["Videoclip viral → álbum", "Viral video → album", 2005, 2, -1, 2, 1.05, [], [["gir", 4, 12, 0.6]], 0, "Un video corre por internet y arrastra al disco.", "A video spreads online and pulls the record along."],
  ],
  [
    ["Tapa dura → bolsillo → audiolibro", "Hardcover → paperback → audiobook", 1600, null, 0, 0, 1, [], [["bol", 8, 26, 1], ["aud", 20, 52, 1]], 0, "El camino de siempre del libro.", "The usual road for a book."],
    ["Por entregas → libro completo", "Serialized → full book", 1836, null, 0, 2, 1, [], [["bol", 4, 26, 1.2]], 0, "Capítulo a capítulo, el público espera el siguiente.", "Chapter by chapter, readers wait for the next one."],
    ["Digital primero → edición impresa", "Digital first → print edition", 2007, 2, 0, 1, 1, [], [["fis", 6, 26, 1.4], ["aud", 10, 52, 1]], 0, "Primero en lectores digitales; si funciona, a la imprenta.", "First on e-readers; if it works, to print."],
    ["Preventa firmada y edición de coleccionista", "Signed preorder and collector's edition", 1970, null, 1, 1, 1, [["col", 0, 8, 1.2]], [["bol", 8, 26, 1]], 0, "Los fans pagan por adelantado un ejemplar especial.", "Fans pay in advance for a special copy."],
  ],
];
const plxL = (m) => PLX[m].map((p, i) => [p, i]).filter(([p]) => yr() >= p[2]);
// Plan a medida: el jugador elige qué ventanas abre y cuántas semanas después del estreno
const VXM = [["cin", "fis", "tv", "str", "col", "sus"], ["tv", "str", "fis", "col"], ["fis", "col", "sus", "str"], ["sal", "gir", "tv", "str", "fis"], ["rad", "fis", "str", "gir", "col"], ["bol", "aud", "fis", "col"]];
const VXESP = [0, 2, 4, 8, 12, 16, 26, 52];
const plxMedida = (L) => ["A medida", "Custom", 0, null, 0, 0, Math.max(0.8, 1 - 0.04 * L.filter((w) => w[1] < 8).length), L.map((w) => [w[0], w[1], w[2] || 26, 1]), [], 0, "Tu propio orden de ventanas: abre cada una cuando quieras.", "Your own window order: open each one whenever you like."];
const plxDe = (P) => (P && P.plx == -1 && P.plxC ? plxMedida(P.plxC) : P && P.plx != null && PLX[P.m] ? PLX[P.m][P.plx] : null);
function plxRuta(p) {
  const A = p[7].map((w) => w[0]),
    B = p[8].map((w) => w[0]);
  const ini = p[3] == 2 ? T40("Digital", "Digital") : p[3] == 1 ? T40("Físico", "Physical") : T40("Estreno", "Premiere");
  return [ini].concat(A.map((k) => LL(VX[k]) + " " + T40("(a la vez)", "(at once)")), B.map((k) => LL(VX[k]))).join(" → ");
}
function plxH(P) {
  const L = plxL(P.m);
  if (!L.length) return "";
  if (PL.plx == null || (PL.plx != -1 && (!PLX[P.m][PL.plx] || yr() < PLX[P.m][PL.plx][2]))) PL.plx = 0;
  PL.cus = PL.cus || [];
  const p = PL.plx == -1 ? plxMedida(PL.cus) : PLX[P.m][PL.plx],
    ef = [];
  if (p[4]) ef.push(T40("crítica", "critics") + " " + (p[4] > 0 ? "+" : "") + p[4]);
  if (p[5]) ef.push(T40("público", "audience") + " " + (p[5] > 0 ? "+" : "") + p[5]);
  if (p[6] != 1) ef.push(T40("ventas del estreno", "premiere sales") + " " + (p[6] > 1 ? "+" : "−") + Math.round(Math.abs(p[6] - 1) * 100) + " %");
  return `<div class="c sub plx"><h3 style="margin:0 0 4px">${T40("Plan de salida", "Release path")}</h3><div class="m">${T40("Elige en qué orden llega tu obra a cada ventana: puede empezar por streaming, por la gira o por el disco, no solo por el estreno de siempre.", "Choose the order in which your work reaches each window: it can start on streaming, on tour or on disc, not only with the usual premiere.")}</div><div class="chips">${L.map(([q, i]) => chx("plx", i, esc(LL(q)), PL.plx == i)).join("")}${chx("plx", -1, ic("ajustes") + " " + T40("A medida", "Custom"), PL.plx == -1)}</div>${PL.plx == -1 ? plxCusH(P) : ""}<div class="m"><b>${esc(plxRuta(p))}</b></div><div class="m">${esc(LL([p[10], p[11]]))}${ef.length ? " · " + ef.join(" · ") : ""}</div></div>`;
}
function plxCusH(P) {
  const L = PL.cus,
    disp = (VXM[P.m] || []).filter((k) => VX[k][3](yr()) > 0 && !L.some((w) => w[0] == k));
  return `<div class="m">${T40("Elige las ventanas en el orden que quieras y cuándo abre cada una. Abrir muchas al mismo tiempo le quita ventas al estreno.", "Pick the windows in any order and when each opens. Opening many at once takes sales from the premiere.")}</div>${L.map(
    (w, i) =>
      `<div class="fila"><span>${i + 1}. ${esc(LL(VX[w[0]]))}</span><span class="bts"><select onchange="plxCusE(${i},+this.value)" aria-label="${T40("Cuándo abre", "When it opens")}">${VXESP.map((e) => `<option value="${e}"${w[1] == e ? " selected" : ""}>${e ? "+" + e + " " + T40("sem", "wk") : T40("al estrenar", "at release")}</option>`).join("")}</select>${bt("plxq", i, ic("cerrar"))}</span></div>`,
  ).join("")}<div class="chips">${disp.map((k) => chx("plxa", k, ic("mas") + " " + esc(LL(VX[k])), false)).join("")}</div>`;
}
function plxCusE(i, e) {
  if (PL.cus && PL.cus[i]) PL.cus[i][1] = e;
  if (typeof pu == "function") pu();
}
ACT["plxa"] = (v) => {
  PL.cus = PL.cus || [];
  if (!PL.cus.some((w) => w[0] == v)) PL.cus.push([v, PL.cus.length ? Math.min(52, PL.cus[PL.cus.length - 1][1] + 8) : 0, 26]);
  return pl();
};
ACT["plxq"] = (v) => {
  (PL.cus || []).splice(+v, 1);
  return pl();
};
const plPX = pl;
pl = function () {
  const r = plPX.apply(this, arguments),
    P = pj(PL.id),
    s = $("#p-s");
  if (P && s && !document.querySelector("#md .plx")) s.insertAdjacentHTML("beforebegin", plxH(P));
  return r;
};
ACT["plx"] = (v) => {
  const P = pj(PL.id);
  if (!P) return;
  PL.plx = +v;
  const p = PL.plx == -1 ? null : PLX[P.m][PL.plx];
  if (p && p[3] != null) PL.rf = p[3];
  if (P.m == 0 && p) PL.fz = p[3] == 2 ? [0, 0, 1] : p[3] == 1 ? [0, 1, 0] : PL.fz && PL.fz[0] ? PL.fz : [1, 1, 1];
  return pl();
};
const rlPX = ACT["rl"];
ACT["rl"] = () => {
  const P = pj(PL.id),
    p = P && PL.plx != -1 ? PLX[P.m] && PLX[P.m][PL.plx | 0] : null;
  if (P && p && p[3] != null) PL.rf = p[3];
  if (P && P.m == 0 && p && p[3] != null) PL.fz = p[3] == 2 ? [0, 0, 1] : p[3] == 1 ? [0, 1, 0] : PL.fz;
  const st0 = P ? P.st : null,
    r = rlPX();
  if (P && P.st != st0) {
    P.plx = PL.plx | 0;
    if (P.plx == -1) P.plxC = (PL.cus || []).map((w) => w.slice());
    if (P.m == 0 && P.plx == 3 && P.fz) P.fz = [P.fz[0], 0];
  }
  return r;
};
V37.mods.push((P, add) => {
  const p = plxDe(P);
  if (p && (p[4] || p[5])) add(p[4], p[5], L37("su plan de salida", "its release path"));
});
V37.ventas.push((P) => {
  const p = plxDe(P);
  return p ? p[6] : 1;
});
// Ventanas del plan: se abren al estrenar o al salir de cartelera y pagan semana a semana
function plxAbre(P, L, base, t0) {
  const y = yr();
  P.vx = P.vx || [];
  L.forEach(([k, esp, w, f]) => {
    const tot = Math.round(base * VX[k][3](y) * f);
    if (tot > 0) P.vx.push({ k, t0: t0 + esp, w, tot, g: 0 });
  });
}
on("semana", () => {
  if (!S || S.pre) return;
  S.pj.forEach((P) => {
    const p = plxDe(P);
    if (!p || P.rr || P.sold) return;
    const base = Math.max(P.gross || 0, (P.cost || P.paid || 0) * 0.8);
    if (P.st >= 3 && !P.vxI) {
      P.vxI = 1;
      plxAbre(P, p[7], base, P.rt || S.t);
    }
    if (P.st == 4 && !P.vxF) {
      P.vxF = 1;
      plxAbre(P, p[8], Math.max(P.gross || 0, base), S.t);
    }
    (P.vx || []).forEach((v) => {
      if (S.t < v.t0 || S.t >= v.t0 + v.w || v.g >= v.tot) return;
      const k = S.t - v.t0,
        f = (2 * (v.w - k)) / (v.w * (v.w + 1)),
        g = Math.min(v.tot - v.g, v.tot * f),
        pz = v.k == "fis" || v.k == "col" ? 1 - pirF(P.m) : 1;
      v.g = Math.round(v.g + g);
      gana(VX[v.k][2], g * 0.6 * pz);
      P.vg = (P.vg || 0) + g * 0.6 * pz;
    });
  });
});
V37.ficha.push((P) => {
  const p = plxDe(P);
  if (!p) return "";
  return `<div class="c sub"><b>${T40("Plan de salida", "Release path")}: ${esc(LL(p))}</b><div class="m">${esc(plxRuta(p))}</div>${(P.vx || [])
    .map((v) => `<div class="fila"><span>${esc(LL(VX[v.k]))}<span class="m"> · ${S.t < v.t0 ? T40("abre en", "opens in") + " " + (v.t0 - S.t) + " " + T40("sem", "wk") : S.t >= v.t0 + v.w ? T40("terminada", "finished") : T40("en curso", "running")}</span></span><b>${fm(v.g)}</b></div>`)
    .join("")}</div>`;
});
E40L(PLX.flat().map((p) => [p[0], p[1]]).concat(PLX.flat().map((p) => [p[10], p[11]]), Object.values(VX).map((v) => [v[0], v[1]])));
