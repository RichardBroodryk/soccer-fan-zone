import { useMemo } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PageWrapper from "../../components/layout/PageWrapper";

import styles from "./player/player.module.css";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import {
  getPlayerById,
  getAllPlayers,
} from "../../data/soccer/playerHelpers";

import {
  teams,
} from "../../data/soccer/teams";

import {
  getPlayerTheme,
} from "../../utils/soccer/getPlayerTheme";

import {
  getTeamHeroImage,
} from "../../utils/soccer/getTeamImages";

export default function SoccerPlayerPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const player = useMemo(() => {
    if (!id) {
      return undefined;
    }

    return getPlayerById(id);
  }, [id]);

  const team = useMemo(() => {
    if (!player) {
      return undefined;
    }

    return teams.find(
      (t) => t.id === player.teamId
    );
  }, [player]);

  if (!player || !team) {
    return (
      <main className={styles.page}>
        Player not found.
      </main>
    );
  }

  const playerTheme =
    getPlayerTheme({
      teamId: player.teamId,
      region: team.region,
      position: player.position,
    });

  const heroImage =
    getTeamHeroImage(
      player.teamId
    );

  const relatedPlayers =
    getAllPlayers().filter(
      (p) =>
        p.nation ===
          player.nation &&
        p.id !== player.id
    );

  const impactScore =
    (player.goals ?? 0) * 4 +
    (player.assists ?? 0) * 3 +
    (player.caps ?? 0) / 10;

  const playerTier =
    impactScore >= 40
      ? "World Class"
      : impactScore >= 28
      ? "Elite"
      : impactScore >= 18
      ? "Key Player"
      : "Squad Player";

  const momentum =
    impactScore >= 35
      ? "Red Hot"
      : impactScore >= 20
      ? "Excellent"
      : "Building Form";

  return (
    <PageWrapper
      imageUrl={backgroundLight}
    >
      <main className={styles.page}>
        {/* HERO */}

        <header
          className={styles.hero}
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(0,0,0,0.45),
                rgba(0,0,0,0.78)
              ),
              url(${heroImage})
            `,
          }}
        >
          <div
            className={
              styles.heroOverlay
            }
            style={{
              background:
                playerTheme.atmosphere,
            }}
          />

          <div
            className={
              styles.heroGlow
            }
            style={{
              background: `
                radial-gradient(
                  circle at top right,
                  ${playerTheme.accent}33,
                  transparent 52%
                )
              `,
            }}
          />

          <div
            className={
              styles.heroVignette
            }
          />

          <div
            className={
              styles.heroNumber
            }
          >
            #{player.number}
          </div>

          <div
            className={
              styles.heroContent
            }
          >
            <div
              className={
                styles.heroMetaLine
              }
            >
              <span>
                {player.club}
              </span>

              <div
                className={
                  styles.metaDot
                }
              />

              <span>
                {player.nation}
              </span>

              <div
                className={
                  styles.metaDot
                }
              />

              <span>
                {player.position}
              </span>
            </div>

            <h1
              className={
                styles.heroTitle
              }
            >
              {player.name}
            </h1>

            <div
              className={
                styles.heroRole
              }
            >
              {player.position}
            </div>

            <p
              className={
                styles.heroStory
              }
            >
              {player.name} continues
              to influence{" "}
              {player.nation}'s FIFA
              World Cup 2026 campaign
              through elite positioning,
              decisive moments and
              high-pressure tournament
              leadership.
            </p>

            <div
              className={
                styles.heroStatsCompact
              }
            >
              <div
                className={
                  styles.compactStat
                }
              >
                <span>
                  {player.goals ?? 0}
                </span>

                Goals
              </div>

              <div
                className={
                  styles.compactStat
                }
              >
                <span>
                  {player.assists ?? 0}
                </span>

                Assists
              </div>

              <div
                className={
                  styles.compactStat
                }
              >
                <span>
                  {player.caps ?? 0}
                </span>

                Caps
              </div>

              <div
                className={
                  styles.compactStat
                }
              >
                <span>
                  {impactScore}
                </span>

                Impact
              </div>
            </div>
          </div>
        </header>

        {/* BACK BUTTON */}

        <div
          className={
            styles.backButtonWrap
          }
        >
          <button
            onClick={() =>
              navigate(
                `/soccer/teams/${team.id}`
              )
            }
            className={
              styles.backButton
            }
          >
            ← Back to National Team
          </button>
        </div>

        {/* TOURNAMENT INFLUENCE */}

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
            <div
              className={
                styles.sectionEyebrow
              }
            >
              Tournament Influence
            </div>

            <h2
              className={
                styles.sectionTitle
              }
            >
              Match Impact
            </h2>

            <p
              className={
                styles.sectionSubtext
              }
            >
              Tactical influence,
              composure and
              match-defining
              tournament presence
              throughout FIFA World
              Cup 2026.
            </p>
          </div>

          <div
            className={
              styles.infoStack
            }
          >
            <InfoRow
              label="Player Tier"
              value={playerTier}
            />

            <InfoRow
              label="Tournament Momentum"
              value={momentum}
            />

            <InfoRow
              label="Role Profile"
              value={
                playerTheme.roleStyle
              }
            />

            <InfoRow
              label="Club Influence"
              value={`${player.club} first-team contributor`}
            />
          </div>
        </section>

        {/* FEATURE PANEL */}

        <section
          className={
            styles.featurePanel
          }
        >
          <div
            className={
              styles.featureGlow
            }
            style={{
              background: `
                radial-gradient(
                  circle at top right,
                  ${playerTheme.accent}55,
                  transparent 58%
                )
              `,
            }}
          />

          <div
            className={
              styles.featureContent
            }
          >
            <div
              className={
                styles.featureEyebrow
              }
            >
              Tournament Identity
            </div>

            <h2
              className={
                styles.featureTitle
              }
            >
              {
                playerTheme.roleStyle
              }
            </h2>

            <p
              className={
                styles.featureText
              }
            >
              {player.name} operates
              as a decisive tactical
              presence capable of
              shifting momentum,
              controlling transitions
              and influencing
              high-pressure moments
              throughout the FIFA
              World Cup 2026
              tournament structure.
            </p>
          </div>
        </section>

        {/* RECENT FORM */}

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
            <div
              className={
                styles.sectionEyebrow
              }
            >
              Recent Form
            </div>

            <h2
              className={
                styles.sectionTitle
              }
            >
              Matchday Performances
            </h2>

            <p
              className={
                styles.sectionSubtext
              }
            >
              Recent tournament
              performances and
              match influence across
              major fixtures.
            </p>
          </div>

          <div
            className={
              styles.formList
            }
          >
            <FormStrip
              opponent="Brazil"
              rating="8.9"
              impact="Goal + Assist"
            />

            <FormStrip
              opponent="Spain"
              rating="8.5"
              impact="Player of Match"
            />

            <FormStrip
              opponent="Germany"
              rating="8.1"
              impact="Goal"
            />

            <FormStrip
              opponent="France"
              rating="7.8"
              impact="Key Chances Created"
            />
          </div>
        </section>

        {/* RELATED PLAYERS */}

        {relatedPlayers.length >
          0 && (
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
              <div
                className={
                  styles.sectionEyebrow
                }
              >
                National Squad
              </div>

              <h2
                className={
                  styles.sectionTitle
                }
              >
                Squad Connections
              </h2>

              <p
                className={
                  styles.sectionSubtext
                }
              >
                Explore additional
                players from{" "}
                {player.nation}'s
                national squad.
              </p>
            </div>

            <div
              className={
                styles.relatedGrid
              }
            >
              {relatedPlayers.map(
                (
                  relatedPlayer: any
                ) => (
                  <button
                    key={
                      relatedPlayer.id
                    }
                    onClick={() =>
                      navigate(
                        `/soccer/players/${relatedPlayer.id}`
                      )
                    }
                    className={
                      styles.relatedCard
                    }
                  >
                    <div
                      className={
                        styles.relatedGlow
                      }
                    />

                    <div
                      className={
                        styles.relatedBigNumber
                      }
                    >
                      #
                      {
                        relatedPlayer.number
                      }
                    </div>

                    <div
                      className={
                        styles.relatedTop
                      }
                    >
                      <div
                        className={
                          styles.relatedName
                        }
                      >
                        {
                          relatedPlayer.name
                        }
                      </div>

                      <div
                        className={
                          styles.relatedRole
                        }
                      >
                        {
                          relatedPlayer.position
                        }
                      </div>
                    </div>

                    <div
                      className={
                        styles.relatedClub
                      }
                    >
                      {
                        relatedPlayer.club
                      }
                    </div>

                    <div
                      className={
                        styles.relatedFooter
                      }
                    >
                      <div
                        className={
                          styles.relatedTag
                        }
                      >
                        National Squad
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}

/* ======================================================
   INFO ROW
   ====================================================== */

interface InfoRowProps {
  label: string;

  value:
    | string
    | number;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className={styles.infoRow}>
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

/* ======================================================
   FORM STRIP
   ====================================================== */

interface FormStripProps {
  opponent: string;

  rating: string;

  impact: string;
}

function FormStrip({
  opponent,
  rating,
  impact,
}: FormStripProps) {
  return (
    <div
      className={
        styles.formStrip
      }
    >
      <div>
        <div
          className={
            styles.formOpponent
          }
        >
          vs {opponent}
        </div>

        <div
          className={
            styles.formImpact
          }
        >
          {impact}
        </div>
      </div>

      <div
        className={
          styles.formRating
        }
      >
        {rating}
      </div>
    </div>
  );
}