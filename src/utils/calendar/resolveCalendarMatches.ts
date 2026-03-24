// ==================================================
// CALENDAR RESOLVER — INTELLIGENCE + LEAGUE FILTER
// ==================================================

import { getMatches } from "../../data/matchesAdapter";
import { CalendarMatch } from "./calendarTypes";

/* ================= TYPES ================= */

type ResolveOptions = {
  leagueId?: string;
};

/* ================= HELPERS ================= */

function getGender(tournament: string): "men" | "women" {
  return tournament.toLowerCase().includes("women")
    ? "women"
    : "men";
}

function getTournamentId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getStadiumSlug(venue: string): string {
  return venue
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ================= RESOLVER ================= */

export async function resolveCalendarMatches(
  options?: ResolveOptions
): Promise<CalendarMatch[]> {
  try {
    const matches = await getMatches({ type: "international" });

    return matches.map((m) => {
      const dateObj = new Date(m.date);

      return {
        id: m.id,

        date: dateObj,
        isoDate: m.date,

        tournamentName: m.tournament,
        tournamentId: getTournamentId(m.tournament),

        gender: getGender(m.tournament),

        home: {
          name: m.home.name,
          country: m.home.country,
        },

        away: {
          name: m.away.name,
          country: m.away.country,
        },

        stadiumName: m.venue,
        stadiumSlug: getStadiumSlug(m.venue),

        city: undefined,
        country: undefined,

        // 🔥 unified system
        status: m.state || "upcoming",

        score: m.score,

        // 🔥 intelligence
        importance: m.importance,
        isFeatured:
          m.state === "live" ||
          (m.importance ?? 0) >= 80,
      };
    });
  } catch {
    return [];
  }
}