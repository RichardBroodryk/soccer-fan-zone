// src/utils/soccer/powerRankings.ts

import type { SoccerMatch } from "../../data/soccer/types";

/* ======================================================
   TYPES
   ====================================================== */

export interface TeamPowerRanking {
  team: string;

  played: number;

  wins: number;
  draws: number;
  losses: number;

  goalsFor: number;
  goalsAgainst: number;

  goalDifference: number;

  points: number;

  form: string[];

  attackRating: number;
  defenseRating: number;

  momentumScore: number;

  powerScore: number;

  trend: "up" | "down" | "steady";
}

/* ======================================================
   HELPERS
   ====================================================== */

function createEmptyTeam(
  team: string
): TeamPowerRanking {
  return {
    team,

    played: 0,

    wins: 0,
    draws: 0,
    losses: 0,

    goalsFor: 0,
    goalsAgainst: 0,

    goalDifference: 0,

    points: 0,

    form: [],

    attackRating: 0,
    defenseRating: 0,

    momentumScore: 0,

    powerScore: 0,

    trend: "steady",
  };
}

/* ======================================================
   BUILD POWER RANKINGS
   ====================================================== */

export function buildPowerRankings(
  matches: SoccerMatch[]
): TeamPowerRanking[] {
  const table: Record<
    string,
    TeamPowerRanking
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
        createEmptyTeam(homeTeam);
    }

    if (!table[awayTeam]) {
      table[awayTeam] =
        createEmptyTeam(awayTeam);
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
    home.goalsAgainst += awayGoals;

    away.goalsFor += awayGoals;
    away.goalsAgainst += homeGoals;

    /* ======================================================
       RESULT
       ====================================================== */

    if (homeGoals > awayGoals) {
      home.wins += 1;
      away.losses += 1;

      home.points += 3;

      home.form.push("W");
      away.form.push("L");
    } else if (
      awayGoals > homeGoals
    ) {
      away.wins += 1;
      home.losses += 1;

      away.points += 3;

      away.form.push("W");
      home.form.push("L");
    } else {
      home.draws += 1;
      away.draws += 1;

      home.points += 1;
      away.points += 1;

      home.form.push("D");
      away.form.push("D");
    }
  });

  /* ======================================================
     FINALIZE
     ====================================================== */

  const rankings =
    Object.values(table).map(
      (team) => {
        const goalDifference =
          team.goalsFor -
          team.goalsAgainst;

        const attackRating =
          team.played > 0
            ? Number(
                (
                  team.goalsFor /
                  team.played
                ).toFixed(2)
              )
            : 0;

        const defenseRating =
          team.played > 0
            ? Number(
                (
                  team.goalsAgainst /
                  team.played
                ).toFixed(2)
              )
            : 0;

        const recentForm =
          team.form.slice(-5);

        let momentum = 0;

        recentForm.forEach(
          (result, index) => {
            const weight =
              index + 1;

            if (result === "W") {
              momentum +=
                3 * weight;
            }

            if (result === "D") {
              momentum +=
                1 * weight;
            }

            if (result === "L") {
              momentum -=
                2 * weight;
            }
          }
        );

        const powerScore =
          team.points * 10 +
          goalDifference * 2 +
          attackRating * 3 +
          momentum;

        let trend:
          | "up"
          | "down"
          | "steady" =
          "steady";

        const lastTwo =
          recentForm.slice(-2);

        if (
          lastTwo.length === 2 &&
          lastTwo.every(
            (r) => r === "W"
          )
        ) {
          trend = "up";
        }

        if (
          lastTwo.length === 2 &&
          lastTwo.every(
            (r) => r === "L"
          )
        ) {
          trend = "down";
        }

        return {
          ...team,

          goalDifference,

          attackRating,

          defenseRating,

          momentumScore:
            momentum,

          powerScore,

          trend,

          form: recentForm,
        };
      }
    );

  /* ======================================================
     SORT
     ====================================================== */

  rankings.sort(
    (a, b) =>
      b.powerScore -
      a.powerScore
  );

  return rankings;
}

/* ======================================================
   TOP ATTACK
   ====================================================== */

export function getBestAttackTeams(
  rankings: TeamPowerRanking[],
  limit = 5
) {
  return [...rankings]
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

export function getBestDefenseTeams(
  rankings: TeamPowerRanking[],
  limit = 5
) {
  return [...rankings]
    .sort(
      (a, b) =>
        a.defenseRating -
        b.defenseRating
    )
    .slice(0, limit);
}

/* ======================================================
   HOT FORM
   ====================================================== */

export function getHotTeams(
  rankings: TeamPowerRanking[],
  limit = 5
) {
  return [...rankings]
    .sort(
      (a, b) =>
        b.momentumScore -
        a.momentumScore
    )
    .slice(0, limit);
}