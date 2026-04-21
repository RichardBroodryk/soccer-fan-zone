import type { MatchData } from "../data/matches/types";
import { API_TO_CONCEPT_MAP } from "../contracts/competitionIdMap";

/* ==================================================
   NORMALIZERS
   ================================================== */

function normalizeKey(value?: string): string {
  if (!value) return "unknown";

  return value
    .toLowerCase()
    .replace(/\b(women|w|7s|sevens)\b/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

function normalizeDate(date?: string): string {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toISOString().split("T")[0];
}

function normalizeCountry(name?: string): string {
  if (!name) return "unknown";

  return name
    .toLowerCase()
    .replace(/\b(7s|sevens|women|w)\b/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/'/g, "")
    .trim();
}

/* ==================================================
   CONVERTER
   ================================================== */

export function convertApiSportsFixture(
  fixture: any
): MatchData | null {
  const home = fixture.teams?.home;
  const away = fixture.teams?.away;

  const homeScore =
    fixture.scores?.home?.total ??
    fixture.scores?.home ??
    null;

  const awayScore =
    fixture.scores?.away?.total ??
    fixture.scores?.away ??
    null;

  const leagueId = fixture.league?.id;

  const competitionId = API_TO_CONCEPT_MAP[leagueId];
  if (!competitionId) return null;

  let state: MatchData["state"] = "upcoming";

  const status = fixture.fixture?.status?.short;

  if (status === "FT") state = "final";
  else if (status === "1H" || status === "2H") state = "live";
  else if (status === "NS") state = "upcoming";

  const normalizedDate =
    normalizeDate(fixture.fixture?.date) || "unknown";

  return {
    id: Number(fixture.fixture?.id) || Date.now() + Math.random(),

    matchKey: [
      competitionId,
      normalizedDate,
      normalizeKey(home?.name),
      normalizeKey(away?.name),
    ].join("_"),

    competitionId,

    tournament: fixture.league?.name ?? "Unknown",

    stage:
      fixture.fixture?.stage ||
      fixture.fixture?.round ||
      fixture.league?.round ||
      "",

    date: fixture.fixture?.date ?? "",
    venue: fixture.fixture?.venue?.name || "",

    home: {
      name: home?.name ?? "Unknown",
      country: normalizeCountry(home?.name),
    },

    away: {
      name: away?.name ?? "Unknown",
      country: normalizeCountry(away?.name),
    },

    score:
      homeScore != null && awayScore != null
        ? { home: homeScore, away: awayScore }
        : undefined,

    state,

    importance: 50,
  };
}

/* ==================================================
   BATCH
   ================================================== */

export function convertApiSportsFixtures(
  fixtures: any[]
): MatchData[] {
  return fixtures
    .map(convertApiSportsFixture)
    .filter((m): m is MatchData => m !== null);
}