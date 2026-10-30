// ===== Audiencia focal del documento: aficionados por medio, culturas, LGBTQ+ y tonos que faltaban =====
const AFI = [
  ["Cinéfilos", "Film buffs", 0],
  ["Seriéfilos", "TV fans", 1],
  ["Gamers", "Gamers", 2],
  ["Teatrófilos", "Theater lovers", 3],
  ["Melómanos", "Music lovers", 4],
  ["Bibliófilos", "Book lovers", 5],
];
const CULT = [
  ["Hispano-latinoamericana", "Hispanic and Latin American", /Hist|Drama|Romance|Telenovela|Realismo/],
  ["Europea", "European", /Hist|Drama|Autor|Romance/],
  ["Norteamericana", "North American", /Acci|Superh|Comedia|Western|Aventura/],
  ["Africana", "African", /Drama|Folkl|Hist|Musical/],
  ["Oriental", "East Asian", /Acci|Fantas|Anime|Artes marciales|Drama/],
  ["De Oceanía", "Oceanian", /Aventura|Drama|Comedia/],
  ["Artística", "Artistic", /Autor|Experimental|Musical|Surreal/],
  ["Tecnológica", "Tech", /Ciencia|Cyber|Distop/],
  ["Urbana", "Urban", /Crimen|Comedia|Musical|Drama/],
  ["Agrícola", "Rural", /Drama|Familiar|Western/],
  ["Nómada", "Nomadic", /Aventura|Road|Épico/],
  ["Sedentaria", "Settled", /Drama|Familiar|Comedia/],
  ["Indígena", "Indigenous", /Folkl|Mitol|Hist|Drama/],
  ["Religiosa", "Religious", /Religi|Drama|Hist|Épico/],
  ["Mítica", "Mythical", /Mitol|Fantas|Épico/],
  ["Desconocida", "Unknown", /Ciencia|Misterio|Terror|Fantas/],
];
E40L(AFI.map((x) => [x[0], x[1]]).concat(CULT.map((x) => [x[0], x[1]]), [["Audiencia focal", "Focal audience"], ["Afición", "Fandom"], ["Cultura", "Culture"], ["Ninguna", "None"], ["Comunidad LGBTQ+", "LGBTQ+ community"]]));
// Público objetivo y audiencia focal del documento: hasta 5 en conjunto entre edades, aficionados, culturas, sexo e identidad, y alcance
const POBX = [
  ["xm", "Masculino", "Male", "Masculin", "Masculino"],
  ["xf", "Femenino", "Female", "Féminin", "Feminino"],
  ["xl", "LGBTQ+", "LGBTQ+", "LGBTQ+", "LGBTQ+"],
  ["ag", "Global", "Global", "Mondial", "Global"],
  ["an", "General", "General", "Général", "Geral"],
];
const POBMAX = 5;
// Lista de elecciones; las partidas viejas tenían una edad, un sexo, una afición, una cultura y LGBTQ+ por separado
function pobL(X) {
  const o = (X && X.pob) || {};
  if (Array.isArray(o.L)) return o.L;
  const L = [];
  if (o.e >= 0) L.push("e" + o.e);
  if (o.x == 1) L.push("xf");
  if (o.x == 2) L.push("xm");
  if (o.f >= 0) L.push("f" + o.f);
  if (o.c >= 0) L.push("c" + o.c);
  if (o.l) L.push("xl");
  return L;
}
// Los campos de siempre siguen al día para lo que ya los usaba
function pobSet(L) {
  W.pob = W.pob || {};
  const P = W.pob,
    pr = (k) => L.filter((x) => x[0] == k && x[1] != "f" && /\d/.test(x)).map((x) => +x.slice(1));
  P.L = L.slice(0, POBMAX);
  P.e = pr("e")[0] != null ? pr("e")[0] : -1;
  P.x = L.includes("xf") && !L.includes("xm") ? 1 : L.includes("xm") && !L.includes("xf") ? 2 : 0;
  P.f = pr("f")[0] != null ? pr("f")[0] : -1;
  P.c = pr("c")[0] != null ? pr("c")[0] : -1;
  P.l = L.includes("xl") ? 1 : 0;
}
// Edades del público objetivo (Familiar suma niños, adultos y maduros)
function pobEdades(P) {
  const L = pobL(P),
    E = L.filter((x) => /^e\d$/.test(x)).map((x) => +x.slice(1));
  return L.includes("ef") ? uniq(E.concat([0, 3, 4])) : E;
}
function pobNom(k) {
  const L = espL();
  if (k == "ef") return ["Familiar", "Family", "Familial", "Familiar"][L];
  if (/^e\d$/.test(k)) return bibTr(GRU[+k.slice(1)] || "");
  if (/^f\d$/.test(k)) return L == 1 ? AFI[+k.slice(1)][1] : bibTr(AFI[+k.slice(1)][0]);
  if (/^c\d+$/.test(k)) return (L == 1 ? CULT[+k.slice(1)][1] : bibTr(CULT[+k.slice(1)][0])) || "";
  const x = POBX.find((z) => z[0] == k);
  return x ? x[1 + L] : k;
}
const pobTxt = (X) => pobL(X).map(pobNom).join(", ") || tx4("Todo el público", "Everyone", "Tout le public", "Todo o público");
function pubFH() {
  if (!W) return "";
  const L = pobL(W);
  return `<div class="c sub fx-blk"><div class="k"><b>${T40("Público objetivo y audiencia focal", "Target and focal audience")}</b><span class="m">${L.length}/${POBMAX}</span></div><div class="m">${T40(
    "Elige hasta 5 en conjunto entre edades, aficionados, culturas, sexo e identidad, y alcance. Rinde más con ese público y un poco menos con el resto.",
    "Pick up to 5 in total among ages, fans, cultures, sex and identity, and reach. It earns more with that audience and a little less with the rest.",
  )}</div>${L.length ? `<div class="chips" translate="no">${L.map((k) => `<button class="ch on" data-a="pobx" data-v="${k}">${esc(pobNom(k))} ✕</button>`).join("")}</div>` : `<div class="m">${tx4("Todo el público.", "Everyone.", "Tout le public.", "Todo o público.")}</div>`}<button class="b" data-a="pobp">${ic("talento")} ${T40("Elegir público", "Choose audience")}</button></div>`;
}
const mxTabPF = mxTab;
mxTab = function (rap) {
  return mxTabPF.apply(this, arguments) + (rap ? pubFH() : "");
};
ACT["pobx"] = (v) => {
  pobSet(pobL(W).filter((k) => k != v));
  return wz();
};
ACT["pobp"] = () => {
  const G = [tx4("Edades", "Ages", "Âges", "Idades"), tx4("Aficionados", "Fans", "Passionnés", "Fãs"), tx4("Culturas", "Cultures", "Cultures", "Culturas"), tx4("Sexo e identidad", "Sex and identity", "Sexe et identité", "Sexo e identidade"), tx4("Alcance", "Reach", "Portée", "Alcance")],
    it = (v, g, n) => ({ v, l: pobNom(v), g: n + " " + G[g], nt: 1 }),
    items = GRU.map((_, i) => it("e" + i, 0, 1))
      .concat([it("ef", 0, 1)], AFI.map((_, i) => it("f" + i, 1, 2)), CULT.map((_, i) => it("c" + i, 2, 3)), ["xm", "xf", "xl"].map((k) => it(k, 3, 4)), ["ag", "an"].map((k) => it(k, 4, 5)))
      .map((x) => Object.assign(x, { g: x.g.replace(/^\d /, "") }));
  return fxPick({
    t: T40("Público objetivo y audiencia focal", "Target and focal audience"),
    d: tx4("Hasta 5 en conjunto.", "Up to 5 in total.", "Jusqu'à 5 au total.", "Até 5 no total."),
    items,
    sel: pobL(W),
    max: POBMAX,
    orden: false,
    ok: (s) => {
      pobSet(s);
      return wz();
    },
  });
};
V37.prod.push((P, W2) => {
  if (W2.pob) P.pob = Object.assign({}, P.pob || {}, W2.pob, { L: pobL(W2).slice() });
});
V37.ventas.push((P) => {
  const L = pobL(P),
    y = P.y || yr();
  let k = 1;
  L.forEach((x) => {
    if (/^f\d$/.test(x)) k *= AFI[+x.slice(1)][2] == P.m ? 1.05 : 0.98;
    if (/^c\d+$/.test(x) && !L.includes("ag")) k *= 0.98;
  });
  if (L.includes("xl")) k *= y < 1975 ? 0.94 : y < 2000 ? 0.99 : 1.02;
  if (L.includes("ag")) k *= y >= 1990 ? 1.04 : 1;
  return k;
});
V37.mods.push((P, add) => {
  const L = pobL(P),
    gn = (P.gn || []).join(" "),
    y = P.y || yr();
  const fa = L.filter((x) => /^f\d$/.test(x) && AFI[+x.slice(1)][2] == P.m);
  if (fa.length) add(1, 1, L37(`le habla a los ${AFI[+fa[0].slice(1)][0].toLowerCase()}`, `speaks to ${AFI[+fa[0].slice(1)][1].toLowerCase()}`));
  let ok = 0,
    mal = 0;
  L.filter((x) => /^c\d+$/.test(x)).forEach((x) => (CULT[+x.slice(1)][2].test(gn) ? ok++ : mal++));
  if (ok) add(Math.min(2, ok), Math.min(2.5, ok * 1.5), L37("conecta con su cultura focal", "connects with its focal culture"));
  if (mal) add(-Math.min(1.5, mal * 0.5), 0, L37("la cultura focal no le va a sus géneros", "the focal culture doesn't fit its genres"));
  if (L.includes("xl") && y >= 1990) add(0.5, 0.5, L37("representación LGBTQ+", "LGBTQ+ representation"));
  if ((L.includes("xf") && /Romance|Drama|Musical/.test(gn)) || (L.includes("xm") && /Acci|Bélico|Deport|Western/.test(gn))) add(0, 0.5, tx4("sabe a quién le habla", "knows who it speaks to", "sait à qui il parle", "sabe com quem fala"));
  if (L.includes("ag") && y >= 1990) add(0, 0.5, tx4("pensada para el mundo", "made for the world", "pensée pour le monde", "pensada para o mundo"));
});
// Tonos del documento que faltaban
[
  ["Deprimente", 2, -3, "Depressing"],
  ["Melancólico", 2, -1, "Melancholic"],
  ["Luminoso", 0, 2, "Luminous"],
  ["Entretenido", -1, 3, "Entertaining"],
].forEach((t) => {
  if (TO.some((x) => x[0] == t[0])) return;
  TO.push([t[0], t[1], t[2]]);
  E40L([[t[0], t[3]]]);
});
// Oktoberfest del calendario del documento
if (!FESTV.some((x) => x[0] == "Oktoberfest")) FESTV.push(["Oktoberfest", [9, 20, 16], RG.eu, "Comedia,Fantasía,Deportes", 3, 1810]);
// Arquetipos y sexo de los personajes: el reparto de papeles también pesa
const ARQCOMP = ["Antihéroe", "Antivillano", "Sombra", "Redimido", "Traidor", "Doble", "Bufón trágico", "Mártir"];
V37.mods.push((P, add) => {
  const C = (P.cast || []).filter((c) => c && c.i != 2);
  if (C.length < 2) return;
  const A = C.map((c) => ARQ[c.a] || "Normal"),
    dif = new Set(A).size / C.length,
    gn = (P.gn || []).join(" ");
  if (dif >= 0.75 && C.length >= 3) add(1, 0.5, L37("personajes con papeles bien distintos", "characters with clearly distinct roles"));
  else if (dif < 0.45) add(-1, -0.5, L37("personajes repetidos: todos cumplen el mismo papel", "repetitive characters: they all play the same role"));
  const cx = A.filter((a) => ARQCOMP.includes(a)).length;
  if (cx) add(Math.min(2, cx * 0.8), /Familiar|Infantil/.test(gn) ? -0.5 : 0, L37("personajes moralmente complejos", "morally complex characters"));
  if (/Acci|Aventura|Superh|Fantas|Épico/.test(gn) && !A.some((a) => /^(Villano|Antivillano|Tirano|Monstruo|Sombra)$/.test(a))) add(-0.5, -1, L37("le falta un antagonista a la altura", "it lacks a worthy antagonist"));
  if (/Romance/.test(gn) && !A.some((a) => /^(Amante|Seductor)$/.test(a))) add(0, -0.5, L37("romance sin un personaje enamorado", "romance with no one in love"));
  const sx = new Set(C.map((c) => c.x).filter(Boolean));
  if (sx.size >= 2) add(0, 0.5, L37("reparto de distintos sexos", "mixed-gender cast"));
});
