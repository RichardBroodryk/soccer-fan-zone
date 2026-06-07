// src/pages/soccer/SoccerTeamsPage.tsx

import { useMemo, useState } from "react";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";
import HubCard from "../../components/homepage/HubCard";

import backgroundImage from "../../assets/soccer/ui/background-light.png";

import usaFlag from "../../assets/soccer/flags/usa.jpg";

import { groups } from "../../data/soccer/groups";
import { teams } from "../../data/soccer/teams";

import {
  getFlag,
} from "../../utils/soccer/flagHelpers";

/* ICONS */

import UsersIcon from "../../components/icons/UsersIcon";
import StarIcon from "../../components/icons/StarIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";

export default function SoccerTeamsPage() {
  const [search, setSearch] =
    useState("");

  const [regionFilter, setRegionFilter] =
    useState("ALL");

  /* ======================================================
     CONFEDERATIONS
     ====================================================== */

  const confederations = useMemo(() => {
    return [
      "ALL",

      ...Array.from(
        new Set(
          teams.map(
            (team) => team.region
          )
        )
      ),
    ];
  }, []);

  /* ======================================================
     FILTERED GROUPS
     ====================================================== */

  const filteredGroups = useMemo(() => {
    return groups
      .map((group) => {
        const filteredTeams =
          group.teams.filter(
            (teamName) => {
              const team =
                teams.find(
                  (t) =>
                    t.name ===
                    teamName
                );

              if (!team) {
                return false;
              }

              const matchesSearch =
                search.trim() ===
                ""
                  ? true
                  : team.name
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      );

              const matchesRegion =
                regionFilter ===
                "ALL"
                  ? true
                  : team.region ===
                    regionFilter;

              return (
                matchesSearch &&
                matchesRegion
              );
            }
          );

        return {
          ...group,
          filteredTeams,
        };
      })
      .filter(
        (group) =>
          group.filteredTeams
            .length > 0
      );
  }, [search, regionFilter]);

  /* ======================================================
     TOTAL TEAMS
     ====================================================== */

  const totalVisibleTeams =
    useMemo(() => {
      return filteredGroups.reduce(
        (acc, group) =>
          acc +
          group.filteredTeams
            .length,
        0
      );
    }, [filteredGroups]);

  return (
    <PageWrapper
      imageUrl={backgroundImage}
    >
      <main className={styles.page}>
        {/* ======================================================
            HERO
            ====================================================== */}

        <section
          style={{
            marginBottom: "42px",

            position: "relative",

            overflow: "hidden",

            borderRadius: "30px",

            padding: "42px",

            background: `
              linear-gradient(
                135deg,
                rgba(15,23,42,0.82),
                rgba(30,41,59,0.78)
              ),
              url(${usaFlag})
            `,

            backgroundSize: "cover",

            backgroundPosition:
              "center",

            color: "#ffffff",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.25)",
          }}
        >
          {/* BG CIRCLE */}

          <div
            style={{
              position:
                "absolute",

              top: "-80px",

              right: "-80px",

              width: "240px",

              height: "240px",

              borderRadius:
                "999px",

              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          <div
            style={{
              position:
                "relative",

              zIndex: 2,
            }}
          >
            {/* BADGE */}

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
                  "rgba(191,219,254,0.20)",

                marginBottom:
                  "22px",

                fontWeight: 800,

                fontSize:
                  "0.85rem",

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",
              }}
            >
              GLOBAL SOCCER
              2026
            </div>

            {/* TITLE */}

            <h1
              style={{
                fontSize:
                  "3.4rem",

                fontWeight: 900,

                marginBottom:
                  "18px",

                lineHeight: 1,
              }}
            >
              Qualified Nations
            </h1>

            {/* TEXT */}

            <p
              style={{
                maxWidth:
                  "860px",

                lineHeight: 1.8,

                opacity: 0.92,

                fontSize:
                  "1.05rem",
              }}
            >
              Explore qualified
              nations,
              tournament
              groups, coaching
              staff and World
              Cup pathways
              heading into the
              biggest global
              soccer tournament
              ever staged across
              the United States,
              Canada and
              Mexico.
            </p>

            {/* HERO STATS */}

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",

                gap: "18px",

                marginTop: "30px",
              }}
            >
              {[
                {
                  label:
                    "Qualified Teams",

                  value:
                    teams.length,
                },

                {
                  label:
                    "Tournament Groups",

                  value:
                    groups.length,
                },

                {
                  label:
                    "Host Nations",

                  value: 3,
                },
              ].map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "rgba(219,234,254,0.95)",

                      border:
                        "1px solid rgba(255,255,255,0.35)",

                      borderRadius:
                        "22px",

                      padding:
                        "22px",

                      backdropFilter:
                        "blur(8px)",

                      color:
                        "#111827",
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          "0.9rem",

                        opacity: 0.72,

                        marginBottom:
                          "10px",
                      }}
                    >
                      {
                        item.label
                      }
                    </div>

                    <div
                      style={{
                        fontSize:
                          "2rem",

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
          </div>
        </section>

        {/* ======================================================
            FILTER BAR
            ====================================================== */}

        <section
          style={{
            marginBottom: "42px",
          }}
        >
          <div
            style={{
              background:
                "#ffffff",

              borderRadius:
                "24px",

              padding: "24px",

              boxShadow:
                "0 2px 14px rgba(0,0,0,0.08)",

              display: "flex",

              flexWrap:
                "wrap",

              gap: "18px",

              alignItems:
                "center",

              justifyContent:
                "space-between",
            }}
          >
            {/* SEARCH */}

            <div
              style={{
                flex: "1 1 320px",
              }}
            >
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search teams..."
                style={{
                  width: "100%",

                  padding:
                    "14px 18px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid #d1d5db",

                  fontSize:
                    "1rem",

                  outline:
                    "none",
                }}
              />
            </div>

            {/* FILTER */}

            <div>
              <select
                value={
                  regionFilter
                }
                onChange={(e) =>
                  setRegionFilter(
                    e.target.value
                  )
                }
                style={{
                  padding:
                    "14px 18px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid #d1d5db",

                  fontSize:
                    "1rem",

                  background:
                    "#ffffff",

                  minWidth:
                    "200px",

                  cursor:
                    "pointer",
                }}
              >
                {confederations.map(
                  (region) => (
                    <option
                      key={
                        region
                      }
                      value={
                        region
                      }
                    >
                      {region ===
                      "ALL"
                        ? "All Confederations"
                        : region}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* COUNT */}

            <div
              style={{
                padding:
                  "12px 18px",

                borderRadius:
                  "999px",

                background:
                  "#dbeafe",

                color:
                  "#111827",

                fontWeight: 800,

                fontSize:
                  "0.92rem",
              }}
            >
              {
                totalVisibleTeams
              }{" "}
              teams visible
            </div>
          </div>
        </section>

        {/* ======================================================
            GROUPS
            ====================================================== */}

        {filteredGroups.map(
          (group) => (
            <section
              key={group.name}
              style={{
                marginBottom:
                  "64px",
              }}
            >
              {/* GROUP HEADER */}

              <div
                style={{
                  background:
                    "#ffffff",

                  borderRadius:
                    "24px",

                  padding:
                    "22px 28px",

                  marginBottom:
                    "26px",

                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  flexWrap:
                    "wrap",

                  gap: "18px",

                  boxShadow:
                    "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div>
                  <h2
  style={{
    margin: 0,

    fontSize:
      "2rem",

    fontWeight: 900,

    color: "#111827",
  }}
>
                    {
                      group.name
                    }
                  </h2>

                  <p
                    style={{
                      margin:
                        "8px 0 0",

                      color:
                        "#6b7280",

                      fontSize:
                        "0.98rem",
                    }}
                  >
                    {
                      group
                        .filteredTeams
                        .length
                    }{" "}
                    qualified
                    teams
                  </p>
                </div>

                <div
                  style={{
                    fontSize:
                      "3rem",

                    fontWeight: 900,

                    opacity: 0.08,
                  }}
                >
                  {group.name.replace(
                    "Group ",
                    ""
                  )}
                </div>
              </div>

              {/* TEAM GRID */}

              <div
                style={{
                  display: "grid",

                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(300px, 1fr))",

                  gap: "22px",
                }}
              >
                {group.filteredTeams.map(
                  (
                    teamName
                  ) => {
                    const team =
                      teams.find(
                        (t) =>
                          t.name ===
                          teamName
                      );

                    if (!team) {
                      return null;
                    }

                    return (
                      <div
                        key={
                          team.id
                        }
                        style={{
                          position:
                            "relative",
                        }}
                      >

                        <HubCard
                          title={
                            team.name
                          }
                          image={
                            getFlag(
                              team.name
                            ) ||
                            usaFlag
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
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          )
        )}

        {/* ======================================================
            EMPTY
            ====================================================== */}

        {filteredGroups.length ===
          0 && (
          <section>
            <div
              style={{
                background:
                  "#ffffff",

                borderRadius:
                  "26px",

                padding:
                  "80px 30px",

                textAlign:
                  "center",

                boxShadow:
                  "0 2px 14px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize:
                    "2rem",

                  marginBottom:
                    "18px",
                }}
              >
                ⚽
              </div>

              <h2
  style={{
    marginTop: 0,

    marginBottom:
      "12px",

    color: "#111827",
  }}
>
                No teams found
              </h2>

              <p
                style={{
                  color:
                    "#6b7280",
                }}
              >
                Try adjusting
                your search or
                confederation
                filter.
              </p>
            </div>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}