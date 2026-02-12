import styles from "./CulturalMoments.module.css";
import heroImage from "../../assets/images/moments/cultural.jpg";

export default function CulturalMoments() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={heroImage} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Cultural Moments Beyond the Scoreline</h1>
          <p>
            When rugby reflected society —
            <br />
            and moments mattered far beyond the result.
          </p>
        </div>
      </header>

      <nav className={styles.backNav}>
  <a href="/defining-moments">← Back to Defining Rugby Moments</a>
</nav>


      {/* ================= CONTENT ================= */}
      <section className={styles.content}>
        <article className={styles.block}>
          <h2>Rugby as a Mirror</h2>
          <p>
            Rugby has always existed within a wider world. At certain
            moments, the game transcended competition and became a
            reflection of cultural change, social tension, or national
            identity.
          </p>
          <p>
            These moments are remembered not for the scoreboard,
            but for what they represented beyond the field.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Unity, Protest, and Expression</h2>
          <p>
            From symbolic gestures to collective silence, rugby has
            repeatedly intersected with broader conversations about
            inclusion, respect, and unity.
          </p>
          <p>
            These moments often arrive quietly, but resonate long
            after the final whistle.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Nations and Identity</h2>
          <p>
            For many countries, rugby is more than a sport.
            It is a vessel for history, resilience, and belonging.
          </p>
          <p>
            Matches played under extraordinary circumstances —
            political change, recovery, or global attention —
            take on meaning that statistics cannot capture.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Moments That Changed Perception</h2>
          <p>
            Some cultural moments shifted how rugby was seen —
            who it was for, who it represented, and how it could
            evolve.
          </p>
          <p>
            These were not tactical revolutions or law changes.
            They were human turning points.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Why These Moments Endure</h2>
          <p>
            Cultural moments persist because they attach rugby
            to memory, emotion, and meaning.
          </p>
          <p>
            They remind us that the game’s value lies not only
            in competition, but in connection.
          </p>
        </article>
      </section>
    </main>
  );
}
