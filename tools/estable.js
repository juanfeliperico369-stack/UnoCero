// Recorre todas las pestañas y lista los textos que cambiarían al traducirlos otra vez (deben ser estables)
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
    const grab = async () => {
      await new Promise((r) => setTimeout(r, 30));
      const it = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let x;
      while ((x = it.nextNode())) {
        const t = x.nodeValue.trim();
        if (t.length < 2 || !/[a-záéíóúñ]/i.test(t)) continue;
        const t2 = lang == "en" ? trTxt(x.nodeValue) : trX(x.nodeValue); if (t2 == x.nodeValue) continue;
        seen.set(t + "  =>  " + t2.trim(), 1);
      }
    };
    const subs = TX.es.subs;
    for (let s = 0; s < 6; s++) for (let k = 0; k < (subs[s] || [""]).length; k++) {
      try { tab = s; SUB[s] = k; cx(); pg(); await grab(); } catch (e) {}
    }
    for (let m = 0; m < 6; m++)
      try {
        ACT.enc(rvVivos()[0] + "|" + m);
        W.md = "d";
        for (const i of WORD) {
          try { W.tab = i; wz(); await grab(); } catch (e) {}
        }
        cx();
      } catch (e) {}
    for (let m = 0; m < 6; m++)
      try {
        S.med = m;
        ACT.np();
        W.md = "r";
        wz();
        await grab();
        cx();
      } catch (e) {}
    try {
      ajM();
      await grab();
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
        await grab();
        ACT.plp("fe");
        await grab();
        ACT.plx("-1");
        await grab();
        ACT.plp("mk");
        if (typeof ACT.mkr == "function") ACT.mkr();
        ACT.det(P.id);
        await grab();
        ACT.plan(P.id);
        await grab();
        cx();
      } catch (e) {}
    try {
      const B = [...document.querySelectorAll("#app .inf")].slice(0, 3);
      for (const x of B) {
        x.click();
        await grab();
      }
    } catch (e) {}
    return [...seen.entries()].sort((a, b) => b[1] - a[1]).map((x) => x[0]);
  }, [lang, +(process.argv[4] || 40)]);
  require("fs").writeFileSync(process.argv[3] || "cov.txt", r.join("\n"));
  console.log(r.length, errs.slice(0, 5));
  await b.close();
})();
