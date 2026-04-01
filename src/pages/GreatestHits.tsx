import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GreatestHits.module.css";

import hitsHero from "../assets/images/raz/Hitsmainpage.png";

interface VideoItem {
  id: number;
  title: string;
  thumbnail?: string;
  url?: string;
  category?: string;
}

export default function GreatestHits() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        let hitVideos: VideoItem[] = data.filter(
          (v: VideoItem) =>
            v.category &&
            v.category.toLowerCase().includes("hit")
        );

        // fallback
        if (hitVideos.length === 0) {
          hitVideos = data
            .filter(
              (v: VideoItem) =>
                v.category &&
                v.category.toLowerCase().includes("highlight")
            )
            .slice(0, 16);
        }

        setVideos(hitVideos.slice(0, 16));
      })
      .catch((err) => {
        console.error("Failed to load hit videos:", err);
      });
  }, []);

  /* ================= SMART DISTRIBUTION ================= */
  const rightNow = videos.slice(0, 4);
  const momentum = videos.slice(4, 8);
  const feelIt = videos.slice(8, 12);
  const still = videos.slice(12, 16);

  /* ================= CARD ================= */
  const renderCard = (video: VideoItem, large = false) => (
    <div
      key={video.id}
      className={large ? styles.cardLarge : styles.card}
      onClick={() => video.url && window.open(video.url, "_blank")}
    >
      <div
        className={large ? styles.thumbLarge : styles.thumb}
        style={{
          backgroundImage: video.thumbnail
            ? `url(${video.thumbnail})`
            : undefined,
        }}
      >
        <div className={styles.overlay} />
        <span className={styles.play}>▶</span>
      </div>

      <div className={styles.info}>
        <h3>{video.title}</h3>
      </div>
    </div>
  );

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <img
          src={hitsHero}
          alt="Rugby greatest hits"
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1>Greatest Hits</h1>
          <p>
            The moments that make you stop,
            <br />
            react, and watch again.
          </p>
        </div>
      </header>

      {/* CONTENT COLUMN */}
      <div className={styles.contentColumn}>
        
        {/* BACK BUTTON */}
        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() => navigate("/media")}
          >
            ← Back to The Rugby Studio
          </button>
        </div>

        {/* 🔥 RIGHT NOW */}
        {rightNow.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Right Now</h2>
            <div className={styles.rail}>
              {rightNow.map((v) => renderCard(v))}
            </div>
          </section>
        )}

        {/* 💥 MOMENTUM */}
        {momentum.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Momentum Shifters</h2>
            <div className={styles.grid}>
              {momentum.map((v) => renderCard(v, true))}
            </div>
          </section>
        )}

        {/* 🔊 FEEL IT */}
        {feelIt.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Feel It</h2>
            <div className={styles.rail}>
              {feelIt.map((v) => renderCard(v))}
            </div>
          </section>
        )}

        {/* 🧱 STILL HITS */}
        {still.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Still Hits</h2>
            <div className={styles.gridCompact}>
              {still.map((v) => renderCard(v))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {videos.length === 0 && (
          <p className={styles.empty}>
            No hits available yet — check back soon.
          </p>
        )}
      </div>
    </main>
  );
}