#!/usr/bin/env python3
"""Industry Art 1.0 · pulido sobre el build publicado 1.6.6.

Uso:
    python3 pulido_1_0.py <index-1.6.6.html> <salida/index.html>

Aplica, con reemplazos exactos (cada uno comprueba cuántas veces aparece):
  1. Versión 1.0.
  2. Franquicias: frList pasa de O(franquicias x obras) a O(obras) y, mientras se
     pinta una pantalla, frPs / frSold / frEst / frOrig6 usan un índice por
     franquicia en vez de recorrer todas las obras en cada llamada.
  3. Streaming > Catálogo: las listas (visible, bodega, retirados) se muestran por
     páginas y hay un buscador. Antes se pintaban todas las filas a la vez
     (5000+ títulos = 50 000+ nodos), lo que colgaba o cerraba la app en móviles.
  4. Canal de TV > Licencias: «Tus licencias» también va por páginas.
  5. Guardado: la suma de verificación y la compresión gzip se hacen en un Web
     Worker (el hilo principal solo serializa). Si el Worker no está disponible,
     se usa el camino de siempre. El formato del archivo no cambia.
  6. Diccionarios FR/PT diferidos: los 1,5 MB de literales se sacan del script y
     viajan como JSON inerte (en <head>) que solo se lee si el idioma es francés
     o portugués. El contenido final de DIC_FR / DIC_PT se captura del propio
     build con Chromium, así que es idéntico al original.
  7. Autoguardado: opción «Cada 3 meses»; el autoguardado espera a que se pinte la
     semana nueva y, si guardar ya tarda (partidas muy largas), lo sugiere.
  8. Bóveda: el catálogo avisa cuántos lugares libres quedan y pide confirmar si
     se compra una bóveda teniendo 40 o más libres.
  9. Informe de errores: los errores no capturados se anotan (solo en el
     dispositivo) y en Ajustes se pueden copiar o borrar.
 10. Búsquedas por nombre sin distinguir tildes (Talento, Obras, Archivo, Buscar,
     Taxonomía, dominio público).
 12. Unos 200 temas nuevos en 15 grupos (guerra y vida militar, western, noir y
     justicia, ciencia ficción, fantasía, terror, catástrofes, arcos del héroe, mundo
     antiguo, Edad Media a Barroco, siglos XIX y XX, mitologías y culturas de cada
     continente), en 4 idiomas, con su etiqueta, su época y si son solo de ficción.
 11. Web: favicon, íconos, Open Graph, manifiesto, service worker (sin conexión) y
     almacenamiento persistente; nada de eso se activa dentro de la app Android.
     Si se pasa una carpeta como tercer argumento, deja ahí la versión web lista
     para subir (index.html, sw.js, manifest.webmanifest e imágenes).

Requiere node + playwright (Chromium) para la captura de los diccionarios y los íconos.
"""
import json
import os
import re
import subprocess
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE, OUT = sys.argv[1], sys.argv[2]
WEB = sys.argv[3] if len(sys.argv) > 3 else None
h = open(BASE, encoding='utf-8').read()


def rep(s, old, new, count=1, label=''):
    n = s.count(old)
    if n != count:
        sys.exit(f'[{label}] se esperaban {count} apariciones, hay {n}: {old[:140]!r}')
    return s.replace(old, new)


# ------------------------------------------------------------------ 1. versión
h = rep(h, 'const VERN = "1.6.6";', 'const VERN = "1.0";', 1, 'version')

