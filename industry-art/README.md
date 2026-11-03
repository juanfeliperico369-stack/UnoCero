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

## Cómo se genera

```
python3 build/pulido_1_0.py <index-1.6.6.html> index.html
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

## Android

1. Copia `index.html` a `app/src/main/assets/index.html`.
2. En `app/build.gradle(.kts)`: `versionCode = 18` y `versionName = "1.0"`. La 1.6.6 publicada tiene `versionCode 17`;
   Play solo exige que el código suba, el nombre puede bajar a 1.0.
3. Genera el AAB firmado con tu clave de subida, como siempre.
