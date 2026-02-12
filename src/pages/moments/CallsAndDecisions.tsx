import styles from "./CallsAndDecisions.module.css";
import heroImage from "../../assets/images/moments/calls-decisions.jpg";

export default function CallsAndDecisions() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={heroImage} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Calls, Decisions & Controversies</h1>
          <p>
            When interpretation met consequence —
            <br />
            and moments were shaped beyond the players alone.
          </p>
        </div>
      </header>

      <nav className={styles.backNav}>
  <a href="/defining-moments">← Back to Defining Rugby Moments</a>
</nav>


      {/* ================= CONTENT ================= */}
      <section className={styles.content}>
        <article className={styles.block}>
          <h2>Moments of Authority</h2>
          <p>
            Rugby grants officials immense responsibility. In moments
            of uncertainty, decisions must be made instantly —
            without replay, without pause, and under extreme pressure.
          </p>
          <p>
            These moments are not side stories. They sit at the centre
            of the contest, carrying real and lasting consequences.
          </p>
        </article>

        <article className={styles.block}>
          <h2>The Thin Line of Interpretation</h2>
          <p>
            Laws define the framework of the game, but interpretation
            defines how it unfolds. What is penalised in one moment
            may be managed in another.
          </p>
          <p>
            This fluidity is not a flaw — it is the reality of a fast,
            physical, and complex sport.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Technology and Visibility</h2>
          <p>
            As officiating technology advanced, scrutiny intensified.
            Decisions once accepted instantly are now reviewed,
            debated, and archived indefinitely.
          </p>
          <p>
            This visibility changed not only officiating, but public
            perception of fairness and error.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Balance, Not Blame</h2>
          <p>
            The most enduring controversies are rarely about a single
            call. They emerge when pressure, interpretation, and timing
            intersect at critical moments.
          </p>
          <p>
            Understanding these decisions requires context —
            not accusation.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Why Decisions Shape History</h2>
          <p>
            Calls and decisions do not exist in isolation. They influence
            tactics, discipline, and future law interpretations.
          </p>
          <p>
            In this way, moments of officiating become part of rugby’s
            historical record — as consequential as any try or tackle.
          </p>
        </article>
      </section>
    </main>
  );
}
