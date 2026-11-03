# INDUSTRY ART · Bitácora para continuar el desarrollo

Para quien siga el proyecto, sea una persona o una IA. Resume el estado, cómo está hecho, cómo compilarlo y probarlo, y qué falta del último pedido del autor (OneZero).

## 1. Estado actual

Hay **una sola versión**, la definitiva, y sobre ella se sigue trabajando. No hay ediciones aparte.

| Versión | versionCode | Dónde |
|---|---|---|
| 1.6.6 | 17 | `industry-art/index.html` y `entregables/industry-art-1.6.6.apk/.aab` |

- **Edición real retirada:** la «edición real 1.0» de prueba (versionCode 10) que existió antes queda retirada. Lo real que el autor quiere se agregará más adelante dentro de esta misma versión.

- **Firma:** el APK y el AAB se firman con la llave de subida `industryart-subida.jks`, que guarda el autor y nunca va al repositorio (huella SHA-256 `5f:f5:8e:ce:46:49:95:d1:…:26:f6`).
- **Número de versión:** la 1.6.6 usa el versionCode 17. La próxima versión debe usar el **18 o más**; si no, el teléfono no la instala encima.

## 2. Cómo está hecho

- **Un solo archivo:** todo el juego es `industry-art/index.html`, de unas 74.000 líneas legibles (no minificado). La app de Android lo copia a sus assets en cada compilación (`android/app/build.gradle`).
- **Generación del HTML:** el archivo se genera con un build en Python (`build.py`). El paquete `fuentes-build-industry-art.zip` del autor trae `game.js` (base), los módulos (`mejoras.js`, `ronda5.js` a `ronda16.js`, etc.), los parches (`ronda4.py` a `ronda16.py`, `j_modes.py`; `ronda12.py` inyecta `ronda12.js` y `ronda13.js`) y las pruebas.
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
  - `t31`: rescate de rivales, estudios nuevos y ficha del avatar.
  - `t32` y `t33`: renovación de temporadas.
  - `t34` y `t35`: buscador y personajes de franquicias.
  - `t36`: encomendar desde el creador.
  - `t37`: guiones comprados.
  - `t38`: proyección para la prensa.
  - `t40`: archivo, Material, encargo con medio y ceremonias.
  - `t41`: bandeja y panel.
  - `t42`: parejas.
  - `t43`: energía del avatar.
  - `t44`: novedades de la 1.6.3.
  - `t45`: lanzamiento encomendado y ediciones físicas.
  - `t46`: teatro y absorción de filiales.
  - `t47`: reabrir filial y orden de Distribución.
  - `t48`: límite de ofertas.
  - Para probar el botón de volver hay que hacer clic de verdad en el elemento (`el.click()`), porque la pila de fichas se arma con el botón tocado.
- **Android:** desde `android/`, `gradle assembleRelease bundleRelease`. Necesita `android/keystore.properties` (ruta y contraseña de la llave) y `android/local.properties` (`sdk.dir`), que no están en el repositorio. Después verifica la firma con `apksigner verify --print-certs` y que `assets/index.html` del APK sea igual al HTML.
- **Contenido real:** existe un importador (`mundoImporta`) y un paquete de mundo con 92 estudios, 281 talentos y 188 obras, guardado aparte por el autor. Cuando se agregue lo real, debe ir dentro de esta misma versión: incluido en el juego o como paquete `.iamundo` que se importa en Estudio → Editor, nunca como una aplicación distinta.

## 4. Qué se hizo en la 1.6 y qué falta

