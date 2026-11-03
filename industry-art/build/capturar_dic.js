// Carga un build en Chromium y guarda el contenido final de DIC_FR y DIC_PT
// (después del arranque completo) como JSON.
// Uso: node capturar_dic.js <build.html> <prefijo>   ->  <prefijo>.fr.json, <prefijo>.pt.json
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const [file, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('file://' + path.resolve(file));
  await p.waitForLoadState('load');
  await p.waitForTimeout(2000);
  const r = await p.evaluate(() => [JSON.stringify(DIC_FR), JSON.stringify(DIC_PT)]);
  await b.close();
  if (errs.length) {
    console.error('errores al cargar:', errs.join(' | '));
    process.exit(1);
  }
  fs.writeFileSync(out + '.fr.json', r[0]);
  fs.writeFileSync(out + '.pt.json', r[1]);
  console.log('DIC_FR', r[0].length, 'DIC_PT', r[1].length);
})();
