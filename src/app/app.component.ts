import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/cronometro">Cronómetro</a> |
      <a routerLink="/temporizador">Temporizador</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav { margin-bottom: 20px; }
    a { margin-right: 10px; }
  `]
})
export class AppComponent {
  title = 'cronometro';
}