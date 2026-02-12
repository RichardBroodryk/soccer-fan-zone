import styles from "./SectionTitle.module.css";

export type SectionTitleProps = {
  text: string;
  icon?: string;       // optional emoji/icon
  subtitle?: string;   // NEW (optional)
};

export default function SectionTitle({
  text,
  icon,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {text}
      </h3>

      {subtitle && (
        <p className={styles.subtitle}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
