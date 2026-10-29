// ===== Selector universal con buscador, temas en orden alfabético, crossover, encargos, exclusivas, arquetipos y talentos fuera de su clasificación =====
const nrmS = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
const FXP = { o: null };
// o = { t: título, items: [{ v, l, s (detalle), g (grupo), off, nt (nombre propio: no se traduce), ns (detalle ya traducido) }], sel: [], max, min, ok(sel), orden: false para no ordenar }
function fxPick(o) {
  const x = (FXP.o = Object.assign({ sel: [], max: 1, min: 0, q: "", orden: true }, o));
  x.sel = (x.sel || []).map(String);
  if (x.orden) x.items = x.items.slice().sort((a, b) => String(a.g || "").localeCompare(String(b.g || ""), "es") || String(a.l).localeCompare(String(b.l), "es"));
  let d = $("#fxp");
  if (!d) {
    d = document.createElement("div");
    d.id = "fxp";
    document.body.appendChild(d);
    d.addEventListener("click", (e) => {
      if (e.target === d) fxpCierra();
    });
  }
  d.innerHTML = `<div class="fxp-h" role="dialog" aria-modal="true"><div class="k"><h2 style="margin:0">${esc(x.t)}</h2><button class="b x" data-a="fxpx" aria-label="${T40("Cerrar", "Close")}">${ic("cerrar")}</button></div>${x.d ? `<div class="m">${x.d}</div>` : ""}<input id="fxpq" type="search" autocomplete="off" placeholder="${T40("Buscar…", "Search…")}" aria-label="${T40("Buscar", "Search")}"><div class="m" id="fxpn"></div><div id="fxpl" class="fxp-l"></div>${x.max > 1 ? `<div class="fxp-f">${bt("fxpx", "", T40("Cancelar", "Cancel"))}${bt("fxpok", "", T40("Listo", "Done"), "a")}</div>` : ""}</div>`;
  d.classList.add("on");
  const q = $("#fxpq");
  q.addEventListener("input", () => {
    x.q = q.value;
    fxpR();
  });
  fxpR();
  if (x.items.length > 12 && !("ontouchstart" in window)) q.focus();
}
function fxpR() {
  const x = FXP.o,
    l = $("#fxpl");
  if (!x || !l) return;
  const q = nrmS(x.q).trim(),
    L = x.items.map((it, i) => [it, i]).filter(([it]) => !q || nrmS(it.l + " " + (it.s || "") + " " + (it.g || "")).includes(q));
  let g0 = null,
    h = "";
  L.forEach(([it, i]) => {
    if (it.g && it.g !== g0) {
      g0 = it.g;
      h += `<div class="fxp-g">${esc(it.g)}</div>`;
    }
    const on = x.sel.includes(String(it.v));
    h += `<button class="fxp-i${on ? " on" : ""}" data-a="fxpt" data-v="${i}"${it.off && !on ? " disabled" : ""}><span><b${it.nt ? ' translate="no"' : ""}>${esc(it.l)}</b>${it.s ? `<small${it.ns ? ' translate="no"' : ""}>${esc(it.s)}</small>` : ""}</span><i>${on ? "✓" : ""}</i></button>`;
  });
  l.innerHTML = h || `<div class="m">${T40("Nada coincide con tu búsqueda.", "Nothing matches your search.")}</div>`;
  const n = $("#fxpn");
  // La palabra va en su propio nodo para que se traduzca sola
  if (n) n.innerHTML = (x.max > 1 ? x.sel.length + (isFinite(x.max) ? "/" + x.max : "") + " · " : "") + L.length + ` <span>${L.length == 1 ? T40("opción", "option") : T40("opciones", "options")}</span>`;
}
function fxpCierra() {
  const d = $("#fxp");
  if (d) {
    d.classList.remove("on");
    d.innerHTML = "";
  }
  FXP.o = null;
}
ACT["fxpx"] = () => fxpCierra();
ACT["fxpt"] = (v) => {
  const x = FXP.o;
  if (!x) return;
  const it = x.items[+v];
  if (!it) return;
  const k = String(it.v),
    j = x.sel.indexOf(k);
  if (x.max <= 1) {
    x.sel = [k];
    const f = x.ok;
    fxpCierra();
    return f && f([k]);
  }
  if (j >= 0) x.sel.splice(j, 1);
  else if (x.sel.length < x.max) x.sel.push(k);
  else return toast(L37(`Hasta ${x.max}`, `Up to ${x.max}`));
  fxpR();
};
ACT["fxpok"] = () => {
  const x = FXP.o;
  if (!x) return;
  if (x.sel.length < x.min) return toast(L37(`Elige al menos ${x.min}`, `Pick at least ${x.min}`));
  const f = x.ok,
    s = x.sel.slice();
  fxpCierra();
  return f && f(s);
};
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape" && FXP.o) fxpCierra();
});

