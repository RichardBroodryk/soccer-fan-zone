// src/pages/soccer/SoccerGroupsPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../StatsPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

/* DATA */

import { groups } from "../../data/soccer/groups";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* UTILS */

import {
  buildGroupStandings,
} from "../../utils/soccer/tableEngine";

import { soccerFlags } from "../../data/soccer/soccerFlags";

/* IMAGES */

import heroBg from "../../assets/soccer/heroes/playerspage.jpg";

export default function SoccerGroupsPage() {
  const navigate = useNavigate();

  const [matches, setMatches] =
    useState<SoccerMatch[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* ======================================================
     LOAD MATCHES
  ====================================================== */

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data =
  await getAllWorldCupMatches();

        setMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* ======================================================
     GROUP DATA
  ====================================================== */

  const groupData = useMemo(() => {
    return groups.map((group) => {
      const groupMatches =
        matches.filter(
          (match) =>
            match.group ===
            group.name
        );

      const standings =
        buildGroupStandings(
          groupMatches
        );

      const liveMatches =
        groupMatches.filter(
          (m) =>
            m.status === "live"
        );

      return {
        group,
        standings,
        groupMatches,
        liveMatches,
      };
    });
  }, [matches]);

  return (
    <PageWrapper
      imageUrl={backgroundLight}
    >
      <main className={styles.page}>
        {/* ======================================================
            HERO
        ====================================================== */}

        <header
          className={styles.hero}
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
                  "rgba(255,255,255,0.14)",

                marginBottom:
                  "18px",

                fontWeight: 800,

                fontSize:
                  "0.88rem",

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",
              }}
            >
              Global WORLD CUP
              2026
            </div>

            <h1>
              World Cup Groups
            </h1>

            <p>
              Group standings,
              qualification
              races, live
              progression and
              tournament
              structure.
            </p>
          </div>
        </header>

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
                styles.empty
              }
            >
              Loading group
              standings...
            </div>
          </section>
        )}

        {/* ======================================================
            GROUPS GRID
        ====================================================== */}

        {!loading && (
          <section
            className={
              styles.section
            }
          >
            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(420px, 1fr))",

                gap: "28px",
              }}
            >
              {groupData.map(
                ({
                  group,
                  standings,
                  groupMatches,
                  liveMatches,
                }) => (
                  <button
                    key={
                      group.id
                    }
                    onClick={() =>
                      navigate(
                        `/soccer/groups/${group.id}`
                      )
                    }
                    style={{
                      border:
                        "none",

                      cursor:
                        "pointer",

                      textAlign:
                        "left",

                      borderRadius:
                        "30px",

                      overflow:
                        "hidden",

                      background:
                        "linear-gradient(135deg, #111827, #1f2937)",

                      color:
                        "#ffffff",

                      boxShadow:
                        "0 16px 40px rgba(0,0,0,0.25)",
                    }}
                  >
                    {/* HEADER */}

                    <div
                      style={{
                        padding:
                          "28px",

                        borderBottom:
                          "1px solid rgba(255,255,255,0.08)",
                      }}
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
                            "14px",
                        }}
                      >
                        <h2
                          style={{
                            margin: 0,

                            fontSize:
                              "2rem",
                          }}
                        >
                          {
                            group.name
                          }
                        </h2>

                        {liveMatches.length >
                          0 && (
                          <div
                            style={{
                              background:
                                "#dc2626",

                              color:
                                "#ffffff",

                              padding:
                                "8px 12px",

                              borderRadius:
                                "999px",

                              fontWeight: 900,

                              fontSize:
                                "0.8rem",
                            }}
                          >
                            LIVE
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          opacity:
                            0.72,

                          lineHeight:
                            1.6,
                        }}
                      >
                        Qualification
                        race and
                        group
                        standings
                        overview.
                      </div>
                    </div>

                    {/* TEAMS */}

                    <div
                      style={{
                        padding:
                          "28px",

                        display:
                          "flex",

                        flexDirection:
                          "column",

                        gap: "18px",
                      }}
                    >
                      {standings.map(
                        (
                          team,
                          index
                        ) => {
                          const flag =
                            soccerFlags[
                              team.team
                                .toLowerCase()
                                .replace(
                                  /\s/g,
                                  "-"
                                )
                            ];

                          return (
                            <div
                              key={
                                team.team
                              }
                              style={{
                                display:
                                  "flex",

                                alignItems:
                                  "center",

                                justifyContent:
                                  "space-between",

                                background:
                                  index <
                                  2
                                    ? "rgba(34,197,94,0.14)"
                                    : "rgba(255,255,255,0.04)",

                                padding:
                                  "14px 16px",

                                borderRadius:
                                  "18px",
                              }}
                            >
                              <div
                                style={{
                                  display:
                                    "flex",

                                  alignItems:
                                    "center",

                                  gap: "14px",
                                }}
                              >
                                <div
                                  style={{
                                    width:
                                      "32px",

                                    textAlign:
                                      "center",

                                    fontWeight: 900,

                                    opacity:
                                      0.8,
                                  }}
                                >
                                  {index +
                                    1}
                                </div>

                                {flag && (
                                  <img
                                    src={
                                      flag
                                    }
                                    alt={
                                      team.team
                                    }
                                    style={{
                                      width:
                                        "38px",

                                      height:
                                        "38px",

                                      borderRadius:
                                        "999px",

                                      objectFit:
                                        "cover",
                                    }}
                                  />
                                )}

                                <div>
                                  <div
                                    style={{
                                      fontWeight: 800,
                                    }}
                                  >
                                    {
                                      team.team
                                    }
                                  </div>

                                  <div
                                    style={{
                                      fontSize:
                                        "0.8rem",

                                      opacity:
                                        0.65,
                                    }}
                                  >
                                    Played{" "}
                                    {
                                      team.played
                                    }
                                  </div>
                                </div>
                              </div>

                              <div
                                style={{
                                  textAlign:
                                    "right",
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: 900,

                                    fontSize:
                                      "1.3rem",
                                  }}
                                >
                                  {
                                    team.points
                                  }
                                </div>

                                <div
                                  style={{
                                    opacity:
                                      0.65,

                                    fontSize:
                                      "0.75rem",
                                  }}
                                >
                                  Points
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    {/* FOOTER */}

                    <div
                      style={{
                        padding:
                          "22px 28px",

                        borderTop:
                          "1px solid rgba(255,255,255,0.08)",

                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "center",
                      }}
                    >
                      <div
                        style={{
                          opacity:
                            0.72,
                        }}
                      >
                        {
                          groupMatches.length
                        }{" "}
                        Matches
                      </div>

                      <div
                        style={{
                          fontWeight: 800,

                          color:
                            "#60a5fa",
                        }}
                      >
                        Open Group →
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}