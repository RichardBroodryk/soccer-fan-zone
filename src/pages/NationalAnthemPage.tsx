import { useParams } from "react-router-dom";
import { anthemNations } from "../data/anthemNations";
import styles from "./NationalAnthemPage.module.css";

import AnthemPlayer from "../components/AnthemPlayer/AnthemPlayer";

const MASCOTS: Record<string, string> = {
  "south-africa": "Springboks",
  "new-zealand": "All Blacks",
  australia: "Wallabies",
  england: "Red Roses",
  wales: "Red Dragons",
  scotland: "Thistle",
  ireland: "Shamrock",
  france: "Les Bleus",
  italy: "Azzurri",
  japan: "Brave Blossoms",
  argentina: "Los Pumas",
  fiji: "Flying Fijians",
};

export default function NationalAnthemPage() {
  const { nationId } = useParams<{ nationId: string }>();
  const nation = anthemNations.find((n) => n.id === nationId);

  if (!nation) {
    return (
      <main className={styles.page}>
        <h2>Anthem not found</h2>
      </main>
    );
  }

  const accentColor = nation.colors[0];
  const mascot = MASCOTS[nation.id];
  const haka = nation.anthem.haka;

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titleText} style={{ color: accentColor }}>
            {nation.name}
          </span>

          <img
            src={`https://flagcdn.com/w160/${nation.code}.png`}
            alt={`${nation.name} flag`}
            className={styles.flag}
          />

          {mascot && (
            <span className={styles.titleText} style={{ color: accentColor }}>
              {mascot}
            </span>
          )}
        </div>

        <h2 className={styles.subtitle}>{nation.anthem.title}</h2>
      </header>

      {/* MAIN GRID */}
      <section className={styles.mainGrid}>
        {/* LEFT */}
        <aside className={styles.leftColumn}>
          <div
            className={styles.identityBlock}
            style={{ borderColor: accentColor }}
          >
            <h3>🏉 National Identity</h3>
            <ul>
              <li>
                <strong>Nation:</strong> {nation.name}
              </li>
              <li>
                <strong>Anthem:</strong> {nation.anthem.title}
              </li>
            </ul>
          </div>

          {/* PLAYER */}
          <div
            className={styles.audioPlaceholder}
            style={{ borderColor: accentColor }}
          >
            <AnthemPlayer
              src={
                nation.anthem.audioUrl ||
                "/audio/neutral-anthem-test.mp3"
              }
              accentColor={accentColor}
            />
          </div>
        </aside>

        {/* RIGHT */}
        <article className={styles.rightColumn}>
          {/* ORIGINAL */}
          <section
            className={styles.contentSection}
            style={{ borderColor: accentColor }}
          >
            <div
              className={styles.sectionHeader}
              style={{ backgroundColor: `${accentColor}14` }}
            >
              📜 Lyrics (Original)
            </div>
            <pre>{nation.anthem.lyrics.original}</pre>
          </section>

          {/* ENGLISH */}
          <section
            className={styles.contentSection}
            style={{ borderColor: accentColor }}
          >
            <div
              className={styles.sectionHeader}
              style={{ backgroundColor: `${accentColor}14` }}
            >
              🌍 English Translation
            </div>
            <pre>{nation.anthem.lyrics.english}</pre>
          </section>

          {/* HISTORY */}
          <section
            className={styles.contentSection}
            style={{ borderColor: accentColor }}
          >
            <div
              className={styles.sectionHeader}
              style={{ backgroundColor: `${accentColor}14` }}
            >
              📖 History
            </div>
            <p>{nation.anthem.history}</p>
          </section>

          {/* FACTS */}
          <section
            className={styles.contentSection}
            style={{ borderColor: accentColor }}
          >
            <div
              className={styles.sectionHeader}
              style={{ backgroundColor: `${accentColor}14` }}
            >
              💡 Key Facts
            </div>
            <ul>
              {nation.anthem.facts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </section>

          {/* 🖤 HAKA — ONLY IF EXISTS */}
          {haka && (
            <section
              className={styles.contentSection}
              style={{ borderColor: accentColor }}
            >
              <div
                className={styles.sectionHeader}
                style={{ backgroundColor: `${accentColor}14` }}
              >
                🖤 Haka
              </div>

              {/* KA MATE FIRST */}
              <div style={{ marginBottom: "24px" }}>
                <h4>{haka.kaMate.title}</h4>
                <p>{haka.kaMate.description}</p>

                <pre>{haka.kaMate.original}</pre>
                <p>{haka.kaMate.english}</p>
              </div>

              {/* KAPA O PANGO SECOND */}
              <div>
                <h4>{haka.kapaOPango.title}</h4>
                <p>{haka.kapaOPango.description}</p>

                <pre>{haka.kapaOPango.original}</pre>
                <p>{haka.kapaOPango.english}</p>
              </div>
            </section>
          )}
        </article>
      </section>
    </main>
  );
}