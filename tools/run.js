// node tools/run.js '<código a evaluar en la página>' [ancho] [captura.png]
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +(process.argv[3] || 420), height: 860 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message + " " + (e.stack || "").split("\n").slice(1, 3).join(" ")));
  p.on("console", (m) => m.type() == "error" && errs.push("CONSOLE " + m.text()));
  await p.goto("file://" + require("path").resolve(__dirname, "../dist/INDUSTRY_ART.html") + "?bot=1");
  await p.waitForTimeout(400);
  let r;
  try { r = await p.evaluate(`(async()=>{${process.argv[2]}})()`); } catch (e) { r = "EVALERR " + e.message; }
  if (process.argv[4]) await p.screenshot({ path: process.argv[4], fullPage: false });
  console.log(JSON.stringify(r, null, 0).slice(0, 4000));
  console.log(errs.slice(0, 15).join("\n"));
  await b.close();
})();
