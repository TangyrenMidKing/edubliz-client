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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EmailUtil } from '../_services/email_util';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FontAwesomeModule,
    MatProgressBarModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  data!: TrainingData;
  queue: Test[] = [];
  currentQuestion: Test | undefined;
  totalQuestions: number = 0;
  correctQuestions: number = 0;
  incorrectQuestions: number = 0;
  answeredQuestions: number = 0;
  statics: any = { total: {}, correct: {} };
  media = [
    'ChineseCharacter',
    'SpanishCharacter',
    'ChineseVoice',
    'SpanishVoice',
    'Img',
  ];

  media_class = {
    A: 'Img',
    B: 'ChineseCharacter',
    C: 'ChineseVoice',
    D: 'SpanishCharacter',
    E: 'SpanishVoice',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private emailUtil: EmailUtil
  ) {}

  ngOnInit(): void {
    this.http
      .get<TrainingData>('../../assets/data/data.json')
      .subscribe((data: TrainingData) => {
        this.data = data;
        this.fillQueue();
        this.nextQuestion();
      });
  }

  private fillQueue() {
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
    this.totalQuestions = this.queue.length;
  }

  private getQuestionAnswer(
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

  private getOptions(
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

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  nextQuestion() {
    if (this.queue.length > 0) {
      this.currentQuestion = this.queue.shift();
    } else {
      this.currentQuestion = undefined;
      this.emailUtil.sendEmail(
        'chenzhesun@gmail.com',
        'Test Results',
        this.getStatics()
      );

      this.router.navigate(['/test-result']);
    }
  }

  private getStatics(): string {
    let body: string = '';

    body += '<h2>Statics for ' + localStorage.getItem('username') + '</h2>';
    body += '<h3>Total: ' + this.totalQuestions + '</h3>';
    body += '<h3>Total Correct: ' + this.correctQuestions + '</h3>';
    body +=
      '<h3>Total Incorrect: ' +
      (this.answeredQuestions - this.correctQuestions) +
      '</h3>';
    body +=
      '<h3>Accuracy: ' +
      (this.answeredQuestions > 0
        ? ((this.correctQuestions / this.answeredQuestions) * 100).toFixed(2)
        : 0) +
      '%</h3><br/>';

    const values = Object.values(this.media_class);
    const result: string[] = [];

    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (i !== j) {
          result.push(values[i] + ' - ' + values[j]);
        }
      }
    }

    const accuracy_result: string[] = [];
    for (const testtype of result) {
      const count = this.statics.total[testtype] || 0;
      const accuracy: string = count
        ? (((this.statics.correct[testtype] || 0) / +count) * 100).toFixed(2)
        : '0';
      accuracy_result.push(accuracy);

      body += '<p>' + testtype + ' accuracy: ' + accuracy + '%</p><br/>';
    }

    body += '<table style="width: 100%; border-collapse: collapse;"><tbody>';
    for (let i = 0; i < accuracy_result.length; i++) {
      body +=
        '<tr><td style="border: 1px solid #ddd; padding: 8px;">' +
        accuracy_result[i] +
        '</td></tr>';
    }
    body += '</tbody></table><br/>';

    return body;
  }

  selectOption(option: any) {
    if (this.currentQuestion) {
      this.currentQuestion.selected = option;
      // Check if the selected option is correct
      if (this.currentQuestion.answer === option) {
        this.statics.correct[
          this.currentQuestion.question_type +
            ' - ' +
            this.currentQuestion.answer_type
        ] =
          (this.statics.correct[
            this.currentQuestion.question_type +
              ' - ' +
              this.currentQuestion.answer_type
          ] || 0) + 1;
        this.correctQuestions++;
      }

      // Update total count
      this.statics.total[
        this.currentQuestion.question_type +
          ' - ' +
          this.currentQuestion.answer_type
      ] =
        (this.statics.total[
          this.currentQuestion.question_type +
            ' - ' +
            this.currentQuestion.answer_type
        ] || 0) + 1;

      this.answeredQuestions++;
      // Go to the next question
      this.nextQuestion();
    } else {
      this.answeredQuestions++;
      this.incorrectQuestions++;
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

    const audioElement = document.getElementById(
      'audio-question'
    ) as HTMLAudioElement;
    if (audioElement) {
      audioElement.load();
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
      audioElement.load();
      audioElement.play();
    }
  }

  pauseAudio(audioId: string): void {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset audio to the beginning
    }
  }

  getProgress(): string {
    return ((this.answeredQuestions / this.totalQuestions) * 100).toFixed(0);
  }
}
