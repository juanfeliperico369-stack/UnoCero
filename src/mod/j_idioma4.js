// ===== Francés y portugués: noticias, cartas, biografía y listas con nombres que cambian en cada partida =====
(() => {
  if (typeof DIC_FR == "undefined") return;
  const fr = () => CFG.idi == "fr";
  // Busca la palabra tal cual o con mayúscula inicial (los géneros van en minúscula dentro de las frases)
  const w = (x) => {
    const D = XDIC(),
      k = String(x).trim();
    if (!D || !k) return k;
    if (D[k] != null) return D[k];
    const c = k.charAt(0).toUpperCase() + k.slice(1);
    if (D[c] != null) return D[c].charAt(0).toLowerCase() + D[c].slice(1);
    const r = trX(k);
    return r == null ? k : r;
  };
  const lista = (s) =>
    s
      .split(", ")
      .map((x) => w(x))
      .join(", ");
  [
    ["Concierto de Año Nuevo", "Concert du Nouvel An", "Concerto de Ano-Novo"],
    ["imaginación", "imagination", "imaginação"],
    ["fantasía", "fantasy", "fantasia"],
    ["monstruos", "monstres", "monstros"],
    ["un dragón de papel", "un dragon en papier", "um dragão de papel"],
    ["un león de cartón", "un lion en carton", "um leão de papelão"],
    ["«Minecraft» nace como proyecto independiente y se vuelve el juego más vendido de la historia.", "«Minecraft» naît comme projet indépendant et devient le jeu le plus vendu de l'histoire.", "«Minecraft» nasce como projeto independente e se torna o jogo mais vendido da história."],
    ["Guillermo del Toro estrena «El laberinto del fauno», un cuento de hadas en la posguerra española.", "Guillermo del Toro sort «Le Labyrinthe de Pan», un conte de fées dans l'Espagne d'après-guerre.", "Guillermo del Toro lança «O Labirinto do Fauno», um conto de fadas no pós-guerra espanhol."],
    ["Se publica «Harry Potter y la piedra filosofal»: la saga venderá más de 500 millones de libros.", "Publication de «Harry Potter à l'école des sorciers» : la saga se vendra à plus de 500 millions d'exemplaires.", "É publicado «Harry Potter e a Pedra Filosofal»: a saga venderá mais de 500 milhões de livros."],
    ["«Spyro: Year of the Dragon» se iba rompiendo poco a poco en las copias piratas: sin avisar, borraba objetos y partidas.", "«Spyro: Year of the Dragon» se dégradait peu à peu dans les copies pirates : sans prévenir, il effaçait objets et sauvegardes.", "«Spyro: Year of the Dragon» ia se corrompendo aos poucos nas cópias piratas: sem avisar, apagava itens e jogos salvos."],
    ["Culpa", "Culpabilité", "Culpa"],
    ["Alta montaña", "Haute montagne", "Alta montanha"],
    ["Amenaza", "Menace", "Ameaça"],
    ["Biografía política", "Biographie politique", "Biografia política"],
    ["Casetepunk", "Cassettepunk", "Cassettepunk"],
    ["Civilizaciones", "Civilisations", "Civilizações"],
    ["Comedia parlamentaria", "Comédie parlementaire", "Comédia parlamentar"],
    ["Corporal", "Horreur corporelle", "Horror corporal"],
    ["Crepuscular", "Crépusculaire", ""],
    ["Cruzadas", "Croisades", ""],
    ["Descubrimientos", "Découvertes", "Descobrimentos"],
    ["Detectives", "Détectives", "Detetives"],
    ["Distopía autoritaria", "Dystopie autoritaire", "Distopia autoritária"],
    ["Divorcio", "Divorce", "Divórcio"],
    ["Drama de despacho presidencial", "Drame présidentiel", "Drama de gabinete presidencial"],
    ["Drama diplomático", "Drame diplomatique", ""],
    ["Equitación", "Équitation", "Equitação"],
    ["Escape", "Évasion", "Fuga"],
    ["Espada y brujería", "Épée et sorcellerie", "Espada e feitiçaria"],
    ["Esperanzapunk", "Hopepunk", "Hopepunk"],
    ["Estafa", "Arnaque", "Golpe"],
    ["Expedición polar", "Expédition polaire", "Expedição polar"],
    ["Exploradores", "Explorateurs", ""],
    ["Ficción de golpe de Estado", "Fiction de coup d'État", "Ficção de golpe de Estado"],
    ["Gastronómico", "Gastronomique", "Gastronômico"],
    ["Gauchesco", "Gauchesque", ""],
    ["Gladiadores", "Gladiateurs", ""],
    ["Holocausto", "Holocauste", ""],
    ["Identidades", "Identités", ""],
    ["Independencia", "Indépendance", "Independência"],
    ["Independencias", "Indépendances", "Independências"],
    ["Indie / Alternativa", "", "Indie / Alternativo"],
    ["Inmersión virtual", "Immersion virtuelle", "Imersão virtual"],
    ["Justiciero", "Justicier", "Justiceiro"],
    ["La Ascensión", "L'Ascension", "A Ascensão"],
    ["Licántropos", "Lycanthropes", "Licantropos"],
    ["Lovecraftiano", "Lovecraftien", ""],
    ["Mar", "Mer", ""],
    ["Mayas", "", "Maias"],
    ["Medieval", "Médiéval", ""],
    ["Militar", "Militaire", ""],
    ["Mitopunk", "Mythopunk", ""],
    ["Monoplazas", "Monoplaces", "Monopostos"],
    ["Peloponeso", "Péloponnèse", ""],
    ["Planear", "Planifier", "Planejar"],
    ["Policías corruptos", "Flics corrompus", "Policiais corruptos"],
    ["Precolombinas", "Précolombiennes", "Pré-colombianas"],
    ["Prehistoria", "Préhistoire", "Pré-história"],
    ["Rebelión de las máquinas", "Révolte des machines", "Rebelião das máquinas"],
    ["Regencia", "Régence", "Regência"],
    ["Renacimiento", "Renaissance", "Renascimento"],
    ["Retrofuturismo", "Rétrofuturisme", ""],
    ["Revolucionario", "Révolutionnaire", "Revolucionário"],
    ["Rock and roll", "Rock and roll", ""],
    ["Secuestros", "Enlèvements", "Sequestros"],
    ["Selva", "Jungle", ""],
    ["Submarino", "Sous-marin", ""],
    ["Templarios", "Templiers", "Templários"],
    ["Terraformación", "Terraformation", "Terraformação"],
    ["Tormentos", "Tourments", ""],
    ["Vencer", "Vaincre", ""],
    ["Victoriano", "Victorien", "Vitoriano"],
    ["Vikingos", "Vikings", "Vikings"],
    ["inclina a la crítica", "penche vers la critique", "pende para a crítica"],
    ["inclina al público", "penche vers le public", "pende para o público"],
    ["busca el equilibrio", "cherche l'équilibre", "busca o equilíbrio"],
    ["costo alto", "coût élevé", "custo alto"],
    ["costo bajo", "coût faible", "custo baixo"],
    ["costo medio", "coût moyen", "custo médio"],
    ["costo bajo a medio", "coût faible à moyen", "custo baixo a médio"],
    ["verano y fin de año", "été et fin d'année", "verão e fim de ano"],
    ["temporada de premios", "saison des prix", "temporada de prêmios"],
    ["navidad y verano", "Noël et été", "Natal e verão"],
    ["vacaciones escolares", "vacances scolaires", "férias escolares"],
    ["festivales", "festivals", "festivais"],
    ["san valentín", "Saint-Valentin", "Dia dos Namorados"],
    ["bajo a medio", "faible à moyen", "baixo a médio"],
    ["clasificación usual", "classification habituelle", "classificação usual"],
    ["mira las obras del año anterior", "regarde les œuvres de l'année précédente", "olha as obras do ano anterior"],
    ["las fuentes solo dan el año", "les sources ne donnent que l'année", "as fontes só dão o ano"],
    ["Secuela", "Suite", "Sequência"],
    ["Precuela", "Préquelle", "Prequela"],
  ].forEach(([e, f, p]) => {
    if (f) DIC_FR[e] = DIC_FR[e] || f;
    if (p) DIC_PT[e] = DIC_PT[e] || p;
  });
  const TIPO = { familiar: ["familial", "familiar"], adulto: ["pour adultes", "adulto"], serio: ["sérieux", "sério"], "de público general": ["tout public", "de público geral"] };
  const CITA = [
    [/^«(.+)» me acompañó en un año difícil\. Gracias\.$/, (m) => [`«${m[1]}» m'a accompagné pendant une année difficile. Merci.`, `«${m[1]}» me acompanhou num ano difícil. Obrigado.`]],
    [/^¿Para cuándo la continuación de «(.+)»\?$/, (m) => [`À quand la suite de «${m[1]}» ?`, `Quando sai a continuação de «${m[1]}»?`]],
    [/^Vi «(.+)» cinco veces\. Mi familia ya se sabe los diálogos\.$/, (m) => [`J'ai vu «${m[1]}» cinq fois. Ma famille connaît les dialogues par cœur.`, `Vi «${m[1]}» cinco vezes. Minha família já sabe os diálogos de cor.`]],
    [/^Suban más clásicos a (.+), por favor\.$/, (m) => [`Mettez plus de classiques sur ${m[1]}, s'il vous plaît.`, `Coloquem mais clássicos na ${m[1]}, por favor.`]],
    [/^Quiero ver «(.+)» otra vez en salas\.$/, (m) => [`Je veux revoir «${m[1]}» en salle.`, `Quero ver «${m[1]}» de novo nos cinemas.`]],
    [/^El final de «(.+)» me dejó pensando una semana\.$/, (m) => [`La fin de «${m[1]}» m'a fait réfléchir pendant une semaine.`, `O final de «${m[1]}» me deixou pensando por uma semana.`]],
    [/^Vi «(.+)» tres veces\. Por favor, ¡hagan otra!$/, (m) => [`J'ai vu «${m[1]}» trois fois. S'il vous plaît, faites-en une autre !`, `Vi «${m[1]}» três vezes. Por favor, façam outra!`]],
    [/^Gracias por «(.+)»\. Me acompañó en un año difícil\.$/, (m) => [`Merci pour «${m[1]}». Elle m'a accompagné pendant une année difficile.`, `Obrigado por «${m[1]}». Me acompanhou num ano difícil.`]],
    [/^¿Cuándo vuelve el personaje de «(.+)»\? Mi familia entera lo quiere\.$/, (m) => [`Quand revient le personnage de «${m[1]}» ? Toute ma famille l'adore.`, `Quando volta o personagem de «${m[1]}»? Minha família inteira o adora.`]],
    [/^Les escribo desde (.+): «(.+)» es nuestra favorita\.$/, (m) => [`Je vous écris de ${w(m[1])} : «${m[2]}» est notre préférée.`, `Escrevo de ${w(m[1])}: «${m[2]}» é a nossa favorita.`]],
  ];
  const SEG0 = [
    [/^prefiere (.+) \(rumor\)$/, (m) => [`préfère ${w(m[1])} (rumeur)`, `prefere ${w(m[1])} (rumor)`]],
    [/^pesa más en (.+)$/, (m) => [`compte davantage en ${lista(m[1])}`, `pesa mais em ${lista(m[1])}`]],
    [/^clasificación usual (.+)$/, (m) => [`classification habituelle ${m[1]}`, `classificação usual ${m[1]}`]],
    // Origen de la obra y crónica de la franquicia
    [/^franquicia «([^«»]+)»$/, (m) => [`franchise «${m[1]}»`, `franquia «${m[1]}»`]],
    [/^crossover con («[^·]+»)$/, (m) => [`crossover avec ${m[1]}`, `crossover com ${m[1]}`]],
    [/^Adaptación de «([^«»]+)» \(([^()]+?) de ([^()]+), ([^()]+?)\)$/, (m) => {
      const y = m[4].replace(" a. C.", fr() ? " av. J.-C." : " a.C.");
      return [`Adaptation de «${m[1]}» (${w(m[2])} de ${m[3]}, ${y})`, `Adaptação de «${m[1]}» (${w(m[2])} de ${m[3]}, ${y})`];
    }],
    [/^(Secuela|Precuela|Spin-off|Historia paralela|Remake|Soft reboot|Reboot|Adaptación|Crossover) de «([^«»]+)»$/, (m) => [`${w(m[1])} de «${m[2]}»`, `${w(m[1])} de «${m[2]}»`]],
    [/^(Separada de|Crossover con|Crossover oficial con|Ya no es oficial con) «([^«»]+)» \((-?\d+)\)$/, (m) => {
      const k = ["Separada de", "Crossover con", "Crossover oficial con", "Ya no es oficial con"].indexOf(m[1]);
      return [`${["Séparée de", "Crossover avec", "Crossover officiel avec", "N'est plus officiel avec"][k]} «${m[2]}» (${m[3]})`, `${["Separada de", "Crossover com", "Crossover oficial com", "Já não é oficial com"][k]} «${m[2]}» (${m[3]})`];
    }],
  ];
  const P = SEG0.concat(CITA, [
    [
      /^(.+?) es un estudio (familiar|adulto|serio|de público general) y de clase ([ABC]), especializado en (.+?)\. Su mascota es (.+?)\.$/,
      (m) => [
        `${m[1]} est un studio ${TIPO[m[2]][0]} de classe ${m[3]}, spécialisé dans le genre ${w(m[4])}. Sa mascotte : ${w(m[5])}.`,
        `${m[1]} é um estúdio ${TIPO[m[2]][1]} e de classe ${m[3]}, especializado em ${w(m[4])}. Seu mascote é ${w(m[5])}.`,
      ],
    ],
    [
      /^Tú \((.+?)\) eres el productor ejecutivo mayoritario de todo\. El director creativo suma \+(\S+) de crítica y \+(\S+) de público, el director de arte \+(\S+) de crítica y cada subproductor ejecutivo \(hasta (\d+)\) \+(\S+) de público\. Todos firman en los créditos de cada obra nueva y cobran un sueldo mensual\.$/,
      (m) => [
        `Toi (${m[1]}), tu es le producteur exécutif majoritaire de tout. Le directeur créatif ajoute +${m[2]} de critique et +${m[3]} de public, le directeur artistique +${m[4]} de critique et chaque coproducteur exécutif (jusqu'à ${m[5]}) +${m[6]} de public. Tous signent au générique de chaque nouvelle œuvre et touchent un salaire mensuel.`,
        `Você (${m[1]}) é o produtor executivo majoritário de tudo. O diretor criativo soma +${m[2]} de crítica e +${m[3]} de público, o diretor de arte +${m[4]} de crítica e cada coprodutor executivo (até ${m[5]}) +${m[6]} de público. Todos assinam nos créditos de cada obra nova e recebem um salário mensal.`,
      ],
    ],
    [/^«(.+)» gana el (.+?)\.$/, (m) => [`«${m[1]}» remporte : ${w(m[2])}.`, `«${m[1]}» vence: ${w(m[2])}.`]],
    [/^(.+?): «(.+)» gana\.$/, (m) => [`${w(m[1])} : «${m[2]}» l'emporte.`, `${w(m[1])}: «${m[2]}» vence.`]],
    [/^(.+?) aparta el (.+?) para «(.+)»\.$/, (m) => [`${m[1]} réserve le ${t0(m[2])} pour «${m[3]}».`, `${m[1]} reserva o dia ${t0(m[2])} para «${m[3]}».`]],
    [/^Todo el mundo habla de (.+?)\.?$/, (m) => [`Tout le monde parle de ${w(m[1])}.`, `Todo mundo fala de ${w(m[1])}.`]],
    [/^Se acerca el estreno de «(.+)»: expectativa (\d+)\.?$/, (m) => [`La sortie de «${m[1]}» approche : attente ${m[2]}.`, `A estreia de «${m[1]}» se aproxima: expectativa ${m[2]}.`]],
    [/^(.+?) estrena «(.+)» la misma semana que tu «(.+)»\.$/, (m) => [`${m[1]} sort «${m[2]}» la même semaine que ton œuvre «${m[3]}».`, `${m[1]} estreia «${m[2]}» na mesma semana que a sua «${m[3]}».`]],
    [/^«(.+)» se estrena: crítica (\d+), público (\d+)\.$/, (m) => [`Sortie de «${m[1]}» : critique ${m[2]}, public ${m[3]}.`, `«${m[1]}» estreia: crítica ${m[2]}, público ${m[3]}.`]],
    [/^(.+?) y (.+?) ya no se soportan\.$/, (m) => [`${m[1]} et ${m[2]} ne se supportent plus.`, `${m[1]} e ${m[2]} não se suportam mais.`]],
    [/^Fallece (.+?) \((\d+)-(\d+)\)\. Ya no se puede crear como talento\.$/, (m) => [`Décès de ${m[1]} (${m[2]}-${m[3]}). Il n'est plus possible de le créer comme talent.`, `Morre ${m[1]} (${m[2]}-${m[3]}). Já não é possível criá-lo como talento.`]],
    [/^Se dice que el jurado de (.+?) busca (.+?)\.$/, (m) => [`On dit que le jury du ${w(m[1])} cherche ${w(m[2])}.`, `Dizem que o júri do ${w(m[1])} procura ${w(m[2])}.`]],
    [/^Rumor: el jurado busca (.+?)\.?$/, (m) => [`Rumeur : le jury cherche ${w(m[1])}.`, `Rumor: o júri procura ${w(m[1])}.`]],
    [/^(.+?) transmitió (.+?): (.+?) en anuncios por (.+?) de derechos\.$/, (m) => [`${m[1]} a diffusé ${w(m[2])} : ${m[3]} de publicité pour ${m[4]} de droits.`, `${m[1]} transmitiu ${w(m[2])}: ${m[3]} em anúncios por ${m[4]} de direitos.`]],
    [/^Se estrena el ballet «(.+)»$/, (m) => [`Création du ballet «${w(m[1])}»`, `Estreia o balé «${w(m[1])}»`]],
    [/^Estrena una obra con el tema «(.+)»$/, (m) => [`Sors une œuvre sur le thème «${w(m[1])}»`, `Lance uma obra com o tema «${w(m[1])}»`]],
    [/^«(.+)» de (.+?) (arrasa en taquilla|arrasa en audiencia|arrasa en ventas|llena los teatros|arrasa en las listas|arrasa en las librerías): (.+?) brutos\.$/, (m) => {
      const k = ["arrasa en taquilla", "arrasa en audiencia", "arrasa en ventas", "llena los teatros", "arrasa en las listas", "arrasa en las librerías"].indexOf(m[3]);
      return [
        `«${m[1]}» de ${m[2]} ${["triomphe au box-office", "cartonne à l'audience", "cartonne en ventes", "remplit les théâtres", "domine les classements", "triomphe en librairie"][k]} : ${m[4]} bruts.`,
        `«${m[1]}» de ${m[2]} ${["arrasa nas bilheterias", "arrasa na audiência", "arrasa nas vendas", "lota os teatros", "domina as paradas", "arrasa nas livrarias"][k]}: ${m[4]} brutos.`,
      ];
    }],
    [/^«(.+)» sale de cartelera con (.+?) brutos \((.+?)\)\.$/, (m) => [`«${m[1]}» quitte l'affiche avec ${m[2]} bruts (${m[3]}).`, `«${m[1]}» sai de cartaz com ${m[2]} brutos (${m[3]}).`]],
    [/^«(.+)» termina su producción \((.+?) % de presupuesto\)\.$/, (m) => [`Fin de la production de «${m[1]}» (${m[2]} % de budget).`, `«${m[1]}» termina a produção (${m[2]} % de orçamento).`]],
    [/^«(.+)» termina su producción en (\d+) semana\(s\)\.$/, (m) => [`«${m[1]}» termine sa production dans ${m[2]} semaine(s).`, `«${m[1]}» termina a produção em ${m[2]} semana(s).`]],
    [/^(.+?) te propone una idea: «(.+)»\.?$/, (m) => [`${m[1]} te propose une idée : «${m[2]}».`, `${m[1]} propõe uma ideia a você: «${m[2]}».`]],
    [/^Filtración: dicen que «(.+)» (es mucho mejor de lo esperado|tiene problemas serios|está bien, sin más)\.$/, (m) => {
      const k = ["es mucho mejor de lo esperado", "tiene problemas serios", "está bien, sin más"].indexOf(m[2]);
      return [`Fuite : on dit que «${m[1]}» ${["est bien meilleure que prévu", "a de sérieux problèmes", "est correcte, sans plus"][k]}.`, `Vazamento: dizem que «${m[1]}» ${["é muito melhor do que o esperado", "tem problemas sérios", "está bem, nada mais"][k]}.`];
    }],
    [/^De tus franquicias: (.+)$/, (m) => [`De tes franchises : ${m[1]}`, `Das suas franquias: ${m[1]}`]],
    [/^(.+?) mueve su gran estreno a la misma semana que (.+?)\.$/, (m) => [`${m[1]} déplace sa grande sortie à la même semaine que ${m[2]}.`, `${m[1]} muda sua grande estreia para a mesma semana que ${m[2]}.`]],
    [/^(.+?) mueve «(.+)» al (.+?)\.?$/, (m) => [`${m[1]} déplace «${m[2]}» au ${t0(m[3])}.`, `${m[1]} muda «${m[2]}» para ${t0(m[3])}.`]],
    [/^Personajes?: (.+)$/, (m) => [`Personnages : ${lista(m[1])}`, `Personagens: ${lista(m[1])}`]],
  ]);
  const t0 = trX;
  // Trozos sueltos dentro de una línea con «·»
  const SEG = SEG0.concat([[/^estreno (.+)$/, (m) => [`sortie ${t0(m[1])}`, `estreia ${t0(m[1])}`]]]);
  const regla = (L, k) => {
    for (const [re, f] of L) {
      const m = k.match(re);
      if (m) return f(m)[fr() ? 0 : 1];
    }
    return null;
  };
  // Prefijo de fecha de la crónica («2012 S1 · », «dic 2011 · »): se traduce aparte y el resto pasa por las reglas
  const PRE = /^((?:\d{4} S\d+|[A-Za-zÀ-ÿ]{3,5}\.? \d{4}) · )(.+)$/;
  trX = function (t) {
    if (!XDIC() || !t) return t0.apply(this, arguments);
    const k = t.trim();
    const pm = k.match(PRE);
    if (pm) {
      const q = regla(P, pm[2]);
      if (q != null) return t.replace(k, t0(pm[1].replace(/ · $/, "")) + " · " + q);
    }
    let r = regla(P, k);
    if (r != null) return t.replace(k, r);
    // Citas entre comillas: «…»
    const cm = k.match(/^«(.+)»$/);
    if (cm && /«/.test(cm[1])) {
      const q = regla(CITA, cm[1]);
      if (q != null) return t.replace(k, "«" + q + "»");
    }
    r = t0.apply(this, arguments);
    if (/ · /.test(r)) {
      const s = r
        .split(" · ")
        .map((x) => regla(SEG, x.trim()) || x)
        .join(" · ");
      if (s != r) return s;
    }
    // Listas separadas por comas (etiquetas, regiones, personajes): se traduce cada elemento
    if (r === t && /, /.test(k) && k.length < 1200) {
      const pre = (k.match(/^[·\s]*/) || [""])[0],
        L = k.slice(pre.length).split(", ");
      if (L.length >= 2 && L.every((x) => x.length < 60 && !/[.;:!?]$/.test(x))) {
        let n = 0;
        const out = L.map((x) => {
          const y = w(x);
          if (y != x) n++;
          return y;
        });
        if (n * 2 >= L.length) return t.replace(k, pre + out.join(", "));
      }
    }
    return r;
  };
})();
