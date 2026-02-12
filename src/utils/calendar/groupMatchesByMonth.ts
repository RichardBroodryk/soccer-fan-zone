import { CalendarMatch } from "./calendarTypes";

export type CalendarMonthGroup = {
  year: number;
  month: number;     // 0–11
  label: string;     // e.g. "February 2026"
  matches: CalendarMatch[];
};

export function groupMatchesByMonth(
  matches: CalendarMatch[]
): CalendarMonthGroup[] {
  const map = new Map<string, CalendarMonthGroup>();

  matches.forEach((match) => {
    const year = match.date.getFullYear();
    const month = match.date.getMonth();
    const key = `${year}-${month}`;

    if (!map.has(key)) {
      map.set(key, {
        year,
        month,
        label: match.date.toLocaleString("en-GB", {
          month: "long",
          year: "numeric",
        }),
        matches: [],
      });
    }

    map.get(key)!.matches.push(match);
  });

  return Array.from(map.values())
    .sort((a, b) =>
      a.year !== b.year
        ? a.year - b.year
        : a.month - b.month
    )
    .map((group) => ({
      ...group,
      matches: group.matches.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      ),
    }));
}
