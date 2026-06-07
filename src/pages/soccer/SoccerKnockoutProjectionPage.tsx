// src/pages/soccer/SoccerKnockoutProjectionPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "../StatsPage.module.css";

import KnockoutBracket from "../../components/bracket/KnockoutBracket";

import heroBg from "../../assets/soccer/knockout/knockout-hero.jpg";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import {
  buildTournamentProjection,
  getProjectedChampion,
  getProjectedFinalist,
  getMostDominantRun,
  getUpsetPotentialMatches,
  getMostCertainMatches,
} from "../../utils/soccer/knockoutProjectionEngine";

type ProjectionMatch = {
  id: string;

  home: string;
  away: string;

  winner: string;

  stage: string;

  confidence: number;

  scorePrediction: string;
};

type DominantRun = {
  team: string;
  wins: number;
};

type TournamentProjection = {
  rounds: {
    stage: string;

    matches: ProjectionMatch[];
  }[];
};

export default function SoccerKnockoutProjectionPage() {
  const navigate =
    useNavigate();
    console.log(
  "SOCCER KNOCKOUT PROJECTION PAGE LOADED"
);

  const [
    projection,
    setProjection,
  ] =
    useState<TournamentProjection | null>(
      null
    );

  const [
    champion,
    setChampion,
  ] = useState(
    "TBD"
  );

  const [
    finalist,
    setFinalist,
  ] = useState(
    "TBD"
  );

  const [
    dominantRun,
    setDominantRun,
  ] =
    useState<DominantRun | null>(
      null
    );

  const [
    upsetMatches,
    setUpsetMatches,
  ] = useState<
    ProjectionMatch[]
  >([]);

  const [
    certainMatches,
    setCertainMatches,
  ] = useState<
    ProjectionMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     LOAD DATA
     ====================================================== */

  useEffect(() => {
    async function loadProjection() {
      try {
        setLoading(true);

        const [
          projectionData,
          championData,
          finalistData,
          dominantRunData,
          upsetData,
          certainData,
        ] =
          await Promise.all([
            buildTournamentProjection(),

            getProjectedChampion(),

            getProjectedFinalist(),

            getMostDominantRun(),

            getUpsetPotentialMatches(),

            getMostCertainMatches(),
          ]);

        setProjection(
          projectionData
        );

        setChampion(
          championData ||
            "TBD"
        );

        setFinalist(
          finalistData ||
            "TBD"
        );

        setDominantRun(
          dominantRunData ||
            null
        );

        setUpsetMatches(
          upsetData ||
            []
        );

        setCertainMatches(
          certainData ||
            []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProjection();
  }, []);

  /* ======================================================
     BRACKET
     ====================================================== */

  const bracketRounds =
    useMemo(() => {
      if (!projection) {
        return [];
      }

      return projection.rounds.map(
        (round) => ({
          title:
            round.stage,

          matches:
            round.matches.map(
              (
                match
              ) => ({
                id: match.id,

                stage:
                  match.stage,

                date:
                  "Projected",

                home:
                  match.home,

                away:
                  match.away,

                homeScore:
                  match.winner ===
                  match.home
                    ? 1
                    : 0,

                awayScore:
                  match.winner ===
                  match.away
                    ? 1
                    : 0,

                stadium:
                  "World Cup Venue",

                city:
                  "United States",

                winner:
                  match.winner,
              })
            ),
        })
      );
    }, [projection]);

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
            Loading knockout
            projections...
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
                  "rgba(255,255,255,0.12)",

                marginBottom:
                  "20px",

                fontWeight: 900,

                fontSize:
                  "0.82rem",

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",

                color:
                  "#ffffff",
              }}
            >
              AI KNOCKOUT
              ENGINE
            </div>

            <h1>
              World Cup
              Knockout
              Projections
            </h1>

            <p>
              AI-generated
              knockout bracket
              predictions,
              projected
              finalists,
              tournament
              favorites, upset
              alerts and
              simulated
              championship
              pathways for FIFA
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
    "/soccer/knockout"
  )
}
          >
            ← Back to
