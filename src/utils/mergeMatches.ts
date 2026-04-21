import type { MatchData } from "../data/matches/types";

/* ==================================================
   FINAL MERGE — AUTHORITATIVE + SAFE
   ================================================== */

export function mergeMatches(
  apiMatches: MatchData[],
  localMatches: MatchData[]
): MatchData[] {
  return localMatches.map((localMatch) => {
    /* ==================================================
       FIND MATCH (STRICT → FALLBACK)
       ================================================== */

    let apiMatch = apiMatches.find(
      (m) => m.matchKey === localMatch.matchKey
    );

    if (!apiMatch) {
      apiMatch = apiMatches.find(
        (m) =>
          m.competitionId === localMatch.competitionId &&
          m.home.name === localMatch.home.name &&
          m.away.name === localMatch.away.name
      );
    }

    /* ==================================================
       DATE / VENUE (LOCAL AUTHORITY)
       ================================================== */

    const resolvedDate = localMatch.date;
    const resolvedVenue = localMatch.venue;

    /* ==================================================
       SCORE (API ONLY IF VALID FINAL)
       ================================================== */

    let resolvedScore = localMatch.score;

    if (
      apiMatch?.state === "final" &&
      apiMatch.score &&
      apiMatch.score.home !== null &&
      apiMatch.score.away !== null
    ) {
      resolvedScore = apiMatch.score;
    }

    /* ==================================================
       STATE
       ================================================== */

    const resolvedState =
      apiMatch?.state || localMatch.state || "upcoming";

    /* ==================================================
       RETURN CLEAN MATCH
       ================================================== */

    return {
      ...localMatch,

      date: resolvedDate,
      venue: resolvedVenue,

      score: resolvedScore,
      state: resolvedState,

      // keep structure stable
      round: localMatch.round,
      stage: localMatch.stage,
      pool: localMatch.pool,
    };
  });
}