import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyTeamsPage.module.css";

import myRugbyHero from "../assets/images/raz/my-rugby-hero.png";
import { teamsMeta, TeamMeta } from "../data/teamsMeta";
import { loadMyTeams } from "../utils/myTeamsStorage";
import { newsData, NewsItem } from "../data/newsData";

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function MyTeamsPage() {
  const navigate = useNavigate();

  const [view, setView] = useState<"teams" | "feed">("teams");
  const [selectedTeams, setSelectedTeams] = useState<TeamMeta[]>([]);

  useEffect(() => {
    const stored = loadMyTeams();
    const ids = [...stored.men, ...stored.women];
    const teams = teamsMeta.filter((t) => ids.includes(t.id));
    setSelectedTeams(teams);
  }, []);

  /* ================= MY FEED DERIVATION ================= */

  const teamTags = selectedTeams.map((t) => normalize(t.name));

  const myFeed: NewsItem[] = newsData.filter((item) =>
    item.tags.some((tag) => teamTags.includes(normalize(tag)))
  );

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img
          src={myRugbyHero}
          alt=""
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1>My Teams</h1>
          <p>
            Your teams, your tournaments,
            <br />
            and the moments that matter to you.
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
        {/* ================= TOGGLE ================= */}
        <nav className={styles.toggle}>
          <button
            className={view === "teams" ? styles.active : ""}
            onClick={() => setView("teams")}
          >
            My Teams
          </button>

          <button
            className={view === "feed" ? styles.active : ""}
            onClick={() => setView("feed")}
            disabled={selectedTeams.length === 0}
          >
            My Feed
          </button>
        </nav>

        {/* ================= TEAMS ================= */}
        {view === "teams" && (
          <>
            <section className={styles.grid}>
              {selectedTeams.map((team) => (
                <article key={team.id} className={styles.teamCard}>
                  <img
                    src={team.feather}
                    alt=""
                    className={styles.feather}
                  />

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

            <div className={styles.manage}>
              <button
                className={styles.manageButton}
                onClick={() => navigate("/my-teams/manage")}
              >
                Manage Teams
              </button>
            </div>
          </>
        )}

        {/* ================= MY FEED ================= */}
        {view === "feed" && (
          <section className={styles.feed}>
            {myFeed.length === 0 && (
              <div className={styles.empty}>
                <h3>No stories yet</h3>
                <p>
                  We’ll surface news here as it relates
                  to your selected teams.
                </p>
              </div>
            )}

            {myFeed.map((item) => (
              <article key={item.id} className={styles.feedItem}>
                <span className={styles.feedMeta}>
                  {item.source} • {item.time}
                </span>
                <h4>{item.title}</h4>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
