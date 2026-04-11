import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { anthemNations } from "../data/anthemNations";
import styles from "./NationalAnthemPage.module.css";
import AnthemPlayer from "../components/AnthemPlayer/AnthemPlayer";

export default function NationalAnthemPage() {
  const { nationId } = useParams<{ nationId: string }>();
  const navigate = useNavigate();

  const nation = anthemNations.find((n) => n.id === nationId);

  const [expanded, setExpanded] = useState(false);

  if (!nation) {
    return (
      <main className={styles.page}>
        <h2>Anthem not found</h2>
      </main>
    );
  }

  const accentColor = nation.colors[0];
  const haka = nation.anthem.haka;

  const renderLyrics = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();

      if (!trimmed) return <div key={i} className={styles.spacer} />;

      if (trimmed.startsWith("---") && trimmed.endsWith("---")) {
        return (
          <div key={i} className={styles.sectionDivider}>
            {trimmed.replace(/---/g, "").trim()}
          </div>
        );
      }

      return (
        <span key={i} className={styles.line}>
          {line}
        </span>
      );
    });
  };

  const displayedOriginal = expanded
  ? nation.anthem.lyrics.original
  : nation.anthem.lyrics.original.split("\n").slice(0, 12).join("\n");

const displayedEnglish = expanded
  ? nation.anthem.lyrics.english
  : nation.anthem.lyrics.english.split("\n").slice(0, 8).join("\n");

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

          <span className={styles.titleTextSecondary}>
            {nation.anthem.title}
          </span>
        </div>
      </header>

     {/* BACK BUTTON */}
<div className={styles.backWrapper}>
  <button
    className={styles.backButton}
    onClick={() => {
      const isFreemium = window.location.pathname.startsWith("/free");

      if (isFreemium) {
        navigate("/free/anthems");
      } else {
        navigate("/anthems");
      }
    }}
  >
    ← Back to All Anthems
  </button>
</div>

      {/* GRID */}
      <section className={styles.mainGrid}>
        {/* LEFT */}
        <aside className={styles.leftColumn}>
          <div
            className={styles.identityBlock}
            style={{ borderColor: accentColor }}
          >
            <h3>🏉 National Identity</h3>
            <p><strong>{nation.name}</strong></p>
            <p>{nation.anthem.title}</p>
          </div>

          <div className={styles.audioCard}>
            <AnthemPlayer
              src={nation.anthem.audioUrl || "/audio/neutral-anthem-test.mp3"}
              accentColor={accentColor}
            />
          </div>
        </aside>

        {/* RIGHT */}
        <article className={styles.rightColumn}>
          {/* LYRICS */}
          <section
            className={styles.contentSection}
            style={{ borderColor: accentColor }}
          >
            <div className={styles.sectionHeader}>
              📜 Lyrics
            </div>

           {/* ORIGINAL */}
<div className={styles.lyricsBlock}>
  {renderLyrics(displayedOriginal)}
</div>

{/* ENGLISH */}
{nation.anthem.lyrics.english && (
  <div className={styles.lyricsBlockSecondary}>
    {renderLyrics(displayedEnglish)}
  </div>
)}

            <button
              className={styles.expandButton}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse Lyrics" : "Expand Full Lyrics"}
            </button>
          </section>

          {/* HISTORY */}
          <section
            className={styles.contentSection}
            style={{ borderColor: accentColor }}
          >
            <div className={styles.sectionHeader}>
              📖 History & Rugby Context
            </div>

            <div className={styles.textBlock}>
              {nation.anthem.history.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* FACTS */}
          <section
            className={styles.contentSection}
            style={{ borderColor: accentColor }}
          >
            <div className={styles.sectionHeader}>
              💡 Key Facts
            </div>

            <ul className={styles.factsList}>
              {nation.anthem.facts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </section>

          {/* HAKA */}
          {haka && (
            <section
              className={styles.hakaSection}
              style={{ borderColor: accentColor }}
            >
              <div className={styles.sectionHeader}>
                🖤 Haka
              </div>

              <div className={styles.hakaBlock}>
                <h4>{haka.kaMate.title}</h4>
                <p>{haka.kaMate.description}</p>

                <div className={styles.lyricsBlock}>
                  {renderLyrics(haka.kaMate.original)}
                </div>

                <p className={styles.translation}>
                  {haka.kaMate.english}
                </p>
              </div>
            </section>
          )}
        </article>
      </section>
    </main>
  );
}