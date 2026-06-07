import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import styles from "./NationalAnthemPage.module.css";

import AppLayout from "../layouts/AppLayout";

import AnthemPlayer from "../components/AnthemPlayer/AnthemPlayer";

import { anthemNations } from "../data/anthems/anthemNations";

export default function NationalAnthemPage() {
  const { nationId } =
    useParams<{
      nationId: string;
    }>();

  const navigate =
    useNavigate();

  const nation =
    anthemNations.find(
      (n) =>
        n.id === nationId
    );

  const [expanded, setExpanded] =
    useState(false);

  function trackAnthemPlay() {
    const current =
      Number(
        localStorage.getItem(
          "sfz_anthems_played"
        )
      ) || 0;

    localStorage.setItem(
      "sfz_anthems_played",
      String(current + 1)
    );
  }

  if (!nation) {
    return (
      <AppLayout>
        <main
          className={styles.page}
        >
          <h2
            style={{
              color:
                "#111827",
            }}
          >
            Anthem not found
          </h2>
        </main>
      </AppLayout>
    );
  }

  const accentColor =
    nation.colors[0];

  const renderLyrics = (
    text: string
  ) => {
    return text
      .split("\n")
      .map((line, i) => {
        const trimmed =
          line.trim();

        if (!trimmed)
          return (
            <div
              key={i}
              className={
                styles.spacer
              }
            />
          );

        if (
          trimmed.startsWith(
            "---"
          ) &&
          trimmed.endsWith(
            "---"
          )
        ) {
          return (
            <div
              key={i}
              className={
                styles.sectionDivider
              }
            >
              {trimmed
                .replace(
                  /---/g,
                  ""
                )
                .trim()}
            </div>
          );
        }

        return (
          <span
            key={i}
            className={
              styles.line
            }
          >
            {line}
          </span>
        );
      });
  };

  const displayedOriginal =
    expanded
      ? nation.anthem
          .lyrics.original
      : nation.anthem.lyrics.original
          .split("\n")
          .slice(0, 12)
          .join("\n");

  const displayedEnglish =
    expanded
      ? nation.anthem
          .lyrics.english
      : nation.anthem.lyrics.english
          .split("\n")
          .slice(0, 8)
          .join("\n");

  return (
    <AppLayout>
      <main className={styles.page}>
        {/* HEADER */}

        <header
          className={
            styles.header
          }
        >
          <div
            className={
              styles.titleRow
            }
          >
            <span
              className={
                styles.titleText
              }
              style={{
                color:
                  accentColor,
              }}
            >
              {nation.name}
            </span>

            <img
              src={`https://flagcdn.com/w160/${nation.code}.png`}
              alt={`${nation.name} flag`}
              className={
                styles.flag
              }
            />

            <span
              className={
                styles.titleTextSecondary
              }
            >
              {
                nation.anthem
                  .title
              }
            </span>
          </div>
        </header>

        {/* BACK */}

        <div
          className={
            styles.backWrapper
          }
        >
          <button
            className={
              styles.backButton
            }
            onClick={() =>
              navigate(
                "/anthems"
              )
            }
          >
            ← Back to All
            Anthems
          </button>
        </div>

        {/* GRID */}

        <section
          className={
            styles.mainGrid
          }
        >
          {/* LEFT */}

          <aside
            className={
              styles.leftColumn
            }
          >
            <div
              className={
                styles.identityBlock
              }
              style={{
                borderColor:
                  accentColor,
              }}
            >
              <h3>
                ⚽ National
                Identity
              </h3>

              <p>
                <strong>
                  {
                    nation.name
                  }
                </strong>
              </p>

              <p>
                {
                  nation.anthem
                    .title
                }
              </p>
            </div>

            <div
              className={
                styles.audioCard
              }
            >
              <AnthemPlayer
                src={
                  nation.anthem
                    .audioUrl ||
                  "/audio/neutral-anthem-test.mp3"
                }
                accentColor={
                  accentColor
                }
                onPlay={
                  trackAnthemPlay
                }
              />
            </div>
          </aside>

          {/* RIGHT */}

          <article
            className={
              styles.rightColumn
            }
          >
            {/* LYRICS */}

            <section
              className={
                styles.contentSection
              }
              style={{
                borderColor:
                  accentColor,
              }}
            >
              <div
                className={
                  styles.sectionHeader
                }
              >
                📜 Lyrics
              </div>

              <div
                className={
                  styles.lyricsBlock
                }
              >
                {renderLyrics(
                  displayedOriginal
                )}
              </div>

              {nation.anthem
                .lyrics
                .english && (
                <div
                  className={
                    styles.lyricsBlockSecondary
                  }
                >
                  {renderLyrics(
                    displayedEnglish
                  )}
                </div>
              )}

              <button
                className={
                  styles.expandButton
                }
                onClick={() =>
                  setExpanded(
                    !expanded
                  )
                }
              >
                {expanded
                  ? "Collapse Lyrics"
                  : "Expand Full Lyrics"}
              </button>
            </section>

            {/* HISTORY */}

            <section
              className={
                styles.contentSection
              }
              style={{
                borderColor:
                  accentColor,
              }}
            >
              <div
                className={
                  styles.sectionHeader
                }
              >
                📖 History &
                Football Culture
              </div>

              <div
                className={
                  styles.textBlock
                }
              >
                {nation.anthem.history
                  .split("\n")
                  .map(
                    (p, i) => (
                      <p key={i}>
                        {p}
                      </p>
                    )
                  )}
              </div>
            </section>

            {/* FACTS */}

            <section
              className={
                styles.contentSection
              }
              style={{
                borderColor:
                  accentColor,
              }}
            >
              <div
                className={
                  styles.sectionHeader
                }
              >
                💡 Key Facts
              </div>

              <ul
                className={
                  styles.factsList
                }
              >
                {nation.anthem.facts.map(
                  (
                    fact,
                    i
                  ) => (
                    <li key={i}>
                      {fact}
                    </li>
                  )
                )}
              </ul>
            </section>
          </article>
        </section>
      </main>
    </AppLayout>
  );
}