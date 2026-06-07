import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "./SoccerNotificationsPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* HERO */

import heroImage from "../../assets/soccer/heroes/notifications-hero.jpg";

/* ======================================================
   TYPES
====================================================== */

type NotificationCategory = {
  id: number;

  title: string;

  message: string;

  enabled: boolean;
};

type GeneratedNotification = {
  id: string;

  text: string;

  sub: string;

  importance: number;

  match: SoccerMatch;
};

/* ======================================================
   STORAGE
====================================================== */

const STORAGE_KEY =
  "soccer_notifications_v2";

function loadSent(): string[] {
  try {
    if (
      typeof window ===
      "undefined"
    ) {
      return [];
    }

    const raw =
      localStorage.getItem(
        STORAGE_KEY
      );

    return raw
      ? JSON.parse(raw)
      : [];
  } catch {
    return [];
  }
}

/* ======================================================
   PAGE
====================================================== */

export default function SoccerNotificationsPage() {
  const navigate =
    useNavigate();

  /* ======================================================
     STATE
  ====================================================== */

  const [
    matches,
    setMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const [
    permission,
    setPermission,
  ] = useState<NotificationPermission>(
    "default"
  );

  const [
    sentIds,
    setSentIds,
  ] = useState<
    string[]
  >(loadSent());

  const [
    categories,
    setCategories,
  ] = useState<
    NotificationCategory[]
  >([
    {
      id: 1,

      title:
        "Live Match Alerts",

      message:
        "Kick-off reminders, live match updates and final scores.",

      enabled: true,
    },

    {
      id: 2,

      title:
        "Tournament Drama",

      message:
        "Major knockout fixtures, finals and defining football moments.",

      enabled: true,
    },

    {
      id: 3,

      title:
        "Football News",

      message:
        "Breaking football stories and tournament developments.",

      enabled: true,
    },

    {
      id: 4,

      title:
        "Platform Updates",

      message:
        "System and platform announcements.",

      enabled: true,
    },
  ]);

  /* ======================================================
     LOAD MATCHES
  ====================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      try {
        setLoading(true);

        setError(null);

        const response =
          await getAllWorldCupMatches();

        if (!mounted)
          return;

        const safeMatches =
          Array.isArray(
            response
          )
            ? response
            : [];

        /* ======================================================
           NORMALIZE API RESPONSE
        ====================================================== */

        const normalizedMatches =
          safeMatches.map(
            (
              match: SoccerMatch
            ) => ({
              ...match,

              id:
                match.id ||
                `match-${Math.random()
                  .toString(
                    36
                  )
                  .slice(2)}`,

              home:
                match.home ||
                "Home Team",

              away:
                match.away ||
                "Away Team",

              stage:
                match.stage ||
                "Tournament Match",

              group:
                match.group ||
                "World Cup",

              stadium:
                match.stadium ||
                "World Cup Stadium",

              stadiumId:
                match.stadiumId ||
                "unknown-stadium",

              city:
                match.city ||
                "Host City",

              status:
                match.status ||
                "upcoming",

              date:
                match.date ||
                "World Cup 2026",

              minute:
                match.minute ??
                0,

              homeScore:
                match.homeScore ??
                0,

              awayScore:
                match.awayScore ??
                0,
            })
          );

        setMatches(
          normalizedMatches
        );
      } catch (
        err
      ) {
        console.error(
          "Failed to load notification matches:",
          err
        );

        if (!mounted)
          return;

        setError(
          "Unable to load football notifications."
        );

        setMatches([]);
      } finally {
        if (mounted) {
          setLoading(
            false
          );
        }
      }
    }

    loadMatches();

    return () => {
      mounted = false;
    };
  }, []);

  /* ======================================================
     PERMISSION
  ====================================================== */

  useEffect(() => {
    if (
      typeof window !==
        "undefined" &&
      "Notification" in
        window
    ) {
      setPermission(
        Notification.permission
      );
    }
  }, []);

  const requestPermission =
    async () => {
      if (
        typeof window ===
          "undefined" ||
        !(
          "Notification" in
          window
        )
      ) {
        return;
      }

      try {
        const result =
          await Notification.requestPermission();

        setPermission(
          result
        );
      } catch (
        err
      ) {
        console.error(
          "Notification permission failed:",
          err
        );
      }
    };

  /* ======================================================
     GENERATED ALERTS
  ====================================================== */

  const generatedNotifications =
    useMemo<
      GeneratedNotification[]
    >(() => {
      return matches
        .filter(
          (m) =>
            m.status ===
              "live" ||
            (
              m.stage ||
              ""
            ).includes(
              "Final"
            ) ||
            (
              m.stage ||
              ""
            ).includes(
              "Semi"
            )
        )

        .map(
          (
            m
          ): GeneratedNotification => ({
            id: String(
              m.id ||
                `match-${m.home}-${m.away}`
            ),

            match: m,

            importance:
              m.status ===
              "live"
                ? 100
                : 75,

            text:
              m.status ===
              "live"
                ? `LIVE NOW: ${
                    m.home ||
                    "Home Team"
                  } vs ${
                    m.away ||
                    "Away Team"
                  }`
                : `${
                    m.home ||
                    "Home Team"
                  } vs ${
                    m.away ||
                    "Away Team"
                  }`,

            sub: `${
              m.stage ||
              "Tournament Match"
            } • ${
              m.stadium ||
              "World Cup Stadium"
            }`,
          })
        )

        .slice(0, 8);
    }, [matches]);

  /* ======================================================
     PUSH NOTIFICATIONS
  ====================================================== */

  useEffect(() => {
    if (
      permission !==
        "granted" ||
      typeof window ===
        "undefined" ||
      !(
        "Notification" in
        window
      )
    ) {
      return;
    }

    const updated = [
      ...sentIds,
    ];

    generatedNotifications.forEach(
      (n) => {
        if (
          updated.includes(
            n.id
          )
        ) {
          return;
        }

        try {
          new Notification(
            n.text,
            {
              body: n.sub,
            }
          );

          updated.push(
            n.id
          );
        } catch (
          err
        ) {
          console.error(
            "Notification failed:",
            err
          );
        }
      }
    );

    setSentIds(updated);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          updated
        )
      );
    } catch (
      err
    ) {
      console.error(
        "Storage update failed:",
        err
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    generatedNotifications,
    permission,
  ]);

  /* ======================================================
     TOGGLE CATEGORY
  ====================================================== */

  const toggleCategory = (
    id: number
  ) => {
    setCategories(
      (prev) =>
        prev.map(
          (item) =>
            item.id === id
              ? {
                  ...item,

                  enabled:
                    !item.enabled,
                }
              : item
        )
    );
  };

  /* ======================================================
     ROUTING
  ====================================================== */

  const openMatch = (
    matchId: string
  ) => {
    navigate(
      `/soccer/matches/${
        matchId ||
        "unknown-match"
      }`
    );
  };

  /* ======================================================
     LIVE COUNTS
  ====================================================== */

  const liveMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.status ===
          "live"
      ).length;
    }, [matches]);

  /* ======================================================
   UI
====================================================== */

