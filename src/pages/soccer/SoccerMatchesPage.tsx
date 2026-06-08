import {
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "../../pages/HomePage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";
import HubCard from "../../components/homepage/HubCard";
import AutoContentRail from "../../components/ui/AutoContentRail";

import backgroundImage from "../../assets/soccer/ui/background-light.png";
import fallbackImage from "../../assets/soccer/heroes/live-scores.jpg";

/* SERVICES */

import {
  getAllWorldCupMatches,
} from "../../services/liveMatchService";

import { matches as worldCupMatches } from "../../data/soccer/matches";

/* UTILS */

import {
  getMatchTheme,
} from "../../utils/soccer/getMatchTheme";

/* TYPES */

import type {
  SoccerMatch,
} from "../../data/soccer/types";

/* ICONS */

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";

export default function SoccerMatchesPage() {
  /* ======================================================
     STATE
     ====================================================== */

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

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  /* ======================================================
     LOAD MATCHES
     ====================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      try {
        setLoading(true);

        setError(null);

       const response =
  await getAllWorldCupMatches();

if (!mounted)
  return;

const safeMatches =
  Array.isArray(response) &&
  response.length > 0
    ? response
    : worldCupMatches;

        /* ======================================================
           NORMALIZE API RESPONSE
           ====================================================== */

        const normalizedMatches =
          safeMatches.map(
            (
              match: SoccerMatch
            ) => ({
              ...match,

              id:
                match.id ||
                `match-${Math.random()
                  .toString(
                    36
                  )
                  .slice(2)}`,

              home:
                match.home ||
                "Home Team",

              away:
                match.away ||
                "Away Team",

              stage:
                match.stage ||
                "Tournament Match",

              stadium:
                match.stadium ||
                "World Cup Stadium",

              stadiumId:
                match.stadiumId ||
                "unknown-stadium",

              city:
                match.city ||
                "Host City",

              status:
                match.status ||
                "upcoming",

              date:
                match.date ||
                "World Cup 2026",

              minute:
                match.minute ??
                0,

              homeScore:
                match.homeScore ??
                0,

              awayScore:
                match.awayScore ??
                0,
            })
          );

        setMatches(
          normalizedMatches
        );
    } catch (
  err
) {
  console.error(
    "Failed to load matches:",
    err
  );

  if (!mounted)
    return;

  setError(null);

  setMatches(worldCupMatches);
} finally {
        if (mounted) {
          setLoading(
            false
          );
        }
      }
    }

    loadMatches();

    return () => {
      mounted = false;
    };
  }, []);

  /* ======================================================
     SORTED MATCHES
     ====================================================== */

  const sortedMatches =
    useMemo(() => {
      return [
        ...matches,
      ].sort(
        (
          a: SoccerMatch,
          b: SoccerMatch
        ) =>
          new Date(
            a.date ||
              "2099-12-31"
          ).getTime() -
          new Date(
            b.date ||
              "2099-12-31"
          ).getTime()
      );
    }, [matches]);

  /* ======================================================
     NEXT MATCH
     ====================================================== */

  const nextMatch =
    useMemo(() => {
      const today =
        new Date();

      return (
        sortedMatches.find(
          (
            match: SoccerMatch
          ) =>
            new Date(
              match.date ||
                "2099-12-31"
            ) >= today
        ) ||
        sortedMatches[0]
      );
    }, [
      sortedMatches,
    ]);

  /* ======================================================
     UI
     ====================================================== */

  return (
    <PageWrapper
      imageUrl={
        backgroundImage
      }
    >
      <main className={styles.page}>
        {/* ======================================================
            LOADING
            ====================================================== */}

        {loading && (
          <section
            style={{
              marginBottom:
                "42px",

              padding:
                "32px",

              borderRadius:
                "28px",

              background:
                "rgba(255,255,255,0.82)",

              backdropFilter:
                "blur(12px)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color:
                  "#111827",

                fontSize:
                  "2rem",

                fontWeight: 900,

                marginBottom:
                  "12px",
              }}
            >
              Loading Matches...
            </h2>

            <p
              style={{
                color:
                  "#4b5563",

                lineHeight:
                  1.7,
              }}
            >
              Synchronizing
              live tournament
              fixtures and
              match data.
            </p>
          </section>
        )}

        {/* ======================================================
            ERROR
            ====================================================== */}

        {!loading &&
          error && (
            <section
              style={{
                marginBottom:
                  "42px",

                padding:
                  "32px",

                borderRadius:
                  "28px",

                background:
                  "rgba(255,255,255,0.82)",

                backdropFilter:
                  "blur(12px)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  color:
                    "#111827",

                  fontSize:
                    "2rem",

                  fontWeight:
                    900,

                  marginBottom:
                    "12px",
                }}
              >
                Match Center
                Temporarily
                Unavailable
              </h2>

              <p
                style={{
                  color:
                    "#4b5563",

                  lineHeight:
                    1.7,
                }}
              >
                Live match
                services are
                currently
                reconnecting.
                Please try
                again shortly.
              </p>
            </section>
          )}

        {/* ======================================================
            NEXT MATCH HERO
            ====================================================== */}

        {!loading &&
          nextMatch && (
            <section
              style={{
                marginBottom:
                  "42px",
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "16px",

                  color:
                    "#111827",

                  fontSize:
                    "2rem",

                  fontWeight:
                    900,
                }}
              >
                🔥 Next Match
              </h2>

              <HubCard
                title={`${nextMatch.home || "Home Team"} vs ${
                  nextMatch.away || "Away Team"
                }`}
                image={
                  getMatchTheme(
                    {
                      home:
                        nextMatch.home ||
                        "Home Team",

                      away:
                        nextMatch.away ||
                        "Away Team",

                      status:
                        nextMatch.status ||
                        "upcoming",

                      stage:
                        nextMatch.stage ||
                        "Tournament Match",
                    }
                  )
                    .homeFlag ||
                  fallbackImage
                }
                to={`/soccer/matches/${
                  nextMatch.id ||
                  "unknown-match"
                }`}
                features={[
                  {
                    label:
                      nextMatch.date ||
                      "World Cup 2026",

                    icon:
                      <CalendarIcon />,
                  },

                  {
                    label:
                      nextMatch.stadium ||
                      "World Cup Stadium",

                    icon:
                      <StarIcon />,
                  },
                ]}
              />
            </section>
          )}

        {/* ======================================================
            ALL MATCHES
            ====================================================== */}

        {!loading && (
          <section
            className={
              styles.railSection
            }
          >
            <h2
              style={{
                marginBottom:
                  "18px",

                color:
                  "#111827",

                fontSize:
                  "2rem",

                fontWeight:
                  900,
              }}
            >
              All Matches
            </h2>

            <AutoContentRail>
              {sortedMatches.map(
                (
                  match: SoccerMatch
                ) => (
                  <HubCard
                    key={
                      match.id ||
                      `${match.home}-${match.away}-${match.date}`
                    }
                    title={`${
                      match.home ||
                      "Home Team"
                    } vs ${
                      match.away ||
                      "Away Team"
                    }`}
                    image={
                      getMatchTheme(
                        {
                          home:
                            match.home ||
                            "Home Team",

                          away:
                            match.away ||
                            "Away Team",

                          status:
                            match.status ||
                            "upcoming",

                          stage:
                            match.stage ||
                            "Tournament Match",
                        }
                      )
                        .homeFlag ||
                      fallbackImage
                    }
                    to={`/soccer/matches/${
                      match.id ||
                      "unknown-match"
                    }`}
                    features={[
                      {
                        label:
                          match.date ||
                          "World Cup 2026",

                        icon:
                          <CalendarIcon />,
                      },

                      {
                        label:
                          match.stadium ||
                          "World Cup Stadium",

                        icon:
                          <StarIcon />,
                      },
                    ]}
                  />
                )
              )}
            </AutoContentRail>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}