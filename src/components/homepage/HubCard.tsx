import { ReactNode } from "react";

import {
  useNavigate,
} from "react-router-dom";

import styles from "./HubCard.module.css";

type HubCardProps = {
  title: string;

  image: string;

  to?: string;

  features: {
    label: string;
    icon: ReactNode;
  }[];

  live?: boolean;

  featured?: boolean;

  danger?: boolean;

  accent?: string;

  split?: boolean;
};

export default function HubCard({
  title,
  image,
  to,
  features,
  live = false,
  featured = false,
}: HubCardProps) {
  const navigate =
    useNavigate();

  const handleClick =
    () => {
      if (!to) return;

      navigate(to);
    };

  const isMatchCard =
    title.includes("vs");

  return (
    <section
      className={styles.hub}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();

        handleClick();
      }}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          e.preventDefault();

          handleClick();
        }
      }}
    >
      {/* BACKGROUND */}

      <div
        className={
          styles.background
        }
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* LIGHT OVERLAY */}

      <div
        className={
          styles.overlay
        }
      />

      {/* LIVE BADGE */}

      {live && (
        <div
          className={
            styles.liveBadge
          }
        >
          <span
            className={
              styles.liveDot
            }
          />

          LIVE
        </div>
      )}

      {/* FEATURED BADGE */}

      {featured && (
        <div
          className={
            styles.featuredBadge
          }
        >
          FEATURED
        </div>
      )}

      {/* MATCH LABEL */}

      {isMatchCard && (
        <div
          className={
            styles.matchLabel
          }
        >
          MATCHDAY
        </div>
      )}

      {/* CONTENT */}

      <div
        className={
          styles.content
        }
      >
        <h2
          className={
            styles.title
          }
        >
          {title}
        </h2>

        <div
          className={
            styles.features
          }
        >
          {features.map(
            (f, index) => (
              <span
                key={index}
                className={
                  styles.feature
                }
              >
                <span
                  className={
                    styles.icon
                  }
                >
                  {f.icon}
                </span>

                <span>
                  {f.label}
                </span>
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}