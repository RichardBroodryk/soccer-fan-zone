import { NavLink } from "react-router-dom";
import styles from "./MatchCenterNav.module.css";

export default function MatchCenterNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/match-center" className={styles.link}>
        Live
      </NavLink>
      <NavLink to="/fixtures" className={styles.link}>
        Fixtures
      </NavLink>
      <NavLink to="/results" className={styles.link}>
        Results
      </NavLink>
      <NavLink to="/stats" className={styles.link}>
        Stats
      </NavLink>
    </nav>
  );
}
