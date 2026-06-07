// src/pages/soccer/SoccerPlayersPage.tsx

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../FixturesPage.module.css";

import playersHero from "../../assets/soccer/heroes/playerspage.jpg";

import {
  getAllPlayers,
  getTopAssistProviders,
  getTopScorers,
  getYoungStars,
} from "../../data/soccer/playerHelpers";

export default function SoccerPlayersPage() {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] =
    useState<
      | "all"
      | "scorers"
      | "assists"
      | "young-stars"
    >("all");

  /* ======================================================
     DATA
     ====================================================== */

  const allPlayers = useMemo(() => {
    return getAllPlayers();
  }, []);

  const topScorers = useMemo(() => {
    return getTopScorers(5);
  }, []);

  const topAssists = useMemo(() => {
    return getTopAssistProviders(5);
  }, []);

  const youngStars = useMemo(() => {
    return getYoungStars(23);
  }, []);

  /* ======================================================
     FILTERED
     ====================================================== */

  const displayedPlayers =
    selectedTab === "scorers"
      ? topScorers
      : selectedTab === "assists"
      ? topAssists
      : selectedTab ===
        "young-stars"
      ? youngStars
      : allPlayers;

  return (
    <main className={styles.page}>
      {/* HERO */}

      <header
        className={styles.hero}
        style={{
          backgroundImage: `url(${playersHero})`,
        }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div
            style={{
              display: "inline-flex",

              alignItems: "center",

              gap: "10px",

              padding: "10px 18px",

              borderRadius: "999px",

              background:
                "rgba(255,255,255,0.12)",

              color: "#ffffff",

              fontWeight: 900,

              marginBottom: "18px",

              letterSpacing: "0.08em",
            }}
          >
            FIFA WORLD CUP 2026
          </div>

          <h1>Player Universe</h1>

          <p>
            Discover football’s biggest
            stars, Golden Boot contenders,
            creators and rising talents from
            the FIFA World Cup 2026.
          </p>
        </div>
      </header>

      {/* FILTERS */}

      <section className={styles.section}>
        <div
          style={{
            display: "flex",

            flexWrap: "wrap",

            gap: "12px",
          }}
        >
          <FilterButton
            active={
              selectedTab === "all"
            }
            onClick={() =>
              setSelectedTab("all")
            }
          >
            All Players
          </FilterButton>

          <FilterButton
            active={
              selectedTab ===
              "scorers"
            }
            onClick={() =>
              setSelectedTab(
                "scorers"
              )
            }
          >
            Golden Boot
          </FilterButton>

          <FilterButton
            active={
              selectedTab ===
              "assists"
            }
            onClick={() =>
              setSelectedTab(
                "assists"
              )
            }
          >
            Assist Leaders
          </FilterButton>

          <FilterButton
            active={
              selectedTab ===
              "young-stars"
            }
            onClick={() =>
              setSelectedTab(
                "young-stars"
              )
            }
          >
            Young Stars
          </FilterButton>
        </div>
      </section>

      {/* PLAYERS */}

      <section className={styles.section}>
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "24px",
          }}
        >
          {displayedPlayers.map(
            (player: any) => (
              <button
                key={player.id}
                onClick={() =>
                  navigate(
                    `/soccer/players/${player.id}`
                  )
                }
                style={{
                  border: "none",

                  textAlign: "left",

                  cursor: "pointer",

                  padding: "28px",

                  borderRadius: "28px",

                  background:
                    "linear-gradient(180deg, rgba(17,24,39,0.98), rgba(3,7,18,0.98))",

                  color: "#ffffff",

                  boxShadow:
                    "0 18px 50px rgba(0,0,0,0.28)",

                  transition:
                    "transform 0.25s ease",
                }}
              >
                {/* HEADER */}

                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize:
                          "1.4rem",

                        fontWeight: 900,

                        marginBottom:
                          "6px",
                      }}
                    >
                      {player.name}
                    </div>

                    <div
                      style={{
                        color:
                          "rgba(255,255,255,0.65)",
                      }}
                    >
                      {player.nation}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "58px",

                      height: "58px",

                      borderRadius:
                        "999px",

                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      background:
                        "rgba(255,255,255,0.08)",

                      fontWeight: 900,

                      fontSize: "1.2rem",
                    }}
                  >
                    {player.number}
                  </div>
                </div>

                {/* CLUB */}

                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "0.78rem",

                      textTransform:
                        "uppercase",

                      letterSpacing:
                        "0.1em",

                      color:
                        "rgba(255,255,255,0.5)",

                      marginBottom:
                        "6px",
                    }}
                  >
                    Club
                  </div>

                  <div
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {player.club}
                  </div>
                </div>

                {/* STATS */}

                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns:
                      "repeat(3, 1fr)",

                    gap: "16px",
                  }}
                >
                  <StatBlock
                    label="Goals"
                    value={
                      player.goals
                    }
                  />

                  <StatBlock
                    label="Assists"
                    value={
                      player.assists
                    }
                  />

                  <StatBlock
                    label="Caps"
                    value={
                      player.caps
                    }
                  />
                </div>
              </button>
            )
          )}
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   FILTER BUTTON
   ====================================================== */

interface FilterButtonProps {
  active: boolean;

  onClick: () => void;

  children: React.ReactNode;
}

function FilterButton({
  active,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",

        borderRadius: "999px",

        padding: "12px 18px",

        cursor: "pointer",

        fontWeight: 800,

        background: active
          ? "#111827"
          : "#e5e7eb",

        color: active
          ? "#ffffff"
          : "#111827",
      }}
    >
      {children}
    </button>
  );
}

/* ======================================================
   STAT BLOCK
   ====================================================== */

interface StatBlockProps {
  label: string;

  value: number;
}

function StatBlock({
  label,
  value,
}: StatBlockProps) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.06)",

        borderRadius: "18px",

        padding: "16px",
      }}
    >
      <div
        style={{
          fontSize: "1.4rem",

          fontWeight: 900,

          marginBottom: "4px",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: "0.8rem",

          color:
            "rgba(255,255,255,0.65)",
        }}
      >
        {label}
      </div>
    </div>
  );
}