import { useNavigate } from "react-router-dom";
import styles from "./MyFeedPage.module.css";

import { newsData } from "../data/newsData";

export default function MyFeedPage() {
  const navigate = useNavigate();

  // TEMP v1 — replace later with real user preferences
  const followedTeams = ["New Zealand", "South Africa"];

  const feed = newsData.filter((item) =>
    item.tags.some((tag) => followedTeams.includes(tag))
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>My Feed</h1>
        <p>Updates shaped around the teams you follow.</p>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backRow}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/my-teams")}
        >
          ← Back to My Teams
        </button>
      </div>

      <section className={styles.feed}>
        {feed.length > 0 ? (
          feed.map((item) => (
            <article key={item.id} className={styles.feedItem}>
              <div className={styles.meta}>
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))
        ) : (
          <div className={styles.empty}>
            <p>
              Your feed will populate as you follow teams and tournaments.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
