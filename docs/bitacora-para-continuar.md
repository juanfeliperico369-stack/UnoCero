# INDUSTRY ART · Bitácora para continuar el desarrollo

Para quien siga el proyecto, sea una persona o una IA. Resume el estado, cómo está hecho, cómo compilarlo y probarlo, y qué falta del último pedido del autor (OneZero).

## 1. Estado actual

| Entrega | Versión | Dónde | Notas |
|---|---|---|---|
| Juego oficial | 1.6 (versionCode 11) | `industry-art/index.html`, `entregables/industry-art-1.6.apk/.aab` | Solo ficción. Es lo que puede ir a Google Play. |
| Edición real | 1.0 (versionCode 10) | Archivos privados del autor (`industry-art-real-1.0.html/.apk/.aab`), **no** están en el repositorio | El juego oficial 1.5.3 más un paquete de mundo real que se carga solo al empezar o abrir una partida y se **suma** a la ficción. Es para pruebas del autor. Para rehacerla sobre la 1.6 hay que usar versionCode 12 o más. |

- **Firma:** el APK y el AAB se firman con la llave de subida `industryart-subida.jks`, que guarda el autor y nunca va al repositorio (huella SHA-256 `5f:f5:8e:ce:46:49:95:d1:…:26:f6`).
- **Número de versión:** la 1.6 usa el versionCode 11 (el 10 es de la edición real). La próxima versión, oficial o real, debe usar el **12 o más**; si no, el teléfono no la instala encima.

## 2. Cómo está hecho

- **Un solo archivo:** todo el juego es `industry-art/index.html`, de unas 74.000 líneas legibles (no minificado). La app de Android lo copia a sus assets en cada compilación (`android/app/build.gradle`).
- **Generación del HTML:** el archivo se genera con un build en Python (`build.py`). El paquete `fuentes-build-industry-art.zip` del autor trae `game.js` (base), los módulos (`mejoras.js`, `ronda5.js` a `ronda14.js`, etc.), los parches (`ronda4.py` a `ronda14.py`, `j_modes.py`; `ronda12.py` inyecta `ronda12.js` y `ronda13.js`) y las pruebas.
- **Rutas:** `build.py` espera las fuentes en `/tmp/ia` y escribe en `/home/user/UnoCero/industry-art/index.html`; ajusta `SRC` y la ruta de salida si cambias de carpeta. Se ejecuta con `python3 -I build.py`.
- **Parches J:** son reemplazos exactos `(texto viejo, texto nuevo, cantidad)` sobre `game.js`. Si el texto no aparece las veces indicadas, el build se detiene con error.
- **Módulos nuevos:** se inyectan antes de la línea `let ORD0 = { t: null, n: null, ro: null };`.
- **Renombrado:**
  - Después del build, un renombrador quita los números de versión de los nombres internos (la lista queda en `renames.txt`). En las pruebas dentro del navegador hay que usar el nombre final; por ejemplo, `BAN40` pasa a ser `BANCOS`, `pro40H` pasa a ser `proH` y `fest12H` pasa a ser `festH`.
  - **Cuidado:** el renombrador no cambia los nombres escritos dentro de atributos HTML como `onchange="X12.i=…"`. Usa nombres sin números para esas variables (por ejemplo `FESTSEL`) o una acción `ACT`.
- **Sin las fuentes:** también se puede editar `industry-art/index.html` directamente; las funciones globales se pueden envolver (`f0 = f; f = function () { … f0.apply(this, arguments) … }`).
- **Ganchos útiles:** `on("semana" | "mes" | "anual", fn)`, `V37.prod/mods/ventas/costo/ficha` (en el HTML final, `GANCHOS`), `ACT["accion"] = (v) => …` para los botones (`bt("accion", valor, texto, "a")`) y `pg()` para volver a dibujar.
- **Idiomas:**
  - `L4(es, en, fr, pt)` devuelve el texto en el idioma activo.
  - Las ayudas se agregan con `Object.assign(TX.es.ayuda, {clave: [título, texto]})` más filas `[es, en, fr, pt]` en `TR_EXTRA`. El botón ⓘ es `bi("clave")`.
- **Pantalla fija al tocar:** está en `scxGuarda`, `scxFija` y `scxFijaM` (módulo de mejoras). Todo botón nuevo con `data-a` queda cubierto. Si un botón mueve una tarjeta a otra sección, no hay que hacer nada.
- **Partidas viejas:** `cargarS` se envuelve para migrar (ver `migra6`, `migra7`, `filSync8`). Todo campo nuevo debe tolerar `undefined`.

## 3. Cómo probar

