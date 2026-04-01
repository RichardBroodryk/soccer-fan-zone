import { useEffect, useState } from "react";
import styles from "./NewsHubPage.module.css";

import newsHero from "../assets/images/raz/news-hero.png";
import { newsData as fallbackNews, NewsItem } from "../data/newsData";

export default function NewsHubPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  const fetchNews = () => {
    fetch("http://localhost:4000/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        } else {
          setNews(fallbackNews);
        }
      })
      .catch(() => {
        setNews(fallbackNews);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(fetchNews, 60000); // 🔁 auto refresh

    return () => clearInterval(interval);
  }, []);

  /* ================= PRIORITY SORT ================= */

  const sorted = [...news].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.category === "breaking" && b.category !== "breaking") return -1;
    if (b.category === "breaking" && a.category !== "breaking") return 1;
    return 0;
  });

  /* ================= FILTER ================= */

  const categories = [
    { id: "all", label: "All" },
    { id: "breaking", label: "Breaking" },
    { id: "transfers", label: "Transfers" },
    { id: "injuries", label: "Injuries" },
    { id: "interviews", label: "Interviews" },
    { id: "press", label: "Press" },
    { id: "rumors", label: "Rumors" },
  ];

  const filtered =
    activeCategory === "all"
      ? sorted
      : sorted.filter((n) => n.category === activeCategory);

  const featured =
    activeCategory === "all"
      ? sorted.filter((n) => n.featured).slice(0, 3)
      : [];

  /* ================= HELPERS ================= */

  const isLive = (time: string) => {
    return time.includes("h") || time === "Just now";
  };

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <img src={newsHero} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Breaking Rugby News</h1>
          <p>
            Verified reporting, confirmed updates,
            <br />
            and global rugby coverage — as it happens.
          </p>
        </div>
      </header>

      {/* INTRO */}
      <section className={styles.intro}>
        <p>
          This is the global rugby news surface. Stories here reflect
          confirmed reports, official announcements, and major
          developments across the international game.
        </p>
      </section>

      {/* CATEGORIES */}
      <nav className={styles.categories}>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`${styles.categoryBtn} ${
              activeCategory === c.id ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className={styles.featured}>
          <h2>Top Stories</h2>

          <div className={styles.featuredGrid}>
            {featured.map((item) => (
              <article key={item.id} className={styles.featuredCard}>
                <span className={styles.meta}>
                  {item.source} • {item.time}
                  {isLive(item.time) && (
                    <span className={styles.live}>LIVE</span>
                  )}
                </span>

                <a href={item.url || "#"} target="_blank" rel="noopener noreferrer">
                  <h3>{item.title}</h3>
                </a>

                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* FEED */}
      <section className={styles.feed}>
        {loading && <div className={styles.empty}>Loading news...</div>}

        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>No news available right now.</div>
        )}

        {!loading &&
          filtered.map((item) => (
            <article key={item.id} className={styles.card}>
              <span className={styles.meta}>
                {item.source} • {item.time}
                {isLive(item.time) && (
                  <span className={styles.live}>LIVE</span>
                )}
              </span>

              <a href={item.url || "#"} target="_blank" rel="noopener noreferrer">
                <h3>{item.title}</h3>
              </a>

              <p>{item.excerpt}</p>

              <div className={styles.tags}>
                {item.tags?.map((tag, i) => (
                  <span key={i}>#{tag}</span>
                ))}
              </div>
            </article>
          ))}
      </section>
    </main>
  );
}