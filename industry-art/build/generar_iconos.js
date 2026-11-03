// Dibuja los íconos y la imagen para compartir con el logo vectorial del propio juego (logoIA).
// Uso: node generar_iconos.js <build.html> <carpeta de salida>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const [file, out] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(file));
  await p.waitForLoadState('load');
  await p.evaluate(() => document.fonts && document.fonts.ready);
  await p.waitForTimeout(500);
  const r = await p.evaluate(async () => {
    const TEAL = '#13607a',
      CREMA = '#efe9d6',
      TINTA = '#151515',
      out = {};
    const lienzo = (w, h, f) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      f(c.getContext('2d'), w, h);
      return c.toDataURL('image/png');
    };
    for (const s of [32, 48, 192, 512]) out[`icono-${s}.png`] = lienzo(s, s, (x) => logoIA(x, s));
    out['icono-maskable-512.png'] = lienzo(512, 512, (x) => {
      logoIA(x, 512, { capa: 'fondo' });
      logoIA(x, 512, { capa: 'frente' });
    });
    out['apple-touch-icon.png'] = lienzo(180, 180, (x) => {
      x.fillStyle = TEAL;
      x.fillRect(0, 0, 180, 180);
      logoIA(x, 180);
    });
    const fuente = (px, peso, fam) => `${peso} ${px}px ${fam}`;
    await document.fonts.load(fuente(120, 700, '"Titulos"'));
    await document.fonts.load(fuente(34, 400, '"Cuerpo"'));
    out['compartir.png'] = lienzo(1200, 630, (x, w, h) => {
      x.fillStyle = CREMA;
      x.fillRect(0, 0, w, h);
      x.fillStyle = TEAL;
      x.fillRect(0, 0, w, 18);
      x.fillRect(0, h - 18, w, 18);
      x.save();
      x.translate(80, 135);
      logoIA(x, 360);
      x.restore();
      x.fillStyle = TEAL;
      x.textBaseline = 'alphabetic';
      x.font = fuente(132, 700, '"Titulos","Arial Narrow",Impact,sans-serif');
      x.fillText('INDUSTRY', 500, 270);
      x.fillText('ART', 500, 400);
      x.fillStyle = TINTA;
      x.font = fuente(31, 400, '"Cuerpo",system-ui,sans-serif');
      ['Dirige tu estudio de cine, TV, videojuegos,', 'teatro, música y libros, de 1700 a 2300.'].forEach((l, i) => x.fillText(l, 502, 458 + i * 42));
      x.font = fuente(24, 700, '"Cuerpo",system-ui,sans-serif');
      x.fillStyle = TEAL;
      x.fillText('EDICIÓN ' + VERN, 502, 568);
    });
    return out;
  });
  await b.close();
  for (const k in r) fs.writeFileSync(path.join(out, k), Buffer.from(r[k].split(',')[1], 'base64'));
  console.log('íconos:', Object.keys(r).join(', '));
})();
