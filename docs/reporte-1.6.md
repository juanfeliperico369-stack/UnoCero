# INDUSTRY ART · Informe de la versión 1.6

Lo que se agregó y corrigió a partir de las pruebas de juego del autor, cómo funciona y cómo se verificó.

## 1. Crear para un festival

- **Dónde:** Mundo → Premios, arriba de la lista de festivales.
- **Cómo se usa:** eliges uno de los próximos festivales (con al menos 22 semanas de margen) y el medio.
- **Automático:**
  - Arma la obra con el equipo y el reparto recomendados y un 15 % más de presupuesto, y la produce.
  - Cuando está lista, la estrena con el mejor plan en la semana del festival.
- **Detallado:** abre el creador con todo prellenado.
- **Efecto:** si llega a tiempo, la obra gana +2 de crítica, +1 de público y +6 de expectativa. Si se atrasa, sale con un plan normal y una noticia lo avisa.
- **Dato:** el Festival de Venecia, nacido en 1932, es el festival de cine más antiguo que sigue en activo.

## 2. Presupuesto anual por medio

- **Dónde:** en la pestaña de cada medio, bajo su infraestructura.
- **Cuánto:** cada año apartas el 2, 5, 10 o 20 % de tu caja para ese medio.
- **Filiales:** las que son fuertes en ese medio aportan el 5 % de su caja, como mucho medio presupuesto típico.
- **Producción:** cada mes, si queda dinero, un talento firmado de ese medio o un subproductor ejecutivo propone un proyecto y lo produce solo. Tu personal de oficina le suma calidad.
- **Misión anual:** estrenar 1 obra más que tu nivel de presupuesto. Al cumplirla ganas dinero (un cuarto de presupuesto típico por obra) y +2 de prestigio.
- **Oficios:** en la ficha de un talento firmado eliges de qué medio propone proyectos («Propone proyectos de»). Así un guionista puede ser de cine, de series o de videojuegos.

## 3. Tu prensa

- **Dónde:** pestaña Editorial, bajo su infraestructura.
- **Puestos:** escritores o editores en nómina para:
  - tu revista y tu periódico;
  - tu agencia de prensa (desde 1835);
  - tu noticiero (desde 1922);
  - tus redes sociales (desde 2004).
- **Efecto:** cobran un sueldo mensual y, según su habilidad, suben cada mes tus fans, tu prestigio y la expectativa de tus obras en marketing.
- **Dato:** la primera agencia de noticias, Havas, nació en París en 1835 y es el origen de la actual AFP.

## 4. Redes de distribución por medio

- **Dónde:** Negocio → Distribución, sobre las cadenas de cines.
- **Qué se compra, por medio y según la época:**

| Medio | Redes |
|---|---|
| Series | Radio (1940–1975), televisión (desde 1946), streaming (desde 2007) |
| Videojuegos | Salones arcade (1971–2005), fabricantes de consolas (desde 1977), tiendas digitales (desde 2003), tiendas de aplicaciones (desde 2008) |
| Teatro | Circuitos de teatros, ópera (desde 1637), circo (desde 1768), café-concierto y vodevil (1850–1935), clubes de comedia (desde 1960) |
| Música | Editoras de partituras (hasta 1960), tiendas de discos (1900–2012), tiendas digitales (2003–2030), apps de streaming (desde 2008) |
| Libro | Librerías, quioscos (desde 1830), clubes de lectura por suscripción (desde 1926), libros electrónicos (desde 2007) |

- **Matemática:**
  - **Control:** lo que controlas de un medio es la suma de las cuotas de tus redes, pesada por lo vigente que está cada tipo de red en ese año.
  - **Ventas de tus obras:** suben hasta un 25 % en ese medio, en proporción a lo que controlas. Las plataformas de streaming suman también un poco a tus películas.
  - **Ingresos semanales:** el 7 % de lo que mueve el mercado de ese medio, multiplicado por lo que controlas.
  - **Precio:** sigue el tamaño del mercado (35 % de un año de mercado por la cuota de la red).
  - **Mantenimiento:** 0,25 % del valor al mes.
  - **Venta:** recuperas el 85 %.
  - **Fin del formato:** cuando el formato termina (los salones arcade en 2005, las tiendas de discos en 2012), la red cierra y recuperas el 30 % de lo que pagaste.
