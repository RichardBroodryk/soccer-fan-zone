// src/components/homepage/SoccerHeroCard.tsx

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import styles from "./HeroCard.module.css";

import type {
  SoccerMatch,
} from "../../data/soccer/types";

import {
  getLiveWorldCupMatches,
} from "../../services/liveMatchService";

type SoccerHeroCardProps = {
  variant?: "premium" | "super";
};

export default function SoccerHeroCard({
  variant = "premium",
}: SoccerHeroCardProps) {
  const [liveMatches, setLiveMatches] =
    useState<SoccerMatch[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* ======================================================
     LOAD LIVE MATCHES
  ====================================================== */

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data =
          await getLiveWorldCupMatches();

        setLiveMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();

    const interval =
      setInterval(
        load,
        30000
      );

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        {/* LIVE BADGE */}

        {!loading &&
          liveMatches.length >
            0 && (
            <div
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap: "8px",

                marginBottom:
                  "18px",

                padding:
                  "10px 18px",

                borderRadius:
                  "999px",

                background:
                  "rgba(220,38,38,0.92)",

                color:
                  "#ffffff",

                fontWeight: 900,

                fontSize:
                  "0.82rem",

                letterSpacing:
                  "0.08em",

                textTransform:
                  "uppercase",

                boxShadow:
                  "0 8px 28px rgba(220,38,38,0.35)",
              }}
            >
              <span
                style={{
                  width: "10px",

                  height: "10px",

                  borderRadius:
                    "999px",

                  background:
                    "#ffffff",
                }}
              />

              LIVE NOW •{" "}
              {
                liveMatches.length
              }{" "}
              MATCH
              {liveMatches.length >
              1
                ? "ES"
                : ""}
            </div>
          )}

        {/* TITLE */}

        <h1
          className={
            styles.title
          }
        >
          GLOBAL SOCCER 2026
          WORLD CUP
        </h1>

        {/* TAGLINE */}

        <p
          className={
            styles.tagline
          }
        >
          48 Nations • 104
          Matches • USA •
          Canada • Mexico
        </p>

        {/* ACTIONS */}

        <div
          className={
            styles.actions
          }
        >
          <Link
            to="/soccer/live"
            className={
              styles.live
            }
          >
            Live Matches
          </Link>

          <Link
            to="/soccer/fixtures"
            className={
              styles.fixtures
            }
          >
            Fixtures
          </Link>

          <Link
            to="/soccer/matches"
            className={
              styles.matches
            }
          >
            Matches
          </Link>

          <Link
            to="/soccer/teams"
            className={
              styles.teams
            }
          >
            Teams
          </Link>

          <Link
            to="/anthems"
            className={
              styles.anthems
            }
          >
            Anthems
          </Link>

          <Link
            to="/soccer/tactical-room"
            className={
              styles.tactical
            }
          >
            Tactical
          </Link>

          <Link
  to="/soccer/tournament-center"
  className={
    styles.tactical
  }
>
  Tournament Center
</Link>
        </div>
      </div>
    </section>
  );
}