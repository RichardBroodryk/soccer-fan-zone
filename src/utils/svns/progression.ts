type Team = {
  name: string;
  country: string;
};

type Match = {
  id: string;
  home: Team;
  away: Team;
  score?: {
    home: number;
    away: number;
  };
};

/* ================= SAFE TEAM ================= */

function fallback(name: string): Team {
  return { name, country: "unknown" };
}

/* ================= WINNER ================= */

function getWinner(match: Match, fallbackName: string): Team {
  if (!match || !match.score) {
    return fallback(fallbackName);
  }

  if (match.score.home > match.score.away) {
    return match.home;
  }

  if (match.score.away > match.score.home) {
    return match.away;
  }

  return fallback(fallbackName);
}

/* ================= SEMI FINALS ================= */

export function buildSemiFinals(qf: Match[]) {
  return [
    {
      id: "SF1",
      home: getWinner(qf[0], "Winner QF1"),
      away: getWinner(qf[1], "Winner QF2"),
    },
    {
      id: "SF2",
      home: getWinner(qf[2], "Winner QF3"),
      away: fallback("Best Runner-up"),
    },
  ];
}

/* ================= FINAL ================= */

export function buildFinal(sf: Match[]) {
  return {
    id: "FINAL",
    home: getWinner(sf[0], "Winner SF1"),
    away: getWinner(sf[1], "Winner SF2"),
  };
}