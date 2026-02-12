import styles from "./TacticalShifts.module.css";
import heroImage from "../../assets/images/moments/tactical.jpg";

export default function TacticalShifts() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={heroImage} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Tactical Revolutions</h1>
          <p>
            When ideas, not individuals,
            <br />
            redefined how rugby was played.
          </p>
        </div>
      </header>

      <nav className={styles.backNav}>
  <a href="/defining-moments">← Back to Defining Rugby Moments</a>
</nav>


      {/* ================= CONTENT ================= */}
      <section className={styles.content}>
        <article className={styles.block}>
          <h2>Ideas That Broke Patterns</h2>
          <p>
            Every era of rugby carries an underlying assumption about how
            the game should be played. Tactical revolutions occur when a
            team challenges those assumptions — and succeeds.
          </p>
          <p>
            These shifts are rarely loud at first. They appear as small
            adjustments: altered spacing, unusual kicking strategies,
            or a reimagined role for a familiar position.
          </p>
        </article>

        <article className={styles.block}>
          <h2>The Rise of Structure</h2>
          <p>
            Modern rugby is defined by organisation. Defensive lines
            operate with precision. Attack patterns are rehearsed and
            layered. Shape is maintained even under pressure.
          </p>
          <p>
            This evolution did not eliminate creativity — it reframed it.
            Individual brilliance now thrives inside collective systems.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Territory as a Weapon</h2>
          <p>
            At key moments in rugby history, territory overtook possession
            as the primary currency. Kicking strategies became more nuanced,
            pressuring opposition decision-making rather than simply gaining ground.
          </p>
          <p>
            These tactical recalibrations reshaped how teams controlled matches
            without dominating the ball.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Defence Driving Attack</h2>
          <p>
            Some of the most influential tactical shifts emerged from defence.
            Line speed, choke tackles, and counter-rucking transformed turnovers
            into attacking platforms.
          </p>
          <p>
            The boundary between defence and attack blurred — creating faster,
            more transitional rugby.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Why Tactical Revolutions Endure</h2>
          <p>
            Tactical ideas spread because they work. Once proven on the
            biggest stages, they are studied, copied, refined, and challenged.
          </p>
          <p>
            Rugby evolves through this cycle. Each revolution leaves a
            permanent imprint on the game that follows.
          </p>
        </article>
      </section>
    </main>
  );
}
