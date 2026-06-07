// src/pages/soccer/SoccerNationComparisonPage.tsx

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../StatsPage.module.css";

import { teams } from "../../data/soccer/teams";

import knockoutComparisonHero from "../../assets/soccer/knockout/knockout-comparison.jpg";

import {
  getTeamMomentum,
  type TeamMomentum,
} from "../../utils/soccer/momentumEngine";

import {
  getTeamStrength,
} from "../../utils/soccer/predictionEngine";

export default function SoccerNationComparisonPage() {
  const navigate = useNavigate();

  /* ======================================================
     DEFAULTS
     ====================================================== */

  const [teamA, setTeamA] =
    useState("Brazil");

  const [teamB, setTeamB] =
    useState("France");

  /* ======================================================
     DATA
     ====================================================== */

  const [
    momentumA,
    setMomentumA,
  ] = useState<TeamMomentum | null>(
    null
  );

  const [
    momentumB,
    setMomentumB,
  ] = useState<TeamMomentum | null>(
    null
  );

  const [
    strengthA,
    setStrengthA,
  ] = useState(0);

  const [
    strengthB,
    setStrengthB,
  ] = useState(0);

  useEffect(() => {
    async function loadComparison() {
      try {
        const [
          momentumDataA,
          momentumDataB,
          strengthDataA,
          strengthDataB,
        ] = await Promise.all([
          getTeamMomentum(teamA),
          getTeamMomentum(teamB),
          getTeamStrength(teamA),
          getTeamStrength(teamB),
        ]);

        setMomentumA(
          momentumDataA
        );

        setMomentumB(
          momentumDataB
        );

        setStrengthA(
          strengthDataA
        );

        setStrengthB(
          strengthDataB
        );
      } catch (error) {
        console.error(
          "Nation comparison failed:",
          error
        );
      }
    }

    loadComparison();
  }, [teamA, teamB]);

  const winner =
    strengthA >= strengthB
      ? teamA
      : teamB;

  const confidence =
    Math.abs(
      strengthA - strengthB
    );

  /* ======================================================
     LOADING GUARD
     ====================================================== */

  if (
    !momentumA ||
    !momentumB
  ) {
    return (
      <main
        className={styles.page}
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
          Loading nation comparison...
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* HERO */}

      <header
        className={styles.hero}
        style={{
         backgroundImage: `url(${knockoutComparisonHero})`,
        }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
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

              color: "#ffffff",

              fontWeight: 900,

              fontSize:
                "0.82rem",

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",
            }}
          >
            AI NATION COMPARISON
          </div>

          <h1>
            Nation Comparison
            Engine
          </h1>

          <p>
            Compare World Cup
            nations using momentum,
            attack ratings, defensive
            stability, tournament
            projections and AI-powered
            match prediction systems.
          </p>
        </div>
      </header>

      {/* BACK */}

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() =>
            navigate(
              "/soccer/tournament-center"
            )
          }
        >
          ← Back to Tournament Center
        </button>
      </div>

      {/* SELECTORS */}

      <section className={styles.section}>
        <div
          style={{
            background: "#ffffff",

            borderRadius: "28px",

            padding: "28px",

            boxShadow:
              "0 10px 28px rgba(0,0,0,0.08)",

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",

            gap: "22px",
          }}
        >
          <SelectorCard
            label="Nation A"
            value={teamA}
            onChange={setTeamA}
          />

          <SelectorCard
            label="Nation B"
            value={teamB}
            onChange={setTeamB}
          />
        </div>
      </section>

      {/* AI RESULT */}

      <section className={styles.section}>
        <div
          style={{
            background:
              "linear-gradient(135deg, #111827, #1f2937)",

            borderRadius: "32px",

            padding: "38px",

            color: "#ffffff",

            boxShadow:
              "0 14px 38px rgba(0,0,0,0.24)",
          }}
        >
          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",

              gap: "28px",

              alignItems:
                "center",
            }}
          >
            <div>
              <div
                style={{
                  opacity: 0.7,

                  marginBottom:
                    "12px",
                }}
              >
                AI Match Projection
              </div>

              <h2
                style={{
                  marginTop: 0,

                  marginBottom:
                    "16px",

                  fontSize:
                    "3rem",

                  fontWeight: 900,
                }}
              >
                {winner}
              </h2>

              <p
                style={{
                  margin: 0,

                  color:
                    "rgba(255,255,255,0.76)",

                  lineHeight: 1.8,
                }}
              >
                Based on current
                momentum, standings,
                projected knockout
                strength and overall
                tournament power.
              </p>
            </div>

            <div
              style={{
                background:
                  "rgba(255,255,255,0.06)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius:
                  "26px",

                padding: "28px",
              }}
            >
              <PredictionStat
                label="Confidence"
                value={`${confidence}%`}
              />

              <PredictionStat
                label="Projected Favorite"
                value={winner}
              />

              <PredictionStat
                label="Strength Gap"
                value={String(
                  Math.abs(
                    strengthA -
                      strengthB
                  )
                )}
              />
            </div>
          </div>
        </div>
      </section>

      {/* HEAD TO HEAD */}

      <section className={styles.section}>
        <h2
          className={
            styles.sectionTitle
          }
          style={{
            marginBottom: "22px",
          }}
        >
          ⚔ Head-to-Head Analysis
        </h2>

        <div
          style={{
            display: "grid",

            gap: "18px",
          }}
        >
          <ComparisonRow
            label="Overall Strength"
            aValue={strengthA}
            bValue={strengthB}
            teamA={teamA}
            teamB={teamB}
          />

          <ComparisonRow
            label="Momentum Score"
            aValue={
              momentumA.momentumScore
            }
            bValue={
              momentumB.momentumScore
            }
            teamA={teamA}
            teamB={teamB}
          />

          <ComparisonRow
            label="Attack Rating"
            aValue={
              momentumA.attackRating
            }
            bValue={
              momentumB.attackRating
            }
            teamA={teamA}
            teamB={teamB}
          />

          <ComparisonRow
            label="Defense Rating"
            aValue={
              momentumA.defenseRating
            }
            bValue={
              momentumB.defenseRating
            }
            teamA={teamA}
            teamB={teamB}
          />

          <ComparisonRow
            label="Overall Rating"
            aValue={
              momentumA.overallRating
            }
            bValue={
              momentumB.overallRating
            }
            teamA={teamA}
            teamB={teamB}
          />
        </div>
      </section>

      {/* FORM */}

      <section className={styles.section}>
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "22px",
          }}
        >
          <FormPanel
            team={teamA}
            momentum={momentumA}
          />

          <FormPanel
            team={teamB}
            momentum={momentumB}
          />
        </div>
      </section>

      {/* INSIGHTS */}

      <section className={styles.section}>
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",

            gap: "22px",
          }}
        >
          <InsightCard
            title="AI Projection"
            text="Comparisons use prediction engines, standings momentum and tournament performance weighting."
          />

          <InsightCard
            title="Momentum Tracking"
            text="Nations on strong unbeaten runs receive higher progression and matchup probabilities."
          />

          <InsightCard
            title="Tournament Context"
            text="The system evaluates attack quality, defensive resilience and overall tournament trajectory."
          />
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   SELECTOR CARD
   ====================================================== */

