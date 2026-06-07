// src/pages/soccer/SoccerFixturesPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../FixturesPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import heroBg from "../../assets/soccer/heroes/fixtures-soccer.jpg";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

type FixtureFilter =
  | "all"
  | "upcoming"
  | "live"
  | "final";

export default function SoccerFixturesPage() {
  const navigate = useNavigate();

  const [filter, setFilter] =
    useState<FixtureFilter>("upcoming");

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
          "WORLD CUP FIXTURES:",
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
     SORT MATCHES
     ====================================================== */

  const sortedMatches =
    useMemo(() => {
      return [...allMatches].sort(
        (a, b) =>
          new Date(
            a.date
          ).getTime() -
          new Date(
            b.date
          ).getTime()
      );
    }, [allMatches]);

  /* ======================================================
     FILTER MATCHES
     ====================================================== */

  const filteredMatches =
    useMemo(() => {
      if (
        filter === "all"
      ) {
        return sortedMatches;
      }

      return sortedMatches.filter(
        (match) =>
          match.status ===
          filter
      );
    }, [
      filter,
      sortedMatches,
    ]);

  /* ======================================================
     GROUP BY STAGE
     ====================================================== */

  const groupedMatches =
    useMemo(() => {
      return filteredMatches.reduce<
        Record<
          string,
          SoccerMatch[]
        >
      >((acc, match) => {
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
      }, {});
    }, [filteredMatches]);

  /* ======================================================
     FILTER BUTTONS
     ====================================================== */

  const filterButtons: FixtureFilter[] =
    [
      "all",
      "upcoming",
      "live",
      "final",
    ];

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
            Cup fixtures...
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
                  "rgba(37,99,235,0.92)",

                color:
                  "#ffffff",

                fontWeight: 900,

                marginBottom:
                  "18px",

                letterSpacing:
                  "0.08em",

                boxShadow:
                  "0 8px 28px rgba(37,99,235,0.35)",
              }}
            >
              WORLD CUP 2026
            </div>

            <h1>
              World Cup
              Fixtures
            </h1>

            <p>
              Explore the
              complete Global
              World Cup 2026
              schedule across
              all stages of
              the tournament.
            </p>
          </div>
        </header>

        {/* BACK */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "center",

            marginTop: "18px",

            marginBottom:
              "42px",
          }}
        >
          <button
            onClick={() =>
              navigate(
                "/soccer/match-center"
              )
            }
            style={{
              border: "none",

              background:
                "#2563eb",

              color:
                "#ffffff",

              padding:
                "14px 24px",

              borderRadius:
                "999px",

              fontWeight: 800,

              fontSize:
                "0.95rem",

              cursor:
                "pointer",

              boxShadow:
                "0 12px 30px rgba(37,99,235,0.28)",

              transition:
                "all 0.2s ease",
            }}
          >
            ← Back to Match
            Center
          </button>
        </div>

        {/* FILTERS */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              display:
                "flex",

              gap: "12px",

              flexWrap:
                "wrap",

              marginBottom:
                "24px",
            }}
          >
            {filterButtons.map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setFilter(
                      item
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

                    textTransform:
                      "capitalize",

                    background:
                      filter ===
                      item
                        ? "#111827"
                        : "rgba(255,255,255,0.85)",

                    color:
                      filter ===
                      item
                        ? "#ffffff"
                        : "#111827",

                    boxShadow:
                      "0 10px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </section>

        {/* FIXTURE COUNT */}

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
                "linear-gradient(135deg, #111827, #1f2937)",

              borderRadius:
                "30px",

              padding:
                "34px",

              marginBottom:
                "30px",

              color:
                "#ffffff",

              boxShadow:
                "0 20px 50px rgba(0,0,0,0.22)",

              border:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize:
                  "3rem",

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
                fontWeight: 700,

                opacity: 0.82,
              }}
            >
              Fixtures Found
            </div>
          </div>
        </section>

        {/* MATCHES */}

        <section
          className={
            styles.section
          }
          style={{
            paddingTop: 0,
          }}
        >
          {filteredMatches.length ===
          0 ? (
            <div
              className={
                styles.empty
              }
            >
              No fixtures
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
                      "48px",
                  }}
                >
                  {/* STAGE HEADER */}

                  <div
                    style={{
                      marginBottom:
                        "22px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize:
                          "2rem",

                        fontWeight: 900,

                        marginBottom:
                          "8px",

                        color:
                          "#111827",
                      }}
                    >
                      {stage}
                    </h2>

                    <div
                      style={{
                        color:
                          "#4b5563",

                        fontWeight: 600,
                      }}
                    >
                      {
                        stageMatches.length
                      }{" "}
                      match
                      {stageMatches.length !==
                      1
                        ? "es"
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