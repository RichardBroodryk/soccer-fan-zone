// src/utils/standings/standingsEngine.ts
import type { MatchData } from "../../data/matches/types";

export type TeamStanding = {
  team: string;
  country?: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;
  points: number;
  form: string[];
};

export function buildStandings(matches: MatchData[]): TeamStanding[] {
  const table: Record<string, TeamStanding> = {};

  const ensureTeam = (name: string, country?: string) => {
    if (!table[name]) {
      table[name] = {
        team: name,
        country,
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        pointsDiff: 0,
        points: 0,
        form: [],
      };
    }
  };

  matches.forEach((match) => {
    const homeName = match.home.name;
    const awayName = match.away.name;

    ensureTeam(homeName, match.home.country);
    ensureTeam(awayName, match.away.country);

    if (!match.score) return;

    const h = match.score.home;
    const a = match.score.away;

    table[homeName].played++;
    table[awayName].played++;

    table[homeName].pointsFor += h;
    table[homeName].pointsAgainst += a;
    table[awayName].pointsFor += a;
    table[awayName].pointsAgainst += h;

    if (h > a) {
      table[homeName].won++;
      table[awayName].lost++;
      table[homeName].points += 4;
      if (h - a <= 7) table[awayName].points += 1;
      table[homeName].form.push("W");
      table[awayName].form.push("L");
    } else if (a > h) {
      table[awayName].won++;
      table[homeName].lost++;
      table[awayName].points += 4;
      if (a - h <= 7) table[homeName].points += 1;
      table[awayName].form.push("W");
      table[homeName].form.push("L");
    } else {
      table[homeName].drawn++;
      table[awayName].drawn++;
      table[homeName].points += 2;
      table[awayName].points += 2;
      table[homeName].form.push("D");
      table[awayName].form.push("D");
    }
  });

  Object.values(table).forEach((t) => {
    t.pointsDiff = t.pointsFor - t.pointsAgainst;
    t.form = t.form.slice(-5);
  });

  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.pointsDiff - a.pointsDiff;
  });
}