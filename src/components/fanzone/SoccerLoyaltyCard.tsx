import styles from "./SoccerLoyaltyCard.module.css";

type TierKey =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum";

interface SoccerLoyaltyCardProps {
  userTier: TierKey;
  points: number;
}

const TIERS = {
  bronze: {
    label: "Bronze",
    min: 0,
    next: "silver",
  },

  silver: {
    label: "Silver",
    min: 1000,
    next: "gold",
  },

  gold: {
    label: "Gold",
    min: 3000,
    next: "platinum",
  },

  platinum: {
    label: "Platinum",
    min: 7000,
    next: null,
  },
} as const;

export default function SoccerLoyaltyCard({
  userTier,
  points,
}: SoccerLoyaltyCardProps) {
  const tier = TIERS[userTier];

  const nextTierKey =
    tier.next as TierKey | null;

  const nextTier =
    nextTierKey
      ? TIERS[nextTierKey]
      : null;

  let progress = 100;
  let remaining = 0;

  if (nextTier) {
    const range =
      nextTier.min - tier.min;

    const current =
      points - tier.min;

    progress = Math.min(
      (current / range) * 100,
      100
    );

    remaining = Math.max(
      nextTier.min - points,
      0
    );
  }

  return (
    <section
      className={styles.card}
      data-tier={userTier}
    >
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            Football Standing
          </span>

          <h2>
            {tier.label} Supporter
          </h2>
        </div>

        <div className={styles.points}>
          {points.toLocaleString()} pts
        </div>
      </header>

      {nextTier && (
        <div className={styles.progress}>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className={styles.meta}>
            {remaining.toLocaleString()} pts to{" "}
            {nextTier.label}
          </div>
        </div>
      )}

      <div className={styles.rules}>
        <span>+50 Match</span>
        <span>+10 Video</span>
        <span>+25 Stadium</span>
        <span>+5 Interaction</span>
      </div>
    </section>
  );
}