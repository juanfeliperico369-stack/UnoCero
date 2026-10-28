// Frases con nombres de obras y sets: plantilla traducida, nombres respetados y nombres de sets traducidos
(() => {
  if (typeof DIC_FR == "undefined") return;
  const n = (x) => (XDIC() && XDIC()[x]) || x;
  const P = [
    [/^Reutilizas tu set «(.+)»: −(\d+) % de costo y una semana menos\.$/, (m) => [`Tu réutilises ton décor «${n(m[1])}» : −${m[2]} % de coût et une semaine de moins.`, `Você reutiliza seu cenário «${n(m[1])}»: −${m[2]} % de custo e uma semana a menos.`]],
    [/^El rodaje de «(.+?)» amplía y renueva tu set «(.+?)»\.$/, (m) => [`Le tournage de «${m[1]}» agrandit et rénove ton décor «${n(m[2])}».`, `A filmagem de «${m[1]}» amplia e renova seu cenário «${n(m[2])}».`]],
    [
      /^La superproducción «(.+?)» deja en pie el set «(.+?)»(?: y sube a nivel (\d) tu construcción «(.+?)»)?: tus próximas obras podrán reutilizarlo\.$/,
      (m) => [
        `La superproduction «${m[1]}» laisse debout le décor «${n(m[2])}»${m[3] ? ` et fait passer ton installation «${n(m[4])}» au niveau ${m[3]}` : ""} : tes prochaines œuvres pourront le réutiliser.`,
        `A superprodução «${m[1]}» deixa de pé o cenário «${n(m[2])}»${m[3] ? ` e leva sua construção «${n(m[4])}» ao nível ${m[3]}` : ""}: suas próximas obras poderão reutilizá-lo.`,
      ],
    ],
    [/^De «(.*?)» · valor (.+?) · estado (\d+) % · usos: (\d+) · −(\d+) % de costo$/, (m) => [`De «${m[1]}» · valeur ${m[2]} · état ${m[3]} % · utilisations : ${m[4]} · −${m[5]} % de coût`, `De «${m[1]}» · valor ${m[2]} · estado ${m[3]} % · usos: ${m[4]} · −${m[5]} % de custo`]],
    [/^Escenografía de repertorio: (.+)$/, (m) => [`Décor de répertoire : ${n(m[1])}`, `Cenografia de repertório: ${n(m[1])}`]],
    [/^Guardado en Descargas\/INDUSTRY ART: (.+)$/, (m) => [`Enregistré dans Téléchargements/INDUSTRY ART : ${m[1]}`, `Salvo em Downloads/INDUSTRY ART: ${m[1]}`]],
    [/^Guardado en (\/.+?): (.+)$/, (m) => [`Enregistré dans ${m[1]} : ${m[2]}`, `Salvo em ${m[1]}: ${m[2]}`]],
    [/^Plan de salida: (.+)$/, (m) => [`Plan de sortie : ${n(m[1])}`, `Plano de lançamento: ${n(m[1])}`]],
    [/^▲ El público pide (.+)$/, (m) => [`▲ Le public réclame : ${n(m[1])}`, `▲ O público pede: ${n(m[1])}`]],
    [/^▼ (.+) está cansando al público$/, (m) => [`▼ ${n(m[1])} lasse le public`, `▼ ${n(m[1])} está cansando o público`]],
    [/^Muere (.+) a los (\d+) años\.$/, (m) => [`${m[1]} meurt à ${m[2]} ans.`, `${m[1]} morre aos ${m[2]} anos.`]],
    [
      /^(?:El público pide (.+?) y le da la espalda a (.+?)\. )?(?:(.+?) sigue a la cabeza de la industria)?(?:, mientras (.+?) ya es un estudio (.+?)|, y los independientes como (.+?) buscan su lugar)\.$/,
      (m) => {
        const fr = [m[1] ? `Le public réclame ${n(m[1])} et tourne le dos à ${n(m[2])}. ` : "", m[3] ? `${m[3]} reste en tête de l'industrie` : "", m[4] ? `, tandis que ${m[4]} est désormais un studio ${n(m[5])}` : `, et les indépendants comme ${m[6]} cherchent leur place`],
          pt = [m[1] ? `O público pede ${n(m[1])} e dá as costas a ${n(m[2])}. ` : "", m[3] ? `${m[3]} segue à frente da indústria` : "", m[4] ? `, enquanto ${m[4]} já é um estúdio ${n(m[5])}` : `, e os independentes como ${m[6]} buscam seu lugar`];
        return [fr.join("") + ".", pt.join("") + "."];
      },
    ],
    [/^Estrena una obra de (.+)$/, (m) => [`Sors une œuvre de ${n(m[1])}`, `Lance uma obra de ${n(m[1])}`]],
    [/^Productor busca trabajo: (.+)$/, (m) => [`Producteur en quête de travail : ${m[1]}`, `Produtor procura trabalho: ${m[1]}`]],
    [/^Fallece (.+) \((\d+)-(\d+)\)\. Ya no se puede crear como talento\.$/, (m) => [`Décès de ${m[1]} (${m[2]}-${m[3]}). On ne peut plus le créer comme talent.`, `Morre ${m[1]} (${m[2]}-${m[3]}). Já não pode ser criado como talento.`]],
    [
      /^Cómo se escucha en (\d+): (.+)\.$/,
      (m) => {
        const L = m[2].split(", ").map((x) => x.replace(/^(.+?) (\d+ %)$/, (_, a, b) => n(a) + " " + b)).join(", ");
        return [`Comment on écoute en ${m[1]} : ${L}.`, `Como se ouve em ${m[1]}: ${L}.`];
      },
    ],
  ];
  // Fragmentos con contadores o notas: «Subgéneros (0/6)», «Actuación (ideal 12 %):», «nota A+», «Encaje ★★★☆☆», «Pulido (+2 sem)»
  const xl0 = xl;
  xl = function (D, y) {
    const r = xl0(D, y);
    if (r != null || !y) return r;
    const fr = CFG.idi == "fr";
    let m = y.match(/^nota ([A-F][+-]?)$/);
    if (m) return (fr ? "note " : "nota ") + m[1];
    m = y.match(/^Encaje ([★☆½]+)$/);
    if (m) return (fr ? "Adéquation " : "Encaixe ") + m[1];
    m = y.match(/^(.+?) \(ideal (\d+) %\):$/);
    if (m) {
      const b = xl(D, m[1]);
      if (b != null) return b + (fr ? ` (idéal ${m[2]} %) :` : ` (ideal ${m[2]} %):`);
    }
    m = y.match(/^(.+?) \(([^()]+)\)( \*)?$/);
    if (m) {
      const b = xl(D, m[1]),
        c = /^[+\-−]?[\d.,/]+\s?%?$/.test(m[2]) ? m[2] : xl(D, m[2]);
      if (b != null && c != null) return b + " (" + c + ")" + (m[3] || "");
    }
    m = y.match(/^(.+?) (\d+)$/);
    if (m && !/\d/.test(m[1])) {
      const b = xl0(D, m[1]);
      if (b != null) return b + " " + m[2];
    }
    m = y.match(/^(.+?):$/);
    if (m) {
      const b = xl(D, m[1]);
      if (b != null) return b + (fr ? " :" : ":");
    }
    return null;
  };
  const trXS = trX;
  trX = function (t) {
    if (XDIC() && t && t.length < 400) {
      const k = t.trim();
      for (const [re, f] of P) {
        const m = k.match(re);
        if (m) return t.replace(k, f(m)[CFG.idi == "fr" ? 0 : 1]);
      }
    }
    return trXS(t);
  };
})();
