import styles from "./LoyaltyCard.module.css";

interface LoyaltyCardProps {
  userTier: "bronze" | "silver" | "gold" | "platinum";
  points: number;
}

const TIER_CONFIG = {
  bronze: { label: "Bronze", next: "Silver" },
  silver: { label: "Silver", next: "Gold" },
  gold: { label: "Gold", next: "Platinum" },
  platinum: { label: "Platinum", next: null },
};

export default function LoyaltyCard({ userTier, points }: LoyaltyCardProps) {
  const tier = TIER_CONFIG[userTier];
  const pointsInTier = points % 500;
  const progress = Math.min((pointsInTier / 500) * 100, 100);
  const pointsToNext = tier.next ? 500 - pointsInTier : 0;

  return (
    <section className={styles.card} data-tier={userTier}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Fanzone Standing</span>
          <h3>{tier.label} Supporter</h3>
        </div>
        <div className={styles.points}>{points.toLocaleString()} pts</div>
      </header>

      {tier.next && (
        <div className={styles.progress}>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.next}>
            {pointsToNext} points to {tier.next}
          </span>
        </div>
      )}
    </section>
  );
}
