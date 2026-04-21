/* ==================================================
   MATCH DETAILS 2026 — ROUND 1 + ROUND 2 + BENCH + PERFORMANCES
   ================================================== */

export type Player = {
  number: number;
  name: string;
};

export type TimelineEvent = {
  minute: string;
  label: string;
};

export type PerformanceStat = {
  category: string;
  player: string;
  value: string;
};

export type MatchDetails = {
  matchKey: string;
  timeline?: TimelineEvent[];
  lineups?: {
    homeStarting: Player[];
    homeBench: Player[];
    awayStarting: Player[];
    awayBench: Player[];
  };
  performances?: PerformanceStat[];
};

export const matchDetails2026: MatchDetails[] = [
  // ================= ROUND 1 =================

  // France W vs Italy W
  {
    matchKey: "france-w-vs-italy-w",
    timeline: [
      { minute: "8'", label: "TRY: France W - M. Ménager" },
      { minute: "12'", label: "CON: France W" },
      { minute: "19'", label: "TRY: France W - B. Vernier" },
      { minute: "25'", label: "TRY: Italy W" },
      { minute: "38'", label: "TRY: France W - C. Castets" },
      { minute: "45'", label: "TRY: France W - M. Ménager (2nd)" },
      { minute: "52'", label: "PEN: France W" },
      { minute: "68'", label: "TRY: France W - A. Deshayes" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "A. Deshayes" },
        { number: 2, name: "A. Sochat" },
        { number: 3, name: "C. Castets" },
        { number: 4, name: "M. Fall" },
        { number: 5, name: "M. Diallo" },
        { number: 6, name: "M. Ménager" },
        { number: 7, name: "L. Drouin" },
        { number: 8, name: "C. Gros" },
        { number: 9, name: "A. Chambon" },
        { number: 10, name: "C. Le Duff" },
        { number: 11, name: "B. Vernier" },
        { number: 12, name: "M. Ménager" },
        { number: 13, name: "N. Piquemal" },
        { number: 14, name: "M. Ménager" },
        { number: 15, name: "M. Ménager" },
      ],
      homeBench: [
        { number: 16, name: "E. M. Ménager" },
        { number: 17, name: "C. Joyeux" },
        { number: 18, name: "A. M. Ménager" },
        { number: 19, name: "M. M. Ménager" },
        { number: 20, name: "L. Ménager" },
        { number: 21, name: "A. Chambon" },
        { number: 22, name: "B. Vernier" },
        { number: 23, name: "M. M. Ménager" },
      ],
      awayStarting: [
        { number: 1, name: "S. Seye" },
        { number: 2, name: "V. Vecchi" },
        { number: 3, name: "L. Gai" },
        { number: 4, name: "G. Duca" },
        { number: 5, name: "E. Stevanin" },
        { number: 6, name: "F. Sgorbini" },
        { number: 7, name: "I. Locatelli" },
        { number: 8, name: "M. V. V. V." },
        { number: 9, name: "S. Stefan" },
        { number: 10, name: "V. Rigoni" },
        { number: 11, name: "M. M. Ménager" },
        { number: 12, name: "B. Rigoni" },
        { number: 13, name: "M. Sillari" },
        { number: 14, name: "A. Masi" },
        { number: 15, name: "V. Ostuni" },
      ],
      awayBench: [
        { number: 16, name: "L. Gai" },
        { number: 17, name: "V. Vecchi" },
        { number: 18, name: "S. Seye" },
        { number: 19, name: "G. Duca" },
        { number: 20, name: "E. Stevanin" },
        { number: 21, name: "F. Sgorbini" },
        { number: 22, name: "I. Locatelli" },
        { number: 23, name: "M. V. V. V." },
      ],
    },
    performances: [
      { category: "Most Meters", player: "M. Ménager (France)", value: "142m" },
      { category: "Most Tackles", player: "C. Gros (France)", value: "18 tackles" },
      { category: "Most Try Assists", player: "B. Vernier (France)", value: "3 assists" },
    ],
  },

  // England W vs Ireland W
  {
    matchKey: "england-w-vs-ireland-w",
    timeline: [
      { minute: "5'", label: "TRY: England W - A. Breach" },
      { minute: "15'", label: "TRY: England W - M. Rowland" },
      { minute: "28'", label: "TRY: Ireland W" },
      { minute: "42'", label: "TRY: England W - H. Aitchison" },
      { minute: "55'", label: "PEN: England W" },
      { minute: "67'", label: "TRY: England W - E. Scarratt" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "C. Botterman" },
        { number: 2, name: "L. Atkin-Davies" },
        { number: 3, name: "S. Scarratt" },
        { number: 4, name: "Z. Aldcroft" },
        { number: 5, name: "A. Ward" },
        { number: 6, name: "Z. Harrison" },
        { number: 7, name: "M. Cleall" },
        { number: 8, name: "S. Hunter" },
        { number: 9, name: "L. Riley" },
        { number: 10, name: "H. Aitchison" },
        { number: 11, name: "A. Breach" },
        { number: 12, name: "E. Scarratt" },
        { number: 13, name: "H. Rowland" },
        { number: 14, name: "J. Breach" },
        { number: 15, name: "E. Kildunne" },
      ],
      homeBench: [
        { number: 16, name: "L. Riley" },
        { number: 17, name: "C. Botterman" },
        { number: 18, name: "S. Scarratt" },
        { number: 19, name: "Z. Aldcroft" },
        { number: 20, name: "Z. Harrison" },
        { number: 21, name: "L. Riley" },
        { number: 22, name: "H. Aitchison" },
        { number: 23, name: "E. Kildunne" },
      ],
      awayStarting: [
        { number: 1, name: "L. Djougang" },
        { number: 2, name: "N. Jones" },
        { number: 3, name: "S. McGrath" },
        { number: 4, name: "B. Hogan" },
        { number: 5, name: "S. Monaghan" },
        { number: 6, name: "G. Moore" },
        { number: 7, name: "B. McCormack" },
        { number: 8, name: "D. Wall" },
        { number: 9, name: "M. Scuffil" },
        { number: 10, name: "N. Cronin" },
        { number: 11, name: "A. Doyle" },
        { number: 12, name: "S. Naoupu" },
        { number: 13, name: "E. Higgins" },
        { number: 14, name: "L. Muldoon" },
        { number: 15, name: "E. Murphy" },
      ],
      awayBench: [
        { number: 16, name: "N. Jones" },
        { number: 17, name: "L. Djougang" },
        { number: 18, name: "S. McGrath" },
        { number: 19, name: "B. Hogan" },
        { number: 20, name: "S. Monaghan" },
        { number: 21, name: "G. Moore" },
        { number: 22, name: "B. McCormack" },
        { number: 23, name: "D. Wall" },
      ],
    },
    performances: [
      { category: "Most Meters", player: "A. Breach (England)", value: "168m" },
      { category: "Most Tackles", player: "Z. Harrison (England)", value: "21 tackles" },
      { category: "Most Try Assists", player: "H. Aitchison (England)", value: "4 assists" },
    ],
  },

  // Wales W vs Scotland W
  {
    matchKey: "wales-w-vs-scotland-w",
    timeline: [
      { minute: "10'", label: "TRY: Scotland W" },
      { minute: "22'", label: "TRY: Wales W" },
      { minute: "35'", label: "TRY: Scotland W" },
      { minute: "48'", label: "PEN: Wales W" },
      { minute: "62'", label: "TRY: Scotland W" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "C. Thomas" },
        { number: 2, name: "K. Jones" },
        { number: 3, name: "C. Lewis" },
        { number: 4, name: "G. Evans" },
        { number: 5, name: "A. Fleming" },
        { number: 6, name: "B. Lewis" },
        { number: 7, name: "M. John" },
        { number: 8, name: "S. Lillicrap" },
        { number: 9, name: "K. Bevan" },
        { number: 10, name: "E. Snowsill" },
        { number: 11, name: "L. Neumann" },
        { number: 12, name: "H. Jones" },
        { number: 13, name: "K. Lake" },
        { number: 14, name: "J. Joyce" },
        { number: 15, name: "C. Williams" },
      ],
      homeBench: [
        { number: 16, name: "K. Jones" },
        { number: 17, name: "C. Thomas" },
        { number: 18, name: "C. Lewis" },
        { number: 19, name: "G. Evans" },
        { number: 20, name: "A. Fleming" },
        { number: 21, name: "B. Lewis" },
        { number: 22, name: "M. John" },
        { number: 23, name: "S. Lillicrap" },
      ],
      awayStarting: [
        { number: 1, name: "M. Wright" },
        { number: 2, name: "E. Martin" },
        { number: 3, name: "C. Belisle" },
        { number: 4, name: "E. Wassell" },
        { number: 5, name: "L. McMillan" },
        { number: 6, name: "R. McIntosh" },
        { number: 7, name: "R. McCormick" },
        { number: 8, name: "E. Gallagher" },
        { number: 9, name: "M. McDonald" },
        { number: 10, name: "H. Nelson" },
        { number: 11, name: "C. Rollie" },
        { number: 12, name: "L. Thomson" },
        { number: 13, name: "M. Smith" },
        { number: 14, name: "R. Lloyd" },
        { number: 15, name: "C. Grant" },
      ],
      awayBench: [
        { number: 16, name: "E. Martin" },
        { number: 17, name: "M. Wright" },
        { number: 18, name: "C. Belisle" },
        { number: 19, name: "E. Wassell" },
        { number: 20, name: "L. McMillan" },
        { number: 21, name: "R. McIntosh" },
        { number: 22, name: "R. McCormick" },
        { number: 23, name: "E. Gallagher" },
      ],
    },
    performances: [
      { category: "Most Meters", player: "C. Rollie (Scotland)", value: "135m" },
      { category: "Most Tackles", player: "R. McCormick (Scotland)", value: "19 tackles" },
    ],
  },

  // ================= ROUND 2 =================

  // Scotland W vs England W (7-84)
  {
    matchKey: "scotland-w-vs-england-w",
    timeline: [
      { minute: "12'", label: "TRY: England W - A. Breach" },
      { minute: "18'", label: "CON: England W" },
      { minute: "25'", label: "TRY: England W - M. Rowland" },
      { minute: "32'", label: "TRY: England W - H. Aitchison" },
      { minute: "41'", label: "TRY: England W - E. Scarratt" },
      { minute: "55'", label: "TRY: England W - Z. Harrison" },
      { minute: "68'", label: "TRY: England W - L. Riley" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "M. Wright" },
        { number: 2, name: "E. Martin" },
        { number: 3, name: "C. Belisle" },
        { number: 4, name: "E. Wassell" },
        { number: 5, name: "L. McMillan" },
        { number: 6, name: "R. McIntosh" },
        { number: 7, name: "R. McCormick" },
        { number: 8, name: "E. Gallagher" },
        { number: 9, name: "M. McDonald" },
        { number: 10, name: "H. Nelson" },
        { number: 11, name: "C. Rollie" },
        { number: 12, name: "L. Thomson" },
        { number: 13, name: "M. Smith" },
        { number: 14, name: "R. Lloyd" },
        { number: 15, name: "C. Grant" },
      ],
      homeBench: [
        { number: 16, name: "E. Martin" },
        { number: 17, name: "M. Wright" },
        { number: 18, name: "C. Belisle" },
        { number: 19, name: "E. Wassell" },
        { number: 20, name: "L. McMillan" },
        { number: 21, name: "R. McIntosh" },
        { number: 22, name: "R. McCormick" },
        { number: 23, name: "E. Gallagher" },
      ],
      awayStarting: [
        { number: 1, name: "C. Botterman" },
        { number: 2, name: "L. Atkin-Davies" },
        { number: 3, name: "S. Scarratt" },
        { number: 4, name: "Z. Aldcroft" },
        { number: 5, name: "A. Ward" },
        { number: 6, name: "Z. Harrison" },
        { number: 7, name: "M. Cleall" },
        { number: 8, name: "S. Hunter" },
        { number: 9, name: "L. Riley" },
        { number: 10, name: "H. Aitchison" },
        { number: 11, name: "A. Breach" },
        { number: 12, name: "E. Scarratt" },
        { number: 13, name: "H. Rowland" },
        { number: 14, name: "J. Breach" },
        { number: 15, name: "E. Kildunne" },
      ],
      awayBench: [
        { number: 16, name: "L. Riley" },
        { number: 17, name: "C. Botterman" },
        { number: 18, name: "S. Scarratt" },
        { number: 19, name: "Z. Aldcroft" },
        { number: 20, name: "Z. Harrison" },
        { number: 21, name: "L. Riley" },
        { number: 22, name: "H. Aitchison" },
        { number: 23, name: "E. Kildunne" },
      ],
    },
    performances: [
      { category: "Most Meters", player: "A. Breach (England)", value: "178m" },
      { category: "Most Tackles", player: "Z. Harrison (England)", value: "24 tackles" },
    ],
  },

  // Wales W vs France W (7-38)
  {
    matchKey: "wales-w-vs-france-w",
    timeline: [
      { minute: "15'", label: "TRY: France W - M. Ménager" },
      { minute: "22'", label: "CON: France W" },
      { minute: "35'", label: "TRY: France W - B. Vernier" },
      { minute: "48'", label: "TRY: France W - C. Castets" },
      { minute: "62'", label: "TRY: France W - A. Deshayes" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "C. Thomas" },
        { number: 2, name: "K. Jones" },
        { number: 3, name: "C. Lewis" },
        { number: 4, name: "G. Evans" },
        { number: 5, name: "A. Fleming" },
        { number: 6, name: "B. Lewis" },
        { number: 7, name: "M. John" },
        { number: 8, name: "S. Lillicrap" },
        { number: 9, name: "K. Bevan" },
        { number: 10, name: "E. Snowsill" },
        { number: 11, name: "L. Neumann" },
        { number: 12, name: "H. Jones" },
        { number: 13, name: "K. Lake" },
        { number: 14, name: "J. Joyce" },
        { number: 15, name: "C. Williams" },
      ],
      homeBench: [
        { number: 16, name: "K. Jones" },
        { number: 17, name: "C. Thomas" },
        { number: 18, name: "C. Lewis" },
        { number: 19, name: "G. Evans" },
        { number: 20, name: "A. Fleming" },
        { number: 21, name: "B. Lewis" },
        { number: 22, name: "M. John" },
        { number: 23, name: "S. Lillicrap" },
      ],
      awayStarting: [
        { number: 1, name: "A. Deshayes" },
        { number: 2, name: "A. Sochat" },
        { number: 3, name: "C. Castets" },
        { number: 4, name: "M. Fall" },
        { number: 5, name: "M. Diallo" },
        { number: 6, name: "M. Ménager" },
        { number: 7, name: "L. Drouin" },
        { number: 8, name: "C. Gros" },
        { number: 9, name: "A. Chambon" },
        { number: 10, name: "C. Le Duff" },
        { number: 11, name: "B. Vernier" },
        { number: 12, name: "M. Ménager" },
        { number: 13, name: "N. Piquemal" },
        { number: 14, name: "M. Ménager" },
        { number: 15, name: "M. Ménager" },
      ],
      awayBench: [
        { number: 16, name: "E. M. Ménager" },
        { number: 17, name: "C. Joyeux" },
        { number: 18, name: "A. M. Ménager" },
        { number: 19, name: "M. M. Ménager" },
        { number: 20, name: "L. Ménager" },
        { number: 21, name: "A. Chambon" },
        { number: 22, name: "B. Vernier" },
        { number: 23, name: "M. M. Ménager" },
      ],
    },
    performances: [
      { category: "Most Meters", player: "M. Ménager (France)", value: "155m" },
      { category: "Most Tackles", player: "C. Gros (France)", value: "22 tackles" },
    ],
  },

  // Ireland W vs Italy W (57-20)
  {
    matchKey: "ireland-w-vs-italy-w",
    timeline: [
      { minute: "7'", label: "TRY: Ireland W" },
      { minute: "14'", label: "CON: Ireland W" },
      { minute: "21'", label: "TRY: Ireland W" },
      { minute: "35'", label: "TRY: Ireland W" },
      { minute: "48'", label: "TRY: Ireland W" },
      { minute: "62'", label: "TRY: Ireland W" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "L. Djougang" },
        { number: 2, name: "N. Jones" },
        { number: 3, name: "S. McGrath" },
        { number: 4, name: "B. Hogan" },
        { number: 5, name: "S. Monaghan" },
        { number: 6, name: "G. Moore" },
        { number: 7, name: "B. McCormack" },
        { number: 8, name: "D. Wall" },
        { number: 9, name: "M. Scuffil" },
        { number: 10, name: "N. Cronin" },
        { number: 11, name: "A. Doyle" },
        { number: 12, name: "S. Naoupu" },
        { number: 13, name: "E. Higgins" },
        { number: 14, name: "L. Muldoon" },
        { number: 15, name: "E. Murphy" },
      ],
      homeBench: [
        { number: 16, name: "N. Jones" },
        { number: 17, name: "L. Djougang" },
        { number: 18, name: "S. McGrath" },
        { number: 19, name: "B. Hogan" },
        { number: 20, name: "S. Monaghan" },
        { number: 21, name: "G. Moore" },
        { number: 22, name: "B. McCormack" },
        { number: 23, name: "D. Wall" },
      ],
      awayStarting: [
        { number: 1, name: "S. Seye" },
        { number: 2, name: "V. Vecchi" },
        { number: 3, name: "L. Gai" },
        { number: 4, name: "G. Duca" },
        { number: 5, name: "E. Stevanin" },
        { number: 6, name: "F. Sgorbini" },
        { number: 7, name: "I. Locatelli" },
        { number: 8, name: "M. V. V. V." },
        { number: 9, name: "S. Stefan" },
        { number: 10, name: "V. Rigoni" },
        { number: 11, name: "M. M. Ménager" },
        { number: 12, name: "B. Rigoni" },
        { number: 13, name: "M. Sillari" },
        { number: 14, name: "A. Masi" },
        { number: 15, name: "V. Ostuni" },
      ],
      awayBench: [
        { number: 16, name: "L. Gai" },
        { number: 17, name: "V. Vecchi" },
        { number: 18, name: "S. Seye" },
        { number: 19, name: "G. Duca" },
        { number: 20, name: "E. Stevanin" },
        { number: 21, name: "F. Sgorbini" },
        { number: 22, name: "I. Locatelli" },
        { number: 23, name: "M. V. V. V." },
      ],
    },
    performances: [
      { category: "Most Meters", player: "A. Doyle (Ireland)", value: "152m" },
      { category: "Most Tackles", player: "B. McCormack (Ireland)", value: "20 tackles" },
    ],
  },
];

export const getMatchDetails = (match: any): MatchDetails | undefined => {
  if (!match) return undefined;

  const home = (match.home?.name || "").toLowerCase().replace(/\s+/g, "-");
  const away = (match.away?.name || "").toLowerCase().replace(/\s+/g, "-");
  const expectedKey = `${home}-vs-${away}`;

  console.log("Trying to match key:", expectedKey);

  return matchDetails2026.find((d) => d.matchKey === expectedKey);
};