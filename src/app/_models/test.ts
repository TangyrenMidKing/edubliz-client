export interface Test {
  question_type: string;
  answer_type: string;
  question:
    | ChineseCharacter
    | SpanishCharacter
    | ChineseVoice
    | SpanishVoice
    | Img;
  options:
    | ChineseCharacter[]
    | SpanishCharacter[]
    | ChineseVoice[]
    | SpanishVoice[]
    | Img[];
  answer:
    | ChineseCharacter
    | SpanishCharacter
    | ChineseVoice
    | SpanishVoice
    | Img;
  selected?:
    | ChineseCharacter
    | SpanishCharacter
    | ChineseVoice
    | SpanishVoice
    | Img;
}

// Individual item interfaces
export interface ChineseCharacter {
  id: number;
  character: string;
}

export interface SpanishCharacter {
  id: number;
  character: string;
}

export interface ChineseVoice {
  id: number;
  audio_url: string;
}

export interface SpanishVoice {
  id: number;
  audio_url: string;
}

export interface Img {
  id: number;
  image_url: string;
  description: string;
}
