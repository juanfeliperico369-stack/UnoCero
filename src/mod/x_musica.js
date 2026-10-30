// ===== Música: la edición sale del tipo de obra, la portada del diseño de portada, DJs y «Solista intérprete» =====
// Intérpretes nuevos (al final para no cambiar los guardados): el DJ y el solista intérprete que se contrata en Equipo
MFG[4]
  .find((g) => g[0] == "art")[2]
  .push(["DJ", 1970, 0, 0.95, 0, 1, 1.04, "Mezcla y produce: fuerte en la electrónica y las fiestas"], ["Solista intérprete", 1600, 0, 1, 0, 0, 1, "Lo canta el intérprete que contratas en Equipo"]);
ART41.push(["DJ", "DJ"], ["Solista intérprete", "Solo performer (crew)"]);
ARTN41.push([1, 2], [1, 1]);
// Edición que admite cada tipo de obra musical (índices de la opción «Edición»)
const EDMT = {
  Singles: [1, 0],
  Jingles: [10],
  "Partitura o concierto": [7, 8],
  Mixtape: [9],
  EP: [2],
  "Álbum en vivo": [5],
  "Concierto virtual": [5],
};
function edmTipo(W2) {
  const t = (TY[4][0] || [])[(W2.ty || [])[0]],
    y = yr(),
    L = EDMT[t] || [3, 4, 6, 0];
  const ok = L.filter((i) => mfOk(4, "edm", i, y));
  // Cuando la época ya no tiene ese formato (las partituras de antes), se graba en vivo o en estudio
  return ok.length ? ok : [5, 3].filter((i) => mfOk(4, "edm", i, y));
}
// Si el tipo cambia, la edición se acomoda sola; la portada de las opciones sale del diseño de portada
function edmFix(W2) {
  if (!W2 || W2.m != 4) return;
  W2.mf = W2.mf || {};
  const L = edmTipo(W2);
  if (L.length && !L.includes(W2.mf.edm | 0)) {
    W2.mf.edm = L[0];
    W2.du = [10, 6, 22, 45, 90, 50, 45][L[0]] || W2.du;
    W2.ln = duLn(4, W2.du);
    if (W2.mx) mxMusica(W2);
  }
  const o = W2.cv40;
  // Sin diseño: foto del artista; sin imagen: solo letras; ciudad o castillo: paisaje; formas sin objeto: arte abstracto; lo demás: ilustración
  W2.mf.por = !o ? 0 : !o.i ? 2 : [11, 15].includes(o.i) ? 4 : (o.c | 0) >= 2 && o.i == 0 ? 3 : 1;
}
const mxTabEd = mxTab;
mxTab = function () {
  try {
    edmFix(W);
  } catch (e) {
    console.error("edmFix", e);
  }
  return mxTabEd.apply(this, arguments);
};
const mxEdmHEd = mxEdmH;
mxEdmH = function () {
  return edmTipo(W).length < 2 ? "" : mxEdmHEd.apply(this, arguments).replace(/<button[^>]*data-v="edm\|(\d+)"[^>]*>[\s\S]*?<\/button>/g, (b, i) => (edmTipo(W).includes(+i) ? b : ""));
};
V37.prod.push((P, W2) => {
  if (W2.m == 4 && P.mf) {
    edmFix(W2);
    P.mf.por = W2.mf.por;
  }
});
// Cambiar el tipo de intérprete suelta al artista firmado que no es de ese tipo
const wmfArt = ACT["wmf"];
ACT["wmf"] = (v) => {
  const [k, i] = String(v).split("|");
  if (W && W.m == 4 && k == "art" && W.bnd41 != null) {
    const b = bndDe41(W.bnd41);
    if (!b || bndA41(b) != +i) W.bnd41 = null;
  }
  return wmfArt(v);
};
// Equipo de apoyo de producción y de posproducción (además del equipo base del presupuesto), hasta 200 cada uno
const prodHAp = prodH;
prodH = function () {
  const h = prodHAp.apply(this, arguments);
  return (
    h +
    `<div class="c sub fx-blk">${wRng("ap1", 0, 200, W.ap1 | 0, T40("Equipo de apoyo de producción", "Production support crew"))}${wRng("ap2", 0, 200, W.ap2 | 0, T40("Equipo de apoyo de posproducción", "Post-production support crew"))}<div class="m" translate="no">${tx4(
      "Gente que se suma al equipo base: asistentes, técnicos y auxiliares. En producción acortan el rodaje o la grabación y bajan los imprevistos; en posproducción acortan el montaje y pulen el resultado. Cada persona cuesta.",
      "People added to the core crew: assistants, technicians and helpers. In production they shorten the shoot or recording and reduce mishaps; in post-production they shorten editing and polish the result. Each person costs.",
      "Des renforts pour l'équipe de base : assistants, techniciens et auxiliaires. En production, ils raccourcissent le tournage ou l'enregistrement et réduisent les imprévus ; en postproduction, ils raccourcissent le montage et peaufinent le résultat. Chaque personne coûte.",
      "Gente que se soma à equipe base: assistentes, técnicos e auxiliares. Na produção encurtam a filmagem ou a gravação e reduzem imprevistos; na pós-produção encurtam a montagem e dão acabamento. Cada pessoa custa.",
    )}</div></div>`
  );
};
V37.costo.push((W2) => 1 + (W2.ap1 | 0) * 0.0005 + (W2.ap2 | 0) * 0.0004);
V37.sem.push((W2) => -(Math.min(3, Math.floor((W2.ap1 | 0) / 60)) + Math.min(3, Math.floor((W2.ap2 | 0) / 60))));
V37.prod.push((P, W2) => {
  if (W2.ap1 || W2.ap2) Object.assign(P, { ap1: W2.ap1 | 0, ap2: W2.ap2 | 0 });
});
V37.mods.push((P, add) => {
  if (P.ap1) add(Math.round(Math.min(1, P.ap1 / 150) * 10) / 10, 0, tx4("un rodaje bien atendido", "a well-staffed production", "une production bien entourée", "uma produção bem atendida"));
  if (P.ap2) add(Math.round(Math.min(1.5, P.ap2 / 120) * 10) / 10, Math.round(Math.min(0.5, P.ap2 / 300) * 10) / 10, tx4("una posproducción cuidada", "a careful post-production", "une postproduction soignée", "uma pós-produção cuidadosa"));
});
E40L([
  ["Músicos de apoyo", "Backing musicians"],
  ["Tercero", "Tertiary"],
  ["Equipo de apoyo de producción", "Production support crew"],
  ["Equipo de apoyo de posproducción", "Post-production support crew"],
  ["Lo canta el solista intérprete que contratas en Equipo.", "Sung by the solo performer you hire in Crew."],
  ["ninguno: lo canta el intérprete del Equipo", "none: the Crew performer sings"],
  ["Solista intérprete", "Solo performer (crew)"],
  ["Lo canta el intérprete que contratas en Equipo", "Sung by the performer you hire in Crew"],
  ["Mezcla y produce: fuerte en la electrónica y las fiestas", "Mixes and produces: strong in electronic music and parties"],
  ["Público objetivo y audiencia focal", "Target and focal audience"],
  ["Elegir público", "Choose audience"],
  ["Elige hasta 5 en conjunto entre edades, aficionados, culturas, sexo e identidad, y alcance. Rinde más con ese público y un poco menos con el resto.", "Pick up to 5 in total among ages, fans, cultures, sex and identity, and reach. It earns more with that audience and a little less with the rest."],
  ["Quién es en la canción", "Who they are in the song"],
  [
    "Con nombre y actor: todos los protagonistas, secundarios, terceros, invitados especiales y cameos que quieras. Los extras y el elenco de apoyo son solo números. El primer protagonista lo interpreta el intérprete del equipo.",
    "With name and actor: as many leads, supporting characters, tertiary characters, special guests and cameos as you want. Extras and the supporting cast are just numbers. The team's performer plays the first lead.",
  ],
]);
(() => {
  if (typeof DIC_FR == "undefined") return;
  [
    ["Músicos de apoyo", "Musiciens d'accompagnement", "Músicos de apoio"],
    ["Tercero", "Tertiaire", "Terciário"],
    ["Equipo de apoyo de producción", "Équipe de renfort de production", "Equipe de apoio de produção"],
    ["Equipo de apoyo de posproducción", "Équipe de renfort de postproduction", "Equipe de apoio de pós-produção"],
    ["Lo canta el solista intérprete que contratas en Equipo.", "Chanté par l'interprète soliste que tu engages dans l'Équipe.", "Cantado pelo intérprete solista que você contrata na Equipe."],
    ["ninguno: lo canta el intérprete del Equipo", "aucun : l'interprète de l'Équipe chante", "nenhum: canta o intérprete da Equipe"],
    ["— ninguno: lo canta el intérprete del Equipo —", "— aucun : l'interprète de l'Équipe chante —", "— nenhum: canta o intérprete da Equipe —"],
    ["Hispano-latinoamericana", "Hispano-latino-américaine", "Hispano-latino-americana"],
    ["Europea", "Européenne", "Europeia"],
    ["Norteamericana", "Nord-américaine", "Norte-americana"],
    ["Africana", "Africaine", "Africana"],
    ["Oriental", "Orientale", "Oriental"],
    ["De Oceanía", "Océanienne", "Da Oceania"],
    ["Artística", "Artistique", "Artística"],
    ["Tecnológica", "Technologique", "Tecnológica"],
    ["Urbana", "Urbaine", "Urbana"],
    ["Agrícola", "Agricole", "Agrícola"],
    ["Nómada", "Nomade", "Nômade"],
    ["Sedentaria", "Sédentaire", "Sedentária"],
    ["Indígena", "Autochtone", "Indígena"],
    ["Religiosa", "Religieuse", "Religiosa"],
    ["Mítica", "Mythique", "Mítica"],
    ["Desconocida", "Inconnue", "Desconhecida"],
    ["Solista intérprete", "Interprète soliste", "Intérprete solista"],
    ["DJ", "DJ", "DJ"],
    ["Lo canta el intérprete que contratas en Equipo", "Chanté par l'interprète que tu engages dans l'Équipe", "Cantado pelo intérprete que você contrata na Equipe"],
    ["Mezcla y produce: fuerte en la electrónica y las fiestas", "Il mixe et produit : fort en électro et en fêtes", "Mixa e produz: forte na música eletrônica e nas festas"],
    ["Todavía no tienes solistas, bandas, dúos, grupos vocales, orquestas ni DJs firmados: fírmalos en Obras → Música. Mientras, lo canta el intérprete del Equipo.", "Tu n'as encore ni soliste, ni groupe, ni duo, ni groupe vocal, ni orchestre, ni DJ sous contrat : signe-les dans Œuvres → Musique. En attendant, l'interprète de l'Équipe chante.", "Você ainda não tem solistas, bandas, duplas, grupos vocais, orquestras nem DJs contratados: contrate-os em Obras → Música. Enquanto isso, canta o intérprete da Equipe."],
    ["Público objetivo y audiencia focal", "Public cible et audience focale", "Público-alvo e audiência focal"],
    ["Elegir público", "Choisir le public", "Escolher público"],
    ["Elige hasta 5 en conjunto entre edades, aficionados, culturas, sexo e identidad, y alcance. Rinde más con ese público y un poco menos con el resto.", "Choisis jusqu'à 5 au total parmi les âges, les passionnés, les cultures, le sexe et l'identité, et la portée. L'œuvre rend plus avec ce public et un peu moins avec le reste.", "Escolha até 5 no total entre idades, fãs, culturas, sexo e identidade, e alcance. Rende mais com esse público e um pouco menos com o resto."],
    [
      "Con nombre y actor: todos los protagonistas, secundarios, terceros, invitados especiales y cameos que quieras. Los extras y el elenco de apoyo son solo números. El primer protagonista lo interpreta el intérprete del equipo.",
      "Avec nom et acteur : autant de protagonistes, de seconds rôles, de rôles tertiaires, d'invités spéciaux et de caméos que tu veux. Les figurants et la distribution d'appui ne sont que des nombres. Le premier protagoniste est joué par l'interprète de l'équipe.",
      "Com nome e ator: quantos protagonistas, coadjuvantes, terciários, convidados especiais e participações especiais você quiser. Os figurantes e o elenco de apoio são só números. O primeiro protagonista é interpretado pelo intérprete da equipe.",
    ],
  ].forEach(([e, f, p]) => {
    DIC_FR[e] = f;
    DIC_PT[e] = p;
  });
})();
