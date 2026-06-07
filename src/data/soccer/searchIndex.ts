// src/data/soccer/searchIndex.ts

import { teams } from "./teams";
import { groups } from "./groups";
import { stadiums } from "./stadiums";
import { matches } from "./matches";

import {
  getAllPlayers,
} from "./playerHelpers";

/* ======================================================
   SEARCH ENTITY TYPES
   ====================================================== */

export type SearchEntityType =
  | "team"
  | "group"
  | "stadium"
  | "match"
  | "hub"
  | "player";

/* ======================================================
   SEARCH ENTITY
   ====================================================== */

export interface SearchEntity {
  id: string;

  type: SearchEntityType;

  title: string;

  subtitle?: string;

  keywords: string[];

  route: string;
}

/* ======================================================
   HELPERS
   ====================================================== */

function normalize(
  text: string
): string {
  return text.toLowerCase().trim();
}

function buildKeywords(
  ...values: (
    | string
    | undefined
  )[]
): string[] {
  return values
    .filter(Boolean)
    .flatMap((value) =>
      normalize(value as string)
        .split(" ")
        .filter(Boolean)
    );
}

/* ======================================================
   PLAYER INDEX
   ====================================================== */

function buildPlayerIndex(): SearchEntity[] {
  return getAllPlayers().map(
    (player: any) => ({
      id: `player-${player.id}`,

      type: "player",

      title: player.name,

      subtitle: `${player.nation} • ${player.club}`,

      keywords: buildKeywords(
        player.name,
        player.club,
        player.nation,
        player.position,
        "player",
        "golden boot"
      ),

      route: `/soccer/players/${player.id}`,
    })
  );
}

/* ======================================================
   TEAM INDEX
   ====================================================== */

function buildTeamIndex(): SearchEntity[] {
  return teams.map((team) => ({
    id: `team-${team.id}`,

    type: "team",

    title: team.name,

    subtitle: `${team.region} • ${team.coach}`,

    keywords: buildKeywords(
      team.id,
      team.name,
      team.region,
      team.coach,
      "world cup",
      "fifa"
    ),

    route: `/soccer/teams/${team.id}`,
  }));
}

/* ======================================================
   GROUP INDEX
   ====================================================== */

function buildGroupIndex(): SearchEntity[] {
  return groups.map((group) => ({
    id: `group-${group.id}`,

    type: "group",

    title: group.name,

    subtitle:
      group.teams.join(" • "),

    keywords: buildKeywords(
      group.id,
      group.name,
      ...group.teams,
      "group stage",
      "standings"
    ),

    route: `/soccer/groups/${group.id}`,
  }));
}

/* ======================================================
   STADIUM INDEX
   ====================================================== */

function buildStadiumIndex(): SearchEntity[] {
  return stadiums.map((stadium) => ({
    id: `stadium-${stadium.id}`,

    type: "stadium",

    title: stadium.name,

    subtitle: `${stadium.city}, ${stadium.country}`,

    keywords: buildKeywords(
      stadium.id,
      stadium.name,
      stadium.city,
      stadium.country,
      "stadium",
      "venue",
      "host city"
    ),

    route: `/soccer/stadiums/${stadium.id}`,
  }));
}

/* ======================================================
   MATCH INDEX
   ====================================================== */

function buildMatchIndex(): SearchEntity[] {
  return matches.map((match) => ({
    id: `match-${match.id}`,

    type: "match",

    title: `${match.home} vs ${match.away}`,

    subtitle: `${
      match.group || match.stage
    } • ${match.date}`,

    keywords: buildKeywords(
      String(match.id),
      match.home,
      match.away,
      match.group,
      match.stage,
      match.city,
      match.stadium,
      match.status,
      "fixture",
      "result",
      "live"
    ),

    route: `/soccer/matches/${match.id}`,
  }));
}

/* ======================================================
   HUB INDEX
   ====================================================== */

function buildHubIndex(): SearchEntity[] {
  return [
    {
      id: "hub-home",

      type: "hub",

      title: "Soccer Home",

      subtitle:
        "FIFA World Cup 2026",

      keywords: [
        "soccer",
        "football",
        "fifa",
      ],

      route: "/soccer",
    },

    {
      id: "hub-match-center",

      type: "hub",

      title: "Match Center",

      subtitle:
        "Fixtures • Results • Live",

      keywords: [
        "match center",
        "fixtures",
        "results",
        "live",
      ],

      route: "/soccer/match-center",
    },

    {
      id: "hub-bracket",

      type: "hub",

      title: "Knockout Bracket",

      subtitle:
        "Road To The Final",

      keywords: [
        "bracket",
        "knockout",
        "final",
      ],

      route: "/soccer/bracket",
    },
  ];
}

/* ======================================================
   BUILD
   ====================================================== */

export function buildSearchIndex(): SearchEntity[] {
  return [
    ...buildPlayerIndex(),
    ...buildTeamIndex(),
    ...buildGroupIndex(),
    ...buildStadiumIndex(),
    ...buildMatchIndex(),
    ...buildHubIndex(),
  ];
}

/* ======================================================
   SEARCH
   ====================================================== */

export function searchEntities(
  query: string,
  index: SearchEntity[]
): SearchEntity[] {
  const q = normalize(query);

  if (!q) {
    return index.slice(0, 16);
  }

  const scored = index
    .map((item) => {
      const searchable = [
        item.title,
        item.subtitle,
        ...item.keywords,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      let score = 0;

      if (
        item.title
          .toLowerCase()
          .startsWith(q)
      ) {
        score += 100;
      }

      if (
        item.title
          .toLowerCase()
          .includes(q)
      ) {
        score += 50;
      }

      if (
        item.subtitle
          ?.toLowerCase()
          .includes(q)
      ) {
        score += 25;
      }

      item.keywords.forEach(
        (keyword) => {
          if (
            keyword.includes(q)
          ) {
            score += 10;
          }
        }
      );

      if (
        searchable.includes(q)
      ) {
        score += 5;
      }

      return {
        item,
        score,
      };
    })
    .filter(
      (entry) => entry.score > 0
    )
    .sort(
      (a, b) => b.score - a.score
    )
    .slice(0, 24);

  return scored.map(
    (entry) => entry.item
  );
}