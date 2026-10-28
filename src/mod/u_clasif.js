// ===== Clasificación por edades según el documento: cada contenido tiene su propia escala y cada clasificación su tope =====
const CN6 = {
  v: ["Sin violencia", "Leve", "Moderada", "Intensa", "Gráfica", "Sangrienta", "Explícita"],
  l: ["Normal", "Leve", "Rudo", "Crudo", "Ofensivo", "Explícito"],
  s: ["Amistoso", "Romántico", "Apasionado", "Candente", "Explícito"],
  d: ["Ninguno", "Mencionado", "Ocasional", "Frecuente", "Intenso", "Explícito"],
  t: ["Ninguno", "Leve", "Moderado", "Intenso", "Perturbador", "Extremo"],
};
// Equivalencia con la escala interna del motor (0 a 3)
const CN3 = { v: [0, 1, 2, 3, 3, 3, 3], l: [0, 1, 2, 3, 3, 3], s: [0, 1, 2, 3, 3], d: [0, 1, 1, 2, 3, 3], t: [0, 1, 2, 3, 3, 3] };
// Tope de cada clasificación: G, PG, PG-13, 16, NC-17, 18, R, X, N
const CAP6 = {
  v: [0, 1, 2, 3, 3, 4, 5, 6, 2],
  l: [0, 0, 1, 2, 3, 4, 5, 5, 2],
  s: [0, 1, 1, 2, 3, 3, 3, 4, 2],
  d: [0, 0, 1, 3, 3, 4, 4, 5, 3],
  t: [1, 1, 2, 3, 3, 4, 5, 5, 2],
};
const CN6EN = {
  v: ["No violence", "Mild", "Moderate", "Intense", "Graphic", "Bloody", "Explicit"],
  l: ["Clean", "Mild", "Rough", "Crude", "Offensive", "Explicit"],
  s: ["Friendly", "Romantic", "Passionate", "Steamy", "Explicit"],
  d: ["None", "Mentioned", "Occasional", "Frequent", "Heavy", "Explicit"],
  t: ["None", "Mild", "Moderate", "Intense", "Disturbing", "Extreme"],
};
E40L(Object.keys(CN6).flatMap((k) => CN6[k].map((x, i) => [x, CN6EN[k][i]])));
// Mantiene la escala fina al día con la del motor (los atajos y los presets solo tocan la de 0 a 3)
function c6(X) {
  if (!X) return {};
  X.cont = X.cont || { v: 0, l: 0, s: 0, d: 0, t: 0 };
  X.cont6 = X.cont6 || {};
  CONT.forEach(([k]) => {
    const v = X.cont6[k];
    if (v == null || CN3[k][v] != X.cont[k]) {
      const i = CN3[k].indexOf(X.cont[k] | 0);
      X.cont6[k] = i >= 0 ? i : CN3[k].length - 1;
    }
  });
  return X.cont6;
}
function cont6Rng(k, n) {
  c6(W);
  const a = W.ag != null && agPerm(wGn()).includes(+W.ag) ? +W.ag : null,
    cap = a != null ? CAP6[k][a] : CN6[k].length - 1;
  return wRng("cont6." + k, 0, cap, Math.min(W.cont6[k], cap), n);
}
// «violencia: explícita · lenguaje: explícito · …»
function cnTxt(P, sep, may) {
  const c = P.cont6 ? Object.assign({}, P.cont6) : c6({ cont: Object.assign({}, P.cont) });
  CONT.forEach(([k]) => {
    if (c[k] == null || CN3[k][c[k]] != (P.cont || {})[k]) c[k] = Math.max(0, CN3[k].indexOf((P.cont || {})[k] | 0));
  });
  return CONT.map(([k, n]) => (may ? n : n.toLowerCase()) + ": " + CN6[k][c[k] | 0].toLowerCase()).join(sep || ", ");
}
ACT["wag"] = (v) => {
  const a = +v;
  if (!AGPRE[a]) return;
  W.ag = a;
  W.cont6 = {};
  W.cont = {};
  CONT.forEach(([k]) => {
    W.cont6[k] = CAP6[k][a];
    W.cont[k] = CN3[k][W.cont6[k]];
  });
  if (ERO(wGn()) && W.cont6.s < 2) {
    W.cont6.s = 2;
    W.cont.s = 2;
  }
  W.nr = a == 8 ? 1 : 0;
  dscPoda();
  return wz();
};
V37.prod.push((P, W2) => {
  if (W2 && W2.cont) P.cont6 = Object.assign({}, c6(W2));
});
// Más allá de «intenso», lo explícito divide: a los géneros duros les suma audacia, al resto le resta público
const CN6DURO = /Terror|Gore|Thriller|Bélico|Crimen|Policial|Noir|Erótico|Gánster|Western|Slasher|Survival/;
V37.mods.push((P, add) => {
  if (!P.cont6 || !P.cont) return;
  const ex = CONT.reduce((s, [k]) => s + Math.max(0, (P.cont6[k] | 0) - CN3[k].indexOf(3)), 0);
  if (!ex) return;
  if (CN6DURO.test((P.gn || []).join(" "))) add(Math.min(2, ex * 0.4), Math.min(1.5, ex * 0.25), L37("contenido explícito que su público busca", "explicit content its audience looks for"));
  else add(-Math.min(2, ex * 0.3), -Math.min(3, ex * 0.5), L37("contenido explícito que no pide la historia", "explicit content the story doesn't need"));
});
