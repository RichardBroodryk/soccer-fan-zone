// src/components/search/SearchModal.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MagnifyingGlass,
  Sparkle,
  X,
} from "phosphor-react";

import styles from "./SearchModal.module.css";

import SearchResultRow from "./SearchResultRow";

import {
  buildSearchIndex,
  searchEntities,
} from "../../data/soccer/searchIndex";

interface SearchModalProps {
  open: boolean;

  onClose: () => void;
}

export default function SearchModal({
  open,
  onClose,
}: SearchModalProps) {
  const [query, setQuery] =
    useState("");

  /* ======================================================
     ESC CLOSE
     ====================================================== */

  useEffect(() => {
    function handleKeyDown(
      e: KeyboardEvent
    ) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  /* ======================================================
     INDEX
     ====================================================== */

  const index = useMemo(() => {
    return buildSearchIndex();
  }, []);

  /* ======================================================
     RESULTS
     ====================================================== */

  const results = useMemo(() => {
    return searchEntities(
      query,
      index
    );
  }, [query, index]);

  /* ======================================================
     GROUPING
     ====================================================== */

  const grouped = useMemo(() => {
    return {
      hubs: results.filter(
        (r) => r.type === "hub"
      ),

      matches: results.filter(
        (r) => r.type === "match"
      ),

      teams: results.filter(
        (r) => r.type === "team"
      ),

      groups: results.filter(
        (r) => r.type === "group"
      ),

      stadiums: results.filter(
        (r) => r.type === "stadium"
      ),

      players: results.filter(
        (r) => r.type === "player"
      ),
    };
  }, [results]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* HEADER */}

        <div className={styles.header}>
          <div
            className={
              styles.searchBar
            }
          >
            <MagnifyingGlass
              size={22}
            />

            <input
              autoFocus
              type="text"
              placeholder="Search players, teams, matches, stadiums..."
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
            />
          </div>

          <button
            className={
              styles.closeBtn
            }
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {/* TRENDING */}

        {!query && (
          <div
            className={
              styles.trending
            }
          >
            <div
              className={
                styles.trendingTitle
              }
            >
              <Sparkle
                size={16}
                weight="fill"
              />

              Trending Searches
            </div>

            <div
              className={
                styles.quickLinks
              }
            >
              {[
                "Argentina",
                "Mbappé",
                "Live Matches",
                "Final",
                "Brazil",
                "MetLife Stadium",
              ].map((item) => (
                <button
                  key={item}
                  className={
                    styles.quickLink
                  }
                  onClick={() =>
                    setQuery(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}

        <div className={styles.results}>
          {results.length >
            0 && (
            <div
              className={
                styles.resultCount
              }
            >
              {results.length} result
              {results.length !== 1
                ? "s"
                : ""}
            </div>
          )}

          {grouped.hubs.length >
            0 && (
            <SearchSection
              title="Hubs"
            >
              {grouped.hubs.map(
                (result) => (
                  <SearchResultRow
                    key={result.id}
                    result={result}
                    onClose={
                      onClose
                    }
                  />
                )
              )}
            </SearchSection>
          )}

          {grouped.matches.length >
            0 && (
            <SearchSection
              title="Matches"
            >
              {grouped.matches.map(
                (result) => (
                  <SearchResultRow
                    key={result.id}
                    result={result}
                    onClose={
                      onClose
                    }
                  />
                )
              )}
            </SearchSection>
          )}

          {grouped.teams.length >
            0 && (
            <SearchSection
              title="Teams"
            >
              {grouped.teams.map(
                (result) => (
                  <SearchResultRow
                    key={result.id}
                    result={result}
                    onClose={
                      onClose
                    }
                  />
                )
              )}
            </SearchSection>
          )}

          {grouped.players.length >
            0 && (
            <SearchSection
              title="Players"
            >
              {grouped.players.map(
                (result) => (
                  <SearchResultRow
                    key={result.id}
                    result={result}
                    onClose={
                      onClose
                    }
                  />
                )
              )}
            </SearchSection>
          )}

          {grouped.groups.length >
            0 && (
            <SearchSection
              title="Groups"
            >
              {grouped.groups.map(
                (result) => (
                  <SearchResultRow
                    key={result.id}
                    result={result}
                    onClose={
                      onClose
                    }
                  />
                )
              )}
            </SearchSection>
          )}

          {grouped.stadiums
            .length > 0 && (
            <SearchSection
              title="Stadiums"
            >
              {grouped.stadiums.map(
                (result) => (
                  <SearchResultRow
                    key={result.id}
                    result={result}
                    onClose={
                      onClose
                    }
                  />
                )
              )}
            </SearchSection>
          )}

          {query &&
            results.length ===
              0 && (
              <div
                className={
                  styles.empty
                }
              >
                <div
                  className={
                    styles.emptyIcon
                  }
                >
                  ⚽
                </div>

                <h3>
                  No results found
                </h3>

                <p>
                  Try searching
                  for players,
                  teams,
                  stadiums or
                  matches.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   SECTION
   ====================================================== */

interface SearchSectionProps {
  title: string;

  children: React.ReactNode;
}

function SearchSection({
  title,
  children,
}: SearchSectionProps) {
  return (
    <section
      className={styles.section}
    >
      <div
        className={
          styles.sectionTitle
        }
      >
        {title}
      </div>

      <div
        className={
          styles.sectionContent
        }
      >
        {children}
      </div>
    </section>
  );
}