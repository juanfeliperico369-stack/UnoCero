// ===== Avatar con más detalle, firma de artistas musicales, minijuegos ampliados y tema minimalista =====
// ---------- Avatar: labios, cicatrices, tatuajes, piercings, cuello e iluminación del retrato ----------
Object.assign(AVO, {
  lb: ["Color de labios", ["Natural", "Rosa", "Coral", "Rojo intenso", "Vino", "Nude", "Morado"]],
  ci: ["Cicatriz", ["Sin cicatriz", "En la ceja", "En la mejilla", "En el labio", "Cruzando el ojo"]],
  ta: ["Tatuaje", ["Sin tatuaje", "Lágrima", "Estrella", "Líneas tribales", "Flor en el cuello", "Código de barras"]],
  pi: ["Piercing", ["Sin piercing", "Aro en la nariz", "Septum", "Ceja", "Labio"]],
  cu: ["Cuello", ["Nada", "Collar de perlas", "Cadena", "Bufanda", "Pajarita", "Pañuelo", "Gargantilla"]],
  il: ["Iluminación", ["Suave de estudio", "Plana", "Dramática", "Neón", "Hora dorada", "Clásica en blanco y negro"]],
  mi: ["Mirada", ["Al frente", "De lado", "Hacia arriba", "Entrecerrada"]],
});
AVGR[0][1].push("lb", "ci", "ta", "pi", "mi");
AVGR[2][1].push("cu");
AVGR[3][1].push("il");
E40L([
  ["Color de labios", "Lip color"], ["Rosa", "Pink"], ["Coral", "Coral"], ["Rojo intenso", "Deep red"], ["Vino", "Wine"], ["Nude", "Nude"], ["Morado", "Purple"],
  ["Cicatriz", "Scar"], ["Sin cicatriz", "No scar"], ["En la ceja", "On the eyebrow"], ["En el labio", "On the lip"], ["Cruzando el ojo", "Across the eye"],
  ["Tatuaje", "Tattoo"], ["Sin tatuaje", "No tattoo"], ["Lágrima", "Teardrop"], ["Estrella", "Star"], ["Líneas tribales", "Tribal lines"], ["Flor en el cuello", "Flower on the neck"], ["Código de barras", "Barcode"],
  ["Piercing", "Piercing"], ["Sin piercing", "No piercing"], ["Aro en la nariz", "Nose ring"], ["Septum", "Septum"], ["Ceja", "Eyebrow"], ["Labio", "Lip"],
  ["Cuello", "Neck"], ["Nada", "Nothing"], ["Collar de perlas", "Pearl necklace"], ["Cadena", "Chain"], ["Bufanda", "Scarf"], ["Pajarita", "Bow tie"], ["Pañuelo", "Neckerchief"], ["Gargantilla", "Choker"],
  ["Iluminación", "Lighting"], ["Suave de estudio", "Soft studio"], ["Plana", "Flat"], ["Dramática", "Dramatic"], ["Neón", "Neon"], ["Hora dorada", "Golden hour"], ["Clásica en blanco y negro", "Classic black and white"],
  ["Mirada", "Gaze"], ["Al frente", "Straight ahead"], ["De lado", "Sideways"], ["Hacia arriba", "Upward"], ["Entrecerrada", "Narrowed"],
]);
const LBC = [null, "#d9708a", "#ef7f63", "#b3122e", "#6e1630", "#c99a85", "#6b2d6e"];
const fdrX = fdr;
fdr = function (c, X, Y, Rr, t) {
  fdrX(c, X, Y, Rr, t);
  const A = (t && t.av) || {},
    U = Rr,
    ey = Y - U * 0.08,
    ex = U * 0.16,
    my = Y + U * 0.235,
    lw = (k) => Math.max(1, U * k);
  c.save();
  c.beginPath();
  c.arc(X, Y, U, 0, 7);
  c.clip();
  c.lineCap = "round";
  // Mirada: pupilas desplazadas
  const mi = A.mi | 0;
  if (mi) {
    const dx = mi == 1 ? U * 0.035 : 0,
      dy = mi == 2 ? -U * 0.03 : 0;
    [-1, 1].forEach((s) => {
      c.fillStyle = "#fff";
      c.beginPath();
      c.arc(X + s * ex + dx * 0.4, ey + dy * 0.4, U * 0.012, 0, 7);
      c.fill();
    });
    if (mi == 3) {
      c.strokeStyle = pxDe(c, X + U * 0.24, Y + U * 0.04, "#e3b08b");
      c.lineWidth = lw(0.05);
      [-1, 1].forEach((s) => {
        c.beginPath();
        c.moveTo(X + s * ex - U * 0.07, ey - U * 0.035);
        c.lineTo(X + s * ex + U * 0.07, ey - U * 0.035);
        c.stroke();
      });
    }
  }
  // Labios
  if (A.lb) {
    c.strokeStyle = LBC[A.lb] || LBC[1];
    c.lineWidth = lw(0.045);
    c.beginPath();
    c.moveTo(X - U * 0.09, my);
    c.quadraticCurveTo(X, my + U * 0.05, X + U * 0.09, my);
    c.stroke();
    c.globalAlpha = 0.35;
    c.fillStyle = "#fff";
    c.beginPath();
    c.ellipse(X + U * 0.02, my + U * 0.012, U * 0.025, U * 0.008, 0, 0, 7);
    c.fill();
    c.globalAlpha = 1;
  }
  // Cicatriz
  const ci = A.ci | 0;
  if (ci) {
    c.strokeStyle = "rgba(150,70,70,.75)";
    c.lineWidth = lw(0.018);
    const seg = (x1, y1, x2, y2, n) => {
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
      for (let i = 1; i <= n; i++) {
        const px = x1 + ((x2 - x1) * i) / (n + 1),
          py = y1 + ((y2 - y1) * i) / (n + 1);
        c.beginPath();
        c.moveTo(px - U * 0.02, py - U * 0.012);
        c.lineTo(px + U * 0.02, py + U * 0.012);
        c.stroke();
      }
    };
    if (ci == 1) seg(X + ex + U * 0.02, ey - U * 0.17, X + ex - U * 0.03, ey - U * 0.08, 1);
    else if (ci == 2) seg(X - U * 0.32, Y + U * 0.02, X - U * 0.2, Y + U * 0.14, 2);
    else if (ci == 3) seg(X + U * 0.05, my - U * 0.05, X + U * 0.03, my + U * 0.04, 1);
    else seg(X - ex + U * 0.04, ey - U * 0.2, X - ex - U * 0.05, ey + U * 0.13, 3);
  }
  // Tatuaje
  const ta = A.ta | 0;
  if (ta) {
    c.fillStyle = c.strokeStyle = "rgba(25,35,60,.8)";
    c.lineWidth = lw(0.016);
    if (ta == 1) {
      c.beginPath();
      c.moveTo(X + ex, ey + U * 0.06);
      c.quadraticCurveTo(X + ex + U * 0.03, ey + U * 0.12, X + ex, ey + U * 0.13);
      c.quadraticCurveTo(X + ex - U * 0.03, ey + U * 0.12, X + ex, ey + U * 0.06);
      c.fill();
    } else if (ta == 2) {
      const sx = X - U * 0.27,
        sy = Y + U * 0.02,
        r = U * 0.04;
      c.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5,
          rr = i % 2 ? r * 0.45 : r;
        c[i ? "lineTo" : "moveTo"](sx + Math.cos(a) * rr, sy + Math.sin(a) * rr);
      }
      c.closePath();
      c.fill();
    } else if (ta == 3) {
      [0, 1, 2].forEach((i) => {
        c.beginPath();
        c.moveTo(X + U * 0.22, Y - U * 0.02 + i * U * 0.045);
        c.quadraticCurveTo(X + U * 0.3, Y + i * U * 0.045, X + U * 0.36, Y - U * 0.04 + i * U * 0.045);
        c.stroke();
      });
    } else if (ta == 4) {
      const fx = X + U * 0.17,
        fy = Y + U * 0.62;
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5;
        c.beginPath();
        c.ellipse(fx + Math.cos(a) * U * 0.035, fy + Math.sin(a) * U * 0.035, U * 0.03, U * 0.017, a, 0, 7);
        c.stroke();
      }
    } else if (ta == 5) for (let i = 0; i < 7; i++) c.fillRect(X - U * 0.2 + i * U * 0.022, Y + U * 0.6, i % 3 ? U * 0.008 : U * 0.014, U * 0.07);
  }
  // Piercing
  const pi = A.pi | 0;
  if (pi) {
    c.strokeStyle = "#d9dde6";
    c.fillStyle = "#d9dde6";
    c.lineWidth = lw(0.016);
    c.beginPath();
    if (pi == 1) c.arc(X + U * 0.045, Y + U * 0.11, U * 0.022, -0.5, Math.PI);
    else if (pi == 2) c.arc(X, Y + U * 0.14, U * 0.022, 0, Math.PI);
    else if (pi == 3) c.arc(X + ex + U * 0.07, ey - U * 0.1, U * 0.014, 0, 7);
    else c.arc(X - U * 0.05, my + U * 0.035, U * 0.015, 0, 7);
    if (pi >= 3) c.fill();
    else c.stroke();
  }
  // Cuello
  const cu = A.cu | 0;
  if (cu) {
    const ny = Y + U * 0.6;
    if (cu == 1) {
      c.fillStyle = "#f3efe6";
      for (let i = -6; i <= 6; i++) {
        c.beginPath();
        c.arc(X + i * U * 0.035, ny + Math.abs(i) * -U * 0.006 + U * 0.04, U * 0.017, 0, 7);
        c.fill();
      }
    } else if (cu == 2) {
      c.strokeStyle = "#e6c35c";
      c.lineWidth = lw(0.02);
      c.beginPath();
      c.ellipse(X, ny - U * 0.02, U * 0.17, U * 0.1, 0, 0.2, Math.PI - 0.2);
      c.stroke();
    } else if (cu == 3) {
      c.fillStyle = "#a33a3a";
      c.beginPath();
      c.ellipse(X, ny + U * 0.02, U * 0.3, U * 0.085, 0, 0, 7);
      c.fill();
      c.fillRect(X + U * 0.08, ny + U * 0.02, U * 0.08, U * 0.32);
      c.fillStyle = "rgba(0,0,0,.18)";
      for (let i = 0; i < 3; i++) c.fillRect(X - U * 0.24 + i * U * 0.16, ny - U * 0.04, U * 0.03, U * 0.12);
    } else if (cu == 4) {
      c.fillStyle = "#1b1b24";
      c.beginPath();
      c.moveTo(X, ny + U * 0.02);
      c.lineTo(X - U * 0.1, ny - U * 0.04);
      c.lineTo(X - U * 0.1, ny + U * 0.08);
      c.closePath();
      c.moveTo(X, ny + U * 0.02);
      c.lineTo(X + U * 0.1, ny - U * 0.04);
      c.lineTo(X + U * 0.1, ny + U * 0.08);
      c.closePath();
      c.fill();
      c.beginPath();
      c.arc(X, ny + U * 0.02, U * 0.025, 0, 7);
      c.fill();
    } else if (cu == 5) {
      c.fillStyle = "#2f6fa8";
      c.beginPath();
      c.moveTo(X - U * 0.2, ny - U * 0.02);
      c.lineTo(X + U * 0.2, ny - U * 0.02);
      c.lineTo(X, ny + U * 0.2);
      c.closePath();
      c.fill();
    } else if (cu == 6) {
      c.strokeStyle = "#111";
      c.lineWidth = lw(0.035);
      c.beginPath();
      c.ellipse(X, ny - U * 0.06, U * 0.12, U * 0.05, 0, 0.1, Math.PI - 0.1);
      c.stroke();
    }
  }
  // Iluminación del retrato: luz, sombra y contorno que dan volumen
  const il = A.il | 0;
  c.globalCompositeOperation = "source-over";
  if (il != 1) {
    const L = [
      ["rgba(255,250,240,.12)", "rgba(0,0,0,.26)"],
      null,
      ["rgba(255,240,220,.3)", "rgba(0,0,0,.55)"],
      ["rgba(255,60,200,.32)", "rgba(20,0,60,.45)"],
      ["rgba(255,200,110,.35)", "rgba(80,30,0,.3)"],
      ["rgba(255,255,255,.18)", "rgba(0,0,0,.3)"],
    ][il];
    const g = c.createRadialGradient(X - U * 0.35, Y - U * 0.45, 0, X - U * 0.1, Y - U * 0.1, U * 1.25);
    g.addColorStop(0, L[0]);
    g.addColorStop(0.6, "rgba(0,0,0,0)");
    g.addColorStop(1, L[1]);
    c.fillStyle = g;
    c.fillRect(X - U, Y - U, U * 2, U * 2);
    if (il == 3) {
      c.strokeStyle = "rgba(47,240,224,.7)";
      c.lineWidth = lw(0.03);
      c.beginPath();
      c.arc(X, Y, U * 0.985, -0.3, 1.2);
      c.stroke();
    }
  }
  c.restore();
  if (il == 5) {
    try {
      const k = c.getTransform(),
        x0 = Math.round((X - U) * k.a + k.e),
        y0 = Math.round((Y - U) * k.d + k.f),
        s = Math.round(U * 2 * k.a);
      if (s > 0 && s < 1200) {
        const d = c.getImageData(x0, y0, s, s),
          p = d.data;
        for (let i = 0; i < p.length; i += 4) {
          const v = p[i] * 0.3 + p[i + 1] * 0.59 + p[i + 2] * 0.11;
          p[i] = p[i + 1] = p[i + 2] = v;
        }
        c.putImageData(d, x0, y0);
      }
    } catch (e) {}
  }
};
const avAzarX = avAzar;
avAzar = function (F) {
  const A = avAzarX(F),
    poco = (k, p) => (RU() < p ? 1 + Math.floor(RU() * (AVO[k][1].length - 1)) : 0);
  A.lb = F ? poco("lb", 0.45) : 0;
  A.ci = poco("ci", 0.06);
  A.ta = poco("ta", 0.06);
  A.pi = poco("pi", 0.08);
  A.cu = poco("cu", 0.2);
  A.il = 0;
  A.mi = poco("mi", 0.25);
  return A;
};

