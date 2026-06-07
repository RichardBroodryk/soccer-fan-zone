// src/pages/soccer/SoccerStadiumPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import styles from "./SoccerStadiumPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* DATA */

import { stadiums } from "../../data/soccer/stadiums";

import {
  stadiumIntelligence,
} from "../../data/soccer/stadiumIntelligence";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* COMPONENTS */

import AutoContentRail from "../../components/ui/AutoContentRail";
import HubCard from "../../components/homepage/HubCard";

/* UTILS */

import {
  getStadiumHeroImage,
  getStadiumGalleryImages,
  getStadiumCrowdImage,
  getStadiumPremiumImage,
  getStadiumSkylineImage,
} from "../../utils/soccer/getStadiumImages";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import UsersIcon from "../../components/icons/UsersIcon";

export default function SoccerStadiumPage() {
  const { stadiumId } =
    useParams();

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

  /* ======================================================
     SAFE DATASETS
  ====================================================== */

  const safeStadiums =
    Array.isArray(
      stadiums
    )
      ? stadiums
      : [];

  const stadium =
    safeStadiums.find(
      (s) =>
        s.id ===
        stadiumId
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
      } catch (
        err
      ) {
        console.error(
          "Failed to load stadium matches:",
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
     STADIUM MATCHES
  ====================================================== */

  const stadiumMatches =
    useMemo(() => {
      return matches.filter(
        (
          m: SoccerMatch
        ) =>
          m.stadiumId ===
          stadiumId
      );
    }, [
      matches,
      stadiumId,
    ]);

  const liveMatches =
    useMemo(() => {
      return stadiumMatches.filter(
        (
          m: SoccerMatch
        ) =>
          m.status ===
          "live"
      );
    }, [stadiumMatches]);

  const completedMatches =
    useMemo(() => {
      return stadiumMatches.filter(
        (
          m: SoccerMatch
        ) =>
          m.status ===
          "final"
      );
    }, [stadiumMatches]);

  /* ======================================================
     EMPTY STATE
  ====================================================== */

  if (!stadium) {
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
          <div
            className={
              styles.empty
            }
          >
            Stadium not
            found.
          </div>
        </main>
      </PageWrapper>
    );
  }

  /* ======================================================
     SAFE ASSETS
  ====================================================== */

  const heroImage =
    getStadiumHeroImage(
      stadium.id ||
        "unknown-stadium"
    );

  const galleryImages =
    getStadiumGalleryImages(
      stadium.id ||
        "unknown-stadium"
    ) || [];

  const crowdImage =
    getStadiumCrowdImage(
      stadium.id ||
        "unknown-stadium"
    );

  const premiumImage =
    getStadiumPremiumImage(
      stadium.id ||
        "unknown-stadium"
    );

  const skylineImage =
    getStadiumSkylineImage(
      stadium.id ||
        "unknown-stadium"
    );

  const intelligence =
    stadiumIntelligence?.[
      stadium.id
    ];

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

        <header
          className={
            styles.hero
          }
          style={{
            backgroundImage:
              `url(${heroImage})`,
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
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap: "10px",

                padding:
                  "10px 18px",

                borderRadius:
                  "999px",

                background:
                  "rgba(255,255,255,0.14)",

                marginBottom:
                  "18px",

                fontWeight:
                  800,

                fontSize:
                  "0.88rem",

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",
              }}
            >
              GLOBAL
              SOCCER WORLD
              CUP
            </div>

            <h1>
              {
                stadium.name
              ||
                "World Cup Stadium"}
            </h1>

            <p>
              {
                stadium.city
              ||
                "Host City"}
              ,{" "}
              {
                stadium.country
              ||
                "Host Country"}
              <br />
              Official
              Host Venue
              for the FIFA
              World Cup
              2026™ across
              North
              America
            </p>
          </div>
        </header>

        {/* BACK */}

        <div
          className={
            styles.backWrap
          }
        >
          <button
            className={
              styles.back
            }
            onClick={() =>
              navigate(
                "/soccer/stadiums"
              )
            }
          >
            ← Back to
            Stadiums
          </button>
        </div>

        {/* LOADING */}

        {loading && (
          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.infoPanel
              }
            >
              <h2>
                Loading
                Stadium
                Intelligence...
              </h2>

              <p>
                Synchronizing
                venue
                analytics,
                atmosphere
                systems and
                live match
                data.
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
                className={
                  styles.infoPanel
                }
              >
                <h2>
                  Stadium
                  Systems
                  Unavailable
                </h2>

                <p>
                  Venue
                  intelligence
                  systems are
                  currently
                  reconnecting.
                </p>
              </div>
            </section>
          )}

        {/* OVERVIEW */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.statsGrid
            }
          >
            {[
              {
                label:
                  "Capacity",

                value:
                  (
                    stadium.capacity ??
                    0
                  ).toLocaleString(),
              },

              {
                label:
                  "Total Matches",

                value:
                  stadiumMatches.length,
              },

              {
                label:
                  "Live Matches",

                value:
                  liveMatches.length,
              },

              {
                label:
                  "Completed Matches",

                value:
                  completedMatches.length,
              },
            ].map(
              (
                item
              ) => (
                <StatCard
                  key={
                    item.label
                  }
                  label={
                    item.label
                  }
                  value={
                    item.value
                  }
                />
              )
            )}
          </div>
        </section>

        {/* VENUE INFORMATION */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.infoPanel
            }
          >
            <div
              className={
                styles.infoIntro
              }
            >
              <h2>
                Host Venue
                Intelligence
              </h2>

              <p>
                Explore
                host city
                insights,
                venue
                intelligence,
                capacity
                information,
                tournament
                operations
                and
                matchday
                atmosphere
                for this
                global
                football
                destination.
              </p>
            </div>

            <div
              className={
                styles.infoGrid
              }
            >
              <InfoCard
                label="HOST CITY"
                value={
                  stadium.city ||
                  "Host City"
                }
              />

              <InfoCard
                label="COUNTRY"
                value={
                  stadium.country ||
                  "Host Country"
                }
              />

              <InfoCard
                label="CAPACITY"
                value={(
                  stadium.capacity ??
                  0
                ).toLocaleString()}
              />

              <InfoCard
                label="TOURNAMENT"
                value="FIFA World Cup 2026™"
              />
            </div>
          </div>
        </section>

        {/* VENUE EXPERIENCE */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              marginBottom:
                "26px",
            }}
          >
            <h2
              className={
                styles.sectionTitle
              }
              style={{
                marginBottom:
                  "8px",
              }}
            >
              Matchday
              Experience
            </h2>

            <p
              style={{
                margin: 0,

                color:
                  "#6b7280",

                lineHeight:
                  1.7,
              }}
            >
              Explore the
              atmosphere,
              skyline,
              premium
              hospitality
              and fan
              energy
              around{" "}
              {
                stadium.name
              ||
                "this venue"}
              .
            </p>
          </div>

          <div
            className={
              styles.experienceGrid
            }
          >
            {/* SKYLINE */}

            <div
              className={
                styles.experienceCard
              }
            >
              <img
                src={
                  skylineImage
                }
                alt={`${
                  stadium.name ||
                  "Stadium"
                } skyline`}
                className={
                  styles.experienceImage
                }
              />

              <div
                className={
                  styles.experienceContent
                }
              >
                <h3
                  className={
                    styles.experienceTitle
                  }
                >
                  Host City
                  Atmosphere
                </h3>

                <p
                  className={
                    styles.experienceText
                  }
                >
                  Experience
                  the energy,
                  culture and
                  iconic
                  skyline
                  surrounding
                  this FIFA
                  World Cup
                  2026™ host
                  venue.
                </p>
              </div>
            </div>

            {/* CROWD */}

            <div
              className={
                styles.experienceCard
              }
            >
              <img
                src={
                  crowdImage
                }
                alt={`${
                  stadium.name ||
                  "Stadium"
                } crowd`}
                className={
                  styles.experienceImage
                }
              />

              <div
                className={
                  styles.experienceContent
                }
              >
                <h3
                  className={
                    styles.experienceTitle
                  }
                >
                  Crowd
                  Energy
                </h3>

                <p
                  className={
                    styles.experienceText
                  }
                >
                  Feel the
                  intensity
                  of packed
                  World Cup
                  crowds,
                  anthem
                  moments and
                  unforgettable
                  football
                  atmosphere.
                </p>
              </div>
            </div>

            {/* PREMIUM */}

            <div
              className={
                styles.experienceCard
              }
            >
              <img
                src={
                  premiumImage
                }
                alt={`${
                  stadium.name ||
                  "Stadium"
                } premium`}
                className={
                  styles.experienceImage
                }
              />

              <div
                className={
                  styles.experienceContent
                }
              >
                <h3
                  className={
                    styles.experienceTitle
                  }
                >
                  Premium
                  Experience
                </h3>

                <p
                  className={
                    styles.experienceText
                  }
                >
                  Explore
                  premium
                  hospitality,
                  elite
                  seating
                  environments
                  and modern
                  World Cup
                  matchday
                  luxury.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STADIUM INTELLIGENCE */}

        {intelligence && (
          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.intelligencePanel
              }
            >
              <div
                className={
                  styles.intelligenceIntro
                }
              >
                <h2
                  className={
                    styles.sectionTitle
                  }
                >
                  Stadium
                  Intelligence
                </h2>

                <p>
                  Tactical,
                  operational
                  and
                  atmosphere
                  intelligence
                  for{" "}
                  {
                    stadium.name
                  ||
                    "this venue"}
                  .
                </p>
              </div>

              <div
                className={
                  styles.intelligenceGrid
                }
              >
                <IntelCard
                  label="Roof Type"
                  value={
                    intelligence.roof ||
                    "Modern Roof"
                  }
                />

                <IntelCard
                  label="Pitch Surface"
                  value={
                    intelligence.pitch ||
                    "Hybrid Grass"
                  }
                />

                <IntelCard
                  label="Atmosphere"
                  value={`${
                    intelligence.atmosphereScore ??
                    0
                  }/10`}
                />

                <IntelCard
                  label="Fan Intensity"
                  value={
                    intelligence.fanIntensity ||
                    "High"
                  }
                />

                <IntelCard
                  label="Noise Level"
                  value={`${
                    intelligence.noiseLevel ??
                    0
                  }/10`}
                />

                <IntelCard
                  label="Prestige"
                  value={`${
                    intelligence.prestigeLevel ??
                    0
                  }/10`}
                />

                <IntelCard
                  label="Travel Rating"
                  value={`${
                    intelligence.travelRating ??
                    0
                  }/10`}
                />

                <IntelCard
                  label="Skyline Rating"
                  value={`${
                    intelligence.skylineRating ??
                    0
                  }/10`}
                />
              </div>

              <div
                className={
                  styles.matchdayPanel
                }
              >
                <div
                  className={
                    styles.matchdayBlock
                  }
                >
                  <h3>
                    Matchday
                    Profile
                  </h3>

                  <p>
                    {
                      intelligence.matchdayProfile ||
                      "Elite World Cup matchday atmosphere and tournament operations."
                    }
                  </p>
                </div>

                <div
                  className={
                    styles.matchdayBlock
                  }
                >
                  <h3>
                    Arrival
                    Tip
                  </h3>

                  <p>
                    {
                      intelligence.arrivalTip ||
                      "Arrive early for security and fan-zone access."
                    }
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ATMOSPHERE INDEX */}

        {intelligence && (
          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.atmospherePanel
              }
            >
              <div
                className={
                  styles.atmosphereHeader
                }
              >
                <h2
                  className={
                    styles.sectionTitle
                  }
                >
                  Atmosphere
                  Index
                </h2>

                <p>
                  Matchday
                  intensity,
                  pressure
                  and stadium
                  energy
                  analytics
                  for{" "}
                  {
                    stadium.name
                  ||
                    "this venue"}
                  .
                </p>
              </div>

              <div
                className={
                  styles.atmosphereGrid
                }
              >
                <AtmosphereBar
                  label="Crowd Pressure"
                  value={
                    intelligence.crowdPressure ??
                    0
                  }
                />

                <AtmosphereBar
                  label="Night Atmosphere"
                  value={
                    intelligence.nightAtmosphere ??
                    0
                  }
                />

                <AtmosphereBar
                  label="Tactical Intensity"
                  value={
                    intelligence.tacticalIntensity ??
                    0
                  }
                />

                <AtmosphereBar
                  label="Fan Choreography"
                  value={
                    intelligence.fanChoreography ??
                    0
                  }
                />

                <AtmosphereBar
                  label="Noise Level"
                  value={
                    intelligence.noiseLevel ??
                    0
                  }
                />

                <AtmosphereBar
                  label="Prestige"
                  value={
                    intelligence.prestigeLevel ??
                    0
                  }
                />
              </div>
            </div>
          </section>
        )}

        {/* STADIUM GALLERY */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.galleryHeader
            }
          >
            <h2
              className={
                styles.sectionTitle
              }
            >
              Stadium
              Gallery
            </h2>

            <p>
              Explore the
              atmosphere
              and
              architecture
              of{" "}
              {
                stadium.name
              ||
                "this venue"}
              .
            </p>
          </div>

          <div
            className={
              styles.galleryGrid
            }
          >
            {galleryImages.map(
              (
                image,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className={
                    styles.galleryCard
                  }
                >
                  <img
                    src={image}
                    alt={`${
                      stadium.name ||
                      "Stadium"
                    } ${
                      index +
                      1
                    }`}
                  />
                </div>
              )
            )}
          </div>
        </section>

        {/* LIVE MATCHES */}

        {liveMatches.length >
          0 && (
          <section
            className={
              styles.section
            }
          >
            <SectionHeader
              title={`🔴 Live World Cup Action at ${
                stadium.name ||
                "this stadium"
              }`}
              description="Real-time FIFA World Cup 2026™ matches currently being played at this venue."
            />

            <AutoContentRail>
              {liveMatches.map(
                (
                  match: SoccerMatch
                ) => (
                  <HubCard
                    key={
                      match.id
                    }
                    title={`${match.home ||
                      "Home Team"} vs ${
                      match.away ||
                      "Away Team"
                    }`}
                    image={getStadiumHeroImage(
                      stadium.id ||
                        "unknown-stadium"
                    )}
                    to={`/soccer/matches/${
                      match.id ||
                      "unknown-match"
                    }`}
                    features={[
                      {
                        label: `LIVE • ${
                          match.minute ??
                          0
                        }'`,

                        icon:
                          <CalendarIcon />,
                      },

                      {
                        label:
                          match.group ||
                          match.stage ||
                          "Tournament Match",

                        icon:
                          <StarIcon />,
                      },

                      {
                        label:
                          stadium.city ||
                          "Host City",

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

        {/* ALL MATCHES */}

        <section
          className={
            styles.section
          }
        >
          <SectionHeader
            title={`World Cup Fixtures at ${
              stadium.name ||
              "this stadium"
            }`}
            description="Upcoming fixtures, results and knockout stage matches hosted at this iconic FIFA World Cup 2026™ venue."
          />

          <AutoContentRail>
            {stadiumMatches.map(
              (
                match: SoccerMatch
              ) => (
                <HubCard
                  key={
                    match.id
                  }
                  title={`${match.home ||
                    "Home Team"} vs ${
                    match.away ||
                    "Away Team"
                  }`}
                  image={getStadiumHeroImage(
                    stadium.id ||
                      "unknown-stadium"
                  )}
                  to={`/soccer/matches/${
                    match.id ||
                    "unknown-match"
                  }`}
                  features={[
                    {
                      label:
                        match.date ||
                        "World Cup 2026",

                      icon:
                        <CalendarIcon />,
                    },

                    {
                      label:
                        match.group ||
                        match.stage ||
                        "Tournament Match",

                      icon:
                        <StarIcon />,
                    },

                    {
                      label:
                        (
                          match.status ||
                          "upcoming"
                        ).toUpperCase(),

                      icon:
                        <UsersIcon />,
                    },
                  ]}
                />
              )
            )}
          </AutoContentRail>
        </section>
      </main>
    </PageWrapper>
  );
}

/* ======================================================
   HELPERS
====================================================== */

type StatCardProps =
  {
    label: string;

    value:
      | string
      | number;
  };

function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div
      className={
        styles.statCard
      }
    >
      <div
        className={
          styles.statLabel
        }
      >
        {label}
      </div>

      <div
        className={
          styles.statValue
        }
      >
        {value}
      </div>
    </div>
  );
}

type InfoCardProps =
  {
    label: string;

    value: string;
  };

function InfoCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <div
      className={
        styles.infoCard
      }
    >
      <div
        className={
          styles.infoLabel
        }
      >
        {label}
      </div>

      <div
        className={
          styles.infoValue
        }
      >
        {value}
      </div>
    </div>
  );
}

type IntelCardProps =
  {
    label: string;

    value:
      | string
      | number;
  };

function IntelCard({
  label,
  value,
}: IntelCardProps) {
  return (
    <div
      className={
        styles.intelCard
      }
    >
      <div
        className={
          styles.intelLabel
        }
      >
        {label}
      </div>

      <div
        className={
          styles.intelValue
        }
      >
        {value}
      </div>
    </div>
  );
}

type SectionHeaderProps =
  {
    title: string;

    description: string;
  };

type AtmosphereBarProps =
  {
    label: string;

    value: number;
  };

function AtmosphereBar({
  label,
  value,
}: AtmosphereBarProps) {
  return (
    <div
      className={
        styles.atmosphereItem
      }
    >
      <div
        className={
          styles.atmosphereTop
        }
      >
        <span>
          {label}
        </span>

        <span>
          {value}
          /10
        </span>
      </div>

      <div
        className={
          styles.atmosphereTrack
        }
      >
        <div
          className={
            styles.atmosphereFill
          }
          style={{
            width: `${
              value * 10
            }%`,
          }}
        />
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div
      className={
        styles.sectionHeader
      }
    >
      <h2
        className={
          styles.sectionTitle
        }
      >
        {title}
      </h2>

      <p>
        {
          description
        }
      </p>
    </div>
  );
}