# ------------------------------------------------------------------ 2. franquicias
h = rep(h, '''const frPs = (f) => S.pj.filter((p) => p.fid == f || (p.xf && p.xf.includes(+f)));
const frList = () => {
  const g = {};
  S.pj.forEach((p) => {
    g[p.fid] = (g[p.fid] || 0) + (p.gross || 0);
  });
  return Object.keys(g)
    .map(Number)
    .filter((f) => S.pj.some((p) => p.fid == f && !p.sold))
    .sort((a, b) => g[b] - g[a]);
};''', '''var FRX9 = null,
  FRXON9 = 0;
function frIx9() {
  if (!FRXON9 || !S || !S.pj) return null;
  const P = S.pj;
  if (FRX9 && FRX9.p === P && FRX9.n === P.length) return FRX9;
  const a = new Map(),
    o = new Map(),
    put = (m, k, x) => {
      const L = m.get(k);
      if (L) L.push(x);
      else m.set(k, [x]);
    };
  P.forEach((p) => {
    let k = null;
    if (p.fid != null) {
      k = +p.fid;
      if (k === k) {
        put(o, k, p);
        put(a, k, p);
      } else k = null;
    }
    const xf = p.xf;
    if (xf && xf.length)
      for (let i = 0; i < xf.length; i++) {
        const x = xf[i];
        if (typeof x == "number" && x !== k && xf.indexOf(x) === i) put(a, x, p);
      }
  });
  return (FRX9 = { p: P, n: P.length, a, o });
}
const frIxOk9 = (f) => typeof f == "number" && f === f && frIx9();
const frPs = (f) => {
  const X = frIxOk9(f);
  return X ? (X.a.get(f) || []).slice() : S.pj.filter((p) => p.fid == f || (p.xf && p.xf.includes(+f)));
};
const frOwn9 = (f) => {
  const X = frIxOk9(f);
  return X ? (X.o.get(f) || []).slice() : S.pj.filter((p) => p.fid == f);
};
const frList = () => {
  const g = {},
    vivo = new Set();
  S.pj.forEach((p) => {
    g[p.fid] = (g[p.fid] || 0) + (p.gross || 0);
    if (!p.sold && p.fid != null) {
      const k = +p.fid;
      if (k === k) vivo.add(k);
    }
  });
  return Object.keys(g)
    .map(Number)
    .filter((f) => vivo.has(f))
    .sort((a, b) => g[b] - g[a]);
};''', 1, 'frPs/frList')
h = rep(h, '''const frSold = (f) => {
  const L = S.pj.filter((p) => p.fid == f);
  return L.length > 0 && L.every((p) => p.sold);
};''', '''const frSold = (f) => {
  const L = frOwn9(f);
  return L.length > 0 && L.every((p) => p.sold);
};''', 1, 'frSold')
h = rep(h, '''  const L = S.pj.filter((p) => p.fid == f).sort((a, b) => a.id - b.id);
  return L.length ? filOrigen5(L[0]) : "p";''', '''  const L = frOwn9(f).sort((a, b) => a.id - b.id);
  return L.length ? filOrigen5(L[0]) : "p";''', 1, 'frOrig6')

# ------------------------------------------------------------------ 3. catálogo de streaming
h = rep(h, '''C = { vis: C0.vis.filter((t) => SVFM < 0 || svMed(t) == SVFM), fuera: C0.fuera.filter((t) => SVFM < 0 || svMed(t) == SVFM), cap: C0.cap, tot: C0.tot },''',
        '''C = { vis: C0.vis.filter((t) => (SVFM < 0 || svMed(t) == SVFM) && svBusca9(t)), fuera: C0.fuera.filter((t) => (SVFM < 0 || svMed(t) == SVFM) && svBusca9(t)), cap: C0.cap, tot: C0.tot },''', 1, 'svCat filtro')
h = rep(h, '''${C.vis.map((t) => fila(t, 0)).join("") || '<div class="m">Sin títulos: tus obras entran cuando terminan su cartelera.</div>'}''',
        '''${svBuscaH9(C0.tot)}${pagH9("svv", C.vis, (t) => fila(t, 0)) || (SVQ9 ? `<div class="m">${L4("Ningún título coincide con la búsqueda.", "No title matches the search.", "Aucun titre ne correspond à la recherche.", "Nenhum título corresponde à busca.")}</div>` : '<div class="m">Sin títulos: tus obras entran cuando terminan su cartelera.</div>')}''', 1, 'svCat visibles')
