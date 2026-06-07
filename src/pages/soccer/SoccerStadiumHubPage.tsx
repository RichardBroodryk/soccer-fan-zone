// src/pages/soccer/SoccerStadiumHubPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./SoccerStadiumHubPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";
import AutoContentRail from "../../components/ui/AutoContentRail";
import HubCard from "../../components/homepage/HubCard";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* DATA */

import { stadiums } from "../../data/soccer/stadiums";
import { worldCup2026 } from "../../data/soccer/worldCup2026";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ASSETS */

import backgroundLight from "../../assets/soccer/ui/background-light.png";
import stadiumsHero from "../../assets/soccer/heroes/stadiums.jpg";

/* UTILS */

import {
  getStadiumHeroImage,
} from "../../utils/soccer/getStadiumImages";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import UsersIcon from "../../components/icons/UsersIcon";

/* ======================================================
   FEATURED VENUES
====================================================== */

const featuredVenues = [
  "estadio-azteca",
  "metlife-stadium",
  "sofi-stadium",
  "att-stadium",
];

export default function SoccerStadiumHubPage() {
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

  /* ======================================================
     API SAFE DATASETS
  ====================================================== */

 const safeStadiums =
  useMemo(
    () =>
      Array.isArray(
        stadiums
      )
        ? stadiums
        : [],
    []
  );

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

        if (!mounted)
          return;

        const safeMatches =
          Array.isArray(
            response
          )
            ? response
            : [];

        /* ======================================================
           NORMALIZE MATCHES
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
      } catch (
        err
      ) {
        console.error(
          "Failed to load stadium hub matches:",
          err
        );

        if (!mounted)
          return;

        setError(
          "Unable to load stadium intelligence."
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
     FEATURED STADIUMS
  ====================================================== */

  const featured =
    useMemo(() => {
      return safeStadiums.filter(
        (s) =>
          featuredVenues.includes(
            s.id
          )
      );
    }, [safeStadiums]);

  /* ======================================================
     TOURNAMENT METRICS
  ====================================================== */

  const liveMatches =
    useMemo(() => {
      return matches.filter(
        (
          match: SoccerMatch
        ) =>
          match.status ===
          "live"
      );
    }, [matches]);

  const totalCapacity =
    useMemo(() => {
      return safeStadiums.reduce(
        (
          acc,
          stadium
        ) =>
          acc +
          (stadium.capacity ??
            0),
        0
      );
    }, [safeStadiums]);

  const hostCountries =
    useMemo(() => {
      return new Set(
        safeStadiums.map(
          (
            stadium
          ) =>
            stadium.country ||
            "Host Country"
        )
      ).size;
    }, [safeStadiums]);

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main
        className={
          styles.page
        }
      >
        {/* HERO */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.hero
            }
            style={{
              backgroundImage:
                `url(${stadiumsHero})`,
            }}
          >
            <div
              className={
                styles.heroOverlay
              }
            />

            <div
              className={
                styles.heroContent
              }
            >
              <div
                className={
                  styles.heroBadge
                }
              >
                GLOBAL
                SOCCER
                WORLD CUP
              </div>

              <h1
                className={
                  styles.heroTitle
                }
              >
                Global
                World Cup
                Host
                Stadiums
              </h1>

              <p
                className={
                  styles.heroDescription
                }
              >
                Explore the
                iconic
                stadiums,
                host cities
                and football
                culture
                powering the{" "}
                {
                  worldCup2026?.name
                ||
                  "FIFA World Cup 2026"
                }
                . Journey
                across the
                United
                States,
                Mexico and
                Canada
                through the
                venues
                hosting the
                world's
                greatest
                sporting
                event.
              </p>

              {/* HERO STATS */}

              <div
                className={
                  styles.heroStats
                }
              >
                {[
                  {
                    label:
                      "Host Stadiums",

                    value:
                      safeStadiums.length,
                  },

                  {
                    label:
                      "Host Countries",

                    value:
                      hostCountries,
                  },

                  {
                    label:
                      "Live Matches",

                    value:
                      liveMatches.length,
                  },

                  {
                    label:
                      "Total Capacity",

                    value:
                      totalCapacity.toLocaleString(),
                  },
                ].map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className={
                        styles.heroStatCard
                      }
                    >
                      <div
                        className={
                          styles.heroStatLabel
                        }
                      >
                        {
                          item.label
                        }
                      </div>

                      <div
                        className={
                          styles.heroStatValue
                        }
                      >
                        {
                          item.value
                        }
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LOADING */}

        {loading && (
          <section
            className={
              styles.section
            }
          >
            <div
              style={{
                background:
                  "#ffffff",

                borderRadius:
                  "28px",

                padding:
                  "34px",

                boxShadow:
                  "0 10px 28px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "14px",
                }}
              >
                Loading
                Stadium
                Intelligence...
              </h2>

              <p
                style={{
                  color:
                    "#6b7280",

                  lineHeight:
                    1.7,
                }}
              >
                Synchronizing
                venue
                capacity,
                live match
                activity and
                tournament
                infrastructure.
              </p>
            </div>
          </section>
        )}

        {/* ERROR */}

        {!loading &&
          error && (
            <section
              className={
                styles.section
              }
            >
              <div
                style={{
                  background:
                    "#ffffff",

                  borderRadius:
                    "28px",

                  padding:
                    "34px",

                  boxShadow:
                    "0 10px 28px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    marginBottom:
                      "14px",
                  }}
                >
                  Stadium
                  Systems
                  Unavailable
                </h2>

                <p
                  style={{
                    color:
                      "#6b7280",

                    lineHeight:
                      1.7,
                  }}
                >
                  Venue
                  intelligence
                  systems are
                  currently
                  reconnecting.
                </p>
              </div>
            </section>
          )}

        {/* FEATURED VENUES */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <div>
              <h2
                className={
                  styles.sectionTitle
                }
              >
                Featured
                Stadiums
              </h2>

              <p
                className={
                  styles.sectionDescription
                }
              >
                The iconic
                venues
                defining
                the FIFA
                World Cup
                2026™.
              </p>
            </div>

            <div
              className={
                styles.sectionBadge
              }
            >
              Premium
              Venues
            </div>
          </div>

          <AutoContentRail>
            {featured.map(
              (
                stadium
              ) => {
                const venueLabel =
                  stadium.id ===
                  "metlife-stadium"
                    ? "Final Venue"
                    : stadium.id ===
                      "estadio-azteca"
                    ? "Opening Match"
                    : stadium.id ===
                      "att-stadium"
                    ? "Semifinal Venue"
                    : "Knockout Venue";

                return (
                  <HubCard
                    key={
                      stadium.id ||
                      stadium.name
                    }
                    title={
                      stadium.name ||
                      "World Cup Stadium"
                    }
                    image={
                      getStadiumHeroImage(
                        stadium.id ||
                          "unknown-stadium"
                      )
                    }
                    to={`/soccer/stadiums/${
                      stadium.id ||
                      "unknown-stadium"
                    }`}
                    features={[
                      {
                        label:
                          stadium.city ||
                          "Host City",

                        icon:
                          <UsersIcon />,
                      },

                      {
                        label: `${
                          (
                            stadium.capacity ??
                            0
                          ).toLocaleString()
                        } seats`,

                        icon:
                          <StarIcon />,
                      },

                      {
                        label:
                          venueLabel,

                        icon:
                          <CalendarIcon />,
                      },
                    ]}
                  />
                );
              }
            )}
          </AutoContentRail>
        </section>

        {/* ALL STADIUMS */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <div>
              <h2
                className={
                  styles.sectionTitle
                }
              >
                All Host
                Venues
              </h2>

              <p
                className={
                  styles.sectionDescription
                }
              >
                Discover
                every
                official
                host venue
                across the
                United
                States,
                Mexico and
                Canada.
              </p>
            </div>
          </div>

          <div
            className={
              styles.stadiumGrid
            }
          >
            {safeStadiums.map(
              (
                stadium
              ) => (
                <HubCard
                  key={
                    stadium.id ||
                    stadium.name
                  }
                  title={
                    stadium.name ||
                    "World Cup Stadium"
                  }
                  image={
                    getStadiumHeroImage(
                      stadium.id ||
                        "unknown-stadium"
                    )
                  }
                  to={`/soccer/stadiums/${
                    stadium.id ||
                    "unknown-stadium"
                  }`}
                  features={[
                    {
                      label: `${
                        stadium.city ||
                        "Host City"
                      }, ${
                        stadium.country ||
                        "Host Country"
                      }`,

                      icon:
                        <UsersIcon />,
                    },

                    {
                      label: `${
                        (
                          stadium.capacity ??
                          0
                        ).toLocaleString()
                      } seats`,

                      icon:
                        <StarIcon />,
                    },

                    {
                      label:
                        "World Cup Venue",

                      icon:
                        <CalendarIcon />,
                    },
                  ]}
                />
              )
            )}
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}