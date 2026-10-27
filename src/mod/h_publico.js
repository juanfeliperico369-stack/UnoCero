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
function pubFH() {
  if (!W) return "";
  W.pob = W.pob || {};
  const f = W.pob.f == null ? -1 : W.pob.f,
    c = W.pob.c == null ? -1 : W.pob.c;
  return `<div class="c sub fx-blk"><b>${T40("Audiencia focal", "Focal audience")}</b><div class="m">${T40("Afinar a quién le hablas: rinde más con ese público y un poco menos con el resto.", "Narrow who you speak to: it earns more with that audience and a little less with the rest.")}</div><label class="m">${T40("Afición", "Fandom")}</label><div class="chips">${chx("pobf", -1, T40("Ninguna", "None"), f < 0)}${AFI.map((a, i) => chx("pobf", i, LL(a), f == i)).join("")}</div><label class="m">${T40("Cultura", "Culture")}</label><button class="b sel-b" data-a="pobc">${c >= 0 ? `<b>${esc(LL(CULT[c]))}</b>` : T40("Ninguna", "None")}</button><div class="chips">${chx("pobl", W.pob.l ? 0 : 1, T40("Comunidad LGBTQ+", "LGBTQ+ community"), !!W.pob.l)}</div></div>`;
}
const mxTabPF = mxTab;
mxTab = function () {
  return mxTabPF.apply(this, arguments) + pubFH();
};
ACT["pobf"] = (v) => {
  W.pob = W.pob || {};
  W.pob.f = +v;
  return wz();
};
ACT["pobl"] = (v) => {
  W.pob = W.pob || {};
  W.pob.l = +v;
  return wz();
};
ACT["pobc"] = () =>
  fxPick({
    t: T40("Cultura focal", "Focal culture"),
    items: [{ v: -1, l: T40("Ninguna", "None") }].concat(CULT.map((c, i) => ({ v: i, l: LL(c) }))),
    orden: false,
    sel: [String(W.pob && W.pob.c != null ? W.pob.c : -1)],
    ok: (s) => {
      W.pob = W.pob || {};
      W.pob.c = +s[0];
      wz();
    },
  });
V37.prod.push((P, W2) => {
  if (W2.pob) P.pob = Object.assign({}, P.pob || {}, { f: W2.pob.f, c: W2.pob.c, l: W2.pob.l });
});
V37.ventas.push((P) => {
  const o = P.pob || {};
  let k = 1;
  if (o.f >= 0 && AFI[o.f]) k *= AFI[o.f][2] == P.m ? 1.05 : 0.97;
  if (o.c >= 0 && CULT[o.c]) k *= 0.97;
  if (o.l) k *= (P.y || yr()) < 1975 ? 0.94 : (P.y || yr()) < 2000 ? 0.99 : 1.02;
  return k;
});
V37.mods.push((P, add) => {
  const o = P.pob || {},
    gn = (P.gn || []).join(" ");
  if (o.f >= 0 && AFI[o.f] && AFI[o.f][2] == P.m) add(1, 1, L37(`le habla a los ${AFI[o.f][0].toLowerCase()}`, `speaks to ${AFI[o.f][1].toLowerCase()}`));
  if (o.c >= 0 && CULT[o.c]) CULT[o.c][2].test(gn) ? add(1, 1.5, L37("conecta con su cultura focal", "connects with its focal culture")) : add(-0.5, 0, L37("la cultura focal no le va a sus géneros", "the focal culture doesn't fit its genres"));
  if (o.l && (P.y || yr()) >= 1990) add(0.5, 0.5, L37("representación LGBTQ+", "LGBTQ+ representation"));
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
