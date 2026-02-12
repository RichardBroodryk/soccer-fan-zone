/* =========================================================
   RUGBY ANTHEM ZONE
   TICKET SELLERS BY NATION — CANONICAL DATASET (v1)
   Status: Draft / To Be Locked
   Rule: No sellers may be added or changed without review
   ========================================================= */

export type TicketSellerType =
  | "federation"
  | "primary"
  | "authorised-resale";

export type TicketSeller = {
  name: string;
  url: string;
  type: TicketSellerType;
};

export type NationTicketing = {
  nation: string;
  tier: 1 | 2;
  sellers: TicketSeller[];
  notes?: string;
};

/* =========================================================
   DATA
   ========================================================= */

export const ticketSellersByNation: NationTicketing[] = [
  {
    nation: "England",
    tier: 1,
    sellers: [
      {
        name: "RFU Official Tickets",
        url: "https://www.eticketing.co.uk/RFU",
        type: "federation",
      },
      {
        name: "Ticketmaster UK",
        url: "https://www.ticketmaster.co.uk/",
        type: "primary",
      },
    ],
    notes: "Twickenham & England home internationals.",
  },
  {
    nation: "Ireland",
    tier: 1,
    sellers: [
      {
        name: "Irish Rugby Ticketing",
        url: "https://www.irishrugby.ie/ireland/tickets/",
        type: "federation",
      },
      {
        name: "Ticketmaster IE",
        url: "https://www.ticketmaster.ie/",
        type: "primary",
      },
    ],
    notes: "Aviva Stadium fixtures.",
  },
  {
    nation: "Wales",
    tier: 1,
    sellers: [
      {
        name: "WRU Official Ticket Office",
        url: "https://www.wru.wales/tickets/",
        type: "federation",
      },
    ],
    notes: "Principality Stadium events.",
  },
  {
    nation: "Scotland",
    tier: 1,
    sellers: [
      {
        name: "Scottish Rugby Tickets",
        url: "https://www.scottishrugby.org/tickets",
        type: "federation",
      },
    ],
    notes: "Murrayfield internationals.",
  },
  {
    nation: "France",
    tier: 1,
    sellers: [
      {
        name: "FFR Official Ticketing",
        url: "https://www.ffr.fr/billetterie",
        type: "federation",
      },
      {
        name: "France Billet",
        url: "https://www.francebillet.com/",
        type: "primary",
      },
    ],
    notes: "National & Six Nations fixtures.",
  },
  {
    nation: "New Zealand",
    tier: 1,
    sellers: [
      {
        name: "All Blacks Tickets",
        url: "https://www.allblacks.com/tickets/",
        type: "federation",
      },
      {
        name: "Ticketek NZ",
        url: "https://premier.ticketek.co.nz/",
        type: "primary",
      },
    ],
    notes: "Test matches & Super Rugby.",
  },
  {
    nation: "South Africa",
    tier: 1,
    sellers: [
      {
        name: "Springboks Tickets",
        url: "https://springboks.rugby/general/tickets/",
        type: "federation",
      },
      {
        name: "Ticketpro",
        url: "https://www.ticketpro.co.za/",
        type: "primary",
      },
      {
        name: "Computicket",
        url: "https://www.computicket.com/",
        type: "primary",
      },
    ],
    notes: "Home test matches.",
  },
  {
    nation: "Australia",
    tier: 1,
    sellers: [
      {
        name: "Wallabies Tickets",
        url: "https://www.rugby.com.au/tickets",
        type: "federation",
      },
      {
        name: "Ticketek AU",
        url: "https://premier.ticketek.com.au/",
        type: "primary",
      },
    ],
    notes: "Wallabies home fixtures.",
  },

  /* ================= TIER 2 ================= */

  {
    nation: "Japan",
    tier: 2,
    sellers: [
      {
        name: "Japan Rugby Ticketing",
        url: "https://www.rugby-japan.jp/tickets/",
        type: "federation",
      },
    ],
  },
  {
    nation: "Fiji",
    tier: 2,
    sellers: [
      {
        name: "Fiji Rugby Union",
        url: "https://www.fijirugby.com/tickets/",
        type: "federation",
      },
    ],
  },
  {
    nation: "Georgia",
    tier: 2,
    sellers: [
      {
        name: "Georgian Rugby Union",
        url: "https://rugby.ge/",
        type: "federation",
      },
    ],
  },

  /* =========================================================
     PLACEHOLDERS — TO BE VERIFIED & LOCKED
     ========================================================= */

  {
    nation: "Portugal",
    tier: 2,
    sellers: [],
    notes: "Official ticket partners to be confirmed.",
  },
  {
    nation: "Spain",
    tier: 2,
    sellers: [],
    notes: "Official ticket partners to be confirmed.",
  },
  {
    nation: "Uruguay",
    tier: 2,
    sellers: [],
    notes: "Official ticket partners to be confirmed.",
  },
];
