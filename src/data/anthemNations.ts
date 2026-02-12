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
  };
}

export const anthemNations: AnthemNation[] = [
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
O se boloke, O se boloke setjhaba sa heso,
Setjhaba sa South Afrika – South Afrika.

Uit die blou van onse hemel,
Uit die diepte van ons see,
Oor ons ewige gebergtes,
Waar die kranse antwoord gee.

Sounds the call to come together,
And united we shall stand,
Let us live and strive for freedom,
In South Africa our land.`,
        english: `God bless Africa,
May her spirit rise high;
Hear our prayers,
God bless us, your family.

Lord, bless our nation,
End wars and suffering,
Protect our people,
The people of South Africa – South Africa.

From the blue of our skies,
From the depths of our seas,
Over our eternal mountains,
Where the cliffs echo our call.

Sounds the call to come together,
And united we shall stand;
Let us live and strive for freedom,
In South Africa our land.`
      },
      history:
        "Adopted in 1997, South Africa’s national anthem uniquely combines two historically separate songs to symbolize reconciliation after apartheid. Sung in five languages, it represents unity, diversity, and shared nationhood. In rugby, the anthem carries immense emotional power and is regarded as a defining moment before Springbok matches.",
      facts: [
        "Sung in five different languages.",
        "Officially adopted in 1997.",
        "Symbol of reconciliation and unity.",
        "Central to Springbok rugby culture.",
        "Often cited as one of the world’s most inclusive anthems."
      ]
    }
  },

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
Me aroha noa.

Whakarangona rā,
Mō te aroha noa,
Kia hua ko te pai,
Kia tau tō atawhai.`,
        english: `God of nations at Thy feet,
In the bonds of love we meet,
Hear our voices, we entreat,
God defend our free land.

Guard Pacific’s triple star,
From the shafts of strife and war,
Make her praises heard afar,
God defend New Zealand.`
      },
      history:
        "Officially adopted in 1977, ‘God Defend New Zealand’ is traditionally sung in Māori first at rugby internationals. It is immediately followed by the haka.",
      facts: [
        "Two official national anthems.",
        "Often sung in Māori first.",
        "Precedes the haka."
      ]
    }
  },

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
We’ve golden soil and wealth for toil,
Our home is girt by sea;`,
        english: `Australians all let us rejoice,
For we are one and free;
We’ve golden soil and wealth for toil,
Our home is girt by sea;`
      },
      history:
        "Adopted in 1984, ‘Advance Australia Fair’ replaced ‘God Save the Queen’.",
      facts: [
        "Official anthem since 1984.",
        "Focuses on unity and freedom."
      ]
    }
  },

  {
    id: "argentina",
    name: "Argentina",
    code: "ar",
    colors: ["#74ACDF", "#FFFFFF", "#F6B40E"],
    anthem: {
      title: "Himno Nacional Argentino",
      audioUrl: "/audio/anthems/argentina-anthem.mp3",
      lyrics: {
        original: `Oíd mortales el grito sagrado:
¡Libertad, libertad, libertad!
Oíd el ruido de rotas cadenas,
Ved en trono a la noble igualdad.`,
        english: `Hear, mortals, the sacred cry:
Freedom, freedom, freedom!
Hear the sound of broken chains,
See noble equality enthroned.`
      },
      history:
        "Written during Argentina’s struggle for independence.",
      facts: [
        "One of the longest national anthems.",
        "Strong independence theme."
      ]
    }
  },

  {
    id: "fiji",
    name: "Fiji",
    code: "fj",
    colors: ["#002868", "#CE1126"],
    anthem: {
      title: "Meda Dau Doka",
      audioUrl: "/audio/anthems/fiji-anthem.mp3",
      lyrics: {
        original: `Meda dau doka ka vinakata,
Na vanua oqo,
Na vanua eda taukena,
Ka da sa maroroya.`,
        english: `We love this our country,
This land of ours,
The land we cherish,
And vow to protect.`
      },
      history:
        "Fiji’s anthem emphasizes faith, humility, and unity.",
      facts: [
        "Strong religious themes.",
        "Often accompanied by prayer."
      ]
    }
  },

  {
    id: "japan",
    name: "Japan",
    code: "jp",
    colors: ["#BC002D", "#FFFFFF"],
    anthem: {
      title: "Kimigayo",
      audioUrl: "/audio/anthems/japanese-anthem.mp3",
      lyrics: {
        original: `Kimigayo wa