// ---------- Temas de la compañía: botón con buscador y lista alfabética ----------
(() => {
  if (!DX.tm.includes("Política")) {
    const g = TXTM.find((x) => x[0] == "Política");
    if (g) g[1].push("Política");
    else TXTM.push(["Política", ["Política"]]);
    DX.tm.push("Política");
  }
  if (typeof POL41 != "undefined" && !POL41.includes("Política")) POL41.push("Política");
})();
const tmGrupo = (t) => (TXTM.find((g) => g[1].includes(t)) || [""])[0];
enfR = function () {
  const e = $("#enf");
  if (!e) return;
  const m = +($("#nmed") || { value: 0 }).value,
    gl = sp(MD[m < 0 ? 0 : m][5]).slice().sort((a, b) => a.localeCompare(b, "es"));
  PVE.g = PVE.g.filter((g) => gl.includes(g));
  PVE.tm = (PVE.tm || []).filter((x) => x);
  e.innerHTML = `<label class="m">${T40("Géneros", "Genres")} (${PVE.g.length}/3)</label><div class="chips">${gl.map((g) => `<button class="ch${PVE.g.includes(g) ? " on" : ""}" data-a="eg" data-v="${esc(g)}">${esc(g)}</button>`).join("")}</div><label class="m">${T40("Temas", "Themes")} (${PVE.tm.length}/3)</label><div class="chips">${PVE.tm.map((t) => `<button class="ch on" data-a="etx" data-v="${esc(t)}">${esc(t)} ✕</button>`).join("")}<button class="b" data-a="etp">${ic("buscar")} ${PVE.tm.length ? T40("Cambiar temas", "Change themes") : T40("Elegir temas", "Choose themes")}</button></div>`;
};
enfT = function () {};
ACT["etx"] = (v) => {
  PVE.tm = PVE.tm.filter((x) => x != v);
  enfR();
};
ACT["etp"] = () =>
  fxPick({
    t: T40("Temas de la compañía", "Company themes"),
    d: T40("Hasta 3. Ordenados alfabéticamente por grupo; escribe para buscar.", "Up to 3. Sorted alphabetically by group; type to search."),
    items: uniq(DX.tm).map((t) => ({ v: t, l: t, g: tmGrupo(t) })),
    sel: PVE.tm,
    max: 3,
    ok: (s) => {
      PVE.tm = s;
      enfR();
    },
  });

// ---------- Formato de sala: múltiple formato ----------
FMT41.push(["Múltiple formato", "Multiple formats", 2010, 0.18, 0.16]);

