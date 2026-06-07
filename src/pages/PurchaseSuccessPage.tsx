// src/pages/PurchaseSuccessPage.tsx

import { useNavigate } from "react-router-dom";

import styles from "./PurchaseSuccessPage.module.css";

import heroImage from "../assets/soccer/ui/global-soccer-logo.jpg";

export default function PurchaseSuccessPage() {
  const navigate = useNavigate();

  const enterPlatform = () => {
    navigate("/soccer");
  };

  return (
    <section className={styles.page}>
      {/* ================= HERO ================= */}

      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <div className={styles.successBadge}>
            PURCHASE SUCCESSFUL
          </div>

          <h1>
            Welcome To
            International Soccer
            Fans Zone
          </h1>

          <p>
            Your platform access has been
            successfully unlocked.
            You now have full access to the
            complete global football experience.
          </p>
        </div>
      </section>

      {/* ================= SUCCESS CONTENT ================= */}

      <main className={styles.content}>
        {/* SUCCESS CARD */}

        <section className={styles.successCard}>
          <div className={styles.checkIcon}>
            ✓
          </div>

          <h2>
            Global Access Activated
          </h2>

          <p>
            Your football platform access
            is now active across supported devices.
          </p>

          <div className={styles.notice}>
            Your platform access has been activated
            successfully and your account is ready
            to enter the football experience.
          </div>
        </section>

        {/* FEATURES */}

        <section className={styles.featuresSection}>
          <h2>
            Your Experience Includes
          </h2>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                ⚽
              </div>

              <h3>Live Match Center</h3>

              <p>
                Follow fixtures,
                live scores,
                tournament progression
                and football intelligence.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                🧠
              </div>

              <h3>AI Tournament Analysis</h3>

              <p>
                Explore projections,
                rankings, momentum tracking
                and intelligent match insights.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                🏟
              </div>

              <h3>Global Stadium Explorer</h3>

              <p>
                Discover iconic football
                venues and immersive
                supporter experiences.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                🎥
              </div>

              <h3>Football Media Hub</h3>

              <p>
                Access podcasts,
                highlights, documentaries,
                videos and football storytelling.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className={styles.ctaSection}>
          <button
            className={styles.primaryButton}
            onClick={enterPlatform}
          >
            Enter Soccer Home
          </button>
        </section>

        {/* FOOTER */}

        <footer className={styles.footer}>
          Thank you for supporting
          independent global football experiences.
        </footer>
      </main>
    </section>
  );
}