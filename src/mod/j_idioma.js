// ===== Francés y portugués: traducción de la interfaz sobre el texto en español =====
const XDIC = () => (CFG.idi == "fr" && typeof DIC_FR != "undefined" ? DIC_FR : CFG.idi == "pt" && typeof DIC_PT != "undefined" ? DIC_PT : null);
const X2C = new Map();
const XRE = /[$€£]?\d[\d.,]*\s?[KMB%]?(?![a-záéíóú])/g;
function xl(D, y) {
  if (D[y] != null) return D[y];
  const m = y.match(/^([\s,.;()·▲▼★✓●🔥✂]*)([\s\S]*?)([\s,.;()★✓●🔥✂]*)$/),
    core = m[2];
  if (core !== y && D[core] != null) return m[1] + D[core] + m[3];
  const N = [],
    k = core.replace(XRE, (x) => (N.push(x), "#"));
  if (N.length && D[k] != null) {
    let i = 0;
    return m[1] + D[k].replace(/#/g, () => (N[i] != null ? N[i++] : "")) + m[3];
  }
  return null;
}
const XNUM = { años: 1, año: 1, semanas: 1, semana: 1, meses: 1, mes: 1, obras: 1, integrantes: 1, días: 1, opciones: 1, talentos: 1 };
let trX = function (t) {
  const D = XDIC();
  if (!D || !t || !/[A-Za-zÁÉÍÓÚÑáéíóúñü]/.test(t)) return t;
  const c = X2C.get(t);
  if (c != null) return c;
  const a = t.match(/^\s*/)[0],
    z = t.match(/\s*$/)[0],
    k = t.trim();
  let r = xl(D, k);
  if (r == null) {
    const m = k.match(/^(.*?)([:.…!?]+|\s?\(\d+\)|\s\d+\/\d+)$/);
    if (m && D[m[1]] != null) r = D[m[1]] + m[2];
  }
  if (r == null && /( · |: | \/ |, | — | → )/.test(k)) {
    const P = k.split(/( · |: | \/ | — | → )/);
    let n = 0;
    const q = P.map((x, i) => {
      if (i % 2) return x == ": " && CFG.idi == "fr" && !/\s$/.test(P[i - 1]) ? " : " : x;
      const y = x.trim(),
        v = y ? xl(D, y) : null;
      if (v != null) {
        n++;
        return x.replace(y, v);
      }
      return x.replace(/^(\d[\d.,]*) (\S+)$/, (mm, nn, w) => (XNUM[w] && D[w] ? (n++, nn + " " + D[w]) : mm));
    });
    if (n) r = q.join("");
  }
  if (r == null) {
    const m = k.match(/^(\d[\d.,]*) (\S+)$/);
    if (m && D[m[2]] != null) r = m[1] + " " + D[m[2]];
  }
  if (r == null) {
    const m = k.match(/^([+\-−]?\d[\d.,]*\s?%?) (.+)$/);
    if (m && D[m[2]] != null) r = m[1] + " " + D[m[2]];
  }
  r = r == null ? t : a + r + z;
  if (X2C.size > 30000) X2C.clear();
  X2C.set(t, r);
  return r;
};
function trXNodo(n) {
  if (!XDIC()) return;
  if (n.nodeType == 3) {
    const v = trX(n.nodeValue);
    if (v != n.nodeValue) n.nodeValue = v;
    return;
  }
  if (n.nodeType != 1 || n.tagName == "SCRIPT" || n.tagName == "STYLE" || n.tagName == "TEXTAREA") return;
  const at = (x) =>
    ["placeholder", "aria-label", "title"].forEach((a) => {
      const v = x.getAttribute && x.getAttribute(a);
      if (v) {
        const w = trX(v);
        if (w != v) x.setAttribute(a, w);
      }
    });
  at(n);
  const it = document.createTreeWalker(n, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let x = it.nextNode();
  while (x) {
    if (x.nodeType == 3) {
      const v = trX(x.nodeValue);
      if (v != x.nodeValue) x.nodeValue = v;
    } else at(x);
    x = it.nextNode();
  }
}
const XOBS =
  typeof MutationObserver != "undefined"
    ? new MutationObserver((L) => {
        if (!XDIC()) return;
        L.forEach((m) => {
          if (m.type == "characterData") trXNodo(m.target);
          else m.addedNodes.forEach(trXNodo);
        });
      })
    : null;
function idiomaX() {
  if (!XOBS || !document.body) return;
  XOBS.disconnect();
  X2C.clear();
  if (XDIC()) {
    document.documentElement.lang = CFG.idi;
    XOBS.observe(document.body, { childList: true, subtree: true, characterData: true });
    trXNodo(document.body);
  }
}
if (typeof CanvasRenderingContext2D != "undefined") {
  const f1 = CanvasRenderingContext2D.prototype.fillText,
    m1 = CanvasRenderingContext2D.prototype.measureText;
  CanvasRenderingContext2D.prototype.fillText = function (t, x, y, w) {
    const s = XDIC() ? trX(String(t)) : t;
    return w == null ? f1.call(this, s, x, y) : f1.call(this, s, x, y, w);
  };
  CanvasRenderingContext2D.prototype.measureText = function (t) {
    return m1.call(this, XDIC() ? trX(String(t)) : t);
  };
}
ACT["cfgi"] = (v) => {
  CFG.idi = ["en", "fr", "pt"].includes(v) ? v : "es";
  IDI = CFG.idi == "en" ? "en" : "es";
  cfgSv();
  TRCX.clear();
  idiomaIni();
  idiomaX();
  if (S) {
    pg();
    ajM();
  } else mn();
};
// Botones FR y PT en la portada
function heroIdiX() {
  const h = document.querySelector(".hero-idi");
  if (!h || h.querySelector('[data-v="fr"]')) return;
  h.querySelectorAll(".ch.idi").forEach((b) => b.classList.toggle("on", b.dataset.v == (CFG.idi || "es")));
  [
    ["fr", "FR", "Français"],
    ["pt", "PT", "Português"],
  ].forEach(([v, l, n]) => {
    const b = document.createElement("button");
    b.className = "ch idi" + (CFG.idi == v ? " on" : "");
    b.dataset.a = "cfgi";
    b.dataset.v = v;
    b.dataset.l = l;
    b.setAttribute("aria-label", n);
    h.appendChild(b);
  });
}
if (typeof MutationObserver != "undefined")
  new MutationObserver(() => {
    if (!S) heroIdiX();
  }).observe(document.getElementById("app"), { childList: true });
setTimeout(() => {
  heroIdiX();
  idiomaX();
}, 0);
(() => {
  const M = "ene,feb,mar,abr,may,jun,jul,ago,sep,oct,nov,dic".split(","),
    F = "janv,févr,mars,avr,mai,juin,juil,août,sept,oct,nov,déc".split(","),
    P = "jan,fev,mar,abr,mai,jun,jul,ago,set,out,nov,dez".split(",");
  if (typeof DIC_FR == "undefined") return;
  Object.assign(DIC_FR, { Evento: "Événement", Saltar: "Sauter", "+1 sem": "+1 sem", "toca: dólares de hoy": "touche : dollars d'aujourd'hui", "Hasta un evento": "Jusqu'à un événement" });
  Object.assign(DIC_PT, { Evento: "Evento", Saltar: "Pular", "toca: dólares de hoy": "toque: dólares de hoje", "Hasta un evento": "Até um evento" });
  M.forEach((m, i) => {
    DIC_FR[m] = DIC_FR[m] || F[i];
    DIC_PT[m] = DIC_PT[m] || P[i];
  });
  const re = /^(\d{1,2})(?:\s?[–-]\s?(\d{1,2}))? (ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)$/;
  const trX0 = trX;
  trX = function (t) {
    const D = XDIC();
    if (D && t) {
      const k = t.trim(),
        m = k.match(/^(\d{1,2} \S+) [–-] (\d{1,2} \S+)$/);
      if (m) return t.replace(k, [m[1], m[2]].map((x) => x.replace(/\S+$/, (w) => D[w] || w)).join(" – "));
      if (re.test(k)) return t.replace(k, k.replace(/\S+$/, (w) => D[w] || w));
    }
    return trX0(t);
  };
})();
// Frases con nombres propios: se traduce la plantilla y se respetan los nombres
(() => {
  if (typeof DIC_FR == "undefined") return;
  const P = [
    [/^(.+?) se retira a los (\d+) años\.?$/, "$1 prend sa retraite à $2 ans", "$1 se aposenta aos $2 anos"],
    [/^(.+?) vuelve del retiro\.?$/, "$1 sort de sa retraite", "$1 volta da aposentadoria"],
    [/^(.+?) muere a los (\d+) años\.?$/, "$1 meurt à $2 ans", "$1 morre aos $2 anos"],
    [/^(.+?) gana la ventaja «(.+)»\.?$/, "$1 obtient l'atout «$2»", "$1 ganha a vantagem «$2»"],
    [/^(.+?) ofrece comprar la franquicia «(.+)»\.?$/, "$1 propose de racheter la franchise «$2»", "$1 oferece comprar a franquia «$2»"],
    [/^(.+?) se reestructura tras un mal año\.?$/, "$1 se restructure après une mauvaise année", "$1 se reestrutura após um ano ruim"],
    [/^(.+?) compra a (.+?)\.?$/, "$1 rachète $2", "$1 compra $2"],
    [/^(.+?) te propone una idea\.?$/, "$1 te propose une idée", "$1 propõe uma ideia a você"],
    [/^comprado por (.+?) en (\d+)$/, "racheté par $1 en $2", "comprado por $1 em $2"],
    [/^quebró en (\d+)$/, "a fait faillite en $1", "faliu em $1"],
    [/^Termina la producción de «(.+)»\.?$/, "Fin de la production de «$1»", "Termina a produção de «$1»"],
    [/^Estadísticas de (.+)$/, "Statistiques de $1", "Estatísticas de $1"],
    [/^Festival de (.+)$/, "Festival de $1", "Festival de $1"],
    [/^nivel (\d+)$/, "niveau $1", "nível $1"],
    [/^Siglo ([IVXL]+)$/, "$1e siècle", "Século $1"],
    [/^siglo ([IVXL]+)$/, "$1e siècle", "século $1"],
    [/^(.+?), la saga continúa» de (.+)$/, "$1, la saga continue» de $2", "$1, a saga continua» de $2"],
  ];
  Object.assign(DIC_FR, { "Países Bajos": "Pays-Bas", "Islas Salomón": "Îles Salomon", "República Dominicana": "République dominicaine", Melancólico: "Mélancolique", Nómada: "Nomade", Nazismo: "Nazisme", Fusión: "Fusion", "Fusión entre rivales": "Fusion entre rivaux", "Estrena una obra de teatro": "Monte une pièce de théâtre", "anacrónico para esa época": "anachronique pour l'époque", "Franquicias de rivales que cerraron, a precio de remate": "Franchises de rivaux disparus, à prix bradé", "Asociación de Exhibidores": "Association des exploitants", "Blog de enlaces": "Blog de liens" });
  Object.assign(DIC_PT, { "Países Bajos": "Países Baixos", "Islas Salomón": "Ilhas Salomão", "República Dominicana": "República Dominicana", Melancólico: "Melancólico", Nómada: "Nômade", Nazismo: "Nazismo", Fusión: "Fusão", "Fusión entre rivales": "Fusão entre rivais", "Estrena una obra de teatro": "Estreia uma peça de teatro", "anacrónico para esa época": "anacrônico para a época", "Franquicias de rivales que cerraron, a precio de remate": "Franquias de rivais que fecharam, a preço de liquidação", "Asociación de Exhibidores": "Associação de Exibidores", "Blog de enlaces": "Blog de links" });
  const N = {
    fr: [["Audiencia focal", "Public cible"], ["Afición", "Passion"], ["Cultura", "Culture"], ["Ninguna", "Aucune"], ["Comunidad LGBTQ+", "Communauté LGBTQ+"], ["Cinéfilos", "Cinéphiles"], ["Seriéfilos", "Sériephiles"], ["Gamers", "Gamers"], ["Teatrófilos", "Amateurs de théâtre"], ["Melómanos", "Mélomanes"], ["Bibliófilos", "Bibliophiles"], ["Afinar a quién le hablas: rinde más con ese público y un poco menos con el resto.", "Cible ton public : l'œuvre rapporte plus auprès de lui et un peu moins auprès des autres."], ["Biblioteca de clásicos", "Bibliothèque des classiques"], ["Otra obra", "Autre œuvre"], ["Adaptar", "Adapter"], ["Adaptaciones conocidas", "Adaptations connues"], ["Cronología del estudio", "Chronologie du studio"], ["Estado anual", "Bilan annuel"], ["Patrimonio", "Patrimoine net"], ["Valor estimado del catálogo", "Valeur estimée du catalogue"], ["Caza de copias", "Chasse aux copies"], ["Golpes de audiencia", "Coups d'audience"], ["Crecer el catálogo", "Agrandir le catalogue"], ["Carrera de caballos", "Course de chevaux"], ["Póker de dados", "Poker d'as"], ["Rasca y gana del estreno", "Ticket à gratter de la première"], ["Firmar artista o agrupación", "Signer un artiste ou un groupe"], ["Encargo automático", "Commande automatique"], ["Encargo detallado", "Commande détaillée"], ["Elegir estudio…", "Choisir un studio…"], ["Proponer una exclusiva", "Proposer une exclusivité"], ["Oferta recibida", "Offre reçue"], ["Parte que cedes", "Part cédée"], ["Elegir franquicias", "Choisir des franchises"], ["Elegir temas", "Choisir des thèmes"], ["Cambiar temas", "Changer de thèmes"], ["Buscar…", "Rechercher…"], ["Listo", "Terminé"], ["Cancelar", "Annuler"], ["Minimalista", "Minimaliste"], ["Múltiple formato", "Formats multiples"], ["Escaleta", "Séquencier"], ["Atmósfera", "Atmosphère"], ["Escenas para imaginar", "Scènes à imaginer"], ["Preguntas abiertas", "Questions ouvertes"]],
    pt: [["Audiencia focal", "Público-alvo"], ["Afición", "Paixão"], ["Cultura", "Cultura"], ["Ninguna", "Nenhuma"], ["Comunidad LGBTQ+", "Comunidade LGBTQ+"], ["Cinéfilos", "Cinéfilos"], ["Seriéfilos", "Seriemaníacos"], ["Gamers", "Gamers"], ["Teatrófilos", "Amantes do teatro"], ["Melómanos", "Melômanos"], ["Bibliófilos", "Bibliófilos"], ["Afinar a quién le hablas: rinde más con ese público y un poco menos con el resto.", "Escolha com quem você fala: rende mais com esse público e um pouco menos com o resto."], ["Biblioteca de clásicos", "Biblioteca de clássicos"], ["Otra obra", "Outra obra"], ["Adaptar", "Adaptar"], ["Adaptaciones conocidas", "Adaptações conhecidas"], ["Cronología del estudio", "Cronologia do estúdio"], ["Estado anual", "Balanço anual"], ["Patrimonio", "Patrimônio"], ["Valor estimado del catálogo", "Valor estimado do catálogo"], ["Caza de copias", "Caça às cópias"], ["Golpes de audiencia", "Golpes de audiência"], ["Crecer el catálogo", "Ampliar o catálogo"], ["Carrera de caballos", "Corrida de cavalos"], ["Póker de dados", "Pôquer de dados"], ["Rasca y gana del estreno", "Raspadinha da estreia"], ["Firmar artista o agrupación", "Contratar artista ou grupo"], ["Encargo automático", "Encomenda automática"], ["Encargo detallado", "Encomenda detalhada"], ["Elegir estudio…", "Escolher estúdio…"], ["Proponer una exclusiva", "Propor uma exclusividade"], ["Oferta recibida", "Oferta recebida"], ["Parte que cedes", "Parte cedida"], ["Elegir franquicias", "Escolher franquias"], ["Elegir temas", "Escolher temas"], ["Cambiar temas", "Trocar temas"], ["Buscar…", "Buscar…"], ["Listo", "Pronto"], ["Cancelar", "Cancelar"], ["Minimalista", "Minimalista"], ["Múltiple formato", "Múltiplos formatos"], ["Escaleta", "Escaleta"], ["Atmósfera", "Atmosfera"], ["Escenas para imaginar", "Cenas para imaginar"], ["Preguntas abiertas", "Perguntas abertas"]],
  };
  N.fr.forEach(([a, b]) => DIC_FR[a] == null && (DIC_FR[a] = b));
  N.pt.forEach(([a, b]) => DIC_PT[a] == null && (DIC_PT[a] = b));
  const trXP = trX;
  trX = function (t) {
    const r = trXP(t);
    if (r !== t || !XDIC() || !t) return r;
    const k = t.trim(),
      i = CFG.idi == "fr" ? 1 : 2;
    for (const p of P) if (p[0].test(k)) return t.replace(k, k.replace(p[0], p[i]));
    return r;
  };
})();
(() => {
  if (typeof DIC_FR == "undefined") return;
  const MS = "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre".split(","),
    MF = "janvier,février,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre".split(","),
    MP = "janeiro,fevereiro,março,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro".split(",");
  DIC_FR["Dirige tu estudio de cine, TV, videojuegos, teatro, música y libros, de 1700 a 2300."] = "Dirige ton studio de cinéma, TV, jeux vidéo, théâtre, musique et livres, de 1700 à 2300.";
  DIC_PT["Dirige tu estudio de cine, TV, videojuegos, teatro, música y libros, de 1700 a 2300."] = "Comande seu estúdio de cinema, TV, videogames, teatro, música e livros, de 1700 a 2300.";
  const trXH = trX;
  trX = function (t) {
    if (XDIC() && t) {
      const m = t.trim().match(/^(Hoy es )?(\d{1,2}) de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)( de (\d{3,4}))?(\.?)$/);
      if (m) {
        const fr = CFG.idi == "fr",
          j = MS.indexOf(m[3]),
          d = fr ? m[2] + " " + MF[j] + (m[5] ? " " + m[5] : "") : m[2] + " de " + MP[j] + (m[5] ? " de " + m[5] : "");
        return t.replace(t.trim(), (m[1] ? (fr ? "Nous sommes le " : "Hoje é ") : "") + d + m[6]);
      }
    }
    return trXH(t);
  };
})();
// Listas separadas por comas: se traduce cada elemento
(() => {
  const trXL = trX;
  trX = function (t) {
    const r = trXL(t),
      D = XDIC();
    if (!D || !t || !/, /.test(t) || t.length > 200) return r;
    const base = r !== t ? r : t,
      k = base.trim(),
      P = k.split(/(, | y | e | et | · )/);
    let n = 0;
    const o = P.map((x, i) => {
      if (i % 2) return x == " y " ? (CFG.idi == "fr" ? " et " : " e ") : x;
      const v = xl(D, x.trim());
      if (v != null) {
        n++;
        return x.replace(x.trim(), v);
      }
      return x;
    });
    return n ? base.replace(k, o.join("")) : r;
  };
})();
// Claves que terminan en «: » o con espacio: también valen recortadas
(() => {
  if (typeof DIC_FR == "undefined") return;
  [DIC_FR, DIC_PT].forEach((D) =>
    Object.keys(D).forEach((k) => {
      const t = k.replace(/[:\s]+$/, "");
      if (t && t != k && D[t] == null) D[t] = String(D[k]).replace(/[:\s]+$/, "");
    }),
  );
})();
// Títulos numerados («2. Qué datos recogemos») y textos con fecha de vigencia
(() => {
  const trXN = trX;
  trX = function (t) {
    const r = trXN(t),
      D = XDIC();
    if (r !== t || !D || !t) return r;
    const k = t.trim(),
      m = k.match(/^(\d+\.\s+)(.+)$/);
    if (m) {
      const v = xl(D, m[2]);
      if (v != null) return t.replace(k, m[1] + v);
    }
    const f = k.match(/^Versión ([\d.]+) · vigente desde el (.+)$/);
    if (f) return t.replace(k, (CFG.idi == "fr" ? "Version " + f[1] + " · en vigueur depuis le " : "Versão " + f[1] + " · em vigor desde ") + trX(f[2]));
    return r;
  };
})();
