import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./MatchPage.module.css";

import { flagMap } from "../data/flagMap";
import { getStadiumByName } from "../utils/stadiumResolver";
import { getMatchDetails } from "../utils/matchDetailsResolver";

export default function MatchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.state as any;
  const tournamentSlug = match?.tournamentSlug || "";

  const [userComments, setUserComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  if (!match) {
    return <div className={styles.page}>Match not found</div>;
  }

  const details = getMatchDetails(match);

  const homeFlag = flagMap[match.home.country];
  const awayFlag = flagMap[match.away.country];
  const stadium = getStadiumByName(match.venue);

  const formattedDate = match.date
    ? new Date(match.date).toLocaleString("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "Date TBC";

  const hasScore = !!match.score;

  const handlePostComment = () => {
    if (newComment.trim() === "") return;

    const comment = {
      id: Date.now().toString(),
      tournamentId: match.competitionId,
      text: newComment,
      createdAt: new Date().toISOString(),
      author: { displayName: "You" },
    };

    setUserComments([...userComments, comment]);
    setNewComment("");
  };

  return (
    <main className={styles.page}>
      {/* ================= TOP MATCH BAR ================= */}
      <header className={styles.hero}>
        <button 
          className={styles.backButton}
          onClick={() => navigate(`/tournaments/${tournamentSlug}`)}
        >
          ← Back to Tournament
        </button>

        <div className={styles.teamsRow}>
          <div className={styles.team}>
            {homeFlag && <img src={homeFlag} alt="" className={styles.flag} />}
            <span>{match.home.name}</span>
          </div>

          <div className={styles.center}>
            {hasScore ? (
              <div className={styles.score}>
                {match.score.home} - {match.score.away}
              </div>
            ) : (
              <div className={styles.vs}>VS</div>
            )}
          </div>

          <div className={styles.team}>
            <span>{match.away.name}</span>
            {awayFlag && <img src={awayFlag} alt="" className={styles.flag} />}
          </div>
        </div>

        <div className={styles.meta}>
          <span>{formattedDate}</span>
          {stadium && (
            <a href={`/stadium/${stadium.slug}`} className={styles.stadiumLink}>
              🏟 {stadium.name}
            </a>
          )}
        </div>
      </header>

      {/* ================= EVENTS ================= */}
      <section className={styles.section}>
        <h2>Match Events</h2>
        {details?.timeline && details.timeline.length > 0 ? (
          details.timeline.map((e: any, i: number) => (
            <div key={i} className={styles.event}>
              <strong>{e.minute}</strong> — {e.label}
            </div>
          ))
        ) : (
          <p>No events recorded yet for this match.</p>
        )}
      </section>

      {/* ================= LINEUPS ================= */}
      <section className={styles.section}>
        <h2>Lineups</h2>
        
        <div className={styles.lineups}>
          <div>
            <h3>{match.home.name} — Starting XV</h3>
            {details?.lineups?.homeStarting && details.lineups.homeStarting.length > 0 ? (
              details.lineups.homeStarting.map((p: any) => (
                <div key={p.number} className={styles.player}>
                  {p.number}. {p.name}
                </div>
              ))
            ) : (
              <p>No starting lineup data yet for home team.</p>
            )}
          </div>

          <div>
            <h3>{match.away.name} — Starting XV</h3>
            {details?.lineups?.awayStarting && details.lineups.awayStarting.length > 0 ? (
              details.lineups.awayStarting.map((p: any) => (
                <div key={p.number} className={styles.player}>
                  {p.number}. {p.name}
                </div>
              ))
            ) : (
              <p>No starting lineup data yet for away team.</p>
            )}
          </div>
        </div>

        {/* The Bench */}
        <div className={styles.benchSection}>
          <h3>The Bench</h3>
          {details?.lineups?.homeBench && details.lineups.homeBench.length > 0 ? (
            details.lineups.homeBench.map((p: any) => (
              <div key={p.number} className={styles.player}>
                {p.number}. {p.name}
              </div>
            ))
          ) : (
            <p>No bench data yet for this match.</p>
          )}
        </div>
      </section>

      {/* ================= PLAYER PERFORMANCES ================= */}
      <section className={styles.section}>
        <h2>Player Performances</h2>
        {details?.performances && details.performances.length > 0 ? (
          details.performances.map((perf: any, i: number) => (
            <div key={i} className={styles.performance}>
              <strong>{perf.category}:</strong> {perf.player} — {perf.value}
            </div>
          ))
        ) : (
          <p>No performance stats yet for this match.</p>
        )}
      </section>

      {/* ================= FAN COMMENTS (PROFESSIONAL) ================= */}
      <section className={styles.section}>
        <h2>Fan Comments</h2>

        {/* Comment Input */}
        <div className={styles.commentInput}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            onKeyPress={(e) => e.key === "Enter" && handlePostComment()}
          />
          <button onClick={handlePostComment}>Post Comment</button>
        </div>

        <div className={styles.commentsPanel}>
          {userComments.length > 0 ? (
            userComments.map((c) => (
              <div key={c.id} className={styles.comment}>
                <strong>{c.author.displayName}</strong>
                <p>{c.text}</p>
                <small>{new Date(c.createdAt).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>Be the first to comment after the match!</p>
          )}
        </div>
      </section>
    </main>
  );
}