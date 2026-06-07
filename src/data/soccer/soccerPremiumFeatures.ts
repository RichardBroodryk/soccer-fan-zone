export interface SoccerPremiumFeature {
  id: number;

  title: string;

  category:
    | "video"
    | "audio"
    | "experience"
    | "archive";

  description: string;

  tier: string;
}

export const soccerPremiumFeatures: SoccerPremiumFeature[] = [
  {
    id: 1,

    title:
      "Extended Match Highlights",

    category: "video",

    description:
      "Watch full tactical breakdowns and extended World Cup highlights.",

    tier: "Premium",
  },

  {
    id: 2,

    title:
      "Alternative Commentary Feeds",

    category: "audio",

    description:
      "Switch between global commentary teams and stadium-only audio.",

    tier: "Premium+",
  },

  {
    id: 3,

    title:
      "Classic World Cup Archive",

    category: "archive",

    description:
      "Relive iconic matches, documentaries, and football history.",

    tier: "Premium",
  },

  {
    id: 4,

    title:
      "VIP Matchday Experiences",

    category: "experience",

    description:
      "Priority booking access and exclusive event experiences.",

    tier: "Elite",
  },

  {
    id: 5,

    title:
      "Multi-Angle Match Cameras",

    category: "video",

    description:
      "Access tactical cams, player cams, and alternate broadcast angles.",

    tier: "Elite",
  },
];