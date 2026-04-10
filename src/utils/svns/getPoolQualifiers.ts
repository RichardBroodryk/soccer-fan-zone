import type { MatchData } from "../../data/matches/types";
import { buildStandings } from "../standings/standingsEngine";

type Team = {
  name: string;
  country: string;
};

export function getPoolQualifiers(matches: MatchData[]) {
  const pools = ["A", "B", "C"];

  const result: Record<string, Team[]> = {};

  pools.forEach((pool) => {
    const poolMatches = matches.filter(
      (m) => m.pool === pool
    );

    if (!poolMatches.length) return;

    const standings = buildStandings(poolMatches);

    result[pool] = standings.slice(0, 2).map((t) => {
      // 🔍 Find a match where this team appears
      const match = poolMatches.find(
        (m) =>
          m.home.name === t.team ||
          m.away.name === t.team
      );

      // 🔍 Resolve correct team object
      const teamData =
        match?.home.name === t.team
          ? match.home
          : match?.away;

      return {
        name: t.team,
        country: teamData?.country || "unknown",
      };
    });
  });

  return result;
}