// src/pages/soccer/SoccerGroupPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import styles from "../StatsPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import { groups } from "../../data/soccer/groups";
import { teams } from "../../data/soccer/teams";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import {
  buildGroupStandings,
} from "../../utils/soccer/tableEngine";

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

import HubCard from "../../components/homepage/HubCard";

/* ICONS */

import UsersIcon from "../../components/icons/UsersIcon";
import StarIcon from "../../components/icons/StarIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";

/* IMAGES */

import heroBg from "../../assets/soccer/heroes/playerspage.jpg";
import backgroundLight from "../../assets/soccer/ui/background-light.png";

export default function SoccerGroupPage() {
  const { groupId } =
    useParams();

  const navigate =
    useNavigate();

  const [
    allMatches,
    setAllMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     LOAD MATCHES
     ====================================================== */

  useEffect(() => {
    async function loadMatches() {
      try {
        const data =
          await getAllWorldCupMatches();

        console.log(
          "GROUP PAGE:",
          data
        );

        setAllMatches(
          data
        );
      } catch (err) {
        console.error(
          err
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    loadMatches();
  }, []);

  /* ======================================================
     GROUP
     ====================================================== */

  const group =
    groups.find(
      (g) =>
        g.id ===
        groupId
    );

  /* ======================================================
     GROUP TEAMS
     ====================================================== */

  const groupTeams =
    group
      ? teams.filter(
          (team) =>
            group.teams.includes(
              team.name
            )
        )
      : [];

  /* ======================================================
     GROUP MATCHES
     ====================================================== */

  const groupMatches =
    useMemo(() => {
      if (!group) {
        return [];
      }

      return allMatches.filter(
        (match) =>
          match.group ===
          group.name
      );
    }, [
      group,
      allMatches,
    ]);

  /* ======================================================
     SORT MATCHES
     ====================================================== */

  const sortedMatches =
    useMemo(() => {
      return [
        ...groupMatches,
      ].sort(
        (a, b) =>
          new Date(
            a.date
          ).getTime() -
          new Date(
            b.date
          ).getTime()
      );
    }, [groupMatches]);

  /* ======================================================
     STANDINGS
     ====================================================== */

  const standings =
    useMemo(() => {
      return buildGroupStandings(
        groupMatches
      );
    }, [groupMatches]);

  /* ======================================================
     MATCH COUNTS
     ====================================================== */

  const liveMatches =
    useMemo(() => {
      return groupMatches.filter(
        (m) =>
          m.status ===
          "live"
      );
    }, [groupMatches]);

  const completedMatches =
    useMemo(() => {
      return groupMatches.filter(
        (m) =>
          m.status ===
          "final"
      );
    }, [groupMatches]);

  const upcomingMatches =
    useMemo(() => {
      return groupMatches.filter(
        (m) =>
          m.status ===
          "upcoming"
      );
    }, [groupMatches]);

  /* ======================================================
     GOALS
     ====================================================== */

  const totalGoals =
    useMemo(() => {
      return completedMatches.reduce(
        (
          total,
          match
        ) =>
          total +
          (match.homeScore ||
            0) +
          (match.awayScore ||
            0),
        0
      );
    }, [
      completedMatches,
    ]);

  /* ======================================================
     NOT FOUND
     ====================================================== */

  if (!group) {
    return (
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
          Group not
          found.
        </div>
      </main>
    );
  }

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
        {loading && (
          <div
            style={{
              padding:
                "40px",

              fontWeight: 800,
            }}
          >
            Loading
            group
            intelligence...
          </div>
        )}

        {/* HERO */}

        <header
          className={
            styles.hero
          }
          style={{
            backgroundImage: `url(${heroBg})`,
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

                fontWeight: 800,

                fontSize:
                  "0.88rem",

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",
              }}
            >
              Global
              WORLD CUP
              2026
            </div>

            <h1>
              {group.name}
            </h1>

            <p>
              Group stage
              standings,
              fixtures,
              qualification
              race and
              live match
              action.
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
                "/soccer/groups"
              )
            }
          >
            ← Back to
            Groups
          </button>
        </div>

        {/* OVERVIEW */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",

              gap: "18px",
            }}
          >
            {[
              {
                label:
                  "Qualified Teams",

                value:
                  groupTeams.length,
              },

              {
                label:
                  "Fixtures",

                value:
                  groupMatches.length,
              },

              {
                label:
                  "Live Matches",

                value:
                  liveMatches.length,
              },

              {
                label:
                  "Completed",

                value:
                  completedMatches.length,
              },

              {
                label:
                  "Upcoming",

                value:
                  upcomingMatches.length,
              },

              {
                label:
                  "Goals Scored",

                value:
                  totalGoals,
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
                  style={{
                    background:
                      "#ffffff",

                    borderRadius:
                      "22px",

                    padding:
                      "28px",

                    boxShadow:
                      "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "0.92rem",

                      color:
                        "#6b7280",

                      marginBottom:
                        "12px",
                    }}
                  >
                    {
                      item.label
                    }
                  </div>

                  <div
                    style={{
                      fontSize:
                        "2.2rem",

                      fontWeight: 900,
                    }}
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

        {/* STANDINGS */}

        <section
          className={
            styles.section
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

              flexWrap:
                "wrap",

              gap: "14px",

              marginBottom:
                "20px",
            }}
          >
            <div>
              <h2
                className={
                  styles.sectionTitle
                }
                style={{
                  marginBottom:
                    "6px",
                }}
              >
                Group
                Standings
              </h2>

              <p
  style={{
    color: "#6b7280",
    margin: 0,
  }}
>
  Group winners,
  runners-up and
  the best third-place
  teams advance to
  the knockout stage.
</p>
            </div>

            <div
              style={{
                padding:
                  "10px 16px",

                borderRadius:
                  "999px",

                background:
                  "#dcfce7",

                color:
                  "#166534",

                fontWeight: 800,

                fontSize:
                  "0.9rem",
              }}
            >
              WC 2026
Qualification
            </div>
          </div>

          <div
            className={
              styles.tableWrap
            }
          >
            <table
              className={
                styles.statsTable
              }
            >
              <thead>
                <tr>
                  <th
                    className={
                      styles.left
                    }
                  >
                    #
                  </th>

                  <th
                    className={
                      styles.left
                    }
                  >
                    Team
                  </th>

                  <th>
                    P
                  </th>

                  <th>
                    W
                  </th>

                  <th>
                    D
                  </th>

                  <th>
                    L
                  </th>

                  <th>
                    GF
                  </th>

                  <th>
                    GA
                  </th>

                  <th>
                    GD
                  </th>

                  <th>
                    Pts
                  </th>
                </tr>
              </thead>

              <tbody>
                {standings.map(
                  (
                    team,
                    index
                  ) => (
                    <tr
                      key={
                        team.team
                      }
                      style={{
                        background:
                          index <
                          2
                            ? "rgba(34,197,94,0.06)"
                            : "transparent",
                      }}
                    >
                      <td
                        className={
                          styles.left
                        }
                      >
                        {index +
                          1}
                      </td>

                      <td
                        className={
                          styles.left
                        }
                        style={{
                          fontWeight: 800,

                          cursor:
                            "pointer",
                        }}
                        onClick={() => {
                          const linkedTeam =
                            teams.find(
                              (
                                t
                              ) =>
                                t.name ===
                                team.team
                            );

                          if (
                            linkedTeam
                          ) {
                            navigate(
                              `/soccer/teams/${linkedTeam.id}`
                            );
                          }
                        }}
                      >
                        {
                          team.team
                        }
                      </td>

                      <td>
                        {
                          team.played
                        }
                      </td>

                      <td>
                        {
                          team.won
                        }
                      </td>

                      <td>
                        {
                          team.drawn
                        }
                      </td>

                      <td>
                        {
                          team.lost
                        }
                      </td>

                      <td>
                        {
                          team.goalsFor
                        }
                      </td>

                      <td>
                        {
                          team.goalsAgainst
                        }
                      </td>

                      <td>
                        {team.goalDifference >
                        0
                          ? `+${team.goalDifference}`
                          : team.goalDifference}
                      </td>

                      <td>
                        <strong>
                          {
                            team.points
                          }
                        </strong>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* TEAMS */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              marginBottom:
                "22px",
            }}
          >
            <h2
              className={
                styles.sectionTitle
              }
              style={{
                marginBottom:
                  "6px",
              }}
            >
              Nations
            </h2>

            <p
              style={{
                color:
                  "#6b7280",

                margin: 0,
              }}
            >
              Qualified
              nations in{" "}
              {
                group.name
              }
              .
            </p>
          </div>

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",

              gap: "20px",
            }}
          >
            {groupTeams.map(
              (
                team
              ) => (
                <HubCard
                  key={
                    team.id
                  }
                  title={
                    team.name
                  }
                  image={
                    heroBg
                  }
                  to={`/soccer/teams/${team.id}`}
                  features={[
                    {
                      label:
                        team.region,

                      icon:
                        <UsersIcon />,
                    },

                    {
                      label:
                        team.coach,

                      icon:
                        <StarIcon />,
                    },

                    {
                      label:
                        group.name,

                      icon:
                        <CalendarIcon />,
                    },
                  ]}
                />
              )
            )}
          </div>
        </section>

        {/* MATCHES */}

        <section
          className={
            styles.section
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

              flexWrap:
                "wrap",

              gap: "14px",

              marginBottom:
                "22px",
            }}
          >
            <div>
              <h2
                className={
                  styles.sectionTitle
                }
                style={{
                  marginBottom:
                    "6px",
                }}
              >
                Group
                Fixtures
              </h2>

              <p
                style={{
                  color:
                    "#6b7280",

                  margin: 0,
                }}
              >
                All matches
                from{" "}
                {
                  group.name
                }
                .
              </p>
            </div>

            <div
              style={{
                display:
                  "flex",

                gap: "10px",

                flexWrap:
                  "wrap",
              }}
            >
              <div
                style={{
                  padding:
                    "10px 14px",

                  borderRadius:
                    "999px",

                  background:
                    "#dbeafe",

                  fontWeight: 800,

                  fontSize:
                    "0.88rem",
                }}
              >
                Upcoming:{" "}
                {
                  upcomingMatches.length
                }
              </div>

              <div
                style={{
                  padding:
                    "10px 14px",

                  borderRadius:
                    "999px",

                  background:
                    "#fee2e2",

                  fontWeight: 800,

                  fontSize:
                    "0.88rem",
                }}
              >
                Live:{" "}
                {
                  liveMatches.length
                }
              </div>

              <div
                style={{
                  padding:
                    "10px 14px",

                  borderRadius:
                    "999px",

                  background:
                    "#dcfce7",

                  fontWeight: 800,

                  fontSize:
                    "0.88rem",
                }}
              >
                Completed:{" "}
                {
                  completedMatches.length
                }
              </div>
            </div>
          </div>

          {sortedMatches.length ===
          0 ? (
            <div
              className={
                styles.empty
              }
            >
              No fixtures
              available.
            </div>
          ) : (
            <div
              style={{
                display:
                  "flex",

                flexDirection:
                  "column",

                gap: "18px",
              }}
            >
              {sortedMatches.map(
                (
                  match
                ) => (
                  <SoccerMatchRow
                    key={
                      match.id
                    }
                    match={
                      match
                    }
                    onClick={() =>
                      navigate(
                        `/soccer/matches/${match.id}`
                      )
                    }
                  />
                )
              )}
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  );
}