// ===== Crossovers oficiales: cada franquicia elige, sin límite, con cuáles comparte canon =====
// En el creador puedes cruzar todas las franquicias que quieras; solo las oficiales ponen la obra en el canon de ambas.
// Tomar prestado un personaje no es un crossover: llega el personaje y nada más.
E40L([
  ["Crossovers oficiales", "Official crossovers"],
  ["Elegir crossovers oficiales", "Choose official crossovers"],
  ["Unir canons", "Merge canons"],
  ["Crossover oficial con", "Official crossover with"],
  ["Ya no es oficial con", "No longer official with"],
  ["crossover oficial", "official crossover"],
  ["Oficial · entra en el canon de ambas", "Official · joins both canons"],
  ["No oficial · no entra en su canon", "Unofficial · stays out of its canon"],
  ["Elige todas las franquicias que quieras cruzar con tu obra.", "Pick as many franchises as you want to cross over with your work."],
  ["Sin crossovers oficiales todavía.", "No official crossovers yet."],
]);
const xoOf = (f) => {
  const F = frG(f);
  F.xo = (F.xo || []).map(Number).filter((g, i, a) => g != +f && a.indexOf(g) == i && S.pj.some((p) => p.fid == g));
  return F.xo;
};
// Oficial si se eligió en la franquicia, si comparten canon unido o si viven en el mismo universo
function xoEsOf(a, b) {
  a = +a;
  b = +b;
  if (a == b || !S.fr || !S.fr[a]) return false;
  const A = S.fr[a],
    u = uniDe(a);
  return (A.xo || []).includes(b) || A.x == b || !!(u && u.f.includes(b));
}
function xoAdd(a, b, q) {
  a = +a;
  b = +b;
  if (a == b || xoOf(a).includes(b)) return 0;
  const A = frG(a),
    B = frG(b),
    y = yr();
  A.xo.push(b);
  xoOf(b).push(a);
  A.xh.push({ f: b, y, j: 2 });
  B.xh.push({ f: a, y, j: 2 });
  // Las obras que ya los cruzaban sin ser oficiales entran ahora al canon de ambas
  let n = 0;
  S.pj.forEach((p) => {
    const o = p.fid == a ? b : p.fid == b ? a : null;
    if (o == null || !(p.xu40 || []).includes(o)) return;
    p.xu40 = p.xu40.filter((g) => g != o);
    if (!p.xu40.length) delete p.xu40;
    p.xf = uniq((p.xf || []).concat([o]));
    const C = cnOf(o),
      s = p.src != null ? cnF(C, p.src) : null;
    cnPut(C, p, s ? null : p.fid);
    n++;
  });
  frFix(a);
  frFix(b);
  S.xoN = (S.xoN | 0) + 1;
  A.hyB = (A.hyB || 0) + 1;
  B.hyB = (B.hyB || 0) + 1;
  if (!q)
    nws(
      tx4(
        `Crossover oficial: «${A.n}» × «${B.n}»${n ? ". " + n + (n == 1 ? " obra en conjunto entra" : " obras en conjunto entran") + " al canon de ambas" : ""}.`,
        `Official crossover: "${A.n}" × "${B.n}"${n ? ". " + n + (n == 1 ? " joint work joins" : " joint works join") + " both canons" : ""}.`,
        `Crossover officiel : « ${A.n} » × « ${B.n} »${n ? ". " + n + (n == 1 ? " œuvre commune entre" : " œuvres communes entrent") + " dans les deux canons" : ""}.`,
        `Crossover oficial: «${A.n}» × «${B.n}»${n ? ". " + n + (n == 1 ? " obra em conjunto entra" : " obras em conjunto entram") + " no cânone das duas" : ""}.`,
      ),
    );
  return n;
}
function xoQuita(a, b, q) {
  a = +a;
  b = +b;
  if (!xoOf(a).includes(b)) return;
  const A = frG(a),
    B = frG(b),
    y = yr();
  A.xo = A.xo.filter((g) => g != b);
  B.xo = xoOf(b).filter((g) => g != a);
  A.xh.push({ f: b, y, j: 3 });
  B.xh.push({ f: a, y, j: 3 });
  if (!q)
    nws(
      tx4(
        `«${A.n}» y «${B.n}» dejan de ser crossover oficial; lo que ya estrenaron juntas sigue en ambos canons.`,
        `"${A.n}" and "${B.n}" are no longer an official crossover; what they already released together stays in both canons.`,
        `« ${A.n} » et « ${B.n} » ne sont plus un crossover officiel ; ce qu'elles ont déjà sorti ensemble reste dans les deux canons.`,
        `«${A.n}» e «${B.n}» deixam de ser crossover oficial; o que já lançaram juntas continua nos dois cânones.`,
      ),
    );
}
// Una obra hecha con franquicias no oficiales queda como crossover no oficial: no entra al canon de la otra
V37.prod.push((P, W2) => {
  if (!P.xf || !P.xf.length) return;
  const fid = W2.fid || null,
    no = P.xf.filter((g) => fid == null || !xoEsOf(fid, g));
  if (!no.length) return;
  P.xu40 = uniq((P.xu40 || []).concat(no));
  P.xf = P.xf.filter((g) => !no.includes(g));
  if (!P.xf.length) delete P.xf;
});
// El canon compartido le da coherencia: la crítica y los fans lo agradecen
V37.mods.push((P, add) => {
  const k = (P.xf || []).filter((g) => P.fid != null && xoEsOf(P.fid, g)).length;
  if (k) add(0.5, Math.round(Math.min(2, 0.6 * k) * 10) / 10, L37("crossover oficial", "official crossover"));
});
// Al estrenar, cada socio oficial de la franquicia recibe un poco del entusiasmo
V37.estreno.push((P) => {
  if (P.fid == null || !S.fr || !S.fr[P.fid]) return;
  xoOf(P.fid).forEach((g) => (frG(g).hyB = (frG(g).hyB || 0) + 0.25));
});
// Origen de la obra: también los crossovers no oficiales y los licenciados
const porgX9 = porg;
porg = function (P) {
  const h = porgX9.apply(this, arguments),
    u = (P.xu40 || []).map((f) => "«" + frG(f).n + "»").join(", "),
    r = (P.xr40 || []).map((n) => "«" + n + "»").join(", ");
  return (
    h +
    (u ? `<span translate="no"> · ${tx4("crossover no oficial con ", "unofficial crossover with ", "crossover non officiel avec ", "crossover não oficial com ")}${esc(u)}</span>` : "") +
    (r ? `<span translate="no"> · ${tx4("crossover con licencia: ", "licensed crossover: ", "crossover sous licence : ", "crossover licenciado: ")}${esc(r)}</span>` : "")
  );
};
function xoCard(f) {
  f = +f;
  if (!frEst(f)) return "";
  const L = frList().filter((g) => g != f && xoEsOf(f, g));
  return `<div class="c"><div class="k"><h3 style="margin:0">${ic("cruce")} ${T40("Crossovers oficiales", "Official crossovers")} <span class="m">· ${L.length}</span></h3></div><div class="m" translate="no">${tx4(
    "Sin límite. Las obras que cruzan franquicias oficiales entran al canon de ambas y suman a sus fans; un personaje prestado no cuenta como crossover.",
    "No limit. Works that cross official franchises join both canons and add to their fans; a borrowed character doesn't count as a crossover.",
    "Sans limite. Les œuvres qui croisent des franchises officielles entrent dans les deux canons et touchent leurs fans ; un personnage emprunté ne compte pas comme un crossover.",
    "Sem limite. As obras que cruzam franquias oficiais entram no cânone das duas e somam aos seus fãs; um personagem emprestado não conta como crossover.",
  )}</div>${L.length ? `<div class="chips" translate="no">${L.map((g) => `<button class="ch on" data-a="fro" data-v="${g}">${ic("franquicia")} ${esc(frG(g).n)}</button>`).join("")}</div>` : `<div class="m">${T40("Sin crossovers oficiales todavía.", "No official crossovers yet.")}</div>`}<div class="bts" style="margin-top:6px">${bt("xoo", f, ic("cruce") + " " + T40("Elegir crossovers oficiales", "Choose official crossovers"))}${frG(f).x == null ? bt("xom", f, T40("Unir canons", "Merge canons")) : ""}</div></div>`;
}
const frExtraX9 = frExtra;
frExtra = function (f) {
  let h = "";
  try {
    h = xoCard(f);
  } catch (e) {
    console.error("xoCard", e);
  }
  return h + frExtraX9.apply(this, arguments);
};
// Elegir los crossovers oficiales: lista con buscador, sin límite
function xoOM(f) {
  f = +f;
  const F = frG(f),
    of = xoOf(f),
    L = frList().filter((g) => g != f && frEst(g) && (of.includes(g) || !xoEsOf(f, g)));
  if (!L.length) return toast(T40("Necesitas otra franquicia tuya con al menos una obra estrenada.", "You need another franchise of yours with at least one released work."));
  return fxPick({
    t: T40("Crossovers oficiales", "Official crossovers"),
    d: tx4(
      `Elige con cuántas franquicias tuyas hace crossover oficial «${esc(F.n)}»: no hay límite. Las obras que las crucen entrarán al canon de ambas, también las que ya hiciste juntas. Cruzarlas en el creador sin hacerlas oficiales es un crossover no oficial, y traer un personaje prestado no es crossover.`,
      `Choose how many of your franchises "${esc(F.n)}" officially crosses over with: there's no limit. Works that cross them will join both canons, including the ones you already made together. Crossing them in the creator without making them official is an unofficial crossover, and bringing in a borrowed character isn't a crossover.`,
      `Choisis avec combien de tes franchises « ${esc(F.n)} » fait un crossover officiel : il n'y a pas de limite. Les œuvres qui les croisent entreront dans les deux canons, y compris celles que tu as déjà faites ensemble. Les croiser dans le créateur sans les rendre officielles donne un crossover non officiel, et faire venir un personnage emprunté n'est pas un crossover.`,
      `Escolha com quantas franquias suas «${esc(F.n)}» faz crossover oficial: não há limite. As obras que as cruzarem entrarão no cânone das duas, inclusive as que você já fez juntas. Cruzá-las no criador sem torná-las oficiais é um crossover não oficial, e trazer um personagem emprestado não é crossover.`,
    ),
    items: L.map((g) => {
      const T = frT(g);
      return {
        v: g,
        l: frG(g).n,
        nt: 1,
        s: tx4(`${T.n} ${T.n == 1 ? "obra" : "obras"} · popularidad ${frH(g)} %`, `${T.n} ${T.n == 1 ? "work" : "works"} · popularity ${frH(g)}%`, `${T.n} ${T.n == 1 ? "œuvre" : "œuvres"} · popularité ${frH(g)} %`, `${T.n} ${T.n == 1 ? "obra" : "obras"} · popularidade ${frH(g)} %`),
        g: of.includes(g) ? T40("Crossovers oficiales", "Official crossovers") : T40("Tus franquicias", "Your franchises"),
      };
    }),
    sel: of.map(String),
    max: Infinity,
    ok: (sel) => {
      const N = sel.map(Number),
        fuera = xoOf(f).filter((g) => !N.includes(g)),
        nuevas = N.filter((g) => frEst(g) && !xoOf(f).includes(g));
      fuera.forEach((g) => xoQuita(f, g, nuevas.length + fuera.length > 1));
      let n = 0;
      nuevas.forEach((g) => (n += xoAdd(f, g, nuevas.length + fuera.length > 1)));
      if (nuevas.length + fuera.length > 1) {
        const nm = (L) => L.map((g) => "«" + frG(g).n + "»").join(", ");
        if (nuevas.length)
          nws(
            tx4(
              `«${F.n}» hace crossover oficial con ${nm(nuevas)}${n ? ". " + n + (n == 1 ? " obra en conjunto entra" : " obras en conjunto entran") + " a sus canons" : ""}.`,
              `"${F.n}" makes an official crossover with ${nm(nuevas)}${n ? ". " + n + (n == 1 ? " joint work joins" : " joint works join") + " their canons" : ""}.`,
              `« ${F.n} » fait un crossover officiel avec ${nm(nuevas)}${n ? ". " + n + (n == 1 ? " œuvre commune entre" : " œuvres communes entrent") + " dans leurs canons" : ""}.`,
              `«${F.n}» faz crossover oficial com ${nm(nuevas)}${n ? ". " + n + (n == 1 ? " obra em conjunto entra" : " obras em conjunto entram") + " em seus cânones" : ""}.`,
            ),
          );
        if (fuera.length)
          nws(
            tx4(
              `«${F.n}» deja de tener crossover oficial con ${nm(fuera)}.`,
              `"${F.n}" no longer has an official crossover with ${nm(fuera)}.`,
              `« ${F.n} » n'a plus de crossover officiel avec ${nm(fuera)}.`,
              `«${F.n}» deixa de ter crossover oficial com ${nm(fuera)}.`,
            ),
          );
      }
      return frM(f);
    },
  });
}
ACT["xoo"] = (v) => xoOM(v);
(() => {
  if (typeof DIC_FR == "undefined") return;
  [
    ["Crossover con otras franquicias", "Crossover avec d'autres franchises", "Crossover com outras franquias"],
    ["Crossovers oficiales", "Crossovers officiels", "Crossovers oficiais"],
    ["Elegir crossovers oficiales", "Choisir les crossovers officiels", "Escolher crossovers oficiais"],
    ["Sin crossovers oficiales todavía.", "Pas encore de crossover officiel.", "Ainda sem crossovers oficiais."],
    ["Crossover oficial con", "Crossover officiel avec", "Crossover oficial com"],
    ["Ya no es oficial con", "N'est plus officiel avec", "Já não é oficial com"],
    ["crossover oficial", "crossover officiel", "crossover oficial"],
    ["Oficial · entra en el canon de ambas", "Officiel · entre dans les deux canons", "Oficial · entra no cânone das duas"],
    ["No oficial · no entra en su canon", "Non officiel · reste hors de son canon", "Não oficial · fica fora do seu cânone"],
    ["Elige todas las franquicias que quieras cruzar con tu obra.", "Choisis toutes les franchises que tu veux croiser avec ton œuvre.", "Escolha todas as franquias que quiser cruzar com sua obra."],
    ["Necesitas otra franquicia tuya con al menos una obra estrenada.", "Il te faut une autre franchise avec au moins une œuvre sortie.", "Você precisa de outra franquia sua com pelo menos uma obra lançada."],
    ["Unir canons", "Fusionner les canons", "Unir cânones"],
    [
      "Sin límite de franquicias: cada una suma público y expectativa; las de rivales cuestan una licencia y desde 4 la crítica teme que sea demasiado. Solo los crossovers oficiales, que se eligen dentro de cada franquicia, ponen la obra en el canon de ambas.",
      "Sans limite de franchises : chacune ajoute du public et de l'attente ; celles des rivaux coûtent une licence et à partir de 4 la critique craint l'excès. Seuls les crossovers officiels, choisis dans chaque franchise, placent l'œuvre dans les deux canons.",
      "Sem limite de franquias: cada uma soma público e expectativa; as de rivais custam uma licença e a partir de 4 a crítica teme que seja demais. Só os crossovers oficiais, escolhidos dentro de cada franquia, colocam a obra no cânone das duas.",
    ],
    [
      "Sin límite: cada franquicia suma público y expectativa; las de rivales cuestan una licencia. Desde 4, la crítica teme que sea demasiado.",
      "Sans limite : chaque franchise ajoute du public et de l'attente ; celles des rivaux coûtent une licence. À partir de 4, la critique craint l'excès.",
      "Sem limite: cada franquia soma público e expectativa; as de rivais custam uma licença. A partir de 4, a crítica teme que seja demais.",
    ],
  ].forEach(([e, f, p]) => {
    DIC_FR[e] = f;
    DIC_PT[e] = p;
  });
})();
