import { useNavigate } from "react-router-dom";

import SoccerFlag from "./SoccerFlag";

interface SoccerTeamCardProps {
  id: string;

  name: string;

  coach: string;

  region: string;

  overall?: number;

  attack?: number;

  defense?: number;

  momentum?: number;
}

export default function SoccerTeamCard({
  id,
  name,
  coach,
  region,
  overall,
  attack,
  defense,
  momentum,
}: SoccerTeamCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate(
          `/soccer/teams/${id}`
        )
      }
      style={{
        border: "none",

        cursor: "pointer",

        textAlign: "left",

        width: "100%",

        background:
          "linear-gradient(135deg, #111827, #1f2937)",

        color: "#ffffff",

        borderRadius: "28px",

        padding: "28px",

        boxShadow:
          "0 10px 28px rgba(0,0,0,0.24)",

        transition:
          "transform 0.2s ease",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "16px",

          marginBottom: "24px",
        }}
      >
        <SoccerFlag
          nation={name}
          size={64}
        />

        <div>
          <div
            style={{
              fontSize:
                "1.4rem",

              fontWeight: 900,

              marginBottom:
                "6px",
            }}
          >
            {name}
          </div>

          <div
            style={{
              opacity: 0.75,
            }}
          >
            {region}
          </div>
        </div>
      </div>

      {/* COACH */}

      <div
        style={{
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            opacity: 0.65,

            fontSize: "0.82rem",

            marginBottom:
              "6px",
          }}
        >
          HEAD COACH
        </div>

        <div
          style={{
            fontWeight: 800,
          }}
        >
          {coach}
        </div>
      </div>

      {/* STATS */}

      {(overall ||
        attack ||
        defense ||
        momentum) && (
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(2, 1fr)",

            gap: "14px",
          }}
        >
          {overall !==
            undefined && (
            <MiniStat
              label="Overall"
              value={overall}
            />
          )}

          {momentum !==
            undefined && (
            <MiniStat
              label="Momentum"
              value={momentum}
            />
          )}

          {attack !==
            undefined && (
            <MiniStat
              label="Attack"
              value={attack}
            />
          )}

          {defense !==
            undefined && (
            <MiniStat
              label="Defense"
              value={defense}
            />
          )}
        </div>
      )}
    </button>
  );
}

/* ======================================================
   MINI STAT
   ====================================================== */

function MiniStat({
  label,
  value,
}: {
  label: string;

  value: number;
}) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.06)",

        borderRadius: "18px",

        padding: "14px",
      }}
    >
      <div
        style={{
          opacity: 0.65,

          fontSize: "0.78rem",

          marginBottom: "6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "1.2rem",

          fontWeight: 900,
        }}
      >
        {value}
      </div>
    </div>
  );
}