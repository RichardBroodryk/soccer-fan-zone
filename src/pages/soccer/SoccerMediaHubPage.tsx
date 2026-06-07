// src/pages/soccer/SoccerMediaHubPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "../../pages/HomePage.module.css";

import {
  useNavigate,
} from "react-router-dom";

import PageWrapper from "../../components/layout/PageWrapper";

import AutoContentRail from "../../components/ui/AutoContentRail";

import HubCard from "../../components/homepage/HubCard";

/* IMAGES */

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import mediaHero from "../../assets/soccer/media/soccer-media-hero.jpg";

import featuredImage from "../../assets/soccer/videos/classic-finals.jpg";

import tacticsImage from "../../assets/soccer/videos/featured-match.jpg";

import creatorImage from "../../assets/soccer/media/soccer-media-hero.jpg";

import podcastImage from "../../assets/soccer/podcasts/worldcup-central.jpg";

/* ICONS */

import StarIcon from "../../components/icons/StarIcon";

import VideoIcon from "../../components/icons/VideoIcon";

import UsersIcon from "../../components/icons/UsersIcon";

import CalendarIcon from "../../components/icons/CalendarIcon";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* DATA */

import { teams } from "../../data/soccer/teams";

/* UTILS */

import {
  getTrendingMatches,
} from "../../utils/soccer/matchIntelligence";

import {
  getHotTeams,
} from "../../utils/soccer/momentumEngine";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import type {
  TeamMomentum,
} from "../../utils/soccer/momentumEngine";

