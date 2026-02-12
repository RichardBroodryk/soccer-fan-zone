import { useNavigate } from "react-router-dom";
import styles from "./FixturesPage.module.css";

import { matches2026 } from "../data/matches2026";

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

  const upcoming = matches2026.filter((m) => !m.score);

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

      {/* ================= BACK (CANONICAL) ================= */}
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
          <div className={styles.empty}>No upcoming men’s fixtures.</div>
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
          position="top" /* 🔒 face-safe */
        />

        {womensFixtures.length === 0 && (
          <div className={styles.empty}>No upcoming women’s fixtures.</div>
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
