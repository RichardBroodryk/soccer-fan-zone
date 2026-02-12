import styles from "./WorldCupTurningPoints.module.css";
import heroImage from "../../assets/images/moments/wc-turning-point.png";

export default function WorldCupTurningPoints() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={heroImage} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>World Cup Turning Points</h1>
          <p>
            The moments that didn’t just decide matches —
            <br />
            they altered the direction of rugby history.
          </p>
        </div>
      </header>

      <nav className={styles.backNav}>
  <a href="/defining-moments">← Back to Defining Rugby Moments</a>
</nav>


      {/* ================= CONTENT ================= */}
      <section className={styles.content}>
        <article className={styles.block}>
          <h2>Moments That Shifted Eras</h2>
          <p>
            Rugby World Cups are remembered not by every scoreline,
            but by a handful of defining moments — a kick that drifted
            wide, a card shown at the wrong second, a decision that
            changed belief on one side and destiny on the other.
          </p>
          <p>
            These turning points did more than decide champions.
            They reshaped tactics, accelerated generational change,
            and altered how nations approached the game for years
            that followed.
          </p>
        </article>

        <article className={styles.block}>
          <h2>The Weight of a Single Decision</h2>
          <p>
            In World Cup rugby, margins shrink. The pressure magnifies.
            Referees, captains, and kickers are asked to act decisively
            while history waits.
          </p>
          <p>
            A penalty taken instead of a scrum. A substitution made
            five minutes too late. A moment of discipline lost.
            These are not footnotes — they are fault lines.
          </p>
        </article>

        <article className={styles.block}>
          <h2>From Shock to Legacy</h2>
          <p>
            Some moments arrive quietly and only gain meaning in
            hindsight. Others explode instantly — a try that silences
            a stadium, an upset that redraws the hierarchy of the game.
          </p>
          <p>
            What unites them is permanence. Once they happen,
            there is no reset. Tournaments pivot, narratives shift,
            and the sport moves forward on a different path.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Why Turning Points Matter</h2>
          <p>
            Understanding these moments explains more than results.
            It explains why certain teams evolved, why others declined,
            and why modern rugby looks the way it does today.
          </p>
          <p>
            World Cup turning points are not highlights —
            they are historical anchors.
          </p>
        </article>
      </section>
    </main>
  );
}
