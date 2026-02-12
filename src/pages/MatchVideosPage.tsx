import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchVideosPage.module.css";

import matchVideosHero from "../assets/images/raz/Matchhighlightsmainpage.png";

type VideoCategory =
  | "highlights"
  | "analysis"
  | "interviews"
  | "behind-scenes";

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  views: string;
  date: string;
}

const categories: { id: VideoCategory; label: string; count: number }[] = [
  { id: "highlights", label: "Match Highlights", count: 24 },
  { id: "analysis", label: "Expert Analysis", count: 18 },
  { id: "interviews", label: "Player Interviews", count: 12 },
  { id: "behind-scenes", label: "Behind the Scenes", count: 8 },
];

const videoLibrary: Record<VideoCategory, VideoItem[]> = {
  highlights: [
    {
      id: 1,
      title: "Ireland vs France — Full Highlights",
      duration: "8:45",
      views: "125K",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "England Comeback vs Scotland",
      duration: "6:20",
      views: "98K",
      date: "1 week ago",
    },
  ],
  analysis: [
    {
      id: 1,
      title: "Tactical Breakdown: Defensive Systems",
      duration: "15:30",
      views: "45K",
      date: "3 days ago",
    },
  ],
  interviews: [
    {
      id: 1,
      title: "Captain Interview: Leadership Insights",
      duration: "7:15",
      views: "67K",
      date: "1 day ago",
    },
  ],
  "behind-scenes": [
    {
      id: 1,
      title: "Match Day Preparation",
      duration: "6:50",
      views: "89K",
      date: "2 days ago",
    },
  ],
};

export default function MatchVideosPage() {
  const [activeCategory, setActiveCategory] =
    useState<VideoCategory>("highlights");

  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* HERO — PAGE LOCAL */}
      <header className={styles.hero}>
        <img src={matchVideosHero} alt="" className={styles.heroImage} />

        <div className={styles.heroText}>
          <h1>Match Videos</h1>
          <p>
            Highlights, analysis, interviews, and behind-the-scenes
            <br />
            coverage from across the rugby world.
          </p>
        </div>
      </header>

      {/* BACK TO STUDIO */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/media")}
        >
          ← Back to The Rugby Studio
        </button>
      </div>

      {/* FEATURED */}
      <section className={styles.featured}>
        <div className={styles.featuredThumbnail}>
          <span className={styles.featuredDuration}>52:10</span>
        </div>

        <div className={styles.featuredInfo}>
          <span className={styles.featuredLabel}>Featured Match</span>
          <h2>Rugby World Cup Final — Full Match Replay</h2>
          <p>
            Relive one of the defining moments in modern rugby history with
            extended match coverage and post-match analysis.
          </p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <nav className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.tab} ${
              activeCategory === cat.id ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span>{cat.label}</span>
            <small>{cat.count}</small>
          </button>
        ))}
      </nav>

      {/* VIDEO GRID */}
      <section className={styles.grid}>
        {videoLibrary[activeCategory].map((video) => (
          <div key={video.id} className={styles.card}>
            <div className={styles.thumbnail}>
              <span className={styles.duration}>{video.duration}</span>
            </div>

            <div className={styles.info}>
              <h3>{video.title}</h3>
              <div className={styles.meta}>
                <span>{video.views} views</span>
                <span>{video.date}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PREMIUM CALLOUT */}
      <section className={styles.callout}>
        <h3>Premium Video Access</h3>
        <p>
          Extended highlights, ad-light viewing, and exclusive rugby
          documentaries are available with Premium membership.
        </p>
      </section>
    </div>
  );
}