h = rep(h, '''${C.fuera.map((t) => fila(t, 1)).join("")}</details>''', '''${pagH9("svb", C.fuera, (t) => fila(t, 1))}</details>''', 1, 'svCat bodega')
h = rep(h, '''${ret.map((id) => `<div class="fila"><span>${esc((obTV(/^\\d+$/.test(id) ? +id : id) || { n: id }).n)}</span>${bt("svvuelve", id, "Volver a subir")}</div>`).join("")}''',
        '''${pagH9("svr", ret, (id) => `<div class="fila"><span>${esc((obTV(/^\\d+$/.test(id) ? +id : id) || { n: id }).n)}</span>${bt("svvuelve", id, "Volver a subir")}</div>`)}''', 1, 'svCat retirados')

# ------------------------------------------------------------------ 4. licencias del canal de TV
h = rep(h, '''${mias.map((x) => `<div class="fila"><span>${esc(x.n)}</span><span class="m">${x.exp ? "vence en " + Math.max(0, x.exp - S.t) + " sem" : "para siempre"}</span></div>`).join("") || '<div class="m">Ninguna todavía.</div>'}''',
        '''${pagH9("tvl", mias, (x) => `<div class="fila"><span>${esc(x.n)}</span><span class="m">${x.exp ? "vence en " + Math.max(0, x.exp - S.t) + " sem" : "para siempre"}</span></div>`) || '<div class="m">Ninguna todavía.</div>'}''', 1, 'tvLic')

# ------------------------------------------------------------------ 5. guardado sin bloquear la pantalla
h = rep(h, '''  const txt = JSON.stringify(x),
    z = await comprimir(txt);''', '''  const t9 = performance.now(),
    txt = JSON.stringify(x),
    w = await zipW9(txt, performance.now() - t9),
    z = w ? w.z : await comprimir(txt);''', 1, 'empaquetar')
h = rep(h, '''      c: cyrb53(txt),''', '''      c: w ? w.c : cyrb53(txt),''', 1, 'empaquetar c')
h = rep(h, '''    toast("No se pudo guardar: " + (e && e.message ? e.message : e));''',
        '''    errGuarda9("guardado", e && e.message ? e.message : e, e && e.stack);
    toast("No se pudo guardar: " + (e && e.message ? e.message : e));''', 1, 'guardar error')

# ------------------------------------------------------------------ 7. autoguardado cada 3 meses
h = rep(h, '''    ["mes", "Cada mes"],
    ["anio", "Cada a\\u00F1o"],''', '''    ["mes", "Cada mes"],
    ["trim", L4("Cada 3 meses", "Every 3 months", "Tous les 3 mois", "A cada 3 meses")],
    ["anio", "Cada a\\u00F1o"],''', 1, 'cfga trim')
h = rep(h, '''    (CFG.auto == "mes" && mi(S.t) != mi(Math.max(0, u))) ||''', '''    (CFG.auto == "mes" && mi(S.t) != mi(Math.max(0, u))) ||
    (CFG.auto == "trim" && Math.floor(mi(S.t) / 3) != Math.floor(mi(Math.max(0, u)) / 3)) ||''', 1, 'auto trim')

# ------------------------------------------------------------------ 8. bóveda
h = rep(h, '''Lo más flojo queda en bodega si no cabe.</div>''', '''Lo más flojo queda en bodega si no cabe.</div>${svLibreH9(C0)}''', 1, 'svLibre')

