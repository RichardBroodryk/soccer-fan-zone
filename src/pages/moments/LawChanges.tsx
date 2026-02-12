import styles from "./LawChanges.module.css";
import heroImage from "../../assets/images/moments/law-changes.jpg";

export default function LawChanges() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={heroImage} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Law Changes That Changed the Game</h1>
          <p>
            When a rule adjustment did more than tidy the margins —
            <br />
            it reshaped how rugby is played.
          </p>
        </div>
      </header>

      <nav className={styles.backNav}>
  <a href="/defining-moments">← Back to Defining Rugby Moments</a>
</nav>


      {/* ================= CONTENT ================= */}
      <section className={styles.content}>
        <article className={styles.block}>
          <h2>Law as a Lever</h2>
          <p>
            Rugby evolves not only through players and tactics, but
            through its laws. Small changes in wording, interpretation,
            or enforcement have repeatedly altered the balance between
            attack and defence.
          </p>
          <p>
            At their best, law changes clarify the game. At their most
            influential, they redefine it.
          </p>
        </article>

        <article className={styles.block}>
          <h2>The Breakdown Revolution</h2>
          <p>
            Few areas of the game have been shaped as profoundly as the
            breakdown. Adjustments around entry, contestability, and
            jackal rights have transformed tempo and continuity.
          </p>
          <p>
            Entire defensive systems emerged — and collapsed — based on
            how referees interpreted these moments.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Protecting the Player, Changing the Contest</h2>
          <p>
            Head contact frameworks and tackle height laws were introduced
            with safety as their priority, yet their ripple effects were
            tactical.
          </p>
          <p>
            Ball carriers adapted. Defenders lowered height. Attacking
            shapes widened. The modern game became faster, but also more
            precise.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Unintended Consequences</h2>
          <p>
            Not every law change landed cleanly. Some shifted incentives
            in unexpected ways, favouring territory over possession or
            reducing contest in open play.
          </p>
          <p>
            These moments remind us that rugby law is not static —
            it is a living framework, constantly refined by experience.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Why Law Changes Matter</h2>
          <p>
            To understand modern rugby, one must understand the laws
            that shaped it. They explain why certain skills dominate,
            why teams attack the way they do, and why eras feel distinct.
          </p>
          <p>
            Law changes are not technical footnotes.
            They are turning points.
          </p>
        </article>
      </section>
    </main>
  );
}
