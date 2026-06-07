// src/utils/soccer/searchEngine.ts

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import { teams } from "../../data/soccer/teams";

import {
  getAllPlayers,
} from "../../data/soccer/playerHelpers";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ======================================================
   MATCH NORMALIZER
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

async function getSafeMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const fixtures =
      await getAllWorldCupMatches();

    if (
      !Array.isArray(
        fixtures
      )
    ) {
      return [];
    }

    return fixtures.map(
      normalizeMatch
    );
  } catch (
    error
  ) {
    console.error(
      "Search engine failed to load matches:",
      error
    );

    return [];
  }
}

/* ======================================================
   SEARCH PLAYERS
====================================================== */

export function searchPlayers(
  query: string
): any[] {
  const normalized =
    (query || "")
      .toLowerCase()
      .trim();

  return getAllPlayers().filter(
    (player) =>
      player?.name
        ?.toLowerCase()
        .includes(
          normalized
        ) ||
      player?.nation
        ?.toLowerCase()
        .includes(
          normalized
        ) ||
      player?.club
        ?.toLowerCase()
        .includes(
          normalized
        )
  );
}

/* ======================================================
   SEARCH MATCHES
====================================================== */

export async function searchMatches(
  query: string
): Promise<
  SoccerMatch[]
> {
  const normalized =
    (query || "")
      .toLowerCase()
      .trim();

  const matches =
    await getSafeMatches();

  return matches.filter(
    (match) =>
      match.home
        ?.toLowerCase()
        .includes(
          normalized
        ) ||
      match.away
        ?.toLowerCase()
        .includes(
          normalized
        ) ||
      match.stadium
        ?.toLowerCase()
        .includes(
          normalized
        ) ||
      match.city
        ?.toLowerCase()
        .includes(
          normalized
        )
  );
}

/* ======================================================
   SEARCH STADIUMS
====================================================== */

export async function searchStadiums(
  query: string
): Promise<
  string[]
> {
  const normalized =
    (query || "")
      .toLowerCase()
      .trim();

  const matches =
    await getSafeMatches();

  const stadiums =
    Array.from(
      new Set(
        matches
          .map(
            (match) =>
              match.stadium
          )
          .filter(
            (
              stadium
            ): stadium is string =>
              Boolean(
                stadium
              )
          )
      )
    );

  return stadiums.filter(
    (stadium) =>
      stadium
        .toLowerCase()
        .includes(
          normalized
        )
  );
}

/* ======================================================
   SEARCH NATIONS
====================================================== */

export function searchNations(
  query: string
): string[] {
  const normalized =
    (query || "")
      .toLowerCase()
      .trim();

  return teams
    .map(
      (team) =>
        team?.name
    )
    .filter(
      (
        nation
      ): nation is string =>
        Boolean(
          nation
        )
    )
    .filter(
      (nation) =>
        nation
          .toLowerCase()
          .includes(
            normalized
          )
    );
}