Knockout Hub
          </button>
        </div>

        {/* HERO CARDS */}

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
                "repeat(auto-fit, minmax(260px, 1fr))",

              gap: "18px",
            }}
          >
            <HeroStatCard
              title="Projected Champion"
              value={
                champion
              }
            />

            <HeroStatCard
              title="Projected Final"
              value={`${champion} vs ${finalist}`}
            />

            <HeroStatCard
              title="Dominant Run"
              value={
                dominantRun?.team ||
                "TBD"
              }
              subtitle={`${dominantRun?.wins || 0} projected knockout wins`}
            />

            <HeroStatCard
              title="Upset Alerts"
              value={String(
                upsetMatches.length
              )}
            />
          </div>
        </section>

        {/* CHAMPIONSHIP */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={
              darkPanel
            }
          >
            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",

                gap: "28px",

                alignItems:
                  "center",
              }}
            >
              <div>
                <div
                  style={{
                    display:
                      "inline-flex",

                    padding:
                      "8px 14px",

                    borderRadius:
                      "999px",

                    background:
                      "rgba(255,255,255,0.08)",

                    fontWeight: 800,

                    fontSize:
                      "0.82rem",

                    marginBottom:
                      "18px",
                  }}
                >
                  PROJECTED WORLD
                  CHAMPION
                </div>

                <h2
                  style={{
                    marginTop: 0,

                    marginBottom:
                      "18px",

                    fontSize:
                      "3rem",

                    fontWeight: 900,
                  }}
                >
                  {champion}
                </h2>

                <p
                  style={{
                    color:
                      "rgba(255,255,255,0.75)",

                    lineHeight: 1.8,

                    margin: 0,
                  }}
                >
                  AI simulations
                  project{" "}
                  {champion} as
                  the strongest
                  pathway team
                  entering the
                  World Cup
                  knockout rounds
                  based on
                  momentum,
                  projected
                  matchups and
                  tournament
                  power rankings.
                </p>
              </div>

              <div
                style={{
                  background:
                    "rgba(255,255,255,0.05)",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  borderRadius:
                    "26px",

                  padding:
                    "28px",
                }}
              >
                <MiniHighlight
                  label="Projected Finalist"
                  value={
                    finalist
                  }
                />

                <MiniHighlight
                  label="Most Dominant Run"
                  value={
                    dominantRun?.team ||
                    "TBD"
                  }
                />

                <MiniHighlight
                  label="Projected Knockout Wins"
                  value={String(
                    dominantRun?.wins ||
                      0
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* BRACKET */}

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
              🏆 AI Tournament
              Bracket
            </h2>

            <p
              style={{
                color:
                  "#6b7280",
              }}
            >
              Simulated
              knockout pathway
              generated from
              tournament
              standings,
              momentum and
              prediction
              engines.
            </p>
          </div>

          <KnockoutBracket
            rounds={
              bracketRounds
            }
          />
        </section>

        {/* CERTAIN */}

        <section
          className={
            styles.section
          }
        >
          <SectionHeader
            title="📈 Highest Confidence Matches"
            subtitle="Projected knockout matches with the clearest favorites."
          />

          <div
            style={{
              display:
                "grid",

              gap: "18px",
            }}
          >
            {certainMatches.map(
              (
                match
              ) => (
                <PredictionCard
                  key={
                    match.id
                  }
                  match={
                    match
                  }
                  certainty
                />
              )
            )}
          </div>
        </section>

        {/* UPSETS */}

        <section
          className={
            styles.section
          }
        >
          <SectionHeader
            title="⚠ Knockout Upset Watch"
            subtitle="Projected matches likely to produce dramatic World Cup surprises."
          />

          <div
            style={{
              display:
                "grid",

              gap: "18px",
            }}
          >
            {upsetMatches.map(
              (
                match
              ) => (
                <PredictionCard
                  key={
                    match.id
                  }
                  match={
                    match
                  }
                />
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

              gap: "22px",
            }}
          >
            <InsightCard
              title="AI Projection Engine"
              text="Knockout projections are generated using standings, form momentum, team strength and projected matchup simulations."
            />

            <InsightCard
              title="Dynamic Tournament Paths"
              text="Bracket pathways evolve automatically as standings, match outcomes and momentum scores change."
            />

            <InsightCard
              title="Upset Probability Tracking"
              text="The system identifies close-confidence knockout fixtures with strong upset potential."
            />
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;

  subtitle: string;
}) {
  return (
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
        style={{
          marginBottom:
            "8px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: 0,

          color:
            "#6b7280",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function HeroStatCard({
  title,
  value,
  subtitle,
}: {
  title: string;

  value: string;

  subtitle?: string;
}) {
  return (
    <div style={panel}>
      <div
        style={{
          color:
            "#6b7280",

          marginBottom:
            "12px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize:
            "2rem",

          fontWeight: 900,

          marginBottom:
            subtitle
              ? "10px"
              : 0,
        }}
      >
        {value}
      </div>

      {subtitle && (
        <div
          style={{
            color:
              "#6b7280",

            fontSize:
              "0.92rem",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

function PredictionCard({
  match,
  certainty,
}: {
  match: ProjectionMatch;

  certainty?: boolean;
}) {
  return (
    <div style={panel}>
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
            "18px",
        }}
      >
        <div>
          <div
            style={{
              fontSize:
                "1.25rem",

              fontWeight: 900,

              marginBottom:
                "6px",
            }}
          >
            {match.home} vs{" "}
            {match.away}
          </div>

          <div
            style={{
              color:
                "#6b7280",
            }}
          >
            {match.stage}
          </div>
        </div>

        <div
          style={{
            padding:
              "8px 14px",

            borderRadius:
              "999px",

            background:
              certainty
                ? "#dcfce7"
                : "#fef3c7",

            color:
              certainty
                ? "#166534"
                : "#92400e",

            fontWeight: 900,

            fontSize:
              "0.8rem",
          }}
        >
          {certainty
            ? "HIGH CERTAINTY"
            : "UPSET ALERT"}
        </div>
      </div>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",

          gap: "14px",
        }}
      >
        <MiniStat
          label="Projected Winner"
          value={
            match.winner
          }
        />

        <MiniStat
          label="Confidence"
          value={`${match.confidence}%`}
        />

        <MiniStat
          label="Projected Score"
          value={
            match.scorePrediction
          }
        />
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
          "rgba(243,244,246,0.9)",

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
            "1.1rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MiniHighlight({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      style={{
        padding:
          "14px 0",

        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontSize:
            "0.82rem",

          opacity: 0.7,

          marginBottom:
            "8px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: 900,

          fontSize:
            "1.15rem",
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
    <div style={panel}>
      <h3
        style={{
          marginTop: 0,

          marginBottom:
            "14px",

          fontSize:
            "1.3rem",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color:
            "#6b7280",

          lineHeight: 1.8,

          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

const panel: React.CSSProperties =
  {
    background:
      "#ffffff",

    borderRadius:
      "28px",

    padding: "28px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  };

const darkPanel: React.CSSProperties =
  {
    background:
      "linear-gradient(135deg, #111827, #1f2937)",

    color:
      "#ffffff",

    borderRadius:
      "32px",

    padding: "36px",

    boxShadow:
      "0 12px 34px rgba(0,0,0,0.24)",
  };