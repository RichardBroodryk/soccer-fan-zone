import { Link } from "react-router-dom";
import styles from "./HeroCard.module.css";

type HeroCardProps = {
  variant: "premium" | "super";
};

export default function HeroCard({ variant }: HeroCardProps) {
  const isSuper = variant === "super";

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Rugby Anthem Zone</h1>

        <p className={styles.tagline}>
          Live the passion. Celebrate the anthems. Own the game.
        </p>

        <div className={styles.actions}>
          <Link to="/tournaments/men" className={styles.mens}>
            Men’s Rugby
          </Link>

          <Link to="/tournaments/women" className={styles.womens}>
            Women’s Rugby
          </Link>

          <Link to="/anthems" className={styles.anthems}>
            Anthems
          </Link>

          {isSuper ? (
            <Link to="/heritage" className={styles.heritage}>
              Heritage
            </Link>
          ) : (
            <div className={styles.heritageLocked}>
              Heritage
              <span>Super Premium</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
