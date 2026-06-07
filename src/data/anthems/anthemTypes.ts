export interface AnthemNation {
  id: string;
  name: string;
  code: string;
  colors: string[];

  anthem: {
    title: string;

    lyrics: {
      original: string;
      english: string;
    };

    history: string;

    facts: string[];

    audioUrl?: string;
  };
}