import { useNavigate } from "react-router-dom";
import styles from "./NationalAnthemsDirectory.module.css";
import { anthemNations } from "../data/anthemNations";

/* Helper: pick first usable accent colour */
function getAccentColor(colors: string[]) {
  return (
    colors.find(
      (c) => !["#ffffff", "#fff"].includes(c.toLowerCase())
    ) || colors[0]
  );
}

export default function NationalAnthemsDirectory() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* PAGE HERO — ANTHEMS (LOCKED IMAGE) */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>National Anthems</h1>
          <p>The sound of identity — sung before every contest.</p>
        </div>
      </section>

      <header className={styles.header}>
        <p>
          Explore the pride, ritual, and heritage of rugby nations
          through their national anthems.
        </p>
      </header>

      <section className={styles.grid}>
        {anthemNations.map((nation) => {
          const accentColor = getAccentColor(nation.colors);

          return (
            <button
              key={nation.id}
              className={styles.card}
              onClick={() => navigate(nation.id)}
              style={{
                background: `linear-gradient(
                  135deg,
                  ${accentColor}22,
                  ${accentColor}11
                )`,
              }}
            >
              {/* Accent strip */}
              <span
                className={styles.accent}
                style={{ backgroundColor: accentColor }}
              />

              {/* Flag */}
              <img
                src={`https://flagcdn.com/w160/${nation.code}.png`}
                alt={`${nation.name} flag`}
                className={styles.flag}
              />

              {/* Text */}
              <div className={styles.info}>
                <h3>{nation.name}</h3>
                <p>{nation.anthem.title}</p>
              </div>
            </button>
          );
        })}
      </section>
    </main>
  );
}
