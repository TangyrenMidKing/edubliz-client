import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TrainingData } from '../_models/training_data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-training-chinese',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './training-chinese.component.html',
  styleUrls: ['./training-chinese.component.css'],
  host: {
    'id': 'chinese-training',
    '[attr.data-training-type]': '"chinese"'
  }
})
export class TrainingChineseComponent implements OnInit {
  data!: TrainingData;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get<TrainingData>('../../assets/data/data.json')
      .subscribe((data: TrainingData) => {
        this.data = data;
      });
  }
}
