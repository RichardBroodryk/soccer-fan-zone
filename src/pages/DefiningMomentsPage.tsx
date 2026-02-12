import { useNavigate } from "react-router-dom";
import styles from "./DefiningMomentsPage.module.css";

/* ================= IMAGES ================= */

import wcTurningPointImage from "../assets/images/moments/wc-turning-point.png";
import lawChangesImage from "../assets/images/moments/law-changes.jpg";
import tacticalImage from "../assets/images/moments/tactical.jpg";
import culturalImage from "../assets/images/moments/cultural.jpg";
import callsDecisionsImage from "../assets/images/moments/calls-decisions.jpg";
import rivalryImage from "../assets/images/moments/era-rivalries.jpg";

/* ================= PAGE ================= */

export default function DefiningMomentsPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Defining Rugby Moments</h1>
          <p>
            The moments that reshaped tournaments,
            <br />
            rivalries, and how the game itself is remembered.
          </p>
        </div>
      </header>

      {/* ================= GRID ================= */}
      <section className={styles.grid}>
        <article
          className={styles.card}
          onClick={() => navigate("/moments/world-cup-turning-points")}
          role="button"
          tabIndex={0}
        >
          <img src={wcTurningPointImage} alt="" />
          <h3>World Cup Turning Points</h3>
          <p>
            Decisions and moments that redirected World Cups
            and altered rugby history.
          </p>
        </article>

        <article
          className={styles.card}
          onClick={() => navigate("/moments/tactical-shifts")}
          role="button"
          tabIndex={0}
        >
          <img src={tacticalImage} alt="" />
          <h3>Tactical Shifts</h3>
          <p>
            Strategic decisions that changed how elite rugby
            is played and won.
          </p>
        </article>

        <article
          className={styles.card}
          onClick={() => navigate("/moments/law-changes")}
          role="button"
          tabIndex={0}
        >
          <img src={lawChangesImage} alt="" />
          <h3>Law Changes</h3>
          <p>
            Moments where interpretation and reform reshaped
            the flow and fairness of the game.
          </p>
        </article>

        <article
          className={styles.card}
          onClick={() => navigate("/moments/calls-decisions")}
          role="button"
          tabIndex={0}
        >
          <img src={callsDecisionsImage} alt="" />
          <h3>Calls & Decisions</h3>
          <p>
            Refereeing moments that defined matches,
            tournaments, and eras.
          </p>
        </article>

        <article
          className={styles.card}
          onClick={() => navigate("/moments/era-defining-rivalries")}
          role="button"
          tabIndex={0}
        >
          <img src={rivalryImage} alt="" />
          <h3>Era-Defining Rivalries</h3>
          <p>
            Contests that became reference points
            for generations of supporters.
          </p>
        </article>

        <article
          className={styles.card}
          onClick={() => navigate("/moments/cultural-moments")}
          role="button"
          tabIndex={0}
        >
          <img src={culturalImage} alt="" />
          <h3>Cultural Moments</h3>
          <p>
            Moments beyond the scoreboard that shaped rugby’s
            identity worldwide.
          </p>
        </article>
      </section>
    </main>
  );
}