export default function SoccerMediaHubPage() {
  const navigate =
    useNavigate();

  /* ======================================================
     STATE
     ====================================================== */

  const [
    matches,
    setMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const [
    hotTeams,
    setHotTeams,
  ] = useState<
    TeamMomentum[]
  >([]);

  /* ======================================================
     API SAFE TEAMS
     ====================================================== */

  const safeTeams =
    Array.isArray(teams)
      ? teams
      : [];

  /* ======================================================
     LOAD MATCHES
     ====================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      try {
        setLoading(true);

        setError(null);

        const response =
          await getAllWorldCupMatches();

        const hotTeamsData =
          await getHotTeams(6);

        if (!mounted)
          return;

        const safeMatches =
          Array.isArray(
            response
          )
            ? response
            : [];

        /* ======================================================
           NORMALIZE API RESPONSE
           ====================================================== */

        const normalizedMatches =
          safeMatches.map(
            (
              match: SoccerMatch
            ) => ({
              ...match,

              id:
                match.id ||
                `match-${Math.random()
                  .toString(
                    36
                  )
                  .slice(2)}`,

              home:
                match.home ||
                "Home Team",

              away:
                match.away ||
                "Away Team",

              stage:
                match.stage ||
                "Tournament Match",

              group:
                match.group ||
                "World Cup",

              stadium:
                match.stadium ||
                "World Cup Stadium",

              stadiumId:
                match.stadiumId ||
                "unknown-stadium",

              city:
                match.city ||
                "Host City",

              status:
                match.status ||
                "upcoming",

              date:
                match.date ||
                "World Cup 2026",

              minute:
                match.minute ??
                0,

              homeScore:
                match.homeScore ??
                0,

              awayScore:
                match.awayScore ??
                0,
            })
          );

        setMatches(
          normalizedMatches
        );

        setHotTeams(
          hotTeamsData
        );
      } catch (
        err
      ) {
        console.error(
          "Failed to load media matches:",
          err
        );

        if (!mounted)
          return;

        setError(
          "Unable to load football media intelligence."
        );

        setMatches([]);
      } finally {
        if (mounted) {
          setLoading(
            false
          );
        }
      }
    }

    loadMatches();

    return () => {
      mounted = false;
    };
  }, []);

  /* ======================================================
     MEDIA INTELLIGENCE
     ====================================================== */

  const trendingMatches =
    useMemo(() => {
      return (
        getTrendingMatches(
          matches,
          8
        ) || []
      );
    }, [matches]);


  /* preserve existing dataset touch */

  safeTeams.slice(0, 8);

  /* ======================================================
     AI STORYLINES
     ====================================================== */

  const storylines = [
    {
      title:
        "Can Argentina Defend The Crown?",

      description:
        "Messi’s final World Cup mission becomes football’s biggest global storyline.",
    },

    {
      title:
        "Pochettino’s USA Dream",

      description:
        "The hosts attempt to ignite a new era on home soil under Mauricio Pochettino.",
    },

    {
      title:
        "Brazil’s New Era Under Ancelotti",

      description:
        "A legendary manager attempts to restore Brazil to the summit of world football.",
    },

    {
      title:
        "Morocco Ready For Another Miracle?",

      description:
        "After their historic 2022 run, Morocco return with belief and expectation.",
    },
  ];

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main className={styles.page}>
        {/* ======================================================
            HERO
            ====================================================== */}

        <section
          style={{
            position:
              "relative",

            borderRadius:
              "32px",

            overflow:
              "hidden",

            minHeight:
              "520px",

            display:
              "flex",

            alignItems:
              "flex-end",

            backgroundImage:
              `url(${mediaHero})`,

            backgroundSize:
              "cover",

            backgroundPosition:
              "center",

            boxShadow:
              "0 18px 40px rgba(0,0,0,0.32)",
          }}
        >
          <div
            style={{
              position:
                "absolute",

              inset: 0,

              background:
                "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.18))",
            }}
          />

          <div
            style={{
              position:
                "relative",

              zIndex: 2,

              padding:
                "42px",

              maxWidth:
                "760px",

              color:
                "#ffffff",
            }}
          >
            <div
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap: "10px",

                background:
                  "rgba(255,255,255,0.12)",

                border:
                  "1px solid rgba(255,255,255,0.12)",

                borderRadius:
                  "999px",

                padding:
                  "10px 18px",

                marginBottom:
                  "20px",

                fontWeight:
                  700,

                backdropFilter:
                  "blur(10px)",
              }}
            >
              <VideoIcon />

              Football Media
              Central
            </div>

            <h1
              style={{
                fontSize:
                  "4rem",

                lineHeight:
                  1,

                marginBottom:
                  "20px",

                fontWeight:
                  900,
              }}
            >
              The 2026
              World Cup Is
              Already Alive
            </h1>

            <p
              style={{
                fontSize:
                  "1.15rem",

                lineHeight:
                  1.7,

                opacity:
                  0.92,

                marginBottom:
                  "28px",
              }}
            >
              Trending
              matches,
              creator clips,
              tactical
              breakdowns,
              fan reactions,
              and
              AI-powered
              football
              storylines
              from across
              the global
              game.
            </p>

            <div
              style={{
                display:
                  "flex",

                flexWrap:
                  "wrap",

                gap: "16px",
              }}
            >
              <button
                onClick={() =>
                  navigate(
                    "/soccer/matches"
                  )
                }
                style={{
                  border:
                    "none",

                  background:
                    "#2563eb",

                  color:
                    "#ffffff",

                  padding:
                    "16px 22px",

                  borderRadius:
                    "18px",

                  fontWeight:
                    800,

                  cursor:
                    "pointer",
                }}
              >
                Explore
                Matches
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/soccer/live"
                  )
                }
                style={{
                  border:
                    "1px solid rgba(255,255,255,0.2)",

                  background:
                    "rgba(255,255,255,0.08)",

                  color:
                    "#ffffff",

                  padding:
                    "16px 22px",

                  borderRadius:
                    "18px",

                  fontWeight:
                    800,

                  cursor:
                    "pointer",

                  backdropFilter:
                    "blur(10px)",
                }}
              >
                Live Match
                Center
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================
            LOADING
            ====================================================== */}

        {loading && (
          <section
            style={{
              marginTop:
                "32px",

              padding:
                "32px",

              borderRadius:
                "28px",

              background:
                "rgba(255,255,255,0.84)",

              backdropFilter:
                "blur(12px)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color:
                  "#111827",

                fontSize:
                  "2rem",

                fontWeight:
                  900,

                marginBottom:
                  "12px",
              }}
            >
              Loading
              Football
              Media...
            </h2>

            <p
              style={{
                color:
                  "#4b5563",

                lineHeight:
                  1.7,
              }}
            >
              Synchronizing
              live football
              intelligence,
              trending
              fixtures and
              creator
              storylines.
            </p>
          </section>
        )}

        {/* ======================================================
            ERROR
            ====================================================== */}

        {!loading &&
          error && (
            <section
              style={{
                marginTop:
                  "32px",

                padding:
                  "32px",

                borderRadius:
                  "28px",

                background:
                  "rgba(255,255,255,0.84)",

                backdropFilter:
                  "blur(12px)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  color:
                    "#111827",

                  fontSize:
                    "2rem",

                  fontWeight:
                    900,

                  marginBottom:
                    "12px",
                }}
              >
                Media Feed
                Temporarily
                Unavailable
              </h2>

              <p
                style={{
                  color:
                    "#4b5563",

                  lineHeight:
                    1.7,
                }}
              >
                Football
                media systems
                are currently
                reconnecting.
                Please try
                again
                shortly.
              </p>
            </section>
          )}

        {/* ======================================================
            TRENDING NOW
            ====================================================== */}

        {!loading && (
          <section
            className={
              styles.railSection
            }
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
                  "18px",
              }}
            >
              <h2>
                🔥 Trending
                Now
              </h2>
            </div>

            <AutoContentRail>
              {trendingMatches.map(
                (
                  match: SoccerMatch
                ) => (
                  <HubCard
                    key={
                      match.id ||
                      `${match.home}-${match.away}-${match.date}`
                    }
                    title={`${match.home || "Home Team"} vs ${
                      match.away || "Away Team"
                    }`}
                    image={
                      featuredImage ||
                      creatorImage
                    }
                    to={`/soccer/matches/${
                      match.id ||
                      "unknown-match"
                    }`}
                    features={[
                      {
                        label:
                          match.stage ||
                          "Tournament Match",

                        icon:
                          <StarIcon />,
                      },

                      {
                        label:
                          match.date ||
                          "World Cup 2026",

                        icon:
                          <CalendarIcon />,
                      },

                      {
                        label:
                          "High Fan Buzz",

                        icon:
                          <UsersIcon />,
                      },
                    ]}
                  />
                )
              )}
            </AutoContentRail>
          </section>
        )}

        {/* ======================================================
            CREATOR CONTENT
            ====================================================== */}

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
              🎥 Creator
              Spotlight
            </h2>
          </div>

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",

              gap: "24px",
            }}
          >
            {[
              {
                title:
                  "Tactical Breakdown",

                subtitle:
                  "How Spain’s midfield overload is reshaping the tournament.",

                image:
                  tacticsImage ||
                  creatorImage,
              },

              {
                title:
                  "Fan Reactions",

                subtitle:
                  "South Africa’s opening match creates global excitement.",

                image:
                  creatorImage,
              },

              {
                title:
                  "Podcast Central",

                subtitle:
                  "Football creators and analysts covering every major storyline.",

                image:
                  podcastImage ||
                  creatorImage,
              },
            ].map(
              (card) => (
                <div
                  key={
                    card.title
                  }
                  style={{
                    position:
                      "relative",

                    borderRadius:
                      "28px",

                    overflow:
                      "hidden",

                    minHeight:
                      "360px",

                    backgroundImage:
                      `url(${card.image || creatorImage})`,

                    backgroundSize:
                      "cover",

                    backgroundPosition:
                      "center",

                    boxShadow:
                      "0 14px 32px rgba(0,0,0,0.22)",

                    cursor:
                      "pointer",
                  }}
                >
                  <div
                    style={{
                      position:
                        "absolute",

                      inset: 0,

                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.12))",
                    }}
                  />

                  <div
                    style={{
                      position:
                        "absolute",

                      bottom: 0,

                      padding:
                        "28px",

                      color:
                        "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        marginBottom:
                          "12px",

                        display:
                          "inline-flex",

                        alignItems:
                          "center",

                        gap: "8px",

                        background:
                          "rgba(255,255,255,0.12)",

                        padding:
                          "8px 14px",

                        borderRadius:
                          "999px",

                        fontWeight:
                          700,

                        backdropFilter:
                          "blur(10px)",
                      }}
                    >
                      <VideoIcon />

                      Creator
                      Feature
                    </div>

                    <h3
                      style={{
                        fontSize:
                          "1.8rem",

                        marginBottom:
                          "12px",

                        fontWeight:
                          900,
                      }}
                    >
                      {
                        card.title
                      }
                    </h3>

                    <p
                      style={{
                        lineHeight:
                          1.7,

                        opacity:
                          0.92,
                      }}
                    >
                      {
                        card.subtitle
                      }
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* ======================================================
            AI STORYLINES
            ====================================================== */}

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
              ⚡ AI
              Storylines
            </h2>
          </div>

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",

              gap: "20px",
            }}
          >
            {storylines.map(
              (
                storyline
              ) => (
                <div
                  key={
                    storyline.title
                  }
                  style={{
                    background:
                      "linear-gradient(135deg, #111827, #1f2937)",

                    color:
                      "#ffffff",

                    borderRadius:
                      "26px",

                    padding:
                      "28px",

                    boxShadow:
                      "0 12px 28px rgba(0,0,0,0.22)",
                  }}
                >
                  <div
                    style={{
                      display:
                        "inline-flex",

                      alignItems:
                        "center",

                      gap: "8px",

                      marginBottom:
                        "18px",

                      background:
                        "rgba(255,255,255,0.08)",

                      padding:
                        "8px 14px",

                      borderRadius:
                        "999px",

                      fontWeight:
                        700,
                    }}
                  >
                    <StarIcon />

                    Trending
                    Story
                  </div>

                  <h3
                    style={{
                      fontSize:
                        "1.4rem",

                      marginBottom:
                        "14px",

                      fontWeight:
                        900,
                    }}
                  >
                    {
                      storyline.title
                    }
                  </h3>

                  <p
                    style={{
                      lineHeight:
                        1.7,

                      opacity:
                        0.88,
                    }}
                  >
                    {
                      storyline.description
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ======================================================
            HOT TEAMS
            ====================================================== */}

        {!loading && (
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
                📈 Teams
                Generating
                Buzz
              </h2>
            </div>

            <AutoContentRail>
              {hotTeams.map(
                (
                  team
                ) => (
                  <HubCard
                    key={
                      team.nation ||
                      "unknown-team"
                    }
                    title={
                      team.nation ||
                      "National Team"
                    }
                    image={
                      creatorImage
                    }
                    to={`/soccer/teams/${(
                      team.nation ||
                      "unknown-team"
                    )
                      .toLowerCase()
                      .replace(
                        /\s/g,
                        "-"
                      )}`}
                    features={[
                      {
                        label: `Momentum ${
                          team.momentumScore ??
                          0
                        }`,

                        icon:
                          <StarIcon />,
                      },

                      {
                        label: `Attack ${
                          team.attackRating ??
                          0
                        }`,

                        icon:
                          <VideoIcon />,
                      },

                      {
                        label:
                          team.trend ||
                          "Trending",

                        icon:
                          <UsersIcon />,
                      },
                    ]}
                  />
                )
              )}
            </AutoContentRail>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}