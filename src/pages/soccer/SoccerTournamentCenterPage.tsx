// src/pages/soccer/SoccerTournamentCenterPage.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "./SoccerTournamentCenterPage.module.css";

import AutoContentRail from "../../components/ui/AutoContentRail";
import HubCard from "../../components/homepage/HubCard";

import CalendarIcon from "../../components/icons/CalendarIcon";
import StarIcon from "../../components/icons/StarIcon";
import UsersIcon from "../../components/icons/UsersIcon";

import heroImage from "../../assets/soccer/heroes/calendar-hero.jpg";

import groupsImage from "../../assets/soccer/media/soccer-media-hero.jpg";
import knockoutImage from "../../assets/soccer/videos/classic-finals.jpg";
import matchesImage from "../../assets/soccer/heroes/calendar-hero.jpg";
import statsImage from "../../assets/soccer/news/worldcup-news.jpg";

import { matches } from "../../data/soccer/matches";
import { groups } from "../../data/soccer/groups";

import type {
  MatchPrediction,
  TeamPowerRanking,
  FinalPrediction,
} from "../../utils/soccer/predictionEngine";

import type {
  TeamMomentum,
} from "../../utils/soccer/momentumEngine";

import {
  getBiggestFavorites,
  getUpsetWatchMatches,
} from "../../utils/soccer/predictionEngine";

import {
  getCachedPowerRankings,
  getCachedTournamentFavorite,
  getCachedDarkHorseTeams,
  getCachedMostLikelyFinal,
} from "../../utils/soccer/predictionCache";

import {
  getHotTeams,
} from "../../utils/soccer/momentumEngine";

/* ======================================================
   TYPES
====================================================== */

interface MatchPredictionEntry {
  match: {
    id: string;

    home: string;

    away: string;
  };

  prediction: MatchPrediction;
}

/* ======================================================
   PAGE
====================================================== */

