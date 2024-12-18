import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingData } from '../_models/training_data';
import {
  Test,
  ChineseCharacter,
  SpanishCharacter,
  ChineseVoice,
  SpanishVoice,
  Img,
} from '../_models/test';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, FontAwesomeModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  data!: TrainingData;
  queue: Test[] = [];
  currentQuestion: Test | undefined;
  media = [
    'ChineseCharacter',
    'SpanishCharacter',
    'ChineseVoice',
    'SpanishVoice',
    'Img',
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<TrainingData>('../../assets/data/data.json')
      .subscribe((data: TrainingData) => {
        this.data = data;
        this.fillQueue();
        this.nextQuestion();
      });
  }

  fillQueue() {
    for (let i = 0; i < this.media.length; i++) {
      for (let j = 0; j < this.media.length; j++) {
        if (i !== j) {
          for (let k = 0; k < this.data.count; k++) {
            this.queue.push({
              question_type: this.media[i],
              answer_type: this.media[j],
              question: this.getQuestionAnswer(this.media[i], k) as
                | ChineseCharacter
                | SpanishCharacter
                | ChineseVoice
                | SpanishVoice
                | Img,
              answer: this.getQuestionAnswer(this.media[j], k) as
                | ChineseCharacter
                | SpanishCharacter
                | ChineseVoice
                | SpanishVoice
                | Img,
              options: this.getOptions(this.media[j], k) as
                | ChineseCharacter[]
                | SpanishCharacter[]
                | ChineseVoice[]
                | SpanishVoice[]
                | Img[],
              selected: undefined,
            });
          }
        }
      }
    }
    this.queue = this.shuffleArray(this.queue);
  }

  getQuestionAnswer(
    question_type: string,
    id: number
  ):
    | ChineseCharacter
    | SpanishCharacter
    | ChineseVoice
    | SpanishVoice
    | Img
    | undefined {
    if (question_type === 'ChineseCharacter') {
      return this.data.chinese[id];
    }
    if (question_type === 'SpanishCharacter') {
      return this.data.spanish[id];
    }
    if (question_type === 'ChineseVoice') {
      return this.data.chinese_voice[id];
    }
    if (question_type === 'SpanishVoice') {
      return this.data.spanish_voice[id];
    }
    if (question_type === 'Img') {
      return this.data.image[id];
    }
    return undefined;
  }

  getOptions(
    answer_type: string,
    id: number
  ):
    | (
        | ChineseCharacter
        | SpanishCharacter
        | ChineseVoice
        | SpanishVoice
        | Img
      )[]
    | undefined {
    let options:
      | (
          | ChineseCharacter
          | SpanishCharacter
          | ChineseVoice
          | SpanishVoice
          | Img
        )[]
      | undefined;

    if (answer_type === 'ChineseCharacter') {
      options = this.data.chinese;
    } else if (answer_type === 'SpanishCharacter') {
      options = this.data.spanish;
    } else if (answer_type === 'ChineseVoice') {
      options = this.data.chinese_voice;
    } else if (answer_type === 'SpanishVoice') {
      options = this.data.spanish_voice;
    } else if (answer_type === 'Img') {
      options = this.data.image;
    }

    if (options) {
      // Filter out the correct answer and shuffle the remaining options
      const filteredOptions = options.filter((option) => option.id !== id);
      const shuffledOptions = this.shuffleArray(filteredOptions);

      // Select 3 random options and include the correct answer
      const selectedOptions = shuffledOptions.slice(0, 3);
      const correctAnswer = options.find((option) => option.id === id);

      if (correctAnswer) {
        selectedOptions.push(correctAnswer);
      }

      // Shuffle again to mix the correct answer with the options
      return this.shuffleArray(selectedOptions);
    }

    return undefined;
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextQuestion() {
    if (this.queue.length > 0) {
      this.currentQuestion = this.queue.shift();
      console.log(this.currentQuestion);
    } else {
      this.currentQuestion = undefined;
    }
  }

  selectOption(option: any) {
    if (this.currentQuestion) {
      this.currentQuestion.selected = option;
      console.log('Selected option:', option);
    }
  }

  getCharacter(question: any): string {
    if (
      question &&
      this.currentQuestion?.question_type === 'ChineseCharacter'
    ) {
      return (question as ChineseCharacter).character;
    }
    if (
      question &&
      this.currentQuestion?.question_type === 'SpanishCharacter'
    ) {
      return (question as SpanishCharacter).character;
    }
    return '';
  }

  getQuestionUrl(question: any): string {
    if (question && this.currentQuestion?.question_type === 'Img') {
      return (question as Img).image_url;
    }
    if (question && this.currentQuestion?.question_type === 'ChineseVoice') {
      return (question as ChineseVoice).audio_url;
    }
    if (question && this.currentQuestion?.question_type === 'SpanishVoice') {
      return (question as SpanishVoice).audio_url;
    }
    return '';
  }

  getOptionUrl(option: any): string {
    if (option && this.currentQuestion?.answer_type === 'Img') {
      return (option as Img).image_url;
    }

    if (option && this.currentQuestion?.answer_type === 'ChineseVoice') {
      return (option as ChineseVoice).audio_url;
    }

    if (option && this.currentQuestion?.answer_type === 'SpanishVoice') {
      return (option as SpanishVoice).audio_url;
    }

    return '';
  }

  getChineseOptions(): ChineseCharacter[] {
    return this.currentQuestion?.options as ChineseCharacter[];
  }

  getSpanishOptions(): SpanishCharacter[] {
    return this.currentQuestion?.options as SpanishCharacter[];
  }

  getChineseVoiceOptions(): ChineseVoice[] {
    return this.currentQuestion?.options as ChineseVoice[];
  }

  getSpanishVoiceOptions(): SpanishVoice[] {
    return this.currentQuestion?.options as SpanishVoice[];
  }

  getImgOptions(): Img[] {
    return this.currentQuestion?.options as Img[];
  }

  playAudio(audioId: string): void {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement;
    if (audioElement) {
      audioElement.play();
    }
  }

  // New method to pause audio
  pauseAudio(audioId: string): void {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset audio to the beginning
    }
  }
}
