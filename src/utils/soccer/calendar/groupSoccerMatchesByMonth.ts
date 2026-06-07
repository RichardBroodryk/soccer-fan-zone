import { SoccerCalendarMatch } from "./soccerCalendarTypes";

export type SoccerCalendarMonthGroup = {
  year: number;

  month: number;

  label: string;

  matches: SoccerCalendarMatch[];
};

function getMonthLabel(
  year: number,
  month: number
) {
  return new Date(
    year,
    month
  ).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export function groupSoccerMatchesByMonth(
  matches: SoccerCalendarMatch[]
): SoccerCalendarMonthGroup[] {
  const map = new Map<
    string,
    SoccerCalendarMonthGroup
  >();

  matches.forEach((match) => {
    const year =
      match.date.getFullYear();

    const month =
      match.date.getMonth();

    const key =
      `${year}-${month}`;

    if (!map.has(key)) {
      map.set(key, {
        year,

        month,

        label:
          getMonthLabel(
            year,
            month
          ),

        matches: [],
      });
    }

    map.get(key)?.matches.push(
      match
    );
  });

  return Array.from(
    map.values()
  ).sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }

    return a.month - b.month;
  });
}