Hecho en la 1.6 y la 1.6.1 (detalle en `docs/reporte-1.6.md`):
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
- **1.6.1** (`ronda15.js`):
  - aviso de quiebra (`r.av15`) y rescate de rivales como filial o con inversión;
  - reapertura de estudios quebrados;
  - estudios nuevos cada año, a veces fundados por talentos (`r.fund15`);
  - ficha completa del avatar en su pestaña y una tarjeta del avatar en el catálogo de talentos.
  - renovación automática de temporadas (`S.ren16`, `renLote`).
  - todos los personajes en la franquicia (`frPjs` incluye obras en producción) y buscador de franquicias (`FRBUSCA`).
  - botón «Encomendar» al final del creador (`wzenc`, reutiliza `encomiendaM`) y guardado automático de guiones comprados (`gmb` llama a `idGuarda`).
  - la ventana de prensa solo sale para obras propias (`obraMia`, filtra la cola `S.prj`); la proyección (`P.rev`) se ve en la ficha de cada obra.
  - buscador del archivo (`ARCQ`, en `ronda8.js`);
  - Material en subpestañas (`MTTAB`; el HTML de `mtV` se separa por cada `<h3 class="sec">`);
  - elegir el medio al encomendar un material (`mtenc`);
  - ceremonias solo con obras propias (`awards` filtra `S.cer`; cada nominado propio guarda `p`).
- **1.6.2** (`ronda16.js`):
  - bandeja de pendientes (`pend16`, que reemplaza a `tareas`; contador `data-n16` en el botón del menú);
  - panel de automatización (`auto16M`, acción `au16`);
  - parejas del avatar como situación (evento `ROM16`, estado `S.rom16`, rechazos en `S.rom16no`);
  - regla de parejas (`relHet13` en `relLibre13`) y migración `rom16Mig`.
- **1.6.3** (en `ronda16.js`, salvo lo indicado):
  - `AUTOC16` y `sinAvatar16`: los automáticos no usan al avatar;
  - fin natural de las series (`arco16`, `finSerie16`, en `ronda15.js`);
  - postulación automática a festivales (`S.fpst16`) y bono de jurado (`fesB16`);
  - reestreno automático una vez al año por medio (`ronda9.js`);
  - encargo a talentos desde el creador (`talW16M`, en `ronda15.js`);
  - ofertas por franquicia en la bandeja e interruptor `F.noOf16`;
  - proponer una relación (`rom16p`).
- **1.6.4** (`ronda16.js`): lanzamiento encomendado (`dlzM16`, `P.dl16`) y ediciones físicas (`FIS16`, `S.fis16`, `fisH16` en `facH5`).
- **1.6.5** (`ronda16.js`): grabaciones de teatro (medio 3 en `FIS16`) y cierre con absorción de filiales (`absRes16`, `fab16` y `fab16y`; la filial queda con `r.abs16`).
- **1.6.6**:
  - reabrir una filial absorbida (`reab16`, en `ronda16.js`);
  - las redes de distribución se insertan después de la tarjeta del mapa (envoltura de `vDist` en `ronda14.js`).
  - límite de ofertas por franquicias (`foOk16`, `S.foN16`, `FON16`).

Pendiente, en orden sugerido:

1. **Agregar y ampliar el contenido real dentro de esta misma versión.**
   - La meta del autor:
     - por cada medio y en todo el mundo, no solo Hollywood y Bollywood: 10 estudios grandes, 20 medianos y 30 menos conocidos;
     - para cada estudio, sus obras mejores, medianas y de culto, con franquicias, personajes, figuras e hitos.
   - El formato está en el `LEEME.md` del paquete de mundo (`estudios`, `talentos`, `obras`) y lo lee `mundoImporta`.
   - Las redes de distribución tienen nombres ficticios. Si el autor quiere nombres reales, se pueden agregar junto con el resto del contenido real.
2. **Derechos de autor antes de publicar.**
   - La versión de Google Play queda solo con ficción.
   - El contenido real va como paquete `.iamundo` aparte.
   - Las marcas comerciales (nombres de estudios, consolas y tiendas) son el riesgo mayor en una tienda.
3. **Ideas que quedan de antes:**
   - copia de seguridad automática;
   - rentabilidad por división;
   - balance de música antes de 1900 y de videojuegos después de 2150.
   - El detalle está en `docs/sugerencias-y-lanzamiento.md`.

## 5. Avisos

- No borrar ni reemplazar lo de ficción (festivales, premios, talentos, rivales): el autor quiere que lo real se **sume**.
- Mantener los cuatro idiomas en todo texto nuevo.
- Cada versión nueva lleva su informe en `docs/` (ver `reporte-1.4.md` y `reporte-1.5.md`) y sus notas de tienda de 500 caracteres o menos en `docs/ficha-tienda.md`.
