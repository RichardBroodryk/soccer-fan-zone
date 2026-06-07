import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import AutoContentRail from "../../components/ui/AutoContentRail";

import {
  soccerGreatestMoments,
} from "../../data/soccer/soccerGreatestMoments";

/* HERO */

import heroImage from "../../assets/soccer/videos/classic-finals.jpg";

/* IMAGES */

import classicFinals from "../../assets/soccer/videos/classic-finals.jpg";

import worldCupHighlights from "../../assets/soccer/videos/worldcup-highlights.jpg";

import playerInterviews from "../../assets/soccer/videos/player-interviews.jpg";

import featuredMatch from "../../assets/soccer/videos/featured-match.jpg";

export default function SoccerGreatestHitsPage() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] =
    useState("all");

  /* ======================================================
     FILTERS
     ====================================================== */

  const categories = [
    "all",
    "final",
    "goal",
    "player",
    "upset",
    "legacy",
  ];

  /* ======================================================
     FILTERED MOMENTS
     ====================================================== */

  const filteredMoments =
    useMemo(() => {
      if (
        activeCategory === "all"
      ) {
        return soccerGreatestMoments;
      }

      return soccerGreatestMoments.filter(
        (moment) =>
          moment.category ===
          activeCategory
      );
    }, [activeCategory]);

  return (
    <PageWrapper imageUrl={heroImage}>
      <main className={styles.page}>
        {/* HERO */}

        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(17,24,39,0.92))",

            borderRadius:
              "34px",

            overflow: "hidden",

            padding: "60px 40px",

            color: "#ffffff",

            position:
              "relative",
          }}
        >
          <div
            style={{
              position:
                "absolute",

              inset: 0,

              backgroundImage:
                `url(${heroImage})`,

              backgroundSize:
                "cover",

              backgroundPosition:
                "center",

              opacity: 0.25,
            }}
          />

          <div
            style={{
              position:
                "relative",

              zIndex: 2,
            }}
          >
            <div
              style={{
                marginBottom:
                  "18px",

                opacity: 0.75,

                letterSpacing:
                  "2px",

                textTransform:
                  "uppercase",
              }}
            >
              Football Archive
            </div>

            <h1
              style={{
                fontSize:
                  "4rem",

                marginBottom:
                  "20px",

                lineHeight: 1.1,
              }}
            >
              Greatest World Cup Moments
            </h1>

            <p
              style={{
                maxWidth:
                  "760px",

                lineHeight: 1.8,

                opacity: 0.88,

                fontSize:
                  "1.05rem",
              }}
            >
              Relive the legendary finals,
              unforgettable goals,
              iconic players,
              and defining moments that shaped
              football history forever.
            </p>
          </div>
        </section>

        {/* BACK */}

        <div>
          <button
            onClick={() =>
              navigate("/soccer/media")
            }
            style={{
              border: "none",

              background:
                "#111827",

              color:
                "#ffffff",

              padding:
                "14px 18px",

              borderRadius:
                "14px",

              cursor:
                "pointer",

              fontWeight: 700,
            }}
          >
            ← Back To Football Media
          </button>
        </div>

        {/* FEATURED RAIL */}

        <section
          className={
            styles.railSection
          }
        >
          <div
            style={{
              marginBottom:
                "18px",
            }}
          >
            <h2>
              🎬 Legendary Collection
            </h2>
          </div>

          <AutoContentRail>
            <div
              style={{
                backgroundImage:
                  `url(${classicFinals})`,

                backgroundSize:
                  "cover",

                backgroundPosition:
                  "center",

                borderRadius:
                  "28px",

                minHeight:
                  "320px",

                padding:
                  "30px",

                display:
                  "flex",

                alignItems:
                  "flex-end",

                color:
                  "#ffffff",

                position:
                  "relative",

                overflow:
                  "hidden",
              }}
            >
              <div
                style={{
                  position:
                    "absolute",

                  inset: 0,

                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.2))",
                }}
              />

              <div
                style={{
                  position:
                    "relative",

                  zIndex: 2,
                }}
              >
                <h2>
                  Classic Finals
                </h2>

                <p>
                  Legendary championship matches
                  from World Cup history.
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundImage:
                  `url(${worldCupHighlights})`,

                backgroundSize:
                  "cover",

                backgroundPosition:
                  "center",

                borderRadius:
                  "28px",

                minHeight:
                  "320px",

                padding:
                  "30px",

                display:
                  "flex",

                alignItems:
                  "flex-end",

                color:
                  "#ffffff",

                position:
                  "relative",

                overflow:
                  "hidden",
              }}
            >
              <div
                style={{
                  position:
                    "absolute",

                  inset: 0,

                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.2))",
                }}
              />

              <div
                style={{
                  position:
                    "relative",

                  zIndex: 2,
                }}
              >
                <h2>
                  Greatest Goals
                </h2>

                <p>
                  Moments of genius that stunned
                  the football world.
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundImage:
                  `url(${playerInterviews})`,

                backgroundSize:
                  "cover",

                backgroundPosition:
                  "center",

                borderRadius:
                  "28px",

                minHeight:
                  "320px",

                padding:
                  "30px",

                display:
                  "flex",

                alignItems:
                  "flex-end",

                color:
                  "#ffffff",

                position:
                  "relative",

                overflow:
                  "hidden",
              }}
            >
              <div
                style={{
                  position:
                    "absolute",

                  inset: 0,

                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.2))",
                }}
              />

              <div
                style={{
                  position:
                    "relative",

                  zIndex: 2,
                }}
              >
                <h2>
                  Iconic Players
                </h2>

                <p>
                  Pelé, Maradona, Zidane,
                  Messi, Ronaldo and more.
                </p>
              </div>
            </div>
          </AutoContentRail>
        </section>

        {/* FILTERS */}

        <section
          style={{
            display: "flex",

            flexWrap: "wrap",

            gap: "14px",
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

                  fontWeight: 700,

                  textTransform:
                    "capitalize",
                }}
              >
                {category}
              </button>
            )
          )}
        </section>

        {/* MOMENTS */}

        <section
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",
          }}
        >
          {filteredMoments.map(
            (moment) => (
              <article
                key={moment.id}
                style={{
                  background:
                    "linear-gradient(135deg, #111827, #1f2937)",

                  color:
                    "#ffffff",

                  borderRadius:
                    "28px",

                  overflow:
                    "hidden",

                  boxShadow:
                    "0 10px 26px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  style={{
                    height:
                      "240px",

                    backgroundImage:
                      `url(${featuredMatch})`,

                    backgroundSize:
                      "cover",

                    backgroundPosition:
                      "center",
                  }}
                />

                <div
                  style={{
                    padding:
                      "26px",
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
                        "16px",
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

                        fontWeight: 700,
                      }}
                    >
                      {
                        moment.category
                      }
                    </span>

                    <span
                      style={{
                        opacity: 0.7,
                      }}
                    >
                      {
                        moment.year
                      }
                    </span>
                  </div>

                  <h2
                    style={{
                      marginBottom:
                        "16px",

                      lineHeight:
                        1.3,
                    }}
                  >
                    {
                      moment.title
                    }
                  </h2>

                  <p
                    style={{
                      opacity: 0.82,

                      lineHeight:
                        1.7,
                    }}
                  >
                    {
                      moment.description
                    }
                  </p>

                  <div
                    style={{
                      marginTop:
                        "24px",

                      fontWeight: 700,

                      color:
                        "#60a5fa",
                    }}
                  >
                    {
                      moment.nation
                    }
                  </div>
                </div>
              </article>
            )
          )}
        </section>
      </main>
    </PageWrapper>
  );
}