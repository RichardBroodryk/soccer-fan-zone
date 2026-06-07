// src/pages/soccer/SoccerHomePage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "../../pages/HomePage.module.css";

import { useNavigate } from "react-router-dom";

import PageWrapper from "../../components/layout/PageWrapper";

import SoccerHeroCard from "../../components/homepage/SoccerHeroCard";

import InfoBar from "../../components/navigation/InfoBar";

import HubCard from "../../components/homepage/HubCard";

import AutoContentRail from "../../components/ui/AutoContentRail";

import SoccerExperienceRail from "../../components/soccer/SoccerExperienceRail";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import { worldCup2026 } from "../../data/soccer/worldCup2026";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* INTELLIGENCE */

import {
  getFeaturedMatch,
  getTrendingMatches,
  getUpsetMatches,
} from "../../utils/soccer/matchIntelligence";

import {
  getHotTeams,
} from "../../utils/soccer/momentumEngine";

import type {
  TeamMomentum,
} from "../../utils/soccer/momentumEngine";

/* MATCH THEMES */

import {
  getMatchTheme,
} from "../../utils/soccer/getMatchTheme";

/* IMAGES */

import featuredImage from "../../assets/soccer/media/featured-match.jpg";

import matchesImage from "../../assets/soccer/media/matches.jpg";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";

import StarIcon from "../../components/icons/StarIcon";

import UsersIcon from "../../components/icons/UsersIcon";

export default function SoccerHomePage() {
  const navigate = useNavigate();

  const [matches, setMatches] =
    useState<SoccerMatch[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* ======================================================
     LOAD MATCHES
  ====================================================== */

  useEffect(() => {
   async function loadMatches() {
  try {
    setLoading(true);

    const data =
      await getAllWorldCupMatches();

    setMatches(data);

    const teams =
      await getHotTeams(6);

    setHotTeams(
      teams
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

    loadMatches();
  }, []);

  /* ======================================================
     MATCH STATES
  ====================================================== */

  const liveMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.status === "live"
      );
    }, [matches]);

  const upcomingMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.status ===
          "upcoming"
      );
    }, [matches]);

  /* ======================================================
     INTELLIGENCE
  ====================================================== */

  const featuredMatch =
    useMemo(() => {
      return getFeaturedMatch(
        matches
      );
    }, [matches]);

  const trendingMatches =
    useMemo(() => {
      return getTrendingMatches(
        matches,
        8
      );
    }, [matches]);

  const upsetMatches =
    useMemo(() => {
      return getUpsetMatches(
        matches
      );
    }, [matches]);

 const [
  hotTeams,
  setHotTeams,
] = useState<
  TeamMomentum[]
