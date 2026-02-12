import { useNavigate } from "react-router-dom";
import styles from "./MatchCenterPage.module.css";

import heroBg from "../assets/images/raz/Match-center.png";

/* CARD IMAGES */
import liveScoresImg from "../assets/images/raz/Livescores.png";
import fixturesImg from "../assets/images/raz/Fixtures.jpg";
import resultsImg from "../assets/images/raz/Results.png";
import statsImg from "../assets/images/raz/Stats3.png";

export default function MatchCenterPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Match Center</h1>
          <p>
            Your hub for live scores, fixtures, results
            <br />
            and competition statistics.
          </p>
        </div>
      </header>

      {/* ================= PRIMARY HUB ================= */}
      <section className={styles.hubGrid}>
        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${liveScoresImg})` }}
          onClick={() => navigate("/live-scores")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardPlate}>
            <h3>Live Scores</h3>
            <p>Follow matches in real time as they unfold.</p>
          </div>
        </div>

        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${fixturesImg})` }}
          onClick={() => navigate("/fixtures")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardPlate}>
            <h3>Fixtures</h3>
            <p>Upcoming international rugby matches.</p>
          </div>
        </div>

        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${resultsImg})` }}
          onClick={() => navigate("/results")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardPlate}>
            <h3>Results</h3>
            <p>Final scores and completed fixtures.</p>
          </div>
        </div>

        <div
          className={styles.hubCard}
          style={{ backgroundImage: `url(${statsImg})` }}
          onClick={() => navigate("/stats")}
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardPlate}>
            <h3>Stats</h3>
            <p>Team, tournament and venue statistics.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
