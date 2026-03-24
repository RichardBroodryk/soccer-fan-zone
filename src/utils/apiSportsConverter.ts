import { MatchData } from "../data/matches2026";
import { API_TO_CONCEPT_MAP } from "../contracts/competitionIdMap";

/**
 * Convert API fixture → RAZ MatchData
 */
export function convertApiSportsFixture(fixture: any): MatchData {
  const home = fixture.teams?.home;
  const away = fixture.teams?.away;

  const homeScore = fixture.scores?.home?.total;
  const awayScore = fixture.scores?.away?.total;

  const leagueId = fixture.league?.id;

  // 🔥 MAP TO INTERNAL ID
  const competitionId =
    API_TO_CONCEPT_MAP[leagueId] ?? "unknown";

  // 🔥 STATE MAPPING
  let state: MatchData["state"] = "upcoming";

  const status = fixture.fixture?.status?.short;

  if (status === "FT") state = "final";
  else if (status === "1H" || status === "2H") state = "live";
  else if (status === "NS") state = "upcoming";

  return {
    id: fixture.fixture?.id,

    competitionId,

    tournament: fixture.league?.name ?? "Unknown",

    date: fixture.fixture?.date ?? "",
    venue: fixture.fixture?.venue?.name ?? "TBC",

    home: {
      name: home?.name ?? "Unknown",
      country: (home?.name ?? "").toLowerCase(),
    },

    away: {
      name: away?.name ?? "Unknown",
      country: (away?.name ?? "").toLowerCase(),
    },

    score:
      homeScore != null && awayScore != null
        ? { home: homeScore, away: awayScore }
        : undefined,

    state,

    // 🔥 BASELINE IMPORTANCE (can upgrade later)
    importance: 50,
  };
}

/**
 * Batch converter
 */
export function convertApiSportsFixtures(
  fixtures: any[]
): MatchData[] {
  return fixtures.map(convertApiSportsFixture);
}