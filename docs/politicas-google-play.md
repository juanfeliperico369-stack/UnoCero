# INDUSTRY ART · Revisión de políticas de Google Play

Revisión hecha el 1 de noviembre de 2026 sobre la versión 1.1. Es una guía práctica, no asesoría legal: Google decide en cada revisión y sus reglas cambian, así que vale la pena releer los enlaces del final antes de enviar la app.

## Resumen

| Tema | Estado | Qué hacer |
|---|---|---|
| Nivel de API | Cumple | Nada: la app ya apunta a Android 16 (API 36). |
| Permisos | Cumple | Nada: solo usa permisos normales, sin formulario de permisos. |
| Seguridad de datos | Cumple | Declarar «no recopila ni comparte datos». |
| Público objetivo | Requiere una decisión | Elegir 13 años o más por el casino simulado. |
| Clasificación de contenido | Requiere el cuestionario | Responder con lo que se explica abajo. |
| Contenido generado por usuarios | Cumple | El modo LAN ya permite bloquear a otros jugadores. |
| Referencias a marcas, premios y personas reales | Riesgo bajo, aceptado | Se dejan como referencias, con aviso en el juego y en la ficha. |
| Verificación de desarrollador | Requiere tu identidad | Completar la verificación de la cuenta de Play Console. |
| Prueba cerrada | Obligatoria en cuentas personales | 12 personas durante 14 días seguidos. |

## 1. Nivel de API

Desde el 31 de agosto de 2026, las apps nuevas y sus actualizaciones deben apuntar a Android 16 (API 36) o más. `android/app/build.gradle` ya usa `compileSdk 36` y `targetSdk 36`, con `minSdk 24` (Android 7.0 en adelante).

## 2. Permisos

`AndroidManifest.xml` pide solo dos permisos, los dos de tipo normal, que Android concede sin preguntar:

- `INTERNET`: abrir conexiones con los otros teléfonos de la sala LAN. El juego no se conecta a ningún servidor.
- `CHANGE_WIFI_MULTICAST_STATE`: anunciar y encontrar salas en la red Wi-Fi local.

No pide ubicación, contactos, cámara, micrófono, almacenamiento ni permisos sensibles, así que no hace falta el formulario de declaración de permisos.

## 3. Seguridad de datos (Data safety)

Respuesta: **la app no recopila ni comparte datos de usuario.** Por qué:

- Las partidas, ajustes, ideas y logos se guardan solo en el teléfono. Google no exige declarar lo que se procesa solo en el dispositivo.
- En el modo LAN, el nombre del estudio, el logo, los títulos de las obras y las estadísticas viajan directo de un teléfono a otro dentro de la misma red, sin servidores. Cada mensaje va cifrado de extremo a extremo con AES-GCM, con una llave que sale del código de 6 dígitos de la sala (PBKDF2 con 120.000 rondas). Solo los teléfonos de la sala tienen esa llave; tú como desarrollador no puedes leerlos. Google no considera «recopilados» los datos cifrados de extremo a extremo.
- La conexión por código (WebRTC) no usa servidores STUN ni TURN: solo funciona entre dispositivos de la misma red.
- Exportar un `.iasave` o un `.iapack` lo decide y lo hace el jugador, y Google lo trata como transferencia iniciada por el usuario.
- No hay anuncios, analíticas, cuentas ni bibliotecas de terceros.

Si algún día añades anuncios, analíticas, guardado en la nube o logros de Play Games, hay que actualizar este formulario y la política de privacidad antes de publicar esa versión.

## 4. Público objetivo y casino simulado

El juego tiene un casino con dinero ficticio. Google permite los juegos de apuestas simuladas, pero:

- No pueden ofrecer premios en dinero real ni comprar fichas con dinero real. El juego cumple: no tiene compras.
- Si eliges un público que incluya menores de 13 años, la app entra en la política de Familias, con reglas mucho más estrictas, y el casino podría impedir la aprobación.

Por eso, en *Contenido de la app → Público objetivo y contenido*, elige solo **13–15, 16–17 y 18 o más**. Cuando pregunte si la app podría atraer a niños, responde que no está pensada para ellos. La política de privacidad del juego ya dice «13 años o más».

## 5. Clasificación de contenido (IARC)

En *Contenido de la app → Clasificación de contenido*, categoría **Juego**. Respuestas honestas según lo que hay en el juego:

