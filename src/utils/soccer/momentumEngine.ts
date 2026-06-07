// src/utils/soccer/momentumEngine.ts

import {
  getCompletedWorldCupMatches,
} from "../../services/liveMatchService";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ======================================================
   TYPES
====================================================== */

export interface TeamMomentum {
  nation: string;

  matchesPlayed: number;

  wins: number;

  draws: number;

  losses: number;

  goalsFor: number;

  goalsAgainst: number;

  cleanSheets: number;

  recentForm: string[];

  unbeatenStreak: number;

  momentumScore: number;

  attackRating: number;

  defenseRating: number;

  overallRating: number;

  trend:
    | "HOT"
    | "RISING"
    | "STABLE"
    | "FALLING";
}

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
  matchList:
    | Partial<SoccerMatch>[]
    | undefined
): SoccerMatch[] {
  if (
    !Array.isArray(
      matchList
    )
  ) {
    return [];
  }

  return matchList.map(
    normalizeMatch
  );
}

/* ======================================================
   HELPERS
====================================================== */

async function getCompletedMatches(): Promise<
  SoccerMatch[]
> {
  console.time(
    "Momentum:getCompletedMatches"
  );

  try {
    const fixtures =
      await getCompletedWorldCupMatches();

    return normalizeMatches(
      fixtures
    ).filter(
      (match) =>
        match.status ===
        "final"
    );
  } catch (
    error
  ) {
    console.error(
      "Momentum engine completed matches failed:",
      error
    );

    return [];
  } finally {
    console.timeEnd(
      "Momentum:getCompletedMatches"
    );
  }
}

async function getNationMatches(
  nation: string,
  completedMatches?: SoccerMatch[]
): Promise<
  SoccerMatch[]
> {
  const matchesToUse =
    completedMatches ??
    (await getCompletedMatches());

  return matchesToUse.filter(
    (match) =>
      match.home === nation ||
      match.away === nation
  );
}

function getGoalsFor(
  nation: string,
  match: SoccerMatch
): number {
  return match.home === nation
    ? match.homeScore ?? 0
    : match.awayScore ?? 0;
}

function getGoalsAgainst(
  nation: string,
  match: SoccerMatch
): number {
  return match.home === nation
    ? match.awayScore ?? 0
    : match.homeScore ?? 0;
}

function getResult(
  nation: string,
  match: SoccerMatch
): "W" | "D" | "L" {
  const gf =
    getGoalsFor(
      nation,
      match
    );

  const ga =
    getGoalsAgainst(
      nation,
      match
    );

  if (gf > ga) {
    return "W";
  }

  if (gf < ga) {
    return "L";
  }

  return "D";
}

/* ======================================================
   UNBEATEN STREAK
====================================================== */

