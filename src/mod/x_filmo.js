// ===== Historial de proyectos del talento: sus obras contigo y las que hizo con los rivales (estrenadas y en producción) =====
function tFilmo(t, ps) {
  const L = [],
    rol = (r) => bibTr(RO[r] || ""),
    ri0 = (m) => (m == 4 ? 5 : 1);
  ps.forEach((p) => {
    const R0 = Object.entries(p.crew || {})
      .filter(([, id]) => id == t.id)
      .map(([r]) => rol(+r))
      .concat((p.cast || []).filter((c) => c.t == t.id).map((c) => bibTr(IMP[c.i] ? IMP[c.i][0] : "") + ": " + c.n));
    L.push({ y: p.y || yr(), n: p.n, m: p.m, s: S.sn, r: uniq(R0).join(", "), d: p.st >= 3 ? [Math.round(p.c || 0), Math.round(p.a || 0), p.gross || 0] : null, id: p.id });
  });
  (S.rw || []).forEach((e) => {
    const R0 = [e.d == t.id ? rol(ri0(e.m)) : "", e.a == t.id ? rol(7) : ""].filter(Boolean);
    if (R0.length) L.push({ y: e.y, n: e.n, m: e.m, s: S.rv[e.o] ? S.rv[e.o].n : "", r: R0.join(", "), d: [e.C | 0, e.A | 0, Math.round((e.gR || 0) / hoyF(yr()))], a: "rwo", v: e.o + "|" + e.y + "|" + encodeURIComponent(e.n) });
  });
  (S.mq || []).forEach((q) => {
    const R0 = [q.d == t.id ? rol(ri0(q.m)) : "", q.a == t.id ? rol(7) : ""].filter(Boolean);
    if (R0.length) L.push({ y: yr(), n: q.n, m: q.m, s: S.rv[q.o] ? S.rv[q.o].n : "", r: R0.join(", "), d: null, pr: 1 });
  });
  // El resto de su carrera (antes de llegar a tu mundo o en proyectos sin registro): se arma una vez, siempre igual, y queda guardada
  const falta = Math.max(0, (t.pj | 0) - L.length);
  if (falta && !t.you) {
    if (!t.fh || t.fh.length < falta) {
      let s = (t.id * 7919 + 104729) % 233280;
      const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280,
        nac = yr() - (t.age | 0),
        ms = MD.map((m, i) => i).filter((i) => (t.ma ? t.ma[i] | 0 : 50) >= 35),
        rv = S.rv.map((o) => o.n).filter(Boolean),
        H = t.fh || [];
      while (H.length < falta && ms.length) {
        const m = ms[Math.floor(rnd() * ms.length)],
          y0 = Math.max(nac + 16, MD[m][2]),
          y1 = yr() - 1;
        if (y0 > y1) break;
        const y = y0 + Math.floor(rnd() * (y1 - y0 + 1)),
          q = cl((t.s[t.r] | 0) + Math.round((rnd() - 0.5) * 30), 10, 99);
        H.push({ y, n: ttlR(), m, s: rv.length ? rv[Math.floor(rnd() * rv.length)] : "", r: t.r, d: [q, cl(q + Math.round((rnd() - 0.5) * 20), 10, 99), Math.round(TB(m, y) * (0.3 + rnd() * 2.5))] });
      }
      t.fh = H;
    }
    t.fh.slice(0, falta).forEach((x, i) => L.push(Object.assign({}, x, { r: rol(x.r), a: "thf", v: t.id + "|" + i })));
  }
  L.sort((a, b) => b.y - a.y);
  const fila = (x) =>
    `<${x.id != null ? `button class="uni-r" data-a="det" data-v="${x.id}"` : x.a ? `button class="uni-r" data-a="${x.a}" data-v="${x.v}"` : `div class="uni-r"`} style="text-align:left"><b>${x.y}</b> «${esc(x.n)}»<span class="m"> · ${esc(MD[x.m] ? bibTr(MD[x.m][0]) : "")} · ${esc(x.s)}${x.r ? " · " + esc(x.r) : ""}${
      x.d ? ` · ${tx4("crítica", "critics", "critique", "crítica")} ${x.d[0]} · ${tx4("público", "audience", "public", "público")} ${x.d[1]} · ${fm(x.d[2])}` : " · " + tx4("en producción", "in production", "en production", "em produção")
    }</span></${x.id != null || x.a ? "button" : "div"}>`;
  return `<h3 translate="no">${esc(tx4("Historial de proyectos", "Project history", "Historique des projets", "Histórico de projetos"))} (${L.length})</h3><div class="m" translate="no">${esc(
    tx4("Todo lo que hizo: contigo y con los demás estudios.", "Everything they've done: with you and with other studios.", "Tout ce qu'il a fait : avec toi et avec les autres studios.", "Tudo o que fez: com você e com os outros estúdios."),
  )}</div><div class="uni-l" translate="no">${L.slice(0, 40).map(fila).join("") || `<div class="m">${esc(tx4("Todavía no tiene obras.", "No works yet.", "Pas encore d'œuvres.", "Ainda sem obras."))}</div>`}</div>${L.length > 40 ? `<div class="m" translate="no">${esc(tx4(`Y ${L.length - 40} más.`, `And ${L.length - 40} more.`, `Et ${L.length - 40} de plus.`, `E mais ${L.length - 40}.`))}</div>` : ""}`;
}
// ---------- Ficha de una obra rival: más datos, su franquicia y la opción de comprarla ----------
const rwRaiz = (n) =>
  String(n)
    .replace(/ (II|III|IV|V)$|\s?: el regreso$|\s?: la saga continúa$/, "")
    .trim();