| Pregunta | Respuesta | Detalle |
|---|---|---|
| Violencia | No hay violencia mostrada | Solo menciones en texto: géneros como terror o bélico y hechos históricos. |
| Sexo o desnudos | No hay imágenes | Hay referencias en texto: el género «erótico» y el nivel de contenido de las obras ficticias, siempre con personajes adultos. |
| Lenguaje soez | No | |
| Drogas, alcohol o tabaco | Solo referencias en texto | En hechos históricos y en temas de las obras. |
| Apuestas simuladas | **Sí** | Casino con dinero ficticio. |
| Interacción entre usuarios | **Sí** | Modo LAN: nombres de estudio, logos y reacciones prediseñadas; no hay chat libre. |
| Comparte ubicación | No | |
| Compras digitales | No | |

Lo esperable es una clasificación de **12+ como mínimo (PEGI 12, Teen de ESRB)** por las apuestas simuladas; en algunos países puede salir más alta. La cifra final la asigna IARC en cada país, y es independiente del público objetivo que elijas.

## 6. Contenido generado por usuarios

Lo único que un jugador muestra a otros es el nombre de su estudio, su logo y los títulos de sus obras, y solo dentro de una sala LAN con código. Google pide que, si hay contenido de otros usuarios, se pueda bloquear o denunciar. En la versión 1.1 cada estudio de la sala tiene el botón **Bloquear**: dejas de ver su nombre, su logo, sus obras y sus mensajes, también en salas futuras, y si lo habías traído a tu mundo como rival, se quita. No hay chat de texto libre: solo reacciones fijas.

## 7. Referencias a obras, premios, marcas y personas reales

Tu decisión es mantenerlas como referencias. Así queda el riesgo:

- **Hechos históricos, obras y personas reales** en la línea de tiempo, las curiosidades y el Salón: es información histórica y cultural, de uso habitual en juegos de simulación.
- **Premios con nombre real o casi real** (Premio de la Academia, Emmy Shows Awards, Tony, The Game Award, León de Oro, Palma de Oro, Oso de Oro): son marcas de terceros. La política de propiedad intelectual de Google prohíbe usar marcas de una forma que haga creer que existe una relación con su dueño. Para reducir el riesgo:
  - El juego muestra un aviso en Créditos: no está afiliado a ellos ni tiene su respaldo.
  - La descripción de la tienda repite ese aviso.
  - Las capturas de la tienda no muestran nombres de premios reales.
  - No uses esos nombres en el título, la descripción breve ni las etiquetas.
- Si un titular de derechos presentara una queja, Google te avisaría y bastaría con renombrar ese premio en una actualización. Es un riesgo bajo y reversible.

## 8. Verificación de desarrollador

Google exige que los desarrolladores verifiquen su identidad y registren sus apps. Desde el 30 de septiembre de 2026 se aplica a los teléfonos de Brasil, Indonesia, Singapur y Tailandia, y desde 2027 en el resto del mundo. Para apps de Google Play basta con registrarlas en Play Console: al crear la cuenta y completar la verificación de identidad que pide Play Console, la app queda registrada. Si vas a repartir el APK por fuera de Google Play, ese APK también debe venir de una cuenta verificada para instalarse en esos países sin pasos extra.

## 9. Prueba cerrada para cuentas personales

Las cuentas personales creadas desde noviembre de 2023 deben hacer una prueba cerrada con al menos **12 personas que estén inscritas durante 14 días seguidos** antes de pedir el acceso a producción. Las cuentas de organización (con número D-U-N-S) no tienen este requisito. Los pasos están en `plan-de-lanzamiento.md`.

## 10. Ficha de la tienda

Los textos de `ficha-tienda.md` evitan lo que la política de metadatos no permite: no dicen «el mejor» ni «n.º 1», no repiten palabras clave, no usan marcas de terceros y no prometen nada que el juego no tenga.

## Fuentes

- [Requisito de nivel de API de Google Play](https://developer.android.com/google/play/requirements/target-sdk) y [ayuda de Play Console sobre el nivel de API](https://support.google.com/googleplay/android-developer/answer/11926878)
- [Requisitos de prueba para cuentas personales nuevas](https://support.google.com/googleplay/android-developer/answer/14151465)
- [Sección de seguridad de datos en Google Play](https://support.google.com/googleplay/answer/11416267)
- [Verificación de desarrolladores de Android: anuncio de junio de 2026](https://android-developers.googleblog.com/2026/06/android-developer-verification.html) y [calendario de la verificación](https://support.google.com/android-developer-console/answer/16650243)
- [Guías de verificación de desarrolladores](https://developer.android.com/developer-verification/guides)
