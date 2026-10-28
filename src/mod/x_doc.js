// ===== Documento de la idea: Word de verdad (.docx) con portada y curva del arco, trama en tres actos y ficha completa =====
const docT = (t) => {
  t = String(t == null ? "" : t);
  if (!t) return t;
  if (IDI == "en") return trTxt(t);
  return typeof XDIC == "function" && XDIC() ? trX(t) : t;
};
const docLista = (L) => (L.length > 1 ? L.slice(0, -1).join(", ") + T40(" y ", " and ") + L[L.length - 1] : L[0] || "");
const DOCMALOS = ["Villano", "Sombra", "Antivillano", "Tirano", "Traidor", "Embaucador", "Gobernante", "Monstruo", "Doble"];
const DOCALIA = ["Aliado", "Mentor", "Amante", "Cuidador", "Sabio", "Guardián", "Mago", "Mecenas"];
const DOCMOM = ["Planteamiento", "Detonante", "Primer giro", "Punto medio", "Crisis", "Clímax", "Desenlace"];
// Datos extra que el documento necesita y que solo existen mientras el borrador está abierto
const docDatosX = docDatos;
docDatos = function () {
  const d = docDatosX.apply(this, arguments);
  try {
    const Pn = wP(),
      cast = (Pn.cast || []).filter((c) => c.i != 2),
      an = (c) => ARQ[c.a] || "Normal",
      pj = (c) => (c ? { n: c.n, x: c.x, e: c.e, arq: arqN(c), a: an(c), d: arqD(c), mot: c.mot | 0, rel: c.rel | 0 } : null),
      pr = cast.find((c) => c.i == 0) || null,
      ant = cast.find((c) => c.i != 0 && DOCMALOS.includes(an(c))) || null,
      ali = cast.find((c) => c.i != 0 && DOCALIA.includes(an(c))) || null,
      ai = Math.max(0, DX.ar[0].indexOf((Pn.ar || [])[0])),
      o = pr && pr.x == "F" ? "a" : "o";
    d.x = {
      pr: pj(pr),
      ant: pj(ant),
      ali: pj(ali),
      v: (ARV[ai] || ARV[2]).slice(),
      pmT: ((Pn.pm || []).map((x) => PMF[x]).filter(Boolean)[0] || "se ve obligad{o} a cambiar su vida").replace(/\{o\}/g, o),
      pmN: (Pn.pm || []).slice(0, 3),
      tm: (Pn.tm || []).slice(0, 4),
      sa: (Pn.ar || []).filter((x) => DX.ar[1].includes(x)),
      cont: cnTxt(Object.assign({}, Pn, { cont6: c6(W) })),
      g0: (Pn.gn || [])[0] || "",
      ia: W.ai || 0,
      img: typeof docPoster == "function" ? docPoster() : "",
      y: yr(),
      ext: (W.cast || []).filter((c) => c.i == 2).length,
      ad: adulto(Object.assign({}, W, { gn: wGn() })),
      m: W.m,
      cast: (Pn.cast || []).map((c) => ({ n: c.n, x: c.x, e: c.e, rol: IMP[c.i][0], arq: arqN(c), d: arqD(c), mot: c.mot | 0, rel: c.rel | 0, i: c.i, act: c.t != null && S.tl[c.t] ? S.tl[c.t].n + (S.tl[c.t].you ? " (" + T40("tú", "you") + ")" : "") : "" })),
      brTxt: L37(`×${dec1(Pn.br || 1, 2)} del típico de ${yr()}`, `×${dec1(Pn.br || 1, 2)} the typical in ${yr()}`),
    };
  } catch (e) {
    d.x = d.x || { v: ARV[2].slice(), cast: [], tm: [], pmN: [], sa: [] };
  }
  return d;
};
// Lo que ya pasó con la obra (si se descarga desde su ficha final)
function docObra(P) {
  if (!P) return null;
  const o = { st: P.st, n: P.n };
  o.etapa = ["En producción", "Lista para estrenar", "En marketing", "En cartelera", "Archivo"][P.st] || "";
  o.costo = P.cost || P.paid || 0;
  o.mk = P.mkc || 0;
  if (P.st >= 3) {
    o.rt = P.rt != null ? fD(semIni(P.rt), 1) : "";
    o.bruto = P.gross || 0;
    o.mult = P.cost ? P.gross / P.cost : 0;
    o.c = P.c | 0;
    o.a = P.a | 0;
    o.aw = (P.aw || []).slice(0, 12);
    o.frc = (P.c | 0) >= 80 ? L37("«Una obra que se queda contigo mucho después del final.»", "“A work that stays with you long after the end.”") : (P.c | 0) >= 60 ? L37("«Cumple lo que promete y a ratos lo supera.»", "“It delivers what it promises and at times more.”") : L37("«Tiene momentos, pero no termina de encontrar su tono.»", "“It has moments, but never quite finds its tone.”");
  }
  if (P.plx != null && typeof plxDe == "function") {
    const p = plxDe(P);
    if (p) o.plan = LL(p) + " · " + plxRuta(p);
  }
  return o;
}
const DOCPRF = [
  ["«Por creer en las segundas oportunidades.»", "“For believing in second chances.”"],
  ["«Por mirar donde nadie se atrevía a mirar.»", "“For looking where no one dared to look.”"],
  ["«Por su valentía y por su oficio.»", "“For its courage and its craft.”"],
  ["«Por recordarnos por qué contamos historias.»", "“For reminding us why we tell stories.”"],
  ["«Por hacer de lo pequeño algo inolvidable.»", "“For making something small unforgettable.”"],
];
const docPremioF = (t) => LL(DOCPRF[hs(String(t) + "pr") % DOCPRF.length]);
// La trama en tres actos, a partir de la forma del arco y de los personajes
function docTrama(d) {
  const x = d.x || {},
    v = x.v || ARV[2],
    pr = x.pr,
    n = pr ? pr.n : T40("Quien protagoniza", "The lead"),
    o = pr && pr.x == "F" ? "a" : "o",
    b = d.beats || [],
    A = [[], [], []];
  if (b.length) {
    const un = (c) => (c.x == "F" ? "una " : "un ") + lc(c.arq),
      con = (pre, t) => pre + (/^(Un|Una|El|La|Los|Las|Nada|Todo)\b/.test(t || "") ? lc(t) : t);
    A[0].push(b[0], b[1]);
    if (x.ali) A[0].push(`A su lado aparece ${x.ali.n}, ${un(x.ali)}${x.ali.e ? " de " + x.ali.e + " años" : ""}, que será clave para seguir adelante.`);
    if (x.ant) A[0].push(`Enfrente estará ${x.ant.n}, ${un(x.ant)} que tiene sus propios planes.`);
    A[1].push(con("Al principio, ", b[2]), con("Después, ", b[3]), con("Cerca del final, ", b[4]));
    if (x.pmN.length > 1) A[1].push(`El relato juega con ${docLista(x.pmN.slice(1).map((p) => "«" + p + "»"))}, que da${x.pmN.length > 2 ? "n" : ""} forma a sus escenas más recordadas.`);
    if (x.sa.length) A[1].push(`En paralelo ${x.sa.length > 1 ? "corren dos tramas secundarias" : "corre una trama secundaria"}: ${docLista(x.sa.map((s) => "«" + docSin(s) + "»"))}.`);
    if (x.ant) A[1].push(`${x.ant.n} aprieta cada vez más, y ${n} tiene que decidir hasta dónde está dispuest${o} a llegar.`);
    A[2].push(b[5], b[6]);
    if (x.tm.length) A[2].push(`Al terminar, queda una idea en el aire: una historia sobre ${docLista(x.tm.slice(0, 3).map((t) => conArt(docSin(t))))}.`);
    if (d.mo && d.mo != MORAL[MOABI]) A[2].push(`La moraleja que deja: «${d.mo}».`);
  } else A[0].push("Es una obra sobre hechos reales: se cuenta lo que pasó, en orden, con sus protagonistas verdaderos.");
  const f = v.map((k) => Math.round((0.1 + (0.8 * (k + 2)) / 4) * 100) / 100),
    pr0 = (d.x || {}).pr,
    corto = (t, i) =>
      i == 0 && pr0
        ? `${pr0.n} ${v[0] >= 1 ? "tiene casi todo lo que quiere" : v[0] <= -1 ? "vive con poco y sueña con más" : "lleva una vida en calma"}.`
        : cap1(
            String(t || "")
              .split(/\. (?=[A-ZÁÉÍÓÚ])/)[0]
              .replace(/^(Todo cambia cuando |En el momento decisivo, |Al final, )/, "")
              .replace(/\.$/, ""),
          ) + ".",
    esc5 = DOCMOM.map((m, i) => [m, corto(b[i], i), f[i] == null ? 0.5 : f[i]]);
  return { A, f, esc: esc5 };
}
function docLogline(d) {
  const x = d.x || {},
    pr = x.pr;
  if (!pr || !(d.beats || []).length) return d.log || "";
  const fin = x.v[6] >= 1 ? "termina mejor de lo que empezó" : x.v[6] <= -1 ? "lo pierde todo, pero entiende lo que antes no veía" : "vuelve a empezar, distint" + (pr.x == "F" ? "a" : "o");
  return `Cuando ${pr.n} ${x.pmT}, ${x.ant ? "tendrá que enfrentarse a " + x.ant.n : "tendrá que decidir hasta dónde llegar"} y, al final, ${fin}.`;
}
const docInterp = (c) => (c.x == "F" ? "La interpreta " : "Lo interpreta ");
// Modelo común: bloques que luego se escriben en Word, HTML o Markdown
function docModelo(d, modo) {
  const co = modo != "h",
    x = d.x || { cast: [], tm: [], pmN: [], sa: [], v: ARV[2] },
    tr = docTrama(d),
    pr = d.pr,
    P = d.P,
    B = [],
    H1 = (t) => B.push({ k: "h1", t }),
    H2 = (t) => B.push({ k: "h2", t }),
    Pp = (t) => t && B.push({ k: "p", t }),
    Q = (t) => t && B.push({ k: "q", t }),
    Tb = (f) => {
      f = f.filter((r) => r && r[1] != null && String(r[1]).trim() !== "");
      if (f.length) B.push({ k: "tb", f });
    };
  const sub = [d.md, d.ty, (d.gn || []).map((g, i) => (i ? g : "★ " + g)).join(" · "), (d.cla || "").split(" (")[0], co ? d.est0 : ""].filter(Boolean).join(" · ");
  B.push({ k: "cover", img: x.img, t: d.t, sub, log: d.log, ll: docLogline(d), small: L37(`Documento de la idea generado por INDUSTRY ART el ${new Date().toLocaleDateString(IDI == "en" ? "en" : "es")} (año del juego ${x.y || d.y})`, `Idea document generated by INDUSTRY ART on ${new Date().toLocaleDateString("en")} (game year ${x.y || d.y})`) });
  H1("La idea");
  Tb([
    ["Tipo", [d.md, d.ty, lc(d.rl), co ? lc(d.cls) : "", x.ad ? T40("obra adulta", "adult work") : ""].filter(Boolean).join(" · ")],
    ["Origen", d.fr],
    ["Géneros", (d.gn || []).map((g, i) => (i ? g : g + " (" + T40("principal", "main") + ")")).join(", ")],
    ["Subgéneros", (d.sb || []).map(docSin).join(", ")],
    ["Temas", (d.tm || []).map(docSin).join(", ")],
    ["Problemática", (d.pa || []).map(docSin).join(", ")],
    ["Premisas y tropos", (d.pm || []).map(docSin).join(", ")],
    ["Arco", d.ar ? d.ar.split(" — ")[0] + (x.sa.length ? " · " + x.sa.map(docSin).join(", ") : "") : ""],
    ["Corriente artística", d.crP],
    ["Época y lugar", [d.ep, d.lug].filter(Boolean).join(" · ")],
    ["Idioma", d.idi],
    ["Forma", [d.dur, d.cx ? T40("complejidad", "complexity") + " " + lc(d.cx) : "", d.rit ? T40("ritmo", "pace") + " " + lc(d.rit) : "", d.fxl ? T40("efectos", "effects") + ": " + lc(d.fxl) : ""].filter(Boolean).join(" · ")],
    ["Tono", d.tono],
    ["Estilo", d.est ? d.est.split(" — ")[0] : ""],
    ["Contenido", x.cont || d.cont],
    ["Clasificación", d.cla],
    ["Público", d.pob],
    ["Moraleja", d.mo ? (d.mo == MORAL[MOABI] ? T40("Final abierto, sin moraleja cerrada", "Open ending, no set moral") : "«" + d.mo + "»") : ""],
    co && x.ia ? ["Uso de IA", x.ia + " %"] : null,
    P && P.frc ? ["La crítica", P.frc] : null,
    P && P.aw && P.aw.length ? ["Al premiarla", docPremioF(d.t)] : null,
  ]);
  if (d.agD) Q(d.agD);
  if (co && pr && !(P && P.st >= 3)) {
    H1("¿Le irá bien?");
    Tb([
      ["Costo total", d.bud],
      ["Si sale mal", fm(pr.lo)],
      ["Lo más probable", fm(pr.mid)],
      ["Si sale muy bien", fm(pr.hi)],
      ["Para no perder dinero", T40("hay que recaudar", "it must gross") + " " + fm(pr.gb)],
      ["Probabilidad de recuperar lo invertido", Math.round(pr.p * 100) + " %"],
      ["Crítica y público esperados", (pr.C | 0) + " / " + (pr.A | 0)],
    ]);
    (pr.fx || []).forEach((f) => Pp((f[0] >= 0 ? "▲ " + T40("A favor", "For") + ": " : "▼ " + T40("En contra", "Against") + ": ") + lc(f[1])));
    B.push({ k: "s", t: T40("Es una estimación: la competencia, las críticas y el boca a boca deciden el estreno real.", "It's an estimate: competition, reviews and word of mouth decide the real release.") });
  }
  H1("La trama");
  ["Acto I · Planteamiento", "Acto II · Confrontación", "Acto III · Desenlace"].forEach((t, i) => {
    if (!tr.A[i].length) return;
    H2(t);
    tr.A[i].forEach(Pp);
  });
  if ((d.beats || []).length) {
    H2("Curva del arco");
    B.push({ k: "curva", f: tr.f, t: d.ar ? d.ar.split(" — ")[0] : "" });
    H2("Escaleta");
    Tb(tr.esc.map((e, i) => [i + 1 + ". " + e[0], e[1] + " (" + T40("fortuna", "fortune") + " " + Math.round(e[2] * 100) + " %)"]));
  }
  H1("Personajes");
  const cast = x.cast && x.cast.length ? x.cast : (d.cast || []).map((c) => Object.assign({}, c, { i: 0 }));
  if (cast.length) {
    cast.forEach((c) => {
      B.push({ k: "pj", n: c.n, s: [c.rol, c.e ? c.e + " " + T40("años", "years old") : "", c.x == "F" ? T40("mujer", "woman") : c.x == "M" ? T40("hombre", "man") : ""].filter(Boolean).join(" · ") });
      Q(
        [
          T40("Arquetipo", "Archetype") + ": " + c.arq + (c.d ? " — " + lc(c.d.replace(/\.$/, "")) : ""),
          c.mot && PJMOT[c.mot] ? T40("Motivación", "Motivation") + ": " + lc(PJMOT[c.mot]) : "",
          c.rel && PJREL[c.rel] ? T40("Relación con el protagonista", "Relationship to the lead") + ": " + lc(PJREL[c.rel]) : "",
          co && c.act ? docInterp(c) + c.act : "",
        ]
          .filter(Boolean)
          .join(". ") + ".",
      );
    });
    if (x.ext) B.push({ k: "s", t: L37(`Además: ${x.ext} extras con nombre.`, `Also: ${x.ext} named extras.`) });
  } else Pp(T40("Todavía no hay personajes con nombre.", "There are no named characters yet."));
  H1("Mundo y atmósfera");
  Tb([
    ["Cuándo pasa", d.ep],
    ["Dónde pasa", d.lug],
    ["Rodaje", d.loc],
    ["Formato", d.fmt],
    ["Imagen", d.ani],
  ]);
  if (typeof docAtm == "function") {
    Pp(T40("Pistas sensoriales para imaginar la obra (no son reglas, son puntos de partida):", "Sensory cues to imagine the work (not rules, starting points):"));
    B.push({ k: "tags", L: docAtm(d) });
    H2("Escenas para imaginar");
    B.push({ k: "ul", L: docPick(DOCE, 5, d.t + "e") });
    H2("Preguntas abiertas");
    B.push({ k: "ul", L: docPick(DOCQ, 4, d.t + "q") });
  }
  if (co) {
    H1("Equipo creativo");
    Tb((d.crew || []).filter((c) => c[1] != "—").map((c) => [c[0], c[1]]));
    H1("Producción");
    Tb([
      ["Presupuesto de producción", d.cProd + " · " + (x.brTxt || "") + " · " + lc(d.budM.split(" (")[0])],
      ["Talentos y reparto", d.cTal],
      ["Música", d.cMu],
      ["Costo total", d.bud],
      ["Reparto del presupuesto", d.dep],
      ["Tiempo de producción", d.sem + " " + T40("semanas", "weeks")],
      ["Quién pone el dinero", d.fin],
      ["Estilo de producción", d.est],
      ["Pulido", d.pol],
      ["Música y sonido", d.mu],
    ]);
  }
  if (co && P) {
    H1("Datos técnicos");
    Tb([
      ["Medio", d.md],
      ["Etapa", P.etapa],
      ["Costo final", P.costo ? fm(P.costo) : ""],
      ["Marketing", P.mk ? fm(P.mk) : ""],
      ["Plan de salida", P.plan || ""],
      ["Estreno", P.rt || ""],
      ["Recaudación", P.bruto ? fm(P.bruto) + " · " + T40("multiplicador", "multiplier") + " ×" + dec1(P.mult || 0, 2) : ""],
      ["Crítica y público", P.st >= 3 ? P.c + " / " + P.a : ""],
      ["Premios", P.aw && P.aw.length ? P.aw.join(" · ") : ""],
    ]);
  }
  B.push({ k: "pie", t: "Ideado y creado por OneZero · Infinite Tree · INDUSTRY ART" + (d.taller ? " · " + T40("Taller creativo", "Creative workshop") : "") });
  return B;
}
// ---------- Imágenes ----------
function docImgBytes(url) {
  if (!url) return null;
  const b = atob(url.split(",")[1] || ""),
    u = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
  return u;
}
function docCurvaCv(f, t) {
  const W2 = 1200,
    H = 420,
    m = 54,
    cv = document.createElement("canvas");
  cv.width = W2;
  cv.height = H;
  const c = cv.getContext("2d"),
    px = (i) => m + ((W2 - 2 * m) * i) / Math.max(1, f.length - 1),
    py = (y) => H - m - (H - 2 * m) * y;
  c.fillStyle = "#ffffff";
  c.fillRect(0, 0, W2, H);
  c.strokeStyle = "#e3e6ee";
  c.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = m + ((H - 2 * m) * i) / 4;
    c.beginPath();
    c.moveTo(m, y);
    c.lineTo(W2 - m, y);
    c.stroke();
  }
  c.fillStyle = "#5b6478";
  c.font = "22px sans-serif";
  c.fillText(docT(T40("Fortuna", "Fortune")), 8, 30);
  c.strokeStyle = "#1aa39a";
  c.lineWidth = 6;
  c.lineJoin = "round";
  c.beginPath();
  f.forEach((y, i) => {
    if (!i) c.moveTo(px(i), py(y));
    else {
      const x0 = px(i - 1),
        y0 = py(f[i - 1]),
        x1 = px(i);
      c.bezierCurveTo((x0 + x1) / 2, y0, (x0 + x1) / 2, py(y), x1, py(y));
    }
  });
  c.stroke();
  c.fillStyle = "#c8941a";
  f.forEach((y, i) => {
    c.beginPath();
    c.arc(px(i), py(y), 9, 0, Math.PI * 2);
    c.fill();
  });
  c.fillStyle = "#1b2033";
  c.font = "bold 24px sans-serif";
  c.textAlign = "center";
  c.fillText(docT(t || T40("Arco libre", "Free arc")), W2 / 2, 34);
  c.font = "17px sans-serif";
  c.fillStyle = "#5b6478";
  DOCMOM.forEach((n, i) => i < f.length && c.fillText(docT(n), px(i), H - 14));
  return cv;
}
function docPosterGrande(url) {
  return new Promise((ok) => {
    if (!url) return ok(null);
    const im = new Image();
    im.onload = () => {
      try {
        const cv = document.createElement("canvas");
        cv.width = 600;
        cv.height = 900;
        cv.getContext("2d").drawImage(im, 0, 0, 600, 900);
        ok(docImgBytes(cv.toDataURL("image/jpeg", 0.9)));
      } catch (e) {
        ok(docImgBytes(url));
      }
    };
    im.onerror = () => ok(null);
    im.src = url;
  });
}
// ---------- Word (.docx): un zip sin compresión con el documento, los estilos y las imágenes ----------
const DOCCRC = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t.push(c >>> 0);
  }
  return t;
})();
function docCrc(b) {
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = DOCCRC[(c ^ b[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function docZip(F) {
  const enc = new TextEncoder(),
    partes = [],
    central = [],
    u16 = (a, x) => a.push(x & 255, (x >>> 8) & 255),
    u32 = (a, x) => a.push(x & 255, (x >>> 8) & 255, (x >>> 16) & 255, (x >>> 24) & 255);
  let pos = 0;
  F.forEach((f) => {
    const nm = enc.encode(f.n),
      dt = typeof f.d == "string" ? enc.encode(f.d) : f.d,
      crc = docCrc(dt),
      h = [],
      c = [];
    u32(h, 0x04034b50);
    u16(h, 20);
    u16(h, 0x0800);
    u16(h, 0);
    u16(h, 0);
    u16(h, 0x21);
    u32(h, crc);
    u32(h, dt.length);
    u32(h, dt.length);
    u16(h, nm.length);
    u16(h, 0);
    partes.push(new Uint8Array(h), nm, dt);
    u32(c, 0x02014b50);
    u16(c, 20);
    u16(c, 20);
    u16(c, 0x0800);
    u16(c, 0);
    u16(c, 0);
    u16(c, 0x21);
    u32(c, crc);
    u32(c, dt.length);
    u32(c, dt.length);
    u16(c, nm.length);
    u16(c, 0);
    u16(c, 0);
    u16(c, 0);
    u16(c, 0);
    u32(c, 0);
    u32(c, pos);
    central.push(new Uint8Array(c), nm);
    pos += h.length + nm.length + dt.length;
  });
  const tc = central.reduce((s, x) => s + x.length, 0),
    fin = [];
  u32(fin, 0x06054b50);
  u16(fin, 0);
  u16(fin, 0);
  u16(fin, F.length);
  u16(fin, F.length);
  u32(fin, tc);
  u32(fin, pos);
  u16(fin, 0);
  const todo = partes.concat(central, [new Uint8Array(fin)]),
    out = new Uint8Array(todo.reduce((s, x) => s + x.length, 0));
  let p = 0;
  todo.forEach((x) => {
    out.set(x, p);
    p += x.length;
  });
  return out;
}
const docXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
const dxR = (t, b, i) => `<w:r>${b || i ? `<w:rPr>${b ? "<w:b/>" : ""}${i ? "<w:i/>" : ""}</w:rPr>` : ""}<w:t xml:space="preserve">${docXml(docT(t))}</w:t></w:r>`;
const dxP = (c, st, ce) => `<w:p>${st || ce ? `<w:pPr>${st ? `<w:pStyle w:val="${st}"/>` : ""}${ce ? '<w:jc w:val="center"/>' : ""}</w:pPr>` : ""}${c}</w:p>`;
const dxT = (t, st, ce) => dxP(dxR(t), st, ce);
const dxTabla = (f) =>
  `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="D9DEE8"/><w:bottom w:val="single" w:sz="4" w:color="D9DEE8"/><w:insideH w:val="single" w:sz="4" w:color="D9DEE8"/></w:tblBorders><w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="2800"/><w:gridCol w:w="6800"/></w:tblGrid>${f.map((r) => `<w:tr><w:tc><w:tcPr><w:tcW w:w="1450" w:type="pct"/></w:tcPr>${dxP(dxR(r[0], 1))}</w:tc><w:tc><w:tcPr><w:tcW w:w="3550" w:type="pct"/></w:tcPr>${dxP(dxR(r[1]))}</w:tc></w:tr>`).join("")}</w:tbl>${dxT("")}`;
const dxImg = (rid, n, cx, cy) =>
  `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${n}" name="Imagen ${n}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${n}" name="imagen${n}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
const DXEST =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="23"/><w:lang w:val="es-ES"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="140" w:line="300" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
  '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:pPr><w:jc w:val="center"/><w:spacing w:before="240" w:after="120"/></w:pPr><w:rPr><w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/><w:b/><w:color w:val="1B2033"/><w:sz w:val="56"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:pPr><w:jc w:val="center"/></w:pPr><w:rPr><w:i/><w:color w:val="5B6478"/><w:sz w:val="26"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="360" w:after="120"/><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="4" w:color="C9A227"/></w:pBdr><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/><w:b/><w:color w:val="1AA39A"/><w:sz w:val="34"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/><w:b/><w:color w:val="C8941A"/><w:sz w:val="27"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="567" w:right="567"/></w:pPr><w:rPr><w:i/><w:color w:val="3A4256"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Small"><w:name w:val="Small"/><w:basedOn w:val="Normal"/><w:rPr><w:color w:val="7A8296"/><w:sz w:val="18"/></w:rPr></w:style></w:styles>';
async function docDocx(d, modo) {
  const B = docModelo(d, modo),
    imgs = [];
  let b = "";
  for (const x of B) {
    if (x.k == "cover") {
      const im = await docPosterGrande(x.img);
      if (im) {
        imgs.push({ d: im, e: "jpeg" });
        b += dxImg("rIdImg1", 1, 2743200, 4114800);
      }
      b += dxT(x.t, "Title") + dxT(x.sub, "Subtitle");
      if (x.log) b += dxT(x.log, "Quote");
      if (x.ll) b += dxP(dxR(T40("Logline", "Logline") + ": ", 1) + dxR(x.ll), null, 1);
      b += dxT(x.small, "Small", 1) + '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
    } else if (x.k == "h1") b += dxT(x.t, "Heading1");
    else if (x.k == "h2") b += dxT(x.t, "Heading2");
    else if (x.k == "p") b += dxT(x.t);
    else if (x.k == "q") b += dxT(x.t, "Quote");
    else if (x.k == "s") b += dxT(x.t, "Small");
    else if (x.k == "pie") b += dxT(x.t, "Small", 1);
    else if (x.k == "tb") b += dxTabla(x.f);
    else if (x.k == "pj") b += dxP(dxR(x.n, 1) + dxR(" · " + x.s));
    else if (x.k == "tags") b += dxT(x.L.join(" · "), "Quote");
    else if (x.k == "ul") x.L.forEach((t) => (b += dxT("• " + t)));
    else if (x.k == "curva") {
      try {
        imgs.push({ d: docImgBytes(docCurvaCv(x.f, x.t).toDataURL("image/png")), e: "png" });
        b += dxImg("rIdImg" + imgs.length, imgs.length, 5486400, 1920240);
      } catch (e) {}
    }
  }
  const ns = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"',
    R0 = "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${ns}><w:body>${b}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`,
    rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdEst" Type="${R0}/styles" Target="styles.xml"/>${imgs.map((im, i) => `<Relationship Id="rIdImg${i + 1}" Type="${R0}/image" Target="media/imagen${i + 1}.${im.e}"/>`).join("")}</Relationships>`,
    ahora = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  return docZip(
    [
      { n: "[Content_Types].xml", d: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>' },
      { n: "_rels/.rels", d: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${R0}/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>` },
      { n: "docProps/core.xml", d: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${docXml(d.t)}</dc:title><dc:creator>INDUSTRY ART</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${ahora}</dcterms:created></cp:coreProperties>` },
      { n: "word/document.xml", d: doc },
      { n: "word/styles.xml", d: DXEST },
      { n: "word/_rels/document.xml.rels", d: rels },
    ].concat(imgs.map((im, i) => ({ n: "word/media/imagen" + (i + 1) + "." + im.e, d: im.d }))),
  );
}
// ---------- HTML (se lee, se imprime o se guarda como PDF) ----------
function docCurvaSVG(f, t) {
  const W2 = 600,
    H = 210,
    m = 26,
    px = (i) => m + ((W2 - 2 * m) * i) / Math.max(1, f.length - 1),
    py = (y) => H - m - 10 - (H - 2 * m - 10) * y;
  let d = "";
  f.forEach((y, i) => {
    if (!i) d += "M" + px(i) + " " + py(y);
    else {
      const x0 = px(i - 1),
        y0 = py(f[i - 1]),
        x1 = px(i);
      d += ` C${(x0 + x1) / 2} ${y0} ${(x0 + x1) / 2} ${py(y)} ${x1} ${py(y)}`;
    }
  });
  return `<svg viewBox="0 0 ${W2} ${H}" role="img" aria-label="${docEsc(docT("Curva del arco"))}"><rect width="${W2}" height="${H}" fill="#fff"/>${[0, 1, 2, 3, 4].map((k) => `<line x1="${m}" x2="${W2 - m}" y1="${m + ((H - 2 * m - 10) * k) / 4}" y2="${m + ((H - 2 * m - 10) * k) / 4}" stroke="#e3e6ee"/>`).join("")}<path d="${d}" fill="none" stroke="#1aa39a" stroke-width="4" stroke-linecap="round"/>${f.map((y, i) => `<circle cx="${px(i)}" cy="${py(y)}" r="6" fill="#c8941a"/>`).join("")}${DOCMOM.map((n, i) => (i < f.length ? `<text x="${px(i)}" y="${H - 6}" font-size="10" text-anchor="middle" fill="#5b6478">${docEsc(docT(n))}</text>` : "")).join("")}<text x="${W2 / 2}" y="16" font-size="13" font-weight="700" text-anchor="middle" fill="#1b2033">${docEsc(docT(t || "Arco libre"))}</text></svg>`;
}
function docHTML2(d, modo) {
  const B = docModelo(d, modo),
    e = (t) => docEsc(docT(t)),
    css =
      "body{font:17px/1.65 Georgia,'Times New Roman',serif;color:#1b2033;max-width:820px;margin:0 auto;padding:32px 22px;background:#fbfaf6}h1{font-size:2.5em;text-align:center;margin:.2em 0;line-height:1.1}h2{font-family:Arial,Helvetica,sans-serif;color:#1aa39a;border-bottom:2px solid #c9a227;padding-bottom:4px;margin-top:1.9em}h3{font-family:Arial,Helvetica,sans-serif;color:#b07d10;margin:1.4em 0 .4em}.sub{text-align:center;color:#5b6478;font-style:italic}.poster{display:block;margin:0 auto 16px;max-width:260px;width:60%;border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.25)}blockquote{margin:14px 0;padding:10px 18px;border-left:4px solid #c9a227;background:#fff;font-style:italic;color:#3a4256}.ll{text-align:center}.small{color:#7a8296;font-size:13px}.c{text-align:center}table{width:100%;border-collapse:collapse;margin:8px 0 14px;font-size:15px}th{width:32%;text-align:left;vertical-align:top;padding:7px 10px 7px 0;color:#3a4256;font-family:Arial,Helvetica,sans-serif;font-weight:600}td{padding:7px 0}tr{border-bottom:1px solid #e3e6ee}.pj{margin:14px 0 2px}.tags{display:flex;flex-wrap:wrap;gap:8px}.tags span{padding:5px 12px;border-radius:999px;background:#efe9d7;font-size:15px}svg{width:100%;height:auto;border:1px solid #e3e6ee;border-radius:8px}.pie{margin-top:48px;padding-top:12px;border-top:1px solid #ddd;color:#888;font-size:13px;text-align:center}@media print{body{background:#fff;padding:0}h2,h3{break-after:avoid}table,blockquote,svg{break-inside:avoid}}";
  let b = "";
  B.forEach((x) => {
    if (x.k == "cover") {
      b += (x.img ? `<img class="poster" alt="" src="${x.img}">` : "") + `<h1>${docEsc(x.t)}</h1><p class="sub">${e(x.sub)}</p>`;
      if (x.log) b += `<blockquote>${e(x.log)}</blockquote>`;
      if (x.ll) b += `<p class="ll"><b>${e("Logline")}:</b> ${e(x.ll)}</p>`;
      b += `<p class="small c">${e(x.small)}</p>`;
    } else if (x.k == "h1") b += `<h2>${e(x.t)}</h2>`;
    else if (x.k == "h2") b += `<h3>${e(x.t)}</h3>`;
    else if (x.k == "p") b += `<p>${e(x.t)}</p>`;
    else if (x.k == "q") b += `<blockquote>${e(x.t)}</blockquote>`;
    else if (x.k == "s") b += `<p class="small">${e(x.t)}</p>`;
    else if (x.k == "pie") b += `<p class="pie">${e(x.t)}</p>`;
    else if (x.k == "tb") b += `<table>${x.f.map((r) => `<tr><th>${e(r[0])}</th><td>${e(r[1])}</td></tr>`).join("")}</table>`;
    else if (x.k == "pj") b += `<p class="pj"><b>${docEsc(x.n)}</b> · ${e(x.s)}</p>`;
    else if (x.k == "tags") b += `<div class="tags">${x.L.map((t) => `<span>${e(t)}</span>`).join("")}</div>`;
    else if (x.k == "ul") b += `<ul>${x.L.map((t) => `<li>${e(t)}</li>`).join("")}</ul>`;
    else if (x.k == "curva") b += docCurvaSVG(x.f, x.t);
  });
  return `<!doctype html><html lang="${IDI}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${docEsc(d.t)}</title><style>${css}</style></head><body>${b}</body></html>`;
}
function docMD2(d, modo) {
  const B = docModelo(d, modo),
    L = [];
  B.forEach((x) => {
    if (x.k == "cover") {
      L.push("# " + x.t, "", "_" + docT(x.sub) + "_", "");
      if (x.log) L.push("> " + docT(x.log), "");
      if (x.ll) L.push("**" + docT("Logline") + ":** " + docT(x.ll), "");
      L.push("<sub>" + docT(x.small) + "</sub>", "");
    } else if (x.k == "h1") L.push("", "## " + docT(x.t), "");
    else if (x.k == "h2") L.push("", "### " + docT(x.t), "");
    else if (x.k == "p") L.push(docT(x.t), "");
    else if (x.k == "q") L.push("> " + docT(x.t), "");
    else if (x.k == "s" || x.k == "pie") L.push("_" + docT(x.t) + "_", "");
    else if (x.k == "tb") L.push("| | |", "|---|---|", ...x.f.map((r) => "| **" + docT(r[0]) + "** | " + String(docT(r[1])).replace(/\|/g, "/") + " |"), "");
    else if (x.k == "pj") L.push("**" + x.n + "** · " + docT(x.s));
    else if (x.k == "tags") L.push(x.L.map(docT).join(" · "), "");
    else if (x.k == "ul") L.push(...x.L.map((t) => "- " + docT(t)), "");
    else if (x.k == "curva") L.push(x.f.map((f, i) => docT(DOCMOM[i]) + " " + Math.round(f * 100) + " %").join(" → "), "");
  });
  return L.join("\n");
}
// ---------- Descargas ----------
function docBajarBin(nombre, bytes, tipo) {
  const B = window.AndroidBridge;
  if (B && B.guardarB64) {
    let s = "";
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    try {
      B.guardarB64(nombre, tipo, btoa(s));
      return;
    } catch (e) {}
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([bytes], { type: tipo }));
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 1500);
  toast(L37("Archivo listo: ", "File ready: ") + nombre);
}
const wdocbX = ACT["wdocb"];
ACT["wdocb"] = (v0) => {
  const d = DOCX || docDatos(),
    q = String(v0).split("|"),
    mo = q.length > 1 ? q[0] : "c",
    v = q.length > 1 ? q[1] : q[0];
  if (v == "doc" || v == "docx") {
    docDocx(d, mo)
      .then((z) => docBajarBin(docNom(d, "docx", mo), z, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
      .catch((e) => {
        console.error("docx", e);
        toast(T40("No se pudo armar el Word", "The Word file couldn't be built"));
      });
    return;
  }
  if (v == "html") return bajarArchivo(docNom(d, "html", mo), docHTML2(d, mo), "text/html");
  if (v == "md") return bajarArchivo(docNom(d, "md", mo), docMD2(d, mo), "text/markdown");
  if (v == "pdf" || v == "ver") {
    const B = window.AndroidBridge;
    if (B && B.imprimir) {
      try {
        B.imprimir(docNom(d, "pdf", mo), docHTML2(d, mo));
        return;
      } catch (e) {}
    }
    const w = window.open("", "_blank");
    if (!w) return toast(T40("El navegador bloqueó la ventana: usa la descarga .html", "The browser blocked the window: use the .html download"));
    w.document.open();
    w.document.write(docHTML2(d, mo));
    w.document.close();
    if (v == "pdf")
      setTimeout(() => {
        try {
          w.focus();
          w.print();
        } catch (e) {}
      }, 500);
    return;
  }
  return wdocbX(v0);
};
// Los botones de Word pasan a .docx en el creador y en la ficha final
const opDocX = op;
op = function (h) {
  if (typeof h == "string" && h.includes('data-a="wdocb"')) h = h.replace(/Word \(\.doc\)/g, "Word (.docx)");
  return opDocX.apply(this, arguments);
};
E40L([
  ["La idea", "The idea"],
  ["La trama", "The plot"],
  ["Acto I · Planteamiento", "Act I · Setup"],
  ["Acto II · Confrontación", "Act II · Confrontation"],
  ["Acto III · Desenlace", "Act III · Resolution"],
  ["Curva del arco", "Arc curve"],
  ["Mundo y atmósfera", "World and atmosphere"],
  ["Equipo creativo", "Creative team"],
  ["Datos técnicos", "Technical data"],
  ["Producción", "Production"],
  ["Premisas y tropos", "Premises and tropes"],
  ["Problemática", "Conflict"],
  ["Origen", "Origin"],
  ["Forma", "Form"],
  ["Moraleja", "Moral"],
  ["Al premiarla", "On awarding it"],
  ["La crítica", "The critics"],
  ["Crítica y público esperados", "Expected critics and audience"],
  ["Costo final", "Final cost"],
  ["Recaudación", "Gross"],
  ["Etapa", "Stage"],
  ["Arco libre", "Free arc"],
  ["Fortuna", "Fortune"],
]);
