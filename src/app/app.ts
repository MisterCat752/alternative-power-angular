import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './shared/layout/top-bar/top-bar';
import { Nav } from './shared/layout/nav/nav';
import { CartDrawerComponent } from './shared/cart-drawer/cart-drawer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Nav, TopBar, RouterOutlet, CartDrawerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('client');
}
