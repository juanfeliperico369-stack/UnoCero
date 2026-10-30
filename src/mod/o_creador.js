// ===== Creador: personajes opcionales en música (los de las canciones y el videoclip) =====
// Papel de cada personaje en las letras: [español, inglés, francés, portugués]
const PM4R = [
  ["Sin definir", "Undefined", "Non défini", "Indefinido"],
  ["Quien canta: la voz de la canción", "The singer: the song's voice", "Celui qui chante : la voix de la chanson", "Quem canta: a voz da canção"],
  ["A quien se le canta", "The one being sung to", "Celui à qui l'on chante", "A quem se canta"],
  ["El amor perdido", "The lost love", "L'amour perdu", "O amor perdido"],
  ["El rival o el villano", "The rival or the villain", "Le rival ou le méchant", "O rival ou o vilão"],
  ["El héroe de la historia", "The hero of the story", "Le héros de l'histoire", "O herói da história"],
  ["Un recuerdo: alguien que ya no está", "A memory: someone who is gone", "Un souvenir : quelqu'un qui n'est plus là", "Uma lembrança: alguém que já não está"],
  ["La familia", "The family", "La famille", "A família"],
  ["Los amigos o la banda", "The friends or the gang", "Les amis ou la bande", "Os amigos ou a turma"],
  ["Un personaje de leyenda o de ficción", "A character from legend or fiction", "Un personnage de légende ou de fiction", "Um personagem de lenda ou de ficção"],
  ["La multitud o el pueblo", "The crowd or the people", "La foule ou le peuple", "A multidão ou o povo"],
];
const pm4Rol = (r) => (PM4R[r | 0] || PM4R[0])[espL()];
// Papel que se propone al agregar: primero la voz, luego a quien se le canta, el rival, el amor perdido…
const pm4Sug = (L) => [1, 2, 4, 3, 5, 6, 8, 7, 10, 9].find((r) => !L.some((c) => c.r == r)) || 0;
// Una historia completa en un álbum conceptual: una voz o un héroe, alguien a quien cantarle y un conflicto
const pm4Hist = (L) => {
  const R = new Set(L.map((c) => c.r | 0));
  return (R.has(1) || R.has(5)) && (R.has(2) || R.has(3)) && (R.has(4) || R.has(6));
};
const castHO = castH;
// Personajes de las canciones: usan el creador de personajes universal, con su papel en las letras
castH = function () {
  if (W.m != 4) return castHO.apply(this, arguments);
  W.cast = W.cast || [];
  // Los que una versión anterior guardaba aparte pasan al reparto
  if ((W.pm4 || []).length) {
    W.pm4.forEach((o) => {
      const c = pjNuevo(1, Object.assign({}, W, { gn: wGn() }));
      Object.assign(c, { n: o.n, a: o.a | 0, r: o.r | 0, na: 0, vir: 1, t: null }, o.pr ? { pr: o.pr } : {});
      W.cast.push(c);
    });
    W.pm4 = [];
  }
  const L = W.cast,
    cnt = IMP.map((_, i) => L.filter((c) => c.i == i).length),
    ad = adulto(Object.assign({}, W, { gn: wGn() }));
  return `<div class="m">${T40("Opcional: los personajes que viven en tus canciones o en el videoclip. En un álbum conceptual le dan hilo a la historia; en un disco normal, color a las letras.", "Optional: the characters who live in your songs or music video. In a concept album they hold the story together; in a regular record they color the lyrics.")}</div>${pjBts(cnt, [0, 1, 5, 3, 4])}${L.map((c, k) => pjCard(c, k, ad)).join("") || `<div class="m">${T40("Sin personajes todavía.", "No characters yet.")}</div>`}${
    L.length
      ? `<div class="m" translate="no">${tx4(
          "Quién es en la canción dice qué hace cada personaje en la letra: quien la canta, a quien se le canta, el rival… En un álbum conceptual, si hay una voz o un héroe, alguien a quien se le canta o un amor perdido, y un rival o un recuerdo, la historia queda completa: +1 de crítica. En un disco normal, las canciones dedicadas a alguien suman público.",
          "Who they are in the song says what each character does in the lyrics: who sings it, who it is sung to, the rival… In a concept album, with a voice or a hero, someone being sung to or a lost love, and a rival or a memory, the story is complete: +1 critics. On a regular record, songs dedicated to someone add audience.",
          "Qui c'est dans la chanson dit ce que fait chaque personnage dans les paroles : qui la chante, à qui on la chante, le rival… Dans un album concept, avec une voix ou un héros, quelqu'un à qui l'on chante ou un amour perdu, et un rival ou un souvenir, l'histoire est complète : +1 de critique. Sur un disque normal, les chansons dédiées à quelqu'un ajoutent du public.",
          "Quem é na canção diz o que cada personagem faz na letra: quem a canta, a quem se canta, o rival… Num álbum conceitual, com uma voz ou um herói, alguém a quem se canta ou um amor perdido, e um rival ou uma lembrança, a história fica completa: +1 de crítica. Num disco normal, as canções dedicadas a alguém somam público.",
        )}${pm4Hist(L) ? " ✓" : ""}</div>`
      : ""
  }`;
};
// Música de ficción: el álbum conceptual y su arco se eligen al principio, junto a la naturaleza de la obra
function mxConcH() {
  const mx = W.mx;
  if (!mx) return "";
  return `<div class="c sub fx-blk"><div class="chips">${chx("mx", "conc|1", "Álbum conceptual (cuenta una historia)", mx.conc, mx.can && mx.can.length < 6)}</div>${
    mx.conc ? pkRow("ar") : `<div class="m">${T40("Si el disco cuenta una historia, márcalo como álbum conceptual y elige aquí su arco narrativo.", "If the record tells a story, mark it as a concept album and choose its narrative arc here.")}</div>`
  }</div>`;
}
const wDetMx = wDet;
wDet = function () {
  let h = wDetMx.apply(this, arguments);
  if (W.m != 4 || !W.mx) return h;
  const tab = W.tab | 0;
  if (tab == 0) {
    const k = wCh("fic", 0, "Realidad", !W.rl) + "</span></div>";
    if (h.includes(k)) h = h.replace(k, k + mxConcH());
  } else if (tab == 1) h = h.replace(pkRow("ar"), "");
  return h;
};
const rapArMx = rapAr;
rapAr = function () {
  const h = rapArMx.apply(this, arguments);
  return W.m == 4 && W.mx ? mxConcH().replace(pkRow("ar"), "") + h : h;
};
// Al volverse conceptual un disco de ficción, ya trae un arco para no pedirlo al final
const mxActC = ACT["mx"];
ACT["mx"] = (v) => {
  if (String(v).split("|")[0] == "conc" && W.mx && !W.mx.conc && W.rl && !(W.ar || []).length) W.ar = [0];
  return mxActC(v);
};
// Papel en las letras de cada personaje del reparto
ACT["wcr4"] = (v) => {
  const [k, r] = String(v).split("|").map(Number),
    c = (W.cast || [])[k];
  if (c) c.r = r;
  return wz();
};
// En música, el resumen de las canciones sale del reparto (y de lo que haya quedado aparte de una versión anterior)
V37.prod.push((P, W2) => {
  if (W2.m != 4) return;
  const L = (W2.cast || []).concat(W2.pm4 || []).filter((c) => c && String(c.n || "").trim());
  if (L.length) P.pm4 = L.map((c) => Object.assign({ n: String(c.n).slice(0, 40), a: c.a | 0, r: c.r | 0, d: String(c.d || "").slice(0, 90) }, c.pr ? { pr: c.pr } : {}));
  W2.pm4 = [];
});
V37.mods.push((P, add) => {
  if (P.m != 4 || !P.pm4 || !P.pm4.length) return;
  const conc = tyNom(P).some((n) => /conceptual|Ópera rock/i.test(n));
  if (conc) add(Math.min(2, P.pm4.length * 0.5), 0.5, L37("personajes que dan hilo al álbum", "characters that tie the album together"));
  else add(0, Math.min(1, P.pm4.length * 0.3), L37("personajes en las letras", "characters in the lyrics"));
  if (conc && pm4Hist(P.pm4)) add(1, 0, tx4("una historia completa en las canciones", "a complete story across the songs", "une histoire complète dans les chansons", "uma história completa nas canções"));
  const ded = P.pm4.filter((c) => c.r == 2 || c.r == 3).length;
  if (!conc && ded) add(0, Math.min(1, ded * 0.5), tx4("canciones dedicadas a alguien", "songs dedicated to someone", "chansons dédiées à quelqu'un", "canções dedicadas a alguém"));
});
V37.ficha.push((P) =>
  P.m == 4 && P.pm4 && P.pm4.length
    ? (P.cast || []).length
      ? `<div class="c sub"><b>${T40("Quién es en la canción", "Who they are in the song")}</b>${P.pm4.map((c) => `<div class="fila"><span translate="no">${esc(c.n)}<span class="m"> · ${esc(pm4Rol(c.r))}</span></span></div>`).join("")}</div>`
      : `<div class="c sub"><b>${T40("Personajes de las canciones", "Characters in the songs")}</b>${P.pm4.map((c) => `<div class="fila"><span translate="no">${esc(c.n)}<span class="m"> · ${esc(bibTr(ARQ[c.a] || ""))}${c.r ? " · " + esc(pm4Rol(c.r)) : c.d ? " · " + esc(c.d) : ""}${c.pr ? " · " + esc(presTxt(c.pr)) : ""}</span></span></div>`).join("")}</div>`
    : "",
);
// Secuelas: al producir, el contrato comprado libera al talento del estudio rival
V37.prod.push((P, W2) => {
  (W2.cast || []).forEach((c) => {
    const t = c.t != null && S.tl[c.t];
    if (t && (c.sob || 1) >= 1.6 && t.ocu > S.t) {
      t.ocu = 0;
      if (!S.bot) nws(L37(`Compras el contrato de ${t.n} para que vuelva en «${P.n}».`, `You buy out ${t.n}'s contract so they return in "${P.n}".`));
    }
  });
  if (W2.sob) W2.sob = [];
});
