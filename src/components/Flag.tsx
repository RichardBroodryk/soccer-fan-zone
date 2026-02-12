import "./Flag.css";

type FlagProps = {
  country: string;
  size?: "small" | "medium" | "large" | "xlarge";
};

export default function Flag({ country, size = "medium" }: FlagProps) {
  const fileName = country.toLowerCase().trim();

  const tryLoad = (ext: string) => {
    try {
      return require(`../assets/images/flags/${fileName}.${ext}`);
    } catch {
      return null;
    }
  };

  const flagImage =
    tryLoad("png") || tryLoad("jpg") || tryLoad("jpeg") || tryLoad("svg");

  if (!flagImage) {
    return (
      <div className={`flag-fallback flag-${size}`}>
        {country
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={flagImage}
      className={`flag flag-${size}`}
      alt={`${country} flag`}
      loading="lazy"
    />
  );
}