function SelectorCard({
  label,
  value,
  onChange,
}: {
  label: string;

  value: string;

  onChange: (
    value: string
  ) => void;
}) {
  return (
    <div>
      <div
        style={{
          marginBottom: "12px",

          fontWeight: 800,
        }}
      >
        {label}
      </div>

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        style={{
          width: "100%",

          padding: "16px",

          borderRadius: "16px",

          border:
            "1px solid #d1d5db",

          fontSize: "1rem",

          background:
            "#ffffff",

          cursor: "pointer",
        }}
      >
        {teams.map((team) => (
          <option
            key={team.id}
            value={team.name}
          >
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ======================================================
   COMPARISON ROW
   ====================================================== */

function ComparisonRow({
  label,
  aValue,
  bValue,
  teamA,
  teamB,
}: {
  label: string;

  aValue: number;

  bValue: number;

  teamA: string;

  teamB: string;
}) {
  const aWins =
    aValue > bValue;

  const bWins =
    bValue > aValue;

  return (
    <div
      style={{
        background: "#ffffff",

        borderRadius: "26px",

        padding: "26px",

        boxShadow:
          "0 10px 28px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          textAlign: "center",

          marginBottom: "22px",

          fontWeight: 900,

          fontSize: "1.15rem",
        }}
      >
        {label}
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr auto 1fr",

          alignItems: "center",

          gap: "20px",
        }}
      >
        <CompareSide
          team={teamA}
          value={aValue}
          winner={aWins}
        />

        <div
          style={{
            fontWeight: 900,

            fontSize: "1.2rem",

            color: "#9ca3af",
          }}
        >
          VS
        </div>

        <CompareSide
          team={teamB}
          value={bValue}
          winner={bWins}
        />
      </div>
    </div>
  );
}

/* ======================================================
   SIDE
   ====================================================== */

function CompareSide({
  team,
  value,
  winner,
}: {
  team: string;

  value: number;

  winner: boolean;
}) {
  return (
    <div
      style={{
        textAlign: "center",

        padding: "18px",

        borderRadius: "20px",

        background: winner
          ? "rgba(34,197,94,0.12)"
          : "#f9fafb",

        border: winner
          ? "2px solid rgba(34,197,94,0.35)"
          : "2px solid transparent",
      }}
    >
      <div
        style={{
          fontWeight: 800,

          marginBottom: "10px",
        }}
      >
        {team}
      </div>

      <div
        style={{
          fontSize: "2rem",

          fontWeight: 900,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ======================================================
   FORM PANEL
   ====================================================== */

function FormPanel({
  team,
  momentum,
}: {
  team: string;

  momentum: TeamMomentum;
}) {
  return (
    <div
      style={{
        background: "#ffffff",

        borderRadius: "28px",

        padding: "30px",

        boxShadow:
          "0 10px 28px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "22px",
        }}
      >
        <h3
          style={{
            margin: 0,

            fontSize: "1.5rem",

            fontWeight: 900,
          }}
        >
          {team}
        </h3>

        <div
          style={{
            padding:
              "8px 14px",

            borderRadius:
              "999px",

            background:
              momentum.trend ===
              "HOT"
                ? "rgba(34,197,94,0.14)"
                : momentum.trend ===
                  "RISING"
                ? "rgba(59,130,246,0.14)"
                : momentum.trend ===
                  "FALLING"
                ? "rgba(239,68,68,0.14)"
                : "rgba(156,163,175,0.14)",

            color:
              momentum.trend ===
              "HOT"
                ? "#15803d"
                : momentum.trend ===
                  "RISING"
                ? "#1d4ed8"
                : momentum.trend ===
                  "FALLING"
                ? "#b91c1c"
                : "#4b5563",

            fontWeight: 900,

            fontSize: "0.8rem",
          }}
        >
          {momentum.trend}
        </div>
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(140px, 1fr))",

          gap: "14px",
        }}
      >
        <MiniStat
          label="Wins"
          value={momentum.wins}
        />

        <MiniStat
          label="Goals"
          value={
            momentum.goalsFor
          }
        />

        <MiniStat
          label="Clean Sheets"
          value={
            momentum.cleanSheets
          }
        />

        <MiniStat
          label="Unbeaten"
          value={
            momentum.unbeatenStreak
          }
        />
      </div>

      <div
        style={{
          marginTop: "24px",
        }}
      >
        <div
          style={{
            marginBottom: "10px",

            fontWeight: 800,
          }}
        >
          Recent Form
        </div>

        <div
          style={{
            display: "flex",

            gap: "10px",

            flexWrap: "wrap",
          }}
        >
          {momentum.recentForm.map(
            (
              result: string,
              index: number
            ) => (
              <div
                key={index}
                style={{
                  width: "42px",

                  height: "42px",

                  borderRadius:
                    "999px",

                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  fontWeight: 900,

                  color:
                    "#ffffff",

                  background:
                    result ===
                    "W"
                      ? "#22c55e"
                      : result ===
                        "D"
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              >
                {result}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   MINI STAT
   ====================================================== */

function MiniStat({
  label,
  value,
}: {
  label: string;

  value:
    | string
    | number;
}) {
  return (
    <div
      style={{
        background:
          "rgba(243,244,246,0.9)",

        borderRadius: "18px",

        padding: "16px",
      }}
    >
      <div
        style={{
          color: "#6b7280",

          marginBottom: "8px",

          fontSize: "0.8rem",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: 900,

          fontSize: "1.15rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ======================================================
   INSIGHT CARD
   ====================================================== */

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
        background: "#ffffff",

        borderRadius: "28px",

        padding: "28px",

        boxShadow:
          "0 10px 28px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginTop: 0,

          marginBottom: "14px",

          fontSize: "1.25rem",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,

          lineHeight: 1.8,

          color: "#6b7280",
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ======================================================
   PREDICTION STAT
   ====================================================== */

function PredictionStat({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      style={{
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          opacity: 0.7,

          marginBottom: "8px",

          fontSize: "0.82rem",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: 900,

          fontSize: "1.25rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}