return (
  <PageWrapper>
    <main className={styles.page}>
      {/* HERO */}

      <section
        className={
          styles.hero
        }
        style={{
          backgroundImage:
            `url(${heroImage})`,
        }}
      >
        <div
          className={
            styles.heroContent
          }
        >
          <h1>
            Football
            Notifications
          </h1>

          <p>
            Live football
            alerts,
            tournament
            drama and
            real-time
            match
            intelligence.
          </p>
        </div>
      </section>

      {/* LOADING */}

      {loading && (
        <section
          className={
            styles.content
          }
        >
          <div
            className={
              styles.statusCard
            }
          >
            <h3>
              Loading
              Football
              Alerts...
            </h3>

            <p>
              Synchronizing
              live match
              notifications
              and tournament
              intelligence.
            </p>
          </div>
        </section>
      )}

      {/* ERROR */}

      {!loading &&
        error && (
          <section
            className={
              styles.content
            }
          >
            <div
              className={
                styles.statusCard
              }
            >
              <h3>
                Notification
                Center
                Unavailable
              </h3>

              <p>
                Football
                notification
                systems are
                currently
                reconnecting.
              </p>
            </div>
          </section>
        )}

      {/* CONTENT */}

      {!loading && (
        <section
          className={
            styles.content
          }
        >
          <div
            className={
              styles.mainGrid
            }
          >
            {/* LEFT */}

            <aside
              className={
                styles.leftColumn
              }
            >
              <div
                className={
                  styles.statusCard
                }
              >
                <div
                  className={
                    styles.cardLabel
                  }
                >
                  Notifications
                </div>

                <h3>
                  {permission.toUpperCase()}
                </h3>

                <p>
                  Enable
                  browser
                  notifications
                  for live
                  football
                  updates.
                </p>

                {permission ===
                  "default" && (
                  <button
                    className={
                      styles.enableButton
                    }
                    onClick={
                      requestPermission
                    }
                  >
                    Enable
                    Notifications
                  </button>
                )}
              </div>
            </aside>

            {/* RIGHT */}

            <section
              className={
                styles.rightColumn
              }
            >
              {/* MATCHDAY PULSE */}

              <div
                className={
                  styles.pulseCard
                }
              >
                <div
                  className={
                    styles.pulseTop
                  }
                >
                  <div
                    className={
                      styles.liveDot
                    }
                  />

                  <div>
                    <div
                      className={
                        styles.cardLabel
                      }
                    >
                      Matchday
                      Pulse
                    </div>

                    <h3>
                      Live
                      Tournament
                      Activity
                    </h3>
                  </div>
                </div>

                <div
                  className={
                    styles.pulseGrid
                  }
                >
                  <div>
                    <span>
                      Live
                      Matches
                    </span>

                    <strong>
                      {liveMatches}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Alerts
                    </span>

                    <strong>
                      {
                        generatedNotifications.length
                      }
                    </strong>
                  </div>
                </div>

                <p>
                  Real-time
                  football
                  activity
                  across
                  live
                  fixtures,
                  knockout
                  matches and
                  tournament
                  drama.
                </p>
              </div>

              {/* ALERTS */}

              <div>
                <div
                  className={
                    styles.sectionHeader
                  }
                >
                  <h2>
                    Live Match
                    Alerts
                  </h2>

                  <p>
                    Real-time
                    football
                    match
                    updates
                    and
                    tournament
                    moments.
                  </p>
                </div>

                <div
                  className={
                    styles.alertList
                  }
                >
                  {generatedNotifications.map(
                    (
                      notification
                    ) => (
                      <button
                        key={
                          notification.id
                        }
                        className={
                          styles.alertCard
                        }
                        onClick={() =>
                          openMatch(
                            notification.id
                          )
                        }
                      >
                        <div
                          className={
                            styles.alertTop
                          }
                        >
                          <div>
                            <strong>
                              {
                                notification.text
                              }
                            </strong>

                            <p>
                              {
                                notification.sub
                              }
                            </p>
                          </div>

                          <div
                            className={
                              styles.alertBadge
                            }
                          >
                            {notification
                              .match
                              .status ||
                              "upcoming"}
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* CATEGORIES */}

                <div>
                  <div
                    className={
                      styles.sectionHeader
                    }
                  >
                    <h2>
                      Notification
                      Categories
                    </h2>

                    <p>
                      Customize
                      your
                      football
                      alert
                      experience.
                    </p>
                  </div>

                  <div
                    className={
                      styles.categoryGrid
                    }
                  >
                    {categories.map(
                      (
                        category
                      ) => (
                        <div
                          key={
                            category.id
                          }
                          className={
                            styles.categoryCard
                          }
                        >
                          <div
                            className={
                              styles.categoryTop
                            }
                          >
                            <h3>
                              {
                                category.title
                              }
                            </h3>

                            <button
                              className={
                                category.enabled
                                  ? styles.activeButton
                                  : styles.offButton
                              }
                              onClick={() =>
                                toggleCategory(
                                  category.id
                                )
                              }
                            >
                              {category.enabled
                                ? "ACTIVE"
                                : "OFF"}
                            </button>
                          </div>

                          <p>
                            {
                              category.message
                            }
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}