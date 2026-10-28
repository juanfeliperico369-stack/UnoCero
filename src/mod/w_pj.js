// ===== Personajes: nacen con los datos de la obra, dados de nombre directos por continente y sin intérprete en libros =====
const ARQI = (n) => Math.max(0, ARQ.indexOf(n));
const PJGEN = [
  [/Infantil|Familiar/, [8, 13], [25, 60]],
  [/Adolescentes|Juvenil/, [14, 18], [16, 45]],
  [/Romance|Erótico/, [21, 36], [20, 55]],
  [/Acción|Bélico|Western|Superhéroes|Aventura|Policial|Espionaje/, [24, 45], [20, 60]],
  [/Biográfico|Histórico|Drama|Político/, [28, 60], [20, 70]],
];
// Continente de los nombres: el elegido en la pestaña o el del lugar donde pasa la historia
function pjCtDe(W2) {
  if (W2.pjct != null) return W2.pjct;
  if (W2.lug >= 0 && CY[W2.lug]) return [0, 1, 2, 3, 4, 5][CY[W2.lug][1]] || 0;
  return null;
}
function pjNom(sx, W2, yo) {
  const ct = W2.pjct;
  if (ct == null) return nomUnico(sx, W2, yo);
  const us = new Set();
  (W2.cast || []).forEach((c) => c !== yo && String(c.n || "").split(" ").forEach((p) => us.add(p)));
  const L = nomCt(ct, sx);
  return L.find((n) => !n.split(" ").some((p) => us.has(p))) || L[0] || nomUnico(sx, W2, yo);
}
pjNuevo = function (i, W2) {
  const cast = W2.cast || [],
    g = (W2.gn || []).join(" "),
    pr = cast.find((c) => c.i == 0),
    nf = cast.filter((c) => c.x == "F").length,
    nm = cast.filter((c) => c.x == "M").length,
    sx = nf == nm ? (R() < 0.5 ? "F" : "M") : R() < 0.75 ? (nf < nm ? "F" : "M") : nf < nm ? "M" : "F",
    G = PJGEN.find((x) => x[0].test(g)),
    ad = adulto(W2),
    tieneA = (n) => cast.some((c) => c.a == ARQI(n));
  let a, e, mot = 0, rel = 0;
  if (i == 0) {
    a = ARQI((W2.tone == 1 || /Noir|Crimen|Thriller/.test(g)) && R() < 0.6 ? "Antihéroe" : /Aventura|Ciencia ficción|Fantasía/.test(g) ? pk(["Héroe", "Explorador", "Elegido"]) : /Romance/.test(g) ? "Amante" : /Comedia/.test(g) ? pk(["Normal", "Pícaro", "Bufón"]) : pk(["Héroe", "Rebelde", "Inocente", "Normal"]));
    e = G ? ri(G[1][0], G[1][1]) : ri(18, 50);
    const tm = (W2.tm || []).map((x) => (typeof x == "number" ? (DL("tm") || [])[x] : x)).join(" ");
    mot = /Amor|Romance/.test(tm) ? 1 : /Venganza/.test(tm) ? 2 : /Poder|Política/.test(tm) ? 3 : /Libertad|Rebeli/.test(tm) ? 4 : /Justicia|Crimen/.test(tm) ? 5 : /Supervivencia|Guerra/.test(tm) ? 6 : /Fama|Música|Arte/.test(tm) ? 7 : /Verdad|Misterio/.test(tm) ? 8 : pk([4, 5, 9, 11]);
  } else if (i == 1) {
    const falta = ["Villano", "Mentor", "Aliado", /Romance/.test(g) ? "Amante" : "Sombra", /Comedia/.test(g) ? "Bufón" : "Embaucador", "Guardián"].find((n) => !tieneA(n));
    a = ARQI(falta || pk(["Aliado", "Rival", "Sabio", "Cuidador", "Traidor"]));
    const pe = pr ? pr.e : 30,
      nA = ARQ[a];
    e = nA == "Mentor" || nA == "Sabio" ? Math.min(85, pe + ri(15, 30)) : nA == "Villano" || nA == "Sombra" ? ri(28, 62) : Math.max(G ? G[2][0] : 16, Math.min(G ? G[2][1] : 70, pe + ri(-8, 8)));
    mot = nA == "Villano" ? pk([3, 2, 10]) : nA == "Mentor" ? 9 : nA == "Aliado" ? 11 : nA == "Amante" ? 1 : pk([0, 7, 10]);
    rel = nA == "Villano" ? 6 : nA == "Sombra" ? 4 : nA == "Mentor" ? 5 : nA == "Aliado" ? 3 : nA == "Amante" ? (R() < 0.5 ? 2 : 7) : nA == "Traidor" ? 8 : 0;
  } else {
    a = i == 2 ? ARQI("Normal") : ri(0, ARQ.length - 1);
    e = ri(G ? G[2][0] : 16, G ? G[2][1] : 70);
  }
  if (ad) e = Math.max(18, e);
  const c = { n: "", e, x: sx, i, a, t: null, na: 1, mot, rel };
  c.n = pjNom(sx, W2, c);
  return c;
};
// Dados de nombre directos: un toque y sale un nombre del continente elegido
const pjCardW = pjCard;
pjCard = function (c, k, ad) {
  let h = pjCardW.apply(this, arguments);
  if (c.i != 2) h = h.replace(`${bt("wcnom", k, ic("dado") + " " + L37("Nombre", "Name"))}`, `${bt("wcnd", k, ic("dado"), "", L37("Nombre al azar del continente", "Random name from the continent"))}${bt("wcnom", k, L37("Elegir", "Choose"))}`);
  if (W.m == 5) {
    h = h.replace(/<select data-k="cast\.\d+\.t"[\s\S]*?<\/select>/, "").replace(/<select data-k="crew\.7"[\s\S]*?<\/select>/, "");
    h = h.replace(/<div class="k" style="margin-top:4px"><span class="m">(Encaje|Sin int)[\s\S]*?Ver talentos<\/button><\/div>/, `<div class="m">${T40("En un libro los personajes viven en la página: no hay intérprete.", "In a book, characters live on the page: there's no performer.")}</div>`);
  } else if (W.m == 2) h = h.replace(/(<select data-k="(?:crew\.7|cast\.\d+\.t)"[^>]*><option value="">)[^<]*/, `$1— ${T40("sin intérprete: personaje sin voz", "no performer: voiceless character")} —`);
  return h;
};
ACT["wcnd"] = (v) => {
  const c = (W.cast || [])[+v];
  if (!c) return;
  c.n = pjNom(c.x == "M" ? "M" : "F", Object.assign({}, W, { gn: wGn() }), c);
  c.na = 0;
  return wz();
};
ACT["wpct"] = (v) => {
  W.pjct = v === "" ? null : +v;
  return wz();
};
const castHW = castH;
castH = function () {
  const h = castHW.apply(this, arguments);
  if (W.m == 4) return h;
  if (W.m == 5) (W.cast || []).forEach((c) => (c.t = null));
  const ct = pjCtDe(W);
  return `<label class="m">${T40("Continente de los nombres (dados)", "Names' continent (dice)")}</label><div class="chips">${wCh("wpct", "", T40("Según el lugar", "From the setting"), W.pjct == null)}${NOMCT.map((x, i) => wCh("wpct", i, esc(x[0]), W.pjct == i)).join("")}</div><div class="m">${T40("Los personajes nuevos nacen con la época, el lugar y los géneros de la obra: edad, arquetipo, motivación y relación con el protagonista.", "New characters are born with the work's era, setting and genres: age, archetype, motivation and relationship to the lead.")}${ct != null && W.pjct == null ? " " + L37("Nombres de: ", "Names from: ") + esc(NOMCT[ct][0]) + "." : ""}</div>` + (W.m == 5 ? h.replace(/El primer protagonista lo interpreta el intérprete del equipo\./, "") : h);
};
// En los libros no hay intérprete que pagar ni que recomendar
V37.prod.push((P, W2) => {
  if (W2.m == 5) (P.cast || []).forEach((c) => (c.t = null));
});
E40L([
  ["Nombre al azar del continente", "Random name from the continent"],
  ["Continente de los nombres (dados)", "Names' continent (dice)"],
  ["Según el lugar", "From the setting"],
]);
