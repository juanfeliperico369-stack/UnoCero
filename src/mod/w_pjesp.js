// ===== Especie o forma de cada personaje: humano, animal, extraterrestre, monstruo, ser mitológico, espíritu… =====
// [español, inglés, francés, portugués, costo en imagen real (%), géneros con los que encaja, ejemplos en los cuatro idiomas]
const ESPX = [
  ["Humano", "Human", "Humain", "Humano", 0, /./, null],
  ["Animal", "Animal", "Animal", "Animal", 3, /Animales|Familiar|Infantil|Aventura|Drama|Western/, ["un perro, un caballo, un lobo", "a dog, a horse, a wolf", "un chien, un cheval, un loup", "um cachorro, um cavalo, um lobo"]],
  ["Animal que habla", "Talking animal", "Animal qui parle", "Animal falante", 7, /Infantil|Familiar|Comedia|Fantasía|Aventura|Musical|Fábula/, ["un ratón valiente, un zorro astuto", "a brave mouse, a cunning fox", "une souris courageuse, un renard rusé", "um rato corajoso, uma raposa astuta"]],
  ["Extraterrestre", "Alien", "Extraterrestre", "Extraterrestre", 6, /Ciencia ficción|Extraterrestres|Space|Comedia|Terror/, ["un visitante de otro planeta", "a visitor from another planet", "un visiteur d'une autre planète", "um visitante de outro planeta"]],
  ["Robot", "Robot", "Robot", "Robô", 5, /Ciencia ficción|Cyberpunk|Robótica|Familiar|Infantil|Comedia/, ["un autómata, un robot de servicio", "an automaton, a service robot", "un automate, un robot de service", "um autômato, um robô de serviço"]],
  ["Monstruo", "Monster", "Monstre", "Monstro", 7, /Terror|Monstruos|Fantasía|Kaiju|Aventura|Ciencia ficción/, ["una criatura del lago, un kaiju", "a lake creature, a kaiju", "une créature du lac, un kaiju", "uma criatura do lago, um kaiju"]],
  ["Monstruo no muerto", "Undead monster", "Monstre mort-vivant", "Monstro morto-vivo", 4, /Terror|Monstruos|Vampir|Zombi|Gótico|Romance|Comedia/, ["un vampiro, un zombi, una momia", "a vampire, a zombie, a mummy", "un vampire, un zombie, une momie", "um vampiro, um zumbi, uma múmia"]],
  ["Monstruo cambiaformas", "Shapeshifter monster", "Monstre métamorphe", "Monstro metamorfo", 6, /Terror|Fantasía|Monstruos|Romance|Licántropos/, ["un hombre lobo, una mujer serpiente", "a werewolf, a snake woman", "un loup-garou, une femme serpent", "um lobisomem, uma mulher serpente"]],
  ["Dios", "God", "Dieu", "Deus", 5, /Fantasía|Mitolog|Épico|Aventura|Histórico|Religioso/, ["un dios del trueno, la diosa de la sabiduría", "a thunder god, the goddess of wisdom", "un dieu du tonnerre, la déesse de la sagesse", "um deus do trovão, a deusa da sabedoria"]],
  ["Criatura fantástica", "Fantasy creature", "Créature fantastique", "Criatura fantástica", 5, /Fantasía|Infantil|Familiar|Aventura|Musical/, ["un unicornio, un grifo, un fénix", "a unicorn, a griffin, a phoenix", "une licorne, un griffon, un phénix", "um unicórnio, um grifo, uma fênix"]],
  ["Fantasma", "Ghost", "Fantôme", "Fantasma", 3, /Terror|Fantasía|Drama|Romance|Religioso|Misterio|Comedia/, ["el fantasma de un castillo, una sombra de los muertos", "a castle ghost, a shade of the dead", "le fantôme d'un château, une ombre des morts", "o fantasma de um castelo, uma sombra dos mortos"]],
  ["Demonio", "Demon", "Démon", "Demônio", 5, /Religioso|Fantasía|Terror|Drama|Comedia/, ["un demonio con contrato, el diablo", "a demon with a contract, the devil", "un démon sous contrat, le diable", "um demônio com contrato, o diabo"]],
  ["Superhumano", "Superhuman", "Surhumain", "Super-humano", 5, /Superhéroes|Acción|Ciencia ficción|Aventura/, ["alguien con superfuerza o que vuela", "someone with super strength or who flies", "quelqu'un de super fort ou qui vole", "alguém com superforça ou que voa"]],
  ["Objeto con vida", "Living object", "Objet vivant", "Objeto com vida", 6, /Infantil|Familiar|Comedia|Fantasía|Musical/, ["un juguete, un auto, una tetera", "a toy, a car, a teapot", "un jouet, une voiture, une théière", "um brinquedo, um carro, um bule"]],
  ["Planta", "Plant", "Plante", "Planta", 6, /Fantasía|Infantil|Ciencia ficción|Familiar|Terror/, ["un árbol que camina, una flor carnívora", "a walking tree, a carnivorous flower", "un arbre qui marche, une fleur carnivore", "uma árvore que anda, uma flor carnívora"]],
  ["Concepto encarnado", "Embodied concept", "Concept incarné", "Conceito encarnado", 2, /Drama|Fantasía|Comedia|Experimental|Filosófic|Religioso/, ["la Muerte, el Tiempo, el Destino", "Death, Time, Fate", "la Mort, le Temps, le Destin", "a Morte, o Tempo, o Destino"]],
  // Desde aquí, las especies que antes iban juntas con otra y las nuevas (se agregan al final para no cambiar las guardadas)
  ["Ser mitológico", "Mythological being", "Être mythologique", "Ser mitológico", 6, /Fantasía|Mitolog|Épico|Aventura/, ["un titán, una ninfa, un cíclope", "a titan, a nymph, a cyclops", "un titan, une nymphe, un cyclope", "um titã, uma ninfa, um ciclope"]],
  ["Ángel", "Angel", "Ange", "Anjo", 4, /Religioso|Fantasía|Drama|Romance|Comedia/, ["un ángel de la guarda, un arcángel", "a guardian angel, an archangel", "un ange gardien, un archange", "um anjo da guarda, um arcanjo"]],
  ["Espíritu", "Spirit", "Esprit", "Espírito", 3, /Fantasía|Terror|Drama|Religioso|Familiar|Infantil|Misterio/, ["el genio de la lámpara, un espíritu del bosque", "the genie of the lamp, a forest spirit", "le génie de la lampe, un esprit de la forêt", "o gênio da lâmpada, um espírito da floresta"]],
  ["Mutante", "Mutant", "Mutant", "Mutante", 4, /Superhéroes|Ciencia ficción|Acción|Terror/, ["alguien cambiado por la radiación o un experimento", "someone changed by radiation or an experiment", "quelqu'un transformé par la radiation ou une expérience", "alguém mudado pela radiação ou por um experimento"]],
  ["Androide", "Android", "Androïde", "Androide", 3, /Ciencia ficción|Cyberpunk|Robótica|Drama|Thriller/, ["un humano artificial que parece de carne", "an artificial human who looks like flesh", "un humain artificiel qui semble de chair", "um humano artificial que parece de carne"]],
  ["Cíborg", "Cyborg", "Cyborg", "Ciborgue", 4, /Ciencia ficción|Cyberpunk|Acción|Superhéroes/, ["mitad humano, mitad máquina", "half human, half machine", "mi-homme, mi-machine", "metade humano, metade máquina"]],
  ["Inteligencia artificial", "Artificial intelligence", "Intelligence artificielle", "Inteligência artificial", 2, /Ciencia ficción|Cyberpunk|Thriller|Drama|Comedia/, ["una computadora que piensa, una voz sin cuerpo", "a thinking computer, a voice without a body", "un ordinateur qui pense, une voix sans corps", "um computador que pensa, uma voz sem corpo"]],
  ["Clon", "Clone", "Clone", "Clone", 1, /Ciencia ficción|Thriller|Drama|Distop/, ["la copia exacta de alguien", "an exact copy of someone", "la copie exacte de quelqu'un", "a cópia exata de alguém"]],
  ["Hada", "Fairy", "Fée", "Fada", 5, /Fantasía|Infantil|Familiar|Musical|Romance/, ["un hada madrina, un hada diminuta", "a fairy godmother, a tiny fairy", "une marraine fée, une fée minuscule", "uma fada madrinha, uma fada minúscula"]],
  ["Elfo", "Elf", "Elfe", "Elfo", 3, /Fantasía|Aventura|Épico|Navidad|Familiar/, ["un elfo del bosque, un elfo navideño", "a forest elf, a Christmas elf", "un elfe des bois, un elfe de Noël", "um elfo da floresta, um elfo de Natal"]],
  ["Enano", "Dwarf", "Nain", "Anão", 3, /Fantasía|Aventura|Épico|Infantil/, ["un enano minero, un rey bajo la montaña", "a mining dwarf, a king under the mountain", "un nain mineur, un roi sous la montagne", "um anão mineiro, um rei sob a montanha"]],
  ["Gigante", "Giant", "Géant", "Gigante", 6, /Fantasía|Aventura|Infantil|Épico|Mitolog/, ["el gigante de las habichuelas, un gigante de piedra", "the beanstalk giant, a stone giant", "le géant du haricot, un géant de pierre", "o gigante do pé de feijão, um gigante de pedra"]],
  ["Sirena", "Mermaid", "Sirène", "Sereia", 6, /Fantasía|Infantil|Familiar|Romance|Aventura|Mitolog/, ["una sirena del mar, un tritón", "a sea mermaid, a merman", "une sirène de la mer, un triton", "uma sereia do mar, um tritão"]],
  ["Dragón", "Dragon", "Dragon", "Dragão", 9, /Fantasía|Aventura|Épico|Infantil|Mitolog/, ["un dragón que guarda un tesoro", "a dragon guarding a treasure", "un dragon qui garde un trésor", "um dragão que guarda um tesouro"]],
  ["Semidiós", "Demigod", "Demi-dieu", "Semideus", 3, /Mitolog|Épico|Fantasía|Aventura|Acción/, ["el hijo de un dios y una mortal", "the child of a god and a mortal", "l'enfant d'un dieu et d'une mortelle", "o filho de um deus e uma mortal"]],
  ["Hechicero", "Sorcerer", "Sorcier", "Feiticeiro", 2, /Fantasía|Aventura|Terror|Infantil|Familiar|Épico/, ["un mago, una bruja, un chamán", "a wizard, a witch, a shaman", "un magicien, une sorcière, un chaman", "um mago, uma bruxa, um xamã"]],
  ["Ser de la naturaleza", "Nature being", "Être de la nature", "Ser da natureza", 6, /Fantasía|Infantil|Familiar|Ecolog|Aventura/, ["un bosque que piensa, el espíritu de un río", "a thinking forest, the spirit of a river", "une forêt qui pense, l'esprit d'une rivière", "uma floresta que pensa, o espírito de um rio"]],
  ["Dinosaurio", "Dinosaur", "Dinosaure", "Dinossauro", 8, /Aventura|Ciencia ficción|Infantil|Familiar|Acción|Prehist/, ["un tiranosaurio, un dinosaurio amigo", "a tyrannosaur, a friendly dinosaur", "un tyrannosaure, un dinosaure ami", "um tiranossauro, um dinossauro amigo"]],
  ["Bestia gigante", "Giant beast", "Bête géante", "Fera gigante", 9, /Kaiju|Ciencia ficción|Monstruos|Acción|Terror|Aventura/, ["un kaiju, un simio gigante", "a kaiju, a giant ape", "un kaiju, un singe géant", "um kaiju, um macaco gigante"]],
  ["Híbrido", "Hybrid", "Hybride", "Híbrido", 6, /Fantasía|Mitolog|Aventura|Infantil|Ciencia ficción/, ["un centauro, un fauno, un minotauro", "a centaur, a faun, a minotaur", "un centaure, un faune, un minotaure", "um centauro, um fauno, um minotauro"]],
];
const ESPL = { es: 0, en: 1, fr: 2, pt: 3 };
const espL = () => (ESPL[CFG.idi] != null ? ESPL[CFG.idi] : IDI == "en" ? 1 : 0);
const espN = (i) => (ESPX[i | 0] || ESPX[0])[espL()];
const espOrd = () => [0].concat(ESPX.map((_, i) => i).filter((i) => i).sort((a, b) => espN(a).localeCompare(espN(b), CFG.idi || "es")));
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
    if (real && c.sp > 1 && c.sp != 22) imp++;
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
    if (/Superhéroes/.test(g)) return p < 0.5 ? pk([12, 12, 19, 21]) : 0;
    if (/Ciencia ficción/.test(g)) return p < 0.12 ? pk([4, 20, 21, 23]) : p < 0.2 ? 3 : 0;
    if (/Mitolog/.test(g)) return p < 0.3 ? pk([30, 8, 16]) : 0;
    if (/Fantasía/.test(g)) return p < 0.2 ? pk([9, 25, 26, 24, 31]) : 0;
    return 0;
  }
  if (p < 0.45) return 0;
  const L = [];
  if (/Terror|Monstruos/.test(g)) L.push(5, 6, 10, 7, 11, 31);
  if (/Fantasía/.test(g)) L.push(9, 8, 5, 2, 16, 24, 25, 26, 27, 29, 31, 35);
  if (/Mitolog/.test(g)) L.push(8, 16, 30, 28, 35);
  if (/Ciencia ficción/.test(g)) L.push(3, 4, 20, 21, 22, 23, 19);
  if (/Superhéroes/.test(g)) L.push(12, 12, 19, 21, 3);
  if (/Religioso/.test(g)) L.push(17, 11, 18, 10);
  if (/Kaiju/.test(g)) L.push(34, 34);
  if (infantil) L.push(2, 13, 1, 24, 33);
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
  return `<div class="pj-esp"><div class="k" style="gap:6px">${k == 0 ? `<label class="m">${T40("Especie o forma", "Species or form")}</label>` : `<span class="m">${T40("Especie o forma", "Species or form")}</span>`}${bt("wcespd", k, ic("dado"), "", T40("Especie al azar según la obra", "Random species for the work"))}</div><select translate="no" onchange="act('wcesp','${k}|'+this.value)" aria-label="${T40("Especie o forma", "Species or form")}">${espOrd().map((i) => `<option value="${i}"${(c.sp | 0) == i ? " selected" : ""}>${esc(espN(i))}</option>`).join("")}</select>${nota}</div>`;
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
