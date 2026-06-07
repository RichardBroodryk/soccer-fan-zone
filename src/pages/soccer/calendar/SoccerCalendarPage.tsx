import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "./SoccerCalendarPage.module.css";

import backgroundLight from "../../../assets/soccer/ui/background-light.png";

import PageWrapper from "../../../components/layout/PageWrapper";

import {
  resolveSoccerCalendarMatches,
} from "../../../utils/soccer/calendar/resolveSoccerCalendarMatches";

import {
  groupSoccerMatchesByMonth,
} from "../../../utils/soccer/calendar/groupSoccerMatchesByMonth";

import SoccerCalendarMonth from "../../../components/soccer/calendar/SoccerCalendarMonth";

import {
  SoccerCalendarMatch,
} from "../../../utils/soccer/calendar/soccerCalendarTypes";

/* ======================================================
   TYPES
====================================================== */

type Filter =
  | "all"
  | "live"
  | "upcoming"
  | "final";

/* ======================================================
   COMPONENT
====================================================== */

export default function SoccerCalendarPage() {
  const navigate =
    useNavigate();

  const [matches, setMatches] =
    useState<
      SoccerCalendarMatch[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState<Filter>("all");

  /* ======================================================
     LOAD
  ====================================================== */

  useEffect(() => {
    async function load() {
      const data =
        await resolveSoccerCalendarMatches();

      setMatches(data);

      setLoading(false);
    }

    load();
  }, []);

  /* ======================================================
     FILTER
  ====================================================== */

  const filteredMatches =
    useMemo(() => {
      if (filter === "all") {
        return matches;
      }

      return matches.filter(
        (m) =>
          m.status === filter
      );
    }, [matches, filter]);

  /* ======================================================
     GROUPS
  ====================================================== */

  const monthGroups =
    groupSoccerMatchesByMonth(
      filteredMatches
    );

  /* ======================================================
     STATS
  ====================================================== */

  const liveCount =
    matches.filter(
      (m) =>
        m.status === "live"
    ).length;

  const upcomingCount =
    matches.filter(
      (m) =>
        m.status ===
        "upcoming"
    ).length;

  /* ======================================================
     NAVIGATION
  ====================================================== */

  function goToMatch(
    id: string
  ) {
    navigate(
      `/soccer/matches/${id}`
    );
  }

  /* ======================================================
     UI
  ====================================================== */

  return (
    <PageWrapper imageUrl={backgroundLight}>
      <main className={styles.page}>
        {/* HERO */}

        <header
          className={
            styles.hero
          }
        >
          <div
            className={
              styles.heroOverlay
            }
          />

          <div
            className={
              styles.heroContent
            }
          >
            <div
              className={
                styles.heroEyebrow
              }
            >
              FIFA WORLD CUP 2026
            </div>

            <h1>
              Soccer Calendar
            </h1>

            <p>
              Complete tournament
              scheduling across
              all groups, stages,
              host cities, and
              featured fixtures
              from World Cup 2026.
            </p>

            <div
              className={
                styles.heroStats
              }
            >
              <div
                className={
                  styles.heroStat
                }
              >
                <strong>
                  {
                    matches.length
                  }
                </strong>

                <span>
                  Total Fixtures
                </span>
              </div>

              <div
                className={
                  styles.heroStat
                }
              >
                <strong>
                  {
                    upcomingCount
                  }
                </strong>

                <span>
                  Upcoming Matches
                </span>
              </div>

              <div
                className={
                  styles.heroStat
                }
              >
                <strong>
                  {liveCount}
                </strong>

                <span>
                  Live Fixtures
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionIntro
            }
          >
            <h2>
              Tournament Schedule
            </h2>

            <p
              className={
                styles.subtext
              }
            >
              Browse every
              confirmed World Cup
              fixture by date,
              stadium, city,
              stage, and live
              status.
            </p>
          </div>

          {/* FILTERS */}

          <div
            className={
              styles.filters
            }
          >
            <div
              className={
                styles.filterGroup
              }
            >
              <button
                className={
                  filter === "all"
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  setFilter("all")
                }
              >
                All
              </button>

              <button
                className={
                  filter ===
                  "live"
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "live"
                  )
                }
              >
                Live
              </button>

              <button
                className={
                  filter ===
                  "upcoming"
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "upcoming"
                  )
                }
              >
                Upcoming
              </button>

              <button
                className={
                  filter ===
                  "final"
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  setFilter(
                    "final"
                  )
                }
              >
                Results
              </button>
            </div>
          </div>

          {/* STATES */}

          {loading ? (
            <div
              className={
                styles.loading
              }
            >
              Loading
              calendar...
            </div>
          ) : monthGroups.length ===
            0 ? (
            <div
              className={
                styles.empty
              }
            >
              No fixtures found.
            </div>
          ) : (
            monthGroups.map(
              (group) => (
                <SoccerCalendarMonth
                  key={
                    group.label
                  }
                  group={group}
                  onMatchSelect={
                    goToMatch
                  }
                />
              )
            )
          )}
        </section>
      </main>
    </PageWrapper>
  );
}