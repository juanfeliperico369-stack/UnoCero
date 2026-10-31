// ===== Orden visual: el contenido empieza justo debajo de la barra superior y termina antes de la de abajo, sea cual sea el tamaño de letra =====
// La barra superior y la de abajo se crean al empezar la partida y pueden rehacerse: se miden en cada pantalla
let ORD0 = { t: null, n: null, ro: null };
function ordAjusta() {
  const t = document.getElementById("top"),
    n = document.getElementById("nav"),
    m = document.getElementById("main");
  if (!t || !m) return;
  const rt = t.getBoundingClientRect(),
    arriba = getComputedStyle(t).position == "fixed" && rt.top <= 1 && rt.height > 0;
  const pt = arriba ? Math.ceil(rt.height + 10) + "px" : "";
  if (m.style.paddingTop != pt) m.style.paddingTop = pt;
  if (n) {
    const rn = n.getBoundingClientRect(),
      ab = getComputedStyle(n).position == "fixed" && rn.bottom >= innerHeight - 1 && rn.width > innerWidth * 0.6 && rn.height > 0,
      pb = ab ? Math.ceil(rn.height + 14) + "px" : "";
    if (m.style.paddingBottom != pb) m.style.paddingBottom = pb;
  }
  if (typeof ResizeObserver != "undefined" && (ORD0.t !== t || ORD0.n !== n)) {
    if (ORD0.ro) ORD0.ro.disconnect();
    ORD0 = { t, n, ro: new ResizeObserver(() => ordAjusta()) };
    ORD0.ro.observe(t, { box: "border-box" });
    if (n) ORD0.ro.observe(n, { box: "border-box" });
  }
}
addEventListener("resize", ordAjusta);
const pgOrd = pg;
pg = function () {
  const r = pgOrd.apply(this, arguments);
  try {
    ordAjusta();
  } catch (er) {}
  return r;
};
// Bloques que solo tienen sentido en tus obras (tu catálogo, tus plataformas) no salen en la ficha de una obra rival
const platHOr = platH;
platH = function (P) {
  return P && P.rvo != null ? "" : platHOr.apply(this, arguments);
};
const despuesHOr = despuesH;
despuesH = function (P) {
  return P && P.rvo != null ? "" : despuesHOr.apply(this, arguments);
};
