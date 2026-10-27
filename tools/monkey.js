// Prueba de estrés de la interfaz: pulsa todos los botones de cada pestaña (y de las ventanas que abren) y registra errores.
// node tools/monkey.js [año inicial] [año final] [ancho]
const { chromium } = require("playwright");
(async () => {
  const y0 = +(process.argv[2] || 1995),
    y1 = +(process.argv[3] || 2012),
    w = +(process.argv[4] || 420);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: w, height: 860 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message + " " + (e.stack || "").split("\n").slice(1, 3).join(" ")));
  p.on("console", (m) => m.type() == "error" && errs.push("CONSOLE " + m.text().slice(0, 300)));
  await p.goto("file://" + require("path").resolve(__dirname, "../dist/INDUSTRY_ART.html") + "?bot=1");
  const r = await p.evaluate(
    async ([y0, y1]) => {
      await BOT.correr({ sd: "MONO", y0, y1, est: "agresiva" });
      S.bot = 0;
      S.cash = Math.max(S.cash, 1e12);
      const NO = new Set(["auto", "pausa", "mn", "salir", "ev", "mes", "sem", "cfgi", "cfgt", "x", "nx", "borrar", "bor", "imp", "exp", "load", "cargar", "nuevo", "reiniciar", "czp"]);
      const log = [];
      let n = 0;
      window.addEventListener("error", (e) => log.push((window.__ctx || "") + " :: " + e.message));
      const cerrar = () => {
        try {
          fxpCierra();
        } catch (e) {}
        try {
          cx();
        } catch (e) {}
      };
      const pulsa = (el, ctx) => {
        window.__ctx = ctx;
        n++;
        try {
          act(el.dataset.a, el.dataset.v, el);
        } catch (e) {
          log.push(ctx + " :: " + e.message + " @ " + String(e.stack).split("\n")[1]);
        }
      };
      const subs = TX.es.subs;
      for (let s = 0; s < 6; s++)
        for (let k = 0; k < (subs[s] || [""]).length; k++) {
          const ver = () => {
            cerrar();
            tab = s;
            SUB[s] = k;
            try {
              pg();
            } catch (e) {
              log.push(`pg ${s}/${k} :: ` + e.message);
            }
          };
          ver();
          const L = [...document.querySelectorAll("#app [data-a]")].map((e) => [e.dataset.a, e.dataset.v]).filter(([a]) => !NO.has(a));
          const vistos = new Set();
          for (const [a, v] of L) {
            const key = a + "|" + v;
            if (vistos.has(key)) continue;
            vistos.add(key);
            ver();
            const el = [...document.querySelectorAll("#app [data-a]")].find((e) => e.dataset.a == a && e.dataset.v == v);
            if (!el) continue;
            pulsa(el, `${s}/${k} ${a}=${v}`);
            const md = document.querySelector("#md.on .hoja, #fxp.on");
            if (md) {
              const M = [...md.querySelectorAll("[data-a]")].map((e) => [e.dataset.a, e.dataset.v]).filter(([a2]) => !NO.has(a2)).slice(0, 12);
              for (const [a2, v2] of M) {
                ver();
                const e1 = [...document.querySelectorAll("#app [data-a]")].find((e) => e.dataset.a == a && e.dataset.v == v);
                if (!e1) break;
                pulsa(e1, `${s}/${k} ${a}=${v}`);
                const e2 = [...document.querySelectorAll("#md [data-a], #fxp [data-a]")].find((e) => e.dataset.a == a2 && e.dataset.v == v2);
                if (e2) pulsa(e2, `${s}/${k} ${a}=${v} > ${a2}=${v2}`);
              }
            }
          }
        }
      cerrar();
      return { clics: n, errores: log.slice(0, 60), unicos: [...new Set(log.map((x) => x.split(" :: ")[1]))].slice(0, 30) };
    },
    [y0, y1],
  );
  console.log(JSON.stringify(r, null, 1).slice(0, 8000));
  console.log([...new Set(errs)].slice(0, 20).join("\n"));
  await b.close();
})();
