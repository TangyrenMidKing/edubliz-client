import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ImageItem, TrainingData } from '../_models/training_data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question, Option } from '../_models/question';
import { EmailUtil } from '../_services/email_util';

@Component({
  selector: 'app-training-spanish',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './training-spanish.component.html',
  styleUrl: './training-spanish.component.css',
})
export class TrainingSpanishComponent implements OnInit {
  data!: TrainingData;
  queue: number[] = [];
  wrongQuestions: string[] = [];
  incorrectCount: number = 0;
  question!: Question;
  totalQuestions: number = 0;
  correctAnswerSelected: boolean = false;
  feedback: string = '';

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
        this.initializeQueue();
        this.loadNextQuestion();
      });
  }

  initializeQueue(): void {
    for (let i = 0; i < this.data.iteration; i++) {
      const subarray: number[] = [];
      for (let j = 0; j < this.data.count; j++) {
        subarray.push(j);
      }
      subarray.sort(() => Math.random() - 0.5);
      subarray.forEach((element) => {
        this.queue.push(element);
      });
    }
    this.totalQuestions = this.queue.length;
  }

  loadNextQuestion(): void {
    if (this.queue.length > 0) {
      const question: number = this.queue.shift()!;
      const randomNumbers: number[] = this.getRandomDistinctNumbers(
        question,
        this.data.count
      );
      this.setCurrentQuestion(question, randomNumbers);
    } else {
      localStorage.setItem(
        'spanish-training-wrong-questions',
        JSON.stringify(this.wrongQuestions.join(''))
      );
      localStorage.setItem(
        'spanish-training-accuracy',
        ((1 - (this.incorrectCount / this.totalQuestions)) * 100).toFixed(2)
      );
      this.emailUtil.sendEmail(
        'chenzhesun@gmail.com',
        'Training Results - ' + localStorage.getItem('userName'),
        this.emailUtil.trainingTemplate()
      );

      
      this.router.navigate(['/training-results']);
    }
  }

  nextQuestion(): void {
    // reset
    this.feedback = '';
    this.correctAnswerSelected = false;
    this.loadNextQuestion();
  }

  selectAnswer(option: Option): void {
    this.correctAnswerSelected = option.isCorrect; // Check if the selected option is correct
    
    // reset feedback
    if (option.isCorrect) {
      this.feedback = '✔️ Correct!';
    } else {
      this.feedback = '❌ Incorrect! please try again';
      this.incorrectCount++;
      option.isSelectedWrong = true;
      this.wrongQuestions.push(this.emailUtil.wrongQuestionsStringify(this.question, 'spanish'));
    }

    // Mark the correct answer and disable incorrect ones
    this.question.Options.forEach((opt) => {
      if (opt.isCorrect) {
        opt.isSelected = true; // Mark the correct answer
      } else {
        opt.isDisabled = true; // Disable incorrect answers
      }
    });
  }

  // New method to set the current question and options
  setCurrentQuestion(id: number, randomNumbers: number[]): void {
    const image: ImageItem = this.data.image.find((img) => img.id === id)!;
    const options: Option[] = [];

    // set the options
    options.push({
      isSelected: false,
      isDisabled: false,
      id: id,
      chinese: this.data.chinese[id],
      spanish: this.data.spanish[id],
      chinese_voice: this.data.chinese_voice[id],
      spanish_voice: this.data.spanish_voice[id],
      image: image,
      isCorrect: true,
      isSelectedWrong: false,
    });
    for (let i = 0; i < randomNumbers.length; i++) {
      options.push({
        isSelected: false,
        isDisabled: false,
        id: randomNumbers[i],
        chinese: this.data.chinese[randomNumbers[i]],
        spanish: this.data.spanish[randomNumbers[i]],
        chinese_voice: this.data.chinese_voice[randomNumbers[i]],
        spanish_voice: this.data.spanish_voice[randomNumbers[i]],
        image: this.data.image[randomNumbers[i]],
        isCorrect: false,
        isSelectedWrong: false,
      });
    }

    // shuffle the options
    options.sort(() => Math.random() - 0.5);
    this.question = {
      image: image,
      Options: options,
      isCorrect: true,
    };

    this.question = {
      image: image,
      Options: options,
      isCorrect: false,
    };
  }

  getRandomDistinctNumbers(id: number, range: number): number[] {
    const selectedNumbers = new Set<number>();
    while (selectedNumbers.size < 3) {
      const randomNum = Math.floor(Math.random() * range);
      if (randomNum !== id) {
        selectedNumbers.add(randomNum);
      }
    }
    return Array.from(selectedNumbers);
  }

  // New method to play audio
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
