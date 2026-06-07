import { NavLink } from "react-router-dom";
import styles from "./MatchCenterNav.module.css";

export default function MatchCenterNav() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/soccer/live"
        className={({ isActive }) =>
          isActive
            ? `${styles.link} ${styles.active}`
            : styles.link
        }
      >
        Live
      </NavLink>

      <NavLink
        to="/soccer/fixtures"
        className={({ isActive }) =>
          isActive
            ? `${styles.link} ${styles.active}`
            : styles.link
        }
      >
        Fixtures
      </NavLink>

      <NavLink
        to="/soccer/results"
        className={({ isActive }) =>
          isActive
            ? `${styles.link} ${styles.active}`
            : styles.link
        }
      >
        Results
      </NavLink>

      <NavLink
        to="/soccer/stats"
        className={({ isActive }) =>
          isActive
            ? `${styles.link} ${styles.active}`
            : styles.link
        }
      >
        Stats
      </NavLink>
    </nav>
  );
}