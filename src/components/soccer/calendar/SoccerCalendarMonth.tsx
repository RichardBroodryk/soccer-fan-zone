import { useNavigate } from "react-router-dom";

import styles from "./SoccerCalendarMonth.module.css";

import MatchRow from "../../match/MatchRow";

import {
  SoccerCalendarMonthGroup,
} from "../../../utils/soccer/calendar/groupSoccerMatchesByMonth";

/* ======================================================
   TYPES
====================================================== */

type Props = {
  group: SoccerCalendarMonthGroup;

  onMatchSelect?: (
    id: string
  ) => void;
};

/* ======================================================
   UTIL
====================================================== */

function formatDayLabel(
  date: Date
) {
  return date.toLocaleDateString(
    undefined,
    {
      weekday: "short",

      day: "numeric",

      month: "short",
    }
  );
}

/* ======================================================
   COMPONENT
====================================================== */

export default function SoccerCalendarMonth({
  group,
  onMatchSelect,
}: Props) {

  const navigate =
    useNavigate();

  const dayMap =
    new Map<
      string,
      typeof group.matches
    >();

  group.matches.forEach(
    (match) => {
      const dayKey =
        match.isoDate.slice(
          0,
          10
        );

      if (!dayMap.has(dayKey)) {
        dayMap.set(dayKey, []);
      }

      dayMap
        .get(dayKey)
        ?.push(match);
    }
  );

  const days =
    Array.from(dayMap.entries());

  return (
    <section className={styles.month}>
      {/* MONTH */}

      <div
        className={
          styles.monthHeader
        }
      >
        <h3
          className={
            styles.monthTitle
          }
        >
          {group.label}
        </h3>

        <div
          className={
            styles.monthDivider
          }
        />
      </div>

      {/* DAYS */}

      {days.map(
        ([dayKey, matches]) => (
          <div
            key={dayKey}
            className={
              styles.dayBlock
            }
          >
            <div
              className={
                styles.dayHeader
              }
            >
              {formatDayLabel(
                matches[0].date
              )}
            </div>

            {matches.map(
              (match) => (
                <div
                  key={match.id}
                  className={
                    styles.matchWrapper
                  }
                >
                  <MatchRow
                    home={match.home}
                    away={match.away}
                    state={
                      match.status
                    }
                    score={
                      match.homeScore !==
                        undefined &&
                      match.awayScore !==
                        undefined
                        ? {
                            home:
                              match.homeScore,

                            away:
                              match.awayScore,
                          }
                        : undefined
                    }
                    metaLeft={`${match.tournamentName} • ${match.stage}`}
                    metaRight={
                      match.stadiumName
                    }
                    onClick={
                      onMatchSelect
                        ? () =>
                            onMatchSelect(
                              match.id
                            )
                        : undefined
                    }
                  />

                  <div
                    className={
                      styles.stadiumMeta
                    }
                  >
                   <button
  className={
    styles.stadiumLink
  }
  onClick={(e) => {

    e.stopPropagation();

    navigate(
      `/soccer/stadiums/${match.stadiumSlug}`
    );
  }}
>
  {
    match.stadiumName
  }
</button>

                    {match.city && (
                      <span
                        className={
                          styles.location
                        }
                      >
                        {match.city}
                      </span>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )
      )}
    </section>
  );
}