// ---------- Arquetipos de personajes: más arquetipos, entre ellos el antivillano ----------
[
  ["Antivillano", "Antivillana", "Antivillain", "Persigue un fin noble por medios crueles: el público lo entiende aunque no lo apruebe.", "Pursues a noble goal by cruel means: the audience understands even if it doesn't approve."],
  ["Mártir", "Mártir", "Martyr", "Se sacrifica por una causa o por los demás.", "Sacrifices themself for a cause or for others."],
  ["Vengador", "Vengadora", "Avenger", "Vive para saldar una cuenta pendiente.", "Lives to settle an old score."],
  ["Traidor", "Traidora", "Traitor", "Cambia de bando en el peor momento.", "Switches sides at the worst moment."],
  ["Elegido", "Elegida", "Chosen one", "Carga con un destino que no pidió.", "Carries a destiny they never asked for."],
  ["Seductor", "Seductora", "Seducer", "Usa el encanto como arma y como escudo.", "Uses charm as both weapon and shield."],
  ["Tirano", "Tirana", "Tyrant", "Gobierna con miedo y no tolera rivales.", "Rules through fear and tolerates no rivals."],
  ["Guerrero", "Guerrera", "Warrior", "Resuelve con valor y disciplina lo que otros no se atreven.", "Solves with courage and discipline what others won't dare."],
  ["Pícaro", "Pícara", "Rogue", "Sobrevive con ingenio, trampas y carisma.", "Survives on wit, tricks and charisma."],
  ["Redimido", "Redimida", "Redeemed", "Fue el problema y ahora busca enmendarlo.", "Was the problem and now seeks to make amends."],
  ["Profeta", "Profetisa", "Prophet", "Ve lo que viene y nadie le cree.", "Sees what's coming and no one believes them."],
  ["Investigador", "Investigadora", "Investigator", "No descansa hasta descubrir la verdad.", "Won't rest until the truth comes out."],
  ["Monstruo", "Monstruo", "Monster", "Encarna el miedo; a veces es más víctima que verdugo.", "Embodies fear; sometimes more victim than villain."],
  ["Doble", "Doble", "Double", "Es el gemelo, el impostor o el reflejo del protagonista.", "The twin, the impostor or the lead's reflection."],
  ["Bufón trágico", "Bufona trágica", "Sad clown", "Hace reír mientras se rompe por dentro.", "Makes people laugh while breaking inside."],
  ["Mecenas", "Mecenas", "Patron", "Financia los sueños de otros a cambio de algo.", "Funds other people's dreams in exchange for something."],
].forEach(([m, f, en, d, de]) => {
  if (ARQ.includes(m)) return;
  ARQ.push(m);
  ARQF.push(f);
  ARQD[m] = d;
  E40L([
    [m, en],
    [f, en],
    [d, de],
  ]);
});

// ---------- Talentos fuera de su clasificación: sí trabajan, cobran más y rinden menos ----------
V37.mods.push((P, add) => {
  if (P.age == null) return;
  const pos = aclPos(P.age);
  let g = 0;
  crewIds(P).forEach((i) => {
    const t = S.tl[i];
    if (!t || t.you || t.ex || t.bc) return;
    const cla = t.cla == null ? 7 : t.cla;
    g += Math.max(0, pos - cla);
  });
  if (g) add(-Math.min(6, g * 0.8), -Math.min(3, g * 0.4), L37("talentos fuera de su clasificación", "talent outside their comfort rating"));
});

