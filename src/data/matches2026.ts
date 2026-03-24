// --------------------------------------------------
// RAZ SYSTEM — MATCHES 2026 (AUTHORITATIVE)
// Phase 4.2 — ID-BASED + INTELLIGENCE
// --------------------------------------------------

export interface MatchTeam {
  name: string;
  country: string;
}

export interface MatchScore {
  home: number;
  away: number;
}

export interface MatchData {
  id: number;

  // 🔥 CORE CONTRACT
  competitionId: string;

  // UI support (kept intentionally)
  tournament: string;

  date: string;
  venue: string;

  home: MatchTeam;
  away: MatchTeam;

  score?: MatchScore;

  // 🔥 SYSTEM INTELLIGENCE
  state?: "upcoming" | "starting" | "live" | "final";
  importance?: number; // 0–100
}

// --------------------------------------------------
// 🔥 MATCH DATA
// --------------------------------------------------

export const matches2026: MatchData[] = [
  // ==================================================
  // 🌍 SIX NATIONS
  // ==================================================

  {
    id: 1,
    competitionId: "six-nations",
    tournament: "Six Nations 2026",
    date: "2026-02-07T14:00:00Z",
    venue: "Twickenham",
    home: { name: "England", country: "england" },
    away: { name: "France", country: "france" },
    score: { home: 24, away: 21 },
    state: "final",
    importance: 90,
  },
  {
    id: 2,
    competitionId: "six-nations",
    tournament: "Six Nations 2026",
    date: "2026-02-08T15:00:00Z",
    venue: "Aviva Stadium",
    home: { name: "Ireland", country: "ireland" },
    away: { name: "Wales", country: "wales" },
    state: "final",
    importance: 85,
  },
  {
    id: 3,
    competitionId: "six-nations",
    tournament: "Six Nations 2026",
    date: "2026-02-14T16:00:00Z",
    venue: "Murrayfield",
    home: { name: "Scotland", country: "scotland" },
    away: { name: "Italy", country: "italy" },
    state: "live",
    importance: 75,
  },

  // ==================================================
  // 🌍 INTERNATIONAL TESTS (HYBRID)
  // ==================================================

  {
    id: 10,
    competitionId: "international-tests",
    tournament: "International Tests 2026",
    date: "2026-07-10T16:00:00Z",
    venue: "Loftus Versfeld",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "New Zealand", country: "new-zealand" },
    state: "starting",
    importance: 95,
  },
  {
    id: 11,
    competitionId: "international-tests",
    tournament: "International Tests 2026",
    date: "2026-07-17T16:00:00Z",
    venue: "Ellis Park",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "New Zealand", country: "new-zealand" },
    state: "upcoming",
    importance: 92,
  },

  // ==================================================
  // 🌏 PACIFIC NATIONS CUP
  // ==================================================

  {
    id: 20,
    competitionId: "pacific-nations-cup",
    tournament: "Pacific Nations Cup 2026",
    date: "2026-08-15T10:00:00Z",
    venue: "Tokyo Stadium",
    home: { name: "Japan", country: "japan" },
    away: { name: "Fiji", country: "fiji" },
    state: "upcoming",
    importance: 80,
  },

  // ==================================================
  // 🌍 RUGBY CHAMPIONSHIP
  // ==================================================

  {
    id: 30,
    competitionId: "rugby-championship",
    tournament: "Rugby Championship 2026",
    date: "2026-09-05T15:00:00Z",
    venue: "Sydney",
    home: { name: "Australia", country: "australia" },
    away: { name: "Argentina", country: "argentina" },
    state: "upcoming",
    importance: 85,
  },

  // ==================================================
  // 🌍 WORLD CUP (EXAMPLE FIXTURE)
  // ==================================================

  {
    id: 40,
    competitionId: "world-cup",
    tournament: "World Cup 2026",
    date: "2026-10-10T18:00:00Z",
    venue: "Stade de France",
    home: { name: "France", country: "france" },
    away: { name: "New Zealand", country: "new-zealand" },
    state: "upcoming",
    importance: 100,
  },

  // ==================================================
  // 🏉 DOMESTIC — TOP 14
  // ==================================================

  {
    id: 50,
    competitionId: "top-14",
    tournament: "Top 14 2026",
    date: "2026-09-01T18:00:00Z",
    venue: "Paris",
    home: { name: "Toulouse", country: "france" },
    away: { name: "Clermont", country: "france" },
    state: "live",
    importance: 60,
  },

  // ==================================================
  // 🏉 DOMESTIC — PREMIERSHIP
  // ==================================================

  {
    id: 60,
    competitionId: "premiership",
    tournament: "Premiership Rugby 2026",
    date: "2026-09-03T18:45:00Z",
    venue: "London",
    home: { name: "Saracens", country: "england" },
    away: { name: "Leicester Tigers", country: "england" },
    state: "upcoming",
    importance: 65,
  },

  // ==================================================
  // 🏉 DOMESTIC — URC
  // ==================================================

  {
    id: 70,
    competitionId: "urc",
    tournament: "United Rugby Championship 2026",
    date: "2026-09-10T17:00:00Z",
    venue: "Cape Town",
    home: { name: "Stormers", country: "south-africa" },
    away: { name: "Leinster", country: "ireland" },
    state: "upcoming",
    importance: 75,
  },
];