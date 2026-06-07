// src/utils/soccer/knockoutProjectionEngine.ts

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import {
  buildAllGroupStandings,
} from "./standingsEngine";

import {
  predictMatch,
} from "./predictionEngine";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ======================================================
   TYPES
====================================================== */

export interface KnockoutTeam {
  team: string;

  group: string;

  position: number;
}

export interface KnockoutMatch {
  id: string;

  stage: string;

  home: string;

  away: string;

  winner: string;

  confidence: number;

  scorePrediction: string;
}

export interface KnockoutRound {
  stage: string;

  matches: KnockoutMatch[];
}

export interface TournamentProjection {
  rounds: KnockoutRound[];

  champion: string;

  finalist: string;
}

/* ======================================================
   HELPERS
====================================================== */

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

function normalizeMatches(
  matches: SoccerMatch[]
): SoccerMatch[] {
  return matches.map(
    (
      match: SoccerMatch
    ) => ({
      ...match,

      id:
        match.id ||
        `match-${Math.random()
          .toString(36)
          .slice(2)}`,

      home:
        match.home ||
        "Home Team",

      away:
        match.away ||
        "Away Team",

      stage:
        match.stage ||
        "Tournament Match",

      status:
        match.status ||
        "upcoming",

      stadium:
        match.stadium ||
        "World Cup Stadium",

      city:
        match.city ||
        "Host City",

      date:
        match.date ||
        "2026-01-01",

      group:
        match.group ||
        "World Cup",

      stadiumId:
        match.stadiumId ||
        "unknown-stadium",

      homeScore:
        match.homeScore ??
        0,

      awayScore:
        match.awayScore ??
        0,
    })
  );
}

async function loadMatches(): Promise<
  SoccerMatch[]
> {
  try {
    const response =
      await getAllWorldCupMatches();

    if (
      !Array.isArray(
        response
      )
    ) {
      return [];
    }

    return normalizeMatches(
      response
    );
  } catch (
    error
  ) {
    console.error(
      "Knockout engine failed to load matches:",
      error
    );

    return [];
  }
}

/* ======================================================
   QUALIFIED TEAMS
====================================================== */

export async function getQualifiedTeams(): Promise<
  KnockoutTeam[]
> {
  const matches =
    await loadMatches();

  const standings =
    buildAllGroupStandings(
      matches
    );

  const qualified:
    KnockoutTeam[] = [];

  standings.forEach(
    (group) => {
      const topTwo =
        Array.isArray(
          group.standings
        )
          ? group.standings.slice(
              0,
              2
            )
          : [];

      topTwo.forEach(
        (
          team,
          index
        ) => {
          qualified.push({
            team:
              team.team ||
              "Unknown Team",

            group:
              group.groupName ||
              "Group",

            position:
              index + 1,
          });
        }
      );
    }
  );

  return qualified;
}

/* ======================================================
   ROUND OF 16 SEEDING
====================================================== */

export async function buildRoundOf16(): Promise<
  KnockoutMatch[]
> {
  const qualified =
    await getQualifiedTeams();

  const winners =
    qualified.filter(
      (team) =>
        team.position === 1
    );

  const runnersUp =
    qualified.filter(
      (team) =>
        team.position === 2
    );

  const knockoutMatches:
    KnockoutMatch[] = [];

  const total =
    Math.min(
      winners.length,
      runnersUp.length
    );

  for (
    let i = 0;
    i < total;
    i++
  ) {
    const home =
      winners[i];

    const away =
      runnersUp[
        (i + 1) %
          runnersUp.length
      ];

    if (
      !home ||
      !away
    ) {
      continue;
    }

   const prediction =
  await predictMatch({
    id: `r16-${i}`,

    home:
      home.team,

    away:
      away.team,

    date: "",

    stadium: "",

    city: "",

    stage:
      "Round of 16",

    status:
      "upcoming",
  } as SoccerMatch);

    knockoutMatches.push({
      id: `r16-${
        i + 1
      }`,

      stage:
        "Round of 16",

      home:
        home.team,

      away:
        away.team,

      winner:
        prediction.favorite ||
        home.team,

      confidence: clamp(
        prediction.confidence ??
          50,
        1,
        100
      ),

      scorePrediction: `${
        prediction.expectedHomeGoals ??
        1
      }-${
        prediction.expectedAwayGoals ??
        0
      }`,
    });
  }

  return knockoutMatches;
}

/* ======================================================
   BUILD NEXT ROUND
====================================================== */

async function buildNextRound(
  previousRoundPromise:
    Promise<
      KnockoutMatch[]
    >,
  stage: string,
  prefix: string
): Promise<
  KnockoutMatch[]
