// src/pages/soccer/SoccerPowerRankingsPage.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "../FixturesPage.module.css";

import rankingsHero from "../../assets/soccer/heroes/rankings.jpg";

import type {
  TeamMomentum,
} from "../../utils/soccer/momentumEngine";

import type {
  TeamPowerRanking,
} from "../../utils/soccer/predictionEngine";

import {
  getPowerRankings,
} from "../../utils/soccer/predictionEngine";

import {
  getHotTeams,
  getBestAttackTeams,
  getBestDefenseTeams,
} from "../../utils/soccer/momentumEngine";

/* ======================================================
   PAGE
====================================================== */

export default function SoccerPowerRankingsPage() {
  const navigate =
    useNavigate();

  const [
    rankings,
    setRankings,
  ] = useState<
    TeamPowerRanking[]
  >([]);

  const [
    hotTeams,
    setHotTeams,
  ] = useState<
    TeamMomentum[]
  >([]);

  const [
    bestAttack,
    setBestAttack,
  ] = useState<
    TeamMomentum[]
  >([]);

  const [
    bestDefense,
    setBestDefense,
  ] = useState<
    TeamMomentum[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     LOAD DATA
  ====================================================== */

  useEffect(() => {
    async function load() {
      try {
        const [
          rankingsData,
          hotData,
          attackData,
          defenseData,
        ] =
          await Promise.all([
            getPowerRankings(),
            getHotTeams(5),
            getBestAttackTeams(
              5
            ),
            getBestDefenseTeams(
              5
            ),
          ]);

        setRankings(
          rankingsData
        );

        setHotTeams(
          hotData
        );

        setBestAttack(
          attackData
        );

        setBestDefense(
          defenseData
        );
      } catch (
        error
      ) {
        console.error(
          "Power rankings load failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

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
          Loading power
          rankings...
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
          backgroundImage: `url(${rankingsHero})`,
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

              color:
                "#ffffff",

              fontWeight: 900,

              marginBottom:
                "18px",

              letterSpacing:
                "0.08em",
            }}
          >
            TOURNAMENT
            INTELLIGENCE
          </div>

          <h1>
            Power Rankings
          </h1>

          <p>
            Dynamic World
            Cup power
            rankings driven
            by momentum,
            results,
            attacking
            efficiency and
            defensive
            stability.
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
              "/soccer"
            )
          }
        >
          ← Back to Soccer
          Hub
        </button>
      </div>

      {/* TOP TEAM */}

      {rankings.length >
        0 && (
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
                "32px",

              padding:
                "40px",

              color:
                "#ffffff",

              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                fontSize:
                  "0.85rem",

                fontWeight: 900,

                letterSpacing:
                  "0.1em",

                opacity: 0.7,

                marginBottom:
                  "14px",
              }}
            >
              CURRENT
              TOURNAMENT
              FAVORITE
            </div>

            <h2
              style={{
                fontSize:
                  "3rem",

                marginBottom:
                  "18px",
              }}
            >
              {
                rankings[0]
                  .team
              }
            </h2>

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",

                gap: "18px",
              }}
            >
              <HighlightStat
                label="Power Score"
                value={
                  rankings[0]
                    .rating
                }
              />

              <HighlightStat
                label="Momentum"
                value={
                  rankings[0]
                    .momentum
                }
              />

              <HighlightStat
                label="Projected Finish"
                value={
                  rankings[0]
                    .projectedFinish
                }
              />
            </div>
          </div>
        </section>
      )}

      {/* MAIN TABLE */}

      <section
        className={
          styles.section
        }
      >
        <h2
          style={{
            marginBottom:
              "24px",
          }}
        >
          Global Rankings
        </h2>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "18px",
          }}
        >
          {rankings.map(
            (
              team,
              index
            ) => (
              <div
                key={
                  team.team
                }
                style={{
                  background:
                    "#ffffff",

                  borderRadius:
                    "24px",

                  padding:
                    "28px",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.06)",

                  display:
                    "grid",

                  gridTemplateColumns:
                    "80px 1fr auto",

                  alignItems:
                    "center",

                  gap: "24px",
                }}
              >
                {/* RANK */}

                <div
                  style={{
                    width:
                      "64px",

                    height:
                      "64px",

                    borderRadius:
                      "999px",

                    background:
                      index ===
                      0
                        ? "#facc15"
                        : "#111827",

                    color:
                      index ===
                      0
                        ? "#111827"
                        : "#ffffff",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    fontWeight: 900,

                    fontSize:
                      "1.4rem",
                  }}
                >
                  #
                  {index +
                    1}
                </div>

                {/* TEAM */}

                <div>
                  <div
                    style={{
                      fontSize:
                        "1.4rem",

                      fontWeight: 900,

                      marginBottom:
                        "8px",
                    }}
                  >
                    {
                      team.team
                    }
                  </div>

                  <div
                    style={{
                      display:
                        "flex",

                      gap: "12px",

                      flexWrap:
                        "wrap",
                    }}
                  >
                    <MiniStat>
                      Rating{" "}
                      {
                        team.rating
                      }
                    </MiniStat>

                    <MiniStat>
                      Momentum{" "}
                      {
                        team.momentum
                      }
                    </MiniStat>

                    <MiniStat>
                      {
                        team.projectedFinish
                      }
                    </MiniStat>
                  </div>
                </div>

                {/* SCORE */}

                <div
                  style={{
                    textAlign:
                      "right",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "2rem",

                      fontWeight: 900,
                    }}
                  >
                    {
                      team.rating
                    }
                  </div>

                  <div
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    Power Score
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* INSIGHTS */}

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
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",
          }}
        >
          <InsightCard
            title="🔥 Hottest Teams"
            teams={hotTeams.map(
              (team) =>
                team.nation
            )}
          />

          <InsightCard
            title="⚽ Best Attack"
            teams={bestAttack.map(
              (team) =>
                team.nation
            )}
          />

          <InsightCard
            title="🛡 Best Defense"
            teams={bestDefense.map(
              (team) =>
                team.nation
            )}
          />
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   HIGHLIGHT STAT
====================================================== */

interface HighlightStatProps {
  label: string;

  value:
    | number
    | string;
}

function HighlightStat({
  label,
  value,
}: HighlightStatProps) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.06)",

        borderRadius:
          "22px",

        padding:
          "22px",
      }}
    >
      <div
        style={{
          fontSize:
            "2rem",

          fontWeight: 900,

          marginBottom:
            "4px",
        }}
      >
        {value}
      </div>

      <div
        style={{
          opacity: 0.7,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ======================================================
   MINI STAT
====================================================== */

interface MiniStatProps {
  children:
    React.ReactNode;
}

function MiniStat({
  children,
}: MiniStatProps) {
  return (
    <div
      style={{
        background:
          "#f3f4f6",

        borderRadius:
          "999px",

        padding:
          "8px 14px",

        fontSize:
          "0.82rem",

        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

/* ======================================================
   INSIGHT CARD
====================================================== */

interface InsightCardProps {
  title: string;

  teams: string[];
}

function InsightCard({
  title,
  teams,
}: InsightCardProps) {
  return (
    <div
      style={{
        background:
          "#ffffff",

        borderRadius:
          "28px",

        padding:
          "30px",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      <h3
        style={{
          marginBottom:
            "22px",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display:
            "flex",

          flexDirection:
            "column",

          gap: "14px",
        }}
      >
        {teams.map(
          (team) => (
            <div
              key={team}
              style={{
                fontWeight: 700,
              }}
            >
              {team}
            </div>
          )
        )}
      </div>
    </div>
  );
}