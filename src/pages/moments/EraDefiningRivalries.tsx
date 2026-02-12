import styles from "./EraDefiningRivalries.module.css";
import heroImage from "../../assets/images/moments/era-rivalries.jpg";

export default function EraDefiningRivalries() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <img src={heroImage} alt="" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Era-Defining Rivalries</h1>
          <p>
            When opposition became identity,
            <br />
            and contests came to define generations.
          </p>
        </div>
      </header>

      <nav className={styles.backNav}>
  <a href="/defining-moments">← Back to Defining Rugby Moments</a>
</nav>


      {/* ================= CONTENT ================= */}
      <section className={styles.content}>
        <article className={styles.block}>
          <h2>More Than Fixtures</h2>
          <p>
            Rivalries in rugby are not created by scheduling alone.
            They emerge over time — shaped by history, geography,
            contrasting styles, and moments that refuse to fade.
          </p>
          <p>
            When two teams meet often enough, and with enough at stake,
            something deeper forms. Matches become reference points.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Pressure That Accumulates</h2>
          <p>
            Rivalries compress pressure. Players are judged not only on
            performance, but on memory — what happened last time,
            and the time before that.
          </p>
          <p>
            In these contests, form matters less than nerve.
            The smallest moments carry the greatest weight.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Styles in Conflict</h2>
          <p>
            Many defining rivalries are remembered as clashes of philosophy.
            Territory versus possession. Structure versus spontaneity.
            Physical dominance versus speed and precision.
          </p>
          <p>
            These contrasts elevated matches beyond results,
            turning them into statements about how rugby should be played.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Legacy Beyond Results</h2>
          <p>
            The most enduring rivalries outlast players, coaches,
            and even eras. New generations inherit the meaning,
            even as they create their own chapters.
          </p>
          <p>
            Rivalries endure because they carry memory —
            and memory gives sport its emotional depth.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Why Rivalries Define Eras</h2>
          <p>
            To trace the history of rugby, one can follow its rivalries.
            They mark shifts in power, changes in style,
            and the rise and fall of dynasties.
          </p>
          <p>
            Era-defining rivalries are not just remembered.
            They define how those eras are understood.
          </p>
        </article>
      </section>
    </main>
  );
}
