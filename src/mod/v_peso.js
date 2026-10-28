// ===== Peso real de las decisiones: efecto de cada tipo de obra de siempre y un género principal que lidera =====
// [costo ×, crítica, público, semanas, ventas ×] para los tipos que venían sin efecto propio
const TYB0 = {
  0: {
    "Live action": [1, 0, 0, 0, 1],
    Animación: [1.15, 1, 3, 8, 1.1],
    Documental: [0.4, 3, -6, -2, 0.45],
    "Historia jugable": [1.1, 1, 1, 2, 0.9],
    Cortometraje: [0.15, 2, -8, -6, 0.12],
    "Falso documental": [0.6, 2, -1, -1, 0.7],
    "Película antológica": [0.9, 1, -2, 0, 0.85],
    "Cine experimental": [0.5, 4, -8, 0, 0.35],
    "Película de concierto": [0.5, 0, 2, -3, 0.6],
    "Stop-motion": [1.2, 3, 1, 12, 0.95],
    "Cine de anticipación": [1.05, 1, 1, 0, 1],
  },
  1: {
    Serie: [1, 0, 0, 0, 1],
    Telenovela: [0.7, -2, 4, 0, 1.1],
    Show: [0.6, -1, 2, -2, 0.9],
    "Programa de animación": [1.1, 1, 2, 4, 1],
    Concurso: [0.4, -3, 3, -3, 0.8],
    "Programa de noticias": [0.35, 1, -2, -4, 0.6],
    Documental: [0.5, 3, -4, -1, 0.6],
    Miniserie: [1.2, 3, 1, 0, 0.95],
    Reality: [0.45, -4, 4, -3, 0.9],
    "Talk show": [0.4, -1, 1, -4, 0.7],
    Telefilme: [0.6, -1, 0, -2, 0.7],
    "Programa infantil": [0.6, 0, 2, -1, 0.9],
    Sitcom: [0.7, 0, 3, -1, 1.05],
    Docuserie: [0.6, 3, -2, 0, 0.75],
    "Programa deportivo": [0.6, -1, 2, -3, 0.9],
    "Serie de anticipación": [1.1, 1, 1, 0, 1],
  },
  2: {
    Acción: [1, 0, 2, 0, 1.05],
    Aventura: [1, 1, 1, 0, 1],
    Shooter: [1.1, -1, 3, 0, 1.15],
    RPG: [1.2, 2, 2, 6, 1.1],
    Estrategia: [0.9, 2, -1, 0, 0.9],
    Simulación: [0.9, 0, 1, 0, 0.95],
    Deportes: [0.9, -1, 3, -2, 1.1],
    Lucha: [0.85, 0, 2, -2, 0.95],
    "Película interactiva": [1.1, 1, 0, 2, 0.85],
    Literatura: [0.4, 2, -4, -2, 0.4],
    Conducción: [1, 0, 2, 0, 1],
    "Mundo abierto": [1.45, 2, 4, 10, 1.2],
    Sandbox: [0.9, 1, 2, 0, 1.05],
    Educativo: [0.5, 1, -3, -2, 0.6],
    "Serio o documental": [0.5, 3, -4, -1, 0.5],
    Puzle: [0.4, 1, 1, -4, 0.8],
    Plataformas: [0.7, 1, 2, -2, 0.95],
    "Terror de supervivencia": [0.9, 2, 1, 0, 0.95],
    "Ritmo y música": [0.7, 0, 2, -2, 0.9],
    "Novela visual": [0.4, 1, -2, -3, 0.55],
    Roguelike: [0.5, 2, 0, -2, 0.8],
    "Battle royale": [1.2, -2, 4, 2, 1.2],
    "Multijugador masivo (MMO)": [1.6, 0, 3, 12, 1.15],
    "Realidad virtual": [1.2, 2, -3, 2, 0.7],
  },
  3: {
    Dramática: [1, 1, 0, 0, 1],
    Comedia: [0.9, -1, 3, 0, 1.05],
    Musical: [1.5, 1, 4, 4, 1.2],
    Expositiva: [0.6, 1, -3, -1, 0.6],
    Monólogo: [0.3, 2, -3, -3, 0.4],
    Tragedia: [1, 3, -2, 0, 0.9],
    Ópera: [1.7, 3, -3, 4, 0.9],
    "Stand up": [0.25, -1, 2, -4, 0.5],
    Zarzuela: [1.2, 1, 1, 2, 0.9],
    Ballet: [1.4, 3, -2, 4, 0.85],
    Cabaret: [0.7, 0, 2, -1, 0.9],
    Vodevil: [0.8, -2, 3, 0, 0.95],
    "Teatro de títeres": [0.5, 1, 1, -1, 0.7],
    "Teatro inmersivo": [1.2, 3, 1, 2, 0.85],
    Circo: [1.3, 0, 4, 2, 1.1],
    Improvisación: [0.3, 0, 1, -4, 0.5],
  },
  4: {
    "Banda sonora": [0.8, 2, -1, 0, 0.8],
    "Álbum musical": [1, 0, 0, 0, 1],
    Singles: [0.35, -1, 2, -4, 0.5],
    Jingles: [0.15, -3, 0, -5, 0.2],
    "Partitura o concierto": [0.9, 3, -3, 1, 0.6],
    Mixtape: [0.4, 1, 1, -3, 0.5],
    EP: [0.5, 0, 1, -2, 0.55],
    "Álbum en vivo": [0.7, 0, 1, -2, 0.8],
    "Álbum conceptual": [1.15, 3, -1, 2, 0.95],
    "Recopilatorio de éxitos": [0.3, -2, 3, -4, 0.9],
    Remezclas: [0.4, -2, 2, -3, 0.6],
  },
  5: {
    "Libro normal": [1, 0, 0, 0, 1],
    Novela: [1, 1, 1, 0, 1.05],
    "Novela gráfica": [1.3, 2, 1, 4, 0.9],
    Cómic: [0.8, 0, 3, 1, 1],
    Manga: [0.8, 0, 3, 1, 1.05],
    Historieta: [0.6, -1, 2, 0, 0.85],
    Filosofía: [0.6, 4, -5, 0, 0.45],
    Economía: [0.7, 2, -3, 0, 0.6],
    Poético: [0.4, 4, -5, -2, 0.35],
    Ensayo: [0.6, 3, -3, 0, 0.55],
    "Biografía y memorias": [0.9, 1, 2, 0, 1],
    "Crónica y periodismo": [0.7, 2, 0, -1, 0.8],
    "Libro infantil ilustrado": [0.8, 0, 3, 0, 1],
    Cuento: [0.4, 2, -1, -3, 0.5],
    "Antología de cuentos": [0.7, 2, -1, 0, 0.7],
    "Novela ligera": [0.6, -2, 3, -1, 0.95],
    Webtoon: [0.6, -1, 3, 0, 0.9],
    "Divulgación científica": [0.8, 2, 0, 0, 0.8],
    "Libro de cocina": [0.6, -1, 2, 0, 0.9],
    Autoayuda: [0.5, -3, 4, -1, 1.1],
    "Texto dramático (teatro)": [0.4, 2, -4, -2, 0.35],
    "Novela de anticipación": [1, 1, 1, 0, 1],
  },
};
// Los nombres se repiten entre medios (Documental, Comedia…): el efecto se busca por medio
const tyB0 = (X) => {
  const T = TYB0[X.m] || {};
  return tyNom(X)
    .filter((n) => !TYB5[n])
    .map((n) => T[n])
    .filter(Boolean);
};
V37.costo.push((W2) => tyB0(W2).reduce((k, b) => k * b[0], 1));
V37.sem.push((W2) => tyB0(W2).reduce((s, b) => s + b[3], 0));
V37.ventas.push((P) => tyB0(P).reduce((k, b) => k * (b[4] || 1), 1));
V37.mods.push((P, add) => {
  let c = 0,
    a = 0;
  tyB0(P).forEach((b) => {
    c += b[1];
    a += b[2];
  });
  if (c || a) add(c, a, L37("lo que aporta su tipo de obra", "what its type of work brings"));
});
// Resumen visible de lo que aporta cada tipo elegido
function tyEfTxt(b) {
  const L = [];
  if (b[0] != 1) L.push(T40("costo", "cost") + " " + (b[0] > 1 ? "+" : "−") + Math.round(Math.abs(b[0] - 1) * 100) + " %");
  if (b[1]) L.push(T40("crítica", "critics") + " " + (b[1] > 0 ? "+" : "−") + Math.abs(b[1]));
  if (b[2]) L.push(T40("público", "audience") + " " + (b[2] > 0 ? "+" : "−") + Math.abs(b[2]));
  if (b[3]) L.push((b[3] > 0 ? "+" : "−") + Math.abs(b[3]) + " " + T40("sem", "wk"));
  if (b[4] && b[4] != 1) L.push(T40("ventas", "sales") + " " + (b[4] > 1 ? "+" : "−") + Math.round(Math.abs(b[4] - 1) * 100) + " %");
  return L.join(" · ") || T40("sin cambios", "no changes");
}
const tyBDe = (m, n) => TYB5[n] || (TYB0[m] || {})[n];
const tyChipsP = tyChips;
tyChips = function () {
  const h = tyChipsP.apply(this, arguments),
    L = (W.ty || []).map((i) => TY[W.m][0][i]).filter(Boolean),
    ef = L.map((n) => [n, tyBDe(W.m, n)]).filter((x) => x[1]);
  return h + (ef.length ? `<div class="m">${ef.map(([n, b]) => `<b>${esc(n)}</b>: ${esc(tyEfTxt(b))}`).join("<br>")}</div>` : "");
};
// Género principal: el primero elegido lidera (lleva ★ y se puede cambiar)
const gChipsP = gChips;
gChips = function () {
  let h = gChipsP.apply(this, arguments);
  if (!W.g.length) return h;
  const gl = sp(MD[W.m][5]),
    i0 = W.g[0];
  h = h.replace(new RegExp(`(data-a="tg" data-v="${i0}"[^>]*>)`), "$1★ ");
  if (W.g.length > 1)
    h += `<div class="m" style="margin-top:6px">${T40("Género principal (★): marca la obra, pesa el doble en el público y en lo que domina tu equipo", "Main genre (★): it defines the work and weighs double with the audience and your crew's strengths")}</div><div class="chips">${W.g.map((i, k) => wCh("tgm", i, (k ? "" : "★ ") + esc(gl[i]), !k)).join("")}</div>`;
  return h;
};
ACT["tgm"] = (v) => {
  const i = +v;
  if (!W.g.includes(i)) return;
  W.g = [i].concat(W.g.filter((x) => x != i));
  W.dep = null;
  return wz();
};
V37.mods.push((P, add) => {
  const g0 = (P.gn || [])[0];
  if (!g0) return;
  const d = ((S.gd && S.gd[g0]) || 50) - 50;
  if (Math.abs(d) >= 4) add(0, Math.round(d * 0.12 * 10) / 10, d > 0 ? L37(`el público pide ${g0.toLowerCase()}, su género principal`, `audiences want ${g0.toLowerCase()}, its main genre`) : L37(`su género principal (${g0.toLowerCase()}) cansa al público`, `its main genre (${g0.toLowerCase()}) is tiring audiences`));
  const e = ejeG(P.m, g0);
  if (e < 0) return;
  const T = uniq(MD[P.m][1].map((r) => P.crew && P.crew[r]).filter((x) => x != null))
    .map((i) => S.tl[i])
    .filter((t) => t && t.af);
  if (!T.length) return;
  const av = sum(T, (t) => t.af[e] || 55) / T.length - 55;
  if (Math.abs(av) >= 5) add(Math.round(av / 8) / 1, Math.round(av / 12), av > 0 ? L37("el equipo domina su género principal", "the crew masters its main genre") : L37("el equipo no domina su género principal", "the crew isn't at home in its main genre"));
});
// Videojuegos: el compositor también forma parte del equipo; el intérprete (las voces) es opcional
if (!MD[2][1].includes(5)) MD[2][1].splice(MD[2][1].indexOf(7) >= 0 ? MD[2][1].indexOf(7) : MD[2][1].length, 0, 5);
function rolOpc(m, r) {
  return m == 2 && r == 7;
}
V37.mods.push((P, add) => {
  if (P.m == 2 && (P.y || yr()) >= 1995 && !(P.crew && S.tl[P.crew[7]])) add(0, -1, L37("personajes sin voz", "voiceless characters"));
});
// IA en la producción: abarata (hasta 40 %) y acorta la posproducción; el resultado depende del equipo que la guía
V37.sem.push((W2) => -Math.round(((W2.ai || 0) / 100) * 3));
V37.prod.push((P, W2) => {
  const ia = W2.ai || 0;
  if (!ia) return;
  const C = qual(P).ca || 60,
    d = Math.max(-20, Math.min(5, (ia / 100) * ((C - 70) * 0.35 + (R() + R() + R() - 1.5) * 4)));
  P.iaD = Math.round(d * 10) / 10;
  P.iar = d >= 2 ? 0 : d >= -2 ? 1 : d >= -8 ? 2 : 3;
});
const IAR = [
  ["excelente", "excellent"],
  ["bien", "good"],
  ["dudoso", "doubtful"],
  ["completamente mal", "completely wrong"],
];
V37.mods.push((P, add) => {
  if (!P.ai || P.iaD == null) return;
  const C = qual(P).ca || 60;
  add(P.iaD * 0.5, P.ai > 50 && C < 85 ? -(P.ai - 50) / 10 : 0, L37("uso de IA: resultado " + IAR[P.iar][0], "AI use: " + IAR[P.iar][1] + " result"));
});
V37.ficha.push((P) =>
  P && P.ai
    ? `<div class="c sub"><div class="fila"><span>${T40("IA en producción", "AI in production")}</span><b>${P.ai} %${P.iar != null ? " · " + LL(IAR[P.iar]) : ""}</b></div><div class="m">${L37(`Abarató la obra en un ${Math.round(0.4 * P.ai)} % y acortó la posproducción.`, `It made the work ${Math.round(0.4 * P.ai)}% cheaper and shortened post-production.`)}</div></div>`
    : "",
);
E40L(IAR);
