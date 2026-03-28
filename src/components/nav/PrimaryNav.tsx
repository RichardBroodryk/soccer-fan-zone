import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styles from "./PrimaryNav.module.css";

// 🔥 REPLACED LOGO (use splash logo)
import logo from "../../assets/images/raz/raz-splash.png";

type PrimaryNavProps = {
  variant: "freemium" | "premium" | "super";
};

const ACTIVE_TIER_KEY = "raz_active_tier";
const AVATAR_KEY = "raz_avatar";

export default function PrimaryNav({ variant }: PrimaryNavProps) {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState<string | null>(
    localStorage.getItem(AVATAR_KEY)
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* STORE ACTIVE TIER */
  useEffect(() => {
    if (variant === "super") {
      sessionStorage.setItem(ACTIVE_TIER_KEY, "super");
    }

    if (variant === "premium") {
      sessionStorage.setItem(ACTIVE_TIER_KEY, "premium");
    }
  }, [variant]);

  /* SYNC AVATAR */
  useEffect(() => {
    function syncAvatar() {
      setAvatar(localStorage.getItem(AVATAR_KEY));
    }

    window.addEventListener("storage", syncAvatar);
    return () => window.removeEventListener("storage", syncAvatar);
  }, []);

  /* CLOSE DROPDOWN */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* DETERMINE HOME ROUTE */
  const storedTier = sessionStorage.getItem(ACTIVE_TIER_KEY);
  const homeRoute = storedTier === "super" ? "/home-super" : "/home";

  /* FREEMIUM NAV HIDDEN */
  if (variant === "freemium") {
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("raz_avatar");
    sessionStorage.clear();
    navigate("/welcome");
  }

  return (
    <>
      <nav className={styles.nav}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <NavLink to={homeRoute} className={styles.logoLink}>
            <img
              src={logo}
              alt="Rugby Anthem Zone"
              className={styles.logo}
            />
          </NavLink>

          <button
            className={styles.homeButton}
            onClick={() => navigate(homeRoute)}
            aria-label="Home"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 10v10h14V10" />
            </svg>
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.actions} ref={menuRef}>
          
          {/* 🔍 NEW SEARCH ICON (NO LOGIC YET) */}
          <button
            className={styles.iconButton}
            onClick={() => navigate("/search")} // placeholder route
            aria-label="Search"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          {/* PROFILE */}
          <button
            className={styles.profileButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Profile menu"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className={styles.navAvatar}
              />
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div className={styles.dropdown}>
              <button onClick={() => navigate("/profile")}>
                Profile
              </button>

              <button onClick={() => navigate("/my-teams")}>
                My Teams
              </button>

              <button onClick={() => navigate("/notifications")}>
                Notifications
              </button>

              <div className={styles.divider} />

              <button onClick={() => setLogoutConfirm(true)}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* LOGOUT MODAL */}
      {logoutConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirm Logout</h3>

            <p>
              Are you sure you want to log out of Rugby Anthem Zone?
            </p>

            <div className={styles.modalActions}>
              <button
                className={styles.cancel}
                onClick={() => setLogoutConfirm(false)}
              >
                Cancel
              </button>

              <button
                className={styles.confirm}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}