// ===== Más hitos y curiosidades: siglos XVIII y XIX, teatro, televisión y videojuegos =====
(() => {
  const N = [
    [1700, "c", 3, "Comienza en Francia la moda de las ferias teatrales: compañías ambulantes desafían el monopolio de la Comédie-Française.", "Fair theaters spread in France: touring troupes defy the Comédie-Française monopoly."],
    [1711, "o", 4, "Händel estrena en Londres «Rinaldo», la primera ópera italiana compuesta para el público inglés.", "Handel premieres «Rinaldo» in London, the first Italian opera written for an English audience."],
    [1721, "o", 4, "Bach termina los «Conciertos de Brandeburgo».", "Bach completes the «Brandenburg Concertos»."],
    [1725, "o", 4, "Vivaldi publica «Las cuatro estaciones».", "Vivaldi publishes «The Four Seasons»."],
    [1728, "o", 3, "John Gay estrena «La ópera del mendigo»: canciones populares y crítica social llenan los teatros de Londres.", "John Gay premieres «The Beggar's Opera»: popular songs and social satire fill London theaters."],
    [1737, "m", 3, "Inglaterra aprueba la Ley de Licencias: toda obra de teatro debe pasar por el censor.", "England passes the Licensing Act: every play must go through the censor."],
    [1740, "o", 5, "Samuel Richardson publica «Pamela», una de las primeras novelas superventas.", "Samuel Richardson publishes «Pamela», one of the first best-selling novels."],
    [1751, "m", 5, "Diderot y D'Alembert empiezan a publicar la «Enciclopedia».", "Diderot and D'Alembert begin publishing the «Encyclopédie»."],
    [1759, "o", 5, "Voltaire publica «Cándido» y se burla del optimismo de su época.", "Voltaire publishes «Candide», mocking the optimism of his time."],
    [1762, "o", 4, "Gluck estrena «Orfeo y Eurídice» y reforma la ópera.", "Gluck premieres «Orpheus and Eurydice» and reforms opera."],
    [1774, "o", 5, "Goethe publica «Las desventuras del joven Werther»: miles de jóvenes imitan la ropa del protagonista.", "Goethe publishes «The Sorrows of Young Werther»: thousands of young people copy the hero's clothes."],
    [1784, "o", 3, "Beaumarchais estrena «Las bodas de Fígaro» después de años de censura.", "Beaumarchais premieres «The Marriage of Figaro» after years of censorship."],
    [1787, "o", 4, "Mozart estrena «Don Giovanni» en Praga.", "Mozart premieres «Don Giovanni» in Prague."],
    [1791, "o", 4, "Mozart estrena «La flauta mágica» en un teatro popular de Viena.", "Mozart premieres «The Magic Flute» in a popular Viennese theater."],
    [1813, "o", 5, "Jane Austen publica «Orgullo y prejuicio».", "Jane Austen publishes «Pride and Prejudice»."],
    [1816, "o", 4, "Rossini estrena «El barbero de Sevilla».", "Rossini premieres «The Barber of Seville»."],
    [1818, "o", 5, "Mary Shelley publica «Frankenstein», considerada la primera novela de ciencia ficción.", "Mary Shelley publishes «Frankenstein», considered the first science fiction novel."],
    [1826, "m", 0, "Niépce toma la fotografía más antigua que se conserva.", "Niépce takes the oldest surviving photograph."],
    [1830, "o", 3, "El estreno de «Hernani» de Victor Hugo termina en una batalla entre clásicos y románticos.", "The premiere of Victor Hugo's «Hernani» ends in a battle between classicists and romantics."],
    [1836, "m", 5, "Dickens publica «Los papeles póstumos del Club Pickwick» por entregas: nace el folletín de masas.", "Dickens publishes «The Pickwick Papers» in installments: the mass serial is born."],
    [1841, "o", 5, "Edgar Allan Poe publica «Los crímenes de la calle Morgue», el primer relato policial moderno.", "Edgar Allan Poe publishes «The Murders in the Rue Morgue», the first modern detective story."],
    [1844, "o", 5, "Alexandre Dumas publica «Los tres mosqueteros» por entregas.", "Alexandre Dumas serializes «The Three Musketeers»."],
    [1853, "o", 4, "Verdi estrena «La traviata».", "Verdi premieres «La traviata»."],
    [1865, "o", 5, "Lewis Carroll publica «Alicia en el país de las maravillas».", "Lewis Carroll publishes «Alice's Adventures in Wonderland»."],
    [1866, "o", 3, "«The Black Crook» combina drama, ballet y canciones: se considera el primer musical de Broadway.", "«The Black Crook» combines drama, ballet and songs: it is considered Broadway's first musical."],
    [1869, "o", 5, "Tolstói publica «Guerra y paz».", "Tolstoy publishes «War and Peace»."],
    [1875, "o", 4, "Bizet estrena «Carmen»; fracasa al principio y hoy es una de las óperas más representadas.", "Bizet premieres «Carmen»; it flops at first and is now one of the most performed operas."],
    [1877, "o", 4, "Chaikovski estrena «El lago de los cisnes».", "Tchaikovsky premieres «Swan Lake»."],
    [1879, "o", 3, "Ibsen estrena «Casa de muñecas» y su final escandaliza a Europa.", "Ibsen premieres «A Doll's House» and its ending scandalizes Europe."],
    [1887, "o", 5, "Arthur Conan Doyle presenta a Sherlock Holmes en «Estudio en escarlata».", "Arthur Conan Doyle introduces Sherlock Holmes in «A Study in Scarlet»."],
    [1892, "o", 4, "Chaikovski estrena «El cascanueces».", "Tchaikovsky premieres «The Nutcracker»."],
    [1895, "o", 3, "Oscar Wilde estrena «La importancia de llamarse Ernesto».", "Oscar Wilde premieres «The Importance of Being Earnest»."],
    [1896, "o", 3, "Chéjov estrena «La gaviota»; fracasa y triunfa dos años después con Stanislavski.", "Chekhov premieres «The Seagull»; it flops and triumphs two years later with Stanislavski."],
    [1928, "o", 3, "Brecht y Weill estrenan «La ópera de los tres centavos».", "Brecht and Weill premiere «The Threepenny Opera»."],
    [1936, "m", 1, "La BBC inicia el primer servicio regular de televisión del mundo.", "The BBC starts the world's first regular television service."],
    [1943, "o", 3, "«Oklahoma!» integra canciones y trama: nace el musical moderno.", "«Oklahoma!» integrates songs and plot: the modern musical is born."],
    [1953, "o", 3, "Beckett estrena «Esperando a Godot» y el teatro del absurdo llega al gran público.", "Beckett premieres «Waiting for Godot» and the theater of the absurd reaches a wide audience."],
    [1956, "m", 1, "Se presenta el primer grabador de video comercial: la TV deja de ser solo en directo.", "The first commercial videotape recorder is unveiled: TV is no longer only live."],
    [1969, "m", 1, "Unos 600 millones de personas ven en directo la llegada a la Luna.", "Some 600 million people watch the Moon landing live."],
    [1977, "o", 1, "«Raíces» paraliza a Estados Unidos: la miniserie bate récords de audiencia.", "«Roots» brings the United States to a halt: the miniseries breaks ratings records."],
    [1983, "m", 2, "Crisis del videojuego en Norteamérica: el mercado se hunde por exceso de juegos malos.", "Video game crash in North America: the market collapses under too many bad games."],
    [1989, "o", 2, "«Tetris» viaja en cada Game Boy y se vuelve el juego más jugado del mundo.", "«Tetris» ships with every Game Boy and becomes the world's most played game."],
    [1996, "o", 2, "«Pokémon Rojo y Verde» llega a Japón y nace la franquicia más rentable de la historia.", "«Pokémon Red and Green» launches in Japan and the highest-grossing franchise in history is born."],
    [1999, "o", 1, "«Los Soprano» abre la edad de oro de las series de autor.", "«The Sopranos» opens the golden age of auteur TV."],
    [2009, "o", 2, "«Minecraft» nace como proyecto independiente y se vuelve el juego más vendido de la historia.", "«Minecraft» starts as an indie project and becomes the best-selling game in history."],
    [2015, "o", 3, "«Hamilton» mezcla hip hop e historia y revoluciona Broadway.", "«Hamilton» mixes hip hop and history and revolutionizes Broadway."],
  ];
  const tit = (s) => (s.match(/«([^»]+)»/) || [])[1];
  N.forEach((h) => {
    const t = tit(h[3]);
    if (HIT.some((x) => Math.abs(x[0] - h[0]) <= 1 && (t ? String(x[3]).includes("«" + t + "»") : x[3] == h[3]))) return;
    HIT.push(h);
    ENX[h[3]] = h[4];
  });
  const C = [
    [1705, "Teatro a la luz de las velas", "Los teatros del siglo XVIII se iluminaban con cientos de velas que no se apagaban durante la función.", "El público veía la obra… y a los demás espectadores, que iban a lucirse.", "Candlelit theater", "18th-century theaters were lit by hundreds of candles that stayed on during the show.", "The audience watched the play… and each other, since people went to be seen."],
    [1742, "Ponerse de pie", "Se cuenta que el rey Jorge II se levantó durante el «Aleluya» de «El Mesías».", "Desde entonces el público se pone de pie en ese coro, aunque no está claro que pasara de verdad.", "Standing up", "Legend says King George II stood up during the «Hallelujah» of «Messiah».", "Audiences have stood for that chorus ever since, though it's unclear it really happened."],
    [1774, "El efecto Werther", "Tras «Werther», varios países prohibieron el libro por miedo a que los jóvenes imitaran al protagonista.", "Hoy los psicólogos llaman «efecto Werther» a la imitación de lo que muestran los medios.", "The Werther effect", "After «Werther», several countries banned the book, fearing young people would imitate its hero.", "Psychologists now call imitation of what the media shows «the Werther effect»."],
    [1836, "Novelas por entregas", "Las novelas de Dickens salían por capítulos mensuales y la gente hacía fila para comprarlas.", "Se dice que en Nueva York esperaban en el puerto el barco con el capítulo siguiente.", "Serialized novels", "Dickens's novels came out in monthly chapters and people queued to buy them.", "It's said New Yorkers waited at the docks for the ship bringing the next chapter."],
    [1849, "La claque", "Los teatros de París contrataban aplaudidores profesionales: la «claque».", "Había especialistas en reír, en llorar y en pedir bis.", "The claque", "Paris theaters hired professional applauders: the «claque».", "There were specialists in laughing, crying and calling for encores."],
    [1887, "Detective por casualidad", "Conan Doyle mató a Sherlock Holmes en 1893 porque estaba cansado de él.", "La presión de los lectores lo obligó a resucitarlo diez años después.", "Accidental detective", "Conan Doyle killed off Sherlock Holmes in 1893 because he was tired of him.", "Reader pressure forced him to bring him back ten years later."],
    [1903, "El primer western", "«Asalto y robo de un tren» terminaba con un bandido disparando hacia el público.", "Los cines podían poner esa escena al principio o al final, a gusto.", "The first western", "«The Great Train Robbery» ended with a bandit firing at the audience.", "Theaters could show that shot at the start or the end, as they liked."],
    [1922, "Vampiro sin permiso", "«Nosferatu» adaptó «Drácula» sin pagar los derechos.", "La viuda de Stoker ganó el juicio y se ordenó destruir todas las copias; algunas sobrevivieron.", "Unlicensed vampire", "«Nosferatu» adapted «Dracula» without paying for the rights.", "Stoker's widow won the lawsuit and all copies were ordered destroyed; some survived."],
    [1955, "La fiebre del gorro", "El merchandising de Davy Crockett vendió millones de gorros de mapache en meses.", "Fue una de las primeras fiebres de productos de una serie de TV.", "The cap craze", "Davy Crockett merchandise sold millions of coonskin caps in months.", "It was one of the first product crazes from a TV show."],
    [1978, "Las monedas de Space Invaders", "Se decía que «Space Invaders» causó escasez de monedas de 100 yenes en Japón.", "Probablemente es un mito, pero muestra el furor de los arcades.", "Space Invaders coins", "It was said «Space Invaders» caused a 100-yen coin shortage in Japan.", "It's probably a myth, but it shows the arcade craze."],
    [1984, "Tetris desde Moscú", "«Tetris» lo creó un ingeniero soviético en una computadora de su trabajo.", "Durante años los derechos fueron del Estado y él no cobró por su juego.", "Tetris from Moscow", "«Tetris» was created by a Soviet engineer on a work computer.", "For years the rights belonged to the State and he wasn't paid for his game."],
    [2004, "Un error que se volvió estilo", "Muchos juegos famosos nacieron de errores de programación que a los jugadores les gustaron.", "Los combos de «Street Fighter II» empezaron así.", "A bug turned feature", "Many famous games came from programming bugs players loved.", "The combos in «Street Fighter II» began that way."],
    [2010, "Un álbum en una noche", "Algunos artistas anuncian y publican un álbum el mismo día, sin promoción previa.", "La sorpresa se volvió una estrategia de marketing.", "An album overnight", "Some artists announce and release an album the same day, with no prior promotion.", "Surprise became a marketing strategy."],
    [2016, "Un musical en todas partes", "El elenco original de «Hamilton» fue grabado en vivo para que se viera en todo el mundo.", "Llegó al streaming en 2020, cuando los teatros estaban cerrados.", "A musical everywhere", "The original «Hamilton» cast was filmed live so the world could see it.", "It reached streaming in 2020, when theaters were closed."],
    [2020, "Teatros vacíos", "Durante la pandemia, Broadway estuvo cerrado más de un año.", "Fue el cierre más largo de su historia.", "Empty theaters", "During the pandemic, Broadway was closed for over a year.", "It was the longest shutdown in its history."],
  ];
  C.forEach((c) => {
    if (CURIO.some((x) => x[1] == c[1])) return;
    CURIO.push(c);
    ENX[c[1]] = c[4];
    ENX[c[2]] = c[5];
    ENX[c[3]] = c[6];
  });
})();
