import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../../pages/HomePage.module.css";

import newsStyles from "./SoccerNewsHubPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import AutoContentRail from "../../components/ui/AutoContentRail";

import HubCard from "../../components/homepage/HubCard";

/* HERO */

import newsHero from "../../assets/soccer/heroes/news-hero.jpg";

/* NEWS IMAGES */

import breakingNewsImage from "../../assets/soccer/news/breakingnews.jpg";

import injuryNewsImage from "../../assets/soccer/news/injurynews.jpg";

import interviewNewsImage from "../../assets/soccer/news/interviewnews.jpg";

import topStoriesImage from "../../assets/soccer/news/topstories.jpg";

import transferNewsImage from "../../assets/soccer/news/transfernews.jpg";

import analysisNewsImage from "../../assets/soccer/news/analysisnews.jpg";

/* MOMENTUM */

import {
  getHotTeams,
  type TeamMomentum,
} from "../../utils/soccer/momentumEngine";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";

import StarIcon from "../../components/icons/StarIcon";

import UsersIcon from "../../components/icons/UsersIcon";

type NewsCategory =
  | "breaking"
  | "transfers"
  | "injuries"
  | "interviews"
  | "analysis";

interface NewsItem {
  id: number;

  title: string;

  excerpt: string;

  category: NewsCategory;

  source: string;

  date: string;

  featured?: boolean;

  image: string;
}

const categories: {
  id: NewsCategory | "all";

  label: string;
}[] = [
  {
    id: "all",

    label: "All",
  },

  {
    id: "breaking",

    label: "Breaking",
  },

  {
    id: "transfers",

    label: "Transfers",
  },

  {
    id: "injuries",

    label: "Injuries",
  },

  {
    id: "interviews",

    label: "Interviews",
  },

  {
    id: "analysis",

    label: "Analysis",
  },
];

const newsItems: NewsItem[] = [
  {
    id: 1,

    title:
      "Brazil Confirm Final World Cup Squad",

    excerpt:
      "Carlo Ancelotti names his 26-man squad for World Cup 2026.",

    category: "breaking",

    source: "RAZ Football",

    date: "Just now",

    featured: true,

    image: topStoriesImage,
  },

  {
    id: 2,

    title:
      "Mbappé Injury Concern Ahead Of Opener",

    excerpt:
      "France monitoring fitness ahead of tournament launch.",

    category: "injuries",

    source: "Global Football Wire",

    date: "2h ago",

    image: injuryNewsImage,
  },

  {
    id: 3,

    title:
      "Spain Emerging As Tactical Favorites",

    excerpt:
      "Analysts praise Spain's midfield structure and press resistance.",

    category: "analysis",

    source: "MatchCenter",

    date: "Today",

    image: analysisNewsImage,
  },

  {
    id: 4,

    title:
      "Exclusive Interview With Lionel Scaloni",

    excerpt:
      "Argentina coach discusses defending the world title.",

    category: "interviews",

    source: "RAZ Football",

    date: "Yesterday",

    image: interviewNewsImage,
  },

  {
    id: 5,

    title:
      "Transfer Spotlight — Rising Stars Before 2026",

    excerpt:
      "Young talents expected to explode during the tournament.",

    category: "transfers",

    source: "Football Daily",

    date: "This Week",

    image: transferNewsImage,
  },

  {
    id: 6,

    title:
      "Tournament Pressure Rising Across Europe",

    excerpt:
      "Managers face growing expectations ahead of the knockout stages.",

    category: "breaking",

    source: "Global Matchday",

    date: "Tonight",

    image: breakingNewsImage,
  },
];

