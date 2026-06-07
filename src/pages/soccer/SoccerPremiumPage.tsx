import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import {
  soccerPremiumFeatures,
} from "../../data/soccer/soccerPremiumFeatures";

/* HERO */

import heroImage from "../../assets/soccer/fanzone/soccer-premium.jpg";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

export default function SoccerPremiumPage() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] =
    useState("all");

  /* ======================================================
     FILTERS
     ====================================================== */

  const categories = [
    "all",
    "video",
    "audio",
    "experience",
    "archive",
  ];

  /* ======================================================
     FILTERED FEATURES
     ====================================================== */

  const filteredFeatures =
    useMemo(() => {
      if (
        activeCategory === "all"
      ) {
        return soccerPremiumFeatures;
      }

      return soccerPremiumFeatures.filter(
        (feature) =>
          feature.category ===
          activeCategory
      );
    }, [activeCategory]);

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main className={styles.page}>
        {/* HERO */}

        <section
          style={{
            position: "relative",

            borderRadius:
              "34px",

            overflow:
              "hidden",

            minHeight: "460px",

            backgroundImage:
              `url(${heroImage})`,

            backgroundSize:
              "cover",

            backgroundPosition:
              "center",

            display: "flex",

            alignItems:
              "flex-end",

            padding:
              "52px",

            color:
              "#ffffff",

            marginBottom:
              "42px",

            boxShadow:
              "0 20px 40px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              position:
                "absolute",

              inset: 0,

              background:
                "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.2))",
            }}
          />

          <div
            style={{
              position:
                "relative",

              zIndex: 2,

              maxWidth:
                "760px",
            }}
          >
            <div
              style={{
                marginBottom:
                  "12px",

                opacity: 0.8,

                fontWeight: 700,

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",
              }}
            >
              Football Premium
            </div>

            <h1
              style={{
                fontSize:
                  "4rem",

                marginBottom:
                  "20px",

                lineHeight:
                  1.05,

                fontWeight: 900,
              }}
            >
              Premium Matchday Experience
            </h1>

            <p
              style={{
                maxWidth:
                  "760px",

                lineHeight:
                  1.8,

                opacity:
                  0.9,

                fontSize:
                  "1.08rem",
              }}
            >
              Premium football
              experiences designed
              around deeper access,
              exclusive content,
              and immersive World
              Cup coverage.
            </p>
          </div>
        </section>

        {/* BACK */}

<div
  style={{
    display: "flex",

    justifyContent:
      "center",

    marginTop: "42px",

    marginBottom: "42px",
  }}
>
  <button
    onClick={() =>
      navigate("/soccer/fanzone")
    }
    style={{
      border: "none",

      background:
        "#2563eb",

      color:
        "#ffffff",

      padding:
        "14px 26px",

      borderRadius:
        "999px",

      cursor:
        "pointer",

      fontWeight:
        800,

      fontSize:
        "0.95rem",

      boxShadow:
        "0 12px 30px rgba(37,99,235,0.28)",

      transition:
        "all 0.2s ease",
    }}
  >
    ← Back To Fanzone
  </button>
</div>

        {/* FILTERS */}

        <section
          style={{
            display:
              "flex",

            flexWrap:
              "wrap",

            gap: "14px",

            marginBottom:
              "42px",
          }}
        >
          {categories.map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                style={{
                  border:
                    activeCategory ===
                    category
                      ? "2px solid #2563eb"
                      : "2px solid transparent",

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

                  fontWeight:
                    700,

                  textTransform:
                    "capitalize",

                  boxShadow:
                    activeCategory ===
                    category
                      ? "0 0 20px rgba(37,99,235,0.28)"
                      : "none",
                }}
              >
                {category}
              </button>
            )
          )}
        </section>

        {/* PREMIUM GRID */}

        <section
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",

            marginBottom:
              "56px",
          }}
        >
          {filteredFeatures.map(
            (feature) => (
              <article
                key={feature.id}
                style={{
                  background:
                    "linear-gradient(135deg, #111827, #1f2937)",

                  color:
                    "#ffffff",

                  borderRadius:
                    "28px",

                  padding:
                    "30px",

                  boxShadow:
                    "0 10px 26px rgba(0,0,0,0.24)",

                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap: "18px",
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
                  }}
                >
                  <span
                    style={{
                      background:
                        "#2563eb",

                      padding:
                        "8px 12px",

                      borderRadius:
                        "999px",

                      fontSize:
                        "0.8rem",

                      fontWeight:
                        700,

                      textTransform:
                        "capitalize",
                    }}
                  >
                    {
                      feature.category
                    }
                  </span>

                  <span
                    style={{
                      color:
                        "#facc15",

                      fontWeight:
                        800,
                    }}
                  >
                    {
                      feature.tier
                    }
                  </span>
                </div>

                <h2
                  style={{
                    lineHeight:
                      1.3,

                    margin: 0,

                    fontSize:
                      "1.6rem",
                  }}
                >
                  {
                    feature.title
                  }
                </h2>

                <p
                  style={{
                    opacity:
                      0.84,

                    lineHeight:
                      1.7,

                    margin: 0,
                  }}
                >
                  {
                    feature.description
                  }
                </p>

                <button
                  style={{
                    marginTop:
                      "auto",

                    border:
                      "none",

                    background:
                      "#2563eb",

                    color:
                      "#ffffff",

                    padding:
                      "14px 18px",

                    borderRadius:
                      "14px",

                    cursor:
                      "pointer",

                    fontWeight:
                      700,
                  }}
                >
                  Unlock Feature
                </button>
              </article>
            )
          )}
        </section>

        {/* PREMIUM CTA */}

        <section
          style={{
            background:
              "linear-gradient(135deg, #111827, #1f2937)",

            borderRadius:
              "34px",

            padding:
              "48px",

            color:
              "#ffffff",

            textAlign:
              "center",

            marginBottom:
              "60px",

            boxShadow:
              "0 14px 34px rgba(0,0,0,0.18)",
          }}
        >
          <h2
            style={{
              fontSize:
                "2.4rem",

              marginBottom:
                "20px",
            }}
          >
            Upgrade Your World Cup Experience
          </h2>

          <p
            style={{
              maxWidth:
                "760px",

              margin:
                "0 auto 30px",

              lineHeight:
                1.8,

              opacity:
                0.84,
            }}
          >
            Unlock deeper
            football coverage,
            premium content,
            exclusive archives,
            and enhanced live
            matchday experiences.
          </p>

          <button
            style={{
              border:
                "none",

              background:
                "#2563eb",

              color:
                "#ffffff",

              padding:
                "18px 28px",

              borderRadius:
                "999px",

              fontWeight:
                800,

              cursor:
                "pointer",

              fontSize:
                "1rem",

              boxShadow:
                "0 12px 28px rgba(37,99,235,0.3)",
            }}
          >
            Explore Premium Plans
          </button>
        </section>
      </main>
    </PageWrapper>
  );
}