// ---------- Música: firmar solistas, dúos, bandas, grupos vocales y orquestas paso a paso ----------
const bndCand5 = () => {
  const B = bnd41();
  return S.tl.filter((t) => !t.ret && !t.you && !t.dead && t.age >= 8 && (t.r == 7 || t.r == 5) && !ocupado(t) && !B.some((b) => !b.sep && b.h > S.t && b.m.includes(t.id))).sort((a, b) => bndMus41(b) - bndMus41(a));
};
const musica5X = musica41H;
musica41H = function () {
  const h = musica5X.apply(this, arguments),
    blk = `<div class="c sub"><b>${T40("Firmar artista o agrupación", "Sign an artist or act")}</b><div class="m">${T40("1) Elige la clase. 2) Elige a sus integrantes con el buscador. 3) Ponle nombre y firma.", "1) Pick the type. 2) Pick its members with the search. 3) Name it and sign.")}</div><div class="chips">${ART41.map((a, i) => bt("bn5a", i, LL(a) + ` <span class="m">${ARTN41[i][0] == ARTN41[i][1] ? ARTN41[i][0] : ARTN41[i][0] + "–" + ARTN41[i][1]}</span>`)).join("")}</div></div>`;
  return h.replace(/<details class="c sub"[^>]*><summary><b>[^<]*<\/b><\/summary>[\s\S]*?<\/details>/, blk);
};
ACT["bn5a"] = (v) => {
  const a = +v,
    [mn2, mx] = ARTN41[a],
    C = bndCand5();
  if (C.length < mn2) return toast(T40("No hay suficientes talentos libres", "Not enough free talent"));
  fxPick({
    t: L37(`Firmar: ${LL(ART41[a]).toLowerCase()}`, `Sign: ${LL(ART41[a]).toLowerCase()}`),
    d: L37(`Elige ${mn2 == mx ? mn2 : "de " + mn2 + " a " + mx} integrante${mx > 1 ? "s" : ""}. El número es su nivel musical.`, `Pick ${mn2 == mx ? mn2 : mn2 + " to " + mx} member${mx > 1 ? "s" : ""}. The number is their music level.`),
    items: C.map((t) => ({ v: t.id, l: t.n, s: RO[t.r] + " · " + t.age + " " + T40("años", "yrs") + " · " + T40("música", "music") + " " + bndMus41(t) + " · " + fm(fee(Object.assign({}, t, { ex: 0 }), 7, 4) * 2), g: bndMus41(t) >= 70 ? T40("Destacados", "Standouts") : T40("Disponibles", "Available") })),
    orden: false,
    max: mx,
    min: mn2,
    ok: (s) => {
      BSEL41 = s.map(Number);
      if (mx == 1) BSEL41 = BSEL41.slice(0, 1);
      bn5Conf(a);
    },
  });
};
function bn5Conf(a) {
  const c = bndC41(BSEL41),
    L = BSEL41.map((id) => S.tl[id]).filter(Boolean),
    nm = a == 0 && L[0] ? L[0].n : ttl0();
  op(
    `<div class="c"><div class="k"><h2 style="margin:0">${esc(LL(ART41[a]))}</h2>${btx()}</div><div class="m">${L.map((t) => esc(t.n) + " (" + bndMus41(t) + ")").join(" · ")}</div><label class="m" for="bn4n">${T40("Nombre artístico", "Stage name")}</label><input id="bn4n" maxlength="40" value="${esc(nm)}"><div class="fila"><span>${T40("Firma por 5 años", "5-year deal")}</span><b>${fm(c)}</b></div><div class="fila"><span>${T40("Nivel del conjunto", "Act level")}</span><b>${Math.round(sum(L, bndMus41) / Math.max(1, L.length))}</b></div><div class="m">${T40("Te quedas el 15 % de sus discos; proponen discos, ensayan y salen de gira.", "You keep 15% of their records; they pitch albums, rehearse and tour.")}</div><div class="bts">${bt("bn4f", a, ic("ok") + " " + T40("Firmar", "Sign"), S.cash >= c ? "a" : "off")}</div>`,
  );
}
const bn4fX = ACT["bn4f"];
ACT["bn4f"] = (v) => {
  const n0 = bnd41().length;
  const r = bn4fX(v);
  if (bnd41().length > n0) {
    cx();
    toast(T40("Firmado", "Signed"));
    return pg();
  }
  if (S.cash < bndC41(BSEL41)) toast(T40("Fondos insuficientes", "Insufficient funds"));
  return r;
};

