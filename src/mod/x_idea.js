// ===== La idea primero: 1 · idea, 2 · contratación y producción, 3 · marketing, 4 · lanzamiento =====
// La idea se guarda en Proyectos; desde ahí se produce, se encomienda o se coproduce con un rival, se encarga a tus artistas
// (música), se vende con crédito o se archiva como material. Las ideas vendidas quedan en el archivo con su resultado.
const WT1 = [0, 1, 2, 3, 6],
  WT2 = [3, 4, 5];
const wEt = () => (W && W.md == "d" ? (W.etapa == 2 ? 2 : 1) : 0);
const wTabs = () => (wEt() == 1 ? WT1 : wEt() == 2 ? WT2 : WORD);
const idT = (e, n, f, p) => `<span translate="no">${esc(tx4(e, n, f, p))}</span>`;
function wEtapaH() {
  const e = wEt();
  if (!e) return "";
  const N = [tx4("Idea", "Idea", "Idée", "Ideia"), tx4("Contratación y producción", "Hiring and production", "Embauche et production", "Contratação e produção"), "Marketing", tx4("Lanzamiento", "Launch", "Lancement", "Lançamento")];
  return `<div class="c" translate="no"><div class="chips" style="margin:0">${N.map((n, i) => `<span class="ch${i + 1 == e ? " on" : ""}" style="cursor:default${i + 1 < e ? ";opacity:.7" : ""}">${i + 1} · ${esc(n)}</span>`).join("")}</div><div class="m">${esc(
    e == 1
      ? tx4(
          "Primero la idea: la historia, cómo se cuenta, sus estilos y sus personajes. Guárdala en Proyectos o sigue a la contratación.",
          "First the idea: the story, how it's told, its styles and its characters. Save it in Projects or move on to hiring.",
          "D'abord l'idée : l'histoire, sa façon d'être racontée, ses styles et ses personnages. Garde-la dans Projets ou passe à l'embauche.",
          "Primeiro a ideia: a história, como é contada, seus estilos e seus personagens. Guarde-a em Projetos ou siga para a contratação.",
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
  if (!e) return wzBotEt.apply(this, arguments).replace(/(<div class="bts" style="margin-top:6px">)/, "$1" + sv(""));
  if (e == 1) {
    const er1 = er.filter((x) => !/^Falta (?!el t)|^Faltan |sede|huelga|energ|ocupad|estudiando|contrato|Fondos/i.test(x));
    return `${er1.length ? `<p class="m" style="color:var(--r)">${er1.map(esc).join(" · ")}</p>` : ""}<button class="b a" data-a="ide2" ${er1.length ? "disabled" : ""} style="width:100%;margin-top:6px" translate="no">${esc(tx4("Seguir: contratación y producción", "Next: hiring and production", "Suite : embauche et production", "Seguir: contratação e produção"))} →</button><div class="bts" style="margin-top:6px" translate="no">${sv("")}${doc}</div>`;
  }
  return wzBotEt.apply(this, arguments).replace(/(<div class="bts" style="margin-top:6px">)/, "$1" + bt("ide1", "", ic("atras") + " " + tx4("Volver a la idea", "Back to the idea", "Revenir à l'idée", "Voltar à ideia")) + sv(""));
};
ACT["ide2"] = () => {
  W.etapa = 2;
  if (!Object.keys(W.crew || {}).length) W.crew = eqRec(W.m, BD());
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
ACT["idsv"] = () => {
  if (!String(W.nm || "").trim()) return toast(tx4("Ponle un título", "Give it a title", "Donne-lui un titre", "Dê um título"));
  const id = W.idI || "d" + (S.idN = (S.idN | 0) + 1),
    it = { id, n: String(W.nm).trim().slice(0, 80), m: W.m, y: yr(), w: idPack() },
    k = ideas().findIndex((x) => x.id == id);
  if (k >= 0) ideas()[k] = it;
  else ideas().unshift(it);
  W.idI = id;
  cx();
  toast(tx4("Idea guardada en Proyectos", "Idea saved to Projects", "Idée gardée dans Projets", "Ideia guardada em Projetos"));
  return pg();
};
function idAbre(it, etapa) {
  ideaUnpack(it.w);
  ["fid", "src", "ct", "mt"].forEach((k) => it.w[k] != null && (W[k] = it.w[k]));
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
  const w = it.w || {},
    o = S.rv[r] || { sz: 1 },
    k = 1 + 0.05 * Math.min(8, (w.tm || []).length) + 0.03 * Math.min(12, (w.cast || []).length) + 0.05 * Math.min(3, (w.pa || []).length);
  return Math.round(TB(it.m) * 0.04 * k * (0.6 + 0.4 * o.sz) * (1 + (S.pop || 0) / 200));
}
const artL = () => (typeof bnd41 == "function" ? bnd41().filter((b) => !b.sep && b.h > S.t) : []);
function idRow(it) {
  const o = [
    ["e", tx4("Editar la idea", "Edit the idea", "Modifier l'idée", "Editar a ideia")],
    ["r", tx4("Encomendar a un rival", "Commission a rival", "Confier à un rival", "Encomendar a um rival")],
    ["c", tx4("Coproducir con un rival", "Co-produce with a rival", "Coproduire avec un rival", "Coproduzir com um rival")],
    it.m == 4 && artL().length ? ["a", tx4("Encomendar a tus artistas firmados", "Commission your signed artists", "Confier à tes artistes sous contrat", "Encomendar aos seus artistas contratados")] : null,
    ["v", tx4("Vender a un rival", "Sell to a rival", "Vendre à un rival", "Vender a um rival")],
    ["m", tx4("Archivar como material", "File as material", "Archiver comme matériel", "Arquivar como material")],
    ["d", tx4("Documento de la idea", "Idea document", "Document de l'idée", "Documento da ideia")],
    ["x", tx4("Borrar", "Delete", "Supprimer", "Apagar")],
  ].filter(Boolean);
  return `<div class="c sub" translate="no"><div class="k"><b>${ic("idea")} ${esc(it.n)}</b><span class="m">${esc(MD[it.m][0])} · ${it.y}</span></div><div class="m">${esc([(it.w.g || []).join(", "), (it.w.cast || []).length ? (it.w.cast || []).length + " " + tx4("personajes", "characters", "personnages", "personagens") : ""].filter(Boolean).join(" · "))}</div><div class="k" style="gap:6px;flex-wrap:nowrap">${bt("idx", it.id + "|p", ic("adelante") + " " + tx4("Contratar y producir", "Hire and produce", "Embaucher et produire", "Contratar e produzir"), "a")}<select onchange="if(this.value)act('idx','${it.id}|'+this.value)" style="flex:1"><option value="">${esc(tx4("Más opciones…", "More options…", "Plus d'options…", "Mais opções…"))}</option>${o.map(([k, n]) => `<option value="${k}">${esc(n)}</option>`).join("")}</select></div></div>`;
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
  if (a == "v") return idRival(it, tx4("Vender la idea", "Sell the idea", "Vendre l'idée", "Vender a ideia"), (r) => tx4("Paga ", "Pays ", "Paie ", "Paga ") + fm(idPrecio(it, r)));
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
function frImporta(e) {
  const raiz = String(e.n)
      .replace(/ (II|III|IV)$|\s?: el regreso$|\s?: la saga continúa$/, "")
      .trim(),
    L = (S.rw || []).filter((w) => w.o == e.o && (w.n == e.n || w.n.indexOf(raiz) == 0)).sort((a, b) => a.y - b.y);
  if (!L.length && e.m != null) L.push(e);
  let fid = null,
    n = 0;
  L.forEach((w) => {
    if (S.pj.some((p) => p.adq && p.adq.rw == w.id)) return;
    const T = S.pj.find((p) => p.st == 4 && p.m == w.m && !p.adq);
    if (!T) return;
    const P = JSON.parse(JSON.stringify(T)),
      id = S.ids++,
      y = w.y || yr(),
      b = w.b || P.bud || 0;
    Object.assign(P, {
      id,
      n: w.n,
      m: w.m,
      gn: w.g0 ? [w.g0] : (P.gn || []).slice(0, 1),
      y,
      rt: S.t - (yr() - y) * 52,
      st: 4,
      crew: w.d != null ? { [w.m == 4 ? 5 : 1]: w.d } : {},
      cast: [],
      aw: [],
      earn: 0,
      gross: Math.round((w.gR || 0) / hoyF(yr())),
      gR: w.gR || 0,
      c: w.C || 50,
      a: w.A || 50,
      h: Math.round(((w.A || 50) + (w.C || 50)) / 2),
      bud: b,
      cost: b,
      paid: b,
      fid: fid == null ? id : fid,
      src: null,
      ct: 0,
      mt: null,
      sold: 0,
      bnd41: null,
      cop: null,
      colab: null,
      adq: { r: rivN(w.o), y: yr(), rw: w.id },
    });
    P.r0 = P.rt;
    if (fid == null) fid = id;
    S.pj.push(P);
    n++;
  });
  if (n) {
    frG(fid).n = raiz;
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
