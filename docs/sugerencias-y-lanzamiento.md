# INDUSTRY ART · Sugerencias e ideas

## 1. Lanzamiento

Todo lo necesario para publicar está en tres documentos:

- `plan-de-lanzamiento.md`: los pasos para publicar en Google Play, desde crear la cuenta hasta la versión de producción.
- `politicas-google-play.md`: la revisión de políticas, con las respuestas para seguridad de datos, clasificación de contenido y público objetivo.
- `ficha-tienda.md`: nombre, descripciones y notas de la versión en español, inglés, francés y portugués.

La política de privacidad pública está en `privacidad.html` y se publica con GitHub Pages. Las capturas para la tienda están en `android/play/capturas/`.

## 2. Lo que se verificó en esta versión

- **Juego completo simulado** de 1700 a 2300 por tramos, con las tres estrategias del simulador: sin errores, sin valores imposibles (NaN, infinitos, porcentajes fuera de 0–100).
- **Interfaz:** más de 2.400 acciones automáticas en todas las secciones, en distintas épocas, sin errores.
- **Hechos históricos:**
  - 444 hitos, 158 tecnologías, 213 artistas, 32 fiestas nacionales y los años de fundación de los premios.
  - Correcciones hechas:
    - 36 obras de autores que nacían en dominio público con el autor vivo (por ejemplo, *Bodas de sangre* de Lorca o *La edad de la inocencia* de Wharton). Ahora siguen la regla del juego: muerte del autor + 71.
    - 15 fiestas que el juego llamaba "Independencia" y no lo son (Reino Unido, Francia, España, Japón, China…). Ahora se anuncian como "Fiesta nacional".
    - Años de inicio de cuatro fiestas: España 1918, Japón 1873, Tailandia 1960, Australia 1935.
    - El color de tres tiras se desbloquea en 1935 (*Becky Sharp*), no en 1939.
    - Mozart pasa a figurar como austriaco y Ang Lee como taiwanés.
- **Música:** cada clásico solo suena desde su año de publicación. Por ejemplo, *Para Elisa* se compuso hacia 1810 pero se publicó en 1867, y en el juego aparece en 1867. Los datos curiosos de cada pieza se revisaron:
  - Jingle Bells, primera canción tocada desde el espacio (Gemini 6, 1965).
  - Noche de paz, estrenada con guitarra en Oberndorf (1818).
  - El Minueto en Sol, que es de Petzold y no de Bach.
  - La marcha de Chopin, que sonó en su propio funeral (1849).
  - Las piezas electrónicas son originales, así que no hay derechos de terceros.
- **Rendimiento:** una semana de juego se calcula en unos 4 ms y una pantalla se dibuja en unos 6 ms en un computador de escritorio; en un teléfono de gama media conviene contar con 4 a 6 veces más. La animación del edificio se detiene cuando no está en pantalla y baja de 30 a un mínimo de 10 cuadros por segundo si el teléfono va lento.

## 3. Ideas: qué se hizo y qué queda

### Ya están en el juego
- **Campaña «Seis siglos»** con nueve capítulos de 1737 a 2150.
- **Reto semanal** con la misma semilla para todos y récords en el dispositivo.
- **Rivales con nombre de amigos**: por archivo `.iaestudio` o en vivo con el **modo LAN**.
- **Banderas históricas por época**.
- **Rasgos de talento**, categorías por cargo en festivales y en Independent/Bastard, y novela gráfica y filosofía/economía en el Editorial Book Award. Las clases de videojuego por duración y la tarjeta de estreno para compartir ya existían; se sumó la versión vertical de 1080 × 1920 para historias de redes.
- **Radio del estudio** con las canciones de tus artistas.
- **Ofertas de compra**, **salida a bolsa** y **remodelación por época**.
- **Modo a una mano**.
- **De las pruebas de juego (versión 1.1):**
  - Encargos completos a filiales y rivales.
  - Compañías de teatro, ópera y circo.
  - Reediciones de libros.
  - Compra automática de contenido para streaming y TV.
  - Secuelas que conservan a sus intérpretes.

- **De las pruebas de juego (versión 1.2):**
  - La pantalla ya no salta al tocar opciones.
  - Fechas de cada obra y archivo dividido en tres secciones.
  - Venta de negocios, cadenas de cines y parques, con gestión automática para los parques.
  - Encargos a tus talentos firmados.
  - Becas automáticas.
  - Ritmo de decisiones y propuestas para el avatar.
  - Títulos, sinopsis y críticas más variados.
  - Paquetes de mundo (`.iamundo`).

