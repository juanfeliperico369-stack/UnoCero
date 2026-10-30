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
castH = function () {
  if (W.m != 4) return castHO.apply(this, arguments);
  W.pm4 = W.pm4 || [];
  const L = W.pm4,
    arqO = arqOrd("M");
  return `<div class="m">${T40("Opcional: los personajes que viven en tus canciones o en el videoclip. En un álbum conceptual le dan hilo a la historia; en un disco normal, color a las letras.", "Optional: the characters who live in your songs or music video. In a concept album they hold the story together; in a regular record they color the lyrics.")}</div>${L.map(
    (c, i) =>
      `<div class="c sub fx-blk"><div class="k"><b>${T40("Personaje", "Character")} ${i + 1}</b><span class="bts">${bt("cpm4n", i, ic("dado") + " " + T40("Nombre", "Name"))}${bt("cpm4x", i, ic("cerrar"))}</span></div><input type="text" maxlength="40" value="${esc(c.n || "")}" oninput="pm4Set(${i},'n',this.value)" aria-label="${T40("Nombre", "Name")}"><select onchange="pm4Set(${i},'a',+this.value)" aria-label="${T40("Arquetipo", "Archetype")}">${arqO.map(([j, a]) => `<option value="${j}"${(c.a | 0) == j ? " selected" : ""}>${esc(a)}</option>`).join("")}</select><select onchange="pm4Set(${i},'r',+this.value)" translate="no" aria-label="${esc(pm4Rol(0))}">${PM4R.map((_, r) => `<option value="${r}"${(c.r | 0) == r ? " selected" : ""}>${esc(tx4("Papel en las letras: ", "Role in the lyrics: ", "Rôle dans les paroles : ", "Papel nas letras: ") + pm4Rol(r))}</option>`).join("")}</select>${c.d && !c.r ? `<div class="m">${esc(c.d)}</div>` : ""}${c.pr ? `<div class="m pj-pre" translate="no">${ic("material")} ${esc(presVivo(c) ? presTxt(c.pr) : tx4("Le cambiaste el nombre: ya no se reconoce como ", "You renamed it: no longer recognized as ", "Tu l'as renommé : on ne le reconnaît plus comme ", "Você mudou o nome: já não é reconhecido como ") + c.pr.n)}</div>` : ""}</div>`,
  ).join("")}${
    L.length
      ? `<div class="m" translate="no">${tx4(
          "El papel dice qué hace cada uno en las letras. En un álbum conceptual, si hay una voz o un héroe, alguien a quien se le canta o un amor perdido, y un rival o un recuerdo, la historia queda completa: +1 de crítica. En un disco normal, las canciones dedicadas a alguien suman público.",
          "The role says what each one does in the lyrics. In a concept album, with a voice or a hero, someone being sung to or a lost love, and a rival or a memory, the story is complete: +1 critics. On a regular record, songs dedicated to someone add audience.",
          "Le rôle dit ce que fait chacun dans les paroles. Dans un album concept, avec une voix ou un héros, quelqu'un à qui l'on chante ou un amour perdu, et un rival ou un souvenir, l'histoire est complète : +1 de critique. Sur un disque normal, les chansons dédiées à quelqu'un ajoutent du public.",
          "O papel diz o que cada um faz nas letras. Num álbum conceitual, com uma voz ou um herói, alguém a quem se canta ou um amor perdido, e um rival ou uma lembrança, a história fica completa: +1 de crítica. Num disco normal, as canções dedicadas a alguém somam público.",
        )}${pm4Hist(L) ? " ✓" : ""}</div>`
      : ""
  }<div class="bts">${bt("cpm4a", "", ic("mas") + " " + T40("Agregar personaje", "Add character"))}</div>`;
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
function pm4Set(i, k, v) {
  const c = (W.pm4 || [])[i];
  if (!c) return;
  c[k] = v;
  if (k == "r") wz();
}
ACT["cpm4a"] = () => {
  W.pm4 = W.pm4 || [];
  const F = RU() < 0.5;
  W.pm4.push({ n: nomPj(F ? "F" : "M"), a: ri(0, 20), r: pm4Sug(W.pm4) });
  return wz();
};
ACT["cpm4x"] = (v) => {
  W.pm4 = (W.pm4 || []).filter((_, i) => i != +v);
  return wz();
};
ACT["cpm4n"] = (v) => {
  const c = (W.pm4 || [])[+v];
  if (!c) return;
  c.n = nomPj(RU() < 0.5 ? "F" : "M");
  return wz();
};
V37.prod.push((P, W2) => {
  if (W2.m == 4 && W2.pm4 && W2.pm4.length)
    P.pm4 = W2.pm4
      .filter((c) => c && String(c.n || "").trim())
      .map((c) => Object.assign({ n: String(c.n).slice(0, 40), a: c.a | 0, r: c.r | 0, d: String(c.d || "").slice(0, 90) }, c.pr ? { pr: c.pr } : {}));
  if (W2.m == 4) W2.pm4 = [];
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
    ? `<div class="c sub"><b>${T40("Personajes de las canciones", "Characters in the songs")}</b>${P.pm4.map((c) => `<div class="fila"><span translate="no">${esc(c.n)}<span class="m"> · ${esc(bibTr(ARQ[c.a] || ""))}${c.r ? " · " + esc(pm4Rol(c.r)) : c.d ? " · " + esc(c.d) : ""}${c.pr ? " · " + esc(presTxt(c.pr)) : ""}</span></span></div>`).join("")}</div>`
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
