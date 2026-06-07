// src/utils/soccer/tableEngine.ts

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ======================================================
   TYPES
   ====================================================== */

export interface TeamStanding {
  team: string;

  played: number;

  won: number;
  drawn: number;
  lost: number;

  goalsFor: number;
  goalsAgainst: number;

  goalDifference: number;

  points: number;

  form: string[];

  qualified?: boolean;
}

/* ======================================================
   HELPERS
   ====================================================== */

function createEmptyStanding(
  team: string
): TeamStanding {
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
   BUILD GROUP STANDINGS
   ====================================================== */

export function buildGroupStandings(
  matches: SoccerMatch[]
): TeamStanding[] {
  const table: Record<
    string,
    TeamStanding
  > = {};

  matches.forEach((match) => {
    if (
      match.status !== "final"
    ) {
      return;
    }

    const homeTeam =
      match.home;

    const awayTeam =
      match.away;

    if (!table[homeTeam]) {
      table[homeTeam] =
        createEmptyStanding(
          homeTeam
        );
    }

    if (!table[awayTeam]) {
      table[awayTeam] =
        createEmptyStanding(
          awayTeam
        );
    }

    const home =
      table[homeTeam];

    const away =
      table[awayTeam];

    const homeGoals =
      match.homeScore ?? 0;

    const awayGoals =
      match.awayScore ?? 0;

    /* ======================================================
       PLAYED
       ====================================================== */

    home.played += 1;
    away.played += 1;

    /* ======================================================
       GOALS
       ====================================================== */

    home.goalsFor += homeGoals;

    home.goalsAgainst +=
      awayGoals;

    away.goalsFor += awayGoals;

    away.goalsAgainst +=
      homeGoals;

    /* ======================================================
       RESULT
       ====================================================== */

    if (homeGoals > awayGoals) {
      home.won += 1;

      away.lost += 1;

      home.points += 3;

      home.form.push("W");

      away.form.push("L");
    } else if (
      awayGoals > homeGoals
    ) {
      away.won += 1;

      home.lost += 1;

      away.points += 3;

      away.form.push("W");

      home.form.push("L");
    } else {
      home.drawn += 1;

      away.drawn += 1;

      home.points += 1;

      away.points += 1;

      home.form.push("D");

      away.form.push("D");
    }
  });

  /* ======================================================
     FINALIZE
     ====================================================== */

  const standings =
    Object.values(table).map(
      (team) => ({
        ...team,

        goalDifference:
          team.goalsFor -
          team.goalsAgainst,

        form:
          team.form.slice(-5),
      })
    );

  /* ======================================================
     FIFA SORTING
     ====================================================== */

  standings.sort((a, b) => {
    if (
      b.points !== a.points
    ) {
      return (
        b.points - a.points
      );
    }

    if (
      b.goalDifference !==
      a.goalDifference
    ) {
      return (
        b.goalDifference -
        a.goalDifference
      );
    }

    return (
      b.goalsFor -
      a.goalsFor
    );
  });

  /* ======================================================
     QUALIFICATION
     ====================================================== */

  standings.forEach(
    (team, index) => {
      if (index < 2) {
        team.qualified = true;
      }
    }
  );

  return standings;
}