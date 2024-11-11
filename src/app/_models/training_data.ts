// Main data interface
export interface TrainingData {
  count: number;
  chinese: CharacterItem[];
  spanish: CharacterItem[];
  chinese_voice: VoiceItem[];
  spanish_voice: VoiceItem[];
  image: ImageItem[];
}

// Individual item interfaces
export interface CharacterItem {
  id: number;
  character: string;
}

export interface VoiceItem {
  id: number;
  audio_url: string;
}

export interface ImageItem {
  id: number;
  image_url: string;
  description: string;
}
