/* =========================================================
   RUGBY ANTHEM ZONE
   TRANSPORT PROVIDERS BY NATION — CANONICAL DATASET (v1)
   Status: Active / To Be Locked
   Rule: Tier-1 nations only. No dead links.
   ========================================================= */

export type TransportProviderType =
  | "ride-hailing"
  | "taxi"
  | "public";

export type TransportProvider = {
  name: string;
  url: string;
  type: TransportProviderType;
  note: string;
};

export type NationTransport = {
  nation: string;
  tier: 1;
  providers: TransportProvider[];
};

/* =========================================================
   DATA — CANONICAL 12
   ========================================================= */

export const transportProvidersByNation: NationTransport[] = [
  {
    nation: "England",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/gb/en/", type: "ride-hailing", note: "Widely available in major cities" },
      { name: "Bolt", url: "https://bolt.eu/en-gb/", type: "ride-hailing", note: "Common in London & metros" },
      { name: "Black Cabs", url: "https://tfl.gov.uk/modes/taxis-and-minicabs/", type: "taxi", note: "Licensed street hail taxis" },
    ],
  },
  {
    nation: "Ireland",
    tier: 1,
    providers: [
      { name: "Free Now", url: "https://www.free-now.com/ie/", type: "taxi", note: "Primary taxi platform" },
      { name: "Uber", url: "https://www.uber.com/ie/en/", type: "ride-hailing", note: "Limited availability" },
    ],
  },
  {
    nation: "Wales",
    tier: 1,
    providers: [
      { name: "Local Taxis", url: "https://www.gov.wales/taxis-and-private-hire", type: "taxi", note: "Licensed local operators" },
      { name: "Rail & Bus", url: "https://tfw.wales/", type: "public", note: "Strong match-day services" },
    ],
  },
  {
    nation: "Scotland",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/gb/en/", type: "ride-hailing", note: "Major cities only" },
      { name: "Local Taxis", url: "https://www.mygov.scot/taxis-private-hire", type: "taxi", note: "Pre-booking advised" },
    ],
  },
  {
    nation: "France",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/fr/fr/", type: "ride-hailing", note: "Nationwide coverage" },
      { name: "Bolt", url: "https://bolt.eu/fr/", type: "ride-hailing", note: "Affordable urban option" },
      { name: "G7 Taxi", url: "https://www.g7.fr/", type: "taxi", note: "Official Paris taxi network" },
    ],
  },
  {
    nation: "Italy",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/it/it/", type: "ride-hailing", note: "Limited cities" },
      { name: "Local Taxis", url: "https://www.comune.roma.it/web/it/taxi.page", type: "taxi", note: "City-regulated services" },
    ],
  },
  {
    nation: "South Africa",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/za/en/", type: "ride-hailing", note: "Primary option nationwide" },
      { name: "Bolt", url: "https://bolt.eu/en-za/", type: "ride-hailing", note: "Common near stadiums" },
    ],
  },
  {
    nation: "New Zealand",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/nz/en/", type: "ride-hailing", note: "Reliable in major centres" },
      { name: "Ola", url: "https://ola.nz/", type: "ride-hailing", note: "Local ride alternative" },
    ],
  },
  {
    nation: "Australia",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/au/en/", type: "ride-hailing", note: "Nationwide availability" },
      { name: "DiDi", url: "https://www.didiglobal.com/au/", type: "ride-hailing", note: "Competitive pricing" },
      { name: "13CABS", url: "https://www.13cabs.com.au/", type: "taxi", note: "Traditional taxi service" },
    ],
  },
  {
    nation: "Argentina",
    tier: 1,
    providers: [
      { name: "Uber", url: "https://www.uber.com/ar/es/", type: "ride-hailing", note: "Major cities" },
      { name: "Cabify", url: "https://cabify.com/ar", type: "ride-hailing", note: "Licensed urban transport" },
    ],
  },
  {
    nation: "Japan",
    tier: 1,
    providers: [
      { name: "Japan Taxi", url: "https://japantaxi.jp/", type: "taxi", note: "Official nationwide network" },
      { name: "DiDi", url: "https://www.didiglobal.com/jp/", type: "ride-hailing", note: "Widely used in metros" },
    ],
  },
  {
    nation: "Fiji",
    tier: 1,
    providers: [
      { name: "Local Taxis", url: "https://www.fijirugby.com/", type: "taxi", note: "Hotel-recommended services" },
    ],
  },
];
