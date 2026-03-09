import { MatchData } from "../data/matches2026";

export function convertApiSportsFixture(fixture: any): MatchData {
  const home = fixture.teams?.home;
  const away = fixture.teams?.away;

  const homeScore = fixture.scores?.home?.total;
  const awayScore = fixture.scores?.away?.total;

  return {
    id: fixture.fixture?.id,

    tournament:
      fixture.league?.name ?? "Six Nations",

    date:
      fixture.fixture?.date ?? "",

    venue:
      fixture.fixture?.venue?.name ?? "TBC",

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
        ? {
            home: homeScore,
            away: awayScore,
          }
        : undefined,
  };
}

export function convertApiSportsFixtures(fixtures: any[]): MatchData[] {
  return fixtures.map(convertApiSportsFixture);
}