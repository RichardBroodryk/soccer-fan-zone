// src/pages/soccer/SoccerVideosPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import AutoContentRail from "../../components/ui/AutoContentRail";

import HubCard from "../../components/homepage/HubCard";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import VideoIcon from "../../components/icons/VideoIcon";

/* IMAGES */

/* IMAGES */

import mediaHero from "../../assets/soccer/media/soccer-media-hero.jpg";

import classicFinals from "../../assets/soccer/videos/classic-finals.jpg";

import tacticsImage from "../../assets/soccer/videos/featured-match.jpg";

import interviewImage from "../../assets/soccer/videos/player-interviews.jpg";

import documentaryImage from "../../assets/soccer/videos/worldcup-highlights.jpg";

type VideoCategory =
  | "highlights"
  | "analysis"
  | "interviews"
  | "documentaries";

interface VideoItem {
  id: number;
  title: string;
  category: VideoCategory;
  duration: string;
  views: string;
  date: string;
  url: string;
  image: string;
}

const categories: {
  id: VideoCategory;
  label: string;
}[] = [
  {
    id: "highlights",
    label: "Highlights",
  },

  {
    id: "analysis",
    label: "Analysis",
  },

  {
    id: "interviews",
    label: "Interviews",
  },

  {
    id: "documentaries",
    label: "Documentaries",
  },
];

const videos: VideoItem[] = [
  {
    id: 1,

    title:
      "Argentina vs France — Classic World Cup Final",

    category: "highlights",

    duration: "18m",

    views: "2.1M",

    date: "Today",

    url: "#",

    image: classicFinals,
  },

  {
    id: 2,

    title:
      "Tactical Breakdown — Spain Pressing System",

    category: "analysis",

    duration: "12m",

    views: "640K",

    date: "2h ago",

    url: "#",

    image: tacticsImage,
  },

  {
    id: 3,

    title:
      "Mbappé Exclusive Interview",

    category: "interviews",

    duration: "9m",

    views: "1.3M",

    date: "Yesterday",

    url: "#",

    image: interviewImage,
  },

  {
    id: 4,

    title:
      "Road To 2026 Documentary",

    category: "documentaries",

    duration: "42m",

    views: "880K",

    date: "This Week",

    url: "#",

    image: documentaryImage,
  },
];

