// src/pages/soccer/SoccerNationPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import styles from "../FixturesPage.module.css";

import playersHero from "../../assets/soccer/heroes/playerspage.jpg";

import {
  getNationMatches,
  getNationPlayers,
  getNationRecord,
} from "../../utils/soccer/nationHelpers";

import type {
  SoccerPlayer,
} from "../../data/soccer/players";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import { teams } from "../../data/soccer/teams";

import { soccerFlags } from "../../data/soccer/soccerFlags";

export default function SoccerNationPage() {
  const navigate =
    useNavigate();

  const { nation } =
    useParams();

  const nationName =
    nation || "";

  const [
    players,
    setPlayers,
  ] = useState<
    SoccerPlayer[]
  >([]);

  const [
    nationMatches,
    setNationMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [record, setRecord] =
    useState({
      wins: 0,
      draws: 0,
      losses: 0,
    });

  const [loading, setLoading] =
    useState(true);

  /* ======================================================
     TEAM META
     ====================================================== */

  const nationMeta =
    useMemo(() => {
      return teams.find(
        (team) =>
          team.id ===
          nationName
      );
    }, [nationName]);

  /* ======================================================
     FLAG
     ====================================================== */

  const flag =
    soccerFlags[
      nationName
    ];

  /* ======================================================
     LOAD DATA
     ====================================================== */

  useEffect(() => {
    async function loadNation() {
      try {
        setLoading(true);

        const [
          playersData,
          matchesData,
          recordData,
        ] =
          await Promise.all([
            getNationPlayers(
              nationName
            ),

            getNationMatches(
              nationName
            ),

            getNationRecord(
              nationName
            ),
          ]);

        setPlayers(
          playersData ||
            []
        );

        setNationMatches(
          matchesData ||
            []
        );

        setRecord(
          recordData || {
            wins: 0,
            draws: 0,
            losses: 0,
          }
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (nationName) {
      loadNation();
    }
  }, [nationName]);

  if (!nationName) {
    return null;
  }

  return (
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
          backgroundImage: `url(${playersHero})`,
          minHeight:
            "560px",
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
          <button
            className={
              styles.back
            }
            onClick={() =>
              navigate(
                "/soccer/search"
              )
            }
            style={{
              marginBottom:
                "28px",
            }}
          >
            ← Back To Search
          </button>

          {loading && (
            <div
              style={{
                marginBottom:
                  "24px",

                fontWeight: 800,
              }}
            >
              Loading nation
              data...
            </div>
          )}

          {/* FLAG */}

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap: "22px",

              flexWrap:
                "wrap",

              marginBottom:
                "28px",
            }}
          >
            {flag && (
              <img
                src={flag}
                alt={
                  nationMeta?.name
                }
                style={{
                  width:
                    "92px",

                  height:
                    "92px",

                  objectFit:
                    "cover",

                  borderRadius:
                    "999px",

                  border:
                    "4px solid rgba(255,255,255,0.25)",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.35)",
                }}
              />
            )}

            <div>
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
                    "rgba(255,255,255,0.12)",

                  color:
                    "#ffffff",

                  fontWeight: 900,

                  marginBottom:
                    "18px",
                }}
              >
                {nationMeta?.region ||
                  "WORLD CUP"}
              </div>

              <h1
                style={{
                  marginBottom:
                    "14px",
                }}
              >
                {nationMeta?.name ||
                  nationName}
              </h1>

              <p
                style={{
                  maxWidth:
                    "760px",
                }}
              >
                Squad overview,
                player stars,
                tournament
                form and World
                Cup performance
                tracking.
              </p>
            </div>
          </div>

          {/* QUICK META */}

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",

              gap: "18px",

              width: "100%",

              marginTop:
                "34px",
            }}
          >
            <HeroMetaCard
              label="Head Coach"
              value={
                nationMeta?.coach ||
                "Unknown"
              }
            />

            <HeroMetaCard
              label="Confederation"
              value={
                nationMeta?.region ||
                "FIFA"
              }
            />

            <HeroMetaCard
              label="Squad Size"
              value={`${players.length} Players`}
            />

            <HeroMetaCard
              label="Matches"
              value={`${nationMatches.length}`}
            />
          </div>
        </div>
      </header>

      {/* RECORD */}

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

            gap: "22px",
          }}
        >
          <StatCard
            label="Wins"
            value={
              record.wins
            }
          />

          <StatCard
            label="Draws"
            value={
              record.draws
            }
          />

          <StatCard
            label="Losses"
            value={
              record.losses
            }
          />

          <StatCard
            label="Squad Players"
            value={
              players.length
            }
          />
        </div>
      </section>

      {/* PLAYERS */}

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

            marginBottom:
              "26px",

            flexWrap:
              "wrap",

            gap: "14px",
          }}
        >
          <h2>
            ⭐ National
            Squad
          </h2>

          <div
            style={{
              opacity: 0.65,

              fontWeight: 700,
            }}
          >
            {
              players.length
            }{" "}
            Registered
            Players
          </div>
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
          {players.map(
            (
              player
            ) => (
              <button
                key={
                  player.id
                }
                onClick={() =>
                  navigate(
                    `/soccer/players/${player.id}`
                  )
                }
                style={{
                  border:
                    "none",

                  cursor:
                    "pointer",

                  textAlign:
                    "left",

                  background:
                    "linear-gradient(135deg, #ffffff, #f8fafc)",

                  borderRadius:
                    "28px",

                  padding:
                    "26px",

                  boxShadow:
                    "0 12px 30px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    marginBottom:
                      "22px",

                    alignItems:
                      "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize:
                          "1.2rem",

                        fontWeight: 900,

                        marginBottom:
                          "8px",
                      }}
                    >
                      {
                        player.name
                      }
                    </div>

                    <div
                      style={{
                        opacity:
                          0.7,

                        fontWeight: 600,
                      }}
                    >
                      {
                        player.club
                      }
                    </div>
                  </div>

                  <div
                    style={{
                      width:
                        "58px",

                      height:
                        "58px",

                      borderRadius:
                        "999px",

                      background:
                        "#111827",

                      color:
                        "#ffffff",

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
                      player.number
                    }
                  </div>
                </div>

                <div
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "repeat(3, 1fr)",

                    gap: "14px",
                  }}
                >
                  <MiniStat
                    label="Goals"
                    value={
                      player.goals ??
                      0
                    }
                  />

                  <MiniStat
                    label="Assists"
                    value={
                      player.assists ??
                      0
                    }
                  />

                  <MiniStat
                    label="Caps"
                    value={
                      player.caps ??
                      0
                    }
                  />
                </div>
              </button>
            )
          )}
        </div>
      </section>

      {/* FIXTURES */}

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

            marginBottom:
              "26px",

            flexWrap:
              "wrap",

            gap: "14px",
          }}
        >
          <h2>
            🏟 Match
            History
          </h2>

          <div
            style={{
              opacity: 0.65,

              fontWeight: 700,
            }}
          >
            {
              nationMatches.length
            }{" "}
            Fixtures
          </div>
        </div>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "18px",
          }}
        >
          {nationMatches.map(
            (
              match
            ) => (
              <button
                key={
                  match.id
                }
                onClick={() =>
                  navigate(
                    `/soccer/matches/${match.id}`
                  )
                }
                style={{
                  border:
                    "none",

                  cursor:
                    "pointer",

                  textAlign:
                    "left",

                  background:
                    "linear-gradient(135deg, #ffffff, #f8fafc)",

                  borderRadius:
                    "28px",

                  padding:
                    "28px",

                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    flexWrap:
                      "wrap",

                    gap: "16px",

                    marginBottom:
                      "16px",

                    alignItems:
                      "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,

                      fontSize:
                        "1.15rem",
                    }}
                  >
                    {
                      match.home
                    }{" "}
                    vs{" "}
                    {
                      match.away
                    }
                  </div>

                  <div
                    style={{
                      fontWeight: 900,

                      fontSize:
                        "1.4rem",
                    }}
                  >
                    {match.homeScore ??
                      "-"}{" "}
                    :{" "}
                    {match.awayScore ??
                      "-"}
                  </div>
                </div>

                <div
                  style={{
                    display:
                      "flex",

                    flexWrap:
                      "wrap",

                    gap: "18px",

                    opacity:
                      0.72,

                    fontWeight: 600,
                  }}
                >
                  <span>
                    {
                      match.stage
                    }
                  </span>

                  <span>
                    {
                      match.stadium
                    }
                  </span>

                  <span>
                    {
                      match.city
                    }
                  </span>

                  <span>
                    {
                      match.date
                    }
                  </span>
                </div>
              </button>
            )
          )}
        </div>
      </section>
    </main>
  );
}

