import { players } from "../../data/soccer/players";

import {
  squads,
} from "../../data/soccer/squads";

import type {
  SoccerPlayer,
} from "../../data/soccer/players";

import type {
  SquadMeta,
} from "../../data/soccer/squads";

/* ======================================================
   ALL SQUADS
   ====================================================== */

export function getAllSquads() {
  return squads;
}

/* ======================================================
   SQUAD BY TEAM
   ====================================================== */

export function getSquadByTeam(
  teamId: string
): SquadMeta | undefined {
  return squads.find(
    (squad) =>
      squad.teamId === teamId
  );
}

/* ======================================================
   FINAL SQUADS
   ====================================================== */

export function getFinalSquads() {
  return squads.filter(
    (squad) =>
      squad.squadStatus ===
      "final"
  );
}

/* ======================================================
   PROVISIONAL SQUADS
   ====================================================== */

export function getProvisionalSquads() {
  return squads.filter(
    (squad) =>
      squad.squadStatus ===
      "provisional"
  );
}

/* ======================================================
   TEAM PLAYERS
   ====================================================== */

export function getSquadPlayers(
  teamId: string
): SoccerPlayer[] {
  return players.filter(
    (player) =>
      player.teamId === teamId
  );
}

/* ======================================================
   GOALKEEPERS
   ====================================================== */

export function getGoalkeepers(
  teamId: string
) {
  return getSquadPlayers(
    teamId
  ).filter(
    (player) =>
      player.position ===
      "Goalkeeper"
  );
}

/* ======================================================
   DEFENDERS
   ====================================================== */

export function getDefenders(
  teamId: string
) {
  return getSquadPlayers(
    teamId
  ).filter(
    (player) =>
      player.position ===
      "Defender"
  );
}

/* ======================================================
   MIDFIELDERS
   ====================================================== */

export function getMidfielders(
  teamId: string
) {
  return getSquadPlayers(
    teamId
  ).filter(
    (player) =>
      player.position ===
      "Midfielder"
  );
}

/* ======================================================
   FORWARDS
   ====================================================== */

export function getForwards(
  teamId: string
) {
  return getSquadPlayers(
    teamId
  ).filter(
    (player) =>
      player.position ===
      "Forward"
  );
}

/* ======================================================
   CAPTAIN
   ====================================================== */

export function getCaptain(
  teamId: string
) {
  const squad =
    getSquadByTeam(teamId);

  if (!squad?.captain) {
    return undefined;
  }

  return players.find(
    (player) =>
      player.name ===
      squad.captain
  );
}

/* ======================================================
   SEARCH SQUADS
   ====================================================== */

export function searchSquads(
  query: string
) {
  const normalized =
    query.toLowerCase();

  return squads.filter(
    (squad) => {
      const searchable = [
        squad.teamName,
        squad.coach,
        squad.captain,
        squad.formation,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(
        normalized
      );
    }
  );
}

/* ======================================================
   FORMATION
   ====================================================== */

export function getFormation(
  teamId: string
) {
  return (
    getSquadByTeam(teamId)
      ?.formation || "4-3-3"
  );
}

/* ======================================================
   SQUAD STATUS
   ====================================================== */

export function getSquadStatus(
  teamId: string
) {
  return (
    getSquadByTeam(teamId)
      ?.squadStatus || "pending"
  );
}

/* ======================================================
   ANNOUNCED DATE
   ====================================================== */

export function getSquadAnnouncedDate(
  teamId: string
) {
  return getSquadByTeam(teamId)
    ?.announcedDate;
}