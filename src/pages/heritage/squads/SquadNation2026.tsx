import styles from "./SquadNation2026.module.css";

type Coach = {
  name: string;
  role: string;
  nationality: string;
  bio: string;
};

type Player = {
  name: string;
  position: string;
  club: string;
  caps?: number;
  captain?: boolean;
};

const coach: Coach = {
  name: "Andy Farrell",
  role: "Head Coach",
  nationality: "Ireland",
  bio: "A former international player turned elite coach, known for building high-performance cultures and disciplined, attacking teams.",
};

const forwards: Player[] = [
  { name: "Tadhg Furlong", position: "Prop", club: "Leinster", caps: 70 },
  { name: "Dan Sheehan", position: "Hooker", club: "Leinster", caps: 25 },
  { name: "Tadhg Beirne", position: "Lock", club: "Munster", caps: 50 },
  { name: "Peter O’Mahony", position: "Back Row", club: "Munster", caps: 95 },
];

const backs: Player[] = [
  { name: "Jamison Gibson-Park", position: "Scrum-half", club: "Leinster", caps: 35 },
  { name: "Johnny Sexton", position: "Fly-half", club: "Leinster", caps: 118, captain: true },
  { name: "Garry Ringrose", position: "Centre", club: "Leinster", caps: 55 },
  { name: "James Lowe", position: "Wing", club: "Leinster", caps: 30 },
];

export default function SquadNation2026() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Ireland · 2026 Squad</h1>
        <p>
          Official national squad selected for international competition during
          the 2026 season.
        </p>
      </section>

      {/* COACH */}
      <section className={styles.section}>
        <h2>Coaching Staff</h2>

        <div className={styles.coachCard}>
          <div className={styles.coachImage}>
            <span>{coach.name.split(" ")[0]}</span>
          </div>

          <div className={styles.coachInfo}>
            <h3>{coach.name}</h3>
            <span className={styles.coachMeta}>
              {coach.role} · {coach.nationality}
            </span>
            <p>{coach.bio}</p>
          </div>
        </div>
      </section>

      {/* SQUAD */}
      <section className={styles.section}>
        <h2>Playing Squad</h2>

        <div className={styles.squad}>
          {/* FORWARDS */}
          <div className={styles.group}>
            <h3>Forwards</h3>

            <ul className={styles.list}>
              {forwards.map((player) => (
                <li key={player.name} className={styles.player}>
                  <span className={styles.name}>{player.name}</span>
                  <span className={styles.meta}>
                    {player.position} · {player.club}
                    {player.caps !== undefined && ` · ${player.caps} caps`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* BACKS */}
          <div className={styles.group}>
            <h3>Backs</h3>

            <ul className={styles.list}>
              {backs.map((player) => (
                <li key={player.name} className={styles.player}>
                  <span className={styles.name}>
                    {player.name}
                    {player.captain && (
                      <span className={styles.captain}> (C)</span>
                    )}
                  </span>
                  <span className={styles.meta}>
                    {player.position} · {player.club}
                    {player.caps !== undefined && ` · ${player.caps} caps`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className={styles.sectionAlt}>
        <h2>Squad Notes</h2>
        <p>
          This squad reflects official tournament selection and may differ from
          matchday line-ups. Player availability and roles are subject to change
          in accordance with competition regulations.
        </p>
      </section>

      {/* INFO */}
      <section className={styles.section}>
        <h2>Editorial Notes</h2>
        <div className={styles.info}>
          <p>
            Squad data is presented for historical reference and fan insight.
          </p>
          <p>
            Updates are applied only following official announcements.
          </p>
        </div>
      </section>
    </div>
  );
}
