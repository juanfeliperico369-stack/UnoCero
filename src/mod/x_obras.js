// ===== Fichas completas de las obras de los rivales (archivo, historial de talentos, rankings y salón) y documento según la etapa =====
// Cada obra rival se arma siempre igual a partir de su semilla: géneros, personajes, equipo, cifras y semanas en cartelera.
// Las secuelas heredan el mundo y los personajes principales de la original. El equipo elegido al abrirla queda guardado.
const RWPC = { s: null, m: new Map(), id: new Map() };
const rwHash = (k) => {
  let h = 7;
  for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const rwAct = (x) => (S.rw || []).find((z) => z.o == x.o && z.n == x.n && z.y == x.y) || null;
const RWSUF = [/ II$/, / III$/, / IV$/, / V$/, /: el regreso$/, /: la saga continúa$/];
const rwOrd = (w) => w.y * 10 + (w.n == rwRaiz(w.n) ? 0 : 1 + Math.max(0, RWSUF.findIndex((r) => r.test(w.n))));
const rwFrL = (x) => {
  const raiz = rwRaiz(x.n),
    v = {};
  return (S.rw || [])
    .concat(S.rw40 || [])
    .filter((w) => w && w.o == x.o && w.m == x.m && rwRaiz(w.n) == raiz)
    .filter((w) => (v[w.n + "|" + w.y] ? 0 : (v[w.n + "|" + w.y] = 1)))
    .sort((a, b) => rwOrd(a) - rwOrd(b));
};
// La original de una secuela: la del mismo título base, estudio y medio, la más reciente antes de ella
const rwOrig = (x) => {
  const raiz = rwRaiz(x.n);
  if (x.n == raiz) return null;
  return rwFrL(x).filter((w) => w.n == raiz && w.y <= x.y).sort((a, b) => b.y - a.y)[0] || null;
};
// Su franquicia: la original y las secuelas que salen de ella (los títulos repetidos sin número son obras distintas)
const rwCanon = (x) => {
  const L = rwFrL(x),
    b = x.n == rwRaiz(x.n) ? x : rwOrig(x),
    es = (o, z) => o && z && o.n == z.n && o.y == z.y;
  if (!b) return L.filter((w) => es(w, x) || (w.n != rwRaiz(w.n) && !rwOrig(w)));
  return L.filter((w) => es(w, b) || (w.n != rwRaiz(w.n) && es(rwOrig(w), b)));
};
const rwNac = (t) => yr() - (t.age | 0);
const rwEnEpoca = (t, y) => t && !t.you && !t.dead && y - rwNac(t) >= 16 && y - rwNac(t) <= 85;
function rwElige(r, y, q, usados, k, f) {
  const L = S.tl
    .filter((t) => t && t.r == r && !usados.has(t.id) && rwEnEpoca(t, y) && (!f || f(t)))
    .sort((a, b) => Math.abs((a.s[r] | 0) - q) - Math.abs((b.s[r] | 0) - q) || a.id - b.id)
    .slice(0, 10);
  return L.length ? L[rwHash(k) % L.length] : null;
}
function rwPj(x) {
  if (!x || x.m == null || !MD[x.m] || !S) return null;
  if (RWPC.s !== S) {
    RWPC.s = S;
    RWPC.m = new Map();
    RWPC.id = new Map();
  }
  const k = rwKey(x);
  if (RWPC.m.has(k)) return RWPC.m.get(k);
  RWPC.m.set(k, null);
  const e = rwAct(x),
    m = x.m,
    y = x.y || yr(),
    org = rwOrig(x),
    Po = org ? rwPj(org) : null,
    rng0 = S.rng;
  let P = null;
  S.rng = semilla("obra|" + (S.sd || "") + "|" + k);
  try {
    const gl = sp(MD[m][5]),
      gi = gl.indexOf(x.g || x.g0 || (e && e.g0) || ""),
      Wo = Po ? wDeP(Po) : null,
      G = Wo && Wo.g.length ? Wo.g.slice(0, 3) : [gi >= 0 ? gi : ri(0, gl.length - 1)];
    if (!Wo && R() < 0.45) {
      const g2 = ri(0, gl.length - 1);
      if (!G.includes(g2)) G.push(g2);
    }
    const ag = e && e.ag != null ? e.ag : Po ? Po.age : ri(1, 4),
      w = Wo
        ? { g: G, tone: Wo.tone, pr: Wo.pr, age: ag, ty: Wo.ty, tm: Wo.tm, pa: Wo.pa, ar: Wo.ar, ep: Wo.ep, cy: Wo.cy, nm: x.n }
        : { g: G, tone: ri(0, TO.length - 1), pr: ri(0, PR.length - 1), age: ag, cx: ri(1, 3), ty: [ri(0, Math.max(0, ((TY[m] || [[]])[0] || []).length - 1))], tm: [ri(0, DX.tm.length - 1)], pa: [ri(0, DX.pa.length - 1)], ar: [ri(0, 6)], ep: R() < 0.55 ? 9 : ri(0, EP.length - 1), nm: x.n },
      nPj = conPers(m) ? ri(2, m == 1 || m == 2 ? 6 : 5) : ri(1, 3);
    P = frPlantilla(m, {
      w,
      pjs: (W2) => {
        const L = [];
        if (Po && Po.cast)
          Po.cast
            .filter((c) => c.i != 2)
            .slice(0, 3)
            .forEach((c) => L.push(Object.assign({}, c, { e: (c.e | 0) + Math.max(0, y - (Po.y || y)), ant: 1 })));
        W2.cast = L;
        while (L.length < nPj) L.push(pjNuevo(L.length ? (L.length < 3 ? 1 : pk([1, 5, 3])) : 0, W2));
        return L;
      },
    });
    if (!P) return null;
    // Cifras: lo conocido de la obra y lo demás coherente con su época y su resultado
    const C = x.C | 0 || ri(35, 75),
      A = x.A | 0 || ri(35, 75),
      gR = x.gN != null ? Math.round(x.gN * hoyF(y)) : x.gR || 0,
      gross = x.gN != null ? x.gN : Math.round(gR / hoyF(y)),
      bud = e && e.b ? e.b : Math.round(TB(m, y) * (0.35 + R() * 1.3) * (0.6 + (C + A) / 250)),
      fee = Math.round(bud * (0.12 + R() * 0.18)),
      mkc = Math.round(bud * (0.2 + R() * 0.45)),
      over = Math.round((1 + R() * 0.18) * 100) / 100,
      nS = m == 0 ? ri(6, 16) : m == 3 ? ri(10, 40) : ri(8, 28),
      q = 0.7 + R() * 0.2,
      sl = [],
      vivo = e && yr() - y <= 1;
    const g0 = (gross * (1 - q)) / (1 - Math.pow(q, nS));
    for (let i = 0; i < nS; i++) sl.push(Math.round(g0 * Math.pow(q, i)));
    const sem = Math.max(0, ri(0, 50)),
      rt = Math.min(S.t - 1, (y - S.y0) * 52 + sem),
      ver = vivo ? Math.max(1, Math.min(nS, S.t - rt)) : nS;
    let pr = 0;
    try {
      pr = precio(m, S.reg, y);
    } catch (er) {}
    Object.assign(P, {
      id: -(1 + (rwHash("id" + k) % 1e9)),
      n: x.n,
      m,
      y,
      rvo: x.o,
      rwk: k,
      st: vivo ? 3 : 4,
      rt,
      r0: rt,
      c: C,
      a: A,
      h: Math.round((C + A) / 2),
      E: e && e.E != null ? Math.round(e.E) : cl(Math.round((C + A) / 2 + ri(-12, 12))),
      gross,
      gR,
      sl: sl.slice(0, ver),
      slN: ver,
      op: sl[0] || 0,
      adm: pr > 0 ? Math.round(gross / pr) : 0,
      earn: Math.round(gross * ((MKP[m] && MKP[m].sh) || 0.5)),
      bud,
      br: Math.round((bud / Math.max(1, TB(m, y))) * 100) / 100,
      fee,
      mkc,
      over,
      cost: Math.round((bud + fee) * over + mkc),
      paid: Math.round((bud + fee) * over + mkc),
      aw: [],
      fid: 0,
    });
    P.fid = P.id;
    if (Po && Po.epY != null) P.epY = Po.epY + (y - Po.y);
    else if (Po) P.epY = (typeof uniY == "function" ? uniY(Po) : Po.y) + (y - Po.y);
    // Equipo y reparto: lo que ya se sabe (dirección, protagonista, el talento de su historial) y el resto con gente de esa época
    const S0 = (S.rwc = S.rwc || {}),
      sv = S0[k],
      usados = new Set(),
      qq = Math.round((C + A) / 2),
      dr = m == 4 ? 5 : 1,
      crew = {};
    if (x.d != null && S.tl[x.d]) crew[dr] = x.d;
    if (x.a != null && S.tl[x.a] && MD[m][1].includes(7)) crew[7] = x.a;
    (x.eq || []).forEach(([r, id]) => S.tl[id] && (crew[r] = id));
    Object.values(crew).forEach((id) => usados.add(id));
    MD[m][1].forEach((r) => {
      if (crew[r] != null) return;
      if (sv && sv.c && sv.c[r] != null && S.tl[sv.c[r]]) return usados.add((crew[r] = sv.c[r]));
      const t = rwElige(r, y, qq, usados, k + "|c" + r);
      if (t) usados.add((crew[r] = t.id));
    });
    P.crew = crew;
    const actua = [0, 1, 3].includes(m) || (m == 2 && y >= 1995);
    (P.cast || []).forEach((c, i) => {
      c.t = null;
      if (!actua || c.i == 2 || c.vir) return;
      if (i == 0 && x.a != null && S.tl[x.a]) c.t = x.a;
      else if (c.ant) {
        const o0 = (Po.cast || []).find((z) => z.n == c.n);
        if (o0 && o0.t != null && S.tl[o0.t]) c.t = o0.t;
      }
      if (c.t == null && sv && sv.a && sv.a[i] != null && S.tl[sv.a[i]]) c.t = sv.a[i];
      if (c.t == null) {
        const t = rwElige(7, y, qq, usados, k + "|a" + i, (t2) => (!t2.ge || t2.ge == c.x) && Math.abs(y - rwNac(t2) - (c.e | 0)) <= 15);
        if (t) c.t = t.id;
      }
      if (c.t != null) usados.add(c.t);
    });
    if (!sv) {
      S0[k] = { c: Object.assign({}, crew), a: (P.cast || []).map((c) => c.t) };
      const K = Object.keys(S0);
      if (K.length > 500) K.slice(0, K.length - 500).forEach((z) => delete S0[z]);
    }
  } catch (er) {
    console.error("rwPj", er);
    P = null;
  } finally {
    S.rng = rng0;
  }
  RWPC.m.set(k, P);
  if (P) RWPC.id.set(P.id, P);
  return P;
}
// ---------- La ficha: la misma de tus obras, sin tus botones de gestión y con lo propio de una obra ajena ----------
let RWD = null;
const RWOK = ["x", "tp", "rvdoc", "rvp", "rwo", "rwfr", "rwbuy", "inf"];
function rwCard(x, P) {
  const L = rwCanon(x),
    i = L.findIndex((w) => w.n == x.n && w.y == x.y),
    Ps = L.map((w) => [w, rwPj(w)]),
    cr = Ps.slice().sort((a, b) => (a[1] && b[1] ? uniY(a[1]) - uniY(b[1]) : 0) || a[0].y - b[0].y),
    mismo = cr.every((z, j) => z[0] === Ps[j][0]),
    fila = ([w, p], j) => `<button class="uni-r" data-a="rwo" data-v="${w.o}|${w.y}|${encodeURIComponent(w.n)}"${w.n == x.n && w.y == x.y ? ' style="border-left-color:var(--g)"' : ""}><b>${j + 1}.</b> «${esc(w.n)}»<span class="m"> · ${w.y}${p && !mismo ? " · " + anoTxt(uniY(p)) : ""} · ${fm0(w.gR || 0)}</span></button>`,
    tx = (a, b, c, d) => esc(tx4(a, b, c, d)),
    mia = S.pj.find((p) => p.adq && (p.adq.rw == rwKey(x) || (p.n == x.n && p.y == x.y))),
    ya = mia || (S.rwb40 || []).includes(rwKey(x)),
    pr = rwPrecio(x),
    raiz = rwRaiz(x.n);
  return `<div class="c rw-c" translate="no"><div class="rw-est"><span class="rw-tag">${tx("Obra rival", "Rival work", "Œuvre rivale", "Obra rival")}</span><span class="m">${tx("Estudio", "Studio", "Studio", "Estúdio")}:</span>${S.rv[x.o] ? `<button class="lnk" data-a="rvp" data-v="${x.o}">${esc(rvNom(x.o))}</button>` : `<b>${esc(x.s || rvNom(x.o))}</b>`}</div>${
    L.length > 1
      ? `<h3>${ic("franquicia")} ${tx("Franquicia", "Franchise", "Franchise", "Franquia")} «${esc(raiz)}» · ${tx(`${i + 1} de ${L.length} en el canon`, `${i + 1} of ${L.length} in the canon`, `${i + 1} sur ${L.length} dans le canon`, `${i + 1} de ${L.length} no cânone`)}</h3><div class="m">${mismo ? tx("Canon y cronología interna: el orden de estreno es el mismo que el de la historia.", "Canon and in-story chronology: release order matches story order.", "Canon et chronologie interne : l'ordre de sortie suit celui de l'histoire.", "Cânone e cronologia interna: a ordem de lançamento segue a da história.") : tx("Canon, por orden de estreno:", "Canon, by release order:", "Canon, par ordre de sortie :", "Cânone, por ordem de lançamento:")}</div><div class="uni-l">${Ps.map(fila).join("")}</div>${mismo ? "" : `<div class="m" style="margin-top:6px">${tx("Cronología interna, por el año en que ocurre cada historia:", "In-story chronology, by the year each story takes place:", "Chronologie interne, selon l'année où se passe chaque histoire :", "Cronologia interna, pelo ano em que cada história acontece:")}</div><div class="uni-l">${cr.map(fila).join("")}</div>`}`
      : ""
  }<div class="bts" style="margin-top:8px">${S.rv[x.o] ? bt("rwfr", x.o + "|" + encodeURIComponent(raiz), ic("franquicia") + " " + tx("Franquicia «", 'Franchise "', "Franchise « ", "Franquia «") + esc(raiz) + (IDI == "en" ? '"' : "»")) : ""}${
    mia ? bt("fro", mia.fid, ic("franquicia") + " " + tx("Ya es tuya: ver tu franquicia", "It's yours: see your franchise", "Elle est à toi : voir ta franchise", "Já é sua: ver sua franquia")) : ya ? "" : S.rv[x.o] ? bt("rwbuy", "", ic("dinero") + " " + tx("Comprar la obra y su franquicia", "Buy the work and its franchise", "Acheter l'œuvre et sa franchise", "Comprar a obra e sua franquia") + " · " + fm(pr), S.cash >= pr ? "a" : "off") : ""
  }</div>${ya || !S.rv[x.o] ? "" : `<div class="m">${tx("Al comprarla, la obra, su original y sus secuelas pasan a tus franquicias con esta misma ficha, y quedan en Material para continuarlas.", "When you buy it, the work, its original and its sequels join your franchises with this same sheet, and stay in Material to continue them.", "En l'achetant, l'œuvre, son original et ses suites rejoignent tes franchises avec cette même fiche, et restent dans Matériel pour les continuer.", "Ao comprá-la, a obra, a original e as sequências passam para suas franquias com esta mesma ficha e ficam em Material para continuá-las.")}</div>`}</div>`;
}
function rwDetH(h, D) {
  h = h.replace(/data-a="pdoc" data-v="[^"]*"/g, `data-a="rvdoc" data-v="${D.P.id}"`);
  h = h.replace(/<button\b[^>]*\bdata-a="([^"]+)"[^>]*>[\s\S]*?<\/button>/g, (b, a) => (RWOK.includes(a) ? b : ""));
  h = h.replace(/<select\b[\s\S]*?<\/select>/g, "").replace(/<input\b[^>]*>/g, "");
  h = h.replace(/<div class="c bts"><\/div>/g, "").replace(/<div class="bts"[^>]*>\s*<\/div>/g, "");
  h = h.replace(/>Tu parte</, `><span translate="no">${esc(tx4("Parte del estudio", "Studio's share", "Part du studio", "Parte do estúdio"))}</span><`);
  const c = rwCard(D.x, D.P),
    k = h.indexOf('<canvas id="sc"');
  if (k >= 0) {
    const j = h.indexOf("</div>", h.indexOf("</canvas>", k));
    return h.slice(0, j + 6) + c + h.slice(j + 6);
  }
  const j = h.indexOf("</div>", h.indexOf("</h2>"));
  return j >= 0 ? h.slice(0, j + 6) + c + h.slice(j + 6) : c + h;
}
const opRw = op;
op = function (h) {
  if (RWD && typeof h == "string") {
    const D = RWD;
    RWD = null;
    h = rwDetH(h, D);
  }
  return opRw.apply(this, [h].concat([].slice.call(arguments, 1)));
};
const rwConP = (P, f) => {
  S.pj.push(P);
  try {
    return f();
  } finally {
    const i = S.pj.indexOf(P);
    if (i >= 0) S.pj.splice(i, 1);
    if (S.fr && S.fr[P.fid]) delete S.fr[P.fid];
  }
};
const porgRw = porg;
porg = function (P) {
  if (!P || P.rvo == null) return porgRw.apply(this, arguments);
  const x = { n: P.n, o: P.rvo, m: P.m, y: P.y },
    o = rwOrig(x),
    L = rwCanon(x);
  return (o ? "Secuela de «" + esc(o.n) + "» (" + o.y + ")" : "Obra original") + (L.length > 1 ? " · franquicia «" + esc(rwRaiz(P.n)) + "»" : "");
};
function rwDet(x) {
  const P = rwPj(x);
  if (!P) return rwFichaX0(x);
  RWX = x;
  RWD = { P, x };
  try {
    rwConP(P, () => det(P.id));
  } finally {
    RWD = null;
  }
  requestAnimationFrame(() =>
    document.querySelectorAll("canvas.pt").forEach((c) => {
      if (+c.dataset.id == P.id)
        try {
          poster(c, P);
        } catch (er) {}
    }),
  );
}
const rwFichaX0 = rwFichaX;
rwFichaX = function (x) {
  return rwDet(x);
};
ACT["rvdoc"] = (v) => {
  const P = RWPC.id.get(+v);
  if (P) return rwConP(P, () => ACT["pdoc"](P.id));
};
// La franquicia de un rival: su canon por medio, sin mezclar obras que solo comparten título
ACT["rwfr"] = (v) => {
  const [o, f0] = String(v).split("|"),
    f = decodeURIComponent(f0),
    v2 = {},
    L = (S.rw || [])
      .concat(S.rw40 || [])
      .filter((x) => x && x.o == +o && rwRaiz(x.n) == f)
      .filter((x) => (v2[x.n + "|" + x.y] ? 0 : (v2[x.n + "|" + x.y] = 1)))
      .sort((a, b) => a.y - b.y),
    ms = uniq(L.map((x) => x.m)),
    tx = (a, b, c, d) => esc(tx4(a, b, c, d));
  op(
    `<div class="c" translate="no"><div class="k"><h2 style="margin:0">${ic("franquicia")} ${esc(f)}</h2>${btx()}</div><div class="m">${S.rv[+o] ? `<button class="lnk" data-a="rvp" data-v="${o}">${esc(rvNom(+o))}</button>` : esc(rvNom(+o))} · ${L.length} ${tx("obras", "works", "œuvres", "obras")} · ${fm0(L.reduce((s, x) => s + (x.gR || 0), 0))} ${tx("en total (hoy)", "in total (today)", "au total (aujourd'hui)", "no total (hoje)")}</div><div class="m">${tx("Cada medio es su propio canon, en orden de estreno. Los títulos repetidos sin número son obras distintas. Toca una obra para ver su ficha.", "Each medium is its own canon, in release order. Repeated titles without a number are different works. Tap a work to see its sheet.", "Chaque média est son propre canon, par ordre de sortie. Les titres répétés sans numéro sont des œuvres différentes. Touche une œuvre pour voir sa fiche.", "Cada meio é seu próprio cânone, em ordem de lançamento. Títulos repetidos sem número são obras diferentes. Toque numa obra para ver sua ficha.")}</div></div>` +
      (ms
        .map((m) => {
          const M = L.filter((x) => x.m == m);
          return `<div class="c" translate="no"><h3 style="margin:0 0 6px">${esc(bibTr(MD[m][0]))} (${M.length})</h3><div class="uni-l">${M.map((x, j) => `<button class="uni-r" data-a="rwo" data-v="${x.o}|${x.y}|${encodeURIComponent(x.n)}"><b>${j + 1}.</b> «${esc(x.n)}»<span class="m"> · ${x.y} · ${tx("crítica", "critics", "critique", "crítica")} ${x.C | 0} · ${fm0(x.gR || 0)}</span></button>`).join("")}</div></div>`;
        })
        .join("") || `<div class="c m">${tx("Sin obras archivadas todavía.", "No archived works yet.", "Pas encore d'œuvres archivées.", "Ainda sem obras arquivadas.")}</div>`),
  );
};
// Salón: las obras de los rivales abren su ficha completa
const slobraOb = ACT["slobra"];
ACT["slobra"] = (v) => {
  if (/^\d+$/.test(v) && pj(+v)) return det(+v);
  const x = salObras().find((z) => String(z.id) == String(v));
  if (!x || x.mia || x.o == null || x.o < 0 || x.m == null) return slobraOb(v);
  const w = (S.rw40 || []).concat(S.rw || []).find((z) => z.o == x.o && z.n == x.n && z.y == x.y);
  return rwDet(w ? Object.assign({ g: w.g || w.g0 || "" }, w) : { n: x.n, o: x.o, m: x.m, y: x.y, g: "", C: x.C | 0, A: x.A | 0, gR: x.gR || 0 });
};
// Rankings de obras: cada fila abre su ficha, tuya o del rival
ACT["rkob"] = (v) => {
  const [o, y, n0] = String(v).split("|"),
    n = decodeURIComponent(n0);
  if (+o < 0) {
    const P = S.pj.find((p) => p.n == n && (p.y == +y || dy(p) == +y)) || S.pj.find((p) => p.n == n);
    return P ? det(P.id) : null;
  }
  const w = (S.rw40 || []).concat(S.rw || []).find((z) => z.o == +o && z.n == n && z.y == +y);
  const top = [].concat(...MD.map((_, m) => (S.top[m] || []).map((z) => Object.assign({ m }, z)))).find((z) => z.o == +o && z.n == n && z.y == +y);
  if (w) return rwDet(Object.assign({ g: w.g || w.g0 || "" }, w));
  if (top) return rwDet({ n, o: +o, m: top.m, y: +y, g: "", gR: top.gR || 0 });
};
// ---------- Tus obras: su lugar en el canon y en la cronología de la franquicia ----------
V37.ficha.push((P) => {
  if (!P || P.rvo != null || P.fid == null || P.id < 0) return "";
  const L = frPs(P.fid).slice();
  if (L.length < 2) return "";
  const can = L.slice().sort((a, b) => (a.rt == null ? 1e9 : a.rt) - (b.rt == null ? 1e9 : b.rt) || a.id - b.id),
    cro = L.slice().sort((a, b) => uniY(a) - uniY(b) || (a.rt || 0) - (b.rt || 0)),
    i = can.indexOf(P),
    j = cro.indexOf(P),
    tx = (a, b, c, d) => esc(tx4(a, b, c, d));
  return `<div class="c" translate="no"><h3 style="margin:0 0 4px">${ic("franquicia")} «${esc(frG(P.fid).n)}»</h3><div class="m">${tx(`${i + 1} de ${L.length} en el canon · ${j + 1} de ${L.length} en la cronología interna`, `${i + 1} of ${L.length} in the canon · ${j + 1} of ${L.length} in the in-story chronology`, `${i + 1} sur ${L.length} dans le canon · ${j + 1} sur ${L.length} dans la chronologie interne`, `${i + 1} de ${L.length} no cânone · ${j + 1} de ${L.length} na cronologia interna`)}</div><div class="uni-l">${can
    .slice(Math.max(0, i - 3), i + 4)
    .map((p) => `<button class="uni-r" data-a="det" data-v="${p.id}"${p === P ? ' style="border-left-color:var(--g)"' : ""}><b>${can.indexOf(p) + 1}.</b> «${esc(p.n)}»<span class="m"> · ${esc(bibTr(MD[p.m][0]))} · ${p.st >= 3 ? dy(p) : tx("en desarrollo", "in development", "en développement", "em desenvolvimento")} · ${anoTxt(uniY(p))}</span></button>`)
    .join("")}</div></div>`;
});
// ---------- El documento cambia con la etapa: idea, guion escrito, producción y obra estrenada ----------
const docDatosOb = docDatos;
docDatos = function () {
  const d = docDatosOb.apply(this, arguments);
  try {
    if (W && W.gsc != null) d.gui = { n: W.gsc | 0, t: S.tl[W.escT] ? S.tl[W.escT].n + (S.tl[W.escT].you ? " (" + T40("tú", "you") + ")" : "") : "" };
    else if (W && W.gs) d.gui = { comp: 1, t: W.gs.au || "" };
  } catch (er) {}
  return d;
};
const docObraOb = docObra;
docObra = function (P) {
  const o = docObraOb.apply(this, arguments);
  if (!o || !P) return o;
  o.est = P.rvo != null ? rvNom(P.rvo) : S.sn + (P.adq ? " · " + tx4(`comprada a ${P.adq.r} en ${P.adq.y}`, `bought from ${P.adq.r} in ${P.adq.y}`, `achetée à ${P.adq.r} en ${P.adq.y}`, `comprada de ${P.adq.r} em ${P.adq.y}`) : "");
  if (P.st >= 3) {
    o.op = P.op || 0;
    o.sem = slSem(P);
    o.adm = P.adm || 0;
    o.earn = P.earn || 0;
    o.gan = (P.earn || 0) - (P.cost || P.paid || 0);
    o.yo = P.rvo == null;
  }
  try {
    if (P.rvo != null) {
      const x = { n: P.n, o: P.rvo, m: P.m, y: P.y },
        L = rwCanon(x);
      if (L.length > 1) o.can = "«" + rwRaiz(P.n) + "» · " + tx4(`${L.findIndex((w) => w.n == P.n && w.y == P.y) + 1} de ${L.length} en el canon`, `${L.findIndex((w) => w.n == P.n && w.y == P.y) + 1} of ${L.length} in the canon`, `${L.findIndex((w) => w.n == P.n && w.y == P.y) + 1} sur ${L.length} dans le canon`, `${L.findIndex((w) => w.n == P.n && w.y == P.y) + 1} de ${L.length} no cânone`);
    } else if (P.fid != null && frPs(P.fid).length > 1) {
      const L = frPs(P.fid)
        .slice()
        .sort((a, b) => (a.rt == null ? 1e9 : a.rt) - (b.rt == null ? 1e9 : b.rt));
      o.can = "«" + frG(P.fid).n + "» · " + tx4(`${L.indexOf(P) + 1} de ${L.length} en el canon`, `${L.indexOf(P) + 1} of ${L.length} in the canon`, `${L.indexOf(P) + 1} sur ${L.length} dans le canon`, `${L.indexOf(P) + 1} de ${L.length} no cânone`);
    }
  } catch (er) {}
  return o;
};
const docModeloOb = docModelo;
docModelo = function (d, modo) {
  const B = docModeloOb.apply(this, arguments),
    P = d.P;
  // El guion: quién lo escribió y su nota (sin dinero, también en «Solo la historia»)
  if (d.gui) {
    const k = B.findIndex((b) => b.k == "h1" && b.t == "La trama");
    const add = [{ k: "h1", t: "El guion" }, { k: "tb", f: d.gui.comp ? [["Estado", T40("Guion comprado", "Bought script")], ["Escrito por", d.gui.t]].filter((r) => r[1]) : [["Estado", T40("Guion terminado", "Finished script")], ["Escrito por", d.gui.t], ["Nota del guion", d.gui.n + " / 100"]].filter((r) => r[1]) }];
    B.splice(k >= 0 ? k : B.length - 1, 0, ...add);
  }
  if (P && modo != "h") {
    const k = B.findIndex((b) => b.k == "h1" && b.t == "Datos técnicos"),
      tb = k >= 0 && B[k + 1] && B[k + 1].k == "tb" ? B[k + 1] : null;
    if (tb) {
      const ext = [
        ["Estudio", P.est],
        ["Franquicia", P.can],
        ["Primera semana", P.op ? fm(P.op) : ""],
        ["Semanas", P.sem ? P.sem + "" : ""],
        ["Público total", P.adm ? nfc(P.adm) : ""],
        [P.yo ? "Tu parte" : "Parte del estudio", P.earn ? fm(P.earn) : ""],
        ["Ganancia", P.earn ? fm(P.gan) : ""],
      ].filter((r) => r[1]);
      tb.f.splice(1, 0, ...ext.slice(0, 2));
      tb.f.push(...ext.slice(2));
    }
  }
  return B;
};
E40L([
  ["El guion", "The script"],
  ["Estado", "Status"],
  ["Escrito por", "Written by"],
  ["Nota del guion", "Script score"],
  ["Estudio", "Studio"],
  ["Franquicia", "Franchise"],
  ["Primera semana", "Opening week"],
  ["Semanas", "Weeks"],
  ["Público total", "Total audience"],
  ["Tu parte", "Your share"],
  ["Parte del estudio", "Studio's share"],
  ["Ganancia", "Profit"],
  ["Guion terminado", "Finished script"],
  ["Guion comprado", "Bought script"],
]);
(() => {
  if (typeof DIC_FR == "undefined") return;
  [
    ["El guion", "Le scénario", "O roteiro"],
    ["Estado", "État", "Estado"],
    ["Escrito por", "Écrit par", "Escrito por"],
    ["Nota del guion", "Note du scénario", "Nota do roteiro"],
    ["Estudio", "Studio", "Estúdio"],
    ["Franquicia", "Franchise", "Franquia"],
    ["Primera semana", "Première semaine", "Primeira semana"],
    ["Semanas", "Semaines", "Semanas"],
    ["Público total", "Public total", "Público total"],
    ["Tu parte", "Ta part", "Sua parte"],
    ["Parte del estudio", "Part du studio", "Parte do estúdio"],
    ["Ganancia", "Bénéfice", "Lucro"],
    ["Guion terminado", "Scénario terminé", "Roteiro pronto"],
    ["Guion comprado", "Scénario acheté", "Roteiro comprado"],
  ].forEach(([e, f, p]) => {
    if (DIC_FR[e] == null) DIC_FR[e] = f;
    if (DIC_PT[e] == null) DIC_PT[e] = p;
  });
})();
