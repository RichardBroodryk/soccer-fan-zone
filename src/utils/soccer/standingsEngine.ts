// src/utils/soccer/standingsEngine.ts

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import { groups } from "../../data/soccer/groups";

/* ======================================================
   TYPES
   ====================================================== */

export interface StandingRow {
  team: string;

  played: number;

  won: number;

  drawn: number;

  lost: number;

  goalsFor: number;

  goalsAgainst: number;

  goalDifference: number;

  points: number;

  qualified?: boolean;

  eliminated?: boolean;

  form?: string[];
}

export interface GroupStandings {
  groupId: string;

  groupName: string;

  standings: StandingRow[];
}

/* ======================================================
   CREATE EMPTY TEAM
   ====================================================== */

function createEmptyRow(
  team: string
): StandingRow {
  return {
    team,

    played: 0,

    won: 0,

    drawn: 0,

    lost: 0,

    goalsFor: 0,

    goalsAgainst: 0,

    goalDifference: 0,

    points: 0,

    form: [],
  };
}

/* ======================================================
   APPLY MATCH RESULT
   ====================================================== */

function applyMatchResult(
  home: StandingRow,
  away: StandingRow,
  match: SoccerMatch
) {
  if (
    match.homeScore === undefined ||
    match.awayScore === undefined
  ) {
    return;
  }

  const homeGoals =
    match.homeScore;

  const awayGoals =
    match.awayScore;

  /* PLAYED */

  home.played += 1;
  away.played += 1;

  /* GOALS */

  home.goalsFor +=
    homeGoals;

  home.goalsAgainst +=
    awayGoals;

  away.goalsFor +=
    awayGoals;

  away.goalsAgainst +=
    homeGoals;

  /* RESULT */

  if (homeGoals > awayGoals) {
    home.won += 1;
    away.lost += 1;

    home.points += 3;

    home.form?.push("W");
    away.form?.push("L");
  } else if (
    awayGoals > homeGoals
  ) {
    away.won += 1;
    home.lost += 1;

    away.points += 3;

    away.form?.push("W");
    home.form?.push("L");
  } else {
    home.drawn += 1;
    away.drawn += 1;

    home.points += 1;
    away.points += 1;

    home.form?.push("D");
    away.form?.push("D");
  }
}

/* ======================================================
   FINALIZE ROW
   ====================================================== */

function finalizeRow(
  row: StandingRow
) {
  row.goalDifference =
    row.goalsFor -
    row.goalsAgainst;

  row.form =
    row.form?.slice(-5) || [];
}

/* ======================================================
   SORT TABLE
   ====================================================== */

function sortStandings(
  rows: StandingRow[]
): StandingRow[] {
  return rows.sort((a, b) => {
    /* POINTS */

    if (
      b.points !== a.points
    ) {
      return (
        b.points - a.points
      );
    }

    /* GOAL DIFFERENCE */

    if (
      b.goalDifference !==
      a.goalDifference
    ) {
      return (
        b.goalDifference -
        a.goalDifference
      );
    }

    /* GOALS FOR */

    if (
      b.goalsFor !==
      a.goalsFor
    ) {
      return (
        b.goalsFor -
        a.goalsFor
      );
    }

    /* TEAM NAME */

    return a.team.localeCompare(
      b.team
    );
  });
}

/* ======================================================
   QUALIFICATION FLAGS
   ====================================================== */

function applyQualificationFlags(
  rows: StandingRow[]
) {
  rows.forEach(
    (team, index) => {
      team.qualified =
        index < 2;

      team.eliminated =
        index >= 2;
    }
  );
}

/* ======================================================
   BUILD SINGLE GROUP
   ====================================================== */

export function buildGroupStandings(
  groupMatches: SoccerMatch[]
): StandingRow[] {
  if (
    groupMatches.length === 0
  ) {
    return [];
  }

  const groupName =
    groupMatches[0].group;

  const group =
    groups.find(
      (g) =>
        g.name === groupName
    );

  if (!group) {
    return [];
  }

  const table: Record<
    string,
    StandingRow
  > = {};

  /* INIT */

  group.teams.forEach((team) => {
    table[team] =
      createEmptyRow(team);
  });

  /* PROCESS */

  groupMatches.forEach((match) => {
    if (
      match.status !== "final"
    ) {
      return;
    }

    const home =
      table[match.home];

    const away =
      table[match.away];

    if (!home || !away) {
      return;
    }

    applyMatchResult(
      home,
      away,
      match
    );
  });

  /* FINALIZE */

  Object.values(table).forEach(
    finalizeRow
  );

  const sorted =
    sortStandings(
      Object.values(table)
    );

  applyQualificationFlags(
    sorted
  );

  return sorted;
}

/* ======================================================
   BUILD ALL GROUPS
   ====================================================== */

export function buildAllGroupStandings(
  matches: SoccerMatch[]
): GroupStandings[] {
  return groups.map((group) => {
    const groupMatches =
      matches.filter(
        (match) =>
          match.group ===
          group.name
      );

    return {
      groupId: group.id,

      groupName: group.name,

      standings:
        buildGroupStandings(
          groupMatches
        ),
    };
  });
}

/* ======================================================
   GET QUALIFIED TEAMS
   ====================================================== */

export function getQualifiedTeams(
  matches: SoccerMatch[]
): string[] {
  const standings =
    buildAllGroupStandings(
      matches
    );

  return standings.flatMap(
    (group) =>
      group.standings
        .filter(
          (team) =>
            team.qualified
        )
        .map(
          (team) => team.team
        )
  );
}

/* ======================================================
   GET GROUP WINNER
   ====================================================== */

export function getGroupWinner(
  matches: SoccerMatch[],
  groupName: string
): StandingRow | undefined {
  const standings =
    buildGroupStandings(
      matches.filter(
        (match) =>
          match.group ===
          groupName
      )
    );

  return standings[0];
}

/* ======================================================
   GET BEST ATTACK
   ====================================================== */

export function getBestAttack(
  matches: SoccerMatch[]
): StandingRow | undefined {
  const all =
    buildAllGroupStandings(
      matches
    ).flatMap(
      (group) =>
        group.standings
    );

  return [...all].sort(
    (a, b) =>
      b.goalsFor -
      a.goalsFor
  )[0];
}

/* ======================================================
   GET BEST DEFENSE
   ====================================================== */

export function getBestDefense(
  matches: SoccerMatch[]
): StandingRow | undefined {
  const all =
    buildAllGroupStandings(
      matches
    ).flatMap(
      (group) =>
        group.standings
    );

  return [...all].sort(
    (a, b) =>
      a.goalsAgainst -
      b.goalsAgainst
  )[0];
}