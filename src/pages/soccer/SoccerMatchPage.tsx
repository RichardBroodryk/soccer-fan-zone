// src/pages/soccer/SoccerMatchPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import styles from "../MatchPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import { stadiums } from "../../data/soccer/stadiums";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import SoccerFlag from "../../components/soccer/SoccerFlag";

import AutoContentRail from "../../components/ui/AutoContentRail";
import HubCard from "../../components/homepage/HubCard";

import {
  getPlayersByTeam,
} from "../../data/soccer/playerHelpers";

import {
  getMatchTheme,
} from "../../utils/soccer/getMatchTheme";

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import UsersIcon from "../../components/icons/UsersIcon";

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

/* ======================================================
   PAGE
====================================================== */

export default function SoccerMatchPage() {
  const { matchId } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [match, setMatch] =
    useState<SoccerMatch | null>(
      null
    );

  const [allMatches, setAllMatches] =
    useState<SoccerMatch[]>([]);

  /* ======================================================
     LOAD MATCH
  ====================================================== */

  useEffect(() => {
    async function loadMatch() {
      try {
        setLoading(true);

        const liveMatches =
          await getAllWorldCupMatches();

        setAllMatches(
          liveMatches
        );

        const foundMatch =
          liveMatches.find(
            (
              m: SoccerMatch
            ) =>
              String(m.id) ===
              String(matchId)
          );

        setMatch(
          foundMatch || null
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMatch();
  }, [matchId]);

  /* ======================================================
     SAFE MEMOS
  ====================================================== */

  const relatedMatches =
    useMemo(() => {
      if (!match) {
        return [];
      }

      return allMatches.filter(
        (
          m: SoccerMatch
        ) =>
          m.group ===
            match.group &&
          m.id !== match.id
      );
    }, [allMatches, match]);

  const timeline =
    useMemo(() => {
      if (!match) {
        return [];
      }

      return [
        {
          minute:
            match.minute
              ? `${match.minute}'`
              : "LIVE",

          event: `${match.home} vs ${match.away}`,
        },

        {
          minute: "41'",
          event: `Yellow Card — ${match.away}`,
        },

        {
          minute: "67'",
          event: `Big Chance — ${match.home}`,
        },

        {
          minute: "79'",
          event: `Substitution — ${match.away}`,
        },
      ];
    }, [match]);

  /* ======================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <PageWrapper
        imageUrl={
          backgroundLight
        }
      >
        <main
          className={styles.page}
        >
          <div
            className={
              styles.empty
            }
          >
            Loading match...
          </div>
        </main>
      </PageWrapper>
    );
  }

  /* ======================================================
     NOT FOUND
  ====================================================== */

  if (!match) {
    return (
      <PageWrapper
        imageUrl={
          backgroundLight
        }
      >
        <main
          className={styles.page}
        >
          <div
            className={
              styles.empty
            }
          >
            Match not found.
          </div>
        </main>
      </PageWrapper>
    );
  }

  /* ======================================================
     THEME
  ====================================================== */

  const matchTheme =
    getMatchTheme({
      home: match.home,
      away: match.away,
      status:
        match.status,
      stage: match.stage,
    });

  /* ======================================================
     STADIUM
  ====================================================== */

  const stadium =
    stadiums.find(
      (s) =>
        s.id ===
        match.stadiumId
    );

  /* ======================================================
     LABELS
  ====================================================== */

  const matchLabel =
    match.group ||
    match.stage;

  const teamHomeRoute = `/soccer/teams/${match.home
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  const teamAwayRoute = `/soccer/teams/${match.away
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  const anthemHomeRoute = `/anthems/${match.home
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  const anthemAwayRoute = `/anthems/${match.away
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  /* ======================================================
     PLAYERS
  ====================================================== */

  const homePlayers =
    getPlayersByTeam(
      match.home
        .toLowerCase()
        .replace(/\s/g, "-")
    );

  const awayPlayers =
    getPlayersByTeam(
      match.away
        .toLowerCase()
        .replace(/\s/g, "-")
    );

  const featuredPlayers = [
    ...homePlayers.slice(
      0,
      2
    ),

    ...awayPlayers.slice(
      0,
      2
    ),
  ];

  /* ======================================================
     STATS
  ====================================================== */

  const stats = [
    {
      label:
        "Home Score",

      value:
        match.homeScore ??
        0,
    },

    {
      label:
        "Away Score",

      value:
        match.awayScore ??
        0,
    },

    {
      label:
        "Status",

      value:
        match.status,
    },

    {
      label:
        "Stage",

      value:
        match.stage,
    },

    {
      label:
        "Minute",

      value:
        match.minute || "-",
    },

    {
      label:
        "Venue",

      value:
        match.stadium,
    },
  ];

  /* ======================================================
     MOMENTUM
  ====================================================== */

  const momentum = {
    home:
      match.status ===
      "live"
        ? 64
        : 50,

    away:
      match.status ===
      "live"
        ? 36
        : 50,
  };

  /* ======================================================
     STATUS
  ====================================================== */

  const statusText =
    match.status ===
    "live"
      ? `LIVE • ${
          match.minute || 0
        }'`
      : match.status.toUpperCase();

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main
        className={styles.page}
      >
        {/* HERO */}

        <header
          className={
            styles.hero
          }
        >
          {/* HOME */}

          <div
            className={`${styles.heroSide} ${styles.heroHome}`}
            style={{
              backgroundImage: `
                linear-gradient(
                  to top,
                  rgba(0,0,0,0.24),
                  rgba(0,0,0,0.06)
                ),
                url(${matchTheme.homeFlag})
              `,
            }}
          />

          {/* AWAY */}

          <div
            className={`${styles.heroSide} ${styles.heroAway}`}
            style={{
              backgroundImage: `
                linear-gradient(
                  to top,
                  rgba(0,0,0,0.24),
                  rgba(0,0,0,0.06)
                ),
                url(${matchTheme.awayFlag})
              `,
            }}
          />

          {/* OVERLAY */}

          <div
            className={
              styles.heroFade
            }
          />

          {/* CONTENT */}

          <div
            className={
              styles.heroContent
            }
          >
            <div
              className={
                styles.status
              }
            >
              {match.status ===
                "live" && (
                <span
                  className={
                    styles.liveDot
                  }
                />
              )}

              {statusText}
            </div>

            <div
              className={
                styles.matchHero
              }
            >
              {/* HOME */}

              <div
                className={
                  styles.teamHero
                }
              >
                <SoccerFlag
                  nation={
                    match.home
                  }
                  size={58}
                />

                <h1>
                  {match.home}
                </h1>
              </div>

              {/* VS */}

              <div
                className={
                  styles.vs
                }
              >
                VS
              </div>

              {/* AWAY */}

              <div
                className={
                  styles.teamHero
                }
              >
                <h1>
                  {match.away}
                </h1>

                <SoccerFlag
                  nation={
                    match.away
                  }
                  size={58}
                />
              </div>
            </div>

            <p
              className={
                styles.heroMeta
              }
            >
              {matchLabel}
              <br />
              {match.stadium} •{" "}
              {match.city}
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
                "/soccer/matches"
              )
            }
          >
            ← Back to Matches
          </button>
        </div>

        {/* SCOREBOARD */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.scoreboard
            }
          >
            <div
              className={
                styles.scoreboardGrid
              }
            >
              {/* HOME */}

              <button
                className={
                  styles.teamButton
                }
                onClick={() =>
                  navigate(
                    teamHomeRoute
                  )
                }
              >
                <SoccerFlag
                  nation={
                    match.home
                  }
                  size={90}
                />

                <div
                  className={
                    styles.teamName
                  }
                >
                  {match.home}
                </div>

                <div
                  className={
                    styles.score
                  }
                >
                  {match.homeScore ??
                    "-"}
                </div>
              </button>

              {/* CENTER */}

              <div
                className={
                  styles.centerScore
                }
              >
                <div
                  className={
                    styles.vsCircle
                  }
                >
                  VS
                </div>

                <div
                  className={
                    styles.centerMeta
                  }
                >
                  {match.city}
                </div>
              </div>

              {/* AWAY */}

              <button
                className={
                  styles.teamButton
                }
                onClick={() =>
                  navigate(
                    teamAwayRoute
                  )
                }
              >
                <SoccerFlag
                  nation={
                    match.away
                  }
                  size={90}
                />

                <div
                  className={
                    styles.teamName
                  }
                >
                  {match.away}
                </div>

                <div
                  className={
                    styles.score
                  }
                >
                  {match.awayScore ??
                    "-"}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* MATCH INFO */}

        <section
          className={
            styles.section
          }
        >
          <h2
            className={
              styles.sectionTitle
            }
          >
            Match Information
          </h2>

          <div
            className={
              styles.cardGrid240
            }
          >
            {[
              {
                label:
                  "Date",

                value:
                  match.date,
              },

              {
                label:
                  "Venue",

                value:
                  stadium
                    ? stadium.name
                    : match.stadium,
              },

              {
                label:
                  "City",

                value:
                  match.city,
              },

              {
                label:
                  "Stage",

                value:
                  matchLabel,
              },
            ].map(
              (item) => (
                <div
                  key={
                    item.label
                  }
                  className={
                    styles.infoCard
                  }
                >
                  <div
                    className={
                      styles.infoLabel
                    }
                  >
                    {
                      item.label
                    }
                  </div>

                  <div
                    className={
                      styles.infoValue
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
        </section>

        {/* MOMENTUM */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.card
            }
          >
            <h2
              className={
                styles.sectionTitle
              }
            >
              Match Momentum
            </h2>

            <p
              className={
                styles.sectionText
              }
            >
              Live pressure and
              tactical flow across
              the match.
            </p>

            <div
              style={{
                marginTop:
                  "28px",
              }}
            >
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  marginBottom:
                    "12px",

                  fontWeight: 800,
                }}
              >
                <span>
                  {match.home}
                </span>

                <span>
                  {match.away}
                </span>
              </div>

              <div
                className={
                  styles.momentumBar
                }
              >
                <div
                  className={
                    styles.momentumFill
                  }
                  style={{
                    width: `${momentum.home}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}

        <section
          className={
            styles.section
          }
        >
          <h2
            className={
              styles.sectionTitle
            }
          >
            Match Timeline
          </h2>

          <div
            className={
              styles.timeline
            }
          >
            {timeline.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className={
                    styles.timelineCard
                  }
                >
                  <div
                    className={
                      styles.timelineMinute
                    }
                  >
                    {
                      item.minute
                    }
                  </div>

                  <div
                    className={
                      styles.timelineEvent
                    }
                  >
                    {
                      item.event
                    }
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* MATCH STATS */}

        <section
          className={
            styles.section
          }
        >
          <h2
            className={
              styles.sectionTitle
            }
          >
            Match Statistics
          </h2>

          <div
            className={
              styles.cardGrid260
            }
          >
            {stats.map(
              (
                stat,
                index
              ) => (
                <div
                  key={index}
                  className={
                    styles.infoCard
                  }
                >
                  <div
                    className={
                      styles.infoLabel
                    }
                  >
                    {
                      stat.label
                    }
                  </div>

                  <div
                    className={
                      styles.infoValue
                    }
                  >
                    {
                      stat.value
                    }
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* FEATURED PLAYERS */}

        {featuredPlayers.length >
          0 && (
          <section
            className={
              styles.section
            }
          >
            <h2
              className={
                styles.sectionTitle
              }
            >
              Featured Players
            </h2>

            <div
              className={
                styles.cardGrid260
              }
            >
              {featuredPlayers.map(
                (
                  player
                ) => (
                  <button
                    key={
                      player.id
                    }
                    className={
                      styles.playerCard
                    }
                    onClick={() =>
                      navigate(
                        `/soccer/players/${player.id}`
                      )
                    }
                  >
                    <div
                      className={
                        styles.playerTop
                      }
                    >
                      <div
                        className={
                          styles.playerName
                        }
                      >
                        {
                          player.name
                        }
                      </div>

                      <div
                        className={
                          styles.playerNumber
                        }
                      >
                        #
                        {
                          player.number
                        }
                      </div>
                    </div>

                    <div
                      className={
                        styles.playerClub
                      }
                    >
                      {
                        player.club
                      }
                    </div>

                    <div
                      className={
                        styles.playerPosition
                      }
                    >
                      {
                        player.position
                      }
                    </div>
                  </button>
                )
              )}
            </div>
          </section>
        )}

        {/* FAN ZONE */}

        <section
          className={
            styles.section
          }
        >
          <h2
            className={
              styles.sectionTitle
            }
          >
            Fan Zone
          </h2>

          <div
            className={
              styles.cardGrid260
            }
          >
            {[
              {
                title: `${match.home} Anthem`,
                route:
                  anthemHomeRoute,
              },

              {
                title: `${match.away} Anthem`,
                route:
                  anthemAwayRoute,
              },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() =>
                  navigate(
                    item.route
                  )
                }
                className={
                  styles.card
                }
                style={{
                  border:
                    "none",

                  cursor:
                    "pointer",

                  textAlign:
                    "left",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "1.2rem",

                    fontWeight: 900,

                    marginBottom:
                      "12px",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    color:
                      "#4b5563",

                    lineHeight: 1.7,
                  }}
                >
                  Listen to the
                  national anthem and
                  supporter culture.
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* RELATED */}

        {relatedMatches.length >
          0 && (
          <section
            className={
              styles.section
            }
          >
            <h2
              className={
                styles.sectionTitle
              }
            >
              More from{" "}
              {matchLabel}
            </h2>

            <AutoContentRail>
              {relatedMatches.map(
                (
                  m: SoccerMatch
                ) => (
                  <HubCard
                    key={m.id}
                    title={`${m.home} vs ${m.away}`}
                    image={
                      getMatchTheme(
                        {
                          home:
                            m.home,

                          away:
                            m.away,

                          status:
                            m.status,

                          stage:
                            m.stage,
                        }
                      ).homeFlag ||
                      backgroundLight
                    }
                    to={`/soccer/matches/${m.id}`}
                    features={[
                      {
                        label:
                          m.date,

                        icon:
                          <CalendarIcon />,
                      },

                      {
                        label:
  m.stadium ||
  "World Cup Venue",

                        icon:
                          <UsersIcon />,
                      },

                      {
                        label:
                          m.group ||
                          m.stage,

                        icon:
                          <StarIcon />,
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