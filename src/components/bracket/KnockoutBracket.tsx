// src/components/bracket/KnockoutBracket.tsx

import styles from "./KnockoutBracket.module.css";

import SoccerFlag from "../soccer/SoccerFlag";

/* ======================================================
   TYPES
   ====================================================== */

export interface BracketMatch {
  id: string;

  stage: string;

  date: string;

  home: string;

  away: string;

  homeScore?: number;

  awayScore?: number;

  stadium?: string;

  city?: string;

  winner?: string;
}

export interface BracketRound {
  title: string;

  matches: BracketMatch[];
}

interface KnockoutBracketProps {
  rounds: BracketRound[];
}

/* ======================================================
   COMPONENT
   ====================================================== */

export default function KnockoutBracket({
  rounds,
}: KnockoutBracketProps) {
  return (
    <div className={styles.bracket}>
      {rounds.map((round) => (
        <div
          key={round.title}
          className={styles.round}
        >
          <div
            className={
              styles.roundTitle
            }
          >
            {round.title}
          </div>

          <div
            className={
              styles.matches
            }
          >
            {round.matches.map(
              (match) => (
                <div
                  key={match.id}
                  className={
                    styles.matchCard
                  }
                  style={{
                    background:
                      "linear-gradient(180deg, #111827, #1f2937)",

                    color:
                      "#ffffff",

                    borderRadius:
                      "24px",

                    padding:
                      "20px",

                    boxShadow:
                      "0 10px 28px rgba(0,0,0,0.22)",
                  }}
                >
                  {/* META */}

                  <div
                    className={
                      styles.matchMeta
                    }
                    style={{
                      opacity: 0.7,

                      marginBottom:
                        "18px",
                    }}
                  >
                    {match.stage}
                  </div>

                  {/* HOME */}

                  <div
                    className={
                      styles.teamRow
                    }
                    style={{
                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "space-between",

                      gap: "14px",

                      marginBottom:
                        "14px",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap: "12px",
                      }}
                    >
                      <SoccerFlag
                        nation={
                          match.home
                        }
                        size={36}
                      />

                      <span>
                        {match.home}
                      </span>
                    </div>

                    <strong>
                      {match.homeScore ??
                        "-"}
                    </strong>
                  </div>

                  {/* AWAY */}

                  <div
                    className={
                      styles.teamRow
                    }
                    style={{
                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "space-between",

                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap: "12px",
                      }}
                    >
                      <SoccerFlag
                        nation={
                          match.away
                        }
                        size={36}
                      />

                      <span>
                        {match.away}
                      </span>
                    </div>

                    <strong>
                      {match.awayScore ??
                        "-"}
                    </strong>
                  </div>

                  {/* WINNER */}

                  {match.winner && (
                    <div
                      className={
                        styles.winner
                      }
                      style={{
                        marginTop:
                          "18px",

                        padding:
                          "10px 14px",

                        borderRadius:
                          "999px",

                        background:
                          "rgba(34,197,94,0.18)",

                        color:
                          "#86efac",

                        fontWeight: 900,

                        fontSize:
                          "0.82rem",

                        textAlign:
                          "center",
                      }}
                    >
                      Winner:{" "}
                      {
                        match.winner
                      }
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}