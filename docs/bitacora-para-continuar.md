# INDUSTRY ART · Bitácora para continuar el desarrollo

Para quien siga el proyecto, sea una persona o una IA. Resume el estado, cómo está hecho, cómo compilarlo y probarlo, y qué falta del último pedido del autor (OneZero).

## 1. Estado actual

| Entrega | Versión | Dónde | Notas |
|---|---|---|---|
| Juego oficial | 1.5.3 (versionCode 9) | `industry-art/index.html`, `entregables/industry-art-1.5.3.apk/.aab` | Solo ficción. Es lo que puede ir a Google Play. |
| Edición real | 1.0 (versionCode 10) | Archivos privados del autor (`industry-art-real-1.0.html/.apk/.aab`), **no** están en el repositorio | El juego oficial más un paquete de mundo real que se carga solo al empezar o abrir una partida y se **suma** a la ficción. Es para pruebas del autor. |

- **Firma:** el APK y el AAB se firman con la llave de subida `industryart-subida.jks`, que guarda el autor y nunca va al repositorio (huella SHA-256 `5f:f5:8e:ce:46:49:95:d1:…:26:f6`).
- **Número de versión:** la próxima versión oficial debe usar versionCode **11 o más**, porque la edición real ya ocupa el 10. Si no, el teléfono no la instala encima.

## 2. Cómo está hecho

- **Un solo archivo:** todo el juego es `industry-art/index.html`, de unas 74.000 líneas legibles (no minificado). La app de Android lo copia a sus assets en cada compilación (`android/app/build.gradle`).
- **Generación del HTML:** el archivo se genera con un build en Python (`build.py`). El paquete `fuentes-build-industry-art.zip` del autor trae `game.js` (base), los módulos (`mejoras.js`, `ronda5.js` a `ronda11.js`, etc.), los parches (`ronda4.py` a `ronda11.py`, `j_modes.py`) y las pruebas.
- **Rutas:** `build.py` espera las fuentes en `/tmp/ia` y escribe en `/home/user/UnoCero/industry-art/index.html`; ajusta `SRC` y la ruta de salida si cambias de carpeta. Se ejecuta con `python3 -I build.py`.
- **Parches J:** son reemplazos exactos `(texto viejo, texto nuevo, cantidad)` sobre `game.js`. Si el texto no aparece las veces indicadas, el build se detiene con error.
- **Módulos nuevos:** se inyectan antes de la línea `let ORD0 = { t: null, n: null, ro: null };`.
- **Renombrado:** después, un renombrador cambia nombres internos (lista en `renames.txt`). En las pruebas dentro del navegador hay que usar el nombre final; por ejemplo, `BAN40` pasa a ser `BANCOS` y `pro40H` pasa a ser `proH`.
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
- **Android:** desde `android/`, `gradle assembleRelease bundleRelease`. Necesita `android/keystore.properties` (ruta y contraseña de la llave) y `android/local.properties` (`sdk.dir`), que no están en el repositorio. Después verifica la firma con `apksigner verify --print-certs` y que `assets/index.html` del APK sea igual al HTML.
- **Edición real:** se arma copiando el HTML oficial e insertando, antes de `</body>`, un `<script>` con el paquete `.iamundo` y una función que llama `mundoImporta(PACK, false)` en la primera semana y al cargar una partida. Hay que cambiar `VERN` a `"1.0 real"`. Para el APK se copia temporalmente sobre `industry-art/index.html`, se compila con versionCode 10 y versionName `1.0`, y luego se restaura el repositorio sin hacer commit.

## 4. Qué falta del último pedido

Ya hecho en esta ronda:
- Idiomas que se aprenden con los años.
- Ficha personal desde la pestaña del avatar.
- Volver de una obra a la ficha del talento.
- Comprar todo sin bloqueo antimonopolio, con multas menos frecuentes y logros de monopolio.
- Reestrenos automáticos.
- Catálogo de filiales al instante.
- La edición real con el paquete existente: 92 estudios, 281 talentos y 188 obras.

Pendiente, en orden sugerido:

1. **Crear obras para un festival.**
   - Desde cada festival, un botón «Crear para este festival» con dos modos.
   - **Automático:** el juego elige medio, géneros, tono y equipo según lo que premia ese festival y arranca la producción con fecha de estreno antes de la gala.
   - **Detallado:** abre el creador con todo eso prellenado.
   - Los festivales y sus gustos ya existen (festivales abiertos a todos los medios desde la 1.1).
2. **Presupuesto anual por medio.**
   - En cada pestaña de medio (Cine, Series, Videojuegos, Teatro, Música, Editorial), un presupuesto anual que el jugador fija.
   - Con ese dinero, los talentos firmados de ese medio y el personal de oficina desarrollan proyectos solos.
   - Las filiales del medio ayudan: aportan presupuesto o producen.
   - Misiones de producción por medio, como las que ya existen para filiales (por ejemplo, «3 obras de terror este año»), con premio al cumplirlas.
   - Base existente: `facH5` (infraestructura por medio), `autoProd5`/`talAuto5` (producción automática), la propuesta mensual de talentos firmados en `ronda7.js` y `aceptaContrato6`.
3. **Firmar a todos los oficios con propósito.**
   - El contrato exclusivo ya sirve para cualquier talento, y desde la 1.5 proponen proyectos según su oficio (`medio6`).
   - Falta especializarlos:
     - guionistas de cine, series y videojuegos;
     - diseñadores de arte y de tecnología, más ligados a videojuegos;
     - directores, fotógrafos, editores y productores.
   - Cada uno debe proponer en su medio y gastar del presupuesto anual del punto 2.
4. **Nómina editorial de prensa.** Talentos contratados para escribir en tu propia revista, periódico, noticias, redes y prensa. Deben dar prestigio, fans o expectativa a tus estrenos y tener sueldo. La revista propia (negocio `rev`) y el periódico ya existen como base.
5. **Ampliar el contenido real (solo en la edición real).**
   - La meta del autor:
     - por cada medio y en todo el mundo, no solo Hollywood y Bollywood: 10 estudios grandes, 20 medianos y 30 menos conocidos;
     - para cada estudio, sus obras mejores, medianas y de culto, con franquicias, personajes, figuras e hitos.
   - El formato está en el `LEEME.md` del paquete de mundo (`estudios`, `talentos`, `obras`) y lo lee `mundoImporta`; los datos actuales salen del generador privado del autor.
   - Para hitos y figuras reales también se puede usar el Editor del juego (Estudio → Editor), que ya maneja contextos e hitos.
6. **Derechos de autor antes de publicar.**
   - El autor quiere probar la edición real y después decidir.
   - Recomendación: la versión de Google Play queda solo con ficción y el contenido real va como paquete `.iamundo` aparte, hecho por la comunidad, como se planeó en la 1.2.
   - Los nombres y títulos reales usados como referencia, con sinopsis propias y sin textos ni imágenes ajenas, son el riesgo menor. Las marcas comerciales (nombres de estudios) son el riesgo mayor en una tienda.

## 5. Avisos

- No borrar ni reemplazar lo de ficción (festivales, premios, talentos, rivales): el autor quiere que lo real se **sume**.
- Mantener los cuatro idiomas en todo texto nuevo.
- Cada versión nueva lleva su informe en `docs/` (ver `reporte-1.4.md` y `reporte-1.5.md`) y sus notas de tienda de 500 caracteres o menos en `docs/ficha-tienda.md`.
