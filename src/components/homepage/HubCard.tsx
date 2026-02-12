import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HubCard.module.css";

type HubCardProps = {
  title: string;
  image: string;
  to: string;
  features: {
    label: string;
    icon: ReactNode;
  }[];
};

export default function HubCard({
  title,
  image,
  to,
  features,
}: HubCardProps) {
  const navigate = useNavigate();

  return (
    <section
      className={styles.hub}
      role="button"
      tabIndex={0}
      onClick={() => navigate(to)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(to);
        }
      }}
    >
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.features}>
          {features.map((f) => (
            <span key={f.label} className={styles.feature}>
              <span className={styles.icon}>{f.icon}</span>
              <span>{f.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
