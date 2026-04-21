// --------------------------------------------------
// RAZ SYSTEM — MATCHES INDEX (MASTER MERGE)
// --------------------------------------------------

/* ✅ IMPORT TYPE FROM SINGLE SOURCE */
import type { MatchData } from "./types";

/* ✅ IMPORT DATASETS */
import { matches2026Men } from "./matches2026Men";
import { matches2026Women } from "./matches2026Women";
import { svnsMatches2026 } from "./matches2026Svns";

function normalizeKey(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(women|w|7s|sevens)\b/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function normalizeDate(date?: string): string {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toISOString().split("T")[0];
}

function buildMatchKey(match: MatchData): string {
  return [
    match.competitionId,
    normalizeDate(match.date), // 🔥 CRITICAL FIX
    normalizeKey(match.home.name),
    normalizeKey(match.away.name),
  ].join("_");
}
/* ==================================================
   HELPERS
   ================================================== */

const sortByDate = (a: MatchData, b: MatchData) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();

const isValidMatch = (match: MatchData): boolean => {
  if (!match.id || !match.home || !match.away) {
    console.warn("⚠️ Invalid match detected", match);
    return false;
  }
  return true;
};

/* ==================================================
   MASTER DATASET (SAFE + SORTED)
   ================================================== */

export const matches2026: MatchData[] = [
  ...matches2026Men,
  ...matches2026Women,
  ...svnsMatches2026,
]
  .map((m) => ({
    ...m,
    matchKey: buildMatchKey(m),
  }))
  .filter(isValidMatch)
  .sort(sortByDate);

/* ==================================================
   HELPERS (SAFE — FUTURE USE)
   ================================================== */

export const getMensMatches = (): MatchData[] =>
  matches2026Men.slice().sort(sortByDate);

export const getWomensMatches = (): MatchData[] =>
  matches2026Women.slice().sort(sortByDate);

export const getAllMatches = (): MatchData[] => matches2026;