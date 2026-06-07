// src/components/search/SearchResultRow.tsx

import { useNavigate } from "react-router-dom";

import {
  CalendarBlank,
  GlobeHemisphereWest,
  MapPin,
  SoccerBall,
  Trophy,
  Users,
} from "phosphor-react";

import styles from "./SearchResultRow.module.css";

import type {
  SearchEntity,
} from "../../data/soccer/searchIndex";

interface SearchResultRowProps {
  result: SearchEntity;

  onClose?: () => void;
}

export default function SearchResultRow({
  result,
  onClose,
}: SearchResultRowProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(result.route);

    onClose?.();
  };

  function getIcon() {
    switch (result.type) {
      case "team":
        return (
          <Users size={20} />
        );

      case "group":
        return (
          <Trophy size={20} />
        );

      case "stadium":
        return (
          <MapPin size={20} />
        );

      case "match":
        return (
          <SoccerBall size={20} />
        );

      case "player":
        return (
          <Users size={20} />
        );

      default:
        return (
          <GlobeHemisphereWest
            size={20}
          />
        );
    }
  }

  return (
    <button
      className={styles.row}
      onClick={handleClick}
    >
      {/* ICON */}

      <div className={styles.iconWrap}>
        {getIcon()}
      </div>

      {/* CONTENT */}

      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.title}>
            {result.title}
          </div>

          <div className={styles.type}>
            {result.type}
          </div>
        </div>

        {result.subtitle && (
          <div
            className={
              styles.subtitle
            }
          >
            <CalendarBlank
              size={14}
              weight="bold"
            />

            {result.subtitle}
          </div>
        )}
      </div>
    </button>
  );
}