# INDUSTRY ART 1.0 — Bitácora de la versión final

Creado por OneZero · Infinite Tree.

## Entregables
- `dist/INDUSTRY_ART.html`: el juego completo, funciona sin conexión.
- `dist/INDUSTRY_ART_1.0.apk`: la app Android, montada sobre la app 1.0 que ya existía (Capacitor). La llave de firma es nueva (CN=OneZero, O=Infinite Tree) porque la anterior no venía en los archivos. Si en el teléfono está instalada una versión firmada con otra llave, primero hay que desinstalarla.

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
  - Unas 12.000 frases por idioma, incluidos todos los hitos históricos, los datos curiosos, las ayudas y los 112 logros.
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
- **Gramática:** concordancia de las sinopsis («una persona común se ve obligada»), artículos de plurales femeninos («las religiones ancestrales») y el logro «Gana 10 Premios de la Academia».
- **Ficha del talento:** decía «Acepta obras hasta X»; ahora dice «Se desenvuelve mejor hasta X (más allá cobra más y rinde menos)», acorde con la nueva regla.
- **Selector con buscador:** el campo de búsqueda toma los colores del tema.
- **Creador:** más espacio entre bloques y etiquetas.
- **Limpieza:** se quitaron comentarios de desarrollo, marcas de versión y referencias a herramientas. Los créditos dicen solo OneZero · Infinite Tree. La versión es 1.0.

## Pruebas
- **Partidas automáticas en Chromium:** 1750–1830, 1780–1840, 1920–1975, 1925–1985, 1990–2035, 1990–2060 y 2026–2120, sin errores ni quiebra.
- **Prueba de estrés de la interfaz** (`tools/monkey.js`): pulsa los botones de todas las pestañas y de las ventanas que abren. Se corrió en cuatro situaciones, cada una con unas 3.100–3.500 pulsaciones: 1995–2010 en teléfono, 1780–1810 en pantalla de computador, 2080–2100, y 1960–1985 con la interfaz en francés. Cero errores en las cuatro.
- **Guardar y cargar:** la partida conserva obras, exclusivas, avatar y logros, y sigue jugándose sin errores.
- **Encargo automático:** probado en los seis medios.
- **Rendimiento:** traducir al francés o al portugués no hace más lenta la interfaz.
- **Funciones nuevas una por una:** encargos, exclusivas, música, casino, piratería, TV, streaming, crossover, clasificación, ficha pop, temas, avatar, arquetipos, documento, cronología y balance. Todas sin errores.
- **Pantallas:** se revisaron a 420 px el documento, los retratos y el tema minimalista.

## Lo que queda pendiente
- En francés y portugués, las noticias y eventos largos con muchas variables pueden mostrar partes en español. Para cubrirlos, se amplían `src/mod/i_dic*.js` o las reglas de `src/mod/j_idioma.js`.
- La abreviatura «mar» se usa en el juego para marzo y para martes, así que en portugués puede salir «Mar» donde debería decir «Ter».
- De la versión 1.0 no se trajo «Quitar anuncios», porque esta versión no tiene anuncios.
- Probar el APK en un teléfono real (no se pudo aquí).

## Cómo trabajar
- **Base:** `src/base.html`. Los módulos nuevos van en `src/mod/*.js` y `src/mod/*.css`, que se cargan en orden alfabético.
- **Armar:** `python3 tools/build.py` genera `dist/INDUSTRY_ART.html`.
- **APK:** `tools/apk.sh <apk base> dist/INDUSTRY_ART.html <salida> <llave>` (necesita build-tools de Android).
- **Probar:** `node tools/run.js 'await BOT.correr({y0:1990,y1:2010}); return 1'`.
- **Prueba de estrés:** `node tools/monkey.js <año inicial> <año final> <ancho> [es|en|fr|pt]`.
- **Cobertura de idiomas:** `node tools/cov2.js fr salida.txt` lista los textos que siguen en español.
