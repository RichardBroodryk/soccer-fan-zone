export interface AnthemNation {
  id: string;
  name: string;
  code: string;
  colors: string[];
  anthem: {
    title: string;
    lyrics: {
      original: string;
      english: string;
    };
    history: string;
    facts: string[];
    audioUrl?: string;

    haka?: {
      kaMate: {
        title: string;
        description: string;
        original: string;
        english: string;
      };
      kapaOPango: {
        title: string;
        description: string;
        original: string;
        english: string;
      };
    };
  };
}

export const anthemNations: AnthemNation[] = [

/* ================= SOUTH AFRICA ================= */
{
  id: "south-africa",
  name: "South Africa",
  code: "za",
  colors: ["#007A4D", "#FFB612", "#000000"],
  anthem: {
    title: "Nkosi Sikelel’ iAfrika / Die Stem van Suid-Afrika",
    audioUrl: "/audio/anthems/south-african-anthem.mp3",
    lyrics: {
      original: `Nkosi sikelel' iAfrika,
Maluphakanyisw' uphondo lwayo;
Yizwa imithandazo yethu,
Nkosi sikelela, thina lusapho lwayo.

Morena boloka setjhaba sa heso,
O fedise dintwa le matshwenyeho,
O se boloke setjhaba sa heso,
Setjhaba sa South Afrika – South Afrika.

Uit die blou van onse hemel,
Uit die diepte van ons see,
Oor ons ewige gebergtes,
Waar die kranse antwoord gee.

Sounds the call to come together,
And united we shall stand,
Let us live and strive for freedom,
In South Africa our land.`,
      english: `God bless Africa...
Let us live and strive for freedom in South Africa our land.`
    },
    history: "Adopted in 1997 as a symbol of unity and reconciliation.",
    facts: [
      "Five languages",
      "Post-apartheid unity anthem",
      "Emotionally powerful in rugby"
    ]
  }
},

/* ================= NEW ZEALAND ================= */
{
  id: "new-zealand",
  name: "New Zealand",
  code: "nz",
  colors: ["#000000", "#FFFFFF"],
  anthem: {
    title: "God Defend New Zealand",
    audioUrl: "/audio/anthems/new-zealand-anthem.mp3",
    lyrics: {
      original: `E Ihowā Atua,
O ngā iwi mātou rā,
Āta whakarangona,
Me aroha noa.`,
      english: `God of nations at Thy feet,
Hear our voices, we entreat.`
    },
    history: "Adopted 1977, sung before the haka.",
    facts: [
      "Two official anthems",
      "Māori first tradition",
      "Haka follows immediately"
    ],

    haka: {
      kaMate: {
        title: "Ka Mate (Traditional)",
        description: "Traditional haka performed for over a century.",
        original: `Ka mate, ka mate! ka ora, ka ora!`,
        english: "It is death, it is life."
      },
      kapaOPango: {
        title: "Kapa o Pango (Modern)",
        description: "Modern haka introduced in 2005.",
        original: `Kapa o pango kia whakawhenua au i ahau!`,
        english: "Let me become one with the land."
      }
    }
  }
},

/* ================= AUSTRALIA ================= */
{
  id: "australia",
  name: "Australia",
  code: "au",
  colors: ["#00008B", "#FF0000", "#FFFFFF"],
  anthem: {
    title: "Advance Australia Fair",
    audioUrl: "/audio/anthems/australian-anthem.mp3",
    lyrics: {
      original: `Australians all let us rejoice,
For we are one and free;
We've golden soil and wealth for toil;
Our home is girt by sea.`,
      english: `Australians all let us rejoice.`
    },
    history: "Official anthem since 1984.",
    facts: [
      "Updated in 2021",
      "Second verse rarely sung"
    ]
  }
},

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
¡Libertad! ¡Libertad! ¡Libertad!`,
      english: `Hear the sacred cry: Freedom!`
    },
    history: "Shortened version used in rugby.",
    facts: [
      "1813 origin",
      "Powerful chorus",
      "National pride anthem"
    ]
  }
},

/* ================= FIJI ================= */
{
  id: "fiji",
  name: "Fiji",
  code: "fj",
  colors: ["#002868", "#CE1126"],
  anthem: {
    title: "Meda Dau Doka",
    audioUrl: "/audio/anthems/fiji-anthem.mp3",
    lyrics: {
      original: `Meda dau doka ka vinakata na vanua`,
      english: `God bless Fiji`
    },
    history: "Sung in Fijian first in rugby.",
    facts: [
      "Dual-language anthem",
      "Strong spiritual theme"
    ]
  }
},

/* ================= JAPAN ================= */
{
  id: "japan",
  name: "Japan",
  code: "jp",
  colors: ["#BC002D", "#FFFFFF"],
  anthem: {
    title: "Kimigayo",
    audioUrl: "/audio/anthems/japanese-anthem.mp3",
    lyrics: {
      original: `君が代は 千代に八千代に`,
      english: `May your reign continue`
    },
    history: "One of the oldest anthems.",
    facts: [
      "Extremely short",
      "Ancient poem"
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
      original: `God save our gracious King!`,
      english: `God save the King`
    },
    history: "Traditional anthem.",
    facts: [
      "Monarch-based lyrics",
      "Historic anthem"
    ]
  }
},

/* ================= IRELAND ================= */
{
  id: "ireland",
  name: "Ireland",
  code: "ie",
  colors: ["#169B62", "#FF883E", "#FFFFFF"],
  anthem: {
    title: "Ireland’s Call",
    audioUrl: "/audio/anthems/ireland-anthem.mp3",
    lyrics: {
      original: `Come the day and come the hour`,
      english: `Ireland united`
    },
    history: "Rugby anthem for unity.",
    facts: [
      "All-island team",
      "Written 1995"
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
      original: `Allons enfants de la Patrie`,
      english: `Arise, children of the Fatherland`
    },
    history: "Revolutionary anthem.",
    facts: [
      "1792 origin",
      "Very emotional"
    ]
  }
},

/* ================= WALES ================= */
{
  id: "wales",
  name: "Wales",
  code: "gb-wls",
  colors: ["#D21034", "#FFFFFF", "#008B48"],
  anthem: {
    title: "Hen Wlad Fy Nhadau",
    audioUrl: "/audio/anthems/welsh-anthem.mp3",
    lyrics: {
      original: `Mae hen wlad fy nhadau`,
      english: `Land of my fathers`
    },
    history: "Iconic rugby anthem.",
    facts: [
      "Sung in Welsh",
      "Strong crowd singing"
    ]
  }
},

/* ================= SCOTLAND ================= */
{
  id: "scotland",
  name: "Scotland",
  code: "gb-sct",
  colors: ["#005EB8", "#FFFFFF"],
  anthem: {
    title: "Flower of Scotland",
    audioUrl: "/audio/anthems/scotland-anthem.mp3",
    lyrics: {
      original: `O Flower of Scotland`,
      english: `O Flower of Scotland`
    },
    history: "Adopted for rugby in 1990.",
    facts: [
      "Battle reference",
      "Murrayfield tradition"
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
      original: `Fratelli d'Italia`,
      english: `Brothers of Italy`
    },
    history: "Unification anthem.",
    facts: [
      "1847 origin",
      "Strong national identity"
    ]
  }
}

];