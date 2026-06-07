// src/pages/soccer/SoccerLivePage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../FixturesPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import {
  getLiveWorldCupMatches,
} from "../../services/liveMatchService";

import heroBg from "../../assets/soccer/heroes/live-scores.jpg";
import backgroundLight from "../../assets/soccer/ui/background-light.png";

import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

export default function SoccerLivePage() {
  const navigate = useNavigate();

  const [
    selectedGroup,
    setSelectedGroup,
  ] = useState<string>("all");

  const [
    allMatches,
    setAllMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     LOAD LIVE DATA
     ====================================================== */

  useEffect(() => {
    async function loadMatches() {
      try {
        const data =
          await getLiveWorldCupMatches();

        setAllMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();

    const interval =
      setInterval(() => {
        loadMatches();
      }, 30000);

    return () =>
      clearInterval(interval);
  }, []);

  /* ======================================================
     LIVE MATCHES
     ====================================================== */

  const liveMatches = useMemo(() => {
    return allMatches.filter(
      (match: SoccerMatch) =>
        match.status === "live"
    );
  }, [allMatches]);

  /* ======================================================
     GROUPS
     ====================================================== */

  const groups = useMemo<string[]>(() => {
    return Array.from(
      new Set(
        liveMatches
          .map(
            (match: SoccerMatch) =>
              match.group ||
              match.stage
          )
          .filter(
            (
              group
            ): group is string =>
              Boolean(group)
          )
      )
    );
  }, [liveMatches]);

  /* ======================================================
     FILTERED MATCHES
     ====================================================== */

  const filteredMatches =
    useMemo(() => {
      if (
        selectedGroup ===
        "all"
      ) {
        return liveMatches;
      }

      return liveMatches.filter(
        (
          match: SoccerMatch
        ) =>
          match.group ===
            selectedGroup ||
          match.stage ===
            selectedGroup
      );
    }, [
      liveMatches,
      selectedGroup,
    ]);

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main
        className={styles.page}
      >
        {loading && (
          <div
            style={{
              padding:
                "40px",

              fontWeight: 800,
            }}
          >
            Loading live World
            Cup data...
          </div>
        )}

        {/* HERO */}

        <header
          className={
            styles.hero
          }
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <div
            className={
              styles.heroOverlay
            }
          />

          <div
            className={
              styles.heroContent
            }
          >
            <div
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap: "10px",

                padding:
                  "10px 18px",

                borderRadius:
                  "999px",

                background:
                  "rgba(220,38,38,0.92)",

                color:
                  "#ffffff",

                fontWeight: 900,

                marginBottom:
                  "18px",

                letterSpacing:
                  "0.08em",

                boxShadow:
                  "0 8px 28px rgba(220,38,38,0.35)",
              }}
            >
              <span
                style={{
                  width:
                    "10px",

                  height:
                    "10px",

                  borderRadius:
                    "999px",

                  background:
                    "#ffffff",
                }}
              />

              LIVE NOW
            </div>

            <h1>
              Live Match Centre
            </h1>

            <p>
              Follow live
              scores,
              momentum,
              match atmosphere
              and key moments
              from Global World
              Cup 2026.
            </p>
          </div>
        </header>

        {/* BACK */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "center",

            marginTop: "18px",

            marginBottom:
              "42px",
          }}
        >
          <button
            onClick={() =>
              navigate(
                "/soccer/match-center"
              )
            }
            style={{
              border: "none",

              background:
                "#2563eb",

              color:
                "#ffffff",

              padding:
                "14px 24px",

              borderRadius:
                "999px",

              fontWeight: 800,

              fontSize:
                "0.95rem",

              cursor:
                "pointer",

              boxShadow:
                "0 12px 30px rgba(37,99,235,0.28)",

              transition:
                "all 0.2s ease",
            }}
          >
            ← Back to Match
            Center
          </button>
        </div>

        {/* LIVE OVERVIEW */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #991b1b, #dc2626)",

              borderRadius:
                "30px",

              padding:
                "34px",

              color:
                "#ffffff",

              boxShadow:
                "0 20px 50px rgba(220,38,38,0.28)",

              border:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize:
                  "3rem",

                fontWeight: 900,

                marginBottom:
                  "8px",
              }}
            >
              {
                filteredMatches.length
              }
            </div>

            <div
              style={{
                fontSize:
                  "1.05rem",

                fontWeight: 700,

                opacity: 0.92,
              }}
            >
              Live Match
              {filteredMatches.length !==
              1
                ? "es"
                : ""}{" "}
              In Progress
            </div>
          </div>
        </section>

        {/* FILTERS */}

        {groups.length >
          0 && (
          <section
            className={
              styles.section
            }
            style={{
              paddingTop: 0,
            }}
          >
            <div
              style={{
                display:
                  "flex",

                flexWrap:
                  "wrap",

                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setSelectedGroup(
                    "all"
                  )
                }
                style={{
                  border:
                    "none",

                  borderRadius:
                    "999px",

                  padding:
                    "12px 18px",

                  cursor:
                    "pointer",

                  fontWeight: 800,

                  background:
                    selectedGroup ===
                    "all"
                      ? "#111827"
                      : "rgba(255,255,255,0.82)",

                  color:
                    selectedGroup ===
                    "all"
                      ? "#ffffff"
                      : "#111827",

                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.08)",
                }}
              >
                All Matches
              </button>

              {groups.map(
                (
                  group: string
                ) => (
                  <button
                    key={group}
                    onClick={() =>
                      setSelectedGroup(
                        group
                      )
                    }
                    style={{
                      border:
                        "none",

                      borderRadius:
                        "999px",

                      padding:
                        "12px 18px",

                      cursor:
                        "pointer",

                      fontWeight: 800,

                      background:
                        selectedGroup ===
                        group
                          ? "#111827"
                          : "rgba(255,255,255,0.82)",

                      color:
                        selectedGroup ===
                        group
                          ? "#ffffff"
                          : "#111827",

                      boxShadow:
                        "0 10px 24px rgba(0,0,0,0.08)",
                    }}
                  >
                    {group}
                  </button>
                )
              )}
            </div>
          </section>
        )}

        {/* LIVE MATCHES */}

        <section
          className={
            styles.section
          }
        >
          {filteredMatches.length ===
          0 ? (
            <div
              className={
                styles.empty
              }
            >
              No live matches
              currently in
              progress.
            </div>
          ) : (
            <div
              style={{
                display:
                  "flex",

                flexDirection:
                  "column",

                gap: "18px",
              }}
            >
              {filteredMatches.map(
                (
                  match: SoccerMatch
                ) => (
                  <SoccerMatchRow
                    key={
                      match.id
                    }
                    match={match}
                    onClick={() =>
                      navigate(
                        `/soccer/matches/${match.id}`
                      )
                    }
                  />
                )
              )}
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  );
}