import type {
  SoccerMatch,
} from "../data/soccer/types";

import {
  API_TO_CONCEPT_MAP,
} from "../contracts/competitionIdMap";

/* ==================================================
   NORMALIZERS
   ================================================== */

function normalizeKey(
  value?: string
): string {
  if (!value) {
    return "unknown";
  }

  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

function normalizeDate(
  date?: string
): string {
  if (!date) {
    return "";
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "";
  }

  return d
    .toISOString()
    .split("T")[0];
}

function normalizeCountry(
  name?: string
): string {
  if (!name) {
    return "unknown";
  }

  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/'/g, "")
    .trim();
}

/* ==================================================
   API → SOCCER MATCH
   ================================================== */

export function convertApiSportsFixture(
  fixture: any
): SoccerMatch | null {
  const homeTeam =
    fixture.teams?.home;

  const awayTeam =
    fixture.teams?.away;

  const homeGoals =
    fixture.goals?.home ??
    undefined;

  const awayGoals =
    fixture.goals?.away ??
    undefined;

  const leagueId =
    fixture.league?.id;

  const tournamentId =
    API_TO_CONCEPT_MAP[
      leagueId
    ];

  if (!tournamentId) {
    return null;
  }

  let status:
    | "upcoming"
    | "live"
    | "final" =
    "upcoming";

  const apiStatus =
    fixture.fixture?.status
      ?.short;

  if (
    [
      "FT",
      "AET",
      "PEN",
    ].includes(apiStatus)
  ) {
    status = "final";
  } else if (
    [
      "1H",
      "2H",
      "HT",
      "ET",
      "LIVE",
    ].includes(apiStatus)
  ) {
    status = "live";
  }

  const venueName =
    fixture.fixture?.venue
      ?.name || "";

  const venueCity =
    fixture.fixture?.venue
      ?.city || "";

  const normalizedDate =
    normalizeDate(
      fixture.fixture?.date
    ) || "unknown";

    console.log(
  "API ROUND:",
  fixture.league?.round
);

  return {
    id: String(
      fixture.fixture?.id
    ),

    tournamentId,

    home:
      homeTeam?.name ??
      "Unknown",

    away:
      awayTeam?.name ??
      "Unknown",

    homeScore:
      homeGoals,

    awayScore:
      awayGoals,

    date:
      fixture.fixture?.date ??
      "",

    stadium: venueName,

    stadiumId:
      normalizeKey(
        venueName
      ),

    city: venueCity,

    country:
      fixture.league?.country ??
      "",

    status,

    stage:
      fixture.league?.round ??
      "",

    round:
      fixture.league?.round ??
      "",

    venue: venueName,

    importance: 100,

    matchKey: [
      tournamentId,
      normalizedDate,
      normalizeCountry(
        homeTeam?.name
      ),
      normalizeCountry(
        awayTeam?.name
      ),
    ].join("_"),
  };
}

/* ==================================================
   BATCH CONVERTER
   ================================================== */

export function convertApiSportsFixtures(
  fixtures: any[]
): SoccerMatch[] {
  return fixtures
    .map(
      convertApiSportsFixture
    )
    .filter(
      (
        match
      ): match is SoccerMatch =>
        match !== null
    );
}