import { useParams, useNavigate } from "react-router-dom";
import Flag from "../components/images/Flag";
import { matches2026 } from "../data/matches2026";
import { tournaments2026 } from "../data/tournamentMeta";
import { stadiums } from "../data/stadiums";
import styles from "./MatchPage.module.css";

/* ================= TYPES ================= */

type MatchStatus = "upcoming" | "live" | "final";

type TimelineEvent = {
  minute: string;
  label: string;
};

type Player = {
  number: number;
  name: string;
  position: string;
};

type TeamLineup = {
  starting: Player[];
  bench: Player[];
};

/* ================= PLACEHOLDERS ================= */

const timeline: TimelineEvent[] = [
  { minute: "0'", label: "Kick-off" },
  { minute: "40'", label: "Half-time" },
  { minute: "80'", label: "Full-time" },
];

const demoLineups: Record<"home" | "away", TeamLineup> = {
  home: {
    starting: Array.from({ length: 15 }).map((_, i) => ({
      number: i + 1,
      name: `Starting Player ${i + 1}`,
      position: "Position",
    })),
    bench: Array.from({ length: 8 }).map((_, i) => ({
      number: i + 16,
      name: `Bench Player ${i + 16}`,
      position: "Position",
    })),
  },
  away: {
    starting: Array.from({ length: 15 }).map((_, i) => ({
      number: i + 1,
      name: `Starting Player ${i + 1}`,
      position: "Position",
    })),
    bench: Array.from({ length: 8 }).map((_, i) => ({
      number: i + 16,
      name: `Bench Player ${i + 16}`,
      position: "Position",
    })),
  },
};

/* ================= PAGE ================= */

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const matchId = id ? Number(id) : NaN;
  const match = matches2026.find((m) => m.id === matchId);

  if (!match) {
    return (
      <main className={styles.error}>
        <h2>Match not found</h2>
      </main>
    );
  }

  /* ================= TOURNAMENT RESOLUTION ================= */

  const tournament = tournaments2026.find(
    (t) => t.matchKey === match.tournament
  );

  const backToTournament = tournament
    ? tournament.route
    : "/tournaments";

  /* ================= STATUS ================= */

  const { home, away, score, venue, date } = match;

  const matchStatus: MatchStatus = score
    ? "final"
    : new Date(date) > new Date()
    ? "upcoming"
    : "live";

  /* ================= STADIUM ================= */

  const stadium = stadiums.find(
    (s) => s.name === venue
  );

  return (
    <main className={styles.page}>
      {/* ================= BACK ================= */}
      <nav className={styles.backNav}>
        <button onClick={() => navigate(backToTournament)}>
          ← Back to{" "}
          {tournament
            ? `${tournament.name} ${tournament.year}`
            : "Tournaments"}
        </button>
      </nav>

      {/* ================= TOURNAMENT ================= */}
      <header className={styles.tournamentHeader}>
        <h1>{match.tournament}</h1>
      </header>

      {/* ================= STATUS ================= */}
      <section className={styles.statusBar}>
        <span
          className={`${styles.status} ${
            styles[matchStatus]
          }`}
        >
          {matchStatus === "upcoming"
            ? "Upcoming"
            : matchStatus === "live"
            ? "Live"
            : "Final"}
        </span>
      </section>

      {/* ================= SCORE / VS ================= */}
      <section className={styles.vsSection}>
        <div className={styles.team}>
          <Flag country={home.country} size="large" />
          <span className={styles.teamName}>
            {home.name}
          </span>
        </div>

        {matchStatus === "final" && score ? (
          <div className={styles.scoreBlock}>
            <span className={styles.score}>
              {score.home}
            </span>
            <span className={styles.scoreDivider}>
              –
            </span>
            <span className={styles.score}>
              {score.away}
            </span>
          </div>
        ) : (
          <span className={styles.vs}>vs</span>
        )}

        <div className={styles.team}>
          <Flag country={away.country} size="large" />
          <span className={styles.teamName}>
            {away.name}
          </span>
        </div>
      </section>

      {/* ================= META ================= */}
      <section className={styles.meta}>
        <span>📅 {date}</span>

        {stadium ? (
          <button
            className={styles.venueLink}
            onClick={() =>
              navigate(`/stadium/${stadium.slug}`)
            }
          >
            🏟 {stadium.name}
          </button>
        ) : (
          <span>🏟 Venue TBC</span>
        )}

        <span>⏰ Kick-off TBC</span>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className={styles.timeline}>
        <h2>Match Timeline</h2>
        <ul className={styles.timelineList}>
          {timeline.map((event, idx) => (
            <li
              key={idx}
              className={styles.timelineItem}
            >
              <span className={styles.minute}>
                {event.minute}
              </span>
              <span className={styles.label}>
                {event.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= LINEUPS ================= */}
      <section className={styles.lineups}>
        <h2>Team Lineups</h2>

        <div className={styles.lineupGrid}>
          {[home, away].map((team, idx) => {
            const data =
              idx === 0
                ? demoLineups.home
                : demoLineups.away;

            return (
              <div
                key={team.name}
                className={styles.teamLineup}
              >
                <h3>{team.name}</h3>

                {/* STARTING XV */}
                <h4>Starting XV</h4>
                <ol className={styles.starting}>
                  {data.starting.map((p) => (
                    <li key={p.number}>
                      <span className={styles.number}>
                        {p.number}
                      </span>
                      <span className={styles.player}>
                        {p.name}
                      </span>
                      <span className={styles.position}>
                        {p.position}
                      </span>
                    </li>
                  ))}
                </ol>

                {/* RESERVES */}
                <h4>Reserves</h4>
                <ol className={styles.bench}>
                  {data.bench.map((p) => (
                    <li key={p.number}>
                      <span className={styles.number}>
                        {p.number}
                      </span>
                      <span className={styles.player}>
                        {p.name}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
