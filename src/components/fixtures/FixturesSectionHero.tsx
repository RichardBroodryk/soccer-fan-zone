import styles from "./FixturesSectionHero.module.css";

type FixturesSectionHeroProps = {
  title: string;
  backgroundImage: string;
  position?: "center" | "top";
};

export default function FixturesSectionHero({
  title,
  backgroundImage,
  position = "center",
}: FixturesSectionHeroProps) {
  return (
    <div
      className={`${styles.hero} ${
        position === "top" ? styles.top : styles.center
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay} />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
