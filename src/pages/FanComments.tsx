import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FanComments.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
import { API_BASE_URL } from "../config/api";

// ================= API TYPE =================
type ApiComment = {
  id: number;
  tournament_id: string | null;
  match_id: string | null;
  video_id: number | null;
  content: string;
  match_phase: "pre" | "live" | "post" | null;
  created_at: string;
  email: string;
};

// ================= CANONICAL TYPES =================
type CommentAuthor = {
  displayName: string;
  role?: "fan" | "verified";
};

type MatchPhase = "pre" | "live" | "post";

type TournamentComment = {
  id: string;
  tournamentId: string;
  text: string;
  createdAt: string;
  author: CommentAuthor;
  matchPhase?: MatchPhase;
};

type TournamentCommentThread = {
  tournamentId: string;
  comments: TournamentComment[];
  lastActivityAt: string;
};

export default function FanComments() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<TournamentCommentThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComments() {
      try {
        const results: TournamentCommentThread[] = [];

        for (const tournament of tournaments2026) {
          const res = await fetch(
            `${API_BASE_URL}/api/comments?tournament_id=${tournament.conceptId}`
          );

          if (!res.ok) continue;

          const apiComments: ApiComment[] = await res.json();

          if (apiComments.length > 0) {
            results.push({
              tournamentId: tournament.conceptId,
              comments: apiComments.map((c) => ({
                id: String(c.id),
                tournamentId: c.tournament_id || "",
                text: c.content,
                createdAt: c.created_at,
                author: {
                  displayName: c.email,
                },
                matchPhase: c.match_phase || undefined,
              })),
              lastActivityAt: apiComments[0].created_at,
            });
          }
        }

        // Remove duplicate tournament threads
        const uniqueThreads = Array.from(
          new Map(results.map((t) => [t.tournamentId, t])).values()
        );

        setThreads(uniqueThreads);
      } catch (err) {
        console.error("Failed to load fan comments", err);
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, []);

  if (loading) {
    return <p className={styles.page}>Loading fan comments…</p>;
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Fan Comments</h1>
        <p>Community discussion across major tournaments.</p>
      </header>

      <section className={styles.section}>
        {threads.map((thread) => {
          const tournament = tournaments2026.find(
            (t) => t.conceptId === thread.tournamentId
          );

          if (!tournament) return null;

          return (
            <div key={thread.tournamentId} className={styles.thread}>
              <h3
                className={styles.threadTitle}
                onClick={() => navigate(tournament.route)}
              >
                {tournament.name} {tournament.year}
              </h3>

              {thread.comments.map((c) => (
                <p key={c.id} className={styles.comment}>
                  “{c.text}”
                </p>
              ))}
            </div>
          );
        })}
      </section>
    </main>
  );
}