export default function SoccerTournamentCenterPage() {
  const navigate =
    useNavigate();

  const [
    rankings,
    setRankings,
  ] = useState<
    TeamPowerRanking[]
  >([]);

  const [
    tournamentFavorite,
    setTournamentFavorite,
  ] = useState<
    TeamPowerRanking | undefined
  >();

  const [
    darkHorses,
    setDarkHorses,
  ] = useState<
    TeamPowerRanking[]
  >([]);

  const [
    projectedFinal,
    setProjectedFinal,
  ] = useState<FinalPrediction>({
    home: "TBD",

    away: "TBD",

    confidence: 0,
  });

  const [
    biggestFavorites,
    setBiggestFavorites,
  ] = useState<
    MatchPredictionEntry[]
  >([]);

  const [
    upsetWatch,
    setUpsetWatch,
  ] = useState<
    MatchPredictionEntry[]
  >([]);

  const [
    hotTeams,
    setHotTeams,
  ] = useState<
    TeamMomentum[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* ======================================================
     LIVE MATCHES
  ====================================================== */

  const liveMatches =
    matches.filter(
      (match) =>
        match.status ===
        "live"
    );

  /* ======================================================
     LOAD DATA
  ====================================================== */

  useEffect(() => {
  async function load() {
    try {
      const [
        rankingsData,
        favoriteData,
        darkHorseData,
        finalData,
        favoritesData,
        upsetData,
        hotTeamsData,
      ] =
        await Promise.all([
          getCachedPowerRankings(),

          getCachedTournamentFavorite(),

          getCachedDarkHorseTeams(),

          getCachedMostLikelyFinal(),

          getBiggestFavorites(),

          getUpsetWatchMatches(),

          getHotTeams(5),
        ]);

      setRankings(
        rankingsData
      );

      setTournamentFavorite(
        favoriteData
      );

      setDarkHorses(
        darkHorseData
      );

      setProjectedFinal(
        finalData
      );

      setBiggestFavorites(
        favoritesData
      );

      setUpsetWatch(
        upsetData
      );

      setHotTeams(
        hotTeamsData
      );
    } catch (
      error
    ) {
      console.error(
        "Tournament center load failed:",
        error
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  load();
}, []);

  if (loading) {
    return (
      <main
        className={
          styles.page
        }
      >
        <div
          style={{
            padding:
              "80px 32px",

            textAlign:
              "center",

            fontSize:
              "1.2rem",

            fontWeight: 800,
          }}
        >
          Loading
          tournament
          intelligence...
        </div>
      </main>
    );
  }

  return (
    <main
      className={
        styles.page
      }
    >
      {/* HERO */}

      <section
        style={{
          position:
            "relative",

          minHeight:
            "72vh",

          display:
            "flex",

          alignItems:
            "flex-end",

          padding:
          "clamp(20px, 5vw, 56px)",

          overflow:
            "hidden",

          borderRadius:
            "0 0 38px 38px",

          backgroundImage: `url(${heroImage})`,

          backgroundSize:
            "cover",

          backgroundPosition:
            "center",

          color:
            "#ffffff",
        }}
      >
        <div
          style={{
            position:
              "absolute",

            inset: 0,

            background:
              "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.35))",
          }}
        />

        <div
          style={{
            position:
              "relative",

            zIndex: 2,

            maxWidth:
              "820px",
          }}
        >
          <div
            style={{
              display:
                "inline-flex",

              alignItems:
                "center",

              gap: "10px",

              padding:
                "10px 18px",

              borderRadius:
                "999px",

              background:
                "rgba(255,255,255,0.12)",

              marginBottom:
                "20px",

              fontWeight: 900,

              fontSize:
                "0.82rem",

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",
            }}
          >
            FIFA WORLD
            CUP 2026
          </div>

          <h1
            style={{
              fontSize:
              "clamp(2.4rem, 8vw, 5rem)",

              lineHeight:
                0.95,

              marginBottom:
                "20px",

              fontWeight: 900,
            }}
          >
            Tournament
            <br />
            Intelligence
            <br />
            Center
          </h1>

          <p
            style={{
              maxWidth:
                "720px",

              lineHeight:
                1.8,

              fontSize:
                "1.08rem",

              opacity: 0.92,
            }}
          >
            Live World
            Cup
            intelligence,
            power
            rankings,
            knockout
            projections,
            momentum
            tracking, AI
            predictions,
            tactical
            trends and
            tournament
            analytics
            across global
            football.
          </p>
        </div>
      </section>

      {/* BACK */}

      <div
  className={
    styles.backWrap
  }
>
        <button
          onClick={() =>
            navigate(
              "/soccer"
            )
          }
          style={{
            border:
              "none",

            background:
              "#111827",

            color:
              "#ffffff",

            padding:
              "12px 18px",

            borderRadius:
              "14px",

            fontWeight: 700,

            cursor:
              "pointer",
          }}
        >
          ← Back To
          Home
        </button>
      </div>

      {/* OVERVIEW */}

      <section
        style={{
          padding:
            "32px",

          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",

          gap: "18px",
        }}
      >
        <OverviewCard
          title="Tournament Favorite"
          value={
            tournamentFavorite?.team ||
            "N/A"
          }
        />

        <OverviewCard
          title="Projected Final"
          value={`${projectedFinal.home} vs ${projectedFinal.away}`}
        />

        <OverviewCard
          title="Live Matches"
          value={String(
            liveMatches.length
          )}
        />

        <OverviewCard
          title="Tracked Nations"
          value={String(
            rankings.length
          )}
        />
      </section>

      {/* NAVIGATION */}

      <section
        style={{
          padding:
            "0 32px 32px",
        }}
      >
        <SectionHeader
          title="🌍 Tournament Navigation"
          subtitle="Navigate every layer of the FIFA World Cup ecosystem."
        />

        <AutoContentRail>
          <HubCard
            title="World Cup Groups"
            image={
              groupsImage
            }
            to="/soccer/groups"
            features={[
              {
                label: `${groups.length} Groups`,

                icon:
                  <UsersIcon />,
              },

              {
                label:
                  "Standings & Fixtures",

                icon:
                  <CalendarIcon />,
              },
            ]}
          />

          <HubCard
            title="Knockout Stage"
            image={
              knockoutImage
            }
            to="/soccer/knockout"
            features={[
              {
                label:
                  "AI Projections",

                icon:
                  <StarIcon />,
              },

              {
                label:
                  "Bracket Engine",

                icon:
                  <CalendarIcon />,
              },
            ]}
          />

          <HubCard
            title="Match Center"
            image={
              matchesImage
            }
            to="/soccer/matches"
            features={[
              {
                label: `${matches.length} Matches`,

                icon:
                  <CalendarIcon />,
              },

              {
                label:
                  "Live Scores",

                icon:
                  <StarIcon />,
              },
            ]}
          />

          <HubCard
            title="Tournament Stats"
            image={
              statsImage
            }
            to="/soccer/stats"
            features={[
              {
                label:
                  "Team Rankings",

                icon:
                  <UsersIcon />,
              },

              {
                label:
                  "Player Analytics",

                icon:
                  <StarIcon />,
              },
            ]}
          />
        </AutoContentRail>
      </section>

      {/* POWER RANKINGS */}

      <section
        style={{
          padding:
            "0 32px 32px",
        }}
      >
        <SectionHeader
          title="🌎 Global Power Rankings"
          subtitle="AI-generated tournament strength ratings."
        />

        <div
          style={{
            display:
              "grid",

            gap: "16px",
          }}
        >
          {rankings
            .slice(0, 10)
            .map(
              (
                team,
                index
              ) => (
                <RankingCard
                  key={
                    team.team
                  }
                  rank={
                    index + 1
                  }
                  team={
                    team.team
                  }
                  rating={
                    team.rating
                  }
                  momentum={
                    team.momentum
                  }
                  projectedFinish={
                    team.projectedFinish
                  }
                />
              )
            )}
        </div>
      </section>

      {/* FAVORITE + FINAL */}

      <section
        style={{
          padding:
            "0 32px 32px",

          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(340px, 1fr))",

          gap: "22px",
        }}
      >
        <div
          style={darkPanel}
        >
          <SectionHeader
            title="🏆 Tournament Favorite"
            subtitle="Highest projected World Cup winner probability."
            
          />

          <div
            style={{
              fontSize:
                "2.6rem",

              fontWeight: 900,

              marginBottom:
                "14px",
            }}
          >
            {
              tournamentFavorite?.team
            }
          </div>

          <div
            style={{
              opacity: 0.75,
            }}
          >
            AI Rating:{" "}
            {
              tournamentFavorite?.rating
            }
          </div>
        </div>

        <div
          style={darkPanel}
        >
          <SectionHeader
            title="🔥 Projected Final"
            subtitle="Most likely championship matchup."
          
          />

          <div
            style={{
              fontSize:
                "2rem",

              fontWeight: 900,

              lineHeight:
                1.2,

              marginBottom:
                "16px",
            }}
          >
            {
              projectedFinal.home
            }

            <br />
            vs
            <br />

            {
              projectedFinal.away
            }
          </div>

          <div
            style={{
              opacity: 0.75,
            }}
          >
            Confidence:{" "}
            {
              projectedFinal.confidence
            }
            %
          </div>
        </div>
      </section>

      {/* DARK HORSES */}

      <section
        style={{
          padding:
            "0 32px 32px",
        }}
      >
        <SectionHeader
          title="🌟 Dark Horse Nations"
          subtitle="Teams capable of surprising the tournament."
        />

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",

            gap: "18px",
          }}
        >
          {darkHorses.map(
            (
              team
            ) => (
              <DarkHorseCard
                key={
                  team.team
                }
                team={
                  team.team
                }
                rating={
                  team.rating
                }
                finish={
                  team.projectedFinish
                }
              />
            )
          )}
        </div>
      </section>

      {/* HOT TEAMS */}

      <section
        style={{
          padding:
            "0 32px 32px",
        }}
      >
        <SectionHeader
          title="🔥 Hottest Teams"
          subtitle="Best momentum heading into knockout football."
        />

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",

            gap: "18px",
          }}
        >
          {hotTeams.map(
            (
              team
            ) => (
              <MomentumCard
                key={
                  team.nation
                }
                nation={
                  team.nation
                }
                trend={
                  team.trend
                }
                momentum={
                  team.momentumScore
                }
                overall={
                  team.overallRating
                }
              />
            )
          )}
        </div>
      </section>

      {/* FAVORITES */}

      <section
        style={{
          padding:
            "0 32px 48px",
        }}
      >
        <SectionHeader
          title="📈 Biggest Favorites"
          subtitle="Most one-sided projected matchups."
        />

        <div
          style={{
            display:
              "grid",

            gap: "16px",
          }}
        >
          {biggestFavorites.map(
            (
              entry
            ) => (
              <PredictionCard
                key={
                  entry.match.id
                }
                home={
                  entry.match.home
                }
                away={
                  entry.match.away
                }
                prediction={
                  entry.prediction
                }
              />
            )
          )}
        </div>
      </section>

      {/* UPSET WATCH */}

      <section
        style={{
          padding:
            "0 32px 48px",
        }}
      >
        <SectionHeader
          title="⚠️ Upset Watch"
          subtitle="High-risk matches with narrow prediction margins."
        />

        <div
          style={{
            display:
              "grid",

            gap: "16px",
          }}
        >
          {upsetWatch.map(
            (
              entry
            ) => (
              <PredictionCard
                key={
                  entry.match.id
                }
                home={
                  entry.match.home
                }
                away={
                  entry.match.away
                }
                prediction={
                  entry.prediction
                }
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   UI
====================================================== */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;

  subtitle: string;
}) {
  return (
    <div
      style={{
        marginBottom:
          "22px",
      }}
    >
      <h2
        className={
          styles.sectionTitle
        }
      >
        {title}
      </h2>

      <p
        className={
          styles.sectionSubtitle
        }
      >
        {subtitle}
      </p>
    </div>
  );
}

function OverviewCard({
  title,
  value,
}: {
  title: string;

  value: string;
}) {
  return (
    <div style={panel}>
      <div
        style={{
          color:
            "#6b7280",

          marginBottom:
            "12px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize:
            "2rem",

          fontWeight: 900,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function RankingCard({
  rank,
  team,
  rating,
  momentum,
  projectedFinish,
}: {
  rank: number;

  team: string;

  rating: number;

  momentum: number;

  projectedFinish: string;
}) {
  return (
    <div style={panel}>
      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          flexWrap:
            "wrap",

          gap: "14px",
        }}
      >
        <div>
          <div
            style={{
              fontSize:
                "0.82rem",

              color:
                "#6b7280",

              marginBottom:
                "6px",
            }}
          >
            Rank #
            {rank}
          </div>

          <div
            style={{
              fontSize:
                "1.4rem",

              fontWeight: 900,
            }}
          >
            {team}
          </div>
        </div>

        <div
          style={{
            textAlign:
              "right",
          }}
        >
          <div
            style={{
              fontWeight: 900,

              fontSize:
                "1.3rem",
            }}
          >
            {rating}
          </div>

          <div
            style={{
              color:
                "#6b7280",

              fontSize:
                "0.82rem",
            }}
          >
            Momentum{" "}
            {momentum}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop:
            "18px",

          display:
            "inline-flex",

          padding:
            "8px 14px",

          borderRadius:
            "999px",

          background:
            "#eff6ff",

          color:
            "#2563eb",

          fontWeight: 800,

          fontSize:
            "0.82rem",
        }}
      >
        {
          projectedFinish
        }
      </div>
    </div>
  );
}

function DarkHorseCard({
  team,
  rating,
  finish,
}: {
  team: string;

  rating: number;

  finish: string;
}) {
  return (
    <div style={panel}>
      <div
        style={{
          fontSize:
            "1.3rem",

          fontWeight: 900,

          marginBottom:
            "10px",
        }}
      >
        {team}
      </div>

      <div
        style={{
          color:
            "#6b7280",

          marginBottom:
            "16px",
        }}
      >
        Projected:{" "}
        {finish}
      </div>

      <div
        style={{
          fontSize:
            "2rem",

          fontWeight: 900,
        }}
      >
        {rating}
      </div>
    </div>
  );
}

function MomentumCard({
  nation,
  trend,
  momentum,
  overall,
}: {
  nation: string;

  trend: string;

  momentum: number;

  overall: number;
}) {
  return (
    <div style={panel}>
      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom:
            "18px",
        }}
      >
        <div
          style={{
            fontWeight: 900,

            fontSize:
              "1.2rem",
          }}
        >
          {nation}
        </div>

        <div
          style={{
            background:
              trend ===
              "HOT"
                ? "#dc2626"
                : trend ===
                  "RISING"
                ? "#2563eb"
                : "#6b7280",

            color:
              "#ffffff",

            padding:
              "6px 12px",

            borderRadius:
              "999px",

            fontSize:
              "0.75rem",

            fontWeight: 900,
          }}
        >
          {trend}
        </div>
      </div>

      <MiniRow
        label="Momentum"
        value={String(
          momentum
        )}
      />

      <MiniRow
        label="Overall Rating"
        value={String(
          overall
        )}
      />
    </div>
  );
}

