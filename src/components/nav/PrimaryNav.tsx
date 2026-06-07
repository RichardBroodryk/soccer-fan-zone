import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

import styles from "./PrimaryNav.module.css";

import logo from "../../assets/soccer/ui/nav-logo.png";

/* ⚽ SOCCER SEARCH */
import {
  buildSearchIndex,
  searchEntities,
  SearchEntity,
} from "../../data/soccer/searchIndex";

type PrimaryNavProps = {
  isSoccer?: boolean;
};

const AVATAR_KEY = "raz_avatar";

export default function PrimaryNav({
  isSoccer = false,
}: PrimaryNavProps) {
  const navigate = useNavigate();

  const location = useLocation();

  const [avatar, setAvatar] = useState<
    string | null
  >(localStorage.getItem(AVATAR_KEY));

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [query, setQuery] = useState("");

  const [index, setIndex] = useState<
    SearchEntity[]
  >([]);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const searchRef =
    useRef<HTMLDivElement>(null);

  /* ======================================================
     BUILD SEARCH INDEX
     ====================================================== */

  useEffect(() => {
    setIndex(buildSearchIndex());
  }, []);

  const results = useMemo(() => {
    if (!query) {
      return index.slice(0, 8);
    }

    return searchEntities(
      query,
      index
    ).slice(0, 8);
  }, [query, index]);

  /* ======================================================
     SYNC AVATAR
     ====================================================== */

  useEffect(() => {
    function syncAvatar() {
      setAvatar(
        localStorage.getItem(AVATAR_KEY)
      );
    }

    window.addEventListener(
      "storage",
      syncAvatar
    );

    return () =>
      window.removeEventListener(
        "storage",
        syncAvatar
      );
  }, []);

  /* ======================================================
     CLOSE DROPDOWNS
     ====================================================== */

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    setMenuOpen(false);

    setSearchOpen(false);
  }, [location.pathname]);

  /* ======================================================
     ROUTES
     ====================================================== */

 const homeRoute =
  "/soccer";

  function handleNavigate(route: string) {
    if (!route) return;

    setSearchOpen(false);

    setQuery("");

    navigate(route);
  }

  return (
    <nav className={styles.nav}>
      {/* ======================================================
          LEFT
          ====================================================== */}

      <div className={styles.left}>
        <NavLink
          to={homeRoute}
          className={styles.logoLink}
        >
          <img
            src={logo}
            className={styles.logo}
            alt={
              isSoccer
                ? "Soccer Fans Zone"
                : "Rugby Anthem Zone"
            }
          />
        </NavLink>

      </div>

      {/* ======================================================
          RIGHT
          ====================================================== */}

      <div className={styles.actions}>
        {/* SEARCH */}

        <div
          ref={searchRef}
          className={styles.searchWrapper}
        >
          <button
            className={styles.iconButton}
            onClick={() =>
              setSearchOpen((p) => !p)
            }
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          {searchOpen && (
            <div
              className={
                styles.searchDropdown
              }
            >
              <input
                autoFocus
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                className={
                  styles.searchInput
                }
                placeholder="Search teams, matches, stadiums..."
              />

              <div
                className={
                  styles.searchResults
                }
              >
                {results.map((item) => (
                  <button
                    key={item.id}
                    className={
                      styles.searchItem
                    }
                    onClick={() =>
                      handleNavigate(
                        item.route
                      )
                    }
                  >
                    <div>
                      <div
                        className={
                          styles.searchTitle
                        }
                      >
                        {item.title}
                      </div>

                      {item.subtitle && (
                        <div
                          className={
                            styles.searchSubtitle
                          }
                        >
                          {
                            item.subtitle
                          }
                        </div>
                      )}
                    </div>

                    <span
                      className={
                        styles.searchType
                      }
                    >
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HOME */}

<button
  className={styles.iconButton}
  onClick={() =>
    navigate("/soccer")
  }
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

        {/* CONTACT */}

<button
  className={styles.iconButton}
  onClick={() =>
    navigate("/contact")
  }
  aria-label="Contact"
>
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
    />

    <path d="M3 7l9 6 9-6" />
  </svg>
</button>

        {/* PROFILE */}

        <div ref={menuRef}>
          <button
            className={
              styles.profileButton
            }
            onClick={() =>
              setMenuOpen((p) => !p)
            }
          >
            {avatar ? (
              <img
                src={avatar}
                className={
                  styles.navAvatar
                }
                alt="User profile avatar"
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
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                />

                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div
              className={styles.dropdown}
            >
              <button
                onClick={() =>
                  navigate("/soccer/profile")
                }
              >
                Profile
              </button>

              <button
                onClick={() =>
                  navigate("/soccer/my-teams")
                }
              >
                My Teams
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/soccer/notifications"
                  )
                }
              >
                Soccer Notifications
              </button>

              <div
                className={
                  styles.divider
                }
              />

              <button
                onClick={() => {
                  localStorage.removeItem(
                    AVATAR_KEY
                  );

                  sessionStorage.clear();

                  navigate(
                    "/soccer/welcome"
                  );
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