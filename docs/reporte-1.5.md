# INDUSTRY ART · Informe de verificación de las versiones 1.5 a 1.5.3

Lo pedido después de la 1.4, qué cambió, cómo comprobarlo y qué midieron las pruebas. El informe completo de la 1.4 sigue en `reporte-1.4.md`.

## 1. Cuatro divisiones también en Franquicias

- **Antes:** las cuatro divisiones (Propias, De tus talentos, Compradas, Con rivales) solo existían en el catálogo de obras; la lista de Franquicias mostraba todo junto.
- **Ahora:** Obras → Franquicias tiene las mismas cinco opciones (las cuatro y Todas), con el número de franquicias en cada una. Una franquicia toma el origen de su primera obra: comprada si la compraste, «Con rivales» si nació como coproducción, encargo o cofinanciación, y «De tus talentos» si la hizo un talento firmado por su cuenta.
- **Medido:** en una partida de prueba, «Con rivales» mostró 5 franquicias de 10.

## 2. «Catálogo» en lugar de «Filmografía»

- La pestaña se llama **Catálogo** (Catalog, Catalogue, Catálogo) y la tarjeta **Catálogo de obras**, porque reúne cine, series, videojuegos, teatro, música y libros. Las ayudas también se actualizaron.
- **Medido:** revisado en los cuatro idiomas.

## 3. Tus talentos firmados sí producen

- **Por qué no producían:** solo producían solos las propuestas de los contratos especiales (autores de la casa, showrunners, bandas y compañías aliadas). Un talento con contrato exclusivo casi nunca proponía nada, así que no había qué producir.
- **Ahora:**
  - Cada talento con contrato exclusivo, y cada subproductor ejecutivo, te propone un proyecto cada pocos meses en el medio que domina. Llega en las propuestas de ese medio como «de tu contrato», sin costo de derechos, y con una noticia.
  - En la tarjeta «Tus talentos producen solos» de cada medio:
    - el botón **Dar luz verde** acepta de una vez todas las propuestas de tu contrato;
    - el interruptor **Luz verde automática** las acepta solas apenas llegan.
  - Al firmar a un talento en exclusiva, una noticia te dice qué construir para que produzca solo.
  - Al cargar tu partida, el material que ya tenías de tus talentos firmados y no habías producido entra a la cola de producción automática. Si no lo quieres, lo quitas de la cola.
- **Medido:** con infraestructura y luz verde automática, ocho talentos firmados produjeron 8 obras en 10 meses, sin intervención.

## 4. Presupuesto acordado y cofinanciación al encomendar

- **Presupuesto acordado:** al encomendar a un rival, a una filial, a un talento firmado o a un subproductor ejecutivo eliges entre Ajustado (×0,6), Normal, Amplio (×1,5) y Superproducción (×2,5). Está en la hoja «Encomendar», en «Encargar una obra a otro estudio» y en el encargo a talentos.
- **El rival pone de su dinero:** puede poner el 25, 40 o 50 % del costo. Tú pagas menos y, cuando la obra pasa al archivo, él se queda con esa misma parte de lo que ganaste. Solo acepta si tiene la caja; si no, la obra sigue sin cofinanciación y se te avisa. La ficha de la obra dice cuánto puso y qué parte se lleva.
- **Subproductores ejecutivos:** ahora aparecen en la lista para encomendar junto con tus talentos firmados.
- **Medido:** una obra encargada con presupuesto amplio, con el rival poniendo el 40 %, te costó $112 M; una obra propia normal costó $132 M.

## 5. Errores corregidos

- **Energía negativa:** con muchos talentos produciendo a la vez, la energía podía quedar en −10 hasta el mes siguiente. Ahora nunca baja de 0.
- **Títulos repetidos en obras automáticas:** si una obra que producen tus talentos sale con el título de otra tuya, recibe uno nuevo.
- **Coproducciones:** los proyectos en conjunto que te proponen los rivales (desde «Propuestas para ti») cobraban dos veces: bajaban las ventas al 60 % y además el rival se llevaba su parte de las ganancias. Ahora solo se reparte la ganancia acordada.

## 6. Versión 1.5.1: archivo, streaming y canal

