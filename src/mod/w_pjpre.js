// ===== Personajes prestados: traer a tu historia un personaje de otra obra sin adaptarla (Drácula en una película de Batman) =====
// Especie de cada personaje conocido del catálogo y de las obras reales (lo que no está aquí se deduce del nombre)
const ESPNOM = {
  // Monstruos
  "la criatura": 5, "La criatura": 5, Grendel: 5, "la madre de Grendel": 5, Polifemo: 5, Humbaba: 5, "Vucub Caquix": 5, "el ogro": 5, Calibán: 5, Cthulhu: 5, "los morlocks": 5, "El caballero completo": 5, "la Patasola": 5, "la Bestia": 5, "el Golem": 5, Zahhak: 5, Godzilla: 5, Creeper: 5, Enderman: 5, "Monstruo de las galletas": 5, Gollum: 5, Ganon: 5, Bowser: 5, "El bebé": 5,
  // Monstruos no muertos
  "el conde Drácula": 6, "lord Ruthven": 6, Carmilla: 6, "Sir Francis Varney": 6, "Ben Cortman": 6, Ruth: 6, "el vetala": 6, "Los zombis": 6, "La vampira": 6,
  // Monstruos cambiaformas
  "el doctor Jekyll": 7, "Edward Hyde": 7, "Bai Suzhen": 7, Xiaoqing: 7, Manago: 7, "Saúl Montenegro": 7, Scytale: 7,
  // Dioses y seres mitológicos
  Atenea: 8, Circe: 8, Afrodita: 8, Ishtar: 8, Enkidu: 8, Gilgamesh: 8, Hanuman: 8, Krishna: 8, Rama: 8, "Sun Wukong": 8, "Zhu Bajie": 8, "Sha Wujing": 8, Odín: 8, Thor: 8, Loki: 8, Freya: 8, Baldr: 8, Hera: 8, Hércules: 8, Heracles: 8, Apolo: 8, Dafne: 8, Narciso: 8, Eco: 8, Hades: 8, Perséfone: 8, Caronte: 8, Quetzalcóatl: 8, Tezcatlipoca: 8, Xólotl: 8, Anansi: 8, Nyame: 8, Hunahpú: 8, Ixbalanqué: 8, Ixquic: 8, "los señores de Xibalbá": 8, "Caballero Verde": 8, "la Reina de la Noche": 8, "Reina de la Noche": 8, "Baba Yagá": 8, "la Madremonte": 8, "el Mohán": 8, "la mujer de los ojos verdes": 8, Ondina: 8, Kühleborn: 8, "La mujer de la nieve": 8, Väinämöinen: 8, Louhi: 8, Mwindo: 8, Nkuba: 8, Muisa: 8, Kahindo: 8, "El rey de amarillo": 8, Ares: 8, "Diana Prince": 8, "Mujer Maravilla": 8, Gandalf: 8, Haku: 8, "La Madre del Río": 8,
  // Criaturas fantásticas
  Puck: 9, Oberón: 9, Titania: 9, "el hada madrina": 9, "las hadas madrinas": 9, "el hada malvada": 9, "el Hada Azul": 9, Campanita: 9, Rumpelstiltskin: 9, "la sirenita": 9, "la bruja del mar": 9, "la Reina de las Nieves": 9, "el dragón": 9, "El gigante": 9, "Esposa del gigante": 9, Gargantúa: 9, Pantagruel: 9, "el emperador de Liliput": 9, Glumdalclitch: 9, "Urganda la Desconocida": 9, "las tres brujas": 9, "Rey de la montaña": 9, "El Sombrerón": 9, "Hada de Azúcar": 9, Gruñón: 9, Sabio: 9, Tontín: 9, "Bilbo Bolsón": 9, "Frodo Bolsón": 9, Samsagaz: 9, "Thorin Escudo de Roble": 9, Gimli: 9, Legolas: 9, Galadriel: 9, Arwen: 9, Smaug: 9, "El fauno": 9, Yubaba: 9, Pikachu: 9, Toad: 9, "El hada": 9, "Pari Banu": 9, "El dragón de cobre": 9,
  // Espíritus y fantasmas
  "la Llorona": 10, "sus hijos": 10, "el Silbón": 10, "el Cadejo blanco": 10, "el Cadejo negro": 10, "el jinete sin cabeza": 10, "el fantasma de la Navidad pasada": 10, "Jacob Marley": 10, "Fantasma de Marley": 10, "Fantasma de las Navidades Pasadas": 10, "Sir Simon": 10, "Peter Quint": 10, "Señorita Jessel": 10, Ariel: 10, "Nie Xiaoqian": 10, Oiwa: 10, Virgilio: 10, Francesca: 10, "Pedro Páramo": 10, "Susana San Juan": 10, "Dolores Preciado": 10, "Eduviges Dyada": 10, "el capitán holandés": 10, "Nic-Nac": 10, Seele: 10, "Sin Cara": 10, Blinky: 10, Pinky: 10, Inky: 10, Clyde: 10, "El fantasma de Don Ernesto": 10, "Los fantasmas de las obras": 10, "El guardián del umbral": 10, "La figura del espejo": 10, "La dama del radiador": 10,
  // Ángeles y demonios
  Satanás: 11, Lucifer: 11, "el arcángel Miguel": 11, Mefistófeles: 11, Woland: 11, Behemot: 11, Ravana: 11, Maldoror: 11, Sauron: 11,
  // Superhumanos
  Griffin: 12, Sansón: 12, "Monkey D. Luffy": 12, Hulk: 12, "Capitán América": 12, "Peter Parker": 12, "Duende Verde": 12, "Reed Richards": 12, "Sue Storm": 12, "Johnny Storm": 12, "Ben Grimm": 12, Flash: 12, Aquaman: 12, "Linterna Verde": 12, Neo: 12, Hayt: 12,
  // Extraterrestres
  Kaguya: 3, "Tars Tarkas": 3, "Dejah Thoris": 3, "Ford Prefect": 3, "Zaphod Beeblebrox": 3, "Thomas Jerome Newton": 3, Harey: 3, Hari: 3, Estraven: 3, "Rey Argaven": 3, Tibe: 3, Spock: 3, Neytiri: 3, Superman: 3, "Clark Kent": 3, "Jor-El": 3, Thanos: 3, Gokú: 3, Vegeta: 3, Piccolo: 3, "Los selenitas": 3, "Rey de los selenitas": 3, "El alien": 3, Invasores: 3, Eros: 3, Tanna: 3, "Sun Ra": 3,
  // Robots y androides
  Marvin: 4, "Roy Baty": 4, "Rachael Rosen": 4, "Pris Stratton": 4, "Roy Batty": 4, Rachael: 4, Pris: 4, "HAL 9000": 4, Robbie: 4, Speedy: 4, Astroboy: 4, Uran: 4, "Agente Smith": 4, "El Oráculo": 4, Olimpia: 4, "el Hombre de Hojalata": 4, "Hombre de hojalata": 4, "El robot conserje": 4, "El robot Tuk": 4, "La IA de navegación": 4, "La productora sintética": 4,
  // Objetos con vida
  Pinocho: 13, "el Cascanueces": 13, "El cascanueces": 13, "el Príncipe Feliz": 13, "el Espantapájaros": 13, Espantapájaros: 13, "la Reina de Corazones": 13, "La reina de corazones": 13, "Arpa mágica": 13, "Muñeca encantada": 13, Woody: 13, "Buzz Lightyear": 13, Jessie: 13, "Señor Cara de Papa": 13, "Pac-Man": 13, "Cañón láser": 13, "Las piezas": 13, "La casa": 13, "La niña de papel": 13,
  // Conceptos encarnados
  "La Luna": 15, "La Mendiga": 15, "El fundidor de botones": 15, "El destino": 15, "Un Cuadrado": 15, Esfera: 15, "El rey de Linealandia": 15, "El hombre del planeta": 15,
  // Animales que hablan
  "el lobo": 2, "la tortuga": 2, "la liebre": 2, "la zorra": 2, "el cuervo": 2, "El cuervo": 2, "la cigarra": 2, "la hormiga": 2, "el tigre": 2, "el Gato": 2, "el Zorro": 2, "el Grillo Parlante": 2, "el rey de los ratones": 2, "Rey Ratón": 2, "el patito": 2, "la madre pata": 2, "los cisnes": 2, "la golondrina": 2, Topo: 2, Rata: 2, "el señor Sapo": 2, Tejón: 2, Bambi: 2, Falina: 2, "el gran príncipe del bosque": 2, Baloo: 2, Bagheera: 2, "Shere Khan": 2, Kaa: 2, Akela: 2, "el Conejo Blanco": 2, "El conejo blanco": 2, "el gato de Cheshire": 2, "el León Cobarde": 2, "León cobarde": 2, Mickey: 2, Minnie: 2, "Capitán Pete": 2,
  // Animales
  "Moby Dick": 1, Rocinante: 1, Platero: 1, Buck: 1, Spitz: 1, "Colmillo Blanco": 1, Kala: 1, "El pterodáctilo": 1, Yzur: 1, "Gregorio Samsa": 1, "Donkey Kong": 1, Milú: 1, "El gato Mochi": 1, "El toro": 1, "El caballo": 1,
  // Humanos que el nombre podría confundir
  "Zorro de Jade": 0, "Ojo de Halcón": 0, Vampira: 0,
};
// Mismo nombre, distinta obra
const ESPOBRA = { "Twin Peaks|Bob": 10, "Alien, el octavo pasajero|Ash": 4, "Réquiem para una voz sintética|La voz": 4, "Mujer Maravilla|Hipólita": 8 };
function espDe(n, t) {
  const k = String(n || "").trim();
  if (t && ESPOBRA[t + "|" + k] != null) return ESPOBRA[t + "|" + k];
  if (ESPNOM[k] != null) return ESPNOM[k];
  const s = k.toLowerCase();
  if (/fantasma|espíritu|ánima|aparición/.test(s)) return 10;
  if (/vampir|zombi|momia|no muert/.test(s)) return 6;
  if (/hombre lobo|licántrop/.test(s)) return 7;
  if (/\brobot|androide|droide|autómata|cíborg|\bia\b/.test(s)) return 4;
  if (/alien|extraterrest|marcian|selenita/.test(s)) return 3;
  if (/demonio|diablo|arcángel|\bángel/.test(s)) return 11;
  if (/\bdios\b|\bdiosa\b/.test(s)) return 8;
  if (/dragón|\bhada|\belfo|\benan[oa]|duende|gigante|\btrol|sirena|unicornio/.test(s)) return 9;
  if (/monstruo|bestia|criatura|\bogro/.test(s)) return 5;
  return 0;
}
// Al adaptar una obra, sus personajes llegan con su especie
const matAplicaPre = matAplica;
matAplica = function (m) {
  const r = matAplicaPre.apply(this, arguments);
  (W.cast || []).forEach((c) => {
    if (c.mat) c.sp = espDe(c.n, m && m.n);
  });
  return r;
};
const tx4 = (e, n, f, p) => [e, n, f, p][espL()];
// Licencia de un personaje con derechos vigentes: de 3 % a 10 % del presupuesto si es protagonista
const presFee = (f) => 0.03 + (cl(f | 0, 0, 100) / 100) * 0.07;
const presVivo = (c) => c && c.pr && c.n == c.pr.n;
const presPago = (c) => presVivo(c) && c.pr.k == "re" && !c.pr.lib;
// Fuentes: dominio público, tus derechos y material, tus franquicias y obras reales (con licencia si sus derechos siguen vigentes)
function presPD() {
  const out = [];
  PD.forEach((x, i) => {
    if (yr() < x[2] || !pdLibre(x) || pdRiv(i)) return;
    const pj = matDet(pdO(x, i)).pj;
    if (pj.length) out.push({ k: "pd", i, n: x[0], a: x[1], y: x[2], f: x[6] || 50, pj });
  });
  return out;
}
function presMt() {
  return (S.mt || [])
    .map((m, i) => ({ k: "mt", i, n: m.n, a: m.a || "", y: m.y, f: m.f || 50, pj: matDet(m).pj }))
    .filter((o) => o.pj.length);
}
function presFr() {
  const G = {};
  (S.pj || [])
    .filter((p) => p.st >= 3 && (p.cast || []).length)
    .forEach((p) => {
      const key = p.fid != null ? "f" + p.fid : "p" + p.id;
      const g = (G[key] = G[key] || { k: "fr", i: key, fid: p.fid, n: p.fid != null ? frG(p.fid).n : p.n, a: S.sn || "", y: 0, f: 0, pj: [], vis: {} });
      g.f = Math.max(g.f, p.a | 0);
      p.cast
        .filter((c) => c.i != 2 && c.n)
        .forEach((c) => {
          if (g.vis[c.n]) return;
          g.vis[c.n] = 1;
          g.pj.push([c.n, c.x || "X", { sp: c.sp | 0, e: c.e, a: c.a, mot: c.mot, de: p.n }]);
        });
    });
  return Object.values(G);
}
function presRe() {
  const pdN = new Set(PD.map((x) => x[0])),
    vis = new Set(),
    out = [];
  salReales().forEach((r) => {
    if (!r.d || !r.d[3] || pdN.has(r.n) || vis.has(r.n)) return;
    vis.add(r.n);
    const pj = pjParse(String(r.d[3]).split("\n").join(","));
    if (pj.length) out.push({ k: "re", i: r.i, n: r.n, a: r.p || "", y: r.y, f: r.v || 60, lib: yr() - r.y >= 95, pj });
  });
  return out;
}
const presFuente = (k) => (k == "mt" ? presMt() : k == "fr" ? presFr() : k == "re" ? presRe() : presPD());
const presEstado = (o) =>
  o.k == "fr"
    ? tx4("de tu franquicia", "from your franchise", "de ta franchise", "da sua franquia")
    : o.k == "mt"
      ? tx4("tus derechos", "your rights", "tes droits", "seus direitos")
      : o.k == "pd" || o.lib
        ? tx4("dominio público · gratis", "public domain · free", "domaine public · gratuit", "domínio público · grátis")
        : tx4(`licencia: +${Math.round(presFee(o.f) * 100)} % del presupuesto como protagonista`, `license: +${Math.round(presFee(o.f) * 100)}% of the budget as a lead`, `licence : +${Math.round(presFee(o.f) * 100)} % du budget en rôle principal`, `licença: +${Math.round(presFee(o.f) * 100)} % do orçamento como protagonista`);
