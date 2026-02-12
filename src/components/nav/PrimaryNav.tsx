import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./PrimaryNav.module.css";

import logo from "../../assets/images/ui/raz-logo.png";

type PrimaryNavProps = {
  variant: "freemium" | "premium" | "super";
};

export default function PrimaryNav({ variant }: PrimaryNavProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 🔒 HARD EXIT — FREEMIUM NEVER SEES NAV
  if (variant === "freemium") {
    return null;
  }

  const homeRoute = variant === "super" ? "/home-super" : "/home";
  const isSuper = variant === "super";

  // 🔑 CANONICAL ROUTE (SHARED ACROSS TIERS)
  const anthemsRoute = "/anthems";

  return (
    <>
      <nav className={styles.nav}>
        {/* LOGO */}
        <NavLink to={homeRoute} className={styles.logoLink}>
          <img src={logo} alt="Rugby Anthem Zone" className={styles.logo} />
        </NavLink>

        {/* DESKTOP LINKS */}
        <div className={styles.links}>
          <NavLink to={anthemsRoute}>Anthems</NavLink>
          <NavLink to="/tournaments">Tournaments</NavLink>
          <NavLink to="/match-center">Match Center</NavLink>
          <NavLink to="/matchday-journeys">Matchday Journeys</NavLink>
          <NavLink to="/media">The Rugby Studio</NavLink>
          <NavLink to="/fanzone">Fanzone</NavLink>

          {isSuper && <NavLink to="/heritage">Heritage</NavLink>}
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button
            className={styles.exit}
            onClick={() => navigate("/welcome")}
          >
            Welcome
          </button>

          <button
            className={styles.hamburger}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <aside className={`${styles.drawer} ${open ? styles.open : ""}`}>
        <header className={styles.drawerHeader}>
          <img src={logo} alt="Rugby Anthem Zone" />
          <button onClick={() => setOpen(false)}>✕</button>
        </header>

        <nav className={styles.drawerNav}>
          <NavLink to={anthemsRoute} onClick={() => setOpen(false)}>
            Anthems
          </NavLink>
          <NavLink to="/tournaments" onClick={() => setOpen(false)}>
            Tournaments
          </NavLink>
          <NavLink to="/match-center" onClick={() => setOpen(false)}>
            Match Center
          </NavLink>
          <NavLink to="/matchday-journeys" onClick={() => setOpen(false)}>
            Matchday Journeys
          </NavLink>
          <NavLink to="/media" onClick={() => setOpen(false)}>
            The Rugby Studio
          </NavLink>
          <NavLink to="/fanzone" onClick={() => setOpen(false)}>
            Fanzone
          </NavLink>

          {isSuper && (
            <>
              <NavLink to="/heritage" onClick={() => setOpen(false)}>
                Heritage
              </NavLink>
              <NavLink
                to="/defining-moments"
                onClick={() => setOpen(false)}
              >
                Defining Rugby Moments
              </NavLink>
            </>
          )}

          <div className={styles.divider} />

          <NavLink to="/news" onClick={() => setOpen(false)}>
            News
          </NavLink>
          <NavLink to="/inside-the-game" onClick={() => setOpen(false)}>
            Inside the Game
          </NavLink>
          <NavLink to="/calendar" onClick={() => setOpen(false)}>
            Calendar
          </NavLink>
          <NavLink to="/stadiums" onClick={() => setOpen(false)}>
            Stadiums
          </NavLink>
          <NavLink to="/merch" onClick={() => setOpen(false)}>
            Merch
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