Chiyo ni yachiyo ni
Sazare-ishi no
Iwao to narite`,
        english: `May your reign
Continue for a thousand generations,
Until the pebbles
Grow into mighty rocks.`
      },
      history:
        "One of the world’s oldest and shortest anthems.",
      facts: [
        "Lyrics over a millennium old.",
        "Extremely short."
      ]
    }
  },

  {
    id: "england",
    name: "England",
    code: "gb-eng",
    colors: ["#FFFFFF", "#C8102E"],
    anthem: {
      title: "God Save the King",
      audioUrl: "/audio/anthems/england-anthem.mp3",
      lyrics: {
        original: `God save our gracious King,
Long live our noble King,
God save the King.`,
        english: `God save our gracious King,
Long live our noble King,
God save the King.`
      },
      history:
        "One of the oldest national anthems in the world.",
      facts: [
        "18th-century origins.",
        "Lyrics change with the monarch."
      ]
    }
  },

  {
    id: "ireland",
    name: "Ireland",
    code: "ie",
    colors: ["#169B62", "#FF883E", "#FFFFFF"],
    anthem: {
      title: "Amhrán na bhFiann / Ireland’s Call",
      audioUrl: "/audio/anthems/ireland-anthem.mp3",
      lyrics: {
        original: `Sinne Fianna Fáil,
Atá faoi gheall ag Éirinn,
Buíon dár slua,
Thar toinn do ráinig chugainn.`,
        english: `Soldiers are we,
Whose lives are pledged to Ireland,
Some have come
From a land beyond the wave.`
      },
      history:
        "Irish rugby represents the entire island.",
      facts: [
        "All-island rugby team.",
        "Ireland’s Call written for rugby."
      ]
    }
  },

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
Contre nous de la tyrannie,
L’étendard sanglant est levé.`,
        english: `Arise, children of the Fatherland,
The day of glory has arrived!
Against us tyranny
Has raised its bloody banner.`
      },
      history:
        "Written during the French Revolution.",
      facts: [
        "Written in 1792.",
        "Militant tone."
      ]
    }
  },

  {
    id: "wales",
    name: "Wales",
    code: "gb-wls",
    colors: ["#D21034", "#FFFFFF", "#008B48"],
    anthem: {
      title: "Hen Wlad Fy Nhadau",
      audioUrl: "/audio/anthems/welsh-anthem.mp3",
      lyrics: {
        original: `Mae hen wlad fy nhadau yn annwyl i mi,
Gwlad beirdd a chantorion, enwogion o fri;`,
        english: `The land of my fathers is dear to me,
Land of poets and singers, famous men of renown;`
      },
      history:
        "Deeply tied to Welsh identity.",
      facts: [
        "Sung in Welsh.",
        "Strong crowd participation."
      ]
    }
  },

  {
    id: "scotland",
    name: "Scotland",
    code: "gb-sct",
    colors: ["#005EB8", "#FFFFFF"],
    anthem: {
      title: "Flower of Scotland",
      audioUrl: "/audio/anthems/scotland-anthem.mp3",
      lyrics: {
        original: `O Flower of Scotland,
When will we see your like again,
That fought and died for,
Your wee bit hill and glen?`,
        english: `O Flower of Scotland,
When will we see your like again,
That fought and died for,
Your small hills and valleys?`
      },
      history:
        "Adopted as sporting anthem in the 20th century.",
      facts: [
        "Adopted by rugby in the 1970s.",
        "Strong crowd participation."
      ]
    }
  },

  {
    id: "italy",
    name: "Italy",
    code: "it",
    colors: ["#009246", "#FFFFFF", "#CE2B37"],
    anthem: {
      title: "Il Canto degli Italiani",
      audioUrl: "/audio/anthems/italy-anthem.mp3",
      lyrics: {
        original: `Fratelli d’Italia,
L’Italia s’è desta,
Dell’elmo di Scipio
S’è cinta la testa.`,
        english: `Brothers of Italy,
Italy has awakened,
With Scipio’s helmet
She has bound her head.`
      },
      history:
        "Written during Italian unification.",
      facts: [
        "Symbol of unity.",
        "Performed before Six Nations matches."
      ]
    }
  }
];
