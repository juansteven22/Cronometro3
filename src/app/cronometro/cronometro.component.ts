import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cronometro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnDestroy {
  private timer: any;
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private running: boolean = false;

  displayTime: string = '00:00:00';

  startTimer() {
    if (!this.running) {
      this.startTime = Date.now() - this.elapsedTime;
      this.timer = setInterval(() => this.updateTime(), 1000);
      this.running = true;
    }
  }

  stopTimer() {
    if (this.running) {
      clearInterval(this.timer);
      this.elapsedTime = Date.now() - this.startTime;
      this.running = false;
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.elapsedTime = 0;
    this.displayTime = '00:00:00';
    this.running = false;
  }

  private updateTime() {
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;
    this.displayTime = this.formatTime(this.elapsedTime);
  }

  private formatTime(timeInMilliseconds: number): string {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}