import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import AutoContentRail from "../../components/ui/AutoContentRail";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import heroImage from "../../assets/soccer/fanzone/soccer-fanzone-hero.jpg";

import loyaltyImg from "../../assets/soccer/fanzone/soccer-loyalty.jpg";

import audioImg from "../../assets/soccer/fanzone/soccer-live-audio.jpg";

import premiumImg from "../../assets/soccer/fanzone/soccer-premium.jpg";

import myTeamsImg from "../../assets/soccer/fanzone/soccer-myteams.jpg";

export default function SoccerFanzonePage() {
  const navigate = useNavigate();

  /* ======================================================
     CARD STYLES
  ====================================================== */

  const cardStyle = (
  image: string
) => ({
  width: "100%",

  maxWidth: "420px",

  minHeight: "240px",

  height: "240px",

  borderRadius: "30px",

  overflow: "hidden" as const,

  position: "relative" as const,

  backgroundImage: `url(${image})`,

  backgroundSize: "cover",

  backgroundPosition: "center",

  cursor: "pointer",

  boxShadow:
    "0 12px 28px rgba(0,0,0,0.24)",
});

  const overlayStyle = {
    position: "absolute" as const,

    inset: 0,

    background:
      "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.18))",
  };

  const contentStyle = {
    position: "absolute" as const,

    bottom: "22px",

    left: "24px",

    right: "24px",

    color: "#ffffff",
  };

  const titleStyle = {
    fontSize: "1.6rem",

    marginBottom: "10px",
  };

  const textStyle = {
    fontSize: "0.92rem",

    opacity: 0.92,

    lineHeight: 1.5,
  };

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
              `url(${heroImage})`,

            backgroundSize: "cover",

            backgroundPosition:
              "center",

            display: "flex",

            alignItems: "flex-end",

            padding: "52px",

            color: "#ffffff",

            boxShadow:
              "0 20px 40px rgba(0,0,0,0.28)",

              marginBottom: "42px",
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
              Supporter Experience
            </div>

            <h1
              style={{
                fontSize: "4.3rem",

                lineHeight: 1,

                marginBottom: "20px",

                fontWeight: 900,
              }}
            >
              Soccer Fanzone
            </h1>

            <p
              style={{
                fontSize: "1.15rem",

                opacity: 0.92,

                maxWidth: "650px",

                lineHeight: 1.6,
              }}
            >
              Matchday audio,
              loyalty systems,
              premium viewing,
              supporter identity,
              and personalized
              football experiences
              built around World Cup 2026.
            </p>
          </div>
        </section>

        {/* INTRO */}

        <section
          style={{
            background:
              "linear-gradient(135deg, #111827, #1f2937)",

            borderRadius: "30px",

            padding: "38px",

            color: "#ffffff",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              marginBottom: "14px",

              opacity: 0.7,

              fontWeight: 700,

              textTransform:
                "uppercase",

              letterSpacing:
                "0.08em",
            }}
          >
            The Global Fan Layer
          </div>

          <h2
            style={{
              marginTop: 0,

              marginBottom: "18px",

              fontSize: "2.1rem",
            }}
          >
            Football Beyond The 90 Minutes
          </h2>

          <p
            style={{
              maxWidth: "760px",

              lineHeight: 1.7,

              opacity: 0.9,
            }}
          >
            The Fanzone ecosystem
            connects identity,
            media, loyalty,
            travel, audio,
            and community into
            one continuous
            football experience.
          </p>
        </section>

        {/* FANZONE RAIL */}

        <section
          className={
            styles.railSection
          }
        >
          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <h2
  style={{
    margin: 0,

    fontSize: "2rem",

    fontWeight: 900,

    color: "#111827",

    lineHeight: 1.1,
  }}
>
  ⚽ Explore Fanzone
</h2>
          </div>

          <AutoContentRail autoAdvance>
            {/* LOYALTY */}

            <div
              onClick={() =>
                navigate(
                  "/soccer/fanzone/loyalty"
                )
              }
              style={cardStyle(
                loyaltyImg
              )}
            >
              <div
                style={
                  overlayStyle
                }
              />

              <div
                style={
                  contentStyle
                }
              >
                <h3
                  style={
                    titleStyle
                  }
                >
                  Loyalty
                </h3>

                <p
                  style={
                    textStyle
                  }
                >
                  Fan identity,
                  rewards,
                  engagement,
                  and tournament
                  recognition systems.
                </p>
              </div>
            </div>

            {/* AUDIO */}

            <div
              onClick={() =>
                navigate(
                  "/soccer/fanzone/audio"
                )
              }
              style={cardStyle(
                audioImg
              )}
            >
              <div
                style={
                  overlayStyle
                }
              />

              <div
                style={
                  contentStyle
                }
              >
                <h3
                  style={
                    titleStyle
                  }
                >
                  Live Audio
                </h3>

                <p
                  style={
                    textStyle
                  }
                >
                  Stadium atmosphere,
                  commentary,
                  fan radio,
                  and immersive
                  match experiences.
                </p>
              </div>
            </div>

            {/* PREMIUM VIEWING */}

            <div
              onClick={() =>
                navigate(
                  "/soccer/fanzone/ppv"
                )
              }
              style={cardStyle(
                premiumImg
              )}
            >
              <div
                style={
                  overlayStyle
                }
              />

              <div
                style={
                  contentStyle
                }
              >
                <h3
                  style={
                    titleStyle
                  }
                >
                  Premium Viewing
                </h3>

                <p
                  style={
                    textStyle
                  }
                >
                  Premium live viewing
                  from your nation,
                  official broadcasters,
                  and streaming portals
                  for World Cup 2026.
                </p>
              </div>
            </div>

            {/* MY TEAMS */}

            <div
              onClick={() =>
                navigate(
                  "/soccer/my-teams"
                )
              }
              style={cardStyle(
                myTeamsImg
              )}
            >
              <div
                style={
                  overlayStyle
                }
              />

              <div
                style={
                  contentStyle
                }
              >
                <h3
                  style={
                    titleStyle
                  }
                >
                  My Teams
                </h3>

                <p
                  style={
                    textStyle
                  }
                >
                  Personalized feeds,
                  alerts,
                  fixtures,
                  and supporter journeys.
                </p>
              </div>
            </div>
          </AutoContentRail>
        </section>
      </main>
    </PageWrapper>
  );
}