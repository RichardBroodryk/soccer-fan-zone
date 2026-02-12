import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import styles from "./TournamentPage.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
import { matches2026 } from "../data/matches2026";
import { tournamentCommentThreads } from "../data/tournamentComments";
import { getTournamentVisual } from "../data/tournamentVisuals";

import MatchRow from "../components/match/MatchRow";
import Flag from "../components/images/Flag";
import MusicIcon from "../components/icons/MusicIcon";

/* ================= UTILS ================= */

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/* ================= PAGE ================= */

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const openComments = location.state?.openComments === true;

  const tournament = tournaments2026.find(
    (t) => t.route === location.pathname
  );

  useEffect(() => {
    if (openComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [openComments]);

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

  const tournamentMatches = matches2026.filter(
    (m) =>
      normalize(m.tournament) ===
      normalize(tournament.matchKey)
  );

  const commentThread = tournamentCommentThreads.find(
    (c) => c.tournamentId === tournament.conceptId
  );

  const backToIndex =
    tournament.gender === "women"
      ? "/tournaments/women"
      : "/tournaments/men";

  const sixNationsCountries = [
    "england",
    "france",
    "ireland",
    "italy",
    "scotland",
    "wales",
  ];

  const isTopText =
    visual?.heroLayout === "top" ||
    visual?.heroLayout === "contained";

  const shouldBiasHero =
    visual?.heroLayout === "contained" &&
    tournament.conceptId !== "six-nations" &&
    tournament.conceptId !== "rivalry-series";

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
              <strong>
                {visual?.anthemMode === "global"
                  ? "Global Anthems"
                  : "Anthems"}
              </strong>
              <span>
                {visual?.anthemMode === "global"
                  ? "Explore participating nations"
                  : "The ritual before every contest"}
              </span>
            </div>
          </button>

          {visual?.anthemMode === "six-nations" && (
            <div className={styles.flagsGrid}>
              {sixNationsCountries.map((c) => (
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

          {visual?.anthemMode === "rivalry" && (
            <div className={styles.flagsGrid}>
              <button
                className={styles.flagSlot}
                onClick={() =>
                  navigate("/anthems/south-africa")
                }
              >
                <Flag country="south-africa" />
              </button>
              <button
                className={styles.flagSlot}
                onClick={() =>
                  navigate("/anthems/new-zealand")
                }
              >
                <Flag country="new-zealand" />
              </button>
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

        {tournamentMatches.length > 0 ? (
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
          {commentThread ? (
            commentThread.comments.map((c) => (
              <p key={c.id}>“{c.text}”</p>
            ))
          ) : (
            <p>No discussion yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
