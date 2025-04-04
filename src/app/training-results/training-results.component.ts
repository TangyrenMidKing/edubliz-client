import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TimerService } from '../_services/timer_service';

@Component({
  selector: 'app-training-results',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './training-results.component.html',
  styleUrls: ['./training-results.component.css']
})
export class TrainingResultsComponent {
  constructor(private router: Router, public timerService: TimerService) {}

  navigateHome() {
    this.router.navigate(['/home']);
    var username = localStorage.getItem('username');
    localStorage.clear();
    console.log('username: ', username);
    localStorage.setItem('username', username??'Unknown');
    this.timerService.resetTimer();
  }



  getChineseTrainingAccuracy() {
    return localStorage.getItem('chinese-training-accuracy');
  }

  getSpanishTrainingAccuracy() {
    return localStorage.getItem('spanish-training-accuracy');
  }
}
