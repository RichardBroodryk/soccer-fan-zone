// src/data/soccer/stadiumCityExperience.ts

export type StadiumCityExperience =
  {
    stadiumId: string;

    culture: string;

    nightlife: string;

    cuisine: string;

    weather: string;

    transport: string;

    fanZones: string;

    bestFeature: string;
  };

export const stadiumCityExperience: Record<
  string,
  StadiumCityExperience
> = {
  "estadio-azteca": {
    stadiumId:
      "estadio-azteca",

    culture:
      "Legendary football culture with deep World Cup history and nonstop supporter energy.",

    nightlife:
      "Massive late-night football atmosphere across Mexico City districts.",

    cuisine:
      "Street tacos, grilled meats and authentic Mexican football matchday cuisine.",

    weather:
      "Warm high-altitude conditions with cooler evenings.",

    transport:
      "Metro systems remain the fastest matchday option.",

    fanZones:
      "Massive FIFA fan gatherings expected across the city center.",

    bestFeature:
      "Historic World Cup atmosphere unlike any stadium on earth.",
  },

  "metlife-stadium": {
    stadiumId:
      "metlife-stadium",

    culture:
      "Global football convergence with supporters from every continent.",

    nightlife:
      "Elite Manhattan nightlife and international supporter hubs.",

    cuisine:
      "Global food capital featuring every major football culture.",

    weather:
      "Humid summer climate with intense evening atmospheres.",

    transport:
      "Rail links from Manhattan are essential on matchdays.",

    fanZones:
      "Large-scale FIFA experiences expected across NYC and New Jersey.",

    bestFeature:
      "Expected FIFA World Cup 2026 Final destination.",
  },

  "sofi-stadium": {
    stadiumId:
      "sofi-stadium",

    culture:
      "Entertainment-driven football experience with massive global visibility.",

    nightlife:
      "Hollywood nightlife and beach culture merge into the matchday atmosphere.",

    cuisine:
      "Fusion food scene with elite hospitality experiences.",

    weather:
      "Warm coastal evenings with near-perfect football climate.",

    transport:
      "Heavy rideshare usage expected around Inglewood.",

    fanZones:
      "Immersive entertainment-focused supporter experiences.",

    bestFeature:
      "Most futuristic stadium presentation in the tournament.",
  },

  "arrowhead-stadium": {
    stadiumId:
      "arrowhead-stadium",

    culture:
      "One of the loudest and most intimidating football atmospheres globally.",

    nightlife:
      "Football-focused supporter culture with strong local identity.",

    cuisine:
      "Kansas City barbecue dominates the matchday experience.",

    weather:
      "Hot summer conditions with intense daytime heat.",

    transport:
      "Driving and early parking arrival strongly recommended.",

    fanZones:
      "Tailgate-heavy supporter culture around the venue.",

    bestFeature:
      "Possibly the loudest crowd environment in World Cup 2026.",
  },

  "lumen-field": {
    stadiumId:
      "lumen-field",

    culture:
      "Modern football culture with elite supporter intensity.",

    nightlife:
      "Waterfront nightlife and downtown fan movement create strong atmosphere.",

    cuisine:
      "Seafood, coffee culture and Pacific Northwest cuisine.",

    weather:
      "Cool coastal football weather.",

    transport:
      "Rail and waterfront access simplify matchday movement.",

    fanZones:
      "Dense downtown supporter zones expected around the waterfront.",

    bestFeature:
      "Steep stadium design amplifies crowd noise dramatically.",
  },
};