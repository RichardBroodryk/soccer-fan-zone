import { matches } from "../../../data/soccer/matches";

import {
  SoccerCalendarMatch,
} from "./soccerCalendarTypes";

export async function resolveSoccerCalendarMatches():
Promise<SoccerCalendarMatch[]> {
  try {
    return matches.map((m) => {
      const date =
        new Date(m.date);

      return {
        id: m.id,

        date,

        isoDate: m.date,

        tournamentId:
          "fifa-world-cup-2026",

        tournamentName:
          "FIFA World Cup 2026",

        stage: m.stage,

        group: m.group,

      home: {
  name: m.home,

  country: m.home,
},

away: {
  name: m.away,

  country: m.away,
},

  stadiumName:
  m.stadium ?? "",

stadiumSlug:
  m.stadiumId ??
  (m.stadium ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-"),

        city: m.city,

        status: m.status,

        homeScore:
          m.homeScore,

        awayScore:
          m.awayScore,

        minute: m.minute,

        featured:
          m.status === "live",
      };
    });
  } catch {
    return [];
  }
}