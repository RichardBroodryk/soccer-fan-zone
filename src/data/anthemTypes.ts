// src/data/anthemTypes.ts

export interface AnthemText {
  original: string;
  english: string;
}

export interface AnthemDetails {
  title: string;
  lyrics: AnthemText;
  history: string;
  facts: string[];
}

export interface AnthemNation {
  id: string;
  name: string;
  code: string;
  colors: string[];
  anthem: AnthemDetails;
}
