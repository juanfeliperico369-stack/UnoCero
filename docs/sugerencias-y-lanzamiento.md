# INDUSTRY ART 1.0 · Sugerencias e ideas para el lanzamiento

## 1. Antes de publicar (imprescindible)

1. **Probar el APK en teléfonos reales.** La app se compiló y firmó, pero no se pudo ejecutar en un emulador desde el entorno de trabajo. Conviene probarla en al menos un teléfono con Android 8–10 y otro con Android 13–15 para revisar estas cinco cosas:
   - Guardar y cargar partidas.
   - Exportar e importar `.iasave`.
   - El botón atrás.
   - El modo oscuro del sistema.
   - La música de fondo.
2. **Nombre del paquete.** El paquete es `com.onezero.industryart`. En Google Play no se puede cambiar después de la primera subida; si prefieres otro, cámbialo ahora en `android/app/build.gradle`.
3. **Llave de firma.** La llave de subida (`industryart-subida.jks`) y su contraseña se entregaron aparte, no están en el repositorio. Guárdalas en dos lugares seguros: sin ellas no podrás publicar actualizaciones. En Play Console activa *Play App Signing*.
4. **Política de privacidad pública.** Google Play exige una dirección web. El juego ya trae su política: se puede publicar con GitHub Pages desde este repositorio.
5. **Formulario de seguridad de datos.** El juego no recopila datos: guarda todo en el dispositivo, no usa internet y no tiene anuncios ni analíticas. La app no pide ningún permiso.
6. **Clasificación de contenido (IARC).** El juego incluye clasificaciones por edades de obras ficticias, temas adultos en la taxonomía (por ejemplo, erótico o violencia), apuestas simuladas (casino) y menciones a guerras y drogas en hechos históricos. Responde el cuestionario con eso en cuenta; lo prudente es apuntar a 12+ o 16+.
7. **Marcas registradas y personas reales** (revisar antes de publicar):
   - **Premios con nombre real o casi real:** "Emmy Shows Awards", "Premios Tony internacional de Broadway", "The Game Award", "León de Oro", "Palma de Oro", "Oso de Oro". Son marcas de terceros. Recomiendo nombres propios del juego, por ejemplo: *Premios Prisma* (TV), *Telón de Oro* (teatro), *Joystick de Oro* (videojuegos), *Faro de Oro* (festival europeo). Las menciones a los Óscar dentro de hechos históricos reales sí son seguras.
   - **213 personas reales** aparecen en la historia y el Salón. Como hechos biográficos es habitual. Si alguna puede contratarse como talento con estadísticas, conviene convertirla en un personaje ficticio inspirado en ella.
8. **Ficha de la tienda** en español, inglés, francés y portugués:
   - Ícono de 512 px y gráfico destacado de 1024×500 (ya en `android/play/`).
   - Entre 4 y 8 capturas: portada, Estudio, creador de obras, premios, temas.
   - Un video corto de 30 segundos mostrando las ediciones por época.

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

## 3. Ideas geniales para una última estocada

### Jugabilidad
1. **Campaña "Seis siglos".** Capítulos guiados por época, con un reto de apertura, por ejemplo:
   - "Sobrevive a la Ley de Licencias de 1737".
   - "Lleva tu teatro al cine en 1895".
   - "Resiste la crisis del videojuego de 1983".
2. **Reto semanal con semilla compartida.** El juego ya usa semillas de mundo. Una semilla nueva cada semana y una tabla de récords local o en la nube harían que la gente vuelva cada semana.
3. **Rivales con nombre de amigos.** Importar un `.iasave` de otra persona y que su estudio aparezca como rival en tu mundo, como multijugador asíncrono sin servidores.
4. **Banderas históricas por época.** Alemania antes de 1871, Italia antes de 1861, la URSS entre 1922 y 1991, el Reino Unido antes de 1801. El dibujante de banderas ya está listo para aceptar variantes por año.
5. **Lo que faltó del documento original:**
   - Rasgos de talento (Magnetismo, Rango, Estilo, Conceptos, Complejidad).
   - Clases de videojuego por duración en el creador.
   - Categorías por cargo en festivales y en Independent/Bastard.
   - Novela gráfica y filosofía/economía como categorías propias del Editorial Book Award.
6. **Balance, a revisar con datos de jugadores reales:**
   - La música rinde más que los otros medios antes de 1900, con un multiplicador de 5,5 a 6,5.
   - Después de 2150 los videojuegos tienden a perder dinero, con un multiplicador de 0,8.
   - No lo cambié porque puede ser una decisión de diseño; vale la pena mirarlo después del lanzamiento.

### Presentación y comunidad
7. **Tarjeta de estreno para compartir.** Una imagen vertical (formato historia de redes) con el póster, la crítica y la taquilla de tu obra, con la estética del tema elegido.
8. **Radio del estudio.** La música ya cambia con la época, el calendario y el tema. El siguiente paso sería que tus propias bandas y solistas del sello tengan un tema propio que suene en la radio del juego cuando llegan al número 1.
9. **Logros de Google Play Games.** El juego ya tiene 113 logros: conectarlos a Play Games da visibilidad gratis en la tienda.
10. **Guardado en la nube opcional** (Google Drive), para no perder partidas al cambiar de teléfono.
11. **Galería de la comunidad.** Los paquetes `.iapack` del Editor permiten compartir franquicias y talentos. Una página sencilla en GitHub Pages con los mejores paquetes puede crear comunidad desde el día uno.

### Negocio y construcción (siguientes pasos)
12. **Ofertas de compra.** Con el valor de la compañía ya calculado, un conglomerado podría ofrecer comprar tu estudio. Aceptar cerraría la partida con un final propio y un puntaje; rechazar subiría la moral del equipo.
13. **Salida a bolsa.** Vender una parte del estudio para conseguir capital, con una junta que exija dividendos. Encaja con la junta y el socio que el juego ya tiene.
14. **Mantenimiento por época.** Las construcciones viejas podrían pedir una remodelación cada 30 o 40 años, por ejemplo de nitrato a digital, con una obra propia y una inauguración.

### Técnica (para después del 1.0)
15. **Reestructurar el código por módulos.** El código funciona, pero está construido como capas de funciones que envuelven a otras. Separarlo en módulos facilitaría mantener la versión 2.
16. **Reducir el tamaño del HTML** (5,9 MB). La mayor parte son diccionarios de traducción y fuentes; se pueden cargar por idioma. Es una mejora de rendimiento, no un problema.
17. **Accesibilidad.**
    - Probar con TalkBack.
    - Añadir un modo de "una mano" que baje los controles de tiempo junto a la barra de navegación inferior.