# ------------------------------------------------------------------ 10. búsquedas sin tildes
for old, new, n in [
    ('(!fil.pq || p.n.toLowerCase().includes(fil.pq))', '(!fil.pq || bq9(p.n, fil.pq))', 2),
    ('(!f.q || t.n.toLowerCase().includes(f.q))', '(!f.q || bq9(t.n, f.q))', 1),
    ('(!FIL2.q || p.n.toLowerCase().includes(FIL2.q))', '(!FIL2.q || bq9(p.n, FIL2.q))', 1),
    ('S.tl.filter((t) => !t.dead && t.n.toLowerCase().includes(q))', 'S.tl.filter((t) => !t.dead && bq9(t.n, q))', 1),
    ('(x.n + " " + rvNom(x.o) + " " + x.g + " " + (MD[x.m] ? MD[x.m][0] : "") + " " + x.y).toLowerCase().includes(t)',
     'bq9(x.n + " " + rvNom(x.o) + " " + x.g + " " + (MD[x.m] ? MD[x.m][0] : "") + " " + x.y, t)', 1),
    ('(m.n + " " + m.a).toLowerCase().includes(q)', 'bq9(m.n + " " + m.a, q)', 1),
    ('(o.n + " " + o.a + " " + o.pj.map((p) => p[0]).join(" ")).toLowerCase().includes(q)', 'bq9(o.n + " " + o.a + " " + o.pj.map((p) => p[0]).join(" "), q)', 1),
    ('!x.toLowerCase().includes(q)', '!bq9(x, q)', 1),
]:
    h = rep(h, old, new, n, 'busca ' + old[:30])

# ------------------------------------------------------------------ edificio animado: datos calculados una vez por repintado, no en cada fotograma
h = rep(h, '''  if (z) edif(z.c, z.w, z.h, t, edifDatos());''', '''  if (z) edif(z.c, z.w, z.h, t, edifD9());''', 1, 'edC')

# ------------------------------------------------------------------ 12. temas nuevos (guerra, western, noir, ciencia ficción, fantasía, épocas, culturas…)
temas = open(os.path.join(AQUI, 'temas_1_0.js'), encoding='utf-8').read().strip('\n')
h = rep(h, '''

aplicarCfg();
idiomaIni();
if (!/[?&]bot=/.test(location.search)) mn();''', '\n' + temas + '''

aplicarCfg();
idiomaIni();
if (!/[?&]bot=/.test(location.search)) mn();''', 1, 'temas')

# ------------------------------------------------------------------ bloque nuevo al final del script del juego
a = h.index('<script id="juego">')
b = h.index('</script>', a)
bloque = open(os.path.join(AQUI, 'pulido_1_0.js'), encoding='utf-8').read().strip('\n')
h = h[:b] + '\n' + bloque + '\n' + h[b:]

etapa_a = OUT + '.etapaA.html'
os.makedirs(os.path.dirname(os.path.abspath(OUT)), exist_ok=True)
open(etapa_a, 'w', encoding='utf-8').write(h)

# ------------------------------------------------------------------ 5. diccionarios FR/PT diferidos
def capturar(html, prefijo):
    r = subprocess.run(['node', os.path.join(AQUI, 'capturar_dic.js'), html, prefijo], capture_output=True, text=True)
    print(r.stdout.strip(), r.stderr.strip())
    if r.returncode:
        sys.exit('no se pudieron capturar los diccionarios')
    out = {}
    for l in ('fr', 'pt'):
        out[l] = json.loads(open(f'{prefijo}.{l}.json', encoding='utf-8').read())
        os.remove(f'{prefijo}.{l}.json')
    return out

FINAL = capturar(etapa_a, OUT + '.dicA')

L = h.split('\n')
quitado = 0
for i, l in enumerate(L):
    if re.match(r'^const DIC_(FR|PT) = \{', l):
        assert l.endswith('};')
        quitado += len(l)
        L[i] = l[:len('const DIC_FR = ')] + '{};'
    elif re.match(r'^\s*Object\.assign\(DIC_(FR|PT), \{', l) and len(l) > 1000:
        assert l.endswith('});')
        quitado += len(l)
        L[i] = ''
h = '\n'.join(L)
print('literales FR/PT fuera del script:', quitado, 'caracteres')

