import styles from "./OfficialsWomenEras.module.css";

export default function OfficialsWomenEras() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Women’s Match Officials — Eras</h1>
        <p>
          The development of match governance in the women’s game, reflecting
          growth, recognition, and professional standards at the international
          level.
        </p>
      </header>

      <section className={styles.eras}>
        <div className={styles.era}>
          <h2>Early Foundations</h2>
          <span className={styles.years}>Pre-2000</span>
          <p>
            Early women’s rugby relied on a small number of dedicated officials
            operating within emerging competitions, often without formal
            pathways or institutional support.
          </p>
        </div>

        <div className={styles.era}>
          <h2>Expansion & Recognition</h2>
          <span className={styles.years}>2000 – 2014</span>
          <p>
            As women’s international rugby expanded, officiating structures
            matured. Increased visibility and alignment with global laws
            elevated standards and consistency.
          </p>
        </div>

        <div className={styles.era}>
          <h2>Professional Era</h2>
          <span className={styles.years}>2015 – Present</span>
          <p>
            Defined by professional appointments, elite referee teams, and full
            integration of TMOs and assistant referees, this era reflects the
            modern stature of women’s rugby governance.
          </p>
        </div>
      </section>
    </main>
  );
}
