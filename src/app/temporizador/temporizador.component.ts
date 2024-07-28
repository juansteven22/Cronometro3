import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-temporizador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2>Temporizador</h2>
      <input type="number" [(ngModel)]="segundosIniciales" placeholder="Segundos" [disabled]="running">
      <p>{{ displayTime }}</p>
      <button (click)="startTimer()" [disabled]="running">Iniciar</button>
      <button (click)="stopTimer()" [disabled]="!running">Detener</button>
      <button (click)="resetTimer()" [disabled]="running">Reiniciar</button>
      <div>
        <label for="songSelect">Selecciona una alarma: </label>
        <select id="songSelect" [(ngModel)]="selectedSong">
          <option *ngFor="let song of songs" [value]="song.url">{{song.name}}</option>
        </select>
      </div>
    </div>
  `,
  styles: ['button { margin-right: 10px; }']
})
export class TemporizadorComponent implements OnDestroy {
  segundosIniciales: number = 60;
  private timer: any;
  private remaining: number = 0;
  running: boolean = false;
  displayTime: string = '00:00:00';
  songs: { name: string; url: string }[];
  selectedSong: string;

  constructor(private audioService: AudioService) {
    this.songs = this.audioService.getSongs();
    this.selectedSong = this.songs[0].url;
  }

  startTimer() {
    if (!this.running) {
      if (this.remaining === 0) {
        this.remaining = this.segundosIniciales;
      }
      this.running = true;
      this.timer = setInterval(() => this.updateTime(), 1000);
    }
  }

  stopTimer() {
    if (this.running) {
      clearInterval(this.timer);
      this.running = false;
      this.audioService.stopSong();
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.remaining = this.segundosIniciales;
    this.displayTime = this.formatTime(this.remaining);
    this.running = false;
    this.audioService.stopSong();
  }

  private updateTime() {
    if (this.remaining > 0) {
      this.remaining--;
      this.displayTime = this.formatTime(this.remaining);
    } else {
      this.stopTimer();
      this.audioService.playSong(this.selectedSong);
    }
  }

  private formatTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.audioService.stopSong();
  }
}