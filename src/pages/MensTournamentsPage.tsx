/* UPDATED:
   - Men’s tournament rows now use men’s hero image when logo is not present
   - Fixes standalone international tests image
*/

import { useNavigate } from "react-router-dom";
import styles from "./MensTournamentsPage.module.css";

/* ================= HERO ================= */
import mensHero from "../assets/images/raz/mens-tournaments.png";

/* ================= DATA ================= */
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

/* ================= TYPES ================= */
type TournamentRow = {
  name: string;
  year: number;
  description: string;
  logo?: string;
  route: string;
};

export default function MensTournamentsPage() {
  const navigate = useNavigate();

  const mensTournaments: TournamentRow[] = tournaments2026
    .filter((t) => t.gender === "men")
    .map((t) => {
      const visual = getTournamentVisual(t.conceptId);
      return {
        name: t.name,
        year: t.year,
        description:
          t.heroSubtitle ??
          "International rugby competition",
        logo:
          visual?.heroImageMen || visual?.logo,
        route: t.route,
      };
    });

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${mensHero})` }}
      >
        <div className={styles.heroContent}>
          <h1>Men’s Tournaments</h1>
          <p>Historic competitions shaping the global men’s game.</p>
        </div>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backWrap}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/tournaments")}
        >
          ← Back to Tournaments
        </button>
      </div>

      {/* ================= LIST ================= */}
      <section className={styles.section}>
        <div className={styles.list}>
          {mensTournaments.map((t) => (
            <div
              key={t.route}
              className={styles.row}
              role="button"
              tabIndex={0}
              onClick={() => navigate(t.route)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(t.route);
              }}
            >
              {t.logo && (
                <img
                  src={t.logo}
                  alt={t.name}
                  className={styles.logo}
                />
              )}

              <div className={styles.text}>
                <h3>
                  {t.name} {t.year}
                </h3>
                <p className={styles.subtext}>
                  {t.description}
                </p>
              </div>

              <span className={styles.view}>View →</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