h = rep(h, '''const XDIC = () => (CFG.idi == "fr" && typeof DIC_FR != "undefined" ? DIC_FR : CFG.idi == "pt" && typeof DIC_PT != "undefined" ? DIC_PT : null);''',
        '''function dicCarga9(l) {
  const D = l == "fr" ? DIC_FR : DIC_PT,
    ok = (dicCarga9.ok = dicCarga9.ok || {});
  if (ok[l] || !dicCarga9.listo) return D;
  ok[l] = 1;
  const el = document.getElementById("dic-" + l);
  if (!el) return D;
  try {
    Object.assign(D, JSON.parse(el.textContent));
  } catch (e) {}
  el.remove();
  X2C.clear();
  TRCX.clear();
  return D;
}
const XDIC = () => (CFG.idi == "fr" ? dicCarga9("fr") : CFG.idi == "pt" ? dicCarga9("pt") : null);''', 1, 'XDIC')
h = rep(h, '''

aplicarCfg();
idiomaIni();
if (!/[?&]bot=/.test(location.search)) mn();''', '''

dicCarga9.listo = 1;
aplicarCfg();
idiomaIni();
if (!/[?&]bot=/.test(location.search)) mn();''', 1, 'listo')

def inerte(txt):
    # JSON dentro de <script type="application/json">: sin "<" literal para que nunca cierre la etiqueta.
    return txt.replace('<', '\\u003c')

def con_datos(h, D):
    datos = ''.join(f'<script type="application/json" id="dic-{l}">{inerte(json.dumps(D[l], ensure_ascii=False, separators=(",", ":")))}</script>' for l in ('fr', 'pt'))
    # En <head>: los traductores de la interfaz recorren los textos de <body> y no deben tocar estos datos.
    return rep(h, '</style></head><body><div id="app">', '</style>' + datos + '</head><body><div id="app">', 1, 'json')

# Lo que el propio arranque ya construye sin los literales (etapa B0) no hace falta repetirlo en el JSON.
etapa_b0 = OUT + '.etapaB0.html'
open(etapa_b0, 'w', encoding='utf-8').write(con_datos(h, {'fr': {}, 'pt': {}}))
RESID = capturar(etapa_b0, OUT + '.dicB0')
DELTA = {}
for l in ('fr', 'pt'):
    extra = [k for k in RESID[l] if k not in FINAL[l]]
    assert not extra, f'{l}: claves que el original no tiene: {extra[:5]}'
    DELTA[l] = {k: v for k, v in FINAL[l].items() if RESID[l].get(k) != v}
    print(f'{l}: final {len(FINAL[l])} claves, arranque {len(RESID[l])}, en el JSON {len(DELTA[l])}')
h = con_datos(h, DELTA)

# ------------------------------------------------------------------ 9 y 11. cabecera: registro de errores, íconos y datos para compartir
import base64
import hashlib
import shutil
import tempfile

ICON = tempfile.mkdtemp(prefix='iconos-')
r = subprocess.run(['node', os.path.join(AQUI, 'generar_iconos.js'), etapa_a, ICON], capture_output=True, text=True)
print(r.stdout.strip(), r.stderr.strip())
if r.returncode:
    sys.exit('no se pudieron generar los íconos')
dataurl = lambda n: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(ICON, n), 'rb').read()).decode()

# Se instala antes que el juego para anotar también los errores del arranque.
REGISTRO = '''<script>(function(){var K="ia16.errores";function g(t,m,s){try{var c={};try{c=window.__ctx9?window.__ctx9():{}}catch(e){}m=String(m==null?"":m).slice(0,300);s=String(s==null?"":s).slice(0,600);var L=[];try{L=JSON.parse(localStorage.getItem(K)||"[]");if(!Array.isArray(L))L=[]}catch(e){}var u=L[L.length-1];if(u&&u.m===m&&u.s===s){u.n=(u.n||1)+1;u.f=Date.now()}else L.push({f:Date.now(),t:t,m:m,s:s,v:c.v,idi:c.idi,y:c.y,w:c.w,p:c.p});localStorage.setItem(K,JSON.stringify(L.slice(-30)))}catch(e){}}window.__err9=g;addEventListener("error",function(e){if(!e||!e.message)return;g("error",e.message,(e.filename?String(e.filename).split("/").pop():"")+":"+e.lineno+":"+e.colno+(e.error&&e.error.stack?"\\n"+String(e.error.stack).split("\\n").slice(1,5).join("\\n"):""))});addEventListener("unhandledrejection",function(e){var r=e&&e.reason;g("promesa",r&&r.message?r.message:r,r&&r.stack?String(r.stack).split("\\n").slice(1,5).join("\\n"):"")})})();</script>'''
SITIO = os.environ.get('SITIO', '').strip()
if SITIO and not SITIO.endswith('/'):
    SITIO += '/'
