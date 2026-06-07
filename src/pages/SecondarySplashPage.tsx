// src/pages/SecondarySplashPage.tsx

import { useNavigate } from "react-router-dom";

import styles from "./SecondarySplashPage.module.css";

const SecondarySplashPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.secondarySplash}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        {/* HERO */}

        <header className={styles.heroSection}>
          <div className={styles.badge}>
            GLOBAL FOOTBALL 2026
          </div>

          <h1 className={styles.mainTitle}>
            INTERNATIONAL
            <br />
            SOCCER FANS ZONE
          </h1>

          <p className={styles.subtitle}>
            The complete global football experience —
            live match intelligence, AI projections,
            tournament analytics, stadiums, players,
            podcasts, media, fan culture and World Cup
            storytelling in one immersive platform.
          </p>
        </header>

        {/* FEATURES */}

        <section className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>⚽ Live Match Center</h3>

            <p>
              Follow live scores, fixtures,
              knockout progression and tournament
              momentum in real time.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>🧠 AI Tournament Intelligence</h3>

            <p>
              Explore prediction engines,
              power rankings, upset alerts,
              and projected World Cup pathways.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>🏟 Stadium Explorer</h3>

            <p>
              Discover the official Global World Cup
              2026 host venues across the USA,
              Canada and Mexico.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>🌍 National Teams & Players</h3>

            <p>
              Dive into squads, stars, match
              histories, tactical profiles
              and player analytics.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>🎥 Media & Podcasts</h3>

            <p>
              Watch highlights, tactical videos,
              creator content and global football
              podcasts from around the game.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>🔥 Fan Experience</h3>

            <p>
              Experience football culture,
              atmosphere, supporter moments
              and World Cup energy worldwide.
            </p>
          </div>
        </section>

        {/* VALUE */}

        <section className={styles.valueSection}>
          <div className={styles.valueCard}>
            <div className={styles.valuePrice}>
              $1.99
            </div>

            <div className={styles.valueText}>
              One-time unlock for the full
              premium World Cup experience.
            </div>
          </div>
        </section>

        {/* CTA */}

        <div className={styles.continueSection}>
          <button
            className={styles.continueButton}
            onClick={() =>
              navigate("/soccer/welcome")
            }
          >
            Continue To Welcome
          </button>
        </div>

        {/* LEGAL */}

        <footer className={styles.legal}>
          © 2026 International Soccer Fans Zone™.
          Global World Cup companion experience.
          All rights reserved.
        </footer>
      </div>
    </section>
  );
};

export default SecondarySplashPage;