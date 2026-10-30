// ===== Biblioteca de personajes de la franquicia: todo el que pasó por alguna entrega, también el que quitaste de una secuela, puede volver =====
const bibK = (n) =>
  String(n || "")
    .trim()
    .toLowerCase();
// Última versión de cada personaje de la franquicia, con la obra donde se le vio y cuántas veces apareció
function bibPjs(f) {
  if (f == null) return [];
  const M = {};
  frPs(f)
    .filter((p) => p.st >= 1 && (p.cast || []).length)
    .sort((a, b) => (a.y || 0) - (b.y || 0) || a.id - b.id)
    .forEach((p) =>
      p.cast.forEach((c) => {
        const k = bibK(c.n);
        if (!k) return;
        const x = (M[k] = M[k] || { k, ob: 0 });
        x.ob++;
        x.c = c;
        x.p = p;
      }),
    );
  return Object.values(M);
}
// Los que no están en la obra que se está creando
function bibFuera() {
  const ya = new Set((W.cast || []).map((c) => bibK(c.n)));
  return bibPjs(W.fid).filter((x) => !ya.has(x.k));
}
const bibTr = (s) => (CFG.idi == "en" ? trTxt(s) : CFG.idi == "fr" || CFG.idi == "pt" ? trX(s) : s);
function bibSub(x) {
  const c = x.c,
    e = Math.max(0, (c.e | 0) + yr() - (x.p.y || yr())),
    t = S.tl[c.t];
  return [
    bibTr(arqN(c)),
    c.sp ? espN(c.sp) : "",
    tx4(`${e} años`, `${e} years old`, `${e} ans`, `${e} anos`),
    t ? t.n : "",
    tx4(`última vez en «${x.p.n}» (${x.p.y})`, `last seen in "${x.p.n}" (${x.p.y})`, `vu pour la dernière fois dans « ${x.p.n} » (${x.p.y})`, `última vez em «${x.p.n}» (${x.p.y})`),
    tx4(`${x.ob} ${x.ob == 1 ? "obra" : "obras"}`, `${x.ob} ${x.ob == 1 ? "work" : "works"}`, `${x.ob} ${x.ob == 1 ? "œuvre" : "œuvres"}`, `${x.ob} ${x.ob == 1 ? "obra" : "obras"}`),
  ]
    .filter(Boolean)
    .join(" · ");
}
// Vuelve con todo lo que tenía: nombre, sexo, especie, arquetipo, motivación, relación, origen y su intérprete si está libre; la edad avanza con los años
function bibVuelve(x) {
  const c = JSON.parse(JSON.stringify(x.c)),
    t = S.tl[c.t];
  c.e = Math.max(0, (c.e | 0) + yr() - (x.p.y || yr()));
  delete c.rj;
  c.sob = 1;
  c.na = 0;
  c.ant = 1;
  if (W.m == 5 || !t || t.ret || t.dead || t.es || (W.cast || []).some((z) => z.t == c.t)) c.t = null;
  else if (!t.you && ocupado(t)) c.sob = 1.6;
  (W.cast = W.cast || []).push(c);
}
const bibBt = () => {
  if (W.fid == null) return "";
  const T = bibPjs(W.fid).length;
  if (!T) return "";
  const n = bibFuera().length;
  return bt("pjbib", "", ic("libro") + " " + tx4("Biblioteca de la franquicia", "Franchise library", "Bibliothèque de la franchise", "Biblioteca da franquia") + ` (${n})`, n ? "a" : "off");
};
ACT["pjbib"] = () => {
  const L = bibFuera(),
    ord = [0, 1, 5, 3, 4, 2];
  if (!L.length) return toast(tx4("Todos los personajes de la franquicia ya están en la obra.", "Every character in the franchise is already in the work.", "Tous les personnages de la franchise sont déjà dans l'œuvre.", "Todos os personagens da franquia já estão na obra."));
  L.sort((a, b) => ord.indexOf(a.c.i) - ord.indexOf(b.c.i) || String(a.c.n).localeCompare(String(b.c.n), CFG.idi || "es"));
  return fxPick({
    t: tx4("Biblioteca de personajes", "Character library", "Bibliothèque de personnages", "Biblioteca de personagens") + " · " + frG(W.fid).n,
    d: tx4(
      "Todos los personajes que pasaron por la franquicia, también los que quitaste de una secuela. Elige los que vuelven: llegan con su nombre, especie, arquetipo, motivación y su intérprete si está libre, y su edad avanza con los años.",
      "Every character who has been in the franchise, including the ones you removed from a sequel. Pick who comes back: they arrive with their name, species, archetype, motivation and their performer if available, and their age moves on with the years.",
      "Tous les personnages passés par la franchise, y compris ceux que tu as retirés d'une suite. Choisis ceux qui reviennent : ils arrivent avec leur nom, leur espèce, leur archétype, leur motivation et leur interprète s'il est libre, et leur âge avance avec les années.",
      "Todos os personagens que passaram pela franquia, inclusive os que você tirou de uma sequência. Escolha os que voltam: chegam com nome, espécie, arquétipo, motivação e o intérprete, se estiver livre, e a idade avança com os anos.",
    ),
    items: L.map((x) => ({ v: x.k, l: x.c.n, nt: 1, ns: 1, s: bibSub(x), g: IMP[x.c.i][0] })),
    sel: [],
    max: Infinity,
    orden: false,
    ok: (sel) => {
      let n = 0;
      sel.forEach((k) => {
        const x = L.find((y) => y.k == k);
        if (x) {
          bibVuelve(x);
          n++;
        }
      });
      if (n) toast(tx4(`Vuelven ${n} ${n == 1 ? "personaje" : "personajes"}.`, `${n} ${n == 1 ? "character returns" : "characters return"}.`, `${n} ${n == 1 ? "personnage revient" : "personnages reviennent"}.`, `${n == 1 ? "Volta" : "Voltam"} ${n} ${n == 1 ? "personagem" : "personagens"}.`));
      return wz();
    },
  });
};
// El botón va en la fila de «Traer un personaje existente», en el modo detallado y en el rápido
const castHBib = castH;
castH = function () {
  const h = castHBib.apply(this, arguments),
    b = bibBt();
  return b ? h.replace(presBt(), presBt().replace(/<\/div>$/, b + "</div>")) : h;
};
const rapCastBib = rapCast;
rapCast = function () {
  const h = rapCastBib.apply(this, arguments),
    b = bibBt();
  return b ? h.replace(presBt(), presBt().replace(/<\/div>$/, b + "</div>")) : h;
};
// Quitar a alguien de una secuela no lo borra de la franquicia
const wcdelBib = ACT["wcdel"];
ACT["wcdel"] = (v) => {
  const c = (W.cast || [])[+v],
    queda = c && W.fid != null && bibPjs(W.fid).some((x) => x.k == bibK(c.n));
  const r = wcdelBib(v);
  if (queda) toast(tx4(`${c.n} queda en la biblioteca de la franquicia.`, `${c.n} stays in the franchise library.`, `${c.n} reste dans la bibliothèque de la franchise.`, `${c.n} fica na biblioteca da franquia.`));
  return r;
};
// Con sexo explícito o en una obra erótica, nadie menor de 18 (se avisa en vez de cambiar la edad mientras se escribe)
V37.err.push((W2) => {
  if (!adulto(Object.assign({}, W2, { gn: wGn() }))) return [];
  const L = (W2.cast || []).filter((c) => (c.e | 0) < 18);
  return L.length
    ? [
        tx4("En una obra erótica o con sexo explícito, todos deben tener 18 años o más: ", "In an erotic work or one with explicit sex, everyone must be 18 or older: ", "Dans une œuvre érotique ou avec du sexe explicite, tous doivent avoir 18 ans ou plus : ", "Numa obra erótica ou com sexo explícito, todos devem ter 18 anos ou mais: ") +
          L.map((c) => `${c.n} (${c.e | 0})`).join(", "),
      ]
    : [];
});
(() => {
  if (typeof DIC_FR == "undefined") return;
  [
    ["En una obra erótica o con sexo explícito, todos los personajes tienen 18 años o más.", "Dans une œuvre érotique ou avec du sexe explicite, tous les personnages ont 18 ans ou plus.", "Numa obra erótica ou com sexo explícito, todos os personagens têm 18 anos ou mais."],
    ["opción", "option", "opção"],
    ["sencillo", "single", "single"],
    ["sencillos", "singles", "singles"],
    [
      "Con nombre y actor: todos los protagonistas, secundarios, invitados especiales y cameos que quieras. Los terceros y los extras son solo números. El primer protagonista lo interpreta el intérprete del equipo.",
      "Avec nom et acteur : autant de protagonistes, de seconds rôles, d'invités spéciaux et de caméos que tu veux. Les tiers et les figurants ne sont que des nombres. Le premier protagoniste est joué par l'interprète de l'équipe.",
      "Com nome e ator: quantos protagonistas, coadjuvantes, convidados especiais e participações especiais você quiser. Os terciários e os figurantes são só números. O primeiro protagonista é interpretado pelo intérprete da equipe.",
    ],
  ].forEach(([e, f, p]) => {
    DIC_FR[e] = f;
    DIC_PT[e] = p;
  });
  // «Pronto» también es una palabra en español y se volvía «Em breve» al traducirse otra vez
  DIC_PT["Listo"] = "Concluir";
})();
