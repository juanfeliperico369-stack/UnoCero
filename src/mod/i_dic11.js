// Francés y portugués: clasificación por contenido, peso de las decisiones, personajes, secuelas y documento de la idea
(() => {
  const T = `Sin violencia|Sans violence|Sem violência
Moderada|Modérée|Moderada
Intensa|Intense|Intensa
Gráfica|Graphique|Gráfica
Sangrienta|Sanglante|Sangrenta
Explícita|Explicite|Explícita
Rudo|Grossier|Rude
Crudo|Cru|Cru
Ofensivo|Offensant|Ofensivo
Explícito|Explicite|Explícito
Amistoso|Amical|Amigável
Romántico|Romantique|Romântico
Apasionado|Passionné|Apaixonado
Candente|Brûlant|Ardente
Mencionado|Mentionné|Mencionado
Ocasional|Occasionnel|Ocasional
Frecuente|Fréquent|Frequente
Intenso|Intense|Intenso
Perturbador|Dérangeant|Perturbador
Extremo|Extrême|Extremo
contenido explícito que su público busca|contenu explicite que son public recherche|conteúdo explícito que seu público procura
contenido explícito que no pide la historia|contenu explicite dont l'histoire n'a pas besoin|conteúdo explícito que a história não pede
lo que aporta su tipo de obra|ce qu'apporte son type d'œuvre|o que seu tipo de obra traz
costo +#|coût +#|custo +#
costo −#|coût −#|custo −#
crítica −#|critique −#|crítica −#
público −#|public −#|público −#
−# sem|−# sem|−# sem
ventas +#|ventes +#|vendas +#
ventas −#|ventes −#|vendas −#
sin cambios|sans changement|sem mudanças
Género principal (★): marca la obra, pesa el doble en el público y en lo que domina tu equipo|Genre principal (★) : il marque l'œuvre et compte double auprès du public et dans ce que maîtrise ton équipe|Gênero principal (★): marca a obra e pesa o dobro no público e no que sua equipe domina
principal|principal|principal
el equipo domina su género principal|l'équipe maîtrise son genre principal|a equipe domina seu gênero principal
el equipo no domina su género principal|l'équipe ne maîtrise pas son genre principal|a equipe não domina seu gênero principal
personajes sin voz|personnages sans voix|personagens sem voz
IA en producción|IA en production|IA na produção
excelente|excellent|excelente
dudoso|douteux|duvidoso
completamente mal|complètement raté|completamente errado
Continente de los nombres (dados)|Continent des noms (dés)|Continente dos nomes (dados)
Según el lugar|Selon le lieu|Conforme o lugar
Los personajes nuevos nacen con la época, el lugar y los géneros de la obra: edad, arquetipo, motivación y relación con el protagonista.|Les nouveaux personnages naissent avec l'époque, le lieu et les genres de l'œuvre : âge, archétype, motivation et relation avec le protagoniste.|Os personagens novos nascem com a época, o lugar e os gêneros da obra: idade, arquétipo, motivação e relação com o protagonista.
— sin intérprete: personaje sin voz —|— sans interprète : personnage sans voix —|— sem intérprete: personagem sem voz —
En un libro los personajes viven en la página: no hay intérprete.|Dans un livre, les personnages vivent sur la page : il n'y a pas d'interprète.|Num livro os personagens vivem na página: não há intérprete.
Nombre al azar del continente|Nom au hasard du continent|Nome aleatório do continente
Elegir|Choisir|Escolher
Plataformas (todas las que quieras)|Plateformes (autant que tu veux)|Plataformas (quantas quiser)
Llegas al # de quienes juegan. Cada plataforma de más cuesta #; desde la quinta, #.|Tu atteins # des joueurs. Chaque plateforme supplémentaire coûte # ; à partir de la cinquième, #.|Você alcança # de quem joga. Cada plataforma a mais custa #; a partir da quinta, #.
Vuelven, pero cuestan más:|Ils reviennent, mais coûtent plus cher :|Voltam, mas custam mais:
Puedes cambiarlos en Personajes si prefieres otro casting.|Tu peux les changer dans Personnages si tu préfères un autre casting.|Você pode trocá-los em Personagens se preferir outro elenco.
Que una obra nueva recaude el doble de lo que costó|Qu'une nouvelle œuvre rapporte le double de son coût|Que uma obra nova arrecade o dobro do que custou
Original|Original|Original
oferta de compra|offre d'achat|oferta de compra
Decreto antimonopolio en serie por # años.|Décret antitrust en série pendant # ans.|Decreto antitruste em série por # anos.
Pérdidas por descontar|Pertes à déduire|Prejuízos a descontar
Bueno|Bon|Bom
Dilema|Dilemme|Dilema
Enfermedad|Maladie|Doença
Mar|Mer|Mar
No se pudo armar el Word|Impossible de créer le fichier Word|Não foi possível montar o Word
La idea|L'idée|A ideia
Tipo|Type|Tipo
Origen|Origine|Origem
Problemática|Problématique|Problemática
Premisas y tropos|Prémisses et tropes|Premissas e tropos
Arco|Arc|Arco
Época y lugar|Époque et lieu|Época e lugar
Forma|Forme|Forma
Moraleja|Morale|Moral
Uso de IA|Utilisation de l'IA|Uso de IA
La crítica|La critique|A crítica
Al premiarla|En la récompensant|Ao premiá-la
¿Le irá bien?|Est-ce que ça marchera ?|Vai dar certo?
Si sale mal|Si ça tourne mal|Se der errado
Lo más probable|Le plus probable|O mais provável
Si sale muy bien|Si ça marche très bien|Se der muito certo
Para no perder dinero|Pour ne pas perdre d'argent|Para não perder dinheiro
hay que recaudar # |il faut rapporter # |é preciso arrecadar # 
Probabilidad de recuperar lo invertido|Probabilité de récupérer l'investissement|Probabilidade de recuperar o investimento
Crítica y público esperados|Critique et public attendus|Crítica e público esperados
Es una estimación: la competencia, las críticas y el boca a boca deciden el estreno real.|C'est une estimation : la concurrence, les critiques et le bouche-à-oreille décident de la vraie sortie.|É uma estimativa: a concorrência, as críticas e o boca a boca decidem a estreia real.
La trama|L'intrigue|A trama
Acto I · Planteamiento|Acte I · Exposition|Ato I · Apresentação
Acto II · Confrontación|Acte II · Confrontation|Ato II · Confronto
Acto III · Desenlace|Acte III · Dénouement|Ato III · Desfecho
Curva del arco|Courbe de l'arc|Curva do arco
Escaleta|Séquencier|Escaleta
fortuna #|fortune #|fortuna #
Fortuna|Fortune|Fortuna
Arco libre|Arc libre|Arco livre
Planteamiento|Exposition|Apresentação
Detonante|Élément déclencheur|Gatilho
Primer giro|Premier tournant|Primeira virada
Punto medio|Point médian|Ponto médio
Crisis|Crise|Crise
Clímax|Climax|Clímax
Desenlace|Dénouement|Desfecho
Arquetipo|Archétype|Arquétipo
Motivación|Motivation|Motivação
Relación con el protagonista|Relation avec le protagoniste|Relação com o protagonista
Mundo y atmósfera|Monde et atmosphère|Mundo e atmosfera
Cuándo pasa|Quand ça se passe|Quando acontece
Dónde pasa|Où ça se passe|Onde acontece
Pistas sensoriales para imaginar la obra (no son reglas, son puntos de partida):|Indices sensoriels pour imaginer l'œuvre (ce ne sont pas des règles, ce sont des points de départ) :|Pistas sensoriais para imaginar a obra (não são regras, são pontos de partida):
Escenas para imaginar|Scènes à imaginer|Cenas para imaginar
Preguntas abiertas|Questions ouvertes|Perguntas abertas
Equipo creativo|Équipe créative|Equipe criativa
Datos técnicos|Données techniques|Dados técnicos
Etapa|Étape|Etapa
Costo final|Coût final|Custo final
Recaudación|Recettes|Arrecadação
multiplicador ×#|multiplicateur ×#|multiplicador ×#
Ideado y creado por OneZero · Infinite Tree · INDUSTRY ART|Imaginé et créé par OneZero · Infinite Tree · INDUSTRY ART|Idealizado e criado por OneZero · Infinite Tree · INDUSTRY ART
Logline|Logline|Logline
obra adulta|œuvre pour adultes|obra adulta
Final abierto, sin moraleja cerrada|Fin ouverte, sans morale fermée|Final aberto, sem moral fechada
Documento de la idea generado por INDUSTRY ART el #/#/#|Document de l'idée généré par INDUSTRY ART le #/#/#|Documento da ideia gerado pelo INDUSTRY ART em #/#/#
año del juego #|année du jeu #|ano do jogo #
Además: # extras con nombre.|En plus : # figurants avec un nom.|Além disso: # figurantes com nome.
La interpreta|Interprétée par|Interpretada por
Lo interpreta|Interprété par|Interpretado por
«Por creer en las segundas oportunidades.»|«Pour avoir cru aux secondes chances.»|«Por acreditar nas segundas chances.»
«Por mirar donde nadie se atrevía a mirar.»|«Pour avoir regardé là où personne n'osait regarder.»|«Por olhar onde ninguém ousava olhar.»
«Por su valentía y por su oficio.»|«Pour son courage et son métier.»|«Por sua coragem e seu ofício.»
«Por recordarnos por qué contamos historias.»|«Pour nous rappeler pourquoi nous racontons des histoires.»|«Por nos lembrar por que contamos histórias.»
«Por hacer de lo pequeño algo inolvidable.»|«Pour avoir rendu inoubliable ce qui est petit.»|«Por tornar inesquecível o que é pequeno.»
«Una obra que se queda contigo mucho después del final.»|«Une œuvre qui reste avec toi longtemps après la fin.»|«Uma obra que fica com você muito depois do final.»
«Cumple lo que promete y a ratos lo supera.»|«Elle tient ses promesses et parfois les dépasse.»|«Cumpre o que promete e às vezes vai além.»
«Tiene momentos, pero no termina de encontrar su tono.»|«Elle a ses moments, mais ne trouve pas vraiment son ton.»|«Tem seus momentos, mas não chega a encontrar seu tom.»
Sets permanentes|Décors permanents|Cenários permanentes`;
  T.split("\n").forEach((l) => {
    const [es, fr, pt] = l.split("|");
    if (!es || !fr) return;
    if (DIC_FR[es] == null) DIC_FR[es] = fr;
    if (DIC_PT[es] == null) DIC_PT[es] = pt;
    if (/[^.]\.$/.test(es)) {
      const k = es.slice(0, -1);
      if (DIC_FR[k] == null) DIC_FR[k] = fr.replace(/\.$/, "");
      if (DIC_PT[k] == null) DIC_PT[k] = pt.replace(/\.$/, "");
    }
  });
})();
E40L([
  ["Plataformas (todas las que quieras)", "Platforms (as many as you want)"],
  ["Tipo", "Type"],
  ["Escaleta", "Beat outline"],
  ["¿Le irá bien?", "Will it do well?"],
  ["Si sale mal", "If it goes badly"],
  ["Lo más probable", "Most likely"],
  ["Si sale muy bien", "If it goes very well"],
  ["Para no perder dinero", "To break even"],
  ["Probabilidad de recuperar lo invertido", "Chance of recouping the investment"],
  ["Es una estimación: la competencia, las críticas y el boca a boca deciden el estreno real.", "It's an estimate: competition, reviews and word of mouth decide the real release."],
  ["Planteamiento", "Setup"],
  ["Detonante", "Inciting incident"],
  ["Primer giro", "First turn"],
  ["Punto medio", "Midpoint"],
  ["Crisis", "Crisis"],
  ["Clímax", "Climax"],
  ["Desenlace", "Resolution"],
  ["Arquetipo", "Archetype"],
  ["Cuándo pasa", "When it happens"],
  ["Dónde pasa", "Where it happens"],
  ["Pistas sensoriales para imaginar la obra (no son reglas, son puntos de partida):", "Sensory cues to imagine the work (not rules, starting points):"],
  ["Ideado y creado por OneZero · Infinite Tree · INDUSTRY ART", "Conceived and created by OneZero · Infinite Tree · INDUSTRY ART"],
  ["Final abierto, sin moraleja cerrada", "Open ending, no set moral"],
  ["Llegas al", "You reach"],
  ["Arco", "Arc"],
  ["Época y lugar", "Era and place"],
  ["Uso de IA", "AI use"],
  ["Costo total", "Total cost"],
  ["Crítica y público", "Critics and audience"],
  ["Plan de salida", "Release path"],
  ["Estreno", "Release"],
  ["Medio", "Medium"],
  ["Premios", "Awards"],
  ["Marketing", "Marketing"],
  ["Rodaje", "Shooting"],
  ["Imagen", "Image"],
  ["Formato", "Format"],
  ["Talentos y reparto", "Talent and cast"],
  ["Reparto del presupuesto", "Budget split"],
  ["Tiempo de producción", "Production time"],
  ["Quién pone el dinero", "Who puts up the money"],
  ["Estilo de producción", "Production style"],
  ["Pulido", "Polish"],
  ["Música y sonido", "Music and sound"],
  ["Presupuesto de producción", "Production budget"],
  ["«Por creer en las segundas oportunidades.»", "“For believing in second chances.”"],
]);
