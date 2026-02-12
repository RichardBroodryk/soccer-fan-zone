import styles from "./GreatestHits.module.css";
import hitsHero from "../assets/images/raz/Hitsmainpage.png";

/* ================= TYPES ================= */

type HitTag =
  | "Collision"
  | "Try Saver"
  | "Game Changer"
  | "Momentum Shift"
  | "Silence the Crowd";

type HitItem = {
  id: number;
  title: string;
  tag: HitTag;
  duration: string;
  context?: string;
};

/* ================= DATA (IMPACT-FIRST) ================= */

const hitsNow: HitItem[] = [
  {
    id: 1,
    title: "Last-ditch tackle stops certain try",
    tag: "Try Saver",
    duration: "0:18",
    context: "Ireland vs France",
  },
  {
    id: 2,
    title: "Midfield collision flips momentum",
    tag: "Collision",
    duration: "0:12",
    context: "England vs South Africa",
  },
  {
    id: 3,
    title: "Turnover under pressure ignites crowd",
    tag: "Momentum Shift",
    duration: "0:20",
    context: "New Zealand vs Australia",
  },
];

const momentumShifters: HitItem[] = [
  {
    id: 4,
    title: "Defensive stand on the goal line",
    tag: "Game Changer",
    duration: "0:25",
    context: "World Cup Knockout",
  },
  {
    id: 5,
    title: "Breakdown steal changes territory",
    tag: "Momentum Shift",
    duration: "0:15",
    context: "Six Nations",
  },
];

const crowdMoments: HitItem[] = [
  {
    id: 6,
    title: "Stadium erupts after crunching hit",
    tag: "Collision",
    duration: "0:14",
  },
  {
    id: 7,
    title: "Away crowd silenced in one moment",
    tag: "Silence the Crowd",
    duration: "0:19",
  },
];

const stillHits: HitItem[] = [
  {
    id: 8,
    title: "Try-saving tackle remembered for decades",
    tag: "Try Saver",
    duration: "0:22",
  },
  {
    id: 9,
    title: "Momentum swing that defined a final",
    tag: "Game Changer",
    duration: "0:30",
  },
];

/* ================= PAGE ================= */

export default function GreatestHits() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={hitsHero} alt="" className={styles.heroImage} />

        <div className={styles.heroText}>
          <h1>Greatest Hits</h1>
          <p>
            The moments that make you stop,
            <br />
            react, and watch again.
          </p>
        </div>
      </header>

      {/* ================= RIGHT NOW ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Right Now</h2>

        <div className={styles.strip}>
          {hitsNow.map((hit) => (
            <div key={hit.id} className={styles.hitCard}>
              <div className={styles.thumbnail}>
                <span className={styles.duration}>{hit.duration}</span>
                <span className={styles.tag}>{hit.tag}</span>
              </div>

              <div className={styles.hitInfo}>
                <strong>{hit.title}</strong>
                {hit.context && (
                  <span className={styles.context}>{hit.context}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MOMENTUM SHIFTERS ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Momentum Shifters</h2>

        <div className={styles.grid}>
          {momentumShifters.map((hit) => (
            <div key={hit.id} className={styles.hitCardLarge}>
              <div className={styles.thumbnailLarge}>
                <span className={styles.duration}>{hit.duration}</span>
                <span className={styles.tag}>{hit.tag}</span>
              </div>

              <div className={styles.hitInfo}>
                <strong>{hit.title}</strong>
                {hit.context && (
                  <span className={styles.context}>{hit.context}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEEL IT ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Feel It</h2>

        <div className={styles.strip}>
          {crowdMoments.map((hit) => (
            <div key={hit.id} className={styles.hitCard}>
              <div className={styles.thumbnail}>
                <span className={styles.duration}>{hit.duration}</span>
                <span className={styles.tag}>{hit.tag}</span>
              </div>

              <div className={styles.hitInfo}>
                <strong>{hit.title}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STILL HITS ================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Still Hits</h2>

        <div className={styles.grid}>
          {stillHits.map((hit) => (
            <div key={hit.id} className={styles.hitCardLarge}>
              <div className={styles.thumbnailLarge}>
                <span className={styles.duration}>{hit.duration}</span>
                <span className={styles.tag}>{hit.tag}</span>
              </div>

              <div className={styles.hitInfo}>
                <strong>{hit.title}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
