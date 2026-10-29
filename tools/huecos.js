// Partida larga en español: busca los trozos que el francés o el portugués dejan sin traducir y los guarda con los números como «#»
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 420, height: 860 } });
  await p.goto("file://" + require("path").resolve(__dirname, "../dist/INDUSTRY_ART.html") + "?bot=1");
  const r = await p.evaluate(async ([y0, y1]) => {
    await BOT.correr({ sd: "H" + y0, y0, y1, est: "agresiva" });
    S.bot = 0;
    const es = /\b(el|los|las|del|con|una|y|está|más|año|años|pero|hasta|también|sus|muy|cuando|porque|aunque|gana|pierde|cada|tus|tu|sube|baja|se|si|al)\b|ñ|ción\b/i;
    // Palabras que solo existen en español (no en francés ni en portugués)
    const es2 = /\b(el|los|las|del|con|una|año|años|también|muy|cuando|aunque|pierde|tienes|eres|puedes|hay|tus|sus|hasta|pero|más|está|qué|así|después)\b/i;
    const XRE = /[$€£]?\d[\d.,]*\s?[KMB%]?(?![a-záéíóú])/g;
    const plano = new Map(),
      plant = new Map();
    const tr = (s, L) => {
      CFG.idi = L;
      const r = trX(s);
      CFG.idi = "es";
      return r;
    };
    const mira = (t) => {
      const k = t.trim();
      if (k.length < 4 || !/[a-záéíóúñ]{3}/i.test(k) || /^[\s\S]*[{};]\s*$/.test(k)) return;
      if (/«/.test(k)) {
        const f = tr(k, "fr"),
          q = tr(k, "pt");
        const resto = (x) => x.replace(/«[^»]*»/g, "");
        if (es2.test(resto(f)) || es2.test(resto(q).replace(/\bestá\b/g, ""))) {
          const m = k.replace(/«[^»]*»/g, "«X»").replace(XRE, "#");
          if (!plant.has(m)) plant.set(m, k);
        }
        return;
      }
      const partes = / · /.test(k) ? k.split(/ · |: | \/ | → | — /) : [k];
      for (const seg of partes) {
        const s = seg.trim();
        if (s.length < 4 || (s.match(/(^|\s)[a-záéíóúñü]{3,}/g) || []).length < 2) continue;
        const f = tr(s, "fr"),
          q = tr(s, "pt");
        if (f == s || q == s || es2.test(f) || es2.test(q.replace(/\bestá\b/g, ""))) {
          const m = s.replace(XRE, "#");
          if (!plano.has(m)) plano.set(m, s);
        }
      }
    };
    const grab = () => {
      const it = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (x) => (x.parentElement && /SCRIPT|STYLE/.test(x.parentElement.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
      let x;
      while ((x = it.nextNode())) mira(x.nodeValue);
    };
    const subs = TX.es.subs;
    for (let s = 0; s < 6; s++)
      for (let k = 0; k < (subs[s] || [""]).length; k++) {
        try {
          tab = s;
          SUB[s] = k;
          cx();
          pg();
          grab();
        } catch (e) {}
      }
    return { plano: [...plano.keys()], plant: [...plant.keys()] };
  }, [+(process.argv[3] || 1995), +(process.argv[4] || 2012)]);
  require("fs").writeFileSync(process.argv[2] || "huecos.json", JSON.stringify(r, null, 1));
  console.log(r.plano.length, r.plant.length);
  await b.close();
})();