>([]);

  /* ======================================================
     DATES
  ====================================================== */

  const openingDate =
    new Date(
      worldCup2026.startDate
    );

  const finalDate = new Date(
    worldCup2026.endDate
  );

  const today = new Date();

  const daysUntilOpening =
    Math.max(
      0,
      Math.ceil(
        (openingDate.getTime() -
          today.getTime()) /
          (1000 *
            60 *
            60 *
            24)
      )
    );

  const daysUntilFinal =
    Math.max(
      0,
      Math.ceil(
        (finalDate.getTime() -
          today.getTime()) /
          (1000 *
            60 *
            60 *
            24)
      )
    );

  return (
    <PageWrapper
      imageUrl={backgroundLight}
    >
      <main className={styles.page}>
        {/* HERO */}

        <SoccerHeroCard />

        {/* INFO BAR */}

        <InfoBar variant="premium" />

        {/* LOADING */}

        {loading && (
          <section
            className={
              styles.railSection
            }
          >
            <div
              className={
                styles.countdownCard
              }
            >
              Loading World Cup
              data...
            </div>
          </section>
        )}

        {!loading && (
          <>
            {/* COUNTDOWN */}

            <section
              className={
                styles.railSection
              }
            >
              <div
                className={
                  styles.countdownCard
                }
              >
                <div
                  className={
                    styles.countdownGrid
                  }
                >
                  <div>
                    <div
                      style={{
                        opacity:
                          0.72,

                        marginBottom:
                          "10px",
                      }}
                    >
                      Opening Match
                      Countdown
                    </div>

                    <h2
                      style={{
                        margin: 0,

                        fontSize:
                          "3rem",

                        fontWeight: 900,
                      }}
                    >
                      {
                        daysUntilOpening
                      }{" "}
                      Days
                    </h2>
                  </div>

                  <div>
                    <div
                      style={{
                        opacity:
                          0.72,

                        marginBottom:
                          "10px",
                      }}
                    >
                      Featured Match
                    </div>

                    <h3
                      style={{
                        margin: 0,

                        fontSize:
                          "1.5rem",
                      }}
                    >
                      {featuredMatch
                        ? `${featuredMatch.home} vs ${featuredMatch.away}`
                        : "World Cup 2026"}
                    </h3>
                  </div>

                  <div>
                    <div
                      style={{
                        opacity:
                          0.72,

                        marginBottom:
                          "10px",
                      }}
                    >
                      Tournament
                      Final
                    </div>

                    <h3
                      style={{
                        margin: 0,

                        fontSize:
                          "1.5rem",
                      }}
                    >
                      {
                        daysUntilFinal
                      }{" "}
                      Days Remaining
                    </h3>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        navigate(
                          "/soccer/matches"
                        )
                      }
                      style={{
                        border:
                          "none",

                        background:
                          "#2563eb",

                        color:
                          "#ffffff",

                        padding:
                          "16px 22px",

                        borderRadius:
                          "18px",

                        fontWeight: 800,

                        cursor:
                          "pointer",

                        width:
                          "100%",
                      }}
                    >
                      Explore
                      Tournament
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* LIVE NOW */}

            {liveMatches.length >
              0 && (
              <section
                className={
                  styles.railSection
                }
              >
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    marginBottom:
                      "18px",
                  }}
                >
                  <h2
                    className={
                      styles.sectionTitle
                    }
                  >
                    🔴 Live Now
                  </h2>
                </div>

                <AutoContentRail>
                  {liveMatches.map(
                    (
                      match
                    ) => (
                      <HubCard
                        key={
                          match.id
                        }
                        live
                        split
                        accent={
                          getMatchTheme(
                            {
                              home:
                                match.home,

                              away:
                                match.away,

                              status:
                                match.status,

                              stage:
                                match.stage,
                            }
                          ).accent
                        }
                        title={`${match.home} vs ${match.away}`}
                        image={
                          getMatchTheme(
                            {
                              home:
                                match.home,

                              away:
                                match.away,

                              status:
                                match.status,

                              stage:
                                match.stage,
                            }
                          )
                            .homeFlag ||
                          matchesImage
                        }
                        to={`/soccer/matches/${match.id}`}
                        features={[
                          {
                            label: `${match.homeScore ?? 0} : ${match.awayScore ?? 0}`,

                            icon:
                              <StarIcon />,
                          },

                          {
                            label: `${match.minute}' LIVE`,

                            icon:
                              <CalendarIcon />,
                          },
                        ]}
                      />
                    )
                  )}
                </AutoContentRail>
              </section>
            )}

            {/* SHOCK RESULTS */}

            {upsetMatches.length >
              0 && (
              <section
                className={
                  styles.railSection
                }
              >
                <div
                  style={{
                    marginBottom:
                      "28px",
                  }}
                >
                  <h2
                    className={
                      styles.sectionTitle
                    }
                  >
                    ⚠️ Shock
                    Results
                  </h2>
                </div>

                <AutoContentRail>
                  {upsetMatches.map(
                    (
                      match
                    ) => (
                      <HubCard
                        key={
                          match.id
                        }
                        danger
                        split
                        accent={
                          getMatchTheme(
                            {
                              home:
                                match.home,

                              away:
                                match.away,

                              status:
                                match.status,

                              stage:
                                match.stage,
                            }
                          ).accent
                        }
                        title={`${match.home} ${match.homeScore} - ${match.awayScore} ${match.away}`}
                        image={
                          getMatchTheme(
                            {
                              home:
                                match.home,

                              away:
                                match.away,

                              status:
                                match.status,

                              stage:
                                match.stage,
                            }
                          )
                            .awayFlag ||
                          matchesImage
                        }
                        to={`/soccer/matches/${match.id}`}
                        features={[
                          {
                            label:
                              "Tournament Upset",

                            icon:
                              <StarIcon />,
                          },

                          {
                            label:
  match.stage ||
  "World Cup",

                            icon:
                              <CalendarIcon />,
                          },
                        ]}
                      />
                    )
                  )}
                </AutoContentRail>
              </section>
            )}

            {/* FEATURED MATCH */}

            {featuredMatch && (
              <section
                className={
                  styles.railSection
                }
              >
                <div
                  style={{
                    marginBottom:
                      "18px",
                  }}
                >
                  <h2
                    className={
                      styles.sectionTitle
                    }
                  >
                    🔥 Featured
                    Match
                  </h2>
                </div>

                <HubCard
                  featured
                  split
                  accent={
                    getMatchTheme(
                      {
                        home:
                          featuredMatch.home,

                        away:
                          featuredMatch.away,

                        status:
                          featuredMatch.status,

                        stage:
                          featuredMatch.stage,
                      }
                    ).accent
                  }
                  title={`${featuredMatch.home} vs ${featuredMatch.away}`}
                  image={
                    getMatchTheme(
                      {
                        home:
                          featuredMatch.home,

                        away:
                          featuredMatch.away,

                        status:
                          featuredMatch.status,

                        stage:
                          featuredMatch.stage,
                      }
                    ).homeFlag ||
                    featuredImage
                  }
                  to={`/soccer/matches/${featuredMatch.id}`}
                  features={[
                    {
                     label:
  featuredMatch.date ||
  "World Cup 2026",

                      icon:
                        <CalendarIcon />,
                    },

                    {
                      label:
  featuredMatch.stage ||
  "Tournament Match",

                      icon:
                        <StarIcon />,
                    },

                    {
                      label:
  featuredMatch.stadium ||
  "World Cup Stadium",

                      icon:
                        <UsersIcon />,
                    },
                  ]}
                />
              </section>
            )}

            {/* UPCOMING */}

            <section
              className={
                styles.railSection
              }
            >
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "28px",
                }}
              >
                <h2
                  className={
                    styles.sectionTitle
                  }
                >
                  🔥 Upcoming
                  Fixtures
                </h2>
              </div>

              <AutoContentRail>
                {upcomingMatches.map(
                  (
                    match
                  ) => (
                    <HubCard
                      key={
                        match.id
                      }
                      split
                      accent={
                        getMatchTheme(
                          {
                            home:
                              match.home,

                            away:
                              match.away,

                            status:
                              match.status,

                            stage:
                              match.stage,
                          }
                        ).accent
                      }
                      title={`${match.home} vs ${match.away}`}
                      image={
                        getMatchTheme(
                          {
                            home:
                              match.home,

                            away:
                              match.away,

                            status:
                              match.status,

                            stage:
                              match.stage,
                          }
                        )
                          .homeFlag ||
                        featuredImage
                      }
                      to={`/soccer/matches/${match.id}`}
                      features={[
                        {
                          label:
  match.date ||
  "Upcoming Fixture",

                          icon:
                            <CalendarIcon />,
                        },

                        {
                          label:
  match.stadium ||
  "World Cup Stadium",

                          icon:
                            <StarIcon />,
                        },
                      ]}
                    />
                  )
                )}
              </AutoContentRail>
            </section>

           {/* TRENDING */}
            
            <section
              className={
                styles.railSection
              }
            >
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "28px",
                }}
              >
                <h2
                  className={
                    styles.sectionTitle
                  }
                >
                  📈 Trending
                  Matches
                </h2>
              </div>

              <AutoContentRail>
                {trendingMatches.map(
                  (
                    match
                  ) => (
                    <HubCard
                      key={
                        match.id
                      }
                      split
                      accent={
                        getMatchTheme(
                          {
                            home:
                              match.home,

                            away:
                              match.away,

                            status:
                              match.status,

                            stage:
                              match.stage,
                          }
                        ).accent
                      }
                      title={`${match.home} vs ${match.away}`}
                      image={
                        getMatchTheme(
                          {
                            home:
                              match.home,

                            away:
                              match.away,

                            status:
                              match.status,

                            stage:
                              match.stage,
                          }
                        )
                          .homeFlag ||
                        matchesImage
                      }
                      to={`/soccer/matches/${match.id}`}
                      features={[
                        {
                          label:
  match.stage ||
  "Tournament Match",

                          icon:
                            <StarIcon />,
                        },

                        {
                          label:
                            match.date,

                          icon:
                            <CalendarIcon />,
                        },

                        {
                          label:
  match.stadium ||
  "World Cup Stadium",

                          icon:
                            <UsersIcon />,
                        },
                      ]}
                    />
                  )
                )}
              </AutoContentRail>
            </section>

            {/* EXPERIENCE */}

            <SoccerExperienceRail />

            {/* HOT TEAMS */}

            <section
              className={
                styles.railSection
              }
            >
              <div
                style={{
                  marginBottom:
                    "28px",
                }}
              >
                <h2
                  className={
                    styles.sectionTitle
                  }
                >
                  🔥 Tournament
                  Favorites
                </h2>
              </div>

              <div
                className={
                  styles.sectionGrid
                }
              >
                {hotTeams.map(
                  (
                    team
                  ) => (
                    <div
                      key={
                        team.nation
                      }
                      onClick={() =>
                        navigate(
                          `/soccer/teams/${team.nation
                            .toLowerCase()
                            .replace(
                              /\s/g,
                              "-"
                            )}`
                        )
                      }
                      className={
                        styles.hotTeamCard
                      }
                    >
                      <div
                        className={
                          styles.hotTeamTop
                        }
                      >
                        <div
                          className={
                            styles.hotTeamTitle
                          }
                        >
                          {
                            team.nation
                          }
                        </div>

                        <div
                          className={
                            styles.hotTeamBadge
                          }
                        >
                          {
                            team.trend
                          }
                        </div>
                      </div>

                      <div
                        className={
                          styles.hotTeamStats
                        }
                      >
                        <div>
                          <div
                            className={
                              styles.metricLabel
                            }
                          >
                            Overall
                          </div>

                          <div
                            className={
                              styles.metricLarge
                            }
                          >
                            {
                              team.overallRating
                            }
                          </div>
                        </div>

                        <div>
                          <div
                            className={
                              styles.metricLabel
                            }
                          >
                            Momentum
                          </div>

                          <div
                            className={
                              styles.metricLarge
                            }
                          >
                            {
                              team.momentumScore
                            }
                          </div>
                        </div>

                        <div>
                          <div
                            className={
                              styles.metricLabel
                            }
                          >
                            Attack
                          </div>

                          <div
                            className={
                              styles.metricMedium
                            }
                          >
                            {
                              team.attackRating
                            }
                          </div>
                        </div>

                        <div>
                          <div
                            className={
                              styles.metricLabel
                            }
                          >
                            Defense
                          </div>

                          <div
                            className={
                              styles.metricMedium
                            }
                          >
                            {
                              team.defenseRating
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </PageWrapper>
  );
}