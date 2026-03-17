import { NavLink } from "react-router-dom";
import styles from "./InfoBar.module.css";

type InfoBarProps = {
  variant?: "premium" | "super";
};

export default function InfoBar({ variant = "premium" }: InfoBarProps) {
  const isSuper = variant === "super";

  const items = [
    { label: "Notifications", route: "/notifications" },
    { label: "Anthems", route: "/anthems" },
    { label: "Tournaments", route: "/tournaments" },
    { label: "Match Center", route: "/match-center" },
    { label: "Matchday Journeys", route: "/matchday-journeys" },
    { label: "The Rugby Studio", route: "/media" },
    { label: "Fanzone", route: "/fanzone" },
    { label: "News", route: "/news" },
    { label: "Inside the Game", route: "/inside-the-game" },
    { label: "Calendar", route: "/calendar" },
    { label: "Stadiums", route: "/stadiums" },
    { label: "Merch", route: "/merch" },
  ];

  if (isSuper) {
    items.splice(7, 0, { label: "Heritage", route: "/heritage" });
    items.splice(8, 0, {
      label: "Defining Moments",
      route: "/defining-moments",
    });
  }

  return (
    <section className={styles.bar}>
      <div className={styles.grid}>
        {items.map((item) => (
          <NavLink key={item.route} to={item.route} className={styles.link}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </section>
  );
}