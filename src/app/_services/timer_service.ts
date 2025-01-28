export class TimerService {
  time: number = 0; // Time in seconds
  interval: any;
  isRunning: boolean = false;

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        console.log('time', this.time);
        this.time++;
      }, 1000); // Update every second
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }

  resetTimer() {
    clearInterval(this.interval);
    this.time = 0;
    this.isRunning = false;
  }

  getTime() {
    return new Date(this.time * 1000).toISOString().slice(14, 19);
  }
}