let PRES = { k: "pd", q: "", n: 25 };
function presOp() {
  const T = [
    ["pd", tx4("Dominio público", "Public domain", "Domaine public", "Domínio público")],
    ["re", tx4("Obras famosas", "Famous works", "Œuvres célèbres", "Obras famosas")],
    ["fr", tx4("Tus franquicias", "Your franchises", "Tes franchises", "Suas franquias")],
    ["mt", tx4("Tus derechos y material", "Your rights and material", "Tes droits et ton matériel", "Seus direitos e material")],
  ];
  const q = PRES.q.toLowerCase().trim(),
    L0 = presFuente(PRES.k),
    L = L0.filter((o) => !q || (o.n + " " + o.a + " " + o.pj.map((p) => p[0]).join(" ")).toLowerCase().includes(q)),
    ya = new Set((W.cast || []).map((c) => c.n)),
    vis = L.slice(0, PRES.n);
  const fila = (o) =>
    `<div class="c sub"><div class="k"><b>${esc(o.n)}</b><span class="m" style="color:var(--g)">${o.f ? estrellas(Math.max(1, Math.round(o.f / 20))) : ""}</span></div><div class="m">${esc([o.a, o.y ? yrs0(o.y) : "", presEstado(o)].filter(Boolean).join(" · "))}</div><div class="chips">${o.pj
      .map((p, j) => {
        const sp = p[2] ? p[2].sp | 0 : espDe(p[0], o.n);
        return `<button class="ch${ya.has(p[0]) ? " on" : ""}" data-a="wpresp" data-v="${o.k}|${o.i}|${j}"${ya.has(p[0]) ? " disabled" : ""}>${esc(p[0])}${sp ? ` <small class="m">· ${esc(espN(sp))}</small>` : ""}</button>`;
      })
      .join("")}</div></div>`;
  op(
    `<div translate="no"><div class="c"><div class="k"><h2 style="margin:0">${tx4("Traer un personaje", "Bring in a character", "Faire venir un personnage", "Trazer um personagem")}</h2>${bt("wpresx", "", tx4("Volver al creador", "Back to the creator", "Retour au créateur", "Voltar ao criador"))}</div><div class="m">${tx4(
      "Toma un personaje de otra obra y llévalo a tu historia sin adaptar la original, como Drácula en una película de Batman. Llega con su nombre, su sexo y su especie. Los de dominio público son gratis; los de obras con derechos vigentes cobran licencia. Los famosos atraen público, pero si los repites demasiado el público se cansa.",
      "Take a character from another work and bring it into your story without adapting the original, like Dracula in a Batman film. It arrives with its name, sex and species. Public domain characters are free; those from works still under copyright charge a license. Famous ones draw audiences, but overuse them and people tire.",
      "Prends un personnage d'une autre œuvre et amène-le dans ton histoire sans adapter l'originale, comme Dracula dans un film de Batman. Il arrive avec son nom, son sexe et son espèce. Ceux du domaine public sont gratuits ; ceux d'œuvres encore protégées demandent une licence. Les célèbres attirent le public, mais à force de les répéter, il se lasse.",
      "Pegue um personagem de outra obra e leve-o para a sua história sem adaptar a original, como o Drácula num filme do Batman. Ele chega com nome, sexo e espécie. Os de domínio público são grátis; os de obras com direitos vigentes cobram licença. Os famosos atraem público, mas, se você os repetir demais, o público se cansa.",
    )}</div><div class="chips">${T.map(([k, n]) => chx("wpresk", k, n, PRES.k == k)).join("")}</div><div class="k" style="gap:6px"><input type="search" value="${esc(PRES.q)}" placeholder="${tx4("Buscar obra o personaje", "Search a work or character", "Chercher une œuvre ou un personnage", "Buscar obra ou personagem")}" onchange="act('wpresq',this.value)" onkeydown="if(event.key=='Enter'){event.preventDefault();act('wpresq',this.value)}" style="flex:1">${bt("wpresq", "", ic("buscar"))}</div></div>${
      vis.map(fila).join("") ||
      `<div class="c"><div class="m">${
        PRES.k == "fr"
          ? tx4("Todavía no tienes obras estrenadas con personajes.", "You have no released works with characters yet.", "Tu n'as pas encore d'œuvres sorties avec des personnages.", "Você ainda não tem obras lançadas com personagens.")
          : tx4("No hay resultados.", "No results.", "Aucun résultat.", "Nenhum resultado.")
      }</div></div>`
    }${L.length > vis.length ? `<div class="c">${bt("wpresm", "", tx4(`Mostrar más (${L.length - vis.length})`, `Show more (${L.length - vis.length})`, `Afficher plus (${L.length - vis.length})`, `Mostrar mais (${L.length - vis.length})`))}</div>` : ""}</div>`,
  );
}
ACT["wpres"] = () => {
  PRES.n = 25;
  return presOp();
};
ACT["wpresk"] = (v) => {
  PRES.k = v;
  PRES.n = 25;
  return presOp();
};
ACT["wpresq"] = (v) => {
  if (v != null && v !== "") PRES.q = String(v);
  else {
    const e = document.querySelector('#md input[type="search"]');
    PRES.q = e ? e.value : "";
  }
  PRES.n = 25;
  return presOp();
};
ACT["wpresm"] = () => {
  PRES.n += 25;
  return presOp();
};
ACT["wpresx"] = () => wz();
ACT["wpresp"] = (v) => {
  const [k, i, j] = String(v).split("|"),
    o = presFuente(k).find((x) => String(x.i) == i),
    p = o && o.pj[+j];
  if (!p) return;
  W.cast = W.cast || [];
  if (W.cast.some((c) => c.n == p[0])) return toast(tx4("Ya está en tu reparto", "Already in your cast", "Déjà dans ta distribution", "Já está no seu elenco"));
  const rol = W.cast.some((c) => c.i == 0) ? 1 : 0;
  if (W.cast.filter((c) => c.i == rol).length >= IMP[rol][1]) return toast(tx4("Máximo ", "Maximum ", "Maximum ", "Máximo ") + IMP[rol][1]);
  const c = pjNuevo(rol, Object.assign({}, W, { gn: wGn() })),
    d = p[2];
  c.n = p[0];
  c.na = 0;
  if (p[1] == "F" || p[1] == "M") c.x = p[1];
  if (d) {
    c.sp = d.sp | 0;
    if (d.e) c.e = d.e;
    if (d.a != null) c.a = d.a;
    if (d.mot != null) c.mot = d.mot;
  } else c.sp = espDe(p[0], o.n);
  c.pr = { k: o.k, n: p[0], t: o.n, a: o.a || "", y: o.y || 0, f: o.f | 0, lib: o.k == "re" ? (o.lib ? 1 : 0) : 1, fid: o.k == "fr" ? o.fid : null };
  W.cast.push(c);
  W.cast.sort((a, b) => a.i - b.i);
  toast(tx4(`${c.n} llega a tu historia`, `${c.n} joins your story`, `${c.n} rejoint ton histoire`, `${c.n} chega à sua história`));
  return wz();
};
// Línea de origen en la tarjeta del personaje
const presTxt = (pr) =>
  tx4("De «", "From «", "De «", "De «") +
  pr.t +
  "» · " +
  (pr.k == "fr"
    ? tx4("tu franquicia", "your franchise", "ta franchise", "sua franquia")
    : pr.k == "mt"
      ? tx4("tus derechos", "your rights", "tes droits", "seus direitos")
      : pr.lib
        ? tx4("dominio público", "public domain", "domaine public", "domínio público")
        : tx4(`licencia +${Math.round(presFee(pr.f) * 100)} %`, `license +${Math.round(presFee(pr.f) * 100)}%`, `licence +${Math.round(presFee(pr.f) * 100)} %`, `licença +${Math.round(presFee(pr.f) * 100)} %`));
