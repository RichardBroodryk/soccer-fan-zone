import { AnthemNation } from "./anthemTypes";

export const conmebolAnthems: AnthemNation[] = [

  /* ================= ARGENTINA ================= */

  {
    id: "argentina",
    name: "Argentina",
    code: "ar",
    colors: ["#74ACDF", "#FFFFFF", "#F6B40E"],

    anthem: {
      title: "Himno Nacional Argentino",

      audioUrl: "/audio/anthems/argentina-anthem.mp3",

      lyrics: {
        original: `Oíd, mortales, el grito sagrado:
¡Libertad! ¡Libertad! ¡Libertad!
Oíd el ruido de rotas cadenas,
ved en trono a la noble igualdad.

Sean eternos los laureles
que supimos conseguir.
Coronados de gloria vivamos
¡o juremos con gloria morir!`,

        english: `Hear, mortals, the sacred cry:
Freedom! Freedom! Freedom!
Hear the sound of broken chains,
See noble equality upon the throne.

May the laurels we achieved
Be eternal forever.
Let us live crowned in glory,
Or swear to die gloriously.`
      },

      history: `Written during Argentina’s independence movement in 1813.

⚽ Football Culture:
One of the most passionately sung anthems in world football.`,

      facts: [
        "Modern performances use a shortened version",
        "Deeply tied to Argentine football identity",
        "Famous for emotional crowd participation"
      ]
    }
  },

  /* ================= BRAZIL ================= */

  {
    id: "brazil",
    name: "Brazil",
    code: "br",
    colors: ["#009C3B", "#FFDF00", "#002776"],

    anthem: {
      title: "Hino Nacional Brasileiro",

      audioUrl: "/audio/anthems/brazil-anthem.mp3",

      lyrics: {
        original: `Ouviram do Ipiranga as margens plácidas
De um povo heróico o brado retumbante,
E o sol da liberdade, em raios fúlgidos,
Brilhou no céu da pátria nesse instante.

Ó Pátria amada,
Idolatrada,
Salve! Salve!`,

        english: `The peaceful banks of the Ipiranga heard
The resounding cry of a heroic people,
And the sun of liberty, in shining rays,
Shone in the homeland's sky at that instant.

Beloved homeland,
Idolized,
Hail! Hail!`
      },

      history: `The melody was composed in 1831 while the official lyrics were adopted in 1922.`,

      facts: [
        "Known for complex poetic Portuguese",
        "One of football’s most iconic anthem moments",
        "Fans often continue singing after the music stops"
      ]
    }
  },

  /* ================= COLOMBIA ================= */

  {
    id: "colombia",
    name: "Colombia",
    code: "co",
    colors: ["#FCD116", "#003893", "#CE1126"],

    anthem: {
      title: "Himno Nacional de la República de Colombia",

      audioUrl: "/audio/anthems/colombia-anthem.mp3",

      lyrics: {
        original: `¡Oh gloria inmarcesible!
¡Oh júbilo inmortal!
En surcos de dolores
El bien germina ya.

Cesó la horrible noche,
La libertad sublime
Derrama las auroras
De su invencible luz.`,

        english: `Oh unfading glory!
Oh immortal joy!
In furrows of pain
Good now germinates.

The horrible night has ended,
Sublime liberty
Spreads the dawn
Of its invincible light.`
      },

      history: `Lyrics written by former Colombian president Rafael Núñez and officially adopted in 1920.`,

      facts: [
        "One of South America’s most emotional football anthems",
        "Strong themes of liberty and independence",
        "Massive fan participation before matches"
      ]
    }
  },

  /* ================= ECUADOR ================= */

  {
    id: "ecuador",
    name: "Ecuador",
    code: "ec",
    colors: ["#FCD116", "#003893", "#CE1126"],

    anthem: {
      title: "Salve, Oh Patria!",

      audioUrl: "/audio/anthems/ecuador-anthem.mp3",

      lyrics: {
        original: `¡Salve, Oh Patria, mil veces! ¡Oh Patria,
gloria a ti!

Independencia es el grito del alma;
¡Independencia!`,

        english: `Hail, O Fatherland, a thousand times!
Glory to you!

Independence is the cry of the soul;
Independence!`
      },

      history: `Officially adopted in 1948 and strongly associated with Ecuadorian independence.`,

      facts: [
        "Features strong patriotic themes",
        "Frequently sung loudly by football supporters",
        "References liberty and national pride"
      ]
    }
  },

  /* ================= PARAGUAY ================= */

  {
    id: "paraguay",
    name: "Paraguay",
    code: "py",
    colors: ["#D52B1E", "#FFFFFF", "#0038A8"],

    anthem: {
      title: "Paraguayos, República o Muerte",

      audioUrl: "/audio/anthems/paraguay-anthem.mp3",

      lyrics: {
        original: `Paraguayos, república o muerte,
Nuestro brío nos dio libertad;
Ni opresores, ni siervos humillan,
Do reinan unión e igualdad.`,

        english: `Paraguayans, republic or death,
Our courage gave us liberty;
Neither oppressors nor servants humiliate
Where union and equality reign.`
      },

      history: `Adopted in 1934 and reflects Paraguay’s long struggle for independence and survival.`,

      facts: [
        "Known for its defiant closing lines",
        "Strong independence symbolism",
        "Powerful football crowd atmosphere"
      ]
    }
  },

  /* ================= URUGUAY ================= */

  {
    id: "uruguay",
    name: "Uruguay",
    code: "uy",
    colors: ["#6CB4EE", "#FFFFFF", "#FCD116"],

    anthem: {
      title: "Himno Nacional del Uruguay",

      audioUrl: "/audio/anthems/uruguay-anthem.mp3",

      lyrics: {
        original: `¡Orientales, la Patria o la Tumba!
¡Libertad o con gloria morir!
Es el voto que el alma pronuncia,
Y que heroicos sabremos cumplir.`,

        english: `Citizens of the East, the Fatherland or the Tomb!
Liberty or to die with glory!
It is the vow spoken by the soul,
And heroically we shall fulfill it.`
      },

      history: `Adopted in 1833 and considered one of the world’s longest national anthems.`,

      facts: [
        "One of the longest anthems globally",
        "Only shortened versions used in football",
        "Strong historical identity in South American football"
      ]
    }
  }

];