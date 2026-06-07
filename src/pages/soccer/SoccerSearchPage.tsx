import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../FixturesPage.module.css";

import searchHero from "../../assets/soccer/heroes/search.jpg";

import {
  searchMatches,
  searchNations,
  searchPlayers,
  searchStadiums,
} from "../../utils/soccer/searchHelpers";

import { teams } from "../../data/soccer/teams";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

export default function SoccerSearchPage() {
  const navigate = useNavigate();

  const [query, setQuery] =
    useState("");

  /* ======================================================
     RESULTS
     ====================================================== */

  const players = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    return searchPlayers(query);
  }, [query]);

  const nations = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    return searchNations(query);
  }, [query]);

  const [matches, setMatches] =
    useState<SoccerMatch[]>([]);

  const [stadiums, setStadiums] =
    useState<string[]>([]);

  useEffect(() => {
    async function runSearch() {
      if (!query.trim()) {
        setMatches([]);
        setStadiums([]);
        return;
      }

      try {
        const [
          matchResults,
          stadiumResults,
        ] = await Promise.all([
          searchMatches(query),
          searchStadiums(query),
        ]);

        setMatches(matchResults);
        setStadiums(stadiumResults);
      } catch (error) {
        console.error(
          "Search failed:",
          error
        );

        setMatches([]);
        setStadiums([]);
      }
    }

    runSearch();
  }, [query]);

  function getTeamId(
    nation: string
  ): string {
    const found = teams.find(
      (team) =>
        team.name === nation
    );

    return found?.id || "";
  }

  return (
    <main className={styles.page}>
      {/* HERO */}

      <header
        className={styles.hero}
        style={{
          backgroundImage: `url(${searchHero})`,
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
            }}
          >
            GLOBAL SEARCH
          </div>

          <h1>Soccer Search Hub</h1>

          <p>
            Discover players, nations,
            matches and stadiums from the
            FIFA World Cup 2026 ecosystem.
          </p>
        </div>
      </header>

      {/* SEARCH */}

      <section className={styles.section}>
        <input
          type="text"
          placeholder="Search players, nations, stadiums..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          style={{
            width: "100%",
            padding: "22px",
            borderRadius: "22px",
            border: "none",
            fontSize: "1rem",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        />
      </section>

      {/* PLAYERS */}

      {players.length > 0 && (
        <section
          className={styles.section}
        >
          <h2
            style={{
              marginBottom: "24px",
            }}
          >
            Players
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() =>
                  navigate(
                    `/soccer/players/${player.id}`
                  )
                }
                style={{
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background:
                    "#ffffff",
                  borderRadius:
                    "24px",
                  padding: "24px",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "1.2rem",
                    fontWeight: 900,
                    marginBottom:
                      "8px",
                  }}
                >
                  {player.name}
                </div>

                <div
                  style={{
                    opacity: 0.7,
                  }}
                >
                  {player.nation}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* MATCHES */}

      {matches.length > 0 && (
        <section
          className={styles.section}
        >
          <h2
            style={{
              marginBottom: "24px",
            }}
          >
            Matches
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "18px",
            }}
          >
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() =>
                  navigate(
                    `/soccer/matches/${match.id}`
                  )
                }
                style={{
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background:
                    "#ffffff",
                  borderRadius:
                    "24px",
                  padding: "24px",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    marginBottom:
                      "10px",
                  }}
                >
                  {match.home} vs{" "}
                  {match.away}
                </div>

                <div>
                  {match.stadium}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* NATIONS */}

      {nations.length > 0 && (
        <section
          className={styles.section}
        >
          <h2
            style={{
              marginBottom: "24px",
            }}
          >
            Nations
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {nations.map((nation) => {
              const teamId =
                getTeamId(nation);

              return (
                <button
                  key={nation}
                  onClick={() =>
                    navigate(
                      `/soccer/teams/${teamId}`
                    )
                  }
                  style={{
                    border: "none",
                    padding:
                      "12px 18px",
                    borderRadius:
                      "999px",
                    fontWeight: 700,
                    background:
                      "#111827",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  {nation}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STADIUMS */}

      {stadiums.length > 0 && (
        <section
          className={styles.section}
        >
          <h2
            style={{
              marginBottom: "24px",
            }}
          >
            Stadiums
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            {stadiums.map(
              (stadium) => (
                <div
                  key={stadium}
                  style={{
                    background:
                      "#ffffff",
                    padding:
                      "24px",
                    borderRadius:
                      "24px",
                    fontWeight: 700,
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  {stadium}
                </div>
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
}