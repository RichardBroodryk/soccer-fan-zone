import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import PageWrapper from "../../components/layout/PageWrapper";

import AutoContentRail from "../../components/ui/AutoContentRail";

import styles from "./SoccerMyTeamsPage.module.css";

import heroImage from "../../assets/soccer/fanzone/soccer-myteams.jpg";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import { teams } from "../../data/soccer/teams";

import {
  soccerFlags,
} from "../../data/soccer/soccerFlags";

import {
  loadMySoccerTeams,
} from "../../utils/soccer/soccerMyTeamsStorage";

export default function SoccerMyTeamsPage() {
  const navigate =
    useNavigate();

  const [
    selectedIds,
    setSelectedIds,
  ] = useState<string[]>([]);

  useEffect(() => {
    const stored =
      loadMySoccerTeams();

    setSelectedIds(
      stored.teams
    );
  }, []);

  const selectedTeams =
    useMemo(() => {
      return teams.filter(
        (team) =>
          selectedIds.includes(
            team.id
          )
      );
    }, [selectedIds]);

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
            styles.hero
          }
          style={{
            backgroundImage:
              `url(${heroImage})`,
          }}
        >
          <div
            className={
              styles.overlay
            }
          />

          <div
            className={
              styles.heroContent
            }
          >
            <div
              className={
                styles.eyebrow
              }
            >
              PERSONALIZED
              FOOTBALL
            </div>

            <h1>
              My Teams
            </h1>

            <p>
              Build your
              personal football
              identity around
              the nations you
              follow through
              World Cup 2026.
            </p>
          </div>
        </section>

        {/* BACK */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "center",

            marginTop:
              "42px",

            marginBottom:
              "46px",
          }}
        >
          <button
            onClick={() =>
              navigate(
                "/soccer/fanzone"
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
                "14px 26px",

              borderRadius:
                "999px",

              cursor:
                "pointer",

              fontWeight:
                800,

              fontSize:
                "0.95rem",

              boxShadow:
                "0 12px 30px rgba(37,99,235,0.28)",

              transition:
                "all 0.2s ease",
            }}
          >
            ← Back To
            Fanzone
          </button>
        </div>

        {/* EMPTY */}

        {selectedTeams.length ===
        0 ? (
          <section
            className={
              styles.emptyState
            }
            style={{
              marginBottom:
                "60px",
            }}
          >
            <h2>
              No Teams
              Selected
            </h2>

            <p>
              Choose your
              favorite national
              teams to
              personalize your
              football
              experience.
            </p>

            <button
              className={
                styles.manageButton
              }
              onClick={() =>
                navigate(
                  "/soccer/my-teams/manage"
                )
              }
            >
              Choose Teams
            </button>
          </section>
        ) : (
          <>
            {/* HEADER */}

            <section
              className={
                styles.sectionHeader
              }
              style={{
                marginBottom:
                  "28px",
              }}
            >
              <div>
                <div
                  className={
                    styles.sectionEyebrow
                  }
                >
                  YOUR FOOTBALL
                  IDENTITY
                </div>

                <h2>
                  Selected
                  Nations
                </h2>
              </div>

              <button
                className={
                  styles.manageButton
                }
                onClick={() =>
                  navigate(
                    "/soccer/my-teams/manage"
                  )
                }
              >
                Manage Teams
              </button>
            </section>

            {/* RAIL */}

            <section
              style={{
                marginBottom:
                  "70px",
              }}
            >
              <AutoContentRail>
                {selectedTeams.map(
                  (team) => (
                    <article
                      key={
                        team.id
                      }
                      className={
                        styles.teamCard
                      }
                    >
                      <div
                        className={
                          styles.cardOverlay
                        }
                      />

                      <div
                        className={
                          styles.teamTop
                        }
                      >
                        <img
                          src={
                            soccerFlags[
                              team.id
                            ]
                          }
                          alt={
                            team.name
                          }
                          className={
                            styles.flag
                          }
                        />

                        <div>
                          <div
                            className={
                              styles.fifa
                            }
                          >
                            {
                              team.fifaCode
                            }
                          </div>

                          <h3>
                            {
                              team.name
                            }
                          </h3>
                        </div>
                      </div>

                      <div
                        className={
                          styles.meta
                        }
                      >
                        <div>
                          <span>
                            Region
                          </span>

                          <strong>
                            {
                              team.region
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            Coach
                          </span>

                          <strong>
                            {
                              team.coach
                            }
                          </strong>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </AutoContentRail>
            </section>
          </>
        )}
      </main>
    </PageWrapper>
  );
}