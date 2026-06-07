import styles from "./TacticalRoomPage.module.css";

import PageWrapper from "../../components/layout/PageWrapper";

import tacticalHero from "../../assets/soccer/heroes/tactical-room.jpg";

export default function TacticalRoomPage() {
  return (
    <PageWrapper
      imageUrl={tacticalHero}
    >
      <main
        className={
          styles.page
        }
      >
        {/* HERO */}

        <header
  className={
    styles.hero
  }
  style={{
    backgroundImage: `url(${tacticalHero})`,
  }}
>
  <div
    className={
      styles.heroOverlay
    }
  />

  <div
    className={
      styles.heroContent
    }
  >
    <div
      className={
        styles.heroBadge
      }
    >
      LIVE TACTICAL
      INTELLIGENCE
    </div>

    <h1>
      Tactical Room
    </h1>

    <p>
      Elite football
      analytics,
      momentum
      systems,
      tactical
      intelligence
      and live match
      control
      visualization.
    </p>
  </div>
</header>

{/* TACTICAL STATUS BAR */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.statusBar
    }
  >
    <StatusPill
      label="High Press Active"
    />

    <StatusPill
      label="Transition Speed: Rapid"
    />

    <StatusPill
      label="Defensive Shape: Compact"
    />

    <StatusPill
      label="xThreat Rising"
    />

    <StatusPill
      label="Live Analyst Feed"
    />
  </div>
</section>


        {/* TACTICAL NAV */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.tacticalNav
    }
  >
    {[
      "Overview",
      "Analytics",
      "Pressure",
      "Heatmap",
      "Formations",
      "Momentum",
    ].map((item) => (
      <button
        key={item}
        className={
          styles.tacticalNavButton
        }
      >
        {item}
      </button>
    ))}
  </div>
</section>

        {/* LIVE MATCH SELECTOR */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.liveMatchPanel
    }
  >
    <div
      className={
        styles.liveBadge
      }
    >
      LIVE
    </div>

    <div
      className={
        styles.liveTeams
      }
    >
      Argentina
      <span>
        2 — 1
      </span>
      France
    </div>

    <div
      className={
        styles.liveMeta
      }
    >
      72' • GLOBAL
      World Cup
      2026™
    </div>

    <div
      className={
        styles.liveStats
      }
    >
      <LiveStat
        label="xG"
        value="2.14 — 1.42"
      />

      <LiveStat
        label="Possession"
        value="61% — 39%"
      />

      <LiveStat
        label="Shots"
        value="14 — 8"
      />

      <LiveStat
        label="Pressing"
        value="High"
      />
    </div>
  </div>
</section>

        {/* MATCH CONTROL */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <h2>
              Match
              Control
              Center
            </h2>

            <p>
              Tactical
              flow,
              momentum
              and
              pressure
              analytics.
            </p>
          </div>

          <div
            className={
              styles.controlGrid
            }
          >
            <ControlCard
              label="Possession"
              value="61%"
              trend="+4%"
            />

            <ControlCard
              label="xG"
              value="2.31"
              trend="+0.8"
            />

            <ControlCard
              label="Pressing"
              value="High"
              trend="Aggressive"
            />

            <ControlCard
              label="Pass Accuracy"
              value="91%"
              trend="+6%"
            />
          </div>
        </section>

        {/* FORMATIONS */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <h2>
              Tactical
              Systems
            </h2>

            <p>
              Modern
              football
              structures
              and tactical
              identities.
            </p>
          </div>

          <div
            className={
              styles.formationGrid
            }
          >
            <FormationCard
              formation="4-3-3"
              title="Positional Play"
              description="Aggressive width, high pressing and midfield overloads."
            />

            <FormationCard
              formation="3-4-2-1"
              title="Transition Control"
              description="Wing-back dominance with compact defensive phases."
            />

            <FormationCard
              formation="4-2-3-1"
              title="Modern Balance"
              description="Structured buildup with flexible attacking rotations."
            />
          </div>
        </section>

        {/* TACTICAL IDENTITIES */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Tactical
      Identities
    </h2>

    <p>
      Elite football
      philosophies
      shaping the
      modern global
      game.
    </p>
  </div>

  <div
    className={
      styles.identityGrid
    }
  >
    <IdentityCard
      title="Gegenpress"
      level="Extreme"
      description="Immediate high-pressure transitions focused on rapid ball recovery."
    />

    <IdentityCard
      title="Positional Play"
      level="Elite"
      description="Structured spacing systems with overload creation and controlled progression."
    />

    <IdentityCard
      title="Low Block"
      level="Compact"
      description="Deep defensive organization with explosive transition opportunities."
    />

    <IdentityCard
      title="Wing Overload"
      level="Aggressive"
      description="Wide-channel dominance with numerical superiority in crossing zones."
    />
  </div>
</section>
{/* COACH INTELLIGENCE */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Coach
      Intelligence
    </h2>

    <p>
      Elite tactical
      philosophies
      and strategic
      coaching
      identities.
    </p>
  </div>

  <div
    className={
      styles.coachGrid
    }
  >
    <CoachCard
      coach="High Press Manager"
      philosophy="Aggressive Press"
      line="High Defensive Line"
      transition="Rapid Vertical"
    />

    <CoachCard
      coach="Possession Architect"
      philosophy="Positional Play"
      line="Structured Mid Block"
      transition="Controlled Build-up"
    />

    <CoachCard
      coach="Counter Specialist"
      philosophy="Transition Football"
      line="Compact Low Block"
      transition="Explosive Counter"
    />
  </div>
</section>
{/* ANALYST INSIGHT TERMINAL */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Analyst
      Insight
      Terminal
    </h2>

    <p>
      Live tactical
      observations,
      pressure
      alerts and
      football
      intelligence
      updates.
    </p>
  </div>

  <div
    className={
      styles.terminalPanel
    }
  >
    <TerminalLine
      type="ANALYST"
      text="Argentina creating overloads between midfield lines."
    />

    <TerminalLine
      type="DATA"
      text="Final-third recoveries increased by 18% after the tactical shift."
    />

    <TerminalLine
      type="PRESSURE"
      text="France defensive compactness dropping after sustained pressing."
    />

    <TerminalLine
      type="TRANSITION"
      text="Rapid wide progression creating isolation opportunities."
    />

    <TerminalLine
      type="CONTROL"
      text="Central occupation dominance now exceeding 61%."
    />
  </div>
</section>

{/* TACTICAL EVENT TIMELINE */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Tactical Event
      Timeline
    </h2>

    <p>
      Real-time
      momentum
      shifts,
      strategic
      changes and
      key match
      events.
    </p>
  </div>

  <div
    className={
      styles.timelinePanel
    }
  >
    <TimelineEvent
      minute="12'"
      title="High Press Trigger"
      description="Argentina initiates coordinated central press causing repeated midfield turnovers."
      type="press"
    />

    <TimelineEvent
      minute="28'"
      title="Formation Shift"
      description="France transitions into a narrower defensive block to contain overloads."
      type="formation"
    />

    <TimelineEvent
      minute="51'"
      title="Momentum Swing"
      description="Sustained attacking waves increase territorial dominance inside the final third."
      type="momentum"
    />

    <TimelineEvent
      minute="74'"
      title="Tactical Substitution"
      description="Fresh wide runners introduced to increase transition speed and width."
      type="sub"
    />
  </div>
</section>

{/* LIVE HEATMAP */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Live Heatmap
      Intelligence
    </h2>

    <p>
      Tactical
      occupation,
      pressure
      density and
      territorial
      dominance
      across key
      football
      sectors.
    </p>
  </div>

  <div
    className={
      styles.heatmapPanel
    }
  >
    <div
      className={
        styles.heatmapPitch
      }
    >
      <HeatZone
        top="12%"
        left="22%"
        intensity="high"
      />

      <HeatZone
        top="24%"
        left="62%"
        intensity="medium"
      />

      <HeatZone
        top="46%"
        left="48%"
        intensity="extreme"
      />

      <HeatZone
        top="68%"
        left="32%"
        intensity="medium"
      />

      <HeatZone
        top="74%"
        left="74%"
        intensity="high"
      />

      <HeatZone
        top="54%"
        left="82%"
        intensity="low"
      />
    </div>

    <div
      className={
        styles.heatmapLegend
      }
    >
      <LegendItem
        label="Extreme Pressure"
        type="extreme"
      />

      <LegendItem
        label="High Activity"
        type="high"
      />

      <LegendItem
        label="Moderate Control"
        type="medium"
      />

      <LegendItem
        label="Low Density"
        type="low"
      />
    </div>
  </div>
</section>

{/* MATCH MOMENTUM RADAR */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Match Momentum
      Radar
    </h2>

    <p>
      Real-time
      tactical
      dominance
      indicators and
      strategic
      pressure
      analysis.
    </p>
  </div>

  <div
    className={
      styles.radarGrid
    }
  >
    <RadarCard
      title="Possession"
      value="78%"
    />

    <RadarCard
      title="Press Intensity"
      value="91%"
    />

    <RadarCard
      title="Chance Quality"
      value="84%"
    />

    <RadarCard
      title="Transition Speed"
      value="87%"
    />

    <RadarCard
      title="Defensive Shape"
      value="81%"
    />

    <RadarCard
      title="Final Third Control"
      value="93%"
    />
  </div>
</section>

{/* LIVE FORMATION BOARD */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Live Formation
      Board
    </h2>

    <p>
      Real-time
      tactical
      structure and
      positional
      occupation
      across modern
      football
      systems.
    </p>
  </div>

  <div
    className={
      styles.boardPanel
    }
  >
    <div
      className={
        styles.boardPitch
      }
    >
      {/* STRIKER */}

      <PlayerNode
        top="10%"
        left="50%"
        label="ST"
      />

      {/* ATTACKING */}

      <PlayerNode
        top="26%"
        left="22%"
        label="LW"
      />

      <PlayerNode
        top="26%"
        left="50%"
        label="CAM"
      />

      <PlayerNode
        top="26%"
        left="78%"
        label="RW"
      />

      {/* MIDFIELD */}

      <PlayerNode
        top="48%"
        left="35%"
        label="CM"
      />

      <PlayerNode
        top="48%"
        left="65%"
        label="CM"
      />

      {/* DEFENSE */}

      <PlayerNode
        top="72%"
        left="15%"
        label="LB"
      />

      <PlayerNode
        top="72%"
        left="38%"
        label="CB"
      />

      <PlayerNode
        top="72%"
        left="62%"
        label="CB"
      />

      <PlayerNode
        top="72%"
        left="85%"
        label="RB"
      />

      {/* GK */}

      <PlayerNode
        top="90%"
        left="50%"
        label="GK"
      />
    </div>
  </div>
</section>

{/* MATCH ZONE CONTROL */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Match Zone
      Control
    </h2>

    <p>
      Territorial
      dominance,
      tactical
      occupation and
      pressure
      distribution
      across key
      football zones.
    </p>
  </div>

  <div
    className={
      styles.zonePanel
    }
  >
    <div
      className={
        styles.pitch
      }
    >
      <div
        className={
          styles.pitchOverlay
        }
      />

      <div
        className={
          styles.zoneGrid
        }
      >
        <ZoneCard
          title="Left Wing"
          value="78%"
        />

        <ZoneCard
          title="Half Space"
          value="84%"
        />

        <ZoneCard
          title="Central Press"
          value="91%"
        />

        <ZoneCard
          title="Right Overload"
          value="73%"
        />

        <ZoneCard
          title="Final Third"
          value="88%"
        />

        <ZoneCard
          title="Transition Lane"
          value="81%"
        />
      </div>
    </div>
  </div>
</section>

{/* TACTICAL ANALYTICS */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Tactical
      Analytics
    </h2>

    <p>
      Advanced
      football
      intelligence
      metrics and
      strategic
      performance
      indicators.
    </p>
  </div>

  <div
    className={
      styles.analyticsGrid
    }
  >
    <AnalyticsCard
      title="Press Resistance"
      value="92"
      label="Elite"
    />

    <AnalyticsCard
      title="Vertical Progression"
      value="87"
      label="Aggressive"
    />

    <AnalyticsCard
      title="Compactness"
      value="81"
      label="Structured"
    />

    <AnalyticsCard
      title="Chance Creation"
      value="95"
      label="World Class"
    />

    <AnalyticsCard
      title="Transition Speed"
      value="89"
      label="Rapid"
    />

    <AnalyticsCard
      title="Final Third Control"
      value="84"
      label="Dominant"
    />
  </div>
</section>

{/* LIVE PRESSURE MAP */}

<section
  className={
    styles.section
  }
>
  <div
    className={
      styles.sectionHeader
    }
  >
    <h2>
      Live Pressure
      Map
    </h2>

    <p>
      Tactical
      dominance,
      pressure
      swings and
      attacking
      control phases
      during elite
      match flow.
    </p>
  </div>

  <div
    className={
      styles.pressurePanel
    }
  >
    <PressureRow
      minute="12'"
      team="Argentina"
      level={82}
      state="High Press"
    />

    <PressureRow
      minute="27'"
      team="France"
      level={64}
      state="Controlled Build-up"
    />

    <PressureRow
      minute="51'"
      team="Brazil"
      level={91}
      state="Final Third Siege"
    />

    <PressureRow
      minute="74'"
      team="Spain"
      level={72}
      state="Positional Dominance"
    />
  </div>
</section>

        {/* MOMENTUM */}

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.momentumPanel
            }
          >
            <div
              className={
                styles.sectionHeader
              }
            >
              <h2>
                Momentum
                Engine
              </h2>

              <p>
                Live
                tactical
                pressure
                shifts and
                match-flow
                intelligence.
              </p>
            </div>

            <div
              className={
                styles.timeline
              }
            >
             <TimelineEvent
  minute="18'"
  title="Press Trigger Activated"
  description="Aggressive coordinated pressing disrupts central buildup patterns."
  type="press"
/>

              <TimelineEvent
  minute="36'"
  title="Midfield Overload Phase"
  description="Central occupation increases passing superiority between the lines."
  type="formation"
/>

              <TimelineEvent
  minute="58'"
  title="Momentum Swing"
  description="Sustained attacking sequences shift territorial control dramatically."
  type="momentum"
/>

              <TimelineEvent
  minute="74'"
  title="Tactical Substitution"
  description="Fresh attacking width introduced to increase transition intensity."
  type="sub"
/>
            </div>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}

/* ======================================================
   HELPERS
   ====================================================== */

type TerminalLineProps =
  {
    type: string;

    text: string;
  };

function TerminalLine({
  type,
  text,
}: TerminalLineProps) {
  return (
    <div
      className={
        styles.terminalLine
      }
    >
      <span
        className={
          styles.terminalType
        }
      >
        [{type}]
      </span>

      <span
        className={
          styles.terminalText
        }
      >
        {text}
      </span>
    </div>
  );
}

type StatusPillProps =
  {
    label: string;
  };

function StatusPill({
  label,
}: StatusPillProps) {
  return (
    <div
      className={
        styles.statusPill
      }
    >
      <span
        className={
          styles.statusPulse
        }
      />

      {label}
    </div>
  );
}

type LiveStatProps =
  {
    label: string;

    value: string;
  };

function LiveStat({
  label,
  value,
}: LiveStatProps) {
  return (
    <div
      className={
        styles.liveStat
      }
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

type ControlCardProps =
  {
    label: string;

    value: string;

    trend: string;
  };

function ControlCard({
  label,
  value,
  trend,
}: ControlCardProps) {
  return (
    <div
      className={
        styles.controlCard
      }
    >
      <div
        className={
          styles.controlLabel
        }
      >
        {label}
      </div>

      <div
        className={
          styles.controlValue
        }
      >
        {value}
      </div>

      <div
        className={
          styles.controlTrend
        }
      >
        {trend}
      </div>
    </div>
  );
}

type FormationCardProps =
  {
    formation: string;

    title: string;

    description: string;
  };

function FormationCard({
  formation,
  title,
  description,
}: FormationCardProps) {
  return (
    <div
      className={
        styles.formationCard
      }
    >
      <div
        className={
          styles.formationShape
        }
      >
        {formation}
      </div>

      <h3>{title}</h3>

      <p>
        {description}
      </p>
    </div>
  );
}
type TimelineEventProps =
  {
    minute: string;

    title: string;

    description: string;

    type:
      | "press"
      | "formation"
      | "momentum"
      | "sub";
  };

function TimelineEvent({
  minute,
  title,
  description,
  type,
}: TimelineEventProps) {
  return (
    <div
      className={
        styles.timelineEvent
      }
    >
      <div
        className={`${styles.timelineDot} ${styles[type]}`}
      />

      <div
        className={
          styles.timelineMinute
        }
      >
        {minute}
      </div>

      <div
        className={
          styles.timelineContent
        }
      >
        <h3>
          {title}
        </h3>

        <p>
          {
            description
          }
        </p>
      </div>
    </div>
  );
}

type HeatZoneProps =
  {
    top: string;

    left: string;

    intensity:
      | "extreme"
      | "high"
      | "medium"
      | "low";
  };

function HeatZone({
  top,
  left,
  intensity,
}: HeatZoneProps) {
  return (
    <div
      className={`${styles.heatZone} ${styles[intensity]}`}
      style={{
        top,
        left,
      }}
    />
  );
}

type LegendItemProps =
  {
    label: string;

    type:
      | "extreme"
      | "high"
      | "medium"
      | "low";
  };

function LegendItem({
  label,
  type,
}: LegendItemProps) {
  return (
    <div
      className={
        styles.legendItem
      }
    >
      <div
        className={`${styles.legendDot} ${styles[type]}`}
      />

      <span>
        {label}
      </span>
    </div>
  );
}

type RadarCardProps =
  {
    title: string;

    value: string;
  };

function RadarCard({
  title,
  value,
}: RadarCardProps) {
  return (
    <div
      className={
        styles.radarCard
      }
    >
      <div
        className={
          styles.radarCircle
        }
      >
        <span>
          {value}
        </span>
      </div>

      <div
        className={
          styles.radarTitle
        }
      >
        {title}
      </div>
    </div>
  );
}

type PlayerNodeProps =
  {
    top: string;

    left: string;

    label: string;
  };

function PlayerNode({
  top,
  left,
  label,
}: PlayerNodeProps) {
  return (
    <div
      className={
        styles.playerNode
      }
      style={{
        top,
        left,
      }}
    >
      {label}
    </div>
  );
}

type ZoneCardProps =
  {
    title: string;

    value: string;
  };

function ZoneCard({
  title,
  value,
}: ZoneCardProps) {
  return (
    <div
      className={
        styles.zoneCard
      }
    >
      <div
        className={
          styles.zoneTitle
        }
      >
        {title}
      </div>

      <div
        className={
          styles.zoneValue
        }
      >
        {value}
      </div>
    </div>
  );
}

type AnalyticsCardProps =
  {
    title: string;

    value: string;

    label: string;
  };

function AnalyticsCard({
  title,
  value,
  label,
}: AnalyticsCardProps) {
  return (
    <div
      className={
        styles.analyticsCard
      }
    >
      <div
        className={
          styles.analyticsLabel
        }
      >
        {title}
      </div>

      <div
        className={
          styles.analyticsValue
        }
      >
        {value}
      </div>

      <div
        className={
          styles.analyticsTag
        }
      >
        {label}
      </div>
    </div>
  );
}

type PressureRowProps =
  {
    minute: string;

    team: string;

    level: number;

    state: string;
  };

function PressureRow({
  minute,
  team,
  level,
  state,
}: PressureRowProps) {
  return (
    <div
      className={
        styles.pressureRow
      }
    >
      <div
        className={
          styles.pressureMeta
        }
      >
        <div
          className={
            styles.pressureMinute
          }
        >
          {minute}
        </div>

        <div>
          <div
            className={
              styles.pressureTeam
            }
          >
            {team}
          </div>

          <div
            className={
              styles.pressureState
            }
          >
            {state}
          </div>
        </div>
      </div>

      <div
        className={
          styles.pressureBar
        }
      >
        <div
          className={
            styles.pressureFill
          }
          style={{
            width: `${level}%`,
          }}
        />
      </div>

      <div
        className={
          styles.pressureValue
        }
      >
        {level}%
      </div>
    </div>
  );
}

type CoachCardProps =
  {
    coach: string;

    philosophy: string;

    line: string;

    transition: string;
  };

function CoachCard({
  coach,
  philosophy,
  line,
  transition,
}: CoachCardProps) {
  return (
    <div
      className={
        styles.coachCard
      }
    >
      <div
        className={
          styles.coachHeader
        }
      >
        <div
          className={
            styles.coachAvatar
          }
        >
          CI
        </div>

        <div>
          <h3
            className={
              styles.coachName
            }
          >
            {coach}
          </h3>

          <p
            className={
              styles.coachRole
            }
          >
            Tactical
            Profile
          </p>
        </div>
      </div>

      <div
        className={
          styles.coachStats
        }
      >
        <CoachStat
          label="Philosophy"
          value={
            philosophy
          }
        />

        <CoachStat
          label="Defensive Line"
          value={line}
        />

        <CoachStat
          label="Transition"
          value={
            transition
          }
        />
      </div>
    </div>
  );
}

type CoachStatProps =
  {
    label: string;

    value: string;
  };

function CoachStat({
  label,
  value,
}: CoachStatProps) {
  return (
    <div
      className={
        styles.coachStat
      }
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

type IdentityCardProps =
  {
    title: string;

    level: string;

    description: string;
  };

function IdentityCard({
  title,
  level,
  description,
}: IdentityCardProps) {
  return (
    <div
      className={
        styles.identityCard
      }
    >
      <div
        className={
          styles.identityLevel
        }
      >
        {level}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>
    </div>
  );
}