const rwKey = (x) => x.o + "|" + x.y + "|" + x.n;
const rwPrecio = (x) => Math.max(Math.round(TB(x.m) * 0.3), Math.round(((x.gR || 0) / hoyF(yr())) * 0.25 * (1 + Math.max(0, 20 - (yr() - x.y)) / 40)));
let RWX = null;
function rwFichaX(x) {
  RWX = x;
  const d = S.tl[x.d],
    a = S.tl[x.a],
    e = (S.rw || []).find((z) => z.o == x.o && z.n == x.n && z.y == x.y) || {},
    raiz = rwRaiz(x.n),
    mia = S.pj.find((p) => p.adq && (p.adq.rw == rwKey(x) || p.adq.rw == e.id)),
    ya = mia || (S.rwb40 || []).includes(rwKey(x)) || (e.id && (S.rwb || []).includes(e.id)),
    pr = rwPrecio(x),
    tx = (a1, b, c, dd) => esc(tx4(a1, b, c, dd)),
    kv = (k, v) => (v != null && v !== "" ? `<div><div class="m">${k}</div><b>${v}</b></div>` : "");
  op(`<div class="c"><div class="k"><h2 style="margin:0">«${esc(x.n)}»</h2>${btx()}</div><div class="m">${esc(E40("Ficha de la obra rival", "Rival work sheet"))}</div>
<div class="g">${kv(L37("Estudio", "Studio"), S.rv[x.o] ? `<button class="lnk" data-a="rvp" data-v="${x.o}">${esc(rvNom(x.o))}</button>` : esc(x.s || "—"))}${kv(L37("Medio", "Medium"), esc(MD[x.m] ? MD[x.m][0] : ""))}${kv(L37("Año", "Year"), x.y)}${kv(L37("Género", "Genre"), esc(x.g || e.g0 || "—"))}${kv(L37("Crítica", "Critics"), x.C)}${kv(L37("Público", "Audience"), x.A)}${kv(L37("Expectativa", "Hype"), e.E != null ? Math.round(e.E) : null)}${kv(L37("Clasificación", "Rating"), e.ag != null && AG[e.ag] ? AG[e.ag][0] : null)}${kv(L37("Presupuesto", "Budget"), e.b ? fm(e.b) : null)}${kv(L37("Recaudación (hoy)", "Gross (today)"), x.gN != null ? fm(x.gN) : fm0(x.gR || 0))}</div>
${d ? `<button class="fila lista" data-a="tp" data-v="${d.id}"><span>${x.m == 4 ? RO[5] : L37("Dirección", "Director")}: ${esc(d.n)}</span><span class="m">${d.s[x.m == 4 ? 5 : 1]}</span></button>` : ""}${a ? `<button class="fila lista" data-a="tp" data-v="${a.id}"><span>${L37("Protagonista", "Lead")}: ${esc(a.n)}</span><span class="m">${a.s[7]}</span></button>` : ""}${(x.eq || []).map(([r, id]) => (S.tl[id] ? `<button class="fila lista" data-a="tp" data-v="${id}"><span>${esc(RO[r])}: ${esc(S.tl[id].n)}</span><span class="m">${S.tl[id].s[r]}</span></button>` : "")).join("")}
<div class="bts" style="margin-top:8px" translate="no">${S.rv[x.o] ? bt("rwfr", x.o + "|" + encodeURIComponent(raiz), ic("franquicia") + " " + tx("Franquicia «", "Franchise \"", "Franchise « ", "Franquia «") + esc(raiz) + (IDI == "en" ? '"' : "»")) : ""}${
    mia ? bt("fro", mia.fid, ic("franquicia") + " " + tx("Ya es tuya: ver tu franquicia", "It's yours: see your franchise", "Elle est à toi : voir ta franchise", "Já é sua: ver sua franquia")) : ya ? "" : S.rv[x.o] ? bt("rwbuy", "", ic("dinero") + " " + tx("Comprar la obra y su franquicia", "Buy the work and its franchise", "Acheter l'œuvre et sa franchise", "Comprar a obra e sua franquia") + " · " + fm(pr), S.cash >= pr ? "a" : "off") : ""
  }</div>${ya || !S.rv[x.o] ? "" : `<div class="m" translate="no">${tx("Al comprarla, la obra y las demás de su franquicia pasan a tus franquicias, cada una con su ficha, y quedan en Material para continuarlas.", "When you buy it, the work and the rest of its franchise join your franchises, each with its sheet, and stay in Material to continue them.", "En l'achetant, l'œuvre et le reste de sa franchise rejoignent tes franchises, chacune avec sa fiche, et restent dans Matériel pour les continuer.", "Ao comprá-la, a obra e as demais da franquia passam para suas franquias, cada uma com sua ficha, e ficam em Material para continuá-las.")}</div>`}</div>`);
}
rwFicha = function (k) {
  const x = (S.rw40 || [])[k];
  if (x) rwFichaX(x);
};
ACT["rwo"] = (v) => {
  const [o, y, n0] = String(v).split("|"),
    n = decodeURIComponent(n0),
    x = (S.rw40 || []).find((z) => z.o == +o && z.y == +y && z.n == n),
    e = (S.rw || []).find((z) => z.o == +o && z.y == +y && z.n == n);
  if (x) return rwFichaX(x);
  if (e) return rwFichaX({ n: e.n, o: e.o, m: e.m, y: e.y, g: e.g0 || "", C: e.C | 0, A: e.A | 0, gR: e.gR || 0, d: e.d, a: e.a });
};
ACT["thf"] = (v) => {
  const [tid, i] = String(v).split("|").map(Number),
    t = S.tl[tid],
    h = t && t.fh && t.fh[i];
  if (!h) return;
  const o = S.rv.findIndex((r) => r && r.n == h.s);
  return rwFichaX({ n: h.n, o, s: h.s, m: h.m, y: h.y, g: "", C: h.d[0], A: h.d[1], gN: h.d[2], gR: Math.round(h.d[2] * hoyF(yr())), d: t.r == 1 || (h.m == 4 && t.r == 5) ? t.id : null, a: t.r == 7 ? t.id : null, eq: [1, 7].includes(t.r) || (h.m == 4 && t.r == 5) ? [] : [[t.r, t.id]] });
};
ACT["rwbuy"] = () => {
  const x = RWX;
  if (!x || !S.rv[x.o]) return;
  const pr = rwPrecio(x);
  if (S.cash < pr) return toast("Fondos insuficientes");
  gasta("otros", pr);
  S.rwb40 = (S.rwb40 || []).concat([rwKey(x)]);
  const e = (S.rw || []).find((z) => z.o == x.o && z.n == x.n && z.y == x.y);
  if (e) S.rwb = (S.rwb || []).concat([e.id]);
  S.mt.push({ i: "w" + S.t + "" + S.mt.length, n: rwRaiz(x.n), a: rvNom(x.o), y: x.y, k: "Franquicia de " + MD[x.m][0].toLowerCase(), g: [x.g].filter(Boolean), f: cl(Math.round(40 + (x.A || 50) / 3), 30, 95), pd: 0, pr, u: 0 });
  S.rv[x.o].gan = (S.rv[x.o].gan || 0) + pr;
  nws(tx4(`Compras a ${rvNom(x.o)} «${x.n}» y su franquicia por ${fm(pr)}.`, `You buy "${x.n}" and its franchise from ${rvNom(x.o)} for ${fm(pr)}.`, `Tu achètes « ${x.n} » et sa franchise à ${rvNom(x.o)} pour ${fm(pr)}.`, `Você compra «${x.n}» e sua franquia de ${rvNom(x.o)} por ${fm(pr)}.`));
  frImporta(Object.assign({ g0: x.g, id: e ? e.id : rwKey(x) }, x));
  return rwFichaX(x);
};

