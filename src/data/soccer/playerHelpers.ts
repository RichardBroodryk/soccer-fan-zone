import { players } from "../../data/soccer/players";

import type { SoccerPlayer } from "../../data/soccer/players";

/* ======================================================
   ALL PLAYERS
   ====================================================== */

export function getAllPlayers() {
  return players;
}

/* ======================================================
   PLAYER BY ID
   ====================================================== */

export function getPlayerById(
  playerId: string
) {
  return players.find(
    (player) =>
      player.id === playerId
  );
}

/* ======================================================
   PLAYERS BY TEAM
   ====================================================== */

export function getPlayersByTeam(
  teamId: string
) {
  return players.filter(
    (player) =>
      player.teamId === teamId
  );
}

/* ======================================================
   PLAYERS BY POSITION
   ====================================================== */

export function getPlayersByPosition(
  position:
    | "Goalkeeper"
    | "Defender"
    | "Midfielder"
    | "Forward"
) {
  return players.filter(
    (player) =>
      player.position ===
      position
  );
}

/* ======================================================
   TOP SCORERS
   ====================================================== */

export function getTopScorers(
  limit = 10
) {
  return [...players]
    .sort(
  (a, b) =>
    (b.goals ?? 0) -
    (a.goals ?? 0)
)
    .slice(0, limit);
}

/* ======================================================
   TOP ASSISTS
   ====================================================== */

export function getTopAssistProviders(
  limit = 10
) {
  return [...players]
   .sort(
  (a, b) =>
    (b.assists ?? 0) -
    (a.assists ?? 0)
)
    .slice(0, limit);
}

/* ======================================================
   PLAYER SEARCH
   ====================================================== */

export function searchPlayers(
  query: string
): SoccerPlayer[] {
  const normalized =
    query.toLowerCase();

  return players.filter(
    (player) => {
      const searchable = [
        player.name,
        player.club,
        player.nation,
        player.position,
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
   YOUNG STARS
   ====================================================== */

export function getYoungStars(
  ageLimit = 23
) {
  return players.filter(
    (player) =>
      player.age <= ageLimit
  );
}