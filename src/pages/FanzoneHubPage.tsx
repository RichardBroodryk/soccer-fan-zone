import { useNavigate } from "react-router-dom";
import styles from "./FanzoneHubPage.module.css";

import heroImage from "../assets/images/raz/fanzone-hub.png";

import loyaltyImg from "../assets/images/raz/fanzone-loyalty.png";
import audioImg from "../assets/images/raz/pay-per-audio.jpg";
import ppvImg from "../assets/images/raz/fanzone-ppv.png";
import myTeamsImg from "../assets/images/raz/my-rugby-hero.png";

export default function FanzoneHubPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroTitleBlock}>
            <h1>Fanzone</h1>
          </div>

          <p className={styles.heroSubtitle}>
            Loyalty, live match audio, and premium access built
            around connection to the game that goes beyond
            the scoreboard.
          </p>
        </div>
      </header>

      {/* ================= INTRO ================= */}
      <section className={styles.intro}>
        <p>
          Fanzone is designed for committed supporters. It prioritises
          access, recognition, and proximity to the game — not noise,
          volume, or constant prompts.
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className={styles.features}>
        {/* Loyalty */}
        <div
          className={styles.featureCard}
          style={{ backgroundImage: `url(${loyaltyImg})` }}
          onClick={() => navigate("/fanzone/loyalty")}
        >
          <div className={styles.featureOverlay} />
          <h2>Loyalty Card Program</h2>
        </div>

        {/* Live Match Audio — IMAGE INSIDE CARD */}
        <div
          className={styles.audioCard}
          onClick={() => navigate("/fanzone/audio")}
        >
          <img
            src={audioImg}
            alt="Live Match Audio"
            className={styles.audioImage}
          />

          <div className={styles.audioText}>
            <h2>Live Match Audio</h2>
          </div>
        </div>

        {/* Pay Per View */}
        <div
          className={styles.featureCard}
          style={{ backgroundImage: `url(${ppvImg})` }}
          onClick={() => navigate("/fanzone/ppv")}
        >
          <div className={styles.featureOverlay} />
          <h2>Pay Per View</h2>
        </div>

        {/* My Teams — PREFERENCE LAYER */}
        <div
          className={styles.featureCard}
          style={{ backgroundImage: `url(${myTeamsImg})` }}
          onClick={() => navigate("/fanzone/my-teams")}
        >
          <div className={styles.featureOverlay} />
          <h2>My Teams</h2>
        </div>
      </section>
    </main>
  );
}
