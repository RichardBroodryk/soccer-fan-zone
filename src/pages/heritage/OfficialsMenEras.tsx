import styles from "./OfficialsMenEras.module.css";

export default function OfficialsMenEras() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Men’s Match Officials — Eras</h1>
        <p>
          The evolution of match governance in the men’s game, shaped by
          changing laws, interpretations, and the professionalisation of rugby.
        </p>
      </header>

      <section className={styles.eras}>
        <div className={styles.era}>
          <h2>Foundational Era</h2>
          <span className={styles.years}>Pre-1995</span>
          <p>
            An era defined by amateur rugby, gentleman governance, and the early
            codification of laws. Officials were authoritative custodians of
            fairness, often balancing tradition with evolving interpretation.
          </p>
        </div>

        <div className={styles.era}>
          <h2>Professional Transition</h2>
          <span className={styles.years}>1995 – 2009</span>
          <p>
            The advent of professionalism transformed officiating. Increased
            scrutiny, fitness demands, and law clarification placed officials at
            the centre of the modern game’s evolution.
          </p>
        </div>

        <div className={styles.era}>
          <h2>Modern Governance</h2>
          <span className={styles.years}>2010 – Present</span>
          <p>
            Characterised by structured referee teams, assistant referees, TMOs,
            and global alignment on interpretation, this era reflects rugby’s
            most systematised form of match governance.
          </p>
        </div>
      </section>
    </main>
  );
}
