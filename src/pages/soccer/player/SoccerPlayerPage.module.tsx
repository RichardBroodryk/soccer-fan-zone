import styles from "./player.module.css";

import {
  Lightning,
  ShieldCheck,
  Fire,
  User,
  GlobeHemisphereWest,
} from "phosphor-react";

/* ======================================================
   SECTION HEADER
   ====================================================== */

interface SectionHeaderProps {
  eyebrow?: string;

  title: string;

  text: string;

  icon?: React.ReactNode;

  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  icon,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      {eyebrow && (
        <div
          className={
            styles.sectionEyebrow
          }
          style={
            dark
              ? {
                  background:
                    "rgba(255,255,255,0.08)",

                  color:
                    "#ffffff",
                }
              : undefined
          }
        >
          {icon}

          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={
          styles.sectionTitle
        }
        style={
          dark
            ? {
                color:
                  "#ffffff",
              }
            : undefined
        }
      >
        {title}
      </h2>

      <p
        className={
          styles.sectionSubtext
        }
        style={
          dark
            ? {
                color:
                  "rgba(255,255,255,0.76)",
              }
            : undefined
        }
      >
        {text}
      </p>
    </div>
  );
}

/* ======================================================
   INFO CARD
   ====================================================== */

interface InfoCardProps {
  label: string;

  value: string;
}

export function IdentityCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <div
      style={{
        background:
          "#f8fafc",

        borderRadius:
          "24px",

        padding: "24px",

        border:
          "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div className={styles.infoLabel}>
        {label}
      </div>

      <div className={styles.infoValue}>
        {value}
      </div>
    </div>
  );
}

/* ======================================================
   PROFILE ITEM
   ====================================================== */

interface ProfileItemProps {
  label: string;

  value:
    | string
    | number;
}

export function ProfileItem({
  label,
  value,
}: ProfileItemProps) {
  return (
    <div
      style={{
        background:
          "#f8fafc",

        borderRadius:
          "22px",

        padding: "22px",

        border:
          "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div className={styles.infoLabel}>
        {label}
      </div>

      <div className={styles.infoValue}>
        {value}
      </div>
    </div>
  );
}

/* ======================================================
   FORM CARD
   ====================================================== */

interface FormCardProps {
  title: string;

  rating: string;

  impact: string;
}

export function FormCard({
  title,
  rating,
  impact,
}: FormCardProps) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.06)",

        borderRadius:
          "24px",

        padding: "24px",

        border:
          "1px solid rgba(255,255,255,0.08)",

        backdropFilter:
          "blur(12px)",
      }}
    >
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom:
            "14px",
        }}
      >
        <div
          style={{
            fontWeight: 900,
          }}
        >
          {title}
        </div>

        <div
          style={{
            padding:
              "6px 12px",

            borderRadius:
              "999px",

            background:
              "rgba(255,255,255,0.10)",

            fontWeight: 800,
          }}
        >
          ⭐ {rating}
        </div>
      </div>

      <div
        style={{
          color:
            "rgba(255,255,255,0.74)",

          lineHeight: 1.7,
        }}
      >
        {impact}
      </div>
    </div>
  );
}

/* ======================================================
   ICONS
   ====================================================== */

export const PlayerIcons = {
  identity: (
    <ShieldCheck
      size={16}
      weight="fill"
    />
  ),

  form: (
    <Fire
      size={16}
      weight="fill"
    />
  ),

  profile: (
    <User
      size={16}
      weight="fill"
    />
  ),

  squad: (
    <GlobeHemisphereWest
      size={16}
      weight="fill"
    />
  ),

  stats: (
    <Lightning
      size={16}
      weight="fill"
    />
  ),
};