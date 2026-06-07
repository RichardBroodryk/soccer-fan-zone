// src/utils/soccer/nationHelpers.ts

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import { players } from "../../data/soccer/players";

import { teams } from "../../data/soccer/teams";

import type {
  SoccerMatch,
  SoccerTeam,
} from "../../data/soccer/types";

import type {
  SoccerPlayer,
} from "../../data/soccer/players";

/* ======================================================
   TEAM LOOKUP MAP
====================================================== */

const teamLookupMap =
  new Map<
    string,
    SoccerTeam
  >();

teams.forEach((team) => {
  if (team?.id) {
    teamLookupMap.set(
      team.id.toLowerCase(),
      team
    );
  }

  if (team?.name) {
    teamLookupMap.set(
      team.name.toLowerCase(),
      team
    );
  }

  if (team?.shortName) {
    teamLookupMap.set(
      team.shortName.toLowerCase(),
      team
    );
  }

  if (team?.fifaCode) {
    teamLookupMap.set(
      team.fifaCode.toLowerCase(),
      team
    );
  }

  if (
    Array.isArray(
      team?.aliases
    )
  ) {
    team.aliases.forEach(
      (alias) => {
        if (alias) {
          teamLookupMap.set(
            alias.toLowerCase(),
            team
          );
        }
      }
    );
  }
});

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
      "Nation helpers failed to load matches:",
      error
    );

    return [];
  }
}

/* ======================================================
   RESOLVE TEAM
====================================================== */

export function resolveNation(
  nation?: string
): SoccerTeam | undefined {
  if (!nation) {
    return undefined;
  }

  return teamLookupMap.get(
    nation.toLowerCase()
  );
}

/* ======================================================
   NORMALIZE TEAM ID
====================================================== */

export function normalizeNationId(
  nation?: string
): string {
  if (!nation) {
    return "unknown-nation";
  }

  const resolved =
    resolveNation(
      nation
    );

  return (
    resolved?.id ||
    nation
  );
}

/* ======================================================
   NATION MATCHES
====================================================== */

export async function getNationMatches(
  nation: string
): Promise<
  SoccerMatch[]
> {
  const normalizedNation =
    normalizeNationId(
      nation
    );

  const matches =
    await getSafeMatches();

  return matches.filter(
    (
      match: SoccerMatch
    ) =>
      normalizeNationId(
        match.home
      ) ===
        normalizedNation ||
      normalizeNationId(
        match.away
      ) ===
        normalizedNation
  );
}

/* ======================================================
   NATION PLAYERS
====================================================== */

export function getNationPlayers(
  nation: string
): SoccerPlayer[] {
  const normalizedNation =
    normalizeNationId(
      nation
    );

  return players.filter(
    (
      player: SoccerPlayer
    ) =>
      normalizeNationId(
        player.nation
      ) ===
      normalizedNation
  );
}

/* ======================================================
   NATION RECORD
====================================================== */

export async function getNationRecord(
  nation: string
): Promise<{
  wins: number;

  draws: number;

  losses: number;
}> {
  const normalizedNation =
    normalizeNationId(
      nation
    );

  const nationMatches =
    await getNationMatches(
      normalizedNation
    );

  let wins = 0;

  let draws = 0;

  let losses = 0;

  nationMatches.forEach(
    (
      match: SoccerMatch
    ) => {
      if (
        match.homeScore ===
          undefined ||
        match.awayScore ===
          undefined
      ) {
        return;
      }

      const isHome =
        normalizeNationId(
          match.home
        ) ===
        normalizedNation;

      const nationGoals =
        isHome
          ? match.homeScore
          : match.awayScore;

      const opponentGoals =
        isHome
          ? match.awayScore
          : match.homeScore;

      if (
        nationGoals >
        opponentGoals
      ) {
        wins += 1;
      } else if (
        nationGoals <
        opponentGoals
      ) {
        losses += 1;
      } else {
        draws += 1;
      }
    }
  );

  return {
    wins,

    draws,

    losses,
  };
}