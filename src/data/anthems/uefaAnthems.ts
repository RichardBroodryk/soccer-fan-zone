import { AnthemNation } from "./anthemTypes";

export const uefaAnthems: AnthemNation[] = [

  /* ================= AUSTRIA ================= */

  {
    id: "austria",
    name: "Austria",
    code: "at",
    colors: ["#ED2939", "#FFFFFF"],

    anthem: {
      title: "Land der Berge, Land am Strome",

      audioUrl: "/audio/anthems/austria-anthem.mp3",

      lyrics: {
        original: `Land der Berge, Land am Strome,
Land der Äcker, Land der Dome,
Land der Hämmer, zukunftsreich!
Heimat großer Töchter und Söhne,
Volk, begnadet für das Schöne,
Vielgerühmtes Österreich.`,

        english: `Land of mountains, land by the river,
Land of fields, land of cathedrals,
Land of hammers with a bright future!
Home of great daughters and sons,
People gifted for beauty,
Much-praised Austria.`
      },

      history: `Adopted after World War II to establish a distinct Austrian identity.`,

      facts: [
        "Melody associated with Mozart traditions",
        "Strong Alpine symbolism",
        "Frequently sung proudly at football internationals"
      ]
    }
  },

  /* ================= BELGIUM ================= */

  {
    id: "belgium",
    name: "Belgium",
    code: "be",
    colors: ["#000000", "#FFD90C", "#EF3340"],

    anthem: {
      title: "La Brabançonne",

      audioUrl: "/audio/anthems/belgium-anthem.mp3",

      lyrics: {
        original: `Après des siècles d'esclavage,
Le Belge, sortant du tombeau,
A reconquis par son courage
Son nom, ses droits et son drapeau.`,

        english: `After centuries of slavery,
Belgium emerged from the tomb,
And through courage reclaimed
Its name, rights, and flag.`
      },

      history: `Written during the Belgian Revolution of 1830.`,

      facts: [
        "Exists in French, Dutch, and German",
        "Strong independence symbolism",
        "Associated with Belgium’s golden football generation"
      ]
    }
  },

  /* ================= CROATIA ================= */

  {
    id: "croatia",
    name: "Croatia",
    code: "hr",
    colors: ["#FF0000", "#FFFFFF", "#171796"],

    anthem: {
      title: "Lijepa naša domovino",

      audioUrl: "/audio/anthems/croatia-anthem.mp3",

      lyrics: {
        original: `Lijepa naša domovino,
Oj junačka zemljo mila,
Stare slave djedovino,
Da bi vazda sretna bila!`,

        english: `Our beautiful homeland,
Oh heroic and dear land,
Ancient glory of our fathers,
May you forever be happy!`
      },

      history: `Based on a patriotic Croatian poem from 1835.`,

      facts: [
        "Strongly tied to Croatian identity",
        "Emotional atmosphere during football matches",
        "Celebrates homeland and heritage"
      ]
    }
  },

  /* ================= CZECHIA ================= */

  {
    id: "czechia",
    name: "Czechia",
    code: "cz",
    colors: ["#11457E", "#FFFFFF", "#D7141A"],

    anthem: {
      title: "Kde domov můj?",

      audioUrl: "/audio/anthems/czech-anthem.mp3",

      lyrics: {
        original: `Kde domov můj, kde domov můj?
Voda hučí po lučinách,
Bory šumí po skalinách.`,

        english: `Where is my home, where is my home?
Water roars through the meadows,
Forests whisper across the rocks.`
      },

      history: `Originally from a Czech opera in 1834 and adopted after the split of Czechoslovakia.`,

      facts: [
        "One of Europe’s most poetic anthems",
        "Celebrates landscape and homeland",
        "Frequently sung at football matches"
      ]
    }
  },

  /* ================= ENGLAND ================= */

  {
    id: "england",
    name: "England",
    code: "gb-eng",
    colors: ["#FFFFFF", "#C8102E"],

    anthem: {
      title: "God Save the King",

      audioUrl: "/audio/anthems/england-anthem.mp3",

      lyrics: {
        original: `God save our gracious King!
Long live our noble King!
God save the King!
Send him victorious,
Happy and glorious,
Long to reign over us,
God save the King!`,

        english: `Same language`
      },

      history: `One of the world’s oldest national anthems, dating back to the 18th century.`,

      facts: [
        "Lyrics change depending on monarch gender",
        "One of football’s most recognizable anthem moments",
        "Widely known across global sport"
      ]
    }
  },

  /* ================= FRANCE ================= */

  {
    id: "france",
    name: "France",
    code: "fr",
    colors: ["#002395", "#FFFFFF", "#ED2939"],

    anthem: {
      title: "La Marseillaise",

      audioUrl: "/audio/anthems/french-anthem.mp3",

      lyrics: {
        original: `Allons enfants de la Patrie,
Le jour de gloire est arrivé !
Aux armes, citoyens !
Formez vos bataillons !
Marchons, marchons !`,

        english: `Arise, children of the Fatherland,
The day of glory has arrived!
To arms, citizens!
Form your battalions!
March forward!`
      },

      history: `Written during the French Revolution in 1792.`,

      facts: [
        "One of the world’s most recognizable anthems",
        "Strong revolutionary symbolism",
        "Iconic pre-match football atmosphere"
      ]
    }
  },

  /* ================= GERMANY ================= */

  {
    id: "germany",
    name: "Germany",
    code: "de",
    colors: ["#000000", "#DD0000", "#FFCE00"],

    anthem: {
      title: "Das Deutschlandlied",

      audioUrl: "/audio/anthems/german-anthem.mp3",

      lyrics: {
        original: `Einigkeit und Recht und Freiheit
Für das deutsche Vaterland!
Danach lasst uns alle streben
Brüderlich mit Herz und Hand!`,

        english: `Unity and justice and freedom
For the German fatherland!
Let us all strive for these things
Brotherly with heart and hand!`
      },

      history: `Only the third stanza is officially used today.`,

      facts: [
        "Melody composed by Joseph Haydn",
        "Modern anthem avoids controversial earlier verses",
        "Strong football culture association"
      ]
    }
  },

  /* ================= ITALY ================= */

  {
    id: "italy",
    name: "Italy",
    code: "it",
    colors: ["#009246", "#FFFFFF", "#CE2B37"],

    anthem: {
      title: "Il Canto degli Italiani",

      audioUrl: "/audio/anthems/italy-anthem.mp3",

      lyrics: {
        original: `Fratelli d'Italia,
L'Italia s'è desta,
Dell'elmo di Scipio
S'è cinta la testa.`,

        english: `Brothers of Italy,
Italy has awakened,
With Scipio's helmet
She has crowned her head.`
      },

      history: `Written in 1847 during the Italian unification movement.`,

      facts: [
        "Also known as Fratelli d’Italia",
        "One of football’s most passionately sung anthems",
        "Associated with Italian unity"
      ]
    }
  },

  /* ================= NETHERLANDS ================= */

  {
    id: "netherlands",
    name: "Netherlands",
    code: "nl",
    colors: ["#AE1C28", "#FFFFFF", "#21468B"],

    anthem: {
      title: "Het Wilhelmus",

      audioUrl: "/audio/anthems/netherlands-anthem.mp3",

      lyrics: {
        original: `Wilhelmus van Nassouwe
Ben ik, van Duitsen bloed,
Den vaderland getrouwe
Blijf ik tot in den dood.`,

        english: `William of Nassau
Am I, of German blood,
Loyal to the fatherland
I remain until death.`
      },

      history: `The oldest national anthem in the world, dating back to the 16th century.`,

      facts: [
        "Oldest national anthem still in use",
        "Originally a resistance song",
        "Strong Dutch football identity"
      ]
    }
  },

  /* ================= NORWAY ================= */

  {
    id: "norway",
    name: "Norway",
    code: "no",
    colors: ["#BA0C2F", "#FFFFFF", "#00205B"],

    anthem: {
      title: "Ja, vi elsker dette landet",

      audioUrl: "/audio/anthems/norway-anthem.mp3",

      lyrics: {
        original: `Ja, vi elsker dette landet,
Som det stiger frem,
Furet, værbitt over vannet,
Med de tusen hjem.`,

        english: `Yes, we love this country,
As it rises forth,
Weathered above the sea,
With its thousand homes.`
      },

      history: `Lyrics written in 1859 and formally adopted in 2019.`,

      facts: [
        "One of Europe’s most beloved patriotic songs",
        "Celebrates landscape and resilience",
        "Strong Nordic identity"
      ]
    }
  },

  /* ================= PORTUGAL ================= */

  {
    id: "portugal",
    name: "Portugal",
    code: "pt",
    colors: ["#006600", "#FF0000"],

    anthem: {
      title: "A Portuguesa",

      audioUrl: "/audio/anthems/portugal-anthem.mp3",

      lyrics: {
        original: `Heróis do mar, nobre povo,
Nação valente, imortal,
Levantai hoje de novo
O esplendor de Portugal!`,

        english: `Heroes of the sea, noble people,
Valiant and immortal nation,
Raise once more today
The splendor of Portugal!`
      },

      history: `Adopted after the Portuguese republican revolution in 1911.`,

      facts: [
        "Strong maritime symbolism",
        "Highly emotional before football matches",
        "Associated with Portugal’s golden football era"
      ]
    }
  },

  /* ================= SCOTLAND ================= */

  {
    id: "scotland",
    name: "Scotland",
    code: "gb-sct",
    colors: ["#0065BD", "#FFFFFF"],

    anthem: {
      title: "Flower of Scotland",

      audioUrl: "/audio/anthems/scotland-anthem.mp3",

      lyrics: {
        original: `O Flower of Scotland,
When will we see
Your like again,
That fought and died for
Your wee bit hill and glen.`,

        english: `Same language`
      },

      history: `Modern patriotic anthem strongly associated with Scottish sport and identity.`,

      facts: [
        "One of football’s loudest crowd anthems",
        "Strong emotional stadium atmosphere",
        "Deeply tied to Scottish national pride"
      ]
    }
  },

  /* ================= SPAIN ================= */

  {
    id: "spain",
    name: "Spain",
    code: "es",
    colors: ["#AA151B", "#F1BF00"],

    anthem: {
      title: "Marcha Real",

      audioUrl: "/audio/anthems/spain-anthem.mp3",

      lyrics: {
        original: `Instrumental National Anthem`,

        english: `Spain has no official anthem lyrics.
Only the instrumental version is officially performed.`
      },

      history: `One of the oldest national anthems in the world and one of the few with no official lyrics.`,

      facts: [
        "Purely instrumental anthem",
        "Dates back to the 18th century",
        "Fans often sing unofficial words during football matches"
      ]
    }
  },

  /* ================= SWEDEN ================= */

  {
    id: "sweden",
    name: "Sweden",
    code: "se",
    colors: ["#006AA7", "#FECC00"],

    anthem: {
      title: "Du gamla, du fria",

      audioUrl: "/audio/anthems/swedish-anthem.mp3",

      lyrics: {
        original: `Du gamla, du fria, du fjällhöga nord,
Du tysta, du glädjerika sköna!`,

        english: `Thou ancient, thou free, thou mountainous North,
Thou quiet, thou joyful beauty!`
      },

      history: `Based on a traditional Swedish folk melody from the 19th century.`,

      facts: [
        "Never officially legislated as anthem",
        "Strong Nordic identity",
        "Widely recognized across Swedish sport"
      ]
    }
  },

  /* ================= SWITZERLAND ================= */

  {
    id: "switzerland",
    name: "Switzerland",
    code: "ch",
    colors: ["#FF0000", "#FFFFFF"],

    anthem: {
      title: "Swiss Psalm",

      audioUrl: "/audio/anthems/swiss-anthem.mp3",

      lyrics: {
        original: `Trittst im Morgenrot daher,
Seh' ich dich im Strahlenmeer,
Dich, du Hocherhabener, Herrlicher!`,

        english: `When the morning dawn appears,
I see you in the sea of light,
You sublime and glorious one!`
      },

      history: `Officially adopted in 1981 after a long national debate.`,

      facts: [
        "Has four official language versions",
        "Strong Alpine symbolism",
        "Frequently sung before football internationals"
      ]
    }
  },

  /* ================= TÜRKİYE ================= */

  {
    id: "turkiye",
    name: "Türkiye",
    code: "tr",
    colors: ["#E30A17", "#FFFFFF"],

    anthem: {
      title: "İstiklâl Marşı",

      audioUrl: "/audio/anthems/turkey-anthem.mp3",

      lyrics: {
        original: `Korkma, sönmez bu şafaklarda yüzen al sancak;
Sönmeden yurdumun üstünde tüten en son ocak.`,

        english: `Fear not! The crimson flag waving in these dawns shall never fade,
Before the last hearth burning in my homeland is extinguished.`
      },

      history: `Written during the Turkish War of Independence and adopted in 1921.`,

      facts: [
        "One of football’s most passionate anthem moments",
        "Strong independence symbolism",
        "Crowds sing with massive intensity"
      ]
    }
  }

];