interface HeroMetaCardProps {
  label: string;
  value: string;
}

function HeroMetaCard({
  label,
  value,
}: HeroMetaCardProps) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.1)",

        border:
          "1px solid rgba(255,255,255,0.1)",

        borderRadius:
          "24px",

        padding:
          "22px",

        backdropFilter:
          "blur(10px)",
      }}
    >
      <div
        style={{
          opacity: 0.7,

          marginBottom:
            "8px",

          fontWeight: 700,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: 900,

          fontSize:
            "1.1rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;

  value:
    | string
    | number;
}

function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div
      style={{
        background:
          "#ffffff",

        borderRadius:
          "28px",

        padding:
          "32px",

        boxShadow:
          "0 12px 28px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          fontSize:
            "2.4rem",

          fontWeight: 900,

          marginBottom:
            "10px",
        }}
      >
        {value}
      </div>

      <div
        style={{
          opacity: 0.7,

          fontWeight: 700,
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface MiniStatProps {
  label: string;

  value:
    | string
    | number;
}

function MiniStat({
  label,
  value,
}: MiniStatProps) {
  return (
    <div
      style={{
        background:
          "#f3f4f6",

        borderRadius:
          "18px",

        padding:
          "16px",
      }}
    >
      <div
        style={{
          fontWeight: 900,

          marginBottom:
            "6px",

          fontSize:
            "1rem",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize:
            "0.8rem",

          opacity: 0.7,

          fontWeight: 700,
        }}
      >
        {label}
      </div>
    </div>
  );
}