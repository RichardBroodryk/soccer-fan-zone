// --------------------------------------------------
// RAZ SYSTEM — IMPORTANCE ENGINE
// Phase 4.4 — SMART PRIORITIZATION
// --------------------------------------------------

/* ✅ IMPORT TYPE ONLY (FIXED PATH) */
import type { MatchData } from "../archive/rugby-data/matches/types";

import { COMPETITIONS } from "./competitionRegistry";

/**
 * 🔒 CORE PRINCIPLE
 * Importance is deterministic and composable
 *
 * Final score = base + competition + context + teams
 */

// --------------------------------------------------
// 🔹 BASE SCORES (BY CATEGORY)
// --------------------------------------------------

function getBaseScore(match: MatchData): number {
  const comp = COMPETITIONS.find(
    (c) => c.conceptId === match.competitionId
  );

  if (!comp) return 0;

  if (comp.category === "international") return 60;
  if (comp.category === "domestic") return 40;
  if (comp.category === "sevens") return 50;

  return 0;
}

// --------------------------------------------------
// 🔹 COMPETITION WEIGHT
// --------------------------------------------------

function getCompetitionWeight(match: MatchData): number {
  switch (match.competitionId) {
    case "world-cup":
    case "world-cup-women":
      return 40;

    case "rugby-championship":
    case "six-nations":
    case "six-nations-women":
      return 30;

    case "international-tests":
    case "womens-internationals":
      return 25;

    case "champions-cup":
      return 25;

    case "pacific-nations-cup":
      return 20;

    default:
      return 10;
  }
}

// --------------------------------------------------
// 🔹 MATCH CONTEXT (STATE)
// --------------------------------------------------

function getStateWeight(match: MatchData): number {
  switch (match.state) {
    case "live":
      return 30;

    case "starting":
      return 20;

    case "final":
      return 15;

    case "upcoming":
      return 5;

    default:
      return 0;
  }
}

// --------------------------------------------------
// 🔹 RIVALRY BOOST
// --------------------------------------------------

function getRivalryWeight(match: MatchData): number {
  const home = match.home.name.toLowerCase();
  const away = match.away.name.toLowerCase();

  const rivalries = [
    ["south africa", "new zealand"],
    ["england", "france"],
    ["ireland", "england"],
    ["australia", "new zealand"],
  ];

  const isRivalry = rivalries.some(
    ([a, b]) =>
      (home === a && away === b) ||
      (home === b && away === a)
  );

  return isRivalry ? 25 : 0;
}

// --------------------------------------------------
// 🔹 USER TEAM BOOST
// --------------------------------------------------

export function getTeamBoost(
  match: MatchData,
  userTeams: string[]
): number {
  const home = match.home.name;
  const away = match.away.name;

  if (userTeams.includes(home) || userTeams.includes(away)) {
    return 30;
  }

  return 0;
}

// --------------------------------------------------
// 🔥 FINAL IMPORTANCE CALCULATOR
// --------------------------------------------------

export function calculateImportance(
  match: MatchData,
  userTeams: string[] = []
): number {
  const base = getBaseScore(match);
  const comp = getCompetitionWeight(match);
  const state = getStateWeight(match);
  const rivalry = getRivalryWeight(match);
  const teamBoost = getTeamBoost(match, userTeams);

  const total = base + comp + state + rivalry + teamBoost;

  // 🔒 Clamp between 0–100
  return Math.min(100, total);
}