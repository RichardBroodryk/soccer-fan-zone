// src/pages/soccer/SoccerBracketPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "../FixturesPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import KnockoutBracket from "../../components/bracket/KnockoutBracket";

import SoccerMatchRow from "../../components/soccer/SoccerMatchRow";

/* HERO IMAGE */

import heroBg from "../../assets/soccer/heroes/calendar-hero.jpg";

import backgroundLight from "../../assets/soccer/ui/background-light.png";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* LIVE API */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

export default function SoccerBracketPage() {
  const navigate =
    useNavigate();

  const [
    matches,
    setMatches,
  ] = useState<
    SoccerMatch[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     LOAD MATCHES
     ====================================================== */

  useEffect(() => {
    async function loadMatches() {
      try {
        const data =
  await getAllWorldCupMatches();

setMatches(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadMatches();
}, []);

  /* ======================================================
     KNOCKOUT MATCHES
     ====================================================== */

 const knockoutMatches =
  useMemo(() => {
    return matches.filter(
      (match) =>
        !match.stage?.startsWith(
          "Group Stage"
        )
    );
  }, [matches]);

  /* ======================================================
     STAGES
     ====================================================== */

  const round32 =
    knockoutMatches.filter(
      (match) =>
        match.stage ===
        "Round of 32"
    );

  const round16 =
    knockoutMatches.filter(
      (match) =>
        match.stage ===
        "Round of 16"
    );

  const quarterfinals =
    knockoutMatches.filter(
      (match) =>
        match.stage?.startsWith(
          "Quarterfinal"
        )
    );

  const semifinals =
    knockoutMatches.filter(
      (match) =>
        match.stage?.startsWith(
          "Semifinal"
        )
    );

  const finals =
    knockoutMatches.filter(
      (match) =>
        match.stage ===
        "Final"
    );

  /* ======================================================
     BRACKET DATA
     ====================================================== */

  const rounds =
    useMemo(() => {
      return [
        {
          title:
            "Round of 32",

          matches:
            round32,
        },

        {
          title:
            "Round of 16",

          matches:
            round16,
        },

        {
          title:
            "Quarterfinals",

          matches:
            quarterfinals,
        },

        {
          title:
            "Semifinals",

          matches:
            semifinals,
        },

        {
          title:
            "Final",

          matches:
            finals,
        },
      ];
    }, [
      round32,
      round16,
      quarterfinals,
      semifinals,
      finals,
    ]);

  return (
    <PageWrapper
      imageUrl={
        backgroundLight
      }
    >
      <main
        className={
          styles.page
        }
      >
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
                  "rgba(255,255,255,0.12)",

                color:
                  "#ffffff",

                fontWeight: 900,

                marginBottom:
                  "18px",

                letterSpacing:
                  "0.08em",
              }}
            >
              FIFA WORLD
              CUP 2026
            </div>

            <h1>
              Knockout
              Bracket
            </h1>

            <p>
              Follow the
              complete road
              to the FIFA
              World Cup
              Final —
              from the
              Round of 32
              through to
              the ultimate
              showdown.
            </p>
          </div>
        </header>

        {/* BACK */}

        <div
          className={
            styles.backWrap
          }
        >
          <button
            className={
              styles.back
            }
            onClick={() =>
              navigate(
                "/soccer/knockout"
              )
            }
          >
            ← Back to
            Knockout Hub
          </button>
        </div>

        {/* INTRO */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(17,24,39,0.96), rgba(3,7,18,0.96))",

              borderRadius:
                "28px",

              padding:
                "34px",

              color:
                "#ffffff",

              border:
                "1px solid rgba(255,255,255,0.08)",

              boxShadow:
                "0 20px 60px rgba(0,0,0,0.32)",
            }}
          >
            <div
              style={{
                fontSize:
                  "0.82rem",

                fontWeight: 900,

                letterSpacing:
                  "0.12em",

                textTransform:
                  "uppercase",

                color:
                  "rgba(255,255,255,0.6)",

                marginBottom:
                  "14px",
              }}
            >
              Tournament
              Progression
            </div>

            <h2
              style={{
                fontSize:
                  "2rem",

                fontWeight: 900,

                marginBottom:
                  "18px",
              }}
            >
              The Road To
              Glory
            </h2>

            <p
              style={{
                maxWidth:
                  "820px",

                lineHeight:
                  1.7,

                color:
                  "rgba(255,255,255,0.78)",
              }}
            >
              Every
              knockout
              match shapes
              football
              history.
              Follow each
              nation’s
              journey
              through the
              elimination
              rounds as the
              world’s best
              teams compete
              for football’s
              greatest
              prize.
            </p>
          </div>
        </section>

        {/* OVERVIEW */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",

              gap: "18px",
            }}
          >
            {[
              {
                label:
                  "Round of 32",

                value:
                  round32.length,
              },

              {
                label:
                  "Round of 16",

                value:
                  round16.length,
              },

              {
                label:
                  "Quarterfinals",

                value:
                  quarterfinals.length,
              },

              {
                label:
                  "Semifinals",

                value:
                  semifinals.length,
              },

              {
                label:
                  "Final",

                value:
                  finals.length,
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={{
                    background:
                      "#ffffff",

                    borderRadius:
                      "24px",

                    padding:
                      "28px",

                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      color:
                        "#6b7280",

                      marginBottom:
                        "10px",

                      fontWeight: 700,
                    }}
                  >
                    {
                      item.label
                    }
                  </div>

                  <div
                    style={{
                      fontSize:
                        "2.5rem",

                      fontWeight: 900,
                    }}
                  >
                    {
                      item.value
                    }
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* BRACKET */}

        <section
          className={
            styles.section
          }
        >
          {loading ? (
            <div>
              Loading
              knockout
              bracket...
            </div>
          ) : (
            <KnockoutBracket
              rounds={
                rounds
              }
            />
          )}
        </section>

        {/* LIVE KNOCKOUT FIXTURES */}

        <section
          className={
            styles.section
          }
        >
          <div
            style={{
              marginBottom:
                "24px",
            }}
          >
            <h2>
              Live Knockout
              Fixtures
            </h2>
          </div>

          {knockoutMatches.length ===
          0 ? (
            <div>
              No knockout
              fixtures
              available.
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
              {knockoutMatches.map(
                (
                  match
                ) => (
                  <SoccerMatchRow
                    key={
                      match.id
                    }
                    match={
                      match
                    }
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