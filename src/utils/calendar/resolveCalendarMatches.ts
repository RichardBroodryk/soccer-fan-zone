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

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function resolveCalendarMatches(): CalendarMatch[] {
  const resolved: CalendarMatch[] = [];

  for (const match of matches2026) {
    try {
      /** ================= TOURNAMENT ================= */
      const tournament = tournaments2026.find(
        (t) =>
          normalize(t.matchKey) ===
          normalize(match.tournament)
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
          normalize(s.slug) === normalize(match.venue) ||
          normalize(s.name) === normalize(match.venue)
      );

      /** ================= DATE ================= */
      const dateObj = new Date(match.date);
      if (isNaN(dateObj.getTime())) {
        console.warn(
          `[Calendar] Skipped match ${match.id}: invalid date "${match.date}"`
        );
        continue;
      }

      /** ================= SAFE STADIUM FALLBACK ================= */
      const stadiumSlug = stadium?.slug ?? "unknown";
      const stadiumName = stadium?.name ?? match.venue;
      const city = stadium?.city;
      const country = stadium?.country;

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

        stadiumSlug,
        stadiumName,
        city,
        country,

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

  /** ================= SORT (GLOBAL) ================= */
  return resolved.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
}
