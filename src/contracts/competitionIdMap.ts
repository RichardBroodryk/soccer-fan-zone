// --------------------------------------------------
// RAZ SYSTEM — API → INTERNAL COMPETITION MAP
// Phase 4.3.2 — COMPLETE & LOCKED
// --------------------------------------------------

/**
 * 🔒 RULE:
 * Only leagues defined here are allowed into the system
 *
 * Unknown league → REJECTED by adapter
 */

export const API_TO_CONCEPT_MAP: Record<number, string> = {
  // ==================================================
  // 🌍 MEN — INTERNATIONAL (TIER 1)
  // ==================================================

  51: "six-nations",
  85: "rugby-championship",
  69: "world-cup",
  93: "autumn-nations",

  // 🔥 HYBRID TEST SYSTEM
  84: "international-tests",

  // ==================================================
  // 🌍 WOMEN — INTERNATIONAL
  // ==================================================

  55: "six-nations-women",
  70: "world-cup-women",
  97: "womens-internationals",

  // ==================================================
  // 🌏 INTERNATIONAL — TIER 2 / REGIONAL
  // ==================================================

  90: "pacific-nations-cup",

  // ==================================================
  // 🏉 DOMESTIC — MEN (TOP)
  // ==================================================

  76: "urc",
  16: "top-14",
  13: "premiership",
  71: "super-rugby",
  17: "pro-d2",

  // 🌍 EUROPEAN CLUB
  54: "champions-cup",

  // ==================================================
  // 🏉 DOMESTIC — WOMEN
  // ==================================================

  91: "super-rugby-women",
  136: "aupiki",

  // ==================================================
  // ⚡ SEVENS — CONTROLLED ENTRY
  // ==================================================

  86: "sevens-world-cup",
  87: "sevens-world-cup",

  // ⚠️ NOTE:
  // SVNS Series uses multiple IDs → handled later
};