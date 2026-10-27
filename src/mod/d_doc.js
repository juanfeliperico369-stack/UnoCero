// ===== Documento de la idea: portada, índice, atmósfera, escaleta, escenas y preguntas abiertas =====
const DOCAT = [
  [/Terror|Suspenso|Thriller/, ["pasillos que crujen", "una luz que parpadea", "el silencio justo antes del golpe", "puertas entreabiertas", "respiraciones contenidas"]],
  [/Romance|Erótico/, ["miradas que duran un segundo de más", "cartas sin enviar", "lluvia en una ventana", "una canción que vuelve", "manos que casi se tocan"]],
  [/Comedia|Parodia|Sátira/, ["malentendidos en cadena", "un plan que sale peor de lo previsto", "personajes que se creen más listos de lo que son", "ritmo rápido", "silencios incómodos"]],
  [/Ciencia ficción|Distop/, ["máquinas que zumban", "ciudades verticales", "pantallas que vigilan", "cielos de otro color", "una tecnología con un precio oculto"]],
  [/Fantasía|Mitolog/, ["bosques con memoria", "un objeto antiguo que despierta", "reglas mágicas con costo", "criaturas que no son lo que parecen", "un mapa incompleto"]],
  [/Acción|Aventura|Bélico|Épico/, ["persecuciones contra el reloj", "polvo, sudor y metal", "un lugar imposible de cruzar", "alianzas forzadas", "una cuenta regresiva"]],
  [/Drama|Biograf|Histórico/, ["comidas familiares tensas", "decisiones que no tienen vuelta atrás", "objetos con historia", "el paso del tiempo en las caras", "una verdad que nadie dice"]],
  [/Musical|Música/, ["un escenario vacío que se llena", "ensayos que salen mal", "una melodía que une a extraños", "aplausos que tardan", "la primera nota"]],
  [/Infantil|Familiar|Animación/, ["colores intensos", "un amigo inesperado", "una lección que se descubre jugando", "un hogar que hay que proteger", "risas compartidas"]],
  [/Crimen|Policial|Negro|Misterio|Investig/, ["humo y neón", "una pista que todos pasaron por alto", "interrogatorios a media luz", "coartadas que no cuadran", "una ciudad que oculta algo"]],
  [/Político|Política/, ["despachos con puertas dobles", "discursos que dicen lo contrario de lo que piensan", "votos comprados", "periodistas incómodos", "una foto que lo cambia todo"]],
];
const DOCQ = [
  "¿Qué pierde el protagonista si gana?",
  "¿Qué sabe el público que los personajes todavía no saben?",
  "¿Qué imagen debería recordar alguien diez años después?",
  "¿Quién tiene razón en el conflicto, si es que alguien la tiene?",
  "¿Qué pasaría si el antagonista contara la historia?",
  "¿Qué se queda sin explicar para que el público lo imagine?",
  "¿Cuál es el sonido de esta historia?",
  "¿Qué cambia en el mundo de la obra entre la primera y la última escena?",
];
const DOCE = [
  "Una escena de apertura en la que el mundo se muestra sin palabras.",
  "El momento en que el protagonista decide que ya no puede volver atrás.",
  "Un encuentro entre dos personajes que nunca deberían haberse conocido.",
  "Una escena tranquila justo antes del gran golpe.",
  "El instante en que una mentira sale a la luz.",
  "Un lugar que vuelve al final, pero ya no se ve igual.",
  "Una última imagen que responde a la primera.",
];
function docAtm(d) {
  const g = (d.gn || []).join(" ") + " " + (d.sb || []).join(" "),
    L = [];
  DOCAT.forEach(([re, w]) => re.test(g) && L.push(...w));
  if (!L.length) L.push(...DOCAT[6][1]);
  const h = hs((d.t || "") + "atm"),
    r = mb(h);
  return uniq(L.sort(() => r() - 0.5)).slice(0, 6);
}
function docPick(L, n, sd) {
  const r = mb(hs(sd));
  return L.slice()
    .sort(() => r() - 0.5)
    .slice(0, n);
}
function docPoster() {
  try {
    if (typeof W == "undefined" || !W) return "";
    const cv = document.createElement("canvas");
    cv.width = 360;
    cv.height = 540;
    const c = cv.getContext("2d");
    if (W.cv40 && typeof cov41 == "function") cov41(c, 360, 540, W.cv40, W.nm || "", W.m);
    else pst(c, 360, 540, Object.assign(wP(), { n: W.nm || "", y: yr() }));
    return cv.toDataURL("image/jpeg", 0.85);
  } catch (e) {
    return "";
  }
}
const docHTML5 = docHTML;
docHTML = function (d, word, modo) {
  let s = docHTML5.apply(this, arguments);
  const e = docEsc,
    atm = docAtm(d),
    esc5 = docPick(DOCE, 5, d.t + "e"),
    q = docPick(DOCQ, 4, d.t + "q"),
    acts = [T40("Planteamiento", "Setup"), T40("Desarrollo", "Confrontation"), T40("Desenlace", "Resolution")],
    nb = (d.beats || []).length;
  let add = "";
  if (nb)
    add += `<h2>${e(T40("Escaleta", "Beat outline"))}</h2><ol class="esl">${d.beats.map((b, i) => `<li><span>${e(acts[Math.min(2, Math.floor((i * 3) / nb))])}</span>${e(b)}</li>`).join("")}</ol>`;
  add += `<h2>${e(T40("Atmósfera", "Atmosphere"))}</h2><p>${e(T40("Pistas sensoriales para imaginar la obra: no son reglas, son puntos de partida.", "Sensory cues to imagine the work: not rules, starting points."))}</p><div class="tags">${atm.map((x) => `<span>${e(x)}</span>`).join("")}</div>`;
  add += `<h2>${e(T40("Escenas para imaginar", "Scenes to imagine"))}</h2><ul>${esc5.map((x) => `<li>${e(x)}</li>`).join("")}</ul>`;
  add += `<h2>${e(T40("Preguntas abiertas", "Open questions"))}</h2><p>${e(T40("Lo que el documento deja sin responder a propósito, para que lo decida quien la escriba, la dirija o la imagine.", "What the document deliberately leaves unanswered, for whoever writes, directs or imagines it."))}</p><ul class="q">${q.map((x) => `<li>${e(x)}</li>`).join("")}</ul>`;
  const css =
    "body{background:#fbfaf6}h1{font-size:40px;letter-spacing:-.01em}h2{counter-increment:sec;border-bottom:2px solid #c9a227}h2::before{content:counter(sec,decimal-leading-zero) '  ';color:#c9a227;font-size:15px;letter-spacing:.08em}body{counter-reset:sec}" +
    ".portada{display:flex;gap:24px;align-items:flex-end;margin:0 0 28px;padding:24px;border-radius:18px;background:linear-gradient(135deg,#14182b,#2b2242);color:#f5f1e6}.portada img{width:150px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.45)}.portada h1{color:#fff;margin:0}.portada .que{color:#cfc6b0;margin:6px 0 0}" +
    ".indice{columns:2;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555;margin:0 0 20px;padding:14px 18px;background:#f4f1e6;border-radius:12px}.indice div{break-inside:avoid;padding:2px 0}" +
    ".esl{padding-left:0;list-style:none;counter-reset:b}.esl li{counter-increment:b;margin:0 0 12px;padding:12px 16px 12px 52px;position:relative;background:#fff;border:1px solid #ece5cf;border-radius:10px}.esl li::before{content:counter(b);position:absolute;left:14px;top:12px;width:26px;height:26px;border-radius:50%;background:#c9a227;color:#fff;font:700 13px/26px Arial;text-align:center}.esl li span{display:block;font:700 12px Arial;text-transform:uppercase;letter-spacing:.06em;color:#8a6a00}" +
    ".tags{display:flex;flex-wrap:wrap;gap:8px}.tags span{padding:6px 12px;border-radius:999px;background:#efe9d7;font-size:15px}ul.q li{font-style:italic}";
  s = s.replace("</style>", css + "</style>");
  if (!word) {
    const img = docPoster(),
      m = s.match(/<h1>([\s\S]*?)<\/h1><p class="que">([\s\S]*?)<\/p>/);
    if (m) s = s.replace(m[0], `<div class="portada">${img ? `<img src="${img}" alt="">` : ""}<div><h1>${m[1]}</h1><p class="que">${m[2]}</p></div></div>`);
  }
  const i = s.lastIndexOf('<p class="pie">');
  s = i > 0 ? s.slice(0, i) + add + s.slice(i) : s.replace("</body>", add + "</body>");
  const H = [...s.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map((x) => x[1].replace(/<[^>]+>/g, ""));
  if (H.length > 3) {
    const idx = `<div class="indice">${H.map((h, k) => `<div>${String(k + 1).padStart(2, "0")} · ${h}</div>`).join("")}</div>`,
      j = s.indexOf("<h2>");
    s = s.slice(0, j) + idx + s.slice(j);
  }
  return s;
};
const docTXT5 = docTXT;
docTXT = function (d, modo) {
  let s = docTXT5.apply(this, arguments);
  const L = [];
  if ((d.beats || []).length) L.push("", "## " + T40("Escaleta", "Beat outline"), "", ...d.beats.map((b, i) => i + 1 + ". " + b));
  L.push("", "## " + T40("Atmósfera", "Atmosphere"), "", docAtm(d).join(" · "));
  L.push("", "## " + T40("Escenas para imaginar", "Scenes to imagine"), "", ...docPick(DOCE, 5, d.t + "e").map((x) => "- " + x));
  L.push("", "## " + T40("Preguntas abiertas", "Open questions"), "", ...docPick(DOCQ, 4, d.t + "q").map((x) => "- " + x));
  return s + "\n" + L.join("\n") + "\n";
};
E40L([
  ["Una escena de apertura en la que el mundo se muestra sin palabras.", "An opening scene that shows the world without words."],
  ["El momento en que el protagonista decide que ya no puede volver atrás.", "The moment the lead decides there is no turning back."],
  ["Un encuentro entre dos personajes que nunca deberían haberse conocido.", "A meeting between two characters who should never have met."],
  ["Una escena tranquila justo antes del gran golpe.", "A quiet scene right before the big blow."],
  ["El instante en que una mentira sale a la luz.", "The moment a lie comes to light."],
  ["Un lugar que vuelve al final, pero ya no se ve igual.", "A place that returns at the end, but no longer looks the same."],
  ["Una última imagen que responde a la primera.", "A final image that answers the first."],
  ["¿Qué pierde el protagonista si gana?", "What does the lead lose by winning?"],
  ["¿Qué sabe el público que los personajes todavía no saben?", "What does the audience know that the characters don't yet?"],
  ["¿Qué imagen debería recordar alguien diez años después?", "What image should someone remember ten years later?"],
  ["¿Quién tiene razón en el conflicto, si es que alguien la tiene?", "Who is right in the conflict, if anyone?"],
  ["¿Qué pasaría si el antagonista contara la historia?", "What if the antagonist told the story?"],
  ["¿Qué se queda sin explicar para que el público lo imagine?", "What stays unexplained so the audience can imagine it?"],
  ["¿Cuál es el sonido de esta historia?", "What does this story sound like?"],
  ["¿Qué cambia en el mundo de la obra entre la primera y la última escena?", "What changes in the work's world between the first and last scene?"],
]);