const pjCardPre = pjCard;
pjCard = function (c, k, ad) {
  const h = pjCardPre.apply(this, arguments);
  if (!c.pr) return h;
  const linea = presVivo(c)
    ? presTxt(c.pr)
    : tx4("Le cambiaste el nombre: ya no se reconoce como ", "You renamed it: no longer recognized as ", "Tu l'as renommé : on ne le reconnaît plus comme ", "Você mudou o nome: já não é reconhecido como ") + c.pr.n;
  return h.replace(/<\/div>$/, `<div class="m pj-pre" translate="no">${ic("material")} ${esc(linea)}</div></div>`);
};
// Botón para traerlos, arriba de los personajes
const presBt = () => `<div class="k" style="gap:8px;margin:4px 0 8px">${bt("wpres", "", ic("material") + " " + tx4("Traer un personaje existente", "Bring in an existing character", "Faire venir un personnage existant", "Trazer um personagem existente"), "a")}</div>`;
const castHPre = castH;
castH = function () {
  return presBt() + castHPre.apply(this, arguments);
};
const rapCastPre = rapCast;
rapCast = function () {
  const h = rapCastPre.apply(this, arguments);
  return conPers(W.m) ? presBt() + h : h;
};
// Costo de las licencias
V37.costo.push((W2) => 1 + Math.min(0.25, (W2.cast || []).reduce((t, c) => t + (presPago(c) ? presFee(c.pr.f) * (ESPW[c.i] != null ? ESPW[c.i] : 0.3) : 0), 0)));
// Cuántas obras tuyas ya usaron a ese personaje prestado
function presUsos(n, id) {
  return (S.pj || []).filter((p) => p.id != id && p.st >= 1 && (p.cast || []).some((c) => c.pr && c.n == n)).length;
}
// Reconocimiento del público, prestigio de los clásicos y desgaste por abuso
V37.mods.push((P, add) => {
  const C = (P.cast || []).filter((c) => presVivo(c) && c.i != 2);
  if (!C.length) return;
  let a = 0,
    cr = 0,
    cans = 0;
  C.forEach((c) => {
    const w = ESPW[c.i] != null ? ESPW[c.i] : 0.3,
      u = presUsos(c.n, P.id);
    a += (cl(c.pr.f | 0, 0, 100) / 100) * 1.4 * w * Math.pow(0.7, u);
    if (c.pr.k == "pd" || (c.pr.k == "re" && c.pr.lib)) cr += 0.15 * w;
    if (u >= 3) cans += 0.3 * (u - 2);
  });
  if (a || cr) add(Math.round(cr * 10) / 10, Math.round(Math.min(2.5, a) * 10) / 10, tx4("personajes conocidos", "well-known characters", "personnages connus", "personagens conhecidos") + ": " + C.slice(0, 3).map((c) => c.n).join(", "));
  if (cans) add(-Math.round(Math.min(1.5, cans) * 10) / 10, -Math.round(Math.min(0.8, cans / 2) * 10) / 10, tx4("el público ya los vio demasiado", "audiences have seen them too often", "le public les a trop vus", "o público já os viu demais"));
});
// Al estrenar, un personaje de tu franquicia le da vida a su saga
V37.estreno.push((P) => {
  const F = new Set((P.cast || []).filter((c) => presVivo(c) && c.pr.k == "fr" && c.pr.fid != null && c.pr.fid != P.fid).map((c) => c.pr.fid));
  F.forEach((f) => {
    const g = frG(f);
    g.hyB = (g.hyB || 0) + 0.3;
  });
});
