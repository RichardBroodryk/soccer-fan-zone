// ==================================================
// RANKINGS ENGINE — DYNAMIC (OPTION B)
// ==================================================

export interface RankingTeam {
  team: string;
  country: string; // must match Flag system
  points: number;
  coach?: string;
}

/* ==================================================
   COACH MAP (LOCKED FROM HERITAGE SYSTEM)
   ================================================== */

export const mensCoachMap: Record<string, string> = {
  "south-africa": "Rassie Erasmus",
  "new-zealand": "Dave Rennie",
  "ireland": "Andy Farrell",
  "france": "Fabien Galthié",
  "argentina": "Felipe Contepomi",
  "england": "Steve Borthwick",
  "scotland": "Gregor Townsend",
  "italy": "Gonzalo Quesada",
  "australia": "TBC",
  "fiji": "TBC",
};

export const womensCoachMap: Record<string, string> = {
  "england": "John Mitchell",
  "canada": "TBC",
  "new-zealand": "Allan Bunting",
  "france": "François Ratier",
  "ireland": "Scott Bemand",
  "scotland": "Sione Fukofuka",
  "australia": "TBC",
  "usa": "TBC",
  "italy": "Fabio Roselli",
  "south-africa": "Swys de Bruin",
};

/* ==================================================
   RANKING BUILDER
   ================================================== */

export function buildRankings(
  teams: RankingTeam[],
  coachMap: Record<string, string>
) {
  return [...teams]
    .sort((a, b) => b.points - a.points)
    .map((team, index) => ({
      ...team,
      rank: index + 1,
      coach: coachMap[team.country] || "TBC",
    }));
}