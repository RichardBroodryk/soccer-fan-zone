export interface SoccerGreatestMoment {
  id: number;

  title: string;

  year: string;

  nation: string;

  category:
    | "final"
    | "goal"
    | "player"
    | "upset"
    | "legacy";

  description: string;

  image: string;
}

export const soccerGreatestMoments: SoccerGreatestMoment[] = [
  {
    id: 1,

    title:
      "Argentina Win The 2022 FIFA World Cup",

    year: "2022",

    nation: "Argentina",

    category: "final",

    description:
      "Lionel Messi completed football immortality as Argentina defeated France in one of the greatest World Cup finals ever played.",

    image:
      "/src/assets/soccer/videos/classic-finals.jpg",
  },

  {
    id: 2,

    title:
      "Maradona's Goal Of The Century",

    year: "1986",

    nation: "Argentina",

    category: "goal",

    description:
      "Diego Maradona dribbled through England in Mexico City to score one of the greatest goals football has ever seen.",

    image:
      "/src/assets/soccer/videos/worldcup-highlights.jpg",
  },

  {
    id: 3,

    title:
      "Zidane Dominates The 1998 Final",

    year: "1998",

    nation: "France",

    category: "player",

    description:
      "Zinedine Zidane delivered a legendary performance as France defeated Brazil to win their first World Cup.",

    image:
      "/src/assets/soccer/videos/player-interviews.jpg",
  },

  {
    id: 4,

    title:
      "Germany Crush Brazil 7-1",

    year: "2014",

    nation: "Germany",

    category: "upset",

    description:
      "One of the most shocking results in football history unfolded in Belo Horizonte.",

    image:
      "/src/assets/soccer/videos/featured-match.jpg",
  },

  {
    id: 5,

    title:
      "Pelé Announces Himself To The World",

    year: "1958",

    nation: "Brazil",

    category: "legacy",

    description:
      "A 17-year-old Pelé changed football forever during Sweden 1958.",

    image:
      "/src/assets/soccer/videos/classic-finals.jpg",
  },
];