// ---------- Crossover: un botón que abre la lista completa, sin límite de franquicias ----------
function xoOpts40() {
  const own = frList().filter((f) => f != W.fid && frPs(f).some((p) => p.st >= 3)),
    of = (f) => W.fid != null && xoEsOf(W.fid, f),
    L = own
      .filter(of)
      .map((f) => ({ v: "f" + f, l: frG(f).n, nt: 1, s: T40("Oficial · entra en el canon de ambas", "Official · joins both canons"), g: T40("Crossovers oficiales", "Official crossovers") }))
      .concat(own.filter((f) => !of(f)).map((f) => ({ v: "f" + f, l: frG(f).n, nt: 1, s: T40("No oficial · no entra en su canon", "Unofficial · stays out of its canon"), g: T40("Tus franquicias", "Your franchises") })));
  rvVivos().forEach((i) => (S.rv[i].hits || []).forEach((h) => !S.rv[i].ind && L.push({ v: "r" + i + "|" + encodeURIComponent(h), l: h, nt: 1, s: S.rv[i].n + " · " + L37("licencia", "license"), g: T40("Franquicias de rivales (licencia)", "Rival franchises (license)") })));
  return L;
}
xo40H = function () {
  const O = xoOpts40();
  if (!O.length) return "";
  W.xo40 = (W.xo40 || []).filter((k) => O.some((o) => o.v == k));
  const n = W.xo40.length;
  return `<div class="c sub fx-blk"><div class="k"><b>${E40("Crossover con otras franquicias", "Crossover with other franchises")}</b><span class="m">${n || ""}</span></div>${n ? `<div class="chips">${W.xo40.map((k) => `<button class="ch on" data-a="wxo" data-v="${esc(k)}" translate="no">${esc((O.find((o) => o.v == k) || { l: k }).l)} ✕</button>`).join("")}</div>` : `<div class="m">${T40("Sin crossover.", "No crossover.")}</div>`}<button class="b" data-a="xo4p">${ic("franquicia")} ${T40("Elegir franquicias", "Choose franchises")} (${O.length})</button><div class="m">${L37(
    "Sin límite de franquicias: cada una suma público y expectativa; las de rivales cuestan una licencia y desde 4 la crítica teme que sea demasiado. Solo los crossovers oficiales, que se eligen dentro de cada franquicia, ponen la obra en el canon de ambas.",
    "No limit on franchises: each adds audience and hype; rivals' ones cost a license and from 4 on critics fear it's too much. Only official crossovers, chosen inside each franchise, put the work in both canons.",
  )}</div></div>`;
};
ACT["xo4p"] = () =>
  fxPick({
    t: T40("Crossover", "Crossover"),
    d: T40("Elige todas las franquicias que quieras cruzar con tu obra.", "Pick as many franchises as you want to cross over with your work."),
    items: xoOpts40(),
    sel: W.xo40 || [],
    max: Infinity,
    ok: (s) => {
      W.xo40 = s;
      return wz();
    },
  });

// ---------- Encargar una obra a otro estudio: lista desplegable y encargo automático o detallado ----------
let ENCS = null;
encargoH = function () {
  const y = yr(),
    M = MD.map((m, k) => k).filter((k) => y >= MD[k][2]),
    L = rvVivos().filter((i) => !S.rv[i].own);
  if (!L.length) return "";
  if (ENCM40 < 0 || !M.includes(ENCM40)) ENCM40 = M[0];
  if (ENCS != null && !L.includes(ENCS)) ENCS = null;
  const r = ENCS != null ? S.rv[ENCS] : null,
    fu = r ? (r.sp[ENCM40] | 0) >= 2 : 0;
  return `<div class="c"><div class="k"><h3 style="margin:0">${ic("obras")} ${T40("Encargar una obra a otro estudio", "Commission a work from another studio")}</h3>${bi("encargos")}</div><div class="m">${L37(
    "Produce con su equipo, cobra un 15 % y no ocupa tu sede. Con ★ es su fuerte (+2 de crítica); fuera de su fuerte sale peor (−4 de crítica y −2 de público).",
    "They produce it with their team, charge 15% and it doesn't take up your HQ. ★ marks their strength (+2 critics); outside it the work comes out worse (−4 critics and −2 audience).",
  )}</div><label class="m">${T40("Medio", "Medium")}</label><div class="chips">${M.map((k) => chx("encm", k, MD[k][0], ENCM40 == k)).join("")}</div><label class="m">${T40("Estudio", "Studio")}</label><button class="b sel-b" data-a="encsp">${r ? `<b>${esc(r.n)}</b>${fu ? " ★" : ""}` : T40("Elegir estudio…", "Choose studio…")} <span class="m">(${L.length})</span></button>${
    r
      ? `<div class="bts" style="margin-top:8px">${bt("enca", ENCS + "|" + ENCM40, ic("dado") + " " + T40("Encargo automático", "Automatic commission"), "a")}${bt("enc", ENCS + "|" + ENCM40, ic("obras") + " " + T40("Encargo detallado", "Detailed commission"))}</div><div class="m">${L37("Automático: el estudio decide todo y arranca ya. Detallado: abres el creador de ideas y diseñas la obra; ellos la producen.", "Automatic: the studio decides everything and starts now. Detailed: you open the idea creator and design the work; they produce it.")}</div>`
      : ""
  }</div>`;
};
ACT["encm"] = (v) => {
  ENCM40 = +v;
  return pg();
};
ACT["encsp"] = () => {
  const y = yr();
  fxPick({
    t: T40("Elegir estudio", "Choose studio"),
    d: L37(`Para ${MD[ENCM40][0].toLowerCase()}. ★ = su fuerte.`, `For ${MD[ENCM40][0].toLowerCase()}. ★ = their strength.`),
    items: rvVivos()
      .filter((i) => !S.rv[i].own)
      .map((i) => {
        const r = S.rv[i],
          fu = (r.sp[ENCM40] | 0) >= 2;
        return { v: i, l: r.n + (fu ? " ★" : ""), s: MD.map((m, k) => k).filter((k) => y >= MD[k][2] && (r.sp[k] | 0) >= 2).map((k) => MD[k][0]).join(", ") || T40("sin especialidad", "no specialty"), g: fu ? T40("Especialistas en este medio", "Specialists in this medium") : T40("Otros estudios", "Other studios") };
      }),
    sel: ENCS != null ? [ENCS] : [],
    ok: (s) => {
      ENCS = +s[0];
      pg();
    },
  });
};
ACT["enca"] = (v) => {
  ACT["enc"](v);
  if (!W || W.enc == null) return;
  W.nm = W.nm || ttlR();
  const r = producir();
  if (typeof r == "string") {
    cx();
    W = null;
    return toast(r);
  }
  cx();
  sonar("ok");
  nws(L37(`${S.rv[W.enc != null ? W.enc : +String(v).split("|")[0]].n} produce por encargo tuyo una obra nueva.`, `A rival studio produces a new work on commission for you.`));
  toast(T40("Encargo hecho", "Commission placed"));
  return pg();
};

