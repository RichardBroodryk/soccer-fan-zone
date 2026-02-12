import { useNavigate } from "react-router-dom";
import styles from "./SmallCard.module.css";

interface SmallCardProps {
  label: string;
  icon: string;
  to: string;
  variant?: keyof typeof styles;
}

export default function SmallCard({
  label,
  icon,
  to,
  variant,
}: SmallCardProps) {
  const navigate = useNavigate();

  const className = variant
    ? `${styles.card} ${styles[variant]}`
    : styles.card;

  return (
    <div
      className={className}
      onClick={() => navigate(to)}
      role="button"
      tabIndex={0}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
