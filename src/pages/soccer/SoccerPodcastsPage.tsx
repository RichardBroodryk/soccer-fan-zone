import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import podcastsHero from "../../assets/soccer/podcasts/worldcup-central.jpg";

import backgroundImage from "../../assets/soccer/ui/background-light.png";

import podcastOne from "../../assets/soccer/podcasts/podcasts-totallyfootball.jpg";

import podcastTwo from "../../assets/soccer/podcasts/podcasts-footballweekly.jpg";

import podcastThree from "../../assets/soccer/podcasts/podcasts-tifo.jpg";

import podcastFour from "../../assets/soccer/podcasts/podcasts-meninblazers.jpg";

import podcastFive from "../../assets/soccer/podcasts/podcasts-theoverlap.jpg";

type PodcastCategory =
  | "world-cup"
  | "tactics"
  | "daily"
  | "interviews"
  | "fan";

interface Podcast {
  id: number;
  title: string;
  host: string;
  category: PodcastCategory;
  description: string;
  image: string;
  url: string;
}

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "The Totally Football Show",
    host: "James Richardson",
    category: "daily",
    description:
      "One of the world’s most respected football podcasts covering the Premier League, Champions League, World Cup football, and major global storylines with elite journalists and analysts.",
    image: podcastOne,
    url: "https://thetotallyfootballshow.com",
  },

  {
    id: 2,
    title: "Football Weekly",
    host: "The Guardian",
    category: "daily",
    description:
      "A long-running football podcast featuring tactical analysis, breaking football stories, supporter culture, and major international tournament discussion.",
    image: podcastTwo,
    url: "https://www.theguardian.com/football/series/footballweekly",
  },

  {
    id: 3,
    title: "Tifo Football Podcast",
    host: "Tifo Football",
    category: "tactics",
    description:
      "Deep tactical breakdowns, coaching philosophy, football systems, and advanced match intelligence from one of the most respected football analysis brands.",
    image: podcastThree,
    url: "https://tifofootball.com",
  },

  {
    id: 4,
    title: "Men In Blazers",
    host: "Roger Bennett",
    category: "fan",
    description:
      "A globally popular football culture podcast blending football analysis, supporter emotion, World Cup coverage, and entertainment storytelling.",
    image: podcastFour,
    url: "https://meninblazers.com",
  },

  {
    id: 5,
    title: "The Overlap",
    host: "Gary Neville & Jamie Carragher",
    category: "interviews",
    description:
      "Elite football interviews, dressing-room stories, tactical discussion, and conversations with major football personalities from across the game.",
    image: podcastFive,
    url: "https://www.youtube.com/@TheOverlap",
  },
];

const categories: {
  id: PodcastCategory | "all";
  label: string;
}[] = [
  {
    id: "all",
    label: "All",
  },

  {
    id: "world-cup",
    label: "World Cup",
  },

  {
    id: "tactics",
    label: "Tactics",
  },

  {
    id: "daily",
    label: "Daily Shows",
  },

  {
    id: "interviews",
    label: "Interviews",
  },

  {
    id: "fan",
    label: "Fan Media",
  },
];

