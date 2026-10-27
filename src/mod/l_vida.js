// ===== Línea de vida de los talentos y discurso de aceptación en la ceremonia en vivo =====
function vidaH(t) {
  const y = yr(),
    nac = y - (t.age | 0),
    ps = S.pj
      .filter((p) => p.y && (Object.values(p.crew || {}).includes(t.id) || (p.cast || []).some((c) => c.t == t.id)))
      .sort((a, b) => a.y - b.y),
    H = [[nac, T40("Nace", "Born") + (t.na != null && CY[t.na] ? " · " + CY[t.na][0] : "")]];
  if (ps.length) H.push([ps[0].y, L37(`Primera obra contigo: «${ps[0].n}»`, `First work with you: «${ps[0].n}»`)]);
  const best = ps.slice().sort((a, b) => (b.c || 0) - (a.c || 0))[0];
  if (best && best !== ps[0]) H.push([best.y, L37(`Su mejor obra contigo: «${best.n}» (${Math.round(best.c || 0)})`, `Best work with you: «${best.n}» (${Math.round(best.c || 0)})`)]);
  ps.filter((p) => (p.aw || []).some((z) => /GANADOR/.test(z))).slice(0, 4).forEach((p) => H.push([p.y, L37(`Premio con «${p.n}»`, `Award with «${p.n}»`)]));
  if (t.gw) H.push([y, L37(`${t.gw} premio${t.gw > 1 ? "s" : ""} en toda su carrera`, `${t.gw} award${t.gw > 1 ? "s" : ""} in their whole career`)]);
  H.push([y, t.ret ? T40("Retirado", "Retired") : L37(`Hoy: ${t.age} años`, `Today: ${t.age} years old`)]);
  H.sort((a, b) => a[0] - b[0]);
  return `<div class="c"><h3 style="margin:0 0 8px">${ic("reloj")} ${T40("Línea de vida", "Lifeline")}</h3><div class="crono">${H.map((h) => `<div><b>${h[0]}</b><span>${esc(h[1])}</span></div>`).join("")}</div></div>`;
}
const tpMV = ACT["tp"];
ACT["tp"] = (v) => {
  const r = tpMV(v),
    t = S.tl[+v],
    h = document.querySelector("#md .hoja");
  if (t && h && !h.querySelector(".vida5")) {
    const d = document.createElement("div");
    d.className = "vida5";
    d.innerHTML = vidaH(t);
    h.appendChild(d);
  }
  return r;
};
// Discurso de aceptación cuando ganas en la ceremonia en vivo
let CEV = null;
const ceV = ce;
ce = function () {
  CEV = CE[0] || null;
  return ceV.apply(this, arguments);
};
const rvV = ACT["rv"];
ACT["rv"] = () => {
  const r = rvV();
  const c = CEV;
  if (c && c.ph == 2 && c.l.some((x) => x.u && x.w) && !c.disc) {
    const b = document.querySelector("#md .bts");
    if (b)
      b.insertAdjacentHTML(
        "beforebegin",
        `<div class="c sub" id="disc5"><b>${T40("Tu discurso", "Your speech")}</b><div class="chips">${bt("disc", "e", T40("Agradecer al equipo", "Thank the team"))}${bt("disc", "c", T40("Mensaje comprometido", "Make a statement"))}${bt("disc", "h", T40("Hacer reír a la sala", "Make the room laugh"))}${bt("disc", "b", T40("Breve y elegante", "Short and classy"))}</div></div>`,
      );
  }
  return r;
};
ACT["disc"] = (v) => {
  const c = CEV;
  if (!c || c.disc) return;
  c.disc = v;
  let txt;
  if (v == "e") {
    S.tl.forEach((t) => !t.ret && !t.you && t.mo != null && (t.mo = cl(t.mo + 2)));
    txt = L37("Agradeces a todo tu equipo: la moral del estudio sube.", "You thank your whole team: studio morale rises.");
  } else if (v == "c") {
    const ok = RU() < 0.6;
    S.pop = cl((S.pop || 0) + (ok ? 3 : -2));
    txt = ok ? L37("Tu mensaje se vuelve titular en todo el mundo: +3 de prestigio.", "Your message makes headlines worldwide: +3 prestige.") : L37("Tu mensaje divide al público: −2 de prestigio.", "Your message divides the public: −2 prestige.");
  } else if (v == "h") {
    S.fans = Math.round((S.fans || 0) * 1.03);
    txt = L37("La sala estalla de risa y el video se comparte por todas partes: +3 % de fans.", "The room bursts out laughing and the clip spreads everywhere: +3% fans.");
  } else {
    S.pop = cl((S.pop || 0) + 1);
    txt = L37("Un discurso breve y elegante: la crítica lo aplaude.", "A short, classy speech: critics applaud.");
  }
  nws(txt);
  const d = $("#disc5");
  if (d) d.innerHTML = `<div class="m">${esc(txt)}</div>`;
};
