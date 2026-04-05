import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./FixturesPage.module.css";

import { getMatches } from "../data/matchesAdapter";

/* ✅ FIX: correct type import */
import type { MatchData } from "../data/matches/matches2026Men";

import FixtureRow from "../components/fixtures/FixtureRow";
import FixturesSectionHero from "../components/fixtures/FixturesSectionHero";

import heroBg from "../assets/images/raz/Fixtures.jpg";
import mensHero from "../assets/images/raz/mens-tournaments.png";
import womensHero from "../assets/images/raz/womens-tournaments.png";

/* ================= UTIL ================= */

function isWomenTournament(tournament: string) {
  return tournament.toLowerCase().includes("women");
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ================= PAGE ================= */

export default function FixturesPage() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH MATCHES ================= */

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMatches();

        if (mounted) setMatches(data);
      } catch {
        if (mounted) setError("Failed to load fixtures");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className={styles.empty}>Loading fixtures...</div>;
  }

  if (error) {
    return <div className={styles.empty}>{error}</div>;
  }

  /* ================= UPCOMING ================= */

  const upcoming = matches.filter((m) => !m.score);

  const mensFixtures = upcoming.filter(
    (m) => !isWomenTournament(m.tournament)
  );

  const womensFixtures = upcoming.filter((m) =>
    isWomenTournament(m.tournament)
  );

  return (
    <main className={styles.page}>
      {/* ================= MAIN HERO ================= */}

      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Fixtures</h1>
          <p>
            Upcoming international rugby fixtures —
            <br />
            plan ahead across major tournaments and tours.
          </p>
        </div>
      </header>

      {/* ================= BACK ================= */}

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* ================= MEN ================= */}

      <section className={styles.section}>
        <FixturesSectionHero
          title="Men’s International Fixtures"
          backgroundImage={mensHero}
        />

        {mensFixtures.length === 0 && (
          <div className={styles.empty}>
            No upcoming men’s fixtures.
          </div>
        )}

        {mensFixtures.map((m) => (
          <FixtureRow
            key={m.id}
            date={formatDate(m.date)}
            home={m.home}
            away={m.away}
            venue={m.venue}
            tournament={m.tournament}
            tournamentRoute={`/tournament/${m.tournament
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          />
        ))}
      </section>

      {/* ================= WOMEN ================= */}

      <section className={styles.section}>
        <FixturesSectionHero
          title="Women’s International Fixtures"
          backgroundImage={womensHero}
          position="top"
        />

        {womensFixtures.length === 0 && (
          <div className={styles.empty}>
            No upcoming women’s fixtures.
          </div>
        )}

        {womensFixtures.map((m) => (
          <FixtureRow
            key={m.id}
            date={formatDate(m.date)}
            home={m.home}
            away={m.away}
            venue={m.venue}
            tournament={m.tournament}
            tournamentRoute={`/tournament/${m.tournament
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          />
        ))}
      </section>
    </main>
  );
}