// ---------- Casino: carrera de caballos, póker de dados y rasca y gana ----------
const CABS = [
  ["Relámpago", 2],
  ["Duquesa", 3],
  ["Cometa Azul", 4],
  ["Tormenta Gris", 6],
  ["Último Tango", 10],
];
const vCasinoX = vCasino;
vCasino = function () {
  const h = vCasinoX.apply(this, arguments);
  if (!casTope()) return h;
  return (
    h +
    `<div class="c"><h3 style="margin:0 0 6px">${T40("Carrera de caballos", "Horse race")}</h3><div class="m">${T40("Elige un caballo: el favorito paga poco y gana seguido; el de 10 a 1 casi nunca, pero cuando gana…", "Pick a horse: the favorite pays little and wins often; the 10-to-1 almost never, but when it does…")}</div><div class="chips">${CABS.map((x, i) => bt("csc", i, esc(x[0]) + " · " + x[1] + ":1")).join("")}</div></div>` +
    `<div class="c"><h3 style="margin:0 0 6px">${T40("Póker de dados", "Poker dice")}</h3><div class="m">${T40("Cinco dados contra la casa: gana la mejor jugada (repóker, póker, full, trío, doble pareja, pareja). Empate: recuperas la apuesta.", "Five dice against the house: best hand wins (five, four of a kind, full house, three, two pair, pair). Tie: you get your bet back.")}</div>${bt("csp", "", T40("Tirar", "Roll"), "a")}</div>` +
    `<div class="c"><h3 style="margin:0 0 6px">${T40("Rasca y gana del estreno", "Premiere scratch card")}</h3><div class="m">${T40("Tres casillas: tres claquetas pagan 20 veces; dos, 2 veces.", "Three boxes: three clapperboards pay 20×; two, 2×.")}</div>${bt("csx", "", T40("Rascar", "Scratch"))}</div>`
  );
};
ACT["csc"] = (v) => {
  const m = casVal();
  if (!m) return;
  const i = +v,
    w = CABS.map((x) => 1 / (x[1] + 0.35)),
    tot = sum(w),
    q = RU() * tot;
  let a = 0,
    gan = 0;
  for (; gan < w.length; gan++) {
    a += w[gan];
    if (q <= a) break;
  }
  gan = Math.min(gan, CABS.length - 1);
  return casJugar(m, gan == i ? CABS[i][1] + 1 : 0, L37(`Gana ${CABS[gan][0]}`, `${CABS[gan][0]} wins`));
};
function pkJ(d) {
  const n = {};
  d.forEach((x) => (n[x] = (n[x] | 0) + 1));
  const v = Object.values(n).sort((a, b) => b - a),
    f = v[0] * 10 + (v[1] || 0);
  return f >= 50 ? 7 : f >= 40 ? 6 : f == 32 ? 5 : f >= 30 ? 4 : f == 22 ? 3 : f >= 20 ? 2 : 1;
}
const PKN = ["", "nada", "pareja", "doble pareja", "trío", "full", "póker", "repóker"];
ACT["csp"] = () => {
  const m = casVal();
  if (!m) return;
  const t = () => [0, 0, 0, 0, 0].map(() => 1 + Math.floor(RU() * 6)),
    a = t(),
    b = t(),
    x = pkJ(a),
    y = pkJ(b);
  return casJugar(m, x > y ? (x >= 6 ? 4 : 2) : x == y ? 1 : 0, L37(`Tú: ${a.join(" ")} (${PKN[x]}) · Casa: ${b.join(" ")} (${PKN[y]})`, `You: ${a.join(" ")} · House: ${b.join(" ")}`));
};
ACT["csx"] = () => {
  const m = casVal();
  if (!m) return;
  const S3 = ["🎬", "🎭", "🎵", "📚", "🎮"],
    r = [0, 1, 2].map(() => S3[Math.floor(RU() * S3.length)]),
    n = r.filter((x) => x == "🎬").length;
  return casJugar(m, n == 3 ? 20 : n == 2 ? 2 : 0, r.join(" "));
};

