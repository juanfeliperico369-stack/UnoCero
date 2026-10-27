// ===== Sinopsis automáticas en francés y portugués: se traducen por frases =====
(() => {
  if (typeof DIC_FR == "undefined") return;
  const EP = {
    "En la Prehistoria": ["À la Préhistoire", "Na Pré-História"],
    "En la Antigüedad": ["Dans l'Antiquité", "Na Antiguidade"],
    "En la Grecia y la Roma antiguas": ["Dans la Grèce et la Rome antiques", "Na Grécia e na Roma antigas"],
    "En la Edad Media": ["Au Moyen Âge", "Na Idade Média"],
    "En el Renacimiento": ["À la Renaissance", "No Renascimento"],
    "En los siglos XVII y XVIII": ["Aux XVIIe et XVIIIe siècles", "Nos séculos XVII e XVIII"],
    "En el siglo XIX": ["Au XIXe siècle", "No século XIX"],
    "En la primera mitad del siglo XX": ["Dans la première moitié du XXe siècle", "Na primeira metade do século XX"],
    "En la segunda mitad del siglo XX": ["Dans la seconde moitié du XXe siècle", "Na segunda metade do século XX"],
    Hoy: ["Aujourd'hui", "Hoje"],
    "En un futuro cercano": ["Dans un futur proche", "Em um futuro próximo"],
    "En un futuro lejano": ["Dans un futur lointain", "Em um futuro distante"],
  };
  // {e}/{o}: marca de género (francés «e», portugués «a»)
  const PM = [
    ["descubre que es la única persona capaz de cambiar el destino de todos", "découvre qu'il{le} est la seule personne capable de changer le destin de tous", "descobre que é a única pessoa capaz de mudar o destino de todos"],
    ["lo pierde todo y tiene que empezar de cero", "perd tout et doit repartir de zéro", "perde tudo e precisa recomeçar do zero"],
    ["deja atrás la infancia en un verano que no olvidará", "laisse l'enfance derrière {lui} lors d'un été inoubliable", "deixa a infância para trás em um verão inesquecível"],
    ["llega a un mundo donde nada funciona como en casa", "arrive dans un monde où rien ne fonctionne comme chez soi", "chega a um mundo onde nada funciona como em casa"],
    ["vuelve al lugar del que huyó hace años", "revient à l'endroit qu'il{le} a fui il y a des années", "volta ao lugar de onde fugiu anos atrás"],
    ["recibe una segunda oportunidad que no piensa desperdiciar", "reçoit une seconde chance qu'il{le} ne compte pas gâcher", "recebe uma segunda chance que não pretende desperdiçar"],
    ["deja su hogar para cumplir una misión que le queda grande", "quitte son foyer pour une mission qui le{la} dépasse", "deixa seu lar para cumprir uma missão grande demais"],
    ["sube hasta la cima y empieza a perderlo todo", "grimpe jusqu'au sommet et commence à tout perdre", "chega ao topo e começa a perder tudo"],
    ["se enfrenta a un enemigo mucho más poderoso", "affronte un ennemi bien plus puissant", "enfrenta um inimigo muito mais poderoso"],
    ["decide hacer justicia cuando la ley no la hace", "décide de rendre justice quand la loi ne le fait pas", "decide fazer justiça quando a lei não faz"],
    ["entra en una lucha sin cuartel por el poder", "se lance dans une lutte sans merci pour le pouvoir", "entra em uma luta sem trégua pelo poder"],
    ["se rebela contra un sistema que parecía invencible", "se rebelle contre un système qui semblait invincible", "se rebela contra um sistema que parecia invencível"],
    ["descubre que quien le enseñó todo l{o} ha traicionado", "découvre que celui qui lui a tout appris l'a trahi{e}", "descobre que quem lhe ensinou tudo {o} traiu"],
    ["defiende el último lugar que queda en pie", "défend le dernier endroit encore debout", "defende o último lugar que ainda resiste"],
    ["recibe un chantaje que pone en juego todo lo que ama", "subit un chantage qui menace tout ce qu'il{le} aime", "sofre uma chantagem que põe em risco tudo o que ama"],
    ["trabaja para dos bandos y ya no sabe cuál es el suyo", "travaille pour deux camps et ne sait plus lequel est le sien", "trabalha para dois lados e já não sabe qual é o seu"],
    ["reúne a una banda para dar el golpe perfecto", "réunit une bande pour le coup parfait", "reúne uma gangue para o golpe perfeito"],
    ["queda atrapad{o} con alguien que esconde un crimen", "se retrouve piégé{e} avec quelqu'un qui cache un crime", "fica pres{o} com alguém que esconde um crime"],
    ["carga con un crimen que no cometió", "porte le poids d'un crime qu'il{le} n'a pas commis", "carrega um crime que não cometeu"],
    ["esconde quién es en realidad", "cache qui il{le} est vraiment", "esconde quem é de verdade"],
    ["acepta un último trabajo antes de retirarse", "accepte un dernier travail avant de raccrocher", "aceita um último trabalho antes de se aposentar"],
    ["se enamora de quien no debe", "tombe amoureux{se} de la mauvaise personne", "se apaixona por quem não deve"],
    ["se enamora de su peor rival", "tombe amoureux{se} de son pire rival", "se apaixona pelo seu pior rival"],
    ["encuentra una familia donde menos la esperaba", "trouve une famille là où il{le} s'y attendait le moins", "encontra uma família onde menos esperava"],
    ["busca a la hermana o al hermano que le arrebataron hace años", "cherche la sœur ou le frère qu'on lui a arraché il y a des années", "procura a irmã ou o irmão que lhe tiraram anos atrás"],
    ["acepta un matrimonio por conveniencia que se complica", "accepte un mariage de convenance qui se complique", "aceita um casamento de conveniência que se complica"],
    ["se reencuentra con el amor de su juventud", "retrouve l'amour de sa jeunesse", "reencontra o amor da juventude"],
    ["queda dividid{o} entre dos amores", "se retrouve partagé{e} entre deux amours", "fica dividid{o} entre dois amores"],
    ["despierta sin recordar quién es", "se réveille sans savoir qui il{le} est", "acorda sem lembrar quem é"],
    ["revive el mismo día una y otra vez", "revit le même jour encore et encore", "revive o mesmo dia de novo e de novo"],
    ["investiga una desaparición sin rastro", "enquête sur une disparition sans trace", "investiga um desaparecimento sem rastro"],
    ["recibe un mensaje escrito hace cien años", "reçoit un message écrit il y a cent ans", "recebe uma mensagem escrita há cem anos"],
    ["cruza a un mundo paralelo", "passe dans un monde parallèle", "atravessa para um mundo paralelo"],
    ["desentierra un secreto de familia", "déterre un secret de famille", "desenterra um segredo de família"],
    ["recibe la visita de alguien que viene del futuro", "reçoit la visite de quelqu'un venu du futur", "recebe a visita de alguém que vem do futuro"],
    ["resiste un asedio sin salida", "résiste à un siège sans issue", "resiste a um cerco sem saída"],
    ["tiene pocos días para evitar una catástrofe", "a quelques jours pour éviter une catastrophe", "tem poucos dias para evitar uma catástrofe"],
    ["lucha contra un contagio que se extiende sin control", "lutte contre une contagion qui se propage sans contrôle", "luta contra um contágio que se espalha sem controle"],
    ["enfrenta una invasión que nadie vio venir", "affronte une invasion que personne n'a vue venir", "enfrenta uma invasão que ninguém viu chegar"],
    ["descubre que algo acecha en las sombras", "découvre que quelque chose rôde dans l'ombre", "descobre que algo espreita nas sombras"],
    ["naufraga en un lugar del que nadie ha vuelto", "fait naufrage dans un lieu d'où personne n'est revenu", "naufraga em um lugar de onde ninguém voltou"],
    ["tiene una sola noche para cambiarlo todo", "n'a qu'une nuit pour tout changer", "tem uma única noite para mudar tudo"],
    ["intenta que una boda no termine en desastre", "tente d'éviter qu'un mariage tourne au désastre", "tenta impedir que um casamento termine em desastre"],
    ["es confundid{o} con otra persona", "est pris{e} pour quelqu'un d'autre", "é confundid{o} com outra pessoa"],
    ["hereda una fortuna con condiciones absurdas", "hérite d'une fortune aux conditions absurdes", "herda uma fortuna com condições absurdas"],
    ["despierta en el cuerpo de otra persona", "se réveille dans le corps de quelqu'un d'autre", "acorda no corpo de outra pessoa"],
    ["dice una pequeña mentira que no para de crecer", "dit un petit mensonge qui ne cesse de grandir", "conta uma pequena mentira que não para de crescer"],
    ["tiene que trabajar con su opuesto", "doit travailler avec son opposé", "precisa trabalhar com seu oposto"],
    ["emprende un viaje por carretera con quien menos quería", "part en road trip avec la dernière personne qu'il{le} voulait", "faz uma viagem de carro com quem menos queria"],
    ["aprende tan rápido que supera a su maestro", "apprend si vite qu'il{le} dépasse son maître", "aprende tão rápido que supera seu mestre"],
    ["forma un equipo con quienes nadie elegiría", "forme une équipe avec ceux que personne ne choisirait", "forma uma equipe com quem ninguém escolheria"],
    ["parte en una expedición a un lugar sin mapa", "part en expédition vers un lieu sans carte", "parte em uma expedição a um lugar sem mapa"],
    ["acepta una misión de la que no se vuelve", "accepte une mission dont on ne revient pas", "aceita uma missão da qual não se volta"],
    ["organiza un rescate imposible", "organise un sauvetage impossible", "organiza um resgate impossível"],
    ["reúne a su viejo equipo para un último golpe", "réunit sa vieille équipe pour un dernier coup", "reúne sua velha equipe para um último golpe"],
    ["entra en un torneo donde solo uno puede ganar", "entre dans un tournoi où un seul peut gagner", "entra em um torneio onde só um pode vencer"],
    ["se ve obligad{o} a cambiar su vida", "se voit obligé{e} de changer de vie", "se vê obrigad{o} a mudar de vida"],
  ];
  const ARF2 = {
    "Su camino sube sin parar.": ["Son chemin ne cesse de monter.", "Seu caminho sobe sem parar."],
    "Lo pierde todo poco a poco.": ["Il perd tout, peu à peu.", "Perde tudo pouco a pouco."],
    "Cae hondo y vuelve a levantarse.": ["Tombe très bas et se relève.", "Cai fundo e volta a se levantar."],
    "Cae dos veces y dos veces se levanta.": ["Tombe deux fois et se relève deux fois.", "Cai duas vezes e duas vezes se levanta."],
    "Sube muy alto, pero la caída será dura.": ["Monte très haut, mais la chute sera rude.", "Sobe muito alto, mas a queda será dura."],
    "Cae, se recupera y vuelve a caer.": ["Tombe, se relève et retombe.", "Cai, se recupera e volta a cair."],
    "Sube, cae y termina más alto que nunca.": ["Monte, tombe et finit plus haut que jamais.", "Sobe, cai e termina mais alto do que nunca."],
  };
  Object.keys(ARF2).forEach((k) => ((DIC_FR[k] = DIC_FR[k] || ARF2[k][0]), (DIC_PT[k] = DIC_PT[k] || ARF2[k][1])));
  const L = CFG => (CFG.idi == "fr" ? 1 : 2);
  const gen = (s, F, i) => (i == 1 ? s.replace(/il\{le\}/g, F ? "elle" : "il").replace(/\{lui\}/g, F ? "elle" : "lui").replace(/le\{la\}/g, F ? "la" : "le").replace(/x\{se\}/g, F ? "se" : "x").replace(/\{e\}/g, F ? "e" : "") : s.replace(/\{o\}/g, F ? "a" : "o"));
  const PMR = [];
  PM.forEach((p) => ["o", "a"].forEach((g) => PMR.push([p[0].replace(/\{o\}/g, g), p, g == "a"])));
  const pal = (D, w) => {
    const x = w.replace(/^(el|la|los|las|un|una|lo) /i, "").trim(),
      v = D[x] != null ? D[x] : D[uc1(x)] != null ? D[uc1(x)] : null;
    return v == null ? x : v.toLowerCase();
  };
  const frase = (D, s, i) => {
    let m = s.match(/^(?:(.+?) · )?un (disco|trabajo musical) sobre (.+?)\.$/);
    if (m) {
      const g = m[1] ? (D[m[1]] || m[1]) + " · " : "",
        k = m[2] == "disco" ? (i == 1 ? "un album" : "um álbum") : i == 1 ? "une œuvre musicale" : "um trabalho musical",
        tm = m[3] == "lo que nos mueve" ? (i == 1 ? "ce qui nous émeut" : "o que nos move") : m[3].split(/ y /).map((w) => pal(D, w)).join(i == 1 ? " et " : " e ");
      return g + k + (i == 1 ? " — thèmes : " : " — temas: ") + tm + ".";
    }
    m = s.match(/^Una historia sobre (.+?)\.$/);
    if (m) return (i == 1 ? "Thèmes : " : "Temas: ") + m[1].split(/ y /).map((w) => pal(D, w)).join(i == 1 ? " et " : " e ") + ".";
    m = s.match(/^(.+?)(, en varios lugares|, en ([^,]+))?, (alguien que no tiene nada que perder|una persona común|([^,]+), ([^,]+?)(?: de (\d+) años)?,) (.+)\.$/);
    if (m && EP[m[1]]) {
      const ep = EP[m[1]][i - 1],
        lug = m[2] ? (m[3] ? " (" + (D[m[3]] || m[3]) + ")" : i == 1 ? ", en divers lieux" : ", em vários lugares") : "";
      let q;
      if (!m[5]) q = m[4] == "una persona común" ? (i == 1 ? "une personne ordinaire" : "uma pessoa comum") : i == 1 ? "quelqu'un qui n'a rien à perdre" : "alguém que não tem nada a perder";
      else q = m[5] + ", " + pal(D, m[6]) + (m[7] ? (i == 1 ? " de " + m[7] + " ans" : " de " + m[7] + " anos") : "") + ",";
      const pms = m[8].split(" y luego "),
        T = pms.map((x) => {
          const r = PMR.find((y) => y[0] == x);
          return r ? gen(r[1][i], r[2], i) : x;
        });
      if (T.some((x, j) => x == pms[j])) return null;
      return ep + lug + ", " + q + " " + T.join(i == 1 ? " puis " : " e depois ") + ".";
    }
    return null;
  };
  const trXS = trX;
  trX = function (t) {
    const D = XDIC();
    if (!D || !t || t.length < 24 || !/\. |\.$/.test(t)) return trXS(t);
    const k = t.trim(),
      i = L(CFG),
      P = k.split(/(?<=\.) /);
    let n = 0,
      f = 0;
    const o = P.map((s) => {
      const v = frase(D, s, i);
      if (v != null) {
        f++;
        n++;
        return v;
      }
      const w = D[s] != null ? D[s] : null;
      if (w != null) n++;
      return w == null ? s : w;
    });
    return f ? t.replace(k, o.join(" ")) : trXS(t);
  };
})();
