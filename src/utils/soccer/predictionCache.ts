// src/utils/soccer/predictionCache.ts

import type {
  TeamPowerRanking,
  FinalPrediction,
} from "./predictionEngine";

import {
  getPowerRankings,
} from "./predictionEngine";

/* ======================================================
   CACHE
====================================================== */

let rankingsCache:
  | TeamPowerRanking[]
  | null = null;

let rankingsPromise:
  | Promise<TeamPowerRanking[]>
  | null = null;

/* ======================================================
   POWER RANKINGS CACHE
====================================================== */

export async function getCachedPowerRankings(): Promise<
  TeamPowerRanking[]
> {
  if (rankingsCache) {
    return rankingsCache;
  }

  if (rankingsPromise) {
    return rankingsPromise;
  }

  rankingsPromise =
    getPowerRankings();

  rankingsCache =
    await rankingsPromise;

  rankingsPromise =
    null;

  return rankingsCache;
}

/* ======================================================
   FAVORITE
====================================================== */

export async function getCachedTournamentFavorite(): Promise<
  TeamPowerRanking | undefined
> {
  const rankings =
    await getCachedPowerRankings();

  return rankings[0];
}

/* ======================================================
   DARK HORSES
====================================================== */

export async function getCachedDarkHorseTeams(): Promise<
  TeamPowerRanking[]
> {
  const rankings =
    await getCachedPowerRankings();

  return rankings.filter(
    (team) =>
      team.rating >= 78 &&
      team.rating <= 88
  );
}

/* ======================================================
   PROJECTED FINAL
====================================================== */

export async function getCachedMostLikelyFinal(): Promise<FinalPrediction> {
  const rankings =
    await getCachedPowerRankings();

  const home =
    rankings[0];

  const away =
    rankings[1];

  return {
    home:
      home?.team ||
      "TBD",

    away:
      away?.team ||
      "TBD",

    confidence:
      Math.round(
        (
          (home?.rating || 0) +
          (away?.rating || 0)
        ) / 2
      ),
  };
}

/* ======================================================
   RESET CACHE
====================================================== */

export function clearPredictionCache(): void {
  rankingsCache = null;

  rankingsPromise = null;
}