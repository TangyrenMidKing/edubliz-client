import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userName!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('username') || '';
  }

  trainingChinese() {
    this.router.navigate(['/training-chinese']);
  }

  test() {
    this.router.navigate(['/test']);
  }
}
