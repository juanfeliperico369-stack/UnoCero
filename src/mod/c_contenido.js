// ===== Contenido histórico ampliado: hitos, curiosidades y obras de dominio público =====
(() => {
  const N = [
    [1710, "m", 5, "El Estatuto de la Reina Ana crea en Inglaterra la primera ley de derechos de autor.", "The Statute of Anne creates the first copyright law in England."],
    [1719, "o", 5, "Daniel Defoe publica «Robinson Crusoe» y populariza la novela de aventuras.", "Daniel Defoe publishes «Robinson Crusoe» and popularizes the adventure novel."],
    [1782, "o", 5, "Choderlos de Laclos publica «Las amistades peligrosas», novela en cartas que escandaliza a París.", "Choderlos de Laclos publishes «Dangerous Liaisons», an epistolary novel that scandalizes Paris."],
    [1786, "o", 4, "Mozart estrena en Viena «Las bodas de Fígaro».", "Mozart premieres «The Marriage of Figaro» in Vienna."],
    [1808, "o", 3, "Se publica la primera parte de «Fausto» de Goethe.", "The first part of Goethe's «Faust» is published."],
    [1824, "o", 4, "Beethoven estrena su Novena Sinfonía, con la «Oda a la alegría».", "Beethoven premieres his Ninth Symphony, with the «Ode to Joy»."],
    [1831, "o", 5, "Victor Hugo publica «Nuestra Señora de París».", "Victor Hugo publishes «The Hunchback of Notre-Dame»."],
    [1843, "o", 5, "Dickens publica «Cuento de Navidad», que fija la idea moderna de la Navidad en familia.", "Dickens publishes «A Christmas Carol», which shapes the modern idea of a family Christmas."],
    [1851, "o", 5, "Herman Melville publica «Moby Dick»: fracasa en ventas y hoy es un clásico.", "Herman Melville publishes «Moby-Dick»: it flops and is now a classic."],
    [1876, "o", 4, "Wagner inaugura el Festival de Bayreuth con «El anillo del nibelungo» completo.", "Wagner opens the Bayreuth Festival with the complete «Ring of the Nibelung»."],
    [1877, "m", 4, "Edison presenta el fonógrafo: por primera vez se graba y reproduce la voz.", "Edison unveils the phonograph: for the first time a voice is recorded and played back."],
    [1902, "o", 0, "Georges Méliès estrena «Viaje a la Luna», el primer gran éxito de la fantasía en el cine.", "Georges Méliès releases «A Trip to the Moon», cinema's first great fantasy hit."],
    [1915, "o", 0, "«El nacimiento de una nación» demuestra el poder del largometraje y abre un debate por su racismo.", "«The Birth of a Nation» proves the power of the feature film and sparks debate over its racism."],
    [1925, "o", 0, "Serguéi Eisenstein estrena «El acorazado Potemkin» y su montaje cambia el lenguaje del cine.", "Sergei Eisenstein releases «Battleship Potemkin» and its editing changes film language."],
    [1927, "m", 0, "«El cantante de jazz» trae el cine sonoro: en dos años el cine mudo desaparece.", "«The Jazz Singer» brings sound films: within two years silent cinema disappears."],
    [1937, "o", 0, "Disney estrena «Blancanieves y los siete enanos», primer largometraje animado a color de Hollywood.", "Disney releases «Snow White and the Seven Dwarfs», Hollywood's first color animated feature."],
    [1938, "m", 1, "La adaptación radial de «La guerra de los mundos» de Orson Welles causa alarma entre algunos oyentes.", "Orson Welles's radio adaptation of «The War of the Worlds» alarms some listeners."],
    [1939, "o", 0, "«Lo que el viento se llevó» se convierte en la película más taquillera de su tiempo.", "«Gone with the Wind» becomes the highest-grossing film of its time."],
    [1951, "o", 1, "«I Love Lucy» inventa la comedia de situación grabada con tres cámaras y público.", "«I Love Lucy» invents the three-camera sitcom filmed before an audience."],
    [1955, "m", 4, "El rock and roll llega a las listas con «Rock Around the Clock».", "Rock and roll hits the charts with «Rock Around the Clock»."],
    [1962, "o", 2, "Estudiantes del MIT crean «Spacewar!», uno de los primeros videojuegos.", "MIT students create «Spacewar!», one of the first video games."],
    [1967, "o", 4, "The Beatles publican «Sgt. Pepper's», el álbum conceptual que cambia la industria.", "The Beatles release «Sgt. Pepper's», the concept album that changes the industry."],
    [1967, "o", 5, "Gabriel García Márquez publica «Cien años de soledad» y el realismo mágico conquista el mundo.", "Gabriel García Márquez publishes «One Hundred Years of Solitude» and magical realism conquers the world."],
    [1972, "o", 2, "Atari lanza «Pong» en los bares y nace la industria del videojuego.", "Atari launches «Pong» in bars and the video game industry is born."],
    [1975, "o", 0, "«Tiburón» inventa el estreno de verano masivo y el concepto de «blockbuster».", "«Jaws» invents the wide summer release and the blockbuster."],
    [1977, "o", 0, "«La guerra de las galaxias» demuestra que el merchandising puede valer más que la taquilla.", "«Star Wars» proves merchandising can be worth more than the box office."],
    [1980, "o", 2, "Namco lanza «Pac-Man», el primer personaje famoso de los videojuegos.", "Namco launches «Pac-Man», video games' first famous character."],
    [1981, "m", 4, "Nace MTV: el videoclip se vuelve tan importante como la canción.", "MTV is born: the music video becomes as important as the song."],
    [1982, "o", 4, "Michael Jackson publica «Thriller», el álbum más vendido de la historia.", "Michael Jackson releases «Thriller», the best-selling album in history."],
    [1985, "o", 2, "Nintendo lanza «Super Mario Bros.» y rescata la industria tras la crisis de 1983.", "Nintendo releases «Super Mario Bros.» and rescues the industry after the 1983 crash."],
    [1993, "o", 0, "«Parque Jurásico» mezcla animatrónica y dinosaurios digitales y abre la era del CGI.", "«Jurassic Park» blends animatronics and digital dinosaurs and opens the CGI era."],
    [1997, "o", 5, "Se publica «Harry Potter y la piedra filosofal»: la saga venderá más de 500 millones de libros.", "«Harry Potter and the Philosopher's Stone» is published: the saga will sell over 500 million books."],
    [1999, "m", 4, "Napster permite compartir canciones gratis y pone en crisis a la industria discográfica.", "Napster lets people share songs for free and throws the record industry into crisis."],
    [2004, "o", 2, "«World of Warcraft» lleva los juegos en línea masivos a millones de jugadores.", "«World of Warcraft» brings massively online games to millions of players."],
    [2005, "m", 1, "Nace YouTube: cualquiera puede publicar video para todo el mundo.", "YouTube is born: anyone can publish video to the whole world."],
    [2008, "o", 0, "«Iron Man» inaugura el universo cinematográfico compartido de superhéroes.", "«Iron Man» launches the shared superhero film universe."],
    [2013, "m", 1, "«House of Cards» estrena todos sus capítulos el mismo día: nace el maratón de streaming.", "«House of Cards» releases every episode on the same day: binge-watching is born."],
    [2016, "o", 2, "«Pokémon GO» lleva la realidad aumentada a cientos de millones de teléfonos.", "«Pokémon GO» brings augmented reality to hundreds of millions of phones."],
    [2017, "m", 4, "El streaming supera a las ventas físicas y digitales en los ingresos de la música.", "Streaming overtakes physical and digital sales in music revenue."],
    [2019, "o", 1, "El final de «Juego de tronos» rompe récords de audiencia y de quejas.", "The «Game of Thrones» finale breaks audience records — and complaint records."],
    [2023, "m", 0, "Las huelgas de guionistas y actores en Hollywood paralizan la industria durante meses.", "Hollywood writers' and actors' strikes halt the industry for months."],
  ];
  const tit = (s) => (s.match(/«([^»]+)»/) || [])[1];
  N.forEach((h) => {
    const t = tit(h[3]);
    if (HIT.some((x) => x[0] == h[0] && (t ? String(x[3]).includes("«" + t + "»") : x[3] == h[3]))) return;
    HIT.push(h);
    ENX[h[3]] = h[4];
  });
  const C = [
    [1726, "Sátira disfrazada", "«Los viajes de Gulliver» se vendió como libro de viajes infantil.", "En realidad era una sátira feroz contra la política inglesa.", "Satire in disguise", "«Gulliver's Travels» was sold as a children's travel book.", "It was really a fierce satire of English politics."],
    [1816, "Una noche de tormenta", "«Frankenstein» nació de un reto entre amigos en una villa junto al lago de Ginebra.", "Mary Shelley tenía 18 años y el mismo reto dio origen al primer cuento de vampiros moderno.", "A stormy night", "«Frankenstein» was born from a dare among friends at a villa by Lake Geneva.", "Mary Shelley was 18, and the same dare produced the first modern vampire story."],
    [1888, "La cámara de bolsillo", "Kodak vendía su cámara con el lema «Usted aprieta el botón, nosotros hacemos el resto».", "Se devolvía la cámara entera a la fábrica para revelar las fotos.", "The pocket camera", "Kodak sold its camera with the slogan «You press the button, we do the rest».", "You sent the whole camera back to the factory to develop the photos."],
    [1896, "El tren que asustó", "Cuenta la leyenda que el público huyó al ver «La llegada de un tren» de los Lumière.", "Es probablemente exagerado, pero muestra el asombro de las primeras proyecciones.", "The scary train", "Legend says audiences fled from the Lumières' «Arrival of a Train».", "It is probably exaggerated, but it shows the wonder of the first screenings."],
    [1910, "Estrellas sin nombre", "Al principio los estudios no decían el nombre de sus actores para no tener que pagarles más.", "El público los bautizaba por apodos, como «la chica Biograph».", "Nameless stars", "At first studios hid their actors' names so they wouldn't have to pay them more.", "Audiences gave them nicknames, like «the Biograph Girl»."],
    [1928, "Un ratón con voz", "Mickey Mouse debutó en «Steamboat Willie», uno de los primeros dibujos con sonido sincronizado.", "Walt Disney hizo él mismo la voz de Mickey durante casi veinte años.", "A mouse with a voice", "Mickey Mouse debuted in «Steamboat Willie», one of the first cartoons with synchronized sound.", "Walt Disney voiced Mickey himself for almost twenty years."],
    [1939, "Más de mil personas", "«Lo que el viento se llevó» tuvo más de 1.400 actrices candidatas para el papel de Scarlett.", "La búsqueda duró dos años y se convirtió en publicidad gratuita.", "Over a thousand hopefuls", "«Gone with the Wind» considered over 1,400 actresses for Scarlett.", "The search lasted two years and became free publicity."],
    [1947, "La lista negra", "Durante la caza de comunistas en Hollywood, cientos de guionistas quedaron sin trabajo.", "Algunos siguieron escribiendo con nombres falsos y hasta ganaron premios así.", "The blacklist", "During Hollywood's anti-communist purge, hundreds of writers lost their jobs.", "Some kept writing under fake names and even won awards that way."],
    [1960, "La regla de la puerta", "Hitchcock prohibió entrar a la sala una vez empezada «Psicosis».", "Fue una de las primeras campañas de marketing basadas en el secreto del final.", "The door rule", "Hitchcock banned entry once «Psycho» had started.", "It was one of the first marketing campaigns built on keeping the ending secret."],
    [1975, "El tiburón que no funcionaba", "El tiburón mecánico de «Tiburón» se averiaba tanto que casi no aparece en pantalla.", "Spielberg sugirió su presencia con música y cámara subjetiva, y el suspenso creció.", "The shark that didn't work", "The mechanical shark in «Jaws» broke down so often that it barely appears.", "Spielberg suggested it with music and point-of-view shots, and the suspense grew."],
    [1983, "Cartuchos enterrados", "Tras la crisis del videojuego, Atari enterró miles de cartuchos en el desierto de Nuevo México.", "En 2014 una excavación confirmó que la leyenda era real.", "Buried cartridges", "After the video game crash, Atari buried thousands of cartridges in the New Mexico desert.", "In 2014 an excavation confirmed the legend was real."],
    [1996, "Un primer capítulo rechazado", "El primer libro de Harry Potter fue rechazado por una docena de editoriales.", "Una pequeña editorial lo aceptó porque a la hija del director le encantó.", "A rejected first chapter", "The first Harry Potter book was rejected by a dozen publishers.", "A small publisher took it because the chairman's daughter loved it."],
    [2001, "El récord de la radio", "Algunas radios seguían pagando derechos por canciones de los años cincuenta en pleno siglo XXI.", "Una canción exitosa puede rentar durante setenta años o más.", "The radio record", "Some stations still paid royalties for 1950s songs well into the 21st century.", "A hit song can earn for seventy years or more."],
    [2012, "Un video en un día", "«Gangnam Style» fue el primer video en superar mil millones de reproducciones.", "Obligó a YouTube a ampliar su contador de visitas.", "A video in a day", "«Gangnam Style» was the first video to pass one billion views.", "It forced YouTube to upgrade its view counter."],
    [2019, "Una cueva en la pantalla", "Varias series se filmaron frente a pantallas LED gigantes en lugar de croma.", "Los actores ven el paisaje real y la luz refleja de verdad en sus caras.", "A cave on screen", "Several series were shot in front of giant LED walls instead of green screen.", "Actors see the real landscape and the light truly reflects on their faces."],
  ];
  C.forEach((c) => {
    if (CURIO.some((x) => x[1] == c[1])) return;
    CURIO.push(c);
    ENX[c[1]] = c[4];
    ENX[c[2]] = c[5];
    ENX[c[3]] = c[6];
  });
  const D = [
    ["La guerra de los mundos", "H. G. Wells", 1898, "Novela", "Ciencia ficción,Terror,Acción", 2017, 85, 0, "Invasión|Supervivencia|Ciencia|Miedo", "Narrador:M, Su esposa:F, El artillero:M, El cura:M", "Unos cilindros caen del cielo cerca de Londres y de ellos salen máquinas de tres patas que arrasan con todo; un hombre cruza el país en ruinas buscando a su esposa."],
    ["La máquina del tiempo", "H. G. Wells", 1895, "Novela", "Ciencia ficción,Aventura", 2017, 80, 0, "Tiempo|Desigualdad|Futuro", "El Viajero:M, Weena:F", "Un inventor viaja al año 802.701 y descubre que la humanidad se dividió en dos especies: los frágiles elois y los temibles morlocks."],
    ["El retrato de Dorian Gray", "Oscar Wilde", 1890, "Novela", "Drama,Terror,Fantasía", 1971, 85, 0, "Belleza|Vanidad|Culpa|Doble vida", "Dorian Gray:M, Lord Henry:M, Basil Hallward:M, Sibyl Vane:F", "Un joven hermoso desea que su retrato envejezca en su lugar; mientras él sigue intacto, la pintura muestra cada crimen que comete."],
    ["Drácula", "Bram Stoker", 1897, "Novela", "Terror,Romance,Aventura", 1983, 90, 0, "Inmortalidad|Deseo|Miedo|Lucha", "Conde Drácula:M, Jonathan Harker:M, Mina Harker:F, Abraham Van Helsing:M, Lucy Westenra:F", "Un abogado inglés viaja a Transilvania para venderle una casa a un conde, sin saber que su cliente es un vampiro que planea mudarse a Londres."],
    ["El llamado de lo salvaje", "Jack London", 1903, "Novela", "Aventura,Drama,Familiar", 1987, 70, 0, "Naturaleza|Supervivencia|Libertad|Animales", "Buck:M, John Thornton:M", "Un perro robado de una casa de California es vendido como perro de trineo en el Yukón y descubre su instinto salvaje."],
    ["El jardín secreto", "Frances Hodgson Burnett", 1911, "Novela", "Familiar,Drama", 1995, 70, 0, "Amistad|Sanación|Naturaleza|Infancia", "Mary Lennox:F, Colin Craven:M, Dickon:M", "Una niña huérfana y malhumorada llega a una mansión inglesa y encuentra un jardín cerrado que cambiará a todos los que viven allí."],
    ["Peter Pan", "J. M. Barrie", 1904, "Obra de teatro", "Fantasía,Aventura,Familiar", 2008, 85, 0, "Infancia|Crecer|Aventura", "Peter Pan:M, Wendy Darling:F, Capitán Garfio:M, Campanita:F", "Un niño que no quiere crecer se lleva a Wendy y a sus hermanos al País de Nunca Jamás, donde los esperan piratas, sirenas y un cocodrilo."],
    ["Los Miserables", "Victor Hugo", 1862, "Novela", "Drama,Histórico,Romance", 1956, 90, 0, "Redención|Justicia|Pobreza|Revolución", "Jean Valjean:M, Javert:M, Fantine:F, Cosette:F, Marius:M", "Un expresidiario que robó pan intenta empezar de nuevo mientras un inspector implacable lo persigue durante años por toda Francia."],
    ["La Odisea", "Homero", -700, "Poema", "Aventura,Mitología,Épico", 0, 90, 2, "Regreso|Astucia|Familia|Destino", "Odiseo:M, Penélope:F, Telémaco:M, Atenea:F, Polifemo:M", "Tras la guerra de Troya, Odiseo tarda diez años en volver a casa mientras su esposa resiste a los pretendientes que quieren su trono."],
    ["Las mil y una noches", "Tradición árabe y persa", 900, "Cuentos", "Fantasía,Aventura,Romance", 0, 85, 2, "Ingenio|Supervivencia|Magia", "Sherezade:F, Sultán Shahriar:M, Aladino:M, Simbad:M, Alí Babá:M", "Para salvar su vida, Sherezade le cuenta al sultán una historia cada noche y la deja sin terminar hasta la noche siguiente."],
    ["El Popol Vuh", "Tradición maya k'iche'", 1550, "Mitología", "Mitología,Épico,Aventura", 0, 70, 2, "Creación|Hermanos|Inframundo", "Hunahpú:M, Ixbalanqué:M, Ixquic:F", "Los gemelos héroes bajan a Xibalbá, el inframundo, para vencer a los señores de la muerte en un juego de pelota."],
    ["María", "Jorge Isaacs", 1867, "Novela", "Romance,Drama", 1966, 70, 0, "Amor|Pérdida|Juventud", "Efraín:M, María:F", "En una hacienda del Valle del Cauca, Efraín y su prima María se enamoran, pero los estudios en Europa y una enfermedad los separan."],
    ["Don Juan Tenorio", "José Zorrilla", 1844, "Obra de teatro", "Drama,Romance,Fantasía", 1964, 75, 0, "Redención|Amor|Muerte", "Don Juan Tenorio:M, Doña Inés:F, Don Luis Mejía:M", "Un seductor apuesta a quién conquista más mujeres en un año, hasta que el amor de una novicia lo enfrenta a su propia salvación."],
    ["La vuelta al mundo en ochenta días", "Julio Verne", 1872, "Novela", "Aventura,Comedia", 1976, 80, 0, "Apuesta|Viaje|Tiempo", "Phileas Fogg:M, Picaporte:M, Aouda:F, Inspector Fix:M", "Un caballero inglés apuesta su fortuna a que puede dar la vuelta al mundo en ochenta días, perseguido por un detective que lo cree ladrón."],
    ["Mujercitas", "Louisa May Alcott", 1868, "Novela", "Drama,Familiar,Romance", 1959, 80, 0, "Familia|Hermanas|Crecer", "Jo March:F, Meg March:F, Beth March:F, Amy March:F, Laurie:M", "Cuatro hermanas crecen durante la guerra civil estadounidense mientras su padre está en el frente, cada una con su propio sueño."],
  ];
  D.forEach((d) => {
    if (PD.some((x) => x[0] == d[0])) return;
    PD.push(d.slice(0, 8));
    if (!PDX[d[0]]) PDX[d[0]] = d.slice(8);
  });
})();
E40L([
  ["Poder y propaganda", "Power and propaganda"], ["Básica", "Basic"], ["Diseñador A&T", "A&T Designer"], ["Japón", "Japan"], ["Ícaro", "Icarus"],
  ["Momotarō, el niño del durazno", "Momotarō, the Peach Boy"], ["Antonio y Cleopatra", "Antony and Cleopatra"], ["Aladino y la lámpara maravillosa", "Aladdin and the Wonderful Lamp"],
  ["Alí Babá y los cuarenta ladrones", "Ali Baba and the Forty Thieves"], ["Ricitos de oro y los tres osos", "Goldilocks and the Three Bears"], ["Cinco semanas en globo", "Five Weeks in a Balloon"],
  ["Little Nemo en Slumberland", "Little Nemo in Slumberland"], ["Popeye el marino", "Popeye the Sailor"], ["Lazarillo de Tormes", "Lazarillo de Tormes"],
  ["La guerra de los mundos", "The War of the Worlds"], ["La máquina del tiempo", "The Time Machine"], ["El retrato de Dorian Gray", "The Picture of Dorian Gray"],
  ["El llamado de lo salvaje", "The Call of the Wild"], ["El jardín secreto", "The Secret Garden"], ["Los Miserables", "Les Misérables"], ["La Odisea", "The Odyssey"],
  ["Las mil y una noches", "One Thousand and One Nights"], ["La vuelta al mundo en ochenta días", "Around the World in Eighty Days"], ["Mujercitas", "Little Women"],
]);
