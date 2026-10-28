// ===== Cifras exactas: el presupuesto y los deslizadores numéricos aceptan el número escrito a mano =====
function cifNum(s) {
  let t = String(s || "")
    .toLowerCase()
    .replace(/[\s$€£]/g, "");
  const m = t.match(/(millones|millón|millon|mill|mil|mm|bn|k|m|b)$/);
  let mul = 1;
  if (m) {
    mul = { k: 1e3, mil: 1e3, m: 1e6, mm: 1e6, mill: 1e6, millón: 1e6, millon: 1e6, millones: 1e6, b: 1e9, bn: 1e9 }[m[1]];
    t = t.slice(0, -m[1].length).replace(",", ".");
    if ((t.match(/\./g) || []).length > 1) t = t.replace(/\.(?=.*\.)/g, "");
  } else t = t.replace(/[.,]/g, "");
  const v = parseFloat(t);
  return v > 0 ? v * mul : null;
}
const cifK = () => (CFG.real && S && typeof hoyF == "function" ? hoyF(yr()) : 1);
const cifPlano = (n) =>
  Math.round(n * cifK())
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, IDI == "en" ? "," : ".");
// Presupuesto: se escribe en dinero y el deslizador se coloca exactamente en esa cifra
function cifBv(el) {
  if (!W || W.m == null) return;
  const v = cifNum(el.value) / cifK(),
    tb = TB(W.m);
  if (!(v > 0)) {
    el.value = cifPlano(BD());
    return;
  }
  const lo = Math.ceil(0.02 * tb),
    hi = Math.floor(8 * tb),
    x = Math.round(cl(v, lo, hi));
  if (x != Math.round(v)) toast(L37(`En ${yr()} el presupuesto va de ${fm(lo)} a ${fm(hi)}`, `In ${yr()} the budget goes from ${fm(lo)} to ${fm(hi)}`));
  W.bv = cl((1000 * Math.log(x / tb / 0.02)) / Math.log(400), 0, 1000);
  W.bx = x;
  W.bxv = W.bv;
  W.bxt = tb;
  return wz();
}
function cifDeco(root) {
  if (!root) return;
  root.querySelectorAll('input[type="range"]').forEach((r) => {
    if (r.dataset.cif) return;
    r.dataset.cif = "1";
    if (r.dataset.k == "bv") {
      if (!W || W.m == null) return;
      r.insertAdjacentHTML(
        "afterend",
        `<div class="cif-bv"><label class="m" for="cif-bv">${T40("Cifra exacta", "Exact amount")}</label><span class="cif-u">$</span><input type="text" id="cif-bv" inputmode="decimal" autocomplete="off" value="${cifPlano(BD())}" aria-label="${T40("Presupuesto exacto", "Exact budget")}" onkeydown="if(event.key=='Enter'){event.preventDefault();this.blur()}" onchange="cifBv(this)"></div>`,
      );
      r.addEventListener("input", () => {
        const b = document.getElementById("cif-bv");
        if (b && document.activeElement != b) b.value = cifPlano(BD());
      });
      return;
    }
    // Solo cuando el número que se ve es el mismo valor del deslizador (episodios, extras, años, semanas…)
    const lb = r.previousElementSibling,
      cont = lb && (lb.tagName == "LABEL" || lb.classList.contains("k")) ? lb : null,
      b = cont && (cont.querySelector("b") || (cont.parentElement && cont.parentElement.querySelector(".selv")));
    if (!b) return;
    const txt = b.textContent.trim();
    if (!/^\d/.test(txt) || parseInt(txt, 10) != +r.value) return;
    const mn = +r.min || 0,
      mx = +r.max || 100,
      st = +r.step || 1,
      n = document.createElement("input");
    n.type = "number";
    n.className = "cif-n";
    n.min = mn;
    n.max = mx;
    n.step = st;
    n.value = r.value;
    n.inputMode = "numeric";
    n.setAttribute("aria-label", T40("Número exacto", "Exact number"));
    n.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        n.blur();
      }
    });
    n.addEventListener("click", (e) => e.stopPropagation());
    n.addEventListener("change", () => {
      let v = parseFloat(String(n.value).replace(",", "."));
      if (!isFinite(v)) {
        n.value = r.value;
        return;
      }
      v = cl(mn + Math.round((v - mn) / st) * st, mn, mx);
      n.value = v;
      if (+r.value == v) return;
      r.value = v;
      r.dispatchEvent(new Event("input", { bubbles: true }));
      r.dispatchEvent(new Event("change", { bubbles: true }));
    });
    r.addEventListener("input", () => {
      if (document.activeElement != n) n.value = r.value;
    });
    b.insertAdjacentElement("afterend", n);
  });
}
let CIFQ = 0;
if (typeof MutationObserver != "undefined" && document.body)
  new MutationObserver(() => {
    if (!CIFQ)
      CIFQ = requestAnimationFrame(() => {
        CIFQ = 0;
        cifDeco(document.getElementById("md"));
        cifDeco(document.getElementById("app"));
      });
  }).observe(document.body, { childList: true, subtree: true });
