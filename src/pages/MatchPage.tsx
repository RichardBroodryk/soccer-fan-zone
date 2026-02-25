import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Flag from "../components/images/Flag";
import { matches2026 } from "../data/matches2026";
import { tournaments2026 } from "../data/tournamentMeta";
import { stadiums } from "../data/stadiums";
import styles from "./MatchPage.module.css";

/* ================= API ================= */

import { API_BASE_URL } from "../config/api";

/* ================= TYPES ================= */

type MatchStatus = "upcoming" | "live" | "final";

/* ================= PAGE ================= */

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  const matchId = id ? Number(id) : NaN;
  const match = matches2026.find((m) => m.id === matchId);

  /* ================= LOAD COMMENTS ================= */

  const loadComments = useCallback(async () => {
    if (!matchId) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/comments?match_id=${matchId}`
      );

      if (!res.ok) return;

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to load match comments", err);
    }
  }, [matchId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  /* ================= POST COMMENT ================= */

  async function postComment() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to post a reaction.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          match_id: matchId,
          content: text,
        }),
      });

      if (!res.ok) {
        alert("Failed to post reaction.");
        return;
      }

      setText("");
      loadComments();
    } catch (err) {
      console.error("Post comment error", err);
    }
  }

  /* ================= MATCH LOOKUP ================= */

  if (!match) {
    return (
      <main className={styles.error}>
        <h2>Match not found</h2>
      </main>
    );
  }

  const tournament = tournaments2026.find(
    (t) => t.matchKey === match.tournament
  );

  const backToTournament = tournament
    ? tournament.route
    : "/tournaments";

  const { home, away, score, venue, date } = match;

  const matchStatus: MatchStatus = score
    ? "final"
    : new Date(date) > new Date()
    ? "upcoming"
    : "live";

  const stadium = stadiums.find((s) => s.name === venue);

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* BACK */}
      <nav className={styles.backNav}>
        <button onClick={() => navigate(backToTournament)}>
          ← Back to{" "}
          {tournament
            ? `${tournament.name} ${tournament.year}`
            : "Tournaments"}
        </button>
      </nav>

      {/* HEADER */}
      <header className={styles.tournamentHeader}>
        <h1>{match.tournament}</h1>
      </header>

      {/* STATUS */}
      <section className={styles.statusBar}>
        <span className={`${styles.status} ${styles[matchStatus]}`}>
          {matchStatus === "upcoming"
            ? "Upcoming"
            : matchStatus === "live"
            ? "Live"
            : "Final"}
        </span>
      </section>

      {/* TEAMS */}
      <section className={styles.vsSection}>
        <div className={styles.team}>
          <Flag country={home.country} size="large" />
          <span className={styles.teamName}>{home.name}</span>
        </div>

        {matchStatus === "final" && score ? (
          <div className={styles.scoreBlock}>
            <span className={styles.score}>{score.home}</span>
            <span className={styles.scoreDivider}>–</span>
            <span className={styles.score}>{score.away}</span>
          </div>
        ) : (
          <span className={styles.vs}>vs</span>
        )}

        <div className={styles.team}>
          <Flag country={away.country} size="large" />
          <span className={styles.teamName}>{away.name}</span>
        </div>
      </section>

      {/* META */}
      <section className={styles.meta}>
        <span>📅 {date}</span>

        {stadium ? (
          <button
            className={styles.venueLink}
            onClick={() => navigate(`/stadium/${stadium.slug}`)}
          >
            🏟 {stadium.name}
          </button>
        ) : (
          <span>🏟 Venue TBC</span>
        )}

        <span>⏰ Kick-off TBC</span>
      </section>

      {/* FAN REACTIONS */}
      <section className={styles.section}>
        <h2>Fan Reactions</h2>

        <div className={styles.commentsPanel}>
          {comments.length > 0 ? (
            comments.map((c) => <p key={c.id}>“{c.content}”</p>)
          ) : (
            <p>No reactions yet.</p>
          )}
        </div>

        <div className={styles.commentInput}>
          <textarea
            placeholder="Share your reaction…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={postComment}>Post</button>
        </div>
      </section>
    </main>
  );
}