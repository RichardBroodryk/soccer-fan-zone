// src/pages/soccer/SoccerQualificationTrackerPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "../StatsPage.module.css";

import { groups } from "../../data/soccer/groups";
import { matches } from "../../data/soccer/matches";

import {
  buildAllGroupStandings,
} from "../../utils/soccer/standingsEngine";

import type {
  TeamMomentum,
} from "../../utils/soccer/momentumEngine";

import type {
  TeamPowerRanking,
} from "../../utils/soccer/predictionEngine";

import {
  getAllMomentum,
} from "../../utils/soccer/momentumEngine";

import {
  getCachedTournamentFavorite,
} from "../../utils/soccer/predictionCache";

import qualifiersHero from "../../assets/soccer/heroes/qualifiers.jpg";

export default function SoccerQualificationTrackerPage() {
  const navigate =
    useNavigate();

  const [
    momentum,
    setMomentum,
  ] = useState<
    TeamMomentum[]
  >([]);

  const [
    projectedChampion,
    setProjectedChampion,
  ] = useState<
    TeamPowerRanking | undefined
  >();

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     STANDINGS
  ====================================================== */

 const groupStandings =
  useMemo(
    () =>
      buildAllGroupStandings(
        matches
      ),
    []
  );
  const momentumLookup =
  useMemo(() => {
    return Object.fromEntries(
      momentum.map(
        (m) => [
          m.nation,
          m,
        ]
      )
    );
  }, [momentum]);

  /* ======================================================
     LOAD DATA
  ====================================================== */

  useEffect(() => {
    async function load() {
      console.time(
  "QualificationTracker"
);
      try {
      const [
  momentumData,
  championData,
] =
  await Promise.all([
    getAllMomentum(),
    getCachedTournamentFavorite(),
  ]);

        setMomentum(
          momentumData
        );

        setProjectedChampion(
          championData
        );
      } catch (
        error
      ) {
        console.error(
          "Qualification tracker load failed:",
          error
        );
     } finally {

  console.timeEnd(
    "QualificationTracker"
  );

  setLoading(false);
}
    }

    load();
  }, []);

  /* ======================================================
     HELPERS
  ====================================================== */



  function getQualificationChance(
    points: number,
    position: number
  ) {
    if (
      position === 1
    ) {
      return 92;
    }

    if (
      position === 2
    ) {
      return 74;
    }

    if (
      position === 3
    ) {
      return 38;
    }

    return Math.max(
      5,
      points * 4
    );
  }

  function getStatus(
    position: number
  ) {
    if (
      position <= 2
    ) {
      return {
        label:
          "Projected Qualification",

        color:
          "rgba(34,197,94,0.16)",

        text:
          "#15803d",
      };
    }

    if (
      position === 3
    ) {
      return {
        label:
          "Danger Zone",

        color:
          "rgba(245,158,11,0.16)",

        text:
          "#b45309",
      };
    }

    return {
      label:
        "Projected Elimination",

      color:
        "rgba(239,68,68,0.16)",

      text:
        "#b91c1c",
    };
  }

  if (loading) {
    return (
      <main
        className={
          styles.page
        }
      >
        <div
          style={{
            padding:
              "80px 32px",

            textAlign:
              "center",

            fontSize:
              "1.2rem",

            fontWeight: 800,
          }}
        >
          Loading
          qualification
          tracker...
        </div>
      </main>
    );
  }

  return (
    <main
      className={
        styles.page
      }
    >
      {/* HERO */}

      <header
        className={
          styles.hero
        }
        style={{
          backgroundImage: `url(${qualifiersHero})`,
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
                "rgba(255,255,255,0.12)",

              marginBottom:
                "20px",

              color:
                "#ffffff",

              fontWeight: 900,

              fontSize:
                "0.82rem",

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",
            }}
          >
            LIVE
            QUALIFICATION
            ENGINE
          </div>

          <h1>
            Qualification
            Tracker
          </h1>

          <p>
            Live
            qualification
            projections,
            group-stage
            pressure
            analysis,
            elimination
            danger and AI
            qualification
            probabilities
            across FIFA
            World Cup 2026.
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
              "/soccer/tournament-center"
            )
          }
        >
          ← Back to
          Tournament
          Center
        </button>
      </div>

      {/* HERO STATS */}

      <section
        className={
          styles.section
        }
      >
        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",

            gap: "18px",
          }}
        >
          <HeroCard
            label="Projected Champion"
            value={
              projectedChampion?.team ||
              "TBD"
            }
          />

          <HeroCard
            label="Groups Tracking"
            value={String(
              groups.length
            )}
          />

          <HeroCard
            label="Qualified Spots"
            value={String(
              groups.length *
                2
            )}
          />

          <HeroCard
            label="Teams Under Pressure"
            value="12"
          />
        </div>
      </section>

      {/* GROUP TRACKERS */}

      {groupStandings.map(
        (group) => (
          <section
            key={
              group.groupId
            }
            className={
              styles.section
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

                flexWrap:
                  "wrap",

                gap: "14px",

                marginBottom:
                  "24px",
              }}
            >
              <div>
                <h2
                  className={
                    styles.sectionTitle
                  }
                  style={{
                    marginBottom:
                      "8px",
                  }}
                >
                  {
                    group.groupName
                  }
                </h2>

                <p
                  style={{
                    margin: 0,

                    color:
                      "#6b7280",
                  }}
                >
                  Live
                  qualification
                  pressure and
                  progression
                  analysis.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/soccer/groups/${group.groupId}`
                  )
                }
                style={{
                  border:
                    "none",

                  background:
                    "#111827",

                  color:
                    "#ffffff",

                  padding:
                    "12px 18px",

                  borderRadius:
                    "999px",

                  cursor:
                    "pointer",

                  fontWeight: 800,
                }}
              >
                View Group
              </button>
            </div>

            <div
              style={{
                display:
                  "grid",

                gap: "18px",
              }}
            >
              {group.standings.map(
                (
                  team,
                  index
                ) => {
                  const status =
                    getStatus(
                      index +
                        1
                    );

                  const qualificationChance =
                    getQualificationChance(
                      team.points,
                      index +
                        1
                    );

                  const teamMomentum =
  momentumLookup[
    team.team
  ];

                  return (
                    <div
                      key={
                        team.team
                      }
                      style={{
                        background:
                          "#ffffff",

                        borderRadius:
                          "26px",

                        padding:
                          "28px",

                        boxShadow:
                          "0 10px 28px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* TOP */}

                      <div
                        style={{
                          display:
                            "flex",

                          justifyContent:
                            "space-between",

                          alignItems:
                            "center",

                          flexWrap:
                            "wrap",

                          gap: "18px",

                          marginBottom:
                            "22px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display:
                                "flex",

                              alignItems:
                                "center",

                              gap: "12px",

                              marginBottom:
                                "10px",
                            }}
                          >
                            <div
                              style={{
                                width:
                                  "42px",

                                height:
                                  "42px",

                                borderRadius:
                                  "999px",

                                background:
                                  "#111827",

                                color:
                                  "#ffffff",

                                display:
                                  "flex",

                                alignItems:
                                  "center",

                                justifyContent:
                                  "center",

                                fontWeight: 900,
                              }}
                            >
                              {index +
                                1}
                            </div>

                            <h3
                              style={{
                                margin: 0,

                                fontSize:
                                  "1.5rem",

                                fontWeight: 900,
                              }}
                            >
                              {
                                team.team
                              }
                            </h3>
                          </div>

                          <div
                            style={{
                              display:
                                "inline-flex",

                              padding:
                                "8px 14px",

                              borderRadius:
                                "999px",

                              background:
                                status.color,

                              color:
                                status.text,

                              fontWeight: 800,

                              fontSize:
                                "0.82rem",
                            }}
                          >
                            {
                              status.label
                            }
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
                              color:
                                "#6b7280",

                              marginBottom:
                                "8px",
                            }}
                          >
                            Qualification
                            Probability
                          </div>

                          <div
                            style={{
                              fontSize:
                                "2rem",

                              fontWeight: 900,
                            }}
                          >
                            {
                              qualificationChance
                            }
                            %
                          </div>
                        </div>
                      </div>

                      {/* BAR */}

                      <div
                        style={{
                          height:
                            "12px",

                          borderRadius:
                            "999px",

                          overflow:
                            "hidden",

                          background:
                            "#e5e7eb",

                          marginBottom:
                            "24px",
                        }}
                      >
                        <div
                          style={{
                            width: `${qualificationChance}%`,

                            height:
                              "100%",

                            background:
                              qualificationChance >=
                              75
                                ? "#22c55e"
                                : qualificationChance >=
                                  45
                                ? "#f59e0b"
                                : "#ef4444",
                          }}
                        />
                      </div>

                      {/* STATS */}

                      <div
                        style={{
                          display:
                            "grid",

                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(160px, 1fr))",

                          gap: "16px",
                        }}
                      >
                        <MiniStat
                          label="Points"
                          value={String(
                            team.points
                          )}
                        />

                        <MiniStat
                          label="Goal Difference"
                          value={String(
                            team.goalDifference
                          )}
                        />

                        <MiniStat
                          label="Form"
                          value={
                            team.form?.join(
                              " • "
                            ) ||
                            "-"
                          }
                        />

                        <MiniStat
                          label="Momentum"
                          value={
                            teamMomentum?.trend ||
                            "STABLE"
                          }
                        />

                        <MiniStat
                          label="Attack Rating"
                          value={String(
                            teamMomentum?.attackRating ||
                              0
                          )}
                        />

                        <MiniStat
                          label="Defense Rating"
                          value={String(
                            teamMomentum?.defenseRating ||
                              0
                          )}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        )
      )}

      {/* AI INSIGHTS */}

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
              "30px",

            padding:
              "34px",

            color:
              "#ffffff",
          }}
        >
          <h2
            style={{
              marginTop: 0,

              marginBottom:
                "28px",

              fontSize:
                "2rem",

              fontWeight: 900,
            }}
          >
            AI Tournament
            Insights
          </h2>

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",

              gap: "20px",
            }}
          >
            <InsightCard
              title="Qualification Pressure"
              text="Group-stage qualification probabilities update dynamically based on points, form and projected remaining fixtures."
            />

            <InsightCard
              title="Momentum Impact"
              text="Nations with strong momentum trends gain significant projection boosts heading into decisive fixtures."
            />

            <InsightCard
              title="Elimination Watch"
              text="Danger-zone teams are identified based on projected qualification pathways and remaining match difficulty."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   COMPONENTS
====================================================== */

function HeroCard({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      style={{
        background:
          "#ffffff",

        borderRadius:
          "26px",

        padding:
          "28px",

        boxShadow:
          "0 10px 28px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          color:
            "#6b7280",

          marginBottom:
            "12px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize:
            "2.2rem",

          fontWeight: 900,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      style={{
        background:
          "rgba(243,244,246,0.85)",

        borderRadius:
          "18px",

        padding:
          "18px",
      }}
    >
      <div
        style={{
          color:
            "#6b7280",

          marginBottom:
            "8px",

          fontSize:
            "0.82rem",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: 900,

          fontSize:
            "1.05rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function InsightCard({
  title,
  text,
}: {
  title: string;

  text: string;
}) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.06)",

        border:
          "1px solid rgba(255,255,255,0.08)",

        borderRadius:
          "24px",

        padding:
          "26px",
      }}
    >
      <h3
        style={{
          marginTop: 0,

          marginBottom:
            "14px",

          fontSize:
            "1.25rem",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,

          lineHeight:
            1.8,

          color:
            "rgba(255,255,255,0.75)",
        }}
      >
        {text}
      </p>
    </div>
  );
}