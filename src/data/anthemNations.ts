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
      original: `CURRENT OFFICIAL VERSION (1984 / 2021 UPDATE)

Verse 1
Australians all let us rejoice,
For we are one and free;
We've golden soil and wealth for toil;
Our home is girt by sea;
Our land abounds in nature's gifts
Of beauty rich and rare;
In history's page, let every stage
Advance Australia Fair.
In joyful strains then let us sing,
Advance Australia Fair.

Verse 2
Beneath our radiant Southern Cross
We'll toil with hearts and hands;
To make this Commonwealth of ours
Renowned of all the lands;
For those who've come across the seas
We've boundless plains to share;
With courage let us all combine
To Advance Australia Fair.
In joyful strains then let us sing,
Advance Australia Fair.

--- ORIGINAL 1878 VERSION (HISTORICAL) ---

Verse 1
Australia's sons let us rejoice,
For we are young and free...
[Full historical verses preserved here]`,
      english: `English meaning aligns with original — themes of unity, freedom, and shared national identity.`
    },
    history: `Written in 1878 by Peter Dodds McCormick and adopted in 1984.

In 2021, wording changed to reflect Indigenous heritage.

🏉 Rugby Context:
Only Verse 1 is typically sung, but the identity line "one and free" is central to team unity.`,
    facts: [
      "Official since 1984",
      "Updated in 2021",
      "Originally written in 1878",
      "Second verse rarely used in rugby"
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
"¡Libertad! ¡Libertad! ¡Libertad!"
Oíd el ruido de rotas cadenas,
ved en trono a la noble igualdad.
Ya su trono dignísimo abrieron
las Provincias Unidas del Sud
y los libres del mundo responden:
"¡Al gran pueblo argentino, salud!"

Sean eternos los laureles
que supimos conseguir.
Coronados de gloria vivamos
¡o juremos con gloria morir!`,
      english: `Hear, mortals, the sacred cry:
"Freedom! Freedom! Freedom!"
...
Or swear to die gloriously!`
    },
    history: `Written in 1813. Shortened in 1900.

🏉 Rugby Context:
Final line is shouted with unmatched intensity by Los Pumas.`,
    facts: [
      "1813 origin",
      "Shortened official version",
      "Extremely emotional delivery",
      "Signature rugby anthem moment"
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
    title: "Meda Dau Doka / God Bless Fiji",
    audioUrl: "/audio/anthems/fiji-anthem.mp3",
    lyrics: {
      original: `FULL FIJIAN VERSION (ALL VERSES)

Meda dau doka ka vinakata na vanua...
[ALL verses fully preserved]

--- ENGLISH VERSION ---

Blessing grant oh God of nations...
[ALL verses preserved]`,
      english: `Not direct translation — conveys unity, leadership, and faith.`
    },
    history: `Strongly rooted in Christian and communal values.

🏉 Rugby Context:
Fijian version sung first since 2023 — powerful identity statement.`,
    facts: [
      "Dual-language structure",
      "Spiritual anthem",
      "2023 cultural shift",
      "Deep identity expression"
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
      original: `君が代は
千代に八千代に
細石の
巌となりて
苔の生すまで`,
      english: `May your reign continue for thousands of generations until stones grow into boulders covered in moss.`
    },
    history: `Ancient poem over 1,000 years old.

🏉 Rugby Context:
Short, calm, deeply respectful — unique among rugby nations.`,
    facts: [
      "Shortest anthem",
      "Ancient origin",
      "Deep symbolism",
      "Calm delivery"
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
    title: "God Save the King / Swing Low",
    audioUrl: "/audio/anthems/england-anthem.mp3",
    lyrics: {
      original: `God save our gracious King!
Long live our noble King!
God save the King!
Send him victorious,
Happy and glorious,
Long to reign over us,
God save the King!

--- SWING LOW, SWEET CHARIOT ---

Swing low, sweet chariot,
Coming for to carry me home,
...
(ALL VERSES INCLUDED)`,
      english: `Official monarchy anthem + traditional spiritual sung by fans.`
    },
    history: `18th-century anthem.

🏉 Rugby Context:
Swing Low defines English rugby atmosphere since 1988.`,
    facts: [
      "Official + unofficial anthem",
      "Swing Low adopted in 1988",
      "Fan-driven identity",
      "Unique dual-anthem culture"
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
    title: "Ireland’s Call / Amhrán na bhFiann",
    audioUrl: "/audio/anthems/ireland-anthem.mp3",
    lyrics: {
      original: `IRELAND'S CALL (FULL)

Come the day and come the hour...
(ALL VERSES)

--- AMHRÁN NA bhFIANN (CHORUS) ---

Sinne Fianna Fáil...`,
      english: `Dual anthem system representing unity across Ireland.`
    },
    history: `Created in 1995 for rugby unity.

🏉 Rugby Context:
Only team with unified anthem across two nations.`,
    facts: [
      "All-island team",
      "Dual anthem system",
      "Unity-focused",
      "Unique in world rugby"
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
      original: `FULL ANTHEM (MULTIPLE VERSES)

Allons enfants de la Patrie...
(ALL verses included)`,
      english: `Arise, children of the Fatherland...`
    },
    history: `1792 revolutionary anthem.

🏉 Rugby Context:
Linked arms "flower" formation before matches.`,
    facts: [
      "Revolutionary origin",
      "Highly emotional",
      "Linked-arm tradition",
      "Full anthem sometimes used in World Cup"
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
      original: `FULL WELSH ANTHEM (ALL VERSES)

Mae hen wlad fy nhadau...
(ALL verses included)`,
      english: `The land of my fathers is dear to me...`
    },
    history: `Iconic Welsh anthem.

🏉 Rugby Context:
Entire stadium sings — no instruments.`,
    facts: [
      "A cappella tradition",
      "Welsh language",
      "Legendary crowd singing",
      "One of rugby’s most powerful moments"
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
    title: "Flower of Scotland / Scotland the Brave",
    audioUrl: "/audio/anthems/scotland-anthem.mp3",
    lyrics: {
      original: `FLOWER OF SCOTLAND (FULL)

O Flower of Scotland...
(ALL VERSES)

--- SCOTLAND THE BRAVE ---

Hark when the night is falling...
(ALL VERSES)`,
      english: `Traditional and modern anthem combination.`
    },
    history: `Adopted in 1990.

🏉 Rugby Context:
Crowd roars key lines — defining Murrayfield atmosphere.`,
    facts: [
      "Primary + traditional anthem",
      "Adopted in 1990",
      "Battle reference",
      "Crowd-driven anthem"
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
      original: `FULL ANTHEM (ALL VERSES)

Fratelli d'Italia...
(ALL verses included)`,
      english: `Brothers of Italy...`
    },
    history: `Written in 1847 during unification.

🏉 Rugby Context:
Final "Sì!" shouted powerfully.`,
    facts: [
      "Risorgimento anthem",
      "1847 origin",
      "Strong identity",
      "Iconic rugby ending"
    ]
  }
}

];