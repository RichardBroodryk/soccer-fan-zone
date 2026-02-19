/* UPDATED:
   - Restored row click navigation to tournament routes
   - Gender-aware hub images (men/women)
   - No code removed
*/

import { useNavigate } from "react-router-dom";
import styles from "./TournamentsHubPage.module.css";

/* ================= HERO ================= */
import tournamentHero from "../assets/images/raz/tournament-hub-page.png";

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

export default function TournamentsHubPage() {
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

  const womensTournaments: TournamentRow[] = tournaments2026
    .filter((t) => t.gender === "women")
    .map((t) => {
      const visual = getTournamentVisual(t.conceptId);
      return {
        name: t.name,
        year: t.year,
        description:
          t.heroSubtitle ??
          "International rugby competition",
        logo:
          visual?.heroImageWomen || visual?.logo,
        route: t.route,
      };
    });

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${tournamentHero})` }}
      >
        <div className={styles.heroContent}>
          <h1>Tournaments</h1>
          <p>
            International rugby competitions — shared identity,
            rivalry, and tradition.
          </p>
        </div>
      </header>

      {/* ================= MEN ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerRow}>
            <h2>Men’s Tournaments</h2>
            <button
              className={styles.viewAll}
              onClick={() => navigate("/tournaments/men")}
            >
              View all →
            </button>
          </div>
          <p>Historic competitions shaping the global men’s game.</p>
        </div>

        <div className={styles.list}>
          {mensTournaments.map((t) => (
            <div
              key={t.name}
              className={styles.row}
              onClick={() => navigate(t.route)}
              style={{ cursor: "pointer" }}
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
            </div>
          ))}
        </div>
      </section>

      {/* ================= WOMEN ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerRow}>
            <h2>Women’s Tournaments</h2>
            <button
              className={styles.viewAll}
              onClick={() => navigate("/tournaments/women")}
            >
              View all →
            </button>
          </div>
          <p>Elite competitions defining women’s international rugby.</p>
        </div>

        <div className={styles.list}>
          {womensTournaments.map((t) => (
            <div
              key={t.name}
              className={styles.row}
              onClick={() => navigate(t.route)}
              style={{ cursor: "pointer" }}
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
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
