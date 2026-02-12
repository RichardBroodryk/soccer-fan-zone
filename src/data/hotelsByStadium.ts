/* =========================================================
   RUGBY ANTHEM ZONE
   HOTELS BY STADIUM — CANONICAL DATASET (v1)
   Status: Draft / Authoritative
   Rule: Stadium-centric · No booking simulation
   ========================================================= */

export type HotelCategory =
  | "walkable"
  | "short-commute"
  | "city-supporter-hub";

export type Hotel = {
  name: string;
  category: HotelCategory;
  distanceNote: string;
  features: string[];
  bookingUrl: string;
  affiliate?: boolean;
  fanNote?: string;
};

export type StadiumHotels = {
  stadiumSlug: string;
  stadiumName: string;
  city: string;
  country: string;
  tier: 1;
  hotels: Hotel[];
  notes?: string;
};

/* =========================================================
   DATA
   ========================================================= */

export const hotelsByStadium: StadiumHotels[] = [
  /* ================= ENGLAND ================= */

  {
    stadiumSlug: "twickenham",
    stadiumName: "Twickenham Stadium",
    city: "London",
    country: "England",
    tier: 1,
    hotels: [
      {
        name: "London Twickenham Stadium Hotel",
        category: "walkable",
        distanceNote: "5–10 min walk",
        features: ["Matchday proximity", "Bar & dining", "Late check-in"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
        fanNote: "Most popular choice for matchday weekends.",
      },
      {
        name: "Travelodge London Twickenham",
        category: "walkable",
        distanceNote: "10–15 min walk",
        features: ["Budget friendly", "Reliable chain"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "The Richmond Hill Hotel",
        category: "short-commute",
        distanceNote: "10 min by bus",
        features: ["Historic area", "Supporter-friendly pubs nearby"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
    notes: "Accommodation fills quickly for Six Nations & autumn tests.",
  },

  /* ================= IRELAND ================= */

  {
    stadiumSlug: "aviva-stadium",
    stadiumName: "Aviva Stadium",
    city: "Dublin",
    country: "Ireland",
    tier: 1,
    hotels: [
      {
        name: "The Gibson Hotel",
        category: "walkable",
        distanceNote: "5 min walk",
        features: ["Modern", "Popular with travelling supporters"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
        fanNote: "Iconic rugby weekend atmosphere.",
      },
      {
        name: "Clayton Hotel Cardiff Lane",
        category: "short-commute",
        distanceNote: "10 min walk",
        features: ["Reliable comfort", "City access"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Temple Bar Hotel",
        category: "city-supporter-hub",
        distanceNote: "City centre · short taxi",
        features: ["Nightlife", "Pre-match gathering area"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= SCOTLAND ================= */

  {
    stadiumSlug: "murrayfield",
    stadiumName: "Scottish Gas Murrayfield Stadium",
    city: "Edinburgh",
    country: "Scotland",
    tier: 1,
    hotels: [
      {
        name: "Leonardo Hotel Edinburgh Murrayfield",
        category: "walkable",
        distanceNote: "10–15 min walk",
        features: ["Supporter favourite", "Matchday convenience"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Apex Grassmarket Hotel",
        category: "city-supporter-hub",
        distanceNote: "City centre · tram access",
        features: ["Historic setting", "Strong matchday vibe"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= WALES ================= */

  {
    stadiumSlug: "principality-stadium",
    stadiumName: "Principality Stadium",
    city: "Cardiff",
    country: "Wales",
    tier: 1,
    hotels: [
      {
        name: "Park Plaza Cardiff",
        category: "walkable",
        distanceNote: "10 min walk",
        features: ["Central", "Popular with visiting fans"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "The Angel Hotel",
        category: "walkable",
        distanceNote: "Opposite stadium",
        features: ["Historic rugby association"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
        fanNote: "Traditional choice for Welsh matchdays.",
      },
    ],
  },

  /* ================= FRANCE ================= */

  {
    stadiumSlug: "stade-de-france",
    stadiumName: "Stade de France",
    city: "Paris",
    country: "France",
    tier: 1,
    hotels: [
      {
        name: "Novotel Suites Stade de France",
        category: "walkable",
        distanceNote: "10 min walk",
        features: ["Modern", "Convenient for late fixtures"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Hotel du Louvre",
        category: "city-supporter-hub",
        distanceNote: "City centre · RER access",
        features: ["Central Paris", "Tourist & supporter hub"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= SOUTH AFRICA ================= */

  {
    stadiumSlug: "fnb-stadium",
    stadiumName: "FNB Stadium",
    city: "Johannesburg",
    country: "South Africa",
    tier: 1,
    hotels: [
      {
        name: "Protea Hotel Johannesburg Parktonian",
        category: "short-commute",
        distanceNote: "15–20 min drive",
        features: ["Reliable chain", "Secure parking"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Southern Sun Sandton",
        category: "city-supporter-hub",
        distanceNote: "Sandton · Gautrain access",
        features: ["Popular with international visitors"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* =========================================================
     PLACEHOLDERS — TO BE COMPLETED
     ========================================================= */

  {
    stadiumSlug: "eden-park",
    stadiumName: "Eden Park",
    city: "Auckland",
    country: "New Zealand",
    tier: 1,
    hotels: [],
    notes: "Hotel listings to be confirmed.",
  },
];
