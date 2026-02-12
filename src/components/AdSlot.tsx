import { useEffect, useState } from "react";
import styles from "./AdSlot.module.css";

export interface AdItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl: string;
}

interface AdSlotProps {
  ads: AdItem[];
  rotationIntervalMs?: number;
}

export default function AdSlot({
  ads,
  rotationIntervalMs = 9000,
}: AdSlotProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ads.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ads.length);
    }, rotationIntervalMs);

    return () => clearInterval(timer);
  }, [ads.length, rotationIntervalMs]);

  if (!ads.length) return null;

  const ad = ads[activeIndex];

  return (
    <aside className={styles.adSlot}>
      <a
        href={ad.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.adLink}
      >
        {ad.imageUrl && (
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className={styles.adImage}
          />
        )}

        <div className={styles.adText}>
          <span className={styles.adLabel}>Sponsored</span>
          <h4 className={styles.adTitle}>{ad.title}</h4>
          {ad.description && (
            <p className={styles.adDescription}>{ad.description}</p>
          )}
        </div>
      </a>
    </aside>
  );
}