// ---------- Distribución exclusiva: también la propones tú a cualquier rival ----------
let DEXR = null,
  DEXP = 15;
dexH = function () {
  const d = S.dex,
    y = yr();
  if (d && d.h > S.t)
    return `<div class="c"><h3 style="margin:0">${ic("cine")} ${T40("Distribución exclusiva", "Exclusive distribution")}</h3><div class="m">${L37(`${esc(S.rv[d.r].n)} distribuye tus obras de ${MD[d.m][0].toLowerCase()} hasta ${fD(semIni(d.h))} y se queda el ${Math.round((d.p || 0.15) * 100)} % de la taquilla.`, `${esc(S.rv[d.r].n)} distributes your ${MD[d.m][0].toLowerCase()} works until ${fD(semIni(d.h))} and keeps ${Math.round((d.p || 0.15) * 100)}% of the box office.`)}</div></div>`;
  const ms = MD.map((m, k) => k).filter((k) => y >= MD[k][2]),
    L = rvVivos().filter((i) => !S.rv[i].own);
  if (!L.length) return "";
  const r0 = L[0],
    r = DEXR != null && L.includes(DEXR) ? DEXR : null;
  return `<div class="c"><div class="k"><h3 style="margin:0">${ic("cine")} ${T40("Distribución exclusiva", "Exclusive distribution")}</h3>${bi("exclusiva")}</div><div class="c sub"><b>${T40("Oferta recibida", "Offer received")}</b><div class="m">${L37(`${esc(S.rv[r0].n)} ofrece distribuir todas tus obras de un medio por 3 años: te adelanta dinero hoy y se queda el 15 % de la taquilla.`, `${esc(S.rv[r0].n)} offers to distribute all your works in one medium for 3 years: it advances money today and keeps 15% of the box office.`)}</div><div class="chips">${ms.map((m) => bt("dex", r0 + "|" + m, MD[m][0] + " · +" + fm(dexAdel(m)))).join("")}</div></div><div class="c sub"><b>${T40("Proponer una exclusiva", "Propose an exclusive")}</b><div class="m">${L37("Elige el estudio, el medio y la parte que le cedes: a más parte, más adelanto y más fácil que acepte. Su respuesta depende de tu prestigio y de su caja.", "Choose the studio, medium and share you give: the bigger the share, the bigger the advance and the likelier they accept. Their answer depends on your prestige and their cash.")}</div><button class="b sel-b" data-a="dexsp">${r != null ? `<b>${esc(S.rv[r].n)}</b>` : T40("Elegir estudio…", "Choose studio…")} <span class="m">(${L.length})</span></button>${
    r != null
      ? `<label class="m">${T40("Parte que cedes", "Share you give")}</label><div class="chips">${[10, 15, 20, 25].map((p) => chx("dexpp", p, p + " %", DEXP == p)).join("")}</div><div class="chips">${ms.map((m) => bt("dexp", r + "|" + m, MD[m][0] + " · " + fm(dexAdel(m) * (DEXP / 15)) + " · " + Math.round(dexProb(r) * 100) + " %")).join("")}</div><div class="m">${T40("El porcentaje final es la probabilidad de que acepte.", "The last figure is the chance they accept.")}</div>`
      : ""
  }</div></div>`;
};
const dexProb = (r) => cl(0.25 + (S.pop || 0) / 250 + (DEXP - 15) * 0.025 + (S.rv[r].cash > 0 ? 0.1 : -0.15), 0.05, 0.95);
ACT["dexsp"] = () =>
  fxPick({
    t: T40("Proponer exclusiva a…", "Propose an exclusive to…"),
    items: rvVivos()
      .filter((i) => !S.rv[i].own)
      .map((i) => ({ v: i, l: S.rv[i].n, s: T40("caja", "cash") + " " + fm(S.rv[i].cash) })),
    sel: DEXR != null ? [DEXR] : [],
    ok: (s) => {
      DEXR = +s[0];
      pg();
    },
  });
