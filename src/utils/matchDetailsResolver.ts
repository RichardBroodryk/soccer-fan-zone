import { matchDetails2026 } from "../data/matchDetails2026";
import type { MatchData } from "../data/matches/types";
import type { MatchDetails } from "../data/matchDetails2026";

/* ==================================================
   RESOLVER — MATCHKEY BASED (FINAL)
   ================================================== */

export function getMatchDetails(
  match: MatchData
): MatchDetails | undefined {
  if (!match.matchKey) return undefined;

  return matchDetails2026.find(
    (d) => d.matchKey === match.matchKey
  );
}