# Industry Art · 1.0

`index.html` es el juego completo en un solo archivo (web y `assets/index.html` de la app de Android).

## Qué cambia respecto a la 1.6.6

| | 1.6.6 | 1.0 |
|---|---|---|
| Streaming › Catálogo con 5300 títulos | 1521 ms y 53 231 nodos por toque (cuelga o cierra la app en móviles) | 11 ms y 638 nodos |
| Negocio › Negocios (partida de 75 años) | 1010 ms | 27 ms |
| Obras › Editorial | 640 ms | 30 ms |
| Obras › Franquicias | 483 ms | 28 ms |
| Una semana simulada (partida de 75 años) | 52 ms (picos de 226) | 31 ms (picos de 131) |
| Arranque con CPU de móvil (Chromium, CPU ×4) | ~3,5 s · 18 MB de memoria | ~3,0 s · 15 MB |
| Autoguardado de una partida de 75 años (CPU ×4) | 3,4 s con la pantalla congelada | 1,4 s |

- **Crasheo del catálogo de streaming**: las listas del catálogo (visible, bodega, retirados) y «Tus licencias» del canal de TV
  se muestran por páginas («Ver 50 más») y el catálogo tiene un buscador (sin distinguir tildes).
- **Franquicias**: `frList` era cuadrática (franquicias × obras) y se llamaba cada semana y en varias pantallas.
  Ahora es lineal, y mientras se pinta una pantalla `frPs`, `frSold`, `frEst` y `frOrig6` usan un índice.
- **Guardado**: la suma de verificación y el gzip van en un Web Worker. Si el Worker no está disponible se usa el
  camino de antes. El formato de las partidas no cambia: las de la 1.6.6 cargan igual y al revés.
- **Diccionarios FR/PT**: 1,5 MB de literales salen del script y quedan como JSON inerte en `<head>`. Solo se leen
  si el idioma es francés o portugués.
- **Edificio animado de Inicio**: sus datos se calculan una vez por repintado en vez de en cada fotograma.
- **Versión**: «Edición 1.0» en la portada (`VERN = "1.0"`). La versión interna de las partidas (`VER = 40`) no cambia.
- **Autoguardado**: nueva opción «Cada 3 meses». El autoguardado espera a que se pinte la semana nueva, y si guardar
  ya tarda más de 400 ms en ese dispositivo (partidas muy largas), lo avisa una vez y lo explica en Ajustes.
- **Bóveda**: el catálogo dice cuántos lugares libres quedan (o cuántos títulos esperan en bodega) y, con 40 o más
  libres, pide un segundo toque para comprarla.
- **Informe de errores** (Ajustes, al final): los errores no capturados, también los del arranque, se anotan solo en
  el dispositivo (los últimos 30, con versión, idioma, fecha del juego y pantalla). Se pueden copiar o borrar. En la
  app, si no hay portapapeles, se guarda como `industry-art-errores.txt`.
- **Búsquedas sin tildes**: «jose» encuentra «José» en Talento, Obras, Archivo, Buscar, Taxonomía y dominio público.
- **Web**: favicon, ícono de Apple, Open Graph con imagen para compartir, manifiesto, service worker (abre sin
  conexión y al instante) y almacenamiento persistente para las partidas. Nada de esto se activa dentro de la app.

## Versión web

`web/` es la carpeta lista para subir tal cual a cualquier hosting estático con HTTPS (GitHub Pages, Netlify,
Cloudflare Pages…): `index.html`, `sw.js`, `manifest.webmanifest` y las imágenes. Chrome la reconoce como instalable.
Para que la imagen al compartir el enlace salga en todas las redes, genera el build con la dirección final:
`SITIO=https://tu-dominio/industry-art/ python3 build/pulido_1_0.py …` (pone `og:image` y `og:url` absolutos).
Activa la compresión gzip o brotli del hosting: el HTML pasa de 6,7 MB a unos 2,4 MB en la descarga.

## Cómo se genera

```
python3 build/pulido_1_0.py <index-1.6.6.html> index.html web
```

`pulido_1_0.py` aplica reemplazos exactos sobre el build publicado de la 1.6.6 y comprueba cuántas veces aparece
cada uno, así que falla si el código de partida no es el esperado. Necesita `node` con `playwright` (Chromium) para
capturar el contenido final de los diccionarios FR/PT.

## Cómo se verificó

```
node build/verificar_1_0.js <index-1.6.6.html> index.html <partida.json> [es,en,fr,pt]
```

- Las 56 pantallas, en los 4 idiomas, pintan exactamente el mismo HTML que en la 1.6.6 (salvo Streaming y Canal de TV,
  que cambian a propósito). Se probó con partidas de 2000, de 2065 y de 2065 con las 25 rivales como filiales.
- `DIC_FR` y `DIC_PT` quedan idénticos clave por clave.
- La simulación da el mismo estado después de 26 y 52 semanas. Solo cambia `S.mig6`, el sello de versión.
- El fuzz de QA (todas las pestañas y todos los botones) termina sin errores: 494 acciones.
- Guardar y cargar devuelve la misma partida, con Worker, sin Worker, con un Worker roto y sin `CompressionStream`.
- Cada función nueva tiene su prueba en el navegador (bóveda, autoguardado trimestral y diferido, aviso de guardado
  lento, registro y copia de errores, búsqueda sin tildes). La web se probó servida por HTTP: service worker activo,
  abre sin conexión y Chrome no reporta errores de instalabilidad.

## Android

La 1.0 se firma con una clave nueva (`industry-art-subida.jks`, alias `industryart`, certificado
`CN=OneZero, OU=Industry Art`, SHA-256 `FC:F2:B8:2F:…:25:6E`). Es la clave de subida para todas las
actualizaciones. **No está en el repositorio** (`.gitignore` bloquea `*.jks`): guárdala tú, con su contraseña,
en al menos dos sitios.

- `versionCode 18`, `versionName "1.0"`. Cada actualización necesita un `versionCode` mayor.
- Para publicar en Play Store se sube el AAB. Con la firma de apps de Play, Google firma lo que reciben los usuarios.
  Si algún día pierdes la clave de subida, se puede pedir que la restablezcan desde Play Console.

### Empaquetar una actualización

```
CLAVE_PW='…' python3 android/empaquetar.py --html index.html --codigo 19 --nombre 1.0.1 \
    --clave /ruta/industry-art-subida.jks --salida /ruta/salida
```

Parte de `android/plantilla/industry-art-base.aab`, que es el bundle de la app sin firma y sin el juego. Le mete el
`index.html`, cambia la versión del manifiesto (`android/ParcheManifiesto.java`), firma el AAB y saca del mismo AAB
el APK universal con bundletool, firmado con la misma clave. Si faltan bundletool o las build-tools, las descarga.
Necesita Java (con `javac` y `jarsigner`) y Python 3.

Si cambias el código nativo de la app (la Activity, los permisos o el ícono), genera la plantilla de nuevo desde
Android Studio. Es el AAB de release sin firmar, con `base/assets/index.html` quitado.
