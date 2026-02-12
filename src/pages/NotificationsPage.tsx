import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationsPage.module.css";

import { loadMyTeams } from "../utils/myTeamsStorage";
import { teamsMeta, TeamMeta } from "../data/teamsMeta";

type NotificationItem = {
  id: number;
  type: "match" | "fantasy" | "news" | "system";
  title: string;
  message: string;
  enabled: boolean;
};

export default function NotificationsPage() {
  const navigate = useNavigate();

  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: 1,
      type: "match",
      title: "Match Alerts",
      message:
        "Kick-off reminders, final scores, and key match moments.",
      enabled: false,
    },
    {
      id: 2,
      type: "fantasy",
      title: "Fantasy Updates",
      message:
        "Team deadlines, reminders, and fantasy-related notices.",
      enabled: true,
    },
    {
      id: 3,
      type: "news",
      title: "Rugby News",
      message:
        "Major announcements, tournament updates, and editorial highlights.",
      enabled: true,
    },
    {
      id: 4,
      type: "system",
      title: "Platform Messages",
      message:
        "Important service information and account-related notices.",
      enabled: true,
    },
  ]);

  const [teams, setTeams] = useState<TeamMeta[]>([]);

  /* ================= BROWSER PERMISSION ================= */

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  /* ================= TEAM DERIVATION ================= */

  useEffect(() => {
    const stored = loadMyTeams();
    const selected = teamsMeta.filter(
      (t) =>
        stored.men.includes(t.id) || stored.women.includes(t.id)
    );
    setTeams(selected);
  }, []);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
  };

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div
          className={styles.heroContent}
          style={{ background: "#ffffff", color: "#000000" }}
        >
          <h1>Notifications</h1>
          <p>
            Important updates related to the teams and competitions
            you follow.
          </p>
          <p style={{ marginTop: "8px", fontSize: "0.9rem" }}>
            Notification delivery controls will expand over time.
            Alerts are currently generated automatically based on
            your selected teams.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className={styles.content}>
        <div className={styles.mainGrid}>
          {/* ================= LEFT ================= */}
          <aside className={styles.leftColumn}>
            <div className={styles.statusBlock}>
              <h3>Status</h3>
              <p className={styles.statusValue}>
                {permission.toUpperCase()}
              </p>

              {permission === "default" && (
                <button
                  className={styles.primaryButton}
                  onClick={requestPermission}
                >
                  Prepare Browser Notifications
                </button>
              )}

              {permission === "denied" && (
                <p className={styles.statusValue}>
                  Notifications are disabled in your browser
                  settings.
                </p>
              )}
            </div>

            <div className={styles.metaBlock}>
              <h3>Notification Scope</h3>
              <p>
                Alerts are prioritised based on the teams you
                follow and major platform updates.
              </p>
            </div>
          </aside>

          {/* ================= RIGHT ================= */}
          <article className={styles.rightColumn}>
            {/* ===== TEAM ALERTS ===== */}
            <section className={styles.teamAlerts}>
              <h2>Team Alerts</h2>
              <p className={styles.teamIntro}>
                These alerts are generated automatically from your
                selected teams.
              </p>

              {teams.length > 0 ? (
                <div className={styles.teamList}>
                  {teams.map((team) => (
                    <div key={team.id} className={styles.teamBlock}>
                      <div className={styles.teamHeader}>
                        <img
                          src={team.flag}
                          alt={`${team.name} flag`}
                        />
                        <h3>{team.name}</h3>
                      </div>

                      <ul className={styles.alertList}>
                        <li>
                          Match alerts (kick-off & final score)
                        </li>
                        <li>Squad & injury updates</li>
                        <li>Tournament milestones</li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>
                    Follow teams to receive personalised alerts.
                  </p>
                  <button
                    className={styles.primaryButton}
                    onClick={() => navigate("/my-teams")}
                  >
                    Manage My Teams
                  </button>
                </div>
              )}
            </section>

            {/* ===== GLOBAL CATEGORIES (PREVIEW) ===== */}
            <section className={styles.globalAlerts}>
              <h2>Notification Categories</h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  color: "#475569",
                }}
              >
                Category controls are shown as a preview.
                Fine-grained delivery preferences will be
                configurable in a future update.
              </p>

              {items.map((item) => (
                <div
                  key={item.id}
                  className={styles.notificationItem}
                >
                  <div className={styles.notificationHeader}>
                    <span className={styles.notificationTitle}>
                      {item.title}
                    </span>

                    <button
                      className={styles.primaryButton}
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.enabled ? "Active" : "Preview"}
                    </button>
                  </div>

                  <p className={styles.message}>
                    {item.message}
                  </p>
                </div>
              ))}
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
