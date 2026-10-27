// ===== Más tipos de obra: tradiciones teatrales del mundo, circo y formatos nuevos en todos los medios =====
// [nombre, naturaleza (""|"f"|"r"), desde, inglés, francés, portugués, decisiones, no cuenta historia, efecto base [costo ×, crítica, público, semanas]]
const TYN5 = [
  [
    ["Mediometraje", "", 1900, "Medium-length film", "Moyen métrage", "Média-metragem", ["corto"], 0, [0.75, 0, -1, -2]],
    ["Película de serie B", "f", 1935, "B movie", "Série B", "Filme B", ["serieB"], 0, [0.6, -2, 1, -2]],
    ["Docuficción", "", 1930, "Docufiction", "Docufiction", "Docuficção", ["docEnf"], 0, [0.85, 1, 0, 0]],
    ["Anime (película)", "", 1917, "Anime film", "Film d'animation japonaise", "Filme de anime", ["animeE", "voces"], 0, [1, 1, 1, 2]],
    ["Película en realidad virtual", "", 2016, "Virtual reality film", "Film en réalité virtuelle", "Filme em realidade virtual", ["rv"], 0, [1.1, 1, 0, 1]],
  ],
  [
    ["Anime (serie)", "", 1963, "Anime series", "Série d'animation japonaise", "Série de anime", ["animeE", "voces"], 0, [1, 1, 1, 1]],
    ["Radionovela", "f", 1940, "Radio drama", "Feuilleton radiophonique", "Radionovela", ["radioV"], 0, [0.5, 0, 1, -2]],
    ["Webserie", "", 2004, "Web series", "Websérie", "Websérie", ["webD"], 0, [0.55, 0, 1, -2]],
    ["Microserie vertical", "", 2020, "Vertical microseries", "Microsérie verticale", "Microssérie vertical", ["microC"], 0, [0.4, -1, 2, -3]],
    ["Programa de cocina", "r", 1946, "Cooking show", "Émission culinaire", "Programa de culinária", ["cocTv"], 1, [0.7, 0, 1, -1]],
    ["Programa de viajes", "r", 1950, "Travel show", "Émission de voyage", "Programa de viagens", ["viajeTv"], 1, [0.9, 1, 1, 0]],
  ],
  [
    ["Metroidvania", "f", 1986, "Metroidvania", "Metroidvania", "Metroidvania", ["mapa"], 0, [1, 1, 0, 1]],
    ["Soulslike", "f", 2009, "Soulslike", "Soulslike", "Soulslike", ["dificS"], 0, [1.05, 1, 0, 1]],
    ["Gestión / Tycoon", "", 1989, "Management / Tycoon", "Gestion / Tycoon", "Gestão / Tycoon", ["simR", "mods"], 0, [0.95, 0, 1, 0]],
    ["Simulador de vida", "", 2001, "Life simulator", "Simulateur de vie", "Simulador de vida", ["vidaS"], 0, [1, 0, 2, 1]],
    ["Party game", "", 1998, "Party game", "Party game", "Party game", ["multi"], 1, [0.85, -1, 2, -1]],
    ["Juego de cartas digital", "", 2002, "Digital card game", "Jeu de cartes numérique", "Jogo de cartas digital", ["cartasM"], 1, [0.8, 0, 1, 0]],
    ["Realidad aumentada", "", 2016, "Augmented reality", "Réalité augmentée", "Realidade aumentada", ["raU"], 0, [1.05, 0, 2, 0]],
    ["Juego narrativo", "", 2012, "Narrative game", "Jeu narratif", "Jogo narrativo", ["finales"], 0, [0.8, 2, -1, 0]],
  ],
  [
    ["Teatro de sombras chino", "", 1600, "Chinese shadow theater", "Théâtre d'ombres chinois", "Teatro de sombras chinês", ["sombraF", "sombraM"], 0, [0.7, 2, 0, 0]],
    ["Wayang kulit (sombras de Java)", "", 1600, "Wayang kulit (Javanese shadow play)", "Wayang kulit (ombres javanaises)", "Wayang kulit (sombras de Java)", ["dalang", "durN"], 0, [0.75, 2, 0, 0]],
    ["Karagöz (sombras turcas)", "", 1600, "Karagöz (Turkish shadow play)", "Karagöz (ombres turques)", "Karagöz (sombras turcas)", ["sombraF"], 0, [0.65, 1, 1, -1]],
    ["Títeres de agua (Vietnam)", "", 1600, "Water puppetry (Vietnam)", "Marionnettes sur l'eau (Vietnam)", "Bonecos na água (Vietnã)", ["aguaE"], 0, [0.9, 2, 1, 1]],
    ["Bunraku", "", 1684, "Bunraku", "Bunraku", "Bunraku", ["bunrakuT"], 0, [1, 2, 0, 1]],
    ["Kabuki", "", 1603, "Kabuki", "Kabuki", "Kabuki", ["onnagata", "kabukiE"], 0, [1.1, 2, 1, 1]],
    ["Teatro nō", "", 1600, "Noh theater", "Théâtre nô", "Teatro nô", ["mascaras"], 0, [1, 3, -2, 1]],
    ["Ópera de Pekín", "", 1790, "Peking opera", "Opéra de Pékin", "Ópera de Pequim", ["lianpu", "acroP"], 0, [1.1, 2, 1, 1]],
    ["Kathakali", "", 1600, "Kathakali", "Kathakali", "Kathakali", ["mascaras", "durN"], 0, [1, 2, 0, 1]],
    ["Commedia dell'arte", "", 1600, "Commedia dell'arte", "Commedia dell'arte", "Commedia dell'arte", ["lazzi"], 0, [0.8, 1, 2, 0]],
    ["Pantomima", "", 1600, "Pantomime", "Pantomime", "Pantomima", ["mimoE"], 0, [0.7, 1, 0, -1]],
    ["Teatro callejero", "", 1600, "Street theater", "Théâtre de rue", "Teatro de rua", ["calleE"], 0, [0.5, 0, 2, -2]],
    ["Auto sacramental", "f", 1600, "Sacramental play", "Auto sacramental", "Auto sacramental", ["carros"], 0, [0.9, 1, 1, 0]],
    ["Teatro de revista", "", 1850, "Revue", "Revue", "Teatro de revista", ["numeros", "vedette"], 0, [1.05, -1, 2, 0]],
    ["Espectáculo de ilusionismo", "", 1845, "Magic show", "Spectacle d'illusionnisme", "Espetáculo de ilusionismo", ["magiaT"], 1, [0.9, 0, 2, -1]],
    ["Danza-teatro", "", 1927, "Dance theater", "Danse-théâtre", "Dança-teatro", ["balletC"], 0, [1, 2, -1, 0]],
    ["Teatro documental", "r", 1925, "Documentary theater", "Théâtre documentaire", "Teatro documental", ["expo"], 0, [0.8, 2, -1, 0]],
    ["Teatro del absurdo", "f", 1950, "Theater of the absurd", "Théâtre de l'absurde", "Teatro do absurdo", ["radical"], 0, [0.75, 2, -2, 0]],
    ["Teatro negro", "", 1959, "Black light theater", "Théâtre noir", "Teatro negro", ["luzN"], 0, [0.95, 1, 1, 0]],
    ["Ópera rock", "", 1969, "Rock opera", "Opéra rock", "Ópera rock", ["coreo", "gira"], 0, [1.15, 1, 2, 1]],
    ["Circo contemporáneo", "", 1984, "Contemporary circus", "Cirque contemporain", "Circo contemporâneo", ["circoC", "carpa"], 0, [1.25, 2, 2, 1]],
  ],
  [
    ["Sesión acústica (unplugged)", "", 1989, "Unplugged session", "Session acoustique (unplugged)", "Sessão acústica (unplugged)", ["vivoL"], 1, [0.6, 1, 1, -2]],
    ["Álbum navideño", "", 1942, "Christmas album", "Album de Noël", "Álbum de Natal", ["sencillo"], 1, [0.8, -1, 2, -1]],
    ["Álbum colaborativo", "", 1955, "Collaborative album", "Album en collaboration", "Álbum colaborativo", ["invitadoM"], 1, [1.1, 1, 2, 0]],
    ["Álbum tributo", "", 1960, "Tribute album", "Album hommage", "Álbum tributo", ["invitadoM"], 1, [0.9, 0, 1, -1]],
    ["Disco infantil", "", 1950, "Children's album", "Disque pour enfants", "Disco infantil", ["ilusI"], 1, [0.7, 0, 1, -1]],
    ["Álbum instrumental", "", 1950, "Instrumental album", "Album instrumental", "Álbum instrumental", ["productor"], 1, [0.85, 2, -1, 0]],
    ["Concierto virtual", "", 2020, "Virtual concert", "Concert virtuel", "Show virtual", ["virtC"], 1, [0.9, 0, 2, -1]],
  ],
  [
    ["Novela por entregas (folletín)", "f", 1836, "Serialized novel", "Roman-feuilleton", "Romance de folhetim", ["periodo"], 0, [0.85, 0, 2, 1]],
    ["Novela epistolar", "f", 1740, "Epistolary novel", "Roman épistolaire", "Romance epistolar", ["extension"], 0, [1, 2, -1, 0]],
    ["Novela juvenil", "f", 1967, "Young adult novel", "Roman jeunesse", "Romance juvenil", ["sagaJ"], 0, [1, 0, 2, 0]],
    ["Librojuego (elige tu aventura)", "f", 1979, "Gamebook", "Livre dont vous êtes le héros", "Livro-jogo", ["finales"], 0, [0.9, 0, 2, 0]],
    ["Fanzine", "", 1930, "Fanzine", "Fanzine", "Fanzine", ["fanzE"], 0, [0.3, 1, 0, -2]],
    ["Audiolibro", "", 1955, "Audiobook", "Livre audio", "Audiolivro", ["narrA"], 0, [0.6, 0, 1, -2]],
    ["Revista literaria", "", 1700, "Literary magazine", "Revue littéraire", "Revista literária", ["periodo"], 0, [0.7, 2, -1, 0]],
    ["Enciclopedia", "r", 1751, "Encyclopedia", "Encyclopédie", "Enciclopédia", ["ciencia", "extension"], 1, [1.5, 2, 0, 3]],
    ["Guía de viaje", "r", 1836, "Travel guide", "Guide de voyage", "Guia de viagem", ["cocina"], 1, [0.7, 0, 1, -1]],
    ["Libro de fotografía", "r", 1890, "Photography book", "Livre de photographie", "Livro de fotografia", ["poeEd"], 1, [1.2, 2, 0, 0]],
  ],
];
// Decisiones nuevas
Object.assign(TXD, {
  serieB: ["sb_rap", "Rodaje", "Shoot", [OP40("En dos semanas", "In two weeks", 0.85, -1, 1, -1, "Barata y rápida: el público de culto la adora.", "Cheap and fast: cult audiences love it."), OP40("Con algo de cuidado", "With some care", 1, 0, 0)]],
  animeE: ["an_est", "Estilo", "Style", [OP40("Clásico de estudio", "Classic studio", 1, 1, 0), OP40("Acción espectacular (sakuga)", "Spectacular action (sakuga)", 1.08, 1, 2, 1), OP40("Limitado y económico", "Limited and cheap", 0.85, -1, 0)]],
  radioV: ["rn_ext", "Efectos de sonido", "Sound effects", [OP40("Hechos en vivo (foley)", "Live foley", 1, 1, 1), OP40("Pocos", "Few", 0.9, -1, 0)]],
  webD: ["ws_dis", "Dónde se estrena", "Where it premieres", [OP40("Plataforma de video gratuita", "Free video platform", 1, 0, 2, 0, "Más vistas, menos ingresos.", "More views, less income."), OP40("Pago por capítulo", "Pay per episode", 1, 1, -1)]],
  microC: ["mc_cap", "Capítulos", "Episodes", [OP40("Sesenta de un minuto", "Sixty one-minute episodes", 1, 0, 2), OP40("Treinta de tres minutos", "Thirty three-minute episodes", 1.05, 1, 1)]],
  cocTv: ["ct_che", "Presentador", "Host", [OP40("Cocinero de prestigio", "Renowned chef", 1.08, 1, 2), OP40("Aficionado carismático", "Charismatic amateur", 0.95, 0, 1)]],
  viajeTv: ["vt_alc", "Destinos", "Destinations", [OP40("El propio país", "Home country", 0.9, 0, 1), OP40("Todo el mundo", "The whole world", 1.15, 1, 2)]],
  dificS: ["dl_dif", "Dificultad", "Difficulty", [OP40("Brutal y justa", "Brutal but fair", 1, 2, 0), OP40("Con modo accesible", "With an accessible mode", 1.03, 1, 2, 0, "", "", 2015)]],
  vidaS: ["sv_cic", "Ritmo de juego", "Pace", [OP40("Tiempo real del mundo", "Real-world time", 1, 1, 1), OP40("Días acelerados", "Accelerated days", 1, 0, 1)]],
  cartasM: ["cm_mod", "Cobro", "Monetization", [OP40("Sobres de cartas", "Card packs", 1, -1, 3), OP40("Todo incluido", "Everything included", 1, 1, 0)]],
  raU: ["ra_cal", "Calles", "Streets", [OP40("Solo ciudades grandes", "Big cities only", 1, 0, 1), OP40("Todo el mapa del mundo", "The whole world map", 1.1, 0, 3, 1)]],
  sombraF: ["so_fig", "Figuras", "Figures", [OP40("Cuero tallado y pintado", "Carved and painted leather", 1.05, 2, 0, 1, "La tradición de siglos; luce como un vitral.", "Centuries of tradition; it glows like stained glass."), OP40("Papel y cartón", "Paper and cardboard", 0.85, 0, 0), OP40("Siluetas modernas con luces de color", "Modern silhouettes with colored lights", 1.1, 1, 2, 0, "", "", 1950)]],
  sombraM: ["so_mus", "Música", "Music", [OP40("Gong, suona y percusión tradicional", "Gong, suona and traditional percussion", 1, 1, 0), OP40("Orquesta", "Orchestra", 1.08, 1, 1), OP40("Electrónica", "Electronic", 1, 0, 2, 0, "", "", 1980)]],
  dalang: ["wk_dal", "Dalang (el maestro titiritero)", "Dalang (master puppeteer)", [OP40("Joven", "Young", 0.9, 0, 0), OP40("Leyenda de su arte", "A legend of the art", 1.12, 2, 2)]],
  durN: ["wk_dur", "Duración", "Length", [OP40("Función de una noche entera", "An all-night show", 1.05, 2, -1, 0, "Como manda la tradición.", "As tradition demands."), OP40("Versión de dos horas", "Two-hour version", 0.95, 0, 1)]],
  aguaE: ["ag_est", "Estanque", "Pond", [OP40("Estanque del pueblo", "Village pond", 0.85, 1, 0), OP40("Teatro con piscina y luces", "Theater with pool and lights", 1.12, 1, 2)]],
  bunrakuT: ["bu_tit", "Titiriteros", "Puppeteers", [OP40("Tres por títere, a la vista", "Three per puppet, in plain sight", 1.06, 2, 0), OP40("Ocultos", "Hidden", 0.95, 0, 0)]],
  onnagata: ["kb_onn", "Papeles femeninos", "Female roles", [OP40("Onnagata (actores que hacen mujeres)", "Onnagata (actors playing women)", 1, 1, 0), OP40("Actrices", "Actresses", 1, 0, 1, 0, "Una ruptura con la tradición.", "A break with tradition.", 1950)]],
  kabukiE: ["kb_esc", "Escenario", "Stage", [OP40("Tradicional", "Traditional", 1, 0, 0), OP40("Giratorio y con trampillas", "Revolving with trapdoors", 1.08, 1, 2, 0, "", "", 1758)]],
  mascaras: ["ms_tal", "Máscaras y maquillaje", "Masks and makeup", [OP40("Heredadas de la compañía", "Inherited by the company", 1, 1, 0), OP40("Talladas por un maestro", "Carved by a master", 1.1, 2, 1)]],
  lianpu: ["pk_lia", "Maquillaje (lianpu)", "Face painting (lianpu)", [OP40("Colores clásicos de cada personaje", "Each character's classic colors", 1, 1, 1), OP40("Con cambio de máscaras (bian lian)", "With face-changing (bian lian)", 1.06, 1, 2)]],
  acroP: ["pk_acr", "Acrobacias", "Acrobatics", [OP40("Moderadas", "Moderate", 1, 0, 0), OP40("Artes marciales en escena", "Martial arts on stage", 1.08, 0, 2)]],
  lazzi: ["cd_laz", "Improvisación (lazzi)", "Improvised bits (lazzi)", [OP40("Sobre un guion fijo", "On a fixed script", 1, 0, 0), OP40("Libre, con máscaras clásicas", "Free, with classic masks", 0.95, 1, 2, 0, "Arlequín, Colombina y Pantalone.", "Harlequin, Columbina and Pantalone.")]],
  mimoE: ["mi_est", "Estilo", "Style", [OP40("Clásico, con cara blanca", "Classic white-face", 1, 1, 0), OP40("Físico y cómico", "Physical comedy", 1, 0, 2)]],
  calleE: ["ca_lug", "Dónde", "Where", [OP40("Plazas y mercados", "Squares and markets", 0.9, 0, 1), OP40("Festival de calle", "Street festival", 1.05, 1, 2)]],
  carros: ["as_car", "Escenario", "Stage", [OP40("Carros que recorren la ciudad", "Wagons touring the city", 1.05, 1, 2), OP40("Atrio de la iglesia", "Church courtyard", 0.9, 1, 0)]],
  vedette: ["rv_ved", "Vedette", "Star", [OP40("De la compañía", "Company's own", 1, 0, 0), OP40("Estrella del momento", "Star of the moment", 1.12, 0, 3)]],
  magiaT: ["mg_tru", "Trucos", "Tricks", [OP40("Cartas y cerca del público", "Cards and close-up", 0.9, 1, 1), OP40("Grandes ilusiones", "Grand illusions", 1.15, 0, 3, 0, "Hacer desaparecer un elefante cuesta.", "Making an elephant vanish is costly."), OP40("Escapismo arriesgado", "Daring escapes", 1.05, 0, 2)]],
  luzN: ["tn_luz", "Efectos", "Effects", [OP40("Luz negra clásica", "Classic black light", 1, 1, 1), OP40("Con proyecciones", "With projections", 1.06, 1, 2, 0, "", "", 1990)]],
  circoC: ["cc_con", "Concepto", "Concept", [OP40("Historia hilada con acrobacias", "A story told through acrobatics", 1, 2, 1), OP40("Números independientes", "Separate acts", 0.95, 0, 1)]],
  carpa: ["ci_car", "Carpa", "Big top", [OP40("Itinerante por el país", "Touring the country", 1, 0, 2), OP40("Sede fija", "Resident show", 1.1, 1, 1)]],
  circoA: ["ci_ani2", "Animales", "Animals", [OP40("Sin animales", "No animals", 1, 0, 0), OP40("Con animales", "With animals", 1.05, 0, 2, 0, "Desde 2000 el público y la crítica lo rechazan.", "From 2000 audiences and critics reject it.")]],
  circoR: ["ci_red", "Riesgo", "Risk", [OP40("Con red de seguridad", "With a safety net", 1, 0, 0), OP40("Sin red", "No net", 1.03, 0, 2, 0, "Más emoción y más peligro.", "More thrills, more danger.")]],
  invitadoM: ["am_inv", "Artistas invitados", "Guest artists", [OP40("Del mismo sello", "From the same label", 1, 0, 0), OP40("Estrellas de otros sellos", "Stars from other labels", 1.12, 0, 3)]],
  virtC: ["cv_ent", "Escenario", "Stage", [OP40("Transmisión desde un estudio", "Studio stream", 0.9, 0, 1), OP40("Dentro de un videojuego", "Inside a video game", 1.1, 1, 3)]],
  sagaJ: ["nj_sag", "Saga", "Series", [OP40("Libro único", "Standalone", 1, 1, 0), OP40("Primera de una trilogía", "First of a trilogy", 1.03, 0, 2)]],
  fanzE: ["fz_tir", "Tirada", "Print run", [OP40("Fotocopias a mano", "Hand-made photocopies", 0.8, 1, 0), OP40("Impresión cuidada", "Careful printing", 1.1, 1, 1)]],
  narrA: ["al_nar", "Narración", "Narration", [OP40("Un narrador profesional", "A professional narrator", 1, 1, 0), OP40("Una estrella", "A star", 1.12, 0, 3), OP40("Elenco completo con efectos", "Full cast with effects", 1.15, 1, 2)]],
});
TYPX.Circo = uniq((TYPX.Circo || []).concat(["circoA", "circoR", "carpa"]));
// Al circo con animales le pasa factura la época
V37.mods.push((P, add) => {
  if (!tyNom(P).some((n) => /Circo/.test(n))) return;
  const x = P.tyx || {};
  if ((x.ci_ani2 | 0) == 1 && (P.y || yr()) >= 2000) add(-2, -2, L37("circo con animales en pleno siglo XXI", "a circus with animals in the 21st century"));
});
// Registrar los tipos, sus decisiones, su efecto base y sus traducciones
const TYB5 = {};
TYN5.forEach((L, m) =>
  L.forEach(([n, f, y, en, fr, pt, dec, nn, b]) => {
    if (TY[m][0].includes(n)) return;
    TY[m][0].push(n);
    TYN[m].push([f, y]);
    E40(n, en);
    if (typeof DIC_FR != "undefined") {
      DIC_FR[n] = fr;
      DIC_PT[n] = pt;
    }
    TYPX[n] = dec;
    TYB5[n] = b;
    if (nn) {
      TYNN[m] = TYNN[m] || [];
      const i = TY[m][0].indexOf(n);
      if (!TYNN[m].includes(i)) TYNN[m].push(i);
    }
  }),
);
Object.values(TXD).forEach((d) => {
  E40(d[1], d[2]);
  d[3].forEach((o) => {
    E40(o[0], o[1]);
    if (o[6]) E40(o[6], o[7]);
  });
});
const tyB5 = (X) => tyNom(X).map((n) => TYB5[n]).filter(Boolean);
V37.costo.push((W2) => tyB5(W2).reduce((k, b) => k * b[0], 1));
V37.sem.push((W2) => tyB5(W2).reduce((s, b) => s + b[3], 0));
V37.mods.push((P, add) => {
  let c = 0,
    a = 0;
  tyB5(P).forEach((b) => {
    c += b[1];
    a += b[2];
  });
  if (c || a) add(c, a, L37("lo que aporta su tipo de obra", "what its type of work brings"));
});
// Selector de tipo de obra: los principales a la vista y todos con buscador
const TYV = 12;
tyChips = function () {
  const mx = TY[W.m][1] || 1,
    L = TY[W.m][0]
      .map((x, i) => [x, i, dscTipo(i), (W.ty || []).includes(i)])
      .filter(([x, i, d, on]) => d.ok || DSCV || on),
    nat = (i) => {
      const t = (TYN[W.m] || [])[i];
      return t && t[0] ? (t[0] == "f" ? T40(" · ficción", " · fiction") : T40(" · realidad", " · reality")) : "";
    },
    ver = L.filter(([x, i, d, on], k) => on || k < TYV);
  return `<div class="m" style="margin-top:6px">${T40("Tipo de obra", "Type of work")}${mx > 1 ? " (" + T40("hasta", "up to") + " " + mx + ")" : ""}</div><div class="chips">${ver.map(([x, i, d, on]) => chx("wty", i, esc(x) + nat(i), on, !d.ok, d.why)).join("")}${
    L.length > ver.length ? `<button class="b" data-a="wtyp">${ic("buscar")} ${T40("Todos los tipos", "All types")} (${L.length})</button>` : ""
  }</div>`;
};
ACT["wtyp"] = () => {
  const mx = TY[W.m][1] || 1;
  fxPick({
    t: T40("Tipo de obra", "Type of work"),
    d: L37(`Elige hasta ${mx}. Algunos son solo de ficción o solo de realidad.`, `Pick up to ${mx}. Some are fiction-only or reality-only.`),
    items: TY[W.m][0]
      .map((x, i) => [x, i, dscTipo(i)])
      .filter(([x, i, d]) => d.ok || (W.ty || []).includes(i))
      .map(([x, i]) => {
        const t = (TYN[W.m] || [])[i] || [];
        return { v: i, l: x, s: (t[1] ? T40("desde", "since") + " " + yrs0(t[1]) : "") + ((TYPX[x] || []).length ? " · " + (TYPX[x] || []).map((d) => TXD[d][1]).join(", ") : ""), g: t[0] == "f" ? T40("Ficción", "Fiction") : t[0] == "r" ? T40("Realidad", "Reality") : T40("Ficción o realidad", "Fiction or reality") };
      }),
    sel: (W.ty || []).map(String),
    max: mx,
    min: 1,
    ok: (s) => {
      const N = s.map(Number),
        A = W.ty || [];
      A.filter((i) => !N.includes(i)).forEach((i) => {
        W.ty = (W.ty || []).filter((x) => x != i);
      });
      N.filter((i) => !A.includes(i)).forEach((i) => {
        W.ty = (W.ty || []).filter((x) => x != i);
        ACT["wty"](i);
      });
      if (!W.ty.length) W.ty = [N[0] || 0];
      return wz();
    },
  });
};
