// ===== Especie o forma de cada personaje: humano, animal, extraterrestre, monstruo, ser mitológico, espíritu… =====
// [español, inglés, francés, portugués, costo en imagen real (%), géneros con los que encaja, ejemplos en los cuatro idiomas]
const ESPX = [
  ["Humano", "Human", "Humain", "Humano", 0, /./, null],
  ["Animal", "Animal", "Animal", "Animal", 3, /Animales|Familiar|Infantil|Aventura|Drama|Western/, ["un perro, un caballo, un lobo", "a dog, a horse, a wolf", "un chien, un cheval, un loup", "um cachorro, um cavalo, um lobo"]],
  ["Animal que habla", "Talking animal", "Animal qui parle", "Animal falante", 7, /Infantil|Familiar|Comedia|Fantasía|Aventura|Musical|Fábula/, ["un ratón valiente, un zorro astuto", "a brave mouse, a cunning fox", "une souris courageuse, un renard rusé", "um rato corajoso, uma raposa astuta"]],
  ["Extraterrestre", "Alien", "Extraterrestre", "Extraterrestre", 6, /Ciencia ficción|Extraterrestres|Space|Comedia|Terror/, ["un visitante de otro planeta", "a visitor from another planet", "un visiteur d'une autre planète", "um visitante de outro planeta"]],
  ["Robot o androide", "Robot or android", "Robot ou androïde", "Robô ou androide", 5, /Ciencia ficción|Cyberpunk|Robótica|Familiar|Infantil|Comedia/, ["una IA con cuerpo, un autómata", "an AI with a body, an automaton", "une IA dotée d'un corps, un automate", "uma IA com corpo, um autômato"]],
  ["Monstruo", "Monster", "Monstre", "Monstro", 7, /Terror|Monstruos|Fantasía|Kaiju|Aventura|Ciencia ficción/, ["una criatura del lago, un kaiju", "a lake creature, a kaiju", "une créature du lac, un kaiju", "uma criatura do lago, um kaiju"]],
  ["No muerto", "Undead", "Mort-vivant", "Morto-vivo", 4, /Terror|Monstruos|Vampir|Zombi|Gótico|Romance|Comedia/, ["un vampiro, un zombi, una momia", "a vampire, a zombie, a mummy", "un vampire, un zombie, une momie", "um vampiro, um zumbi, uma múmia"]],
  ["Cambiaformas", "Shapeshifter", "Métamorphe", "Metamorfo", 6, /Terror|Fantasía|Monstruos|Romance|Licántropos/, ["un hombre lobo, una mujer serpiente", "a werewolf, a snake woman", "un loup-garou, une femme serpent", "um lobisomem, uma mulher serpente"]],
  ["Dios o ser mitológico", "God or mythological being", "Dieu ou être mythologique", "Deus ou ser mitológico", 6, /Fantasía|Mitolog|Épico|Aventura|Histórico|Religioso/, ["un dios del trueno, una sirena, un titán", "a thunder god, a mermaid, a titan", "un dieu du tonnerre, une sirène, un titan", "um deus do trovão, uma sereia, um titã"]],
  ["Criatura fantástica", "Fantasy creature", "Créature fantastique", "Criatura fantástica", 5, /Fantasía|Infantil|Familiar|Aventura|Musical/, ["un elfo, un hada, un enano, un dragón", "an elf, a fairy, a dwarf, a dragon", "un elfe, une fée, un nain, un dragon", "um elfo, uma fada, um anão, um dragão"]],
  ["Espíritu o fantasma", "Spirit or ghost", "Esprit ou fantôme", "Espírito ou fantasma", 3, /Terror|Fantasía|Drama|Romance|Religioso|Misterio|Comedia/, ["un fantasma, un espíritu del bosque", "a ghost, a forest spirit", "un fantôme, un esprit de la forêt", "um fantasma, um espírito da floresta"]],
  ["Ángel o demonio", "Angel or demon", "Ange ou démon", "Anjo ou demônio", 4, /Religioso|Fantasía|Terror|Drama|Comedia/, ["un ángel caído, un demonio con contrato", "a fallen angel, a demon with a contract", "un ange déchu, un démon sous contrat", "um anjo caído, um demônio com contrato"]],
  ["Superhumano o mutante", "Superhuman or mutant", "Surhumain ou mutant", "Super-humano ou mutante", 5, /Superhéroes|Acción|Ciencia ficción|Aventura/, ["alguien con poderes", "someone with powers", "quelqu'un avec des pouvoirs", "alguém com poderes"]],
  ["Objeto con vida", "Living object", "Objet vivant", "Objeto com vida", 6, /Infantil|Familiar|Comedia|Fantasía|Musical/, ["un juguete, un auto, una tetera", "a toy, a car, a teapot", "un jouet, une voiture, une théière", "um brinquedo, um carro, um bule"]],
  ["Planta o naturaleza viva", "Plant or living nature", "Plante ou nature vivante", "Planta ou natureza viva", 6, /Fantasía|Infantil|Ciencia ficción|Familiar/, ["un árbol que camina, un bosque que piensa", "a walking tree, a thinking forest", "un arbre qui marche, une forêt qui pense", "uma árvore que anda, uma floresta que pensa"]],
  ["Concepto encarnado", "Embodied concept", "Concept incarné", "Conceito encarnado", 2, /Drama|Fantasía|Comedia|Experimental|Filosófic|Religioso/, ["la Muerte, el Tiempo, el Destino", "Death, Time, Fate", "la Mort, le Temps, le Destin", "a Morte, o Tempo, o Destino"]],
];
const ESPL = { es: 0, en: 1, fr: 2, pt: 3 };
const espL = () => (ESPL[CFG.idi] != null ? ESPL[CFG.idi] : IDI == "en" ? 1 : 0);
const espN = (i) => (ESPX[i | 0] || ESPX[0])[espL()];
const espEj = (i) => ((ESPX[i | 0] || ESPX[0])[6] || [])[espL()] || "";
// Lo que cuesta hacer creíble a un personaje no humano según cómo se hace la obra
function espMedio(W2) {
  if (W2.m == 4 || W2.m == 5) return 0;
  if (W2.m == 3) return 0.5;
  if (W2.m == 2) return 0.3;
  return [1, 0, 0.6, 0.5, 0.6, 0.8][W2.ani | 0] != null ? [1, 0, 0.6, 0.5, 0.6, 0.8][W2.ani | 0] : 1;
}
const ESPW = [1, 0.6, 0.2, 0.4, 0.2];
function espCosto(W2) {
  const k = espMedio(W2);
  if (!k) return 0;
  const s = (W2.cast || []).reduce((t, c) => t + ((ESPX[c.sp | 0] || ESPX[0])[4] * (ESPW[c.i] != null ? ESPW[c.i] : 0.3)) / 100, 0);
  return Math.min(0.25, s * k);
}
V37.costo.push((W2) => 1 + espCosto(W2));
V37.sem.push((W2) => (espCosto(W2) > 0.1 ? 1 : 0));
const espGen = (P) => (P.gn || []).concat(P.sb || []).join(" ");
// Encaje con los géneros, verosimilitud en obras de realidad y mundos poblados
V37.mods.push((P, add) => {
  const C = (P.cast || []).filter((c) => c.i != 2 && (c.sp | 0) > 0);
  if (!C.length) return;
  const g = espGen(P),
    real = P.rl === 0;
  let ok = 0,
    mal = 0,
    imp = 0;
  C.forEach((c) => {
    const e = ESPX[c.sp] || ESPX[0];
    if (real && c.sp > 1) imp++;
    else if (e[5].test(g)) ok++;
    else if (!/Comedia|Absurd|Surreal|Experimental|Parodia/.test(g)) mal++;
  });
  if (ok) add(Math.min(0.6, ok * 0.2), Math.min(1.2, ok * 0.4), L37("personajes que encajan con el género", "characters that fit the genre"));
  if (mal) add(-Math.min(1.2, mal * 0.4), -Math.min(0.6, mal * 0.2), L37("personajes fuera de lugar en este género", "characters out of place in this genre"));
  if (imp) add(-Math.min(2, imp * 0.8), -Math.min(1, imp * 0.4), L37("seres imposibles en una obra de realidad", "impossible beings in a reality-based work"));
  const n = new Set(C.map((c) => c.sp)).size;
  if (n >= 3 && /Fantasía|Ciencia ficción|Aventura/.test(g)) add(0, 0.3, L37("un mundo poblado de criaturas", "a world full of creatures"));
});
// Los personajes nuevos nacen con una especie que le sienta a la obra
function espSugerida(i, W2) {
  const g = (W2.gn || []).join(" "),
    infantil = /Infantil|Familiar/.test(g),
    anim = (W2.ani | 0) == 1,
    p = R();
  if (W2.rl === 0) return 0;
  if (i == 0) {
    if (anim && infantil) return p < 0.4 ? 2 : p < 0.55 ? 13 : 0;
    if (/Superhéroes/.test(g)) return p < 0.5 ? 12 : 0;
    if (/Ciencia ficción/.test(g)) return p < 0.12 ? 4 : p < 0.2 ? 3 : 0;
    if (/Fantasía/.test(g)) return p < 0.2 ? 9 : 0;
    return 0;
  }
  if (p < 0.45) return 0;
  const L = [];
  if (/Terror|Monstruos/.test(g)) L.push(5, 6, 10, 7);
  if (/Fantasía/.test(g)) L.push(9, 8, 5, 2);
  if (/Ciencia ficción/.test(g)) L.push(3, 4);
  if (/Superhéroes/.test(g)) L.push(12, 12, 3);
  if (/Religioso/.test(g)) L.push(11, 10);
  if (infantil) L.push(2, 13, 1);
  if (/Aventura|Western/.test(g)) L.push(1);
  return L.length ? pk(L) : 0;
}
const pjNuevoEsp = pjNuevo;
pjNuevo = function (i, W2) {
  const c = pjNuevoEsp.apply(this, arguments);
  c.sp = espSugerida(i, W2 || W);
  return c;
};
ACT["wcesp"] = (v) => {
  const [k, i] = String(v).split("|").map(Number),
    c = (W.cast || [])[k];
  if (!c) return;
  c.sp = cl(i | 0, 0, ESPX.length - 1);
  return wz();
};
ACT["wcespd"] = (v) => {
  const c = (W.cast || [])[+v];
  if (!c) return;
  const s = espSugerida(c.i == 0 ? 1 : c.i, Object.assign({}, W, { gn: wGn() }));
  c.sp = s || ri(1, ESPX.length - 1);
  return wz();
};
// Selector en la tarjeta de cada personaje (el primero lleva la ayuda «i»)
function espH(c, k) {
  if (c.i == 2) return "";
  const e = ESPX[c.sp | 0] || ESPX[0],
    m = espMedio(W),
    pc = Math.round(e[4] * m),
    g = wGn().join(" "),
    fit = (c.sp | 0) > 0 && e[5].test(g),
    nota =
      (c.sp | 0) > 0
        ? `<div class="m" translate="no">${esc(["Por ejemplo: ", "For example: ", "Par exemple : ", "Por exemplo: "][espL()] + espEj(c.sp) + ".")}${pc ? " " + esc([`+${pc} % de costo por personaje principal.`, `+${pc}% cost per lead character.`, `+${pc} % de coût par personnage principal.`, `+${pc} % de custo por personagem principal.`][espL()]) : ""}${" " + (W.rl === 0 && c.sp > 1 ? ["En una obra de realidad resta credibilidad.", "In a reality-based work it hurts credibility.", "Dans une œuvre réaliste, cela nuit à la crédibilité.", "Numa obra de realidade, tira credibilidade."] : fit ? ["Encaja con tus géneros.", "Fits your genres.", "Correspond à tes genres.", "Combina com seus gêneros."] : ["No es lo habitual en tus géneros.", "Unusual for your genres.", "Inhabituel pour tes genres.", "Incomum nos seus gêneros."])[espL()]}</div>`
        : "";
  return `<div class="pj-esp"><div class="k" style="gap:6px">${k == 0 ? `<label class="m">${T40("Especie o forma", "Species or form")}</label>` : `<span class="m">${T40("Especie o forma", "Species or form")}</span>`}${bt("wcespd", k, ic("dado"), "", T40("Especie al azar según la obra", "Random species for the work"))}</div><select translate="no" onchange="act('wcesp','${k}|'+this.value)" aria-label="${T40("Especie o forma", "Species or form")}">${ESPX.map((x, i) => `<option value="${i}"${(c.sp | 0) == i ? " selected" : ""}>${esc(espN(i))}</option>`).join("")}</select>${nota}</div>`;
}
const pjCardEsp = pjCard;
pjCard = function (c, k, ad) {
  const h = pjCardEsp.apply(this, arguments);
  return h.replace(/<\/div>$/, espH(c, k) + "</div>");
};
E40L([
  ["Especie o forma", "Species or form"],
  ["Especie al azar según la obra", "Random species for the work"],
  ["personajes que encajan con el género", "characters that fit the genre"],
  ["personajes fuera de lugar en este género", "characters out of place in this genre"],
  ["seres imposibles en una obra de realidad", "impossible beings in a reality-based work"],
  ["un mundo poblado de criaturas", "a world full of creatures"],
  ["Encaja con tus géneros.", "Fits your genres."],
  ["No es lo habitual en tus géneros.", "Unusual for your genres."],
  ["En una obra de realidad resta credibilidad.", "In a reality-based work it hurts credibility."],
]);
(() => {
  if (typeof DIC_FR == "undefined") return;
  [
    ["Especie o forma", "Espèce ou forme", "Espécie ou forma"],
    ["Especie al azar según la obra", "Espèce au hasard selon l'œuvre", "Espécie aleatória conforme a obra"],
    ["personajes que encajan con el género", "personnages adaptés au genre", "personagens que combinam com o gênero"],
    ["personajes fuera de lugar en este género", "personnages déplacés dans ce genre", "personagens deslocados neste gênero"],
    ["seres imposibles en una obra de realidad", "êtres impossibles dans une œuvre réaliste", "seres impossíveis numa obra de realidade"],
    ["un mundo poblado de criaturas", "un monde peuplé de créatures", "um mundo povoado de criaturas"],
  ].forEach(([e, f, p]) => {
    DIC_FR[e] = f;
    DIC_PT[e] = p;
  });
})();
