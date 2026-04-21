import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import styles from "./PrimaryNav.module.css";

import logo from "../../assets/images/ui/raz-logo.png";

import {
  buildSearchIndex,
  searchEntities,
  SearchEntity,
} from "../../data/searchIndex";

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

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntity[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  /* STORE TIER */
  useEffect(() => {
    if (variant === "super") {
      sessionStorage.setItem(ACTIVE_TIER_KEY, "super");
    } else if (variant === "premium") {
      sessionStorage.setItem(ACTIVE_TIER_KEY, "premium");
    }
  }, [variant]);

  /* BUILD SEARCH INDEX */
  useEffect(() => {
    if (variant === "freemium") return;
    setIndex(buildSearchIndex(variant));
  }, [variant]);

  /* SEARCH RESULTS */
  const results = useMemo(() => {
    if (!query) return index.slice(0, 8);
    return searchEntities(query, index).slice(0, 8);
  }, [query, index]);

  /* SYNC AVATAR */
  useEffect(() => {
    function syncAvatar() {
      setAvatar(localStorage.getItem(AVATAR_KEY));
    }

    window.addEventListener("storage", syncAvatar);
    return () => window.removeEventListener("storage", syncAvatar);
  }, []);

  /* CLOSE DROPDOWNS */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const storedTier = sessionStorage.getItem(ACTIVE_TIER_KEY);
  const homeRoute = storedTier === "super" ? "/home-super" : "/home";

  const path = window.location.pathname;

  // 🔒 HARD LOCK: never show nav on freemium routes
  if (path.startsWith("/free")) return null;

  // Existing rule
  if (variant === "freemium") return null;

  function handleNavigate(route: string) {
    if (!route) {
      console.warn("RAZ: invalid route");
      return;
    }

    setSearchOpen(false);
    setQuery("");
    navigate(route);
  }

  return (
    <nav className={styles.nav}>
      {/* LEFT */}
      <div className={styles.left}>
        <NavLink to={homeRoute} className={styles.logoLink}>
          <img
            src={logo}
            className={styles.logo}
            alt="Rugby Anthem Zone logo"
          />
        </NavLink>

        {/* HOME ICON */}
        <button
          className={styles.homeButton}
          onClick={() => navigate(homeRoute)}
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

      {/* RIGHT */}
      <div className={styles.actions}>
        {/* SEARCH */}
        <div ref={searchRef} className={styles.searchWrapper}>
          <button
            className={styles.iconButton}
            onClick={() => setSearchOpen((p) => !p)}
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

          {searchOpen && (
            <div className={styles.searchDropdown}>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
                placeholder="Search..."
              />

              <div className={styles.searchResults}>
                {results.map((item) => (
                  <button
                    key={item.id}
                    className={styles.searchItem}
                    onClick={() => handleNavigate(item.route)}
                  >
                    <div>
                      <div className={styles.searchTitle}>
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className={styles.searchSubtitle}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>

                    <span className={styles.searchType}>
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CONTACT */}
        <button
          className={styles.iconButton}
          onClick={() => navigate("/contact")}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </button>

        {/* PROFILE */}
        <div ref={menuRef}>
          <button
            className={styles.profileButton}
            onClick={() => setMenuOpen((p) => !p)}
          >
            {avatar ? (
              <img
                src={avatar}
                className={styles.navAvatar}
                alt="User profile"
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

              <button
                onClick={() => {
                  localStorage.removeItem(AVATAR_KEY);
                  sessionStorage.clear();
                  navigate("/welcome");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}