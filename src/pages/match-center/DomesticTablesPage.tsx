// src/pages/match-center/DomesticTablesPage.tsx

import { useNavigate } from "react-router-dom";
import styles from "./DomesticTablesPage.module.css";

import { domesticLeagues } from "../../data/domesticLeagues";
import heroImg from "../../assets/images/domestic/domestic-hero.jpg";

export default function DomesticTablesPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent} />
      </header>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* TITLE */}
      <section className={styles.section}>
        <h1 className={styles.title}>
          Domestic League Tables
        </h1>
      </section>

      {/* ================= MEN ================= */}
      <section className={styles.section}>
        <h2 className={styles.blockTitle}>
          Men's Top Domestic Leagues
        </h2>

        <h3 className={styles.sectionTitle}>
          Select a Competition
        </h3>

        <div className={styles.grid}>
          {domesticLeagues.map((league) => (
            <div
              key={`men-${league.id}`}
              className={styles.card}
              onClick={() =>
                navigate(`/match-center/domestic/${league.id}-men`)
              }
            >
              <img
                src={league.logo}
                alt={league.name}
                className={styles.logo}
              />
              <div className={styles.name}>
                {league.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WOMEN ================= */}
      <section className={styles.section}>
        <h2 className={styles.blockTitle}>
          Women's Top Domestic Leagues
        </h2>

        <h3 className={styles.sectionTitle}>
          Select a Competition
        </h3>

        <div className={styles.grid}>
          {domesticLeagues.map((league) => (
            <div
              key={`women-${league.id}`}
              className={styles.card}
              onClick={() =>
                navigate(`/match-center/domestic/${league.id}-women`)
              }
            >
              <img
                src={league.logo}
                alt={league.name}
                className={styles.logo}
              />
              <div className={styles.name}>
                {league.name} (Women)
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}