import { AnthemNation } from "./anthemTypes";

export const ofcAnthems: AnthemNation[] = [

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
        original: `God of nations at Thy feet,
In the bonds of love we meet,
Hear our voices, we entreat,
God defend our free land.

Guard Pacific's triple star,
From the shafts of strife and war,
Make her praises heard afar,
God defend New Zealand.

E Ihowā Atua,
O ngā iwi mātou rā,
Āta whakarangona,
Me aroha noa.`,

        english: `God of nations, at your feet
We gather in unity and peace.
Protect our free land
And guide New Zealand.

O Lord,
Listen to your people,
Show us love and compassion.`
      },

      history: `Originally written as a poem in 1870 and officially adopted in 1977.

⚽ Football Culture:
The anthem is strongly associated with New Zealand football and often followed by the haka at major sporting events.`,

      facts: [
        "One of only two countries with two official anthems",
        "Performed in both English and Māori",
        "One of the world’s most recognizable sporting traditions"
      ]
    }
  }

];