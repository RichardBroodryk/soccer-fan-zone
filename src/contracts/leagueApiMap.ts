// --------------------------------------------------
// RAZ — API LEAGUE MAP (AUTHORITATIVE)
// --------------------------------------------------

export type LeagueApiEntry = {
  id: number;
  name: string;
  category: "international" | "domestic";
  gender: "men" | "women";
};

// --------------------------------------------------
// 🔥 CORE LEAGUES (CONFIRMED FROM YOUR LIST)
// --------------------------------------------------

export const LEAGUE_API_MAP: Record<string, LeagueApiEntry> = {
  // ================= INTERNATIONAL =================

  "six-nations-men": {
    id: 1116,
    name: "Six Nations",
    category: "international",
    gender: "men",
  },

  "six-nations-women": {
    id: 1117,
    name: "Women's Six Nations",
    category: "international",
    gender: "women",
  },

  "rugby-championship": {
    id: 1118,
    name: "Rugby Championship",
    category: "international",
    gender: "men",
  },

  "world-cup": {
    id: 1120,
    name: "Rugby World Cup",
    category: "international",
    gender: "men",
  },

  // ================= DOMESTIC — MEN =================

  "urc-men": {
    id: 982,
    name: "United Rugby Championship",
    category: "domestic",
    gender: "men",
  },

  "premiership-men": {
    id: 1080,
    name: "Gallagher Premiership",
    category: "domestic",
    gender: "men",
  },

  "top14-men": {
    id: 1094,
    name: "Top 14",
    category: "domestic",
    gender: "men",
  },

  "super-rugby-men": {
    id: 1145,
    name: "Super Rugby",
    category: "domestic",
    gender: "men",
  },

  "japan-league-men": {
    id: 1138,
    name: "Japan League One",
    category: "domestic",
    gender: "men",
  },

  // ================= DOMESTIC — WOMEN =================

  "premiership-women": {
    id: 1205,
    name: "Premiership Women's Rugby",
    category: "domestic",
    gender: "women",
  },

  "super-rugby-women": {
    id: 1206,
    name: "Super Rugby Women",
    category: "domestic",
    gender: "women",
  },

  // --------------------------------------------------
};