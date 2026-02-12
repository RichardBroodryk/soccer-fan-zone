import { useNavigate } from "react-router-dom";
import styles from "./FanComments.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
import { tournamentCommentThreads } from "../data/tournamentComments";

export default function FanComments() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Fan Comments</h1>
        <p>Community discussion across major tournaments.</p>
      </header>

      <section className={styles.section}>
        {tournamentCommentThreads.map((thread) => {
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
