export interface SoccerNewsItem {
  id: number;

  title: string;

  excerpt: string;

  source: string;

  time: string;

  category:
    | "breaking"
    | "transfers"
    | "injuries"
    | "interviews"
    | "press"
    | "rumors";

  featured?: boolean;

  url?: string;

  tags: string[];
}

export const soccerNewsData: SoccerNewsItem[] = [
  {
    id: 1,

    title:
      "Brazil confirm final World Cup preparation squad",

    excerpt:
      "Brazil released their final pre-tournament training group ahead of the 2026 FIFA World Cup in North America.",

    source: "FIFA World Cup Desk",

    time: "2h ago",

    category: "breaking",

    featured: true,

    tags: ["Brazil", "World Cup"],
  },

  {
    id: 2,

    title:
      "South Africa prepare for opening match against Mexico",

    excerpt:
      "Bafana Bafana continue tactical preparations for the opening fixture at Estadio Azteca.",

    source: "Tournament Central",

    time: "4h ago",

    category: "interviews",

    featured: true,

    tags: ["South Africa", "Mexico"],
  },

  {
    id: 3,

    title:
      "England injury concern ahead of Croatia clash",

    excerpt:
      "England medical staff are monitoring several fitness concerns before the high-profile group fixture.",

    source: "England Camp",

    time: "5h ago",

    category: "injuries",

    tags: ["England", "Croatia"],
  },

  {
    id: 4,

    title:
      "Argentina supporters expected to dominate Dallas fixtures",

    excerpt:
      "Massive travelling support is expected for Argentina's knockout-stage pathway matches in Texas.",

    source: "Fan Travel Monitor",

    time: "8h ago",

    category: "press",

    tags: ["Argentina"],
  },

  {
    id: 5,

    title:
      "France finalize tactical setup for Senegal showdown",

    excerpt:
      "France coaching staff continue detailed tactical sessions before their opening group-stage fixture.",

    source: "French Football Media",

    time: "10h ago",

    category: "interviews",

    tags: ["France", "Senegal"],
  },

  {
    id: 6,

    title:
      "Portugal squad announcement draws major reaction",

    excerpt:
      "Supporters and analysts debate Portugal's final selections ahead of the tournament.",

    source: "European Football Watch",

    time: "12h ago",

    category: "rumors",

    tags: ["Portugal"],
  },
];