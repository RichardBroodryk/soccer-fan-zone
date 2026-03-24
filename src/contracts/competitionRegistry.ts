// --------------------------------------------------
// RAZ SYSTEM — MASTER COMPETITION REGISTRY
// Phase 4.3.1 — COMPLETE GLOBAL RUGBY MAP
// --------------------------------------------------

export type CompetitionCategory =
  | "international"
  | "domestic"
  | "sevens";

export type CompetitionTier =
  | "tier1"
  | "tier2"
  | "development";

export interface Competition {
  conceptId: string;
  name: string;

  category: CompetitionCategory;
  gender: "men" | "women" | "mixed";

  tier?: CompetitionTier;

  region?: string;
}

// --------------------------------------------------
// 🌍 MASTER REGISTRY
// --------------------------------------------------

export const COMPETITIONS: Competition[] = [
  // ==================================================
  // 🌍 MEN — INTERNATIONAL (TIER 1)
  // ==================================================

  {
    conceptId: "six-nations",
    name: "Six Nations",
    category: "international",
    gender: "men",
    tier: "tier1",
  },
  {
    conceptId: "rugby-championship",
    name: "Rugby Championship",
    category: "international",
    gender: "men",
    tier: "tier1",
  },
  {
    conceptId: "world-cup",
    name: "Rugby World Cup",
    category: "international",
    gender: "men",
    tier: "tier1",
  },
  {
    conceptId: "autumn-nations",
    name: "Autumn Nations Series",
    category: "international",
    gender: "men",
    tier: "tier1",
  },
  {
    conceptId: "summer-internationals",
    name: "Summer Internationals",
    category: "international",
    gender: "men",
    tier: "tier1",
  },

  // 🔥 YOUR SYSTEM CORE
  {
    conceptId: "international-tests",
    name: "International Tests",
    category: "international",
    gender: "men",
    tier: "tier1",
  },
  {
    conceptId: "greatest-rivalry",
    name: "SA vs NZ Rivalry",
    category: "international",
    gender: "men",
    tier: "tier1",
  },

  // ==================================================
  // 🌍 WOMEN — INTERNATIONAL
  // ==================================================

  {
    conceptId: "six-nations-women",
    name: "Women's Six Nations",
    category: "international",
    gender: "women",
    tier: "tier1",
  },
  {
    conceptId: "world-cup-women",
    name: "Women's Rugby World Cup",
    category: "international",
    gender: "women",
    tier: "tier1",
  },
  {
    conceptId: "womens-internationals",
    name: "Women's International Tests",
    category: "international",
    gender: "women",
    tier: "tier1",
  },

  // ==================================================
  // 🏉 DOMESTIC — MEN (TOP 7 CORE)
  // ==================================================

  {
    conceptId: "urc",
    name: "United Rugby Championship",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "global",
  },
  {
    conceptId: "top-14",
    name: "Top 14",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "france",
  },
  {
    conceptId: "premiership",
    name: "Premiership Rugby",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "england",
  },
  {
    conceptId: "super-rugby",
    name: "Super Rugby",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "sanzaar",
  },
  {
    conceptId: "pro-d2",
    name: "Pro D2",
    category: "domestic",
    gender: "men",
    tier: "tier2",
    region: "france",
  },
  {
    conceptId: "japan-league-one",
    name: "Japan League One",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "japan",
  },
  {
    conceptId: "mlr",
    name: "Major League Rugby",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "usa",
  },

  // ==================================================
  // 🏉 DOMESTIC — WOMEN
  // ==================================================

  {
    conceptId: "premier-15s",
    name: "Premier 15s",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "england",
  },
  {
    conceptId: "super-rugby-women",
    name: "Super Rugby Women",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "sanzaar",
  },
  {
    conceptId: "aupiki",
    name: "Super Rugby Aupiki",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "new-zealand",
  },
  {
    conceptId: "elite-1-women",
    name: "Elite 1 Women",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "france",
  },

  // ==================================================
  // 🌍 EUROPEAN CLUB (CRITICAL MISSING — NOW FIXED)
  // ==================================================

  {
    conceptId: "champions-cup",
    name: "Investec Champions Cup",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "europe",
  },
  {
    conceptId: "challenge-cup",
    name: "EPCR Challenge Cup",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "europe",
  },

  // ==================================================
  // 🌏 PACIFIC / REGIONAL
  // ==================================================

  {
    conceptId: "pacific-nations-cup",
    name: "Pacific Nations Cup",
    category: "international",
    gender: "men",
    tier: "tier2",
  },

  // ==================================================
  // ⚡ SEVENS — GLOBAL SYSTEM
  // ==================================================

  {
    conceptId: "svns-series",
    name: "SVNS Series",
    category: "sevens",
    gender: "mixed",
  },
  {
    conceptId: "sevens-world-cup",
    name: "Sevens World Cup",
    category: "sevens",
    gender: "mixed",
  },
  {
    conceptId: "olymics-sevens",
    name: "Olympic Sevens",
    category: "sevens",
    gender: "mixed",
  },
];