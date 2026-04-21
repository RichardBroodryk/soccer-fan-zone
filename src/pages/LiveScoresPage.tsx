import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveScoresPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/types";

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

const isWomenTournament = (tournament: string) =>
  tournament.toLowerCase().includes("women");

/* 🔥 ONLY WOMEN SIX NATIONS FOR UPCOMING */
const isWomensSixNations = (m: MatchData) =>
  m.competitionId === "six-nations-women";

/* Placeholder */
const isLive = (_matchId: number) => false;

/* ================= SPLIT ================= */

const splitByGender = (matches: MatchData[]) => ({
  men: matches.filter((m) => !isWomenTournament(m.tournament)),
  women: matches.filter((m) => isWomenTournament(m.tournament)),
});

/* ================= PAGE ================= */

export default function LiveScoresPage() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMatches();
        if (mounted) setMatches(data);
      } catch {
        if (mounted) setError("Failed to load matches");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const { live, recentFinals, today, upcoming } = useMemo(() => {
    const liveMatches = matches.filter((m) => isLive(m.id));

    const recentFinals = matches.filter(
      (m) => m.score && !isLive(m.id)
    );

    const todayMatches = matches.filter(
      (m) => !m.score && isToday(m.date)
    );

    const upcomingMatches = matches.filter(
      (m) => !m.score && !isToday(m.date)
    );

    return {
      live: liveMatches,
      recentFinals,
      today: todayMatches,
      upcoming: upcomingMatches,
    };
  }, [matches]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>Loading live matches...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>{error}</div>
      </main>
    );
  }

  /* ================= RENDER ================= */

  const renderGroup = (group: MatchData[]) => {
    const { men, women } = splitByGender(group);

    return (
      <div className={styles.groupWrap}>
        {men.length > 0 && (
          <div className={styles.subBlock}>
            <div className={styles.subHeader}>MEN</div>
            {men.map((m) => (
              <LiveScoreRow key={m.id} matchId={m.id} home={m.home} away={m.away} score={m.score} phase={m.score ? "Final" : "Upcoming"} tournament={m.tournament} venue={m.venue} />
            ))}
          </div>
        )}

        {women.length > 0 && (
          <div className={styles.subBlock}>
            <div className={styles.subHeader}>WOMEN</div>
            {women.map((m) => (
              <LiveScoreRow key={m.id} matchId={m.id} home={m.home} away={m.away} score={m.score} phase={m.score ? "Final" : "Upcoming"} tournament={m.tournament} venue={m.venue} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* 🔥 FILTER UPCOMING */
  const womensUpcoming = upcoming.filter(isWomensSixNations);

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
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

      {/* BACK */}
      <div className={styles.backWrap}>
        <button className={styles.back} onClick={() => navigate("/match-center")}>
          ← Back to Match Center
        </button>
      </div>

      {/* LIVE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitleCenter}>Live Now</h2>
        {live.length === 0 ? (
          <div className={styles.empty}>No matches live right now.</div>
        ) : (
          renderGroup(live)
        )}
      </section>

      {/* RESULTS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitleCenter}>Recent Results</h2>
        {recentFinals.length === 0 ? (
          <div className={styles.empty}>No completed matches available.</div>
        ) : (
          renderGroup(recentFinals)
        )}
      </section>

      {/* TODAY */}
      <section className={styles.sectionMuted}>
        <h2 className={styles.sectionTitleMutedCenter}>Today</h2>
        {today.length === 0 ? (
          <div className={styles.empty}>No matches today.</div>
        ) : (
          renderGroup(today)
        )}
      </section>

      {/* UPCOMING (FILTERED) */}
      <section className={styles.sectionMuted}>
        <h2 className={styles.sectionTitleMutedCenter}>Upcoming</h2>

        {womensUpcoming.length === 0 ? (
          <div className={styles.empty}>No upcoming key fixtures.</div>
        ) : (
          <div className={styles.subBlock}>
            <div className={styles.subHeader}>WOMEN'S SIX NATIONS</div>
            {womensUpcoming.map((m) => (
              <LiveScoreRow
                key={m.id}
                matchId={m.id}
                home={m.home}
                away={m.away}
                phase="Upcoming"
                tournament={m.tournament}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}