- **Divisiones en el archivo:** el archivo de la línea de producción tiene Propias, De tus talentos, Compradas, Con rivales y Todas, con el número de obras en cada una. En «Lo que haces tú» abre en Propias y en «Segundo plano», en De tus talentos.
- **Tus obras siempre en tu plataforma y tu canal.** No aparecían por tres motivos:
  - Las obras con licencia vendida salían de tu catálogo. Ahora vender licencias (por un año a la TV o por 3 años al streaming) ya no las saca; solo salen si vendes todos los derechos.
  - Las obras compradas competían por el mismo espacio y podían dejar fuera las tuyas. Ahora tus obras y las de tus filiales no ocupan espacio del catálogo y siempre se ven.
  - Las obras que tus filiales estrenaron antes de que las compraras nunca entraban. Ahora entran al cargar la partida y cada mes.
- **Medido:** con el catálogo lleno de 400 títulos de calidad 95, se veían tus 209 obras, también las 5 con licencia vendida. Una filial con 27 obras estrenadas pasó de 0 a 27 en tu plataforma y en el catálogo del canal.
- Tus obras llegan a la plataforma cuando pasan al archivo (las originales, desde su estreno); la plataforma lo explica en una nota.

## 7. Versión 1.5.2: la pantalla no se mueve al reestrenar

- **Qué pasaba:** al tocar «Reestrenar» en una obra del archivo, la vista saltaba hacia arriba entre 2.000 y 4.400 px. La obra sale del archivo y sube a «En cartelera», y la pantalla se anclaba a los otros botones de esa misma tarjeta («Ficha»), así que la seguía hasta arriba. Lo mismo podía pasar con cualquier acción que mueve una obra a otra sección, como confirmar un plan de lanzamiento.
- **Ahora:**
  - La pantalla se ancla en el contenido que no se movió: lo que está arriba del botón tocado, sin contar la tarjeta que cambia de lugar.
  - Si un ancla tendría que mover la vista más de casi una pantalla, se descarta, porque significa que ese contenido cambió de sección.
  - Cuando actúas desde una ficha u hoja abierta, la página de fondo también queda en su lugar.
  - Si al tocar algo la página queda más corta (por ejemplo, un filtro sin obras), se deja un espacio provisional al final para que la vista no se corra; desaparece al cambiar de sección.
- **Medido con toques reales:** al reestrenar desde la tarjeta o desde la ficha, las tarjetas de arriba quedan exactamente donde estaban (0 px) y las de abajo suben una tarjeta para ocupar el hueco. Antes la vista se iba 2.000 px o más hacia arriba. En 631 toques reales por todas las secciones, los saltos detectados bajaron de 16 a 6, y al revisarlos uno por uno lo que estaba arriba del botón quedó quieto (0 a 3 px); solo subió lo de abajo cuando se liberó espacio. El filtro del catálogo, que movía la vista 76 px, ahora la mueve 2 px.

## 8. Versión 1.5.3: reestrenos automáticos

- **Dónde:** en Obras → Proyectos, debajo del título del archivo, hay una tarjeta «Reestrenos». Muestra cuántas obras se pueden reestrenar (pasaron 5 años desde su último estreno), cuántas conviene, cuántas están en la bóveda, cuántas tienen mala fama y cuántas esperan en cola.
- **«Reestrenar las que conviene»:**
  - Reestrena de inmediato las 2 mejores de cada medio y deja en cola las 2 siguientes, que salen de a una por medio cada mes para no competir entre sí.
  - Deja fuera las que guardas en la bóveda, porque ganan +8 si esperan 5 años guardadas, y las de mala fama: «Podrida», y «Olvidado» si no está remasterizada.
- **«Reestreno automático»:** reestrena la mejor obra disponible de cada medio, como máximo una vez cada 3 meses por medio.
- Ningún reestreno gasta más del 20 % de tu caja.
- **Etiquetas de fama traducidas:** «Invaluable», «Culto», «Olvidado» y «Podrida» salían en español en otros idiomas; ahora se ven como Priceless/Inestimable/Inestimável, Cult/Culte, Forgotten/Oublié/Esquecido y Rotten/Pourri/Podre.
- **Medido:**
  - Con 390 obras disponibles, el botón reestrenó 12 (2 por medio) por $14,3 M y dejó 12 en cola, que se vació en dos meses.
  - En un año, el modo automático hizo 24 reestrenos (uno por medio cada 3 meses).
  - Las 3 obras de la bóveda siguieron guardadas, y con la caja casi vacía no reestrenó nada.
  - Al tocar el botón, la pantalla no se movió (0 px), aunque 12 obras subieron a «En cartelera».

