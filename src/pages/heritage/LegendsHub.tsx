import { useNavigate } from "react-router-dom";
import styles from "./LegendsHub.module.css";

import heroBg from "../../assets/images/raz/legends-hub.png";

export default function LegendsHub() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO — HERITAGE POP SYSTEM */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Legends of the Game</h1>
          <p>
            The greatest players to ever represent their nations —
            icons who shaped rugby history across generations.
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

      {/* HUB GRID */}
      <section className={styles.grid}>
        <div
          className={styles.card}
          onClick={() => navigate("/heritage/legends/men")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && navigate("/heritage/legends/men")
          }
        >
          <h2>Men’s Legends</h2>
          <p>
            From early pioneers to modern greats — players whose names
            became synonymous with excellence and national pride.
          </p>
        </div>

        <div
          className={styles.card}
          onClick={() => navigate("/heritage/legends/women")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && navigate("/heritage/legends/women")
          }
        >
          <h2>Women’s Legends</h2>
          <p>
            Trailblazers and champions who elevated women’s rugby and
            inspired generations worldwide.
          </p>
        </div>
      </section>
    </main>
  );
}
