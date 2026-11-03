# INDUSTRY ART · Informe de verificación de la versión 1.4

Cada pedido, qué cambió, cómo comprobarlo en el juego y qué midieron las pruebas automáticas. Las pruebas jugaron partidas reales con el juego compilado (el mismo archivo que va dentro del APK).

## Resumen de pruebas

| Prueba | Resultado |
|---|---|
| Carga del juego sin errores | 0 errores |
| Partida de la 1.3 abierta en la 1.4 y jugada 3 años más | Carga y sigue sin errores |
| Auditoría de lógica: 1880–1960 y 1960–2040 con talentos firmados, propuestas y construcciones | ~4.800 obras revisadas; 0 muertos contratados, 0 menores de 5 años, 0 personajes con sexo distinto al del intérprete, 0 edades poco creíbles, 0 títulos propios repetidos, 0 cifras inválidas. Solo apareció 1 propuesta pendiente de un autor fallecido por era: corregido (esas propuestas ahora se retiran) |
| Partidas largas con las funciones nuevas: 1840–1905, 1950–2000, 1995–2045 | 0 errores |
| Bot en los extremos: 1700–1790 y 2210–2300 | 0 errores |
| Fuzz de interfaz (858 acciones al azar en 1930–1945 y 1995–2010) | 0 errores |
| Toques reales en pantalla táctil (624 toques en todas las secciones) | El punto que tocas queda fijo; ya no hay saltos al inicio ni el salto de 2.800 px que aparecía al aceptar propuestas |
| Traducciones de todo lo nuevo en inglés, francés y portugués | 0 textos sin traducir en las pantallas y ayudas nuevas |

## 1. Energía en lugar de «ocupado con un rival»

- **Antes:** un talento que trabajaba con un rival quedaba bloqueado semanas, aunque tuviera energía. Lo mismo le pasaba a tu avatar al aceptar trabajos de otros estudios.
- **Ahora:** cada papel o puesto quita 10 de energía (también con rivales) y se recuperan 10 al mes. Solo quedan fuera los que no tienen energía o fallecieron. Los retirados pueden volver si les pagas un 60 % más, y los retirados también envejecen y mueren.
- **Cómo verlo:** en la ficha de un talento verás «también trabaja con un rival hasta…» y aun así podrás contratarlo. Las propuestas para tu avatar dicen «te quita 10 de energía».
- **Medido:** un actor con energía 60 que trabajaba con un rival entró a una obra y quedó con 50; con energía 5 el juego explica «no le queda energía». Tu avatar con energía 100 trabajando para un rival sigue disponible.

## 2. Reparto recomendado y «Al mejor» con lógica

- **Antes:** elegían por nivel, casi sin mirar la edad, y cambiaban el sexo y el nombre del personaje para acomodar al actor.
- **Ahora:** primero buscan intérpretes del sexo del personaje y de una edad creíble (más estricto con niños y jóvenes); después pesan su nivel, su tipo de papel frente al arquetipo del personaje y los géneros de la obra, y su costo. El protagonista también se elige así. Ya no cambian al personaje. «Ver talentos» se abre ordenado por encaje.
- **Medido:** 200 asignaciones: 0 con sexo distinto, 0 con edad fuera de rango, 0 personajes alterados; encaje medio 4,94 de 5.

## 3. Segundo plano y talentos que producen solos

- La línea de producción tiene dos divisiones: «Lo que haces tú» y «Segundo plano». Las obras de fondo tienen su propio **archivo de segundo plano**.
- Al aceptar propuestas de talentos firmados, bandas, autores, showrunners o compañías, ellos las desarrollan y producen si tienes la infraestructura de ese medio (Imprenta propia, Sello discográfico independiente, Teatro propio, Sets de rodaje…). Cada nivel suma capacidad, rapidez, calidad y ahorro. Tú decides el lanzamiento y el marketing.
- **Medido:** sin imprenta el libro quedó en cola con el aviso de qué construir; con imprenta nivel 2 arrancó solo, más rápido y con ahorro. Una serie de un showrunner y un disco de una banda firmada también se produjeron solos.

## 4. Material que desaparece al encomendarlo

- Lo que ya produjiste o encomendaste sale de «Tu material de este medio» (sigue guardado en Obras → Material). Así no se produce dos veces por error, como pasó con «El laberinto de hierro».

## 5. Archivo con cuatro secciones

- En Franquicias → Filmografía: Propias, De tus talentos, Compradas y Con rivales.

## 6. Consola propia con economía real

- Cuota de mercado, unidades al mes, ganancia o pérdida por unidad, regalías, gráfico de ventas, exclusivos, campañas, rebajas y sucesora compatible. Sus ingresos se ven como «Consola propia» en las finanzas.
- **Medido:** en 1998, una consola potente de precio normal llegó a 26 % de cuota y 234.000 unidades al mes; la campaña la subió a 31 %.

