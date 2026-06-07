// src/pages/soccer/SoccerKnockoutHubPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import HubCard from "../../components/homepage/HubCard";

import AutoContentRail from "../../components/ui/AutoContentRail";

import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

import knockoutHero from "../../assets/soccer/videos/classic-finals.jpg";

import bracketImage from "../../assets/soccer/videos/featured-match.jpg";
import finalImage from "../../assets/soccer/media/soccer-documentaries.jpg";
import predictionImage from "../../assets/soccer/media/soccer-highlights.jpg";

/* ICONS */

import StarIcon from "../../components/icons/StarIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";
import UsersIcon from "../../components/icons/UsersIcon";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* LIVE API */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

export default function SoccerKnockoutHubPage() {
  const navigate = useNavigate();

  const [
    matches,
    setMatches,
  ] = useState<SoccerMatch[]>(
    []
  );

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

        setMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  /* ======================================================
     KNOCKOUT MATCHES
     ====================================================== */

 const knockoutMatches =
  useMemo(() => {
    return matches.filter(
      (match) =>
        !match.stage?.startsWith(
          "Group Stage"
        )
    );
  }, [matches]);

  /* ======================================================
     STAGE FILTERS
     ====================================================== */

  const round32Matches =
    knockoutMatches.filter(
      (match) =>
        match.stage ===
        "Round of 32"
    );

  const round16Matches =
    knockoutMatches.filter(
      (match) =>
        match.stage ===
        "Round of 16"
    );

  const quarterFinalMatches =
  knockoutMatches.filter(
    (match) =>
      match.stage?.startsWith(
        "Quarterfinal"
      )
  );

const semiFinalMatches =
  knockoutMatches.filter(
    (match) =>
      match.stage?.startsWith(
        "Semifinal"
      )
  );

  const finalMatches =
    knockoutMatches.filter(
      (match) =>
        match.stage === "Final"
    );

  const stages = [
    {
      title: "Round of 32",
      matches:
        round32Matches.length,
    },

    {
      title: "Round of 16",
      matches:
        round16Matches.length,
    },

    {
      title: "Quarterfinals",
      matches:
        quarterFinalMatches.length,
    },

    {
      title: "Semifinals",
      matches:
        semiFinalMatches.length,
    },

    {
      title: "Final",
      matches:
        finalMatches.length,
    },
  ];

  return (
    <PageWrapper imageUrl={knockoutHero}>
      <main className={styles.page}>
        {/* HERO */}

        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(17,24,39,0.96), rgba(31,41,55,0.92))",

            borderRadius: "34px",

            padding: "48px",

            color: "#ffffff",

            boxShadow:
              "0 14px 40px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              display: "inline-flex",

              padding: "10px 18px",

              borderRadius: "999px",

              background:
                "rgba(255,255,255,0.08)",

              marginBottom: "22px",

              fontWeight: 800,

              letterSpacing: "0.08em",

              textTransform: "uppercase",

              fontSize: "0.82rem",
            }}
          >
            KNOCKOUT STAGE
          </div>

          <h1
            style={{
              fontSize: "4rem",

              marginBottom: "22px",
            }}
          >
            Road To The Final
          </h1>

          <p
            style={{
              maxWidth: "860px",

              lineHeight: 1.8,

              opacity: 0.82,
            }}
          >
            Explore the World Cup knockout structure,
            elimination pathways, projected bracket
            simulations and championship scenarios.
          </p>
        </section>

        {/* STAGES */}

        <section className={styles.railSection}>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
           <h2
  style={{
    color: "#111827",
    fontWeight: 900,
  }}
>
  🏆 Knockout Structure
</h2>
          </div>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",

              gap: "18px",
            }}
          >
            {stages.map(
              (stage, index) => (
                <div
                  key={stage.title}
                  style={{
                    background:
                      "linear-gradient(135deg, #111827, #1f2937)",

                    color: "#f1eded",

                    borderRadius:
                      "24px",

                    padding: "28px",

                    boxShadow:
                      "0 10px 24px rgba(0,0,0,0.22)",
                  }}
                >
                  <div
                    style={{
                      opacity: 0.7,

                      marginBottom:
                        "12px",
                    }}
                  >
                    Stage {index + 1}
                  </div>

                  <div
                    style={{
                      fontSize:
                        "1.4rem",

                      fontWeight: 900,

                      marginBottom:
                        "10px",
                    }}
                  >
                    {stage.title}
                  </div>

                  <div
                    style={{
                      opacity: 0.75,
                    }}
                  >
                    {stage.matches} Match
                    {stage.matches !== 1
                      ? "es"
                      : ""}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* LIVE KNOCKOUT MATCHES */}

        <section className={styles.railSection}>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <h2

  style={{

    color: "#111827",

    fontWeight: 900,

  }}

>

  ⚔️ Knockout Fixtures

</h2>
          </div>

          {loading ? (
            <div>
              Loading knockout
              matches...
            </div>
          ) : knockoutMatches.length ===
            0 ? (
           <div
  style={{
    color: "#111827",
    fontWeight: 700,
  }}
>
  No knockout matches
  available.
</div>
          ) : (
            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "18px",
              }}
            >
              {knockoutMatches
                .slice(0, 8)
                .map((match) => (
                  <SoccerMatchRow
                    key={match.id}
                    match={match}
                    onClick={() =>
                      navigate(
                        `/soccer/matches/${match.id}`
                      )
                    }
                  />
                ))}
            </div>
          )}
        </section>

        {/* EXPERIENCE */}

        <section className={styles.railSection}>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <h2

  style={{

    color: "#111827",

    fontWeight: 900,

  }}

>

  ⚡ Knockout Intelligence

</h2>
          </div>

          <AutoContentRail>
            <HubCard
              title="AI Bracket Projection"
              image={predictionImage}
              to="/soccer/knockout-projections"
              features={[
                {
                  label:
                    "Simulated Tournament Paths",

                  icon: <StarIcon />,
                },
              ]}
            />

            <HubCard
  title="Projected Final"
  image={finalImage}
  to="/soccer/knockout-projections"
              features={[
                {
                  label:
                    "Championship Prediction",

                  icon: <UsersIcon />,
                },
              ]}
            />

            <HubCard
              title="Knockout Fixtures"
              image={bracketImage}
              to="/soccer/matches"
              features={[
                {
                  label:
                    "Live Elimination Matches",

                  icon:
                    <CalendarIcon />,
                },
              ]}
            />
          </AutoContentRail>
        </section>

        {/* CTA */}

        <section
          style={{
            background:
              "linear-gradient(135deg, #111827, #1f2937)",

            borderRadius: "32px",

            padding: "42px",

            color: "#ffffff",

            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginTop: 0,

              fontSize: "2.2rem",

              marginBottom: "20px",
            }}
          >
            Enter The AI Projection Engine
          </h2>

          <p
            style={{
              maxWidth: "760px",

              margin:
                "0 auto 28px auto",

              lineHeight: 1.8,

              opacity: 0.82,
            }}
          >
            Simulate World Cup pathways, explore
            favorites, identify upset threats and
            follow projected champions.
          </p>

          <button
            onClick={() =>
              navigate(
                "/soccer/knockout-projections"
              )
            }
            style={{
              border: "none",

              background:
                "#2563eb",

              color:
                "#ffffff",

              padding:
                "16px 28px",

              borderRadius:
                "18px",

              fontWeight: 800,

              cursor: "pointer",

              fontSize: "1rem",
            }}
          >
            Launch Projection Engine
          </button>
        </section>
      </main>
    </PageWrapper>
  );
}