// ---------- Piratería: caza de copias en 20 segundos ----------
let CZP = null;
const vPirX = vPir37;
vPir37 = function () {
  const h = vPirX.apply(this, arguments),
    x = pirS(),
    ok = S.t >= (x.czT | 0);
  return (
    h +
    `<div class="c"><div class="k"><h3 style="margin:0">${T40("Caza de copias", "Copy hunt")}</h3>${bt("czp", "", ok ? T40("Empezar · 20 s", "Start · 20 s") : L37(`En ${(x.czT | 0) - S.t} semanas`, `In ${(x.czT | 0) - S.t} weeks`), ok ? "a" : "off")}</div><div class="m">${T40("Toca las copias piratas (☠) y no las legales (✓). Cada acierto baja la piratería de tus obras unas semanas; cada error la sube un poco.", "Tap the pirate copies (☠), not the legal ones (✓). Each hit lowers piracy of your works for a few weeks; each miss raises it a little.")}</div></div>`
  );
};
ACT["czp"] = () => {
  const x = pirS();
  if (S.t < (x.czT | 0)) return;
  CZP = { b: 0, m: 0, f: performance.now() + 20000, c: [] };
  op(`<div class="c"><div class="k"><h2 style="margin:0">${T40("Caza de copias", "Copy hunt")}</h2><b id="czt">20</b></div><div class="m" id="czs">☠ 0 · ✗ 0</div><div id="czg" class="czg">${Array.from({ length: 16 }, (_, i) => `<button class="czc" data-a="czk" data-v="${i}"></button>`).join("")}</div></div>`, 1);
  czTick();
};
function czTick() {
  if (!CZP) return;
  const g = $("#czg");
  if (!g) return (CZP = null);
  const q = Math.max(0, Math.ceil((CZP.f - performance.now()) / 1000));
  $("#czt").textContent = q;
  if (q <= 0) return czFin();
  CZP.c = Array.from({ length: 16 }, () => (RU() < 0.3 ? 1 : RU() < 0.25 ? 2 : 0));
  g.querySelectorAll(".czc").forEach((b, i) => {
    b.textContent = CZP.c[i] == 1 ? "☠" : CZP.c[i] == 2 ? "✓" : "";
    b.className = "czc" + (CZP.c[i] == 1 ? " pir" : CZP.c[i] == 2 ? " leg" : "");
  });
  CZP.h = setTimeout(czTick, Math.max(520, 900 - CZP.b * 12));
}
ACT["czk"] = (v, el) => {
  if (!CZP) return;
  const k = CZP.c[+v];
  if (!k) return;
  CZP.c[+v] = 0;
  if (el) {
    el.textContent = "";
    el.className = "czc";
  }
  if (k == 1) CZP.b++;
  else CZP.m++;
  const s = $("#czs");
  if (s) s.textContent = `☠ ${CZP.b} · ✗ ${CZP.m}`;
};
function czFin() {
  clearTimeout(CZP.h);
  const x = pirS(),
    n = Math.max(0, CZP.b - CZP.m * 2),
    k = cl(1 - n * 0.012, 0.6, 1);
  x.czT = S.t + 8;
  if (n > 0)
    PIRMED.forEach((m) => {
      const r = x.red[m];
      x.red[m] = { k: Math.min(r && r.h > S.t ? r.k : 1, k), h: S.t + 10 };
    });
  const txt = L37(`Caza terminada: ${CZP.b} copias atrapadas y ${CZP.m} errores. La piratería baja ${Math.round((1 - k) * 100)} % por 10 semanas.`, `Hunt over: ${CZP.b} copies caught and ${CZP.m} mistakes. Piracy drops ${Math.round((1 - k) * 100)}% for 10 weeks.`);
  CZP = null;
  cx();
  nws(txt);
  toast(txt);
  pg();
}

