// src/utils/soccer/matchIntelligence.ts

import type { SoccerMatch } from "../../data/soccer/types";

/* ======================================================
   RIVALRIES
   ====================================================== */

const rivalries: [string, string][] = [
  ["Brazil", "Argentina"],
  ["England", "Germany"],
  ["France", "England"],
  ["Spain", "Portugal"],
  ["Mexico", "United States"],
  ["Netherlands", "Germany"],
  ["Italy", "Germany"],
  ["Brazil", "Uruguay"],
  ["Argentina", "Uruguay"],
  ["Japan", "South Korea"],
];

/* ======================================================
   GLOBAL POWER TEAMS
   ====================================================== */

const eliteTeams = [
  "Brazil",
  "Argentina",
  "France",
  "England",
  "Germany",
  "Spain",
  "Portugal",
  "Italy",
  "Netherlands",
];

const strongTeams = [
  "Belgium",
  "Croatia",
  "Uruguay",
  "Mexico",
  "United States",
  "Japan",
  "South Korea",
  "Morocco",
];

/* ======================================================
   STAGE IMPORTANCE
   ====================================================== */

const stageWeights: Record<
  string,
  number
> = {
  Final: 100,

  Semifinal: 92,

  Quarterfinal: 84,

  "Round of 16": 74,

  "Round of 32": 66,

  "Group Stage": 40,
};

/* ======================================================
   TEAM POWER
   ====================================================== */

export function getTeamStrength(
  nation: string
): number {
  if (eliteTeams.includes(nation)) {
    return 95;
  }

  if (strongTeams.includes(nation)) {
    return 82;
  }

  return 68;
}

/* ======================================================
   RIVALRY DETECTION
   ====================================================== */

export function isRivalryMatch(
  match: SoccerMatch
): boolean {
  return rivalries.some(
    ([a, b]) =>
      (match.home === a &&
        match.away === b) ||
      (match.home === b &&
        match.away === a)
  );
}

/* ======================================================
   KNOCKOUT CHECK
   ====================================================== */

export function isKnockoutMatch(
  match: SoccerMatch
): boolean {
  return (
    match.stage !== "Group Stage"
  );
}

/* ======================================================
   SCORE DRAMA
   ====================================================== */

export function getDramaScore(
  match: SoccerMatch
): number {
  if (
    match.homeScore === undefined ||
    match.awayScore === undefined
  ) {
    return 0;
  }

  const diff = Math.abs(
    match.homeScore -
      match.awayScore
  );

  if (diff === 0) {
    return 24;
  }

  if (diff === 1) {
    return 18;
  }

  return 8;
}

/* ======================================================
   IMPORTANCE SCORE
   ====================================================== */

export function getMatchImportance(
  match: SoccerMatch
): number {
  let score = 0;

  /* STAGE */

  score +=
    stageWeights[match.stage] ||
    30;

  /* LIVE */

  if (match.status === "live") {
    score += 22;
  }

  /* FINALIZED */

  if (match.status === "final") {
    score += 10;
  }

  /* RIVALRY */

  if (isRivalryMatch(match)) {
    score += 20;
  }

  /* ELITE TEAMS */

  score +=
    getTeamStrength(match.home) *
    0.12;

  score +=
    getTeamStrength(match.away) *
    0.12;

  /* DRAMA */

  score += getDramaScore(match);

  /* BIG SCORELINES */

  if (
    (match.homeScore || 0) >= 3 ||
    (match.awayScore || 0) >= 3
  ) {
    score += 6;
  }

  return Math.round(score);
}

/* ======================================================
   FEATURED MATCH
   ====================================================== */

export function getFeaturedMatch(
  matches: SoccerMatch[]
): SoccerMatch | undefined {
  return [...matches].sort(
    (a, b) =>
      getMatchImportance(b) -
      getMatchImportance(a)
  )[0];
}

/* ======================================================
   TRENDING MATCHES
   ====================================================== */

export function getTrendingMatches(
  matches: SoccerMatch[],
  limit = 8
): SoccerMatch[] {
  return [...matches]
    .sort(
      (a, b) =>
        getMatchImportance(b) -
        getMatchImportance(a)
    )
    .slice(0, limit);
}

/* ======================================================
   LIVE MATCHES
   ====================================================== */

export function getLiveMatches(
  matches: SoccerMatch[]
): SoccerMatch[] {
  return matches.filter(
    (match) =>
      match.status === "live"
  );
}

/* ======================================================
   UPCOMING MATCHES
   ====================================================== */

export function getUpcomingMatches(
  matches: SoccerMatch[],
  limit = 10
): SoccerMatch[] {
  return matches
    .filter(
      (match) =>
        match.status ===
        "upcoming"
    )
    .slice(0, limit);
}

/* ======================================================
   COMPLETED MATCHES
   ====================================================== */

export function getCompletedMatches(
  matches: SoccerMatch[]
): SoccerMatch[] {
  return matches.filter(
    (match) =>
      match.status === "final"
  );
}

/* ======================================================
   UPSET DETECTION
   ====================================================== */

export function isUpset(
  match: SoccerMatch
): boolean {
  if (
    match.status !== "final"
  ) {
    return false;
  }

  if (
    match.homeScore === undefined ||
    match.awayScore === undefined
  ) {
    return false;
  }

  const homeStrength =
    getTeamStrength(match.home);

  const awayStrength =
    getTeamStrength(match.away);

  const strengthGap =
    Math.abs(
      homeStrength -
        awayStrength
    );

  if (strengthGap < 15) {
    return false;
  }

  const weakerTeamWon =
    (homeStrength <
      awayStrength &&
      match.homeScore >
        match.awayScore) ||
    (awayStrength <
      homeStrength &&
      match.awayScore >
        match.homeScore);

  return weakerTeamWon;
}

/* ======================================================
   UPSET MATCHES
   ====================================================== */

export function getUpsetMatches(
  matches: SoccerMatch[]
): SoccerMatch[] {
  return matches.filter((match) =>
    isUpset(match)
  );
}

/* ======================================================
   MATCH OF THE DAY
   ====================================================== */

export function getMatchOfTheDay(
  matches: SoccerMatch[]
): SoccerMatch | undefined {
  const today =
    new Date().toDateString();

  const todaysMatches =
    matches.filter(
      (match) =>
        new Date(
          match.date
        ).toDateString() === today
    );

  if (
    todaysMatches.length === 0
  ) {
    return undefined;
  }

  return getFeaturedMatch(
    todaysMatches
  );
}

/* ======================================================
   KNOCKOUT MATCHES
   ====================================================== */

export function getKnockoutMatches(
  matches: SoccerMatch[]
): SoccerMatch[] {
  return matches.filter((match) =>
    isKnockoutMatch(match)
  );
}

/* ======================================================
   HIGH IMPORTANCE MATCHES
   ====================================================== */

export function getBigMatches(
  matches: SoccerMatch[],
  minimumScore = 90
): SoccerMatch[] {
  return matches.filter(
    (match) =>
      getMatchImportance(
        match
      ) >= minimumScore
  );
}