// ===== Sello musical: los artistas llegan solos a pedir firmar, publican su música y el sello cobra su parte =====
// Armar grupos a mano sigue igual; esto se suma. Sus integrantes siguen siendo talentos de todo el ecosistema.
const ofb = () => (S.ofb41 = (S.ofb41 || []).filter((o) => o.e > S.t));
const selOk = () => S && !S.pre && !S.taller && yr() >= 1900;
// Candidatos con oído: intérpretes y compositores, y productores o actores con mucha habilidad musical
const musCand = () => {
  const B = bnd41().filter((b) => b.h > S.t || b.sep);
  return S.tl.filter((t) => !t.ret && !t.you && !t.dead && !t.es && t.age >= 14 && (t.r == 7 || t.r == 5 || bndMus41(t) >= 62) && !B.some((b) => b.m.includes(t.id)) && !ofb().some((o) => o.m.includes(t.id)));
};
on("mes", () => {
  if (!selOk() || R() > 0.3) return;
  const y = yr(),
    L = musCand()
      .sort((a, b) => bndMus41(b) - bndMus41(a))
      .slice(0, 60);
  if (L.length < 2) return;
  const tip = [0, 0, 0, 1, 1, 2, 3].concat(y >= 1975 ? [5, 5] : [], y < 1960 ? [4] : []),
    a = pk(tip),
    n = ri(ARTN41[a][0], Math.min(ARTN41[a][1], a == 1 ? 5 : ARTN41[a][1])),
    m = [];
  while (m.length < n) {
    const t = pk(L);
    if (!m.includes(t.id)) m.push(t.id);
    if (m.length >= L.length) break;
  }
  if (m.length < ARTN41[a][0]) return;
  const T = m.map((id) => S.tl[id]),
    nm = a == 0 || (a == 5 && m.length == 1) ? T[0].n : ttl0();
  ofb().push({ a, m, n: nm, fans: Math.round(1500 + sum(T, (t) => tspw(t)) * 900), c: Math.round(bndC41(m) * 0.6), e: S.t + 12 });
  nws(tx4(`${nm} (${LL(ART41[a]).toLowerCase()}) quiere firmar con tu sello. Míralo en Obras → Música.`, `${nm} (${LL(ART41[a]).toLowerCase()}) wants to sign with your label. See Works → Music.`, `${nm} (${LL(ART41[a]).toLowerCase()}) veut signer avec ton label. Regarde Œuvres → Musique.`, `${nm} (${LL(ART41[a]).toLowerCase()}) quer assinar com seu selo. Veja em Obras → Música.`));
});
ACT["ofb4"] = (v) => {
  const [k, ok] = String(v).split("|").map(Number),
    o = ofb()[k];
  if (!o) return;
  ofb().splice(k, 1);
  if (!ok) return pg();
  if (S.cash < o.c) return toast("Fondos insuficientes");
  gasta("talento", o.c);
  bnd41().push({ id: (S.bndId41 = (S.bndId41 | 0) + 1), n: o.n, k: o.a == 0 ? 1 : 0, a: o.a, m: o.m.filter((id) => tl41(id)), y: yr(), h: S.t + 260, rel: 75, pr: 50, fans: o.fans, g: null, sep: 0, pub: [] });
  nws(L37(`${S.sn} firma a ${o.n}.`, `${S.sn} signs ${o.n}.`));
  return pg();
};
// Publican por su cuenta: el sello pone la infraestructura y se queda con la mitad
on("mes", () => {
  if (!selOk() || !S.bnd41) return;
  const gl = sp(MD[4][5]);
  S.bnd41.forEach((b) => {
    if (b.sep || b.h <= S.t || b.pr < 30 || R() > 0.12) return;
    const T = b.m.map((id) => S.tl[id]).filter(Boolean);
    if (!T.length) return;
    const q = sum(T, (t) => bndMus41(t)) / T.length,
      ing = Math.round(TB(4) * 0.12 * (0.5 + Math.min(2, b.fans / 2e6)) * (0.4 + q / 80) * (0.7 + R() * 0.8) * 0.5),
      n = typeof titCancion == "function" ? titCancion([pk(gl)]) : ttl0();
    gana("ventas", ing);
    b.fans = Math.round(b.fans * (1 + 0.01 + (q / 100) * 0.05));
    b.pub = (b.pub || []).concat([{ n, y: yr(), g: ing }]).slice(-12);
    S.pub41 = (S.pub41 || []).concat([{ b: b.n, n, y: yr(), g: ing }]).slice(-8);
    nws(tx4(`${b.n} lanza «${n}» por su cuenta: deja ${fm(ing)} al sello.`, `${b.n} releases "${n}" on their own: ${fm(ing)} for the label.`, `${b.n} sort « ${n} » de son côté : ${fm(ing)} pour le label.`, `${b.n} lança «${n}» por conta própria: deixa ${fm(ing)} para o selo.`));
  });
});
const musica41HSel = musica41H;
musica41H = function () {
  const O = ofb(),
    P = S.pub41 || [],
    h = musica41HSel.apply(this, arguments),
    a = O.length
      ? `<div class="c" translate="no"><h3 style="margin:0 0 6px">${esc(tx4("Quieren firmar contigo", "They want to sign with you", "Ils veulent signer avec toi", "Querem assinar com você"))}</h3><div class="m">${esc(tx4("Solistas, bandas, dúos, grupos, orquestas y DJs que llegan solos: crean su propia música, tu sello les da la infraestructura y se queda con la mitad de lo que publican.", "Solo artists, bands, duos, groups, orchestras and DJs who come on their own: they make their own music, your label gives them the infrastructure and keeps half of what they release.", "Solistes, groupes, duos, ensembles, orchestres et DJ qui viennent d'eux-mêmes : ils créent leur musique, ton label leur offre l'infrastructure et garde la moitié de ce qu'ils publient.", "Solistas, bandas, duplas, grupos, orquestras e DJs que chegam sozinhos: criam sua própria música, seu selo dá a infraestrutura e fica com metade do que publicam."))}</div>${O.map(
          (o, k) =>
            `<div class="c sub"><div class="k"><b>${esc(o.n)}</b><span class="m">${esc(LL(ART41[o.a]))} · ${o.m.length} · ${nfc(o.fans)} fans</span></div><div class="m">${o.m
              .map((id) => S.tl[id])
              .filter(Boolean)
              .map((t) => esc(t.n) + " (" + esc(RO[t.r]) + ", " + tx4("música", "music", "musique", "música") + " " + bndMus41(t) + ")")
              .join(", ")}</div><div class="bts">${bt("ofb4", k + "|1", tx4("Firmar", "Sign", "Signer", "Assinar") + " · " + fm(o.c), S.cash >= o.c ? "a" : "off")}${bt("ofb4", k + "|0", tx4("Rechazar", "Decline", "Refuser", "Recusar"))}</div></div>`,
        ).join("")}</div>`
      : "",
    p = P.length ? `<div class="c" translate="no"><h3 style="margin:0 0 6px">${esc(tx4("Lo que publicaron tus artistas", "What your artists released", "Ce qu'ont publié tes artistes", "O que seus artistas publicaram"))}</h3>${P.slice().reverse().map((x) => `<div class="fila"><span>«${esc(x.n)}» · ${esc(x.b)} · ${x.y}</span><b>${fm(x.g)}</b></div>`).join("")}</div>` : "";
  return a + h + p;
};
// Contratar al intérprete de un disco: aparecen intérpretes, y compositores o productores con mucha habilidad musical
const tpkLMus = tpkL;
tpkL = function () {
  if (!(W && W.m == 4 && TPK && TPK.k == "c" && +TPK.i == 7 && TPF.of)) return tpkLMus.apply(this, arguments);
  TPF.of = 0;
  try {
    const o = tpkLMus.apply(this, arguments);
    o.L = o.L.filter((t) => t.you || t.id == o.sel || t.r == 7 || bndMus41(t) >= 62);
    return o;
  } finally {
    TPF.of = 1;
  }
};
