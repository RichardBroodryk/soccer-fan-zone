// src/services/liveMatchService.ts

import {
  fetchLiveFixtures,
  fetchWorldCupFixtures,
} from "./apiFootball";

import {
  convertApiSportsFixtures,
} from "../utils/apiSportsConverter";

import type {
  SoccerMatch,
} from "../data/soccer/types";

/* ======================================================
   NORMALIZER
====================================================== */

function normalizeMatches(
  matches: Partial<SoccerMatch>[] | undefined
): SoccerMatch[] {
  if (
    !Array.isArray(matches)
  ) {
    return [];
  }

  return matches.map(
    (
      match: Partial<SoccerMatch>
    ) => ({
      id:
        match.id ||
        `match-${Math.random()
          .toString(36)
          .slice(2)}`,

      home:
        match.home ||
        "Home Team",

      away:
        match.away ||
        "Away Team",

      stage:
        match.stage ||
        "Tournament Match",

      group:
        match.group ||
        "World Cup",

      stadium:
        match.stadium ||
        "World Cup Stadium",

      stadiumId:
        match.stadiumId ||
        "unknown-stadium",

      city:
        match.city ||
        "Host City",

      status:
        match.status ===
          "live" ||
        match.status ===
          "upcoming" ||
        match.status ===
          "final"
          ? match.status
          : "upcoming",

      minute:
        match.minute ?? 0,

      homeScore:
        match.homeScore ?? 0,

      awayScore:
        match.awayScore ?? 0,

      date:
        match.date ||
        "World Cup 2026",
    } as SoccerMatch)
  );
}

/* ======================================================
   LIVE MATCHES
====================================================== */

export async function getLiveWorldCupMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const fixtures =
      await fetchLiveFixtures();

    const converted =
      convertApiSportsFixtures(
        fixtures
      );

    const normalized =
      normalizeMatches(
        converted
      );

    return normalized.filter(
      (match) =>
        match.status ===
        "live"
    );
  } catch (
    error
  ) {
    console.error(
      "getLiveWorldCupMatches failed:",
      error
    );

    return [];
  }
}

/* ======================================================
   ALL WORLD CUP MATCHES
====================================================== */

export async function getAllWorldCupMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const fixtures =
      await fetchWorldCupFixtures();

    const converted =
      convertApiSportsFixtures(
        fixtures
      );

    return normalizeMatches(
      converted
    );
  } catch (
    error
  ) {
    console.error(
      "getAllWorldCupMatches failed:",
      error
    );

    return [];
  }
}

/* ======================================================
   UPCOMING MATCHES
====================================================== */

export async function getUpcomingWorldCupMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getAllWorldCupMatches();

    return matches.filter(
      (match) =>
        match.status ===
        "upcoming"
    );
  } catch (
    error
  ) {
    console.error(
      "getUpcomingWorldCupMatches failed:",
      error
    );

    return [];
  }
}

/* ======================================================
   COMPLETED MATCHES
====================================================== */

export async function getCompletedWorldCupMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getAllWorldCupMatches();

    return matches.filter(
      (match) =>
        match.status ===
        "final"
    );
  } catch (
    error
  ) {
    console.error(
      "getCompletedWorldCupMatches failed:",
      error
    );

    return [];
  }
}