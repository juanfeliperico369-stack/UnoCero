# INDUSTRY ART · Plan de lanzamiento en Google Play

Paso a paso para publicar la versión 1.5.3. Cuenta con unas 3 a 4 semanas en total: unos días para verificar la cuenta, 14 días de prueba cerrada obligatoria y hasta una semana de revisión.

Costo: **25 dólares**, un solo pago, para crear la cuenta de desarrollador. Publicar y actualizar después no cuesta nada.

## Paso 0 · Antes de empezar

1. **Guarda la llave de firma.** El archivo `industryart-subida.jks` y su contraseña se entregaron aparte y no están en el repositorio. Guárdalos en dos lugares seguros, por ejemplo una memoria USB y un gestor de contraseñas. Sin esa llave no podrás publicar actualizaciones.
2. **Prueba el APK en tu teléfono.** Instala `entregables/industry-art-1.5.3.apk` encima de la versión que ya tienes: usa el mismo paquete y la misma llave, así que tus partidas se conservan. Revisa:
   - Guardar y cargar.
   - Exportar e importar `.iasave`.
   - El botón atrás.
   - La música.
   - El modo LAN con un segundo teléfono en la misma red Wi-Fi.
3. **Publica la política de privacidad** con GitHub Pages (el repositorio es público, así que es gratis):
   1. En GitHub abre el repositorio → **Settings** → **Pages**.
   2. En *Source* elige **Deploy from a branch**.
   3. Elige la rama `main` y la carpeta `/docs`, y toca **Save**. Si todavía no uniste esta rama a `main`, puedes elegir la rama `ccr-7913d667-v3va8u`.
   4. En uno o dos minutos la política queda en `https://juanfeliperico369-stack.github.io/UnoCero/privacidad.html`. Ábrela para comprobarlo: muestra los cuatro idiomas.
4. **Prepara un correo de contacto** público para la tienda. Puede ser uno nuevo solo para el juego.

## Paso 1 · Crear la cuenta de desarrollador

