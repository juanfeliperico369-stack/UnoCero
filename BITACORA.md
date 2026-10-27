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
- **Temas y tópicos:** se agregó el tema «Política».
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
- **Idiomas:** francés y portugués en Ajustes y en la portada (botones FR/PT). Traducen la interfaz; los textos largos que no están en el diccionario siguen en español.
- **Títulos automáticos:** concordancia de género y número («Quimera perdida», «Cenizas eternas», «La última de las sombras»).
- **Contenido nuevo:**
  - 41 hitos reales con contexto, de 1710 a 2023;
  - 15 datos curiosos;
  - 15 obras de dominio público con temas, personajes y sinopsis (Drácula, Los Miserables, La Odisea, Las mil y una noches, María, Popol Vuh…).
- **Traído de la versión 1.0:** encargo automático, cronología del estudio (Salón → Tu estudio) y estado anual (Finanzas: caja, valor del catálogo, deudas y patrimonio).
- **Creador:** más espacio entre bloques y etiquetas.
- **Limpieza:** se quitaron comentarios de desarrollo, marcas de versión y referencias a herramientas. Los créditos dicen solo OneZero · Infinite Tree. La versión es 1.0.

## Pruebas
- **Partidas automáticas en Chromium:** 1920–1960, 1960–1975, 1990–2012 y 1995–1997, sin errores.
- **Funciones nuevas una por una:** encargos, exclusivas, música, casino, piratería, TV, streaming, crossover, clasificación, ficha pop, temas, avatar, arquetipos, documento, cronología y balance. Todas sin errores.
- **Pantallas:** se revisaron a 420 px el documento, los retratos y el tema minimalista.

## Lo que queda pendiente
- El francés y el portugués cubren la interfaz. Para traducir las descripciones largas, noticias y eventos hay que seguir ampliando `src/mod/i_dic.js`.
- No se revisó una por una cada opción del creador para confirmar su peso en el resultado. Solo se ajustaron las que se tocaron en esta versión.
- La versión 1.0 tiene otras funciones que aquí no se trajeron:
  - compra de derechos de libros y franquicias rivales con regateo;
  - biblioteca de clásicos;
  - modo rápido de 12 decisiones;
  - línea de vida de talentos;
  - premios en vivo;
  - pirámide de edades;
  - quitar anuncios.
- Probar el APK en un teléfono real (no se pudo aquí).

## Cómo trabajar
- **Base:** `src/base.html`. Los módulos nuevos van en `src/mod/*.js` y `src/mod/*.css`, que se cargan en orden alfabético.
- **Armar:** `python3 tools/build.py` genera `dist/INDUSTRY_ART.html`.
- **APK:** `tools/apk.sh <apk base> dist/INDUSTRY_ART.html <salida> <llave>` (necesita build-tools de Android).
- **Probar:** `node tools/run.js 'await BOT.correr({y0:1990,y1:2010}); return 1'`.
