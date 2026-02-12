import styles from "./HeritageProfile.module.css";

export default function HeritageProfile() {
  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Full Name</h1>
        <p className={styles.subtitle}>
          Role / Discipline · Nation
        </p>
      </header>

      {/* META */}
      <section className={styles.meta}>
        <div>
          <span className={styles.label}>Era</span>
          <span>—</span>
        </div>

        <div>
          <span className={styles.label}>Active Years</span>
          <span>—</span>
        </div>

        <div>
          <span className={styles.label}>Primary Role</span>
          <span>—</span>
        </div>
      </section>

      {/* BIOGRAPHY */}
      <section className={styles.section}>
        <h2>Biography</h2>
        <p>
          This section provides an authoritative, editorial overview of the
          individual’s contribution to rugby. It focuses on influence,
          leadership, and historical significance rather than statistics or
          opinion.
        </p>
      </section>

      {/* HERITAGE SIGNIFICANCE */}
      <section className={styles.section}>
        <h2>Heritage Significance</h2>
        <p>
          This section explains why this individual belongs in the Heritage
          archive — contextualising their impact within the evolution of the
          game and the era in which they operated.
        </p>
      </section>

      {/* CONTEXTUAL NOTES */}
      <section className={styles.section}>
        <h2>Context</h2>
        <p>
          Where relevant, this section may include governance changes,
          competition formats, or structural factors that shaped the
          individual’s role and influence.
        </p>
      </section>
    </main>
  );
}