ACT["dexpp"] = (v) => {
  DEXP = +v;
  return pg();
};
ACT["dexp"] = (v) => {
  const [r, m] = String(v).split("|").map(Number);
  if (!S.rv[r] || (S.dex && S.dex.h > S.t)) return;
  S.dexT = S.dexT || {};
  if ((S.dexT[r] | 0) > S.t) return toast(T40("Ese estudio ya te respondió hace poco: espera unas semanas.", "That studio answered recently: wait a few weeks."));
  S.dexT[r] = S.t + 8;
  if (R() > dexProb(r)) {
    nws(L37(`${S.rv[r].n} rechaza tu propuesta de exclusiva.`, `${S.rv[r].n} turns down your exclusive proposal.`));
    toast(T40("Rechazada", "Declined"));
    return pg();
  }
  const a = Math.round(dexAdel(m) * (DEXP / 15));
  S.dex = { r, m, h: S.t + 156, p: DEXP / 100 };
  gana("licencias", a);
  S.rv[r].cash -= a;
  bit(L37(`Firmas distribución exclusiva con ${S.rv[r].n}.`, `You sign exclusive distribution with ${S.rv[r].n}.`));
  nws(L37(`${S.rv[r].n} acepta tu propuesta: distribuirá tus obras de ${MD[m][0].toLowerCase()} por 3 años y te adelanta ${fm(a)}.`, `${S.rv[r].n} accepts: it will distribute your ${MD[m][0].toLowerCase()} works for 3 years and advances ${fm(a)}.`));
  return pg();
};
dexCobro = function (P, net) {
  const d = S.dex;
  if (!d || d.h <= S.t || d.m != P.m || !(net > 0)) return;
  const p = net * (d.p || 0.15);
  gasta("distribucion", p);
  if (S.rv[d.r]) S.rv[d.r].cash += p;
};
E40L([
  ["de 17 en adelante", "17 and over"],
  ["Adolescentes mayores (17+): lenguaje crudo, violencia intensa y amor candente.", "Older teens (17+): crude language, intense violence and steamy romance."],
  ["Para nuevos adultos: lenguaje ofensivo, violencia gráfica y amor candente, siempre sugerido.", "For young adults: offensive language, graphic violence and steamy romance, always implied."],
  ["Solo para mayores: lenguaje, violencia y amor explícitos (en pantalla, siempre sugerido).", "Adults only: explicit language, violence and romance (on screen, always implied)."],
  ["Drama de despacho presidencial", "Presidential office drama"],
  ["Campaña electoral", "Election campaign"],
  ["Mooré", "Mooré"],
  ["Múltiple formato", "Multiple formats"],
]);
