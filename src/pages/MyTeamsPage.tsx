import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyTeamsPage.module.css";

import myRugbyHero from "../assets/images/raz/my-rugby-hero.png";
import { teamsMeta, TeamMeta } from "../data/teamsMeta";
import { loadMyTeams } from "../utils/myTeamsStorage";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/matches2026Men";

export default function MyTeamsPage() {
  const navigate = useNavigate();

  const [selectedTeams, setSelectedTeams] = useState<TeamMeta[]>([]);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  /* ================= LOAD TEAMS ================= */

  useEffect(() => {
    const stored = loadMyTeams();
    const ids = [...stored.men, ...stored.women];
    const teams = teamsMeta.filter((t) => ids.includes(t.id));
    setSelectedTeams(teams);
  }, []);

  /* ================= LOAD MATCHES ================= */

  useEffect(() => {
    async function fetchMatches() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch {
        console.warn("MyTeams: match fetch failed");
      } finally {
        setLoadingMatches(false);
      }
    }

    fetchMatches();
  }, []);

  /* ================= FILTER MATCHES ================= */

  const teamNames = useMemo(
    () => selectedTeams.map((t) => t.name),
    [selectedTeams]
  );

  const myMatches = useMemo(() => {
    return matches.filter(
      (m) =>
        teamNames.includes(m.home.name) ||
        teamNames.includes(m.away.name)
    );
  }, [matches, teamNames]);

  const upcomingMatches = myMatches
    .filter((m) => !m.score)
    .slice(0, 5);

  const recentResults = myMatches
    .filter((m) => m.score)
    .slice(0, 5);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={myRugbyHero} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>My Teams</h1>
          <p>
            Your teams, your matches,
            <br />
            and what’s coming next.
          </p>
        </div>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backRow}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/fanzone")}
        >
          ← Back to Fanzone
        </button>
      </div>

      <div className={styles.container}>
        {/* ================= TEAMS ================= */}
        <section className={styles.grid}>
          {selectedTeams.map((team) => (
            <article key={team.id} className={styles.teamCard}>
              <img src={team.feather} alt="" className={styles.feather} />

              <div className={styles.teamContent}>
                <img
                  src={team.flag}
                  alt={`${team.name} flag`}
                  className={styles.flag}
                />
                <h3>{team.name}</h3>
                <p>
                  {team.gender === "men"
                    ? "Men’s International"
                    : "Women’s International"}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* ================= UPCOMING ================= */}
        <section className={styles.section}>
          <h2>Upcoming Matches</h2>

          {loadingMatches ? (
            <div className={styles.empty}>Loading matches...</div>
          ) : upcomingMatches.length === 0 ? (
            <div className={styles.empty}>
              No upcoming matches for your teams.
            </div>
          ) : (
            upcomingMatches.map((m) => (
              <div key={m.id} className={styles.matchItem}>
                <strong>
                  {m.home.name} vs {m.away.name}
                </strong>
                <div>{m.tournament}</div>
              </div>
            ))
          )}
        </section>

        {/* ================= RESULTS ================= */}
        <section className={styles.section}>
          <h2>Recent Results</h2>

          {recentResults.length === 0 ? (
            <div className={styles.empty}>
              No recent results.
            </div>
          ) : (
            recentResults.map((m) => (
              <div key={m.id} className={styles.matchItem}>
                <strong>
                  {m.home.name} {m.score?.home} - {m.score?.away}{" "}
                  {m.away.name}
                </strong>
                <div>{m.tournament}</div>
              </div>
            ))
          )}
        </section>

        {/* ================= MANAGE ================= */}
        <div className={styles.manage}>
          <button
            className={styles.manageButton}
            onClick={() => navigate("/my-teams/manage")}
          >
            Manage Teams
          </button>
        </div>
      </div>
    </main>
  );
}