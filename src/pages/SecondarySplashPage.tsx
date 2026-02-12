import { useNavigate } from "react-router-dom";
import styles from "./SecondarySplashPage.module.css";

const SecondarySplashPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.secondarySplash}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        {/* TITLE */}
        <header className={styles.titleSection}>
          <h1 className={styles.mainTitle}>RUGBY ANTHEM ZONE</h1>
          <p className={styles.subtitle}>
            A global home for international rugby
          </p>
        </header>

        {/* HEART */}
        <section className={styles.anthemMoment}>
          <p>
            Experience the vibe of international rugby — sing along with your
            rivals’ anthems, or simply feel the lyrics echo through the stadium.
          </p>
        </section>

        {/* CTA */}
        <div className={styles.continueSection}>
          <button
            className={styles.continueButton}
            onClick={() => navigate("/welcome")}
          >
            Enter Rugby Hub
          </button>
        </div>

        {/* LEGAL */}
        <footer className={styles.legal}>
          © 2026 Rugby Anthem Zone™. All rights reserved.
        </footer>
      </div>
    </section>
  );
};

export default SecondarySplashPage;
