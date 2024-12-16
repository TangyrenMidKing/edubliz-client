import { CharacterItem, ImageItem, VoiceItem } from "./training_data";


export interface Question {
    image: ImageItem;
    Options: Option[];
    isCorrect: boolean;
}

export interface Option {
    id: number;
    chinese: CharacterItem;
    spanish: CharacterItem;
    chinese_voice: VoiceItem;
    spanish_voice: VoiceItem;
    image: ImageItem;    
    isSelected: boolean;
    isCorrect: boolean;
    isDisabled: boolean;
    isSelectedWrong: boolean;
}