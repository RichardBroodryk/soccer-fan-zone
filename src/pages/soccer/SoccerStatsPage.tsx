// src/pages/soccer/SoccerStatsPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "../StatsPage.module.css";

import { groups } from "../../data/soccer/groups";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import StatCard from "../../components/ui/StatCard";

import heroBg from "../../assets/soccer/heroes/stats-hero.jpg";

import PageWrapper from "../../components/layout/PageWrapper";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

type TableRow = {
  team: string;

  played: number;
  won: number;
  drawn: number;
  lost: number;

  goalsFor: number;
  goalsAgainst: number;

  goalDifference: number;

  points: number;
};

type TopScorer = {
  player: string;
  nation: string;
  goals: number;
};

/* ======================================================
   BUILD GROUP TABLE
   ====================================================== */

function buildGroupTable(
  groupName: string,
  matches: SoccerMatch[]
): TableRow[] {
  const groupMatches =
    matches.filter(
      (m) =>
        m.group ===
          groupName &&
        m.status ===
          "final"
    );

  const group =
    groups.find(
      (g) =>
        g.name ===
        groupName
    );

  if (!group) {
    return [];
  }

  const table: Record<
    string,
    TableRow
  > = {};

  group.teams.forEach(
    (team) => {
      table[team] = {
        team,

        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,

        goalsFor: 0,
        goalsAgainst: 0,

        goalDifference: 0,

        points: 0,
      };
    }
  );

  groupMatches.forEach(
    (match) => {
      if (
        match.homeScore ===
          undefined ||
        match.awayScore ===
          undefined
      ) {
        return;
      }

      const home =
        table[
          match.home
        ];

      const away =
        table[
          match.away
        ];

      if (
        !home ||
        !away
      ) {
        return;
      }

      home.played += 1;
      away.played += 1;

      home.goalsFor +=
        match.homeScore;

      home.goalsAgainst +=
        match.awayScore;

      away.goalsFor +=
        match.awayScore;

      away.goalsAgainst +=
        match.homeScore;

      if (
        match.homeScore >
        match.awayScore
      ) {
        home.won += 1;
        away.lost += 1;

        home.points += 3;
      } else if (
        match.awayScore >
        match.homeScore
      ) {
        away.won += 1;
        home.lost += 1;

        away.points += 3;
      } else {
        home.drawn += 1;
        away.drawn += 1;

        home.points += 1;
        away.points += 1;
      }
    }
  );

  Object.values(
    table
  ).forEach(
    (team) => {
      team.goalDifference =
        team.goalsFor -
        team.goalsAgainst;
    }
  );

  return Object.values(
    table
  ).sort((a, b) => {
    if (
      b.points !==
      a.points
    ) {
      return (
        b.points -
        a.points
      );
    }

    if (
      b.goalDifference !==
      a.goalDifference
    ) {
      return (
        b.goalDifference -
        a.goalDifference
      );
    }

    return (
      b.goalsFor -
      a.goalsFor
    );
  });
}

/* ======================================================
   PAGE
   ====================================================== */

