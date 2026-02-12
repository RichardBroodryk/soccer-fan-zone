import { useState } from "react";
import styles from "./NewsHubPage.module.css";

import newsHero from "../assets/images/raz/news-hero.png";
import { newsData } from "../data/newsData";

export default function NewsHubPage() {
  const [activeCategory, setActiveCategory] = useState("all");

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
      ? newsData
      : newsData.filter((n) => n.category === activeCategory);

  const featured = newsData.filter((n) => n.featured);

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
      {activeCategory === "all" && featured.length > 0 && (
        <section className={styles.featured}>
          <h2>Featured</h2>

          <div className={styles.featuredGrid}>
            {featured.map((item) => (
              <article key={item.id} className={styles.featuredCard}>
                <span className={styles.meta}>
                  {item.source} • {item.time}
                </span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* FEED */}
      <section className={styles.feed}>
        {filtered.map((item) => (
          <article key={item.id} className={styles.card}>
            <span className={styles.meta}>
              {item.source} • {item.time}
            </span>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>

            <div className={styles.tags}>
              {item.tags.map((tag, i) => (
                <span key={i}>#{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
