// ===== La idea primero: 1 · idea, 2 · contratación y producción, 3 · marketing, 4 · lanzamiento =====
// La idea se guarda en Proyectos; desde ahí se produce, se encomienda o se coproduce con un rival, se encarga a tus artistas
// (música), se vende con crédito o se archiva como material. Las ideas vendidas quedan en el archivo con su resultado.
const WT1 = [0, 1, 2, 3, 6],
  WT2 = [3, 4, 5];
const wEt = () => (W && !S.taller ? (W.etapa == 2 ? 2 : 1) : 0);
// Modo rápido: los pasos 1 a 12 son la idea; el presupuesto, el rodaje y el equipo, la contratación (los personajes están en las dos)
function wRapEt(A) {
  const e = wEt();
  return !e ? A : [wEtapaH()].concat(e == 1 ? A.slice(0, 12) : [A[10]].concat(A.slice(12)));
}
const wTabs = () => (W && W.md != "d" ? WORD : wEt() == 1 ? WT1 : wEt() == 2 ? WT2 : WORD);
// La idea ya tiene guion: lo escribió alguien por encargo o es un guion comprado
const wEsc = () => W && (W.gsc != null || !!W.gs);
const idT = (e, n, f, p) => `<span translate="no">${esc(tx4(e, n, f, p))}</span>`;
function wEtapaH() {
  const e = wEt();
  if (!e) return "";
  const N = [tx4("Idea", "Idea", "Idée", "Ideia"), tx4("Contratación y producción", "Hiring and production", "Embauche et production", "Contratação e produção"), "Marketing", tx4("Lanzamiento", "Launch", "Lancement", "Lançamento")];
  return `<div class="c" translate="no"><div class="chips" style="margin:0">${N.map((n, i) => `<span class="ch${i + 1 == e ? " on" : ""}" style="cursor:default${i + 1 < e ? ";opacity:.7" : ""}">${i + 1} · ${esc(n)}</span>`).join("")}</div><div class="m">${esc(
    e == 1
      ? wEsc()
        ? tx4(`El guion ya está escrito (${W.gsc != null ? W.gsc : "—"}/100). Puedes seguir a la contratación.`, `The script is written (${W.gsc != null ? W.gsc : "—"}/100). You can move on to hiring.`, `Le scénario est écrit (${W.gsc != null ? W.gsc : "—"}/100). Tu peux passer à l'embauche.`, `O roteiro já está escrito (${W.gsc != null ? W.gsc : "—"}/100). Você pode seguir para a contratação.`)
        : tx4(
            "Primero la idea: la historia, cómo se cuenta, sus estilos y sus personajes. Guárdala en Proyectos o encarga que un escritor la escriba: con el guion listo se pasa a la contratación.",
            "First the idea: the story, how it's told, its styles and its characters. Save it in Projects or have a writer write it: once the script is ready you move on to hiring.",
            "D'abord l'idée : l'histoire, sa façon d'être racontée, ses styles et ses personnages. Garde-la dans Projets ou fais-la écrire par un scénariste : avec le scénario prêt, on passe à l'embauche.",
            "Primeiro a ideia: a história, como é contada, seus estilos e seus personagens. Guarde-a em Projetos ou peça a um escritor que a escreva: com o roteiro pronto, segue-se para a contratação.",
          )
      : tx4(
          "Ahora se contrata: intérpretes, equipo y producción. El marketing y el lanzamiento vienen cuando la obra esté terminada.",
          "Now you hire: performers, crew and production. Marketing and launch come once the work is finished.",
          "Maintenant on embauche : interprètes, équipe et production. Le marketing et le lancement viennent une fois l'œuvre terminée.",
          "Agora se contrata: intérpretes, equipe e produção. O marketing e o lançamento vêm quando a obra estiver pronta.",
        ),
  )}</div></div>`;
}
const wDetEt = wDet;
wDet = function () {
  const T = wTabs();
  if (!T.includes(W.tab | 0)) W.tab = T[0];
  return wDetEt.apply(this, arguments);
};
// En la idea los personajes no tienen intérprete todavía: se eligen en la contratación
const pjCardEt = pjCard;
pjCard = function (c, k, ad) {
  const h = pjCardEt.apply(this, arguments);
  return wEt() != 1
    ? h
    : h
        .replace(/<select data-k="crew\.7"[\s\S]*?<\/select>/, "")
        .replace(/<select data-k="cast\.\d+\.t"[\s\S]*?<\/select>/, "")
        .replace(/<div class="k" style="margin-top:4px"><span class="m">(Encaje|Sin int)[\s\S]*?Ver talentos<\/button><\/div>/, "");
};
const castHEt = castH;
castH = function () {
  const h = castHEt.apply(this, arguments);
  return wEt() == 1 && W.m != 5 ? `<div class="m">${idT("Los intérpretes se eligen después, en la contratación.", "Performers are chosen later, during hiring.", "Les interprètes se choisissent ensuite, à l'embauche.", "Os intérpretes são escolhidos depois, na contratação.")}</div>` + h : h;
};
const wzBotEt = wzBotones;
wzBotones = function (er) {
  const e = wEt(),
    doc = bt("wdoc", "", ic("libro") + " Documento de la historia"),
    sv = (a) => bt("idsv", "", ic("idea") + " " + tx4("Guardar idea en Proyectos", "Save idea to Projects", "Garder l'idée dans Projets", "Guardar ideia em Projetos"), a);
  if (S.taller) return wzBotEt.apply(this, arguments);
  if (!e) return wzBotEt.apply(this, arguments);
  if (e == 1) {
    const er1 = er.filter((x) => !/^Falta (?!el t)|^Faltan |sede|huelga|energ|ocupad|estudiando|contrato|Fondos/i.test(x)),
      sig =
        wEsc()
          ? `<button class="b a" data-a="ide2" ${er1.length ? "disabled" : ""} style="width:100%;margin-top:6px" translate="no">${esc(tx4("Seguir: contratación y producción", "Next: hiring and production", "Suite : embauche et production", "Seguir: contratação e produção"))} →</button>`
          : `<button class="b a" data-a="idesc" ${er1.length ? "disabled" : ""} style="width:100%;margin-top:6px" translate="no">${ic("libro")} ${esc(tx4("Guardar y encargar el guion", "Save and commission the script", "Garder et commander le scénario", "Guardar e encomendar o roteiro"))}</button>`;
    return `${er1.length ? `<p class="m" style="color:var(--r)">${er1.map(esc).join(" · ")}</p>` : ""}${sig}<div class="bts" style="margin-top:6px" translate="no">${sv("")}${doc}</div>`;
  }
  return wzBotEt.apply(this, arguments).replace(/(<div class="bts" style="margin-top:6px">)/, "$1" + bt("ide1", "", ic("atras") + " " + tx4("Volver a la idea", "Back to the idea", "Revenir à l'idée", "Voltar à ideia")) + sv(""));
};
ACT["ide2"] = () => {
  if (!wEsc()) return toast(tx4("Primero un escritor tiene que escribir la idea", "First a writer has to write the idea", "D'abord un scénariste doit écrire l'idée", "Primeiro um escritor tem que escrever a ideia"));
  W.etapa = 2;
  if (!Object.keys(W.crew || {}).length) W.crew = eqRec(W.m, BD());
  // El escritor del guion sigue en el equipo si está libre
  const tw = S.tl[W.escT];
  if (tw && !tw.ret && !tw.dead && !ocupado(tw) && MD[W.m][1].includes(0)) W.crew[0] = tw.id;
  repartoRec(W);
  W.tab = 3;
  return wz();
};
ACT["ide1"] = () => {
  W.etapa = 1;
  W.tab = 0;
  return wz();
};
// ---------- Ideas guardadas ----------
const ideas = () => (S.ideas = S.ideas || []);
function idPack() {
  return Object.assign(ideaPack(), { fid: W.fid, src: W.src, ct: W.ct, mt: W.mt, enc: null, cop: null, etapa: 1 });
}
// Guarda la idea (con su guion, si ya lo tiene) y devuelve el registro
function idGuarda() {
  const id = W.idI || "d" + (S.idN = (S.idN | 0) + 1),
    v = ideas().find((x) => x.id == id),
    it = Object.assign(v || {}, { id, n: String(W.nm).trim().slice(0, 80), m: W.m, y: yr(), w: idPack() });
  if (!v) ideas().unshift(it);
  W.idI = id;
  return it;
}
ACT["idsv"] = () => {
  if (!String(W.nm || "").trim()) return toast(tx4("Ponle un título", "Give it a title", "Donne-lui un titre", "Dê um título"));
  idGuarda();
  cx();
  toast(tx4("Idea guardada en Proyectos", "Idea saved to Projects", "Idée gardée dans Projets", "Ideia guardada em Projetos"));
  return pg();
};
// ---------- El guion: un escritor convierte la idea en letras; tarda, cobra y le pone nota ----------
const escFee = (t, m) => (t.you ? 0 : Math.round(fee(t, 0, m) * 0.35));
const escSem = (t, w) => cl(Math.round(3 + (w.cx | 0) * 1.5 + (w.cast || []).length / 4 + (100 - (t.s[0] | 0)) / 25), 3, 16);
function idEscPick(it) {
  const L = S.tl
    .filter((t) => !t.ret && !t.dead && !t.es && (t.r == 0 || t.you) && (t.e >= 10 || t.you) && !ocupado(t))
    .sort((a, b) => (b.you ? 1 : 0) - (a.you ? 1 : 0) || b.s[0] - a.s[0])
    .slice(0, 40);
  if (!L.length) return toast(tx4("No hay escritores libres", "No writers available", "Aucun scénariste libre", "Não há escritores livres"));
  return fxPick({
    t: tx4("¿Quién escribe «" + it.n + "»?", "Who writes \"" + it.n + "\"?", "Qui écrit « " + it.n + " » ?", "Quem escreve «" + it.n + "»?"),
    d: tx4("El escritor convierte la idea en guion. Tarda unas semanas y su habilidad decide la nota del guion: con esa nota se produce mejor y la idea vale más si la vendes.", "The writer turns the idea into a script. It takes some weeks and their skill sets the script's score: a better score makes a better production and a pricier sale.", "Le scénariste transforme l'idée en scénario. Cela prend quelques semaines et son talent fixe la note : une meilleure note donne une meilleure production et une vente plus chère.", "O escritor transforma a ideia em roteiro. Leva algumas semanas e sua habilidade define a nota: com ela a produção sai melhor e a ideia vale mais se você a vender."),
    items: L.map((t) => ({ v: t.id, l: t.n, nt: 1, ns: 1, s: tx4("escritura", "writing", "écriture", "escrita") + " " + t.s[0] + " · " + escSem(t, it.w) + " " + tx4("sem", "wks", "sem", "sem") + " · " + (t.you ? tx4("eres tú", "it's you", "c'est toi", "é você") : fm(escFee(t, it.m))) })),
    orden: false,
    ok: (s) => {
      const t = S.tl[+s[0]];
      if (!t) return;
      const c = escFee(t, it.m);
      if (S.cash < c) return toast("Fondos insuficientes");
      gasta("talento", c);
      if (!t.you) t.e = Math.max(0, t.e - 10);
      Object.assign(it, { esc: t.id, ef: S.t + escSem(t, it.w), gs: null });
      it.w.gsc = null;
      nws(tx4(`${t.n} empieza a escribir «${it.n}».`, `${t.n} starts writing "${it.n}".`, `${t.n} commence à écrire « ${it.n} ».`, `${t.n} começa a escrever «${it.n}».`));
      return pg();
    },
  });
}
ACT["idesc"] = () => {
  if (!String(W.nm || "").trim()) return toast(tx4("Ponle un título", "Give it a title", "Donne-lui un titre", "Dê um título"));
  const it = idGuarda();
  cx();
  return idEscPick(it);
};
on("semana", () => {
  if (!S || !S.ideas) return;
  S.ideas.forEach((it) => {
    if (it.esc == null || it.gs != null || S.t < it.ef) return;
    const t = S.tl[it.esc],
      w = it.w || {},
      rico = Math.min(10, (w.tm || []).length + (w.pa || []).length + (w.ar || []).length + (w.cast || []).length / 2);
    it.gs = cl(Math.round((t ? t.s[0] : 50) * 0.7 + rico * 2 + 8 + gauss() * 6), 10, 99);
    w.gsc = it.gs;
    w.escT = it.esc;
    nws(tx4(`«${it.n}» ya está escrita: el guion de ${t ? t.n : ""} saca ${it.gs}/100.`, `"${it.n}" is written: ${t ? t.n : ""}'s script scores ${it.gs}/100.`, `« ${it.n} » est écrite : le scénario de ${t ? t.n : ""} obtient ${it.gs}/100.`, `«${it.n}» está escrita: o roteiro de ${t ? t.n : ""} tira ${it.gs}/100.`));
  });
});
// La nota del guion pesa en la obra
V37.prod.push((P, W2) => {
  if (W2.gsc != null) P.gsc = W2.gsc;
});
V37.mods.push((P, add) => {
  if (P.gsc != null) add(Math.round(((P.gsc - 60) / 10) * 10) / 10, Math.round(((P.gsc - 60) / 20) * 10) / 10, tx4("el guion", "the script", "le scénario", "o roteiro"));
});
function idAbre(it, etapa) {
  ideaUnpack(it.w);
  ["fid", "src", "ct", "mt"].forEach((k) => it.w[k] != null && (W[k] = it.w[k]));
  W.gsc = it.gs != null ? it.gs : null;
  W.escT = it.esc;
  W.idI = it.id;
  W.md = "d";
  W.etapa = etapa;
  W.tab = etapa == 1 ? 0 : 3;
  if (etapa == 1) W.crew = {};
}
V37.prod.push((P, W2) => {
  if (W2.idI) S.ideas = ideas().filter((x) => x.id != W2.idI);
  if (W2.cop != null) P.cop = W2.cop;
});
const rivN = (r) => (S.rv[r] ? S.rv[r].n : "");
const rivL = (m) => rvVivos().filter((i) => !S.rv[i].own && !S.rv[i].ind && (m == null || (S.rv[i].sp[m] | 0) >= 1));
function idPrecio(it, r) {
  const o = S.rv[r] || { sz: 1 },
    t = S.tl[it.esc],
    // Si la escribiste tú, vale según tu habilidad de escritura
    base = t && !t.you ? escFee(t, it.m) : TB(it.m) * 0.003 * ((t ? t.s[0] : 50) / 50);
  // Un guion flojo apenas recupera lo que costó escribirlo; uno muy bueno se vende por varias veces su costo
  return Math.round(base * (0.5 + Math.pow((it.gs || 0) / 50, 2)) * (0.7 + 0.3 * o.sz));
}
const artL = () => (typeof bnd41 == "function" ? bnd41().filter((b) => !b.sep && b.h > S.t) : []);
function idRow(it) {
  const o = [
    ["e", tx4("Editar la idea", "Edit the idea", "Modifier l'idée", "Editar a ideia")],
    ["r", tx4("Encomendar a un rival", "Commission a rival", "Confier à un rival", "Encomendar a um rival")],
    it.gs != null ? ["c", tx4("Coproducir con un rival", "Co-produce with a rival", "Coproduire avec un rival", "Coproduzir com um rival")] : null,
    it.m == 4 && artL().length ? ["a", tx4("Encomendar a tus artistas firmados", "Commission your signed artists", "Confier à tes artistes sous contrat", "Encomendar aos seus artistas contratados")] : null,
    it.gs != null ? ["v", tx4("Vender a un rival", "Sell to a rival", "Vendre à un rival", "Vender a um rival")] : null,
    ["m", tx4("Archivar como material", "File as material", "Archiver comme matériel", "Arquivar como material")],
    ["d", tx4("Documento de la idea", "Idea document", "Document de l'idée", "Documento da ideia")],
    ["x", tx4("Borrar", "Delete", "Supprimer", "Apagar")],
  ].filter(Boolean);
  const tw = S.tl[it.esc],
    est =
      it.gs != null
        ? tx4(`Guion ${it.gs}/100 · ${tw ? tw.n : ""}`, `Script ${it.gs}/100 · ${tw ? tw.n : ""}`, `Scénario ${it.gs}/100 · ${tw ? tw.n : ""}`, `Roteiro ${it.gs}/100 · ${tw ? tw.n : ""}`)
        : it.esc != null
          ? tx4(`Escribiéndose · ${tw ? tw.n : ""} · ${Math.max(0, it.ef - S.t)} sem`, `Being written · ${tw ? tw.n : ""} · ${Math.max(0, it.ef - S.t)} wks`, `En écriture · ${tw ? tw.n : ""} · ${Math.max(0, it.ef - S.t)} sem`, `Sendo escrita · ${tw ? tw.n : ""} · ${Math.max(0, it.ef - S.t)} sem`)
          : tx4("Sin guion todavía", "No script yet", "Pas encore de scénario", "Ainda sem roteiro"),
    pri = it.gs != null ? bt("idx", it.id + "|p", ic("adelante") + " " + tx4("Contratar y producir", "Hire and produce", "Embaucher et produire", "Contratar e produzir"), "a") : it.esc != null ? "" : bt("idx", it.id + "|w", ic("libro") + " " + tx4("Encargar el guion", "Commission the script", "Commander le scénario", "Encomendar o roteiro"), "a");
  return `<div class="c sub" translate="no"><div class="k"><b>${ic("idea")} ${esc(it.n)}</b><span class="m">${esc(MD[it.m][0])} · ${it.y}</span></div><div class="m">${esc([(it.w.g || []).join(", "), (it.w.cast || []).length ? (it.w.cast || []).length + " " + tx4("personajes", "characters", "personnages", "personagens") : ""].filter(Boolean).join(" · "))}</div><div class="m" style="color:${it.gs != null ? "var(--a)" : "var(--t)"}">${esc(est)}</div><div class="k" style="gap:6px;flex-wrap:nowrap">${pri}<select onchange="if(this.value)act('idx','${it.id}|'+this.value)" style="flex:1"><option value="">${esc(tx4("Más opciones…", "More options…", "Plus d'options…", "Mais opções…"))}</option>${o.map(([k, n]) => `<option value="${k}">${esc(n)}</option>`).join("")}</select></div></div>`;
}
function idListaH() {
  const L = ideas();
  if (!L.length) return "";
  return `<h3 class="sec" translate="no">${ic("idea")} ${esc(tx4("Ideas en proceso", "Ideas in progress", "Idées en cours", "Ideias em andamento"))} (${L.length})</h3>${L.map(idRow).join("")}`;
}
const vPId = vP;
vP = function () {
  return idListaH() + vPId.apply(this, arguments);
};
function idRival(it, t, f) {
  const L = rivL(it.m);
  if (!L.length) return toast(tx4("No hay rivales disponibles para ese medio", "No rivals available for that medium", "Aucun rival disponible pour ce média", "Não há rivais disponíveis para esse meio"));
  return fxPick({ t, items: L.map((r) => ({ v: r, l: S.rv[r].n, nt: 1, ns: 1, s: f ? f(r) : "" })), ok: (s) => idHaz(it, +s[0]) });
}
let IDK2 = null;
function idHaz(it, r) {
  const a = IDK2;
  if (a == "r" || a == "c") {
    idAbre(it, 2);
    if (a == "r") W.enc = r;
    else W.cop = r;
    return wz();
  }
  if (a == "v") {
    if (S.rv[r].idc > S.t) return toast(tx4("Ese rival ya compró una idea hace poco", "That rival bought an idea recently", "Ce rival a acheté une idée récemment", "Esse rival comprou uma ideia há pouco"));
    S.rv[r].idc = S.t + 26;
    const p = idPrecio(it, r);
    S.idv = (S.idv || []).concat([{ id: it.id, n: it.n, m: it.m, r, y: yr(), p, w: it.w, gp: 0, cob: 0 }]);
    S.ideas = ideas().filter((x) => x.id != it.id);
    gana("ventas", p);
    try {
      rvProg(it.m, yr(), { k: r, gn: (it.w.g || []).slice(0, 2), n: it.n });
    } catch (e) {
      console.error("rvProg idea", e);
    }
    nws(tx4(`Vendes la idea «${it.n}» a ${rivN(r)} por ${fm(p)}. Lleva tu crédito y te paga el 3 % de lo que recaude.`, `You sell the idea "${it.n}" to ${rivN(r)} for ${fm(p)}. It carries your credit and pays you 3% of its gross.`, `Tu vends l'idée « ${it.n} » à ${rivN(r)} pour ${fm(p)}. Elle porte ton crédit et te verse 3 % de ses recettes.`, `Você vende a ideia «${it.n}» para ${rivN(r)} por ${fm(p)}. Leva seu crédito e paga 3 % do que arrecadar.`));
    return pg();
  }
}
ACT["idx"] = (v) => {
  const [id, a] = String(v).split("|"),
    it = ideas().find((x) => x.id == id);
  if (!it) return;
  IDK2 = a;
  if (a == "w") return idEscPick(it);
  if ((a == "p" || a == "c" || a == "v") && it.gs == null) return toast(tx4("Primero un escritor tiene que escribir la idea", "First a writer has to write the idea", "D'abord un scénariste doit écrire l'idée", "Primeiro um escritor tem que escrever a ideia"));
  if (a == "e" || a == "p") {
    idAbre(it, a == "e" ? 1 : 2);
    if (a == "p") {
      W.crew = eqRec(W.m, BD());
      repartoRec(W);
    }
    return wz();
  }
  if (a == "r") return idRival(it, tx4("Encomendar a un rival", "Commission a rival", "Confier à un rival", "Encomendar a um rival"), () => tx4("Produce con su equipo y cobra un 15 %", "Produces with its crew and charges 15%", "Produit avec son équipe et prend 15 %", "Produz com sua equipe e cobra 15 %"));
  if (a == "c") return idRival(it, tx4("Coproducir con un rival", "Co-produce with a rival", "Coproduire avec un rival", "Coproduzir com um rival"), () => tx4("Pone el 40 % del costo y se queda con el 40 % de las ventas", "Covers 40% of the cost and keeps 40% of sales", "Paie 40 % du coût et garde 40 % des ventes", "Paga 40 % do custo e fica com 40 % das vendas"));
  if (a == "v") {
    if (!rivL(it.m).some((r) => !(S.rv[r].idc > S.t))) return toast(tx4("Ningún rival quiere comprar ideas ahora", "No rival wants to buy ideas right now", "Aucun rival ne veut acheter d'idées maintenant", "Nenhum rival quer comprar ideias agora"));
    return idRival(it, tx4("Vender la idea", "Sell the idea", "Vendre l'idée", "Vender a ideia"), (r) => (S.rv[r].idc > S.t ? tx4("ya compró una idea hace poco", "bought an idea recently", "a acheté une idée récemment", "comprou uma ideia há pouco") : tx4("Paga ", "Pays ", "Paie ", "Paga ") + fm(idPrecio(it, r))));
  }
  if (a == "a") {
    const B = artL();
    return fxPick({
      t: tx4("Encomendar a tus artistas", "Commission your artists", "Confier à tes artistes", "Encomendar aos seus artistas"),
      items: B.map((b) => ({ v: b.id, l: b.n, nt: 1, s: LL(ART41[bndA41(b)]) + " · " + nfc(b.fans) + " fans" })),
      ok: (s) => idArt(it, +s[0]),
    });
  }
  if (a == "m") {
    const w = it.w;
    S.mt.push({ i: "i" + it.id, n: it.n, a: S.sn, y: yr(), k: tx4("Idea original", "Original idea", "Idée originale", "Ideia original"), g: (w.g || []).slice(0, 2), f: 50, pd: 0, pr: 0, u: 0, cu: 1, tm: (w.tm || []).concat(w.pa || []), pjs: (w.cast || []).map((c) => [c.n, c.x || "X", { sp: c.sp | 0, e: c.e, a: c.a, mot: c.mot }]), sn: "" });
    S.ideas = ideas().filter((x) => x.id != it.id);
    toast(tx4("La idea pasa a tus materiales", "The idea moves to your materials", "L'idée passe dans tes matériaux", "A ideia vai para seus materiais"));
    return pg();
  }
  if (a == "d") {
    const W0 = W;
    idAbre(it, 1);
    DOCX = null;
    const r = ACT["wdoc"]();
    W = W0;
    return r;
  }
  if (a == "x") {
    S.ideas = ideas().filter((x) => x.id != it.id);
    toast(tx4("Idea borrada", "Idea deleted", "Idée supprimée", "Ideia apagada"));
    return pg();
  }
};
// Música: tus artistas firmados la graban por encargo, sin pasar por el creador (cuenta como colaboración)
function idArt(it, bid) {
  const b = bndDe41(bid);
  if (!b) return;
  idAbre(it, 2);
  W.crew = eqRec(W.m, BD());
  repartoRec(W);
  ACT["bn4w"](String(bid));
  const P = producir();
  if (!P || typeof P == "string") {
    toast(String(P || ""));
    return wz();
  }
  P.colab = b.n;
  cx();
  nws(tx4(`${b.n} graba «${P.n}» por encargo de tu sello.`, `${b.n} records "${P.n}" commissioned by your label.`, `${b.n} enregistre « ${P.n} » pour ton label.`, `${b.n} grava «${P.n}» por encomenda do seu selo.`));
  return pg();
}
// Coproducción: el rival pone el 40 % y se queda con el 40 %
V37.costo.push((W2) => (W2.cop != null ? 0.6 : 1));
V37.ventas.push((P) => (P && P.cop != null ? 0.6 : 1));
V37.ficha.push((P) => {
  const L = [P.cop != null ? tx4("Coproducción con ", "Co-production with ", "Coproduction avec ", "Coprodução com ") + rivN(P.cop) : "", P.colab ? tx4("Por encargo a ", "Commissioned to ", "Commandée à ", "Por encomenda a ") + P.colab : "", P.adq ? tx4(`Comprada a ${P.adq.r} en ${P.adq.y}`, `Bought from ${P.adq.r} in ${P.adq.y}`, `Achetée à ${P.adq.r} en ${P.adq.y}`, `Comprada de ${P.adq.r} em ${P.adq.y}`) : ""].filter(Boolean);
  return L.length ? `<div class="c sub" translate="no">${L.map((x) => `<div class="m">${esc(x)}</div>`).join("")}</div>` : "";
});
// El documento de la idea no cruza dinero ni contratación: solo la historia (la ficha de una obra estrenada sí trae sus datos)
const wdocbId = ACT["wdocb"];
ACT["wdocb"] = (v0) => {
  const d = DOCX || docDatos(),
    q = String(v0).split("|");
  return wdocbId(d && d.P ? v0 : "h|" + q[q.length - 1]);
};
// ---------- Ideas vendidas: en el archivo, con su resultado y la opción de recomprar la franquicia ----------
const idObra = (x) => (S.rw || []).find((e) => e.o == x.r && e.n == x.n && e.y >= x.y);
const idPrF = (e) => Math.max(Math.round(TB(e.m) * 0.3), Math.round((e.gR / hoyF(yr())) * 0.25 * (1 + Math.max(0, 20 - (yr() - e.y)) / 40)));
function idVendH() {
  const L = S.idv || [];
  if (!L.length) return "";
  return `<h3 class="sec" translate="no">${ic("dinero")} ${esc(tx4("Ideas vendidas", "Ideas sold", "Idées vendues", "Ideias vendidas"))} (${L.length})</h3>${L.map((x, k) => {
    const e = idObra(x),
      ya = e && (S.rwb || []).includes(e.id),
      t = (id) => (id != null && S.tl[id] ? S.tl[id].n : "");
    return `<div class="c sub" translate="no"><div class="k"><b>«${esc(x.n)}»</b><span class="m">${esc(MD[x.m][0])} · ${esc(rivN(x.r))} · ${x.y}</span></div><div class="m">${esc(tx4(`Vendida por ${fm(x.p)} · regalías cobradas ${fm(x.cob || 0)}`, `Sold for ${fm(x.p)} · royalties collected ${fm(x.cob || 0)}`, `Vendue ${fm(x.p)} · redevances perçues ${fm(x.cob || 0)}`, `Vendida por ${fm(x.p)} · royalties recebidos ${fm(x.cob || 0)}`))}</div>${
      e
        ? `<div class="m">${esc(
            tx4(
              `Se estrenó en ${e.y}: recauda ${fm(Math.round(e.gR / hoyF(yr())))} · crítica ${e.C} · público ${e.A}`,
              `Released in ${e.y}: grosses ${fm(Math.round(e.gR / hoyF(yr())))} · critics ${e.C} · audience ${e.A}`,
              `Sortie en ${e.y} : recettes ${fm(Math.round(e.gR / hoyF(yr())))} · critique ${e.C} · public ${e.A}`,
              `Estreou em ${e.y}: arrecada ${fm(Math.round(e.gR / hoyF(yr())))} · crítica ${e.C} · público ${e.A}`,
            ) + [t(e.d) ? " · " + tx4("dirige ", "directed by ", "réalisé par ", "direção de ") + t(e.d) : "", t(e.a) ? " · " + tx4("con ", "starring ", "avec ", "com ") + t(e.a) : ""].join(""),
          )}</div>${ya ? `<div class="m" style="color:var(--a)">${esc(tx4("La franquicia ya es tuya.", "The franchise is yours.", "La franchise est à toi.", "A franquia já é sua."))}</div>` : `<div class="bts">${bt("idfb", k, ic("dinero") + " " + tx4("Comprar la franquicia", "Buy the franchise", "Racheter la franchise", "Comprar a franquia") + " · " + fm(idPrF(e)), S.cash >= idPrF(e) ? "" : "off")}</div>`}`
        : `<div class="m">${esc(tx4(`En producción en ${rivN(x.r)}.`, `In production at ${rivN(x.r)}.`, `En production chez ${rivN(x.r)}.`, `Em produção na ${rivN(x.r)}.`))}</div>`
    }</div>`;
  }).join("")}`;
}
const mtVId = mtV;
mtV = function () {
  return mtVId.apply(this, arguments) + idVendH();
};
on("mes", () => {
  if (!S || !S.idv) return;
  S.idv.forEach((x) => {
    const e = idObra(x);
    if (!e || !(e.gR > (x.gp || 0))) return;
    const c = Math.round((0.03 * (e.gR - (x.gp || 0))) / hoyF(yr()));
    x.gp = e.gR;
    if (c > 0) {
      gana("ventas", c);
      x.cob = (x.cob || 0) + c;
    }
  });
});
ACT["idfb"] = (v) => {
  const x = (S.idv || [])[+v],
    e = x && idObra(x);
  if (!e) return;
  const pr = idPrF(e);
  if (S.cash < pr) return toast("Fondos insuficientes");
  gasta("otros", pr);
  S.rwb = (S.rwb || []).concat([e.id]);
  S.mt.push({ i: "f" + e.id, n: e.n, a: rivN(e.o), y: e.y, k: "Franquicia de " + MD[e.m][0].toLowerCase(), g: [e.g0].filter(Boolean), f: 60, pd: 0, pr, u: 0 });
  if (S.rv[e.o]) S.rv[e.o].gan = (S.rv[e.o].gan || 0) + pr;
  nws(tx4(`Recompras la franquicia «${e.n}» a ${rivN(e.o)} por ${fm(pr)}.`, `You buy back the franchise "${e.n}" from ${rivN(e.o)} for ${fm(pr)}.`, `Tu rachètes la franchise « ${e.n} » à ${rivN(e.o)} pour ${fm(pr)}.`, `Você recompra a franquia «${e.n}» de ${rivN(e.o)} por ${fm(pr)}.`));
  frImporta(e);
  return pg();
};
// ---------- Franquicia comprada a un rival: sus obras pasan a tus franquicias, cada una con su ficha ----------
// Ficha base de un medio cuando todavía no tienes una obra terminada de ese medio
function frPlantilla(m, o) {
  if (m == null || !MD[m]) return null;
  const W0 = W;
  o = o || {};
  try {
    W = wDef(Object.assign({ m, g: [0], tone: 4, pr: 4, age: 2, cx: 2, fx: 0, ai: 0, ln: 50, cs: 3, mc: -1, ty: [0], sb: [], tm: [0], pa: [0], ar: [0], cr: [], rl: 1, ep: 9, cy: -1, fk: 0, crew: {}, cast: [], nm: "", md: "r", pm: [], gq: 0 }, o.w || {}));
    if (o.pjs) W.cast = o.pjs(W) || [];
    const Pn = wP(),
      P = {
        m,
        gn: Pn.gn,
        tone: W.tone,
        pr: W.pr,
        age: Pn.age,
        cx: W.cx,
        fx: 0,
        ai: 0,
        cs: W.cs,
        mc: W.mc,
        ty: Pn.ty,
        sb: Pn.sb,
        tm: Pn.tm,
        pa: Pn.pa,
        ar: Pn.ar,
        cr: Pn.cr,
        pm: Pn.pm,
        rl: W.rl,
        fk: DX.fx[0],
        ep: W.ep,
        ea: [EP[W.ep]],
        cy: W.cy,
        br: 1,
        ln: W.ln,
        sl: [],
        mkc: 0,
        adm: 0,
        over: 1,
        cont: Pn.cont,
        cen: Pn.cen,
        dep: (Pn.dep || []).map(Math.round),
        sty: W.sty | 0,
        fmt: W.fmt,
        ani: 0,
        loc: 0,
        ter: 0,
        ext: 0,
        pol: W.pol,
        rit: W.rit,
        lug: W.lug,
        idi: W.idi,
        du: W.du == null ? void 0 : W.du,
        pob: W.pob,
        gq: 0,
        md: "r",
        nx: W.nx | 0,
        tvF: m == 1 ? W.tvF : void 0,
        eps: m == 1 ? W.eps : void 0,
        emin: m == 1 ? W.emin : void 0,
        tvS: W.tvS,
        tvT: W.tvT,
        sala: 0,
        dur: durH(m, W.ln, W),
        fee: 0,
        pw: 1,
        pl: 1,
        pct: 0,
        lin: [],
        mf: W.mf ? JSON.parse(JSON.stringify(W.mf)) : void 0,
        cast: o.pjs ? Pn.cast || [] : void 0,
      };
    P.fo = fOver(P);
    return P;
  } catch (er) {
    return null;
  } finally {
    W = W0;
  }
}
function frImporta(e) {
  // La obra, su original y sus secuelas (mismo estudio y medio); los títulos repetidos sin numerar son otras obras
  const raiz = rwRaiz(e.n),
    suf = (w) => w.n != rwRaiz(w.n),
    C = (S.rw || []).concat(S.rw40 || []).filter((w) => w && w.o == e.o && w.m == e.m && rwRaiz(w.n) == raiz),
    orig = suf(e) ? C.filter((w) => !suf(w) && w.y <= e.y).sort((a, b) => b.y - a.y)[0] : null,
    por = {},
    add = (w) => {
      const p = por[w.n];
      if (!p || (p != e && Math.abs(w.y - e.y) < Math.abs(p.y - e.y))) por[w.n] = w;
    };
  if (e.m != null) {
    por[e.n] = (S.rw || []).find((w) => w.o == e.o && w.n == e.n && w.y == e.y && w.m == e.m) || e;
    if (orig) add(orig);
    C.filter(suf).forEach(add);
  }
  const L = Object.values(por).sort((a, b) => a.y - b.y),
    ya = S.pj.find((p) => p.adq && p.m == e.m && p.adq.r == rivN(e.o) && rwRaiz(p.n) == raiz);
  let fid = ya ? ya.fid : null,
    n = 0;
  L.forEach((w) => {
    if (S.pj.some((p) => p.adq && (p.adq.rw == w.id || p.adq.rw == rwKey(w) || (p.n == w.n && p.y == w.y)))) return;
    // La obra llega con la misma ficha que tenía en el rival: equipo, personajes y cifras
    const Rv = typeof rwPj == "function" ? rwPj(w) : null,
      T = Rv || S.pj.find((p) => p.st == 4 && p.m == w.m && !p.adq) || frPlantilla(w.m);
    if (!T) return;
    const P = JSON.parse(JSON.stringify(T)),
      id = S.ids++,
      y = w.y || yr(),
      b = w.b || P.bud || 0;
    delete P.rvo;
    delete P.rwk;
    if (!Rv)
      Object.assign(P, {
        gn: w.g0 || w.g ? [w.g0 || w.g] : (P.gn || []).slice(0, 1),
        y,
        rt: S.t - (yr() - y) * 52,
        crew: w.d != null ? { [w.m == 4 ? 5 : 1]: w.d } : {},
        cast: [],
        aw: [],
        gross: w.gN != null ? w.gN : Math.round((w.gR || 0) / hoyF(y)),
        gR: w.gR || 0,
        c: w.C || 50,
        a: w.A || 50,
        h: Math.round(((w.A || 50) + (w.C || 50)) / 2),
        bud: b,
        cost: b,
        paid: b,
      });
    Object.assign(P, {
      id,
      n: w.n,
      m: w.m,
      st: 4,
      earn: 0,
      fid: fid == null ? id : fid,
      src: null,
      ct: 0,
      mt: null,
      sold: 0,
      bnd41: null,
      cop: null,
      colab: null,
      adq: { r: rivN(w.o), y: yr(), rw: w.id != null ? w.id : rwKey(w) },
    });
    P.r0 = P.rt;
    if (fid == null) fid = id;
    S.pj.push(P);
    n++;
  });
  if (n) {
    const F = frG(fid);
    F.n = raiz;
    F.cmp = F.cmp || { r: rivN(e.o), y: yr() };
    nws(tx4(`«${raiz}»: ${n} ${n == 1 ? "obra pasa" : "obras pasan"} a tus franquicias, con su ficha.`, `"${raiz}": ${n} ${n == 1 ? "work joins" : "works join"} your franchises, each with its sheet.`, `« ${raiz} » : ${n} ${n == 1 ? "œuvre rejoint" : "œuvres rejoignent"} tes franchises, avec leur fiche.`, `«${raiz}»: ${n} ${n == 1 ? "obra entra" : "obras entram"} nas suas franquias, com sua ficha.`));
  }
  return n;
}
const frcbId = ACT["frcb"];
ACT["frcb"] = (v) => {
  const n0 = S.mt.length,
    r = frcbId(v);
  if (S.mt.length > n0) {
    const e = (S.rw || []).find((z) => String(z.id) == String(v));
    if (e) frImporta(e);
    pg();
  }
  return r;
};
const remcId = ACT["remc"];
ACT["remc"] = (v) => {
  const x = (S.rem || [])[+v],
    n0 = S.mt.length,
    r = remcId(v);
  if (x && S.mt.length > n0) {
    frImporta({ n: x.n, o: x.o, m: x.m, y: x.y });
    pg();
  }
  return r;
};
// Partidas guardadas: franquicias compradas que no llegaron a tus franquicias
function frRepara() {
  if (!S || !S.mt || !S.pj || !S.rv) return;
  // Obras compradas desde su ficha
  (S.rwb40 || []).forEach((k) => {
    const x = (S.rw40 || []).find((z) => rwKey(z) == k);
    if (!x || !S.rv[x.o] || S.pj.some((p) => p.adq && (p.adq.rw == k || (p.n == x.n && p.y == x.y)))) return;
    const e = (S.rw || []).find((z) => z.o == x.o && z.n == x.n && z.y == x.y);
    frImporta(Object.assign({ g0: x.g, id: e ? e.id : k }, x));
  });
  // Franquicias compradas en la lista de venta, en remates, recompradas o compradas desde una ficha
  S.mt.forEach((x) => {
    if (!x || x.imp41 || !/^[fqw]/.test(String(x.i || "")) || !/^Franquicia de /.test(x.k || "")) return;
    x.imp41 = 1;
    if (S.pj.some((p) => p.adq && (p.n == x.n || rwRaiz(p.n) == x.n))) return;
    const e = String(x.i)[0] == "f" && (S.rw || []).find((z) => String(z.id) == String(x.i).slice(1)),
      m = MD.findIndex((d) => x.k == "Franquicia de " + d[0].toLowerCase()),
      o = S.rv.findIndex((r, i) => r && (r.n == x.a || rvNom(i) == x.a));
    if (e) frImporta(e);
    else if (m >= 0 && o >= 0) frImporta({ n: x.n, o, m, y: x.y, g0: (x.g || [])[0] });
  });
}
on("semana", frRepara);
const vFrId = vFr;
vFr = function () {
  frRepara();
  return vFrId.apply(this, arguments);
};
const frCardId = frCard;
frCard = function (f) {
  const h = frCardId.apply(this, arguments),
    F = frG(f);
  return F.cmp ? h.replace(ic("idea") + " Original", `<span translate="no">${ic("dinero")} ${esc(tx4(`Comprada a ${F.cmp.r} en ${F.cmp.y}`, `Bought from ${F.cmp.r} in ${F.cmp.y}`, `Achetée à ${F.cmp.r} en ${F.cmp.y}`, `Comprada de ${F.cmp.r} em ${F.cmp.y}`))}</span>`) : h;
};
// ---------- Material: encomendarlo a un rival, coproducirlo o, si es música, encargarlo a tus artistas ----------
const mtRowId = mtRow;
mtRow = function (m, how, ix) {
  const h = mtRowId.apply(this, arguments),
    ok = how == "own" || (how == "pd" && (pdLibre(PD[ix]) || S.taller));
  return ok && !S.taller ? h.replace(/(<\/div>\s*)$/, `<div class="bts" translate="no">${bt("mtenc", (how == "pd" ? "p" : "o") + "|" + ix, ic("talento") + " " + tx4("Encomendar", "Commission", "Confier", "Encomendar"))}</div>$1`) : h;
};
ACT["mtenc"] = (v) => {
  const B = artL(),
    items = rivL(null)
      .map((r) => ({ v: "r" + r, l: S.rv[r].n, nt: 1, s: tx4("Encomendar: produce y cobra un 15 %", "Commission: produces and charges 15%", "Confier : produit et prend 15 %", "Encomendar: produz e cobra 15 %"), g: tx4("Rivales", "Rivals", "Rivaux", "Rivais") }))
      .concat(B.map((b) => ({ v: "a" + b.id, l: b.n, nt: 1, s: LL(ART41[bndA41(b)]) + " · " + tx4("música", "music", "musique", "música"), g: tx4("Tus artistas firmados", "Your signed artists", "Tes artistes sous contrat", "Seus artistas contratados") })));
  if (!items.length) return toast(tx4("No hay a quién encomendarlo", "There's no one to commission", "Personne à qui le confier", "Não há a quem encomendar"));
  return fxPick({
    t: tx4("Encomendar el material", "Commission the material", "Confier le matériel", "Encomendar o material"),
    items,
    orden: false,
    ok: (s) => {
      const k = String(s[0]);
      ACT["mta"](v);
      if (!W) return;
      W.md = "d";
      W.etapa = 2;
      if (k[0] == "r") {
        W.enc = +k.slice(1);
        W.tab = 3;
        return wz();
      }
      if (W.m != 4) wv({ dataset: { k: "m" }, value: "4" });
      W.crew = eqRec(W.m, BD());
      ACT["bn4w"](k.slice(1));
      const P = producir();
      if (!P || typeof P == "string") {
        toast(String(P || ""));
        return wz();
      }
      P.colab = (bndDe41(+k.slice(1)) || {}).n;
      cx();
      return pg();
    },
  });
};
// ---------- Parque temático de una de tus obras o franquicias ----------
const pqSemFr = pqSem;
pqSem = function (p) {
  const s = pqSemFr.apply(this, arguments);
  if (p.tf == null) return s;
  const k = 0.8 + (frH(p.tf) / 100) * 0.7;
  return Object.assign({}, s, { vis: Math.round(s.vis * k), ing: s.ing * k });
};
const pq40CardFr = pq40Card;
pq40Card = function (p, k, fr) {
  const h = pq40CardFr.apply(this, arguments);
  return p.tf == null ? h : h.replace(`<b>${T40("Parque en", "Park in")} ${tr40(CT[p.r])}</b>`, `<b translate="no">${esc(tx4("Parque de", "Park of", "Parc de", "Parque de"))} «${esc(frG(p.tf).n)}» · ${tr40(CT[p.r])}</b>`);
};
const pqHFr = pqH;
pqH = function () {
  const h = pqHFr.apply(this, arguments),
    F = frList().filter((f) => frEst(f) && !(S.pq || []).some((p) => p.tf == f));
  if (yr() < 1955 || !F.length) return h;
  return (
    h +
    `<div class="c" translate="no"><b>${esc(tx4("Parque de una de tus obras o franquicias", "Park of one of your works or franchises", "Parc d'une de tes œuvres ou franchises", "Parque de uma das suas obras ou franquias"))}</b><div class="m">${esc(
      tx4("Todo el parque gira alrededor de ella: atrae más gente cuanto más popular es y la mantiene viva entre estreno y estreno.", "The whole park revolves around it: it draws more people the more popular it is and keeps it alive between releases.", "Tout le parc tourne autour d'elle : il attire plus de monde quand elle est populaire et la garde vivante entre deux sorties.", "O parque inteiro gira em torno dela: atrai mais gente quanto mais popular ela é e a mantém viva entre um lançamento e outro."),
    )}</div><select onchange="if(this.value!=='')act('pqfr',this.value)"><option value="">+ ${esc(tx4("Abrir el parque de…", "Open the park of…", "Ouvrir le parc de…", "Abrir o parque de…"))} · ${fm(pqCosto(0))}</option>${F.slice(0, 40)
      .map((f) => `<option value="${f}">${esc(frG(f).n)} · ${frH(f)} %</option>`)
      .join("")}</select></div>`
  );
};
ACT["pqfr"] = (v) => {
  const f = +v,
    c = pqCosto(0),
    r = CY[S.sede] ? CY[S.sede][1] | 0 : 0;
  if (S.cash < c) return toast("Fondos insuficientes");
  capital(-c);
  S.pq = (S.pq || []).concat([{ r, l: 1, y: yr(), f: [f], tf: f }]);
  frG(f).hyB = (frG(f).hyB || 0) + 2;
  nws(tx4(`Abres el parque de «${frG(f).n}».`, `You open the "${frG(f).n}" park.`, `Tu ouvres le parc « ${frG(f).n} ».`, `Você abre o parque de «${frG(f).n}».`));
  return pg();
};
on("mes", () => {
  (S && S.pq ? S.pq : []).forEach((p) => {
    if (p.tf != null && !(p.cer > S.t)) frG(p.tf).hyB = Math.min(10, (frG(p.tf).hyB || 0) + 0.2);
  });
});
