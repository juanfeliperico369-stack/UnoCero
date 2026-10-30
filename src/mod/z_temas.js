// ===== Más temas: amor y desamor, canciones de la vida, vida cotidiana, el mundo de hoy, aventura y misterio =====
// Se agregan al final de la lista para que los temas ya elegidos conserven su lugar
(() => {
  // [grupo, [[español, inglés, francés, portugués], …]]
  const G = [
    [
      ["Amor y desamor", "Love and heartbreak", "Amour et chagrin", "Amor e desamor"],
      [
        ["Desamor", "Heartbreak", "Chagrin d'amour", "Desamor"],
        ["Primer amor", "First love", "Premier amour", "Primeiro amor"],
        ["Amor no correspondido", "Unrequited love", "Amour non partagé", "Amor não correspondido"],
        ["Amor a distancia", "Long-distance love", "Amour à distance", "Amor à distância"],
        ["Amor prohibido", "Forbidden love", "Amour interdit", "Amor proibido"],
        ["Celos", "Jealousy", "Jalousie", "Ciúme"],
        ["Deseo", "Desire", "Désir", "Desejo"],
        ["Seducción", "Seduction", "Séduction", "Sedução"],
        ["Infidelidad", "Infidelity", "Infidélité", "Infidelidade"],
        ["Ruptura", "Breakup", "Rupture", "Término"],
        ["Reconciliación", "Reconciliation", "Réconciliation", "Reconciliação"],
        ["Bodas", "Weddings", "Mariages", "Casamentos"],
        ["Divorcio", "Divorce", "Divorce", "Divórcio"],
        ["Amor maduro", "Love later in life", "Amour tardif", "Amor maduro"],
      ],
    ],
    [
      ["Canciones de la vida", "Songs of life", "Chansons de la vie", "Canções da vida"],
      [
        ["Nostalgia", "Nostalgia", "Nostalgie", "Nostalgia"],
        ["Melancolía", "Melancholy", "Mélancolie", "Melancolia"],
        ["Euforia", "Euphoria", "Euphorie", "Euforia"],
        ["Fiesta y noche", "Parties and nightlife", "Fête et nuit", "Festa e noite"],
        ["Baile", "Dance", "Danse", "Dança"],
        ["Verano", "Summer", "Été", "Verão"],
        ["Juventud perdida", "Lost youth", "Jeunesse perdue", "Juventude perdida"],
        ["Ciudad natal", "Hometown", "Ville natale", "Cidade natal"],
        ["El barrio", "The neighborhood", "Le quartier", "O bairro"],
        ["La carretera", "The open road", "La route", "A estrada"],
        ["Vida de gira", "Life on tour", "Vie de tournée", "Vida de turnê"],
        ["Fama y excesos", "Fame and excess", "Gloire et excès", "Fama e excessos"],
        ["Autoestima", "Self-esteem", "Estime de soi", "Autoestima"],
        ["Empoderamiento", "Empowerment", "Émancipation", "Empoderamento"],
        ["Superación", "Overcoming", "Dépassement de soi", "Superação"],
        ["Orgullo", "Pride", "Fierté", "Orgulho"],
        ["Canción protesta", "Protest song", "Chanson engagée", "Canção de protesto"],
        ["Desahogo", "Letting it all out", "Exutoire", "Desabafo"],
        ["Gratitud", "Gratitude", "Gratitude", "Gratidão"],
        ["Despedida", "Farewell", "Adieu", "Despedida"],
        ["Reencuentro", "Reunion", "Retrouvailles", "Reencontro"],
        ["Raíces", "Roots", "Racines", "Raízes"],
        ["Patria", "Homeland", "Patrie", "Pátria"],
      ],
    ],
    [
      ["Vida cotidiana", "Everyday life", "Vie quotidienne", "Vida cotidiana"],
      [
        ["Rutina", "Routine", "Routine", "Rotina"],
        ["Mudanzas", "Moving house", "Déménagements", "Mudanças"],
        ["Vecinos", "Neighbors", "Voisins", "Vizinhos"],
        ["Compañeros de piso", "Roommates", "Colocataires", "Colegas de apartamento"],
        ["Vida en pareja", "Life as a couple", "Vie de couple", "Vida a dois"],
        ["Maternidad", "Motherhood", "Maternité", "Maternidade"],
        ["Paternidad", "Fatherhood", "Paternité", "Paternidade"],
        ["Adopción", "Adoption", "Adoption", "Adoção"],
        ["Abuelos", "Grandparents", "Grands-parents", "Avós"],
        ["Cocina y comida", "Food and cooking", "Cuisine et repas", "Comida e cozinha"],
        ["Jubilación", "Retirement", "Retraite", "Aposentadoria"],
        ["Herencias", "Inheritances", "Héritages", "Heranças"],
        ["Enfermedad", "Illness", "Maladie", "Doença"],
        ["Cuidar a los nuestros", "Caring for loved ones", "Prendre soin des siens", "Cuidar dos nossos"],
      ],
    ],
    [
      ["El mundo de hoy", "Today's world", "Le monde d'aujourd'hui", "O mundo de hoje"],
      [
        ["Redes sociales", "Social media", "Réseaux sociaux", "Redes sociais"],
        ["Influencers", "Influencers", "Influenceurs", "Influenciadores"],
        ["Teletrabajo", "Remote work", "Télétravail", "Trabalho remoto"],
        ["Pandemias", "Pandemics", "Pandémies", "Pandemias"],
        ["Cambio climático", "Climate change", "Changement climatique", "Mudança climática"],
        ["Crisis de vivienda", "Housing crisis", "Crise du logement", "Crise de moradia"],
        ["Noticias falsas", "Fake news", "Fausses nouvelles", "Notícias falsas"],
        ["Criptomonedas", "Cryptocurrencies", "Cryptomonnaies", "Criptomoedas"],
        ["Gentrificación", "Gentrification", "Gentrification", "Gentrificação"],
        ["Privacidad", "Privacy", "Vie privée", "Privacidade"],
        ["Consumismo", "Consumerism", "Consumérisme", "Consumismo"],
        ["Salud mental", "Mental health", "Santé mentale", "Saúde mental"],
        ["Diversidad", "Diversity", "Diversité", "Diversidade"],
        ["Feminismo", "Feminism", "Féminisme", "Feminismo"],
        ["Derechos LGBTQ+", "LGBTQ+ rights", "Droits LGBTQ+", "Direitos LGBTQ+"],
      ],
    ],
    [
      ["Aventura y misterio", "Adventure and mystery", "Aventure et mystère", "Aventura e mistério"],
      [
        ["Tesoros perdidos", "Lost treasures", "Trésors perdus", "Tesouros perdidos"],
        ["Mapas y expediciones", "Maps and expeditions", "Cartes et expéditions", "Mapas e expedições"],
        ["Islas desiertas", "Desert islands", "Îles désertes", "Ilhas desertas"],
        ["Naufragios", "Shipwrecks", "Naufrages", "Naufrágios"],
        ["Atracos", "Heists", "Braquages", "Assaltos"],
        ["Espías", "Spies", "Espions", "Espiões"],
        ["Conspiraciones", "Conspiracies", "Complots", "Conspirações"],
        ["Sociedades secretas", "Secret societies", "Sociétés secrètes", "Sociedades secretas"],
        ["Enigmas", "Riddles", "Énigmes", "Enigmas"],
        ["Fugas", "Escapes", "Évasions", "Fugas"],
        ["Duelos", "Duels", "Duels", "Duelos"],
        ["Cazarrecompensas", "Bounty hunters", "Chasseurs de primes", "Caçadores de recompensas"],
      ],
    ],
  ];
  const ya = new Set(DX.tm),
    tr = [];
  G.forEach(([g, L]) => {
    const n = L.filter((x) => !ya.has(x[0]));
    if (!n.length) return;
    TXTM.push([g[0], n.map((x) => x[0])]);
    n.forEach((x) => DX.tm.push(x[0]));
    tr.push(g, ...n);
  });
  E40L(tr.map((x) => [x[0], x[1]]));
  // Categorías del buscador de temas: también para los grupos que se sumaron después de armarlas
  Object.assign(GTAG, {
    "Religiones y espiritualidad": 14,
    "Cultos y crimen": 7,
    "Fe, cultos y crimen": 14,
    Animales: 13,
    "Política": 8,
    "Amor y desamor": 5,
    "Canciones de la vida": 12,
    "Vida cotidiana": 4,
    "El mundo de hoy": 8,
    "Aventura y misterio": 10,
  });
  const grupoDe = {};
  TXTM.forEach(([g, L]) => L.forEach((x) => (grupoDe[x] = grupoDe[x] || g)));
  for (let i = ETX.tm.length; i < DX.tm.length; i++) {
    const g = GTAG[grupoDe[DX.tm[i]]];
    ETX.tm.push(etqDe(DX.tm[i], g != null ? g : null));
  }
  // Lo mismo para los subgéneros agregados después (política, fe, cultos y animales)
  const sbDe = {};
  TXSB.forEach((f) => f[1].forEach((x) => (sbDe[x] = sbDe[x] || f)));
  for (let i = ETX.sb.length; i < DX.sb.length; i++) {
    const f = sbDe[DX.sb[i]],
      g = !f ? null : GTAG[f[0]] != null ? GTAG[f[0]] : f[2] != null ? (f[2] >= 0 ? ETQE[f[2]] : 12) : null;
    ETX.sb.push(etqDe(DX.sb[i], g));
  }
  if (typeof DIC_FR == "undefined") return;
  tr.concat([
    ["Si el disco cuenta una historia, márcalo como álbum conceptual y elige aquí su arco narrativo.", "", "Si le disque raconte une histoire, marque-le comme album concept et choisis ici son arc narratif.", "Se o disco conta uma história, marque-o como álbum conceitual e escolha aqui o seu arco narrativo."],
  ]).forEach(([e, , f, p]) => {
    DIC_FR[e] = DIC_FR[e] || f;
    DIC_PT[e] = DIC_PT[e] || p;
  });
})();
// Traducciones que cambiaban al traducirse otra vez (el observador de la pantalla las repetía sin fin o las dejaba a medias)
(() => {
  if (typeof DIC_FR == "undefined") return;
  [
    ["-# sem", "-# sem", "-# sem"],
    ["−# sem", "−# sem", "−# sem"],
    ["Vie", "Vie", null],
    ["Ancha", null, "Ampla"],
    ["novela corta", null, "novela curta"],
    ["Novela corta", null, "Novela curta"],
    ["Você compra a rede", null, "Você compra a rede"],
    ["Seu canal compra a exclusiva", null, "Seu canal compra a exclusiva"],
    ["Seu canal compra a exclusiva:", null, "Seu canal compra a exclusiva:"],
  ].forEach(([e, f, p]) => {
    if (f != null) DIC_FR[e] = f;
    if (p != null) DIC_PT[e] = p;
  });
  const k = "Un pueblo entero se levanta contra el comendador que abusa de todos y, ante el juez, cada vecino responde lo mismo: «Fuenteovejuna lo hizo».";
  if (DIC_FR[k]) DIC_FR[k] = DIC_FR[k].replace("«Fuenteovejuna lo hizo»", "«C'est Fuenteovejuna»");
  if (DIC_PT[k]) DIC_PT[k] = DIC_PT[k].replace("«Fuenteovejuna lo hizo»", "«Foi Fuenteovejuna»");
})();
