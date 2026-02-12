import React from "react";
import "./Flag.css";

// Country names MUST match your folder structure exactly.
export const Flag: React.FC<{ country: string; size?: string }> = ({
  country,
  size = "medium",
}) => {
  const fileName = country.toLowerCase().trim(); // ex: "south-africa"

  let imageSrc;
  try {
    imageSrc = require(`../../assets/images/flags/${fileName}.png`);
  } catch {
    try {
      imageSrc = require(`../../assets/images/flags/${fileName}.jpg`);
    } catch {
      return (
        <div className={`flag-fallback flag-${size}`}>
          {country.substring(0, 3).toUpperCase()}
        </div>
      );
    }
  }

  return <img src={imageSrc} alt={`${country} flag`} className={`flag flag-${size}`} />;
};

export default Flag;
