# INDUSTRY ART · Informe de verificación de la versión 1.5

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
