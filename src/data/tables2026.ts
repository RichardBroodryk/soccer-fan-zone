// --------------------------------------------------
// RAZ SYSTEM — TABLES 2026 (MEN + WOMEN)
// Phase 4.4 — GENDER STRUCTURED
// --------------------------------------------------

export type LeagueTableRow = {
  position: number;
  team: string;
  coach: string;
  pointsFor: number;
  pointsAgainst: number;
  leaguePoints: number;
};

export const tables2026: Record<string, LeagueTableRow[]> = {
  // ==================================================
  // URC
  // ==================================================

  "urc-men": [
    { position: 1, team: "Leinster", coach: "Leo Cullen", pointsFor: 410, pointsAgainst: 210, leaguePoints: 58 },
    { position: 2, team: "Stormers", coach: "John Dobson", pointsFor: 380, pointsAgainst: 250, leaguePoints: 52 },
    { position: 3, team: "Ulster", coach: "Dan McFarland", pointsFor: 360, pointsAgainst: 270, leaguePoints: 48 },
    { position: 4, team: "Bulls", coach: "Jake White", pointsFor: 350, pointsAgainst: 260, leaguePoints: 46 },
    { position: 5, team: "Glasgow Warriors", coach: "Franco Smith", pointsFor: 340, pointsAgainst: 280, leaguePoints: 44 },
    { position: 6, team: "Munster", coach: "Graham Rowntree", pointsFor: 330, pointsAgainst: 290, leaguePoints: 42 },
    { position: 7, team: "Sharks", coach: "John Plumtree", pointsFor: 320, pointsAgainst: 300, leaguePoints: 40 },
    { position: 8, team: "Edinburgh", coach: "Sean Everitt", pointsFor: 300, pointsAgainst: 310, leaguePoints: 38 },
  ],

  "urc-women": [
    { position: 1, team: "Leinster Women", coach: "Ben Gissing", pointsFor: 360, pointsAgainst: 210, leaguePoints: 56 },
    { position: 2, team: "Munster Women", coach: "Denis Fogarty", pointsFor: 340, pointsAgainst: 230, leaguePoints: 52 },
    { position: 3, team: "Ulster Women", coach: "Neal Doak", pointsFor: 320, pointsAgainst: 250, leaguePoints: 48 },
    { position: 4, team: "Connacht Women", coach: "Colin Boyle", pointsFor: 300, pointsAgainst: 260, leaguePoints: 46 },
    { position: 5, team: "Edinburgh Women", coach: "Claire Cruikshank", pointsFor: 290, pointsAgainst: 270, leaguePoints: 44 },
    { position: 6, team: "Glasgow Women", coach: "Chris Laidlaw", pointsFor: 280, pointsAgainst: 280, leaguePoints: 42 },
    { position: 7, team: "Stormers Women", coach: "Louis Koen", pointsFor: 260, pointsAgainst: 300, leaguePoints: 38 },
    { position: 8, team: "Bulls Women", coach: "Nollis Marais", pointsFor: 250, pointsAgainst: 310, leaguePoints: 36 },
  ],

  // ==================================================
  // PREMIERSHIP / PREMIER 15s
  // ==================================================

  "premiership-men": [
    { position: 1, team: "Saracens", coach: "Mark McCall", pointsFor: 410, pointsAgainst: 260, leaguePoints: 62 },
    { position: 2, team: "Leicester Tigers", coach: "Dan McKellar", pointsFor: 390, pointsAgainst: 280, leaguePoints: 58 },
    { position: 3, team: "Bath", coach: "Johann van Graan", pointsFor: 370, pointsAgainst: 300, leaguePoints: 54 },
    { position: 4, team: "Sale Sharks", coach: "Alex Sanderson", pointsFor: 360, pointsAgainst: 310, leaguePoints: 52 },
    { position: 5, team: "Harlequins", coach: "Danny Wilson", pointsFor: 350, pointsAgainst: 320, leaguePoints: 50 },
    { position: 6, team: "Northampton Saints", coach: "Phil Dowson", pointsFor: 340, pointsAgainst: 330, leaguePoints: 48 },
    { position: 7, team: "Exeter Chiefs", coach: "Rob Baxter", pointsFor: 330, pointsAgainst: 340, leaguePoints: 46 },
    { position: 8, team: "Bristol Bears", coach: "Pat Lam", pointsFor: 320, pointsAgainst: 350, leaguePoints: 44 },
  ],

  "premiership-women": [
    { position: 1, team: "Saracens Women", coach: "Alex Austerberry", pointsFor: 400, pointsAgainst: 200, leaguePoints: 60 },
    { position: 2, team: "Harlequins Women", coach: "Amy Turner", pointsFor: 380, pointsAgainst: 220, leaguePoints: 56 },
    { position: 3, team: "Exeter Chiefs Women", coach: "Susie Appleby", pointsFor: 360, pointsAgainst: 240, leaguePoints: 52 },
    { position: 4, team: "Bristol Bears Women", coach: "Dave Ward", pointsFor: 340, pointsAgainst: 260, leaguePoints: 50 },
    { position: 5, team: "Gloucester-Hartpury", coach: "Sean Lynn", pointsFor: 330, pointsAgainst: 270, leaguePoints: 48 },
    { position: 6, team: "Loughborough Lightning", coach: "Nathan Smith", pointsFor: 310, pointsAgainst: 290, leaguePoints: 44 },
    { position: 7, team: "Sale Sharks Women", coach: "Tom Hudson", pointsFor: 290, pointsAgainst: 310, leaguePoints: 40 },
    { position: 8, team: "Leicester Tigers Women", coach: "Tom Hudson", pointsFor: 270, pointsAgainst: 330, leaguePoints: 36 },
  ],

  // ==================================================
  // SUPER RUGBY
  // ==================================================

  "super-men": [
    { position: 1, team: "Crusaders", coach: "Rob Penney", pointsFor: 420, pointsAgainst: 250, leaguePoints: 60 },
    { position: 2, team: "Blues", coach: "Vern Cotter", pointsFor: 400, pointsAgainst: 270, leaguePoints: 56 },
    { position: 3, team: "Chiefs", coach: "Clayton McMillan", pointsFor: 390, pointsAgainst: 280, leaguePoints: 54 },
    { position: 4, team: "Brumbies", coach: "Stephen Larkham", pointsFor: 370, pointsAgainst: 300, leaguePoints: 50 },
    { position: 5, team: "Hurricanes", coach: "Clark Laidlaw", pointsFor: 360, pointsAgainst: 310, leaguePoints: 48 },
    { position: 6, team: "Reds", coach: "Les Kiss", pointsFor: 340, pointsAgainst: 320, leaguePoints: 44 },
    { position: 7, team: "Waratahs", coach: "Darren Coleman", pointsFor: 330, pointsAgainst: 330, leaguePoints: 42 },
    { position: 8, team: "Fijian Drua", coach: "Mick Byrne", pointsFor: 320, pointsAgainst: 340, leaguePoints: 40 },
  ],

  "super-women": [
    { position: 1, team: "Blues Women", coach: "Ruahei Demant", pointsFor: 300, pointsAgainst: 180, leaguePoints: 50 },
    { position: 2, team: "Chiefs Manawa", coach: "Crystal Kaua", pointsFor: 280, pointsAgainst: 200, leaguePoints: 46 },
    { position: 3, team: "Matatu", coach: "Whitney Hansen", pointsFor: 260, pointsAgainst: 210, leaguePoints: 44 },
    { position: 4, team: "Hurricanes Poua", coach: "Fusi Feaunati", pointsFor: 240, pointsAgainst: 230, leaguePoints: 40 },
    { position: 5, team: "Brumbies Women", coach: "Scott Fava", pointsFor: 220, pointsAgainst: 250, leaguePoints: 36 },
    { position: 6, team: "Waratahs Women", coach: "Mike Ruthven", pointsFor: 210, pointsAgainst: 260, leaguePoints: 34 },
    { position: 7, team: "Reds Women", coach: "Andrew Fraser", pointsFor: 200, pointsAgainst: 270, leaguePoints: 32 },
    { position: 8, team: "Fijiana Drua", coach: "Mosese Rauluni", pointsFor: 190, pointsAgainst: 280, leaguePoints: 30 },
  ],

  // ==================================================
  // TOP 14 / ELITE 1
  // ==================================================

  "top14-men": [
    { position: 1, team: "Toulouse", coach: "Ugo Mola", pointsFor: 500, pointsAgainst: 300, leaguePoints: 70 },
    { position: 2, team: "La Rochelle", coach: "Ronan O'Gara", pointsFor: 480, pointsAgainst: 320, leaguePoints: 66 },
    { position: 3, team: "Clermont", coach: "Christophe Urios", pointsFor: 460, pointsAgainst: 340, leaguePoints: 62 },
    { position: 4, team: "Bordeaux", coach: "Yannick Bru", pointsFor: 450, pointsAgainst: 350, leaguePoints: 60 },
    { position: 5, team: "Toulon", coach: "Pierre Mignoni", pointsFor: 440, pointsAgainst: 360, leaguePoints: 58 },
    { position: 6, team: "Racing 92", coach: "Stuart Lancaster", pointsFor: 430, pointsAgainst: 370, leaguePoints: 56 },
    { position: 7, team: "Montpellier", coach: "Richard Cockerill", pointsFor: 420, pointsAgainst: 380, leaguePoints: 54 },
    { position: 8, team: "Castres", coach: "Jeremy Davidson", pointsFor: 410, pointsAgainst: 390, leaguePoints: 52 },
  ],

  "top14-women": [
    { position: 1, team: "Toulouse Women", coach: "Gaelle Mignot", pointsFor: 420, pointsAgainst: 210, leaguePoints: 62 },
    { position: 2, team: "Montpellier Women", coach: "Vincent Gomis", pointsFor: 400, pointsAgainst: 230, leaguePoints: 58 },
    { position: 3, team: "Bordeaux Women", coach: "David Ortiz", pointsFor: 380, pointsAgainst: 250, leaguePoints: 54 },
    { position: 4, team: "Lyon Women", coach: "Romain Buffin", pointsFor: 360, pointsAgainst: 260, leaguePoints: 52 },
    { position: 5, team: "Stade Français Women", coach: "Pauline Bourdon", pointsFor: 340, pointsAgainst: 280, leaguePoints: 48 },
    { position: 6, team: "Clermont Women", coach: "Fabrice Ribeyrolles", pointsFor: 320, pointsAgainst: 300, leaguePoints: 44 },
    { position: 7, team: "Grenoble Women", coach: "Nicolas Bach", pointsFor: 300, pointsAgainst: 320, leaguePoints: 40 },
    { position: 8, team: "Blagnac Women", coach: "Cedric Garcia", pointsFor: 280, pointsAgainst: 340, leaguePoints: 36 },
  ],
};