import { NavLink } from "react-router-dom";
import styles from "./InfoBar.module.css";

type InfoBarProps = {
  variant?: "premium" | "super";
};

export default function InfoBar({ variant = "premium" }: InfoBarProps) {
  const isSuper = variant === "super";

const items = [
  { label: "Matches", route: "/soccer/matches" },

  { label: "Live", route: "/soccer/live" },

  { label: "My Feed", route: "/soccer/my-feed" },

  {
    label: "Notifications",
    route: "/soccer/notifications",
  },

  { label: "Teams", route: "/soccer/teams" },

  { label: "News", route: "/soccer/news" },

  { label: "Anthems", route: "/anthems" },

  {
    label: "Match Center",
    route: "/soccer/match-center",
  },

  { label: "Stadiums", route: "/soccer/stadiums" },

  {
  label: "Tactical",
  route: "/soccer/tactical-room",
},

{
  label: "Tournament Center",
  route: "/soccer/tournament-center",
},

{
  label: "Projections",
  route: "/soccer/knockout-projections",
},

  { label: "Fanzone", route: "/soccer/fanzone" },

  { label: "Calendar", route: "/soccer/calendar" },
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