- **Navegador:** se usa Playwright con Chromium. Las pruebas cargan el HTML y le inyectan el bot de pruebas (`qa_bot.js`, generado por el build) con `QA=/ruta/qa_bot.js node prueba.js /ruta/index.html`.
- **Pruebas en el zip:**
  - `err6.js`: el juego carga sin errores.
  - `compat.js`: una partida vieja abre en la versión nueva.
  - `fuzz.js`: toques al azar.
  - `bot.js`: partidas largas.
  - `salto6.js` y `rr9.js`: la pantalla no se mueve al tocar.
  - `t14`, `t17`, `t19`, `t20`, `t23`, `t24` y `t26`: funciones de cada ronda y auditoría de lógica.
  - `t28`: festival, presupuesto, especialidad, prensa, premios, navegación, relaciones, cuerpo, forma y minijuegos.
  - `t29`: redes de distribución y capital automático.
  - `t30`: ingresos de las sedes.
  - Para probar el botón de volver hay que hacer clic de verdad en el elemento (`el.click()`), porque la pila de fichas se arma con el botón tocado.
- **Android:** desde `android/`, `gradle assembleRelease bundleRelease`. Necesita `android/keystore.properties` (ruta y contraseña de la llave) y `android/local.properties` (`sdk.dir`), que no están en el repositorio. Después verifica la firma con `apksigner verify --print-certs` y que `assets/index.html` del APK sea igual al HTML.
- **Edición real:** se arma copiando el HTML oficial e insertando, antes de `</body>`, un `<script>` con el paquete `.iamundo` y una función que llama `mundoImporta(PACK, false)` en la primera semana y al cargar una partida. Hay que cambiar `VERN` a `"1.0 real"`. Para el APK se copia temporalmente sobre `industry-art/index.html`, se compila con versionCode 10 y versionName `1.0`, y luego se restaura el repositorio sin hacer commit.

## 4. Qué se hizo en la 1.6 y qué falta

Hecho en la 1.6 (detalle en `docs/reporte-1.6.md`):
- **Festivales:** crear obras para un festival, en modo automático o detallado (`ronda12.js`, `festH`).
- **Presupuesto anual por medio:** con misiones, aporte de filiales y producción de talentos firmados y oficina (`preNuevo`, `preH`). Los talentos firmados se orientan a un medio con `t.esp12`.
- **Tu prensa:** revista, periódico, agencia, noticiero y redes (`S.pren12`).
- **Ficha del talento** (`ronda13.js`):
  - premios ganados (`t.aw13`: `[año, id del premio en EV, obra, ganó]`);
  - relaciones agrupadas, con una sola pareja viva y «expareja»;
  - texto de clasificación más claro;
  - botón de volver con pila (`STK`) y posición guardada.
- **Avatar:**
  - estatura (`av.est`) y complexión (`av.cx`);
  - rutina física (`S.fit13`, `t.fx13`);
  - minijuegos de práctica (`t.xp13`, `S.mg13w`).
- **Redes de distribución por medio** (`ronda14.js`, `S.dst14`), capital automático para filiales (`S.fpAuto`) e ingresos de las sedes (`sdIng`).

Pendiente, en orden sugerido:

1. **Ampliar el contenido real (solo en la edición real).**
   - La meta del autor:
     - por cada medio y en todo el mundo, no solo Hollywood y Bollywood: 10 estudios grandes, 20 medianos y 30 menos conocidos;
     - para cada estudio, sus obras mejores, medianas y de culto, con franquicias, personajes, figuras e hitos.
   - El formato está en el `LEEME.md` del paquete de mundo (`estudios`, `talentos`, `obras`) y lo lee `mundoImporta`.
   - En la edición real también se pueden poner los nombres reales de las redes de distribución, que en la oficial son ficticios.
2. **Rehacer la edición real sobre la 1.6**, con versionCode 12 o más, para que tenga las funciones nuevas.
3. **Derechos de autor antes de publicar.**
   - La versión de Google Play queda solo con ficción.
   - El contenido real va como paquete `.iamundo` aparte.
   - Las marcas comerciales (nombres de estudios, consolas y tiendas) son el riesgo mayor en una tienda.
4. **Ideas que quedan de antes:**
   - bandeja de pendientes;
   - copia de seguridad automática;
   - rentabilidad por división;
   - balance de música antes de 1900 y de videojuegos después de 2150.
   - El detalle está en `docs/sugerencias-y-lanzamiento.md`.

## 5. Avisos

- No borrar ni reemplazar lo de ficción (festivales, premios, talentos, rivales): el autor quiere que lo real se **sume**.
- Mantener los cuatro idiomas en todo texto nuevo.
- Cada versión nueva lleva su informe en `docs/` (ver `reporte-1.4.md` y `reporte-1.5.md`) y sus notas de tienda de 500 caracteres o menos en `docs/ficha-tienda.md`.
