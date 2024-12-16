import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-results',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './training-results.component.html',
  styleUrls: ['./training-results.component.css']
})
export class TrainingResultsComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
