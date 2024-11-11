import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TrainingData } from '../_models/training_data';

@Component({
  selector: 'app-training-spanish',
  standalone: true,
  imports: [],
  templateUrl: './training-spanish.component.html',
  styleUrl: './training-spanish.component.css',
})
export class TrainingSpanishComponent implements OnInit {
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
        console.log(this.data);
      });
  }
}
