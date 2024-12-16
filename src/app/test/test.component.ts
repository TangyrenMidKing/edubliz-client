import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingData } from '../_models/training_data';
import { Test, ChineseCharacter, SpanishCharacter, ChineseVoice, SpanishVoice, Img } from '../_models/test';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  data!: TrainingData;
  media = ['ChineseCharacter', 'SpanishCharacter', 'ChineseVoice', 'SpanishVoice', 'Img'];
  
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<TrainingData>('../../assets/data/data.json')
      .subscribe((data: TrainingData) => {
        this.data = data;
        console.log(this.data);
      });
  }
}