export default function SoccerNewsHubPage() {
  const navigate = useNavigate();

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<
    NewsCategory | "all"
  >("all");

  const [
    hotTeams,
    setHotTeams,
  ] = useState<
    TeamMomentum[]
  >([]);

  useEffect(() => {
    async function loadHotTeams() {
      try {
        const teams =
          await getHotTeams(4);

        setHotTeams(
          teams
        );
      } catch (error) {
        console.error(
          "Failed to load hot teams:",
          error
        );
      }
    }

    loadHotTeams();
  }, []);

  const featuredStories =
    useMemo(
      () =>
        newsItems.filter(
          (item) =>
            item.featured
        ),
      []
    );

  const filteredNews =
    useMemo(() => {
      if (
        activeCategory === "all"
      ) {
        return newsItems;
      }

      return newsItems.filter(
        (item) =>
          item.category ===
          activeCategory
      );
    }, [activeCategory]);

  return (
    <PageWrapper imageUrl={backgroundLight}>
      <main className={newsStyles.page}>
        {/* HERO */}

        <section
          className={
            newsStyles.hero
          }
          style={{
            backgroundImage:
              `url(${newsHero})`,
          }}
        >
          <div
            className={
              newsStyles.heroOverlay
            }
          />

          <div
            className={
              newsStyles.heroContent
            }
          >
            <div
              className={
                newsStyles.eyebrow
              }
            >
              World Cup 2026 Newsroom
            </div>

            <h1
              className={
                newsStyles.heroTitle
              }
            >
              Soccer News Hub
            </h1>

            <p
              className={
                newsStyles.heroText
              }
            >
              Breaking stories,
              tactical insight,
              squad announcements,
              interviews and
              tournament drama from
              around the football
              world.
            </p>
          </div>
        </section>

        {/* BREAKING */}

        <section
          className={
            newsStyles.breakingWrap
          }
        >
          <div
            className={
              newsStyles.breakingBar
            }
          >
            <div
              className={
                newsStyles.breakingLabel
              }
            >
              <span
                className={
                  newsStyles.breakingDot
                }
              />

              BREAKING
            </div>

            {newsItems.map(
              (story) => (
                <div
                  key={story.id}
                  className={
                    newsStyles.breakingItem
                  }
                >
                  {story.title}
                </div>
              )
            )}
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
                "/soccer"
              )
            }
            style={{
              border: "none",

              background:
                "#111827",

              color:
                "#ffffff",

              padding:
                "12px 18px",

              borderRadius:
                "14px",

              fontWeight: 700,

              cursor: "pointer",
            }}
          >
            ← Back To Home
          </button>
        </div>

        {/* FEATURED STORY */}

        <section
          className={
            newsStyles.section
          }
        >
          <div
            className={
              newsStyles.featuredStory
            }
            style={{
              backgroundImage:
                `url(${featuredStories[0]?.image})`,
            }}
          >
            <div
              className={
                newsStyles.featuredOverlay
              }
            />

            <div
              className={
                newsStyles.featuredContent
              }
            >
              <div
                className={
                  newsStyles.featuredTag
                }
              >
                Featured Story
              </div>

              <h2
                className={
                  newsStyles.featuredTitle
                }
              >
                {
                  featuredStories[0]
                    ?.title
                }
              </h2>

              <p
                className={
                  newsStyles.featuredText
                }
              >
                {
                  featuredStories[0]
                    ?.excerpt
                }
              </p>

              <button
                className={
                  newsStyles.readButton
                }
              >
                Read Full Story
              </button>
            </div>
          </div>
        </section>

        {/* TOP STORIES */}

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
              🔥 Top Stories
            </h2>
          </div>

          <AutoContentRail>
            {featuredStories.map(
              (story) => (
                <HubCard
                  key={story.id}
                  title={
                    story.title
                  }
                  image={
                    story.image
                  }
                  to="#"
                  features={[
                    {
                      label:
                        story.source,

                      icon:
                        <UsersIcon />,
                    },

                    {
                      label:
                        story.date,

                      icon:
                        <CalendarIcon />,
                    },

                    {
                      label:
                        story.category,

                      icon:
                        <StarIcon />,
                    },
                  ]}
                />
              )
            )}
          </AutoContentRail>
        </section>

        {/* FILTERS */}

        <section
          style={{
            display: "flex",

            gap: "14px",

            flexWrap: "wrap",
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

        {/* TRENDING NATIONS */}

        <section
          className={
            newsStyles.section
          }
        >
          <h2
            className={
              newsStyles.sectionTitle
            }
          >
            🔥 Trending Nations
          </h2>

          <div
            className={
              newsStyles.nationsGrid
            }
          >
            {hotTeams.map(
              (team) => (
                <div
                  key={
                    team.nation
                  }
                  className={
                    newsStyles.nationCard
                  }
                >
                  <div
                    className={
                      newsStyles.nationTop
                    }
                  >
                    <div
                      className={
                        newsStyles.nationName
                      }
                    >
                      {
                        team.nation
                      }
                    </div>

                    <div
                      className={
                        newsStyles.nationTrend
                      }
                    >
                      {
                        team.trend
                      }
                    </div>
                  </div>

                  <div
                    className={
                      newsStyles.nationStats
                    }
                  >
                    <div>
                      <div
                        className={
                          newsStyles.nationLabel
                        }
                      >
                        Momentum
                      </div>

                      <div
                        className={
                          newsStyles.nationValue
                        }
                      >
                        {
                          team.momentumScore
                        }
                      </div>
                    </div>

                    <div>
                      <div
                        className={
                          newsStyles.nationLabel
                        }
                      >
                        Overall
                      </div>

                      <div
                        className={
                          newsStyles.nationValue
                        }
                      >
                        {
                          team.overallRating
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* NEWS GRID */}

        <section
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",
          }}
        >
          {filteredNews.map(
            (story) => (
              <article
                key={story.id}
                style={{
                  background:
                    "#111827",

                  color:
                    "#ffffff",

                  borderRadius:
                    "28px",

                  overflow:
                    "hidden",

                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    height: "220px",

                    backgroundImage:
                      `url(${story.image})`,

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
                      display:
                        "flex",

                      gap: "12px",

                      marginBottom:
                        "14px",

                      flexWrap:
                        "wrap",

                      opacity: 0.8,

                      fontSize:
                        "0.85rem",
                    }}
                  >
                    <span>
                      {
                        story.source
                      }
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      {
                        story.date
                      }
                    </span>
                  </div>

                  <h3
                    style={{
                      marginTop: 0,

                      marginBottom:
                        "14px",

                      lineHeight:
                        1.2,
                    }}
                  >
                    {
                      story.title
                    }
                  </h3>

                  <p
                    style={{
                      opacity: 0.86,

                      lineHeight:
                        1.6,

                      marginBottom:
                        "18px",
                    }}
                  >
                    {
                      story.excerpt
                    }
                  </p>

                  <div
                    style={{
                      display:
                        "inline-flex",

                      alignItems:
                        "center",

                      gap: "8px",

                      background:
                        "#2563eb",

                      padding:
                        "8px 14px",

                      borderRadius:
                        "999px",

                      fontSize:
                        "0.8rem",

                      fontWeight: 700,
                    }}
                  >
                    {
                      story.category
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