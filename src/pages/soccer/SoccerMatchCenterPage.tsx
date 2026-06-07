// src/pages/soccer/SoccerMatchCenterPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../MatchCenterPage.module.css";

import MatchCenterNav from "../../components/match/MatchCenterNav";

import PageWrapper from "../../components/layout/PageWrapper";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import heroBg from "../../assets/soccer/heroes/match-center-hero.jpg";
import backgroundImage from "../../assets/soccer/ui/background-light.png";

import liveScoresImg from "../../assets/soccer/heroes/live-scores.jpg";
import fixturesImg from "../../assets/soccer/heroes/fixtures-soccer.jpg";
import resultsImg from "../../assets/soccer/heroes/results-hero.jpg";
import statsImg from "../../assets/soccer/heroes/stats-hero.jpg";

import HubCard from "../../components/homepage/HubCard";
import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import UsersIcon from "../../components/icons/UsersIcon";

export default function SoccerMatchCenterPage() {
  const navigate = useNavigate();

  const [
    allMatches,
    setAllMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      try {
        const data =
          await getAllWorldCupMatches();

        if (!mounted) {
          return;
        }

        setAllMatches(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(err);

        if (mounted) {
          setAllMatches([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMatches();

    const interval =
      setInterval(() => {
        loadMatches();
      }, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const liveMatches = useMemo(() => {
    return allMatches.filter(
      (match: SoccerMatch) =>
        match.status === "live"
    );
  }, [allMatches]);

  const upcomingMatches =
    useMemo(() => {
      return allMatches.filter(
        (match: SoccerMatch) =>
          match.status ===
          "upcoming"
      );
    }, [allMatches]);

  const completedMatches =
    useMemo(() => {
      return allMatches.filter(
        (match: SoccerMatch) =>
          match.status ===
          "final"
      );
    }, [allMatches]);

  const totalGoals =
    useMemo(() => {
      return allMatches.reduce(
        (
          total: number,
          match: SoccerMatch
        ) => {
          return (
            total +
            (match.homeScore ??
              0) +
            (match.awayScore ??
              0)
          );
        },
        0
      );
    }, [allMatches]);

  const featuredLiveMatch =
    liveMatches[0];

  const latestResults =
    completedMatches.slice(0, 3);

  const nextFixtures =
    upcomingMatches.slice(0, 3);

  return (
    <PageWrapper
      imageUrl={
        backgroundImage
      }
    >
      <main
        className={styles.page}
      >
        {loading && (
          <div
            style={{
              padding:
                "40px",

              fontWeight: 800,
            }}
          >
            Loading live World
            Cup data...
          </div>
        )}

        {/* HERO */}

        <header
          className={
            styles.hero
          }
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
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
            {liveMatches.length >
              0 && (
              <div
                style={{
                  display:
                    "inline-flex",

                  alignItems:
                    "center",

                  gap: "10px",

                  padding:
                    "10px 18px",

                  borderRadius:
                    "999px",

                  background:
                    "rgba(220,38,38,0.92)",

                  color:
                    "#ffffff",

                  fontWeight: 900,

                  marginBottom:
                    "20px",

                  letterSpacing:
                    "0.08em",
                }}
              >
                <span
                  style={{
                    width:
                      "10px",

                    height:
                      "10px",

                    borderRadius:
                      "999px",

                    background:
                      "#ffffff",
                  }}
                />

                LIVE NOW •{" "}
                {
                  liveMatches.length
                }{" "}
                MATCH
                {liveMatches.length >
                1
                  ? "ES"
                  : ""}
              </div>
            )}

            <h1>
              Global Football
              World Cup 2026
              Match Center
            </h1>

            <p>
              Live scores,
              fixtures,
              results and
              tournament
              coverage from
              across the
              Football World
              Cup 2026.
            </p>
          </div>
        </header>

        {/* NAV */}

        <section
          className={
            styles.section
          }
        >
          <MatchCenterNav />
        </section>

        {/* SNAPSHOT */}

        <section
          className={
            styles.section
          }
          style={{
            paddingTop: 0,
          }}
        >
          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",

              gap: "20px",
            }}
          >
            {[
              {
                label:
                  "Live Matches",

                value:
                  liveMatches.length,

                dark: true,
              },

              {
                label:
                  "Upcoming Fixtures",

                value:
                  upcomingMatches.length,
              },

              {
                label:
                  "Completed Matches",

                value:
                  completedMatches.length,
              },

              {
                label:
                  "Tournament Goals",

                value:
                  totalGoals,
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  style={{
                    background:
                      item.dark
                        ? "linear-gradient(135deg, #111827, #1f2937)"
                        : "#ffffff",

                    color:
                      item.dark
                        ? "#ffffff"
                        : "#111827",

                    borderRadius:
                      "24px",

                    padding:
                      "28px",

                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "0.92rem",

                      opacity:
                        item.dark
                          ? 0.72
                          : 1,

                      color:
                        item.dark
                          ? "#ffffff"
                          : "#6b7280",

                      marginBottom:
                        "12px",
                    }}
                  >
                    {
                      item.label
                    }
                  </div>

                  <div
                    style={{
                      fontSize:
                        "3rem",

                      fontWeight: 900,
                    }}
                  >
                    {
                      item.value
                    }
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* FEATURED LIVE */}

        {featuredLiveMatch && (
          <section
            className={
              styles.section
            }
            style={{
              paddingTop: 0,
            }}
          >
            <div
              style={{
                marginBottom:
                  "22px",
              }}
            >
              <h2
                className={
                  styles.sectionTitle
                }
              >
                Featured Live
                Match
              </h2>
            </div>

            <SoccerMatchRow
              match={
                featuredLiveMatch
              }
              onClick={() =>
                navigate(
                  `/soccer/matches/${featuredLiveMatch.id}`
                )
              }
            />
          </section>
        )}

        {/* QUICK ACCESS */}

        <section
          className={
            styles.section
          }
          style={{
            paddingTop: 0,
          }}
        >
          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",

              gap: "24px",
            }}
          >
            <HubCard
              title="Live Matches"
              image={
                liveScoresImg
              }
              to="/soccer/live"
              features={[
                {
                  label: `${liveMatches.length} Live`,
                  icon:
                    <UsersIcon />,
                },

                {
                  label:
                    "Real-Time Scores",

                  icon:
                    <StarIcon />,
                },

                {
                  label:
                    "Match Events",

                  icon:
                    <CalendarIcon />,
                },
              ]}
            />

            <HubCard
              title="Fixtures"
              image={
                fixturesImg
              }
              to="/soccer/fixtures"
              features={[
                {
                  label: `${upcomingMatches.length} Matches`,
                  icon:
                    <CalendarIcon />,
                },

                {
                  label:
                    "Group Stage",

                  icon:
                    <StarIcon />,
                },

                {
                  label:
                    "Knockout Games",

                  icon:
                    <UsersIcon />,
                },
              ]}
            />

            <HubCard
              title="Results"
              image={
                resultsImg
              }
              to="/soccer/results"
              features={[
                {
                  label: `${completedMatches.length} Results`,
                  icon:
                    <CalendarIcon />,
                },

                {
                  label:
                    "Final Scores",

                  icon:
                    <StarIcon />,
                },

                {
                  label:
                    "Match Reports",

                  icon:
                    <UsersIcon />,
                },
              ]}
            />

            <HubCard
              title="Stats"
              image={statsImg}
              to="/soccer/stats"
              features={[
                {
                  label:
                    "Tournament Data",

                  icon:
                    <CalendarIcon />,
                },

                {
                  label:
                    "Standings",

                  icon:
                    <StarIcon />,
                },

                {
                  label:
                    "Performance Metrics",

                  icon:
                    <UsersIcon />,
                },
              ]}
            />
          </div>
        </section>

        {/* LIVE NOW */}

        {liveMatches.length >
          0 && (
          <section
            className={
              styles.section
            }
          >
            <div
              style={{
                marginBottom:
                  "22px",
              }}
            >
              <h2
                className={
                  styles.sectionTitle
                }
              >
                Live Now
              </h2>
            </div>

            <div
              style={{
                display:
                  "flex",

                flexDirection:
                  "column",

                gap: "18px",
              }}
            >
              {liveMatches.map(
                (match) => (
                  <SoccerMatchRow
                    key={
                      match.id
                    }
                    match={match}
                    onClick={() =>
                      navigate(
                        `/soccer/matches/${match.id}`
                      )
                    }
                  />
                )
              )}
            </div>
          </section>
        )}

        {/* FIXTURES */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              marginBottom:
                "22px",

              gap: "18px",

              flexWrap:
                "wrap",
            }}
          >
            <h2
              className={
                styles.sectionTitle
              }
            >
              Upcoming
              Fixtures
            </h2>

            <button
              onClick={() =>
                navigate(
                  "/soccer/fixtures"
                )
              }
              style={{
                border:
                  "none",

                borderRadius:
                  "999px",

                padding:
                  "12px 18px",

                cursor:
                  "pointer",

                fontWeight: 800,

                background:
                  "#111827",

                color:
                  "#ffffff",
              }}
            >
              View All
              Fixtures
            </button>
          </div>

          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap: "18px",
            }}
          >
            {nextFixtures.map(
              (match) => (
                <SoccerMatchRow
                  key={
                    match.id
                  }
                  match={match}
                  onClick={() =>
                    navigate(
                      `/soccer/matches/${match.id}`
                    )
                  }
                />
              )
            )}
          </div>
        </section>

        {/* RESULTS */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              marginBottom:
                "22px",

              gap: "18px",

              flexWrap:
                "wrap",
            }}
          >
            <h2
              className={
                styles.sectionTitle
              }
            >
              Latest Results
            </h2>

            <button
              onClick={() =>
                navigate(
                  "/soccer/results"
                )
              }
              style={{
                border:
                  "none",

                borderRadius:
                  "999px",

                padding:
                  "12px 18px",

                cursor:
                  "pointer",

                fontWeight: 800,

                background:
                  "#111827",

                color:
                  "#ffffff",
              }}
            >
              View All
              Results
            </button>
          </div>

          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap: "18px",
            }}
          >
            {latestResults.map(
              (match) => (
                <SoccerMatchRow
                  key={
                    match.id
                  }
                  match={match}
                  onClick={() =>
                    navigate(
                      `/soccer/matches/${match.id}`
                    )
                  }
                />
              )
            )}
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}