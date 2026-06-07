// src/pages/soccer/SoccerWorldCupHubPage.tsx

import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import HubCard from "../../components/homepage/HubCard";

import AutoContentRail from "../../components/ui/AutoContentRail";

import worldCupHero from "../../assets/soccer/media/soccer-media-hero.jpg";

import groupsImage from "../../assets/soccer/news/worldcup-news.jpg";
import knockoutImage from "../../assets/soccer/videos/classic-finals.jpg";
import statsImage from "../../assets/soccer/media/soccer-documentaries.jpg";
import matchesImage from "../../assets/soccer/videos/featured-match.jpg";
import mediaImage from "../../assets/soccer/media/soccer-highlights.jpg";
import stadiumImage from "../../assets/soccer/stadiums/los-angeles1.jpg";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import UsersIcon from "../../components/icons/UsersIcon";
import VideoIcon from "../../components/icons/VideoIcon";

export default function SoccerWorldCupHubPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper imageUrl={worldCupHero}>
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

              alignItems: "center",

              gap: "10px",

              padding: "10px 18px",

              borderRadius: "999px",

              background:
                "rgba(255,255,255,0.08)",

              marginBottom: "24px",

              fontWeight: 800,

              letterSpacing: "0.08em",

              textTransform: "uppercase",

              fontSize: "0.82rem",
            }}
          >
            FIFA WORLD CUP 2026
          </div>

          <h1
            style={{
              fontSize: "4rem",

              lineHeight: 1,

              marginBottom: "22px",
            }}
          >
            Tournament Hub
          </h1>

          <p
            style={{
              maxWidth: "900px",

              lineHeight: 1.8,

              opacity: 0.82,

              fontSize: "1.05rem",
            }}
          >
            Explore the complete World Cup ecosystem:
            group standings, knockout projections,
            match intelligence, live tournament tracking,
            stadiums, media coverage and AI-powered
            analytics.
          </p>
        </section>

        {/* QUICK NAV */}

        <section className={styles.railSection}>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <h2>
              🌍 Tournament Navigation
            </h2>
          </div>

          <AutoContentRail>
            <HubCard
              title="Groups Overview"
              image={groupsImage}
              to="/soccer/groups"
              features={[
                {
                  label:
                    "All Groups & Standings",

                  icon: <UsersIcon />,
                },
              ]}
            />

            <HubCard
              title="Knockout Hub"
              image={knockoutImage}
              to="/soccer/knockout"
              features={[
                {
                  label:
                    "Bracket & AI Paths",

                  icon: <StarIcon />,
                },
              ]}
            />

            <HubCard
              title="Tournament Intelligence"
              image={statsImage}
              to="/soccer/tournament-center"
              features={[
                {
                  label:
                    "Predictions & Rankings",

                  icon: <StarIcon />,
                },
              ]}
            />

            <HubCard
              title="Match Center"
              image={matchesImage}
              to="/soccer/matches"
              features={[
                {
                  label:
                    "Fixtures & Live Matches",

                  icon: <CalendarIcon />,
                },
              ]}
            />

            <HubCard
              title="Media Coverage"
              image={mediaImage}
              to="/soccer/media"
              features={[
                {
                  label:
                    "Highlights & Stories",

                  icon: <VideoIcon />,
                },
              ]}
            />

            <HubCard
              title="Host Stadiums"
              image={stadiumImage}
              to="/soccer/stadiums"
              features={[
                {
                  label:
                    "2026 Venues",

                  icon: <UsersIcon />,
                },
              ]}
            />
          </AutoContentRail>
        </section>

        {/* FEATURE GRID */}

        <section
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",
          }}
        >
          {[
            {
              title:
                "Group Qualification Race",

              text:
                "Track standings movement, qualification probabilities and decisive fixtures across every World Cup group.",

              action:
                "/soccer/groups",
            },

            {
              title:
                "AI Knockout Projection",

              text:
                "Dynamic bracket simulations powered by form, momentum and prediction engines.",

              action:
                "/soccer/knockout-projections",
            },

            {
              title:
                "World Cup Intelligence",

              text:
                "Power rankings, favorites, upset alerts and tournament momentum analysis.",

              action:
                "/soccer/tournament-center",
            },
          ].map((item) => (
            <button
              key={item.title}
              onClick={() =>
                navigate(item.action)
              }
              style={{
                border: "none",

                cursor: "pointer",

                textAlign: "left",

                background:
                  "linear-gradient(135deg, #111827, #1f2937)",

                color: "#ffffff",

                borderRadius: "28px",

                padding: "32px",

                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.22)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,

                  marginBottom: "18px",

                  fontSize: "1.5rem",
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  opacity: 0.78,

                  lineHeight: 1.8,

                  marginBottom: "26px",
                }}
              >
                {item.text}
              </p>

              <div
                style={{
                  color: "#60a5fa",

                  fontWeight: 800,
                }}
              >
                Explore →
              </div>
            </button>
          ))}
        </section>
      </main>
    </PageWrapper>
  );
}