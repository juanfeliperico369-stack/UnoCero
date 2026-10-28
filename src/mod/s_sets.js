// ===== Sets permanentes: las superproducciones dejan construcciones que se reutilizan, se alquilan y se visitan =====
const SETG = [
  [/Western/, "Pueblo del Salvaje Oeste", "Wild West town"],
  [/Ciencia ficción|Space|Ciberpunk|Cyberpunk/, "Nave espacial a escala real", "Full-scale spaceship"],
  [/Superhéroes/, "Metrópolis de cartón piedra", "Papier-mâché metropolis"],
  [/Fantasía|Mitolog/, "Reino de fantasía", "Fantasy kingdom"],
  [/Bélico/, "Trincheras y búnkeres", "Trenches and bunkers"],
  [/Terror|Gótico/, "Mansión embrujada", "Haunted mansion"],
  [/Musical/, "Calle de Broadway", "Broadway street"],
  [/Catástrofes/, "Ciudad para destruir", "A city built to be destroyed"],
  [/Crimen|Policial|Noir|Gánster/, "Barrio de gánsteres", "Gangster neighborhood"],
  [/Épico/, "Murallas y campo de batalla", "Walls and battlefield"],
];
const SETE = {
  0: ["Valle prehistórico", "Prehistoric valley"],
  1: ["Ciudad de la Antigüedad", "Ancient city"],
  2: ["Foro romano", "Roman forum"],
  3: ["Castillo y aldea medieval", "Medieval castle and village"],
  4: ["Plaza renacentista", "Renaissance square"],
  5: ["Puerto y palacio barroco", "Baroque port and palace"],
  6: ["Calle del siglo XIX", "19th-century street"],
  10: ["Ciudad del futuro", "City of the future"],
  11: ["Ciudad del futuro lejano", "Far-future city"],
};
E40L(SETG.map((x) => [x[1], x[2]]).concat(Object.values(SETE)));
const sets5 = () => (S.set5 = S.set5 || []);
function setNom(P) {
  const g = (P.gn || []).join(" "),
    G = SETG.find((x) => x[0].test(g));
  if (/Aventura/.test(g) && [3, 7].includes(P.ter | 0)) return ["Barco pirata y muelle", "Pirate ship and dock"];
  if (G) return [G[1], G[2]];
  if (P.ep != null && SETE[P.ep]) return SETE[P.ep];
  const t = TER[P.ter | 0] || TER[0];
  return ["Plató de " + t[0].toLowerCase(), "Soundstage: " + t[0]];
}
const setEsc = (P) => P.br || (P.bud || 0) / Math.max(1, TB(P.m));
// Al arrancar una superproducción, sus sets quedan en pie
V37.prod.push((P, W2) => {
  if (S.bot || P.rr || !conRodaje(P.m)) return;
  const k = setEsc(P);
  if (k < 3) return;
  const gran = k >= 6,
    n = setNom(P),
    nom = (P.m == 3 ? T40("Escenografía de repertorio: ", "Repertory scenery: ") : "") + LL(n);
  if (sets5().some((s) => s.n == nom && s.m == P.m)) {
    const s = sets5().find((x) => x.n == nom && x.m == P.m);
    s.val = Math.round(s.val + (P.bud || 0) * 0.05);
    s.cd = 100;
    s.gran = s.gran || (gran ? 1 : 0);
    nws(L37(`El rodaje de «${P.n}» amplía y renueva tu set «${nom}».`, `Production of "${P.n}" expands and renews your "${nom}" set.`));
    return;
  }
  P.set5n = (S.setId5 = (S.setId5 | 0) + 1);
  sets5().push({ id: S.setId5, n: nom, m: P.m, ter: P.ter | 0, gn: (P.gn || []).slice(0, 3), ep: P.ep == null ? 9 : P.ep, y: yr(), val: Math.round((P.bud || 0) * (gran ? 0.12 : 0.08)), gran: gran ? 1 : 0, cd: 100, al: 1, uso: S.t + (P.w || 20), de: P.n });
  let extra = "";
  if (gran) {
    const iS = IX.findIndex((x) => x[0] == "Soundstages"),
      iV = IX.findIndex((x) => x[0] == "Estudio de efectos visuales"),
      fx = /Ciencia ficción|Fantasía|Superhéroes/.test((P.gn || []).join(" ")) && iV >= 0 && yr() >= IX[iV][3] && cnv(iV) < 3,
      i = fx ? iV : iS >= 0 && yr() >= IX[iS][3] && cnv(iS) < 3 ? iS : -1;
    if (i >= 0) {
      S.inf = S.inf || {};
      S.inf[i] = cnv(i) + 1;
      extra = L37(` y sube a nivel ${S.inf[i]} tu construcción «${IX[i][0]}»`, ` and raises your "${IX[i][0]}" facility to level ${S.inf[i]}`);
    }
  }
  nws(L37(`La superproducción «${P.n}» deja en pie el set «${nom}»${extra}: tus próximas obras podrán reutilizarlo.`, `The blockbuster "${P.n}" leaves the "${nom}" set standing${extra}: your next works can reuse it.`));
});
// Qué set le sirve a una obra (terreno, géneros y época)
function setPara(X) {
  if (!X || !conRodaje(X.m)) return null;
  const gn = X.gn || (X.g || []).map((i) => sp(MD[X.m][5])[i]).filter(Boolean),
    ep = X.ep == null ? 9 : X.ep;
  let best = null,
    bs = 1;
  sets5().forEach((s) => {
    if (s.m != X.m || s.cd < 10) return;
    const sc = (s.ter == (X.ter | 0) ? 1 : 0) + (s.gn.some((g) => gn.includes(g)) ? 1 : 0) + (s.ep == ep ? 1 : 0);
    if (sc > bs) {
      bs = sc;
      best = s;
    }
  });
  return best;
}
const setDesc = (s) => (s.gran ? 0.18 : 0.12) * (s.cd < 40 ? 0.5 : 1);
V37.costo.push((W2) => {
  const s = setPara(W2);
  return s ? 1 - setDesc(s) : 1;
});
V37.sem.push((W2) => (setPara(W2) ? -1 : 0));
V37.prod.push((P, W2) => {
  const s = setPara(W2);
  if (!s || S.bot || s.id == P.set5n) return;
  s.uso = S.t + (P.w || 20);
  s.usos = (s.usos | 0) + 1;
  P.set5 = s.n;
});
V37.mods.push((P, add) => {
  if (P.set5) add(0.5, 0, L37("sets ya construidos con detalle", "detailed sets already built"));
});
// Alquiler a rivales, mantenimiento, desgaste y tour para el público
on("mes", () => {
  if (!S || S.pre || !S.set5 || !S.set5.length) return;
  let al = 0,
    ma = 0;
  S.set5.forEach((s) => {
    s.cd = Math.max(0, s.cd - 0.25);
    ma += s.val * 0.0015;
    if (s.al && S.t > (s.uso | 0) && s.cd >= 20) al += s.val * 0.005 * (s.cd / 100) * (rvVivos().length ? 1 : 0);
  });
  if (ma > 0) gasta("infra", Math.round(ma));
  if (al > 0) gana("licencias", Math.round(al));
  if (S.set5.length >= 3 && yr() >= 1964) {
    const tour = sum(S.set5, (s) => s.val * (s.cd / 100)) * 0.0015 * (0.5 + Math.min(1.5, (S.pop || 0) / 50));
    if (tour > 0) gana("parques", Math.round(tour));
    S.tour5 = Math.round(tour);
  }
});
ACT["set5a"] = (v) => {
  const s = sets5().find((x) => x.id == +v);
  if (s) s.al = s.al ? 0 : 1;
  return pg();
};
ACT["set5r"] = (v) => {
  const s = sets5().find((x) => x.id == +v),
    c = s ? Math.round(s.val * 0.3) : 0;
  if (!s || S.cash < c) return toast(T40("Fondos insuficientes", "Insufficient funds"));
  gasta("infra", c);
  s.cd = 100;
  return pg();
};
ACT["set5d"] = (v) => {
  S.set5 = sets5().filter((x) => x.id != +v);
  toast(T40("Set demolido", "Set demolished"));
  return pg();
};
function sets5H() {
  const L = sets5();
  return `<div class="c"><div class="k"><h3 style="margin:0">${ic("edificio")} ${T40("Sets permanentes", "Permanent sets")}</h3></div><div class="m">${T40("Las superproducciones (3 o más veces el presupuesto típico) dejan sus sets en pie. Abaratan y aceleran las obras que encajan por terreno, género o época; se alquilan a los rivales cuando no los usas y, con tres o más, abren un tour para el público.", "Blockbusters (3 or more times the typical budget) leave their sets standing. They make matching works (by terrain, genre or era) cheaper and faster; rivals rent them when you're not using them and, with three or more, they open a studio tour.")}</div>${
    L.length
      ? L.map(
          (s) =>
            `<div class="c sub"><div class="k"><b>${esc(s.n)}${s.gran ? " ★" : ""}</b><span class="m">${MD[s.m][0]} · ${s.y}</span></div><div class="m">${L37(`De «${esc(s.de || "")}» · valor ${fm(s.val)} · estado ${Math.round(s.cd)} % · usos: ${s.usos | 0} · −${Math.round(setDesc(s) * 100)} % de costo`, `From "${esc(s.de || "")}" · value ${fm(s.val)} · condition ${Math.round(s.cd)}% · uses: ${s.usos | 0} · −${Math.round(setDesc(s) * 100)}% cost`)}</div><div class="bts">${bt("set5a", s.id, s.al ? T40("Alquilar a rivales: sí", "Rent to rivals: yes") : T40("Alquilar a rivales: no", "Rent to rivals: no"))}${s.cd < 70 ? bt("set5r", s.id, T40("Restaurar", "Restore") + " · " + fm(Math.round(s.val * 0.3))) : ""}${bt("set5d", s.id, T40("Demoler", "Demolish"))}</div></div>`,
        ).join("") + (S.tour5 ? `<div class="fila"><span>${T40("Tour por los sets (este mes)", "Studio tour (this month)")}</span><b>${fm(S.tour5)}</b></div>` : "")
      : `<div class="m">${T40("Todavía no tienes sets permanentes.", "You don't have permanent sets yet.")}</div>`
  }</div>`;
}
const vInfS = vInf;
vInf = function () {
  return vInfS.apply(this, arguments) + sets5H();
};
// En el creador: aviso del set que se puede reutilizar y de si la obra dejará uno nuevo
const rodHS = rodH;
rodH = function () {
  const h = rodHS.apply(this, arguments),
    s = setPara(Object.assign({}, W, { gn: wGn() })),
    k = BRk(W.bv);
  return (
    h +
    (s ? `<div class="m" style="color:var(--a)">${ic("edificio")} ${L37(`Reutilizas tu set «${esc(s.n)}»: −${Math.round(setDesc(s) * 100)} % de costo y una semana menos.`, `You reuse your "${esc(s.n)}" set: −${Math.round(setDesc(s) * 100)}% cost and one week less.`)}</div>` : "") +
    (k >= 3 ? `<div class="m">${ic("estrella")} ${k >= 6 ? T40("Superproducción: dejará un gran set permanente y mejorará tus construcciones.", "Blockbuster: it will leave a large permanent set and upgrade your facilities.") : T40("Gran presupuesto: dejará un set permanente que podrás reutilizar.", "Big budget: it will leave a permanent set you can reuse.")}</div>` : "")
  );
};
