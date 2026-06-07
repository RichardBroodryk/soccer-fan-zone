import { AnthemNation } from "./anthemTypes";

export const afcAnthems: AnthemNation[] = [

  /* ================= AUSTRALIA ================= */

  {
    id: "australia",
    name: "Australia",
    code: "au",
    colors: ["#012169", "#FFFFFF", "#E4002B"],

    anthem: {
      title: "Advance Australia Fair",

      audioUrl: "/audio/anthems/australian-anthem.mp3",

      lyrics: {
        original: `Australians all let us rejoice,
For we are one and free;
We've golden soil and wealth for toil;
Our home is girt by sea;
Our land abounds in nature's gifts
Of beauty rich and rare;
In history's page, let every stage
Advance Australia Fair.
In joyful strains then let us sing,
Advance Australia Fair.`,

        english: `Same language`
      },

      history: `Written by Peter Dodds McCormick in 1878 and officially adopted in 1984.

⚽ Football Culture:
The anthem is sung passionately before Socceroos matches and major international tournaments.`,

      facts: [
        "Updated in 2021 from 'young and free' to 'one and free'",
        "Strong stadium participation during football matches",
        "References the Southern Cross and Australian landscape"
      ]
    }
  },

  /* ================= IRAN ================= */

  {
    id: "iran",
    name: "Iran",
    code: "ir",
    colors: ["#239F40", "#FFFFFF", "#DA0000"],

    anthem: {
      title: "National Anthem of the Islamic Republic of Iran",

      audioUrl: "/audio/anthems/iran-anthem.mp3",

      lyrics: {
        original: `Sar zad az ofoq mehre khavaran
Forughe dideye haq bavaran
Bahman, farre javedane ma
Dar nakhshe jane ma peyda shod.`,

        english: `The sun rises from the eastern horizon,
The light of the believers in truth shines,
Bahman, our eternal glory,
Has appeared in our souls.`
      },

      history: `The current anthem was adopted after the 1979 Islamic Revolution and reflects themes of faith and national identity.`,

      facts: [
        "Adopted in 1990",
        "One of the shortest national anthems",
        "Strong emotional atmosphere during football matches"
      ]
    }
  },

  /* ================= IRAQ ================= */

  {
    id: "iraq",
    name: "Iraq",
    code: "iq",
    colors: ["#CE1126", "#FFFFFF", "#000000"],

    anthem: {
      title: "Mawtini",

      audioUrl: "/audio/anthems/iraq-anthem.mp3",

      lyrics: {
        original: `Mawtini, mawtini
Al-jalalu wal-jamal
Was-sana wal-baha
Fi rubaka.`,

        english: `My homeland, my homeland,
Glory and beauty,
Splendor and brilliance
Are in your hills.`
      },

      history: `Originally a Palestinian poem written in 1934, Iraq adopted “Mawtini” in 2004 after the fall of Saddam Hussein.`,

      facts: [
        "Originally written as a Palestinian poem",
        "Represents pan-Arab identity",
        "Widely sung by Iraqi football supporters"
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
苔の生すまで

Kimigayo wa
Chiyo ni yachiyo ni
Sazare-ishi no
Iwao to narite
Koke no musu made`,

        english: `May your reign
Continue for a thousand generations,
Until pebbles grow into boulders
Covered in moss.`
      },

      history: `One of the oldest national anthems in the world, based on a Heian-period poem over 1,000 years old.`,

      facts: [
        "Among the world’s shortest national anthems",
        "Based on ancient Japanese poetry",
        "Immense cultural significance in football"
      ]
    }
  },

  /* ================= JORDAN ================= */

  {
    id: "jordan",
    name: "Jordan",
    code: "jo",
    colors: ["#000000", "#FFFFFF", "#007A3D"],

    anthem: {
      title: "As-salam al-malaki al-urdoni",

      audioUrl: "/audio/anthems/jordan-anthem.mp3",

      lyrics: {
        original: `Asha al-Malik
Samiya al-Maqam
Khalidatal'ulu bayna al-warida.`,

        english: `Long live the King,
Exalted is his status,
Eternal is his glory among all people.`
      },

      history: `Adopted after Jordan gained independence in 1946.`,

      facts: [
        "Strong royal symbolism",
        "Closely associated with national pride",
        "Powerful football crowd participation"
      ]
    }
  },

  /* ================= QATAR ================= */

  {
    id: "qatar",
    name: "Qatar",
    code: "qa",
    colors: ["#8A1538", "#FFFFFF"],

    anthem: {
      title: "As-Salam al-Amiri",

      audioUrl: "/audio/anthems/qatar-anthem.mp3",

      lyrics: {
        original: `Qataran, Qataran, Qataran
Bil-'ula wa bil-majdi najali
Faslami ya Qatar.`,

        english: `Qatar, Qatar, Qatar,
By glory and honor we rise,
Remain safe, O Qatar.`
      },

      history: `Officially adopted in 1996 and strongly linked to modern Qatari identity.`,

      facts: [
        "Modern Gulf anthem",
        "Associated with FIFA World Cup 2022 legacy",
        "Strong stadium atmosphere"
      ]
    }
  },

  /* ================= SAUDI ARABIA ================= */

  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    code: "sa",
    colors: ["#006C35", "#FFFFFF"],

    anthem: {
      title: "Aash Al Maleek",

      audioUrl: "/audio/anthems/saudi-arabia-anthem.mp3",

      lyrics: {
        original: `Sār'ī li-majdi wa-l-'ula
Majjidi li-khāliki s-samā
Arfa'i al-khaffāqa akhdar.`,

        english: `Hasten to glory and supremacy,
Glorify the Creator of the heavens,
Raise the green flag proudly.`
      },

      history: `Officially adopted in 1984 and strongly tied to Saudi national identity.`,

      facts: [
        "Known for powerful football crowd singing",
        "Green flag symbolism is central",
        "One of Asia’s most recognizable football anthems"
      ]
    }
  },

  /* ================= SOUTH KOREA ================= */

  {
    id: "south-korea",
    name: "South Korea",
    code: "kr",
    colors: ["#0e0c0c", "#CD2E3A", "#0047A0"],

    anthem: {
      title: "Aegukga",

      audioUrl: "/audio/anthems/south-korea-anthem.mp3",

      lyrics: {
        original: `Donghae mulgwa Baekdusani mareugo datorok
Haneunimi bouhasa uri nara manse.`,

        english: `Until the East Sea’s waves are dry
And Mount Baekdu worn away,
May God protect our nation forever.`
      },

      history: `Officially adopted in 1948 after Korean independence.`,

      facts: [
        "Strongly tied to Korean national identity",
        "Frequently sung with massive fan participation",
        "One of Asia’s most emotional football anthems"
      ]
    }
  },

  /* ================= UZBEKISTAN ================= */

  {
    id: "uzbekistan",
    name: "Uzbekistan",
    code: "uz",
    colors: ["#1EB53A", "#FFFFFF", "#0099B5"],

    anthem: {
      title: "State Anthem of Uzbekistan",

      audioUrl: "/audio/anthems/uzbekistan-anthem.mp3",

      lyrics: {
        original: `Serquyosh hur o‘lkam, elga baxt, najot,
Sen o‘zing do‘stlarga yo‘ldosh, mehribon!`,

        english: `My sunny free land,
You bring happiness and salvation to your people,
You are a kind companion to your friends.`
      },

      history: `Adopted in 1992 after the collapse of the Soviet Union.`,

      facts: [
        "Reflects post-Soviet independence",
        "Strong Central Asian musical influence",
        "Growing football identity in Asia"
      ]
    }
  }

];