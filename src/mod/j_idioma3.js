// ===== Francés y portugués: frases de campaña y fechas del calendario de estreno =====
(() => {
  if (typeof DIC_FR == "undefined") return;
  const n = (x) => {
    const r = trX(x);
    return r == null ? x : r;
  };
  const DS = { lun: ["lun.", "seg"], mar: ["mar.", "ter"], mié: ["mer.", "qua"], jue: ["jeu.", "qui"], vie: ["ven.", "sex"], sáb: ["sam.", "sáb"], dom: ["dim.", "dom"] };
  const P = [
    [/^Expectativa (\d+)\. Falta elegir la fecha y el plan de salida\.$/, (m) => [`Attente ${m[1]}. Il reste à choisir la date et le plan de sortie.`, `Expectativa ${m[1]}. Falta escolher a data e o plano de lançamento.`]],
    [
      /^La campaña de «(.+?)» ya está pagada \((.+?)\)\. Expectativa actual: (\d+)\. Si esperas más de 12 semanas desde la campaña, se enfría poco a poco\.$/,
      (m) => [
        `La campagne de «${m[1]}» est déjà payée (${m[2]}). Attente actuelle : ${m[3]}. Si tu attends plus de 12 semaines après la campagne, elle se refroidit peu à peu.`,
        `A campanha de «${m[1]}» já está paga (${m[2]}). Expectativa atual: ${m[3]}. Se você esperar mais de 12 semanas desde a campanha, ela esfria aos poucos.`,
      ],
    ],
    [/^La campaña de «(.+?)» está en marcha: la obra queda en reposo hasta que elijas su fecha\.$/, (m) => [`La campagne de «${m[1]}» est lancée : l'œuvre reste en attente jusqu'à ce que tu choisisses sa date.`, `A campanha de «${m[1]}» está em andamento: a obra fica em espera até você escolher a data.`]],
    [/^En (\d+) el presupuesto va de (.+?) a (.+)$/, (m) => [`En ${m[1]}, le budget va de ${m[2]} à ${m[3]}`, `Em ${m[1]}, o orçamento vai de ${m[2]} a ${m[3]}`]],
    [/^Préstamo de (.+?) \(([\d.,]+) % al año, (\d+) años?\):?$/, (m) => [`Prêt de ${m[1]} (${m[2]} % par an, ${m[3]} ans) :`, `Empréstimo de ${m[1]} (${m[2]} % ao ano, ${m[3]} anos):`]],
    [/^(\d{4}) S(\d+) · (.+?) y (.+?) ya no se soportan\.$/, (m) => [`${m[1]} S${m[2]} · ${m[3]} et ${m[4]} ne se supportent plus.`, `${m[1]} T${m[2]} · ${m[3]} e ${m[4]} não se suportam mais.`]],
    [/^×([\d.,]+) (invierno|primavera|verano|otoño)$/, (m) => [`×${m[1]} ${n(m[2])}`, `×${m[1]} ${n(m[2])}`]],
    [/^(lun|mar|mié|jue|vie|sáb|dom) (\d{1,2}) (ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic) (\d+) \(sem (\d+)\)$/, (m) => [`${DS[m[1]][0]} ${m[2]} ${n(m[3])} ${m[4]} (sem. ${m[5]})`, `${DS[m[1]][1]} ${m[2]} ${n(m[3])} ${m[4]} (sem ${m[5]})`]],
  ];
  // Solo si el diccionario no tenía la frase entera
  const Q = [
    [/^Préstamo de (.+?)( \(.+\))?(:?)$/, (m) => [`Prêt de ${m[1]}${m[2] ? " " + n(m[2].trim()) : ""}${m[3] ? " :" : ""}`, `Empréstimo de ${m[1]}${m[2] ? " " + n(m[2].trim()) : ""}${m[3]}`]],
    [/^([^+:]+?) \+ ([^+:]+?) ?: ([★☆½]+)$|^([^+:]+?) \+ ([^+:]+?)$/, (m) => {
      const a = n((m[1] || m[4]).trim()),
        b = n((m[2] || m[5]).trim());
      return [`${a} + ${b}${m[3] ? " : " + m[3] : ""}`, `${a} + ${b}${m[3] ? ": " + m[3] : ""}`];
    }],
  ];
  const t0 = trX;
  trX = function (t) {
    if (XDIC() && t) {
      const k = t.trim();
      for (const [re, f] of P) {
        const m = k.match(re);
        if (m) return t.replace(k, f(m)[CFG.idi == "fr" ? 0 : 1]);
      }
    }
    const r = t0.apply(this, arguments);
    if (r === t && XDIC() && t) {
      const k = t.trim();
      for (const [re, f] of Q) {
        const m = k.match(re);
        if (m) return t.replace(k, f(m)[CFG.idi == "fr" ? 0 : 1]);
      }
    }
    return r;
  };
})();
(() => {
  if (typeof DIC_FR == "undefined") return;
  const C = { Milán: ["Milan", "Milão"], París: ["Paris", "Paris"], "Nueva York": ["New York", "Nova York"] };
  const re = /^Entre bastidores de la Semana de la Moda de (Milán|París|Nueva York), una diseñadora desconocida anota en su cuaderno los vestuarios de «(.+)»\. Antes de irse, dice: «algún día la moda tendrá su propia industria»\. Hilo y aguja para otra historia\.$/;
  const t0 = trX;
  trX = function (t) {
    const m = XDIC() && t ? t.trim().match(re) : null;
    if (!m) return t0.apply(this, arguments);
    return CFG.idi == "fr"
      ? `Dans les coulisses de la Fashion Week de ${C[m[1]][0]}, une créatrice inconnue dessine dans son carnet les costumes de «${m[2]}». Avant de partir, elle dit : «un jour, la mode aura sa propre industrie». Fil et aiguille pour une autre histoire.`
      : `Nos bastidores da Semana de Moda de ${C[m[1]][1]}, uma estilista desconhecida anota no caderno os figurinos de «${m[2]}». Antes de ir embora, diz: «um dia a moda terá sua própria indústria». Linha e agulha para outra história.`;
  };
})();
// Inglés: un texto que ya está traducido no se vuelve a traducir («reality show show», «Azul… (Blue) (Blue)»)
(() => {
  let V = null,
    nV = -1;
  const OUT = new Set(),
    t0 = trTxt;
  trTxt = function (t) {
    if (IDI != "en" || !t) return t0(t);
    enIni();
    if (nV != ENM.size) {
      V = new Set(ENM.values());
      nV = ENM.size;
    }
    const k = t.trim();
    if (!ENM.has(k)) {
      if (V.has(k) || OUT.has(k)) return t;
      const m = k.match(/^(.{0,40}?(?:· |: ))(.+)$/);
      if (m && V.has(m[2]) && !ENM.has(m[2])) return t.replace(k, t0(m[1]) + m[2]);
    }
    const r = t0(t);
    if (r !== t) {
      if (OUT.size > 50000) OUT.clear();
      OUT.add(r.trim());
    }
    return r;
  };
})();
