// ===== Filtro de verosimilitud más justo: lo que sí puede existir en ficción o en realidad deja de descartarse =====
// Formatos y géneros «de realidad» que la ficción también usa (biografías inventadas, novela política, cocina, memorias ficticias…)
const DSC_FIC_OK = new Set(
  sp(
    "Política,Psicología,Filosofía,Economía,Ciencia,Tecnología,Cocina,Memorias,Crónica,Biográfico,Biografía,Biografía musical,Autobiografía,Autobiográfico,Testimonial,Educativo,Vida salvaje,Ensayo",
  ),
);
// Géneros, subgéneros, temas y problemáticas «de ficción» que también tienen obras reales
const DSC_REAL_OK = new Set(
  sp(
    "Surrealista,Parodia,Antología,Comedia dramática,K-Drama,Procedimental,Sketches,Telenovela,Tragedia,Farsa,Tragicomedia,Novela,Novela negra,Novela de formación,Épica,Epopeya,Filosófica,Dramaturgia,Mitología,Futurismo,Musical de escenario,Ópera rock,Zarzuela,Superhéroes,Surrealismo,Leyendas,Brujería,Paranormal,Posesiones,Casa embrujada,Monstruo marino,Neo-noir,Habitación cerrada,¿Quién lo hizo?,Climáticas,Cósmico,Extraterrestres,Robótica,Transhumanismo,Colonias espaciales,Utopía,Viajes extraordinarios,Retrofuturismo,Mitológico,Inmortalidad,Literatura,Hechiceros,Magia,Magos,Casas embrujadas,Castillos góticos,Cazadores de monstruos,Demonios,Fantasmas,Hombres lobo,Maldiciones antiguas,Nigromancia,Pactos con el diablo,Vampiros,Colonias en el espacio,Viajes en el tiempo,Inmortalidad digital,Mundos paralelos,Contacto extraterrestre,Realidad simulada,Fin del mundo,Maldición,Profecía,Comedia romántica,Novela visual,Película interactiva,Leyenda,Mito",
  ),
);
// Videojuegos basados en hechos reales: historia, guerra, deporte, documentales jugables
const DSC_JR_OK = new Set(sp("Acción,Aventura,Arcade,Lucha,Shooter en primera persona,Shooter en tercera persona,Sigilo,Estrategia en tiempo real,4X,Supervivencia,Novela visual,Película interactiva,Mundo abierto"));
const dscEpX = (x) => DSC_ES[x] || DSC_E[x];
const dscItemX = dscItem;
dscItem = function (k, x, W2) {
  const d = dscItemX(k, x, W2);
  if (d.ok) return d;
  const w = d.why || "";
  if (w == "solo existe en la realidad" && DSC_FIC_OK.has(x)) return { ok: 1, why: "" };
  if (w == "solo existe en la ficción" && DSC_REAL_OK.has(x)) return { ok: 1, why: "" };
  if (w == "un juego de realidad no lo admite" && DSC_JR_OK.has(x)) return { ok: 1, why: "" };
  // Un tema histórico puede tratarse desde otra época (memoria, legado, investigación)
  if (k == "tm" && (w == "anacrónico para esa época" || w == "no ocurre en esa época")) return { ok: 1, why: "" };
  // Un subgénero de época lleva la historia a su época al elegirlo
  if (k == "sb" && (w == "anacrónico para esa época" || w == "no ocurre en esa época") && dscEpX(x)) return { ok: 1, why: "" };
  return d;
};
const pkSE = ACT["pkS"];
ACT["pkS"] = (v, el) => {
  if (PKK == "sb" && W && !(W.sb || []).includes(+v)) {
    const x = DL("sb")[+v],
      e = dscEpX(x);
    if (e) {
      const ep = W.ep == null ? 9 : +W.ep,
        epR = ep == 9 ? epDe(yr()) : ep;
      if (!e[1].includes(epR) && ep < 10) {
        const tope = W.rl ? 99 : epDe(yr()),
          L = e[1].filter((i) => i <= tope && i <= 9);
        if (L.length) {
          W.ep = L[L.length - 1] == epDe(yr()) ? 9 : L[L.length - 1];
          toast(L37(`La historia pasa a: ${EP[L[L.length - 1]]}`, `The story moves to: ${EP[L[L.length - 1]]}`));
        }
      }
    }
  }
  const r = pkSE(v, el);
  if (PKK == "sb" && typeof pkF == "function" && $("#pc")) pkF();
  return r;
};
// Si después se cambia la época, un subgénero de época fuera de lugar se nota (salvo en fantasía o viajes en el tiempo)
V37.mods.push((P, add) => {
  if (!P.sb || !P.sb.length || P.ep == null || P.ep >= 10) return;
  const epR = P.ep == 9 ? epDe(P.y || yr()) : P.ep,
    gn = (P.gn || []).join(" ");
  if (/Fantas|Ciencia ficción|Surreal|Parodia|Comedia/.test(gn)) return;
  const L = P.sb.map((x) => (typeof x == "number" ? DX.sb[x] : x)).filter((x) => x && DSC_ES[x] && !DSC_ES[x][1].includes(epR));
  if (L.length) add(-Math.min(2, L.length), 0, L37("subgénero de otra época", "subgenre from another era"));
});