- **De las pruebas de juego (versión 1.4):**
  - Energía en lugar de bloqueo: un talento trabaja con un rival y contigo mientras le quede energía.
  - Línea de producción dividida en lo tuyo y el segundo plano.
  - Tus talentos firmados producen solos lo que aceptas, según tu infraestructura de cada medio.
  - Archivo con una cuarta sección: obras de tus talentos.
  - Consola propia con cuota, ventas, exclusivos, campañas, rebajas y sucesora.
  - Comediantes que firman contigo y artistas en la lista de éxitos.
  - Lo que ya produjiste o encomendaste sale de la lista de material.
  - Títulos revisados: sin palabras repetidas, sin redundancias y con concordancia correcta.
  - Reparto recomendado y «Al mejor» con lógica de edad, sexo, tipo de papel y géneros.
  - Retirados que vuelven por más dinero; el avatar ya no queda bloqueado al trabajar con rivales.
  - Plan automático de lanzamiento, seleccionar todo el marketing y lanzamiento automático.
  - Archivo de segundo plano, licencias automáticas y rivales que adaptan obras de dominio público.
  - Personajes de otras obras resaltados en el reparto.
  - Diccionario de títulos ampliado con palabras poco conocidas y de otros idiomas.
  - Las partidas guardadas reciben las funciones nuevas al actualizar.

- **De las pruebas de juego (versión 1.5):**
  - Franquicias con las cuatro divisiones y «Catálogo» en lugar de «Filmografía».
  - Los talentos con contrato exclusivo y los subproductores ejecutivos proponen proyectos; luz verde de una vez o automática.
  - Presupuesto acordado y cofinanciación de rivales al encomendar.
  - Corregido el doble cobro en los proyectos en conjunto con rivales.

- **De las pruebas de juego (versión 1.5.1):**
  - El archivo de la línea de producción también tiene las cuatro divisiones.
  - Tus obras y las de tus filiales siempre están en tu plataforma y tu canal, sin ocupar espacio del catálogo.
  - Vender licencias ya no saca tus obras de tu propia plataforma ni de tu canal.

- **De las pruebas de juego (versión 1.5.2):**
  - La pantalla no se mueve al reestrenar ni al hacer acciones que cambian una obra de sección, tampoco desde fichas abiertas.

- **De las pruebas de juego (versión 1.5.3):**
  - Botón «Reestrenar las que conviene» y reestreno automático, que respetan la bóveda y dejan fuera las obras de mala fama.
  - Etiquetas de fama traducidas en todos los idiomas.
  - Al comprar un rival, su catálogo pasa al instante a tu plataforma y tu canal lo programa.

- **De las pruebas de juego (versión 1.6):**
  - Crear obras para un festival, en modo automático o detallado.
  - Presupuesto anual por medio con misiones y aporte de filiales.
  - Talentos firmados orientados a un medio.
  - Tu propia prensa.
  - Redes de distribución para todos los medios.
  - Capital automático para filiales y sedes que dan dinero.
  - Premios ganados y relaciones ordenadas en la ficha de cada talento.
  - Volver a la ficha sin perder tu lugar.
  - Estatura y complexión del avatar, una rutina para ponerse en forma y minijuegos de práctica.

- **De las pruebas de juego (versión 1.6.1):**
  - Una sola versión definitiva.
  - Rescate de rivales al borde de la quiebra y reapertura de estudios cerrados.
  - Estudios nuevos cada año.
  - Renovación automática de temporadas.
  - Ficha completa del avatar en su pestaña.
  - Todos los personajes en la franquicia y un buscador de franquicias.
  - Encomendar desde el creador.
  - Guiones comprados que se guardan solos.
  - Proyección de prensa solo para tus obras y visible en la ficha de cada obra.
  - Buscador en el archivo y Material en subpestañas.
  - Elegir el tipo de obra al encomendar.
  - Ceremonias solo para tus obras.

### Pendientes
1. **Bandeja de pendientes, copia de seguridad automática y rentabilidad por división** (detalle en `reporte-1.5.md`).
2. **Balance con datos reales.** La música rinde más que los otros medios antes de 1900 (multiplicador de 5,5 a 6,5) y los videojuegos tienden a perder dinero después de 2150 (0,8). Conviene revisarlo con las partidas de los testers.
3. **Logros de Google Play Games.** El juego ya tiene logros propios. Conectarlos a Play Games da visibilidad en la tienda, pero exige iniciar sesión con Google y cambiar la política de privacidad y el formulario de datos.
4. **Galería de la comunidad.** Una página en GitHub Pages con paquetes `.iapack` y estudios `.iaestudio` compartidos por los jugadores.
5. **Accesibilidad.** Probar el juego con TalkBack, el lector de pantalla de Android.
6. **Técnica para la versión 2:**
   - Separar el código en módulos.
   - Cargar los diccionarios de traducción por idioma para bajar el tamaño del HTML.

### Descartado
- **Guardado en la nube:** todo se queda en el dispositivo del jugador. Para cambiar de teléfono basta exportar e importar el `.iasave`.
