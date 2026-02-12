import React from "react";
import "./FeatherLogo.css";

export const FeatherLogo: React.FC<{ team: string; size?: string }> = ({
  team,
  size = "medium",
}) => {
  const fileName = team.toLowerCase().trim(); // ex: "south-africa"

  let imageSrc;
  try {
    imageSrc = require(`../../assets/images/logos/feathered/${fileName}.png`);
  } catch {
    try {
      imageSrc = require(`../../assets/images/logos/feathered/${fileName}.jpg`);
    } catch {
      return (
        <div className={`feather-fallback feather-${size}`}>
          {team.substring(0, 2).toUpperCase()}
        </div>
      );
    }
  }

  return (
    <img
      src={imageSrc}
      alt={`${team} feathered logo`}
      className={`feather-logo feather-${size}`}
    />
  );
};

export default FeatherLogo;
