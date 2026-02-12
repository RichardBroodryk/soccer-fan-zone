import { useNavigate } from "react-router-dom";
import styles from "./CoachesSupportHub.module.css";

import heroBg from "../../assets/images/raz/coaches-support.png";

export default function CoachesSupportHub() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Coaches & Support Staff</h1>
          <p>
            The leadership, strategy, and expertise behind international rugby
            success — past and present.
          </p>
        </div>
      </header>

      {/* BACK TO HERITAGE */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage")}
        >
          ← Back to Rugby Heritage
        </button>
      </div>

      {/* SECTION INTRO */}
      <section className={styles.sectionIntro}>
        <h2>Behind Every Great Team</h2>
        <p>
          The coaches and specialists whose leadership, preparation, and
          expertise shaped rugby’s most successful eras.
        </p>
      </section>

      {/* HUB GRID */}
      <section className={styles.grid}>
        <div
          className={`${styles.card} ${styles.head}`}
          onClick={() => navigate("/heritage/coaches/head-coaches")}
          role="button"
          tabIndex={0}
        >
          <h2>Head Coaches</h2>
          <p>
            The principal architects of national teams, responsible for vision,
            leadership, and competitive direction.
          </p>
        </div>

        <div
          className={`${styles.card} ${styles.assistant}`}
          onClick={() => navigate("/heritage/coaches/assistant-coaches")}
          role="button"
          tabIndex={0}
        >
          <h2>Assistant Coaches</h2>
          <p>
            Specialists in attack, defence, skills, and set-piece execution who
            shaped team performance behind the scenes.
          </p>
        </div>

        <div
          className={`${styles.card} ${styles.support}`}
          onClick={() => navigate("/heritage/coaches/support-staff")}
          role="button"
          tabIndex={0}
        >
          <h2>Support Staff</h2>
          <p>
            Medical teams, conditioners, analysts, and operational staff whose
            expertise underpinned sustained international success.
          </p>
        </div>
      </section>
    </main>
  );
}
