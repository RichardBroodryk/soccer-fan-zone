// src/utils/soccer/predictionHelpers.ts

import { teams } from "../../data/soccer/teams";
import { matches } from "../../data/soccer/matches";

import {
  buildAllGroupStandings,
} from "./standingsEngine";

import type {
  TeamMomentum,
} from "./momentumEngine";

import {
  getAllMomentum,
} from "./momentumEngine";

/* ======================================================
   TYPES
====================================================== */

export interface SafeStanding {
  team: string;

  points: number;

  won: number;

  drawn: number;

  lost: number;

  goalsFor: number;

  goalsAgainst: number;

  goalDifference: number;
}

export interface SafeMomentum {
  team: string;

  momentum: number;

  formScore: number;
}

/* ======================================================
   NORMALIZE
====================================================== */

export function normalizeTeamName(
  value: string
): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/* ======================================================
   SAFE TEAM
====================================================== */

export function safeGetTeam(
  teamName: string
) {
  return teams.find(
    (team) =>
      normalizeTeamName(
        team.name
      ) ===
      normalizeTeamName(
        teamName
      )
  );
}

/* ======================================================
   SAFE STANDINGS
====================================================== */

export function safeGetStandings(): SafeStanding[] {
  try {
    const standings =
      buildAllGroupStandings(
        matches
      ).flatMap(
        (group) =>
          group.standings
      );

    return standings.map(
      (team) => ({
        team:
          team.team || "",

        points:
          Number(
            team.points
          ) || 0,

        won:
          Number(
            team.won
          ) || 0,

        drawn:
          Number(
            team.drawn
          ) || 0,

        lost:
          Number(
            team.lost
          ) || 0,

        goalsFor:
          Number(
            team.goalsFor
          ) || 0,

        goalsAgainst:
          Number(
            team.goalsAgainst
          ) || 0,

        goalDifference:
          Number(
            team.goalDifference
          ) || 0,
      })
    );
  } catch (
    error
  ) {
    console.error(
      "safeGetStandings failed:",
      error
    );

    return [];
  }
}

/* ======================================================
   SAFE MOMENTUM
====================================================== */

export async function safeGetMomentum(): Promise<
  SafeMomentum[]
> {

  try {
    const momentum =
      await getAllMomentum();

    return momentum.map(
      (
        team: TeamMomentum
      ) => ({
        team:
          team.nation || "",

        momentum:
          Number(
            team.momentumScore
          ) || 0,

        formScore:
          Number(
            team.overallRating
          ) || 0,
      })
    );
  } catch (
    error
  ) {
    console.error(
      "safeGetMomentum failed:",
      error
    );

    return [];
  }
}

/* ======================================================
   SAFE TEAM STANDING
====================================================== */

export function safeGetTeamStanding(
  teamName: string
): SafeStanding | undefined {
  const standings =
    safeGetStandings();

  return standings.find(
    (team) =>
      normalizeTeamName(
        team.team
      ) ===
      normalizeTeamName(
        teamName
      )
  );
}

/* ======================================================
   SAFE TEAM MOMENTUM
====================================================== */

export async function safeGetTeamMomentum(
  teamName: string
): Promise<
  SafeMomentum | undefined
> {
  const momentum =
    await safeGetMomentum();

  return momentum.find(
    (team) =>
      normalizeTeamName(
        team.team
      ) ===
      normalizeTeamName(
        teamName
      )
  );
}

/* ======================================================
   HOST NATIONS
====================================================== */

const HOST_NATIONS = [
  "United States",
  "Mexico",
  "Canada",
];

/* ======================================================
   IS HOST NATION
====================================================== */

export function isHostNation(
  teamName: string
): boolean {
  return HOST_NATIONS.some(
    (host) =>
      normalizeTeamName(
        host
      ) ===
      normalizeTeamName(
        teamName
      )
  );
}

/* ======================================================
   ELITE TEAMS
====================================================== */

const ELITE_TEAMS = [
  "Brazil",
  "Argentina",
  "France",
  "England",
  "Germany",
  "Spain",
  "Portugal",
];

/* ======================================================
   IS ELITE TEAM
====================================================== */

export function isEliteTeam(
  teamName: string
): boolean {
  return ELITE_TEAMS.some(
    (team) =>
      normalizeTeamName(
        team
      ) ===
      normalizeTeamName(
        teamName
      )
  );
}

/* ======================================================
   SAFE NUMBER
====================================================== */

export function safeNumber(
  value: unknown,
  fallback = 0
): number {
  const parsed =
    Number(value);

  return Number.isNaN(
    parsed
  )
    ? fallback
    : parsed;
}

/* ======================================================
   CLAMP
====================================================== */

export function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

/* ======================================================
   PERCENTAGE
====================================================== */

export function percentage(
  value: number,
  total: number
): number {
  if (
    total <= 0
  ) {
    return 0;
  }

  return Math.round(
    (value / total) *
      100
  );
}