## 9. Versión 1.5.3: el catálogo de una filial pasa al instante

- **Qué pasaba:** al comprar un rival, su catálogo pasaba a tu plataforma recién en el siguiente mes. En tu canal, sus obras quedaban disponibles, pero nadie las ponía en la parrilla si no la reprogramabas tú.
- **Ahora:**
  - En el momento de la compra, todas las obras ya estrenadas del estudio pasan a tu plataforma y a tu canal, y una noticia te dice cuántas son.
  - Tu canal llena las franjas vacías y cambia la programación genérica por obras de tus filiales cuando dejan más. Tus propias obras ya programadas no se tocan. Lo repite cada mes mientras tengas filiales.
- **Medido:** al comprar Tigre Media, sus 46 obras aparecieron en tu plataforma en el mismo instante (antes, 0 hasta el mes siguiente) y 12 franjas de tu canal pasaron a emitirlas.

## 10. Versión 1.5.3: comprarlo todo, idiomas y navegación

- **Sin compras bloqueadas:** puedes comprar todos los estudios rivales y todos los bancos. Si una compra te pasaría del 35 % de un mercado, el botón avisa («con riesgo antimonopolio» o ⚠).
- **Antimonopolio menos seguido:** la investigación llega como mucho una vez cada 5 años. El decreto, que dura 2 años y es más suave, solo aparece a veces si te investigan de nuevo. La multa por tener más de 3 bancos es una vez al año.
- **Logros nuevos:** «Monopolio» (más del 60 % de un mercado), «Dueño de la banca» (todos los bancos) y «El monopolio más grande» (todos los rivales abiertos).
- **Idiomas:** los talentos aprenden idiomas con los años, más rápido si son tuyos.
- **Tu ficha personal** se abre desde la pestaña del avatar.
- **Volver al talento:** si abres una obra desde la ficha de un talento, arriba aparece «Volver a la ficha de…».
- **Medido:** compraste los 17 rivales y los 6 bancos sin bloqueos, y hubo 1 investigación en 10 años. Los talentos aprendieron 114 idiomas en 3 años.

## Pruebas de esta versión

| Prueba | Resultado |
|---|---|
| Carga del juego | 0 errores |
| Funciones nuevas (franquicias, catálogo, propuestas, luz verde, presupuesto, cofinanciación, subproductores) | Todas funcionan como se describe arriba |
| Traducciones de lo nuevo en inglés, francés y portugués | 0 textos sin traducir |
| Partida de la 1.3 abierta en la 1.5 y jugada 3 años más | Carga y sigue sin errores |
| Auditoría de lógica 1960–2040 (2.654 obras) | Encontró energía negativa en talentos muy ocupados (corregido: nunca baja de 0) y 1 título propio repetido (corregido: las obras automáticas con un título ya usado reciben otro) |
| Fuzz de interfaz 1990–2005 (457 acciones) | 0 errores |
| APK y AAB 1.5 | Misma llave que las versiones anteriores, versionCode 6, API 36 y el mismo juego que `industry-art/index.html` |

## Sugerencias finales

1. **Prueba cerrada ya.** Lo más valioso ahora son 12 personas jugando 14 días: sus partidas reales dirán qué falta equilibrar mejor que cualquier prueba automática. Pídeles que usen el informe para revisar.
2. **Equilibrar con datos reales.** Hay que revisar con partidas de verdad:
   - lo que rinden la consola, las licencias automáticas y la cofinanciación;
   - la música antes de 1900, que todavía rinde de más;
   - los videojuegos después de 2150, que tienden a perder dinero.
3. **Una bandeja de pendientes.** Un solo lugar con lo que espera tu decisión: obras listas para lanzar, propuestas de tu contrato, la cola que espera infraestructura y las ofertas. Así no hay que recorrer cada medio.
4. **Copia de seguridad automática.** Exportar el `.iasave` cada cierto tiempo a una carpeta del teléfono que elijas. Si desinstalas la app o cambias de teléfono, no se pierde nada.
5. **Rentabilidad por división.** Una tabla que compare lo que ganan tus obras propias, las de tus talentos, las compradas y las hechas con rivales, para decidir en qué invertir.
6. **Accesibilidad.** Probar el juego con TalkBack, el lector de pantalla de Android.
7. **Versión 2 más liviana.** El juego pesa 6,4 MB en un solo archivo. Separarlo en módulos y cargar cada idioma aparte lo haría abrir más rápido en teléfonos modestos.