function calculateUnbeatenStreak(
  form: string[]
): number {
  let streak = 0;

  for (const result of form) {
    if (
      result === "W" ||
      result === "D"
    ) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

/* ======================================================
   ATTACK RATING
====================================================== */

function calculateAttackRating(
  goalsFor: number,
  matchesPlayed: number
): number {
  if (
    matchesPlayed === 0
  ) {
    return 50;
  }

  const avg =
    goalsFor /
    matchesPlayed;

  return Math.min(
    100,
    Math.round(
      50 + avg * 18
    )
  );
}

/* ======================================================
   DEFENSE RATING
====================================================== */

function calculateDefenseRating(
  goalsAgainst: number,
  cleanSheets: number,
  matchesPlayed: number
): number {
  if (
    matchesPlayed === 0
  ) {
    return 50;
  }

  const avgConceded =
    goalsAgainst /
    matchesPlayed;

  const cleanSheetBonus =
    cleanSheets * 4;

  return Math.max(
    40,
    Math.min(
      100,
      Math.round(
        85 -
          avgConceded *
            15 +
          cleanSheetBonus
      )
    )
  );
}

/* ======================================================
   MOMENTUM SCORE
====================================================== */

function calculateMomentumScore(
  wins: number,
  draws: number,
  goalsFor: number,
  goalsAgainst: number,
  unbeatenStreak: number
): number {
  let score = 50;

  score += wins * 8;

  score += draws * 3;

  score +=
    (goalsFor -
      goalsAgainst) *
    2;

  score +=
    unbeatenStreak * 5;

  return Math.max(
    0,
    Math.min(
      100,
      score
    )
  );
}

/* ======================================================
   TREND
====================================================== */

function calculateTrend(
  momentumScore: number
):
  | "HOT"
  | "RISING"
  | "STABLE"
  | "FALLING" {
  if (
    momentumScore >= 85
  ) {
    return "HOT";
  }

  if (
    momentumScore >= 70
  ) {
    return "RISING";
  }

  if (
    momentumScore >= 50
  ) {
    return "STABLE";
  }

  return "FALLING";
}

/* ======================================================
   TEAM MOMENTUM
====================================================== */

export async function getTeamMomentum(
  nation: string,
  completedMatches?: SoccerMatch[]
): Promise<TeamMomentum> {
  const nationMatches =
    await getNationMatches(
      nation,
      completedMatches
    );

  let wins = 0;

  let draws = 0;

  let losses = 0;

  let goalsFor = 0;

  let goalsAgainst = 0;

  let cleanSheets = 0;

  const recentForm:
    string[] = [];

  nationMatches.forEach(
    (match) => {
      const gf =
        getGoalsFor(
          nation,
          match
        );

      const ga =
        getGoalsAgainst(
          nation,
          match
        );

      const result =
        getResult(
          nation,
          match
        );

      recentForm.push(
        result
      );

      goalsFor += gf;

      goalsAgainst += ga;

      if (ga === 0) {
        cleanSheets += 1;
      }

      if (
        result === "W"
      ) {
        wins += 1;
      } else if (
        result === "D"
      ) {
        draws += 1;
      } else {
        losses += 1;
      }
    }
  );

  const unbeatenStreak =
    calculateUnbeatenStreak(
      [
        ...recentForm,
      ].reverse()
    );

  const momentumScore =
    calculateMomentumScore(
      wins,
      draws,
      goalsFor,
      goalsAgainst,
      unbeatenStreak
    );

  const attackRating =
    calculateAttackRating(
      goalsFor,
      nationMatches.length
    );

  const defenseRating =
    calculateDefenseRating(
      goalsAgainst,
      cleanSheets,
      nationMatches.length
    );

  const overallRating =
    Math.round(
      (attackRating +
        defenseRating +
        momentumScore) /
        3
    );

  return {
    nation:
      nation ||
      "Unknown Nation",

    matchesPlayed:
      nationMatches.length,

    wins,

    draws,

    losses,

    goalsFor,

    goalsAgainst,

    cleanSheets,

    recentForm:
      recentForm.slice(-5),

    unbeatenStreak,

    momentumScore,

    attackRating,

    defenseRating,

    overallRating,

    trend:
      calculateTrend(
        momentumScore
      ),
  };
}

/* ======================================================
   ALL TEAM MOMENTUM
====================================================== */

export async function getAllMomentum(): Promise<
  TeamMomentum[]
> {
  console.time(
    "Momentum:getAllMomentum"
  );

  try {
    const completedMatches =
      await getCompletedMatches();

    const nations =
      Array.from(
        new Set(
          completedMatches.flatMap(
            (match) => [
              match.home,
              match.away,
            ]
          )
        )
      );

    const momentum =
      await Promise.all(
        nations.map(
          (nation) =>
            getTeamMomentum(
              nation,
              completedMatches
            )
        )
      );

    return momentum.sort(
      (a, b) =>
        b.overallRating -
        a.overallRating
    );
  } catch (
    error
  ) {
    console.error(
      "getAllMomentum failed:",
      error
    );

    return [];
  } finally {
    console.timeEnd(
      "Momentum:getAllMomentum"
    );
  }
}

/* ======================================================
   HOT TEAMS
====================================================== */

export async function getHotTeams(
  limit = 5
): Promise<
  TeamMomentum[]
> {
  const teams =
    await getAllMomentum();

  return teams
    .filter(
      (team) =>
        team.trend ===
        "HOT"
    )
    .slice(0, limit);
}

/* ======================================================
   RISING TEAMS
====================================================== */

export async function getRisingTeams(
  limit = 5
): Promise<
  TeamMomentum[]
> {
  const teams =
    await getAllMomentum();

  return teams
    .filter(
      (team) =>
        team.trend ===
        "RISING"
    )
    .slice(0, limit);
}

/* ======================================================
   FALLING TEAMS
====================================================== */

export async function getFallingTeams(
  limit = 5
): Promise<
  TeamMomentum[]
> {
  const teams =
    await getAllMomentum();

  return teams
    .filter(
      (team) =>
        team.trend ===
        "FALLING"
    )
    .slice(0, limit);
}

/* ======================================================
   FAVORITES
====================================================== */

export async function getTournamentFavorites(
  limit = 8
): Promise<
  TeamMomentum[]
> {
  const teams =
    await getAllMomentum();

  return teams.slice(
    0,
    limit
  );
}

/* ======================================================
   BEST ATTACK
====================================================== */

export async function getBestAttackTeams(
  limit = 5
): Promise<
  TeamMomentum[]
> {
  const teams =
    await getAllMomentum();

  return [...teams]
    .sort(
      (a, b) =>
        b.attackRating -
        a.attackRating
    )
    .slice(0, limit);
}

/* ======================================================
   BEST DEFENSE
====================================================== */

export async function getBestDefenseTeams(
  limit = 5
): Promise<
  TeamMomentum[]
> {
  const teams =
    await getAllMomentum();

  return [...teams]
    .sort(
      (a, b) =>
        b.defenseRating -
        a.defenseRating
    )
    .slice(0, limit);
}

/* ======================================================
   FORM STRING
====================================================== */

export function getFormString(
  form: string[]
): string {
  if (
    !Array.isArray(form)
  ) {
    return "";
  }

  return form.join(
    " • "
  );
}