// src/pages/soccer/SoccerQualificationTrackerPage.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "../StatsPage.module.css";

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
            label="Groups Completed"
            value="12"
          />

          <HeroCard
            label="Qualified Nations"
            value="32"
          />

          <HeroCard
            label="Round of 32"
            value="Live"
          />
        </div>
      </section>

      {/* TOURNAMENT PROGRESS */}

      <section className={styles.section}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "30px",
            padding: "36px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
          }}
        >
          <h2 className={styles.sectionTitle}>
            Tournament Progress
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "28px",
            }}
          >
            The group stage has concluded. Thirty-two nations have progressed into the knockout phase where every match is an elimination fixture.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px,1fr))",
              gap: "18px",
            }}
          >
            <HeroCard
              label="Group Stage"
              value="Completed"
            />

            <HeroCard
              label="Round of 32"
              value="In Progress"
            />

            <HeroCard
              label="Teams Remaining"
              value="32"
            />

            <HeroCard
              label="Champion"
              value="TBD"
            />
          </div>
        </div>
      </section>

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