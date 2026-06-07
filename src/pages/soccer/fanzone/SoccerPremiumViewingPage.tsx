import { useNavigate } from "react-router-dom";

import PageWrapper from "../../../components/layout/PageWrapper";

import styles from "../../HomePage.module.css";

import backgroundLight from "../../../assets/soccer/ui/background-light.png";

import heroImage from "../../../assets/soccer/fanzone/soccer-premium.jpg";

import {
  soccerViewingBroadcasters,
} from "../../../data/soccer/soccerViewingBroadcasters";

export default function SoccerPremiumViewingPage() {
  const navigate = useNavigate();

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

            overflow: "hidden",

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

            padding: "52px",

            color: "#ffffff",

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
              FIFA World Cup 2026
            </div>

            <h1
              style={{
                fontSize:
                  "4rem",

                lineHeight: 1,

                marginBottom:
                  "18px",

                fontWeight: 900,
              }}
            >
              Premium Viewing
            </h1>

            <p
              style={{
                fontSize:
                  "1.1rem",

                opacity: 0.92,

                maxWidth:
                  "640px",

                lineHeight: 1.6,
              }}
            >
              Official viewing
              portals and
              broadcasters by
              nation and region.
            </p>
          </div>
        </section>

        {/* BACK */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "center",

            marginBottom:
              "42px",
          }}
        >
          <button
            onClick={() =>
              navigate(
                "/soccer/fanzone"
              )
            }
            style={{
              border: "none",

              background:
                "#2563eb",

              color: "#ffffff",

              padding:
                "14px 26px",

              borderRadius:
                "999px",

              cursor: "pointer",

              fontWeight: 800,

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

        {/* GRID */}

        <section
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",

            marginBottom:
              "60px",
          }}
        >
          {soccerViewingBroadcasters.map(
            (item) => (
              <article
                key={item.id}
                style={{
                  background:
                    "linear-gradient(135deg, #111827, #1f2937)",

                  borderRadius:
                    "28px",

                  padding:
                    "28px",

                  color:
                    "#ffffff",

                  boxShadow:
                    "0 10px 28px rgba(0,0,0,0.24)",

                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      opacity: 0.72,

                      fontSize:
                        "0.82rem",

                      marginBottom:
                        "8px",

                      letterSpacing:
                        "0.08em",

                      textTransform:
                        "uppercase",
                    }}
                  >
                    {item.region}
                  </div>

                  <h2
                    style={{
                      margin: 0,

                      fontSize:
                        "1.8rem",

                      fontWeight: 900,
                    }}
                  >
                    {
                      item.country
                    }
                  </h2>
                </div>

                <div
                  style={{
                    display:
                      "flex",

                    flexDirection:
                      "column",

                    gap: "14px",
                  }}
                >
                  {item.broadcasters.map(
                    (
                      broadcaster,
                      index
                    ) => (
                      <a
                        key={
                          broadcaster
                        }
                        href={
                          item.urls[
                            index
                          ]
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background:
                            "#2563eb",

                          color:
                            "#ffffff",

                          padding:
                            "14px 18px",

                          borderRadius:
                            "16px",

                          textDecoration:
                            "none",

                          fontWeight: 700,

                          display:
                            "flex",

                          justifyContent:
                            "space-between",

                          alignItems:
                            "center",

                          transition:
                            "all 0.2s ease",
                        }}
                      >
                        <span>
                          {
                            broadcaster
                          }
                        </span>

                        <span
                          style={{
                            opacity: 0.9,
                          }}
                        >
                          →
                        </span>
                      </a>
                    )
                  )}
                </div>
              </article>
            )
          )}
        </section>
      </main>
    </PageWrapper>
  );
}