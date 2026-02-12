export type Stadium = {
  name: string;
  slug: string;
  country: string;
  city?: string;
};

export const stadiums: Stadium[] = [
  /* ===== SIX NATIONS ===== */

  {
    name: "Twickenham",
    slug: "twickenham",
    country: "England",
    city: "London",
  },
  {
    name: "Murrayfield",
    slug: "murrayfield",
    country: "Scotland",
    city: "Edinburgh",
  },
  {
    name: "Aviva Stadium",
    slug: "aviva-stadium",
    country: "Ireland",
    city: "Dublin",
  },
  {
    name: "Principality Stadium",
    slug: "principality-stadium",
    country: "Wales",
    city: "Cardiff",
  },
  {
    name: "Stade de France",
    slug: "stade-de-france",
    country: "France",
    city: "Paris",
  },
  {
    name: "Stadio Olimpico",
    slug: "stadio-olimpico",
    country: "Italy",
    city: "Rome",
  },

  /* ===== RUGBY CHAMPIONSHIP / RIVAL TOURS ===== */

  {
    name: "Eden Park",
    slug: "eden-park",
    country: "New Zealand",
    city: "Auckland",
  },
  {
    name: "Ellis Park",
    slug: "ellis-park",
    country: "South Africa",
    city: "Johannesburg",
  },
  {
    name: "FNB Stadium",
    slug: "fnb-stadium",
    country: "South Africa",
    city: "Johannesburg",
  },

  /* ===== FUTURE EXTENSIONS (SAFE PLACEHOLDERS) ===== */
  // Sevens, World Cups, neutral venues will extend here
];