## 7. Comediantes y artistas en la lista de éxitos

- Humoristas (desde 1700), dúos cómicos (desde 1850) y comediantes de stand-up (desde 1955) piden firmar en Obras → Teatro. Las obras con ellos empiezan como comedia y, desde 1950, como stand up.
- La lista de éxitos muestra al solista, dúo o banda de cada canción además de la compañía.

## 8. Plan automático y marketing completo

- **Plan automático** en cada obra lista para estrenar (lo aplica de una vez) y dentro del plan (lo propone para que lo revises). Usa la mejor semana del asistente de lanzamiento y el marketing recomendado, más los canales que más público dan por cada peso, hasta una cuarta parte del costo de producción y nunca más del 30 % de tu caja.
- **Seleccionar todo / Quitar todo** en el paso de marketing.
- **Lanzamiento automático** (Manual, Solo segundo plano o Todas mis obras): las obras terminadas salen solas con ese plan.
- **Medido:** «Seleccionar todo» marcó 17 de 17 canales; el plan automático eligió 11 canales por el 24 % del costo de producción; con el lanzamiento automático la obra salió sola.

## 9. Venta automática de licencias

- En Negocio → Streaming y en Negocio → Canal de TV → Licencias: a la TV (no exclusiva, una vez al año) y al streaming (exclusiva por 3 años), solo para obras estrenadas hace 1, 2 o 5 años.
- **Medido:** el primer mes vendió licencias y dejó 6 exclusivas activas, con aviso en las noticias.

## 10. Personajes de otras obras resaltados

- En el reparto, los personajes traídos de otra obra o que vuelven de la anterior tienen borde dorado y etiqueta, y arriba hay un índice para ir directo a ellos.

## 11. Rivales que adaptan obras de dominio público

- Cada año algunos rivales adaptan obras libres de derechos, por ejemplo «Estudio en escarlata».

## 12. Títulos

- Diccionario más grande: 39 sustantivos y 12 adjetivos nuevos, 105 palabras poco conocidas en español, 63 en inglés y 76 expresiones de otros idiomas (latín, italiano, francés, alemán, japonés, portugués, galés, sueco, finés, griego, sánscrito, quechua, ruso…).
- Más breves: máximo 30 letras y 5 palabras.
- Sin repetirse: se comparan con tus obras, las de los rivales, el material, las propuestas y los próximos estrenos.
- Con reglas de sentido y gramática: nada de «El reino del reino», «Noche de medianoche», «La alma» ni «Cartas desde el relámpago».
- **Medido:** 4.500 títulos seguidos: 4.494 distintos, 0 de más de 30 letras, longitud media 17 letras; 18.000 títulos en español y en inglés pasaron las reglas de sentido sin fallos.

## 13. Pantalla que se mueve al tocar

- El anclaje que mantiene la pantalla quieta ahora reconoce cada botón también por su texto, para no confundirse cuando una tarjeta desaparece (por ejemplo, al aceptar una propuesta).
- Si el botón tocado desaparece, la pantalla se ancla en el contenido de arriba (que no cambia), así la tarjeta siguiente ocupa su lugar sin que la vista se mueva.
- **Medido con toques reales:** antes, aceptar una propuesta podía mover la vista hasta 2.800 px. Ahora, en «Contratar» el contenido visible se mueve 0 px; al aceptar una propuesta o comprar un material, el punto donde tocaste queda fijo y solo suben las tarjetas de abajo a ocupar el hueco.

## 14. Actualizar el APK sin perder la partida

- Las partidas se guardan en el teléfono y se conservan al instalar encima (mismo paquete y misma llave, versionCode 5).
- Al abrir una versión nueva, la app borra la caché del navegador interno (no las partidas) y carga el juego actualizado.
- Al cargar una partida vieja, el juego la adapta: marca el material ya usado, ordena los encargos en segundo plano, libera a tu avatar si tiene energía y activa las opciones nuevas.
- **Medido:** una partida de la 1.3 cargó en la 1.4, se adaptó y siguió 3 años sin errores. El APK y el AAB 1.4 están firmados con la misma llave que las versiones anteriores (huella SHA-256 5f:f5:8e:ce…), tienen versionCode 5 y llevan dentro exactamente el mismo juego que `industry-art/index.html`.

## Lo que conviene saber

- El plan automático es prudente a propósito: gasta menos que un gran estreno real. Si quieres una campaña grande, usa «Seleccionar todo» en el plan.
- Las licencias exclusivas al streaming pagan más, pero mientras duran la obra sale de tu catálogo y de tu canal.
- Los retirados que vuelven cuestan un 60 % más y pueden retirarse de nuevo con los años.
