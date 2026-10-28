// Recorre todas las pestañas en un idioma y lista los textos que siguen en español
const { chromium } = require("playwright");
(async () => {
  const lang = process.argv[2] || "fr";
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 420, height: 860 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto("file://" + require("path").resolve(__dirname, "../dist/INDUSTRY_ART.html") + "?bot=1");
  const r = await p.evaluate(async ([lang, LARGO]) => {
    await BOT.correr({ sd: "C", y0: 1995, y1: 2012, est: "agresiva" });
    S.bot = 0;
    S.cash = 1e12;
    ACT.cfgi(lang);
    
    const seen = new Map();
    const es = /\b(de|del|la|las|los|el|que|con|para|por|una|un|tu|tus|año|años|obra|obras|está|más|sin)\b|[ñ¿¡]/i;
    const grab = () => {
      const it = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let x;
      while ((x = it.nextNode())) {
        const t = x.nodeValue.trim();
        if (t.length < 2 || !/[a-záéíóúñ]/i.test(t) || t.length > 160) continue;
        if ((lang == "en" ? trTxt(t) : trX(t)) != t) continue;
        if (t.length > LARGO || /[«»]/.test(t)) continue;
        seen.set(t, (seen.get(t) || 0) + 1);
      }
    };
    const subs = TX.es.subs;
    for (let s = 0; s < 6; s++) for (let k = 0; k < (subs[s] || [""]).length; k++) {
      try { tab = s; SUB[s] = k; cx(); pg(); grab(); } catch (e) {}
    }
    for (let m = 0; m < 6; m++)
      try {
        ACT.enc(rvVivos()[0] + "|" + m);
        W.md = "d";
        for (const i of WORD) {
          try { W.tab = i; wz(); grab(); } catch (e) {}
        }
        cx();
      } catch (e) {}
    for (let m = 0; m < 6; m++)
      try {
        S.med = m;
        ACT.np();
        W.md = "r";
        wz();
        grab();
        cx();
      } catch (e) {}
    try {
      ajM();
      grab();
      cx();
    } catch (e) {}
    for (let m = 0; m < 6; m++)
      try {
        ACT.enc(rvVivos()[0] + "|" + m);
        W.md = "r";
        const P = producir();
        cx();
        for (let i = 0; i < 60 && pj(P.id).st < 1; i++) step();
        ACT.plan(P.id);
        grab();
        ACT.plp("fe");
        grab();
        ACT.plx("-1");
        grab();
        ACT.plp("mk");
        if (typeof ACT.mkr == "function") ACT.mkr();
        ACT.det(P.id);
        grab();
        ACT.plan(P.id);
        grab();
        cx();
      } catch (e) {}
    try {
      const B = [...document.querySelectorAll("#app .inf")].slice(0, 3);
      B.forEach((x) => (x.click(), grab()));
    } catch (e) {}
    return [...seen.entries()].sort((a, b) => b[1] - a[1]).map((x) => x[0]);
  }, [lang, +(process.argv[4] || 40)]);
  require("fs").writeFileSync(process.argv[3] || "cov.txt", r.join("\n"));
  console.log(r.length, errs.slice(0, 5));
  await b.close();
})();
