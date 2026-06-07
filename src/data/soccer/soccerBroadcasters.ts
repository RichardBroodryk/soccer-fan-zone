export interface SoccerBroadcaster {
  id: string;
  name: string;
  country: string;
  type: "radio";
  url: string;
}

export const soccerBroadcasters: SoccerBroadcaster[] = [
  {
    id: "bbc_radio_5",
    name: "BBC Radio 5 Live",
    country: "England",
    type: "radio",
    url: "https://www.bbc.co.uk/sounds/play/live:bbc_radio_five_live",
  },

  {
    id: "talksport",
    name: "talkSPORT",
    country: "England",
    type: "radio",
    url: "https://talksport.com/live/",
  },

  {
    id: "espn_radio",
    name: "ESPN Radio",
    country: "United States",
    type: "radio",
    url: "https://www.espn.com/radio/",
  },

  {
    id: "cadena_ser",
    name: "Cadena SER",
    country: "Spain",
    type: "radio",
    url: "https://cadenaser.com/",
  },

  {
    id: "radio_marca",
    name: "Radio Marca",
    country: "Spain",
    type: "radio",
    url: "https://www.marca.com/radio.html",
  },

  {
    id: "rne",
    name: "Radio Nacional",
    country: "Spain",
    type: "radio",
    url: "https://www.rtve.es/play/radio/",
  },

  {
    id: "rai_radio",
    name: "RAI Radio",
    country: "Italy",
    type: "radio",
    url: "https://www.raiplaysound.it/",
  },

  {
    id: "radio_football",
    name: "Radio Football",
    country: "France",
    type: "radio",
    url: "https://www.radiofrance.fr/",
  },

  {
    id: "sabc_sport",
    name: "SABC Sport",
    country: "South Africa",
    type: "radio",
    url: "https://www.sabcsport.com/",
  },

  {
    id: "abc_sport",
    name: "ABC Sport",
    country: "Australia",
    type: "radio",
    url: "https://www.abc.net.au/sport",
  },
];