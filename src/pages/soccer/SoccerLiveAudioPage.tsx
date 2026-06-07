import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import audioHero from "../../assets/soccer/fanzone/soccer-live-audio.jpg";

import {
  soccerBroadcasters,
} from "../../data/soccer/soccerBroadcasters";

import {
  recordSoccerLoyaltyAction,
} from "../../utils/soccer/soccerLoyaltyHooks";

export default function SoccerLiveAudioPage() {
  const navigate = useNavigate();

  /* ======================================================
     LOYALTY TRACKING
     ====================================================== */

  useEffect(() => {
    recordSoccerLoyaltyAction(
      "audio_view"
    );
  }, []);

  /* ======================================================
     GROUP BROADCASTERS
     ====================================================== */

  const grouped =
    soccerBroadcasters.reduce(
      (
        acc: any,
        broadcaster: any
      ) => {
        if (
          !acc[
            broadcaster.country
          ]
        ) {
          acc[
            broadcaster.country
          ] = [];
        }

        acc[
          broadcaster.country
        ].push(broadcaster);

        return acc;
      },
      {}
    );

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
              `url(${audioHero})`,

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
              Matchday Audio
            </div>

            <h1
              style={{
                fontSize:
                  "4.1rem",

                lineHeight: 1,

                marginBottom:
                  "20px",

                fontWeight: 900,
              }}
            >
              Live Match Audio
            </h1>

            <p
              style={{
                fontSize:
                  "1.1rem",

                opacity: 0.92,

                maxWidth:
                  "650px",

                lineHeight: 1.7,
              }}
            >
              Official international
              football commentary
              and authorised radio
              coverage from global
              broadcast partners
              throughout World Cup
              2026.
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

              color:
                "#ffffff",

              padding:
                "14px 26px",

              borderRadius:
                "999px",

              cursor:
                "pointer",

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

        {/* INTRO */}

        <section
          style={{
            background:
              "linear-gradient(135deg, #111827, #1f2937)",

            color:
              "#ffffff",

            borderRadius:
              "28px",

            padding:
              "34px",

            lineHeight: 1.8,

            marginBottom:
              "48px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.18)",
          }}
        >
          Radio and audio
          commentary remain one
          of the most authentic
          ways to follow
          international football
          during the World Cup.
        </section>

        {/* BROADCASTERS */}

        <section
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "48px",

            marginBottom:
              "60px",
          }}
        >
          {Object.entries(
            grouped
          ).map(
            ([
              country,
              list,
            ]: any) => (
              <div
                key={country}
              >
                <h2
                  style={{
                    marginBottom:
                      "22px",

                    color:
                      "#111827",

                    fontSize:
                      "2rem",

                    fontWeight: 900,
                  }}
                >
                  {country}
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
                  {list.map(
                    (
                      broadcaster: any
                    ) => (
                      <a
                        key={
                          broadcaster.id
                        }
                        href={
                          broadcaster.url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          recordSoccerLoyaltyAction(
                            "audio_listen"
                          )
                        }
                        style={{
                          background:
                            "linear-gradient(135deg, #111827, #1f2937)",

                          color:
                            "#ffffff",

                          borderRadius:
                            "24px",

                          padding:
                            "26px",

                          textDecoration:
                            "none",

                          display:
                            "flex",

                          flexDirection:
                            "column",

                          gap: "12px",

                          boxShadow:
                            "0 10px 24px rgba(0,0,0,0.16)",
                        }}
                      >
                        <strong
                          style={{
                            fontSize:
                              "1.1rem",
                          }}
                        >
                          {
                            broadcaster.name
                          }
                        </strong>

                        <span
                          style={{
                            opacity: 0.72,
                          }}
                        >
                          {
                            broadcaster.country
                          }
                        </span>

                        <span
                          style={{
                            marginTop:
                              "10px",

                            color:
                              "#60a5fa",

                            fontWeight: 700,
                          }}
                        >
                          Open Broadcast →
                        </span>
                      </a>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </section>
      </main>
    </PageWrapper>
  );
}