- **Prueba:** comprar 8 redes de música en 2010 (control del 67 %) dio unos ingresos brutos de alrededor del 9 % al año, más un +17 % en las ventas de tus obras musicales.
- **Nombres:** son ficticios (por ejemplo, Kaiju Interactive, Forja Digital o Sonar), para que la versión de tienda no use marcas reales. Los nombres reales pueden ir en la edición real o en un paquete `.iamundo`.
- **Dato:** el primer club de lectura por suscripción, el Book-of-the-Month Club, nació en Nueva York en 1926 y llegó a enviar millones de libros por correo.

## 5. Capital automático para filiales

- **Dónde:** en la tarjeta de Filiales y junto a cada pedido de capital.
- **Regla:** si alcanza el dinero, da el capital (tu caja debe quedar con al menos el doble de lo pedido y la filial debe valer más que eso). Si no alcanza, lo niega y la filial recorta su producción, como al negarlo a mano.

## 5b. Las sedes también dan dinero

- **Ingresos:** cada sede en otro país ingresa dinero cada mes, porque alquila sus instalaciones y dobla y distribuye tu catálogo en su país.
- **Cálculo:** el ingreso crece con el nivel (×1,2, ×3 y ×5 del gasto base) y con el tamaño del mercado del país (de ×0,8 a ×3).
- **Gasto e ingreso:** cada fila de la lista muestra los dos por mes.

| Ejemplo (2050) | Nivel 1 | Nivel 3 |
|---|---|---|
| China | gasta $1,57 M · ingresa $4,14 M | gasta $5,35 M · ingresa $17,2 M |
| Corea del Sur | gasta $1,54 M · ingresa $2,34 M | gasta $5,25 M · ingresa $9,76 M |
| Vanuatu | gasta $1,77 M · ingresa $1,70 M | gasta $6,02 M · ingresa $7,09 M |

- **Rentabilidad:** en los mercados grandes la sede gana desde el primer nivel; en los pequeños se paga al subir de nivel. Se suman las ventajas que ya tenía: rodar un 15 % más barato, talentos locales un 10 % más baratos, público en la región, ventas mundiales y producción extra.

## 6. Ficha del talento

- **Premios ganados:**
  - Una lista con año, categoría (en femenino o masculino según la persona), premio y obra. Si la obra es tuya, se puede abrir.
  - Aparte, en una sección plegable, las nominaciones contigo.
  - **Premios anteriores:** los que el talento ganó antes de esta versión, o antes de tu partida, se reconstruyen con su historial de obras, respetando el medio y el año de fundación de cada premio.
- **Relaciones:**
  - **Antes:** era una sola línea con decenas de nombres.
  - **Ahora:** se agrupan en pareja, parejas anteriores, amistades y rivalidades. Cada grupo muestra 5 nombres que se pueden tocar y el resto queda en «Ver más».
- **Parejas:**
  - Nadie tiene dos parejas vivas a la vez y la diferencia de edad de una pareja nueva es de 15 años como máximo.
  - En las partidas viejas, las parejas sobrantes pasan a «parejas anteriores».
- **Texto de clasificación:** «Se desenvuelve mejor hasta R» ahora dice «Trabaja a gusto en obras con clasificación hasta R; en obras más adultas cobra más y rinde menos».

## 7. Volver a la ficha y la pantalla en su lugar

- **Antes:** el botón «Volver a la ficha de…» solo aparecía en las obras propias abiertas desde «Obras contigo».
- **Ahora:** aparece en todo lo que se abre desde una ficha:
  - obras propias y rivales del historial;
  - obras anteriores a tu partida;
  - fichas de otros talentos (relaciones);
  - el resto de ventanas que se abren desde la ficha.
