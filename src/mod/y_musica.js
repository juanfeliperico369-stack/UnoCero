// ===== Música de fondo: piezas tranquilas y elegantes (piano suave, cuerdas, campanas y sala con reverberación) =====
const MUXP = [
  { n: "Salón", en: "Salon", d: ["Piano de salón con cuerdas suaves.", "Parlour piano with soft strings."], bpm: 72, compas: 4, prog: [[0, 4, 7, 11], [9, 12, 16, 19], [5, 9, 12, 16], [7, 11, 14, 17]], raiz: 60, piano: 1, pad: 1, bell: 0 },
  { n: "Vals de gala", en: "Gala waltz", d: ["Vals lento para las noches de estreno.", "Slow waltz for premiere nights."], bpm: 84, compas: 3, prog: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7], [9, 12, 16], [2, 5, 9], [7, 11, 14], [0, 4, 7]], raiz: 57, piano: 1, pad: 1, bell: 0 },
  { n: "Nocturno", en: "Nocturne", d: ["Piano nocturno, con acordes de séptima.", "Night piano with seventh chords."], bpm: 62, compas: 4, prog: [[9, 12, 16, 19], [5, 9, 12, 16], [0, 4, 7, 11], [7, 11, 14, 17]], raiz: 55, piano: 1, pad: 1, bell: 0 },
  { n: "Horizonte", en: "Horizon", d: ["Ambiente sereno de campanas y cuerdas.", "Serene ambience of bells and strings."], bpm: 56, compas: 4, prog: [[0, 7, 11, 14], [5, 9, 12, 16], [9, 12, 16, 19], [7, 11, 14, 19]], raiz: 52, piano: 0, pad: 1, bell: 1 },
];
const MUX = { on: 0, ctx: null, out: null, h: null, t: 0, i: 0, p: -1, cambio: 0, sd: 7 };
const muxPiezaEra = () => {
  const y = S ? yr() : 1950;
  return y < 1880 ? 0 : y < 1950 ? 1 : y < 2000 ? 2 : 3;
};
const muxVol = () => (CFG.musv == null ? 0.45 : CFG.musv);
function muxRnd() {
  MUX.sd = (MUX.sd * 16807) % 2147483647;
  return MUX.sd / 2147483647;
}
function muxSala(c) {
  const n = c.sampleRate * 3.2,
    b = c.createBuffer(2, n, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6);
  }
  const v = c.createConvolver();
  v.buffer = b;
  return v;
}
function muxArma() {
  AU = AU || new (window.AudioContext || window.webkitAudioContext)();
  const c = AU;
  if (MUX.ctx === c && MUX.out) return;
  const master = c.createGain(),
    comp = c.createDynamicsCompressor(),
    seco = c.createGain(),
    humedo = c.createGain(),
    sala = muxSala(c);
  master.gain.value = 0.0001;
  seco.gain.value = 0.75;
  humedo.gain.value = 0.42;
  seco.connect(comp);
  sala.connect(humedo);
  humedo.connect(comp);
  comp.connect(master);
  master.connect(c.destination);
  const bus = c.createGain();
  bus.connect(seco);
  bus.connect(sala);
  MUX.ctx = c;
  MUX.out = bus;
  MUX.master = master;
}
const muxF = (m) => 440 * Math.pow(2, (m - 69) / 12);
// Piano suave: fundamental con dos armónicos y un ataque redondo
function muxPiano(m, t, dur, v) {
  const c = MUX.ctx,
    e = c.createGain();
  e.gain.setValueAtTime(0.0001, t);
  e.gain.exponentialRampToValueAtTime(v, t + 0.012);
  e.gain.exponentialRampToValueAtTime(v * 0.35, t + 0.4);
  e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2400;
  e.connect(lp);
  lp.connect(MUX.out);
  [
    [1, 1, "sine"],
    [2, 0.28, "sine"],
    [3, 0.08, "triangle"],
  ].forEach(([k, g, ty]) => {
    const o = c.createOscillator(),
      og = c.createGain();
    o.type = ty;
    o.frequency.value = muxF(m) * k;
    og.gain.value = g;
    o.connect(og);
    og.connect(e);
    o.start(t);
    o.stop(t + dur + 0.05);
  });
}
// Cuerdas: dos osciladores apenas desafinados, filtro cálido y entrada lenta
function muxPad(L, t, dur, v) {
  const c = MUX.ctx,
    e = c.createGain(),
    lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  e.gain.setValueAtTime(0.0001, t);
  e.gain.linearRampToValueAtTime(v, t + Math.min(1.6, dur * 0.4));
  e.gain.linearRampToValueAtTime(v * 0.8, t + dur * 0.7);
  e.gain.linearRampToValueAtTime(0.0001, t + dur + 0.6);
  e.connect(lp);
  lp.connect(MUX.out);
  L.forEach((m) =>
    [-5, 5].forEach((dt) => {
      const o = c.createOscillator();
      o.type = "triangle";
      o.frequency.value = muxF(m);
      o.detune.value = dt;
      o.connect(e);
      o.start(t);
      o.stop(t + dur + 0.7);
    }),
  );
}
function muxBell(m, t, v) {
  const c = MUX.ctx,
    e = c.createGain(),
    o = c.createOscillator(),
    o2 = c.createOscillator(),
    g2 = c.createGain();
  o.type = "sine";
  o.frequency.value = muxF(m);
  o2.type = "sine";
  o2.frequency.value = muxF(m) * 2.76;
  g2.gain.value = 0.18;
  e.gain.setValueAtTime(0.0001, t);
  e.gain.exponentialRampToValueAtTime(v, t + 0.01);
  e.gain.exponentialRampToValueAtTime(0.0001, t + 3.5);
  o.connect(e);
  o2.connect(g2);
  g2.connect(e);
  e.connect(MUX.out);
  o.start(t);
  o2.start(t);
  o.stop(t + 3.6);
  o2.stop(t + 3.6);
}
// Un paso de la pieza: bajo y acorde al empezar el compás, arpegio y una melodía que respira
function muxPaso(P, t, i) {
  const pc = P.compas * 2,
    k = Math.floor(i / pc) % P.prog.length,
    A = P.prog[k],
    b = i % pc,
    dur = 60 / P.bpm / 2,
    r = P.raiz;
  if (b == 0) {
    if (P.pad) muxPad(A.map((x) => r + x), t, dur * pc, 0.05);
    if (P.piano) muxPiano(r - 12 + A[0], t, dur * pc * 0.9, 0.16);
    if (P.bell && muxRnd() < 0.6) muxBell(r + 12 + A[Math.floor(muxRnd() * A.length)], t, 0.05);
  }
  if (P.piano) {
    if (P.compas == 3) {
      if (b == 2 || b == 4) A.slice(1, 3).forEach((x) => muxPiano(r + x, t, dur * 1.6, 0.06));
    } else if (b % 2 == 1 || muxRnd() < 0.3) muxPiano(r + A[(b >> 1) % A.length] + (b >= 4 ? 12 : 0), t, dur * 2.2, 0.07);
  }
  const frase = Math.floor(i / (pc * 2)) % 4,
    canta = frase != 3 && (b == 0 || b == 3 || (b == 5 && muxRnd() < 0.5) || (b == 6 && P.compas == 4 && muxRnd() < 0.4));
  if (canta && (P.piano || P.bell)) {
    const esc = [0, 2, 4, 7, 9, 12, 14, 16],
      raizM = r + 12 + A[0],
      n = b == 0 ? raizM + A[Math.floor(muxRnd() * A.length)] - A[0] : r + 12 + esc[Math.floor(muxRnd() * esc.length)];
    if (P.piano) muxPiano(n + 12, t, dur * 3, 0.085);
    else muxBell(n + 12, t, 0.04);
  }
}
function muxProg() {
  if (!MUX.on || !MUX.ctx) return;
  const c = MUX.ctx;
  if (c.state == "suspended") c.resume().catch(() => {});
  const pi = CFG.musp == null || CFG.musp < 0 ? muxPiezaEra() : CFG.musp | 0;
  if (pi != MUX.p) {
    MUX.p = pi;
    MUX.i = 0;
  }
  const P = MUXP[pi] || MUXP[0],
    dur = 60 / P.bpm / 2;
  if (MUX.t < c.currentTime) MUX.t = c.currentTime + 0.1;
  while (MUX.t < c.currentTime + 0.6) {
    try {
      muxPaso(P, MUX.t, MUX.i);
    } catch (e) {}
    MUX.t += dur;
    MUX.i++;
  }
}
function muxStart() {
  if (!CFG.mus) return;
  try {
    muxArma();
  } catch (e) {
    return;
  }
  const c = MUX.ctx;
  if (c.state == "suspended") c.resume().catch(() => {});
  if (MUX.on) return;
  MUX.on = 1;
  MUX.t = c.currentTime + 0.15;
  MUX.master.gain.cancelScheduledValues(c.currentTime);
  MUX.master.gain.setValueAtTime(Math.max(0.0001, MUX.master.gain.value), c.currentTime);
  MUX.master.gain.linearRampToValueAtTime(0.0001 + muxVol() * 0.55, c.currentTime + 2.5);
  clearInterval(MUX.h);
  MUX.h = setInterval(muxProg, 120);
  muxProg();
}
function muxStop() {
  if (!MUX.on) return;
  MUX.on = 0;
  clearInterval(MUX.h);
  const c = MUX.ctx;
  if (c && MUX.master) {
    MUX.master.gain.cancelScheduledValues(c.currentTime);
    MUX.master.gain.setValueAtTime(MUX.master.gain.value, c.currentTime);
    MUX.master.gain.linearRampToValueAtTime(0.0001, c.currentTime + 0.6);
  }
}
// Reemplaza la música vieja: suena por defecto desde el primer toque, se calla al salir de la app
if (CFG.mus == null) CFG.mus = 1;
musOn = muxStart;
musOff = muxStop;
ACT["cfgm"] = () => {
  CFG.mus = CFG.mus ? 0 : 1;
  cfgSv();
  if (CFG.mus) muxStart();
  else muxStop();
  if (typeof ajM == "function") ajM();
};
ACT["musp"] = (v) => {
  CFG.musp = +v;
  cfgSv();
  MUX.p = -1;
  if (typeof ajM == "function") ajM();
};
function muxVolSet(v) {
  CFG.musv = Math.max(0, Math.min(1, +v / 100));
  cfgSv();
  if (MUX.master && MUX.ctx) MUX.master.gain.setTargetAtTime(0.0001 + muxVol() * 0.55, MUX.ctx.currentTime, 0.2);
}
function muxAjH() {
  const p = CFG.musp == null ? -1 : CFG.musp;
  return `<label class="m">${T40("Música", "Music")}: <b>${Math.round(muxVol() * 100)} %</b></label><input type="range" min="0" max="100" step="5" value="${Math.round(muxVol() * 100)}" oninput="muxVolSet(this.value);this.previousElementSibling.querySelector('b').textContent=this.value+' %'" aria-label="${T40("Volumen de la música", "Music volume")}"><div class="chips">${chx("musp", -1, T40("Según la época", "By era"), p < 0)}${MUXP.map((x, i) => chx("musp", i, LL([x.n, x.en]), p == i)).join("")}</div><div class="m">${esc(LL((MUXP[p < 0 ? muxPiezaEra() : p] || MUXP[0]).d))}</div>`;
}
document.addEventListener(
  "pointerdown",
  () => {
    if (CFG.mus && !MUX.on) muxStart();
    else if (MUX.ctx && MUX.ctx.state == "suspended") MUX.ctx.resume().catch(() => {});
  },
  true,
);
document.addEventListener("visibilitychange", () => {
  if (!MUX.ctx) return;
  if (document.hidden) MUX.ctx.suspend().catch(() => {});
  else if (CFG.mus) MUX.ctx.resume().catch(() => {});
});
E40L(MUXP.map((x) => [x.n, x.en]).concat(MUXP.map((x) => x.d)));
