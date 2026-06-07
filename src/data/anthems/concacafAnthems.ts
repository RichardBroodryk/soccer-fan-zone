import { AnthemNation } from "./anthemTypes";

export const concacafAnthems: AnthemNation[] = [

  /* ================= CANADA ================= */

  {
    id: "canada",
    name: "Canada",
    code: "ca",
    colors: ["#FF0000", "#FFFFFF"],

    anthem: {
      title: "O Canada",

      audioUrl: "/audio/anthems/canada-anthem.mp3",

      lyrics: {
        original: `O Canada!
Our home and native land!
True patriot love in all of us command.
With glowing hearts we see thee rise,
The True North strong and free!
From far and wide,
O Canada, we stand on guard for thee.
God keep our land glorious and free!
O Canada, we stand on guard for thee.
O Canada, we stand on guard for thee.`,

        english: `Same language`
      },

      history: `Originally composed in 1880 and officially adopted as Canada’s national anthem in 1980.

⚽ Football Culture:
The anthem has become increasingly iconic with the rise of Canadian football on the global stage.`,

      facts: [
        "Officially bilingual nation",
        "Lyrics updated in 2018 for inclusivity",
        "Strong crowd participation during football matches"
      ]
    }
  },

  /* ================= CURAÇAO ================= */

  {
    id: "curacao",
    name: "Curaçao",
    code: "cw",
    colors: ["#002B7F", "#F9E814"],

    anthem: {
      title: "Himno di Kòrsou",

      audioUrl: "/audio/anthems/curacao-anthem.mp3",

      lyrics: {
        original: `Den patria altu i glorioso
Nos ta na tur momento
Ta duna nos amor i forsa
Pa lucha pa nos derecho.`,

        english: `In the high and glorious fatherland
We are always given
Love and strength
To fight for our rights.`
      },

      history: `Adopted in 1978 after Curaçao gained greater autonomy within the Kingdom of the Netherlands.`,

      facts: [
        "Written in Papiamentu",
        "Reflects Caribbean identity",
        "Strong local pride during football matches"
      ]
    }
  },

  /* ================= HAITI ================= */

  {
    id: "haiti",
    name: "Haiti",
    code: "ht",
    colors: ["#00209F", "#D21034"],

    anthem: {
      title: "La Dessalinienne",

      audioUrl: "/audio/anthems/haiti-anthem.mp3",

      lyrics: {
        original: `Pour le Pays, pour les Ancêtres,
Marchons unis, marchons unis.
Dans nos rangs point de traîtres,
Du sol soyons seuls maîtres.`,

        english: `For our country, for our ancestors,
Let us march united.
Let there be no traitors among us,
Let us be masters of our own land.`
      },

      history: `Named after revolutionary leader Jean-Jacques Dessalines and adopted in 1904.`,

      facts: [
        "Celebrates Haitian independence",
        "Named after a revolutionary hero",
        "Strong symbolism of unity and resistance"
      ]
    }
  },

  /* ================= MEXICO ================= */

  {
    id: "mexico",
    name: "Mexico",
    code: "mx",
    colors: ["#006847", "#FFFFFF", "#CE1126"],

    anthem: {
      title: "Himno Nacional Mexicano",

      audioUrl: "/audio/anthems/mexican-anthem.mp3",

      lyrics: {
        original: `Mexicanos, al grito de guerra
el acero aprestad y el bridón;
Y retiemble en sus centros la Tierra,
al sonoro rugir del cañón.

Mas si osare un extraño enemigo
profanar con su planta tu suelo,
piensa ¡oh Patria querida! que el cielo
un soldado en cada hijo te dio.`,

        english: `Mexicans, at the cry of war,
Prepare your steel and bridle,
And let the Earth tremble
At the roar of the cannon.

If a foreign enemy dares
To profane your land,
Know that heaven
Gave you a soldier in every son.`
      },

      history: `First performed in 1854 after a national competition to create a patriotic anthem.

⚽ Football Culture:
One of the loudest and most passionate anthem moments in world football.`,

      facts: [
        "Extremely emotional football anthem",
        "Only shortened sporting version is usually sung",
        "Deeply tied to Mexican national identity"
      ]
    }
  },

  /* ================= PANAMA ================= */

  {
    id: "panama",
    name: "Panama",
    code: "pa",
    colors: ["#005293", "#FFFFFF", "#D21034"],

    anthem: {
      title: "Himno Istmeño",

      audioUrl: "/audio/anthems/panama-anthem.mp3",

      lyrics: {
        original: `Alcanzamos por fin la victoria
En el campo feliz de la unión;
Con ardientes fulgores de gloria
Se ilumina la nueva nación.`,

        english: `We have finally achieved victory
In the happy field of union;
With burning flashes of glory
The new nation shines brightly.`
      },

      history: `Adopted after Panama separated from Colombia and officially recognized in 1925.`,

      facts: [
        "Celebrates Panamanian independence",
        "Strong patriotic symbolism",
        "Frequently sung passionately at football matches"
      ]
    }
  },

  /* ================= UNITED STATES ================= */

  {
    id: "united-states",
    name: "United States",
    code: "us",
    colors: ["#B22234", "#FFFFFF", "#3C3B6E"],

    anthem: {
      title: "The Star-Spangled Banner",

      audioUrl: "/audio/anthems/usa-anthem.mp3",

      lyrics: {
        original: `O say can you see, by the dawn's early light,
What so proudly we hailed at the twilight's last gleaming,
Whose broad stripes and bright stars through the perilous fight,
O'er the ramparts we watched, were so gallantly streaming?

And the rockets' red glare, the bombs bursting in air,
Gave proof through the night that our flag was still there;
O say does that star-spangled banner yet wave
O'er the land of the free and the home of the brave?`,

        english: `Same language`
      },

      history: `Written by Francis Scott Key during the War of 1812 and officially adopted in 1931.`,

      facts: [
        "Famous for its difficult vocal range",
        "One of the most recognizable anthems globally",
        "Central part of American sporting culture"
      ]
    }
  }

];