1. Entra en [play.google.com/console/signup](https://play.google.com/console/signup) con la cuenta de Google que quieras usar para siempre con el juego.
2. Elige **Cuenta personal**. La de organización exige un número D-U-N-S; a cambio, no pide prueba cerrada.
3. Nombre de desarrollador público: **OneZero**.
4. Paga los 25 dólares.
5. Completa la **verificación de identidad**: documento oficial, teléfono y correo. Puede tardar de unas horas a unos días. Esta misma verificación cumple con el nuevo registro de desarrolladores de Android, obligatorio en Brasil, Indonesia, Singapur y Tailandia desde el 30 de septiembre de 2026 y en el resto del mundo desde 2027.
6. Con una cuenta personal, Google pide además verificar que tienes un teléfono Android real: usa la app de Play Console en tu celular.

## Paso 2 · Crear la app

En Play Console: **Crear app**.

- Nombre: `INDUSTRY ART: Imperio creativo`.
- Idioma predeterminado: **Español (Latinoamérica) – es-419**.
- Tipo: **Juego**. Gratis o de pago: **Gratis** (después no se puede pasar a pago).
- Acepta las declaraciones de políticas y de leyes de exportación de EE. UU.

## Paso 3 · Contenido de la app

En **Política → Contenido de la app**, completa cada tarjeta. Las respuestas y su porqué están en `politicas-google-play.md`.

| Tarjeta | Respuesta |
|---|---|
| Política de privacidad | `https://juanfeliperico369-stack.github.io/UnoCero/privacidad.html` |
| Anuncios | La app **no** contiene anuncios |
| Acceso a la app | Todas las funciones están disponibles sin acceso especial |
| Clasificación de contenido | Cuestionario IARC: categoría Juego, apuestas simuladas **sí**, interacción entre usuarios **sí** (modo LAN), lo demás solo en texto o no |
| Público objetivo | **13–15, 16–17 y 18+**. No está pensada para niños |
| Seguridad de datos | **No** recopila ni comparte datos |
| Funciones financieras, salud, noticias, apps del gobierno | No |

## Paso 4 · Ficha de la tienda

En **Hacer crecer → Presencia en la tienda → Ficha principal de la tienda**:

1. Copia nombre, descripción breve y descripción completa de `ficha-tienda.md`.
2. Sube los gráficos:
   - Ícono: `android/play/icono-512.png`.
   - Gráfico destacado: `android/play/grafico-destacado-1024x500.png`.
   - Capturas de teléfono: las 8 de `android/play/capturas/es/`.
3. Toca **Administrar traducciones** y agrega inglés, francés y portugués con sus textos. Para inglés usa `android/play/capturas/en/`.
4. En **Configuración de la tienda**:
   - Categoría: **Simulación**.
   - Correo de contacto.
   - Sitio web (opcional): `https://juanfeliperico369-stack.github.io/UnoCero/`.

## Paso 5 · Prueba cerrada (obligatoria, 14 días)

1. Consigue al menos **12 personas con teléfono Android**: familia, amigos, compañeros o comunidades de juegos. Mejor invita a 15 o 20, por si alguna se sale.
2. En **Pruebas → Prueba cerrada**, crea una pista (por ejemplo, «Amigos»).
3. En **Testers**, crea una lista de correos (deben ser cuentas de Google) o usa un Grupo de Google.
4. **Crear versión**:
   1. Acepta **Firma de apps de Google Play**. Google guarda la llave final y tu `.jks` queda como llave de subida.
   2. Sube `entregables/industry-art-1.5.3.aab`.
   3. Pega las notas de la versión de `ficha-tienda.md`.
5. Elige los países (puedes empezar con todos) y envía a revisión. La primera revisión puede tardar unos días.
6. Cuando se apruebe, comparte el **enlace de inscripción** con tus testers: cada uno abre el enlace, acepta ser tester e instala desde Play.
7. Deja que pasen **14 días seguidos** con al menos 12 inscritos. Pídeles que jueguen de verdad y te cuenten fallos. Puedes subir correcciones mientras tanto: cada subida necesita un `versionCode` mayor (ver más abajo).

## Paso 6 · Pedir el acceso a producción

Al cumplir los 14 días, en el **Panel** aparece **Solicitar acceso a producción**. Google pregunta cómo hiciste la prueba, qué cambiaste con los comentarios y si la app está lista. Responde con detalle; la revisión suele tardar hasta 7 días. Si la rechazan, explican el motivo y puedes volver a pedirlo.

## Paso 7 · Publicar

1. En **Producción → Crear versión**, usa el mismo `.aab` o uno más nuevo.
2. Elige los países.
3. Lanza de forma **gradual**: por ejemplo al 20 % y, si no hay fallos en un par de días, al 100 %.
4. Envía a revisión. Al aprobarse, el juego aparece en Google Play para todos.

## Paso 8 · Después del lanzamiento

- Revisa **Android vitals** (cierres y bloqueos) y las reseñas cada semana.
- Responde las reseñas: ayuda a la puntuación.
- Para cada actualización:
  1. Sube `versionCode` en `android/app/build.gradle`. La 1.5.3 es el 9, así que la siguiente sería el 10.
  2. Ajusta `versionName`.
  3. Compila con `gradle assembleRelease bundleRelease` desde `android/`.
  4. Firma con la misma llave de subida y sube el `.aab`.
- Si añades anuncios, analíticas, nube o logros de Play Games, actualiza antes la política de privacidad y el formulario de seguridad de datos.

## Calendario de referencia

| Semana | Qué pasa |
|---|---|
| 1 | Cuenta creada y verificada, app creada, contenido de la app y ficha completos, prueba cerrada enviada a revisión |
| 1–3 | 14 días de prueba cerrada con 12 o más testers |
| 3–4 | Solicitud de producción, revisión y lanzamiento gradual |

## Lo poco conocido que conviene saber

- **El nombre del paquete es para siempre.** `com.onezero.industryart` no se puede cambiar después de la primera subida.
- **«Gratis» también es para siempre.** Una app publicada como gratuita no puede pasar a ser de pago; sí puede añadir compras dentro de la app más adelante.
- **Los testers deben seguir inscritos los 14 días.** Si alguien se sale y bajan de 12, el conteo puede reiniciarse. Por eso conviene invitar a más de 12.
- **La firma de apps de Google Play te protege.** Si pierdes la llave de subida, Google puede registrar una nueva; si pierdes la llave de una app sin firma de Play, no podrías actualizarla nunca más.
- **Las capturas venden.** La primera captura y el gráfico destacado son lo que más se ve en la tienda; por eso la primera es la portada con el logo.
