// --------------------------------------------------
// Standardized match format for 2026 (AUTHORITATIVE)
// --------------------------------------------------

export interface MatchData {
  id: number;
  tournament: string;
  date: string;
  venue: string;

  home: {
    name: string;
    country: string;
  };

  away: {
    name: string;
    country: string;
  };

  // Present only once match is complete
  score?: {
    home: number;
    away: number;
  };
}

// --------------------------------------------------
// 2026 MATCHES — CANONICAL DATASET (COMPLETED WHERE VALID)
// --------------------------------------------------

export const matches2026: MatchData[] = [
  // ==================================================
  // SIX NATIONS 2026 — MEN (COMPLETED SIMULATION)
  // ==================================================

  // ROUND 1
  {
    id: 101,
    tournament: "Six Nations 2026",
    date: "2026-02-05",
    venue: "Stade de France",
    home: { name: "France", country: "france" },
    away: { name: "Ireland", country: "ireland" },
    score: { home: 24, away: 21 },
  },
  {
    id: 102,
    tournament: "Six Nations 2026",
    date: "2026-02-07",
    venue: "Stadio Olimpico",
    home: { name: "Italy", country: "italy" },
    away: { name: "Scotland", country: "scotland" },
    score: { home: 17, away: 27 },
  },
  {
    id: 103,
    tournament: "Six Nations 2026",
    date: "2026-02-07",
    venue: "Twickenham",
    home: { name: "England", country: "england" },
    away: { name: "Wales", country: "wales" },
    score: { home: 31, away: 19 },
  },

  // ROUND 2
  {
    id: 104,
    tournament: "Six Nations 2026",
    date: "2026-02-14",
    venue: "Aviva Stadium",
    home: { name: "Ireland", country: "ireland" },
    away: { name: "Italy", country: "italy" },
    score: { home: 38, away: 14 },
  },
  {
    id: 105,
    tournament: "Six Nations 2026",
    date: "2026-02-14",
    venue: "Murrayfield",
    home: { name: "Scotland", country: "scotland" },
    away: { name: "England", country: "england" },
    score: { home: 22, away: 20 },
  },
  {
    id: 106,
    tournament: "Six Nations 2026",
    date: "2026-02-15",
    venue: "Principality Stadium",
    home: { name: "Wales", country: "wales" },
    away: { name: "France", country: "france" },
    score: { home: 18, away: 26 },
  },

  // ROUND 3
  {
    id: 107,
    tournament: "Six Nations 2026",
    date: "2026-02-21",
    venue: "Twickenham",
    home: { name: "England", country: "england" },
    away: { name: "Ireland", country: "ireland" },
    score: { home: 27, away: 30 },
  },
  {
    id: 108,
    tournament: "Six Nations 2026",
    date: "2026-02-21",
    venue: "Principality Stadium",
    home: { name: "Wales", country: "wales" },
    away: { name: "Scotland", country: "scotland" },
    score: { home: 20, away: 23 },
  },
  {
    id: 109,
    tournament: "Six Nations 2026",
    date: "2026-02-22",
    venue: "Stade de France",
    home: { name: "France", country: "france" },
    away: { name: "Italy", country: "italy" },
    score: { home: 42, away: 16 },
  },

  // ROUND 4
  {
    id: 110,
    tournament: "Six Nations 2026",
    date: "2026-03-06",
    venue: "Aviva Stadium",
    home: { name: "Ireland", country: "ireland" },
    away: { name: "Wales", country: "wales" },
    score: { home: 35, away: 17 },
  },
  {
    id: 111,
    tournament: "Six Nations 2026",
    date: "2026-03-07",
    venue: "Murrayfield",
    home: { name: "Scotland", country: "scotland" },
    away: { name: "France", country: "france" },
    score: { home: 19, away: 28 },
  },
  {
    id: 112,
    tournament: "Six Nations 2026",
    date: "2026-03-07",
    venue: "Stadio Olimpico",
    home: { name: "Italy", country: "italy" },
    away: { name: "England", country: "england" },
    score: { home: 15, away: 34 },
  },

  // ROUND 5
  {
    id: 113,
    tournament: "Six Nations 2026",
    date: "2026-03-14",
    venue: "Aviva Stadium",
    home: { name: "Ireland", country: "ireland" },
    away: { name: "Scotland", country: "scotland" },
    score: { home: 29, away: 22 },
  },
  {
    id: 114,
    tournament: "Six Nations 2026",
    date: "2026-03-14",
    venue: "Principality Stadium",
    home: { name: "Wales", country: "wales" },
    away: { name: "Italy", country: "italy" },
    score: { home: 26, away: 18 },
  },
  {
    id: 115,
    tournament: "Six Nations 2026",
    date: "2026-03-14",
    venue: "Stade de France",
    home: { name: "France", country: "france" },
    away: { name: "England", country: "england" },
    score: { home: 33, away: 27 },
  },

  // ==================================================
  // RUGBY CHAMPIONSHIP / TOURS — FUTURE (NO SCORES)
  // ==================================================

  {
    id: 201,
    tournament: "Rugby Championship 2026",
    date: "2026-08-10",
    venue: "Eden Park",
    home: { name: "New Zealand", country: "new-zealand" },
    away: { name: "South Africa", country: "south-africa" },
  },
  {
    id: 301,
    tournament: "Men's SA vs NZ Rival Tour 2026",
    date: "2026-09-12",
    venue: "Ellis Park",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "New Zealand", country: "new-zealand" },
  },
  {
    id: 401,
    tournament: "Women's SA vs NZ Rival Tour 2026",
    date: "2026-09-05",
    venue: "FNB Stadium",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "New Zealand", country: "new-zealand" },
  },
];
