import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInitService } from './services/appInit.service';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('client');
}
