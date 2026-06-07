// src/data/soccer/stadiumIntelligence.ts

export type StadiumIntelligence = {
  stadiumId: string;

  roof:
    | "Open"
    | "Closed"
    | "Retractable";

  pitch:
    | "Natural Grass"
    | "Hybrid Grass";

  atmosphereScore: number;

  fanIntensity:
    | "Elite"
    | "High"
    | "Strong";

  climate: string;

  altitude?: number;

  travelRating: number;

  noiseLevel: number;

  prestigeLevel: number;

  matchdayProfile: string;

  arrivalTip: string;

  skylineRating: number;

  premiumLevel:
    | "Elite"
    | "Premium"
    | "Modern";
    crowdPressure: number;

nightAtmosphere: number;

tacticalIntensity: number;

fanChoreography: number;
};

export const stadiumIntelligence: Record<
  string,
  StadiumIntelligence
> = {
  "estadio-azteca": {
    stadiumId:
      "estadio-azteca",

    roof: "Open",

    pitch:
      "Natural Grass",

    atmosphereScore:
      9.9,

    fanIntensity:
      "Elite",

    climate:
      "High altitude warmth",

    altitude:
      2240,

    travelRating:
      8.8,

    noiseLevel:
      9.8,

    prestigeLevel:
      10,

    skylineRating:
      9.1,

    premiumLevel:
      "Elite",
      crowdPressure:
  9.8,

nightAtmosphere:
  9.5,

tacticalIntensity:
  9.2,

fanChoreography:
  9.7,

    matchdayProfile:
      "Historic football cathedral with unmatched World Cup energy and legendary atmosphere.",

    arrivalTip:
      "Arrive early due to intense matchday congestion around Mexico City.",
  },

  "metlife-stadium": {
    stadiumId:
      "metlife-stadium",

    roof:
      "Open",

    pitch:
      "Hybrid Grass",

    atmosphereScore:
      9.5,

    fanIntensity:
      "Elite",

    climate:
      "Humid summer conditions",

    travelRating:
      9.6,

    noiseLevel:
      9.4,

    prestigeLevel:
      10,

    skylineRating:
      10,

    premiumLevel:
      "Elite",
      crowdPressure:
  9.8,

nightAtmosphere:
  9.5,

tacticalIntensity:
  9.2,

fanChoreography:
  9.7,

    matchdayProfile:
      "Global showcase venue expected to host the FIFA World Cup 2026 Final.",

    arrivalTip:
      "Use early rail connections from Manhattan to avoid severe post-match congestion.",
  },

  "sofi-stadium": {
    stadiumId:
      "sofi-stadium",

    roof:
      "Closed",

    pitch:
      "Hybrid Grass",

    atmosphereScore:
      9.3,

    fanIntensity:
      "High",

    climate:
      "Warm coastal evenings",

    travelRating:
      9.2,

    noiseLevel:
      9.1,

    prestigeLevel:
      9.7,

    skylineRating:
      9.4,

    premiumLevel:
      "Elite",
      crowdPressure:
  9.8,

nightAtmosphere:
  9.5,

tacticalIntensity:
  9.2,

fanChoreography:
  9.7,

    matchdayProfile:
      "Ultra-modern entertainment venue with elite hospitality experiences.",

    arrivalTip:
      "Traffic around Inglewood builds rapidly before kickoff.",
  },

  "mercedes-benz-stadium":
    {
      stadiumId:
        "mercedes-benz-stadium",

      roof:
        "Retractable",

      pitch:
        "Hybrid Grass",

      atmosphereScore:
        9.1,

      fanIntensity:
        "High",

      climate:
        "Humid southern heat",

      travelRating:
        8.7,

      noiseLevel:
        9.2,

      prestigeLevel:
        9.3,

      skylineRating:
        9.5,

      premiumLevel:
        "Elite",
        crowdPressure:
  9.8,

nightAtmosphere:
  9.5,

tacticalIntensity:
  9.2,

fanChoreography:
  9.7,

      matchdayProfile:
        "One of the loudest enclosed football environments in North America.",

      arrivalTip:
        "Downtown Atlanta rail access is the fastest route on matchdays.",
    },

  "att-stadium": {
    stadiumId:
      "att-stadium",

    roof:
      "Retractable",

    pitch:
      "Hybrid Grass",

    atmosphereScore:
      9.2,

    fanIntensity:
      "High",

    climate:
      "Hot Texas conditions",

    travelRating:
      8.4,

    noiseLevel:
      9.1,

    prestigeLevel:
      9.5,

    skylineRating:
      8.8,

    premiumLevel:
      "Elite",
      crowdPressure:
  9.8,

nightAtmosphere:
  9.5,

tacticalIntensity:
  9.2,

fanChoreography:
  9.7,

    matchdayProfile:
      "Massive-scale venue built for blockbuster knockout football.",

    arrivalTip:
      "Parking zones fill quickly several hours before kickoff.",
  },

  "hard-rock-stadium": {
    stadiumId:
      "hard-rock-stadium",

    roof:
      "Open",

    pitch:
      "Natural Grass",

    atmosphereScore:
      8.9,

    fanIntensity:
      "High",

    climate:
      "Tropical humidity",

    travelRating:
      8.6,

    noiseLevel:
      8.8,

    prestigeLevel:
      9.1,

    skylineRating:
      9.2,

    premiumLevel:
      "Premium",
      crowdPressure:
  8.9,

nightAtmosphere:
  9.4,

tacticalIntensity:
  8.5,

fanChoreography:
  8.7,

    matchdayProfile:
      "Vibrant international crowd atmosphere with strong Latin football culture.",

    arrivalTip:
      "Hydration and shaded arrival areas are recommended in daytime fixtures.",
  },

  "lumen-field": {
    stadiumId:
      "lumen-field",

    roof:
      "Open",

    pitch:
      "Hybrid Grass",

    atmosphereScore:
      9.4,

    fanIntensity:
      "Elite",

    climate:
      "Cool coastal weather",

    travelRating:
      8.9,

    noiseLevel:
      9.7,

    prestigeLevel:
      9.2,

    skylineRating:
      9.5,

    premiumLevel:
      "Premium",
      crowdPressure:
  9.8,

nightAtmosphere:
  9.1,

tacticalIntensity:
  9,

fanChoreography:
  9.2,

    matchdayProfile:
      "Steep seating bowl creates one of the loudest football environments globally.",

    arrivalTip:
      "Waterfront transit routes offer the best pre-match access.",
  },

  "levis-stadium": {
    stadiumId:
      "levis-stadium",

    roof:
      "Open",

    pitch:
      "Hybrid Grass",

    atmosphereScore:
      8.8,

    fanIntensity:
      "High",

    climate:
      "Warm Californian sunshine",

    travelRating:
      8.7,

    noiseLevel:
      8.5,

    prestigeLevel:
      9.1,

    skylineRating:
      8.8,

    premiumLevel:
      "Elite",
      crowdPressure:
  9.8,

nightAtmosphere:
  9.5,

tacticalIntensity:
  9.2,

fanChoreography:
  9.7,

    matchdayProfile:
      "Technology-driven stadium experience in Silicon Valley.",

    arrivalTip:
      "Expect long post-match exit times around Santa Clara.",
  },

  "gillette-stadium": {
    stadiumId:
      "gillette-stadium",

    roof:
      "Open",

    pitch:
      "Natural Grass",

    atmosphereScore:
      8.7,

    fanIntensity:
      "Strong",

    climate:
      "Cool northeast evenings",

    travelRating:
      8.1,

    noiseLevel:
      8.4,

    prestigeLevel:
      8.9,

    skylineRating:
      8.1,

    premiumLevel:
      "Premium",
      crowdPressure:
  8.5,

nightAtmosphere:
  8.3,

tacticalIntensity:
  8.2,

fanChoreography:
  8.1,

    matchdayProfile:
      "Classic large-scale stadium atmosphere with strong supporter traditions.",

    arrivalTip:
      "Traffic congestion intensifies heavily after final whistle.",
  },

  "arrowhead-stadium": {
    stadiumId:
      "arrowhead-stadium",

    roof:
      "Open",

    pitch:
      "Natural Grass",

    atmosphereScore:
      9.6,

    fanIntensity:
      "Elite",

    climate:
      "Central plains heat",

    travelRating:
      7.9,

    noiseLevel:
      10,

    prestigeLevel:
      9.3,

    skylineRating:
      8,

    premiumLevel:
      "Premium",
      crowdPressure:
  10,

nightAtmosphere:
  9.2,

tacticalIntensity:
  9.4,

fanChoreography:
  9.1,

    matchdayProfile:
      "World-famous crowd intensity and deafening noise levels.",

    arrivalTip:
      "Arrive very early due to extensive parking queue build-up.",
  },

  "lincoln-financial-field":
    {
      stadiumId:
        "lincoln-financial-field",

      roof:
        "Open",

      pitch:
        "Natural Grass",

      atmosphereScore:
        9.2,

      fanIntensity:
        "Elite",

      climate:
        "Variable east coast weather",

      travelRating:
        8.5,

      noiseLevel:
        9.1,

      prestigeLevel:
        9,

      skylineRating:
        8.7,

      premiumLevel:
        "Premium",
        crowdPressure:
  9.2,

nightAtmosphere:
  9.1,

tacticalIntensity:
  8.9,

fanChoreography:
  8.8,

      matchdayProfile:
        "Passionate football culture with highly vocal crowds.",

      arrivalTip:
        "Broad Street subway access is strongly recommended.",
    },

  "nrg-stadium": {
    stadiumId:
      "nrg-stadium",

    roof:
      "Retractable",

    pitch:
      "Hybrid Grass",

    atmosphereScore:
      8.8,

    fanIntensity:
      "High",

    climate:
      "Hot and humid",

    travelRating:
      8.3,

    noiseLevel:
      8.9,

    prestigeLevel:
      8.9,

    skylineRating:
      8.3,

    premiumLevel:
      "Modern",
      crowdPressure:
  8.7,

nightAtmosphere:
  8.8,

tacticalIntensity:
  8.4,

fanChoreography:
  8.2,

    matchdayProfile:
      "Large enclosed venue optimized for tournament operations and fan flow.",

    arrivalTip:
      "Use park-and-ride systems where possible.",
  },

  "bmo-field": {
    stadiumId:
      "bmo-field",

    roof:
      "Open",

    pitch:
      "Natural Grass",

    atmosphereScore:
      8.6,

    fanIntensity:
      "Strong",

    climate:
      "Cool lakefront weather",

    travelRating:
      8.8,

    noiseLevel:
      8.5,

    prestigeLevel:
      8.4,

    skylineRating:
      9,

    premiumLevel:
      "Modern",
      crowdPressure:
  8.4,

nightAtmosphere:
  8.8,

tacticalIntensity:
  8.2,

fanChoreography:
  8.1,

    matchdayProfile:
      "Compact football-specific environment with excellent supporter proximity.",

    arrivalTip:
      "Streetcar access is the fastest downtown route.",
  },

  "bc-place": {
    stadiumId:
      "bc-place",

    roof:
      "Closed",

    pitch:
      "Hybrid Grass",

    atmosphereScore:
      8.8,

    fanIntensity:
      "High",

    climate:
      "Cool Pacific conditions",

    travelRating:
      9,

    noiseLevel:
      8.9,

    prestigeLevel:
      8.8,

    skylineRating:
      9.7,

    premiumLevel:
      "Premium",
      crowdPressure:
  8.7,

nightAtmosphere:
  9.2,

tacticalIntensity:
  8.4,

fanChoreography:
  8.5,

    matchdayProfile:
      "Beautiful downtown stadium atmosphere with strong visual identity.",

    arrivalTip:
      "Downtown pedestrian routes are ideal on matchdays.",
  },

  "estadio-bbva": {
    stadiumId:
      "estadio-bbva",

    roof:
      "Open",

    pitch:
      "Natural Grass",

    atmosphereScore:
      9.1,

    fanIntensity:
      "Elite",

    climate:
      "Hot northern Mexico climate",

    travelRating:
      8.2,

    noiseLevel:
      9.2,

    prestigeLevel:
      8.9,

    skylineRating:
      9.4,

    premiumLevel:
      "Elite",
      crowdPressure:
  9.8,

nightAtmosphere:
  9.5,

tacticalIntensity:
  9.2,

fanChoreography:
  9.7,

    matchdayProfile:
      "Dramatic mountain backdrop combined with intense football culture.",

    arrivalTip:
      "Evening kickoffs provide the best matchday climate experience.",
  },

  "estadio-akron": {
    stadiumId:
      "estadio-akron",

    roof:
      "Open",

    pitch:
      "Natural Grass",

    atmosphereScore:
      8.9,

    fanIntensity:
      "High",

    climate:
      "Warm dry conditions",

    travelRating:
      8,

    noiseLevel:
      8.8,

    prestigeLevel:
      8.6,

    skylineRating:
      8.7,

    premiumLevel:
      "Modern",
      crowdPressure:
  8.8,

nightAtmosphere:
  8.7,

tacticalIntensity:
  8.5,

fanChoreography:
  8.6,

    matchdayProfile:
      "Modern Mexican football venue with energetic supporter sections.",

    arrivalTip:
      "Heavy traffic forms rapidly around Zapopan highways.",
  },
};