- **Posición:** al volver, la ficha queda en la misma posición en la que estaba.
- **Cadenas de fichas:** se pueden encadenar varias fichas y volver paso a paso.
- **Ficha completa:** al tocar «Lista corta», «Becar» o el medio de un talento firmado, la ficha ya no pierde la línea de vida, los premios ni el botón de volver.

## 8. Tu avatar: cuerpo, forma y práctica

- **Estatura y complexión:**
  - Se eligen al crear el personaje (grupo «Cuerpo») y en «Editar avatar».
  - El dado propone valores creíbles.
- **Ponerse en forma:**
  - **Rutinas:** ligera o intensa. Cuestan un poco de dinero y de energía al mes y suben la forma física.
  - **Complexión:** con constancia, se acerca a la atlética (un paso cada 12 meses con la rutina ligera y cada 6 con la intensa).
  - **Beneficios:** con más de 60 de forma recuperas hasta 3 de energía extra al mes.
- **Practicar habilidades:** un minijuego por oficio.

| Oficio | Minijuego |
|---|---|
| Escritura | Ordenar una frase (en el idioma del juego) |
| Dirección, fotografía y diseño | Encuadrar en el momento justo |
| Producción | Cuadrar un presupuesto sin pasarse |
| Composición | Repetir una secuencia de notas, con sonido |
| Interpretación | Repetir una secuencia de emociones |
| Edición | Ordenar planos por su tiempo |

- **Experiencia:**
  - La puntuación (0 a 100) da experiencia, y cada 100 de experiencia sube 1 punto la habilidad.
  - A más habilidad, menos experiencia por práctica; con poca energía rindes la mitad.
  - Las 3 primeras prácticas de cada semana suman.
- **Datos:**
  - Para *Toro salvaje* (1980), Robert De Niro subió unos 27 kilos.
  - La idea de las «10 000 horas» viene de un estudio de 1993 de Anders Ericsson con violinistas; él mismo aclaró que importa más la práctica deliberada que la cantidad de horas.

## 9. Errores corregidos

- **Selector de festival:** el que se agregó en esta versión dejaba de funcionar en el juego final por un nombre interno. Se encontró en las pruebas y se corrigió antes de publicar.
- **Botones de especialidad:** al elegir el medio de un talento firmado, la ficha se redibujaba sin esos botones; ahora se mantienen.

## Pruebas de esta versión

- **Prueba de funciones nuevas** (partida de 1990 a 2011):
  - El festival automático produce y programa la obra para la semana del festival.
  - El detallado abre el creador con el festival.
  - El presupuesto de cine produjo 5 proyectos en 6 meses.
  - La especialidad se mantiene en la ficha.
  - La prensa contrata y paga sueldo.
  - Hubo 203 talentos con premios registrados.
  - Los premios anteriores se reconstruyen.
  - Volver deja la ficha en la misma posición (900 → 900 píxeles).
  - Nunca hay más de 1 pareja viva por talento.
  - Las rutinas mueven la complexión.
  - Los 5 tipos de minijuego dan experiencia, la cuarta práctica de la semana no suma y la secuencia musical se muestra y queda lista para repetir.
- **Redes de distribución** (partida de 1995 a 2014):
  - Precios por medio coherentes con el tamaño del mercado.
  - La compra, la venta (85 %) y el cierre por fin de formato funcionan.
  - El capital automático da o niega según la caja.
- **Partida de la 1.5.3:** abre en la 1.6 sin errores.
- **Toques al azar:**
  - 1990–2010: 476 acciones distintas y 0 errores.
  - 2005–2030: 503 acciones distintas y 0 errores.
- **Pantalla fija:**
  - 643 toques reales y 6 avisos, los mismos de versiones anteriores: son botones que desaparecen al usarse.
  - El reestreno no mueve la pantalla.
