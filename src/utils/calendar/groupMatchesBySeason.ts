import { CalendarMonthGroup } from "./groupMatchesByMonth";

export type SeasonGroup = {
  id: string;
  label: string;
  months: CalendarMonthGroup[];
};

function getSeasonId(month: number) {
  // month = 0–11
  if (month >= 1 && month <= 4) return "spring";     // Feb–May
  if (month >= 5 && month <= 7) return "midyear";    // Jun–Aug
  if (month >= 8 && month <= 10) return "autumn";    // Sep–Nov
  return "offseason";                                // Dec–Jan
}

function getSeasonLabel(id: string) {
  switch (id) {
    case "spring":
      return "Spring Window";
    case "midyear":
      return "Mid-Year Window";
    case "autumn":
      return "Autumn Window";
    default:
      return "Off-Season";
  }
}

export function groupMatchesBySeason(
  months: CalendarMonthGroup[]
): SeasonGroup[] {
  const map = new Map<string, SeasonGroup>();

  months.forEach((month) => {
    const seasonId = getSeasonId(month.month);

    if (!map.has(seasonId)) {
      map.set(seasonId, {
        id: seasonId,
        label: getSeasonLabel(seasonId),
        months: [],
      });
    }

    map.get(seasonId)!.months.push(month);
  });

  return Array.from(map.values());
}
