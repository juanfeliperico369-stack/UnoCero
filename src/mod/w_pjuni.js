// ===== Creador de personajes universal: el mismo en los seis medios =====
// Cada personaje tiene su papel (protagonista, secundario, invitado especial o cameo) y se decide si lo interpreta
// alguien (actor, voz, captura o videoclip) o si es virtual (digital, títere, solo en la letra). En los libros todos son de papel.
const PJVIR = [
  [
    ["Lo interpreta un actor", "Played by an actor", "Joué par un acteur", "Interpretado por um ator"],
    ["Digital, sin actor", "Digital, no actor", "Numérique, sans acteur", "Digital, sem ator"],
  ],
  null,
  [
    ["Con intérprete (voz o captura)", "With a performer (voice or capture)", "Avec interprète (voix ou capture)", "Com intérprete (voz ou captura)"],
    ["Virtual, sin voz", "Virtual, voiceless", "Virtuel, sans voix", "Virtual, sem voz"],
  ],
  [
    ["Lo interpreta un actor", "Played by an actor", "Joué par un acteur", "Interpretado por um ator"],
    ["Títere, voz o proyección", "Puppet, voice or projection", "Marionnette, voix ou projection", "Fantoche, voz ou projeção"],
  ],
  [
    ["Lo actúa alguien en el videoclip", "Someone plays it in the music video", "Quelqu'un le joue dans le clip", "Alguém o interpreta no videoclipe"],
    ["Solo vive en la letra", "Lives only in the lyrics", "Vit seulement dans les paroles", "Vive só na letra"],
  ],
];
const PJVOZ = [
  ["Con actor de voz", "With a voice actor", "Avec un comédien de doublage", "Com dublador"],
  ["Sin voz", "Voiceless", "Sans voix", "Sem voz"],
];
// En cine y series animadas, «interpretar» es poner la voz
const pjVirTx = (m) => (m <= 1 && !espMedio(W) ? PJVOZ : (PJVIR[m == 1 ? 0 : m] || PJVIR[0]));
// En música los personajes nacen virtuales y con un papel en las letras que falte
const pjNuevoUni = pjNuevo;
pjNuevo = function (i, W2) {
  const c = pjNuevoUni.apply(this, arguments),
    X = W2 || W;
  if (X.m == 4) {
    c.vir = 1;
    c.t = null;
    c.r = pm4Sug(X.cast || []);
  }
  return c;
};
const pjCardUni = pjCard;
pjCard = function (c, k, ad) {
  let h = pjCardUni.apply(this, arguments);
  if (W.m == 5 || c.i == 2) return h;
  const T = pjVirTx(W.m),
    L = espL(),
    fila = `<div class="chips pj-vir" translate="no" style="margin:4px 0">${chx("wcvir", k + "|0", ic("talento") + " " + T[0][L], !c.vir)}${chx("wcvir", k + "|1", ic("idea") + " " + T[1][L], !!c.vir)}</div>`;
  // Sin intérprete: fuera el selector de actor (o el del protagonista) y la línea de encaje
  if (c.vir)
    h = h
      .replace(/<select data-k="crew\.7"[\s\S]*?<\/select>/, "")
      .replace(/<select data-k="cast\.\d+\.t"[\s\S]*?<\/select>/, "")
      .replace(/<div class="k" style="margin-top:4px"><span class="m">(Encaje|Sin int)[\s\S]*?Ver talentos<\/button><\/div>/, "");
  h = h.replace(/(<input type="text" data-k="cast\.\d+\.n"[^>]*>)/, "$1" + fila);
  // En música, el papel que cumple en las letras
  if (W.m == 4)
    h = h.replace(
      /<\/div>$/,
      `<label class="m" translate="no">${tx4("Quién es en la canción", "Who they are in the song", "Qui c'est dans la chanson", "Quem é na canção")}</label><select onchange="act('wcr4','${k}|'+this.value)" translate="no" aria-label="${esc(tx4("Quién es en la canción", "Who they are in the song", "Qui c'est dans la chanson", "Quem é na canção"))}">${PM4R.map((_, r) => `<option value="${r}"${(c.r | 0) == r ? " selected" : ""}>${esc(pm4Rol(r))}</option>`).join("")}</select></div>`,
    );
  return h;
};
ACT["wcvir"] = (v) => {
  const [k, x] = String(v).split("|").map(Number),
    c = (W.cast || [])[k];
  if (!c) return;
  c.vir = x ? 1 : 0;
  c.sob = 1;
  if (x) c.t = null;
  else if (k == 0 && pjLider(W) && W.crew[7] != null) c.t = W.crew[7];
  return wz();
};
// Un personaje virtual en imagen real o en teatro se hace con efectos, títeres o proyecciones: también cuesta
V37.costo.push((W2) => {
  if (![0, 1, 3].includes(W2.m)) return 1;
  const k = espMedio(W2);
  if (!k) return 1;
  const s = (W2.cast || []).reduce((t, c) => t + (c.vir && c.i != 2 ? 0.025 * (ESPW[c.i] != null ? ESPW[c.i] : 0.3) : 0), 0);
  return 1 + Math.min(0.2, s * k);
});
// Explicación arriba de los personajes, en todos los medios
const pjUniTx = () =>
  W.m == 5
    ? tx4(
        "Sin tope de personajes. En un libro todos son de papel: nadie los interpreta y casi no suman costo.",
        "No limit on characters. In a book they're all made of paper: no one plays them and they add almost no cost.",
        "Pas de limite de personnages. Dans un livre, ils sont tous de papier : personne ne les joue et ils ne coûtent presque rien.",
        "Sem limite de personagens. Num livro todos são de papel: ninguém os interpreta e quase não somam custo.",
      )
    : tx4(
        "Sin tope de personajes. Cada uno suma costo según el medio (más en videojuegos y cine, menos en teatro y música) y cada intérprete cobra su cachet. Un personaje virtual no paga intérprete; en imagen real o en teatro se hace con efectos, títeres o proyecciones, que también cuestan.",
        "No limit on characters. Each one adds cost depending on the medium (more in games and film, less in theater and music) and each performer charges a fee. A virtual character pays no performer; in live action or theater it's made with effects, puppets or projections, which also cost.",
        "Pas de limite de personnages. Chacun ajoute un coût selon le média (plus dans le jeu vidéo et le cinéma, moins au théâtre et en musique) et chaque interprète touche un cachet. Un personnage virtuel ne paie pas d'interprète ; en prise de vues réelles ou au théâtre, il se fait avec des effets, des marionnettes ou des projections, qui coûtent aussi.",
        "Sem limite de personagens. Cada um soma custo conforme o meio (mais em videogames e cinema, menos em teatro e música) e cada intérprete cobra seu cachê. Um personagem virtual não paga intérprete; em imagem real ou no teatro ele é feito com efeitos, fantoches ou projeções, que também custam.",
      );
const castHUni = castH;
castH = function () {
  return `<div class="m" translate="no">${pjUniTx()}</div>` + castHUni.apply(this, arguments);
};
(() => {
  if (typeof DIC_FR == "undefined") return;
  DIC_FR["Quién es en la canción"] = "Qui c'est dans la chanson";
  DIC_PT["Quién es en la canción"] = "Quem é na canção";
})();
