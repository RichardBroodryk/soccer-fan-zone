// src/utils/soccer/teamAnalytics.ts

import { players } from "../../data/soccer/players";

import type {
  SoccerPlayer,
} from "../../data/soccer/players";

/* ======================================================
   TEAM PLAYERS
   ====================================================== */

export function getTeamPlayers(
  teamId: string
): SoccerPlayer[] {
  return players.filter(
    (player) =>
      player.teamId === teamId
  );
}

/* ======================================================
   POSITION BREAKDOWN
   ====================================================== */

export function getPositionBreakdown(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  return {
    goalkeepers:
      squad.filter(
        (p) =>
          p.position ===
          "Goalkeeper"
      ).length,

    defenders:
      squad.filter(
        (p) =>
          p.position ===
          "Defender"
      ).length,

    midfielders:
      squad.filter(
        (p) =>
          p.position ===
          "Midfielder"
      ).length,

    forwards:
      squad.filter(
        (p) =>
          p.position ===
          "Forward"
      ).length,
  };
}

/* ======================================================
   AVERAGE AGE
   ====================================================== */

export function getAverageAge(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  if (squad.length === 0) {
    return 0;
  }

  const total =
    squad.reduce(
      (sum, player) =>
        sum + player.age,
      0
    );

  return (
    total / squad.length
  ).toFixed(1);
}

/* ======================================================
   TOTAL CAPS
   ====================================================== */

export function getTotalCaps(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  return squad.reduce(
    (sum, player) =>
      sum +
      (player.caps ?? 0),
    0
  );
}

/* ======================================================
   TOTAL GOALS
   ====================================================== */

export function getTotalGoals(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  return squad.reduce(
    (sum, player) =>
      sum +
      (player.goals ?? 0),
    0
  );
}

/* ======================================================
   MOST EXPERIENCED PLAYER
   ====================================================== */

export function getMostExperiencedPlayer(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  return [...squad].sort(
    (a, b) =>
      (b.caps ?? 0) -
      (a.caps ?? 0)
  )[0];
}

/* ======================================================
   TOP SCORER
   ====================================================== */

export function getTeamTopScorer(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  return [...squad].sort(
    (a, b) =>
      (b.goals ?? 0) -
      (a.goals ?? 0)
  )[0];
}

/* ======================================================
   YOUNGEST PLAYER
   ====================================================== */

export function getYoungestPlayer(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  return [...squad].sort(
    (a, b) =>
      a.age - b.age
  )[0];
}

/* ======================================================
   OLDEST PLAYER
   ====================================================== */

export function getOldestPlayer(
  teamId: string
) {
  const squad =
    getTeamPlayers(teamId);

  return [...squad].sort(
    (a, b) =>
      b.age - a.age
  )[0];
}