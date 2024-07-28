import { Routes } from '@angular/router';
import { CronometroComponent } from './cronometro/cronometro.component';
import { TemporizadorComponent } from './temporizador/temporizador.component';

export const routes: Routes = [
  { path: 'cronometro', component: CronometroComponent },
  { path: 'temporizador', component: TemporizadorComponent },
  { path: '', redirectTo: '/cronometro', pathMatch: 'full' },
];