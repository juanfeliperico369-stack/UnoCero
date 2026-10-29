# INDUSTRY ART 1.0 — Bitácora de la versión final

Creado por OneZero · Infinite Tree.

## Entregables
- `dist/INDUSTRY_ART.html`: el juego completo, funciona sin conexión.
- `dist/INDUSTRY_ART_1.0.aab`: el paquete para subir a Google Play.
- `dist/INDUSTRY_ART_1.0.apk`: la misma app, para instalar y probar directamente en el teléfono.

La app Android es propia (carpeta `android/`): una pantalla con el juego, sin anuncios, sin compras, sin servicios de terceros y con un solo permiso (Internet, que el WebView necesita aunque el juego no se conecta a nada). Pesa 2,3 MB. Reemplaza al envoltorio de la app 1.0, que traía el SDK de anuncios de Google configurado con el identificador **de prueba** de AdMob, el permiso de identificador publicitario y la biblioteca de compras. Eso contradecía la política de privacidad y podía causar un rechazo en Google Play.

## Antes de publicar en Google Play (lista de lanzamiento)
1. **Llave de subida:** el .aab y el .apk están firmados con la llave `industryart` (CN=OneZero, O=Infinite Tree). El archivo de la llave se entrega aparte y **no está en el repositorio**. Guárdalo en un lugar seguro con su contraseña: sin él no se pueden publicar actualizaciones. Al crear la app en Play Console, activa «Firma de apps de Google Play» y sube el .aab; Google guarda la llave final y esta queda como llave de subida.
2. **Versión:** versionName 1.0, versionCode 7 (se instala encima de la entrega anterior, que era la 6). Cada actualización debe subir el versionCode (`VC=8 tools/android.sh …`).
3. **Paquete:** `com.industryart.juego`, el mismo de la app 1.0. Si en el teléfono está instalada la 1.0 (firmada con otra llave), hay que desinstalarla antes de instalar el .apk.
4. **Seguridad de los datos (ficha de Play):** el juego no recoge ni comparte datos, no tiene anuncios ni compras, y guarda las partidas solo en el teléfono. Se puede declarar «No se recogen datos».
5. **Clasificación de contenido:** el contenido adulto existe, pero siempre sugerido. En el cuestionario conviene declarar violencia, lenguaje y temas adultos opcionales.
6. **Probar en un teléfono real** (aquí no hay emulador): instalación, guardado y carga, exportar e importar partidas, guardar la ficha pop y el documento de la idea, imprimir o guardar en PDF, el botón Atrás y el teclado sobre los campos de texto.

## Qué se corrigió y mejoró (sobre la V40)
**Pedidos de las capturas**
- **Temas de la compañía (nueva partida):** antes eran tres listas. Ahora es un botón que abre un selector con buscador (ignora tildes), en orden alfabético y agrupado. Se eligen hasta 3.
- **Avatar:** 7 partes nuevas: color de labios, cicatriz, tatuaje, piercing, mirada, cuello (perlas, cadena, bufanda, pajarita…) e iluminación del retrato (estudio, dramática, neón, hora dorada, blanco y negro). La iluminación da volumen a todos los retratos. El avatar al azar también usa las partes nuevas.
- **Ficha pop:** se comparte con la portada que diseñó el jugador. Antes salía la portada automática.
- **Temas y tópicos:** el tema «Política» ya existía, pero la lógica de verosimilitud lo marcaba como «solo existe en la realidad» y lo ocultaba en las obras de ficción. Ahora se puede elegir en ficción, igual que Economía, Ciencia, Filosofía, Psicología y Tecnología.
- **Clasificación por edades, según el documento:**
  - Cada clasificación pone un tope a violencia, lenguaje, amor, consumo y miedo. Por ejemplo, PG-13 no deja pasar de «Moderado».
  - Se corrigieron los textos de NC-17, 18 y X.
  - Los ingresos por franja (60/70/100/90/80/50/40/30/50 %) ya estaban.
- **Formato de sala:** nueva opción «Múltiple formato» (desde 2010). Sube el costo y las ventas.
- **Crossover:** ya no muestra todas las burbujas. Hay un botón que abre la lista con buscador (tus franquicias y las de rivales con licencia), y las elegidas se quitan con ✕.
- **Arquetipos:** 16 nuevos con versión femenina. Entre ellos el antivillano, mártir, vengador, traidor, elegido, tirano y pícaro.
- **Talentos y clasificación fuerte:** ya no rechazan la obra. Aceptan, pero cobran +18 % por cada nivel que la obra pasa de su comodidad, y la obra pierde crítica y público.
- **Distribución exclusiva:** aparte de la oferta que llega sola, ahora tú propones:
  - eliges el estudio con buscador, el medio y la parte que le cedes (10–25 %);
  - se ve la probabilidad de que acepte;
  - si rechaza, hay que esperar 8 semanas.
