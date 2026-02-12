import React from "react";
import "./SolidLogo.css";

export const SolidLogo: React.FC<{ team: string; size?: string }> = ({
  team,
  size = "medium",
}) => {
  const fileName = team.toLowerCase().trim(); // ex: "new-zealand"

  let imageSrc;
  try {
    imageSrc = require(`../../assets/images/logos/solid/${fileName}.png`);
  } catch {
    try {
      imageSrc = require(`../../assets/images/logos/solid/${fileName}.jpg`);
    } catch {
      return (
        <div className={`solid-fallback solid-${size}`}>
          {team.substring(0, 2).toUpperCase()}
        </div>
      );
    }
  }

  return (
    <img
      src={imageSrc}
      alt={`${team} solid logo`}
      className={`solid-logo solid-${size}`}
    />
  );
};

export default SolidLogo;
