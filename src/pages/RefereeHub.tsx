import { useNavigate } from "react-router-dom";
import styles from "./RefereeHub.module.css";

import refereeHero from "../assets/images/raz/referees.png";

import bookHero from "../assets/images/referee/book-hero.jpg";
import rulesHero from "../assets/images/referee/rules-hero.jpg";
import tmoHero from "../assets/images/referee/tmo-hero.jpg";

export default function RefereeHub() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${refereeHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Referee Hub</h1>
          <p>
            Laws, interpretations, and decisions explained — clarity for fans and
            respect for officials.
          </p>
        </div>
      </header>

      {/* ================= BACK BUTTON ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/inside-the-game")}
        >
          ← Back to Inside the Game
        </button>
      </div>

      {/* ================= EDUCATION ================= */}
      <section className={styles.section}>
        <h2>Education &amp; Respect</h2>
        <p className={styles.bodyText}>
          Understanding the laws improves the game experience for everyone —
          players, referees, and fans alike.
        </p>
      </section>

      {/* ================= FOCUS AREAS ================= */}
      <section className={styles.section}>
        <h2>Refereeing Focus Areas</h2>

        <div className={styles.cards}>
          <div
            className={styles.featureCard}
            style={{ backgroundImage: `url(${rulesHero})` }}
            onClick={() =>
              navigate("/inside-the-game/referees/breakdown")
            }
          >
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <h3>Breakdown &amp; Rucks</h3>
              <span>Where most decisions are made</span>
            </div>
          </div>

          <div
            className={styles.featureCard}
            style={{ backgroundImage: `url(${tmoHero})` }}
            onClick={() =>
              navigate("/inside-the-game/referees/tmo")
            }
          >
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <h3>TMO &amp; Reviews</h3>
              <span>Process, thresholds, and outcomes</span>
            </div>
          </div>

          <div
            className={styles.featureCard}
            style={{ backgroundImage: `url(${bookHero})` }}
            onClick={() =>
              navigate("/inside-the-game/referees/law-updates")
            }
          >
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <h3>Law Updates</h3>
              <span>What changed — and why it matters</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FORWARD LOOK ================= */}
      <section className={styles.section}>
        <h2>What’s Coming</h2>
        <p className={styles.bodyText}>
          Video explainers, referee interviews, and decision breakdowns will be
          introduced as this hub evolves.
        </p>
      </section>
    </main>
  );
}
