import styles from "./CalendarMonth.module.css";
import MatchRow from "../match/MatchRow";
import { CalendarMonthGroup } from "../../utils/calendar/groupMatchesByMonth";

/* ================= TYPES ================= */

type CalendarMonthProps = {
  group: CalendarMonthGroup;
  onMatchSelect?: (id: number) => void;
};

/* ================= UTIL ================= */

function formatDayLabel(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/* ================= COMPONENT ================= */

export default function CalendarMonth({
  group,
  onMatchSelect,
}: CalendarMonthProps) {
  // Group matches by calendar day (YYYY-MM-DD)
  const dayMap = new Map<string, typeof group.matches>();

  group.matches.forEach((match) => {
    const dayKey = match.date.toISOString().slice(0, 10);

    if (!dayMap.has(dayKey)) {
      dayMap.set(dayKey, []);
    }
    dayMap.get(dayKey)!.push(match);
  });

  const days = Array.from(dayMap.entries());

  return (
    <section className={styles.month}>
      {/* ===== Month Header ===== */}
      <div className={styles.monthHeader}>
        <h3 className={styles.monthTitle}>{group.label}</h3>
        <div className={styles.monthDivider} />
      </div>

      {/* ===== Days ===== */}
      {days.map(([dayKey, matches]) => (
        <div key={dayKey} className={styles.dayBlock}>
          <div className={styles.dayHeader}>
            {formatDayLabel(matches[0].date)}
          </div>

          {matches.map((match) => (
            <div key={match.id} className={styles.matchWrapper}>
              <MatchRow
                home={match.home}
                away={match.away}
                state={match.status}
                score={match.score}
                metaLeft={match.tournamentName}
                metaRight={match.stadiumName}
                onClick={
                  onMatchSelect
                    ? () => onMatchSelect(match.id)
                    : undefined
                }
              />

              {/* ===== Stadium Context ===== */}
              <div className={styles.stadiumMeta}>
                <button
                  className={styles.stadiumLink}
                  onClick={
                    onMatchSelect
                      ? () => onMatchSelect(match.id)
                      : undefined
                  }
                >
                  {match.stadiumName}
                </button>

                {(match.city || match.country) && (
                  <span className={styles.location}>
                    {match.city}
                    {match.city && match.country ? ", " : ""}
                    {match.country}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
