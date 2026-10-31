// ===== Filmografía completa del talento: sus obras contigo y las que hizo con los rivales (estrenadas y en producción) =====
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
    if (R0.length) L.push({ y: e.y, n: e.n, m: e.m, s: S.rv[e.o] ? S.rv[e.o].n : "", r: R0.join(", "), d: [e.C | 0, e.A | 0, Math.round((e.gR || 0) / hoyF(yr()))] });
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
    t.fh.slice(0, falta).forEach((x) => L.push(Object.assign({}, x, { r: rol(x.r) })));
  }
  L.sort((a, b) => b.y - a.y);
  const fila = (x) =>
    `<${x.id != null ? `button class="uni-r" data-a="det" data-v="${x.id}"` : `div class="uni-r"`} style="text-align:left"><b>${x.y}</b> «${esc(x.n)}»<span class="m"> · ${esc(MD[x.m] ? bibTr(MD[x.m][0]) : "")} · ${esc(x.s)}${x.r ? " · " + esc(x.r) : ""}${
      x.d ? ` · ${tx4("crítica", "critics", "critique", "crítica")} ${x.d[0]} · ${tx4("público", "audience", "public", "público")} ${x.d[1]} · ${fm(x.d[2])}` : " · " + tx4("en producción", "in production", "en production", "em produção")
    }</span></${x.id != null ? "button" : "div"}>`;
  return `<h3 translate="no">${esc(tx4("Filmografía completa", "Full filmography", "Filmographie complète", "Filmografia completa"))} (${L.length})</h3><div class="m" translate="no">${esc(
    tx4("Todo lo que hizo: contigo y con los demás estudios.", "Everything they've done: with you and with other studios.", "Tout ce qu'il a fait : avec toi et avec les autres studios.", "Tudo o que fez: com você e com os outros estúdios."),
  )}</div><div class="uni-l" translate="no">${L.slice(0, 40).map(fila).join("") || `<div class="m">${esc(tx4("Todavía no tiene obras.", "No works yet.", "Pas encore d'œuvres.", "Ainda sem obras."))}</div>`}</div>${L.length > 40 ? `<div class="m" translate="no">${esc(tx4(`Y ${L.length - 40} más.`, `And ${L.length - 40} more.`, `Et ${L.length - 40} de plus.`, `E mais ${L.length - 40}.`))}</div>` : ""}`;
}