export default function SoccerPodcastsPage() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<
    PodcastCategory | "all"
  >("all");

  const filteredPodcasts = useMemo(() => {
    if (activeCategory === "all") {
      return podcasts;
    }

    return podcasts.filter(
      (podcast) => podcast.category === activeCategory
    );
  }, [activeCategory]);

  const featuredPodcast = podcasts[0];

  return (
    <PageWrapper imageUrl={backgroundImage}>
      <main className={styles.page}>
        {/* HERO */}

        <section
          style={{
            position: "relative",

            borderRadius: "36px",

            overflow: "hidden",

            minHeight: "460px",

            backgroundImage: `url(${podcastsHero})`,

            backgroundSize: "cover",

            backgroundPosition: "center",

            display: "flex",

            alignItems: "flex-end",

            padding: "56px",

            color: "#ffffff",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.38)",
          }}
        >
          <div
            style={{
              position: "absolute",

              inset: 0,

              background:
                "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.18))",
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

                opacity: 0.82,

                fontWeight: 700,

                letterSpacing: "0.12em",

                textTransform: "uppercase",
              }}
            >
              Soccer Audio Network
            </div>

            <h1
              style={{
                fontSize: "4.4rem",

                lineHeight: 1,

                marginBottom: "18px",

                fontWeight: 900,
              }}
            >
              Podcasts
            </h1>

            <p
              style={{
                fontSize: "1.08rem",

                opacity: 0.92,

                lineHeight: 1.7,

                maxWidth: "640px",
              }}
            >
              Tactical football analysis, supporter culture,
              World Cup discussion, transfer intelligence,
              elite interviews, and global football storytelling.
            </p>
          </div>
        </section>

        {/* BACK */}

        <div
          style={{
            marginTop: "26px",
          }}
        >
          <button
            onClick={() =>
              navigate("/soccer/media")
            }
            style={{
              border: "none",

              background: "#111827",

              color: "#ffffff",

              padding: "12px 18px",

              borderRadius: "14px",

              fontWeight: 700,

              cursor: "pointer",
            }}
          >
            ← Back To Media
          </button>
        </div>

        {/* FEATURED */}

        <section
          style={{
            marginTop: "32px",

            background:
              "linear-gradient(135deg, #0f172a, #111827)",

            borderRadius: "32px",

            overflow: "hidden",

            display: "grid",

            gridTemplateColumns: "360px 1fr",

            gap: "34px",

            color: "#ffffff",

            boxShadow:
              "0 14px 36px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              minHeight: "360px",

              backgroundImage:
                `url(${featuredPodcast.image})`,

              backgroundSize: "cover",

              backgroundPosition: "center",
            }}
          />

          <div
            style={{
              padding: "40px",
            }}
          >
            <div
              style={{
                marginBottom: "12px",

                opacity: 0.72,

                textTransform: "uppercase",

                letterSpacing: "0.08em",

                fontWeight: 700,
              }}
            >
              Featured Podcast
            </div>

            <h2
              style={{
                marginTop: 0,

                marginBottom: "18px",

                fontSize: "2.4rem",
              }}
            >
              {featuredPodcast.title}
            </h2>

            <div
              style={{
                marginBottom: "18px",

                opacity: 0.86,

                fontWeight: 700,
              }}
            >
              Hosted By {featuredPodcast.host}
            </div>

            <p
              style={{
                lineHeight: 1.8,

                opacity: 0.92,

                maxWidth: "680px",

                marginBottom: "28px",
              }}
            >
              {featuredPodcast.description}
            </p>

            <a
              href={featuredPodcast.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",

                alignItems: "center",

                justifyContent: "center",

                textDecoration: "none",

                border: "none",

                background: "#2563eb",

                color: "#ffffff",

                padding: "14px 22px",

                borderRadius: "16px",

                fontWeight: 800,
              }}
            >
              Listen Now
            </a>
          </div>
        </section>

        {/* FILTERS */}

        <section
          style={{
            marginTop: "36px",

            display: "flex",

            gap: "14px",

            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setActiveCategory(category.id)
              }
              style={{
                border: "none",

                padding: "14px 20px",

                borderRadius: "999px",

                cursor: "pointer",

                fontWeight: 700,

                background:
                  activeCategory === category.id
                    ? "#2563eb"
                    : "#111827",

                color: "#ffffff",
              }}
            >
              {category.label}
            </button>
          ))}
        </section>

        {/* PODCAST GRID */}

        <section
          style={{
            marginTop: "36px",

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "26px",
          }}
        >
          {filteredPodcasts.map((podcast) => (
            <article
              key={podcast.id}
              style={{
                background: "#111827",

                borderRadius: "30px",

                overflow: "hidden",

                color: "#ffffff",

                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  height: "240px",

                  backgroundImage:
                    `url(${podcast.image})`,

                  backgroundSize: "cover",

                  backgroundPosition: "center",
                }}
              />

              <div
                style={{
                  padding: "26px",
                }}
              >
                <div
                  style={{
                    marginBottom: "12px",

                    opacity: 0.68,

                    fontSize: "0.84rem",

                    textTransform: "uppercase",

                    letterSpacing: "0.08em",
                  }}
                >
                  {podcast.category}
                </div>

                <h3
                  style={{
                    marginTop: 0,

                    marginBottom: "12px",

                    lineHeight: 1.2,
                  }}
                >
                  {podcast.title}
                </h3>

                <div
                  style={{
                    marginBottom: "14px",

                    fontWeight: 700,

                    opacity: 0.86,
                  }}
                >
                  {podcast.host}
                </div>

                <p
                  style={{
                    opacity: 0.88,

                    lineHeight: 1.7,

                    marginBottom: "22px",
                  }}
                >
                  {podcast.description}
                </p>

                <a
                  href={podcast.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",

                    alignItems: "center",

                    justifyContent: "center",

                    textDecoration: "none",

                    border: "none",

                    background: "#2563eb",

                    color: "#ffffff",

                    padding: "12px 18px",

                    borderRadius: "14px",

                    fontWeight: 700,
                  }}
                >
                  Open Podcast
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </PageWrapper>
  );
}