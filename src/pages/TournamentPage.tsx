/* UPDATED:
   - Fixed match filtering so standalone tests always appear
   - Added safe matching fallback using tournament name + year
   - No logic removed
*/

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./TournamentPage.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
import { matches2026 } from "../data/matches2026";
import { getTournamentVisual } from "../data/tournamentVisuals";

import MatchRow from "../components/match/MatchRow";
import Flag from "../components/images/Flag";
import MusicIcon from "../components/icons/MusicIcon";

/* ================= API ================= */

const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://rugby-anthem-backend-production.up.railway.app";

/* ================= UTILS ================= */

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function groupMatchesByMonth(matches: any[]) {
  const map = new Map<string, any[]>();

  matches.forEach((m) => {
    const date = new Date(m.date);
    const label = date.toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    });

    if (!map.has(label)) {
      map.set(label, []);
    }
    map.get(label)!.push(m);
  });

  return Array.from(map.entries()).map(([label, matches]) => ({
    label,
    matches,
  }));
}

/* ================= PAGE ================= */

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const [comments, setComments] = useState<any[]>([]);

  const openComments = location.state?.openComments === true;

  const tournament = tournaments2026.find(
    (t) => t.route === location.pathname
  );

  useEffect(() => {
    if (openComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [openComments]);

  useEffect(() => {
    async function loadComments() {
      if (!tournament) return;

      try {
        const res = await fetch(
          `${API_BASE}/api/comments?tournament_id=${tournament.conceptId}`
        );

        if (!res.ok) return;

        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to load tournament comments", err);
      }
    }

    loadComments();
  }, [tournament]);

  if (!tournament) {
    return (
      <main className={styles.error}>
        <h2>Tournament not found</h2>
      </main>
    );
  }

  const visual = getTournamentVisual(tournament.conceptId);

  const heroImage =
    tournament.gender === "women"
      ? visual?.heroImageWomen
      : visual?.heroImageMen;

  /* ================= FIXED MATCH FILTER ================= */

  const tournamentMatches = matches2026.filter((m) => {
    const matchTournament = normalize(m.tournament);
    const key = normalize(tournament.matchKey);
    const fallback = normalize(
      `${tournament.name} ${tournament.year}`
    );

    return matchTournament === key || matchTournament === fallback;
  });

  const backToIndex =
    tournament.gender === "women"
      ? "/tournaments/women"
      : "/tournaments/men";

  /* ================= FLAGS ================= */

  const participatingCountries = Array.from(
    new Set(
      tournamentMatches.flatMap((m) => [
        m.home.country,
        m.away.country,
      ])
    )
  ).sort();

  /* ================= MONTH GROUPING ================= */

  const isInternationalTests =
    tournament.conceptId === "international-tests";

  const groupedMatches = isInternationalTests
    ? groupMatchesByMonth(tournamentMatches)
    : [];

  const isTopText =
    visual?.heroLayout === "top" ||
    visual?.heroLayout === "contained";

  const shouldBiasHero =
    visual?.heroLayout === "contained" &&
    tournament.conceptId !== "six-nations";

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <section
        className={[
          styles.hero,
          visual?.heroLayout === "contained"
            ? styles.heroContained
            : "",
          visual?.heroLayout === "top"
            ? styles.heroTop
            : "",
          shouldBiasHero ? styles.heroBiased : "",
          tournament.conceptId === "svns-series"
            ? styles.heroSVNS
            : "",
        ].join(" ")}
        style={
          heroImage
            ? { backgroundImage: `url(${heroImage})` }
            : undefined
        }
      >
        <div
          className={[
            styles.heroContent,
            isTopText ? styles.heroTop : "",
            shouldBiasHero ? styles.heroContentLeft : "",
          ].join(" ")}
        >
          <h1>
            {tournament.name} {tournament.year}
          </h1>
          {tournament.heroSubtitle && (
            <p>{tournament.heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* ================= BACK ================= */}
      <nav className={styles.backNav}>
        <button onClick={() => navigate(backToIndex)}>
          ← Back to{" "}
          {tournament.gender === "women"
            ? "Women’s"
            : "Men’s"}{" "}
          Tournaments
        </button>
      </nav>

      {/* ================= ANTHEMS ================= */}
      <section className={styles.section}>
        <div className={styles.anthemsRow}>
          <button
            className={styles.anthemCard}
            onClick={() => navigate("/anthems")}
          >
            <MusicIcon />
            <div>
              <strong>Anthems</strong>
              <span>The ritual before every contest</span>
            </div>
          </button>

          {participatingCountries.length > 0 && (
            <div className={styles.flagsGrid}>
              {participatingCountries.map((c) => (
                <button
                  key={c}
                  className={styles.flagSlot}
                  onClick={() => navigate(`/anthems/${c}`)}
                >
                  <Flag country={c} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= FIXTURES ================= */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2>Fixtures</h2>
          <p>Confirmed matches in this tournament.</p>
        </header>

        {/* INTERNATIONAL TESTS → grouped by month */}
        {isInternationalTests ? (
          groupedMatches.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              {group.matches.map((match: any) => (
                <MatchRow
                  key={match.id}
                  home={match.home}
                  away={match.away}
                  metaLeft={match.date}
                  metaRight={match.venue}
                  state={
                    match.score ? "final" : "upcoming"
                  }
                  onClick={() =>
                    navigate(`/match/${match.id}`)
                  }
                />
              ))}
            </div>
          ))
        ) : tournamentMatches.length > 0 ? (
          tournamentMatches.map((match) => (
            <MatchRow
              key={match.id}
              home={match.home}
              away={match.away}
              metaLeft={match.date}
              metaRight={match.venue}
              state={match.score ? "final" : "upcoming"}
              onClick={() =>
                navigate(`/match/${match.id}`)
              }
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No fixtures announced yet.</p>
          </div>
        )}
      </section>

      {/* ================= DISCUSSION ================= */}
      <section ref={commentsRef} className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2>Fan Discussion</h2>
        </header>

        <div className={styles.commentsPanel}>
          {comments.length > 0 ? (
            comments.map((c) => (
              <p key={c.id}>“{c.content}”</p>
            ))
          ) : (
            <p>No discussion yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
