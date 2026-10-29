# INDUSTRY ART 1.0

Simulador de un estudio de arte de 1700 a 2300: cine, series, videojuegos, teatro, música y libros. Creado por OneZero · Infinite Tree.

- `dist/INDUSTRY_ART.html`: el juego completo en un solo archivo; funciona sin conexión.
- `dist/INDUSTRY_ART_1.0.aab`: la app para Google Play.
- `dist/INDUSTRY_ART_1.0.apk`: la app para instalar en Android.
- `BITACORA.md`: qué trae esta versión, cómo se probó y la lista para el lanzamiento.

## Desarrollo
- `src/base.html`: el motor y los módulos de la V40.
- `src/mod/*.js` y `src/mod/*.css`: los módulos de la 1.0, que se cargan en orden alfabético.
- `python3 tools/build.py`: arma `dist/INDUSTRY_ART.html`.
- `android/`: la app Android (una pantalla con el juego, sin anuncios ni servicios externos).
- `tools/android.sh`: arma y firma el .apk y el .aab.

## Pruebas (necesitan Node y Playwright con Chromium)
- `node tools/run.js '<código>'`: abre el juego y ejecuta código. Por ejemplo, `node tools/run.js 'await BOT.correr({y0:1990,y1:2010}); return 1'` juega una partida automática.
- `node tools/monkey.js <año inicial> <año final> <ancho> [es|en|fr|pt]`: prueba de estrés de la interfaz. Pulsa los botones de todas las pestañas y detecta errores y textos rotos.
- `node tools/cov2.js fr salida.txt`: lista los textos que siguen sin traducir en un idioma (pestañas, creador, ajustes y plan de salida).
- `node tools/estable.js fr salida.txt`: lista los textos que cambiarían si se tradujeran otra vez. Debe salir vacío: un texto inestable haría que la traducción automática de la pantalla no terminara nunca.
