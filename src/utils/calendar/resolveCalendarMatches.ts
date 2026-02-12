import { matches2026 } from "../../data/matches2026";
import { tournaments2026 } from "../../data/tournamentMeta";
import { stadiums } from "../../data/stadiums";
import { CalendarMatch } from "./calendarTypes";

type CalendarStatus = "upcoming" | "live" | "final";

function resolveStatus(
  date: Date,
  hasScore: boolean
): CalendarStatus {
  if (hasScore) return "final";
  if (date.getTime() < Date.now()) return "live";
  return "upcoming";
}

export function resolveCalendarMatches(): CalendarMatch[] {
  const resolved: CalendarMatch[] = [];

  for (const match of matches2026) {
    try {
      /** ================= TOURNAMENT ================= */
      const tournament = tournaments2026.find(
        (t) => t.matchKey === match.tournament
      );

      if (!tournament) {
        console.warn(
          `[Calendar] Skipped match ${match.id}: unknown tournament "${match.tournament}"`
        );
        continue;
      }

      /** ================= STADIUM ================= */
      const stadium = stadiums.find(
        (s) =>
          s.slug === match.venue ||
          s.name === match.venue
      );

      if (!stadium) {
        console.warn(
          `[Calendar] Skipped match ${match.id}: unknown venue "${match.venue}"`
        );
        continue;
      }

      /** ================= DATE ================= */
      const dateObj = new Date(match.date);
      if (isNaN(dateObj.getTime())) {
        console.warn(
          `[Calendar] Skipped match ${match.id}: invalid date "${match.date}"`
        );
        continue;
      }

      /** ================= PUSH ================= */
      resolved.push({
        id: match.id,

        date: dateObj,
        isoDate: match.date,

        tournamentId: tournament.instanceId,
        tournamentName: tournament.name,
        gender: tournament.gender,

        home: match.home,
        away: match.away,

        stadiumSlug: stadium.slug,
        stadiumName: stadium.name,
        city: stadium.city,
        country: stadium.country,

        status: resolveStatus(
          dateObj,
          Boolean(match.score)
        ),

        score: match.score,
      });
    } catch (err) {
      console.error(
        `[Calendar] Unexpected resolver error for match ${match.id}`,
        err
      );
    }
  }

  return resolved;
}