- **Encargar a otro estudio:** eliges el medio y luego el estudio con buscador (★ marca su fuerte). Después hay dos botones:
  - «Encargo automático»: el estudio decide todo y arranca ya (como en la 1.0);
  - «Encargo detallado»: abre el creador de ideas.
- **Documento de la idea:**
  - portada con el póster y un índice numerado;
  - secciones nuevas: escaleta por actos, atmósfera, escenas para imaginar y preguntas abiertas;
  - lo mismo en Markdown y Word.
- **Música:** firmar un artista va por pasos. Eliges la clase (solista, dúo, banda, grupo vocal, orquesta, cada una con su número de integrantes), los integrantes con buscador, y confirmas con nombre, costo y nivel del conjunto.
- **Minijuegos:**
  - Casino: carrera de caballos, póker de dados y rasca y gana.
  - Piratería: «Caza de copias», 20 segundos tocando piratas sin tocar las legales. Baja la piratería por 10 semanas.
  - TV: noticia exclusiva (con riesgo de desmentido), especial de estreno y maratón de clásicos.
  - Streaming: lotes de catálogo y una línea de suministro por un año.
- **Tema «Minimalista»:** plano, claro, con un solo color de acento y más aire. Está en Ajustes → Tema.

**Otros cambios**
- **Idiomas:** francés y portugués en Ajustes y en la portada (botones FR/PT).
  - Unas 12.700 frases por idioma, incluidos todos los hitos históricos, los datos curiosos, las ayudas, los 112 logros, todos los tipos de obra con sus decisiones, la política de privacidad, el tutorial y la guía.
  - Plantillas con números («# años», «crítica #») y frases con nombres propios («X se retira a los N años», «X gana la ventaja Y»).
  - Listas separadas por comas, fechas, y sinopsis automáticas traducidas por frases.
  - Se midió recorriendo todas las pestañas y el creador: en francés pasaron de 2.885 textos sin traducir a unos 130 segmentos. Casi todos son nombres inventados de obras, estudios y personajes (no se traducen a propósito), frases latinas y géneros que se escriben igual en los dos idiomas.
- **Títulos automáticos:** concordancia de género y número («Quimera perdida», «Cenizas eternas», «La última de las sombras»). Un barrido de más de 30.000 noticias, títulos y sinopsis generados no encontró más errores de concordancia.
- **Contenido nuevo:**
  - 71 hitos reales con contexto, de 1700 a 2023, sobre todo de los siglos XVIII y XIX, teatro, TV y videojuegos, que eran los que menos tenían;
  - 29 datos curiosos;
  - 15 obras de dominio público con temas, personajes y sinopsis (Drácula, Los Miserables, La Odisea, Las mil y una noches, María, Popol Vuh…).
- **Obras de dominio público repetidas:** había 9 duplicadas con otro artículo o mayúsculas («Ramayana» y «El Ramayana», «Decamerón» y «El Decamerón»…). Se ocultan de las listas, sin borrarlas, para no romper partidas guardadas.
- **Traído de la versión 1.0:**
  - encargo automático;
  - cronología del estudio (Salón → Tu estudio);
  - estado anual (Finanzas: caja, valor del catálogo, deudas y patrimonio);
  - biblioteca de clásicos (Obras → Usar material);
  - línea de vida en la ficha de cada talento;
  - logros del año en el balance anual;
  - discurso de aceptación al ganar en la ceremonia en vivo (agradecer al equipo, mensaje comprometido, hacer reír o breve), con efecto en moral, prestigio o fans.
  - La compra de derechos con regateo, el modo rápido, la ceremonia en vivo con «Abrir el sobre» y las edades de la población ya existían en la V40.
- **Del documento original:**
  - audiencia focal por afición (cinéfilos, seriéfilos, gamers, teatrófilos, melómanos, bibliófilos), por cultura (16) y comunidad LGBTQ+, con efecto en ventas, crítica y público;
  - tonos Deprimente, Melancólico, Luminoso y Entretenido;
  - Oktoberfest en el calendario.
- **Auditoría del creador:** se cambiaron automáticamente 169 opciones de los 6 medios. El arquetipo y el sexo de los personajes no influían; ahora pesan (variedad de papeles, personajes complejos, antagonista en géneros de acción, reparto mixto).
- **Filtro de verosimilitud (el «embudo»):** se auditaron todas las opciones de los seis medios, en ficción y en realidad. Además de «Política», descartaba de más:
  - **En ficción:** novela política o psicológica, biografías y memorias ficticias, crónica («Crónica de una muerte anunciada»), cocina, educativo, economía, filosofía, ciencia y tecnología.
  - **En obras de realidad:**
    - novela de no ficción («A sangre fría»), novela negra real, epopeya histórica, farsa política, tragedia real, telenovela basada en hechos reales y procedimental;
    - temas como literatura, robótica, transhumanismo, castillos góticos, contacto extraterrestre, fantasmas o maldiciones (como investigación o creencia);
    - videojuegos basados en hechos reales: shooters históricos, estrategia, sigilo, novela visual y aventura documental.
  - **Temas históricos:** se pueden tratar desde otra época (por ejemplo, una ficción actual sobre el Holocausto). Al elegir un subgénero de época (vikingos, samuráis, victoriano…), la historia pasa sola a esa época. Si luego la cambias, la crítica lo nota, salvo en fantasía, ciencia ficción o comedia.
  - **Lo que sigue descartado es coherente:** elfos u orcos en un documental, un reality o un talk show como novela, zombis en una obra de realidad.
- **Tipos de obra nuevos (57) con decisiones propias:**
  - **Teatro (21):**
    - tradiciones de Asia: teatro de sombras chino, wayang kulit (sombras de Java), karagöz (sombras turcas), títeres de agua de Vietnam, bunraku, kabuki, teatro nō, ópera de Pekín y kathakali;
    - tradiciones europeas: commedia dell'arte, pantomima, teatro callejero y auto sacramental;
    - formas modernas: teatro de revista, ilusionismo, danza-teatro, teatro documental, teatro del absurdo, teatro negro, ópera rock y circo contemporáneo.
    - El circo de siempre suma carpa, animales (desde 2000 el público lo castiga) y riesgo sin red.
  - **Cine (5):** mediometraje, serie B, docuficción, anime y película en realidad virtual.
  - **Series (6):** anime, radionovela, webserie, microserie vertical, cocina y viajes.
  - **Videojuegos (8):** metroidvania, soulslike, gestión/tycoon, simulador de vida, party game, cartas digital, realidad aumentada y juego narrativo.
  - **Música (7):** unplugged, navideño, colaborativo, tributo, infantil, instrumental y concierto virtual.
  - **Editorial (10):** folletín, novela epistolar, novela juvenil, librojuego, fanzine, audiolibro, revista literaria, enciclopedia, guía de viaje y libro de fotografía.
  - **Cómo se ven y qué pesan:** cada tipo nuevo tiene su año de aparición, su naturaleza y un efecto base en costo, crítica, público, semanas y ventas. En el creador se ven los 12 principales y el resto en «Todos los tipos», con buscador.
  - **Equilibrio:** se produjeron obras iguales que solo cambiaban de tipo y se comparó la ganancia real tras más de dos años. La serie B, la radionovela, la microserie vertical, la webserie, el teatro callejero y el fanzine eran demasiado rentables por lo poco que cuestan. Se ajustaron con tiradas, audiencias y recaudaciones más pequeñas, y ahora quedan a la par o por debajo de los tipos de siempre de su medio.
- **Gramática:** concordancia de las sinopsis («una persona común se ve obligada»), artículos de plurales femeninos («las religiones ancestrales») y el logro «Gana 10 Premios de la Academia».
- **Ficha del talento:** decía «Acepta obras hasta X»; ahora dice «Se desenvuelve mejor hasta X (más allá cobra más y rinde menos)», acorde con la nueva regla.
- **Selector con buscador:** el campo de búsqueda toma los colores del tema.
- **Errores encontrados por la prueba de estrés y corregidos:**
  - **Recordatorio y créditos:** la ventana de «Recordatorio» mostraba los créditos y la de créditos salía vacía. Venía de una entrega anterior de esta misma versión.
  - **Calendario:** su vista principal tenía el título «undefined».
  - **Talentos retirados:** la lista decía «energía undefined».
- **Creador:** más espacio entre bloques y etiquetas.
- **Limpieza:** se quitaron comentarios de desarrollo, marcas de versión y referencias a herramientas. Los créditos dicen solo OneZero · Infinite Tree. La versión es 1.0.

**Ronda final (pedidos de la última revisión)**
- **Botón «Avanzar» del creador:** seguía el orden interno de las secciones y no el de las pestañas. En música saltaba a «Personajes», que no estaba en la barra; en cine se saltaba la portada. Ahora recorre exactamente las pestañas visibles, en el mismo orden, en los seis medios.
- **Personajes en música (opcional):** la pestaña aparece como «Personajes (opcional)». Hasta 6 personajes con nombre, arquetipo y quién es en la canción. En un álbum conceptual suben la crítica y el público; en un disco normal, un poco el público. Salen en la ficha de la obra.
- **Planes de salida cruzados:** cada medio tiene sus planes y el orden de las ventanas se puede invertir (streaming primero y después cines, físico primero, festival y salas limitadas, día y fecha, por entregas…). Música tiene por fin su plan de lanzamiento (sencillo adelanto, radio y disco primero, álbum sorpresa, videoclip viral, gira primero). Cada ventana abre en su semana, recauda por su cuenta y se ve en la ficha.
- **Documento de la idea en la ficha final:** junto a la ficha pop está «Documento de la idea» (solo la historia o completo; .html, Word, Markdown o imprimir). Las obras nuevas guardan su borrador; las anteriores lo rearman con sus datos.
- **Avisos:** duran entre 1,7 y 4 segundos según el largo (menos en modo automático), se cierran tocándolos y no se repiten si el mismo aviso llega varias veces seguidas.
- **Eventos con sentido:** cada evento pide lo que lo haría creíble. Por ejemplo, una escuela solo pide clases si tienes prestigio, años de carrera u obras premiadas; una estrella, una marca, una plataforma o un gigante solo te buscan cuando tu estudio ya es conocido. Lo mismo para los eventos del avatar (discursos, retratos, homenajes, festivales con tu nombre).
- **Sets permanentes:** una obra con rodaje (cine, series, teatro) que cuesta 3 o más veces el presupuesto típico de su época deja su set en pie, con nombre según género, época y terreno: «Pueblo del Salvaje Oeste», «Nave espacial a escala real», «Castillo y aldea medieval», «Barco pirata y muelle»… Desde 6 veces, además sube un nivel la construcción de Soundstages o de efectos visuales.
  - Las obras que encajan por terreno, género o época lo reutilizan: entre 12 y 18 % menos de costo, una semana menos de producción y algo más de crítica.
  - Los rivales lo alquilan cuando no lo usas. Con tres o más sets (desde 1964) se abre un tour para el público.
  - Se desgastan, cuestan mantenimiento y se pueden restaurar o demoler. Se gestionan en Construcciones.
- **Traducciones:** francés y portugués para todo lo nuevo, y además todo el creador en modo detallado (opciones de cada medio, presupuesto por departamentos, notas, encaje, contadores), que antes quedaba en parte en español. Se agregaron reglas para frases con números, contadores y nombres.

**Revisión tras probar la app en el teléfono**
- **Clasificaciones según el documento:** cada contenido tiene su propia escala y cada clasificación su tope.
  - Violencia: sin violencia, leve, moderada, intensa, gráfica, sangrienta y explícita.
  - Lenguaje: normal, leve, rudo, crudo, ofensivo y explícito.
  - Amor y deseo: amistoso, romántico, apasionado, candente y explícito.
  - Consumo y miedo también tienen sus niveles.
  - Con X, todo llega a «explícito»; con 18, la violencia llega a «gráfica»; con R, a «sangrienta».
  - Lo explícito pesa: a los géneros duros (terror, thriller, bélico, crimen, erótico) les suma audacia; al resto le resta público.
- **Decisiones que pesan:**
  - Los 110 tipos de obra que venían sin efecto (cortometraje, animación, sitcom, ópera, manga, mundo abierto…) ahora cambian costo, crítica, público, semanas y ventas.
  - La predicción del estreno incluye esos efectos: un cortometraje ya no promete lo mismo que una película.
  - El creador muestra lo que aporta cada tipo elegido.
- **Género principal:** el primero elegido lleva ★ y se puede cambiar. Pesa el doble: si el público lo pide o lo rechaza, y si tu equipo lo domina.
- **Eventos con lógica:**
  - Los costos se miden con lo que mueve tu estudio (tus presupuestos y tu caja), no con el presupuesto típico de la industria.
  - Ninguna decisión de un evento puede llevarse más del 20 % de la caja.
  - Más de 60 eventos piden algo concreto para aparecer. Por ejemplo, los cines solo piden más porcentaje si tienes una película en cartelera, y el banco solo ofrece exclusividad si tienes un préstamo.
- **Avisos:** duran medio segundo (hasta un segundo los largos), son más pequeños y se cierran tocándolos.
- **Secuelas:** los talentos con contrato en otro estudio o sin ganas de volver sí vuelven.
  - Con contrato rival hay que comprar su contrato: +60 %.
  - Si no querían volver, aceptan por +35 %.
  - Retirados y estudiantes siguen sin poder volver.
- **Personajes:**
  - En videojuegos el intérprete es opcional: los personajes pueden no tener voz, con un pequeño costo de público en juegos modernos.
  - En libros no se contrata intérprete.
  - Cada personaje nuevo nace con lo que ya decidiste de la obra: edad según géneros y época, arquetipo según su papel (falta un villano, un mentor, un aliado…), motivación según los temas y relación con el protagonista.
- **Nombres al azar:** un dado en cada personaje pone directamente un nombre del continente elegido arriba (o del lugar de la historia). El botón «Elegir» sigue mostrando opciones.
- **Videojuegos:**
  - Se pueden elegir todas las plataformas: cada una de más cuesta 8 %, y desde la quinta, 12 %.
  - El compositor entra al equipo.
- **IA en la producción:**
  - Abarata hasta un 40 % y acorta la posproducción.
  - Ahora tiene un resultado (excelente, bien, dudoso o completamente mal) según el equipo que la guía.
  - La ficha muestra el ahorro.
- **Documento de la idea:** ahora es un Word de verdad (.docx), como el de la otra versión y más completo.
  - Trae portada con la carátula de la obra, logline y trama en tres actos.
  - Incluye la curva del arco como imagen y una escaleta con la fortuna en cada momento.
  - Personajes con arquetipo, motivación, relación e intérprete (lo/la interpreta según el personaje).
  - Mundo y atmósfera, equipo creativo, producción y, desde la ficha final, los datos del estreno: fecha, recaudación, multiplicador, crítica, público y premios.
  - También se baja en HTML (para leer, imprimir o guardar como PDF) y en Markdown.
  - Se corrigieron «rPG», «entre varios lugares», «normal de 20 años», «una historia sobre locura» y la escaleta repetida.
- **Logo nuevo:** un ensō, el círculo zen pintado de un solo trazo, con cerdas, presión y final de pincel seco, en dorado, coral y magenta: es el arte. En su centro, un triángulo exacto en turquesa: la industria. Está en el ícono de la app (normal, redondo, adaptable y monocromo para los temas de Android 13 o más), en la pestaña del navegador y sobre el título de la portada.
- **Comparación con la 1.0:** la estrategia de prensa en convenciones, el trasfondo del avatar y los 24 negocios ya estaban en esta versión, que además tiene más negocios.

**Ayudas, calendario, lanzamiento, música y cifras exactas**
- **Botón «i» en cada opción:** como en la versión 1.0, cada decisión tiene su «i».
  - Al tocarlo explica cómo funciona esa opción en el juego y trae un dato curioso real de la historia del cine, la televisión, los videojuegos, el teatro, la música o los libros.
  - Son 129 fichas en español, inglés, francés y portugués. Cubren el creador de los seis medios (tipos, géneros, temas, arcos, clasificación, presupuesto, rodaje, equipo, plataformas, motor, actos, disco, tirada…), el plan de salida y la gestión del estudio (bancos, inversiones, streaming, canal, parques, consola, filiales, casino, piratería, prensa, premios…).
  - Aparecen solas al lado de cada etiqueta en todas las pantallas. Si la opción ya tenía una nota del juego, la nota se une a la ficha para no repetir el símbolo.
  - Se cierran tocando la ficha, con Escape o con el botón Atrás del teléfono.
- **Calendario según el documento:** se sumaron la Semana de la Moda de Milán, París y Nueva York, el Día de la Mujer, el Día de la Tierra, el Día del Libro, las fiestas folclóricas, Burning Man, el Día Internacional de la Paz y la Comic Con. Halloween suma terror y monstruos, y Pascua, lo religioso.
  - Cada fiesta mueve las ventas de las obras que le sientan: la moda a la música y el teatro, el Día del Libro y la Comic Con a los libros, y Burning Man a la música (+15 %).
  - Si en una semana caen varias fiestas, cada una suma un poco más.
  - **Secreto de la Semana de la Moda:** quien estrena una obra durante la Semana de la Moda de Milán, París o Nueva York recibe una noticia única: una diseñadora desconocida toma nota de los vestuarios y anuncia que «algún día la moda tendrá su propia industria». También desbloquea un logro oculto («???» hasta conseguirlo). Es la pista que deja esta versión para INDUSTRY ART 2.
- **Lanzamiento en dos pasos:**
  - **1 · Marketing:** con la obra terminada, se paga la campaña y la obra puede quedar en reposo.
  - **2 · Fecha y plan de salida:** después se elige la fecha y cómo sale, sin volver a pagar la campaña.
  - Si pasan más de 12 semanas entre la campaña y el estreno, la expectativa se enfría poco a poco.
  - El calendario muestra **dos años completos**, mes a mes y semana a semana. Cada semana indica la temporada, la competencia y la fiesta que le sienta a la obra.
- **Plan de salida a medida:** además de los planes de siempre, se pueden ordenar las ventanas (cines, físico, TV, streaming, gira, radio, digital…) y decidir cuándo abre cada una. Abrir muchas a la vez le quita ventas al estreno.
- **Música de fondo:** ahora suena. Son cuatro piezas tranquilas y elegantes (Salón, Vals de gala, Nocturno y Horizonte), tocadas en vivo por el propio juego con piano, cuerdas y campanas, con reverberación. Están activas por defecto y en Ajustes hay volumen y elección de pieza («Según la época» cambia sola). Se pausan al salir de la app.
- **Cifras exactas:**
  - El presupuesto se puede escribir a mano, al peso: por ejemplo «12.345.678», «45,5 M» o «800 K». El deslizador se coloca en esa cifra y la clase (A, B, C) se recalcula.
  - Si la cifra se sale del rango de la época, el juego avisa cuál es el mínimo y el máximo.
  - Los demás deslizadores que muestran un número (episodios, extras, minutos, tramas, año exacto, semanas, habilidad…) tienen al lado una casilla para escribir el valor exacto.
- **Traducciones:**
  - Se tradujeron al francés y al portugués el calendario, el plan de salida y sus fechas, los canales de marketing, los ajustes, la música y las misiones de estrenar.
  - El escáner de idiomas ahora también recorre el creador rápido, los ajustes y el plan de salida de los seis medios.
  - En francés, los dos puntos llevan el espacio de esa lengua («Prix : …»).

## Pruebas
- **Partidas automáticas en Chromium:** 1750–1830, 1780–1840, 1920–1975, 1925–1985, 1990–2035, 1990–2060 y 2026–2120, sin errores ni quiebra.
- **Prueba de estrés de la interfaz** (`tools/monkey.js`): pulsa los botones de todas las pestañas y de las ventanas que abren. Se corrió en cuatro situaciones, cada una con unas 3.100–3.500 pulsaciones: 1995–2010 en teléfono, 1780–1810 en pantalla de computador, 2080–2100, y 1960–1985 con la interfaz en francés. Cero errores en las cuatro.
- **Guardar y cargar:** la partida conserva obras, exclusivas, avatar y logros, y sigue jugándose sin errores.
- **Encargo automático:** probado en los seis medios.
- **Tipos nuevos:** se produjo una obra de cada uno de los 57, sin errores.
- **Prueba de estrés final:** unas 3.400 pulsaciones sin errores. Las partidas de 1700–1800 y 1960–2050 terminaron sin errores ni quiebra.
- **Detector de textos rotos:** la prueba de estrés busca «undefined», «NaN» o «null» visibles después de cada pulsación. Tras las correcciones no encuentra ninguno, ni en las pestañas, ni en el creador de los seis medios, ni en el documento de la idea ni en la ficha pop.
- **Portada:** completa y correcta en español, inglés, francés y portugués.
- **Rendimiento:** traducir al francés o al portugués no hace más lenta la interfaz.
- **Funciones nuevas una por una:** encargos, exclusivas, música, casino, piratería, TV, streaming, crossover, clasificación, ficha pop, temas, avatar, arquetipos, documento, cronología y balance. Todas sin errores.
- **Pantallas:** se revisaron a 420 px el documento, los retratos y el tema minimalista.
- **Revisión del teléfono:** prueba de estrés en español (1995–2012), portugués (1760–1800) y francés (2030–2050, pantalla ancha), sin errores ni textos rotos. Partidas 1700–2120 sin errores ni quiebra. Documento .docx validado con un lector de Word; secuelas con contratos comprados, videojuego sin intérprete, clasificación X y estudio pequeño frente a los eventos.
- **Ronda final:**
  - Prueba de estrés en español (1995–2012), portugués (1930–1950) y francés (2040–2060, pantalla ancha): entre 3.300 y 3.500 pulsaciones cada una, sin errores ni textos rotos.
  - Partidas automáticas 1700–1760, 1880–1960, 1960–2040 y 2040–2120, sin errores ni quiebra.
  - Sets: cuatro superproducciones y 20 años simulados, con reutilización, alquiler, tour, desgaste, restauración y demolición.
  - «Avanzar» en los seis medios, planes de salida en todos los medios, documento de la idea desde la ficha final (obras nuevas y anteriores) y eventos (la escuela no aparece al empezar, sí después de veinte años).
  - App Android: se simuló el envoltorio en Chromium (mismo origen https y mismo puente): guarda la partida, exporta, guarda documentos, imprime a PDF y el botón Atrás cierra ventanas antes de salir. El .aab pasa la validación oficial (`bundletool validate`).

- **Ronda de ayudas, calendario, lanzamiento y música:**
  - Prueba de estrés en español (1995–2012, 3.453 pulsaciones), francés (2040–2060, pantalla ancha, 3.453), portugués (1930–1950, 3.243) e inglés (1985–2000, 3.433): sin errores ni textos rotos.
  - **Textos largos sin traducir:** `node tools/huecos.js salida.json` juega 17 años en español y lista los trozos que el francés o el portugués dejan en español (los números van como «#»).
- **Estabilidad de la traducción:** se tradujo dos veces cada texto visible de las pestañas, los creadores, los ajustes, las ayudas y el plan de salida en los cuatro idiomas, y ya ninguno cambia. Así se corrigieron tres fallos que podían congelar la pantalla o repetir palabras:
    - En francés, el espacio antes de los dos puntos se volvía a añadir en cada pasada.
    - En inglés salían «reality show show», «The The Matrix» y «Azul… (Blue) (Blue)».
    - Ahora un texto ya traducido no se traduce otra vez.
  - Partidas automáticas 1700–1780, 1880–1960, 1960–2040 y 2040–2120: sin errores, sin quiebra y sin «undefined» ni «NaN» en pantalla.
  - Presupuesto exacto en los cuatro idiomas y en «dólares de hoy»; ayudas que se cierran con Atrás y Escape; campaña en reposo, estreno 60 semanas después sin volver a pagar y estreno en una Semana de la Moda con su logro oculto.
  - El .aab pasa `bundletool validate`, y el juego dentro del .apk es idéntico byte a byte a `dist/INDUSTRY_ART.html`.

- **Especie o forma de cada personaje:** en la tarjeta de cada personaje se elige qué es. Hay 16 formas: humano, animal, animal que habla, extraterrestre, robot o androide, monstruo, monstruo no muerto (vampiro, zombi, momia), monstruo cambiaformas (hombre lobo), dios o ser mitológico, criatura fantástica, espíritu o fantasma, ángel o demonio, superhumano o mutante, objeto con vida, planta o naturaleza viva y concepto encarnado (la Muerte, el Tiempo).
  - **Costo:** en imagen real, los no humanos cuestan más (de +2 % a +7 % por personaje principal; los secundarios cuentan menos). Pasa del maquillaje a la animatrónica y los efectos, con un tope de +25 % y una semana más si el gasto es grande. En animación no cuestan nada. En captura de movimiento o actores digitales cuestan la mitad, en teatro y videojuegos menos, y en libros y música nada.
  - **Encaje:** si la especie encaja con los géneros de la obra (un dragón en fantasía, un extraterrestre en ciencia ficción) suma público y crítica. Si no encaja, resta, salvo en comedia, surrealismo o experimental. En una obra de realidad, los seres imposibles restan credibilidad. Tres o más especies en fantasía, ciencia ficción o aventura dan «un mundo poblado de criaturas».
  - **Personajes nuevos:** nacen con una especie que le sienta a la obra. Una animación infantil trae animales que hablan u objetos con vida; el terror, monstruos y espíritus; los superhéroes, mutantes. Un dado propone otra especie al azar.
  - **Documento y ayuda:** el documento de la idea muestra la especie de cada personaje, y tiene su ayuda «i» con un dato curioso, en los cuatro idiomas.
- **Personajes prestados (como Drácula en una película de Batman):** en el creador, el botón «Traer un personaje existente» lleva a tu historia un personaje de otra obra sin adaptar la original. Llega con su nombre, su sexo y su especie.
  - **Dominio público:** los personajes de las obras cuyos derechos ya vencieron. Son gratis.
  - **Obras famosas:** los personajes de las obras reales de la historia (Batman, Superman, Spider-Man…). Si sus derechos siguen vigentes, cobran una licencia de +3 % a +10 % del presupuesto según su fama (los secundarios, menos); si ya cumplieron 95 años, son gratis.
  - **Tus franquicias:** los personajes de tus obras estrenadas, con su especie, edad y arquetipo. Cuando el préstamo se estrena, su saga gana interés.
  - **Tus derechos y material:** los personajes de lo que compraste o creaste.
  - **Efectos:** un personaje conocido atrae público según su fama, y los clásicos suman un poco de crítica. Si lo usas en muchas obras, el público se cansa: «el público ya los vio demasiado». Si le cambias el nombre, deja de reconocerse.
  - **Origen visible:** la tarjeta y el documento de la idea muestran de dónde viene: «De «Drácula» · dominio público».
  - **Especie de cada personaje del catálogo:** los personajes de las 333 obras de dominio público y de las obras reales traen su especie asignada, también al adaptar la obra completa. El conde Drácula es «Monstruo no muerto»; la criatura de Frankenstein, «Monstruo»; el Espantapájaros, un objeto con vida; el Hombre de Hojalata, un robot; Pinocho, un objeto con vida; el Grillo Parlante, un animal que habla; Superman, un extraterrestre; Spider-Man, un superhumano.
  - Para que se lean como monstruos, «No muerto» pasó a llamarse «Monstruo no muerto» y «Cambiaformas», «Monstruo cambiaformas».
- **Lo que estaba pendiente, resuelto:**
  - **Francés y portugués completos en los textos largos:**
    - El catálogo de obras clásicas (dominio público y derechos) estaba casi todo en español: 285 de sus 333 sinopsis. Ahora están las 333, con los personajes de cada obra («le narrateur», «as três bruxas»…).
    - Se tradujeron también las ayudas de los negocios (bancos, filiales, sedes, parques, inversiones, piratería, casino, inventos, construcciones), las metas, los logros y las listas de subgéneros, temas y épocas.
    - Las noticias y cartas con nombres que cambian en cada partida salen enteras en el idioma del jugador: estrenos de rivales, fechas apartadas, filtraciones, fallecimientos, ideas que te proponen, festivales, rumores del jurado, la biografía del estudio y las cartas de los fans.
    - Se ordenaron en `src/mod/i_dic12.js`, `i_dic13.js`, `j_idioma3.js` y `j_idioma4.js`.
  - **Días y meses:**
    - El calendario muestra los días y meses propios de cada idioma: «lun mar mer», «seg ter qua» o «Mon Tue Wed».
    - Las fechas en francés y portugués salen completas: «Lundi 3 janvier 2011», «Segunda-feira 3 de janeiro de 2011».
    - Se corrigió el «mar» de martes que en francés salía como «mars», y en inglés el «Mar» de marzo que salía como «Sea».
  - **Traducción estable:** cada texto traducido queda igual si se traduce otra vez. Dos casos en francés podían congelar la pantalla: el punto de «nov.» y el espacio antes de los dos puntos («Premium  : ») se añadían una y otra vez.
  - **Español:** «inclina a la equilibrio» pasó a «busca el equilibrio»; también se distinguen «inclina a la crítica» e «inclina al público».
- **Pruebas de esta ronda:**
  - Prueba de estrés en español (3.426 pulsaciones), francés (3.489, pantalla ancha), portugués (3.313) e inglés (3.426): sin errores ni textos rotos.
  - Partidas 1700–2120 sin errores ni quiebra.
  - Recorrido de todas las pestañas en francés y portugués tras 17 años de partida, sin bloqueos.

## Lo que queda pendiente
- Probar la app en un teléfono real. Aquí no se puede: el contenedor no tiene la aceleración que necesita el emulador de Android. El envoltorio se probó en Chromium con el mismo origen y el mismo puente.
- De la versión 1.0 no se trajo «Quitar anuncios», porque esta versión no tiene anuncios.

## Cómo trabajar
- **Base:** `src/base.html`. Los módulos nuevos van en `src/mod/*.js` y `src/mod/*.css`, que se cargan en orden alfabético.
- **Armar:** `python3 tools/build.py` genera `dist/INDUSTRY_ART.html`.
- **App Android:** `tools/android.sh dist/INDUSTRY_ART.html dist/INDUSTRY_ART_1.0 <llave.jks> <android.jar> <bundletool.jar>` arma el .apk y el .aab desde `android/`. Necesita Java, las build-tools de Android (variable `BT`), el `android.jar` de la plataforma 36 y bundletool.
- **Probar:** `node tools/run.js 'await BOT.correr({y0:1990,y1:2010}); return 1'`.
- **Prueba de estrés:** `node tools/monkey.js <año inicial> <año final> <ancho> [es|en|fr|pt]`.
- **Cobertura de idiomas:** `node tools/cov2.js fr salida.txt [largo máximo]` recorre las pestañas, el creador (detallado y rápido) de los seis medios, los ajustes y el plan de salida, y lista los textos que siguen en español.
- **Textos largos sin traducir:** `node tools/huecos.js salida.json` juega 17 años en español y lista los trozos que el francés o el portugués dejan en español (los números van como «#»).
- **Estabilidad de la traducción:** `node tools/estable.js fr salida.txt` lista los textos que cambiarían si se tradujeran otra vez. Debe salir vacío: un texto inestable hace que la traducción de la pantalla no termine nunca.