// ---------- Canal de TV: noticiero exclusivo y especial de estreno ----------
const vCabX = vCab;
vCab = function () {
  const h = vCabX.apply(this, arguments),
    c = S.cb;
  if (!c || !c.on) return h;
  const nx = c.nx5 && c.nx5.h > S.t,
    cn = Math.round(TB(1) * 0.02);
  return (
    h +
    `<div class="c"><div class="k"><h3 style="margin:0">${T40("Golpes de audiencia", "Ratings stunts")}</h3></div>${nx ? `<div class="m">${L37(`Tu exclusiva sigue en el aire ${c.nx5.h - S.t} semanas más (+${Math.round(c.nx5.k * 100)} % de audiencia).`, `Your exclusive is on air for ${c.nx5.h - S.t} more weeks (+${Math.round(c.nx5.k * 100)}% audience).`)}</div>` : ""}<div class="fila"><span>${T40("Noticia exclusiva", "Exclusive news story")}<span class="m"> · ${T40("4 semanas, riesgo de desmentido", "4 weeks, risk of retraction")}</span></span>${bt("cbx", "n", fm(cn), nx || S.cash < cn ? "off" : "")}</div><div class="fila"><span>${T40("Especial de estreno en horario estelar", "Prime-time premiere special")}<span class="m"> · ${T40("2 semanas", "2 weeks")}</span></span>${bt("cbx", "e", fm(cn * 1.6), nx || S.cash < cn * 1.6 ? "off" : "")}</div><div class="fila"><span>${T40("Maratón de clásicos de tu catálogo", "Marathon of your catalog classics")}<span class="m"> · ${T40("3 semanas, gratis si tienes 5 obras", "3 weeks, free with 5 works")}</span></span>${bt("cbx", "m", T40("Programar", "Schedule"), nx || S.pj.filter((P) => P.st >= 3).length < 5 ? "off" : "")}</div></div>`
  );
};
ACT["cbx"] = (v) => {
  const c = S.cb;
  if (!c || !c.on || (c.nx5 && c.nx5.h > S.t)) return;
  const cn = Math.round(TB(1) * 0.02),
    D = { n: [cn, 4, 0.12 + RU() * 0.12], e: [Math.round(cn * 1.6), 2, 0.25], m: [0, 3, 0.08] }[v];
  if (!D || S.cash < D[0]) return toast(T40("Fondos insuficientes", "Insufficient funds"));
  if (D[0]) gasta("tv", D[0]);
  c.nx5 = { h: S.t + D[1], k: D[2], v };
  if (v == "n" && RU() < 0.18) {
    c.nx5.k = -0.05;
    S.pop = Math.max(0, (S.pop || 0) - 2);
    nws(L37(`Tu noticiero tiene que desmentir su exclusiva: la audiencia desconfía.`, `Your newscast has to retract its exclusive: viewers grow wary.`));
  } else nws(L37(`${c.nom} arrasa en audiencia con su programación especial.`, `${c.nom} wins the ratings with its special programming.`));
  return pg();
};
on("semana", () => {
  const c = S && S.cb;
  if (!c || !c.on || !c.nx5 || c.nx5.h <= S.t) return;
  c.aud = Math.round((c.aud || 0) * (1 + c.nx5.k));
  const g = Math.round(TB(1) * 0.006 * c.nx5.k * 10);
  if (g > 0) gana("tv", g);
});

