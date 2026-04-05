// --------------------------------------------------
// RAZ SYSTEM — MATCHES INDEX (MASTER MERGE)
// --------------------------------------------------

/* ✅ IMPORT DATA */
import { matches2026Men } from "./matches2026Men";
import { matches2026Women } from "./matches2026Women";

/* ✅ IMPORT TYPE FROM ONE SOURCE ONLY */
import type { MatchData } from "./matches2026Men";

/* ==================================================
   MASTER DATASET
   ================================================== */

export const matches2026: MatchData[] = [
  ...matches2026Men,
  ...matches2026Women,
];

/* ==================================================
   OPTIONAL HELPERS (SAFE — FUTURE USE)
   ================================================== */

export const getMensMatches = (): MatchData[] => matches2026Men;

export const getWomensMatches = (): MatchData[] => matches2026Women;

export const getAllMatches = (): MatchData[] => matches2026;