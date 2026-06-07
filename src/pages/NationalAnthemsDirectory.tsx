import { useNavigate } from "react-router-dom";

import styles from "./NationalAnthemsDirectory.module.css";

import AppLayout from "../layouts/AppLayout";

import { anthemNations } from "../data/anthems/anthemNations";

/* ======================================================
   HELPER
   ====================================================== */

function getAccentColor(colors: string[]) {
  return (
    colors.find(
      (c) =>
        !["#ffffff", "#fff"].includes(
          c.toLowerCase()
        )
    ) || colors[0]
  );
}

export default function NationalAnthemsDirectory() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <main className={styles.page}>
        {/* HERO */}

        <section className={styles.hero}>
          <div
            className={
              styles.heroOverlay
            }
          />

          <div
            className={
              styles.heroContent
            }
          >
            <div
              className={
                styles.heroBadge
              }
            >
              GLOBAL FOOTBALL
              ANTHEMS
            </div>

            <h1>
              National Anthems
            </h1>

            <p>
              The sound of identity
              before every global
              football battle.
            </p>
          </div>
        </section>

        {/* INTRO */}

        <header className={styles.header}>
          <p>
            Explore the pride,
            ritual, emotion and
            football heritage of
            nations through their
            national anthems.
          </p>
        </header>

        {/* GRID */}

        <section className={styles.grid}>
          {anthemNations.map(
            (nation) => {
              const accentColor =
                getAccentColor(
                  nation.colors
                );

              return (
                <button
                  key={nation.id}
                  className={
                    styles.card
                  }
                  onClick={() =>
                    navigate(
                      nation.id
                    )
                  }
                  style={{
                    background: `linear-gradient(
                    135deg,
                    ${accentColor}18,
                    rgba(255,255,255,0.92)
                  )`,
                  }}
                >
                  <span
                    className={
                      styles.accent
                    }
                    style={{
                      backgroundColor:
                        accentColor,
                    }}
                  />

                  <img
                    src={`https://flagcdn.com/w160/${nation.code}.png`}
                    alt={`${nation.name} flag`}
                    className={
                      styles.flag
                    }
                  />

                  <div
                    className={
                      styles.info
                    }
                  >
                    <h3>
                      {nation.name}
                    </h3>

                    <p>
                      {
                        nation
                          .anthem
                          .title
                      }
                    </p>
                  </div>
                </button>
              );
            }
          )}
        </section>
      </main>
    </AppLayout>
  );
}