// ---------- Streaming: lotes de catálogo y líneas de suministro ----------
const vSvX = vSv;
vSv = function () {
  const h = vSvX.apply(this, arguments),
    v = S.sv;
  if (!v || !v.on) return h;
  const lc = Math.round(TB(1) * 0.04),
    ls = Math.round(TB(1) * 0.008),
    on2 = v.ln5 && v.ln5.h > S.t;
  return (
    h +
    `<div class="c"><h3 style="margin:0 0 6px">${T40("Crecer el catálogo", "Grow the catalog")}</h3><div class="fila"><span>${T40("Lote de 20 títulos de archivo", "Lot of 20 library titles")}<span class="m"> · ${T40("+3 % de suscriptores y menos abandono 8 semanas", "+3% subscribers and less churn for 8 weeks")}</span></span>${bt("svl", "a", fm(lc), S.cash < lc ? "off" : "")}</div><div class="fila"><span>${T40("Lote de 8 éxitos recientes", "Lot of 8 recent hits")}<span class="m"> · ${T40("+7 % de suscriptores", "+7% subscribers")}</span></span>${bt("svl", "b", fm(lc * 2.4), S.cash < lc * 2.4 ? "off" : "")}</div><div class="fila"><span>${T40("Línea de suministro por un año", "One-year supply deal")}<span class="m"> · ${on2 ? L37(`activa ${v.ln5.h - S.t} semanas`, `active ${v.ln5.h - S.t} weeks`) : T40("estrenos cada mes: +1 % de suscriptores al mes", "new titles every month: +1% subscribers a month")}</span></span>${bt("svl", "c", fm(ls) + "/" + T40("mes", "mo"), on2 || S.cash < ls ? "off" : "")}</div></div>`
  );
};
ACT["svl"] = (v) => {
  const s = S.sv;
  if (!s || !s.on) return;
  const lc = Math.round(TB(1) * 0.04),
    ls = Math.round(TB(1) * 0.008);
  if (v == "c") {
    if (S.cash < ls || (s.ln5 && s.ln5.h > S.t)) return;
    s.ln5 = { h: S.t + 52, c: ls };
    gasta("streaming", ls);
    nws(L37(`${s.n} firma una línea de suministro de estrenos por un año.`, `${s.n} signs a one-year supply deal.`));
    return pg();
  }
  const c = v == "a" ? lc : Math.round(lc * 2.4);
  if (S.cash < c) return toast(T40("Fondos insuficientes", "Insufficient funds"));
  gasta("streaming", c);
  s.sb = Math.round(s.sb * (v == "a" ? 1.03 : 1.07));
  nws(L37(`${s.n} suma un lote de títulos al catálogo.`, `${s.n} adds a lot of titles to its catalog.`));
  return pg();
};
on("mes", () => {
  const s = S && S.sv;
  if (!s || !s.on || !s.ln5 || s.ln5.h <= S.t) return;
  gasta("streaming", s.ln5.c);
  s.sb = Math.round(s.sb * 1.01);
});

