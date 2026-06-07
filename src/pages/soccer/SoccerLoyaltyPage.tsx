import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import loyaltyHero from "../../assets/soccer/fanzone/soccer-loyalty.jpg";

import SoccerLoyaltyCard from "../../components/fanzone/SoccerLoyaltyCard";

type TierKey =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum";

export default function SoccerLoyaltyPage() {
  const navigate = useNavigate();

  const [tier, setTier] =
    useState<TierKey>("bronze");

  const [points, setPoints] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  /* ======================================================
     LOAD LOYALTY
     ====================================================== */

  useEffect(() => {
    try {
      const matches =
        Number(
          localStorage.getItem(
            "soccer_matches_followed"
          )
        ) || 0;

      const videos =
        Number(
          localStorage.getItem(
            "soccer_videos_watched"
          )
        ) || 0;

      const stadiums =
        Number(
          localStorage.getItem(
            "soccer_stadiums_viewed"
          )
        ) || 0;

      const calculatedPoints =
        matches * 50 +
        videos * 10 +
        stadiums * 25;

      setPoints(calculatedPoints);

      let calculatedTier: TierKey =
        "bronze";

      if (calculatedPoints >= 7000)
        calculatedTier = "platinum";
      else if (
        calculatedPoints >= 3000
      )
        calculatedTier = "gold";
      else if (
        calculatedPoints >= 1000
      )
        calculatedTier = "silver";

      setTier(calculatedTier);
    } catch (error) {
      console.warn(
        "Soccer loyalty load failed",
        error
      );

      setPoints(0);

      setTier("bronze");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PageWrapper imageUrl={backgroundLight}>
      <main className={styles.page}>
        {/* HERO */}

        <section
          style={{
            position: "relative",

            borderRadius: "34px",

            overflow: "hidden",

            minHeight: "460px",

            backgroundImage:
              `url(${loyaltyHero})`,

            backgroundSize: "cover",

            backgroundPosition:
              "center",

            display: "flex",

            alignItems: "flex-end",

            padding: "52px",

            color: "#ffffff",

            marginBottom: "42px",

            boxShadow:
              "0 20px 40px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              position: "absolute",

              inset: 0,

              background:
                "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.2))",
            }}
          />

          <div
            style={{
              position: "relative",

              zIndex: 2,

              maxWidth: "760px",
            }}
          >
            <div
              style={{
                marginBottom: "12px",

                opacity: 0.8,

                fontWeight: 700,

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",
              }}
            >
              Supporter Identity
            </div>

            <h1
              style={{
                fontSize: "4.1rem",

                lineHeight: 1,

                marginBottom: "20px",

                fontWeight: 900,
              }}
            >
              Global Football Standing
            </h1>

            <p
              style={{
                fontSize: "1.1rem",

                opacity: 0.92,

                maxWidth: "650px",

                lineHeight: 1.7,
              }}
            >
              Your supporter standing
              reflects long-term
              engagement across the
              World Cup ecosystem
              including matches,
              media, stadiums,
              loyalty progression
              and premium supporter
              experiences.
            </p>
          </div>
        </section>

        {/* BACK */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "center",

            marginBottom: "42px",
          }}
        >
          <button
            onClick={() =>
              navigate("/soccer/fanzone")
            }
            style={{
              border: "none",

              background: "#2563eb",

              color: "#ffffff",

              padding:
                "14px 26px",

              borderRadius:
                "999px",

              cursor: "pointer",

              fontWeight: 800,

              fontSize: "0.95rem",

              boxShadow:
                "0 12px 30px rgba(37,99,235,0.28)",

              transition:
                "all 0.2s ease",
            }}
          >
            ← Back To Fanzone
          </button>
        </div>

        {/* CARD */}

        <section
          style={{
            marginBottom: "42px",
          }}
        >
          {loading ? (
            <div
              style={{
                background:
                  "rgba(17,24,39,0.92)",

                color: "#ffffff",

                padding: "28px",

                borderRadius: "24px",
              }}
            >
              Loading standing...
            </div>
          ) : (
            <SoccerLoyaltyCard
              userTier={tier}
              points={points}
            />
          )}
        </section>

        {/* INFO */}

        <section
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",

            gap: "24px",

            marginBottom: "60px",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #111827, #1f2937)",

              color: "#ffffff",

              borderRadius: "24px",

              padding: "28px",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.18)",
            }}
          >
            <h2>
              Priority Access
            </h2>

            <p
              style={{
                opacity: 0.82,

                lineHeight: 1.7,
              }}
            >
              Early access to premium
              World Cup experiences
              and featured content.
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, #111827, #1f2937)",

              color: "#ffffff",

              borderRadius: "24px",

              padding: "28px",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.18)",
            }}
          >
            <h2>
              Premium Features
            </h2>

            <p
              style={{
                opacity: 0.82,

                lineHeight: 1.7,
              }}
            >
              Enhanced matchday
              experiences,
              alternate commentary
              feeds and premium
              editorial access.
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, #111827, #1f2937)",

              color: "#ffffff",

              borderRadius: "24px",

              padding: "28px",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.18)",
            }}
          >
            <h2>
              Long-Term Progression
            </h2>

            <p
              style={{
                opacity: 0.82,

                lineHeight: 1.7,
              }}
            >
              Standing evolves over
              time through sustained
              interaction with the
              football ecosystem.
            </p>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}