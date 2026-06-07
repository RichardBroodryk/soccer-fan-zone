// src/pages/soccer/SoccerResultsPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "../ResultsPage.module.css";

import heroBg from "../../assets/soccer/heroes/results-hero.jpg";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

type ResultsFilter =
  | "all"
  | "group"
  | "knockout";

export default function SoccerResultsPage() {
  const navigate =
    useNavigate();

  const [filter, setFilter] =
    useState<ResultsFilter>(
      "all"
    );

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

  /* ======================================================
     LOAD MATCHES
     ====================================================== */

  useEffect(() => {
    async function loadMatches() {
      try {
        const data =
          await getAllWorldCupMatches();

        console.log(
          "RESULTS:",
          data
        );

        setAllMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  /* ======================================================
     FINAL MATCHES
     ====================================================== */

  const completedMatches =
    useMemo(() => {
      return allMatches
        .filter(
          (match) =>
            match.status ===
            "final"
        )
        .sort(
          (a, b) =>
            new Date(
              b.date
            ).getTime() -
            new Date(
              a.date
            ).getTime()
        );
    }, [allMatches]);

  /* ======================================================
     FILTER LOGIC
     ====================================================== */

  const filteredMatches =
    useMemo(() => {
      if (
        filter === "group"
      ) {
        return completedMatches.filter(
          (match) =>
            match.stage ===
            "Group Stage"
        );
      }

      if (
        filter ===
        "knockout"
      ) {
        return completedMatches.filter(
          (match) =>
            match.stage !==
            "Group Stage"
        );
      }

      return completedMatches;
    }, [
      filter,
      completedMatches,
    ]);

  /* ======================================================
     GROUP BY STAGE
     ====================================================== */

  const groupedMatches =
    useMemo(() => {
      return filteredMatches.reduce(
        (acc, match) => {
          const stage =
            match.stage ||
            "World Cup";

          if (!acc[stage]) {
            acc[stage] = [];
          }

          acc[stage].push(
            match
          );

          return acc;
        },
        {} as Record<
          string,
          SoccerMatch[]
        >
      );
    }, [filteredMatches]);

  const latestResult =
    filteredMatches[0];

  function getWinner(
    match: SoccerMatch
  ) {
    if (
      (match.homeScore ??
        0) >
      (match.awayScore ??
        0)
    ) {
      return match.home;
    }

    if (
      (match.awayScore ??
        0) >
      (match.homeScore ??
        0)
    ) {
      return match.away;
    }

    return "Draw";
  }

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main
        className={
          styles.page
        }
      >
        {loading && (
          <div
            style={{
              padding:
                "40px",

              fontWeight: 800,
            }}
          >
            Loading World
            Cup results...
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
            <h1>
              World Cup
              Results
            </h1>

            <p>
              Completed
              fixtures,
              final scores and
              match outcomes
              from FIFA World
              Cup 2026.
            </p>
          </div>
        </header>

        {/* BACK */}

        <div
          className={
            styles.backWrap
          }
        >
          <button
            className={
              styles.back
            }
            onClick={() =>
              navigate(
                "/soccer/match-center"
              )
            }
          >
            ← Back to Match
            Center
          </button>
        </div>

        {/* LATEST RESULT */}

        {latestResult && (
          <section
            className={
              styles.section
            }
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, #111827, #1f2937)",

                borderRadius:
                  "28px",

                padding:
                  "34px",

                color:
                  "#ffffff",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  marginBottom:
                    "22px",
                }}
              >
                <div
                  style={{
                    opacity: 0.72,

                    marginBottom:
                      "10px",

                    fontWeight: 700,

                    letterSpacing:
                      "0.08em",

                    textTransform:
                      "uppercase",
                  }}
                >
                  Latest Final
                  Result
                </div>

                <h2
                  style={{
                    margin: 0,

                    fontSize:
                      "2.4rem",

                    fontWeight: 900,
                  }}
                >
                  {
                    latestResult.home
                  }{" "}
                  {
                    latestResult.homeScore
                  }{" "}
                  :{" "}
                  {
                    latestResult.awayScore
                  }{" "}
                  {
                    latestResult.away
                  }
                </h2>
              </div>

              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",

                  gap: "18px",
                }}
              >
                <div>
                  <strong>
                    Winner
                  </strong>
                  <br />
                  {getWinner(
                    latestResult
                  )}
                </div>

                <div>
                  <strong>
                    Stage
                  </strong>
                  <br />
                  {
                    latestResult.stage
                  }
                </div>

                <div>
                  <strong>
                    Venue
                  </strong>
                  <br />
                  {
                    latestResult.stadium
                  }
                </div>

                <div>
                  <strong>
                    Date
                  </strong>
                  <br />
                  {
                    latestResult.date
                  }
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FILTERS */}

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
              display:
                "flex",

              gap: "12px",

              flexWrap:
                "wrap",
            }}
          >
            {[
              {
                id: "all",
                label:
                  "All Results",
              },

              {
                id: "group",
                label:
                  "Group Stage",
              },

              {
                id: "knockout",
                label:
                  "Knockout",
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setFilter(
                    item.id as ResultsFilter
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
                    filter ===
                    item.id
                      ? "#111827"
                      : "#e5e7eb",

                  color:
                    filter ===
                    item.id
                      ? "#ffffff"
                      : "#111827",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* RESULTS COUNT */}

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
              background:
                "#ffffff",

              borderRadius:
                "18px",

              padding: "22px",

              boxShadow:
                "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize:
                  "2rem",

                fontWeight: 900,

                marginBottom:
                  "8px",
              }}
            >
              {
                filteredMatches.length
              }
            </div>

            <div
              style={{
                color:
                  "#6b7280",

                fontWeight: 600,
              }}
            >
              Completed
              Matches
            </div>
          </div>
        </section>

        {/* RESULTS */}

        <section
          className={
            styles.section
          }
        >
          {filteredMatches.length ===
          0 ? (
            <div
              className={
                styles.empty
              }
            >
              No completed
              matches
              available.
            </div>
          ) : (
            Object.entries(
              groupedMatches
            ).map(
              ([
                stage,
                stageMatches,
              ]) => (
                <div
                  key={stage}
                  style={{
                    marginBottom:
                      "42px",
                  }}
                >
                  {/* STAGE HEADER */}

                  <div
                    style={{
                      marginBottom:
                        "20px",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,

                        fontSize:
                          "2rem",

                        fontWeight: 900,
                      }}
                    >
                      {stage}
                    </h2>

                    <div
                      style={{
                        marginTop:
                          "8px",

                        color:
                          "#6b7280",
                      }}
                    >
                      {
                        stageMatches.length
                      }{" "}
                      result
                      {stageMatches.length !==
                      1
                        ? "s"
                        : ""}
                    </div>
                  </div>

                  {/* MATCH ROWS */}

                  <div
                    style={{
                      display:
                        "flex",

                      flexDirection:
                        "column",

                      gap: "18px",
                    }}
                  >
                    {stageMatches.map(
                      (
                        match
                      ) => (
                        <SoccerMatchRow
                          key={
                            match.id
                          }
                          match={
                            match
                          }
                          onClick={() =>
                            navigate(
                              `/soccer/matches/${match.id}`
                            )
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )
            )
          )}
        </section>
      </main>
    </PageWrapper>
  );
}