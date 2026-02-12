import { useNavigate } from "react-router-dom";
import styles from "./WomensTournamentsPage.module.css";

/* ================= HERO ================= */
import womensHero from "../assets/images/raz/womens-tournaments.png";

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

export default function WomensTournamentsPage() {
  const navigate = useNavigate();

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
        logo: visual?.logo,
        route: t.route,
      };
    });

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${womensHero})` }}
      >
        <div className={styles.heroContent}>
          <h1>Women’s Tournaments</h1>
          <p>Elite competitions defining women’s international rugby.</p>
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
          {womensTournaments.map((t) => (
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
