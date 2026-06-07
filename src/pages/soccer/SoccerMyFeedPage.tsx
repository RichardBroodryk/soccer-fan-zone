import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "./SoccerMyFeedPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* STORAGE */

import {
  loadMySoccerTeams,
} from "../../utils/soccer/soccerMyTeamsStorage";

/* DATA */

import {
  soccerNewsData,
  type SoccerNewsItem,
} from "../../data/soccer/soccerNewsData";

/* UTILS */

import {
  getTrendingMatches,
} from "../../utils/soccer/matchIntelligence";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ======================================================
   NORMALIZE
====================================================== */

function normalize(
  value: string
) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default function SoccerMyFeedPage() {
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
    teamNames,
    setTeamNames,
  ] = useState<
    string[]
  >([]);

  /* ======================================================
     API SAFE NEWS DATA
  ====================================================== */

 const safeNewsData =
  useMemo<
    SoccerNewsItem[]
  >(
    () =>
      Array.isArray(
        soccerNewsData
      )
        ? soccerNewsData
        : [],
    []
  );

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
          "Failed to load feed matches:",
          err
        );

        if (!mounted)
          return;

        setError(
          "Unable to load football feed."
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
     LOAD FOLLOWED TEAMS
  ====================================================== */

  useEffect(() => {
    try {
      const stored =
        loadMySoccerTeams();

      const ids =
        Array.isArray(
          stored?.teams
        )
          ? [
              ...stored.teams,
            ]
          : [];

      const teams =
        ids.map(
          (id) =>
            (id || "")
              .replace(
                /-/g,
                " "
              )
              .replace(
                /\b\w/g,
                (c) =>
                  c.toUpperCase()
              )
        );

      setTeamNames(
        teams
      );
    } catch (
      err
    ) {
      console.error(
        "Failed to load followed teams:",
        err
      );

      setTeamNames([]);
    }
  }, []);

  /* ======================================================
     PERSONALIZED FEED
  ====================================================== */

  const myFeed:
    SoccerNewsItem[] =
    useMemo(() => {
      const tags =
        teamNames.map(
          normalize
        );

      return safeNewsData.filter(
        (item) =>
          Array.isArray(
            item.tags
          ) &&
          item.tags.some(
            (tag) =>
              tags.includes(
                normalize(
                  tag ||
                    ""
                )
              )
          )
      );
    }, [
      teamNames,
      safeNewsData,
    ]);

  /* ======================================================
     LIVE MATCHES
  ====================================================== */

  const liveMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.status ===
          "live"
      );
    }, [matches]);

  /* ======================================================
     TRENDING MATCHES
  ====================================================== */

  const trendingMatches =
    useMemo(() => {
      return (
        getTrendingMatches(
          matches,
          3
        ) || []
      );
    }, [matches]);

  return (
    <PageWrapper>
      <main className={styles.page}>
        {/* ======================================================
            HERO
        ====================================================== */}

        <section
          className={
            styles.hero
          }
        >
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
              <span
                className={
                  styles.liveDot
                }
              />

              Personalized
              Football
              Intelligence
            </div>

            <h1>
              My Football
              <br />
              Feed
            </h1>

            <p>
              Personalized
              match
              intelligence,
              tournament
              momentum,
              breaking
              football
              stories and
              live updates
              from the
              nations you
              follow.
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
                    teamNames.length
                  }
                </strong>

                <span>
                  Teams
                  Following
                </span>
              </div>

              <div
                className={
                  styles.heroStat
                }
              >
                <strong>
                  {
                    liveMatches.length
                  }
                </strong>

                <span>
                  Live
                  Matches
                </span>
              </div>

              <div
                className={
                  styles.heroStat
                }
              >
                <strong>
                  {
                    myFeed.length
                  }
                </strong>

                <span>
                  Feed
                  Stories
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            LOADING
        ====================================================== */}

        {loading && (
          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.emptyState
              }
            >
              <h2>
                Loading
                Personalized
                Feed...
              </h2>

              <p>
                Synchronizing
                live football
                intelligence,
                tournament
                activity and
                personalized
                match data.
              </p>
            </div>
          </section>
        )}

        {/* ======================================================
            ERROR
        ====================================================== */}

        {!loading &&
          error && (
            <section
              className={
                styles.section
              }
            >
              <div
                className={
                  styles.emptyState
                }
              >
                <h2>
                  Feed
                  Temporarily
                  Unavailable
                </h2>

                <p>
                  Football
                  intelligence
                  systems are
                  reconnecting.
                  Please try
                  again
                  shortly.
                </p>
              </div>
            </section>
          )}

        {/* ======================================================
            CONTENT
        ====================================================== */}

        {!loading && (
          <section
            className={
              styles.content
            }
          >
            {/* ======================================================
                LIVE FOR YOU
            ====================================================== */}

            <section
              className={
                styles.section
              }
            >
              <div
                className={
                  styles.sectionHeader
                }
              >
                <h2>
                  🔴 Live For
                  You
                </h2>

                <p>
                  Real-time
                  football
                  moments,
                  momentum
                  swings and
                  trending
                  fixtures
                  from around
                  the world.
                </p>
              </div>

              <div
                className={
                  styles.liveGrid
                }
              >
                {trendingMatches.map(
                  (
                    match: SoccerMatch
                  ) => (
                    <article
                      key={
                        match.id ||
                        `${match.home}-${match.away}-${match.date}`
                      }
                      className={
                        styles.liveCard
                      }
                      onClick={() =>
                        navigate(
                          `/soccer/matches/${
                            match.id ||
                            "unknown-match"
                          }`
                        )
                      }
                    >
                      <div
                        className={
                          styles.liveCardTop
                        }
                      >
                        <div
                          className={
                            styles.liveBadge
                          }
                        >
                          Trending
                        </div>

                        <div
                          style={{
                            fontSize:
                              "0.8rem",

                            opacity:
                              0.7,
                          }}
                        >
                          {match.stage ||
                            "Tournament Match"}
                        </div>
                      </div>

                      <h3>
                        {match.home ||
                          "Home Team"}{" "}
                        vs{" "}
                        {match.away ||
                          "Away Team"}
                      </h3>

                      <p>
                        {match.stadium ||
                          "World Cup Stadium"}{" "}
                        •{" "}
                        {match.city ||
                          "Host City"}
                      </p>
                    </article>
                  )
                )}
              </div>
            </section>

            {/* ======================================================
                EMPTY STATES
            ====================================================== */}

            {teamNames.length ===
            0 ? (
              <section
                className={
                  styles.emptyState
                }
              >
                <h2>
                  No Teams
                  Selected
                </h2>

                <p>
                  Follow teams
                  to build
                  your
                  personalized
                  football
                  feed.
                </p>
              </section>
            ) : myFeed.length ===
              0 ? (
              <section
                className={
                  styles.emptyState
                }
              >
                <h2>
                  No Stories
                  Yet
                </h2>

                <p>
                  Stories
                  related to
                  your
                  followed
                  teams will
                  appear here
                  soon.
                </p>
              </section>
            ) : (
              /* ======================================================
                  FEED STORIES
              ====================================================== */

              <section
                className={
                  styles.section
                }
              >
                <div
                  className={
                    styles.sectionHeader
                  }
                >
                  <h2>
                    ⚽ Your
                    Stories
                  </h2>

                  <p>
                    Personalized
                    football
                    coverage
                    based on
                    your teams
                    and
                    tournament
                    interests.
                  </p>
                </div>

                <div
                  className={
                    styles.feedGrid
                  }
                >
                  {myFeed.map(
                    (
                      item
                    ) => (
                      <article
                        key={
                          item.id ||
                          item.title
                        }
                        className={
                          styles.feedCard
                        }
                        onClick={() =>
                          navigate(
                            "/soccer/news"
                          )
                        }
                      >
                        <div
                          className={
                            styles.feedMeta
                          }
                        >
                          <span>
                            {item.source ||
                              "Football News"}
                          </span>

                          <span>
                            {item.time ||
                              "Latest"}
                          </span>
                        </div>

                        <h2>
                          {item.title ||
                            "Football Story"}
                        </h2>

                        <p>
                          {item.excerpt ||
                            "Latest football developments and tournament coverage."}
                        </p>

                        <div
                          className={
                            styles.tags
                          }
                        >
                          {Array.isArray(
                            item.tags
                          ) &&
                            item.tags.map(
                              (
                                tag
                              ) => (
                                <span
                                  key={
                                    tag
                                  }
                                  className={
                                    styles.tag
                                  }
                                >
                                  #
                                  {tag ||
                                    "football"}
                                </span>
                              )
                            )}
                        </div>
                      </article>
                    )
                  )}
                </div>
              </section>
            )}
          </section>
        )}
      </main>
    </PageWrapper>
  );
}