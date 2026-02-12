/* ================= NEWS DATA — CANONICAL ================= */

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  source: string;
  time: string;
  category: string;
  tags: string[];
  featured?: boolean;
};

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "All Blacks Announce New Head Coach for 2025",
    excerpt:
      "New Zealand Rugby confirms leadership changes ahead of the next international cycle.",
    source: "NZ Rugby",
    time: "2 hours ago",
    category: "breaking",
    tags: ["New Zealand", "All Blacks", "Coaching"],
    featured: true,
  },
  {
    id: 2,
    title: "Springbok Star Ruled Out With Hamstring Injury",
    excerpt:
      "Key forward expected to miss upcoming championship fixtures.",
    source: "Team Medical",
    time: "5 hours ago",
    category: "injuries",
    tags: ["South Africa", "Springboks", "Injury"],
  },
  {
    id: 3,
    title: "England Fly-Half Linked With Top 14 Move",
    excerpt:
      "Sources suggest talks are underway with French clubs.",
    source: "Transfer Desk",
    time: "1 day ago",
    category: "transfers",
    tags: ["England", "Transfers"],
    featured: true,
  },
];
