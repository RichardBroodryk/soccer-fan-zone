// src/utils/soccer/predictionEngine.ts

import { matches } from "../../data/soccer/matches";
import { teams } from "../../data/soccer/teams";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import {
  safeGetTeam,
  safeGetMomentum,
  safeGetTeamStanding,
  safeGetTeamMomentum,
  isHostNation,
  isEliteTeam,
  clamp,
} from "./predictionHelpers";

/* ======================================================
   TYPES
====================================================== */

export interface MatchPrediction {
  homeWin: number;

  draw: number;

  awayWin: number;

  expectedHomeGoals: number;

  expectedAwayGoals: number;

  favorite: string;

  confidence: number;
}

export interface TeamPowerRanking {
  team: string;

  rating: number;

  momentum: number;

  projectedFinish: string;
}

export interface FinalPrediction {
  home: string;

  away: string;

  confidence: number;
}

/* ======================================================
   TEAM STRENGTH
====================================================== */

export async function getTeamStrength(
  teamName: string,
  momentumTeam?: {
    momentum: number;
    formScore: number;
  }
): Promise<number> {

  const standing =
    safeGetTeamStanding(
      teamName
    );

  const teamData =
    safeGetTeam(teamName);

  let rating = 70;

  if (standing) {
    rating +=
      standing.points * 2.2;

    rating +=
      standing.goalDifference *
      1.4;

    rating +=
      standing.won * 2;
  }

  if (momentumTeam) {
    rating +=
      momentumTeam.momentum *
      0.18;

    rating +=
      momentumTeam.formScore *
      0.12;
  }

  if (
    isHostNation(
      teamName
    )
  ) {
    rating += 5;
  }

  if (
    isEliteTeam(
      teamName
    )
  ) {
    rating += 8;
  }

  if (teamData) {
    rating += 1;
  }

  return clamp(
    Math.round(rating),
    50,
    100
  );
}

/* ======================================================
   MATCH PREDICTION
====================================================== */

export async function predictMatch(
  match: SoccerMatch
): Promise<MatchPrediction> {
  const homeStrength =
    await getTeamStrength(
      match.home
    );

  const awayStrength =
    await getTeamStrength(
      match.away
    );

  const difference =
    homeStrength -
    awayStrength;

  const adjustedDiff =
    difference + 4;

  let homeWin =
    45 +
    adjustedDiff * 1.2;

  let awayWin =
    45 -
    adjustedDiff * 1.2;

  let draw =
    100 -
    homeWin -
    awayWin;

  homeWin = clamp(
    homeWin,
    10,
    80
  );

  awayWin = clamp(
    awayWin,
    10,
    80
  );

  draw = clamp(
    draw,
    8,
    35
  );

  const total =
    homeWin +
    awayWin +
    draw;

  homeWin =
    Math.round(
      (homeWin / total) *
        100
    );

  awayWin =
    Math.round(
      (awayWin / total) *
        100
    );

  draw =
    100 -
    homeWin -
    awayWin;

  const expectedHomeGoals =
    Number(
      clamp(
        1.2 +
          adjustedDiff *
            0.03,
        0.4,
        3.8
      ).toFixed(1)
    );

  const expectedAwayGoals =
    Number(
      clamp(
        1.1 -
          adjustedDiff *
            0.025,
        0.3,
        3.4
      ).toFixed(1)
    );

  const favorite =
    homeWin >= awayWin
      ? match.home
      : match.away;

  const confidence =
    Math.abs(
      homeWin -
        awayWin
    );

  return {
    homeWin,
    draw,
    awayWin,
    expectedHomeGoals,
    expectedAwayGoals,
    favorite,
    confidence,
  };
}

/* ======================================================
   POWER RANKINGS
====================================================== */

export async function getPowerRankings(): Promise<
  TeamPowerRanking[]
> {

  const momentum =
    await safeGetMomentum();

  const momentumMap =
    new Map(
      momentum.map(
        (team) => [
          team.team,
          team,
        ]
      )
    );

  const rankings =
    await Promise.all(
      teams.map(
        async (team) => {

          const momentumTeam =
            momentumMap.get(
              team.name
            );

          const strength =
            await getTeamStrength(
              team.name,
              momentumTeam
            );

          const momentumValue =
            momentumTeam
              ?.momentum || 0;

          let projectedFinish =
            "Group Stage";

          if (
            strength >= 95
          ) {
            projectedFinish =
              "Champion";
          } else if (
            strength >= 90
          ) {
            projectedFinish =
              "Final";
          } else if (
            strength >= 85
          ) {
            projectedFinish =
              "Semifinal";
          } else if (
            strength >= 80
          ) {
            projectedFinish =
              "Quarterfinal";
          } else if (
            strength >= 75
          ) {
            projectedFinish =
              "Round of 16";
          }

          return {
            team:
              team.name,

            rating:
              strength,

            momentum:
              momentumValue,

            projectedFinish,
          };
        }
      )
    );

  return rankings.sort(
    (a, b) =>
      b.rating -
      a.rating
  );
}

/* ======================================================
   TOURNAMENT FAVORITE
====================================================== */

export async function predictTournamentWinner() {
  const rankings =
    await getPowerRankings();

  return rankings[0];
}

/* ======================================================
   DARK HORSES
====================================================== */

export async function getDarkHorseTeams() {
  const rankings =
    await getPowerRankings();

  return rankings.filter(
    (team) =>
      team.rating >= 78 &&
      team.rating <= 88
  );
}

/* ======================================================
   MOST LIKELY FINAL
====================================================== */

export async function getMostLikelyFinal(): Promise<FinalPrediction> {
  const rankings =
    await getPowerRankings();

  const home =
    rankings[0];

  const away =
    rankings[1];

  return {
    home:
      home?.team ||
      "TBD",

    away:
      away?.team ||
      "TBD",

    confidence:
      Math.round(
        (
          (home?.rating || 0) +
          (away?.rating || 0)
        ) / 2
      ),
  };
}
/* ======================================================
   BIGGEST FAVORITES
====================================================== */

export async function getBiggestFavorites() {
  console.time(
    "getBiggestFavorites"
  );

  try {
    const futureMatches =
      matches.filter(
        (match) =>
          match.status ===
          "upcoming"
      );

    const predictions =
      await Promise.all(
        futureMatches.map(
          async (match) => ({
            match: {
              id: match.id,
              home: match.home,
              away: match.away,
            },
            prediction:
              await predictMatch(
                match
              ),
          })
        )
      );

    return predictions
      .sort(
        (a, b) =>
          b.prediction
            .confidence -
          a.prediction
            .confidence
      )
      .slice(0, 5);
  } finally {
    console.timeEnd(
      "getBiggestFavorites"
    );
  }
}

/* ======================================================
   UPSET WATCH
====================================================== */

export async function getUpsetWatchMatches() {
  const futureMatches =
    matches.filter(
      (match) =>
        match.status ===
        "upcoming"
    );

  const predictions =
    await Promise.all(
      futureMatches.map(
        async (match) => ({
          match: {
            id: match.id,
            home: match.home,
            away: match.away,
          },
          prediction:
            await predictMatch(
              match
            ),
        })
      )
    );

  return predictions
    .filter(
      (entry) =>
        entry.prediction
          .confidence <= 12
    )
    .slice(0, 5);
}