// ==================================================
// NOTIFICATIONS PAGE — INTELLIGENCE UPGRADED (PHASE 4.4)
// ==================================================

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationsPage.module.css";

import { loadMyTeams } from "../utils/myTeamsStorage";
import { teamsMeta, TeamMeta } from "../data/teamsMeta";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/matches2026Men";

import { calculateImportance } from "../contracts/importanceEngine";

/* ================= TYPES ================= */

type NotificationItem = {
  id: number;
  type: "match" | "fantasy" | "news" | "system";
  title: string;
  message: string;
  enabled: boolean;
};

type GeneratedNotification = {
  id: number;
  text: string;
  sub: string;
  importance: number;
};

/* ================= STORAGE ================= */

const STORAGE_KEY = "raz_sent_notifications_v1";

function loadSent(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSent(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

/* ================= INTELLIGENT FILTER ================= */

function shouldNotify(match: MatchData) {
  const state = match.state;
  const importance = match.importance || 0;

  if (state === "live") return true;
  if (state === "starting" && importance >= 70) return true;
  if (importance >= 85) return true;

  return false;
}

/* ================= PAGE ================= */

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
        "Kick-off reminders, live updates, and final scores.",
      enabled: true,
    },
    {
      id: 2,
      type: "fantasy",
      title: "Fantasy Updates",
      message: "Fantasy reminders and updates.",
      enabled: true,
    },
    {
      id: 3,
      type: "news",
      title: "Rugby News",
      message: "Major rugby news and announcements.",
      enabled: true,
    },
    {
      id: 4,
      type: "system",
      title: "Platform Messages",
      message: "System and account updates.",
      enabled: true,
    },
  ]);

  const [teams, setTeams] = useState<TeamMeta[]>([]);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [sentIds, setSentIds] = useState<number[]>(loadSent());

  /* ================= PERMISSION ================= */

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

  /* ================= LOAD TEAMS ================= */

  useEffect(() => {
    const stored = loadMyTeams();
    const selected = teamsMeta.filter(
      (t) =>
        stored.men.includes(t.id) ||
        stored.women.includes(t.id)
    );
    setTeams(selected);
  }, []);

  /* ================= LOAD MATCHES ================= */

  useEffect(() => {
    getMatches().then(setMatches);
  }, []);

  /* ================= DERIVED ================= */

  const teamNames = useMemo(
    () => teams.map((t) => t.name),
    [teams]
  );

  const generatedNotifications: GeneratedNotification[] =
    useMemo(() => {
      return matches
        .map((m) => ({
          ...m,
          // 🔥 PERSONALISED IMPORTANCE
          importance: calculateImportance(m, teamNames),
        }))
        .filter((m) => {
          // 🔥 MUST INVOLVE USER TEAM
          const involvesTeam =
            teamNames.includes(m.home.name) ||
            teamNames.includes(m.away.name);

          if (!involvesTeam) return false;

          // 🔥 INTELLIGENT FILTER
          return shouldNotify(m);
        })
        .map((m) => ({
          id: m.id,
          importance: m.importance || 0,

          text:
            m.state === "final" && m.score
              ? `FINAL: ${m.home.name} ${m.score.home} - ${m.score.away} ${m.away.name}`
              : m.state === "live"
              ? `LIVE NOW: ${m.home.name} vs ${m.away.name}`
              : m.state === "starting"
              ? `Starting Soon: ${m.home.name} vs ${m.away.name}`
              : `Today: ${m.home.name} vs ${m.away.name}`,

          sub: m.tournament,
        }))
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 8);
    }, [matches, teamNames]);

  /* ================= PUSH ================= */

  useEffect(() => {
    if (permission !== "granted") return;

    const matchAlertsEnabled =
      items.find((i) => i.type === "match")?.enabled;

    if (!matchAlertsEnabled) return;

    const updated = [...sentIds];

    generatedNotifications.forEach((n) => {
      if (updated.includes(n.id)) return;

      try {
        new Notification(n.text, { body: n.sub });
        updated.push(n.id);
      } catch {}
    });

    setSentIds(updated);
    saveSent(updated);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedNotifications, permission, items]);

  /* ================= TOGGLE ================= */

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
  };

  /* ================= NAVIGATION ================= */

  const handleNotificationClick = () => {
    navigate("/match-center");
  };

  /* ================= UI ================= */

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Notifications</h1>
          <p>Live alerts powered by your selected teams.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.mainGrid}>
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
                  Enable Notifications
                </button>
              )}
            </div>
          </aside>

          <article className={styles.rightColumn}>
            <section className={styles.teamAlerts}>
              <h2>Live Alerts</h2>

              {generatedNotifications.length === 0 ? (
                <div className={styles.emptyState}>
                  No high-priority alerts.
                </div>
              ) : (
                generatedNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={styles.notificationItem}
                    onClick={handleNotificationClick}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{n.text}</strong>
                    <p className={styles.message}>{n.sub}</p>
                  </div>
                ))
              )}
            </section>

            <section className={styles.globalAlerts}>
              <h2>Notification Categories</h2>

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
                      {item.enabled ? "Active" : "Off"}
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