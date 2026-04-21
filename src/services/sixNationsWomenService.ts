import type { MatchData } from "../data/matches/types";

import {
  fetchFixturesByLeague,
  SIX_NATIONS_WOMEN_LEAGUE,
} from "./apiSportsRugby";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";
import { mergeMatches } from "../utils/mergeMatches";

import { matches2026Women } from "../data/matches/matches2026Women";

/* ==================================================
   SIX NATIONS WOMEN SERVICE — FIXED + ROBUST
   ================================================== */

export async function fetchSixNationsWomenMatches(): Promise<MatchData[]> {
  try {
    const rawFixtures = await fetchFixturesByLeague(
      SIX_NATIONS_WOMEN_LEAGUE,
      2026
    );

    if (!rawFixtures || rawFixtures.length === 0) {
      console.warn("⚠️ No API data — using local dataset");
      return matches2026Women.map((m) => ({ ...m, gender: "women" as const }));
    }

    const apiMatches = convertApiSportsFixtures(rawFixtures).filter(
      (m) => m.competitionId === "six-nations-women"
    );

    const localMatches = matches2026Women.filter(
      (m) => m.competitionId === "six-nations-women"
    );

    const merged = mergeMatches(apiMatches, localMatches);

    return merged.map((match) => ({
      ...match,
      gender: "women" as const,
    }));
  } catch (err) {
    console.error("❌ Six Nations Women fetch failed", err);

    return matches2026Women.map((m) => ({ ...m, gender: "women" as const }));
  }
}