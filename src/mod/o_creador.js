// ===== Creador: personajes opcionales en música (los de las canciones y el videoclip) =====
const castHO = castH;
castH = function () {
  if (W.m != 4) return castHO.apply(this, arguments);
  W.pm4 = W.pm4 || [];
  const L = W.pm4,
    arqO = ARQ.map((a, i) => [i, a]);
  return `<div class="m">${T40("Opcional: los personajes que viven en tus canciones o en el videoclip. En un álbum conceptual le dan hilo a la historia; en un disco normal, color a las letras.", "Optional: the characters who live in your songs or music video. In a concept album they hold the story together; in a regular record they color the lyrics.")}</div>${L.map(
    (c, i) =>
      `<div class="c sub fx-blk"><div class="k"><b>${T40("Personaje", "Character")} ${i + 1}</b><span class="bts">${bt("pm4n", i, ic("dado") + " " + T40("Nombre", "Name"))}${bt("pm4x", i, ic("cerrar"))}</span></div><input type="text" maxlength="40" value="${esc(c.n || "")}" oninput="pm4Set(${i},'n',this.value)" aria-label="${T40("Nombre", "Name")}"><select onchange="pm4Set(${i},'a',+this.value)" aria-label="${T40("Arquetipo", "Archetype")}">${arqO.map(([j, a]) => `<option value="${j}"${(c.a | 0) == j ? " selected" : ""}>${esc(a)}</option>`).join("")}</select><input type="text" maxlength="90" value="${esc(c.d || "")}" placeholder="${T40("Quién es en la canción (opcional)", "Who they are in the song (optional)")}" oninput="pm4Set(${i},'d',this.value)"></div>`,
  ).join("")}${L.length < 6 ? `<div class="bts">${bt("pm4a", "", ic("mas") + " " + T40("Agregar personaje", "Add character") + ` (${L.length}/6)`)}</div>` : ""}`;
};
function pm4Set(i, k, v) {
  const c = (W.pm4 || [])[i];
  if (!c) return;
  c[k] = v;
}
ACT["pm4a"] = () => {
  W.pm4 = W.pm4 || [];
  if (W.pm4.length >= 6) return;
  const F = RU() < 0.5;
  W.pm4.push({ n: nomPj(F ? "F" : "M"), a: ri(0, 20), d: "" });
  return wz();
};
ACT["pm4x"] = (v) => {
  W.pm4 = (W.pm4 || []).filter((_, i) => i != +v);
  return wz();
};
ACT["pm4n"] = (v) => {
  const c = (W.pm4 || [])[+v];
  if (!c) return;
  c.n = nomPj(RU() < 0.5 ? "F" : "M");
  return wz();
};
V37.prod.push((P, W2) => {
  if (W2.m == 4 && W2.pm4 && W2.pm4.length) P.pm4 = W2.pm4.filter((c) => c && String(c.n || "").trim()).map((c) => ({ n: String(c.n).slice(0, 40), a: c.a | 0, d: String(c.d || "").slice(0, 90) }));
  if (W2.m == 4) W2.pm4 = [];
});
V37.mods.push((P, add) => {
  if (P.m != 4 || !P.pm4 || !P.pm4.length) return;
  const conc = tyNom(P).some((n) => /conceptual|Ópera rock/i.test(n));
  if (conc) add(Math.min(2, P.pm4.length * 0.5), 0.5, L37("personajes que dan hilo al álbum", "characters that tie the album together"));
  else add(0, Math.min(1, P.pm4.length * 0.3), L37("personajes en las letras", "characters in the lyrics"));
});
V37.ficha.push((P) =>
  P.m == 4 && P.pm4 && P.pm4.length
    ? `<div class="c sub"><b>${T40("Personajes de las canciones", "Characters in the songs")}</b>${P.pm4.map((c) => `<div class="fila"><span>${esc(c.n)}<span class="m"> · ${esc(ARQ[c.a] || "")}${c.d ? " · " + esc(c.d) : ""}</span></span></div>`).join("")}</div>`
    : "",
);
