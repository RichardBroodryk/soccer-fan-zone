type Team = {
  name: string;
  country: string;
};

function safeTeam(team?: Team): Team {
  return team || { name: "TBD", country: "unknown" };
}

export function buildQuarterFinals(qualifiers: Record<string, Team[]>) {
  return [
    {
      id: "QF1",
      home: safeTeam(qualifiers.A?.[0]),
      away: safeTeam(qualifiers.B?.[1]),
    },
    {
      id: "QF2",
      home: safeTeam(qualifiers.B?.[0]),
      away: safeTeam(qualifiers.C?.[1]),
    },
    {
      id: "QF3",
      home: safeTeam(qualifiers.C?.[0]),
      away: safeTeam(qualifiers.A?.[1]),
    },
  ];
}