desc = re.search(r'<meta name="description" content="([^"]*)">', h).group(1)
cab = (f'<link rel="icon" type="image/png" sizes="32x32" href="{dataurl("icono-32.png")}">'
       f'<link rel="apple-touch-icon" href="{dataurl("apple-touch-icon.png")}">'
       '<meta property="og:type" content="website"><meta property="og:title" content="INDUSTRY ART">'
       f'<meta property="og:description" content="{desc}">'
       f'<meta property="og:image" content="{SITIO}compartir.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
       + (f'<meta property="og:url" content="{SITIO}">' if SITIO else '')
       + '<meta name="twitter:card" content="summary_large_image">' + REGISTRO)
h = rep(h, '<style id="fuente">', cab + '<style id="fuente">', 1, 'cabecera')

open(OUT, 'w', encoding='utf-8').write(h)

# ------------------------------------------------------------------ 11. carpeta web
if WEB:
    os.makedirs(WEB, exist_ok=True)
    # En la web, el ícono de Apple es un archivo (Safari lo usa al «Añadir a pantalla de inicio») y el juego no lo reemplaza.
    hw = rep(h, f'<link rel="apple-touch-icon" href="{dataurl("apple-touch-icon.png")}">', '<link rel="apple-touch-icon" href="apple-touch-icon.png">', 1, 'web apple')
    hw = rep(hw, '''document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach((l) => (l.href = u));''',
             '''document.querySelectorAll('link[rel="icon"]').forEach((l) => (l.href = u));''', 1, 'web apple js')
    open(os.path.join(WEB, 'index.html'), 'w', encoding='utf-8').write(hw)
    imgs = ['icono-192.png', 'icono-512.png', 'icono-maskable-512.png', 'apple-touch-icon.png', 'compartir.png']
    for n in imgs:
        shutil.copyfile(os.path.join(ICON, n), os.path.join(WEB, n))
    man = {
        'name': 'INDUSTRY ART', 'short_name': 'Industry Art', 'description': desc, 'lang': 'es',
        'start_url': './', 'scope': './', 'display': 'standalone',
        'background_color': '#efe9d6', 'theme_color': '#efe9d6', 'categories': ['games', 'simulation'],
        'icons': [
            {'src': 'icono-192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'any'},
            {'src': 'icono-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'},
            {'src': 'icono-maskable-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
        ],
    }
    open(os.path.join(WEB, 'manifest.webmanifest'), 'w', encoding='utf-8').write(json.dumps(man, ensure_ascii=False, indent=2) + '\n')
    huella = hashlib.sha256(h.encode('utf-8')).hexdigest()[:10]
    sw = open(os.path.join(AQUI, 'sw.js'), encoding='utf-8').read().replace('__CACHE__', f'industry-art-1.0-{huella}')
    open(os.path.join(WEB, 'sw.js'), 'w', encoding='utf-8').write(sw)
    print('carpeta web:', WEB, sorted(os.listdir(WEB)))
shutil.rmtree(ICON, ignore_errors=True)

if os.environ.get('PULIDO_KEEP') is None:
    os.remove(etapa_a)
    os.remove(etapa_b0)
print('escrito', OUT, len(h.encode('utf-8')), 'bytes')