function PredictionCard({
  home,
  away,
  prediction,
}: {
  home: string;

  away: string;

  prediction: MatchPrediction;
}) {
  return (
    <div style={panel}>
      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          flexWrap:
            "wrap",

          gap: "14px",

          marginBottom:
            "20px",
        }}
      >
        <div
          style={{
            fontSize:
              "1.3rem",

            fontWeight: 900,
          }}
        >
          {home} vs{" "}
          {away}
        </div>

        <div
          style={{
            padding:
              "8px 14px",

            borderRadius:
              "999px",

            background:
              "#111827",

            color:
              "#ffffff",

            fontWeight: 800,

            fontSize:
              "0.82rem",
          }}
        >
          Favorite:{" "}
          {
            prediction.favorite
          }
        </div>
      </div>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(120px, 1fr))",

          gap: "14px",
        }}
      >
        <MiniStat
          label="Home Win"
          value={`${prediction.homeWin}%`}
        />

        <MiniStat
          label="Draw"
          value={`${prediction.draw}%`}
        />

        <MiniStat
          label="Away Win"
          value={`${prediction.awayWin}%`}
        />

        <MiniStat
          label="Confidence"
          value={`${prediction.confidence}%`}
        />
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      style={{
        background:
          "rgba(243,244,246,0.9)",

        borderRadius:
          "16px",

        padding:
          "18px",
      }}
    >
      <div
        style={{
          color:
            "#6b7280",

          marginBottom:
            "8px",

          fontSize:
            "0.82rem",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: 900,

          fontSize:
            "1.1rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MiniRow({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      style={{
        display:
          "flex",

        justifyContent:
          "space-between",

        padding:
          "10px 0",

        borderBottom:
          "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>
    </div>
  );
}

/* ======================================================
   STYLES
====================================================== */

const panel = {
  background:
    "#ffffff",

  color:
    "#111827",

  borderRadius:
    "28px",

  padding: "28px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};

const darkPanel = {
  background:
    "linear-gradient(135deg, #111827, #1f2937)",

  color:
    "#ffffff",

  borderRadius:
    "28px",

  padding: "32px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.22)",
};