import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveScoresPage.module.css";

import { matches2026 } from "../data/matches2026";
import LiveScoreRow from "../components/match/LiveScoreRow";

import heroBg from "../assets/images/raz/Livescores.png";

/* ================= UTILITIES ================= */

const isToday = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

/* Placeholder until live engine exists */
const isLive = (_matchId: number) => false;

/* ================= PAGE ================= */

export default function LiveScoresPage() {
  const navigate = useNavigate();

  const { live, recentFinals, today, upcoming } = useMemo(() => {
    const liveMatches = matches2026.filter((m) => isLive(m.id));

    const recentFinals = matches2026.filter(
      (m) => m.score && !isLive(m.id)
    );

    const todayMatches = matches2026.filter(
      (m) => !m.score && isToday(m.date)
    );

    const upcomingMatches = matches2026.filter(
      (m) => !m.score && !isToday(m.date)
    );

    return {
      live: liveMatches,
      recentFinals,
      today: todayMatches,
      upcoming: upcomingMatches,
    };
  }, []);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Live Scores</h1>
          <p>
            Scores and match states from across world rugby —
            <br />
            live action, recent finals, and what’s coming next.
          </p>
        </div>
      </header>

      {/* ================= BACK (CANONICAL PATTERN) ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* ================= LIVE ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Live Now</h2>

        {live.length === 0 ? (
          <div className={styles.empty}>No matches live right now.</div>
        ) : (
          live.map((m) => (
            <LiveScoreRow
              key={m.id}
              home={m.home}
              away={m.away}
              score={m.score}
              phase="2nd Half"
              tournament={m.tournament}
              venue={m.venue}
              anthemStatus="played"
            />
          ))
        )}
      </section>

      {/* ================= RECENT FINALS ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Results</h2>

        {recentFinals.map((m) => (
          <LiveScoreRow
            key={m.id}
            home={m.home}
            away={m.away}
            score={m.score}
            phase="Final"
            tournament={m.tournament}
            venue={m.venue}
          />
        ))}
      </section>

      {/* ================= TODAY ================= */}
      <section className={styles.sectionMuted}>
        <h2 className={styles.sectionTitleMuted}>Today</h2>

        {today.map((m) => (
          <LiveScoreRow
            key={m.id}
            home={m.home}
            away={m.away}
            phase="Upcoming"
            tournament={m.tournament}
            venue={m.venue}
            anthemStatus="pending"
          />
        ))}
      </section>

      {/* ================= UPCOMING ================= */}
      <section className={styles.sectionMuted}>
        <h2 className={styles.sectionTitleMuted}>Upcoming</h2>

        <div className={styles.upcomingGrid}>
          {upcoming.slice(0, 8).map((m) => (
            <LiveScoreRow
              key={m.id}
              home={m.home}
              away={m.away}
              phase="Upcoming"
              tournament={m.tournament}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
