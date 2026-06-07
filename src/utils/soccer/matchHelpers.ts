// src/utils/soccer/matchHelpers.ts

import {
  getAllWorldCupMatches,
  getLiveWorldCupMatches,
  getUpcomingWorldCupMatches,
  getCompletedWorldCupMatches,
} from "../../services/liveMatchService";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ======================================================
   NORMALIZER
====================================================== */

function normalizeMatch(
  match: Partial<SoccerMatch>
): SoccerMatch {
  return {
    id:
      match.id ||
      "unknown-match",

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
      match.status ||
      "upcoming",

    minute:
      match.minute ?? 0,

    homeScore:
      match.homeScore ?? 0,

    awayScore:
      match.awayScore ?? 0,

    date:
      match.date ||
      "World Cup 2026",
  } as SoccerMatch;
}

function normalizeMatches(
  matches: Partial<SoccerMatch>[] | undefined
): SoccerMatch[] {
  if (
    !Array.isArray(matches)
  ) {
    return [];
  }

  return matches.map(
    normalizeMatch
  );
}

/* ======================================================
   MATCH HELPERS
====================================================== */

export async function getMatchById(
  id?: string
): Promise<
  SoccerMatch | undefined
> {
  if (!id) {
    return undefined;
  }

  try {
    const matches =
      await getAllWorldCupMatches();

    const safeMatches =
      normalizeMatches(
        matches
      );

    return safeMatches.find(
      (match) =>
        match.id === id
    );
  } catch (
    error
  ) {
    console.error(
      "getMatchById failed:",
      error
    );

    return undefined;
  }
}

export async function getLiveMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getLiveWorldCupMatches();

    return normalizeMatches(
      matches
    );
  } catch (
    error
  ) {
    console.error(
      "getLiveMatches failed:",
      error
    );

    return [];
  }
}

export async function getUpcomingMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getUpcomingWorldCupMatches();

    return normalizeMatches(
      matches
    );
  } catch (
    error
  ) {
    console.error(
      "getUpcomingMatches failed:",
      error
    );

    return [];
  }
}

export async function getFinishedMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getCompletedWorldCupMatches();

    return normalizeMatches(
      matches
    );
  } catch (
    error
  ) {
    console.error(
      "getFinishedMatches failed:",
      error
    );

    return [];
  }
}

export async function getMatchesByGroup(
  group: string
): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getAllWorldCupMatches();

    const safeMatches =
      normalizeMatches(
        matches
      );

    return safeMatches.filter(
      (match) =>
        (match.group ||
          "")
          .toLowerCase()
          .trim() ===
        (group || "")
          .toLowerCase()
          .trim()
    );
  } catch (
    error
  ) {
    console.error(
      "getMatchesByGroup failed:",
      error
    );

    return [];
  }
}

export async function getMatchesByStage(
  stage: string
): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getAllWorldCupMatches();

    const safeMatches =
      normalizeMatches(
        matches
      );

    return safeMatches.filter(
      (match) =>
        (match.stage ||
          "")
          .toLowerCase()
          .trim() ===
        (stage || "")
          .toLowerCase()
          .trim()
    );
  } catch (
    error
  ) {
    console.error(
      "getMatchesByStage failed:",
      error
    );

    return [];
  }
}

/* ======================================================
   EXTRA HELPERS
====================================================== */

export async function getMatchesByTeam(
  teamName: string
): Promise<
  SoccerMatch[]
> {
  try {
    const matches =
      await getAllWorldCupMatches();

    const safeMatches =
      normalizeMatches(
        matches
      );

    return safeMatches.filter(
      (match) =>
        (match.home ||
          "")
          .toLowerCase()
          .trim() ===
          (teamName ||
            "")
            .toLowerCase()
            .trim() ||
        (match.away ||
          "")
          .toLowerCase()
          .trim() ===
          (teamName ||
            "")
            .toLowerCase()
            .trim()
    );
  } catch (
    error
  ) {
    console.error(
      "getMatchesByTeam failed:",
      error
    );

    return [];
  }
}

export async function getLiveMatchCount(): Promise<number> {
  try {
    const matches =
      await getLiveMatches();

    return matches.length;
  } catch (
    error
  ) {
    console.error(
      "getLiveMatchCount failed:",
      error
    );

    return 0;
  }
}

export async function getUpcomingMatchCount(): Promise<number> {
  try {
    const matches =
      await getUpcomingMatches();

    return matches.length;
  } catch (
    error
  ) {
    console.error(
      "getUpcomingMatchCount failed:",
      error
    );

    return 0;
  }
}

export async function getFinishedMatchCount(): Promise<number> {
  try {
    const matches =
      await getFinishedMatches();

    return matches.length;
  } catch (
    error
  ) {
    console.error(
      "getFinishedMatchCount failed:",
      error
    );

    return 0;
  }
}