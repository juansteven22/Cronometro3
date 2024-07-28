import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();
  private songs: { name: string; url: string }[] = [
    { name: 'Alarma 1', url: 'assets/audio/ABBA Lay All Your Love On Me Official Lyric Video.mp3' },
    { name: 'Alarma 2', url: 'assets/audio/Bon Jovi Livin On A Prayer.mp3' },
    { name: 'Alarma 3', url: 'assets/audio/Elton John Dua Lipa Cold Heart PNAU Remix Official Video.mp3' }
  ];

  constructor() { }

  getSongs() {
    return this.songs;
  }

  playSong(url: string) {
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
  }

  stopSong() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}