export default function SoccerStatsPage() {
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
          "STATS:",
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
     LIVE MATCHES
     ====================================================== */

  const liveMatches =
    useMemo(() => {
      return allMatches.filter(
        (m) =>
          m.status ===
          "live"
      );
    }, [allMatches]);

  /* ======================================================
     COMPLETED MATCHES
     ====================================================== */

  const completedMatches =
    useMemo(() => {
      return allMatches.filter(
        (m) =>
          m.status ===
          "final"
      );
    }, [allMatches]);

  /* ======================================================
     GROUP STAGE MATCHES
     ====================================================== */

  const groupStageMatches =
    useMemo(() => {
      return allMatches.filter(
        (m) =>
          m.stage ===
          "Group Stage"
      );
    }, [allMatches]);

  /* ======================================================
     GOALS
     ====================================================== */

  const totalGoals =
    useMemo(() => {
      return completedMatches.reduce(
        (
          acc,
          match
        ) =>
          acc +
          (match.homeScore ||
            0) +
          (match.awayScore ||
            0),
        0
      );
    }, [
      completedMatches,
    ]);

  const totalFixtures =
    allMatches.length;

  const averageGoals =
    completedMatches.length >
    0
      ? (
          totalGoals /
          completedMatches.length
        ).toFixed(2)
      : "0.00";

  /* ======================================================
     TOP SCORERS
     ====================================================== */

  const topScorers: TopScorer[] =
    [
      {
        player:
          "Kylian Mbappé",

        nation:
          "France",

        goals: 4,
      },

      {
        player:
          "Vinícius Jr.",

        nation:
          "Brazil",

        goals: 3,
      },

      {
        player:
          "Lionel Messi",

        nation:
          "Argentina",

        goals: 2,
      },

      {
        player:
          "Bukayo Saka",

        nation:
          "England",

        goals: 2,
      },

      {
        player:
          "Christian Pulisic",

        nation:
          "United States",

        goals: 2,
      },
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
        {loading && (
          <div
            style={{
              padding:
                "40px",

              fontWeight: 800,
            }}
          >
            Loading
            tournament
            statistics...
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
              Football
              WORLD CUP
              2026
            </div>

            <h1>
              Tournament
              Statistics
            </h1>

            <p>
              Live
              standings,
              qualification
              races,
              Golden Boot
              leaders and
              performance
              metrics across
              the Global
              World Cup
              2026.
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
                "/soccer/match-center"
              )
            }
          >
            ← Back to
            Match Center
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
                "repeat(auto-fit, minmax(240px, 1fr))",

              gap: "18px",
            }}
          >
            {[
              {
                label:
                  "Total Fixtures",

                value:
                  totalFixtures,
              },

              {
                label:
                  "Completed Matches",

                value:
                  completedMatches.length,
              },

              {
                label:
                  "Live Matches",

                value:
                  liveMatches.length,
              },

              {
                label:
                  "Goals Scored",

                value:
                  totalGoals,
              },

              {
                label:
                  "Goals Per Match",

                value:
                  averageGoals,
              },

              {
                label:
                  "Tournament Groups",

                value:
                  groups.length,
              },

              {
                label:
                  "Group Stage Matches",

                value:
                  groupStageMatches.length,
              },
            ].map(
              (
                item,
                index
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
                  dark={
                    index ===
                    0
                  }
                  accent={
                    index ===
                    0
                      ? "linear-gradient(90deg,#2563eb,#7c3aed)"
                      : undefined
                  }
                />
              )
            )}
          </div>
        </section>

        {/* GOLDEN BOOT */}

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

              gap: "18px",

              marginBottom:
                "24px",
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
                Golden
                Boot Race
              </h2>

              <p
                style={{
                  margin: 0,

                  color:
                    "#6b7280",
                }}
              >
                Leading
                scorers
                across the
                FIFA World
                Cup 2026.
              </p>
            </div>
          </div>

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",

              gap: "18px",
            }}
          >
            {topScorers.map(
              (
                player,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={{
                    background:
                      index ===
                      0
                        ? "linear-gradient(135deg, #111827, #1f2937)"
                        : "#ffffff",

                    color:
                      index ===
                      0
                        ? "#ffffff"
                        : "#111827",

                    borderRadius:
                      "24px",

                    padding:
                      "26px",

                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.08)",
                  }}
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
                    <div
                      style={{
                        fontWeight: 900,

                        fontSize:
                          "1.1rem",
                      }}
                    >
                      {
                        player.player
                      }
                    </div>

                    <div
                      style={{
                        width:
                          "48px",

                        height:
                          "48px",

                        borderRadius:
                          "999px",

                        background:
                          index ===
                          0
                            ? "#ffffff"
                            : "#111827",

                        color:
                          index ===
                          0
                            ? "#111827"
                            : "#ffffff",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        fontWeight: 900,

                        fontSize:
                          "1.1rem",
                      }}
                    >
                      {
                        player.goals
                      }
                    </div>
                  </div>

                  <div
                    style={{
                      color:
                        index ===
                        0
                          ? "rgba(255,255,255,0.72)"
                          : "#6b7280",
                    }}
                  >
                    {
                      player.nation
                    }
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* GROUP TABLES */}

        {groups.map(
          (group) => {
            const table =
              buildGroupTable(
                group.name,
                allMatches
              );

            return (
              <section
                key={
                  group.name
                }
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

                    marginBottom:
                      "18px",

                    flexWrap:
                      "wrap",

                    gap: "12px",
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
                      {
                        group.name
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#6b7280",

                        margin: 0,
                      }}
                    >
                      Qualification
                      standings
                      and
                      progression
                      race.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/soccer/groups/${group.id}`
                      )
                    }
                    style={{
                      border:
                        "none",

                      cursor:
                        "pointer",

                      padding:
                        "12px 18px",

                      borderRadius:
                        "999px",

                      background:
                        "#111827",

                      color:
                        "#ffffff",

                      fontWeight: 800,
                    }}
                  >
                    View
                    Group
                  </button>
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
                      {table.map(
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
                                  ? "rgba(34,197,94,0.08)"
                                  : "transparent",
                            }}
                          >
                            <td
                              className={
                                styles.left
                              }
                              style={{
                                fontWeight: 800,
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
            );
          }
        )}
      </main>
    </PageWrapper>
  );
}