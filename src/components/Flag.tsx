import React from "react";
import "./Flag.css";

import { flagMap } from "../data/flagMap";

type FlagProps = {
  country: string;
  size?: "small" | "medium" | "large" | "xlarge";
};

const Flag: React.FC<FlagProps> = ({ country, size = "medium" }) => {
  if (!country) {
    return (
      <div className={`flag-fallback flag-${size}`}>
        ---
      </div>
    );
  }

  /* 🔒 NORMALIZE INPUT */
  const key = country.toLowerCase().trim();

  const imageSrc = flagMap[key];

  /* ❌ NO FLAG FOUND */
  if (!imageSrc) {
    return (
      <div className={`flag-fallback flag-${size}`}>
        {country.substring(0, 3).toUpperCase()}
      </div>
    );
  }

  /* ✅ SUCCESS */
  return (
    <img
      src={imageSrc}
      alt={`${country} flag`}
      className={`flag flag-${size}`}
    />
  );
};

export default Flag;