> {
  const previousRound =
    await previousRoundPromise;

  const nextRound:
    KnockoutMatch[] = [];

  for (
    let i = 0;
    i <
    previousRound.length;
    i += 2
  ) {
    const homeWinner =
      previousRound[i]
        ?.winner;

    const awayWinner =
      previousRound[
        i + 1
      ]?.winner;

    if (
      !homeWinner ||
      !awayWinner
    ) {
      continue;
    }

   const prediction =
  await predictMatch({
    id: `${prefix}-${i}`,

    home:
      homeWinner,

    away:
      awayWinner,

    date: "",

    stadium: "",

    city: "",

    stage,

    status:
      "upcoming",
  } as SoccerMatch);

    nextRound.push({
      id: `${prefix}-${Math.floor(
        i / 2
      )}`,

      stage,

      home:
        homeWinner,

      away:
        awayWinner,

      winner:
        prediction.favorite ||
        homeWinner,

      confidence: clamp(
        prediction.confidence ??
          50,
        1,
        100
      ),

      scorePrediction: `${
        prediction.expectedHomeGoals ??
        1
      }-${
        prediction.expectedAwayGoals ??
        0
      }`,
    });
  }

  return nextRound;
}

/* ======================================================
   QUARTERFINALS
====================================================== */

export async function buildQuarterfinals() {
  return buildNextRound(
    buildRoundOf16(),
    "Quarterfinal",
    "qf"
  );
}

/* ======================================================
   SEMIFINALS
====================================================== */

export async function buildSemifinals() {
  return buildNextRound(
    buildQuarterfinals(),
    "Semifinal",
    "sf"
  );
}

/* ======================================================
   FINAL
====================================================== */

export async function buildFinal() {
  return buildNextRound(
    buildSemifinals(),
    "Final",
    "final"
  );
}

/* ======================================================
   CHAMPION
====================================================== */

export async function getProjectedChampion() {
  const final =
    await buildFinal();

  if (
    final.length === 0
  ) {
    return undefined;
  }

  return (
    final[0]?.winner ||
    undefined
  );
}

/* ======================================================
   FINALIST
====================================================== */

export async function getProjectedFinalist() {
  const final =
    await buildFinal();

  if (
    final.length === 0
  ) {
    return undefined;
  }

  const match =
    final[0];

  if (!match) {
    return undefined;
  }

  return match.winner ===
    match.home
    ? match.away
    : match.home;
}

/* ======================================================
   FULL TOURNAMENT PROJECTION
====================================================== */

export async function buildTournamentProjection(): Promise<TournamentProjection> {
  const roundOf16 =
    await buildRoundOf16();

  const quarterfinals =
    await buildQuarterfinals();

  const semifinals =
    await buildSemifinals();

  const final =
    await buildFinal();

  return {
    rounds: [
      {
        stage:
          "Round of 16",

        matches:
          roundOf16,
      },

      {
        stage:
          "Quarterfinals",

        matches:
          quarterfinals,
      },

      {
        stage:
          "Semifinals",

        matches:
          semifinals,
      },

      {
        stage:
          "Final",

        matches: final,
      },
    ],

    champion:
      (await getProjectedChampion()) ||
      "TBD",

    finalist:
      (await getProjectedFinalist()) ||
      "TBD",
  };
}

/* ======================================================
   MOST DOMINANT RUN
====================================================== */

export async function getMostDominantRun() {
  const projection =
    await buildTournamentProjection();

  const appearances:
    Record<
      string,
      number
    > = {};

  projection.rounds.forEach(
    (round) => {
      round.matches.forEach(
        (match) => {
          appearances[
            match.winner
          ] =
            (appearances[
              match.winner
            ] || 0) + 1;
        }
      );
    }
  );

  const sorted =
    Object.entries(
      appearances
    ).sort(
      (a, b) =>
        b[1] - a[1]
    );

  if (
    sorted.length === 0
  ) {
    return undefined;
  }

  return {
    team:
      sorted[0]?.[0] ||
      "Unknown Team",

    wins:
      sorted[0]?.[1] ||
      0,
  };
}

/* ======================================================
   UPSET POTENTIAL
====================================================== */

export async function getUpsetPotentialMatches() {
  const projection =
    await buildTournamentProjection();

  return projection.rounds
    .flatMap(
      (round) =>
        round.matches
    )
    .filter(
      (match) =>
        match.confidence <=
        10
    );
}

/* ======================================================
   HIGHEST CONFIDENCE MATCHES
====================================================== */

export async function getMostCertainMatches() {
  const projection =
    await buildTournamentProjection();

  return projection.rounds
    .flatMap(
      (round) =>
        round.matches
    )
    .sort(
      (a, b) =>
        b.confidence -
        a.confidence
    )
    .slice(0, 5);
}

/* ======================================================
   FULL BRACKET FLAT
====================================================== */

export async function getFlatBracketMatches() {
  const projection =
    await buildTournamentProjection();

  return projection.rounds.flatMap(
    (round) =>
      round.matches
  );
}