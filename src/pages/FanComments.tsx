import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FanComments.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
import { API_BASE_URL } from "../config/api";

import commentsImg from "../assets/images/raz/Commentsmainpage.png";

/* ================= TIME ================= */
function getTimeMeta(dateString: string) {
  const now = new Date().getTime();
  const then = new Date(dateString).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return { label: "Just now", fresh: true };
  if (diff < 120) return { label: "1 min ago", fresh: true };
  if (diff < 3600)
    return { label: `${Math.floor(diff / 60)} min ago`, fresh: false };
  if (diff < 86400)
    return { label: `${Math.floor(diff / 3600)} hr ago`, fresh: false };

  return { label: `${Math.floor(diff / 86400)} day ago`, fresh: false };
}

/* ================= FEED ================= */
function buildGlobalFeed(threads: any[]) {
  if (!threads || threads.length === 0) return [];

  return threads
    .flatMap((t) =>
      t.comments.map((c: any) => ({
        ...c,
        tournamentId: t.tournamentId,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
}

export default function FanComments() {
  const navigate = useNavigate();

  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);

  async function loadComments() {
    try {
      setRefreshing(true);

      const results: any[] = [];

      for (const t of tournaments2026) {
        const res = await fetch(
          `${API_BASE_URL}/api/comments?tournament_id=${t.conceptId}`
        );

        if (!res.ok) continue;

        const data = await res.json();

        if (data.length > 0) {
          results.push({
            tournamentId: t.conceptId,
            comments: data.map((c: any) => ({
              id: String(c.id),
              tournamentId: c.tournament_id || "",
              text: c.content,
              createdAt: c.created_at,
              matchPhase: c.match_phase,
            })),
          });
        }
      }

      setThreads(results);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 400);
    }
  }

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(() => {
    const interval = setInterval(loadComments, 15000);
    return () => clearInterval(interval);
  }, []);

  async function handlePost() {
    if (!newComment.trim()) return;

    try {
      setPosting(true);

      await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          match_id: null,
          tournament_id: null,
        }),
      });

      setNewComment("");
      loadComments();
    } catch (e) {
      console.error(e);
    } finally {
      setPosting(false);
    }
  }

  const feed = buildGlobalFeed(threads);

  if (loading) {
    return <p className={styles.page}>Loading fan comments…</p>;
  }

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <img
          src={commentsImg}
          alt="Fan comments rugby discussion"
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1>Fan Comments</h1>
          <p>The global rugby conversation — reactions, debate, and opinion.</p>
        </div>
      </header>

      <div className={styles.contentColumn}>
        {/* BACK */}
        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() => navigate("/media")}
          >
            ← Back to The Rugby Studio
          </button>
        </div>

        {/* 🔄 SYSTEM STATUS */}
        {refreshing && (
          <div className={styles.refreshing}>Updating…</div>
        )}

        {/* INPUT */}
        <div className={styles.inputWrap}>
          <textarea
            className={styles.textarea}
            placeholder="Join the global rugby conversation..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            className={styles.postBtn}
            onClick={handlePost}
            disabled={posting}
          >
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </div>

        {/* FEED */}
        {feed.length === 0 ? (
          <p className={styles.empty}>
            No live comments — be the first to start the conversation.
          </p>
        ) : (
          feed.map((c, index) => {
            const time = getTimeMeta(c.createdAt);
            const isNewest = index === 0;

            return (
              <div
                key={c.id}
                className={`${styles.commentBlock} ${
                  isNewest ? styles.newest : ""
                }`}
              >
                <div className={styles.commentHeader}>
                  <span className={styles.metaRight}>
                    {time.fresh && (
                      <span className={styles.activeNow}>
                        ● Active now
                      </span>
                    )}
                    {time.label}
                  </span>
                </div>

                <p className={styles.comment}>“{c.text}”</p>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}