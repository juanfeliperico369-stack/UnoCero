// ===== Logo de INDUSTRY ART: un ensō pintado de un trazo (el arte) con un triángulo exacto en el centro (la industria) =====
function logoIA(x, s, o) {
  o = o || {};
  const c = s / 2,
    fondo = o.fondo !== false;
  let h = 2166136261;
  const rnd = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
  if (fondo) {
    const g = x.createRadialGradient(c, c * 0.92, s * 0.05, c, c, s * 0.75);
    g.addColorStop(0, "#1d1840");
    g.addColorStop(0.6, "#0f1228");
    g.addColorStop(1, "#070914");
    x.fillStyle = g;
    x.fillRect(0, 0, s, s);
  }
  const R = s * (o.r || 0.3),
    W = s * 0.085,
    a0 = -Math.PI * 0.42,
    a1 = a0 + Math.PI * 1.86,
    N = 420,
    col = (p) => {
      const A = [255, 214, 120],
        B = [255, 120, 92],
        C = [236, 72, 140],
        m = p < 0.5 ? p * 2 : (p - 0.5) * 2,
        P = p < 0.5 ? A : B,
        Q = p < 0.5 ? B : C;
      return P.map((v, i) => Math.round(v + (Q[i] - v) * m));
    };
  // El trazo: cerdas que apoyan con fuerza, se afinan y se secan al final (pincel seco)
  const ancho = (p) => W * (0.5 + 0.75 * Math.pow(Math.sin(Math.PI * Math.min(1, 0.12 + p * 0.95)), 0.8)) * (1 - 0.6 * Math.pow(p, 2.4)),
    rad = (p) => R + Math.sin(p * 7.3 + 0.6) * s * 0.006 + Math.sin(p * 17) * s * 0.0025,
    B = Math.max(6, Math.round(s / 18)),
    M = Math.max(120, Math.round(s * 0.9));
  for (let j = 0; j < B; j++) {
    const u = (j + 0.5) / B - 0.5,
      borde = Math.abs(u) * 2,
      fin = 1 - borde * (0.16 + rnd() * 0.18) - rnd() * 0.05,
      ini = borde * 0.03 * rnd(),
      luz = 0.85 + rnd() * 0.3,
      hueco = rnd() < 0.5 ? 0.62 + rnd() * 0.3 : 2;
    let prev = null;
    for (let i = 0; i <= M; i++) {
      const p = i / M;
      if (p < ini || p > fin || (p > hueco && p < hueco + 0.03)) {
        prev = null;
        continue;
      }
      const a = a0 + (a1 - a0) * p,
        w = ancho(p),
        rr = rad(p) + u * w,
        pt = [c + rr * Math.cos(a), c + rr * Math.sin(a)];
      if (prev) {
        const [cr, cg, cb] = col(p);
        x.strokeStyle = `rgba(${Math.min(255, cr * luz) | 0},${Math.min(255, cg * luz) | 0},${Math.min(255, cb * luz) | 0},${(0.55 + 0.4 * (1 - borde)) * (p > 0.85 ? 1 - (p - 0.85) * 2.5 : 1)})`;
        x.lineWidth = (w / B) * 1.9;
        x.lineCap = "round";
        x.beginPath();
        x.moveTo(prev[0], prev[1]);
        x.lineTo(pt[0], pt[1]);
        x.stroke();
      }
      prev = pt;
    }
  }
  // Tinta acumulada donde el pincel se apoyó
  {
    const a = a0 + (a1 - a0) * 0.01,
      [cr, cg, cb] = col(0);
    x.fillStyle = `rgba(${cr},${cg},${cb},.9)`;
    x.beginPath();
    x.ellipse(c + R * Math.cos(a), c + R * Math.sin(a), W * 0.42, W * 0.36, a, 0, Math.PI * 2);
    x.fill();
  }
  // El triángulo: geometría exacta, como un escenario o un punto de partida
  const t = s * 0.115,
    cy = c + t * 0.08;
  x.save();
  x.beginPath();
  for (let i = 0; i < 3; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
    x.lineTo(c + t * Math.cos(a), cy + t * Math.sin(a));
  }
  x.closePath();
  const g2 = x.createLinearGradient(c, cy - t, c, cy + t);
  g2.addColorStop(0, "#7ff5d6");
  g2.addColorStop(1, "#3fb6ff");
  if (o.mono) x.fillStyle = "#fff";
  else {
    x.shadowColor = "rgba(90,230,220,.55)";
    x.shadowBlur = s * 0.04;
    x.fillStyle = g2;
  }
  x.fill();
  x.restore();
}
// Ícono de la pestaña y del acceso directo
iconoApp = function (x, s) {
  logoIA(x, s);
};
try {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 180;
  logoIA(cv.getContext("2d"), 180);
  const u = cv.toDataURL("image/png");
  document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach((l) => (l.href = u));
} catch (e) {}
// La portada lleva el logo sobre el título
const mnLogo = mn;
mn = function () {
  const r = mnLogo.apply(this, arguments),
    t = document.querySelector(".hero-txt");
  if (t && !t.querySelector(".ini-logo")) {
    const cv = document.createElement("canvas");
    cv.className = "ini-logo";
    cv.width = cv.height = 192;
    cv.setAttribute("aria-hidden", "true");
    logoIA(cv.getContext("2d"), 192, { fondo: false, r: 0.36 });
    t.insertBefore(cv, t.firstChild);
  }
  return r;
};
