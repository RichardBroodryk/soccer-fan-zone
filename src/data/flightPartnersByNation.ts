/* =========================================================
   RUGBY ANTHEM ZONE
   FLIGHT PARTNERS BY NATION — CANONICAL DATASET (v1)
   Status: Draft / To Be Locked
   Rule: No airlines or platforms added without review
   ========================================================= */

export type FlightPartnerType =
  | "national-carrier"
  | "regional-carrier"
  | "global-carrier"
  | "booking-platform";

export type FlightPartner = {
  name: string;
  url: string;
  type: FlightPartnerType;
  logo?: string; // optional — added later if/when assets are supplied
};

export type NationFlights = {
  nation: string;
  tier: 1 | 2;
  partners: FlightPartner[];
  notes?: string;
};

/* =========================================================
   DATA
   ========================================================= */

export const flightPartnersByNation: NationFlights[] = [
  /* ================= TIER 1 ================= */

  {
    nation: "England",
    tier: 1,
    partners: [
      {
        name: "British Airways",
        url: "https://www.britishairways.com/",
        type: "national-carrier",
      },
      {
        name: "Virgin Atlantic",
        url: "https://www.virginatlantic.com/",
        type: "global-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
    notes: "Major international gateways via London.",
  },

  {
    nation: "France",
    tier: 1,
    partners: [
      {
        name: "Air France",
        url: "https://www.airfrance.com/",
        type: "national-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
    notes: "Paris CDG & regional hubs.",
  },

  {
    nation: "Ireland",
    tier: 1,
    partners: [
      {
        name: "Aer Lingus",
        url: "https://www.aerlingus.com/",
        type: "national-carrier",
      },
      {
        name: "Ryanair",
        url: "https://www.ryanair.com/",
        type: "regional-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
  },

  {
    nation: "South Africa",
    tier: 1,
    partners: [
      {
        name: "South African Airways",
        url: "https://www.flysaa.com/",
        type: "national-carrier",
      },
      {
        name: "FlySafair",
        url: "https://www.flysafair.co.za/",
        type: "regional-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
    notes: "International & domestic travel.",
  },

  {
    nation: "Australia",
    tier: 1,
    partners: [
      {
        name: "Qantas",
        url: "https://www.qantas.com/",
        type: "national-carrier",
      },
      {
        name: "Virgin Australia",
        url: "https://www.virginaustralia.com/",
        type: "regional-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
  },

  {
    nation: "New Zealand",
    tier: 1,
    partners: [
      {
        name: "Air New Zealand",
        url: "https://www.airnewzealand.co.nz/",
        type: "national-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
  },

  /* ================= TIER 2 ================= */

  {
    nation: "Argentina",
    tier: 2,
    partners: [
      {
        name: "Aerolíneas Argentinas",
        url: "https://www.aerolineas.com.ar/",
        type: "national-carrier",
      },
      {
        name: "LATAM",
        url: "https://www.latam.com/",
        type: "global-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
  },

  {
    nation: "Japan",
    tier: 2,
    partners: [
      {
        name: "Japan Airlines",
        url: "https://www.jal.co.jp/",
        type: "national-carrier",
      },
      {
        name: "ANA",
        url: "https://www.ana.co.jp/",
        type: "national-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
  },

  {
    nation: "Georgia",
    tier: 2,
    partners: [
      {
        name: "Georgian Airways",
        url: "https://www.georgian-airways.com/",
        type: "national-carrier",
      },
      {
        name: "Booking.com Flights",
        url: "https://www.booking.com/flights",
        type: "booking-platform",
      },
    ],
    notes: "Connections via Europe common.",
  },

  /* =========================================================
     PLACEHOLDERS — TO BE VERIFIED
     ========================================================= */

  {
    nation: "Fiji",
    tier: 2,
    partners: [],
    notes: "Official flight partners to be confirmed.",
  },
  {
    nation: "Samoa",
    tier: 2,
    partners: [],
    notes: "Official flight partners to be confirmed.",
  },
  {
    nation: "Tonga",
    tier: 2,
    partners: [],
    notes: "Official flight partners to be confirmed.",
  },
];
