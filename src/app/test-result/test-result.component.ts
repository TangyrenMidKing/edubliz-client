import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.css'
})
export class TestResultComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
