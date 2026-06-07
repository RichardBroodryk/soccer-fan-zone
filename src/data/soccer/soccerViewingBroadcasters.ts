export interface SoccerViewingBroadcaster {
  id: string;

  country: string;

  region: string;

  broadcasters: string[];

  urls: string[];
}

export const soccerViewingBroadcasters: SoccerViewingBroadcaster[] =
  [
    {
      id: "uk",

      country: "United Kingdom",

      region: "Europe",

      broadcasters: [
        "BBC",
        "ITV",
      ],

      urls: [
        "https://www.bbc.co.uk/sport",
        "https://www.itv.com/sport",
      ],
    },

    {
      id: "usa",

      country:
        "United States",

      region:
        "North America",

      broadcasters: [
        "FOX Sports",
        "Telemundo",
        "Peacock",
      ],

      urls: [
        "https://www.foxsports.com",
        "https://www.telemundo.com/deportes",
        "https://www.peacocktv.com",
      ],
    },

    {
      id: "south-africa",

      country:
        "South Africa",

      region: "Africa",

      broadcasters: [
        "SABC Sport",
        "SuperSport",
      ],

      urls: [
        "https://www.sabcsport.com",
        "https://www.supersport.com",
      ],
    },

    {
      id: "australia",

      country: "Australia",

      region: "Oceania",

      broadcasters: [
        "SBS",
      ],

      urls: [
        "https://www.sbs.com.au/sport",
      ],
    },

    {
      id: "france",

      country: "France",

      region: "Europe",

      broadcasters: [
        "M6",
        "beIN Sports",
      ],

      urls: [
        "https://www.m6.fr",
        "https://www.beinsports.com/fr",
      ],
    },

    {
      id: "spain",

      country: "Spain",

      region: "Europe",

      broadcasters: [
        "RTVE",
        "DAZN",
      ],

      urls: [
        "https://www.rtve.es/deportes",
        "https://www.dazn.com",
      ],
    },

    {
      id: "canada",

      country: "Canada",

      region:
        "North America",

      broadcasters: [
        "TSN",
        "CTV",
        "RDS",
      ],

      urls: [
        "https://www.tsn.ca",
        "https://www.ctv.ca",
        "https://www.rds.ca",
      ],
    },
  ];