import { useNavigate } from "react-router-dom";
import styles from "./FeaturedTournament.module.css";

/* ================= CANONICAL TOURNAMENT IMAGES ================= */

import sixNationsMen from "../assets/images/tournaments/six-nations-men-2026.jpg";
import sixNationsWomen from "../assets/images/tournaments/six-nations-women-2026.jpg";
import nationsChampionship from "../assets/images/tournaments/nations-championship-2026.jpg";
import nationsCup from "../assets/images/tournaments/nations-cup-2026.jpg";
import svns from "../assets/images/tournaments/svns-2026.jpg";
import greatestRivalry from "../assets/images/tournaments/greatest-rivalry-2026.jpg";

interface FeaturedTournamentData {
  id: string;
  name: string;
  route?: string;
  gender?: "men" | "women";
  flagA?: string;
  flagB?: string;
}

interface FeaturedTournamentProps {
  featuredTournament?: FeaturedTournamentData;
  onSelectTournament: () => void;
}

/* ================= HERO RESOLVER ================= */

function getFeaturedHero(
  tournamentId?: string,
  gender?: "men" | "women"
) {
  switch (tournamentId) {
    case "six-nations":
      return gender === "women"
        ? sixNationsWomen
        : sixNationsMen;

    case "nations-championship":
      return nationsChampionship;

    case "nations-cup":
      return nationsCup;

    case "svns":
      return svns;

    case "greatest-rivalry":
      return greatestRivalry;

    default:
      return undefined;
  }
}

export default function FeaturedTournament({
  featuredTournament,
  onSelectTournament,
}: FeaturedTournamentProps) {
  const navigate = useNavigate();
  const hasSelection = Boolean(featuredTournament);

  const heroImage = getFeaturedHero(
    featuredTournament?.id,
    featuredTournament?.gender
  );

  const handleClick = () => {
    if (featuredTournament?.route) {
      navigate(featuredTournament.route);
    } else {
      onSelectTournament();
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={
        heroImage
          ? { backgroundImage: `url(${heroImage})` }
          : undefined
      }
    >
      {/* Overlay ONLY when hero image exists */}
      {heroImage && <div className={styles.overlay} />}

      <div className={styles.header}>
        <div className={styles.label}>
          {hasSelection
            ? "FEATURED TOURNAMENT"
            : "TOURNAMENT SPOTLIGHT"}
        </div>

        <div className={styles.title}>
          {hasSelection
            ? featuredTournament!.name
            : "Select a Tournament"}
        </div>

        <div className={styles.subtitle}>
          {hasSelection
            ? "Key competition currently in focus"
            : "Explore global competitions and schedules"}
        </div>
      </div>

      {hasSelection && (
        <div className={styles.preview}>
          <div className={styles.flags}>
            {featuredTournament?.flagA && (
              <img
                src={featuredTournament.flagA}
                alt="Team A"
                className={styles.flag}
              />
            )}

            <span className={styles.vs}>vs</span>

            {featuredTournament?.flagB && (
              <img
                src={featuredTournament.flagB}
                alt="Team B"
                className={styles.flag}
              />
            )}
          </div>

          <div className={styles.nextMatch}>
            Next match coming up
          </div>
        </div>
      )}

      <div className={styles.cta}>
        {hasSelection
          ? "View Tournament →"
          : "Browse Tournaments →"}
      </div>
    </div>
  );
}
