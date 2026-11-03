// Comprueba que el build 1.0 se comporta igual que el de referencia.
// Uso: node verificar_1_0.js <referencia.html> <nuevo.html> <partida.json> [idiomas=es,en,fr,pt]
//  - DIC_FR / DIC_PT: tras cargarlos, el contenido del nuevo es idéntico al de la referencia.
//  - Pantallas: recorre todas las pestañas y subpestañas con la partida cargada y compara el HTML
//    pintado (menos las pantallas que cambian a propósito: Streaming y Canal de TV).
//  - Ningún error de página.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [ref, nuevo, partida, idiomasArg] = process.argv.slice(2);
const IDIOMAS = (idiomasArg || 'es,en,fr,pt').split(',');
const CAMBIAN = new Set(['4/3', '4/7']);

async function abrir(b, file, idi) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('dialog', (d) => d.dismiss());
  await p.addInitScript((l) => {
    try {
      const c = JSON.parse(localStorage.getItem('ia16.cfg') || '{}');
      c.idi = l;
      c.anim = 0;
      localStorage.setItem('ia16.cfg', JSON.stringify(c));
    } catch (e) {}
  }, idi);
  await p.goto('file://' + path.resolve(file));
  await p.waitForLoadState('load');
  await p.waitForTimeout(700);
  return { ctx, p, errs };
}

async function pantallas(p, txt) {
  await p.evaluate((t) => {
    const x = JSON.parse(t);
    x.bot = 0;
    cargarS(x);
    pg();
  }, txt);
  return p.evaluate(() => {
    const out = {},
      subs = T('subs');
    for (let t = 0; t < 6; t++)
      for (let s = 0; s < Math.max(1, (subs[t] || []).length); s++) {
        try {
          cx();
        } catch (e) {}
        try {
          irA(t, s);
          out[t + '/' + s] = document.querySelector('#main') ? document.querySelector('#main').innerHTML : document.body.innerHTML;
        } catch (e) {
          out[t + '/' + s] = 'ERROR ' + e.message;
        }
      }
    return out;
  });
}

(async () => {
  const b = await chromium.launch();
  const txt = fs.readFileSync(partida, 'utf8');
  let fallos = 0;
  const A = await abrir(b, ref, 'es');
  const dicRef = await A.p.evaluate(() => [JSON.stringify(DIC_FR), JSON.stringify(DIC_PT)]);
  await A.ctx.close();
  for (const idi of IDIOMAS) {
    const R = await abrir(b, ref, idi),
      N = await abrir(b, nuevo, idi);
    const ini = [await R.p.evaluate(() => document.body.innerText), await N.p.evaluate(() => document.body.innerText)];
    const quitarEd = (s) => s.replace(/(EDICIÓN|EDITION|ÉDITION|EDIÇÃO) [\d.]+/i, '');
    if (quitarEd(ini[0]) != quitarEd(ini[1])) {
      fallos++;
      console.log(`[${idi}] la pantalla de inicio cambia`);
    }
    const dicN = await N.p.evaluate(() => {
      if (typeof dicCarga9 == 'function') {
        dicCarga9('fr');
        dicCarga9('pt');
      }
      return [JSON.stringify(DIC_FR), JSON.stringify(DIC_PT)];
    });
    ['fr', 'pt'].forEach((l, i) => {
      const a = JSON.parse(dicRef[i]),
        c = JSON.parse(dicN[i]);
      const ka = Object.keys(a),
        kc = Object.keys(c);
      const dif = ka.filter((k) => a[k] !== c[k]).concat(kc.filter((k) => !(k in a)));
      if (dif.length || ka.length != kc.length) {
        fallos++;
        console.log(`[${idi}] DIC_${l.toUpperCase()} distinto: ${dif.length} claves (${dif.slice(0, 3).join(' | ')})`);
      }
    });
    // Recargar el nuevo para que la comparación de pantallas no dependa de haber forzado la carga.
    await N.ctx.close();
    const N2 = await abrir(b, nuevo, idi);
    const [pr, pn] = [await pantallas(R.p, txt), await pantallas(N2.p, txt)];
    let iguales = 0;
    for (const k in pr) {
      if (CAMBIAN.has(k)) continue;
      if (pr[k] === pn[k]) iguales++;
      else {
        fallos++;
        let i = 0;
        while (i < pr[k].length && pr[k][i] === pn[k][i]) i++;
        console.log(`[${idi}] pantalla ${k} distinta en ${i}: «${pr[k].slice(Math.max(0, i - 80), i + 80)}» vs «${pn[k].slice(Math.max(0, i - 80), i + 80)}»`);
      }
    }
    const errs = R.errs.concat(N2.errs.map((e) => 'nuevo: ' + e));
    if (N2.errs.length) {
      fallos++;
      console.log(`[${idi}] errores en el nuevo:`, N2.errs.slice(0, 5).join(' | '));
    }
    console.log(`[${idi}] pantallas iguales: ${iguales}/${Object.keys(pr).length - CAMBIAN.size}${R.errs.length ? ' · errores en la referencia: ' + R.errs.length : ''}`);
    await R.ctx.close();
    await N2.ctx.close();
  }
  await b.close();
  console.log(fallos ? `FALLOS: ${fallos}` : 'TODO OK');
  process.exit(fallos ? 1 : 0);
})();