export default function SoccerVideosPage() {
  const navigate = useNavigate();

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<VideoCategory>(
    "highlights"
  );

  const filteredVideos =
    videos.filter(
      (video) =>
        video.category ===
        activeCategory
    );

  return (
    <PageWrapper imageUrl={mediaHero}>
      <main className={styles.page}>
        {/* HERO */}

        <section
          style={{
            position: "relative",

            borderRadius: "32px",

            overflow: "hidden",

            minHeight: "420px",

            backgroundImage:
              `url(${mediaHero})`,

            backgroundSize: "cover",

            backgroundPosition:
              "center",

            display: "flex",

            alignItems: "flex-end",

            padding: "48px",

            color: "#ffffff",

            boxShadow:
              "0 20px 40px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              position: "absolute",

              inset: 0,

              background:
                "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.22))",
            }}
          />

          <div
            style={{
              position: "relative",

              zIndex: 2,

              maxWidth: "700px",
            }}
          >
            <div
              style={{
                marginBottom: "12px",

                opacity: 0.8,

                fontWeight: 700,

                letterSpacing: "0.08em",

                textTransform:
                  "uppercase",
              }}
            >
              FIFA WORLD CUP 2026
            </div>

            <h1
              style={{
                fontSize: "4rem",

                lineHeight: 1,

                marginBottom: "18px",

                fontWeight: 900,
              }}
            >
              Match Videos
            </h1>

            <p
              style={{
                fontSize: "1.1rem",

                opacity: 0.92,

                maxWidth: "620px",

                lineHeight: 1.7,
              }}
            >
              Match highlights,
              tactical analysis,
              player interviews,
              documentaries,
              and cinematic football
              storytelling from the
              world game.
            </p>
          </div>
        </section>

        {/* BACK */}

        <div
          style={{
            marginTop: "24px",
          }}
        >
          <button
            onClick={() =>
              navigate(
                "/soccer/media"
              )
            }
            style={{
              border: "none",

              background:
                "#111827",

              color: "#ffffff",

              padding:
                "12px 18px",

              borderRadius:
                "14px",

              fontWeight: 700,

              cursor: "pointer",
            }}
          >
            ← Back To Media
          </button>
        </div>

        {/* FILTERS */}

        <section
          style={{
            display: "flex",

            gap: "14px",

            flexWrap: "wrap",

            marginTop: "34px",
          }}
        >
          {categories.map(
            (category) => (
              <button
                key={
                  category.id
                }
                onClick={() =>
                  setActiveCategory(
                    category.id
                  )
                }
                style={{
                  border: "none",

                  padding:
                    "14px 20px",

                  borderRadius:
                    "999px",

                  cursor:
                    "pointer",

                  fontWeight: 700,

                  background:
                    activeCategory ===
                    category.id
                      ? "#2563eb"
                      : "#111827",

                  color:
                    "#ffffff",
                }}
              >
                {
                  category.label
                }
              </button>
            )
          )}
        </section>

        {/* VIDEO RAIL */}

        <section
          className={
            styles.railSection
          }
        >
          <div
            style={{
              marginBottom: "18px",

              marginTop: "18px",
            }}
          >
            <h2>
              🔥 Trending Videos
            </h2>
          </div>

          <AutoContentRail>
            {filteredVideos.map(
              (video) => (
                <HubCard
                  key={video.id}
                  title={
                    video.title
                  }
                  image={
                    video.image
                  }
                  to="#"
                  features={[
                    {
                      label:
                        video.duration,

                      icon:
                        <VideoIcon />,
                    },

                    {
                      label:
                        video.views,

                      icon:
                        <StarIcon />,
                    },

                    {
                      label:
                        video.date,

                      icon:
                        <CalendarIcon />,
                    },
                  ]}
                />
              )
            )}
          </AutoContentRail>
        </section>

        {/* GRID */}

        <section
          style={{
            marginTop: "34px",

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",
          }}
        >
          {filteredVideos.map(
            (video) => (
              <article
                key={video.id}
                style={{
                  background:
                    "#111827",

                  borderRadius:
                    "28px",

                  overflow:
                    "hidden",

                  color:
                    "#ffffff",

                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    height: "240px",

                    backgroundImage:
                      `url(${video.image})`,

                    backgroundSize:
                      "cover",

                    backgroundPosition:
                      "center",
                  }}
                />

                <div
                  style={{
                    padding:
                      "24px",
                  }}
                >
                  <div
                    style={{
                      marginBottom:
                        "12px",

                      opacity: 0.7,

                      fontSize:
                        "0.82rem",

                      textTransform:
                        "uppercase",

                      letterSpacing:
                        "0.08em",
                    }}
                  >
                    {
                      video.category
                    }
                  </div>

                  <h3
                    style={{
                      marginTop: 0,

                      marginBottom:
                        "12px",

                      lineHeight:
                        1.25,
                    }}
                  >
                    {
                      video.title
                    }
                  </h3>

                  <div
                    style={{
                      display: "flex",

                      gap: "18px",

                      marginBottom:
                        "18px",

                      opacity: 0.85,

                      fontWeight: 700,

                      fontSize:
                        "0.92rem",
                    }}
                  >
                    <span>
                      {
                        video.duration
                      }
                    </span>

                    <span>
                      {
                        video.views
                      }
                    </span>

                    <span>
                      {video.date}
                    </span>
                  </div>

                  <button
                    style={{
                      border:
                        "none",

                      background:
                        "#2563eb",

                      color:
                        "#ffffff",

                      padding:
                        "12px 18px",

                      borderRadius:
                        "14px",

                      fontWeight: 700,

                      cursor:
                        "pointer",
                    }}
                  >
                    Watch Video
                  </button>
                </div>
              </article>
            )
          )}
        </section>
      </main>
    </PageWrapper>
  );
}