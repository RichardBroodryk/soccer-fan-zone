import { stadiums } from "../data/stadiums";

function normalize(input: string) {
  return input.toLowerCase().trim();
}

export function getStadiumByName(name?: string) {
  if (!name) return null;

  const n = normalize(name);

  // 1. exact stadium name
  const exact = stadiums.find(
    (s) => normalize(s.name) === n
  );
  if (exact) return exact;

  // 2. city match (THIS FIXES YOUR DATASET)
  const byCity = stadiums.find(
    (s) => normalize(s.city || "") === n
  );
  if (byCity) return byCity;

  // 3. controlled mappings
  const map: Record<string, string> = {
    paris: "stade-de-france",
    london: "twickenham",
    cardiff: "principality-stadium",
    rome: "stadio-olimpico",
    dublin: "aviva-stadium",
    edinburgh: "murrayfield",
    grenoble: "stade-des-alpes",
  };

  const slug = map[n];
  if (slug) {
    return stadiums.find((s) => s.slug === slug) || null;
  }

  return null;
}